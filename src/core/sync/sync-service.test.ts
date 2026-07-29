import { describe, expect, it, vi } from 'vitest';
import type { SnapshotCache } from '../cache/indexed-db';
import type { GitHubRepositoryDto, RepositoryFetchResult } from '../github/types';
import type { SyncSnapshot } from '../projects/model';
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

const cached: SyncSnapshot = {
  schemaVersion: 1,
  username: 'me',
  projects: [],
  syncedAt: '2025-01-01T00:00:00.000Z',
  etag: 'old',
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

  it('refreshes snapshot freshness after a 304 response', async () => {
    const context = setup(cached, { status: 'not-modified', etag: 'new' });
    const state = await context.run();

    expect(state).toMatchObject({
      status: 'ready',
      snapshot: { syncedAt: '2026-01-01T00:00:00.000Z', etag: 'new' },
    });
    expect(context.saveSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({ syncedAt: '2026-01-01T00:00:00.000Z' }),
      [],
      [],
    );
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
