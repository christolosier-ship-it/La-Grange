import type { Project } from '../../core/projects/model';
import { SINGULAR_ACTIVITY_STATE_LABELS } from '../text/activity-state-labels';
import { formatFullDate, formatRelativeDate } from '../../utils/date';

export type ProjectCardVariant = 'standard' | 'compact' | 'featured';

export interface ProjectCardOptions {
  readonly variant?: ProjectCardVariant;
  readonly now?: Date;
  readonly offline?: boolean;
}

function projectInitials(name: string): string {
  const words = name.trim().split(/[\s_-]+/u).filter(Boolean);
  const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('');
  return initials || 'LG';
}

function projectHue(project: Project): number {
  let hash = project.id;
  for (const character of project.repositoryName) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  return Math.abs(hash) % 360;
}

function coverUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function createCrateIcon(): SVGSVGElement {
  const namespace = 'http://www.w3.org/2000/svg';
  const icon = document.createElementNS(namespace, 'svg');
  icon.classList.add('project-card__crate-icon');
  icon.setAttribute('viewBox', '0 0 48 48');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('aria-hidden', 'true');

  const frame = document.createElementNS(namespace, 'rect');
  frame.setAttribute('x', '6');
  frame.setAttribute('y', '9');
  frame.setAttribute('width', '36');
  frame.setAttribute('height', '30');
  frame.setAttribute('rx', '2');

  const diagonalLeft = document.createElementNS(namespace, 'path');
  diagonalLeft.setAttribute('d', 'M9 36 39 12');
  const diagonalRight = document.createElementNS(namespace, 'path');
  diagonalRight.setAttribute('d', 'm9 12 30 24');
  const slatTop = document.createElementNS(namespace, 'path');
  slatTop.setAttribute('d', 'M6 17h36');
  const slatBottom = document.createElementNS(namespace, 'path');
  slatBottom.setAttribute('d', 'M6 31h36');

  icon.append(frame, diagonalLeft, diagonalRight, slatTop, slatBottom);
  return icon;
}

function createVisual(project: Project): HTMLElement {
  const visual = document.createElement('div');
  visual.className = 'project-card__visual';
  visual.style.setProperty('--project-hue', String(projectHue(project)));

  const fallback = document.createElement('div');
  fallback.className = 'project-card__fallback';
  fallback.setAttribute('aria-hidden', 'true');

  const initials = document.createElement('span');
  initials.textContent = projectInitials(project.displayName);
  fallback.append(createCrateIcon(), initials);

  if (!project.cover) {
    visual.classList.add('is-fallback');
    visual.append(fallback);
    return visual;
  }

  fallback.hidden = true;
  const image = document.createElement('img');
  image.src = coverUrl(project.cover);
  image.alt = `Couverture du projet ${project.displayName}`;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.width = 640;
  image.height = 360;
  image.addEventListener('error', () => {
    image.remove();
    fallback.hidden = false;
    visual.classList.add('is-fallback');
  }, { once: true });

  visual.append(image, fallback);
  return visual;
}

function createStatusBadge(project: Project): HTMLElement {
  const badge = document.createElement('span');
  badge.className = `status-badge status-badge--${project.activityState}`;
  badge.textContent = SINGULAR_ACTIVITY_STATE_LABELS[project.activityState];
  return badge;
}

function createTime(project: Project, now: Date): HTMLTimeElement {
  const value = project.pushedAt ?? project.updatedAt;
  const time = document.createElement('time');
  time.className = 'project-card__time';
  if (value) time.dateTime = value;
  time.textContent = formatRelativeDate(value, now);
  time.title = formatFullDate(value);
  time.setAttribute('aria-label', `Dernière activité détectée : ${formatFullDate(value)}`);
  return time;
}

export function createProjectCard(project: Project, options: ProjectCardOptions = {}): HTMLElement {
  const variant = options.variant ?? 'standard';
  const card = document.createElement('article');
  card.className = `project-card project-card--${variant}`;
  card.dataset.state = project.activityState;
  if (project.isNew) card.classList.add('is-new');
  if (project.archived) card.classList.add('is-archived');

  const visual = createVisual(project);
  const body = document.createElement('div');
  body.className = 'project-card__body';

  const badges = document.createElement('div');
  badges.className = 'project-card__badges';
  badges.append(createStatusBadge(project));
  if (project.isNew) {
    const newBadge = document.createElement('span');
    newBadge.className = 'new-badge';
    newBadge.textContent = 'Nouvelle arrivée';
    badges.append(newBadge);
  }

  const heading = document.createElement('h3');
  heading.className = 'project-card__title';
  const detailLink = document.createElement('a');
  detailLink.href = `#/project/${encodeURIComponent(project.repositoryName)}`;
  detailLink.textContent = project.displayName;
  heading.append(detailLink);

  const description = document.createElement('p');
  description.className = 'project-card__description';
  description.textContent = project.description || 'Projet GitHub sans description éditoriale.';

  const metadata = document.createElement('div');
  metadata.className = 'project-card__metadata';
  const language = document.createElement('span');
  language.textContent = project.language ?? 'Langage non indiqué';
  metadata.append(language, createTime(project, options.now ?? new Date()));

  body.append(badges, heading, description, metadata);

  if (project.appUrl) {
    const action = document.createElement('a');
    action.className = 'project-card__launch';
    action.href = project.appUrl;
    action.target = '_blank';
    action.rel = 'noopener noreferrer';
    action.textContent = options.offline
      ? 'Ouvrir l’application · connexion requise'
      : 'Ouvrir l’application';
    action.setAttribute(
      'aria-label',
      options.offline
        ? `Ouvrir l’application ${project.displayName} dans un nouvel onglet, connexion requise`
        : `Ouvrir l’application ${project.displayName} dans un nouvel onglet`,
    );
    if (options.offline) {
      action.classList.add('requires-connection');
      action.title = 'Cette action nécessite une connexion internet.';
    }
    body.append(action);
  }

  card.append(visual, body);
  return card;
}
