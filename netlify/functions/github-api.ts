import { readSession } from './_shared/session';

export const config = {
  path: '/api/github/*',
  method: 'GET',
};

const API_ORIGIN = 'https://api.github.com';
const PROXY_PREFIX = '/api/github';
const OWNER_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/iu;
const REPOSITORY_PATTERN = /^[a-z0-9._-]{1,100}$/iu;
const RESPONSE_HEADERS = [
  'content-type',
  'etag',
  'last-modified',
  'link',
  'retry-after',
  'x-ratelimit-limit',
  'x-ratelimit-remaining',
  'x-ratelimit-reset',
  'x-ratelimit-resource',
  'x-ratelimit-used',
] as const;

function errorResponse(status: number, message: string): Response {
  return Response.json({ message }, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function decodeSegment(value: string): string | undefined {
  try {
    return decodeURIComponent(value);
  } catch {
    return undefined;
  }
}

function validOwner(value: string | undefined): value is string {
  return Boolean(value) && OWNER_PATTERN.test(value ?? '');
}

function validRepository(value: string | undefined): value is string {
  return Boolean(value)
    && value !== '.'
    && value !== '..'
    && REPOSITORY_PATTERN.test(value ?? '');
}

function copyQuery(
  source: URLSearchParams,
  target: URLSearchParams,
  allowed: Readonly<Record<string, RegExp>>,
): boolean {
  for (const [key, value] of source) {
    const pattern = allowed[key];
    if (!pattern || !pattern.test(value)) return false;
    target.append(key, value);
  }
  return true;
}

function upstreamUrl(request: Request): URL | undefined {
  const incoming = new URL(request.url);
  if (!incoming.pathname.startsWith(`${PROXY_PREFIX}/`)) return undefined;
  const rawSegments = incoming.pathname
    .slice(PROXY_PREFIX.length + 1)
    .split('/')
    .filter(Boolean);
  const segments = rawSegments.map(decodeSegment);
  if (segments.some((segment) => segment === undefined)) return undefined;

  const upstream = new URL(API_ORIGIN);
  if (
    segments.length === 3
    && segments[0] === 'users'
    && validOwner(segments[1])
    && segments[2] === 'repos'
  ) {
    upstream.pathname = `/users/${encodeURIComponent(segments[1])}/repos`;
    const valid = copyQuery(incoming.searchParams, upstream.searchParams, {
      sort: /^(?:created|updated|pushed|full_name)$/u,
      direction: /^(?:asc|desc)$/u,
      per_page: /^(?:[1-9]|[1-9][0-9]|100)$/u,
      type: /^(?:all|owner|member)$/u,
      page: /^(?:[1-9]|[1-9][0-9]{1,2})$/u,
    });
    return valid ? upstream : undefined;
  }

  if (
    (segments.length === 4 || segments.length === 5)
    && segments[0] === 'repos'
    && validOwner(segments[1])
    && validRepository(segments[2])
  ) {
    const resource = segments.slice(3).join('/');
    if (!['commits', 'releases', 'releases/latest', 'readme'].includes(resource)) return undefined;
    upstream.pathname = [
      'repos',
      encodeURIComponent(segments[1]),
      encodeURIComponent(segments[2]),
      ...resource.split('/'),
    ].join('/');

    if (resource === 'commits' || resource === 'releases') {
      const valid = copyQuery(incoming.searchParams, upstream.searchParams, {
        per_page: /^(?:[1-9]|[1-9][0-9]|100)$/u,
        page: /^(?:[1-9]|[1-9][0-9]{1,2})$/u,
      });
      return valid ? upstream : undefined;
    }

    return incoming.searchParams.size === 0 ? upstream : undefined;
  }

  return undefined;
}

function responseHeaders(upstream: Response): Headers {
  const headers = new Headers({
    'Cache-Control': 'private, no-store',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff',
  });
  for (const name of RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') return errorResponse(405, 'Méthode non autorisée.');
  const session = readSession(request);
  if (!session?.githubToken) return errorResponse(401, 'Connexion GitHub requise.');
  const target = upstreamUrl(request);
  if (!target) return errorResponse(400, 'Route GitHub non autorisée.');

  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${session.githubToken}`,
    'User-Agent': 'La-Grange',
    'X-GitHub-Api-Version': '2022-11-28',
  });
  const etag = request.headers.get('if-none-match');
  if (etag) headers.set('If-None-Match', etag);

  try {
    const upstream = await fetch(target, {
      method: 'GET',
      headers,
      redirect: 'follow',
    });
    return new Response(upstream.status === 304 ? null : upstream.body, {
      status: upstream.status,
      headers: responseHeaders(upstream),
    });
  } catch {
    return errorResponse(502, 'GitHub est momentanément inaccessible.');
  }
}
