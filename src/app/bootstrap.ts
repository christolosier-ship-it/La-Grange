import { createRouter } from './router';
import { createStore } from './store';
import { registerServiceWorker } from './service-worker';
import { createAppShell } from '../ui/layout/app-shell';

export function startApplication(root: HTMLElement | null): void {
  if (!root) throw new Error('Élément racine #app introuvable.');
  createStore();
  const shell = createAppShell();
  root.replaceChildren(shell);
  createRouter(shell).start();
  registerServiceWorker();
}
