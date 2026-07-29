import { SYNC_REQUEST_EVENT } from '../../app/events';
import { AppError } from '../../core/errors/app-error';
import type { Project } from '../../core/projects/model';
import type { SyncState } from '../../core/sync/sync-service';
import { formatFullDate, formatRelativeDate } from '../../utils/date';
import { selectDashboard } from './dashboard-selectors';

const MAX_TIMEOUT_MS = 2_147_483_647;

function readableError(error: Error | undefined): string {
  if (!error) return 'Erreur inconnue.';
  return error instanceof AppError ? error.userMessage : error.message;
}

function retryDate(error: Error | undefined, now: Date): Date | undefined {
  if (!(error instanceof AppError) || error.code !== 'rate-limit' || !error.retryAt) return undefined;
  const date = new Date(error.retryAt);
  return Number.isFinite(date.getTime()) && date.getTime() > now.getTime() ? date : undefined;
}

function retryLabel(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function createEyebrow(text: string): HTMLParagraphElement {
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = text;
  return eyebrow;
}

export function createSyncButton(sync: SyncState | undefined, now = new Date()): HTMLButtonElement {
  const button = document.createElement('button');
  const busy = sync?.status === 'syncing' || sync?.status === 'loading-cache';
  const retryAt = retryDate(sync?.error, now);
  const coolingDown = retryAt !== undefined;

  button.type = 'button';
  button.className = 'sync-button';
  button.disabled = busy || coolingDown;
  button.setAttribute('aria-busy', String(busy));

  if (busy) {
    button.textContent = 'Inventaire en cours…';
  } else if (retryAt) {
    const label = retryLabel(retryAt);
    button.textContent = `Réessayer après ${label}`;
    button.title = `GitHub autorisera une nouvelle tentative après ${label}.`;
    const delay = Math.min(retryAt.getTime() - now.getTime(), MAX_TIMEOUT_MS);
    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = 'Actualiser l’inventaire';
      button.removeAttribute('title');
    }, delay);
  } else {
    button.textContent = 'Actualiser l’inventaire';
  }

  button.addEventListener('click', () => {
    if (!button.disabled) window.dispatchEvent(new Event(SYNC_REQUEST_EVENT));
  });
  return button;
}

export function createDashboardHero(sync: SyncState | undefined): HTMLElement {
  const header = document.createElement('header');
  header.className = 'dashboard-hero';

  const copy = document.createElement('div');
  copy.className = 'dashboard-hero__copy';
  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = 'L’atelier en un coup d’œil';
  const lead = document.createElement('p');
  lead.className = 'lead';
  lead.textContent = 'Les projets récemment actifs, les applications prêtes à ouvrir et les mouvements détectés dans La Grange.';
  copy.append(createEyebrow('Vue d’ensemble'), title, lead);

  const actions = document.createElement('div');
  actions.className = 'dashboard-hero__actions';
  actions.append(createSyncButton(sync));

  if (sync?.snapshot?.syncedAt) {
    const lastSync = document.createElement('time');
    const completeDate = formatFullDate(sync.snapshot.syncedAt);
    lastSync.dateTime = sync.snapshot.syncedAt;
    lastSync.title = completeDate;
    lastSync.textContent = `Dernier inventaire ${formatRelativeDate(sync.snapshot.syncedAt)}`;
    lastSync.setAttribute('aria-label', `Dernier inventaire : ${completeDate}`);
    actions.append(lastSync);
  }

  header.append(copy, actions);
  return header;
}

export function createDashboardFeedback(sync: SyncState | undefined): HTMLElement | undefined {
  if (!sync) return undefined;
  if ((sync.status === 'idle' || sync.status === 'ready') && !sync.warning) return undefined;

  const feedback = document.createElement('div');
  feedback.className = 'dashboard-feedback';
  feedback.setAttribute('role', sync.status === 'error' && !sync.snapshot ? 'alert' : 'status');

  if (sync.status === 'loading-cache') {
    feedback.dataset.tone = 'neutral';
    feedback.textContent = sync.snapshot
      ? 'Vérification des réserves locales, le dernier inventaire reste affiché.'
      : 'Ouverture des réserves locales…';
  } else if (sync.status === 'syncing') {
    feedback.dataset.tone = 'syncing';
    feedback.textContent = sync.snapshot
      ? 'Le dernier inventaire reste visible pendant la mise à jour GitHub.'
      : 'La Grange consulte les dépôts publics GitHub.';
  } else if (sync.status === 'offline') {
    feedback.dataset.tone = 'warning';
    feedback.textContent = sync.snapshot
      ? 'La Grange fonctionne sur ses réserves. Les données locales restent consultables.'
      : 'La Grange est hors ligne et ne possède encore aucune réserve locale.';
  } else if (sync.status === 'error') {
    feedback.dataset.tone = 'danger';
    feedback.textContent = sync.snapshot
      ? `Le dernier inventaire est conservé. ${readableError(sync.error)}`
      : readableError(sync.error);

    const retryAt = retryDate(sync.error, new Date());
    if (retryAt) feedback.textContent += ` Nouvelle tentative possible après ${retryLabel(retryAt)}.`;
  }

  if (sync.warning) {
    const warning = document.createElement('span');
    warning.textContent = ` Avertissement : ${readableError(sync.warning)}`;
    feedback.append(warning);
  }

  return feedback;
}

export function createDashboardLoadingState(sync: SyncState | undefined): HTMLElement {
  const state = document.createElement('section');
  state.className = 'dashboard-state dashboard-state--loading';
  state.setAttribute('aria-live', 'polite');

  const title = document.createElement('h2');
  title.textContent = 'Inventaire de l’atelier';
  const message = document.createElement('p');
  message.textContent = sync?.status === 'offline'
    ? 'Aucune réserve locale n’est disponible. Reconnectez l’appareil puis réessayez.'
    : 'La première caisse apparaîtra dès que les données GitHub seront prêtes.';

  const skeleton = document.createElement('div');
  skeleton.className = 'dashboard-skeleton';
  skeleton.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 4; index += 1) skeleton.append(document.createElement('span'));

  state.append(title, message, skeleton);
  if (sync?.status === 'error' || sync?.status === 'offline') state.append(createSyncButton(sync));
  return state;
}

function createStatCard(value: number, label: string, kind: string): HTMLElement {
  const card = document.createElement('article');
  card.className = 'stat-card';
  card.dataset.kind = kind;
  const number = document.createElement('strong');
  number.textContent = String(value);
  const text = document.createElement('span');
  text.textContent = label;
  card.append(number, text);
  return card;
}

export function createDashboardStats(projects: readonly Project[]): HTMLElement {
  const { statistics } = selectDashboard(projects);
  const section = document.createElement('section');
  section.className = 'dashboard-stats';
  section.setAttribute('aria-label', 'Statistiques de l’inventaire');
  section.append(
    createStatCard(statistics.total, 'Projets', 'total'),
    createStatCard(statistics.active, 'Actifs', 'active'),
    createStatCard(statistics.launchable, 'Applications', 'launchable'),
    createStatCard(statistics.archived, 'Archives', 'archived'),
  );
  return section;
}
