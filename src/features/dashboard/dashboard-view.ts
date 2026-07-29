import { SYNC_REQUEST_EVENT } from '../../app/events';
import type { AppState } from '../../app/store';
import { AppError } from '../../core/errors/app-error';
import type { ActivityState, Project } from '../../core/projects/model';
import type { SyncState } from '../../core/sync/sync-service';
import { createProjectCard } from '../../ui/components/project-card';
import { formatFullDate, formatRelativeDate } from '../../utils/date';
import { selectDashboard } from './dashboard-selectors';

const STATE_LABELS: Record<ActivityState, string> = {
  active: 'Actifs',
  maintenance: 'Maintenance',
  sleeping: 'En sommeil',
  archived: 'Archivés',
};

function readableError(error: Error | undefined): string {
  if (!error) return 'Erreur inconnue.';
  return error instanceof AppError ? error.userMessage : error.message;
}

function createEyebrow(text: string): HTMLParagraphElement {
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = text;
  return eyebrow;
}

function createSyncButton(sync: SyncState | undefined): HTMLButtonElement {
  const button = document.createElement('button');
  const busy = sync?.status === 'syncing' || sync?.status === 'loading-cache';
  button.type = 'button';
  button.className = 'sync-button';
  button.disabled = busy;
  button.setAttribute('aria-busy', String(busy));
  button.textContent = busy ? 'Inventaire en cours…' : 'Actualiser l’inventaire';
  button.addEventListener('click', () => {
    window.dispatchEvent(new Event(SYNC_REQUEST_EVENT));
  });
  return button;
}

function createHero(sync: SyncState | undefined): HTMLElement {
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
    lastSync.dateTime = sync.snapshot.syncedAt;
    lastSync.title = formatFullDate(sync.snapshot.syncedAt);
    lastSync.textContent = `Dernier inventaire ${formatRelativeDate(sync.snapshot.syncedAt)}`;
    actions.append(lastSync);
  }

  header.append(copy, actions);
  return header;
}

function createFeedback(sync: SyncState | undefined): HTMLElement | undefined {
  if (!sync) return undefined;
  if ((sync.status === 'idle' || sync.status === 'ready') && !sync.warning) return undefined;

  const feedback = document.createElement('div');
  feedback.className = 'dashboard-feedback';
  feedback.setAttribute('role', sync.status === 'error' && !sync.snapshot ? 'alert' : 'status');

  if (sync.status === 'loading-cache') {
    feedback.dataset.tone = 'neutral';
    feedback.textContent = 'Ouverture des réserves locales…';
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
  }

  if (sync.warning) {
    const warning = document.createElement('span');
    warning.textContent = ` Avertissement : ${readableError(sync.warning)}`;
    feedback.append(warning);
  }

  return feedback;
}

function createLoadingState(sync: SyncState | undefined): HTMLElement {
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

function createStats(projects: readonly Project[]): HTMLElement {
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

function createSectionHeader(titleText: string, descriptionText: string, linkLabel?: string): HTMLElement {
  const header = document.createElement('header');
  header.className = 'dashboard-section__header';
  const copy = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = titleText;
  const description = document.createElement('p');
  description.textContent = descriptionText;
  copy.append(title, description);
  header.append(copy);

  if (linkLabel) {
    const link = document.createElement('a');
    link.href = '#/projects';
    link.textContent = linkLabel;
    header.append(link);
  }
  return header;
}

function createEmptyState(message: string): HTMLElement {
  const empty = document.createElement('div');
  empty.className = 'dashboard-empty';
  const marker = document.createElement('span');
  marker.setAttribute('aria-hidden', 'true');
  marker.textContent = 'LG';
  const text = document.createElement('p');
  text.textContent = message;
  empty.append(marker, text);
  return empty;
}

function createProjectSection(
  title: string,
  description: string,
  projects: readonly Project[],
  variant: 'standard' | 'compact',
  emptyMessage: string,
  linkLabel?: string,
): HTMLElement {
  const section = document.createElement('section');
  section.className = `dashboard-section dashboard-section--${variant}`;
  section.append(createSectionHeader(title, description, linkLabel));

  if (projects.length === 0) {
    section.append(createEmptyState(emptyMessage));
    return section;
  }

  const grid = document.createElement('div');
  grid.className = `project-card-grid project-card-grid--${variant}`;
  for (const project of projects) grid.append(createProjectCard(project, { variant }));
  section.append(grid);
  return section;
}

function createNewArrival(project: Project | undefined): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'rail-panel rail-panel--arrival';
  const title = document.createElement('h2');
  title.textContent = 'Nouvelle arrivée';
  panel.append(title);

  if (!project) {
    panel.append(createEmptyState('Aucune nouvelle caisse depuis le dernier inventaire complet.'));
    return panel;
  }

  const description = document.createElement('p');
  description.textContent = 'Ce dépôt vient d’entrer dans l’inventaire.';
  panel.append(description, createProjectCard(project, { variant: 'featured' }));
  return panel;
}

function createActivityPanel(projects: readonly Project[]): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'rail-panel';
  const title = document.createElement('h2');
  title.textContent = 'Activité détectée';
  const description = document.createElement('p');
  description.textContent = 'Derniers mouvements connus, d’après les dates publiques GitHub.';
  panel.append(title, description);

  if (projects.length === 0) {
    panel.append(createEmptyState('Aucune activité exploitable n’est encore connue.'));
    return panel;
  }

  const list = document.createElement('ol');
  list.className = 'activity-list';
  for (const project of projects) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#/project/${encodeURIComponent(project.repositoryName)}`;
    link.textContent = project.displayName;
    const meta = document.createElement('span');
    meta.textContent = STATE_LABELS[project.activityState];
    const value = project.pushedAt ?? project.updatedAt;
    const time = document.createElement('time');
    if (value) time.dateTime = value;
    time.title = formatFullDate(value);
    time.textContent = formatRelativeDate(value);
    item.append(link, meta, time);
    list.append(item);
  }
  panel.append(list);
  return panel;
}

