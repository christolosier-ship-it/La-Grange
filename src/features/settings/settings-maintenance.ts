import { APP_VERSION } from '../../app/version';
import type { AppState } from '../../app/store';
import { AppError } from '../../core/errors/app-error';
import { buildLocalDiagnostics, copyText } from '../../core/settings/local-diagnostics';
import { formatFullDate } from '../../utils/date';
import { openConfirmationModal } from '../../ui/components/confirmation-modal';
import type { ViewActions } from '../view-actions';

function createPanel(titleText: string, descriptionText: string): {
  readonly panel: HTMLElement;
  readonly body: HTMLElement;
} {
  const panel = document.createElement('section');
  panel.className = 'settings-panel';
  const header = document.createElement('header');
  const title = document.createElement('h2');
  title.textContent = titleText;
  const description = document.createElement('p');
  description.textContent = descriptionText;
  header.append(title, description);
  const body = document.createElement('div');
  body.className = 'settings-panel__body';
  panel.append(header, body);
  return { panel, body };
}

function readableError(error: Error | undefined): string {
  if (!error) return 'Erreur locale inconnue.';
  return error instanceof AppError ? error.userMessage : error.message;
}

export function createFavoriteSettings(state: AppState, actions: ViewActions): HTMLElement {
  const { panel, body } = createPanel(
    'Favoris',
    'Les favoris sont des raccourcis locaux. Retirer un favori ne modifie aucun dépôt GitHub.',
  );
  const list = document.createElement('ul');
  list.className = 'settings-favorites';
  const projects = state.sync.snapshot?.projects ?? [];

  if (state.favoriteIds.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'settings-empty';
    empty.textContent = 'Aucun projet favori dans ce navigateur.';
    body.append(empty);
    return panel;
  }

  for (const projectId of state.favoriteIds) {
    const project = projects.find(({ id }) => id === projectId);
    const item = document.createElement('li');
    const identity = document.createElement('div');
    if (project) {
      const link = document.createElement('a');
      link.href = `#/project/${encodeURIComponent(project.repositoryName)}`;
      link.textContent = project.displayName;
      identity.append(link);
    } else {
      const name = document.createElement('span');
      name.textContent = `Projet indisponible #${String(projectId)}`;
      const note = document.createElement('small');
      note.textContent = 'Absent du dernier instantané, aucun lien n’est proposé.';
      identity.append(name, note);
    }
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Retirer';
    remove.setAttribute('aria-label', `Retirer ${project?.displayName ?? `le projet ${String(projectId)}`} des favoris`);
    remove.addEventListener('click', () => actions.onRemoveFavorite?.(projectId));
    item.append(identity, remove);
    list.append(item);
  }
  body.append(list);

  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'settings-secondary-action';
  clear.dataset.focusKey = 'settings-clear-favorites';
  clear.textContent = 'Retirer tous les favoris';
  clear.addEventListener('click', () => {
    openConfirmationModal(clear, {
      title: 'Retirer tous les favoris ?',
      description: 'Cette action supprime uniquement les raccourcis locaux de ce navigateur. Les projets et leurs caches restent intacts.',
      confirmLabel: 'Retirer les favoris',
      destructive: true,
      onConfirm: () => actions.onClearFavorites?.(),
    });
  });
  body.append(clear);
  return panel;
}

function addDefinition(list: HTMLDListElement, label: string, value: string): void {
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = value;
  list.append(term, description);
}

