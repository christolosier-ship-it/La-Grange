import {
  PROJECT_STYLES,
  resolveProjectColors,
  styleForCategory,
} from '../customization/project-styles';
import { AppError } from '../errors/app-error';
import type {
  Project,
  ProjectCategory,
  ProjectColors,
  ProjectStyle,
} from './model';

const CATEGORIES: readonly ProjectCategory[] = [
  'games',
  'applications',
  'professional-tools',
  'experiments',
  'learning',
  'uncategorized',
];

const STYLES = PROJECT_STYLES.map((style) => style.key);
const OVERRIDE_KEYS = new Set([
  'displayName',
  'description',
  'category',
  'cover',
  'logo',
  'accent',
  'style',
  'colors',
  'progress',
  'manualVersion',
  'featured',
  'appUrl',
  'hidden',
  'sortOrder',
]);
const DOCUMENT_KEYS = new Set(['schemaVersion', 'projects']);
const COLOR_KEYS = new Set(['primary', 'secondary', 'progress']);
const HEX_COLOR = /^#[0-9a-f]{6}$/iu;

export interface ProjectOverride {
  readonly displayName?: string;
  readonly description?: string;
  readonly category?: ProjectCategory;
  readonly cover?: string;
  readonly logo?: string;
  readonly accent?: string;
  readonly style?: ProjectStyle;
  readonly colors?: ProjectColors;
  readonly progress?: number;
  readonly manualVersion?: string;
  readonly featured?: boolean;
  readonly appUrl?: string;
  readonly hidden?: boolean;
  readonly sortOrder?: number;
}

export type ProjectOverrides = Readonly<Record<string, ProjectOverride>>;

function relativeAsset(value: unknown): value is string {
  return typeof value === 'string'
    && value.length > 0
    && !value.startsWith('/')
    && !value.includes('..')
    && !value.includes('\\')
    && !/^[a-z]+:/iu.test(value);
}

function https(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function invalidOverride(message: string, strict: boolean): void {
  if (strict) {
    throw new AppError('invalid-overrides', message, 'Configuration éditoriale invalide.', true);
  }
  console.warn(`[La Grange] ${message}`);
}

function projectEntries(
  value: Record<string, unknown>,
  strictUnknown: boolean,
): Record<string, unknown> {
  const versioned = Object.hasOwn(value, 'schemaVersion') || Object.hasOwn(value, 'projects');
  if (!versioned) return value;

  for (const key of Object.keys(value)) {
    if (!DOCUMENT_KEYS.has(key)) invalidOverride(`Unknown overrides document property: ${key}`, strictUnknown);
  }

  if (value.schemaVersion !== 3) {
    invalidOverride('Unsupported overrides schemaVersion', strictUnknown);
  }
  if (!value.projects || typeof value.projects !== 'object' || Array.isArray(value.projects)) {
    throw new AppError(
      'invalid-overrides',
      'Overrides projects must be an object',
      'Configuration éditoriale invalide.',
      true,
    );
  }
  return value.projects as Record<string, unknown>;
}

function parseColors(value: unknown, name: string, strictUnknown: boolean): ProjectColors | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    invalidOverride(`Invalid colors: ${name}`, strictUnknown);
    return undefined;
  }

  const raw = value as Record<string, unknown>;
  for (const key of Object.keys(raw)) {
    if (!COLOR_KEYS.has(key)) invalidOverride(`Unknown color property: ${name}.colors.${key}`, strictUnknown);
  }

  const colors: { primary?: string; secondary?: string; progress?: string } = {};
  for (const key of ['primary', 'secondary', 'progress'] as const) {
    const color = raw[key];
    if (color === undefined) continue;
    if (typeof color === 'string' && HEX_COLOR.test(color)) colors[key] = color.toLowerCase();
    else invalidOverride(`Invalid ${key} color: ${name}`, strictUnknown);
  }

  if (!colors.primary || !colors.secondary || !colors.progress) {
    invalidOverride(`Incomplete colors: ${name}`, strictUnknown);
    return undefined;
  }
  return colors as ProjectColors;
}

