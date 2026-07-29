import { afterEach, describe, expect, it } from 'vitest';
import type { Project } from '../../core/projects/model';
import { createProjectCard } from './project-card';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 42,
    repositoryName: 'La-Grange',
    slug: 'La-Grange',
    displayName: 'La Grange',
    description: 'L’atelier où vivent mes projets.',
    githubUrl: 'https://github.com/example/La-Grange',
    appUrl: 'https://example.github.io/La-Grange/',
    readmeUrl: 'https://github.com/example/La-Grange#readme',
    releasesUrl: 'https://github.com/example/La-Grange/releases',
    issuesUrl: 'https://github.com/example/La-Grange/issues',
    language: 'TypeScript',
    defaultBranch: 'main',
    topics: ['pwa'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-07-01T00:00:00Z',
    pushedAt: '2026-07-01T00:00:00Z',
    openIssuesCount: 0,
    archived: false,
    fork: false,
    category: 'applications',
    activityState: 'active',
    featured: true,
    isNew: false,
    ...overrides,
  };
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('createProjectCard', () => {
  it('renders real metadata, status text and safe separate actions', () => {
    const card = createProjectCard(project(), { now: new Date('2026-07-02T00:00:00Z') });
    document.body.append(card);

    expect(card.querySelector('.status-badge')?.textContent).toBe('Actif');
    expect(card.querySelector('.project-card__title')?.textContent).toBe('La Grange');
    expect(card.querySelector('time')?.getAttribute('datetime')).toBe('2026-07-01T00:00:00Z');
    expect(card.querySelectorAll('a')).toHaveLength(2);
    expect(card.querySelector('a a')).toBeNull();
    expect(card.querySelector<HTMLAnchorElement>('.project-card__launch')?.rel).toContain('noopener');
  });

  it('loads a configured cover lazily with stable dimensions', () => {
    const card = createProjectCard(project({ cover: 'projects/la-grange/cover.webp' }));
    const image = card.querySelector<HTMLImageElement>('img');

    expect(image?.loading).toBe('lazy');
    expect(image?.width).toBe(640);
    expect(image?.height).toBe(360);
    expect(image?.src).toContain('projects/la-grange/cover.webp');
  });

  it('falls back to deterministic initials and a generic crate pictogram', () => {
    const card = createProjectCard(project({ cover: 'projects/missing.webp' }));
    const image = card.querySelector<HTMLImageElement>('img');
    image?.dispatchEvent(new Event('error'));

    expect(card.querySelector('img')).toBeNull();
    expect(card.querySelector<HTMLElement>('.project-card__fallback')?.hidden).toBe(false);
    expect(card.querySelector('.project-card__crate-icon')).not.toBeNull();
    expect(card.querySelector('.project-card__fallback span')?.textContent).toBe('LG');
    expect(card.querySelector('.project-card__visual')?.classList.contains('is-fallback')).toBe(true);
  });

  it('keeps new and archived states understandable without colour', () => {
    const card = createProjectCard(project({
      isNew: true,
      archived: true,
      activityState: 'archived',
      appUrl: undefined,
    }));

    expect(card.textContent).toContain('Nouvelle arrivée');
    expect(card.textContent).toContain('Archivé');
    expect(card.querySelector('.project-card__launch')).toBeNull();
  });

  it('marks application links as requiring connectivity while offline', () => {
    const card = createProjectCard(project(), { offline: true });
    const action = card.querySelector<HTMLAnchorElement>('.project-card__launch');

    expect(action?.textContent).toContain('connexion requise');
    expect(action?.classList.contains('requires-connection')).toBe(true);
    expect(action?.getAttribute('aria-label')).toContain('connexion requise');
  });
});
