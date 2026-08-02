import type { Project } from '../projects/model';

interface GitHubReleaseDto {
  readonly tag_name: string;
  readonly draft: boolean;
  readonly prerelease: boolean;
  readonly published_at: string | null;
}

const cache = new Map<string, string | undefined>();
const pending = new Map<string, Promise<string | undefined>>();

function validRelease(value: unknown): value is GitHubReleaseDto {
  if (!value || typeof value !== 'object') return false;
  const release = value as Record<string, unknown>;
  return typeof release.tag_name === 'string'
    && typeof release.draft === 'boolean'
    && typeof release.prerelease === 'boolean'
    && (release.published_at === null || typeof release.published_at === 'string');
}

function newest(releases: readonly GitHubReleaseDto[]): GitHubReleaseDto | undefined {
  return [...releases].sort((left, right) => (
    Date.parse(right.published_at ?? '') - Date.parse(left.published_at ?? '')
  ))[0];
}

function apiUrl(githubUrl: string): string | undefined {
  try {
    const url = new URL(githubUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    if (url.hostname !== 'github.com' || parts.length !== 2) return undefined;
    const [owner, repository] = parts;
    if (!owner || !repository) return undefined;
    return `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/releases?per_page=20`;
  } catch {
    return undefined;
  }
}

async function fetchVersion(githubUrl: string): Promise<string | undefined> {
  const url = apiUrl(githubUrl);
  if (!url) return undefined;
  try {
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      headers: { Accept: 'application/vnd.github+json' },
      referrerPolicy: 'no-referrer',
    });
    if (!response.ok) return undefined;
    const value = await response.json() as unknown;
    if (!Array.isArray(value) || !value.every(validRelease)) return undefined;
    const published = value.filter((release) => !release.draft && release.tag_name.trim());
    const stable = newest(published.filter((release) => !release.prerelease));
    const prerelease = newest(published.filter((release) => release.prerelease));
    return (stable ?? prerelease)?.tag_name.trim() || undefined;
  } catch {
    return undefined;
  }
}

export function resolveRepositoryVersion(
  repositoryName: string,
  githubUrl: string,
): Promise<string | undefined> {
  const key = repositoryName.toLowerCase();
  if (cache.has(key)) return Promise.resolve(cache.get(key));
  const active = pending.get(key);
  if (active) return active;
  const request = fetchVersion(githubUrl).then((version) => {
    cache.set(key, version);
    pending.delete(key);
    return version;
  });
  pending.set(key, request);
  return request;
}

export function resolveProjectVersion(project: Project): Promise<string | undefined> {
  if (project.manualVersion?.trim()) return Promise.resolve(project.manualVersion.trim());
  if (project.resolvedVersion?.trim()) return Promise.resolve(project.resolvedVersion.trim());
  return resolveRepositoryVersion(project.repositoryName, project.githubUrl);
}
