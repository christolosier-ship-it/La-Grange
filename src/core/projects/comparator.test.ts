import { describe, expect, it } from 'vitest';
import type { Project } from './model';
import { compareProjects } from './comparator';

function project(repositoryName: string): Project {
  return {
    id: 1,
    repositoryName,
    slug: repositoryName,
    displayName: repositoryName,
    description: '',
    githubUrl: `https://github.com/example/${repositoryName}`,
    readmeUrl: `https://github.com/example/${repositoryName}#readme`,
    releasesUrl: `https://github.com/example/${repositoryName}/releases`,
    issuesUrl: `https://github.com/example/${repositoryName}/issues`,
    defaultBranch: 'main',
    topics: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-07-01T00:00:00Z',
    openIssuesCount: 0,
    archived: false,
    fork: false,
    category: 'uncategorized',
    activityState: 'active',
    featured: false,
    isNew: false,
  };
}

describe('compareProjects aliases', () => {
  it('keeps the former repository name as an alias after a rename', () => {
    const result = compareProjects(
      [project('Ancien-Nom')],
      [project('Nouveau-Nom')],
      'example',
      '2026-07-29T10:00:00Z',
    );

    expect(result.aliases).toEqual({ 'Ancien-Nom': 1 });
    expect(result.events).toContainEqual(expect.objectContaining({ type: 'renamed', projectId: 1 }));
  });

  it('removes stale aliases when their project disappears', () => {
    const result = compareProjects(
      [project('Nouveau-Nom')],
      [],
      'example',
      '2026-07-29T10:00:00Z',
      { 'Ancien-Nom': 1 },
    );

    expect(result.aliases).toEqual({});
  });
});
