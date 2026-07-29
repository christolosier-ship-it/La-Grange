import { afterEach, describe, expect, it, vi } from 'vitest';
import { matchRoute } from '../../app/routes';
import { INITIAL_STATE, type AppState } from '../../app/store';
import type { ProjectDetails } from '../../core/projects/details';
import type { Project } from '../../core/projects/model';
import { renderProjectDetail } from './project-detail-view';

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
    topics: ['pwa', 'typescript'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-07-29T09:00:00Z',
    pushedAt: '2026-07-29T09:00:00Z',
    openIssuesCount: 3,
    archived: false,
    fork: false,
    category: 'applications',
    activityState: 'active',
    featured: true,
    isNew: false,
    ...overrides,
  };
}

const details: ProjectDetails = {
  schemaVersion: 1,
  projectId: 42,
  repositoryName: 'La-Grange',
  fetchedAt: '2026-07-29T10:00:00Z',
  commits: [{
    sha: 'abc',
    message: 'Construire la fiche',
    authorName: 'Christo',
    committedAt: '2026-07-29T09:30:00Z',
    url: 'https://github.com/example/La-Grange/commit/abc',
  }],
  release: {
    name: 'Version 1',
    tagName: 'v1',
    publishedAt: '2026-07-28T10:00:00Z',
    url: 'https://github.com/example/La-Grange/releases/tag/v1',
  },
  readmeAvailable: true,
  readmeUrl: 'https://github.com/example/La-Grange/blob/main/README.md',
};

function state(projectValue: Project, status: AppState['sync']['status'] = 'ready'): AppState {
  return {
    ...INITIAL_STATE,
    sync: {
      status,
      snapshot: {
        schemaVersion: 1,
        username: 'example',
        projects: [projectValue],
        syncedAt: '2026-07-29T10:00:00Z',
      },
    },
  };
}

afterEach(() => {
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe('renderProjectDetail', () => {
  it('renders a complete direct hash fiche with safe separate external actions', () => {
    const view = renderProjectDetail(matchRoute('#/project/La-Grange'), state(project()));
    document.body.append(view);

    expect(view.querySelectorAll('h1')).toHaveLength(1);
    expect(view.querySelector('h1')?.textContent).toBe('La Grange');
    expect(view.textContent).toContain('L’atelier où vivent mes projets.');
    expect(view.textContent).toContain('TypeScript');
    expect(view.textContent).toContain('pwa');
    const links = [...view.querySelectorAll<HTMLAnchorElement>('.project-detail__actions a')];
    expect(links).toHaveLength(5);
    expect(links.every((link) => link.target === '_blank' && link.rel.includes('noopener'))).toBe(true);
  });

  it('does not create a dead application action when the URL is absent', () => {
    const view = renderProjectDetail(matchRoute('#/project/La-Grange'), state(project({ appUrl: undefined })));

    expect(view.querySelector('.project-detail__action.is-primary')).toBeNull();
    expect(view.textContent).toContain('Voir sur GitHub');
  });

  it('handles long names, absent descriptions and archived state without hiding content', () => {
    const longName = 'Un projet au nom volontairement très long pour éprouver la fiche sur mobile';
    const view = renderProjectDetail(matchRoute('#/project/La-Grange'), state(project({
      displayName: longName,
      description: '',
      archived: true,
      activityState: 'archived',
    })));

    expect(view.querySelector('h1')?.textContent).toBe(longName);
    expect(view.textContent).toContain('Projet GitHub sans description éditoriale.');
    expect(view.textContent).toContain('Archivé');
    expect(view.classList).toContain('is-archived');
  });

  it('renders cached details and keeps the base fiche after a detail error', () => {
    const projectState = state(project());
    const view = renderProjectDetail(matchRoute('#/project/La-Grange'), {
      ...projectState,
      projectDetails: {
        42: { projectId: 42, status: 'error', details, error: new Error('GitHub indisponible') },
      },
    });

    expect(view.querySelector('h1')?.textContent).toBe('La Grange');
    expect(view.textContent).toContain('Construire la fiche');
    expect(view.textContent).toContain('Version 1');
    expect(view.textContent).toContain('Les détails locaux restent visibles');
  });

  it('flags every external action and prevents first detail loading offline', () => {
    const request = vi.fn();
    const view = renderProjectDetail(
      matchRoute('#/project/La-Grange'),
      state(project(), 'offline'),
      { onProjectDetailsRequest: request },
    );

    expect(view.querySelectorAll('.requires-connection').length).toBeGreaterThan(0);
    const button = view.querySelector<HTMLButtonElement>('.project-detail__load');
    expect(button?.disabled).toBe(true);
    button?.click();
    expect(request).not.toHaveBeenCalled();
  });

  it('preserves the catalogue return hash and delegates favorite and detail actions', () => {
    const toggle = vi.fn();
    const request = vi.fn();
    const route = matchRoute('#/project/La-Grange?from=%23%2Fprojects%3Fq%3Dluma%26view%3Dlist');
    const view = renderProjectDetail(route, state(project()), {
      onToggleFavorite: toggle,
      onProjectDetailsRequest: request,
    });

    expect(view.querySelector<HTMLAnchorElement>('.project-detail__back')?.getAttribute('href'))
      .toBe('#/projects?q=luma&view=list');
    view.querySelector<HTMLButtonElement>('.project-detail__favorite')?.click();
    view.querySelector<HTMLButtonElement>('.project-detail__load')?.click();
    expect(toggle).toHaveBeenCalledWith(42);
    expect(request).toHaveBeenCalledWith(expect.objectContaining({ id: 42 }), false);
  });

  it('shows an understandable project-not-found state', () => {
    const view = renderProjectDetail(matchRoute('#/project/Missing'), state(project()));

    expect(view.querySelector('h1')?.textContent).toBe('Missing');
    expect(view.textContent).toContain('ne figure pas dans le dernier inventaire');
    expect(view.querySelector<HTMLAnchorElement>('.return-link')?.hash).toBe('#/projects');
  });
});
