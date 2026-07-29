import { afterEach, describe, expect, it, vi } from 'vitest';
import { SYNC_REQUEST_EVENT } from '../../app/events';
import type { AppState } from '../../app/store';
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
  return { catalogue: { filter: 'all', query: '' }, sync: { status, snapshot } };
}

afterEach(() => {
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe('renderDashboard', () => {
  it('renders documented statistics and real project sections', () => {
    const view = renderDashboard(state([
      project(1, { appUrl: 'https://example.com/one' }),
      project(2, { activityState: 'maintenance', appUrl: 'https://example.com/two' }),
      project(3, { activityState: 'archived', archived: true }),
    ]));
    document.body.append(view);

    const stats = [...view.querySelectorAll('.stat-card strong')].map((element) => element.textContent);
    expect(stats).toEqual(['3', '1', '2', '1']);
    expect(view.querySelector('h1')?.textContent).toBe('L’atelier en un coup d’œil');
    expect(view.textContent).toContain('L’établi');
    expect(view.textContent).toContain('Prêts à partir');
    expect(view.textContent).toContain('Répartition');
  });

  it('makes a new repository immediately identifiable', () => {
    const view = renderDashboard(state([
      project(1),
      project(2, { isNew: true, displayName: 'Nouvelle caisse' }),
    ]));

    const arrival = view.querySelector('.rail-panel--arrival');
    expect(arrival?.textContent).toContain('Nouvelle caisse');
    expect(arrival?.textContent).toContain('Nouvelle arrivée');
  });

  it('keeps cached data visible while offline', () => {
    const view = renderDashboard(state([project(1)], 'offline'));

    expect(view.querySelector('.dashboard-feedback')?.textContent).toContain('réserves');
    expect(view.querySelectorAll('.project-card')).not.toHaveLength(0);
  });

  it('shows a useful first-load error with a retry action', () => {
    const view = renderDashboard({
      catalogue: { filter: 'all', query: '' },
      sync: { status: 'error', error: new Error('API indisponible') },
    });

    expect(view.querySelector('[role="alert"]')?.textContent).toContain('API indisponible');
    expect(view.querySelector<HTMLButtonElement>('.sync-button')).not.toBeNull();
    expect(view.querySelectorAll('.project-card')).toHaveLength(0);
  });

  it('dispatches the shared synchronization request event', () => {
    const listener = vi.fn();
    window.addEventListener(SYNC_REQUEST_EVENT, listener, { once: true });
    const view = renderDashboard(state([project(1)]));
    view.querySelector<HTMLButtonElement>('.sync-button')?.click();

    expect(listener).toHaveBeenCalledOnce();
  });

  it('treats empty sections without inventing content', () => {
    const view = renderDashboard(state([]));

    expect(view.querySelectorAll('.stat-card strong')[0]?.textContent).toBe('0');
    expect(view.textContent).toContain('Aucun projet actif');
    expect(view.textContent).toContain('Aucune nouvelle caisse');
  });
});
