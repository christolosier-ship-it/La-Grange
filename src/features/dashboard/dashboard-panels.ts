import type { Project } from '../../core/projects/model';
import { createProjectCard } from '../../ui/components/project-card';
import {
  PLURAL_ACTIVITY_STATE_LABELS,
  SINGULAR_ACTIVITY_STATE_LABELS,
} from '../../ui/text/activity-state-labels';
import { formatFullDate, formatRelativeDate } from '../../utils/date';
import { selectDashboard } from './dashboard-selectors';

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

export function createDashboardEmptyState(message: string): HTMLElement {
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

export function createProjectSection(
  title: string,
  description: string,
  projects: readonly Project[],
  variant: 'standard' | 'compact',
  emptyMessage: string,
  linkLabel?: string,
  offline = false,
): HTMLElement {
  const section = document.createElement('section');
  section.className = `dashboard-section dashboard-section--${variant}`;
  section.append(createSectionHeader(title, description, linkLabel));

  if (projects.length === 0) {
    section.append(createDashboardEmptyState(emptyMessage));
    return section;
  }

  const grid = document.createElement('div');
  grid.className = `project-card-grid project-card-grid--${variant}`;
  for (const project of projects) grid.append(createProjectCard(project, { variant, offline }));
  section.append(grid);
  return section;
}

export function createNewArrivalPanel(project: Project | undefined, offline = false): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'rail-panel rail-panel--arrival';
  const title = document.createElement('h2');
  title.textContent = 'Nouvelle arrivée';
  panel.append(title);

  if (!project) {
    panel.append(createDashboardEmptyState('Aucune nouvelle caisse depuis le dernier inventaire complet.'));
    return panel;
  }

  const description = document.createElement('p');
  description.textContent = 'Ce dépôt vient d’entrer dans l’inventaire.';
  panel.append(description, createProjectCard(project, { variant: 'featured', offline }));
  return panel;
}

export function createActivityPanel(projects: readonly Project[]): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'rail-panel';
  const title = document.createElement('h2');
  title.textContent = 'Activité détectée';
  const description = document.createElement('p');
  description.textContent = 'Derniers mouvements connus, d’après les dates publiques GitHub.';
  panel.append(title, description);

  if (projects.length === 0) {
    panel.append(createDashboardEmptyState('Aucune activité exploitable n’est encore connue.'));
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
    meta.textContent = SINGULAR_ACTIVITY_STATE_LABELS[project.activityState];
    const value = project.pushedAt ?? project.updatedAt;
    const completeDate = formatFullDate(value);
    const time = document.createElement('time');
    if (value) time.dateTime = value;
    time.title = completeDate;
    time.textContent = formatRelativeDate(value);
    time.setAttribute('aria-label', `Dernière activité détectée pour ${project.displayName} : ${completeDate}`);
    item.append(link, meta, time);
    list.append(item);
  }
  panel.append(list);
  return panel;
}

export function createDistributionPanel(projects: readonly Project[]): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'rail-panel';
  const title = document.createElement('h2');
  title.textContent = 'Répartition';
  panel.append(title);

  const { distribution, statistics } = selectDashboard(projects);
  if (statistics.total === 0) {
    panel.append(createDashboardEmptyState('La répartition apparaîtra avec le premier projet.'));
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
    label.textContent = PLURAL_ACTIVITY_STATE_LABELS[state];
    const count = document.createElement('strong');
    count.textContent = String(distribution[state]);
    item.append(label, count);
    legend.append(item);
  }

  panel.append(chart, legend);
  return panel;
}
