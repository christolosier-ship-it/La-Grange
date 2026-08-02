import { createSign } from 'node:crypto';

interface GitHubTokenResponse {
  readonly token: string;
  readonly expires_at: string;
}

let cachedToken: { readonly value: string; readonly expiresAt: number } | undefined;

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function base64url(value: string | Buffer): string {
  return Buffer.from(value).toString('base64url');
}

function appJwt(): string {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    iat: now - 30,
    exp: now + 8 * 60,
    iss: required('GITHUB_APP_ID'),
  }));
  const unsigned = `${header}.${payload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const privateKey = required('GITHUB_APP_PRIVATE_KEY').replace(/\\n/gu, '\n');
  return `${unsigned}.${signer.sign(privateKey).toString('base64url')}`;
}

async function installationToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - Date.now() > 60_000) return cachedToken.value;
  const installationId = required('GITHUB_APP_INSTALLATION_ID');
  const response = await fetch(`https://api.github.com/app/installations/${encodeURIComponent(installationId)}/access_tokens`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${appJwt()}`,
      'User-Agent': 'La-Grange-Phase-6B',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error(`GitHub installation token failed (${String(response.status)}).`);
  const data = await response.json() as Partial<GitHubTokenResponse>;
  if (!data.token || !data.expires_at) throw new Error('GitHub installation token response is invalid.');
  cachedToken = { value: data.token, expiresAt: Date.parse(data.expires_at) };
  return data.token;
}

export function targetRepository(): { readonly owner: string; readonly repo: string } {
  const owner = required('GITHUB_REPOSITORY_OWNER');
  const repo = required('GITHUB_REPOSITORY_NAME');
  if (repo !== 'La-Grange') throw new Error('The GitHub App target must be La-Grange.');
  return { owner, repo };
}

export async function githubRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await installationToken();
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/vnd.github+json');
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('User-Agent', 'La-Grange-Phase-6B');
  headers.set('X-GitHub-Api-Version', '2022-11-28');
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers,
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`GitHub API ${String(response.status)}: ${detail.slice(0, 300)}`);
  }
  return await response.json() as T;
}
