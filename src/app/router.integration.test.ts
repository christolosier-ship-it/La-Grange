import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Project, SyncSnapshot } from '../core/projects/model';
import { DEFAULT_CATALOGUE_STATE } from '../features/catalogue/catalogue-model';
import { createAppShell } from '../ui/layout/app-shell';
import { createRouter } from './router';
import { createStore, INITIAL_STATE } from './store';

const project: Project = {
  id: 1,
  repositoryName: 'Luma',
  slug: 'Luma',
  displayName: 'Luma',
  description: 'Suivi de traitements',
  githubUrl: 'https://github.com/example/Luma',
  appUrl: 'https://example.github.io/Luma/',
  readmeUrl: 'https://github.com/example/Luma#readme',
  releasesUrl: 'https://github.com/example/Luma/releases',
  issuesUrl: 'https://github.com/example/Luma/issues',
  language: 'TypeScript',
  defaultBranch: 'main',
  topics: ['pwa'],
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  pushedAt: '2026-01-01T00:00:00Z',
  openIssuesCount: 0,
  archived: false,
  fork: false,
  category: 'applications',
  activityState: 'active',
  featured: true,
  isNew: false,
};

const snapshot: SyncSnapshot = {
  schemaVersion: 1,
  username: 'example',
  projects: [project],
  syncedAt: '2026-01-01T00:00:00Z',
};

function storeWithSnapshot(value: SyncSnapshot = snapshot) {
  return createStore({
    ...INITIAL_STATE,
    sync: { status: 'ready', snapshot: value },
  });
}

describe('router integration', () => {
  afterEach(() => {
    window.location.hash = '';
    document.body.replaceChildren();
    vi.restoreAllMocks();
  });

  it('renders a direct route, updates title, navigation and focus', () => {
    window.location.hash = '#/activity';
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell);
    router.start();

    expect(shell.querySelector('h1')?.textContent).toBe('Activité récente');
    expect(document.title).toBe('Activité · La Grange');
    expect(shell.querySelector('[aria-current="page"]')?.textContent).toBe('Activité');
    expect(document.activeElement).toBe(shell.querySelector('h1'));
    router.stop();
  });

  it('supports direct project hashes and invokes route side effects once', () => {
    window.location.hash = '#/project/Luma';
    const store = storeWithSnapshot({
      ...snapshot,
      projects: [{ ...project, isNew: true }],
    });
    const opened = vi.fn().mockResolvedValue(undefined);
    const routed = vi.fn().mockResolvedValue(undefined);
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell, window, store, {
      onProjectOpened: opened,
      onProjectRoute: routed,
    });
    router.start();

    expect(shell.querySelector('h1')?.textContent).toBe('Luma');
    expect(document.title).toBe('Luma · La Grange');
    expect(shell.querySelector('[aria-current="page"]')?.textContent).toBe('Projets');
    expect(opened).toHaveBeenCalledOnce();
    expect(opened).toHaveBeenCalledWith('Luma');
    expect(routed).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));

    store.toggleFavorite(1);
    expect(opened).toHaveBeenCalledOnce();
    expect(routed).toHaveBeenCalledOnce();
    router.stop();
  });

  it('hydrates catalogue state from the hash and preserves the search focus on store updates', () => {
    window.location.hash = '#/projects?q=luma&state=active&view=list';
    const store = storeWithSnapshot();
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell, window, store);
    router.start();

    expect(store.getState().catalogue).toEqual({
      ...DEFAULT_CATALOGUE_STATE,
      query: 'luma',
      states: ['active'],
      view: 'list',
    });
    const search = shell.querySelector<HTMLInputElement>('#catalogue-search-field');
    search?.focus();
    search?.setSelectionRange(2, 2);
    store.toggleFavorite(1);

    const restored = shell.querySelector<HTMLInputElement>('#catalogue-search-field');
    expect(document.activeElement).toBe(restored);
    expect(restored?.selectionStart).toBe(2);
    router.stop();
  });

  it('redirects a renamed repository alias to the canonical project', () => {
    window.location.hash = '#/project/Ancien-Nom?from=%23%2Fprojects%3Fq%3Dluma';
    const store = storeWithSnapshot({ ...snapshot, aliases: { 'Ancien-Nom': 1 } });
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell, window, store);
    router.start();

    expect(window.location.hash).toContain('#/project/Luma?');
    expect(decodeURIComponent(window.location.hash)).toContain('renamedFrom=Ancien-Nom');
    expect(shell.querySelector('h1')?.textContent).toBe('Luma');
    router.stop();
  });

  it('renders an unknown route with a safe return action', () => {
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell);
    router.start();
    window.location.hash = '#/missing';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(shell.querySelector('h1')?.textContent).toBe('Cette porte ne mène nulle part');
    expect(document.title).toBe('Page introuvable · La Grange');
    expect(shell.querySelector<HTMLAnchorElement>('.return-link')?.hash).toBe('#/');
    router.stop();
  });

  it('renders catalogue projects when synchronization publishes a snapshot', () => {
    window.location.hash = '#/projects';
    const store = createStore();
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell, window, store);
    router.start();

    store.setSync({ status: 'ready', snapshot });

    expect(shell.querySelector('.project-card__title')?.textContent).toBe('Luma');
    expect(shell.querySelector('[data-sync-panel]')?.textContent).toContain('1 projet(s)');
    router.stop();
  });
});
