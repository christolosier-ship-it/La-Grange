import type { RouteName } from '../../app/routes';
import { APP_VERSION } from '../../app/version';
import { AppError } from '../../core/errors/app-error';
import type { SyncState } from '../../core/sync/sync-service';

const NAVIGATION = [
  { href: '#/', label: 'Vue d’ensemble', route: 'dashboard' },
  { href: '#/projects', label: 'Projets', route: 'projects' },
  { href: '#/activity', label: 'Activité', route: 'activity' },
  { href: '#/settings', label: 'Paramètres', route: 'settings' },
] as const;

export function createAppShell(): HTMLElement {
  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.innerHTML = `
    <header class="brand"><a href="#/" aria-label="La Grange, accueil"><span class="brand-mark" aria-hidden="true">LG</span><span><strong>La Grange</strong><small>L’atelier où vivent mes projets</small></span></a></header>
    <nav class="primary-nav" aria-label="Navigation principale"><ul></ul></nav>
    <main id="main-content" tabindex="-1"></main>
    <aside class="workbench-note" aria-label="État de l’atelier" aria-live="polite" data-sync-panel></aside>
    <footer><small>La Grange · lecture seule · v${APP_VERSION}</small></footer>`;

  const list = shell.querySelector('ul');
  if (!list) throw new Error('La navigation principale est introuvable.');

  for (const item of NAVIGATION) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.dataset.route = item.route;
    link.textContent = item.label;
    li.append(link);
    list.append(li);
  }

  updateWorkbenchStatus(shell);
  return shell;
}

export function updateActiveNavigation(shell: HTMLElement, routeName: RouteName): void {
  const activeRoute = routeName === 'project' ? 'projects' : routeName;
  shell.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    if (link.dataset.route === activeRoute) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function readableError(error: Error | undefined): string {
  if (!error) return 'erreur inconnue';
  return error instanceof AppError ? error.userMessage : error.message;
}

export function updateWorkbenchStatus(shell: HTMLElement, state?: SyncState): void {
  const panel = shell.querySelector<HTMLElement>('[data-sync-panel]');
  if (!panel) return;

  const title = document.createElement('p');
  const strong = document.createElement('strong');
  const detail = document.createElement('p');

  if (!state || state.status === 'idle') {
    strong.textContent = 'Atelier prêt';
    detail.textContent = 'L’inventaire attend sa première synchronisation.';
  } else if (state.status === 'loading-cache') {
    strong.textContent = 'Ouverture des réserves';
    detail.textContent = 'Lecture de la dernière copie locale.';
  } else if (state.status === 'syncing') {
    strong.textContent = 'Inventaire en cours';
    detail.textContent = 'La Grange consulte les dépôts publics GitHub.';
  } else if (state.status === 'offline') {
    strong.textContent = 'Mode hors ligne';
    detail.textContent = state.snapshot
      ? `${String(state.snapshot.projects.length)} projet(s) chargé(s) depuis le cache.`
      : 'Aucune copie locale n’est encore disponible.';
  } else if (state.status === 'error') {
    strong.textContent = 'Synchronisation incomplète';
    detail.textContent = state.snapshot
      ? `${String(state.snapshot.projects.length)} projet(s) conservé(s). ${readableError(state.error)}`
      : readableError(state.error);
  } else {
    strong.textContent = 'Inventaire à jour';
    detail.textContent = `${String(state.snapshot?.projects.length ?? 0)} projet(s) disponible(s).`;
  }

  title.append(strong);
  panel.replaceChildren(title, detail);

  if (state?.warning) {
    const warning = document.createElement('p');
    warning.className = 'workbench-warning';
    warning.textContent = `Avertissement : ${readableError(state.warning)}`;
    panel.append(warning);
  }
}
