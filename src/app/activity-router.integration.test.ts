import { afterEach, describe, expect, it } from 'vitest';
import type { Project, SyncSnapshot } from '../core/projects/model';
import { createAppShell } from '../ui/layout/app-shell';
import { createRouter } from './router';
import { createStore, INITIAL_STATE } from './store';

const project: Project = {
  id: 42,
  repositoryName: 'La-Grange',
  slug: 'La-Grange',
  displayName: 'La Grange',
  description: 'Atelier de projets',
  githubUrl: 'https://github.com/example/La-Grange',
  readmeUrl: 'https://github.com/example/La-Grange#readme',
  releasesUrl: 'https://github.com/example/La-Grange/releases',
  issuesUrl: 'https://github.com/example/La-Grange/issues',
  defaultBranch: 'main',
  topics: [],
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-07-29T10:00:00Z',
  pushedAt: '2026-07-29T10:00:00Z',
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
  syncedAt: '2026-07-29T10:00:00Z',
};

afterEach(() => {
  window.location.hash = '';
  document.body.replaceChildren();
});

describe('activity route integration', () => {
  it('opens the current canonical project from a local activity event', () => {
    window.location.hash = '#/activity';
    const store = createStore({
      ...INITIAL_STATE,
      activity: {
        status: 'ready',
        username: 'example',
        events: [{
          id: 1,
          username: 'example',
          projectId: 42,
          type: 'renamed',
          occurredAt: '2026-07-29T10:00:00.000Z',
          detail: 'Ancien-Nom → La-Grange',
        }],
        invalidCount: 0,
      },
      sync: { status: 'ready', snapshot },
    });
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell, window, store);
    router.start();

    const projectLink = shell.querySelector<HTMLAnchorElement>('.activity-event h4 a');
    expect(projectLink?.hash).toBe('#/project/La-Grange');

    window.location.hash = projectLink?.hash ?? '#/missing';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(shell.querySelector('h1')?.textContent).toBe('La Grange');
    expect(document.title).toBe('La Grange · La Grange');
    router.stop();
  });
});
