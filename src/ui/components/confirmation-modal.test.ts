import { afterEach, describe, expect, it, vi } from 'vitest';
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

  it('runs confirmation once and closes after success', async () => {
    const trigger = document.createElement('button');
    document.body.append(trigger);
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    const overlay = openConfirmationModal(trigger, {
      title: 'Vider',
      description: 'Supprimer le cache actif.',
      confirmLabel: 'Réinitialiser',
      destructive: true,
      onConfirm,
    });

    overlay.querySelectorAll<HTMLButtonElement>('button')[1]?.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(onConfirm).toHaveBeenCalledOnce();
    expect(document.querySelector('.modal-overlay')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
