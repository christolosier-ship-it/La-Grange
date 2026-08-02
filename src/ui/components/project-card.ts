import {
  projectStyleDefinition,
  resolveProjectColors,
  styleForCategory,
} from '../../core/customization/project-styles';
import type { Project } from '../../core/projects/model';
import { openProjectCustomization } from '../../features/project-customization/customization-modal';
import { formatFullDate, formatRelativeDate } from '../../utils/date';

export type ProjectCardVariant = 'standard' | 'compact' | 'featured' | 'list';

export interface ProjectCardOptions {
  readonly variant?: ProjectCardVariant;
  readonly now?: Date;
  readonly offline?: boolean;
  readonly detailHref?: string;
  readonly favorite?: boolean;
  readonly onToggleFavorite?: (projectId: number) => void;
}

const PHASE_6_ASSET_BASE = `${import.meta.env.BASE_URL}assets/phase-6/`;

function phase6Asset(filename: string): string {
  return `${PHASE_6_ASSET_BASE}${filename}`;
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

function createIcon(filename: string): HTMLImageElement {
  const icon = document.createElement('img');
  icon.src = phase6Asset(filename);
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  icon.decoding = 'async';
  icon.setAttribute('aria-hidden', 'true');
  return icon;
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
  image.height = 400;
  image.addEventListener('error', () => {
    image.remove();
    fallback.hidden = false;
    visual.classList.add('is-fallback');
  }, { once: true });
  visual.append(image, fallback);
  return visual;
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

function createFavoriteButton(project: Project, options: ProjectCardOptions): HTMLButtonElement | undefined {
  if (!options.onToggleFavorite) return undefined;
  const favorite = options.favorite === true;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'project-card__favorite';
  button.dataset.focusKey = `favorite-${String(project.id)}`;
  button.setAttribute('aria-pressed', String(favorite));
  button.setAttribute('aria-label', favorite
    ? `Retirer ${project.displayName} des favoris`
    : `Ajouter ${project.displayName} aux favoris`);
  button.textContent = favorite ? '★' : '☆';
  button.addEventListener('click', () => {
    options.onToggleFavorite?.(project.id);
  });
  return button;
}

function decorateTooltip(element: HTMLElement, label: string): void {
  element.dataset.tooltip = label;
  element.title = label;
  element.setAttribute('aria-label', label);
}

function accessibleLabel(label: string): HTMLSpanElement {
  const text = document.createElement('span');
  text.className = 'visually-hidden';
  text.textContent = label;
  return text;
}

function externalAction(
  href: string,
  iconFilename: string,
  label: string,
  offline = false,
): HTMLAnchorElement {
  const resolvedLabel = offline ? `${label}, connexion requise` : label;
  const link = document.createElement('a');
  link.className = 'project-card__action';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(createIcon(iconFilename), accessibleLabel(resolvedLabel));
  decorateTooltip(link, resolvedLabel);
  if (offline) link.classList.add('requires-connection');
  return link;
}

function unavailableAction(iconFilename: string, label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'project-card__action';
  button.disabled = true;
  button.append(createIcon(iconFilename), accessibleLabel(label));
  decorateTooltip(button, label);
  return button;
}

export function createProjectCard(project: Project, options: ProjectCardOptions = {}): HTMLElement {
  const variant = options.variant ?? 'standard';
  const style = project.style ?? styleForCategory(project.category);
  const definition = projectStyleDefinition(style);
  const colors = resolveProjectColors(style, project.colors, project.accent);

  const card = document.createElement('article');
  card.className = `project-card project-card--${variant}`;
  card.dataset.state = project.activityState;
  card.dataset.style = style;
  if (project.isNew) card.classList.add('is-new');
  if (project.archived) card.classList.add('is-archived');
  card.style.setProperty('--project-card-skin', `url("${phase6Asset('p6-c01-project-card-skin-standard-640x960.webp')}")`);
  card.style.setProperty('--project-primary', colors.primary);
  card.style.setProperty('--project-secondary', colors.secondary);
  card.style.setProperty('--project-progress', colors.progress);

  const headingPanel = document.createElement('header');
  headingPanel.className = 'project-card__heading';
  const styleMarker = document.createElement('span');
  styleMarker.className = 'project-card__style';
  styleMarker.textContent = definition.symbol;
  styleMarker.title = definition.label;
  styleMarker.setAttribute('aria-label', `Style : ${definition.label}`);
  const heading = document.createElement('h3');
  heading.className = 'project-card__title';
  const detailLink = document.createElement('a');
  detailLink.href = options.detailHref ?? `#/project/${encodeURIComponent(project.repositoryName)}`;
  detailLink.textContent = project.displayName;
  heading.append(detailLink);
  headingPanel.append(styleMarker, heading);
  const favoriteButton = createFavoriteButton(project, options);
  if (favoriteButton) headingPanel.append(favoriteButton);

  const visual = createVisual(project);
  if (project.resolvedVersion) {
    const version = document.createElement('span');
    version.className = 'project-card__version';
    version.textContent = project.resolvedVersion;
    version.setAttribute('aria-label', `Version ${project.resolvedVersion}`);
    visual.append(version);
  }

  const description = document.createElement('p');
  description.className = 'project-card__description';
  description.textContent = project.description || 'Projet GitHub sans description éditoriale.';

  const metadata = document.createElement('div');
  metadata.className = 'project-card__metadata';
  const language = document.createElement('span');
  language.textContent = project.language ?? 'Langage non indiqué';
  metadata.append(createTime(project, options.now ?? new Date()), language);

  const progress = document.createElement('div');
  progress.className = 'project-card__progress';
  if (project.progress === undefined) {
    progress.hidden = true;
  } else {
    const track = document.createElement('span');
    track.className = 'project-card__progress-track';
    const value = document.createElement('span');
    value.className = 'project-card__progress-value';
    value.style.width = `${String(project.progress)}%`;
    track.append(value);
    const label = document.createElement('strong');
    label.textContent = `${String(project.progress)}%`;
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', 'Estimation manuelle de l’avancement');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', String(project.progress));
    progress.append(track, label);
  }

  const actions = document.createElement('div');
  actions.className = 'project-card__actions';
  const githubAction = externalAction(
    project.githubUrl,
    'p6-d06-icon-github.svg',
    'Ouvrir sur GitHub',
    options.offline,
  );
  const applicationAction = project.appUrl
    ? externalAction(
      project.appUrl,
      'p6-d07-icon-launch-app.svg',
      'Lancer l’application',
      options.offline,
    )
    : unavailableAction('p6-d07-icon-launch-app.svg', 'Application non disponible');
  applicationAction.classList.add('project-card__launch');
  const readmeAction = externalAction(
    project.readmeUrl,
    'p6-d42-icon-readme.svg',
    'Ouvrir le README',
    options.offline,
  );
  actions.append(githubAction, applicationAction, readmeAction);

  const details = document.createElement('a');
  details.className = 'project-card__action';
  details.href = options.detailHref ?? `#/project/${encodeURIComponent(project.repositoryName)}`;
  details.append(createIcon('p6-d20-icon-details.svg'), accessibleLabel('Voir le détail du projet'));
  decorateTooltip(details, 'Voir le détail du projet');
  actions.append(details);

  const customize = document.createElement('button');
  customize.type = 'button';
  customize.className = 'project-card__action project-card__action--customize';
  customize.append(createIcon('p6-d43-icon-customize.svg'), accessibleLabel('Personnaliser le projet'));
  decorateTooltip(customize, 'Personnaliser le projet');
  customize.addEventListener('click', () => {
    openProjectCustomization(project);
  });
  actions.append(customize);

  card.append(headingPanel, visual, description, metadata, progress, actions);
  return card;
}
