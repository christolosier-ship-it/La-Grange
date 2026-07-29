import type { RouteMatch } from '../app/routes';
import type { AppState } from '../app/store';
import { renderActivity } from './activity/activity-view';
import { renderCatalogue } from './catalogue/catalogue-view';
import { renderDashboard } from './dashboard/dashboard-view';
import { renderProjectDetail } from './project-detail/project-detail-view';
import { renderSettings } from './settings/settings-view';
import type { ViewActions } from './view-actions';

interface ViewContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

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

function renderNotFound(): HTMLElement {
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

export function renderView(
  route: RouteMatch,
  state?: AppState,
  actions: ViewActions = {},
): HTMLElement {
  if (route.name === 'projects') return renderCatalogue(state, actions);
  if (route.name === 'project') return renderProjectDetail(route, state, actions);
  if (route.name === 'dashboard') return renderDashboard(state);
  if (route.name === 'activity') return renderActivity(state);
  if (route.name === 'settings') return renderSettings(state, actions);
  return renderNotFound();
}
