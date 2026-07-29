import { afterEach, describe, expect, it, vi } from 'vitest';
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

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('GitHubClient', () => {
  it('paginates with a simple CORS request and removes duplicates', async () => {
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

    for (const call of fetcher.mock.calls) {
      const options = call[1];
      expect(options?.headers).toBeUndefined();
      expect(options).toMatchObject({
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
    }
  });

  it('keeps the native Window.fetch receiver required by Safari', async () => {
    const strictWindowFetch = vi.fn(function (this: unknown): Promise<Response> {
      if (this !== globalThis) {
        throw new TypeError('Can only call Window.fetch on instances of Window');
      }
      return Promise.resolve(new Response(JSON.stringify([repository(1)])));
    }) as unknown as typeof fetch;
    vi.stubGlobal('fetch', strictWindowFetch);

    const result = await new GitHubClient(undefined, 'https://api.test').fetchAllRepositories('me');

    expect(result.status === 'success' ? result.repositories : []).toHaveLength(1);
    expect(strictWindowFetch).toHaveBeenCalledOnce();
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
    ).rejects.toMatchObject({ code: 'network' });

    const limited = vi.fn<typeof fetch>();
    limited.mockResolvedValue(new Response(null, {
      status: 403,
      headers: { 'x-ratelimit-remaining': '0', 'retry-after': '60' },
    }));
    await expect(
      new GitHubClient(limited).fetchAllRepositories('me'),
    ).rejects.toMatchObject({ code: 'rate-limit', recoverable: true });
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

  it('exposes a useful browser fetch failure message', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Load failed'));

    await expect(
      new GitHubClient(fetcher).fetchAllRepositories('me'),
    ).rejects.toMatchObject({
      code: 'network',
      message: 'GitHub fetch failed: Load failed',
      userMessage: 'Le navigateur n’a pas pu lire l’API GitHub (Load failed).',
    });
  });
});
