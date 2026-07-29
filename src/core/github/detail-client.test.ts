import { describe, expect, it, vi } from 'vitest';
import { AppError } from '../errors/app-error';
import { GitHubDetailClient } from './detail-client';

function response(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(body === undefined ? undefined : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

const commit = {
  sha: 'abc',
  html_url: 'https://github.com/example/repo/commit/abc',
  commit: {
    message: 'Message',
    author: { name: 'Christo', date: '2026-07-29T10:00:00Z' },
    committer: null,
  },
};

const release = {
  html_url: 'https://github.com/example/repo/releases/tag/v1',
  name: 'Version 1',
  tag_name: 'v1',
  published_at: '2026-07-29T09:00:00Z',
  created_at: '2026-07-29T08:00:00Z',
};

const readme = { html_url: 'https://github.com/example/repo/blob/main/README.md' };

describe('GitHubDetailClient', () => {
  it('requests only the opened repository with browser-safe simple requests', async () => {
    const fetcher = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(response([commit]))
      .mockResolvedValueOnce(response(release))
      .mockResolvedValueOnce(response(readme));
    const client = new GitHubDetailClient(fetcher);

    const result = await client.fetchProjectDetails('example', 'repo');

    expect(result).toEqual({ commits: [commit], release, readme });
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher.mock.calls.map(([url]) => String(url))).toEqual([
      'https://api.github.com/repos/example/repo/commits?per_page=3',
      'https://api.github.com/repos/example/repo/releases/latest',
      'https://api.github.com/repos/example/repo/readme',
    ]);
    for (const [, init] of fetcher.mock.calls) {
      expect(init).toMatchObject({ credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer' });
      expect(init?.headers).toBeUndefined();
    }
  });

  it('treats empty repositories and absent release or README as valid empty details', async () => {
    const fetcher = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(response(undefined, 409))
      .mockResolvedValueOnce(response(undefined, 404))
      .mockResolvedValueOnce(response(undefined, 404));
    const client = new GitHubDetailClient(fetcher);

    await expect(client.fetchProjectDetails('example', 'empty')).resolves.toEqual({
      commits: [],
      release: null,
      readme: null,
    });
  });

  it('surfaces rate-limit reset information without continuing the request chain', async () => {
    const reset = String(Math.floor(Date.now() / 1_000) + 600);
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(response(undefined, 403, {
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': reset,
    }));
    const client = new GitHubDetailClient(fetcher);

    await expect(client.fetchProjectDetails('example', 'repo')).rejects.toMatchObject({
      code: 'rate-limit',
      retryAt: expect.any(String),
    } satisfies Partial<AppError>);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('rejects structurally invalid remote data', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(response([{ sha: 'missing-fields' }]));
    const client = new GitHubDetailClient(fetcher);

    await expect(client.fetchProjectDetails('example', 'repo')).rejects.toMatchObject({
      code: 'invalid-response',
    });
  });
});
