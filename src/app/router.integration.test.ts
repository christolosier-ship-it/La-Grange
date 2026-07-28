import { afterEach, describe, expect, it } from 'vitest';
import { createRouter } from './router';
import { createAppShell } from '../ui/layout/app-shell';

describe('router integration', () => {
  afterEach(() => { window.location.hash = ''; document.body.replaceChildren(); });
  it('renders a direct route, updates title, navigation and focus', () => {
    window.location.hash = '#/activity';
    const shell = createAppShell(); document.body.append(shell);
    const router = createRouter(shell); router.start();
    expect(shell.querySelector('h1')?.textContent).toBe('Activité récente');
    expect(document.title).toBe('Activité · La Grange');
    expect(shell.querySelector('[aria-current="page"]')?.textContent).toBe('Activité');
    expect(document.activeElement).toBe(shell.querySelector('h1'));
    router.stop();
  });
  it('responds to browser hash navigation and renders an unknown route safely', () => {
    const shell = createAppShell(); document.body.append(shell);
    const router = createRouter(shell); router.start();
    window.location.hash = '#/missing'; window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(shell.querySelector('h1')?.textContent).toBe('Cette porte ne mène nulle part');
    expect(document.title).toBe('Page introuvable · La Grange');
    router.stop();
  });
});
