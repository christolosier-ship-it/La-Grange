import { matchRoute, type RouteMatch } from '../../app/routes';
import type { AppState } from '../../app/store';
import { projectHiddenReason } from '../../core/preferences/project-visibility';
import type { Project } from '../../core/projects/model';
import { SINGULAR_ACTIVITY_STATE_LABELS } from '../../ui/text/activity-state-labels';
import { PROJECT_CATEGORY_LABELS } from '../../ui/text/project-labels';
import type { ViewActions } from '../view-actions';
import { createOnDemandDetails } from './project-detail-details';
import {
  createProjectArtwork,
  createProjectExternalLink,
  createProjectMetadata,
  createProjectTopics,
} from './project-detail-elements';

function safeReturnHref(value: string | null): string {
  if (!value || !value.startsWith('#/projects')) return '#/projects';
  return matchRoute(value).name === 'projects' ? value : '#/projects';
}

function createRenamedNotice(route: RouteMatch): HTMLElement | undefined {
  const previousName = route.query.get('renamedFrom')?.trim();
  if (!previousName) return undefined;
  const notice = document.createElement('p');
  notice.className = 'project-detail__rename-notice';
  notice.setAttribute('role', 'status');
  notice.textContent = `Ce dépôt était auparavant accessible sous le nom ${previousName}. L’adresse a été mise à jour.`;
  return notice;
}

function createVisibilityNotice(project: Project, state: AppState): HTMLElement | undefined {
  const reason = projectHiddenReason(project, state.preferences);
  if (!reason) return undefined;
  const notice = document.createElement('p');
  notice.className = 'project-detail__rename-notice';
  notice.setAttribute('role', 'status');
  notice.textContent = reason === 'archived'
    ? 'Ce projet est accessible directement, mais il est masqué dans les listes par la préférence « Masquer les archives ».'
    : 'Ce projet est accessible directement, mais il est masqué dans les listes par la préférence « Masquer les forks ».';
  return notice;
}

function createMissingProject(route: RouteMatch, state: AppState | undefined): HTMLElement {
  const repositoryName = route.params.repositoryName ?? '';
  const missing = document.createElement('article');
  missing.className = 'project-detail project-detail--missing';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Projet';
  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = repositoryName || 'Projet introuvable';
  const message = document.createElement('p');
  message.className = 'lead';
  message.textContent = state?.sync.status === 'syncing' || state?.sync.status === 'loading-cache'
    ? 'La fiche attend la fin de la synchronisation.'
    : 'Ce dépôt ne figure pas dans le dernier inventaire disponible.';
  const back = document.createElement('a');
  back.className = 'return-link';
  back.href = safeReturnHref(route.query.get('from'));
  back.textContent = 'Revenir au catalogue';
  missing.append(eyebrow, title, message, back);
  return missing;
}

function createProjectBadges(project: Project, state: AppState, actions: ViewActions): HTMLElement {
  const badges = document.createElement('div');
  badges.className = 'project-detail__badges';
  const stateBadge = document.createElement('span');
  stateBadge.className = `status-badge status-badge--${project.activityState}`;
  stateBadge.textContent = SINGULAR_ACTIVITY_STATE_LABELS[project.activityState];
  badges.append(stateBadge);
  if (project.isNew) {
    const newBadge = document.createElement('span');
    newBadge.className = 'new-badge';
    newBadge.textContent = 'Nouvelle arrivée';
    badges.append(newBadge);
  }
  const favorite = document.createElement('button');
  favorite.type = 'button';
  favorite.className = 'project-detail__favorite';
  favorite.dataset.focusKey = `project-detail-favorite-${String(project.id)}`;
  const isFavorite = state.favoriteIds.includes(project.id);
  favorite.setAttribute('aria-pressed', String(isFavorite));
  favorite.textContent = isFavorite ? 'Favori' : 'Ajouter aux favoris';
  favorite.addEventListener('click', () => {
    actions.onToggleFavorite?.(project.id);
  });
  badges.append(favorite);
  return badges;
}

function createProjectActions(project: Project, offline: boolean): HTMLElement {
  const actions = document.createElement('div');
  actions.className = 'project-detail__actions';
  if (project.appUrl) {
    actions.append(createProjectExternalLink(
      project.appUrl,
      'Ouvrir l’application',
      project.displayName,
      offline,
      true,
    ));
  }
  actions.append(
    createProjectExternalLink(project.githubUrl, 'Voir sur GitHub', project.displayName, offline),
    createProjectExternalLink(project.readmeUrl, 'README', project.displayName, offline),
    createProjectExternalLink(project.releasesUrl, 'Releases', project.displayName, offline),
    createProjectExternalLink(project.issuesUrl, 'Issues', project.displayName, offline),
  );
  return actions;
}

function createProjectHero(project: Project, state: AppState, actions: ViewActions): HTMLElement {
  const hero = document.createElement('header');
  hero.className = 'project-detail__hero';
  hero.append(createProjectArtwork(project));

  const content = document.createElement('div');
  content.className = 'project-detail__hero-content';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = PROJECT_CATEGORY_LABELS[project.category];
  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = project.displayName;
  const description = document.createElement('p');
  description.className = 'lead';
  description.textContent = project.description || 'Projet GitHub sans description éditoriale.';
  content.append(
    eyebrow,
    title,
    createProjectBadges(project, state, actions),
    description,
    createProjectActions(project, state.sync.status === 'offline'),
  );
  hero.append(content);
  return hero;
}

export function renderProjectDetail(
  route: RouteMatch,
  state: AppState | undefined,
  actions: ViewActions = {},
): HTMLElement {
  const repositoryName = route.params.repositoryName ?? '';
  const project = state?.sync.snapshot?.projects.find((candidate) => (
    candidate.repositoryName === repositoryName
  ));
  if (!project || !state) return createMissingProject(route, state);

  const view = document.createElement('article');
  view.className = 'project-detail';
  if (project.archived) view.classList.add('is-archived');

  const back = document.createElement('a');
  back.className = 'project-detail__back';
  back.href = safeReturnHref(route.query.get('from'));
  back.textContent = 'Retour au catalogue';
  view.append(back);

  const renamedNotice = createRenamedNotice(route);
  if (renamedNotice) view.append(renamedNotice);
  const visibilityNotice = createVisibilityNotice(project, state);
  if (visibilityNotice) view.append(visibilityNotice);
  view.append(createProjectHero(project, state, actions));

  const layout = document.createElement('div');
  layout.className = 'project-detail__layout';
  const main = document.createElement('div');
  main.className = 'project-detail__main';
  main.append(createOnDemandDetails(project, state, actions));
  const rail = document.createElement('aside');
  rail.className = 'project-detail__rail';
  rail.setAttribute('aria-label', 'Métadonnées du projet');
  rail.append(createProjectMetadata(project), createProjectTopics(project));
  layout.append(main, rail);
  view.append(layout);
  return view;
}
