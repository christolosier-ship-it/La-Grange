import type { AppState } from '../../app/store';
import type { ViewActions } from '../view-actions';
import { createDisplaySettings, createProfileSettings } from './settings-controls';
import {
  createCacheSettings,
  createDiagnosticSettings,
  createFavoriteSettings,
} from './settings-maintenance';

function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'settings-header';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Préférences locales';
  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = 'Paramètres';
  const description = document.createElement('p');
  description.className = 'lead';
  description.textContent = 'Réglez l’affichage, changez de profil public et entretenez les données locales sans jamais exposer de secret GitHub.';
  header.append(eyebrow, title, description);
  return header;
}

export function renderSettings(
  state: AppState | undefined,
  actions: ViewActions = {},
): HTMLElement {
  const view = document.createElement('div');
  view.className = 'settings-view';
  view.append(createHeader());

  if (!state) {
    const loading = document.createElement('p');
    loading.className = 'settings-status';
    loading.setAttribute('role', 'status');
    loading.textContent = 'Ouverture des paramètres locaux…';
    view.append(loading);
    return view;
  }

  const grid = document.createElement('div');
  grid.className = 'settings-grid';
  grid.append(
    createProfileSettings(state, actions),
    createDisplaySettings(state, actions),
    createFavoriteSettings(state, actions),
    createCacheSettings(state, actions),
    createDiagnosticSettings(state),
  );
  view.append(grid);
  return view;
}
