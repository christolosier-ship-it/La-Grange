import {
  INITIAL_ACTIVITY_STATE,
  type ActivityState,
} from '../core/activity/activity-service';
import type { ProjectDetailState } from '../core/details/project-detail-service';
import {
  DEFAULT_APP_PREFERENCES,
  type AppPreferences,
} from '../core/preferences/app-preferences';
import {
  INITIAL_SETTINGS_STATE,
  type SettingsState,
} from '../core/settings/cache-maintenance';
import type { SyncState } from '../core/sync/sync-service';
import {
  DEFAULT_CATALOGUE_STATE,
  type CatalogueState,
} from '../features/catalogue/catalogue-model';

export interface AppState {
  readonly activity: ActivityState;
  readonly catalogue: CatalogueState;
  readonly favoriteIds: readonly number[];
  readonly preferences: AppPreferences;
  readonly projectDetails: Readonly<Record<number, ProjectDetailState>>;
  readonly settings: SettingsState;
  readonly sync: SyncState;
}

type Listener = (state: AppState) => void;

export const INITIAL_STATE: AppState = {
  activity: INITIAL_ACTIVITY_STATE,
  catalogue: DEFAULT_CATALOGUE_STATE,
  favoriteIds: DEFAULT_APP_PREFERENCES.favoriteIds,
  preferences: DEFAULT_APP_PREFERENCES,
  projectDetails: {},
  settings: INITIAL_SETTINGS_STATE,
  sync: { status: 'idle' },
};

export function createStore(initialState: AppState = INITIAL_STATE) {
  let state = initialState;
  const listeners = new Set<Listener>();

  const publish = (): void => {
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const updateFavorites = (favoriteIds: readonly number[]): void => {
    const normalized = [...new Set(favoriteIds)].filter((id) => (
      Number.isInteger(id) && id > 0
    )).sort((left, right) => left - right);
    state = {
      ...state,
      favoriteIds: normalized,
      preferences: { ...state.preferences, favoriteIds: normalized },
    };
  };

  return {
    getState: (): AppState => state,
    setActivity: (activity: ActivityState): void => {
      state = { ...state, activity };
      publish();
    },
    setCatalogue: (catalogue: CatalogueState, notify = true): void => {
      state = { ...state, catalogue };
      if (notify) publish();
    },
    setPreferences: (preferences: AppPreferences): void => {
      state = {
        ...state,
        preferences,
        favoriteIds: preferences.favoriteIds,
        catalogue: { ...state.catalogue, view: preferences.catalogueView },
      };
      publish();
    },
    setSettings: (settings: SettingsState): void => {
      state = { ...state, settings };
      publish();
    },
    setSync: (sync: SyncState): void => {
      state = { ...state, sync };
      publish();
    },
    setProjectDetail: (detail: ProjectDetailState): void => {
      state = {
        ...state,
        projectDetails: { ...state.projectDetails, [detail.projectId]: detail },
      };
      publish();
    },
    resetProfileState: (preserveSettings = false): void => {
      state = {
        ...state,
        activity: INITIAL_ACTIVITY_STATE,
        projectDetails: {},
        settings: preserveSettings ? state.settings : INITIAL_SETTINGS_STATE,
        sync: { status: 'idle' },
      };
      publish();
    },
    toggleFavorite: (projectId: number): void => {
      const favorites = new Set(state.favoriteIds);
      if (favorites.has(projectId)) favorites.delete(projectId);
      else favorites.add(projectId);
      updateFavorites([...favorites]);
      publish();
    },
    removeFavorite: (projectId: number): void => {
      updateFavorites(state.favoriteIds.filter((id) => id !== projectId));
      publish();
    },
    clearFavorites: (): void => {
      updateFavorites([]);
      publish();
    },
    subscribe: (listener: Listener): (() => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export type AppStore = ReturnType<typeof createStore>;
