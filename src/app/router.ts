import type { Project } from '../core/projects/model';
import {
  catalogueStateFromQuery,
  catalogueStatesEqual,
} from '../features/catalogue/catalogue-model';
import { renderView } from '../features/views';
import type { ViewActions } from '../features/view-actions';
import { updateActiveNavigation, updateWorkbenchStatus } from '../ui/layout/app-shell';
import { matchRoute, type RouteMatch } from './routes';
import type { AppState, AppStore } from './store';

const TITLES = {
  dashboard: 'Vue d’ensemble',
  projects: 'Tous les projets',
  project: 'Projet',
  activity: 'Activité',
  settings: 'Paramètres',
  'not-found': 'Page introuvable',
} as const;

export interface RouterActions extends ViewActions {
  readonly onProjectOpened?: (repositoryName: string) => Promise<void> | void;
  readonly onProjectRoute?: (project: Project) => Promise<void> | void;
}

interface FocusSnapshot {
  readonly key: string;
  readonly selectionStart?: number | null;
  readonly selectionEnd?: number | null;
}

function captureFocus(main: HTMLElement): FocusSnapshot | undefined {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement) || !main.contains(active)) return undefined;
  const key = active.dataset.focusKey;
  if (!key) return undefined;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
    return { key, selectionStart: active.selectionStart, selectionEnd: active.selectionEnd };
  }
  return { key };
}

function restoreFocus(main: HTMLElement, snapshot: FocusSnapshot | undefined): void {
  if (!snapshot) return;
  const target = [...main.querySelectorAll<HTMLElement>('[data-focus-key]')].find((candidate) => (
    candidate.dataset.focusKey === snapshot.key
  ));
  if (!target) return;
  target.focus({ preventScroll: true });
  if (
    (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
    && snapshot.selectionStart !== undefined
    && snapshot.selectionEnd !== undefined
  ) {
    target.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd);
  }
}

function projectForRoute(route: RouteMatch, state: AppState | undefined): Project | undefined {
  if (route.name !== 'project') return undefined;
  const repositoryName = route.params.repositoryName;
  if (!repositoryName) return undefined;
  return state?.sync.snapshot?.projects.find((project) => project.repositoryName === repositoryName);
}

function canonicalProjectRoute(
  route: RouteMatch,
  state: AppState | undefined,
  windowObject: Window,
): RouteMatch {
  if (route.name !== 'project' || projectForRoute(route, state)) return route;
  const repositoryName = route.params.repositoryName;
  if (!repositoryName) return route;
  const projectId = state?.sync.snapshot?.aliases?.[repositoryName];
  const project = state?.sync.snapshot?.projects.find((candidate) => candidate.id === projectId);
  if (!project) return route;

  const query = new URLSearchParams(route.query);
  query.set('renamedFrom', repositoryName);
  const suffix = query.toString();
  const hash = `#/project/${encodeURIComponent(project.repositoryName)}${suffix ? `?${suffix}` : ''}`;
  windowObject.history.replaceState(null, '', hash);
  return matchRoute(hash);
}

function invokeSafely(callback: () => Promise<void> | void): void {
  try {
    void Promise.resolve(callback()).catch(() => undefined);
  } catch {
    // View navigation remains usable if a background side effect fails.
  }
}

export function createRouter(
  shell: HTMLElement,
  windowObject: Window = window,
  store?: AppStore,
  actions: RouterActions = {},
) {
  const main = shell.querySelector<HTMLElement>('main');
  if (!main) throw new Error('Le shell doit contenir un élément main.');

  let unsubscribe: (() => void) | undefined;
  let started = false;
  let notifiedProjectKey = '';

  const render = (focusHeading: boolean): void => {
    const focus = focusHeading ? undefined : captureFocus(main);
    let route = matchRoute(windowObject.location.hash);
    let state = store?.getState();

    if (route.name === 'projects' && state && store) {
      const catalogue = catalogueStateFromQuery(route.query, state.catalogue);
      if (!catalogueStatesEqual(catalogue, state.catalogue)) {
        store.setCatalogue(catalogue, false);
        state = store.getState();
      }
    }

    route = canonicalProjectRoute(route, state, windowObject);
    const project = projectForRoute(route, state);
    const view = renderView(route, state, actions);
    main.replaceChildren(view);
    updateActiveNavigation(shell, route.name);
    updateWorkbenchStatus(shell, state?.sync);

    document.title = project
      ? `${project.displayName} · La Grange`
      : `${TITLES[route.name]} · La Grange`;

    const currentProjectKey = project ? `${String(project.id)}:${project.repositoryName}` : '';
    if (project && currentProjectKey !== notifiedProjectKey) {
      if (actions.onProjectOpened) {
        const onProjectOpened = actions.onProjectOpened;
        invokeSafely(() => onProjectOpened(project.repositoryName));
      }
      if (actions.onProjectRoute) {
        const onProjectRoute = actions.onProjectRoute;
        invokeSafely(() => onProjectRoute(project));
      }
    }
    notifiedProjectKey = currentProjectKey;

    if (focusHeading) view.querySelector<HTMLHeadingElement>('h1')?.focus({ preventScroll: true });
    else restoreFocus(main, focus);
  };

  const handleRouteChange = (): void => {
    render(true);
  };

  return {
    start: (): void => {
      if (started) return;
      started = true;
      windowObject.addEventListener('hashchange', handleRouteChange);
      unsubscribe = store?.subscribe(() => {
        render(false);
      });
      render(true);
    },
    stop: (): void => {
      if (!started) return;
      started = false;
      windowObject.removeEventListener('hashchange', handleRouteChange);
      unsubscribe?.();
      unsubscribe = undefined;
      notifiedProjectKey = '';
    },
    render: (): void => {
      render(false);
    },
  };
}
