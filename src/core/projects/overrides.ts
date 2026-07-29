import { AppError } from '../errors/app-error';
import type { Project, ProjectCategory } from './model';

const CATEGORIES: readonly ProjectCategory[] = ['applications', 'experiments', 'libraries', 'other'];
const KEYS = new Set(['displayName', 'description', 'category', 'cover', 'logo', 'accent', 'featured', 'appUrl', 'hidden', 'sortOrder']);

export interface ProjectOverride {
  readonly displayName?: string; readonly description?: string; readonly category?: ProjectCategory;
  readonly cover?: string; readonly logo?: string; readonly accent?: string; readonly featured?: boolean;
  readonly appUrl?: string; readonly hidden?: boolean; readonly sortOrder?: number;
}
export type ProjectOverrides = Readonly<Record<string, ProjectOverride>>;

function relativeAsset(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && !value.startsWith('/') && !value.includes('..') && !/^[a-z]+:/iu.test(value);
}
function https(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

export function parseOverrides(value: unknown, strictUnknown = import.meta.env.DEV): ProjectOverrides {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new AppError('invalid-overrides', 'Overrides root must be an object', 'Configuration éditoriale invalide.', true);
  const result: Record<string, ProjectOverride> = {};
  for (const [name, raw] of Object.entries(value)) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new AppError('invalid-overrides', `Invalid override: ${name}`, 'Configuration éditoriale invalide.', true);
    const item = raw as Record<string, unknown>;
    if (strictUnknown && Object.keys(item).some((key) => !KEYS.has(key))) throw new AppError('invalid-overrides', `Unknown override property: ${name}`, 'Configuration éditoriale invalide.', true);
    const override: ProjectOverride = {};
    if (typeof item.displayName === 'string' && item.displayName) Object.assign(override, { displayName: item.displayName });
    if (typeof item.description === 'string' && item.description) Object.assign(override, { description: item.description });
    if (typeof item.category === 'string' && CATEGORIES.includes(item.category as ProjectCategory)) Object.assign(override, { category: item.category as ProjectCategory });
    for (const key of ['cover', 'logo'] as const) if (relativeAsset(item[key])) Object.assign(override, { [key]: item[key] });
    if (typeof item.accent === 'string' && item.accent) Object.assign(override, { accent: item.accent });
    if (typeof item.featured === 'boolean') Object.assign(override, { featured: item.featured });
    if (typeof item.hidden === 'boolean') Object.assign(override, { hidden: item.hidden });
    if (https(item.appUrl)) Object.assign(override, { appUrl: item.appUrl });
    if (typeof item.sortOrder === 'number' && Number.isFinite(item.sortOrder)) Object.assign(override, { sortOrder: item.sortOrder });
    result[name] = override;
  }
  return result;
}

export function enrichProjects(projects: readonly Project[], overrides: ProjectOverrides): Project[] {
  return projects.flatMap((project) => {
    const override = overrides[project.repositoryName];
    if (!override || override.hidden === true) return override?.hidden ? [] : [project];
    return [{ ...project, ...override, id: project.id, repositoryName: project.repositoryName, slug: project.slug }];
  });
}

export async function loadOverrides(fetcher: typeof fetch = fetch, url = `${import.meta.env.BASE_URL}data/project-overrides.json`): Promise<ProjectOverrides> {
  const response = await fetcher(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new AppError('invalid-overrides', `Overrides HTTP ${response.status}`, 'Configuration éditoriale indisponible.', true);
  return parseOverrides(await response.json());
}
