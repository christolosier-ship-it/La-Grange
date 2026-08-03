import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  connectAdminWithToken,
  getAdminSessionState,
  logoutAdmin,
} from '../customization/admin-session';
import { authenticatedGitHubFetch } from './authenticated-fetch';

function requestUrl(value: RequestInfo | URL): string {
  if (typeof value === 'string') return value;
  return value instanceof URL ? value.href : value.url;
}

function githubUser(login = 'christolosier-ship-it'): Response {
  return Response.json({ login });
}

describe('authenticatedGitHubFetch', () => {
  beforeEach(() => {
    logoutAdmin();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('keeps anonymous GitHub reads direct and without authorization', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]'));
    vi.stubGlobal('fetch', fetcher);

    await authenticatedGitHubFetch('https://api.github.com/users/example/repos');

    const [input, init] = fetcher.mock.calls[0] ?? [];
    expect(requestUrl(input ?? '')).toBe('https://api.github.com/users/example/repos');
    expect(new Headers(init?.headers).has('authorization')).toBe(false);
  });

  it('adds the local token directly to GitHub API reads', async () => {
    await connectAdminWithToken(
      'github_pat_read-only-token',
      false,
      vi.fn<typeof fetch>().mockResolvedValue(githubUser()),
    );
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]'));
    vi.stubGlobal('fetch', fetcher);

    await authenticatedGitHubFetch(
      'https://api.github.com/users/christolosier-ship-it/repos?per_page=100',
      { headers: { 'If-None-Match': 'repositories-v1' } },
    );

    const [input, init] = fetcher.mock.calls[0] ?? [];
    expect(requestUrl(input ?? '')).toBe(
      'https://api.github.com/users/christolosier-ship-it/repos?per_page=100',
    );
    const headers = new Headers(init?.headers);
    expect(headers.get('authorization')).toBe('Bearer github_pat_read-only-token');
    expect(headers.get('if-none-match')).toBe('repositories-v1');
    expect(init).toMatchObject({
      credentials: 'omit',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
    });
  });

  it('never sends the token to another origin', async () => {
    await connectAdminWithToken(
      'github_pat_read-only-token',
      false,
      vi.fn<typeof fetch>().mockResolvedValue(githubUser()),
    );
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('ok'));
    vi.stubGlobal('fetch', fetcher);

    await authenticatedGitHubFetch('https://example.com/data');

    const [, init] = fetcher.mock.calls[0] ?? [];
    expect(new Headers(init?.headers).has('authorization')).toBe(false);
  });

  it('clears the local session when GitHub rejects the token', async () => {
    await connectAdminWithToken(
      'github_pat_read-only-token',
      false,
      vi.fn<typeof fetch>().mockResolvedValue(githubUser()),
    );
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 401 })));

    await authenticatedGitHubFetch('https://api.github.com/user');

    expect(getAdminSessionState()).toMatchObject({ status: 'error' });
  });
});
