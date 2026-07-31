import type { RouteName } from '../../app/routes';
import { APP_VERSION } from '../../app/version';
import { AppError } from '../../core/errors/app-error';
import type { SyncState } from '../../core/sync/sync-service';

const PHASE_6_ASSET_BASE = `${import.meta.env.BASE_URL}assets/phase-6/`;

const NAVIGATION = [
  { href: '#/', label: 'Vue d’ensemble', route: 'dashboard' },
  { href: '#/projects', label: 'Projets', route: 'projects' },
  { href: '#/activity', label: 'Activité', route: 'activity' },
  { href: '#/settings', label: 'Paramètres', route: 'settings' },
] as const;

function phase6Asset(filename: string): string {
  return `${PHASE_6_ASSET_BASE}${filename}`;
}

export function createAppShell(): HTMLElement {
  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.innerHTML = `
    <header class="brand">
      <a href="#/" aria-label="La Grange, accueil">
        <span class="brand-sign" aria-hidden="true">
          <picture>
            <source media="(max-width: 44.99rem)" srcset="${phase6Asset('p6-a03-brand-sign-mobile-960x560.webp')}">
            <source media="(max-width: 69.99rem)" srcset="${phase6Asset('p6-a02-brand-sign-800x360.webp')}">
            <img data-brand-sign src="${phase6Asset('p6-a01-brand-sign-1600x720.webp')}" alt="" width="1600" height="720" decoding="async" fetchpriority="high">
          </picture>
          <span class="brand-mark">
            <span class="brand-mark__fallback">LG</span>
            <img data-brand-mark src="${phase6Asset('p6-a04-brand-mark.svg')}" alt="" width="256" height="256" decoding="async">
          </span>
        </span>
        <span class="brand-copy"><strong>La Grange</strong><small>L’atelier où vivent mes projets</small></span>
      </a>
    </header>
    <nav class="primary-nav" aria-label="Navigation principale"><ul></ul></nav>
    <main id="main-content" tabindex="-1"></main>
    <aside class="workbench-note" aria-label="État de l’atelier" aria-live="polite" data-sync-panel></aside>
    <footer><small>La Grange · lecture seule · v${APP_VERSION}</small></footer>`;

  const brand = shell.querySelector<HTMLElement>('.brand');
  shell.querySelector<HTMLImageElement>('[data-brand-sign]')?.addEventListener('error', () => {
    brand?.classList.add('is-fallback');
  });
  shell.querySelector<HTMLImageElement>('[data-brand-mark]')?.addEventListener('error', (event) => {
    event.currentTarget.remove();
  });

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
  title.className = 'workbench-note__title';
  const strong = document.createElement('strong');
  const detail = document.createElement('p');

  if (!state || state.status === 'idle') {
    panel.dataset.syncState = 'success';
    strong.textContent = 'Atelier prêt';
    detail.textContent = 'L’inventaire attend sa première synchronisation.';
  } else if (state.status === 'loading-cache') {
    panel.dataset.syncState = 'syncing';
    strong.textContent = 'Ouverture des réserves';
    detail.textContent = 'Lecture de la dernière copie locale.';
  } else if (state.status === 'syncing') {
    panel.dataset.syncState = 'syncing';
    strong.textContent = 'Inventaire en cours';
    detail.textContent = 'La Grange consulte les dépôts publics GitHub.';
  } else if (state.status === 'offline') {
    panel.dataset.syncState = 'offline';
    strong.textContent = 'Mode hors ligne';
    detail.textContent = state.snapshot
      ? `${String(state.snapshot.projects.length)} projet(s) chargé(s) depuis le cache.`
      : 'Aucune copie locale n’est encore disponible.';
  } else if (state.status === 'error') {
    panel.dataset.syncState = 'error';
    strong.textContent = 'Synchronisation incomplète';
    detail.textContent = state.snapshot
      ? `${String(state.snapshot.projects.length)} projet(s) conservé(s). ${readableError(state.error)}`
      : readableError(state.error);
  } else {
    panel.dataset.syncState = 'online';
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
