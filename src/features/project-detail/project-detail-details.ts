import type { AppState } from '../../app/store';
import { AppError } from '../../core/errors/app-error';
import type { ProjectDetails } from '../../core/projects/details';
import type { Project } from '../../core/projects/model';
import { formatFullDate, formatRelativeDate, parseDate } from '../../utils/date';
import type { ViewActions } from '../view-actions';
import { createProjectExternalLink } from './project-detail-elements';

const MAX_TIMER_DELAY_MS = 60_000;

function errorMessage(error: Error | undefined): string {
  if (!error) return 'Détail indisponible.';
  return error instanceof AppError ? error.userMessage : error.message;
}

function retryDate(error: Error | undefined): Date | undefined {
  if (!(error instanceof AppError) || error.code !== 'rate-limit') return undefined;
  return parseDate(error.retryAt);
}

function scheduleRetryUnlock(
  button: HTMLButtonElement,
  notice: HTMLElement,
  retryAt: Date,
  readyLabel: string,
): void {
  const update = (): void => {
    const remaining = retryAt.getTime() - Date.now();
    if (remaining <= 0) {
      button.disabled = false;
      button.textContent = readyLabel;
      notice.remove();
      return;
    }
    window.setTimeout(update, Math.min(remaining, MAX_TIMER_DELAY_MS));
  };
  update();
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
    const link = createProjectExternalLink(commit.url, commit.message, 'ce commit', offline);
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
  const link = createProjectExternalLink(
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
  const link = createProjectExternalLink(details.readmeUrl, 'Consulter le README', 'ce projet', offline);
  link.className = 'project-detail__detail-link';
  group.append(link);
  return group;
}

export function createOnDemandDetails(
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
    status.textContent = detail?.details
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

  const readyLabel = detail?.details ? 'Actualiser les détails' : 'Charger les détails récents';
  const retryAt = retryDate(detail?.error);
  let coolingDown = false;
  let retryNotice: HTMLElement | undefined;
  if (retryAt && retryAt.getTime() > Date.now()) {
    coolingDown = true;
    retryNotice = document.createElement('p');
    retryNotice.className = 'project-detail__notice project-detail__retry';
    retryNotice.setAttribute('role', 'status');
    const time = document.createElement('time');
    time.dateTime = retryAt.toISOString();
    time.textContent = formatFullDate(retryAt.toISOString());
    retryNotice.append('Nouvelle tentative possible à ', time, '.');
    section.append(retryNotice);
  }

  const canRequest = !offline
    && detail?.status !== 'loading'
    && detail?.status !== 'loading-cache'
    && !coolingDown;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'project-detail__load';
  button.disabled = !canRequest;
  button.dataset.focusKey = `project-details-${String(project.id)}`;
  button.textContent = coolingDown ? 'Limite GitHub en cours' : readyLabel;
  button.addEventListener('click', () => {
    actions.onProjectDetailsRequest?.(project, Boolean(detail?.details));
  });
  section.append(button);

  if (retryAt && retryNotice) {
    scheduleRetryUnlock(button, retryNotice, retryAt, readyLabel);
  }
  return section;
}
