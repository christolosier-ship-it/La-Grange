export interface CatalogueState {
  readonly filter: string;
  readonly query: string;
}

export interface AppState {
  readonly catalogue: CatalogueState;
}

type Listener = (state: AppState) => void;

const INITIAL_STATE: AppState = { catalogue: { filter: 'all', query: '' } };

export function createStore(initialState: AppState = INITIAL_STATE) {
  let state = initialState;
  const listeners = new Set<Listener>();

  return {
    getState: (): AppState => state,
    setCatalogue: (catalogue: CatalogueState): void => {
      state = { ...state, catalogue };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener: Listener): (() => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export type AppStore = ReturnType<typeof createStore>;
