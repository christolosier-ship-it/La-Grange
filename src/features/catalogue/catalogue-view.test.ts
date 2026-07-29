import { afterEach, describe, expect, it, vi } from 'vitest';
import { INITIAL_STATE, type AppState } from '../../app/store';
import type { Project } from '../../core/projects/model';
import { renderCatalogue } from './catalogue-view';

function project(id: number, overrides: Partial<Project> = {}): Project {
  const name = `repo-${String(id)}`;
  return {
    id,
    repositoryName: name,
    slug: name,
    displayName: `Projet ${String(id)}`,
    description: `Description ${String(id)}`,
    githubUrl: `https://github.com/example/${name}`,
    readmeUrl: `https://github.com/example/${name}#readme`,
    releasesUrl: `https://github.com/example/${name}/releases`,
    issuesUrl: `https://github.com/example/${name}/issues`,
    defaultBranch: 'main',
    topics: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-07-01T00:00:00Z',
    pushedAt: '2026-07-01T00:00:00Z',
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

function state(projects: readonly Project[]): AppState {
  return {
    ...INITIAL_STATE,
    favoriteIds: [2],
    sync: {
      status: 'ready',
      snapshot: {
        schemaVersion: 1,
        username: 'example',
        projects,
        syncedAt: '2026-07-29T10:00:00Z',
      },
    },
  };
}

afterEach(() => {
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe('renderCatalogue', () => {
  it('filters instantly without an API request or a full view replacement', () => {
    const projects = [
      project(1, { displayName: 'Énergie Claire' }),
      project(2, { displayName: 'Luma' }),
    ];
    const onChange = vi.fn();
    const view = renderCatalogue(state(projects), { onCatalogueChange: onChange });
    document.body.append(view);
    const search = view.querySelector<HTMLInputElement>('#catalogue-search-field');
    expect(search).not.toBeNull();
    if (!search) throw new Error('Catalogue search field missing');

    search.value = 'energie';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    expect(view.querySelectorAll('.project-card')).toHaveLength(1);
    expect(view.querySelector('.project-card__title')?.textContent).toBe('Énergie Claire');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ query: 'energie' }));
    expect(document.activeElement).toBe(search);
  });

  it('combines favorite and state filters and exposes pressed states', () => {
    const view = renderCatalogue(state([
      project(1),
      project(2, { activityState: 'maintenance' }),
    ]));
    const favorite = view.querySelector<HTMLButtonElement>('[data-focus-key="catalogue-favorites"]');
    const maintenance = view.querySelector<HTMLButtonElement>('[data-focus-key="catalogue-state-maintenance"]');

    favorite?.click();
    maintenance?.click();

    expect(favorite?.getAttribute('aria-pressed')).toBe('true');
    expect(maintenance?.getAttribute('aria-pressed')).toBe('true');
    expect(view.querySelectorAll('.project-card')).toHaveLength(1);
    expect(view.querySelector('.project-card__title')?.textContent).toBe('Projet 2');
  });

  it('creates direct detail links carrying the full catalogue context', () => {
    const current = {
      ...INITIAL_STATE.catalogue,
      query: 'luma',
      states: ['active'] as const,
      view: 'list' as const,
    };
    const view = renderCatalogue({ ...state([project(1)]), catalogue: current });
    const link = view.querySelector<HTMLAnchorElement>('.project-card__title a');

    expect(link?.hash).toContain('#/project/repo-1?');
    expect(decodeURIComponent(link?.hash ?? '')).toContain('from=#/projects?q=luma&state=active&view=list');
    expect(view.querySelector('.catalogue-grid')?.classList).toContain('catalogue-grid--list');
  });

  it('shows a contextual empty state and resets filters', () => {
    const onChange = vi.fn();
    const view = renderCatalogue({
      ...state([project(1)]),
      catalogue: { ...INITIAL_STATE.catalogue, query: 'introuvable' },
    }, { onCatalogueChange: onChange });

    expect(view.textContent).toContain('Aucun projet ne correspond');
    view.querySelector<HTMLButtonElement>('.catalogue-empty button')?.click();
    expect(view.querySelectorAll('.project-card')).toHaveLength(1);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ query: '' }));
  });

  it('delegates favorite changes and flags app links offline', () => {
    const toggle = vi.fn();
    const offlineSnapshot = state([project(1, { appUrl: 'https://example.com/app' })]).sync.snapshot;
    const view = renderCatalogue({
      ...state([project(1, { appUrl: 'https://example.com/app' })]),
      sync: { status: 'offline', snapshot: offlineSnapshot },
    }, { onToggleFavorite: toggle });

    view.querySelector<HTMLButtonElement>('.project-card__favorite')?.click();
    expect(toggle).toHaveBeenCalledWith(1);
    expect(view.querySelector('.project-card__launch')?.textContent).toContain('connexion requise');
  });
});
