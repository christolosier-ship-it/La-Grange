import type {
  ProjectCategory,
  ProjectColors,
  ProjectStyle,
} from '../projects/model';

export interface ProjectStyleDefinition {
  readonly key: ProjectStyle;
  readonly label: string;
  readonly symbol: string;
  readonly colors: ProjectColors;
}

export const PROJECT_STYLES: readonly ProjectStyleDefinition[] = [
  { key: 'lifestyle', label: 'Style de vie', symbol: '♥', colors: { primary: '#a75f46', secondary: '#e7b58d', progress: '#cf805d' } },
  { key: 'games', label: 'Jeux', symbol: '✦', colors: { primary: '#b56d18', secondary: '#efc26d', progress: '#dc891c' } },
  { key: 'productivity', label: 'Productivité', symbol: '✓', colors: { primary: '#386f83', secondary: '#9bc4d1', progress: '#4f91a8' } },
  { key: 'health', label: 'Santé', symbol: '+', colors: { primary: '#7e4963', secondary: '#d9a0bb', progress: '#a75f82' } },
  { key: 'education', label: 'Éducation', symbol: '▤', colors: { primary: '#765c31', secondary: '#d8bd78', progress: '#a07c3e' } },
  { key: 'nature', label: 'Nature', symbol: '❧', colors: { primary: '#4e742f', secondary: '#a9c77b', progress: '#6c9b3d' } },
  { key: 'creation', label: 'Création', symbol: '✎', colors: { primary: '#804d8a', secondary: '#c6a0cf', progress: '#a36ab0' } },
  { key: 'technical', label: 'Technique et métier', symbol: '⚒', colors: { primary: '#586069', secondary: '#b7bdc2', progress: '#7b858e' } },
  { key: 'uncategorized', label: 'Inclassable', symbol: '◇', colors: { primary: '#6d573f', secondary: '#c3aa86', progress: '#91714d' } },
] as const;

const STYLE_MAP = new Map(PROJECT_STYLES.map((definition) => [definition.key, definition]));

export function styleForCategory(category: ProjectCategory): ProjectStyle {
  if (category === 'games') return 'games';
  if (category === 'applications') return 'productivity';
  if (category === 'professional-tools') return 'technical';
  if (category === 'learning') return 'education';
  if (category === 'experiments') return 'creation';
  return 'uncategorized';
}

export function projectStyleDefinition(style: ProjectStyle | undefined): ProjectStyleDefinition {
  return STYLE_MAP.get(style ?? 'uncategorized') ?? PROJECT_STYLES[PROJECT_STYLES.length - 1]!;
}

export function resolveProjectColors(
  style: ProjectStyle,
  custom?: Partial<ProjectColors>,
  legacyAccent?: string,
): ProjectColors {
  const defaults = projectStyleDefinition(style).colors;
  return {
    primary: custom?.primary ?? legacyAccent ?? defaults.primary,
    secondary: custom?.secondary ?? defaults.secondary,
    progress: custom?.progress ?? custom?.primary ?? legacyAccent ?? defaults.progress,
  };
}
