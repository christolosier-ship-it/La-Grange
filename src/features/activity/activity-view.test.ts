import { afterEach, describe, expect, it } from 'vitest';
import { INITIAL_STATE, type AppState } from '../../app/store';
import { AppError } from '../../core/errors/app-error';
import type { ActivityEvent, Project } from '../../core/projects/model';
import { renderActivity } from './activity-view';

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

function activityEvent(overrides: Partial<ActivityEvent> = {}): ActivityEvent {
  return {
    id: 1,
    username: 'example',
    projectId: 42,
    type: 'added',
    occurredAt: new Date(2026, 6, 29, 10).toISOString(),
    ...overrides,
  };
}

function state(events: readonly ActivityEvent[], overrides: Partial<AppState> = {}): AppState {
  return {
    ...INITIAL_STATE,
    activity: {
      status: 'ready',
      username: 'example',
      events,
      invalidCount: 0,
    },
    sync: {
      status: 'ready',
      snapshot: {
        schemaVersion: 1,
        username: 'example',
        projects: [project],
        syncedAt: '2026-07-29T10:00:00Z',
      },
    },
    ...overrides,
  };
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('renderActivity', () => {
  it('renders a factual empty state without invented events', () => {
    const view = renderActivity(state([]));

    expect(view.querySelector('h1')?.textContent).toBe('Activité récente');
    expect(view.textContent).toContain('Le carnet est encore vierge');
    expect(view.querySelectorAll('.activity-event')).toHaveLength(0);
  });

  it('groups events and links existing projects through their canonical route', () => {
    const events = [
      activityEvent({ id: 2, type: 'archived', occurredAt: new Date(2026, 6, 29, 12).toISOString() }),
      activityEvent({ id: 1, type: 'added', occurredAt: new Date(2026, 6, 28, 9).toISOString() }),
    ];
    const view = renderActivity(state(events));

    expect(view.querySelectorAll('.activity-week')).toHaveLength(1);
    expect(view.querySelectorAll('.activity-day')).toHaveLength(2);
    const links = [...view.querySelectorAll<HTMLAnchorElement>('.activity-event h4 a')];
    expect(links).toHaveLength(2);
    expect(links.every(({ hash }) => hash === '#/project/La-Grange')).toBe(true);
    expect(view.querySelector('time')?.title).not.toBe('');
  });

  it('renders a removed project name without creating a dead link', () => {
    const removed = activityEvent({
      projectId: 99,
      type: 'removed',
      detail: 'Ancien-Projet',
    });
    const view = renderActivity(state([removed]));

    expect(view.textContent).toContain('Ancien-Projet');
    expect(view.textContent).toContain('dernier inventaire complet');
    expect(view.querySelector('.activity-event h4 a')).toBeNull();
  });

  it('keeps local events visible offline and reports invalid ignored entries', () => {
    const base = state([activityEvent()]);
    const view = renderActivity({
      ...base,
      activity: { ...base.activity, invalidCount: 2 },
      sync: { ...base.sync, status: 'offline' },
    });

    expect(view.textContent).toContain('Mode hors ligne');
    expect(view.textContent).toContain('2 entrées locales ont été ignorées');
    expect(view.querySelectorAll('.activity-event')).toHaveLength(1);
  });

  it('shows the localized cache error without a technical diagnostic', () => {
    const technical = 'IndexedDB transaction aborted';
    const userMessage = 'Journal local indisponible.';
    const view = renderActivity({
      ...INITIAL_STATE,
      activity: {
        status: 'error',
        events: [],
        invalidCount: 0,
        error: new AppError('cache', technical, userMessage, true),
      },
    });

    expect(view.textContent).toContain(userMessage);
    expect(view.textContent).not.toContain(technical);
    expect(view.querySelector('[role="alert"]')).not.toBeNull();
  });
});
