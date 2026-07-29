import { AppError } from '../errors/app-error';
import type { Project, ProjectCategory } from './model';

const CATEGORIES: readonly ProjectCategory[] = [
  'games',
  'applications',
  'professional-tools',
  'experiments',
  'learning',
  'uncategorized',
];

const KEYS = new Set([
  'displayName',
  'description',
  'category',
  'cover',
  'logo',
  'accent',
  'featured',
  'appUrl',
  'hidden',
  'sortOrder',
]);

export interface ProjectOverride {
  readonly displayName?: string;
  readonly description?: string;
  readonly category?: ProjectCategory;
  readonly cover?: string;
  readonly logo?: string;
  readonly accent?: string;
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

  for (const [name, raw] of Object.entries(value)) {
    if (!name.trim() || !raw || typeof raw !== 'object' || Array.isArray(raw)) {
      invalidOverride(`Invalid override: ${name}`, strictUnknown);
      continue;
    }

    const item = raw as Record<string, unknown>;
    for (const key of Object.keys(item)) {
      if (!KEYS.has(key)) invalidOverride(`Unknown override property: ${name}.${key}`, strictUnknown);
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
      if (typeof item.accent === 'string' && item.accent.trim()) {
        Object.assign(override, { accent: item.accent.trim() });
      } else invalidOverride(`Invalid accent: ${name}`, strictUnknown);
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
    if (!override) return [project];
    if (override.hidden === true) return [];

    const { hidden: _hidden, ...presentation } = override;
    return [{
      ...project,
      ...presentation,
      id: project.id,
      repositoryName: project.repositoryName,
      slug: project.slug,
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
