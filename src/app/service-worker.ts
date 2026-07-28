export function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
    }).then((registration) => {
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdateNotice(worker);
        });
      });
    }).catch(() => {
      // The application remains usable online if service-worker registration fails.
    });
  }, { once: true });
}

function showUpdateNotice(worker: ServiceWorker): void {
  const notice = document.createElement('div');
  notice.className = 'update-notice';
  notice.setAttribute('role', 'status');
  notice.innerHTML = '<span>Une nouvelle version de l’atelier est prête.</span><button type="button">Recharger</button>';
  notice.querySelector('button')?.addEventListener('click', () => worker.postMessage({ type: 'SKIP_WAITING' }));
  document.body.append(notice);
  navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
}
