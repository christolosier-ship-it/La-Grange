import { describe, expect, it } from 'vitest';
import type { Project } from '../projects/model';
import { DEFAULT_APP_PREFERENCES } from './app-preferences';
import { projectHiddenReason, selectVisibleProjects } from './project-visibility';

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

describe('project visibility preferences', () => {
  it('filters forks and archives without mutating the source inventory', () => {
    const projects = [
      project(1),
      project(2, { fork: true }),
      project(3, { archived: true, activityState: 'archived' }),
    ];
    const visible = selectVisibleProjects(projects, {
      ...DEFAULT_APP_PREFERENCES,
      hideForks: true,
      hideArchived: true,
    });

    expect(visible.map(({ id }) => id)).toEqual([1]);
    expect(projects).toHaveLength(3);
  });

  it('explains the effective hidden reason while preserving direct access', () => {
    expect(projectHiddenReason(project(2, { fork: true }), {
      hideForks: true,
      hideArchived: false,
    })).toBe('fork');
    expect(projectHiddenReason(project(3, { archived: true }), {
      hideForks: false,
      hideArchived: true,
    })).toBe('archived');
  });
});
