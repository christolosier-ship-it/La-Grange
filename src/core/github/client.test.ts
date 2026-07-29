import { describe, expect, it, vi } from 'vitest';
import { GitHubClient } from './client';

const repo = (id: number, name = `repo-${id}`) => ({ id, node_id: `N${id}`, name, description: null, html_url: `https://github.com/me/${name}`, homepage: null, fork: false, archived: false, language: null, default_branch: 'main', topics: [], open_issues_count: 0, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z', pushed_at: null });

describe('GitHubClient', () => {
  it('paginates, sends the API headers and removes duplicate repositories', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([repo(1)]), { headers: { link: '<https://api.test/page/2>; rel="next"', etag: 'v1' } }))
      .mockResolvedValueOnce(new Response(JSON.stringify([repo(1), repo(2)])));
    const result = await new GitHubClient(fetcher, 'https://api.test').fetchAllRepositories('me', 'old');
    expect(result.status === 'success' && result.repositories.map(({ id }) => id)).toEqual([1, 2]);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0]?.[1]?.headers).toMatchObject({ Accept: 'application/vnd.github+json', 'If-None-Match': 'old' });
    expect(fetcher.mock.calls[1]?.[1]?.headers).not.toHaveProperty('If-None-Match');
  });

  it('keeps the cache on 304 and stops after an intermediate error', async () => {
    const notModified = vi.fn().mockResolvedValue(new Response(null, { status: 304 }));
    await expect(new GitHubClient(notModified).fetchAllRepositories('me', 'v1')).resolves.toEqual({ status: 'not-modified', etag: 'v1' });
    const failed = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify([repo(1)]), { headers: { link: '<https://api.test/2>; rel="next"' } })).mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(new GitHubClient(failed, 'https://api.test').fetchAllRepositories('me')).rejects.toMatchObject({ code: 'network' });
  });
});