export function parseOverrides(
  value: unknown,
  strictUnknown = import.meta.env.DEV,
): ProjectOverrides {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new AppError(
      'invalid-overrides',
      'Overrides root must be an object',
      'Configuration éditoriale invalide.',
      true,
    );
  }

  const result: Record<string, ProjectOverride> = {};
  const entries = projectEntries(value as Record<string, unknown>, strictUnknown);

  for (const [name, raw] of Object.entries(entries)) {
    if (!name.trim() || !raw || typeof raw !== 'object' || Array.isArray(raw)) {
      invalidOverride(`Invalid override: ${name}`, strictUnknown);
      continue;
    }

    const item = raw as Record<string, unknown>;
    for (const key of Object.keys(item)) {
      if (!OVERRIDE_KEYS.has(key)) invalidOverride(`Unknown override property: ${name}.${key}`, strictUnknown);
    }

    const override: ProjectOverride = {};

    if (item.displayName !== undefined) {
      if (typeof item.displayName === 'string' && item.displayName.trim()) {
        Object.assign(override, { displayName: item.displayName.trim() });
      } else invalidOverride(`Invalid displayName: ${name}`, strictUnknown);
    }

    if (item.description !== undefined) {
      if (typeof item.description === 'string' && item.description.trim()) {
        Object.assign(override, { description: item.description.trim() });
      } else invalidOverride(`Invalid description: ${name}`, strictUnknown);
    }

    if (item.category !== undefined) {
      if (typeof item.category === 'string' && CATEGORIES.includes(item.category as ProjectCategory)) {
        Object.assign(override, { category: item.category as ProjectCategory });
      } else invalidOverride(`Invalid category: ${name}`, strictUnknown);
    }

    for (const key of ['cover', 'logo'] as const) {
      if (item[key] === undefined) continue;
      if (relativeAsset(item[key])) Object.assign(override, { [key]: item[key] });
      else invalidOverride(`Invalid ${key}: ${name}`, strictUnknown);
    }

    if (item.accent !== undefined) {
      if (typeof item.accent === 'string' && HEX_COLOR.test(item.accent)) {
        Object.assign(override, { accent: item.accent.toLowerCase() });
      } else invalidOverride(`Invalid accent: ${name}`, strictUnknown);
    }

    if (item.style !== undefined) {
      if (typeof item.style === 'string' && STYLES.includes(item.style as ProjectStyle)) {
        Object.assign(override, { style: item.style as ProjectStyle });
      } else invalidOverride(`Invalid style: ${name}`, strictUnknown);
    }

    if (item.colors !== undefined) {
      const colors = parseColors(item.colors, name, strictUnknown);
      if (colors) Object.assign(override, { colors });
    }

    if (item.progress !== undefined) {
      if (typeof item.progress === 'number'
        && Number.isInteger(item.progress)
        && item.progress >= 0
        && item.progress <= 100) {
        Object.assign(override, { progress: item.progress });
      } else invalidOverride(`Invalid progress: ${name}`, strictUnknown);
    }

    if (item.manualVersion !== undefined) {
      if (typeof item.manualVersion === 'string'
        && item.manualVersion.trim()
        && item.manualVersion.trim().length <= 40) {
        Object.assign(override, { manualVersion: item.manualVersion.trim() });
      } else invalidOverride(`Invalid manualVersion: ${name}`, strictUnknown);
    }

    if (item.featured !== undefined) {
      if (typeof item.featured === 'boolean') Object.assign(override, { featured: item.featured });
      else invalidOverride(`Invalid featured flag: ${name}`, strictUnknown);
    }

    if (item.hidden !== undefined) {
      if (typeof item.hidden === 'boolean') Object.assign(override, { hidden: item.hidden });
      else invalidOverride(`Invalid hidden flag: ${name}`, strictUnknown);
    }

    if (item.appUrl !== undefined) {
      if (https(item.appUrl)) Object.assign(override, { appUrl: item.appUrl });
      else invalidOverride(`Invalid appUrl: ${name}`, strictUnknown);
    }

    if (item.sortOrder !== undefined) {
      if (typeof item.sortOrder === 'number' && Number.isFinite(item.sortOrder)) {
        Object.assign(override, { sortOrder: item.sortOrder });
      } else invalidOverride(`Invalid sortOrder: ${name}`, strictUnknown);
    }

    result[name] = override;
  }

  return result;
}

export function enrichProjects(
  projects: readonly Project[],
  overrides: ProjectOverrides,
): Project[] {
  return projects.flatMap((project) => {
    const override = overrides[project.repositoryName];
    if (override?.hidden === true) return [];

    const category = override?.category ?? project.category;
    const style = override?.style ?? project.style ?? styleForCategory(category);
    const colors = resolveProjectColors(
      style,
      override?.colors ?? project.colors,
      override?.accent ?? project.accent,
    );
    const manualVersion = override?.manualVersion ?? project.manualVersion;

    return [{
      ...project,
      ...override,
      id: project.id,
      repositoryName: project.repositoryName,
      slug: project.slug,
      category,
      style,
      colors,
      manualVersion,
      resolvedVersion: manualVersion ?? project.resolvedVersion,
    }];
  });
}

export async function loadOverrides(
  fetcher: typeof fetch = fetch,
  url = `${import.meta.env.BASE_URL}data/project-overrides.json`,
): Promise<ProjectOverrides> {
  const response = await fetcher(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new AppError(
      'invalid-overrides',
      `Overrides HTTP ${String(response.status)}`,
      'Configuration éditoriale indisponible.',
      true,
    );
  }

  let value: unknown;
  try {
    value = await response.json();
  } catch {
    throw new AppError(
      'invalid-overrides',
      'Overrides JSON is invalid',
      'Configuration éditoriale invalide.',
      true,
    );
  }

  return parseOverrides(value);
}
