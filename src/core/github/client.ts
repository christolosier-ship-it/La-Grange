import { AppError } from '../errors/app-error';
import type { GitHubRepositoryDto, RepositoryFetchResult } from './types';

const ACCEPT = 'application/vnd.github+json';
const API_VERSION = '2022-11-28';

function nextPage(link: string | null): string | undefined {
  if (!link) return undefined;
  for (const part of link.split(',')) {
    const match = part.match(/^\s*<([^>]+)>;\s*rel="([^"]+)"/u);
    if (match?.[2] === 'next') return match[1];
  }
  return undefined;
}

function isRepository(value: unknown): value is GitHubRepositoryDto {
  if (!value || typeof value !== 'object') return false;
  const repo = value as Record<string, unknown>;
  return typeof repo.id === 'number' && typeof repo.name === 'string'
    && typeof repo.html_url === 'string' && typeof repo.fork === 'boolean'
    && typeof repo.archived === 'boolean' && typeof repo.default_branch === 'string'
    && Array.isArray(repo.topics) && repo.topics.every((topic) => typeof topic === 'string')
    && typeof repo.open_issues_count === 'number' && typeof repo.created_at === 'string'
    && typeof repo.updated_at === 'string';
}

function responseError(response: Response): AppError {
  if (response.status === 403 || response.status === 429) {
    const reset = response.headers.get('x-ratelimit-reset');
    const retryAt = reset ? new Date(Number(reset) * 1_000).toISOString() : undefined;
    return new AppError('rate-limit', `GitHub rate limit (${response.status})`, 'Limite GitHub atteinte. Réessayez plus tard.', true, retryAt);
  }
  if (response.status === 404) return new AppError('not-found', 'GitHub user not found', 'Compte GitHub introuvable.', false);
  return new AppError('network', `GitHub HTTP ${response.status}`, 'GitHub est momentanément indisponible.', response.status >= 500);
}

export class GitHubClient {
  constructor(private readonly fetcher: typeof fetch = fetch, private readonly apiRoot = 'https://api.github.com') {}

  async fetchAllRepositories(username: string, etag?: string, signal?: AbortSignal): Promise<RepositoryFetchResult> {
    let url: string | undefined = `${this.apiRoot}/users/${encodeURIComponent(username)}/repos?sort=updated&direction=desc&per_page=100&type=owner`;
    const repositories: GitHubRepositoryDto[] = [];
    const ids = new Set<number>();
    let responseEtag: string | undefined;
    let firstPage = true;

    while (url) {
      let response: Response;
      try {
        response = await this.fetcher(url, {
          headers: {
            Accept: ACCEPT,
            'X-GitHub-Api-Version': API_VERSION,
            ...(firstPage && etag ? { 'If-None-Match': etag } : {}),
          },
          signal,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') throw error;
        throw new AppError('network', error instanceof Error ? error.message : 'Network failure', 'Connexion à GitHub impossible.', true);
      }
      if (firstPage && response.status === 304) return { status: 'not-modified', etag: etag ?? response.headers.get('etag') ?? undefined };
      if (!response.ok) throw responseError(response);
      if (firstPage) responseEtag = response.headers.get('etag') ?? undefined;
      const data: unknown = await response.json().catch(() => undefined);
      if (!Array.isArray(data) || !data.every(isRepository)) {
        throw new AppError('invalid-response', 'Invalid GitHub repository response', 'Réponse GitHub invalide.', true);
      }
      for (const repository of data) {
        if (ids.has(repository.id)) continue;
        ids.add(repository.id);
        repositories.push(repository);
      }
      url = nextPage(response.headers.get('link'));
      firstPage = false;
    }
    return { status: 'success', repositories, etag: responseEtag };
  }
}
