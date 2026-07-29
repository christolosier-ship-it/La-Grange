import { describe, expect, it, vi } from 'vitest';
import type { SnapshotCache } from '../cache/indexed-db';
import type { GitHubRepositoryDto, RepositoryFetchResult } from '../github/types';
import type { Project, SyncSnapshot } from '../projects/model';
import { overridesSignature } from '../projects/override-signature';
import type { ProjectOverrides } from '../projects/overrides';
import type { RepositoryClient } from './sync-service';
import { SyncService } from './sync-service';

const repository: GitHubRepositoryDto = {
  id: 1,
  name: 'one',
  description: null,
  html_url: 'https://github.com/me/one',
  homepage: null,
  fork: false,
  archived: false,
  language: null,
  default_branch: 'main',
  topics: [],
  open_issues_count: 0,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
  pushed_at: null,
};

const cachedProject: Project = {
  id: 1,
  repositoryName: 'one',
  slug: 'one',
  displayName: 'One',
  description: '',
  githubUrl: 'https://github.com/me/one',
  readmeUrl: 'https://github.com/me/one#readme',
  releasesUrl: 'https://github.com/me/one/releases',
  issuesUrl: 'https://github.com/me/one/issues',
  defaultBranch: 'main',
  topics: [],
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
  openIssuesCount: 0,
  archived: false,
  fork: false,
  category: 'uncategorized',
  activityState: 'sleeping',
  featured: false,
  isNew: false,
};

const emptyOverridesSignature = overridesSignature({});
const cached: SyncSnapshot = {
  schemaVersion: 1,
  username: 'me',
  projects: [],
  syncedAt: '2025-01-01T00:00:00.000Z',
  etag: 'old',
  overridesSignature: emptyOverridesSignature,
};

interface TestContext {
  readonly getSnapshot: ReturnType<typeof vi.fn<SnapshotCache['getSnapshot']>>;
  readonly saveSnapshot: ReturnType<typeof vi.fn<SnapshotCache['saveSnapshot']>>;
  readonly fetchAllRepositories: ReturnType<typeof vi.fn<RepositoryClient['fetchAllRepositories']>>;
  readonly states: ReturnType<typeof vi.fn>;
  readonly run: (online?: boolean) => Promise<ReturnType<SyncService['synchronize']> extends Promise<infer State> ? State : never>;
  readonly service: SyncService;
}

function setup(
  snapshot: SyncSnapshot | undefined,
  result: RepositoryFetchResult,
  overridesLoader: () => Promise<ProjectOverrides> = () => Promise.resolve({}),
): TestContext {
  const getSnapshot = vi.fn<SnapshotCache['getSnapshot']>().mockResolvedValue(snapshot);
  const saveSnapshot = vi.fn<SnapshotCache['saveSnapshot']>().mockResolvedValue(undefined);
  const cache: SnapshotCache = { getSnapshot, saveSnapshot };

  const fetchAllRepositories = vi
    .fn<RepositoryClient['fetchAllRepositories']>()
    .mockResolvedValue(result);
  const client: RepositoryClient = { fetchAllRepositories };
  const states = vi.fn();
  const service = new SyncService(
    'me',
    client,
    cache,
    overridesLoader,
    states,
    () => new Date('2026-01-01T00:00:00Z'),
  );

  return {
    getSnapshot,
    saveSnapshot,
    fetchAllRepositories,
    states,
    service,
    run: (online = true) => service.synchronize({ online }),
  };
}

