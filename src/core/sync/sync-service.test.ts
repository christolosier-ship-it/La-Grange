import { describe, expect, it, vi } from 'vitest';
import type { SnapshotCache } from '../cache/indexed-db';
import type { GitHubClient } from '../github/client';
import type { SyncSnapshot } from '../projects/model';
import { SyncService } from './sync-service';

const repository = { id: 1, name: 'one', description: null, html_url: 'https://github.com/me/one', homepage: null, fork: false, archived: false, language: null, default_branch: 'main', topics: [], open_issues_count: 0, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z', pushed_at: null };
const cached: SyncSnapshot = { schemaVersion: 1, username: 'me', projects: [], syncedAt: '2025-01-01T00:00:00.000Z', etag: 'old' };

function setup(snapshot: SyncSnapshot | undefined, result: unknown, online = true) {
  const cache: SnapshotCache = { getSnapshot: vi.fn().mockResolvedValue(snapshot), saveSnapshot: vi.fn().mockResolvedValue(undefined) };
  const client = { fetchAllRepositories: vi.fn().mockResolvedValue(result) } as unknown as GitHubClient;
  const states = vi.fn();
  const service = new SyncService('me', client, cache, async () => ({}), states, () => new Date('2026-01-01T00:00:00Z'));
  return { cache, client, states, run: () => service.synchronize({ online }) };
}

describe('SyncService', () => {
  it('publishes cache first then atomically saves a complete network snapshot', async () => {
    const context = setup(cached, { status: 'success', repositories: [repository], etag: 'new' });
    const state = await context.run();
    expect(context.states.mock.calls.map((call) => call[0].status)).toEqual(['loading-cache', 'ready', 'syncing', 'ready']);
    expect(context.cache.saveSnapshot).toHaveBeenCalledOnce();
    expect(state.snapshot?.projects).toHaveLength(1);
  });

  it('retains the last valid snapshot after a network error and supports offline startup', async () => {
    const failed = setup(cached, undefined);
    vi.mocked(failed.client.fetchAllRepositories).mockRejectedValue(new Error('offline'));
    await expect(failed.run()).resolves.toMatchObject({ status: 'error', snapshot: cached });
    expect(failed.cache.saveSnapshot).not.toHaveBeenCalled();
    await expect(setup(cached, undefined, false).run()).resolves.toMatchObject({ status: 'offline', snapshot: cached });
  });

  it('coalesces concurrent global synchronizations', async () => {
    let resolve!: (value: unknown) => void;
    const pending = new Promise((done) => { resolve = done; });
    const context = setup(undefined, undefined);
    vi.mocked(context.client.fetchAllRepositories).mockReturnValue(pending as ReturnType<GitHubClient['fetchAllRepositories']>);
    const first = context.run(); const second = context.run();
    resolve({ status: 'success', repositories: [] });
    await Promise.all([first, second]);
    expect(context.client.fetchAllRepositories).toHaveBeenCalledOnce();
  });
});
