import type { RouteMatch } from '../app/routes';

interface ViewContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

const PLACEHOLDERS: Record<Exclude<RouteMatch['name'], 'project' | 'not-found'>, ViewContent> = {
  dashboard: {
    eyebrow: 'Vue d’ensemble', title: 'Bienvenue dans l’atelier',
    description: 'Le tableau de bord accueillera bientôt l’inventaire de vos projets publics.',
  },
  projects: {
    eyebrow: 'Inventaire', title: 'Tous les projets',
    description: 'Le catalogue sera raccordé aux données publiques GitHub lors de la prochaine phase.',
  },
  activity: {
    eyebrow: 'Journal', title: 'Activité récente',
    description: 'Les événements connus de l’atelier apparaîtront ici, sans interprétation trompeuse.',
  },
  settings: {
    eyebrow: 'Préférences', title: 'Paramètres',
    description: 'Les réglages locaux et les informations du cache seront disponibles ici.',
  },
};

export function renderView(route: RouteMatch): HTMLElement {
  const article = document.createElement('article');
  article.className = 'placeholder-panel';
  const content = getContent(route);
  article.innerHTML = `<p class="eyebrow"></p><h1 tabindex="-1"></h1><p class="lead"></p>`;
  article.querySelector<HTMLElement>('.eyebrow')!.textContent = content.eyebrow;
  article.querySelector<HTMLHeadingElement>('h1')!.textContent = content.title;
  article.querySelector<HTMLElement>('.lead')!.textContent = content.description;
  return article;
}

function getContent(route: RouteMatch): ViewContent {
  if (route.name === 'project') {
    return {
      eyebrow: 'Projet', title: route.params.repositoryName ?? 'Projet',
      description: 'La fiche détaillée de ce dépôt sera construite dans une phase ultérieure.',
    };
  }
  if (route.name === 'not-found') {
    return {
      eyebrow: 'Chemin inconnu', title: 'Cette porte ne mène nulle part',
      description: 'Revenez à la vue d’ensemble pour retrouver l’entrée de l’atelier.',
    };
  }
  return PLACEHOLDERS[route.name];
}
