import type { AppState } from '../app/store';
import type { RouteMatch } from '../app/routes';
import { AppError } from '../core/errors/app-error';
import type { Project } from '../core/projects/model';
import type { SyncState } from '../core/sync/sync-service';
import { renderDashboard } from './dashboard/dashboard-view';

interface ViewContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

const PLACEHOLDERS: Record<'activity' | 'settings', ViewContent> = {
  activity: {
    eyebrow: 'Journal',
    title: 'Activité récente',
    description: 'Les événements sont enregistrés localement. Leur mise en scène arrivera dans une phase ultérieure.',
  },
  settings: {
    eyebrow: 'Préférences',
    title: 'Paramètres',
    description: 'Les réglages locaux et les informations détaillées du cache seront disponibles ici.',
  },
};

function createPanel(content: ViewContent): HTMLElement {
  const article = document.createElement('article');
  article.className = 'placeholder-panel';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = content.eyebrow;

  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = content.title;

  const description = document.createElement('p');
  description.className = 'lead';
  description.textContent = content.description;

  article.append(eyebrow, title, description);
  return article;
}

function userMessage(error: Error | undefined): string | undefined {
  return error instanceof AppError ? error.userMessage : error?.message;
}

function formatDate(value: string | undefined): string {
  if (!value) return 'Aucune activité connue';
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(date)
    : 'Date inconnue';
}

function appendSyncFeedback(panel: HTMLElement, sync: SyncState | undefined): void {
  const feedback = document.createElement('p');
  feedback.className = 'sync-feedback';
  feedback.setAttribute('role', sync?.status === 'error' ? 'alert' : 'status');

  if (!sync || sync.status === 'idle') feedback.textContent = 'Inventaire en attente de synchronisation.';
  else if (sync.status === 'loading-cache') feedback.textContent = 'Lecture de la dernière copie locale…';
  else if (sync.status === 'syncing') feedback.textContent = 'Synchronisation avec GitHub…';
  else if (sync.status === 'offline') feedback.textContent = 'Mode hors ligne : dernière copie locale affichée.';
  else if (sync.status === 'error') {
    feedback.textContent = sync.snapshot
      ? `Synchronisation incomplète : ${userMessage(sync.error) ?? 'erreur inconnue'}`
      : `Inventaire indisponible : ${userMessage(sync.error) ?? 'erreur inconnue'}`;
  } else {
    feedback.textContent = `${String(sync.snapshot?.projects.length ?? 0)} projet(s) disponible(s).`;
  }

  panel.append(feedback);

  if (sync?.warning) {
    const warning = document.createElement('p');
    warning.className = 'sync-warning';
    warning.textContent = `Avertissement : ${userMessage(sync.warning) ?? 'configuration locale ignorée'}`;
    panel.append(warning);
  }
}

function sortedProjects(projects: readonly Project[]): Project[] {
  return [...projects].sort((left, right) => {
    const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;
    return leftOrder - rightOrder || left.displayName.localeCompare(right.displayName, 'fr');
  });
}

function createProjectItem(project: Project): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'project-row';

  const heading = document.createElement('h2');
  const link = document.createElement('a');
  link.href = `#/project/${encodeURIComponent(project.repositoryName)}`;
  link.textContent = project.displayName;
  heading.append(link);

  const description = document.createElement('p');
  description.textContent = project.description || 'Aucune description GitHub.';

  const metadata = document.createElement('p');
  metadata.className = 'project-meta';
  const language = project.language ?? 'Langage non indiqué';
  metadata.textContent = `${language} · ${project.activityState} · ${formatDate(project.pushedAt ?? project.updatedAt)}`;

  const actions = document.createElement('p');
  actions.className = 'project-actions';
  const github = document.createElement('a');
  github.href = project.githubUrl;
  github.target = '_blank';
  github.rel = 'noopener noreferrer';
  github.textContent = 'GitHub';
  actions.append(github);

  if (project.appUrl) {
    const application = document.createElement('a');
    application.href = project.appUrl;
    application.target = '_blank';
    application.rel = 'noopener noreferrer';
    application.textContent = 'Ouvrir l’application';
    actions.append(application);
  }

  item.append(heading, description, metadata, actions);
  return item;
}

