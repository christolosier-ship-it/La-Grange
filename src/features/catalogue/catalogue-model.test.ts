import { describe, expect, it } from 'vitest';
import type { Project } from '../../core/projects/model';
import {
  DEFAULT_CATALOGUE_STATE,
  catalogueHash,
  catalogueStateFromQuery,
  catalogueStateToQuery,
  selectCatalogueProjects,
} from './catalogue-model';

function project(id: number, overrides: Partial<Project> = {}): Project {
  const name = `repo-${String(id)}`;
  return {
    id,
    repositoryName: name,
    slug: name,
    displayName: name,
    description: '',
    githubUrl: `https://github.com/example/${name}`,
    readmeUrl: `https://github.com/example/${name}#readme`,
    releasesUrl: `https://github.com/example/${name}/releases`,
    issuesUrl: `https://github.com/example/${name}/issues`,
    defaultBranch: 'main',
    topics: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    pushedAt: '2026-01-01T00:00:00Z',
    openIssuesCount: 0,
    archived: false,
    fork: false,
    category: 'uncategorized',
    activityState: 'active',
    featured: false,
    isNew: false,
    ...overrides,
  };
}

const projects = [
  project(1, {
    displayName: 'Énergie Claire',
    description: 'Suivi des utilités',
    language: 'TypeScript',
    topics: ['pwa', 'énergie'],
    category: 'professional-tools',
    pushedAt: '2026-07-20T00:00:00Z',
  }),
  project(2, {
    displayName: 'Luma',
    description: 'Suivi de traitements',
    language: 'JavaScript',
    category: 'applications',
    activityState: 'maintenance',
    pushedAt: '2026-05-01T00:00:00Z',
  }),
  project(3, {
    displayName: 'Archive',
    language: 'TypeScript',
    category: 'experiments',
    activityState: 'archived',
    archived: true,
    pushedAt: '2024-01-01T00:00:00Z',
  }),
];

describe('catalogue model', () => {
  it('searches case-insensitively and accent-insensitively across multiple fields', () => {
    expect(selectCatalogueProjects(projects, {
      ...DEFAULT_CATALOGUE_STATE,
      query: 'ENERGIE',
    }, []).map(({ id }) => id)).toEqual([1]);

    expect(selectCatalogueProjects(projects, {
      ...DEFAULT_CATALOGUE_STATE,
      query: 'utilites',
    }, []).map(({ id }) => id)).toEqual([1]);

    expect(selectCatalogueProjects(projects, {
      ...DEFAULT_CATALOGUE_STATE,
      query: 'javascript',
    }, []).map(({ id }) => id)).toEqual([2]);
  });

  it('combines state, category, language and favorite filters', () => {
    const result = selectCatalogueProjects(projects, {
      ...DEFAULT_CATALOGUE_STATE,
      states: ['active', 'maintenance'],
      category: 'professional-tools',
      language: 'TypeScript',
      favoritesOnly: true,
    }, [1]);

    expect(result.map(({ id }) => id)).toEqual([1]);
  });

  it('sorts stably using a deterministic name and id fallback', () => {
    const sameName = [
      project(4, { displayName: 'Même nom', pushedAt: '2026-07-01T00:00:00Z' }),
      project(3, { displayName: 'Même nom', pushedAt: '2026-07-01T00:00:00Z' }),
    ];

    expect(selectCatalogueProjects(sameName, DEFAULT_CATALOGUE_STATE, []).map(({ id }) => id))
      .toEqual([3, 4]);
  });

  it('round-trips useful catalogue context through the hash query', () => {
    const state = {
      ...DEFAULT_CATALOGUE_STATE,
      query: 'luma',
      states: ['active', 'maintenance'] as const,
      category: 'applications' as const,
      language: 'TypeScript',
      favoritesOnly: true,
      sort: 'name-desc' as const,
      view: 'list' as const,
    };

    const query = catalogueStateToQuery(state);
    expect(catalogueStateFromQuery(query)).toEqual(state);
    expect(catalogueHash(state)).toContain('#/projects?');
  });

  it('rejects unknown query values and falls back safely', () => {
    const parsed = catalogueStateFromQuery(new URLSearchParams(
      'state=active,unknown&category=invalid&sort=wrong&view=wrong',
    ));

    expect(parsed.states).toEqual(['active']);
    expect(parsed.category).toBe('all');
    expect(parsed.sort).toBe(DEFAULT_CATALOGUE_STATE.sort);
    expect(parsed.view).toBe(DEFAULT_CATALOGUE_STATE.view);
  });
});
