import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  connectAdminWithToken,
  getAdminSessionState,
  getGitHubAccessToken,
  initializeAdminSession,
  logoutAdmin,
} from './admin-session';

const SESSION_KEY = 'la-grange:github-token:session';
const PERSISTENT_KEY = 'la-grange:github-token:persistent';

function userResponse(login = 'christolosier-ship-it'): Response {
  return Response.json({ login });
}

describe('local GitHub session', () => {
  beforeEach(async () => {
    localStorage.clear();
    sessionStorage.clear();
    await logoutAdmin();
  });

  it('keeps the token in session storage by default', async () => {
    await connectAdminWithToken(
      'github_pat_session-token',
      false,
      vi.fn<typeof fetch>().mockResolvedValue(userResponse()),
    );

    expect(sessionStorage.getItem(SESSION_KEY)).toBe('github_pat_session-token');
    expect(localStorage.getItem(PERSISTENT_KEY)).toBeNull();
    expect(getAdminSessionState()).toEqual({
      status: 'authenticated',
      login: 'christolosier-ship-it',
      admin: false,
      githubAuthenticated: true,
    });
    expect(getGitHubAccessToken()).toBe('github_pat_session-token');
  });

  it('persists the token only when the user explicitly requests it', async () => {
    await connectAdminWithToken(
      'github_pat_persistent-token',
      true,
      vi.fn<typeof fetch>().mockResolvedValue(userResponse()),
    );

    expect(localStorage.getItem(PERSISTENT_KEY)).toBe('github_pat_persistent-token');
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it('restores and validates a previously stored token', async () => {
    sessionStorage.setItem(SESSION_KEY, 'github_pat_restored-token');
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(userResponse('restored-user'));

    await initializeAdminSession(fetcher);

    expect(fetcher).toHaveBeenCalledOnce();
    expect(getGitHubAccessToken()).toBe('github_pat_restored-token');
    expect(getAdminSessionState()).toMatchObject({
      status: 'authenticated',
      login: 'restored-user',
    });
  });

  it('removes a rejected token from the device', async () => {
    localStorage.setItem(PERSISTENT_KEY, 'github_pat_revoked-token');
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 401 }));

    await initializeAdminSession(fetcher);

    expect(localStorage.getItem(PERSISTENT_KEY)).toBeNull();
    expect(getGitHubAccessToken()).toBeUndefined();
    expect(getAdminSessionState()).toMatchObject({
      status: 'error',
      message: 'Jeton GitHub invalide, expiré ou révoqué.',
    });
  });

  it('disconnects and clears every storage location', async () => {
    sessionStorage.setItem(SESSION_KEY, 'github_pat_session-token');
    localStorage.setItem(PERSISTENT_KEY, 'github_pat_persistent-token');

    await logoutAdmin();

    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
    expect(localStorage.getItem(PERSISTENT_KEY)).toBeNull();
    expect(getAdminSessionState()).toEqual({ status: 'anonymous' });
  });
});