function renderProjects(state: AppState | undefined): HTMLElement {
  const panel = createPanel({
    eyebrow: 'Inventaire technique',
    title: 'Tous les projets',
    description: 'Liste provisoire des dépôts publics réellement reçus depuis GitHub.',
  });
  panel.classList.add('data-panel');
  appendSyncFeedback(panel, state?.sync);

  const projects = state?.sync.snapshot?.projects;
  if (!projects || projects.length === 0) return panel;

  const list = document.createElement('ul');
  list.className = 'project-list';
  for (const project of sortedProjects(projects)) list.append(createProjectItem(project));
  panel.append(list);
  return panel;
}

function appendExternalLink(container: HTMLElement, href: string, label: string): void {
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  container.append(link);
}

function renderProject(route: RouteMatch, state: AppState | undefined): HTMLElement {
  const repositoryName = route.params.repositoryName ?? '';
  const project = state?.sync.snapshot?.projects.find((candidate) => (
    candidate.repositoryName === repositoryName
  ));

  if (!project) {
    const panel = createPanel({
      eyebrow: 'Projet',
      title: repositoryName || 'Projet introuvable',
      description: state?.sync.status === 'syncing' || state?.sync.status === 'loading-cache'
        ? 'La fiche attend la fin de la synchronisation.'
        : 'Ce dépôt ne figure pas dans le dernier inventaire disponible.',
    });
    appendSyncFeedback(panel, state?.sync);
    return panel;
  }

  const panel = createPanel({
    eyebrow: 'Fiche technique',
    title: project.displayName,
    description: project.description || 'Aucune description GitHub.',
  });
  panel.classList.add('data-panel');

  const details = document.createElement('dl');
  details.className = 'project-details';
  const entries: ReadonlyArray<readonly [string, string]> = [
    ['Dépôt', project.repositoryName],
    ['État', project.activityState],
    ['Langage', project.language ?? 'Non indiqué'],
    ['Branche principale', project.defaultBranch],
    ['Dernière activité', formatDate(project.pushedAt ?? project.updatedAt)],
    ['Issues ouvertes', String(project.openIssuesCount)],
  ];

  for (const [label, value] of entries) {
    const term = document.createElement('dt');
    term.textContent = label;
    const detail = document.createElement('dd');
    detail.textContent = value;
    details.append(term, detail);
  }

  const actions = document.createElement('p');
  actions.className = 'project-actions';
  appendExternalLink(actions, project.githubUrl, 'Voir sur GitHub');
  appendExternalLink(actions, project.readmeUrl, 'README');
  appendExternalLink(actions, project.releasesUrl, 'Releases');
  if (project.appUrl) appendExternalLink(actions, project.appUrl, 'Ouvrir l’application');

  panel.append(details, actions);
  return panel;
}

export function renderView(route: RouteMatch, state?: AppState): HTMLElement {
  if (route.name === 'projects') return renderProjects(state);
  if (route.name === 'project') return renderProject(route, state);
  if (route.name === 'dashboard') return renderDashboard(state);

  if (route.name === 'not-found') {
    const panel = createPanel({
      eyebrow: 'Chemin inconnu',
      title: 'Cette porte ne mène nulle part',
      description: 'Le chemin demandé n’existe pas dans La Grange.',
    });
    const returnLink = document.createElement('a');
    returnLink.className = 'return-link';
    returnLink.href = '#/';
    returnLink.textContent = 'Revenir à la vue d’ensemble';
    panel.append(returnLink);
    return panel;
  }

  return createPanel(PLACEHOLDERS[route.name]);
}
