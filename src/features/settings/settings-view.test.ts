import { afterEach, describe, expect, it, vi } from 'vitest';
import { INITIAL_STATE, type AppState } from '../../app/store';
import type { Project } from '../../core/projects/model';
import { renderSettings } from './settings-view';

const project: Project = {
  id: 42,
  repositoryName: 'La-Grange',
  slug: 'La-Grange',
  displayName: 'La Grange',
  description: '',
  githubUrl: 'https://github.com/example/La-Grange',
  readmeUrl: 'https://github.com/example/La-Grange#readme',
  releasesUrl: 'https://github.com/example/La-Grange/releases',
  issuesUrl: 'https://github.com/example/La-Grange/issues',
  defaultBranch: 'main',
  topics: [],
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-07-29T10:00:00Z',
  pushedAt: '2026-07-29T10:00:00Z',
  openIssuesCount: 0,
  archived: false,
  fork: false,
  category: 'applications',
  activityState: 'active',
  featured: true,
  isNew: false,
};

function state(overrides: Partial<AppState> = {}): AppState {
  return {
    ...INITIAL_STATE,
    favoriteIds: [42, 99],
    preferences: {
      ...INITIAL_STATE.preferences,
      favoriteIds: [42, 99],
    },
    settings: {
      status: 'ready',
      username: 'christolosier-ship-it',
      cache: {
        username: 'christolosier-ship-it',
        available: true,
        snapshotPresent: true,
        projectCount: 1,
        activityCount: 3,
        invalidActivityCount: 0,
        detailCount: 1,
      },
    },
    sync: {
      status: 'ready',
      snapshot: {
        schemaVersion: 1,
        username: 'christolosier-ship-it',
        projects: [project],
        syncedAt: '2026-07-29T10:00:00Z',
      },
    },
    ...overrides,
  };
}

afterEach(() => {
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe('renderSettings', () => {
  it('renders real local information and never creates a token field', () => {
    const view = renderSettings(state());

    expect(view.querySelector('h1')?.textContent).toBe('Paramètres');
    expect(view.textContent).toContain('christolosier-ship-it');
    expect(view.textContent).toContain('Événements locaux');
    expect(view.textContent).toContain('0.1.7-activity');
    expect(view.querySelector('input[name="token"]')).toBeNull();
    expect(view.querySelector('input[type="password"]')).toBeNull();
  });

  it('rejects an invalid profile before confirmation', () => {
    const onProfileChange = vi.fn();
    const view = renderSettings(state(), { onProfileChange });
    document.body.append(view);
    const input = view.querySelector<HTMLInputElement>('#settings-github-username');
    const form = view.querySelector<HTMLFormElement>('.settings-form');
    if (!input || !form) throw new Error('Profile form missing');
    input.value = 'invalid user';

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(view.textContent).toContain('nom GitHub valide');
    expect(onProfileChange).not.toHaveBeenCalled();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('cancels then confirms a valid profile change', async () => {
    const onProfileChange = vi.fn().mockResolvedValue(undefined);
    const view = renderSettings(state(), { onProfileChange });
    document.body.append(view);
    const input = view.querySelector<HTMLInputElement>('#settings-github-username');
    const form = view.querySelector<HTMLFormElement>('.settings-form');
    if (!input || !form) throw new Error('Profile form missing');
    input.value = 'OpenAI';
    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    document.querySelector<HTMLButtonElement>('.confirmation-modal button')?.click();
    expect(onProfileChange).not.toHaveBeenCalled();

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    const confirm = document.querySelectorAll<HTMLButtonElement>('.confirmation-modal button')[1];
    confirm?.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(onProfileChange).toHaveBeenCalledWith('openai');
  });

  it('publishes display preferences without requesting GitHub', () => {
    const onPreferencesChange = vi.fn();
    const view = renderSettings(state(), { onPreferencesChange });
    const hideForks = view.querySelector<HTMLInputElement>('#settings-hide-forks');
    const density = view.querySelector<HTMLSelectElement>('#settings-density');
    hideForks?.click();
    if (density) {
      density.value = 'compact';
      density.dispatchEvent(new Event('change', { bubbles: true }));
    }

    expect(onPreferencesChange).toHaveBeenCalledWith(expect.objectContaining({ hideForks: true }));
    expect(onPreferencesChange).toHaveBeenCalledWith(expect.objectContaining({ density: 'compact' }));
  });

  it('keeps unavailable favorites readable without a dead link', () => {
    const remove = vi.fn();
    const view = renderSettings(state(), { onRemoveFavorite: remove });
    const items = [...view.querySelectorAll('.settings-favorites li')];

    expect(items).toHaveLength(2);
    expect(items[0]?.querySelector('a')?.hash).toBe('#/project/La-Grange');
    expect(items[1]?.textContent).toContain('Projet indisponible #99');
    expect(items[1]?.querySelector('a')).toBeNull();
    items[1]?.querySelector<HTMLButtonElement>('button')?.click();
    expect(remove).toHaveBeenCalledWith(99);
  });

  it('requires confirmation before clearing favorites or resetting the profile cache', async () => {
    const clear = vi.fn();
    const reset = vi.fn().mockResolvedValue(undefined);
    const view = renderSettings(state(), {
      onClearFavorites: clear,
      onResetCache: reset,
    });
    document.body.append(view);
    const clearButton = [...view.querySelectorAll<HTMLButtonElement>('button')]
      .find(({ textContent }) => textContent === 'Retirer tous les favoris');
    clearButton?.click();
    document.querySelector<HTMLButtonElement>('.confirmation-modal button')?.click();
    expect(clear).not.toHaveBeenCalled();

    const resetButton = [...view.querySelectorAll<HTMLButtonElement>('button')]
      .find(({ textContent }) => textContent === 'Réinitialiser le cache de ce profil');
    resetButton?.click();
    document.querySelectorAll<HTMLButtonElement>('.confirmation-modal button')[1]?.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(reset).toHaveBeenCalledOnce();
  });

  it('copies a safe diagnostic and reports success accessibly', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    const view = renderSettings(state());
    document.body.append(view);
    const button = [...view.querySelectorAll<HTMLButtonElement>('button')]
      .find(({ textContent }) => textContent === 'Copier le diagnostic');
    button?.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledOnce();
    const copied = String(writeText.mock.calls[0]?.[0]);
    expect(copied).toContain('christolosier-ship-it');
    expect(copied.toLowerCase()).not.toContain('token');
    expect(view.querySelector('[role="status"]')?.textContent).toContain('copié');
  });
});
