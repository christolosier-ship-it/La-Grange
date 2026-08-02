import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  initializeAdminSession,
  logoutAdmin,
} from '../customization/admin-session';
import { authenticatedGitHubFetch } from './authenticated-fetch';

function requestUrl(value: RequestInfo | URL): string {
  if (typeof value === 'string') return value;
  return value instanceof URL ? value.href : value.url;
}

describe('authenticatedGitHubFetch', () => {
  beforeEach(async () => {
    await logoutAdmin(vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('keeps anonymous GitHub reads direct', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]'));
    vi.stubGlobal('fetch', fetcher);

    await authenticatedGitHubFetch('https://api.github.com/users/example/repos');

    expect(requestUrl(fetcher.mock.calls[0]?.[0] ?? '')).toBe(
      'https://api.github.com/users/example/repos',
    );
  });

  it('routes authenticated GitHub reads through the same-origin proxy', async () => {
    await initializeAdminSession(vi.fn<typeof fetch>().mockResolvedValue(Response.json({
      authenticated: true,
      login: 'christolosier-ship-it',
      admin: true,
      githubAuthenticated: true,
    })));
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]'));
    vi.stubGlobal('fetch', fetcher);

    await authenticatedGitHubFetch(
      'https://api.github.com/users/christolosier-ship-it/repos?per_page=100',
      { credentials: 'omit', mode: 'cors' },
    );

    const [input, init] = fetcher.mock.calls[0] ?? [];
    expect(requestUrl(input ?? '')).toBe(
      `${window.location.origin}/api/github/users/christolosier-ship-it/repos?per_page=100`,
    );
    expect(init).toMatchObject({
      credentials: 'include',
      mode: 'same-origin',
      referrerPolicy: 'no-referrer',
    });
  });
});
