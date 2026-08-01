import type { ActivityState } from '../../core/projects/model';
import { PLURAL_ACTIVITY_STATE_LABELS } from '../../ui/text/activity-state-labels';
import { PROJECT_CATEGORY_LABELS } from '../../ui/text/project-labels';
import type { CatalogueFacets, CatalogueState } from './catalogue-model';

const ACTIVITY_STATE_ORDER: readonly ActivityState[] = ['active', 'maintenance', 'sleeping', 'archived'];

const SORT_LABELS = {
  'activity-desc': 'Activité récente',
  'name-asc': 'Nom de A à Z',
  'name-desc': 'Nom de Z à A',
  'created-desc': 'Création récente',
} as const;

export interface CatalogueControls {
  readonly element: HTMLElement;
  readonly sync: (state: CatalogueState) => void;
}

function createSelect(
  labelText: string,
  focusKey: string,
  options: readonly (readonly [string, string])[],
  onChange: (value: string) => void,
): { readonly field: HTMLElement; readonly select: HTMLSelectElement } {
  const field = document.createElement('label');
  field.className = 'catalogue-field';
  const label = document.createElement('span');
  label.textContent = labelText;
  const select = document.createElement('select');
  select.dataset.focusKey = focusKey;
  for (const [value, text] of options) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    select.append(option);
  }
  select.addEventListener('change', () => onChange(select.value));
  field.append(label, select);
  return { field, select };
}

