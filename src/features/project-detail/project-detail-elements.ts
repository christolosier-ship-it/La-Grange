import type { Project } from '../../core/projects/model';
import { SINGULAR_ACTIVITY_STATE_LABELS } from '../../ui/text/activity-state-labels';
import { PROJECT_CATEGORY_LABELS } from '../../ui/text/project-labels';
import { formatFullDate } from '../../utils/date';

function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function projectInitials(name: string): string {
  return name.trim().split(/[\s_-]+/u).filter(Boolean).slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '').join('') || 'LG';
}

export function createProjectArtwork(project: Project): HTMLElement {
  const artwork = document.createElement('div');
  artwork.className = 'project-detail__artwork';
  const fallback = document.createElement('div');
  fallback.className = 'project-detail__artwork-fallback';
  fallback.setAttribute('aria-hidden', 'true');
  fallback.textContent = projectInitials(project.displayName);

  if (project.cover) {
    const image = document.createElement('img');
    image.src = assetUrl(project.cover);
    image.alt = `Couverture du projet ${project.displayName}`;
    image.width = 1280;
    image.height = 720;
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.remove();
      artwork.append(fallback);
    }, { once: true });
    artwork.append(image);
  } else {
    artwork.append(fallback);
  }

  const logo = document.createElement('div');
  logo.className = 'project-detail__logo';
  if (project.logo) {
    const logoImage = document.createElement('img');
    logoImage.src = assetUrl(project.logo);
    logoImage.alt = `Logo du projet ${project.displayName}`;
    logoImage.width = 160;
    logoImage.height = 160;
    logoImage.addEventListener('error', () => {
      logoImage.remove();
      logo.textContent = projectInitials(project.displayName);
    }, { once: true });
    logo.append(logoImage);
  } else {
    logo.textContent = projectInitials(project.displayName);
    logo.setAttribute('aria-label', `Initiales du projet ${project.displayName}`);
  }
  artwork.append(logo);
  return artwork;
}

export function createProjectExternalLink(
  href: string,
  label: string,
  subject: string,
  offline: boolean,
  primary = false,
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = primary ? 'project-detail__action is-primary' : 'project-detail__action';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = offline ? `${label} · connexion requise` : label;
  link.setAttribute(
    'aria-label',
    `${label} pour ${subject} dans un nouvel onglet${offline ? ', connexion requise' : ''}`,
  );
  if (offline) {
    link.classList.add('requires-connection');
    link.title = 'Cette action nécessite une connexion internet.';
  }
  return link;
}

export function createProjectMetadata(project: Project): HTMLElement {
  const section = document.createElement('section');
  section.className = 'project-detail__panel';
  const title = document.createElement('h2');
  title.textContent = 'Fiche d’inventaire';
  const list = document.createElement('dl');
  list.className = 'project-detail__metadata';
  const entries: ReadonlyArray<readonly [string, string]> = [
    ['État', SINGULAR_ACTIVITY_STATE_LABELS[project.activityState]],
    ['Catégorie', PROJECT_CATEGORY_LABELS[project.category]],
    ['Langage', project.language ?? 'Non indiqué'],
    ['Branche principale', project.defaultBranch],
    ['Créé le', formatFullDate(project.createdAt)],
    ['Dernière activité détectée', formatFullDate(project.pushedAt ?? project.updatedAt)],
    ['Issues ouvertes', String(project.openIssuesCount)],
    ['Type', project.fork ? 'Fork public' : 'Dépôt principal'],
  ];
  for (const [label, value] of entries) {
    const term = document.createElement('dt');
    term.textContent = label;
    const detail = document.createElement('dd');
    detail.textContent = value;
    list.append(term, detail);
  }
  section.append(title, list);
  return section;
}

export function createProjectTopics(project: Project): HTMLElement {
  const section = document.createElement('section');
  section.className = 'project-detail__panel';
  const title = document.createElement('h2');
  title.textContent = 'Topics';
  if (project.topics.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Aucun topic public n’est renseigné.';
    section.append(title, empty);
    return section;
  }
  const list = document.createElement('ul');
  list.className = 'project-detail__topics';
  for (const topic of project.topics) {
    const item = document.createElement('li');
    item.textContent = topic;
    list.append(item);
  }
  section.append(title, list);
  return section;
}
