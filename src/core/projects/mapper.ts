import { AppError } from '../errors/app-error';
import type { GitHubRepositoryDto } from '../github/types';
import { activityState } from './activity';
import type { Project } from './model';

function safeHttps(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function validDate(value: string): boolean {
  return Number.isFinite(Date.parse(value));
}

export function mapRepository(repository: GitHubRepositoryDto, now = new Date()): Project {
  const githubUrl = safeHttps(repository.html_url);
  const repositoryName = repository.name.trim();

  if (
    !Number.isInteger(repository.id)
    || repository.id <= 0
    || !repositoryName
    || !githubUrl
    || !repository.default_branch.trim()
    || !validDate(repository.created_at)
    || !validDate(repository.updated_at)
    || (repository.pushed_at !== null && !validDate(repository.pushed_at))
    || !Number.isInteger(repository.open_issues_count)
    || repository.open_issues_count < 0
  ) {
    throw new AppError('invalid-response', 'Invalid repository identity', 'Données de dépôt invalides.', true);
  }

  const base = githubUrl.replace(/\/$/u, '');
  const pushedAt = repository.pushed_at ?? undefined;
  const topics = [...new Set(
    repository.topics
      .map((topic) => topic.trim().toLowerCase())
      .filter((topic) => topic.length > 0),
  )];

  return {
    id: repository.id,
    nodeId: repository.node_id,
    repositoryName,
    slug: repositoryName,
    displayName: repositoryName,
    description: repository.description ?? '',
    githubUrl: base,
    appUrl: safeHttps(repository.homepage),
    readmeUrl: `${base}#readme`,
    releasesUrl: `${base}/releases`,
    issuesUrl: `${base}/issues`,
    language: repository.language ?? undefined,
    defaultBranch: repository.default_branch,
    topics,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    pushedAt,
    openIssuesCount: repository.open_issues_count,
    archived: repository.archived,
    fork: repository.fork,
    category: 'uncategorized',
    activityState: activityState(pushedAt, repository.archived, now),
    featured: false,
    isNew: false,
  };
}
