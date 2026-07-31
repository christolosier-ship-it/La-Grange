import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it } from 'vitest';
import type { SyncState } from '../../core/sync/sync-service';
import { createAppShell, updateWorkbenchStatus } from './app-shell';

const phase6ShellStyles = readFileSync(
  new URL('../../styles/phase-6-shell.css', import.meta.url),
  'utf8',
);

const REQUIRED_SHELL_ASSETS = [
  'p6-a01-brand-sign-1600x720.webp',
  'p6-a02-brand-sign-800x360.webp',
  'p6-a03-brand-sign-mobile-960x560.webp',
  'p6-a04-brand-mark.svg',
  'p6-b01-background-workshop-2048x1152.webp',
  'p6-b02-background-workshop-tablet-1366x1024.webp',
  'p6-b03-background-workshop-tablet-1024x1366.webp',
  'p6-b04-background-workshop-mobile-780x1386.webp',
  'p6-b07-texture-wood-structure-1024x1024.webp',
  'p6-b12-light-main-1600x900.png',
  'p6-d01-icon-overview.svg',
  'p6-d02-icon-projects.svg',
  'p6-d03-icon-activity.svg',
  'p6-d04-icon-settings.svg',
  'p6-d05-icon-sync.svg',
  'p6-d21-icon-online.svg',
  'p6-d22-icon-offline.svg',
  'p6-d23-icon-sync-running.svg',
  'p6-d24-icon-success.svg',
  'p6-d25-icon-warning.svg',
  'p6-d26-icon-error.svg',
] as const;

describe('Phase 6A app shell assets', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('references every validated shell asset while retaining HTML labels', () => {
    const shell = createAppShell();
    const integratedMarkupAndStyles = `${shell.innerHTML}\n${phase6ShellStyles}`;

    for (const asset of REQUIRED_SHELL_ASSETS) {
      expect(integratedMarkupAndStyles).toContain(asset);
    }

    expect(shell.querySelector('.brand-copy')?.textContent).toContain('La Grange');
    expect([...shell.querySelectorAll<HTMLAnchorElement>('.primary-nav a')].map((link) => link.textContent)).toEqual([
      'Vue d’ensemble',
      'Projets',
      'Activité',
      'Paramètres',
    ]);
  });

  it('switches to the HTML brand fallback when the selected sign cannot load', () => {
    const shell = createAppShell();
    const sign = shell.querySelector<HTMLImageElement>('[data-brand-sign]');

    sign?.dispatchEvent(new Event('error'));

    expect(shell.querySelector('.brand')?.classList.contains('is-fallback')).toBe(true);
    expect(shell.querySelector('.brand-copy')?.textContent).toContain('L’atelier où vivent mes projets');
  });

  it.each([
    ['idle', 'success'],
    ['loading-cache', 'syncing'],
    ['syncing', 'syncing'],
    ['offline', 'offline'],
    ['error', 'error'],
    ['ready', 'online'],
  ] as const)('maps the %s synchronization state to the %s icon hook', (status, expectedIcon) => {
    const shell = createAppShell();
    updateWorkbenchStatus(shell, { status } as SyncState);

    expect(shell.querySelector<HTMLElement>('[data-sync-panel]')?.dataset.syncState).toBe(expectedIcon);
  });

  it('retains a visible textual warning alongside the decorative warning icon', () => {
    const shell = createAppShell();
    updateWorkbenchStatus(shell, {
      status: 'ready',
      warning: new Error('données partielles'),
    } as SyncState);

    expect(shell.querySelector('.workbench-warning')?.textContent).toContain('données partielles');
  });
});
