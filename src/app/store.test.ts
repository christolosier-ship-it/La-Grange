import { describe, expect, it, vi } from 'vitest';
import { createStore } from './store';

describe('store', () => {
  it('updates catalogue state, notifies, and unsubscribes', () => {
    const store = createStore(); const listener = vi.fn(); const unsubscribe = store.subscribe(listener);
    store.setCatalogue({ filter: 'active', query: 'grange' });
    expect(store.getState().catalogue).toEqual({ filter: 'active', query: 'grange' });
    expect(listener).toHaveBeenCalledOnce(); unsubscribe();
    store.setCatalogue({ filter: 'all', query: '' }); expect(listener).toHaveBeenCalledOnce();
  });
});
