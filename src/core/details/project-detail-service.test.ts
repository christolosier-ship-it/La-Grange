import { describe, expect, it, vi } from 'vitest';
import type { ProjectDetailsClient } from '../github/detail-client';
import type { Project } from '../projects/model';
import type { ProjectDetailsCache } from './project-detail-service';
import { ProjectDetailService } from './project-detail-service';

const project: Project = {
  id: 42,
  repositoryName: 'repo',
  slug: 'repo',
  displayName: 'Repo',
  description: '',
  githubUrl: 'https://github.com/example/repo',
  readmeUrl: 'https://github.com/example/repo#readme',
  releasesUrl: 'https://github.com/example/repo/releases',
  issuesUrl: 'https://github.com/example/repo/issues',
  defaultBranch: 'main',
  topics: [],
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-07-01T00:00:00Z',
  openIssuesCount: 0,
  archived: false,
  fork: false,
  category: 'uncategorized',
  activityState: 'active',
  featured: false,
  isNew: false,
};

const cachedDetails = {
  schemaVersion: 1 as const,
  projectId: 42,
  repositoryName: 'repo',
  fetchedAt: '2026-07-29T11:30:00.000Z',
  commits: [],
  readmeAvailable: false,
};

function setup() {
  const getProjectDetails = vi.fn<ProjectDetailsCache['getProjectDetails']>();
  const saveProjectDetails = vi.fn<ProjectDetailsCache['saveProjectDetails']>().mockResolvedValue(undefined);
  const fetchProjectDetails = vi.fn<ProjectDetailsClient['fetchProjectDetails']>().mockResolvedValue({
    commits: [],
    release: null,
    readme: null,
  });
  const publish = vi.fn();
  const service = new ProjectDetailService(
    'example',
    { fetchProjectDetails },
    { getProjectDetails, saveProjectDetails },
    publish,
    () => new Date('2026-07-29T12:00:00Z'),
  );
  return { service, getProjectDetails, saveProjectDetails, fetchProjectDetails, publish };
}

describe('ProjectDetailService', () => {
  it('loads a matching cached detail without calling GitHub', async () => {
    const context = setup();
    context.getProjectDetails.mockResolvedValue(cachedDetails);

    await expect(context.service.loadCached(project)).resolves.toMatchObject({
      status: 'ready',
      details: cachedDetails,
    });
    expect(context.fetchProjectDetails).not.toHaveBeenCalled();
  });

  it('keeps a fresh cache without a network request', async () => {
    const context = setup();
    context.getProjectDetails.mockResolvedValue(cachedDetails);
    await context.service.loadCached(project);

    await expect(context.service.refresh(project)).resolves.toMatchObject({ status: 'ready' });
    expect(context.fetchProjectDetails).not.toHaveBeenCalled();
  });

  it('loads details on demand, persists them and coalesces concurrent requests', async () => {
    const context = setup();
    let resolveRequest: ((value: Awaited<ReturnType<ProjectDetailsClient['fetchProjectDetails']>>) => void) | undefined;
    context.fetchProjectDetails.mockReturnValue(new Promise((resolve) => {
      resolveRequest = resolve;
    }));

    const first = context.service.refresh(project, { online: true, force: true });
    const second = context.service.refresh(project, { online: true, force: true });
    resolveRequest?.({ commits: [], release: null, readme: null });

    const [result] = await Promise.all([first, second]);
    expect(context.fetchProjectDetails).toHaveBeenCalledOnce();
    expect(context.saveProjectDetails).toHaveBeenCalledOnce();
    expect(result.status).toBe('ready');
  });

  it('aborts an in-flight request when its project route is left', async () => {
    const context = setup();
    let capturedSignal: AbortSignal | undefined;
    context.fetchProjectDetails.mockImplementation((_username, _repositoryName, signal) => {
      capturedSignal = signal;
      return new Promise((_resolve, reject) => {
        signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
      });
    });

    const pending = context.service.refresh(project, { online: true, force: true });
    context.service.cancel(project.id);

    await expect(pending).resolves.toMatchObject({ status: 'idle' });
    expect(capturedSignal?.aborted).toBe(true);
    expect(context.saveProjectDetails).not.toHaveBeenCalled();
  });

  it('preserves cached details after a network error and works offline', async () => {
    const context = setup();
    context.getProjectDetails.mockResolvedValue(cachedDetails);
    await context.service.loadCached(project);
    context.fetchProjectDetails.mockRejectedValue(new Error('network down'));

    await expect(context.service.refresh(project, { online: true, force: true })).resolves.toMatchObject({
      status: 'error',
      details: cachedDetails,
      error: { message: 'network down' },
    });
    await expect(context.service.refresh(project, { online: false, force: true })).resolves.toMatchObject({
      status: 'offline',
      details: cachedDetails,
    });
  });

  it('keeps fresh network details visible when cache persistence fails', async () => {
    const context = setup();
    context.saveProjectDetails.mockRejectedValue(new Error('quota'));

    await expect(context.service.refresh(project, { online: true, force: true })).resolves.toMatchObject({
      status: 'ready',
      warning: { message: 'quota' },
      details: { projectId: 42 },
    });
  });
});
