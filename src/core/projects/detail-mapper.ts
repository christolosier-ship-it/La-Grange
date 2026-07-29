import { AppError } from '../errors/app-error';
import type { GitHubProjectDetailsDto } from '../github/detail-types';
import type { ProjectDetails } from './details';

function safeHttps(value: string): string | undefined {
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

function firstLine(value: string): string {
  return value.split(/\r?\n/u, 1)[0]?.trim() || 'Commit sans message';
}

export function mapProjectDetails(
  projectId: number,
  repositoryName: string,
  value: GitHubProjectDetailsDto,
  now = new Date(),
): ProjectDetails {
  if (!Number.isInteger(projectId) || projectId <= 0 || !repositoryName.trim()) {
    throw new AppError('invalid-response', 'Invalid project detail identity', 'Détails du projet invalides.', true);
  }

  const commits = value.commits.map((commit) => {
    const identity = commit.commit.author ?? commit.commit.committer;
    const url = safeHttps(commit.html_url);
    if (!commit.sha.trim() || !identity || !validDate(identity.date) || !url) {
      throw new AppError('invalid-response', 'Invalid commit detail', 'Détail de commit GitHub invalide.', true);
    }
    return {
      sha: commit.sha,
      message: firstLine(commit.commit.message),
      authorName: identity.name.trim() || 'Auteur GitHub non indiqué',
      committedAt: identity.date,
      url,
    };
  });

  const release = value.release
    ? (() => {
        const url = safeHttps(value.release.html_url);
        const date = value.release.published_at ?? value.release.created_at;
        if (!url || !value.release.tag_name.trim() || !validDate(date)) {
          throw new AppError('invalid-response', 'Invalid release detail', 'Détail de release GitHub invalide.', true);
        }
        return {
          name: value.release.name?.trim() || value.release.tag_name,
          tagName: value.release.tag_name,
          publishedAt: date,
          url,
        };
      })()
    : undefined;

  const readmeUrl = value.readme ? safeHttps(value.readme.html_url) : undefined;
  if (value.readme && !readmeUrl) {
    throw new AppError('invalid-response', 'Invalid README detail URL', 'Lien README GitHub invalide.', true);
  }

  return {
    schemaVersion: 1,
    projectId,
    repositoryName,
    fetchedAt: now.toISOString(),
    commits,
    release,
    readmeAvailable: Boolean(value.readme),
    readmeUrl,
  };
}
