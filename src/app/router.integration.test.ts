import { afterEach, describe, expect, it } from 'vitest';
import type { Project, SyncSnapshot } from '../core/projects/model';
import { createRouter } from './router';
import { createStore } from './store';
import { createAppShell } from '../ui/layout/app-shell';

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

describe('router integration', () => {
  afterEach(() => {
    window.location.hash = '';
    document.body.replaceChildren();
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

  it('keeps the projects navigation active on a project detail route', () => {
    window.location.hash = '#/project/Luma';
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell);
    router.start();

    expect(shell.querySelector('h1')?.textContent).toBe('Luma');
    expect(document.title).toBe('Luma · La Grange');
    expect(shell.querySelector('[aria-current="page"]')?.textContent).toBe('Projets');
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

  it('renders real projects from the store and refreshes without stealing focus', () => {
    window.location.hash = '#/projects';
    const store = createStore();
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell, window, store);
    router.start();

    const focusTarget = document.createElement('button');
    shell.append(focusTarget);
    focusTarget.focus();
    store.setSync({ status: 'ready', snapshot });

    expect(shell.querySelector('.project-row h2')?.textContent).toBe('Luma');
    expect(shell.querySelector('[data-sync-panel]')?.textContent).toContain('1 projet(s)');
    expect(document.activeElement).toBe(focusTarget);
    router.stop();
  });
});
