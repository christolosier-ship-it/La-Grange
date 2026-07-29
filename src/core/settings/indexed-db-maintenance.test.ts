import { describe, expect, it } from 'vitest';
import type { SyncSnapshot } from '../projects/model';
import { profileProjectIds } from './indexed-db-maintenance';

const snapshot: SyncSnapshot = {
  schemaVersion: 1,
  username: 'active-user',
  projects: [
    {
      id: 42,
      repositoryName: 'La-Grange',
      slug: 'La-Grange',
      displayName: 'La Grange',
      description: '',
      githubUrl: 'https://github.com/example/La-Grange',
      readmeUrl: 'https://github.com/example/La-Grange#readme',
      releasesUrl: 'https://github.com/example/La-Grange/releases',
      issuesUrl: 'https://github.com/example/La-Grange/issues',
      defaultBranch: 'main',
      topics: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
      openIssuesCount: 0,
      archived: false,
      fork: false,
      category: 'applications',
      activityState: 'active',
      featured: true,
      isNew: false,
    },
    {
      id: 7,
      repositoryName: 'Luma',
      slug: 'Luma',
      displayName: 'Luma',
      description: '',
      githubUrl: 'https://github.com/example/Luma',
      readmeUrl: 'https://github.com/example/Luma#readme',
      releasesUrl: 'https://github.com/example/Luma/releases',
      issuesUrl: 'https://github.com/example/Luma/issues',
      defaultBranch: 'main',
      topics: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
      openIssuesCount: 0,
      archived: false,
      fork: false,
      category: 'applications',
      activityState: 'active',
      featured: false,
      isNew: false,
    },
  ],
  syncedAt: '2026-07-29T14:00:00Z',
};

describe('profile cache reset plan', () => {
  it('returns only stable project ids from the selected profile snapshot', () => {
    expect(profileProjectIds(snapshot)).toEqual([7, 42]);
    expect(profileProjectIds(undefined)).toEqual([]);
  });
});
