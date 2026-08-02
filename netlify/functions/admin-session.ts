import { allowedAdmin, readSession } from './_shared/session';

export const config = { path: '/api/admin/session' };

export default function handler(request: Request): Response {
  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
  const session = readSession(request);
  return Response.json(
    session
      ? {
          authenticated: true,
          login: session.login,
          admin: allowedAdmin(session.login),
          githubAuthenticated: Boolean(session.githubToken),
        }
      : { authenticated: false },
    {
      status: session ? 200 : 401,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
        'X-Content-Type-Options': 'nosniff',
      },
    },
  );
}
