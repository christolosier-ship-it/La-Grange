import { describe, expect, it } from 'vitest';
import type { GitHubRepositoryDto } from '../github/types';
import { activityState } from './activity';
import { compareProjects } from './comparator';
import { mapRepository } from './mapper';
import { overridesSignature } from './override-signature';
import { enrichProjects, parseOverrides } from './overrides';

const dto: GitHubRepositoryDto = {
  id: 1,
  name: 'Old',
  description: null,
  html_url: 'https://github.com/me/Old',
  homepage: 'javascript:bad',
  fork: false,
  archived: false,
  language: null,
  default_branch: 'main',
  topics: [' TypeScript ', 'typescript'],
  open_issues_count: 2,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-02T00:00:00Z',
  pushed_at: '2025-01-02T00:00:00Z',
};

describe('project domain', () => {
  it('maps nullable data, safe links, topics and exact activity thresholds', () => {
    const project = mapRepository(dto, new Date('2025-01-10T00:00:00Z'));
    expect(project).toMatchObject({
      id: 1,
      description: '',
      appUrl: undefined,
      topics: ['typescript'],
      activityState: 'active',
      category: 'uncategorized',
    });

    const pushedAt = '2025-01-01T00:00:00Z';
    expect(activityState(pushedAt, false, new Date('2025-01-31T00:00:00Z'))).toBe('active');
    expect(activityState(pushedAt, false, new Date('2025-01-31T00:00:00.001Z'))).toBe('maintenance');
    expect(activityState(pushedAt, false, new Date('2025-06-30T00:00:00Z'))).toBe('maintenance');
    expect(activityState(pushedAt, false, new Date('2025-06-30T00:00:00.001Z'))).toBe('sleeping');
    expect(activityState(undefined, true)).toBe('archived');
  });

  it('validates and applies overrides without changing stable identity', () => {
    const overrides = parseOverrides({
      Old: {
        displayName: 'Workshop',
        category: 'applications',
        appUrl: 'https://example.com',
        hidden: false,
      },
    }, true);

    expect(enrichProjects([mapRepository(dto)], overrides)[0]).toMatchObject({
      id: 1,
      repositoryName: 'Old',
      displayName: 'Workshop',
      category: 'applications',
      appUrl: 'https://example.com',
    });
    expect(() => parseOverrides({ Old: { surprise: true } }, true)).toThrow();
    expect(() => parseOverrides({ Old: { cover: '../secret.webp' } }, true)).toThrow();
  });

  it('creates a stable override signature independent of object order', () => {
    const first = parseOverrides({
      Beta: { featured: true },
      Alpha: { displayName: 'Alpha', sortOrder: 1 },
    }, true);
    const second = parseOverrides({
      Alpha: { sortOrder: 1, displayName: 'Alpha' },
      Beta: { featured: true },
    }, true);

    expect(overridesSignature(first)).toBe(overridesSignature(second));
  });

  it('hides configured projects without leaking the hidden property', () => {
    const hidden = enrichProjects(
      [mapRepository(dto)],
      parseOverrides({ Old: { hidden: true } }, true),
    );
    expect(hidden).toEqual([]);
  });

  it('detects additions, renames and removals by stable id', () => {
    const old = mapRepository(dto);
    const renamed = mapRepository({
      ...dto,
      name: 'New',
      html_url: 'https://github.com/me/New',
    });

    expect(compareProjects(undefined, [old], 'me', 'now').projects[0]?.isNew).toBe(false);

    const added = { ...old, id: 2, repositoryName: 'Second', displayName: 'Second' };
    const result = compareProjects([old], [renamed, added], 'me', 'now');
    expect(result.projects.map(({ isNew }) => isNew)).toEqual([false, true]);
    expect(result.events.map(({ type }) => type)).toEqual(['renamed', 'added']);

    const removed = compareProjects([renamed, added], [renamed], 'me', 'later');
    expect(removed.removedIds).toEqual([2]);
    expect(removed.events.map(({ type }) => type)).toEqual(['removed']);
  });
});
