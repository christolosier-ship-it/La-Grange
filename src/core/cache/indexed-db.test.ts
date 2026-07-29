import { describe, expect, it } from 'vitest';
import { activityKeysToPrune, isValidProjectDetails } from './indexed-db';

describe('IndexedDB activity retention', () => {
  it('keeps the newest keys inside the configured bound', () => {
    const keys = Array.from({ length: 505 }, (_, index) => index + 1);
    expect(activityKeysToPrune(keys, 500)).toEqual([1, 2, 3, 4, 5]);
    expect(activityKeysToPrune(keys.slice(0, 10), 500)).toEqual([]);
  });
});

describe('IndexedDB project detail validation', () => {
  const valid = {
    schemaVersion: 1,
    projectId: 42,
    repositoryName: 'La-Grange',
    fetchedAt: '2026-07-29T12:00:00Z',
    commits: [{
      sha: 'abc',
      message: 'Commit',
      authorName: 'Christo',
      committedAt: '2026-07-29T11:00:00Z',
      url: 'https://github.com/example/La-Grange/commit/abc',
    }],
    release: {
      name: 'Version 1',
      tagName: 'v1',
      publishedAt: '2026-07-29T10:00:00Z',
      url: 'https://github.com/example/La-Grange/releases/tag/v1',
    },
    readmeAvailable: true,
    readmeUrl: 'https://github.com/example/La-Grange/blob/main/README.md',
  };

  it('accepts a complete HTTPS record', () => {
    expect(isValidProjectDetails(valid)).toBe(true);
  });

  it('rejects invalid dates, unsafe URLs and inconsistent README state', () => {
    expect(isValidProjectDetails({ ...valid, fetchedAt: 'not-a-date' })).toBe(false);
    expect(isValidProjectDetails({
      ...valid,
      commits: [{ ...valid.commits[0], url: 'http://example.com/commit' }],
    })).toBe(false);
    expect(isValidProjectDetails({
      ...valid,
      readmeAvailable: true,
      readmeUrl: undefined,
    })).toBe(false);
  });
});
