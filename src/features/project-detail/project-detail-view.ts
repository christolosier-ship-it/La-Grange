import type { AppState } from '../../app/store';
import { matchRoute, type RouteMatch } from '../../app/routes';
import { AppError } from '../../core/errors/app-error';
import type { ProjectDetails } from '../../core/projects/details';
import type { Project } from '../../core/projects/model';
import { formatFullDate, formatRelativeDate } from '../../utils/date';
import { SINGULAR_ACTIVITY_STATE_LABELS } from '../../ui/text/activity-state-labels';
import { PROJECT_CATEGORY_LABELS } from '../../ui/text/project-labels';
import type { ViewActions } from '../view-actions';

function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function projectInitials(name: string): string {
  return name.trim().split(/[\s_-]+/u).filter(Boolean).slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '').join('') || 'LG';
}

function safeReturnHref(value: string | null): string {
  if (!value || !value.startsWith('#/projects')) return '#/projects';
  return matchRoute(value).name === 'projects' ? value : '#/projects';
}

function errorMessage(error: Error | undefined): string {
  if (!error) return 'Détail indisponible.';
  return error instanceof AppError ? error.userMessage : error.message;
}

function createArtwork(project: Project): HTMLElement {
  const artwork = document.createElement('div');
  artwork.className = 'project-detail__artwork';
  const fallback = document.createElement('div');
  fallback.className = 'project-detail__artwork-fallback';
  fallback.setAttribute('aria-hidden', 'true');
  fallback.textContent = projectInitials(project.displayName);

  if (project.cover) {
    const image = document.createElement('img');
    image.src = assetUrl(project.cover);
    image.alt = `Couverture du projet ${project.displayName}`;
    image.width = 1280;
    image.height = 720;
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.remove();
      artwork.append(fallback);
    }, { once: true });
    artwork.append(image);
  } else {
    artwork.append(fallback);
  }

  const logo = document.createElement('div');
  logo.className = 'project-detail__logo';
  if (project.logo) {
    const logoImage = document.createElement('img');
    logoImage.src = assetUrl(project.logo);
    logoImage.alt = `Logo du projet ${project.displayName}`;
    logoImage.width = 160;
    logoImage.height = 160;
    logoImage.addEventListener('error', () => {
      logoImage.remove();
      logo.textContent = projectInitials(project.displayName);
    }, { once: true });
    logo.append(logoImage);
  } else {
    logo.textContent = projectInitials(project.displayName);
    logo.setAttribute('aria-label', `Initiales du projet ${project.displayName}`);
  }
  artwork.append(logo);
  return artwork;
}

function createExternalLink(
  href: string,
  label: string,
  projectName: string,
  offline: boolean,
  primary = false,
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = primary ? 'project-detail__action is-primary' : 'project-detail__action';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = offline ? `${label} · connexion requise` : label;
  link.setAttribute(
    'aria-label',
    `${label} pour ${projectName} dans un nouvel onglet${offline ? ', connexion requise' : ''}`,
  );
  if (offline) {
    link.classList.add('requires-connection');
    link.title = 'Cette action nécessite une connexion internet.';
  }
  return link;
}

function createMetadata(project: Project): HTMLElement {
  const section = document.createElement('section');
  section.className = 'project-detail__panel';
  const title = document.createElement('h2');
  title.textContent = 'Fiche d’inventaire';
  const list = document.createElement('dl');
  list.className = 'project-detail__metadata';
  const entries: ReadonlyArray<readonly [string, string]> = [
    ['État', SINGULAR_ACTIVITY_STATE_LABELS[project.activityState]],
    ['Catégorie', PROJECT_CATEGORY_LABELS[project.category]],
    ['Langage', project.language ?? 'Non indiqué'],
    ['Branche principale', project.defaultBranch],
    ['Créé le', formatFullDate(project.createdAt)],
    ['Dernière activité détectée', formatFullDate(project.pushedAt ?? project.updatedAt)],
    ['Issues ouvertes', String(project.openIssuesCount)],
    ['Type', project.fork ? 'Fork public' : 'Dépôt principal'],
  ];
  for (const [label, value] of entries) {
    const term = document.createElement('dt');
    term.textContent = label;
    const detail = document.createElement('dd');
    detail.textContent = value;
    list.append(term, detail);
  }
  section.append(title, list);
  return section;
}

