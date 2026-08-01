import type { AppState } from '../../app/store';
import { selectVisibleProjects } from '../../core/preferences/project-visibility';
import {
  createDashboardFeedback,
  createDashboardLoadingState,
  createDashboardStats,
} from './dashboard-header';
import {
  createActivityPanel,
  createDistributionPanel,
  createNewArrivalPanel,
  createProjectSection,
} from './dashboard-panels';
import { selectDashboard } from './dashboard-selectors';

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
  const model = selectDashboard(projects);
  const offline = state.sync.status === 'offline';
  dashboard.append(createDashboardStats(projects));

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
      'Aucun projet actif visible n’attend sur l’établi.',
      'Voir tout l’inventaire',
      offline,
    ),
    createProjectSection(
      'Prêts à partir',
      'Des applications visibles disposant d’une adresse HTTPS directement exploitable.',
      model.readyToLaunch,
      'compact',
      'Aucune autre application lançable n’est disponible dans cette sélection.',
      undefined,
      offline,
    ),
  );

  const rail = document.createElement('aside');
  rail.className = 'dashboard-rail';
  rail.setAttribute('aria-label', 'Informations complémentaires du dashboard');
  rail.append(
    createNewArrivalPanel(model.newArrival, offline),
    createActivityPanel(model.recentActivity),
    createDistributionPanel(projects),
  );

  layout.append(main, rail);
  dashboard.append(layout);
  return dashboard;
}