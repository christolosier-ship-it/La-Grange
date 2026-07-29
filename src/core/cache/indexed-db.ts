import { AppError } from '../errors/app-error';
import type {
  ActivityEvent,
  ActivityState,
  Project,
  ProjectCategory,
  SyncSnapshot,
} from '../projects/model';

const DATABASE = 'la-grange-db';
const DATABASE_VERSION = 1;
const SNAPSHOT_SCHEMA_VERSION = 1;

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
    && (item.pushedAt === undefined || Number.isFinite(Date.parse(item.pushedAt)))
    && typeof item.openIssuesCount === 'number'
    && Number.isInteger(item.openIssuesCount)
    && typeof item.archived === 'boolean'
    && typeof item.fork === 'boolean'
    && typeof item.category === 'string'
    && PROJECT_CATEGORIES.has(item.category as ProjectCategory)
    && typeof item.activityState === 'string'
    && ACTIVITY_STATES.has(item.activityState as ActivityState)
    && optionalString(item.cover)
    && optionalString(item.logo)
    && optionalString(item.accent)
    && typeof item.featured === 'boolean'
    && typeof item.isNew === 'boolean'
    && (item.sortOrder === undefined || typeof item.sortOrder === 'number');
}

function validSnapshot(value: unknown, username: string): value is SyncSnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;

  return item.schemaVersion === SNAPSHOT_SCHEMA_VERSION
    && item.username === username
    && typeof item.syncedAt === 'string'
    && Number.isFinite(Date.parse(item.syncedAt))
    && optionalString(item.etag)
    && Array.isArray(item.projects)
    && item.projects.every(validProject);
}

export class IndexedDbCache implements SnapshotCache {
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
        if (!database.objectStoreNames.contains('activityEvents')) {
          const events = database.createObjectStore('activityEvents', {
            keyPath: 'id',
            autoIncrement: true,
          });
          events.createIndex('byUsername', 'username', { unique: false });
          events.createIndex('byOccurredAt', 'occurredAt', { unique: false });
        }
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
      return validSnapshot(value, username) ? value : undefined;
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Cache read failed',
        'Cache local indisponible.',
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

      transaction.objectStore('snapshots').put(snapshot);
      const eventStore = transaction.objectStore('activityEvents');
      for (const event of events) eventStore.add(event);

      const detailStore = transaction.objectStore('projectDetails');
      for (const id of removedIds) detailStore.delete(id);

      await transactionDone(transaction);
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
