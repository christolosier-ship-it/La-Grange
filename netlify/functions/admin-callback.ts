import {
  canonicalOrigin,
  clearOAuthCookie,
  createSessionCookie,
  verifyOAuthState,
} from './_shared/session';

export const config = { path: '/api/admin/callback' };

interface OAuthTokenResponse {
  readonly access_token?: string;
  readonly error?: string;
}

interface GitHubUser {
  readonly login?: string;
}

function redirect(path: string, cookies: readonly string[] = []): Response {
  const headers = new Headers({
    Location: new URL(path, canonicalOrigin()).href,
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
  });
  for (const value of cookies) headers.append('Set-Cookie', value);
  return new Response(null, { status: 302, headers });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !verifyOAuthState(request, state)) {
    return redirect('/#/settings?github=invalid-state', [clearOAuthCookie()]);
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return new Response('Connexion GitHub non configurée.', { status: 503 });

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  if (!tokenResponse.ok) return redirect('/#/settings?github=oauth-error', [clearOAuthCookie()]);
  const token = await tokenResponse.json() as OAuthTokenResponse;
  if (!token.access_token) return redirect('/#/settings?github=oauth-error', [clearOAuthCookie()]);

  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token.access_token}`,
      'User-Agent': 'La-Grange',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!userResponse.ok) return redirect('/#/settings?github=user-error', [clearOAuthCookie()]);
  const user = await userResponse.json() as GitHubUser;
  if (!user.login?.trim()) return redirect('/#/settings?github=user-error', [clearOAuthCookie()]);

  return redirect('/#/?github=connected', [
    clearOAuthCookie(),
    createSessionCookie(user.login.trim(), token.access_token),
  ]);
}