export function createCatalogueControls(
  initialState: CatalogueState,
  facets: CatalogueFacets,
  onChange: (state: CatalogueState) => void,
): CatalogueControls {
  let current = initialState;
  const controls = document.createElement('section');
  controls.className = 'catalogue-controls';
  controls.setAttribute('aria-label', 'Recherche, filtres et affichage du catalogue');

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'catalogue-controls__toggle';
  toggle.textContent = 'Masquer la recherche et les filtres';
  toggle.setAttribute('aria-expanded', 'true');

  const body = document.createElement('div');
  body.className = 'catalogue-controls__body';
  body.id = 'catalogue-controls-body';
  toggle.setAttribute('aria-controls', body.id);
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.textContent = expanded ? 'Afficher la recherche et les filtres' : 'Masquer la recherche et les filtres';
    body.hidden = expanded;
  });

  const searchGroup = document.createElement('div');
  searchGroup.className = 'catalogue-search';
  const searchLabel = document.createElement('label');
  searchLabel.htmlFor = 'catalogue-search-field';
  searchLabel.textContent = 'Rechercher un projet';
  const searchRow = document.createElement('div');
  const search = document.createElement('input');
  search.id = 'catalogue-search-field';
  search.type = 'search';
  search.autocomplete = 'off';
  search.placeholder = 'Nom, description, topic ou langage';
  search.dataset.focusKey = 'catalogue-search';
  const clear = document.createElement('button');
  clear.type = 'button';
  clear.textContent = 'Effacer';
  clear.dataset.focusKey = 'catalogue-clear';
  search.addEventListener('input', () => {
    current = { ...current, query: search.value };
    clear.disabled = current.query.length === 0;
    onChange(current);
  });
  clear.addEventListener('click', () => {
    current = { ...current, query: '' };
    search.value = '';
    clear.disabled = true;
    onChange(current);
    search.focus();
  });
  searchRow.append(search, clear);
  searchGroup.append(searchLabel, searchRow);

  const stateGroup = document.createElement('div');
  stateGroup.className = 'catalogue-filter-group';
  const stateTitle = document.createElement('span');
  stateTitle.className = 'catalogue-filter-label';
  stateTitle.textContent = 'État';
  const stateButtons = new Map<ActivityState, HTMLButtonElement>();
  const stateRow = document.createElement('div');
  stateRow.className = 'catalogue-chips';
  for (const state of ACTIVITY_STATE_ORDER) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.textContent = PLURAL_ACTIVITY_STATE_LABELS[state];
    button.dataset.focusKey = `catalogue-state-${state}`;
    button.addEventListener('click', () => {
      const selected = new Set(current.states);
      if (selected.has(state)) selected.delete(state);
      else selected.add(state);
      current = { ...current, states: ACTIVITY_STATE_ORDER.filter((value) => selected.has(value)) };
      button.setAttribute('aria-pressed', String(current.states.includes(state)));
      onChange(current);
    });
    stateButtons.set(state, button);
    stateRow.append(button);
  }
  stateGroup.append(stateTitle, stateRow);

  const categoryControl = createSelect(
    'Catégorie', 'catalogue-category',
    [['all', 'Toutes les catégories'], ...facets.categories.map((category) => [category, PROJECT_CATEGORY_LABELS[category]] as const)],
    (value) => { current = { ...current, category: value as CatalogueState['category'] }; onChange(current); },
  );
  const languageControl = createSelect(
    'Langage', 'catalogue-language',
    [['all', 'Tous les langages'], ...facets.languages.map((language) => [language, language] as const)],
    (value) => { current = { ...current, language: value }; onChange(current); },
  );
  const sortControl = createSelect(
    'Trier par', 'catalogue-sort', Object.entries(SORT_LABELS),
    (value) => { current = { ...current, sort: value as CatalogueState['sort'] }; onChange(current); },
  );

  const favorite = document.createElement('button');
  favorite.type = 'button';
  favorite.className = 'filter-chip catalogue-favorite-filter';
  favorite.textContent = 'Favoris uniquement';
  favorite.dataset.focusKey = 'catalogue-favorites';
  favorite.addEventListener('click', () => {
    current = { ...current, favoritesOnly: !current.favoritesOnly };
    favorite.setAttribute('aria-pressed', String(current.favoritesOnly));
    onChange(current);
  });

  const viewGroup = document.createElement('div');
  viewGroup.className = 'catalogue-view-toggle';
  viewGroup.setAttribute('aria-label', 'Mode d’affichage');
  const grid = document.createElement('button');
  grid.type = 'button';
  grid.textContent = 'Grille';
  grid.dataset.focusKey = 'catalogue-view-grid';
  const list = document.createElement('button');
  list.type = 'button';
  list.textContent = 'Liste';
  list.dataset.focusKey = 'catalogue-view-list';
  grid.addEventListener('click', () => {
    current = { ...current, view: 'grid' };
    grid.setAttribute('aria-pressed', 'true');
    list.setAttribute('aria-pressed', 'false');
    onChange(current);
  });
  list.addEventListener('click', () => {
    current = { ...current, view: 'list' };
    grid.setAttribute('aria-pressed', 'false');
    list.setAttribute('aria-pressed', 'true');
    onChange(current);
  });
  viewGroup.append(grid, list);

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'catalogue-reset';
  reset.textContent = 'Réinitialiser les filtres';
  reset.dataset.focusKey = 'catalogue-reset';

  const secondary = document.createElement('div');
  secondary.className = 'catalogue-controls__secondary';
  secondary.append(categoryControl.field, languageControl.field, sortControl.field, favorite, viewGroup, reset);
  body.append(searchGroup, stateGroup, secondary);
  controls.append(toggle, body);

  const sync = (state: CatalogueState): void => {
    current = state;
    search.value = state.query;
    clear.disabled = state.query.length === 0;
    for (const [activityState, button] of stateButtons) button.setAttribute('aria-pressed', String(state.states.includes(activityState)));
    categoryControl.select.value = state.category;
    languageControl.select.value = state.language;
    sortControl.select.value = state.sort;
    favorite.setAttribute('aria-pressed', String(state.favoritesOnly));
    grid.setAttribute('aria-pressed', String(state.view === 'grid'));
    list.setAttribute('aria-pressed', String(state.view === 'list'));
  };

  reset.addEventListener('click', () => {
    current = { query: '', states: [], category: 'all', language: 'all', favoritesOnly: false, sort: 'activity-desc', view: current.view };
    sync(current);
    onChange(current);
    search.focus();
  });

  sync(initialState);
  return { element: controls, sync };
}