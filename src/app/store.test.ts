import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_CATALOGUE_STATE } from '../features/catalogue/catalogue-model';
import { createStore } from './store';

describe('store', () => {
  it('updates catalogue state, supports silent context changes and unsubscribes', () => {
    const store = createStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    const catalogue = { ...DEFAULT_CATALOGUE_STATE, query: 'grange', states: ['active'] as const };

    store.setCatalogue(catalogue);
    expect(store.getState().catalogue).toEqual(catalogue);
    expect(listener).toHaveBeenCalledOnce();

    store.setCatalogue(DEFAULT_CATALOGUE_STATE, false);
    expect(store.getState().catalogue).toEqual(DEFAULT_CATALOGUE_STATE);
    expect(listener).toHaveBeenCalledOnce();

    unsubscribe();
    store.setCatalogue(catalogue);
    expect(listener).toHaveBeenCalledOnce();
  });

  it('publishes local activity state', () => {
    const store = createStore();
    const listener = vi.fn();
    store.subscribe(listener);
    const activity = {
      status: 'ready' as const,
      username: 'example',
      events: [{
        id: 1,
        username: 'example',
        projectId: 42,
        type: 'added' as const,
        occurredAt: '2026-07-29T10:00:00.000Z',
      }],
      invalidCount: 0,
    };

    store.setActivity(activity);

    expect(store.getState().activity).toEqual(activity);
    expect(listener).toHaveBeenCalledOnce();
  });

  it('toggles favorites deterministically', () => {
    const store = createStore();
    store.toggleFavorite(8);
    store.toggleFavorite(3);
    expect(store.getState().favoriteIds).toEqual([3, 8]);
    store.toggleFavorite(8);
    expect(store.getState().favoriteIds).toEqual([3]);
  });
});