function createTopics(project: Project): HTMLElement {
  const section = document.createElement('section');
  section.className = 'project-detail__panel';
  const title = document.createElement('h2');
  title.textContent = 'Topics';
  if (project.topics.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucun topic public n’est renseigné.';
    section.append(title, empty);
    return section;
  }
  const list = document.createElement('ul');
  list.className = 'project-detail__topics';
  for (const topic of project.topics) {
    const item = document.createElement('li');
    item.textContent = topic;
    list.append(item);
  }
  section.append(title, list);
  return section;
}

function createCommitList(details: ProjectDetails, offline: boolean): HTMLElement {
  const group = document.createElement('section');
  group.className = 'project-detail__detail-group';
  const title = document.createElement('h3');
  title.textContent = 'Derniers commits';
  group.append(title);
  if (details.commits.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucun commit récent disponible.';
    group.append(empty);
    return group;
  }
  const list = document.createElement('ol');
  list.className = 'project-detail__commits';
  for (const commit of details.commits) {
    const item = document.createElement('li');
    const link = createExternalLink(commit.url, commit.message, 'ce commit', offline);
    link.className = 'project-detail__commit-link';
    const meta = document.createElement('span');
    meta.textContent = `${commit.authorName} · ${formatRelativeDate(commit.committedAt)}`;
    const time = document.createElement('time');
    time.dateTime = commit.committedAt;
    time.textContent = formatFullDate(commit.committedAt);
    time.className = 'visually-hidden';
    item.append(link, meta, time);
    list.append(item);
  }
  group.append(list);
  return group;
}

function createRelease(details: ProjectDetails, offline: boolean): HTMLElement {
  const group = document.createElement('section');
  group.className = 'project-detail__detail-group';
  const title = document.createElement('h3');
  title.textContent = 'Dernière release';
  group.append(title);
  if (!details.release) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucune release publique détectée.';
    group.append(empty);
    return group;
  }
  const link = createExternalLink(
    details.release.url,
    `${details.release.name} (${details.release.tagName})`,
    'cette release',
    offline,
  );
  link.className = 'project-detail__detail-link';
  group.append(link);
  if (details.release.publishedAt) {
    const date = document.createElement('time');
    date.dateTime = details.release.publishedAt;
    date.textContent = formatFullDate(details.release.publishedAt);
    group.append(date);
  }
  return group;
}

function createReadme(details: ProjectDetails, offline: boolean): HTMLElement {
  const group = document.createElement('section');
  group.className = 'project-detail__detail-group';
  const title = document.createElement('h3');
  title.textContent = 'README';
  group.append(title);
  if (!details.readmeAvailable || !details.readmeUrl) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucun README public détecté.';
    group.append(empty);
    return group;
  }
  const link = createExternalLink(details.readmeUrl, 'Consulter le README', 'ce projet', offline);
  link.className = 'project-detail__detail-link';
  group.append(link);
  return group;
}

