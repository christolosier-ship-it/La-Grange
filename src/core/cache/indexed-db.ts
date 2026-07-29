import {
  isValidActivityEvent,
  sortActivityEvents,
  type ActivityReadResult,
} from '../activity/activity-model';
import { AppError } from '../errors/app-error';
import type { ProjectDetails } from '../projects/details';
import type {
  ActivityEvent,
  ActivityState,
  Project,
  ProjectCategory,
  SyncSnapshot,
} from '../projects/model';

const DATABASE = 'la-grange-db';
const DATABASE_VERSION = 2;
const SNAPSHOT_SCHEMA_VERSION = 1;
const PROJECT_DETAILS_SCHEMA_VERSION = 1;
const MAX_ACTIVITY_EVENTS_PER_USER = 500;

const PROJECT_CATEGORIES = new Set<ProjectCategory>([
  'games',
  'applications',
  'professional-tools',
  'experiments',
  'learning',
  'uncategorized',
]);
const ACTIVITY_STATES = new Set<ActivityState>([
  'active',
  'maintenance',
  'sleeping',
  'archived',
]);

export interface SnapshotCache {
  getSnapshot(username: string): Promise<SyncSnapshot | undefined>;
  saveSnapshot(
    snapshot: SyncSnapshot,
    events: readonly ActivityEvent[],
    removedIds: readonly number[],
  ): Promise<void>;
}

export interface ProjectDetailsCache {
  getProjectDetails(projectId: number): Promise<ProjectDetails | undefined>;
  saveProjectDetails(details: ProjectDetails): Promise<void>;
}

export interface ActivityCache {
  getActivityEvents(username: string): Promise<ActivityReadResult>;
}

function idbError(value: DOMException | null, fallback: string): Error {
  return value ?? new Error(fallback);
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(idbError(request.error, 'IndexedDB request failed'));
    };
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };
    transaction.onerror = () => {
      reject(idbError(transaction.error, 'IndexedDB transaction failed'));
    };
    transaction.onabort = () => {
      reject(idbError(transaction.error, 'IndexedDB transaction aborted'));
    };
  });
}

function optionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

function validDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function validHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function validProject(value: unknown): value is Project {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;

  return typeof item.id === 'number'
    && Number.isInteger(item.id)
    && typeof item.repositoryName === 'string'
    && typeof item.slug === 'string'
    && typeof item.displayName === 'string'
    && typeof item.description === 'string'
    && typeof item.githubUrl === 'string'
    && optionalString(item.appUrl)
    && typeof item.readmeUrl === 'string'
    && typeof item.releasesUrl === 'string'
    && typeof item.issuesUrl === 'string'
    && optionalString(item.language)
    && typeof item.defaultBranch === 'string'
    && Array.isArray(item.topics)
    && item.topics.every((topic) => typeof topic === 'string')
    && typeof item.createdAt === 'string'
    && Number.isFinite(Date.parse(item.createdAt))
    && typeof item.updatedAt === 'string'
    && Number.isFinite(Date.parse(item.updatedAt))
    && optionalString(item.pushedAt)
    && (item.pushedAt === undefined
      || (typeof item.pushedAt === 'string' && Number.isFinite(Date.parse(item.pushedAt))))
    && typeof item.openIssuesCount === 'number'
    && Number.isInteger(item.openIssuesCount)
    && typeof item.archived === 'boolean'
    && typeof item.fork === 'boolean'
    && typeof item.category === 'string'
    && PROJECT_CATEGORIES.has(item.category as ProjectCategory)
    && typeof item.activityState === 'string'
    && ACTIVITY_STATES.has(item.activityState as ActivityState)
    && optionalString(item.nodeId)
    && optionalString(item.cover)
    && optionalString(item.logo)
    && optionalString(item.accent)
    && typeof item.featured === 'boolean'
    && typeof item.isNew === 'boolean'
    && (item.sortOrder === undefined
      || (typeof item.sortOrder === 'number' && Number.isFinite(item.sortOrder)));
}

