import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { Project } from '../../core/projects/model';
import { createProjectCard } from './project-card';

const projectCardStyles = readFileSync(
  resolve(process.cwd(), 'src/styles/project-card.css'),
  'utf8',
);

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
    style: 'productivity',
    colors: { primary: '#386f83', secondary: '#9bc4d1', progress: '#4f91a8' },
    featured: true,
    isNew: false,
    ...overrides,
  };
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('createProjectCard', () => {
  it('renders the five independent actions and real repository metadata', () => {
    const card = createProjectCard(project(), { now: new Date('2026-07-02T00:00:00Z') });
    document.body.append(card);

    expect(card.querySelector('.project-card__title')?.textContent).toBe('La Grange');
    expect(card.querySelector('time')?.getAttribute('datetime')).toBe('2026-07-01T00:00:00Z');
    expect(card.querySelectorAll('.project-card__action')).toHaveLength(5);
    expect(card.querySelector('a a')).toBeNull();
    expect(card.querySelector<HTMLAnchorElement>('.project-card__actions a')?.rel).toContain('noopener');
    expect(card.querySelector('.project-card__action--customize')).not.toBeNull();
  });

  it('keeps the title, middle plank and five action slots aligned with the card skin', () => {
    expect(projectCardStyles).toContain('grid-template-rows: 16% 43% 11% 8% 10% 12%;');
    expect(projectCardStyles).toContain('grid-template-columns: repeat(5, minmax(0, 1fr));');
    expect(projectCardStyles).toMatch(/\.project-card__title\s*\{[\s\S]*?text-align:\s*center;/u);
    expect(projectCardStyles).toMatch(/\.project-card__action\s*\{[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;/u);
    expect(projectCardStyles).not.toMatch(/\.project-card__action--customize\s*\{\s*display:\s*none;/u);
  });

  it('loads a configured 8:5 cover lazily with stable dimensions', () => {
    const card = createProjectCard(project({ cover: 'projects/la-grange/cover.webp' }));
    const image = card.querySelector<HTMLImageElement>('.project-card__visual > img');

    expect(image?.loading).toBe('lazy');
    expect(image?.width).toBe(640);
    expect(image?.height).toBe(400);
    expect(image?.src).toContain('projects/la-grange/cover.webp');
  });

  it('falls back to deterministic initials and a generic crate pictogram', () => {
    const card = createProjectCard(project({ cover: 'projects/missing.webp' }));
    const image = card.querySelector<HTMLImageElement>('.project-card__visual > img');
    image?.dispatchEvent(new Event('error'));

    expect(card.querySelector('.project-card__visual > img')).toBeNull();
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

    expect(card.classList.contains('is-new')).toBe(true);
    expect(card.classList.contains('is-archived')).toBe(true);
    expect(card.dataset.state).toBe('archived');
    expect(card.querySelector<HTMLButtonElement>('.project-card__actions button:disabled')).not.toBeNull();
  });

  it('renders a manual progression and version when configured', () => {
    const card = createProjectCard(project({ progress: 65, resolvedVersion: 'v1.4.0' }));
    const progress = card.querySelector<HTMLElement>('[role="progressbar"]');

    expect(progress?.getAttribute('aria-valuenow')).toBe('65');
    expect(card.querySelector('.project-card__version')?.textContent).toBe('v1.4.0');
  });

  it('marks external links as requiring connectivity while offline', () => {
    const card = createProjectCard(project(), { offline: true });
    const actions = card.querySelectorAll<HTMLAnchorElement>('.project-card__action.requires-connection');

    expect(actions.length).toBeGreaterThanOrEqual(3);
    expect(actions[0]?.getAttribute('aria-label')).toContain('connexion requise');
  });
});
