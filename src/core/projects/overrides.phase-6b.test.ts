import { describe, expect, it } from 'vitest';
import type { Project } from './model';
import { enrichProjects, parseOverrides } from './overrides';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 1,
    repositoryName: 'La-Grange',
    slug: 'La-Grange',
    displayName: 'La-Grange',
    description: '',
    githubUrl: 'https://github.com/example/La-Grange',
    readmeUrl: 'https://github.com/example/La-Grange#readme',
    releasesUrl: 'https://github.com/example/La-Grange/releases',
    issuesUrl: 'https://github.com/example/La-Grange/issues',
    defaultBranch: 'main',
    topics: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
    pushedAt: '2026-08-01T00:00:00Z',
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

describe('overrides Phase 6B', () => {
  it('parses the versioned schema and all editable fields', () => {
    const result = parseOverrides({
      schemaVersion: 3,
      projects: {
        'La-Grange': {
          style: 'productivity',
          colors: {
            primary: '#386F83',
            secondary: '#9BC4D1',
            progress: '#4F91A8',
          },
          progress: 72,
          manualVersion: 'v0.2.0',
          cover: 'assets/phase-6/covers/la-grange-cover-640x400.webp',
        },
      },
    }, true);

    expect(result['La-Grange']).toEqual({
      style: 'productivity',
      colors: {
        primary: '#386f83',
        secondary: '#9bc4d1',
        progress: '#4f91a8',
      },
      progress: 72,
      manualVersion: 'v0.2.0',
      cover: 'assets/phase-6/covers/la-grange-cover-640x400.webp',
    });
  });

  it('rejects invalid progress and unexpected fields in strict mode', () => {
    expect(() => parseOverrides({
      schemaVersion: 3,
      projects: { 'La-Grange': { progress: 101 } },
    }, true)).toThrow();
    expect(() => parseOverrides({
      schemaVersion: 3,
      projects: { 'La-Grange': { secret: 'nope' } },
    }, true)).toThrow();
  });

  it('enriches a project with default or customized style values', () => {
    const [enriched] = enrichProjects([project({ category: 'applications' })], {
      'La-Grange': {
        style: 'nature',
        colors: {
          primary: '#234f29',
          secondary: '#9fc486',
          progress: '#4b8a53',
        },
        progress: 55,
        manualVersion: 'v1.0.0',
      },
    });

    expect(enriched?.style).toBe('nature');
    expect(enriched?.colors?.progress).toBe('#4b8a53');
    expect(enriched?.progress).toBe(55);
    expect(enriched?.resolvedVersion).toBe('v1.0.0');
  });
});
