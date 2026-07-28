import { afterEach, describe, expect, it } from 'vitest';
import { createRouter } from './router';
import { createAppShell } from '../ui/layout/app-shell';

describe('router integration', () => {
  afterEach(() => {
    window.location.hash = '';
    document.body.replaceChildren();
  });

  it('renders a direct route, updates title, navigation and focus', () => {
    window.location.hash = '#/activity';
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell);
    router.start();

    expect(shell.querySelector('h1')?.textContent).toBe('Activité récente');
    expect(document.title).toBe('Activité · La Grange');
    expect(shell.querySelector('[aria-current="page"]')?.textContent).toBe('Activité');
    expect(document.activeElement).toBe(shell.querySelector('h1'));
    router.stop();
  });

  it('keeps the projects navigation active on a project detail route', () => {
    window.location.hash = '#/project/Luma';
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell);
    router.start();

    expect(shell.querySelector('h1')?.textContent).toBe('Luma');
    expect(document.title).toBe('Luma · La Grange');
    expect(shell.querySelector('[aria-current="page"]')?.textContent).toBe('Projets');
    router.stop();
  });

  it('renders an unknown route with a safe return action', () => {
    const shell = createAppShell();
    document.body.append(shell);
    const router = createRouter(shell);
    router.start();
    window.location.hash = '#/missing';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(shell.querySelector('h1')?.textContent).toBe('Cette porte ne mène nulle part');
    expect(document.title).toBe('Page introuvable · La Grange');
    expect(shell.querySelector<HTMLAnchorElement>('.return-link')?.hash).toBe('#/');
    router.stop();
  });
});
