import type { AdminSessionState } from './types';

export const ADMIN_SESSION_EVENT = 'la-grange:admin-session';

const SESSION_TOKEN_KEY = 'la-grange:github-token:session';
const PERSISTENT_TOKEN_KEY = 'la-grange:github-token:persistent';
const TOKEN_SETTINGS_URL = 'https://github.com/settings/personal-access-tokens/new';
const GITHUB_USER_URL = 'https://api.github.com/user';

let currentState: AdminSessionState = { status: 'loading' };
let currentToken: string | undefined;
let activeRequest: Promise<AdminSessionState> | undefined;

interface GitHubUserResponse {
  readonly login?: unknown;
}

interface StoredToken {
  readonly token: string;
  readonly persistent: boolean;
}

function storageValue(storage: Storage | undefined, key: string): string | undefined {
  if (!storage) return undefined;
  try {
    const value = storage.getItem(key)?.trim();
    return value || undefined;
  } catch {
    return undefined;
  }
}

function removeStorageValue(storage: Storage | undefined, key: string): void {
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {
    // La mémoire courante reste supprimée même si le stockage navigateur est indisponible.
  }
}

function writeStorageValue(storage: Storage | undefined, key: string, value: string): boolean {
  if (!storage) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function browserStorage(name: 'localStorage' | 'sessionStorage'): Storage | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    return window[name];
  } catch {
    return undefined;
  }
}

function readStoredToken(): StoredToken | undefined {
  const session = storageValue(browserStorage('sessionStorage'), SESSION_TOKEN_KEY);
  if (session) return { token: session, persistent: false };
  const persistent = storageValue(browserStorage('localStorage'), PERSISTENT_TOKEN_KEY);
  return persistent ? { token: persistent, persistent: true } : undefined;
}

function clearStoredToken(): void {
  removeStorageValue(browserStorage('sessionStorage'), SESSION_TOKEN_KEY);
  removeStorageValue(browserStorage('localStorage'), PERSISTENT_TOKEN_KEY);
}

function storeToken(token: string, persistent: boolean): void {
  clearStoredToken();
  currentToken = token;
  const preferred = persistent ? browserStorage('localStorage') : browserStorage('sessionStorage');
  const preferredKey = persistent ? PERSISTENT_TOKEN_KEY : SESSION_TOKEN_KEY;
  if (writeStorageValue(preferred, preferredKey, token)) return;
  writeStorageValue(browserStorage('sessionStorage'), SESSION_TOKEN_KEY, token);
}

function applyState(state: AdminSessionState): AdminSessionState {
  currentState = state;
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.adminAuthenticated = 'false';
    document.documentElement.dataset.githubAuthenticated = String(
      state.status === 'authenticated' && state.githubAuthenticated,
    );
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<AdminSessionState>(ADMIN_SESSION_EVENT, { detail: state }));
  }
  return state;
}

function tokenHeaders(token: string): Headers {
  return new Headers({
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  });
}

async function validateToken(token: string, fetcher: typeof fetch): Promise<string> {
  let response: Response;
  try {
    response = await fetcher(GITHUB_USER_URL, {
      headers: tokenHeaders(token),
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'connexion impossible';
    throw new Error(`GitHub est inaccessible (${detail}).`);
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error('Jeton GitHub invalide, expiré ou révoqué.');
  }
  if (!response.ok) throw new Error(`GitHub a répondu avec le statut HTTP ${String(response.status)}.`);

  const data = await response.json() as GitHubUserResponse;
  if (typeof data.login !== 'string' || !data.login.trim()) {
    throw new Error('GitHub n’a pas renvoyé de compte utilisable.');
  }
  return data.login.trim();
}

export function getAdminSessionState(): AdminSessionState {
  return currentState;
}

export function getGitHubAccessToken(): string | undefined {
  return currentState.status === 'authenticated' ? currentToken : undefined;
}

export function adminLoginUrl(): string {
  return TOKEN_SETTINGS_URL;
}

export async function connectAdminWithToken(
  tokenValue: string,
  persistent = false,
  fetcher: typeof fetch = fetch,
): Promise<AdminSessionState> {
  const token = tokenValue.trim();
  if (!token) throw new Error('Saisissez un jeton GitHub.');

  const login = await validateToken(token, fetcher);
  storeToken(token, persistent);
  return applyState({
    status: 'authenticated',
    login,
    admin: false,
    githubAuthenticated: true,
  });
}

export async function initializeAdminSession(
  fetcher: typeof fetch = fetch,
): Promise<AdminSessionState> {
  if (activeRequest) return activeRequest;
  applyState({ status: 'loading' });
  activeRequest = (async () => {
    const stored = readStoredToken();
    if (!stored) {
      currentToken = undefined;
      return applyState({ status: 'anonymous' });
    }

    try {
      const login = await validateToken(stored.token, fetcher);
      currentToken = stored.token;
      return applyState({
        status: 'authenticated',
        login,
        admin: false,
        githubAuthenticated: true,
      });
    } catch (error) {
      currentToken = undefined;
      clearStoredToken();
      return applyState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Connexion GitHub indisponible.',
      });
    } finally {
      activeRequest = undefined;
    }
  })();
  return activeRequest;
}

