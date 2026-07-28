import type { RouteMatch } from '../app/routes';

interface ViewContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

const PLACEHOLDERS: Record<Exclude<RouteMatch['name'], 'project' | 'not-found'>, ViewContent> = {
  dashboard: {
    eyebrow: 'Vue d’ensemble',
    title: 'Bienvenue dans l’atelier',
    description: 'Le tableau de bord accueillera bientôt l’inventaire de vos projets publics.',
  },
  projects: {
    eyebrow: 'Inventaire',
    title: 'Tous les projets',
    description: 'Le catalogue sera raccordé aux données publiques GitHub lors de la prochaine phase.',
  },
  activity: {
    eyebrow: 'Journal',
    title: 'Activité récente',
    description: 'Les événements connus de l’atelier apparaîtront ici, sans interprétation trompeuse.',
  },
  settings: {
    eyebrow: 'Préférences',
    title: 'Paramètres',
    description: 'Les réglages locaux et les informations du cache seront disponibles ici.',
  },
};

export function renderView(route: RouteMatch): HTMLElement {
  const article = document.createElement('article');
  article.className = 'placeholder-panel';
  const content = getContent(route);

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = content.eyebrow;

  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = content.title;

  const description = document.createElement('p');
  description.className = 'lead';
  description.textContent = content.description;

  article.append(eyebrow, title, description);

  if (route.name === 'not-found') {
    const returnLink = document.createElement('a');
    returnLink.className = 'return-link';
    returnLink.href = '#/';
    returnLink.textContent = 'Revenir à la vue d’ensemble';
    article.append(returnLink);
  }

  return article;
}

function getContent(route: RouteMatch): ViewContent {
  if (route.name === 'project') {
    return {
      eyebrow: 'Projet',
      title: route.params.repositoryName ?? 'Projet',
      description: 'La fiche détaillée de ce dépôt sera construite dans une phase ultérieure.',
    };
  }
  if (route.name === 'not-found') {
    return {
      eyebrow: 'Chemin inconnu',
      title: 'Cette porte ne mène nulle part',
      description: 'Le chemin demandé n’existe pas dans La Grange.',
    };
  }
  return PLACEHOLDERS[route.name];
}
