import type { AppState } from '../../app/store';
import { AppError } from '../../core/errors/app-error';
import { selectVisibleProjects } from '../../core/preferences/project-visibility';
import type { Project } from '../../core/projects/model';
import { createProjectCard } from '../../ui/components/project-card';
import type { ViewActions } from '../view-actions';
import { createCatalogueControls } from './catalogue-controls';
import {
  DEFAULT_CATALOGUE_STATE,
  catalogueFacets,
  catalogueHash,
  selectCatalogueProjects,
  type CatalogueState,
} from './catalogue-model';

function projectDetailHref(project: Project, catalogue: CatalogueState): string {
  const query = new URLSearchParams({ from: catalogueHash(catalogue) });
  return `#/project/${encodeURIComponent(project.repositoryName)}?${query}`;
}

function readableError(error: Error | undefined): string {
  if (!error) return 'Aucun projet n’est encore disponible.';
  return error instanceof AppError ? error.userMessage : error.message;
}

function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'catalogue-header';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Inventaire';
  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = 'Tous les projets';
  const description = document.createElement('p');
  description.className = 'lead';
  description.textContent = 'Recherchez, filtrez et ouvrez chaque caisse visible de La Grange sans nouvel appel à GitHub.';
  header.append(eyebrow, title, description);
  return header;
}

function createUnavailableState(state: AppState | undefined): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'catalogue-unavailable';
  const title = document.createElement('h2');
  title.textContent = 'Inventaire indisponible';
  const message = document.createElement('p');
  if (state?.sync.status === 'loading-cache' || state?.sync.status === 'syncing') {
    message.textContent = 'La Grange ouvre encore ses réserves. Le catalogue apparaîtra dès que l’inventaire sera prêt.';
  } else if (state?.sync.status === 'offline') {
    message.textContent = 'Aucun inventaire local n’est disponible hors ligne pour le moment.';
  } else {
    message.textContent = readableError(state?.sync.error);
  }
  panel.append(title, message);
  return panel;
}

export function renderCatalogue(
  state: AppState | undefined,
  actions: ViewActions = {},
): HTMLElement {
  const view = document.createElement('div');
  view.className = 'catalogue';
  view.append(createHeader());

  const inventory = state?.sync.snapshot?.projects;
  if (!inventory) {
    view.append(createUnavailableState(state));
    return view;
  }

  const projects = selectVisibleProjects(inventory, state.preferences);
  let current = state.catalogue;
  let synchronizeControls: (next: CatalogueState) => void = () => undefined;
  const facets = catalogueFacets(projects);
  const resultsSection = document.createElement('section');
  resultsSection.className = 'catalogue-results';
  resultsSection.setAttribute('aria-labelledby', 'catalogue-results-title');

  const resultsHeader = document.createElement('header');
  const resultsTitle = document.createElement('h2');
  resultsTitle.id = 'catalogue-results-title';
  resultsTitle.textContent = 'Résultats';
  const count = document.createElement('p');
  count.className = 'catalogue-count';
  count.setAttribute('aria-live', 'polite');
  resultsHeader.append(resultsTitle, count);

  const results = document.createElement('div');
  results.className = 'catalogue-grid';
  resultsSection.append(resultsHeader, results);

  const updateResults = (): void => {
    const selected = selectCatalogueProjects(projects, current, state.favoriteIds);
    count.textContent = `${String(selected.length)} projet${selected.length > 1 ? 's' : ''} sur ${String(projects.length)} visible${projects.length > 1 ? 's' : ''}`;
    results.className = current.view === 'list'
      ? 'catalogue-grid catalogue-grid--list'
      : 'catalogue-grid catalogue-grid--cards';
    results.replaceChildren();

    if (selected.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'catalogue-empty';
      const title = document.createElement('h3');
      title.textContent = 'Aucun projet ne correspond à cet inventaire';
      const message = document.createElement('p');
      message.textContent = projects.length === 0
        ? 'Les préférences actuelles masquent tous les projets. Modifiez-les dans Paramètres.'
        : 'Essayez une recherche plus large ou remettez les filtres à zéro.';
      const reset = document.createElement('button');
      reset.type = 'button';
      reset.textContent = 'Réinitialiser les filtres';
      reset.addEventListener('click', () => {
        current = { ...DEFAULT_CATALOGUE_STATE, view: current.view };
        synchronizeControls(current);
        actions.onCatalogueChange?.(current);
        updateResults();
      });
      empty.append(title, message, reset);
      results.append(empty);
      return;
    }

    for (const project of selected) {
      results.append(createProjectCard(project, {
        variant: current.view === 'list' ? 'list' : 'standard',
        offline: state.sync.status === 'offline',
        detailHref: projectDetailHref(project, current),
        favorite: state.favoriteIds.includes(project.id),
        onToggleFavorite: actions.onToggleFavorite,
      }));
    }
  };

  const controls = createCatalogueControls(current, facets, (next) => {
    current = next;
    actions.onCatalogueChange?.(next);
    updateResults();
  });
  synchronizeControls = controls.sync;

  view.append(controls.element, resultsSection);
  updateResults();
  return view;
}
