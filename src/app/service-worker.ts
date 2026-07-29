import { APP_VERSION } from './version';

export function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    const hadController = navigator.serviceWorker.controller !== null;
    if (hadController) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      }, { once: true });
    }

    const scriptUrl = `${import.meta.env.BASE_URL}sw.js?v=${encodeURIComponent(APP_VERSION)}`;
    void navigator.serviceWorker.register(scriptUrl, {
      scope: import.meta.env.BASE_URL,
      updateViaCache: 'none',
    }).then((registration) => {
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => {
          if (worker.state === 'installed' && hadController) {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
      void registration.update();
    }).catch(() => {
      // The application remains usable online if service-worker registration fails.
    });
  }, { once: true });
}
