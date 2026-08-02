import { afterEach, describe, expect, it, vi } from 'vitest';
import { INITIAL_STATE, type AppState } from '../../app/store';
import type { Project, SyncSnapshot } from '../../core/projects/model';
import { renderDashboard } from './dashboard-view';

function project(id: number, overrides: Partial<Project> = {}): Project {
  const repositoryName = `repo-${String(id)}`;
  return {
    id,
    repositoryName,
    slug: repositoryName,
    displayName: `Projet ${String(id)}`,
    description: `Description ${String(id)}`,
    githubUrl: `https://github.com/example/${repositoryName}`,
    readmeUrl: `https://github.com/example/${repositoryName}#readme`,
    releasesUrl: `https://github.com/example/${repositoryName}/releases`,
    issuesUrl: `https://github.com/example/${repositoryName}/issues`,
    defaultBranch: 'main',
    topics: [],
    createdAt: `2026-07-${String(id).padStart(2, '0')}T00:00:00Z`,
    updatedAt: `2026-07-${String(id).padStart(2, '0')}T00:00:00Z`,
    pushedAt: `2026-07-${String(id).padStart(2, '0')}T00:00:00Z`,
    openIssuesCount: 0,
    archived: false,
    fork: false,
    category: 'uncategorized',
    activityState: 'active',
    style: 'uncategorized',
    colors: { primary: '#6d573f', secondary: '#c3aa86', progress: '#91714d' },
    featured: false,
    isNew: false,
    ...overrides,
  };
}

function state(projects: readonly Project[], status: AppState['sync']['status'] = 'ready'): AppState {
  const snapshot: SyncSnapshot = {
    schemaVersion: 1,
    username: 'example',
    projects,
    syncedAt: '2026-07-29T08:00:00Z',
  };
  return { ...INITIAL_STATE, sync: { status, snapshot } };
}

afterEach(() => {
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe('renderDashboard', () => {
  it('renders one statistics beam and one continuous project grid', () => {
    const view = renderDashboard(state([
      project(1, { appUrl: 'https://example.com/one' }),
      project(2, { activityState: 'maintenance', appUrl: 'https://example.com/two' }),
      project(3, { activityState: 'archived', archived: true }),
    ]));
    document.body.append(view);

    const stats = [...view.querySelectorAll('.stat-card strong')].map((element) => element.textContent);
    expect(stats).toEqual(['3', '1', '2', '1']);
    expect(view.querySelector('h1')?.textContent).toBe('L’atelier en un coup d’œil');
    expect(view.querySelector('h1')?.classList.contains('visually-hidden')).toBe(true);
    expect(view.querySelector('.dashboard-stats')).not.toBeNull();
    expect(view.querySelectorAll('.dashboard-project-grid .project-card')).toHaveLength(3);
    expect(view.querySelector('.dashboard-section')).toBeNull();
    expect(view.querySelector('.dashboard-rail')).toBeNull();
    expect(view.textContent).not.toContain('L’établi');
    expect(view.textContent).not.toContain('Prêts à partir');
  });

  it('keeps cached cards visible and marks external actions while offline', () => {
    const view = renderDashboard(state([
      project(1, { appUrl: 'https://example.com/one' }),
    ], 'offline'));

    expect(view.querySelector('.dashboard-feedback')?.textContent).toContain('réserves');
    expect(view.querySelectorAll('.project-card')).toHaveLength(1);
    expect(view.querySelector('.project-card__action.requires-connection')?.getAttribute('aria-label'))
      .toContain('connexion requise');
  });

  it('shows a useful first-load error without duplicating the lateral refresh action', () => {
    const view = renderDashboard({
      ...INITIAL_STATE,
      sync: { status: 'error', error: new Error('API indisponible') },
    });

    expect(view.querySelector('[role="alert"]')?.textContent).toContain('API indisponible');
    expect(view.querySelector<HTMLButtonElement>('.sync-button')).toBeNull();
    expect(view.querySelectorAll('.project-card')).toHaveLength(0);
  });

  it('does not render the synchronization action inside the dashboard content', () => {
    const view = renderDashboard(state([project(1)]));
    expect(view.querySelector<HTMLButtonElement>('.sync-button')).toBeNull();
  });

  it('renders a direct empty state without inventing sections', () => {
    const view = renderDashboard(state([]));

    expect(view.querySelectorAll('.stat-card strong')[0]?.textContent).toBe('0');
    expect(view.textContent).toContain('Aucun projet visible');
    expect(view.querySelector('.dashboard-project-grid')).toBeNull();
  });
});
