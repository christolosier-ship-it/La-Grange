import { isValidActivityEvent } from '../activity/activity-model';
import { AppError } from '../errors/app-error';
import type { ProjectDetails } from '../projects/details';
import type {
  CacheMaintenanceApi,
  ProfileCacheDiagnostics,
  ProfileResetResult,
} from './cache-maintenance';

const DATABASE = 'la-grange-db';
const DATABASE_VERSION = 2;

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error ?? new Error('IndexedDB request failed'));
    };
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };
    transaction.onerror = () => {
      reject(transaction.error ?? new Error('IndexedDB transaction failed'));
    };
    transaction.onabort = () => {
      reject(transaction.error ?? new Error('IndexedDB transaction aborted'));
    };
  });
}

function ensureActivityIndexes(store: IDBObjectStore): void {
  if (!store.indexNames.contains('byUsername')) {
    store.createIndex('byUsername', 'username', { unique: false });
  }
  if (!store.indexNames.contains('byOccurredAt')) {
    store.createIndex('byOccurredAt', 'occurredAt', { unique: false });
  }
}

function openDatabase(factory: IDBFactory): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = factory.open(DATABASE, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains('snapshots')) {
        database.createObjectStore('snapshots', { keyPath: 'username' });
      }
      if (!database.objectStoreNames.contains('projectDetails')) {
        database.createObjectStore('projectDetails', { keyPath: 'projectId' });
      }
      const activityStore = database.objectStoreNames.contains('activityEvents')
        ? request.transaction?.objectStore('activityEvents')
        : database.createObjectStore('activityEvents', {
            keyPath: 'id',
            autoIncrement: true,
          });
      if (activityStore) ensureActivityIndexes(activityStore);
      if (!database.objectStoreNames.contains('metadata')) {
        database.createObjectStore('metadata', { keyPath: 'key' });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error ?? new Error('IndexedDB open failed'));
    };
    request.onblocked = () => {
      reject(new Error('IndexedDB open blocked'));
    };
  });
}

function storedSnapshot(value: unknown, username: string): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const snapshot = value as Record<string, unknown>;
  return snapshot.username === username
    && Array.isArray(snapshot.projects)
    && typeof snapshot.syncedAt === 'string'
    && Number.isFinite(Date.parse(snapshot.syncedAt))
    ? snapshot
    : undefined;
}

function isStoredDetail(value: unknown): value is ProjectDetails {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const detail = value as Record<string, unknown>;
  return typeof detail.projectId === 'number'
    && Number.isInteger(detail.projectId)
    && detail.projectId > 0
    && typeof detail.repositoryName === 'string';
}

export function profileProjectIds(snapshot: unknown): number[] {
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) return [];
  const projects = (snapshot as Record<string, unknown>).projects;
  if (!Array.isArray(projects)) return [];
  return [...new Set(projects.flatMap((project) => {
    if (!project || typeof project !== 'object' || Array.isArray(project)) return [];
    const id = (project as Record<string, unknown>).id;
    return typeof id === 'number' && Number.isInteger(id) && id > 0 ? [id] : [];
  }))].sort((left, right) => left - right);
}

export function profileDetailKeys(
  projectIds: readonly number[],
  storedKeys: readonly IDBValidKey[],
): number[] {
  const allowed = new Set(projectIds);
  return storedKeys.filter((key): key is number => (
    typeof key === 'number'
    && Number.isInteger(key)
    && allowed.has(key)
  ));
}

export class IndexedDbMaintenance implements CacheMaintenanceApi {
  constructor(private readonly indexedDBFactory: IDBFactory = indexedDB) {}

  async inspectProfileCache(username: string): Promise<ProfileCacheDiagnostics> {
    let database: IDBDatabase | undefined;
    try {
      database = await openDatabase(this.indexedDBFactory);
      const transaction = database.transaction(
        ['snapshots', 'activityEvents', 'projectDetails'],
        'readonly',
      );
      const rawSnapshot = await requestResult(
        transaction.objectStore('snapshots').get(username) as IDBRequest<unknown>,
      );
      const activityValues = await requestResult(
        transaction.objectStore('activityEvents')
          .index('byUsername')
          .getAll(IDBKeyRange.only(username)) as IDBRequest<unknown[]>,
      );
      const detailValues = await requestResult(
        transaction.objectStore('projectDetails').getAll() as IDBRequest<unknown[]>,
      );
      const snapshot = storedSnapshot(rawSnapshot, username);
      const projectIds = new Set(profileProjectIds(snapshot));
      const activityCount = activityValues.filter((value) => (
        isValidActivityEvent(value, username)
      )).length;
      const detailCount = detailValues.filter((value) => (
        isStoredDetail(value) && projectIds.has(value.projectId)
      )).length;

      return {
        username,
        available: true,
        snapshotPresent: snapshot !== undefined,
        projectCount: projectIds.size,
        activityCount,
        invalidActivityCount: activityValues.length - activityCount,
        detailCount,
      };
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Profile cache inspection failed',
        'Informations du cache indisponibles.',
        true,
      );
    } finally {
      database?.close();
    }
  }

  async resetProfileCache(username: string): Promise<ProfileResetResult> {
    let database: IDBDatabase | undefined;
    try {
      database = await openDatabase(this.indexedDBFactory);
      const readTransaction = database.transaction(
        ['snapshots', 'activityEvents', 'projectDetails'],
        'readonly',
      );
      const rawSnapshot = await requestResult(
        readTransaction.objectStore('snapshots').get(username) as IDBRequest<unknown>,
      );
      const activityKeys = await requestResult(
        readTransaction.objectStore('activityEvents')
          .index('byUsername')
          .getAllKeys(IDBKeyRange.only(username)),
      );
      const storedDetailKeys = await requestResult(
        readTransaction.objectStore('projectDetails').getAllKeys(),
      );
      const snapshot = storedSnapshot(rawSnapshot, username);
      const projectIds = profileProjectIds(snapshot);
      const detailKeys = profileDetailKeys(projectIds, storedDetailKeys);

      const transaction = database.transaction(
        ['snapshots', 'activityEvents', 'projectDetails'],
        'readwrite',
      );
      const completion = transactionDone(transaction);
      transaction.objectStore('snapshots').delete(username);
      const activityStore = transaction.objectStore('activityEvents');
      for (const key of activityKeys) activityStore.delete(key);
      const detailStore = transaction.objectStore('projectDetails');
      for (const key of detailKeys) detailStore.delete(key);
      await completion;

      return {
        username,
        snapshotDeleted: snapshot !== undefined,
        activityDeleted: activityKeys.length,
        detailsDeleted: detailKeys.length,
      };
    } catch (error) {
      throw new AppError(
        'cache',
        error instanceof Error ? error.message : 'Profile cache reset failed',
        'Réinitialisation du cache impossible.',
        true,
      );
    } finally {
      database?.close();
    }
  }
}