function validAliases(value: unknown): boolean {
  if (value === undefined) return true;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.entries(value).every(([name, projectId]) => (
    name.trim().length > 0
    && typeof projectId === 'number'
    && Number.isInteger(projectId)
    && projectId > 0
  ));
}

export function isValidSyncSnapshot(value: unknown, username: string): value is SyncSnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;

  return item.schemaVersion === SNAPSHOT_SCHEMA_VERSION
    && item.username === username
    && typeof item.syncedAt === 'string'
    && Number.isFinite(Date.parse(item.syncedAt))
    && optionalString(item.etag)
    && optionalString(item.overridesSignature)
    && validAliases(item.aliases)
    && Array.isArray(item.projects)
    && item.projects.every(validProject);
}

export function isValidProjectDetails(value: unknown): value is ProjectDetails {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  const release = item.release;
  const validRelease = release === undefined || (
    Boolean(release)
    && typeof release === 'object'
    && !Array.isArray(release)
    && typeof (release as Record<string, unknown>).name === 'string'
    && typeof (release as Record<string, unknown>).tagName === 'string'
    && ((release as Record<string, unknown>).publishedAt === undefined
      || validDate((release as Record<string, unknown>).publishedAt))
    && validHttpsUrl((release as Record<string, unknown>).url)
  );

  return item.schemaVersion === PROJECT_DETAILS_SCHEMA_VERSION
    && typeof item.projectId === 'number'
    && Number.isInteger(item.projectId)
    && item.projectId > 0
    && typeof item.repositoryName === 'string'
    && item.repositoryName.trim().length > 0
    && validDate(item.fetchedAt)
    && Array.isArray(item.commits)
    && item.commits.every((commit) => {
      if (!commit || typeof commit !== 'object' || Array.isArray(commit)) return false;
      const entry = commit as Record<string, unknown>;
      return typeof entry.sha === 'string'
        && typeof entry.message === 'string'
        && typeof entry.authorName === 'string'
        && validDate(entry.committedAt)
        && validHttpsUrl(entry.url);
    })
    && validRelease
    && typeof item.readmeAvailable === 'boolean'
    && (item.readmeUrl === undefined || validHttpsUrl(item.readmeUrl))
    && (!item.readmeAvailable || validHttpsUrl(item.readmeUrl));
}

function ensureActivityIndexes(store: IDBObjectStore): void {
  if (!store.indexNames.contains('byUsername')) {
    store.createIndex('byUsername', 'username', { unique: false });
  }
  if (!store.indexNames.contains('byOccurredAt')) {
    store.createIndex('byOccurredAt', 'occurredAt', { unique: false });
  }
}

export function activityKeysToPrune(
  keys: readonly IDBValidKey[],
  maximum = MAX_ACTIVITY_EVENTS_PER_USER,
): IDBValidKey[] {
  const excess = Math.max(0, keys.length - maximum);
  return keys.slice(0, excess);
}

async function pruneActivityEvents(
  store: IDBObjectStore,
  username: string,
): Promise<void> {
  const keys = await requestResult(
    store.index('byUsername').getAllKeys(IDBKeyRange.only(username)),
  );
  for (const key of activityKeysToPrune(keys)) store.delete(key);
}

export class IndexedDbCache implements SnapshotCache, ProjectDetailsCache, ActivityCache {
  private database?: Promise<IDBDatabase>;

  constructor(private readonly indexedDBFactory: IDBFactory = indexedDB) {}

