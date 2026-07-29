import { describe, expect, it } from 'vitest';
import type { Project } from '../../core/projects/model';
import { selectDashboard } from './dashboard-selectors';

function project(id: number, overrides: Partial<Project> = {}): Project {
  const repositoryName = `repo-${String(id)}`;
  return {
    id,
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
    updatedAt: `2026-07-${String(id).padStart(2, '0')}T00:00:00Z`,
    pushedAt: `2026-07-${String(id).padStart(2, '0')}T00:00:00Z`,
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

describe('selectDashboard', () => {
  it('computes only the four documented statistics', () => {
    const model = selectDashboard([
      project(1, { appUrl: 'https://example.com/one' }),
      project(2, { activityState: 'maintenance' }),
      project(3, { activityState: 'archived', archived: true, appUrl: 'https://example.com/three' }),
      project(4, { activityState: 'sleeping' }),
    ]);

    expect(model.statistics).toEqual({ total: 4, active: 1, launchable: 2, archived: 1 });
    expect(model.distribution).toEqual({ active: 1, maintenance: 1, sleeping: 1, archived: 1 });
  });

  it('highlights the newest arrival and avoids duplicate central cards', () => {
    const model = selectDashboard([
      project(1, { isNew: true, createdAt: '2026-07-01T00:00:00Z', appUrl: 'https://example.com/one' }),
      project(2, { isNew: true, createdAt: '2026-07-20T00:00:00Z' }),
      project(3, { appUrl: 'https://example.com/three' }),
      project(4, { activityState: 'maintenance', appUrl: 'https://example.com/four' }),
    ]);

    expect(model.newArrival?.id).toBe(2);
    const centralIds = [...model.workbench, ...model.readyToLaunch].map(({ id }) => id);
    expect(new Set(centralIds).size).toBe(centralIds.length);
    expect(centralIds).not.toContain(2);
  });

  it('orders recent activity by the latest known project date', () => {
    const model = selectDashboard([
      project(1, { pushedAt: '2026-01-01T00:00:00Z' }),
      project(2, { pushedAt: '2026-03-01T00:00:00Z' }),
      project(3, { pushedAt: undefined, updatedAt: '2026-02-01T00:00:00Z' }),
    ]);

    expect(model.recentActivity.map(({ id }) => id)).toEqual([2, 3, 1]);
  });

  it('returns stable empty sections when no project is available', () => {
    const model = selectDashboard([]);

    expect(model.statistics.total).toBe(0);
    expect(model.workbench).toEqual([]);
    expect(model.readyToLaunch).toEqual([]);
    expect(model.recentActivity).toEqual([]);
    expect(model.newArrival).toBeUndefined();
  });
});
