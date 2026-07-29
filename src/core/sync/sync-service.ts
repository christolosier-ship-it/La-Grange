import { AppError } from '../errors/app-error';
import type { RepositoryFetchResult } from '../github/types';
import type { SnapshotCache } from '../cache/indexed-db';
import { compareProjects } from '../projects/comparator';
import { mapRepository } from '../projects/mapper';
import { overridesSignature } from '../projects/override-signature';
import type { ProjectOverrides } from '../projects/overrides';
import { enrichProjects } from '../projects/overrides';
import type { SyncSnapshot } from '../projects/model';

export type SyncStatus = 'idle' | 'loading-cache' | 'syncing' | 'ready' | 'offline' | 'error';

export interface SyncState {
  readonly status: SyncStatus;
  readonly snapshot?: SyncSnapshot;
  readonly error?: Error;
  readonly warning?: Error;
  readonly checkedAt?: string;
}

export type SyncListener = (state: SyncState) => void;

export interface SyncOptions {
  readonly force?: boolean;
  readonly online?: boolean;
}

export interface RepositoryClient {
  fetchAllRepositories(
    username: string,
    etag?: string,
    signal?: AbortSignal,
  ): Promise<RepositoryFetchResult>;
}

const SCHEMA_VERSION = 1;
export const DEFAULT_FRESHNESS_MS = 15 * 60 * 1_000;

function normalizeError(error: unknown, fallback: string): Error {
  return error instanceof Error ? error : new Error(fallback);
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

export class SyncService {
  private active?: Promise<SyncState>;
  private controller?: AbortController;
  private currentState: SyncState = { status: 'idle' };

  constructor(
    private readonly username: string,
    private readonly client: RepositoryClient,
    private readonly cache: SnapshotCache,
    private readonly overridesLoader: () => Promise<ProjectOverrides>,
    private readonly publish: SyncListener,
    private readonly now: () => Date = () => new Date(),
    private readonly freshnessMs = DEFAULT_FRESHNESS_MS,
  ) {}

  synchronize(options: SyncOptions = {}): Promise<SyncState> {
    if (this.active) return this.active;

    this.active = this.run(options).finally(() => {
      this.active = undefined;
      this.controller = undefined;
    });
    return this.active;
  }

  cancel(): void {
    this.controller?.abort();
  }

  async acknowledgeProject(repositoryName: string): Promise<SyncState> {
    if (this.active) await this.active;

    const snapshot = this.currentState.snapshot;
    const project = snapshot?.projects.find((candidate) => candidate.repositoryName === repositoryName);
    if (!snapshot || !project?.isNew) return this.currentState;

    const updatedSnapshot: SyncSnapshot = {
      ...snapshot,
      projects: snapshot.projects.map((candidate) => (
        candidate.id === project.id ? { ...candidate, isNew: false } : candidate
      )),
    };

    try {
      await this.cache.saveSnapshot(updatedSnapshot, [], []);
      return this.emit({ ...this.currentState, snapshot: updatedSnapshot });
    } catch (error) {
      return this.emit({
        ...this.currentState,
        warning: normalizeError(error, 'Project acknowledgement failed'),
      });
    }
  }

  private emit(state: SyncState): SyncState {
    this.currentState = state;
    this.publish(state);
    return state;
  }

  private async saveRefreshedSnapshot(
    snapshot: SyncSnapshot,
    warning?: Error,
  ): Promise<SyncState> {
    try {
      await this.cache.saveSnapshot(snapshot, [], []);
      return this.emit({
        status: 'ready',
        snapshot,
        checkedAt: snapshot.syncedAt,
        warning,
      });
    } catch (error) {
      return this.emit({
        status: 'ready',
        snapshot,
        checkedAt: snapshot.syncedAt,
        warning: normalizeError(error, 'Cache refresh failed'),
      });
    }
  }

  private async run(options: SyncOptions): Promise<SyncState> {
    const displayedSnapshot = this.currentState.snapshot;
    this.emit({ status: 'loading-cache', snapshot: displayedSnapshot });

    let cached = displayedSnapshot;
    let warning: Error | undefined;

    try {
      const persisted = await this.cache.getSnapshot(this.username);
      if (persisted) cached = persisted;
    } catch (error) {
      warning = normalizeError(error, 'Cache failure');
    }

    if (cached) {
      this.emit({ status: 'ready', snapshot: cached, warning });
    }

    if (options.online === false) {
      return this.emit({ status: 'offline', snapshot: cached, warning });
    }

    let overrides: ProjectOverrides = {};
    let currentOverridesSignature: string | undefined;
    try {
      overrides = await this.overridesLoader();
      currentOverridesSignature = overridesSignature(overrides);
    } catch (error) {
      warning = normalizeError(error, 'Invalid overrides');
    }

    const overridesUnchanged = currentOverridesSignature !== undefined
      && cached?.overridesSignature === currentOverridesSignature;
    const cachedTime = cached ? Date.parse(cached.syncedAt) : Number.NaN;
    const fresh = cached !== undefined
      && overridesUnchanged
      && Number.isFinite(cachedTime)
      && this.now().getTime() - cachedTime < this.freshnessMs;

    if (fresh && !options.force) {
      return this.emit({ status: 'ready', snapshot: cached, warning });
    }

    this.controller = new AbortController();
    this.emit({ status: 'syncing', snapshot: cached, warning });

    try {
      const result = await this.client.fetchAllRepositories(
        this.username,
        overridesUnchanged ? cached?.etag : undefined,
        this.controller.signal,
      );
      const checkedAt = this.now().toISOString();

      if (result.status === 'not-modified') {
        if (!cached || !overridesUnchanged) {
          throw new AppError(
            'invalid-response',
            'GitHub returned 304 without a compatible cached snapshot',
            'Réponse GitHub incohérente.',
            true,
          );
        }

        const refreshed: SyncSnapshot = {
          ...cached,
          syncedAt: checkedAt,
          etag: result.etag ?? cached.etag,
          overridesSignature: currentOverridesSignature,
        };
        return await this.saveRefreshedSnapshot(refreshed, warning);
      }

      const mapped = result.repositories.map((repository) => (
        mapRepository(repository, this.now())
      ));
      const enriched = enrichProjects(mapped, overrides);
      const comparison = compareProjects(cached?.projects, enriched, this.username, checkedAt);
      const snapshot: SyncSnapshot = {
        schemaVersion: SCHEMA_VERSION,
        username: this.username,
        projects: comparison.projects,
        syncedAt: checkedAt,
        etag: result.etag,
        overridesSignature: currentOverridesSignature,
      };

      try {
        await this.cache.saveSnapshot(snapshot, comparison.events, comparison.removedIds);
      } catch (error) {
        return this.emit({
          status: 'error',
          snapshot,
          checkedAt,
          error: normalizeError(error, 'Cache write failed'),
          warning,
        });
      }

      return this.emit({ status: 'ready', snapshot, checkedAt, warning });
    } catch (error) {
      if (isAbortError(error)) {
        return this.emit({
          status: cached ? 'ready' : 'idle',
          snapshot: cached,
          warning,
        });
      }

      return this.emit({
        status: 'error',
        snapshot: cached,
        error: normalizeError(error, 'Synchronization failed'),
        warning,
      });
    }
  }
}
