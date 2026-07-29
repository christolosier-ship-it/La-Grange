import type { AppState } from '../../app/store';
import {
  createDashboardFeedback,
  createDashboardHero,
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
  dashboard.append(createDashboardHero(state?.sync));

  const feedback = createDashboardFeedback(state?.sync);
  if (feedback) dashboard.append(feedback);

  const projects = state?.sync.snapshot?.projects;
  if (!projects) {
    dashboard.append(createDashboardLoadingState(state?.sync));
    return dashboard;
  }

  const model = selectDashboard(projects);
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
    createNewArrivalPanel(model.newArrival),
    createActivityPanel(model.recentActivity),
    createDistributionPanel(projects),
  );

  layout.append(main, rail);
  dashboard.append(layout);
  return dashboard;
}
