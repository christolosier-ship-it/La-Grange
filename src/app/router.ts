import { matchRoute } from './routes';
import type { AppStore } from './store';
import { renderView } from '../features/views';
import { updateActiveNavigation, updateWorkbenchStatus } from '../ui/layout/app-shell';

const TITLES = {
  dashboard: 'Vue d’ensemble',
  projects: 'Tous les projets',
  project: 'Projet',
  activity: 'Activité',
  settings: 'Paramètres',
  'not-found': 'Page introuvable',
} as const;

export type ProjectOpenedListener = (repositoryName: string) => Promise<void> | void;

export function createRouter(
  shell: HTMLElement,
  windowObject: Window = window,
  store?: AppStore,
  onProjectOpened?: ProjectOpenedListener,
) {
  const main = shell.querySelector<HTMLElement>('main');
  if (!main) throw new Error('Le shell doit contenir un élément main.');

  let unsubscribe: (() => void) | undefined;
  let started = false;
  const pendingAcknowledgements = new Set<string>();

  const acknowledgeOpenedProject = (repositoryName: string | undefined): void => {
    if (!repositoryName || !onProjectOpened || pendingAcknowledgements.has(repositoryName)) return;
    const project = store?.getState().sync.snapshot?.projects.find((candidate) => (
      candidate.repositoryName === repositoryName
    ));
    if (!project?.isNew) return;

    pendingAcknowledgements.add(repositoryName);
    try {
      const result = onProjectOpened(repositoryName);
      void Promise.resolve(result)
        .catch(() => undefined)
        .finally(() => {
          pendingAcknowledgements.delete(repositoryName);
        });
    } catch {
      pendingAcknowledgements.delete(repositoryName);
    }
  };

  const render = (focusHeading: boolean): void => {
    const route = matchRoute(windowObject.location.hash);
    const state = store?.getState();
    const view = renderView(route, state);
    main.replaceChildren(view);
    updateActiveNavigation(shell, route.name);
    updateWorkbenchStatus(shell, state?.sync);

    const repositoryName = route.name === 'project' ? route.params.repositoryName : undefined;
    document.title = repositoryName
      ? `${repositoryName} · La Grange`
      : `${TITLES[route.name]} · La Grange`;

    acknowledgeOpenedProject(repositoryName);
    if (focusHeading) view.querySelector<HTMLHeadingElement>('h1')?.focus({ preventScroll: true });
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
      pendingAcknowledgements.clear();
    },
    render: (): void => {
      render(false);
    },
  };
}
