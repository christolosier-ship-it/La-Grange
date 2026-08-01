import type { RouteName } from '../../app/routes';
import { SYNC_REQUEST_EVENT } from '../../app/events';
import { APP_VERSION } from '../../app/version';
import { AppError } from '../../core/errors/app-error';
import type { SyncState } from '../../core/sync/sync-service';

const PHASE_6_ASSET_BASE = `${import.meta.env.BASE_URL}assets/phase-6/`;
const MAX_TIMEOUT_MS = 2_147_483_647;

const NAVIGATION = [
  { href: '#/', label: 'Vue d’ensemble', route: 'dashboard', icon: 'p6-d01-icon-overview.svg' },
  { href: '#/projects', label: 'Projets', route: 'projects', icon: 'p6-d02-icon-projects.svg' },
  { href: '#/activity', label: 'Activité', route: 'activity', icon: 'p6-d03-icon-activity.svg' },
  { href: '#/settings', label: 'Paramètres', route: 'settings', icon: 'p6-d04-icon-settings.svg' },
] as const;

function phase6Asset(filename: string): string {
  return `${PHASE_6_ASSET_BASE}${filename}`;
}

function createPhase6Icon(filename: string, className: string): HTMLImageElement {
  const icon = document.createElement('img');
  icon.className = className;
  icon.src = phase6Asset(filename);
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  icon.decoding = 'async';
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

function retryDate(error: Error | undefined, now: Date): Date | undefined {
  if (!(error instanceof AppError) || error.code !== 'rate-limit' || !error.retryAt) return undefined;
  const date = new Date(error.retryAt);
  return Number.isFinite(date.getTime()) && date.getTime() > now.getTime() ? date : undefined;
}

function retryLabel(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function createSyncButton(sync: SyncState | undefined, now = new Date()): HTMLButtonElement {
  const button = document.createElement('button');
  const busy = sync?.status === 'syncing' || sync?.status === 'loading-cache';
  const retryAt = retryDate(sync?.error, now);

  button.type = 'button';
  button.className = 'sync-button workbench-note__sync';
  button.disabled = busy || retryAt !== undefined;
  button.setAttribute('aria-busy', String(busy));

  if (busy) button.textContent = 'Inventaire en cours…';
  else if (retryAt) {
    const label = retryLabel(retryAt);
    button.textContent = `Réessayer après ${label}`;
    button.title = `GitHub autorisera une nouvelle tentative après ${label}.`;
    const delay = Math.min(retryAt.getTime() - now.getTime(), MAX_TIMEOUT_MS);
    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = 'Actualiser l’inventaire';
      button.removeAttribute('title');
    }, delay);
  } else button.textContent = 'Actualiser l’inventaire';

  button.addEventListener('click', () => {
    if (!button.disabled) window.dispatchEvent(new Event(SYNC_REQUEST_EVENT));
  });
  return button;
}

