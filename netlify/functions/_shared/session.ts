import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = '__Host-lg_admin_session';
const OAUTH_COOKIE = '__Host-lg_oauth_state';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const OAUTH_DURATION_SECONDS = 10 * 60;

interface SessionPayload {
  readonly login: string;
  readonly exp: number;
}

function secret(): string {
  const value = process.env.LA_GRANGE_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('LA_GRANGE_SESSION_SECRET must contain at least 32 characters.');
  return value;
}

function encode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function sign(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

function secureEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function signed(value: string): string {
  return `${value}.${sign(value)}`;
}

function verifySigned(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const separator = value.lastIndexOf('.');
  if (separator < 1) return undefined;
  const body = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  return secureEqual(signature, sign(body)) ? body : undefined;
}

function cookies(request: Request): Record<string, string> {
  const result: Record<string, string> = {};
  for (const part of (request.headers.get('cookie') ?? '').split(';')) {
    const [rawName, ...rawValue] = part.trim().split('=');
    if (!rawName || rawValue.length === 0) continue;
    try {
      result[rawName] = decodeURIComponent(rawValue.join('='));
    } catch {
      continue;
    }
  }
  return result;
}

function cookie(name: string, value: string, maxAge: number): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${String(maxAge)}; HttpOnly; Secure; SameSite=Lax`;
}

export function createOAuthState(): { readonly state: string; readonly cookie: string } {
  const state = randomBytes(24).toString('base64url');
  return { state, cookie: cookie(OAUTH_COOKIE, signed(state), OAUTH_DURATION_SECONDS) };
}

export function verifyOAuthState(request: Request, state: string | null): boolean {
  if (!state) return false;
  const stored = verifySigned(cookies(request)[OAUTH_COOKIE]);
  return stored !== undefined && secureEqual(stored, state);
}

export function clearOAuthCookie(): string {
  return cookie(OAUTH_COOKIE, '', 0);
}

export function createSessionCookie(login: string): string {
  const payload: SessionPayload = {
    login,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  return cookie(SESSION_COOKIE, signed(encode(JSON.stringify(payload))), SESSION_DURATION_SECONDS);
}

export function clearSessionCookie(): string {
  return cookie(SESSION_COOKIE, '', 0);
}

export function readSession(request: Request): SessionPayload | undefined {
  const encoded = verifySigned(cookies(request)[SESSION_COOKIE]);
  if (!encoded) return undefined;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as Partial<SessionPayload>;
    if (typeof payload.login !== 'string' || !payload.login.trim()) return undefined;
    if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) return undefined;
    return { login: payload.login.trim(), exp: payload.exp };
  } catch {
    return undefined;
  }
}

export function allowedAdmin(login: string): boolean {
  const logins = (process.env.LA_GRANGE_ADMIN_LOGINS ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return logins.includes(login.trim().toLowerCase());
}

export function canonicalOrigin(): string {
  const configured = process.env.LA_GRANGE_PUBLIC_ORIGIN?.trim();
  if (!configured) throw new Error('LA_GRANGE_PUBLIC_ORIGIN is required.');
  const origin = new URL(configured);
  if (origin.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(origin.hostname)) {
    throw new Error('LA_GRANGE_PUBLIC_ORIGIN must use HTTPS.');
  }
  return origin.origin;
}

export function validWriteOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return origin === canonicalOrigin()
    && request.headers.get('x-la-grange-csrf') === '1';
}
