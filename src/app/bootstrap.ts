import { SYNC_REQUEST_EVENT } from './events';
import { createRouter } from './router';
import { createStore } from './store';
import { registerServiceWorker } from './service-worker';
import { createAppShell } from '../ui/layout/app-shell';
import { IndexedDbCache } from '../core/cache/indexed-db';
import { GitHubClient } from '../core/github/client';
import { loadOverrides } from '../core/projects/overrides';
import { SyncService } from '../core/sync/sync-service';

const GITHUB_USERNAME = 'christolosier-ship-it';

export function startApplication(root: HTMLElement | null): void {
  if (!root) throw new Error('Élément racine #app introuvable.');

  const store = createStore();
  const shell = createAppShell();
  root.replaceChildren(shell);

  const router = createRouter(shell, window, store);
  router.start();
  registerServiceWorker();

  const sync = new SyncService(
    GITHUB_USERNAME,
    new GitHubClient(),
    new IndexedDbCache(),
    () => loadOverrides(),
    (state) => {
      store.setSync(state);
    },
  );

  const synchronize = (force = false): void => {
    void sync.synchronize({ online: navigator.onLine, force });
  };

  window.addEventListener(SYNC_REQUEST_EVENT, () => {
    synchronize(true);
  });
  window.addEventListener('online', () => {
    synchronize(true);
  });
  window.addEventListener('offline', () => {
    synchronize(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') synchronize();
  });

  synchronize();
}
