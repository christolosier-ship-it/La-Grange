import { ActivityService } from '../core/activity/activity-service';
import { IndexedDbCache } from '../core/cache/indexed-db';
import { ADMIN_SESSION_EVENT } from '../core/customization/admin-session';
import type { AdminSessionState } from '../core/customization/types';
import { ProjectDetailService } from '../core/details/project-detail-service';
import { GitHubClient } from '../core/github/client';
import { GitHubDetailClient } from '../core/github/detail-client';
import {
  freshnessMilliseconds,
  loadAppPreferences,
  saveAppPreferences,
  type AppPreferences,
} from '../core/preferences/app-preferences';
import {
  ProfileCoordinator,
  type ProfileSession,
} from '../core/profile/profile-coordinator';
import { loadOverrides } from '../core/projects/overrides';
import { CacheMaintenanceService } from '../core/settings/cache-maintenance';
import { IndexedDbMaintenance } from '../core/settings/indexed-db-maintenance';
import { SyncService } from '../core/sync/sync-service';
import { catalogueHash, DEFAULT_CATALOGUE_STATE } from '../features/catalogue/catalogue-model';
import { createAppShell } from '../ui/layout/app-shell';
import { createDisplayPreferenceController } from '../ui/preferences/display-preferences';
import { SYNC_REQUEST_EVENT } from './events';
import { createRouter } from './router';
import { createStore, INITIAL_STATE } from './store';
import { registerServiceWorker } from './service-worker';

export function startApplication(root: HTMLElement | null): void {
  if (!root) throw new Error('Élément racine #app introuvable.');

  const loaded = loadAppPreferences();
  const preferences = loaded.preferences;
  const store = createStore({
    ...INITIAL_STATE,
    preferences,
    catalogue: { ...DEFAULT_CATALOGUE_STATE, view: preferences.catalogueView },
    favoriteIds: preferences.favoriteIds,
  });
  const display = createDisplayPreferenceController();
  display.apply(preferences);
  const shell = createAppShell();
  root.replaceChildren(shell);

  const cache = new IndexedDbCache();
  const maintenance = new CacheMaintenanceService(
    new IndexedDbMaintenance(),
    (state) => {
      store.setSettings(state);
    },
  );

  const coordinatorRef: { current?: ProfileCoordinator } = {};
  const createSession = (
    username: string,
    freshnessMs: number,
    generation: number,
  ): ProfileSession => {
    const isCurrent = (): boolean => (
      coordinatorRef.current?.isCurrentGeneration(generation) ?? generation === 0
    );
    const activity = new ActivityService(cache, (state) => {
      if (isCurrent()) store.setActivity(state);
    });
    const sync = new SyncService(
      username,
      new GitHubClient(),
      cache,
      () => loadOverrides(),
      (state) => {
        if (isCurrent()) store.setSync(state);
      },
      undefined,
      freshnessMs,
      isCurrent,
    );
    const details = new ProjectDetailService(
      username,
      new GitHubDetailClient(),
      cache,
      (state) => {
        if (isCurrent()) store.setProjectDetail(state);
      },
    );
    return { username, activity, sync, details };
  };

  const coordinator = new ProfileCoordinator(
    preferences.username,
    freshnessMilliseconds(preferences.freshnessMinutes),
    createSession,
    {
      beforeProfileChange: () => {
        store.resetProfileState();
      },
      afterSynchronization: async (username) => {
        await maintenance.inspect(username);
      },
    },
  );
  coordinatorRef.current = coordinator;

  const persistPreferences = (next: AppPreferences): void => {
    saveAppPreferences(next);
    store.setPreferences(next);
    display.apply(next);
  };

  const router = createRouter(shell, window, store, {
    onProjectOpened: async (repositoryName) => {
      await coordinator.acknowledgeProject(repositoryName);
    },
    onProjectRoute: async (project) => {
      await coordinator.loadProjectDetails(project);
    },
    onProjectRouteLeave: (projectId) => {
      coordinator.cancelProjectDetails(projectId);
    },
    onProjectDetailsRequest: (project, force) => {
      void coordinator.refreshProjectDetails(project, { online: navigator.onLine, force });
    },
    onCatalogueChange: (catalogue) => {
      store.setCatalogue(catalogue, false);
      window.history.replaceState(null, '', catalogueHash(catalogue));
      persistPreferences({
        ...store.getState().preferences,
        catalogueView: catalogue.view,
      });
    },
    onToggleFavorite: (projectId) => {
      store.toggleFavorite(projectId);
      saveAppPreferences(store.getState().preferences);
    },
    onRemoveFavorite: (projectId) => {
      store.removeFavorite(projectId);
      saveAppPreferences(store.getState().preferences);
    },
    onClearFavorites: () => {
      store.clearFavorites();
      saveAppPreferences(store.getState().preferences);
    },
    onPreferencesChange: (next) => {
      const previous = store.getState().preferences;
      persistPreferences(next);
      if (next.freshnessMinutes !== previous.freshnessMinutes) {
        void coordinator.updateFreshness(
          freshnessMilliseconds(next.freshnessMinutes),
          navigator.onLine,
        );
      }
    },
    onProfileChange: async (username) => {
      const previous = store.getState().preferences;
      const next = { ...previous, username };
      persistPreferences(next);
      const result = await coordinator.switchProfile(
        username,
        freshnessMilliseconds(next.freshnessMinutes),
        navigator.onLine,
      );
      if (!result.snapshot) {
        const failure = result.error ?? new Error(
          result.status === 'offline'
            ? 'Aucun cache local disponible pour ce profil hors ligne.'
            : 'Profile synchronization failed',
        );
        persistPreferences(previous);
        await coordinator.switchProfile(
          previous.username,
          freshnessMilliseconds(previous.freshnessMinutes),
          navigator.onLine,
        );
        await maintenance.inspect(previous.username);
        throw failure;
      }
    },
    onResetCache: async () => {
      const current = store.getState().preferences;
      coordinator.cancelCurrent();
      await maintenance.reset(current.username);
      coordinator.resetCurrent(freshnessMilliseconds(current.freshnessMinutes));
      store.resetProfileState(true);
    },
    onRefreshCacheInfo: async () => {
      await maintenance.inspect(store.getState().preferences.username);
    },
  });

  router.start();
  registerServiceWorker();
  void maintenance.inspect(preferences.username);
  void coordinator.start(navigator.onLine);

  const synchronize = (force = false): void => {
    void coordinator.synchronize({ online: navigator.onLine, force });
  };

  window.addEventListener(ADMIN_SESSION_EVENT, (event) => {
    const state = (event as CustomEvent<AdminSessionState>).detail;
    if (state.status === 'authenticated') synchronize(true);
  });
  window.addEventListener(SYNC_REQUEST_EVENT, () => {
    synchronize(true);
  });
  window.addEventListener('online', () => {
    synchronize(true);
  });
  window.addEventListener('offline', () => {
    coordinator.cancelProjectDetails();
    synchronize(true);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') synchronize();
  });
}
