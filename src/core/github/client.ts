import { AppError } from '../errors/app-error';
import type { GitHubRepositoryDto, RepositoryFetchResult } from './types';

const ACCEPT = 'application/vnd.github+json';
const API_VERSION = '2022-11-28';
const MAX_PAGES = 100;

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isValidDateString(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function isRepository(value: unknown): value is GitHubRepositoryDto {
  if (!value || typeof value !== 'object') return false;
  const repo = value as Record<string, unknown>;

  return Number.isInteger(repo.id)
    && typeof repo.name === 'string'
    && (repo.node_id === undefined || typeof repo.node_id === 'string')
    && isNullableString(repo.description)
    && typeof repo.html_url === 'string'
    && isNullableString(repo.homepage)
    && typeof repo.fork === 'boolean'
    && typeof repo.archived === 'boolean'
    && isNullableString(repo.language)
    && typeof repo.default_branch === 'string'
    && Array.isArray(repo.topics)
    && repo.topics.every((topic) => typeof topic === 'string')
    && Number.isInteger(repo.open_issues_count)
    && isValidDateString(repo.created_at)
    && isValidDateString(repo.updated_at)
    && (repo.pushed_at === null || isValidDateString(repo.pushed_at));
}

function parseNextPage(link: string | null, allowedOrigin: string): string | undefined {
  if (!link) return undefined;

  for (const part of link.split(',')) {
    const match = part.match(/^\s*<([^>]+)>;\s*rel="([^"]+)"/u);
    if (match?.[2] !== 'next' || !match[1]) continue;

    try {
      const url = new URL(match[1]);
      if (url.protocol === 'https:' && url.origin === allowedOrigin) return url.href;
    } catch {
      return undefined;
    }
  }

  return undefined;
}

function retryAt(response: Response): string | undefined {
  const reset = response.headers.get('x-ratelimit-reset');
  const resetSeconds = reset ? Number(reset) : Number.NaN;
  if (Number.isFinite(resetSeconds) && resetSeconds > 0) {
    return new Date(resetSeconds * 1_000).toISOString();
  }

  const retryAfter = response.headers.get('retry-after');
  const delaySeconds = retryAfter ? Number(retryAfter) : Number.NaN;
  return Number.isFinite(delaySeconds) && delaySeconds >= 0
    ? new Date(Date.now() + delaySeconds * 1_000).toISOString()
    : undefined;
}

function responseError(response: Response): AppError {
  const status = String(response.status);
  const rateLimited = response.status === 429
    || (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0');

  if (rateLimited) {
    return new AppError(
      'rate-limit',
      `GitHub rate limit (${status})`,
      'Limite GitHub atteinte. Réessayez plus tard.',
      true,
      retryAt(response),
    );
  }

  if (response.status === 404) {
    return new AppError('not-found', 'GitHub user not found', 'Compte GitHub introuvable.', false);
  }

  return new AppError(
    'network',
    `GitHub HTTP ${status}`,
    'GitHub est momentanément indisponible.',
    response.status >= 500 || response.status === 403,
  );
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

export class GitHubClient {
  private readonly apiRoot: string;
  private readonly apiOrigin: string;

  constructor(
    private readonly fetcher: typeof fetch = fetch,
    apiRoot = 'https://api.github.com',
  ) {
    const root = new URL(apiRoot);
    if (root.protocol !== 'https:') throw new Error('GitHub API root must use HTTPS.');
    this.apiRoot = root.href.replace(/\/$/u, '');
    this.apiOrigin = root.origin;
  }

  async fetchAllRepositories(
    username: string,
    etag?: string,
    signal?: AbortSignal,
  ): Promise<RepositoryFetchResult> {
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      throw new AppError('not-found', 'Empty GitHub username', 'Compte GitHub introuvable.', false);
    }

    let url: string | undefined = `${this.apiRoot}/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&direction=desc&per_page=100&type=owner`;
    const repositories: GitHubRepositoryDto[] = [];
    const ids = new Set<number>();
    const visitedPages = new Set<string>();
    let responseEtag: string | undefined;
    let firstPage = true;
    let pageCount = 0;

    while (url) {
      pageCount += 1;
      if (pageCount > MAX_PAGES || visitedPages.has(url)) {
        throw new AppError('invalid-response', 'Invalid GitHub pagination loop', 'Pagination GitHub invalide.', true);
      }
      visitedPages.add(url);

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
        if (isAbortError(error)) throw error;
        throw new AppError(
          'network',
          error instanceof Error ? error.message : 'Network failure',
          'Connexion à GitHub impossible.',
          true,
        );
      }

      if (firstPage && response.status === 304) {
        return { status: 'not-modified', etag: response.headers.get('etag') ?? etag };
      }
      if (!response.ok) throw responseError(response);
      if (firstPage) responseEtag = response.headers.get('etag') ?? undefined;

      let data: unknown;
      try {
        data = await response.json();
      } catch {
        data = undefined;
      }

      if (!Array.isArray(data) || !data.every(isRepository)) {
        throw new AppError(
          'invalid-response',
          'Invalid GitHub repository response',
          'Réponse GitHub invalide.',
          true,
        );
      }

      for (const repository of data) {
        if (ids.has(repository.id)) continue;
        ids.add(repository.id);
        repositories.push(repository);
      }

      url = parseNextPage(response.headers.get('link'), this.apiOrigin);
      firstPage = false;
    }

    return { status: 'success', repositories, etag: responseEtag };
  }
}
