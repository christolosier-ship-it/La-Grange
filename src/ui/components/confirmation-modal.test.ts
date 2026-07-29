import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '../../core/errors/app-error';
import { openConfirmationModal } from './confirmation-modal';

afterEach(() => {
  document.body.replaceChildren();
});

describe('openConfirmationModal', () => {
  it('focuses cancel, traps Tab and restores the trigger after Escape', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Ouvrir';
    document.body.append(trigger);
    trigger.focus();
    const onCancel = vi.fn();

    const overlay = openConfirmationModal(trigger, {
      title: 'Confirmer',
      description: 'Action locale.',
      confirmLabel: 'Continuer',
      onConfirm: vi.fn(),
      onCancel,
    });
    const buttons = [...overlay.querySelectorAll<HTMLButtonElement>('button')];
    expect(document.activeElement).toBe(buttons[0]);

    buttons[1]?.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(document.activeElement).toBe(buttons[0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(document.querySelector('.modal-overlay')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('ignores dismissal while confirmation is pending and restores a recreated control', async () => {
    let resolveConfirmation: (() => void) | undefined;
    const trigger = document.createElement('button');
    trigger.dataset.focusKey = 'reset-control';
    document.body.append(trigger);
    const onConfirm = vi.fn(() => new Promise<void>((resolve) => {
      resolveConfirmation = resolve;
    }));
    const overlay = openConfirmationModal(trigger, {
      title: 'Vider',
      description: 'Supprimer le cache actif.',
      confirmLabel: 'Réinitialiser',
      onConfirm,
    });

    overlay.querySelectorAll<HTMLButtonElement>('button')[1]?.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelector('.modal-overlay')).not.toBeNull();

    trigger.remove();
    const replacement = document.createElement('button');
    replacement.dataset.focusKey = 'reset-control';
    document.body.append(replacement);
    resolveConfirmation?.();
    await Promise.resolve();
    await Promise.resolve();

    expect(document.querySelector('.modal-overlay')).toBeNull();
    expect(document.activeElement).toBe(replacement);
  });

  it('announces a user-facing confirmation failure inside the modal', async () => {
    const trigger = document.createElement('button');
    document.body.append(trigger);
    const overlay = openConfirmationModal(trigger, {
      title: 'Changer',
      description: 'Changer de profil.',
      confirmLabel: 'Continuer',
      onConfirm: () => Promise.reject(new AppError(
        'network',
        'technical details',
        'Connexion à GitHub impossible.',
        true,
      )),
    });

    overlay.querySelectorAll<HTMLButtonElement>('button')[1]?.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(overlay.querySelector('[role="alert"]')?.textContent)
      .toBe('Connexion à GitHub impossible.');
    expect(overlay.querySelectorAll<HTMLButtonElement>('button')[1]?.disabled).toBe(false);
  });
});