  private open(): Promise<IDBDatabase> {
    if (this.database) return this.database;

    const openingPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const opening = this.indexedDBFactory.open(DATABASE, DATABASE_VERSION);

      opening.onupgradeneeded = () => {
        const database = opening.result;
        if (!database.objectStoreNames.contains('snapshots')) {
          database.createObjectStore('snapshots', { keyPath: 'username' });
        }
        if (!database.objectStoreNames.contains('projectDetails')) {
          database.createObjectStore('projectDetails', { keyPath: 'projectId' });
        }

        const eventStore = database.objectStoreNames.contains('activityEvents')
          ? opening.transaction?.objectStore('activityEvents')
          : database.createObjectStore('activityEvents', {
              keyPath: 'id',
              autoIncrement: true,
            });
        if (eventStore) ensureActivityIndexes(eventStore);

        if (!database.objectStoreNames.contains('metadata')) {
          database.createObjectStore('metadata', { keyPath: 'key' });
        }
      };

      opening.onsuccess = () => {
        const database = opening.result;
        database.onversionchange = () => {
          database.close();
          this.database = undefined;
        };
        resolve(database);
      };
      opening.onerror = () => {
        reject(idbError(opening.error, 'IndexedDB open failed'));
      };
      opening.onblocked = () => {
        reject(new Error('IndexedDB upgrade blocked'));
      };
    });

    this.database = openingPromise.catch((error: unknown) => {
      this.database = undefined;
      throw error;
    });
    return this.database;
  }

  async getSnapshot(username: string): Promise<SyncSnapshot | undefined> {
    try {
      const database = await this.open();
      const transaction = database.transaction('snapshots', 'readonly');
      const value: unknown = await requestResult(
        transaction.objectStore('snapshots').get(username),
      );
      return isValidSyncSnapshot(value, username) ? value : undefined;
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Cache read failed',
        'Cache local indisponible.',
        true,
      );
    }
  }

  async getActivityEvents(username: string): Promise<ActivityReadResult> {
    try {
      const database = await this.open();
      const transaction = database.transaction('activityEvents', 'readonly');
      const values: unknown[] = await requestResult(
        transaction.objectStore('activityEvents')
          .index('byUsername')
          .getAll(IDBKeyRange.only(username)),
      );
      const events = values.filter((value): value is ActivityEvent => (
        isValidActivityEvent(value, username)
      ));
      return {
        events: sortActivityEvents(events),
        invalidCount: values.length - events.length,
      };
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Activity cache read failed',
        'Journal local indisponible.',
        true,
      );
    }
  }

  async getProjectDetails(projectId: number): Promise<ProjectDetails | undefined> {
    try {
      const database = await this.open();
      const transaction = database.transaction('projectDetails', 'readonly');
      const value: unknown = await requestResult(
        transaction.objectStore('projectDetails').get(projectId),
      );
      return isValidProjectDetails(value) ? value : undefined;
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Project detail cache read failed',
        'Détails locaux indisponibles.',
        true,
      );
    }
  }

  async saveProjectDetails(details: ProjectDetails): Promise<void> {
    try {
      const database = await this.open();
      const transaction = database.transaction('projectDetails', 'readwrite');
      const completion = transactionDone(transaction);
      transaction.objectStore('projectDetails').put(details);
      await completion;
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Project detail cache write failed',
        'Enregistrement des détails impossible.',
        true,
      );
    }
  }

  async saveSnapshot(
    snapshot: SyncSnapshot,
    events: readonly ActivityEvent[],
    removedIds: readonly number[],
  ): Promise<void> {
    try {
      const database = await this.open();
      const transaction = database.transaction(
        ['snapshots', 'activityEvents', 'projectDetails'],
        'readwrite',
      );
      const completion = transactionDone(transaction);

      transaction.objectStore('snapshots').put(snapshot);
      const eventStore = transaction.objectStore('activityEvents');
      for (const event of events) eventStore.add(event);
      await pruneActivityEvents(eventStore, snapshot.username);

      const detailStore = transaction.objectStore('projectDetails');
      for (const id of removedIds) detailStore.delete(id);

      await completion;
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Cache write failed',
        'Enregistrement local impossible.',
        true,
      );
    }
  }
}