describe('SyncService', () => {
  it('publishes cache first then atomically saves a complete network snapshot', async () => {
    const context = setup(cached, {
      status: 'success',
      repositories: [repository],
      etag: 'new',
    });

    const state = await context.run();
    expect(context.states.mock.calls.map((call: unknown[]) => (
      (call[0] as { status: string }).status
    ))).toEqual(['loading-cache', 'ready', 'syncing', 'ready']);
    expect(context.saveSnapshot).toHaveBeenCalledOnce();
    expect(context.fetchAllRepositories).toHaveBeenCalledWith('me', 'old', expect.any(AbortSignal));
    expect(state.snapshot?.projects).toHaveLength(1);
  });

  it('retains the last snapshot after a network error and supports offline startup', async () => {
    const context = setup(cached, { status: 'success', repositories: [] });
    context.fetchAllRepositories.mockRejectedValue(new Error('offline'));

    await expect(context.run()).resolves.toMatchObject({ status: 'error', snapshot: cached });
    expect(context.saveSnapshot).not.toHaveBeenCalled();

    const offline = setup(cached, { status: 'success', repositories: [] });
    await expect(offline.run(false)).resolves.toMatchObject({ status: 'offline', snapshot: cached });
    expect(offline.fetchAllRepositories).not.toHaveBeenCalled();
  });

  it('keeps the in-memory snapshot visible when a forced refresh cannot read the cache', async () => {
    const context = setup(undefined, { status: 'success', repositories: [repository] });
    await context.service.synchronize({ online: true, force: true });

    context.states.mockClear();
    context.getSnapshot.mockRejectedValue(new Error('cache unavailable'));
    context.fetchAllRepositories.mockRejectedValue(new Error('network unavailable'));

    const state = await context.service.synchronize({ online: true, force: true });
    const loadingState = context.states.mock.calls[0]?.[0] as { snapshot?: SyncSnapshot };

    expect(loadingState.snapshot?.projects).toHaveLength(1);
    expect(state).toMatchObject({ status: 'error' });
    expect(state.snapshot?.projects).toHaveLength(1);
  });

  it('persists the acknowledgement of a newly opened project', async () => {
    const newSnapshot: SyncSnapshot = {
      ...cached,
      projects: [{ ...cachedProject, isNew: true }],
    };
    const context = setup(newSnapshot, { status: 'success', repositories: [] });
    await context.run(false);
    context.saveSnapshot.mockClear();

    const state = await context.service.acknowledgeProject('one');

    expect(state.snapshot?.projects[0]?.isNew).toBe(false);
    expect(context.saveSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({ projects: [expect.objectContaining({ id: 1, isNew: false })] }),
      [],
      [],
    );
  });

  it('refreshes snapshot freshness after a compatible 304 response', async () => {
    const context = setup(cached, { status: 'not-modified', etag: 'new' });
    const state = await context.run();

    expect(state).toMatchObject({
      status: 'ready',
      snapshot: {
        syncedAt: '2026-01-01T00:00:00.000Z',
        etag: 'new',
        overridesSignature: emptyOverridesSignature,
      },
    });
    expect(context.saveSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({ syncedAt: '2026-01-01T00:00:00.000Z' }),
      [],
      [],
    );
  });

  it('forces a complete GitHub response when overrides changed', async () => {
    const changedOverrides: ProjectOverrides = {
      one: { displayName: 'One Workshop' },
    };
    const context = setup(
      cached,
      { status: 'success', repositories: [repository], etag: 'new' },
      () => Promise.resolve(changedOverrides),
    );

    const state = await context.run();
    expect(context.fetchAllRepositories).toHaveBeenCalledWith(
      'me',
      undefined,
      expect.any(AbortSignal),
    );
    expect(state.snapshot).toMatchObject({
      overridesSignature: overridesSignature(changedOverrides),
      projects: [{ displayName: 'One Workshop' }],
    });
  });

  it('continues with GitHub data when overrides are invalid', async () => {
    const context = setup(
      undefined,
      { status: 'success', repositories: [repository] },
      () => Promise.reject(new Error('bad overrides')),
    );

    const state = await context.run();
    expect(state.status).toBe('ready');
    expect(state.snapshot?.projects).toHaveLength(1);
    expect(state.warning?.message).toBe('bad overrides');
  });

  it('keeps fresh network data visible when persistence fails', async () => {
    const context = setup(undefined, { status: 'success', repositories: [repository] });
    context.saveSnapshot.mockRejectedValue(new Error('quota exceeded'));

    const state = await context.run();
    expect(state).toMatchObject({ status: 'error', error: { message: 'quota exceeded' } });
    expect(state.snapshot?.projects).toHaveLength(1);
  });

  it('coalesces concurrent global synchronizations', async () => {
    let resolveResult: ((value: RepositoryFetchResult) => void) | undefined;
    const pending = new Promise<RepositoryFetchResult>((resolve) => {
      resolveResult = resolve;
    });
    const context = setup(undefined, { status: 'success', repositories: [] });
    context.fetchAllRepositories.mockReturnValue(pending);

    const first = context.run();
    const second = context.run();
    resolveResult?.({ status: 'success', repositories: [] });

    await Promise.all([first, second]);
    expect(context.fetchAllRepositories).toHaveBeenCalledOnce();
  });
});
