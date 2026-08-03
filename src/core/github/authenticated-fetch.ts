import {
  getAdminSessionState,
  getGitHubAccessToken,
  invalidateAdminSession,
} from '../customization/admin-session';

const GITHUB_API_ORIGIN = 'https://api.github.com';

function inputUrl(input: RequestInfo | URL): URL | undefined {
  try {
    if (input instanceof Request) return new URL(input.url);
    return new URL(String(input));
  } catch {
    return undefined;
  }
}

export function hasAuthenticatedGitHubSession(): boolean {
  return getAdminSessionState().status === 'authenticated'
    && getGitHubAccessToken() !== undefined;
}

export async function authenticatedGitHubFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const target = inputUrl(input);
  const token = getGitHubAccessToken();
  if (!token || target?.origin !== GITHUB_API_ORIGIN) {
    return globalThis.fetch(input, init);
  }

  const headers = new Headers(init?.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/vnd.github+json');
  if (!headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('X-GitHub-Api-Version')) headers.set('X-GitHub-Api-Version', '2022-11-28');

  const response = await globalThis.fetch(input, {
    ...init,
    headers,
    mode: 'cors',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  });
  if (response.status === 401) {
    invalidateAdminSession('Le jeton GitHub a expiré ou a été révoqué.');
  }
  return response;
}
