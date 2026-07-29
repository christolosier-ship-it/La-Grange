import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '../../core/errors/app-error';
import type { SyncState } from '../../core/sync/sync-service';
import { createDashboardFeedback, createSyncButton } from './dashboard-header';

function rateLimited(retryAt: string): SyncState {
  return {
    status: 'error',
    error: new AppError(
      'rate-limit',
      'GitHub rate limit exceeded',
      'Limite GitHub atteinte.',
      true,
      retryAt,
    ),
  };
}

afterEach(() => {
  vi.useRealTimers();
  document.body.replaceChildren();
});

describe('dashboard synchronization controls', () => {
  it('disables forced refresh until the GitHub retry time', () => {
    vi.useFakeTimers();
    const now = new Date('2026-07-29T10:00:00Z');
    const button = createSyncButton(rateLimited('2026-07-29T10:01:00Z'), now);
    document.body.append(button);

    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Réessayer après');

    vi.advanceTimersByTime(60_000);

    expect(button.disabled).toBe(false);
    expect(button.textContent).toBe('Actualiser l’inventaire');
  });

  it('shows the server retry time in the durable error feedback', () => {
    const feedback = createDashboardFeedback(rateLimited('2099-07-29T10:01:00Z'));

    expect(feedback?.textContent).toContain('Limite GitHub atteinte');
    expect(feedback?.textContent).toContain('Nouvelle tentative possible après');
  });
});
