import {
  INITIAL_ACTIVITY_STATE,
  type ActivityState,
} from '../core/activity/activity-service';
import type { ProjectDetailState } from '../core/details/project-detail-service';
import type { SyncState } from '../core/sync/sync-service';
import {
  DEFAULT_CATALOGUE_STATE,
  type CatalogueState,
} from '../features/catalogue/catalogue-model';

export interface AppState {
  readonly activity: ActivityState;
  readonly catalogue: CatalogueState;
  readonly favoriteIds: readonly number[];
  readonly projectDetails: Readonly<Record<number, ProjectDetailState>>;
  readonly sync: SyncState;
}

type Listener = (state: AppState) => void;

export const INITIAL_STATE: AppState = {
  activity: INITIAL_ACTIVITY_STATE,
  catalogue: DEFAULT_CATALOGUE_STATE,
  favoriteIds: [],
  projectDetails: {},
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
    toggleFavorite: (projectId: number): void => {
      const favorites = new Set(state.favoriteIds);
      if (favorites.has(projectId)) favorites.delete(projectId);
      else favorites.add(projectId);
      state = { ...state, favoriteIds: [...favorites].sort((left, right) => left - right) };
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
