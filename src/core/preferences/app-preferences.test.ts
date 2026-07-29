import { describe, expect, it } from 'vitest';
import {
  DEFAULT_APP_PREFERENCES,
  effectiveReducedMotion,
  freshnessMilliseconds,
  loadAppPreferences,
  normalizeGitHubUsername,
  repairAppPreferences,
} from './app-preferences';

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

describe('application preferences', () => {
  it('migrates Phase 4 favorites and catalogue view without losing data', () => {
    const storage = new MemoryStorage();
    storage.setItem('la-grange-catalogue-preferences-v1', JSON.stringify({
      favoriteIds: [8, 3, 8, -1],
      view: 'list',
    }));

    const result = loadAppPreferences(storage);

    expect(result.migratedLegacy).toBe(true);
    expect(result.preferences.favoriteIds).toEqual([3, 8]);
    expect(result.preferences.catalogueView).toBe('list');
    expect(result.preferences.username).toBe('christolosier-ship-it');
    expect(storage.getItem('la-grange-catalogue-preferences-v1')).toBeNull();
    expect(storage.getItem('la-grange-preferences-v2')).not.toBeNull();
  });

  it('repairs invalid values independently instead of discarding valid choices', () => {
    const result = repairAppPreferences({
      schemaVersion: 1,
      username: ' Invalid--Name ',
      hideForks: true,
      hideArchived: 'yes',
      freshnessMinutes: 999,
      density: 'compact',
      reduceMotion: false,
      favoriteIds: [42, 42, 'bad'],
      catalogueView: 'list',
    });

    expect(result.preferences).toEqual({
      ...DEFAULT_APP_PREFERENCES,
      hideForks: true,
      density: 'compact',
      favoriteIds: [42],
      catalogueView: 'list',
    });
    expect(result.repairedFields).toEqual(expect.arrayContaining([
      'schemaVersion',
      'username',
      'hideArchived',
      'freshnessMinutes',
    ]));
    expect(result.repairedFields).not.toContain('hideForks');
    expect(result.repairedFields).not.toContain('density');
  });

  it('normalizes valid GitHub usernames and rejects malformed values', () => {
    expect(normalizeGitHubUsername(' ChristoLosier-Ship-It ')).toBe('christolosier-ship-it');
    expect(normalizeGitHubUsername('-invalid')).toBeUndefined();
    expect(normalizeGitHubUsername('invalid-')).toBeUndefined();
    expect(normalizeGitHubUsername('invalid--name')).toBeUndefined();
    expect(normalizeGitHubUsername('invalid name')).toBeUndefined();
  });

  it('uses bounded freshness values and never overrides system reduced motion', () => {
    expect(freshnessMilliseconds(15)).toBe(900_000);
    expect(effectiveReducedMotion(false, true)).toBe(true);
    expect(effectiveReducedMotion(true, false)).toBe(true);
    expect(effectiveReducedMotion(false, false)).toBe(false);
  });
});
