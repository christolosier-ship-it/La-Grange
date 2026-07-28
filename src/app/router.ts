import { matchRoute } from './routes';
import { renderView } from '../features/views';
import { updateActiveNavigation } from '../ui/layout/app-shell';

const TITLES = {
  dashboard: 'Vue d’ensemble',
  projects: 'Tous les projets',
  project: 'Projet',
  activity: 'Activité',
  settings: 'Paramètres',
  'not-found': 'Page introuvable',
} as const;

export function createRouter(shell: HTMLElement, windowObject: Window = window) {
  const main = shell.querySelector<HTMLElement>('main');
  if (!main) throw new Error('Le shell doit contenir un élément main.');

  const render = (): void => {
    const route = matchRoute(windowObject.location.hash);
    const view = renderView(route);
    main.replaceChildren(view);
    updateActiveNavigation(shell, route.name);

    const repositoryName = route.name === 'project' ? route.params.repositoryName : undefined;
    document.title = repositoryName
      ? `${repositoryName} · La Grange`
      : `${TITLES[route.name]} · La Grange`;

    view.querySelector<HTMLHeadingElement>('h1')?.focus({ preventScroll: true });
  };

  return {
    start: (): void => {
      windowObject.addEventListener('hashchange', render);
      render();
    },
    stop: (): void => {
      windowObject.removeEventListener('hashchange', render);
    },
    render,
  };
}
