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

  const list = shell.querySelector('ul')!;
  for (const item of NAVIGATION) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${item.href}" data-route="${item.route}">${item.label}</a>`;
    list.append(li);
  }
  return shell;
}

export function updateActiveNavigation(shell: HTMLElement, routeName: string): void {
  shell.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    if (link.dataset.route === routeName) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