export async function logoutAdmin(): Promise<void> {
  currentToken = undefined;
  clearStoredToken();
  applyState({ status: 'anonymous' });
}

export function invalidateAdminSession(message = 'La connexion GitHub a expiré.'): void {
  currentToken = undefined;
  clearStoredToken();
  applyState({ status: 'error', message });
}

function createConnectionDialog(): HTMLDialogElement {
  document.querySelector<HTMLDialogElement>('[data-github-connection-dialog]')?.close();

  const dialog = document.createElement('dialog');
  dialog.className = 'github-connection-dialog';
  dialog.dataset.githubConnectionDialog = '';
  dialog.setAttribute('aria-labelledby', 'github-connection-title');

  const form = document.createElement('form');
  form.method = 'dialog';
  form.className = 'github-connection-form';

  const heading = document.createElement('h2');
  heading.id = 'github-connection-title';
  heading.textContent = 'Connecter La Grange à GitHub';

  const explanation = document.createElement('p');
  explanation.textContent = 'GitHub Pages ne peut pas conserver un secret serveur. La Grange utilise donc un jeton personnel finement contrôlé, transmis uniquement à api.github.com.';

  const instructions = document.createElement('ol');
  for (const text of [
    'Créez un jeton finement contrôlé sur GitHub.',
    'Choisissez une date d’expiration courte ou raisonnable.',
    'N’ajoutez aucun droit supplémentaire : la lecture des dépôts publics est incluse.',
    'Copiez le jeton puis collez-le ci-dessous.',
  ]) {
    const item = document.createElement('li');
    item.textContent = text;
    instructions.append(item);
  }

  const createTokenLink = document.createElement('a');
  createTokenLink.href = TOKEN_SETTINGS_URL;
  createTokenLink.target = '_blank';
  createTokenLink.rel = 'noopener noreferrer';
  createTokenLink.className = 'github-connection-link';
  createTokenLink.textContent = 'Créer le jeton sur GitHub';

  const tokenLabel = document.createElement('label');
  tokenLabel.className = 'github-connection-field';
  const tokenTitle = document.createElement('span');
  tokenTitle.textContent = 'Jeton GitHub';
  const tokenInput = document.createElement('input');
  tokenInput.type = 'password';
  tokenInput.name = 'token';
  tokenInput.autocomplete = 'off';
  tokenInput.required = true;
  tokenInput.spellcheck = false;
  tokenInput.placeholder = 'github_pat_…';
  tokenLabel.append(tokenTitle, tokenInput);

  const rememberLabel = document.createElement('label');
  rememberLabel.className = 'github-connection-remember';
  const remember = document.createElement('input');
  remember.type = 'checkbox';
  remember.name = 'remember';
  const rememberText = document.createElement('span');
  rememberText.textContent = 'Mémoriser sur cet appareil';
  rememberLabel.append(remember, rememberText);

  const warning = document.createElement('p');
  warning.className = 'github-connection-warning';
  warning.textContent = 'Sans cette option, le jeton reste dans la session du navigateur. Avec cette option, il reste dans le stockage local jusqu’à la déconnexion.';

  const status = document.createElement('p');
  status.className = 'github-connection-status';
  status.setAttribute('aria-live', 'polite');

  const actions = document.createElement('div');
  actions.className = 'github-connection-actions';
  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Annuler';
  cancel.addEventListener('click', () => dialog.close());
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'is-primary';
  submit.textContent = 'Connecter GitHub';
  actions.append(cancel, submit);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void (async () => {
      submit.disabled = true;
      tokenInput.disabled = true;
      remember.disabled = true;
      status.dataset.tone = 'neutral';
      status.textContent = 'Vérification du jeton auprès de GitHub…';
      try {
        await connectAdminWithToken(tokenInput.value, remember.checked);
        tokenInput.value = '';
        dialog.close();
      } catch (error) {
        status.dataset.tone = 'danger';
        status.textContent = error instanceof Error ? error.message : 'Connexion GitHub impossible.';
        submit.disabled = false;
        tokenInput.disabled = false;
        remember.disabled = false;
        tokenInput.focus();
      }
    })();
  });

  form.append(
    heading,
    explanation,
    instructions,
    createTokenLink,
    tokenLabel,
    rememberLabel,
    warning,
    status,
    actions,
  );
  dialog.append(form);
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  document.body.append(dialog);
  return dialog;
}

function renderAdminControls(container: HTMLElement, state: AdminSessionState): void {
  const status = document.createElement('span');
  status.className = 'admin-session-status';
  const action = document.createElement('button');
  action.type = 'button';
  action.className = 'admin-session-action';

  if (state.status === 'loading') {
    status.textContent = 'GitHub : vérification…';
    action.textContent = 'Connexion';
    action.disabled = true;
  } else if (state.status === 'authenticated') {
    status.textContent = `GitHub : ${state.login} · quota authentifié`;
    action.textContent = 'Se déconnecter';
    action.addEventListener('click', () => {
      action.disabled = true;
      void logoutAdmin();
    });
  } else {
    status.textContent = state.status === 'error'
      ? state.message
      : 'GitHub : mode public';
    action.textContent = 'Connecter GitHub';
    action.addEventListener('click', () => {
      const dialog = createConnectionDialog();
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>('input[name="token"]')?.focus();
    });
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
