// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createSessionCookie, readSession } from './session';

const SECRET = 'test-secret-that-is-long-enough-for-la-grange';

function requestWithCookie(setCookie: string): Request {
  const cookie = setCookie.split(';')[0] ?? '';
  return new Request('https://la-grange.test/', { headers: { cookie } });
}

describe('encrypted GitHub session', () => {
  beforeEach(() => {
    process.env.LA_GRANGE_SESSION_SECRET = SECRET;
  });

  afterEach(() => {
    delete process.env.LA_GRANGE_SESSION_SECRET;
  });

  it('round-trips the GitHub identity and token without exposing them in the cookie', () => {
    const setCookie = createSessionCookie('christolosier-ship-it', 'gho_super-secret-token');

    expect(setCookie).not.toContain('christolosier-ship-it');
    expect(setCookie).not.toContain('gho_super-secret-token');
    expect(setCookie).toContain('HttpOnly');
    expect(setCookie).toContain('Secure');

    expect(readSession(requestWithCookie(setCookie))).toMatchObject({
      login: 'christolosier-ship-it',
      githubToken: 'gho_super-secret-token',
    });
  });

  it('rejects a modified encrypted session', () => {
    const setCookie = createSessionCookie('christolosier-ship-it', 'gho_super-secret-token');
    const cookie = setCookie.split(';')[0] ?? '';
    const tampered = `${cookie.slice(0, -1)}${cookie.endsWith('a') ? 'b' : 'a'}`;
    const request = new Request('https://la-grange.test/', { headers: { cookie: tampered } });

    expect(readSession(request)).toBeUndefined();
  });
});
