import { getAdminSessionState } from '../customization/admin-session';

const GITHUB_API_ORIGIN = 'https://api.github.com';
const PROXY_PREFIX = '/api/github';

function inputUrl(input: RequestInfo | URL): URL | undefined {
  try {
    if (input instanceof Request) return new URL(input.url);
    return new URL(String(input));
  } catch {
    return undefined;
  }
}

export function hasAuthenticatedGitHubSession(): boolean {
  return getAdminSessionState().status === 'authenticated';
}

export function authenticatedGitHubFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const target = inputUrl(input);
  if (
    typeof window !== 'undefined'
    && hasAuthenticatedGitHubSession()
    && target?.origin === GITHUB_API_ORIGIN
  ) {
    const proxy = new URL(`${PROXY_PREFIX}${target.pathname}${target.search}`, window.location.origin);
    return globalThis.fetch(proxy, {
      ...init,
      mode: 'same-origin',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
    });
  }
  return globalThis.fetch(input, init);
}