export function createCacheSettings(state: AppState, actions: ViewActions): HTMLElement {
  const { panel, body } = createPanel(
    'Cache local',
    'Ces informations décrivent uniquement les données du profil actif enregistrées dans ce navigateur.',
  );
  const cache = state.settings.cache;
  const list = document.createElement('dl');
  list.className = 'settings-diagnostics-list';
  addDefinition(list, 'Profil actif', state.preferences.username);
  addDefinition(list, 'Connexion', navigator.onLine ? 'En ligne' : 'Hors ligne');
  addDefinition(list, 'Synchronisation', state.sync.status);
  addDefinition(list, 'Dernière synchronisation complète', formatFullDate(state.sync.snapshot?.syncedAt));
  addDefinition(list, 'Projets affichés en mémoire', String(state.sync.snapshot?.projects.length ?? 0));
  addDefinition(list, 'Projets dans le cache', String(cache?.projectCount ?? 0));
  addDefinition(list, 'IndexedDB', cache?.available ? 'Disponible' : state.settings.status === 'error' ? 'Indisponible' : 'Vérification en cours');
  addDefinition(list, 'Événements locaux', String(cache?.activityCount ?? 0));
  addDefinition(list, 'Entrées d’activité ignorées', String(cache?.invalidActivityCount ?? 0));
  addDefinition(list, 'Détails projets conservés', String(cache?.detailCount ?? 0));
  addDefinition(list, 'Version', APP_VERSION);
  body.append(list);

  if (state.settings.status === 'loading') {
    const status = document.createElement('p');
    status.className = 'settings-status';
    status.setAttribute('role', 'status');
    status.textContent = state.settings.message ?? 'Lecture des informations locales…';
    body.append(status);
  } else if (state.settings.status === 'error') {
    const error = document.createElement('p');
    error.className = 'settings-error';
    error.setAttribute('role', 'alert');
    error.textContent = readableError(state.settings.error);
    body.append(error);
  } else if (state.settings.message) {
    const status = document.createElement('p');
    status.className = 'settings-status';
    status.setAttribute('role', 'status');
    status.textContent = state.settings.message;
    body.append(status);
  }

  const actionsRow = document.createElement('div');
  actionsRow.className = 'settings-actions';
  const refresh = document.createElement('button');
  refresh.type = 'button';
  refresh.dataset.focusKey = 'settings-refresh-cache';
  refresh.textContent = 'Actualiser les informations';
  refresh.disabled = state.settings.status === 'loading';
  refresh.addEventListener('click', () => {
    void actions.onRefreshCacheInfo?.();
  });
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'is-destructive';
  reset.dataset.focusKey = 'settings-reset-cache';
  reset.textContent = 'Réinitialiser le cache de ce profil';
  reset.disabled = state.settings.status === 'loading';
  reset.addEventListener('click', () => {
    openConfirmationModal(reset, {
      title: 'Réinitialiser le cache du profil actif ?',
      description: `Le snapshot, le journal et les détails liés à ${state.preferences.username} seront supprimés de ce navigateur. Les préférences et les autres profils seront conservés.`,
      confirmLabel: 'Réinitialiser ce profil',
      destructive: true,
      onConfirm: async () => {
        await actions.onResetCache?.();
      },
    });
  });
  actionsRow.append(refresh, reset);
  body.append(actionsRow);
  return panel;
}

export function createDiagnosticSettings(state: AppState): HTMLElement {
  const { panel, body } = createPanel(
    'Diagnostic local',
    'Le diagnostic contient uniquement la version, les états, les compteurs et les préférences effectives. Aucun token, README ou contenu complet du cache.',
  );
  const diagnostics = buildLocalDiagnostics({
    version: APP_VERSION,
    online: navigator.onLine,
    preferences: state.preferences,
    sync: state.sync,
    settings: state.settings,
  });
  const preview = document.createElement('pre');
  preview.className = 'settings-diagnostic-preview';
  preview.textContent = diagnostics;
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.dataset.focusKey = 'settings-copy-diagnostics';
  copy.textContent = 'Copier le diagnostic';
  const status = document.createElement('p');
  status.className = 'settings-copy-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  copy.addEventListener('click', () => {
    void copyText(diagnostics).then((copied) => {
      status.textContent = copied
        ? 'Diagnostic copié dans le presse-papiers.'
        : 'La copie automatique a échoué. Sélectionnez le diagnostic manuellement.';
    });
  });
  body.append(preview, copy, status);
  return panel;
}
