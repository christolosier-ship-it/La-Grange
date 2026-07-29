import type { ActivityState, Project, ProjectCategory } from '../../core/projects/model';

export type CatalogueSort = 'activity-desc' | 'name-asc' | 'name-desc' | 'created-desc';
export type CatalogueView = 'grid' | 'list';
export type CatalogueCategory = ProjectCategory | 'all';

export interface CatalogueState {
  readonly query: string;
  readonly states: readonly ActivityState[];
  readonly category: CatalogueCategory;
  readonly language: string;
  readonly favoritesOnly: boolean;
  readonly sort: CatalogueSort;
  readonly view: CatalogueView;
}

export interface CatalogueFacets {
  readonly languages: readonly string[];
  readonly categories: readonly ProjectCategory[];
}

const ACTIVITY_STATES: readonly ActivityState[] = ['active', 'maintenance', 'sleeping', 'archived'];
const CATEGORIES: readonly ProjectCategory[] = [
  'games',
  'applications',
  'professional-tools',
  'experiments',
  'learning',
  'uncategorized',
];
const SORTS: readonly CatalogueSort[] = ['activity-desc', 'name-asc', 'name-desc', 'created-desc'];
const VIEWS: readonly CatalogueView[] = ['grid', 'list'];

export const DEFAULT_CATALOGUE_STATE: CatalogueState = {
  query: '',
  states: [],
  category: 'all',
  language: 'all',
  favoritesOnly: false,
  sort: 'activity-desc',
  view: 'grid',
};

export function normalizeSearchValue(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('fr-FR')
    .trim();
}

function projectSearchIndex(project: Project): string {
  return normalizeSearchValue([
    project.displayName,
    project.repositoryName,
    project.description,
    project.language ?? '',
    project.category,
    ...project.topics,
  ].join(' '));
}

function activityTimestamp(project: Project): number {
  const value = project.pushedAt ?? project.updatedAt;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function compareNames(left: Project, right: Project): number {
  return left.displayName.localeCompare(right.displayName, 'fr', { sensitivity: 'base' })
    || left.repositoryName.localeCompare(right.repositoryName, 'fr', { sensitivity: 'base' })
    || left.id - right.id;
}

export function selectCatalogueProjects(
  projects: readonly Project[],
  state: CatalogueState,
  favoriteIds: readonly number[],
): Project[] {
  const query = normalizeSearchValue(state.query);
  const favoriteSet = new Set(favoriteIds);
  const stateSet = new Set(state.states);

  return projects
    .filter((project) => !query || projectSearchIndex(project).includes(query))
    .filter((project) => stateSet.size === 0 || stateSet.has(project.activityState))
    .filter((project) => state.category === 'all' || project.category === state.category)
    .filter((project) => state.language === 'all' || project.language === state.language)
    .filter((project) => !state.favoritesOnly || favoriteSet.has(project.id))
    .sort((left, right) => {
      if (state.sort === 'name-asc') return compareNames(left, right);
      if (state.sort === 'name-desc') return compareNames(right, left);
      if (state.sort === 'created-desc') {
        const dateOrder = Date.parse(right.createdAt) - Date.parse(left.createdAt);
        return dateOrder || compareNames(left, right);
      }
      return activityTimestamp(right) - activityTimestamp(left) || compareNames(left, right);
    });
}

export function catalogueFacets(projects: readonly Project[]): CatalogueFacets {
  const languages = [...new Set(projects.map((project) => project.language).filter((value): value is string => (
    typeof value === 'string' && value.trim().length > 0
  )))].sort((left, right) => left.localeCompare(right, 'fr', { sensitivity: 'base' }));
  const categorySet = new Set(projects.map((project) => project.category));
  return {
    languages,
    categories: CATEGORIES.filter((category) => categorySet.has(category)),
  };
}

function parseStates(value: string | null): ActivityState[] {
  if (!value) return [];
  const requested = new Set(value.split(','));
  return ACTIVITY_STATES.filter((state) => requested.has(state));
}

export function catalogueStateFromQuery(
  query: URLSearchParams,
  fallback: CatalogueState = DEFAULT_CATALOGUE_STATE,
): CatalogueState {
  const categoryValue = query.get('category');
  const category = categoryValue && CATEGORIES.includes(categoryValue as ProjectCategory)
    ? categoryValue as ProjectCategory
    : 'all';
  const sortValue = query.get('sort');
  const sort = sortValue && SORTS.includes(sortValue as CatalogueSort)
    ? sortValue as CatalogueSort
    : fallback.sort;
  const viewValue = query.get('view');
  const view = viewValue && VIEWS.includes(viewValue as CatalogueView)
    ? viewValue as CatalogueView
    : fallback.view;

  return {
    query: query.get('q') ?? '',
    states: parseStates(query.get('state')),
    category,
    language: query.get('language') || 'all',
    favoritesOnly: query.get('favorites') === '1',
    sort,
    view,
  };
}

export function catalogueStateToQuery(state: CatalogueState): URLSearchParams {
  const query = new URLSearchParams();
  const trimmedQuery = state.query.trim();
  if (trimmedQuery) query.set('q', trimmedQuery);
  if (state.states.length > 0) query.set('state', state.states.join(','));
  if (state.category !== 'all') query.set('category', state.category);
  if (state.language !== 'all') query.set('language', state.language);
  if (state.favoritesOnly) query.set('favorites', '1');
  if (state.sort !== DEFAULT_CATALOGUE_STATE.sort) query.set('sort', state.sort);
  if (state.view !== DEFAULT_CATALOGUE_STATE.view) query.set('view', state.view);
  return query;
}

export function catalogueHash(state: CatalogueState): string {
  const query = catalogueStateToQuery(state).toString();
  return query ? `#/projects?${query}` : '#/projects';
}

export function catalogueStatesEqual(left: CatalogueState, right: CatalogueState): boolean {
  return left.query === right.query
    && left.category === right.category
    && left.language === right.language
    && left.favoritesOnly === right.favoritesOnly
    && left.sort === right.sort
    && left.view === right.view
    && left.states.length === right.states.length
    && left.states.every((state, index) => state === right.states[index]);
}
