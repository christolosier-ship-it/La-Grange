import { describe, expect, it, vi } from 'vitest';
import { GitHubClient } from './client';
import type { GitHubRepositoryDto } from './types';

function repository(id: number, name = `repo-${String(id)}`): GitHubRepositoryDto {
  return {
    id,
    node_id: `N${String(id)}`,
    name,
    description: null,
    html_url: `https://github.com/me/${name}`,
    homepage: null,
    fork: false,
    archived: false,
    language: null,
    default_branch: 'main',
    topics: [],
    open_issues_count: 0,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
    pushed_at: null,
  };
}

describe('GitHubClient', () => {
  it('paginates, sends browser-safe headers and removes duplicates', async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher
      .mockResolvedValueOnce(new Response(JSON.stringify([repository(1)]), {
        headers: {
          link: '<https://api.test/page/2>; rel="next"',
          etag: 'v1',
        },
      }))
      .mockResolvedValueOnce(new Response(JSON.stringify([repository(1), repository(2)])));

    const result = await new GitHubClient(fetcher, 'https://api.test').fetchAllRepositories('me', 'old');
    expect(result.status === 'success' ? result.repositories.map(({ id }) => id) : []).toEqual([1, 2]);
    expect(fetcher).toHaveBeenCalledTimes(2);

    const firstHeaders = new Headers(fetcher.mock.calls[0]?.[1]?.headers);
    const secondHeaders = new Headers(fetcher.mock.calls[1]?.[1]?.headers);
    expect(firstHeaders.get('Accept')).toBe('application/vnd.github+json');
    expect(firstHeaders.get('If-None-Match')).toBe('old');
    expect(firstHeaders.get('X-GitHub-Api-Version')).toBeNull();
    expect(secondHeaders.get('If-None-Match')).toBeNull();
    expect(secondHeaders.get('X-GitHub-Api-Version')).toBeNull();
  });

  it('keeps the cache on 304', async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(new Response(null, { status: 304, headers: { etag: 'v2' } }));

    await expect(
      new GitHubClient(fetcher).fetchAllRepositories('me', 'v1'),
    ).resolves.toEqual({ status: 'not-modified', etag: 'v2' });
  });

  it('stops on an intermediate error and identifies rate limits', async () => {
    const failed = vi.fn<typeof fetch>();
    failed
      .mockResolvedValueOnce(new Response(JSON.stringify([repository(1)]), {
        headers: { link: '<https://api.test/2>; rel="next"' },
      }))
      .mockResolvedValueOnce(new Response(null, { status: 500 }));

    await expect(
      new GitHubClient(failed, 'https://api.test').fetchAllRepositories('me'),
    ).rejects.toMatchObject({ code: 'network', userMessage: 'GitHub a répondu avec le statut 500.' });

    const limited = vi.fn<typeof fetch>();
    limited.mockResolvedValue(new Response(null, {
      status: 403,
      headers: { 'x-ratelimit-remaining': '0', 'retry-after': '60' },
    }));
    await expect(
      new GitHubClient(limited).fetchAllRepositories('me'),
    ).rejects.toMatchObject({ code: 'rate-limit', recoverable: true });
  });

  it('reports browser fetch failures without hiding the technical cause', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Load failed'));

    await expect(
      new GitHubClient(fetcher).fetchAllRepositories('me'),
    ).rejects.toMatchObject({
      code: 'network',
      message: 'GitHub fetch failed: Load failed',
      userMessage: 'Connexion à GitHub impossible depuis le navigateur.',
    });
  });

  it('rejects invalid repository data and untrusted pagination links', async () => {
    const invalid = vi.fn<typeof fetch>();
    invalid.mockResolvedValue(new Response(JSON.stringify([{ id: 1, name: 'broken' }])));
    await expect(
      new GitHubClient(invalid).fetchAllRepositories('me'),
    ).rejects.toMatchObject({ code: 'invalid-response' });

    const untrusted = vi.fn<typeof fetch>();
    untrusted.mockResolvedValue(new Response(JSON.stringify([repository(1)]), {
      headers: { link: '<https://evil.example/page/2>; rel="next"' },
    }));
    await expect(
      new GitHubClient(untrusted).fetchAllRepositories('me'),
    ).rejects.toMatchObject({ code: 'invalid-response' });
    expect(untrusted).toHaveBeenCalledOnce();
  });

  it('preserves cancellation while decoding a response body', async () => {
    const abortError = new Error('aborted');
    abortError.name = 'AbortError';
    const response = {
      ok: true,
      status: 200,
      headers: new Headers(),
      json: vi.fn().mockRejectedValue(abortError),
    } as unknown as Response;
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(response);

    await expect(
      new GitHubClient(fetcher).fetchAllRepositories('me'),
    ).rejects.toMatchObject({ name: 'AbortError' });
  });
});
