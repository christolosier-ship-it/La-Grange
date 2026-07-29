import type { CatalogueView } from '../../features/catalogue/catalogue-model';

const STORAGE_KEY = 'la-grange-preferences-v2';
const LEGACY_STORAGE_KEY = 'la-grange-catalogue-preferences-v1';
const SCHEMA_VERSION = 2;

export const DEFAULT_GITHUB_USERNAME = 'christolosier-ship-it';
export const FRESHNESS_OPTIONS = [5, 15, 30, 60] as const;

export type FreshnessMinutes = typeof FRESHNESS_OPTIONS[number];
export type InterfaceDensity = 'comfortable' | 'compact';

export interface AppPreferences {
  readonly schemaVersion: 2;
  readonly username: string;
  readonly hideForks: boolean;
  readonly hideArchived: boolean;
  readonly freshnessMinutes: FreshnessMinutes;
  readonly density: InterfaceDensity;
  readonly reduceMotion: boolean;
  readonly favoriteIds: readonly number[];
  readonly catalogueView: CatalogueView;
}

export interface PreferencesLoadResult {
  readonly preferences: AppPreferences;
  readonly repairedFields: readonly string[];
  readonly migratedLegacy: boolean;
}

type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export const DEFAULT_APP_PREFERENCES: AppPreferences = {
  schemaVersion: SCHEMA_VERSION,
  username: DEFAULT_GITHUB_USERNAME,
  hideForks: false,
  hideArchived: false,
  freshnessMinutes: 15,
  density: 'comfortable',
  reduceMotion: false,
  favoriteIds: [],
  catalogueView: 'grid',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function uniqueFavoriteIds(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is number => (
    typeof id === 'number' && Number.isInteger(id) && id > 0
  )))].sort((left, right) => left - right);
}

function isCatalogueView(value: unknown): value is CatalogueView {
  return value === 'grid' || value === 'list';
}

function isDensity(value: unknown): value is InterfaceDensity {
  return value === 'comfortable' || value === 'compact';
}

function isFreshness(value: unknown): value is FreshnessMinutes {
  return typeof value === 'number'
    && FRESHNESS_OPTIONS.includes(value as FreshnessMinutes);
}

export function normalizeGitHubUsername(value: string): string | undefined {
  const username = value.trim().toLowerCase();
  if (username.length === 0 || username.length > 39) return undefined;
  if (username.startsWith('-') || username.endsWith('-') || username.includes('--')) return undefined;
  return /^[a-z0-9-]+$/u.test(username) ? username : undefined;
}

export function repairAppPreferences(value: unknown): PreferencesLoadResult {
  const source = isRecord(value) ? value : {};
  const repairedFields: string[] = [];
  const username = typeof source.username === 'string'
    ? normalizeGitHubUsername(source.username)
    : undefined;
  if (!username) repairedFields.push('username');
  if (source.schemaVersion !== SCHEMA_VERSION) repairedFields.push('schemaVersion');
  if (typeof source.hideForks !== 'boolean') repairedFields.push('hideForks');
  if (typeof source.hideArchived !== 'boolean') repairedFields.push('hideArchived');
  if (!isFreshness(source.freshnessMinutes)) repairedFields.push('freshnessMinutes');
  if (!isDensity(source.density)) repairedFields.push('density');
  if (typeof source.reduceMotion !== 'boolean') repairedFields.push('reduceMotion');
  if (!Array.isArray(source.favoriteIds)) repairedFields.push('favoriteIds');
  if (!isCatalogueView(source.catalogueView)) repairedFields.push('catalogueView');

  return {
    preferences: {
      schemaVersion: SCHEMA_VERSION,
      username: username ?? DEFAULT_APP_PREFERENCES.username,
      hideForks: typeof source.hideForks === 'boolean'
        ? source.hideForks
        : DEFAULT_APP_PREFERENCES.hideForks,
      hideArchived: typeof source.hideArchived === 'boolean'
        ? source.hideArchived
        : DEFAULT_APP_PREFERENCES.hideArchived,
      freshnessMinutes: isFreshness(source.freshnessMinutes)
        ? source.freshnessMinutes
        : DEFAULT_APP_PREFERENCES.freshnessMinutes,
      density: isDensity(source.density)
        ? source.density
        : DEFAULT_APP_PREFERENCES.density,
      reduceMotion: typeof source.reduceMotion === 'boolean'
        ? source.reduceMotion
        : DEFAULT_APP_PREFERENCES.reduceMotion,
      favoriteIds: uniqueFavoriteIds(source.favoriteIds),
      catalogueView: isCatalogueView(source.catalogueView)
        ? source.catalogueView
        : DEFAULT_APP_PREFERENCES.catalogueView,
    },
    repairedFields,
    migratedLegacy: false,
  };
}

function parseStored(raw: string | null): unknown {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}

function migrateLegacy(value: unknown): AppPreferences {
  const legacy = isRecord(value) ? value : {};
  return {
    ...DEFAULT_APP_PREFERENCES,
    favoriteIds: uniqueFavoriteIds(legacy.favoriteIds),
    catalogueView: isCatalogueView(legacy.view)
      ? legacy.view
      : DEFAULT_APP_PREFERENCES.catalogueView,
  };
}

export function saveAppPreferences(
  preferences: AppPreferences,
  storage: Pick<Storage, 'setItem'> = localStorage,
): void {
  const repaired = repairAppPreferences(preferences).preferences;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(repaired));
  } catch {
    // Private browsing or a full quota must not block consultation.
  }
}

export function loadAppPreferences(
  storage: PreferenceStorage = localStorage,
): PreferencesLoadResult {
  const currentRaw = storage.getItem(STORAGE_KEY);
  if (currentRaw) {
    const result = repairAppPreferences(parseStored(currentRaw));
    if (result.repairedFields.length > 0) saveAppPreferences(result.preferences, storage);
    return result;
  }

  const legacyRaw = storage.getItem(LEGACY_STORAGE_KEY);
  if (legacyRaw) {
    const preferences = migrateLegacy(parseStored(legacyRaw));
    saveAppPreferences(preferences, storage);
    try {
      storage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // The migrated preferences remain usable even if legacy cleanup fails.
    }
    return { preferences, repairedFields: [], migratedLegacy: true };
  }

  return {
    preferences: DEFAULT_APP_PREFERENCES,
    repairedFields: [],
    migratedLegacy: false,
  };
}

export function freshnessMilliseconds(minutes: FreshnessMinutes): number {
  return minutes * 60 * 1_000;
}

export function effectiveReducedMotion(
  userPreference: boolean,
  systemPreference: boolean,
): boolean {
  return userPreference || systemPreference;
}
