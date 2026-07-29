import { describe, expect, it } from 'vitest';
import type { ActivityEvent, Project } from '../projects/model';
import {
  activityEventLabel,
  groupActivityEvents,
  isValidActivityEvent,
  resolveActivityTarget,
  sortActivityEvents,
} from './activity-model';

function event(overrides: Partial<ActivityEvent> = {}): ActivityEvent {
  return {
    id: 1,
    username: 'example',
    projectId: 42,
    type: 'added',
    occurredAt: new Date(2026, 6, 29, 10).toISOString(),
    ...overrides,
  };
}

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

describe('activity event validation', () => {
  it('accepts complete UTC events for the expected user', () => {
    expect(isValidActivityEvent(event(), 'example')).toBe(true);
  });

  it('rejects unknown types, foreign users and non-UTC dates', () => {
    expect(isValidActivityEvent({ ...event(), type: 'release' }, 'example')).toBe(false);
    expect(isValidActivityEvent(event(), 'other')).toBe(false);
    expect(isValidActivityEvent({ ...event(), occurredAt: '2026-07-29' }, 'example')).toBe(false);
  });
});

describe('activity ordering and grouping', () => {
  it('sorts newest first and uses the generated key as a stable tie breaker', () => {
    const older = event({ id: 2, occurredAt: new Date(2026, 6, 28, 9).toISOString() });
    const newerLowId = event({ id: 3, occurredAt: new Date(2026, 6, 29, 9).toISOString() });
    const newerHighId = event({ id: 4, occurredAt: newerLowId.occurredAt });

    expect(sortActivityEvents([older, newerLowId, newerHighId]).map(({ id }) => id))
      .toEqual([4, 3, 2]);
  });

  it('groups multiple days inside local calendar weeks', () => {
    const monday = event({ id: 1, occurredAt: new Date(2026, 6, 27, 10).toISOString() });
    const tuesday = event({ id: 2, occurredAt: new Date(2026, 6, 28, 11).toISOString() });
    const nextMonday = event({ id: 3, occurredAt: new Date(2026, 7, 3, 9).toISOString() });
    const groups = groupActivityEvents([monday, tuesday, nextMonday]);

    expect(groups).toHaveLength(2);
    expect(groups[0]?.days).toHaveLength(1);
    expect(groups[1]?.days).toHaveLength(2);
    expect(groups.flatMap(({ days }) => days).flatMap(({ events }) => events)).toHaveLength(3);
  });
});

describe('activity target and wording', () => {
  it('links a known project through its current canonical repository name', () => {
    const target = resolveActivityTarget(event({ type: 'renamed', detail: 'Ancien → La-Grange' }), [project]);

    expect(target.displayName).toBe('La Grange');
    expect(target.href).toBe('#/project/La-Grange');
    expect(activityEventLabel(event({ type: 'renamed', detail: 'Ancien → La-Grange' }), target))
      .toContain('Renommage détecté');
  });

  it('keeps a removed repository factual and without a dead link', () => {
    const removed = event({ type: 'removed', detail: 'Projet-Disparu' });
    const target = resolveActivityTarget(removed, []);

    expect(target).toEqual({ displayName: 'Projet-Disparu' });
    expect(activityEventLabel(removed, target)).toContain('dernier inventaire complet');
  });
});
