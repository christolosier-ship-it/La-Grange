import { AppError } from '../errors/app-error';
import type { GitHubRepositoryDto } from '../github/types';
import { activityState } from './activity';
import type { Project } from './model';

function safeHttps(value: string | null): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : undefined; } catch { return undefined; }
}

export function mapRepository(repository: GitHubRepositoryDto, now = new Date()): Project {
  if (!Number.isInteger(repository.id) || !repository.name || !safeHttps(repository.html_url)) {
    throw new AppError('invalid-response', 'Invalid repository identity', 'Données de dépôt invalides.', true);
  }
  const base = repository.html_url.replace(/\/$/u, '');
  const pushedAt = repository.pushed_at ?? undefined;
  return {
    id: repository.id, nodeId: repository.node_id, repositoryName: repository.name,
    slug: repository.name, displayName: repository.name, description: repository.description ?? '',
    githubUrl: base, appUrl: safeHttps(repository.homepage), readmeUrl: `${base}#readme`,
    releasesUrl: `${base}/releases`, issuesUrl: `${base}/issues`, language: repository.language ?? undefined,
    defaultBranch: repository.default_branch, topics: [...new Set(repository.topics.map((topic) => topic.trim().toLocaleLowerCase()).filter(Boolean))],
    createdAt: repository.created_at, updatedAt: repository.updated_at, pushedAt,
    openIssuesCount: repository.open_issues_count, archived: repository.archived, fork: repository.fork,
    category: 'other', activityState: activityState(pushedAt, repository.archived, now), featured: false, isNew: false,
  };
}