function createOnDemandDetails(
  project: Project,
  state: AppState,
  actions: ViewActions,
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'project-detail__panel project-detail__on-demand';
  const title = document.createElement('h2');
  title.textContent = 'Détails récents à la demande';
  const explanation = document.createElement('p');
  explanation.textContent = 'Cette section interroge uniquement ce dépôt, puis conserve le résultat localement pendant 45 minutes.';
  section.append(title, explanation);

  const detail = state.projectDetails[project.id];
  const offline = state.sync.status === 'offline';
  if (detail?.details) {
    const grid = document.createElement('div');
    grid.className = 'project-detail__details-grid';
    grid.append(
      createCommitList(detail.details, offline),
      createRelease(detail.details, offline),
      createReadme(detail.details, offline),
    );
    section.append(grid);
    const freshness = document.createElement('p');
    freshness.className = 'project-detail__freshness';
    freshness.textContent = `Détails chargés ${formatRelativeDate(detail.details.fetchedAt)}.`;
    freshness.title = formatFullDate(detail.details.fetchedAt);
    section.append(freshness);
  }

  if (detail?.status === 'loading-cache') {
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.textContent = 'Lecture des détails en réserve…';
    section.append(status);
  } else if (detail?.status === 'loading') {
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.textContent = detail.details
      ? 'Actualisation GitHub en cours. Les derniers détails connus restent visibles.'
      : 'Chargement des détails GitHub…';
    section.append(status);
  } else if (detail?.status === 'offline' || offline) {
    const status = document.createElement('p');
    status.className = 'project-detail__notice';
    status.textContent = detail.details
      ? 'Mode hors ligne : détails locaux affichés.'
      : 'Une connexion est nécessaire pour charger ces détails pour la première fois.';
    section.append(status);
  } else if (detail?.status === 'error') {
    const error = document.createElement('p');
    error.className = 'project-detail__error';
    error.setAttribute('role', detail.details ? 'status' : 'alert');
    error.textContent = detail.details
      ? `Les détails locaux restent visibles. ${errorMessage(detail.error)}`
      : errorMessage(detail.error);
    section.append(error);
  }

  if (detail?.warning) {
    const warning = document.createElement('p');
    warning.className = 'project-detail__notice';
    warning.textContent = `Les détails sont visibles mais n’ont pas pu être enregistrés localement : ${errorMessage(detail.warning)}`;
    section.append(warning);
  }

  const canRequest = !offline && detail?.status !== 'loading' && detail?.status !== 'loading-cache';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'project-detail__load';
  button.disabled = !canRequest;
  button.dataset.focusKey = `project-details-${String(project.id)}`;
  button.textContent = detail?.details ? 'Actualiser les détails' : 'Charger les détails récents';
  button.addEventListener('click', () => {
    actions.onProjectDetailsRequest?.(project, Boolean(detail?.details));
  });
  section.append(button);
  return section;
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

  if (!project || !state) {
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

  const view = document.createElement('article');
  view.className = 'project-detail';
  if (project.archived) view.classList.add('is-archived');

  const back = document.createElement('a');
  back.className = 'project-detail__back';
  back.href = safeReturnHref(route.query.get('from'));
  back.textContent = 'Retour au catalogue';

  const hero = document.createElement('header');
  hero.className = 'project-detail__hero';
  hero.append(createArtwork(project));
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

  const actionRow = document.createElement('div');
  actionRow.className = 'project-detail__actions';
  const offline = state.sync.status === 'offline';
  if (project.appUrl) {
    actionRow.append(createExternalLink(
      project.appUrl,
      'Ouvrir l’application',
      project.displayName,
      offline,
      true,
    ));
  }
  actionRow.append(
    createExternalLink(project.githubUrl, 'Voir sur GitHub', project.displayName, offline),
    createExternalLink(project.readmeUrl, 'README', project.displayName, offline),
    createExternalLink(project.releasesUrl, 'Releases', project.displayName, offline),
    createExternalLink(project.issuesUrl, 'Issues', project.displayName, offline),
  );

  content.append(eyebrow, title, badges, description, actionRow);
  hero.append(content);

  const panels = document.createElement('div');
  panels.className = 'project-detail__layout';
  const main = document.createElement('div');
  main.className = 'project-detail__main';
  main.append(createOnDemandDetails(project, state, actions));
  const rail = document.createElement('aside');
  rail.className = 'project-detail__rail';
  rail.setAttribute('aria-label', 'Métadonnées du projet');
  rail.append(createMetadata(project), createTopics(project));
  panels.append(main, rail);

  view.append(back, hero, panels);
  return view;
}
