import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import type { SyncState } from '../../core/sync/sync-service';
import { createAppShell, updateWorkbenchStatus } from './app-shell';

const phase6ShellStyles = readFileSync(
  resolve(process.cwd(), 'src/styles/phase-6-shell.css'),
  'utf8',
);
const appShellSource = readFileSync(
  resolve(process.cwd(), 'src/ui/layout/app-shell.ts'),
  'utf8',
);
const serviceWorkerSource = readFileSync(
  resolve(process.cwd(), 'public/sw.js'),
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
    const implementation = `${shell.outerHTML}\n${appShellSource}\n${phase6ShellStyles}`;

    for (const asset of REQUIRED_SHELL_ASSETS) {
      expect(implementation).toContain(asset);
    }

    expect(shell.querySelector('.brand-copy')?.textContent).toContain('La Grange');
    expect([...shell.querySelectorAll<HTMLAnchorElement>('.primary-nav a')].map((link) => link.textContent)).toEqual([
      'Vue d’ensemble',
      'Projets',
      'Activité',
      'Paramètres',
    ]);
  });

  it('renders one fixed responsive scene whose selected background stays fully visible', () => {
    const shell = createAppShell();
    const scene = shell.querySelector('.phase-6-scene');
    const sources = [...shell.querySelectorAll<HTMLSourceElement>('.phase-6-scene__background source')];
    const fallback = shell.querySelector<HTMLImageElement>('.phase-6-scene__background img');
    const light = shell.querySelector<HTMLImageElement>('.phase-6-scene__light');

    expect(scene).not.toBeNull();
    expect(sources.map((source) => source.srcset)).toEqual(expect.arrayContaining([
      expect.stringContaining('p6-b01-background-workshop-2048x1152.webp'),
      expect.stringContaining('p6-b02-background-workshop-tablet-1366x1024.webp'),
      expect.stringContaining('p6-b03-background-workshop-tablet-1024x1366.webp'),
    ]));
    expect(fallback?.src).toContain('p6-b04-background-workshop-mobile-780x1386.webp');
    expect(light?.src).toContain('p6-b12-light-main-1600x900.png');
    expect(phase6ShellStyles).toContain('.phase-6-scene {\n  position: fixed;');
    expect(phase6ShellStyles).toContain('object-fit: contain;');
    expect(phase6ShellStyles).not.toContain('background-size: cover');
  });

  it('renders navigation icons as visible image elements and resolves shared CSS asset URLs from Vite base', () => {
    const shell = createAppShell();
    const icons = [...shell.querySelectorAll<HTMLImageElement>('.primary-nav__icon')];

    expect(icons).toHaveLength(4);
    expect(icons.map((icon) => icon.src)).toEqual([
      expect.stringContaining('p6-d01-icon-overview.svg'),
      expect.stringContaining('p6-d02-icon-projects.svg'),
      expect.stringContaining('p6-d03-icon-activity.svg'),
      expect.stringContaining('p6-d04-icon-settings.svg'),
    ]);
    expect(shell.style.getPropertyValue('--phase-6-wood-texture')).toContain('p6-b07-texture-wood-structure-1024x1024.webp');
    expect(shell.style.getPropertyValue('--phase-6-sync-icon')).toContain('p6-d05-icon-sync.svg');
  });

  it('precaches every shared asset required by the offline shell', () => {
    expect(serviceWorkerSource).toContain('shell-v11');
    for (const asset of REQUIRED_SHELL_ASSETS) {
      expect(serviceWorkerSource).toContain(asset);
    }
  });

  it('reserves the distinct mobile and wide brand ratios', () => {
    expect(phase6ShellStyles).toContain('aspect-ratio: 12 / 7');
    expect(phase6ShellStyles).toContain('aspect-ratio: 20 / 9');
  });

  it('switches to the HTML brand fallback when the selected sign cannot load', () => {
    const shell = createAppShell();
    const sign = shell.querySelector<HTMLImageElement>('[data-brand-sign]');

    sign?.dispatchEvent(new Event('error'));

    expect(shell.querySelector('.brand')?.classList.contains('is-fallback')).toBe(true);
    expect(shell.querySelector('.brand-copy')?.textContent).toContain('L’atelier où vivent mes projets');
  });

  it.each([
    ['idle', 'success', 'p6-d24-icon-success.svg'],
    ['loading-cache', 'syncing', 'p6-d23-icon-sync-running.svg'],
    ['syncing', 'syncing', 'p6-d23-icon-sync-running.svg'],
    ['offline', 'offline', 'p6-d22-icon-offline.svg'],
    ['error', 'error', 'p6-d26-icon-error.svg'],
    ['ready', 'online', 'p6-d21-icon-online.svg'],
  ] as const)('maps the %s synchronization state to a visible %s icon', (status, expectedState, expectedAsset) => {
    const shell = createAppShell();
    updateWorkbenchStatus(shell, { status } as SyncState);

    expect(shell.querySelector<HTMLElement>('[data-sync-panel]')?.dataset.syncState).toBe(expectedState);
    expect(shell.querySelector<HTMLImageElement>('.workbench-note__icon')?.src).toContain(expectedAsset);
  });

  it('retains a visible textual warning alongside D25', () => {
    const shell = createAppShell();
    updateWorkbenchStatus(shell, {
      status: 'ready',
      warning: new Error('données partielles'),
    } as SyncState);

    expect(shell.querySelector('.workbench-warning')?.textContent).toContain('données partielles');
    expect(shell.querySelector<HTMLImageElement>('.workbench-warning__icon')?.src).toContain('p6-d25-icon-warning.svg');
  });
});
