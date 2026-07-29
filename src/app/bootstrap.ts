import { ActivityService } from '../core/activity/activity-service';
import { IndexedDbCache } from '../core/cache/indexed-db';
import { ProjectDetailService } from '../core/details/project-detail-service';
import { GitHubClient } from '../core/github/client';
import { GitHubDetailClient } from '../core/github/detail-client';
import {
  loadCataloguePreferences,
  saveCataloguePreferences,
} from '../core/preferences/catalogue-preferences';
import { loadOverrides } from '../core/projects/overrides';
import { SyncService } from '../core/sync/sync-service';
import { catalogueHash, DEFAULT_CATALOGUE_STATE } from '../features/catalogue/catalogue-model';
import { createAppShell } from '../ui/layout/app-shell';
import { SYNC_REQUEST_EVENT } from './events';
import { createRouter } from './router';
import { createStore, INITIAL_STATE } from './store';
import { registerServiceWorker } from './service-worker';

const GITHUB_USERNAME = 'christolosier-ship-it';

export function startApplication(root: HTMLElement | null): void {
  if (!root) throw new Error('Élément racine #app introuvable.');

  const preferences = loadCataloguePreferences();
  const store = createStore({
    ...INITIAL_STATE,
    catalogue: { ...DEFAULT_CATALOGUE_STATE, view: preferences.view },
    favoriteIds: preferences.favoriteIds,
  });
  const shell = createAppShell();
  root.replaceChildren(shell);

  const cache = new IndexedDbCache();
  const activity = new ActivityService(cache, (state) => {
    store.setActivity(state);
  });
  const sync = new SyncService(
    GITHUB_USERNAME,
    new GitHubClient(),
    cache,
    () => loadOverrides(),
    (state) => {
      store.setSync(state);
    },
  );
  const details = new ProjectDetailService(
    GITHUB_USERNAME,
    new GitHubDetailClient(),
    cache,
    (state) => {
      store.setProjectDetail(state);
    },
  );

  const savePreferences = (): void => {
    const state = store.getState();
    saveCataloguePreferences({
      favoriteIds: state.favoriteIds,
      view: state.catalogue.view,
    });
  };

  const router = createRouter(shell, window, store, {
    onProjectOpened: async (repositoryName) => {
      await sync.acknowledgeProject(repositoryName);
    },
    onProjectRoute: async (project) => {
      await details.loadCached(project);
    },
    onProjectRouteLeave: (projectId) => {
      details.cancel(projectId);
    },
    onProjectDetailsRequest: (project, force) => {
      void details.refresh(project, { online: navigator.onLine, force });
    },
    onCatalogueChange: (catalogue) => {
      store.setCatalogue(catalogue, false);
      window.history.replaceState(null, '', catalogueHash(catalogue));
      savePreferences();
    },
    onToggleFavorite: (projectId) => {
      store.toggleFavorite(projectId);
      savePreferences();
    },
  });

  void activity.load(GITHUB_USERNAME);
  router.start();
  registerServiceWorker();

  const synchronize = (force = false): void => {
    void sync.synchronize({ online: navigator.onLine, force }).then(() => (
      activity.load(GITHUB_USERNAME)
    ));
  };

  window.addEventListener(SYNC_REQUEST_EVENT, () => {
    synchronize(true);
  });
  window.addEventListener('online', () => {
    synchronize(true);
  });
  window.addEventListener('offline', () => {
    details.cancel();
    synchronize(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') synchronize();
  });

  synchronize();
}
