import type { CatalogueView } from '../../features/catalogue/catalogue-model';

const STORAGE_KEY = 'la-grange-catalogue-preferences-v1';

export interface CataloguePreferences {
  readonly favoriteIds: readonly number[];
  readonly view: CatalogueView;
}

export const DEFAULT_CATALOGUE_PREFERENCES: CataloguePreferences = {
  favoriteIds: [],
  view: 'grid',
};

function isCatalogueView(value: unknown): value is CatalogueView {
  return value === 'grid' || value === 'list';
}

export function loadCataloguePreferences(
  storage: Pick<Storage, 'getItem'> = localStorage,
): CataloguePreferences {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CATALOGUE_PREFERENCES;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return DEFAULT_CATALOGUE_PREFERENCES;
    }

    const item = value as Record<string, unknown>;
    const favoriteIds = Array.isArray(item.favoriteIds)
      ? [...new Set(item.favoriteIds.filter((id): id is number => (
          typeof id === 'number' && Number.isInteger(id) && id > 0
        )))]
      : [];

    return {
      favoriteIds,
      view: isCatalogueView(item.view) ? item.view : DEFAULT_CATALOGUE_PREFERENCES.view,
    };
  } catch {
    return DEFAULT_CATALOGUE_PREFERENCES;
  }
}

export function saveCataloguePreferences(
  preferences: CataloguePreferences,
  storage: Pick<Storage, 'setItem'> = localStorage,
): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({
      favoriteIds: [...new Set(preferences.favoriteIds)].filter((id) => (
        Number.isInteger(id) && id > 0
      )),
      view: preferences.view,
    }));
  } catch {
    // Private browsing or a full quota must not block consultation.
  }
}