function createDistribution(projects: readonly Project[]): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'rail-panel';
  const title = document.createElement('h2');
  title.textContent = 'Répartition';
  panel.append(title);

  const { distribution, statistics } = selectDashboard(projects);
  if (statistics.total === 0) {
    panel.append(createEmptyState('La répartition apparaîtra avec le premier projet.'));
    return panel;
  }

  const activeEnd = distribution.active / statistics.total * 100;
  const maintenanceEnd = activeEnd + distribution.maintenance / statistics.total * 100;
  const sleepingEnd = maintenanceEnd + distribution.sleeping / statistics.total * 100;
  const chart = document.createElement('div');
  chart.className = 'distribution-chart';
  chart.style.background = `conic-gradient(var(--color-green) 0 ${String(activeEnd)}%, var(--color-amber) ${String(activeEnd)}% ${String(maintenanceEnd)}%, var(--color-blue) ${String(maintenanceEnd)}% ${String(sleepingEnd)}%, var(--color-purple) ${String(sleepingEnd)}% 100%)`;
  chart.setAttribute('role', 'img');
  chart.setAttribute('aria-label', `${String(distribution.active)} actifs, ${String(distribution.maintenance)} en maintenance, ${String(distribution.sleeping)} en sommeil et ${String(distribution.archived)} archivés.`);

  const total = document.createElement('span');
  const totalValue = document.createElement('strong');
  totalValue.textContent = String(statistics.total);
  const totalLabel = document.createElement('small');
  totalLabel.textContent = 'projets';
  total.append(totalValue, totalLabel);
  chart.append(total);

  const legend = document.createElement('ul');
  legend.className = 'distribution-legend';
  for (const state of ['active', 'maintenance', 'sleeping', 'archived'] as const) {
    const item = document.createElement('li');
    item.dataset.state = state;
    const label = document.createElement('span');
    label.textContent = STATE_LABELS[state];
    const count = document.createElement('strong');
    count.textContent = String(distribution[state]);
    item.append(label, count);
    legend.append(item);
  }

  panel.append(chart, legend);
  return panel;
}

export function renderDashboard(state: AppState | undefined): HTMLElement {
  const dashboard = document.createElement('div');
  dashboard.className = 'dashboard';
  dashboard.append(createHero(state?.sync));

  const feedback = createFeedback(state?.sync);
  if (feedback) dashboard.append(feedback);

  const projects = state?.sync.snapshot?.projects;
  if (!projects) {
    dashboard.append(createLoadingState(state?.sync));
    return dashboard;
  }

  const model = selectDashboard(projects);
  dashboard.append(createStats(projects));

  const layout = document.createElement('div');
  layout.className = 'dashboard-layout';
  const main = document.createElement('div');
  main.className = 'dashboard-main';
  main.append(
    createProjectSection(
      'L’établi',
      'Les projets dont une activité a été détectée au cours des trente derniers jours.',
      model.workbench,
      'standard',
      'Aucun projet actif n’attend sur l’établi.',
      'Voir tout l’inventaire',
    ),
    createProjectSection(
      'Prêts à partir',
      'Des applications disposant d’une adresse HTTPS directement exploitable.',
      model.readyToLaunch,
      'compact',
      'Aucune autre application lançable n’est disponible dans cette sélection.',
    ),
  );

  const rail = document.createElement('aside');
  rail.className = 'dashboard-rail';
  rail.setAttribute('aria-label', 'Informations complémentaires du dashboard');
  rail.append(
    createNewArrival(model.newArrival),
    createActivityPanel(model.recentActivity),
    createDistribution(projects),
  );

  layout.append(main, rail);
  dashboard.append(layout);
  return dashboard;
}
