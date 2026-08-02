import type { AdminSessionState } from './types';

export const ADMIN_SESSION_EVENT = 'la-grange:admin-session';

let currentState: AdminSessionState = { status: 'loading' };
let activeRequest: Promise<AdminSessionState> | undefined;

function apiUrl(path: string): string {
  return new URL(path, window.location.origin).href;
}

function applyState(state: AdminSessionState): AdminSessionState {
  currentState = state;
  document.documentElement.dataset.adminAuthenticated = String(state.status === 'authenticated');
  window.dispatchEvent(new CustomEvent<AdminSessionState>(ADMIN_SESSION_EVENT, { detail: state }));
  return state;
}

export function getAdminSessionState(): AdminSessionState {
  return currentState;
}

export function adminLoginUrl(): string {
  return apiUrl('/api/admin/login');
}

export async function initializeAdminSession(
  fetcher: typeof fetch = fetch,
): Promise<AdminSessionState> {
  if (activeRequest) return activeRequest;
  applyState({ status: 'loading' });
  activeRequest = (async () => {
    try {
      const response = await fetcher(apiUrl('/api/admin/session'), {
        credentials: 'include',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      if (response.status === 401 || response.status === 404) return applyState({ status: 'anonymous' });
      if (!response.ok) return applyState({ status: 'error', message: 'Administration indisponible.' });
      const data = await response.json() as { authenticated?: unknown; login?: unknown };
      if (data.authenticated === true && typeof data.login === 'string' && data.login.trim()) {
        return applyState({ status: 'authenticated', login: data.login.trim() });
      }
      return applyState({ status: 'anonymous' });
    } catch {
      return applyState({ status: 'anonymous' });
    } finally {
      activeRequest = undefined;
    }
  })();
  return activeRequest;
}

export async function logoutAdmin(fetcher: typeof fetch = fetch): Promise<void> {
  try {
    await fetcher(apiUrl('/api/admin/logout'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'X-La-Grange-CSRF': '1' },
    });
  } finally {
    applyState({ status: 'anonymous' });
  }
}

function renderAdminControls(container: HTMLElement, state: AdminSessionState): void {
  const status = document.createElement('span');
  status.className = 'admin-session-status';
  const action = document.createElement(state.status === 'authenticated' ? 'button' : 'a');
  action.className = 'admin-session-action';

  if (state.status === 'loading') {
    status.textContent = 'Administration : vérification…';
    action.textContent = 'Connexion';
    if (action instanceof HTMLAnchorElement) action.href = adminLoginUrl();
    action.setAttribute('aria-disabled', 'true');
  } else if (state.status === 'authenticated') {
    status.textContent = `Administrateur : ${state.login}`;
    action.textContent = 'Se déconnecter';
    if (action instanceof HTMLButtonElement) {
      action.type = 'button';
      action.addEventListener('click', () => {
        action.disabled = true;
        void logoutAdmin();
      });
    }
  } else {
    status.textContent = state.status === 'error'
      ? state.message
      : 'Administration : non connectée';
    action.textContent = 'Se connecter';
    if (action instanceof HTMLAnchorElement) action.href = adminLoginUrl();
  }
  container.replaceChildren(status, action);
}

export function mountAdminSessionControls(shell: HTMLElement): void {
  const footer = shell.querySelector('footer');
  if (!footer) return;
  const container = document.createElement('span');
  container.className = 'admin-session';
  footer.append(container);
  renderAdminControls(container, currentState);
  window.addEventListener(ADMIN_SESSION_EVENT, (event) => {
    const state = (event as CustomEvent<AdminSessionState>).detail;
    if (container.isConnected) renderAdminControls(container, state);
  });
}