export function createAppShell(): HTMLElement {
  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.style.setProperty('--phase-6-wood-texture', `url("${phase6Asset('p6-b07-texture-wood-structure-1024x1024.webp')}")`);
  shell.style.setProperty('--phase-6-sync-icon', `url("${phase6Asset('p6-d05-icon-sync.svg')}")`);
  shell.innerHTML = `
    <div class="phase-6-scene" aria-hidden="true">
      <picture class="phase-6-scene__background">
        <source media="(min-width: 87.5rem)" srcset="${phase6Asset('p6-b01-background-workshop-2048x1152.webp')}">
        <source media="(min-width: 45rem) and (orientation: landscape)" srcset="${phase6Asset('p6-b02-background-workshop-tablet-1366x1024.webp')}">
        <source media="(min-width: 45rem) and (orientation: portrait)" srcset="${phase6Asset('p6-b03-background-workshop-tablet-1024x1366.webp')}">
        <img src="${phase6Asset('p6-b04-background-workshop-mobile-780x1386.webp')}" alt="" width="780" height="1386" decoding="async" fetchpriority="high">
      </picture>
      <img class="phase-6-scene__light" src="${phase6Asset('p6-b12-light-main-1600x900.png')}" alt="" width="1600" height="900" decoding="async">
    </div>
    <header class="brand">
      <a href="#/" aria-label="La Grange, accueil">
        <span class="brand-sign" aria-hidden="true">
          <picture>
            <source media="(max-width: 44.99rem)" srcset="${phase6Asset('p6-a03-brand-sign-mobile-960x560.webp')}">
            <source media="(max-width: 69.99rem)" srcset="${phase6Asset('p6-a02-brand-sign-800x360.webp')}">
            <img data-brand-sign src="${phase6Asset('p6-a01-brand-sign-1600x720.webp')}" alt="" width="1600" height="720" decoding="async" fetchpriority="high">
          </picture>
          <span class="brand-mark"><span class="brand-mark__fallback">LG</span><img data-brand-mark src="${phase6Asset('p6-a04-brand-mark.svg')}" alt="" width="256" height="256" decoding="async"></span>
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
  const brandMarkAsset = shell.querySelector<HTMLImageElement>('[data-brand-mark]');
  brandMarkAsset?.addEventListener('error', () => {
    brandMarkAsset.remove();
  });

  const list = shell.querySelector('ul');
  if (!list) throw new Error('La navigation principale est introuvable.');
  for (const item of NAVIGATION) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.dataset.route = item.route;
    link.append(createPhase6Icon(item.icon, 'primary-nav__icon'), document.createTextNode(item.label));
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
  let iconFilename = 'p6-d24-icon-success.svg';

  if (!state || state.status === 'idle') {
    panel.dataset.syncState = 'success';
    strong.textContent = 'Atelier prêt';
    detail.textContent = 'L’inventaire attend sa première synchronisation.';
  } else if (state.status === 'loading-cache') {
    panel.dataset.syncState = 'syncing';
    iconFilename = 'p6-d23-icon-sync-running.svg';
    strong.textContent = 'Ouverture des réserves';
    detail.textContent = 'Lecture de la dernière copie locale.';
  } else if (state.status === 'syncing') {
    panel.dataset.syncState = 'syncing';
    iconFilename = 'p6-d23-icon-sync-running.svg';
    strong.textContent = 'Inventaire en cours';
    detail.textContent = 'La Grange consulte les dépôts publics GitHub.';
  } else if (state.status === 'offline') {
    panel.dataset.syncState = 'offline';
    iconFilename = 'p6-d22-icon-offline.svg';
    strong.textContent = 'Mode hors ligne';
    detail.textContent = state.snapshot ? `${String(state.snapshot.projects.length)} projet(s) chargé(s) depuis le cache.` : 'Aucune copie locale n’est encore disponible.';
  } else if (state.status === 'error') {
    panel.dataset.syncState = 'error';
    iconFilename = 'p6-d26-icon-error.svg';
    strong.textContent = 'Synchronisation incomplète';
    detail.textContent = state.snapshot ? `${String(state.snapshot.projects.length)} projet(s) conservé(s). ${readableError(state.error)}` : readableError(state.error);
  } else {
    panel.dataset.syncState = 'online';
    iconFilename = 'p6-d21-icon-online.svg';
    strong.textContent = 'Inventaire à jour';
    detail.textContent = `${String(state.snapshot?.projects.length ?? 0)} projet(s) disponible(s).`;
  }

  title.append(createPhase6Icon(iconFilename, 'workbench-note__icon'), strong);
  panel.replaceChildren(title, detail, createSyncButton(state));

  if (state?.warning) {
    const warning = document.createElement('p');
    warning.className = 'workbench-warning';
    warning.append(createPhase6Icon('p6-d25-icon-warning.svg', 'workbench-warning__icon'), document.createTextNode(`Avertissement : ${readableError(state.warning)}`));
    panel.append(warning);
  }
}