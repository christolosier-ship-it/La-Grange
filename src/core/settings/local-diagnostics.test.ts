import { describe, expect, it, vi } from 'vitest';
import { AppError } from '../errors/app-error';
import { DEFAULT_APP_PREFERENCES } from '../preferences/app-preferences';
import { buildLocalDiagnostics, copyText } from './local-diagnostics';

describe('local diagnostics', () => {
  it('contains useful effective state without secrets or technical stacks', () => {
    const diagnostics = buildLocalDiagnostics({
      version: '0.1.8-settings',
      online: false,
      preferences: {
        ...DEFAULT_APP_PREFERENCES,
        favoriteIds: [1, 2],
        density: 'compact',
      },
      sync: {
        status: 'error',
        error: new AppError(
          'network',
          'GitHub HTTP 403 with internal transport details',
          'Connexion à GitHub impossible.',
          true,
        ),
      },
      settings: {
        status: 'ready',
        cache: {
          username: 'christolosier-ship-it',
          available: true,
          snapshotPresent: true,
          projectCount: 12,
          activityCount: 4,
          invalidActivityCount: 0,
          detailCount: 2,
        },
      },
      generatedAt: new Date('2026-07-29T14:00:00.000Z'),
    });

    expect(diagnostics).toContain('0.1.8-settings');
    expect(diagnostics).toContain('Connexion à GitHub impossible.');
    expect(diagnostics).toContain('"favoriteCount": 2');
    expect(diagnostics).not.toContain('GitHub HTTP 403');
    expect(diagnostics.toLowerCase()).not.toContain('token');
    expect(diagnostics).not.toContain('description');
    expect(diagnostics).not.toContain('stack');
  });

  it('uses the Clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    await expect(copyText('diagnostic', { writeText })).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('diagnostic');
  });

  it('reports Clipboard API rejection without creating hidden DOM content', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Permission denied'));

    await expect(copyText('diagnostic', { writeText })).resolves.toBe(false);
    expect(document.querySelector('textarea')).toBeNull();
  });
});
