import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_CATALOGUE_PREFERENCES,
  loadCataloguePreferences,
  saveCataloguePreferences,
} from './catalogue-preferences';

describe('catalogue preferences', () => {
  it('loads only valid favorite identifiers and a supported view', () => {
    const storage = {
      getItem: vi.fn().mockReturnValue(JSON.stringify({
        favoriteIds: [7, 3, 7, -1, 2.5, '4'],
        view: 'list',
      })),
    };

    expect(loadCataloguePreferences(storage)).toEqual({
      favoriteIds: [7, 3],
      view: 'list',
    });
  });

  it('falls back safely when stored data is invalid', () => {
    expect(loadCataloguePreferences({ getItem: () => 'not-json' }))
      .toEqual(DEFAULT_CATALOGUE_PREFERENCES);
    expect(loadCataloguePreferences({ getItem: () => JSON.stringify({ view: 'columns' }) }))
      .toEqual(DEFAULT_CATALOGUE_PREFERENCES);
  });

  it('writes a compact deduplicated preference payload', () => {
    const setItem = vi.fn();
    saveCataloguePreferences({ favoriteIds: [8, 8, 2, -1], view: 'grid' }, { setItem });

    expect(setItem).toHaveBeenCalledWith(
      'la-grange-catalogue-preferences-v1',
      JSON.stringify({ favoriteIds: [8, 2], view: 'grid' }),
    );
  });
});
