import type { RouteName } from '../../app/routes';

const NAVIGATION = [
  { href: '#/', label: 'Vue d’ensemble', route: 'dashboard' },
  { href: '#/projects', label: 'Projets', route: 'projects' },
  { href: '#/activity', label: 'Activité', route: 'activity' },
  { href: '#/settings', label: 'Paramètres', route: 'settings' },
] as const;

export function createAppShell(): HTMLElement {
  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.innerHTML = `
    <header class="brand"><a href="#/" aria-label="La Grange, accueil"><span class="brand-mark" aria-hidden="true">LG</span><span><strong>La Grange</strong><small>L’atelier où vivent mes projets</small></span></a></header>
    <nav class="primary-nav" aria-label="Navigation principale"><ul></ul></nav>
    <main id="main-content" tabindex="-1"></main>
    <aside class="workbench-note" aria-label="État de l’atelier"><p><strong>Socle prêt</strong></p><p>Les outils sont rangés. L’inventaire arrivera à la prochaine phase.</p></aside>
    <footer><small>La Grange · lecture seule</small></footer>`;

  const list = shell.querySelector('ul');
  if (!list) throw new Error('La navigation principale est introuvable.');

  for (const item of NAVIGATION) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.dataset.route = item.route;
    link.textContent = item.label;
    li.append(link);
    list.append(li);
  }
  return shell;
}

export function updateActiveNavigation(shell: HTMLElement, routeName: RouteName): void {
  const activeRoute = routeName === 'project' ? 'projects' : routeName;
  shell.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    if (link.dataset.route === activeRoute) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
