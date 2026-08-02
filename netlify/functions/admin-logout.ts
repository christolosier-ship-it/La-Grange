import { clearSessionCookie, validWriteOrigin } from './_shared/session';

export const config = { path: '/api/admin/logout' };

export default function handler(request: Request): Response {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  if (!validWriteOrigin(request)) return new Response('Forbidden', { status: 403 });
  return Response.json({ authenticated: false }, {
    headers: {
      'Set-Cookie': clearSessionCookie(),
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
