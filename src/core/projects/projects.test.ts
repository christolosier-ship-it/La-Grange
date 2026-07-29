import { describe, expect, it } from 'vitest';
import { activityState } from './activity';
import { compareProjects } from './comparator';
import { mapRepository } from './mapper';
import { enrichProjects, parseOverrides } from './overrides';

const dto = { id: 1, name: 'Old', description: null, html_url: 'https://github.com/me/Old', homepage: 'javascript:bad', fork: false, archived: false, language: null, default_branch: 'main', topics: [' TypeScript ', 'typescript'], open_issues_count: 2, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-02T00:00:00Z', pushed_at: '2025-01-02T00:00:00Z' };

describe('project domain', () => {
  it('maps nullable data, safe links, topics and activity', () => {
    const project = mapRepository(dto, new Date('2025-01-10T00:00:00Z'));
    expect(project).toMatchObject({ id: 1, description: '', appUrl: undefined, topics: ['typescript'], activityState: 'active' });
    expect(activityState('2025-01-01T00:00:00Z', false, new Date('2025-07-01T00:00:00Z'))).toBe('sleeping');
    expect(activityState(undefined, true)).toBe('archived');
  });

  it('validates and applies overrides without changing stable identity', () => {
    const overrides = parseOverrides({ Old: { displayName: 'Workshop', category: 'applications', appUrl: 'https://example.com', hidden: false } }, true);
    expect(enrichProjects([mapRepository(dto)], overrides)[0]).toMatchObject({ id: 1, repositoryName: 'Old', displayName: 'Workshop', category: 'applications', appUrl: 'https://example.com' });
    expect(() => parseOverrides({ Old: { surprise: true } }, true)).toThrow();
  });

  it('detects additions and renames by stable id, but not on first import', () => {
    const old = mapRepository(dto);
    const renamed = mapRepository({ ...dto, name: 'New', html_url: 'https://github.com/me/New' });
    expect(compareProjects(undefined, [old], 'me', 'now').projects[0]?.isNew).toBe(false);
    const result = compareProjects([old], [renamed, { ...old, id: 2 }], 'me', 'now');
    expect(result.projects.map(({ isNew }) => isNew)).toEqual([false, true]);
    expect(result.events.map(({ type }) => type)).toEqual(['renamed', 'added']);
  });
});
