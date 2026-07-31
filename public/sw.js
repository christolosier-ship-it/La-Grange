/* La Grange shell service worker: application data remains managed by IndexedDB. */
const CACHE_PREFIX = 'la-grange-';
const CACHE_NAME = `${CACHE_PREFIX}shell-v11`;
const SCOPE_URL = new URL(self.registration.scope);
const BASE_URL = SCOPE_URL.href;
const SHELL_URLS = [
  BASE_URL,
  new URL('manifest.webmanifest', BASE_URL).href,
  new URL('icons/icon.svg', BASE_URL).href,
  new URL('icons/icon-192.png', BASE_URL).href,
  new URL('icons/icon-512.png', BASE_URL).href,
  new URL('icons/maskable-512.png', BASE_URL).href,
  new URL('assets/phase-6/p6-a01-brand-sign-1600x720.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-a02-brand-sign-800x360.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-a03-brand-sign-mobile-960x560.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-a04-brand-mark.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-b01-background-workshop-2048x1152.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-b02-background-workshop-tablet-1366x1024.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-b03-background-workshop-tablet-1024x1366.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-b04-background-workshop-mobile-780x1386.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-b07-texture-wood-structure-1024x1024.webp', BASE_URL).href,
  new URL('assets/phase-6/p6-b12-light-main-1600x900.png', BASE_URL).href,
  new URL('assets/phase-6/p6-d01-icon-overview.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d02-icon-projects.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d03-icon-activity.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d04-icon-settings.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d05-icon-sync.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d21-icon-online.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d22-icon-offline.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d23-icon-sync-running.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d24-icon-success.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d25-icon-warning.svg', BASE_URL).href,
  new URL('assets/phase-6/p6-d26-icon-error.svg', BASE_URL).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(cacheApplicationShell());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const isScopedRequest = requestUrl.origin === SCOPE_URL.origin
    && requestUrl.pathname.startsWith(SCOPE_URL.pathname);

  if (event.request.method !== 'GET' || !isScopedRequest) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(event.request));
    return;
  }

  event.respondWith(cacheFirstAsset(event.request));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') void self.skipWaiting();
});

async function cacheApplicationShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(SHELL_URLS);

  const page = await cache.match(BASE_URL);
  if (!page) return;

  const html = await page.text();
  const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((path) => path && !path.startsWith('#'))
    .map((path) => {
      const url = new URL(path, BASE_URL);
      url.hash = '';
      return url;
    })
    .filter((url) => url.origin === SCOPE_URL.origin && url.pathname.startsWith(SCOPE_URL.pathname))
    .map((url) => url.href);

  await cache.addAll([...new Set(assetUrls)]);
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(BASE_URL, response.clone());
    }
    return response;
  } catch {
    const cachedPage = await caches.match(BASE_URL);
    return cachedPage ?? new Response('La Grange est indisponible hors ligne pour ce premier chargement.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function cacheFirstAsset(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}
