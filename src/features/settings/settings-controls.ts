import type { AppState } from '../../app/store';
import {
  FRESHNESS_OPTIONS,
  normalizeGitHubUsername,
  type AppPreferences,
  type FreshnessMinutes,
  type InterfaceDensity,
} from '../../core/preferences/app-preferences';
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

function emitPreference(
  current: AppPreferences,
  patch: Partial<AppPreferences>,
  actions: ViewActions,
): void {
  actions.onPreferencesChange?.({ ...current, ...patch });
}

export function createProfileSettings(state: AppState, actions: ViewActions): HTMLElement {
  const { panel, body } = createPanel(
    'Profil GitHub',
    'Chaque compte public possède son propre instantané et son propre journal local. Aucun token n’est demandé.',
  );
  const form = document.createElement('form');
  form.className = 'settings-form';
  const label = document.createElement('label');
  label.htmlFor = 'settings-github-username';
  label.textContent = 'Utilisateur GitHub public';
  const input = document.createElement('input');
  input.id = 'settings-github-username';
  input.name = 'username';
  input.type = 'text';
  input.autocomplete = 'username';
  input.spellcheck = false;
  input.maxLength = 39;
  input.value = state.preferences.username;
  input.dataset.focusKey = 'settings-username';
  const help = document.createElement('p');
  help.className = 'settings-help';
  help.textContent = 'Le changement charge le cache distinct du nouveau compte, puis synchronise ses dépôts publics.';
  const error = document.createElement('p');
  error.className = 'settings-field-error';
  error.setAttribute('role', 'alert');
  error.hidden = true;
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Changer de profil';
  submit.dataset.focusKey = 'settings-profile-submit';
  submit.disabled = actions.onProfileChange === undefined;
  form.append(label, input, help, error, submit);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = normalizeGitHubUsername(input.value);
    if (!username) {
      error.hidden = false;
      error.textContent = 'Saisissez un nom GitHub valide, sans espace ni tiret doublé.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    error.hidden = true;
    input.removeAttribute('aria-invalid');
    if (username === state.preferences.username) {
      error.hidden = false;
      error.setAttribute('role', 'status');
      error.textContent = 'Ce profil est déjà actif.';
      return;
    }
    openConfirmationModal(submit, {
      title: 'Changer de profil GitHub ?',
      description: `L’inventaire affiché sera remplacé par le cache et les dépôts publics de ${username}. Les données locales du profil actuel seront conservées séparément.`,
      confirmLabel: 'Charger ce profil',
      onConfirm: async () => {
        await actions.onProfileChange?.(username);
      },
    });
  });
  body.append(form);
  return panel;
}

function createCheckbox(
  id: string,
  focusKey: string,
  labelText: string,
  checked: boolean,
  onChange: (checked: boolean) => void,
): HTMLElement {
  const wrapper = document.createElement('label');
  wrapper.className = 'settings-choice';
  wrapper.htmlFor = id;
  const input = document.createElement('input');
  input.id = id;
  input.type = 'checkbox';
  input.checked = checked;
  input.dataset.focusKey = focusKey;
  input.addEventListener('change', () => {
    onChange(input.checked);
  });
  const label = document.createElement('span');
  label.textContent = labelText;
  wrapper.append(input, label);
  return wrapper;
}

export function createDisplaySettings(state: AppState, actions: ViewActions): HTMLElement {
  const { panel, body } = createPanel(
    'Affichage et confort',
    'Ces réglages sont locaux à ce navigateur et n’altèrent jamais les données GitHub mises en cache.',
  );
  const preferences = state.preferences;
  const choices = document.createElement('div');
  choices.className = 'settings-choice-grid';
  choices.append(
    createCheckbox('settings-hide-forks', 'settings-hide-forks', 'Masquer les forks dans les listes', preferences.hideForks, (checked) => {
      emitPreference(preferences, { hideForks: checked }, actions);
    }),
    createCheckbox('settings-hide-archives', 'settings-hide-archives', 'Masquer les archives dans les listes', preferences.hideArchived, (checked) => {
      emitPreference(preferences, { hideArchived: checked }, actions);
    }),
    createCheckbox('settings-reduce-motion', 'settings-reduce-motion', 'Réduire les animations', preferences.reduceMotion, (checked) => {
      emitPreference(preferences, { reduceMotion: checked }, actions);
    }),
  );

  const selects = document.createElement('div');
  selects.className = 'settings-select-grid';
  const freshnessLabel = document.createElement('label');
  freshnessLabel.htmlFor = 'settings-freshness';
  freshnessLabel.textContent = 'Fraîcheur de l’inventaire';
  const freshness = document.createElement('select');
  freshness.id = 'settings-freshness';
  freshness.dataset.focusKey = 'settings-freshness';
  for (const minutes of FRESHNESS_OPTIONS) {
    const option = document.createElement('option');
    option.value = String(minutes);
    option.textContent = minutes < 60 ? `${String(minutes)} minutes` : '1 heure';
    option.selected = minutes === preferences.freshnessMinutes;
    freshness.append(option);
  }
  freshness.addEventListener('change', () => {
    emitPreference(preferences, {
      freshnessMinutes: Number(freshness.value) as FreshnessMinutes,
    }, actions);
  });

  const densityLabel = document.createElement('label');
  densityLabel.htmlFor = 'settings-density';
  densityLabel.textContent = 'Densité de l’interface';
  const density = document.createElement('select');
  density.id = 'settings-density';
  density.dataset.focusKey = 'settings-density';
  const densityOptions: readonly [InterfaceDensity, string][] = [
    ['comfortable', 'Confortable'],
    ['compact', 'Compacte'],
  ];
  for (const [value, text] of densityOptions) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    option.selected = value === preferences.density;
    density.append(option);
  }
  density.addEventListener('change', () => {
    emitPreference(preferences, { density: density.value as InterfaceDensity }, actions);
  });

  selects.append(freshnessLabel, freshness, densityLabel, density);
  body.append(choices, selects);
  return panel;
}
