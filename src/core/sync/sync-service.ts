import type { SnapshotCache } from '../cache/indexed-db';
import type { GitHubClient } from '../github/client';
import { compareProjects } from '../projects/comparator';
import { mapRepository } from '../projects/mapper';
import type { ProjectOverrides } from '../projects/overrides';
import { enrichProjects } from '../projects/overrides';
import type { SyncSnapshot } from '../projects/model';

export type SyncStatus = 'idle' | 'loading-cache' | 'syncing' | 'ready' | 'offline' | 'error';
export interface SyncState { readonly status: SyncStatus; readonly snapshot?: SyncSnapshot; readonly error?: Error; readonly checkedAt?: string }
export type SyncListener = (state: SyncState) => void;
export interface SyncOptions { readonly force?: boolean; readonly online?: boolean }

const SCHEMA_VERSION = 1;
export const DEFAULT_FRESHNESS_MS = 15 * 60 * 1_000;

export class SyncService {
  private active?: Promise<SyncState>;
  private controller?: AbortController;
  constructor(
    private readonly username: string,
    private readonly client: GitHubClient,
    private readonly cache: SnapshotCache,
    private readonly overridesLoader: () => Promise<ProjectOverrides>,
    private readonly publish: SyncListener,
    private readonly now: () => Date = () => new Date(),
    private readonly freshnessMs = DEFAULT_FRESHNESS_MS,
  ) {}

  synchronize(options: SyncOptions = {}): Promise<SyncState> {
    this.active ??= this.run(options).finally(() => { this.active = undefined; this.controller = undefined; });
    return this.active;
  }

  cancel(): void { this.controller?.abort(); }

  private emit(state: SyncState): SyncState { this.publish(state); return state; }

  private async run(options: SyncOptions): Promise<SyncState> {
    this.emit({ status: 'loading-cache' });
    let cached: SyncSnapshot | undefined;
    try { cached = await this.cache.getSnapshot(this.username); } catch (error) {
      this.emit({ status: 'error', error: error instanceof Error ? error : new Error('Cache failure') });
    }
    if (cached) this.emit({ status: 'ready', snapshot: cached });
    if (options.online === false) return this.emit({ status: 'offline', snapshot: cached });
    const fresh = cached && this.now().getTime() - Date.parse(cached.syncedAt) < this.freshnessMs;
    if (fresh && !options.force) return { status: 'ready', snapshot: cached };

    this.controller = new AbortController();
    this.emit({ status: 'syncing', snapshot: cached });
    try {
      let overrides: ProjectOverrides = {};
      try { overrides = await this.overridesLoader(); } catch { /* invalid presentation must not block GitHub data */ }
      const result = await this.client.fetchAllRepositories(this.username, cached?.etag, this.controller.signal);
      const checkedAt = this.now().toISOString();
      if (result.status === 'not-modified') return this.emit({ status: 'ready', snapshot: cached, checkedAt });
      const mapped = result.repositories.map((repository) => mapRepository(repository, this.now()));
      const comparison = compareProjects(cached?.projects, enrichProjects(mapped, overrides), this.username, checkedAt);
      const snapshot: SyncSnapshot = { schemaVersion: SCHEMA_VERSION, username: this.username, projects: comparison.projects, syncedAt: checkedAt, etag: result.etag };
      await this.cache.saveSnapshot(snapshot, comparison.events, comparison.removedIds);
      return this.emit({ status: 'ready', snapshot, checkedAt });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return this.emit({ status: cached ? 'ready' : 'idle', snapshot: cached });
      return this.emit({ status: 'error', snapshot: cached, error: error instanceof Error ? error : new Error('Synchronization failed') });
    }
  }
}
