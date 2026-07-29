import { describe, expect, it } from 'vitest';
import { AppError } from '../errors/app-error';
import type { GitHubProjectDetailsDto } from '../github/detail-types';
import { mapProjectDetails } from './detail-mapper';

const details: GitHubProjectDetailsDto = {
  commits: [{
    sha: 'abc123',
    html_url: 'https://github.com/example/repo/commit/abc123',
    commit: {
      message: 'Première ligne\n\nCorps du commit',
      author: { name: 'Christo', date: '2026-07-29T10:00:00Z' },
      committer: null,
    },
  }],
  release: {
    html_url: 'https://github.com/example/repo/releases/tag/v1',
    name: null,
    tag_name: 'v1',
    published_at: null,
    created_at: '2026-07-28T10:00:00Z',
  },
  readme: { html_url: 'https://github.com/example/repo/blob/main/README.md' },
};

describe('mapProjectDetails', () => {
  it('maps concise commits, release fallbacks and README metadata', () => {
    const result = mapProjectDetails(42, 'repo', details, new Date('2026-07-29T12:00:00Z'));

    expect(result).toMatchObject({
      projectId: 42,
      repositoryName: 'repo',
      fetchedAt: '2026-07-29T12:00:00.000Z',
      commits: [{ message: 'Première ligne', authorName: 'Christo' }],
      release: { name: 'v1', tagName: 'v1' },
      readmeAvailable: true,
    });
  });

  it('rejects dangerous external protocols', () => {
    const hostile: GitHubProjectDetailsDto = {
      ...details,
      readme: { html_url: 'javascript:alert(1)' },
    };

    expect(() => mapProjectDetails(42, 'repo', hostile)).toThrow(AppError);
  });
});
