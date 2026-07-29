// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { mapRepository } from '../projects/mapper';
import { GitHubClient } from './client';

const liveDescribe = process.env.LIVE_GITHUB_SMOKE === '1' ? describe : describe.skip;

liveDescribe('GitHub public API live smoke test', () => {
  it('downloads and maps the real public repositories used by La Grange', async () => {
    const result = await new GitHubClient().fetchAllRepositories('christolosier-ship-it');

    expect(result.status).toBe('success');
    if (result.status !== 'success') return;

    expect(result.repositories.length).toBeGreaterThan(10);
    expect(result.repositories.some(({ name }) => name === 'La-Grange')).toBe(true);

    const projects = result.repositories.map((repository) => mapRepository(repository));
    expect(projects).toHaveLength(result.repositories.length);
    expect(projects.every(({ id, repositoryName, githubUrl }) => (
      Number.isInteger(id) && repositoryName.length > 0 && githubUrl.startsWith('https://github.com/')
    ))).toBe(true);
  }, 30_000);
});
