import { describe, expect, it } from 'vitest';
import { matchRoute } from '../../app/routes';
import { INITIAL_STATE } from '../../app/store';
import type { Project } from '../../core/projects/model';
import { renderProjectDetail } from './project-detail-view';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 42,
    repositoryName: 'La-Grange',
    slug: 'La-Grange',
    displayName: 'La Grange',
    description: 'Atelier',
    githubUrl: 'https://github.com/example/La-Grange',
    readmeUrl: 'https://github.com/example/La-Grange#readme',
    releasesUrl: 'https://github.com/example/La-Grange/releases',
    issuesUrl: 'https://github.com/example/La-Grange/issues',
    defaultBranch: 'main',
    topics: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-07-29T10:00:00Z',
    openIssuesCount: 0,
    archived: false,
    fork: false,
    category: 'applications',
    activityState: 'active',
    featured: false,
    isNew: false,
    ...overrides,
  };
}

describe('project detail visibility preferences', () => {
  it('keeps an archived project directly accessible and explains list hiding', () => {
    const archived = project({ archived: true, activityState: 'archived' });
    const view = renderProjectDetail(matchRoute('#/project/La-Grange'), {
      ...INITIAL_STATE,
      preferences: { ...INITIAL_STATE.preferences, hideArchived: true },
      sync: {
        status: 'ready',
        snapshot: {
          schemaVersion: 1,
          username: 'example',
          projects: [archived],
          syncedAt: '2026-07-29T10:00:00Z',
        },
      },
    });

    expect(view.querySelector('h1')?.textContent).toBe('La Grange');
    expect(view.textContent).toContain('Masquer les archives');
    expect(view.textContent).not.toContain('ne figure pas dans le dernier inventaire');
  });

  it('keeps a fork directly accessible and explains list hiding', () => {
    const fork = project({ fork: true });
    const view = renderProjectDetail(matchRoute('#/project/La-Grange'), {
      ...INITIAL_STATE,
      preferences: { ...INITIAL_STATE.preferences, hideForks: true },
      sync: {
        status: 'ready',
        snapshot: {
          schemaVersion: 1,
          username: 'example',
          projects: [fork],
          syncedAt: '2026-07-29T10:00:00Z',
        },
      },
    });

    expect(view.querySelector('h1')?.textContent).toBe('La Grange');
    expect(view.textContent).toContain('Masquer les forks');
  });
});
