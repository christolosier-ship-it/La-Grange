import { isAbortError } from '../../utils/errors';
import { AppError } from '../errors/app-error';
import type {
  GitHubCommitDto,
  GitHubProjectDetailsDto,
  GitHubReadmeDto,
  GitHubReleaseDto,
} from './detail-types';

function isDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function isNullableDate(value: unknown): value is string | null {
  return value === null || isDate(value);
}

function isCommit(value: unknown): value is GitHubCommitDto {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  if (!item.commit || typeof item.commit !== 'object' || Array.isArray(item.commit)) return false;
  const commit = item.commit as Record<string, unknown>;

  const validIdentity = (identity: unknown): boolean => {
    if (identity === null) return true;
    if (!identity || typeof identity !== 'object' || Array.isArray(identity)) return false;
    const author = identity as Record<string, unknown>;
    return typeof author.name === 'string' && isDate(author.date);
  };

  return typeof item.sha === 'string'
    && typeof item.html_url === 'string'
    && typeof commit.message === 'string'
    && validIdentity(commit.author)
    && validIdentity(commit.committer);
}

function isRelease(value: unknown): value is GitHubReleaseDto {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return typeof item.html_url === 'string'
    && (item.name === null || typeof item.name === 'string')
    && typeof item.tag_name === 'string'
    && isNullableDate(item.published_at)
    && isDate(item.created_at);
}

function isReadme(value: unknown): value is GitHubReadmeDto {
  return Boolean(value)
    && typeof value === 'object'
    && !Array.isArray(value)
    && typeof (value as Record<string, unknown>).html_url === 'string';
}

function browserFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return globalThis.fetch(input, init);
}

function retryAt(response: Response): string | undefined {
  const reset = Number(response.headers.get('x-ratelimit-reset'));
  if (Number.isFinite(reset) && reset > 0) return new Date(reset * 1_000).toISOString();
  const delay = Number(response.headers.get('retry-after'));
  return Number.isFinite(delay) && delay >= 0
    ? new Date(Date.now() + delay * 1_000).toISOString()
    : undefined;
}

function responseError(response: Response): AppError {
  const status = String(response.status);
  const rateLimited = response.status === 429
    || (
      response.status === 403
      && (
        response.headers.get('x-ratelimit-remaining') === '0'
        || response.headers.has('retry-after')
      )
    );
  if (rateLimited) {
    return new AppError(
      'rate-limit',
      `GitHub detail rate limit (${status})`,
      'Limite GitHub atteinte pour les détails. Réessayez plus tard.',
      true,
      retryAt(response),
    );
  }
  return new AppError(
    response.status === 404 ? 'not-found' : 'network',
    `GitHub detail HTTP ${status}`,
    response.status === 404
      ? 'Détail GitHub introuvable.'
      : `GitHub a répondu avec le statut HTTP ${status}.`,
    response.status >= 500 || response.status === 403,
  );
}

export interface ProjectDetailsClient {
  fetchProjectDetails(
    username: string,
    repositoryName: string,
    signal?: AbortSignal,
  ): Promise<GitHubProjectDetailsDto>;
}

export class GitHubDetailClient implements ProjectDetailsClient {
  private readonly apiRoot: string;
  private readonly fetcher: typeof fetch;

  constructor(
    fetcher: typeof fetch | undefined = undefined,
    apiRoot = 'https://api.github.com',
  ) {
    const root = new URL(apiRoot);
    if (root.protocol !== 'https:') throw new Error('GitHub API root must use HTTPS.');
    this.apiRoot = root.href.replace(/\/$/u, '');
    this.fetcher = fetcher ?? browserFetch;
  }

  private async request(url: string, signal?: AbortSignal): Promise<Response> {
    try {
      return await this.fetcher(url, {
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        signal,
      });
    } catch (error) {
      if (isAbortError(error)) throw error;
      const detail = error instanceof Error ? error.message : 'Network failure';
      throw new AppError(
        'network',
        `GitHub detail fetch failed: ${detail}`,
        `Le navigateur n’a pas pu charger les détails GitHub (${detail}).`,
        true,
      );
    }
  }

  private async json(response: Response): Promise<unknown> {
    try {
      return await response.json();
    } catch (error) {
      if (isAbortError(error)) throw error;
      throw new AppError(
        'invalid-response',
        'Invalid GitHub detail JSON',
        'Les détails GitHub reçus sont illisibles.',
        true,
      );
    }
  }

  async fetchProjectDetails(
    username: string,
    repositoryName: string,
    signal?: AbortSignal,
  ): Promise<GitHubProjectDetailsDto> {
    const cleanUsername = username.trim();
    const cleanRepository = repositoryName.trim();
    if (!cleanUsername || !cleanRepository) {
      throw new AppError('not-found', 'Missing repository identity', 'Projet GitHub introuvable.', false);
    }

    const base = `${this.apiRoot}/repos/${encodeURIComponent(cleanUsername)}/${encodeURIComponent(cleanRepository)}`;

    const commitResponse = await this.request(`${base}/commits?per_page=3`, signal);
    let commits: readonly GitHubCommitDto[] = [];
    if (commitResponse.status !== 409) {
      if (!commitResponse.ok) throw responseError(commitResponse);
      const commitData = await this.json(commitResponse);
      if (!Array.isArray(commitData) || !commitData.every(isCommit)) {
        throw new AppError(
          'invalid-response',
          'Invalid GitHub commits response',
          'Les commits GitHub reçus ne correspondent pas au format attendu.',
          true,
        );
      }
      commits = commitData;
    }

    const releaseResponse = await this.request(`${base}/releases/latest`, signal);
    let release: GitHubReleaseDto | null = null;
    if (releaseResponse.status !== 404) {
      if (!releaseResponse.ok) throw responseError(releaseResponse);
      const releaseData = await this.json(releaseResponse);
      if (!isRelease(releaseData)) {
        throw new AppError(
          'invalid-response',
          'Invalid GitHub release response',
          'La release GitHub reçue ne correspond pas au format attendu.',
          true,
        );
      }
      release = releaseData;
    }

    const readmeResponse = await this.request(`${base}/readme`, signal);
    let readme: GitHubReadmeDto | null = null;
    if (readmeResponse.status !== 404) {
      if (!readmeResponse.ok) throw responseError(readmeResponse);
      const readmeData = await this.json(readmeResponse);
      if (!isReadme(readmeData)) {
        throw new AppError(
          'invalid-response',
          'Invalid GitHub README response',
          'Le README GitHub reçu ne correspond pas au format attendu.',
          true,
        );
      }
      readme = readmeData;
    }

    return { commits, release, readme };
  }
}
