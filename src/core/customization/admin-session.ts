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
