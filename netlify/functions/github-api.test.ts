// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createSessionCookie } from './_shared/session';
import handler from './github-api';

const SECRET = 'test-secret-that-is-long-enough-for-la-grange';

function sessionCookie(): string {
  return createSessionCookie('christolosier-ship-it', 'gho_authenticated-token').split(';')[0] ?? '';
}

describe('GitHub authenticated proxy', () => {
  beforeEach(() => {
    process.env.LA_GRANGE_SESSION_SECRET = SECRET;
  });

  afterEach(() => {
    delete process.env.LA_GRANGE_SESSION_SECRET;
    vi.unstubAllGlobals();
  });

  it('requires a connected GitHub session', async () => {
    const response = await handler(new Request(
      'https://la-grange.test/api/github/users/christolosier-ship-it/repos',
    ));

    expect(response.status).toBe(401);
  });

  it('forwards only an allowed GitHub read with the encrypted session token', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]', {
      status: 200,
      headers: {
        'content-type': 'application/json',
        etag: 'repositories-v2',
        'x-ratelimit-remaining': '4999',
      },
    }));
    vi.stubGlobal('fetch', fetcher);
    const request = new Request(
      'https://la-grange.test/api/github/users/christolosier-ship-it/repos?sort=updated&direction=desc&per_page=100&type=owner',
      {
        headers: {
          cookie: sessionCookie(),
          'if-none-match': 'repositories-v1',
        },
      },
    );

    const response = await handler(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('etag')).toBe('repositories-v2');
    expect(response.headers.get('x-ratelimit-remaining')).toBe('4999');
    const [input, init] = fetcher.mock.calls[0] ?? [];
    expect(input).toBeInstanceOf(URL);
    if (!(input instanceof URL)) throw new Error('Expected the proxy to fetch a URL instance.');
    expect(input.href).toBe(
      'https://api.github.com/users/christolosier-ship-it/repos?sort=updated&direction=desc&per_page=100&type=owner',
    );
    const headers = new Headers(init?.headers);
    expect(headers.get('authorization')).toBe('Bearer gho_authenticated-token');
    expect(headers.get('if-none-match')).toBe('repositories-v1');
  });

  it('rejects routes outside the read-only allowlist', async () => {
    const fetcher = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetcher);
    const response = await handler(new Request(
      'https://la-grange.test/api/github/repos/christolosier-ship-it/La-Grange/issues',
      { headers: { cookie: sessionCookie() } },
    ));

    expect(response.status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
});
