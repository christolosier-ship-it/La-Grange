import type { AppState } from '../../app/store';
import { selectVisibleProjects } from '../../core/preferences/project-visibility';
import { createProjectCard } from '../../ui/components/project-card';
import {
  createDashboardFeedback,
  createDashboardLoadingState,
  createDashboardStats,
} from './dashboard-header';

function createEmptyDashboard(): HTMLElement {
  const empty = document.createElement('section');
  empty.className = 'dashboard-empty';
  const title = document.createElement('h2');
  title.textContent = 'Aucun projet visible';
  const text = document.createElement('p');
  text.textContent = 'L’inventaire apparaîtra ici dès qu’un dépôt public sera disponible.';
  empty.append(title, text);
  return empty;
}

export function renderDashboard(state: AppState | undefined): HTMLElement {
  const dashboard = document.createElement('div');
  dashboard.className = 'dashboard';

  const title = document.createElement('h1');
  title.className = 'visually-hidden';
  title.tabIndex = -1;
  title.textContent = 'L’atelier en un coup d’œil';
  dashboard.append(title);

  const feedback = createDashboardFeedback(state?.sync);
  if (feedback) dashboard.append(feedback);

  const inventory = state?.sync.snapshot?.projects;
  if (!inventory) {
    dashboard.append(createDashboardLoadingState(state?.sync));
    return dashboard;
  }

  const projects = selectVisibleProjects(inventory, state.preferences);
  const offline = state.sync.status === 'offline';
  dashboard.append(createDashboardStats(projects));

  if (projects.length === 0) {
    dashboard.append(createEmptyDashboard());
    return dashboard;
  }

  const grid = document.createElement('section');
  grid.className = 'dashboard-project-grid';
  grid.setAttribute('aria-label', 'Projets de La Grange');
  for (const project of projects) {
    grid.append(createProjectCard(project, { variant: 'standard', offline }));
  }
  dashboard.append(grid);
  return dashboard;
}
