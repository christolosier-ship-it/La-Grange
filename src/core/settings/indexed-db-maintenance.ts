import { isValidActivityEvent } from '../activity/activity-model';
import { AppError } from '../errors/app-error';
import type { ProjectDetails } from '../projects/details';
import type { SyncSnapshot } from '../projects/model';
import type {
  CacheMaintenanceApi,
  ProfileCacheDiagnostics,
  ProfileResetResult,
} from './cache-maintenance';

const DATABASE = 'la-grange-db';
const DATABASE_VERSION = 2;

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction aborted'));
  });
}

function openDatabase(factory: IDBFactory): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = factory.open(DATABASE, DATABASE_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed'));
    request.onblocked = () => reject(new Error('IndexedDB open blocked'));
  });
}

function isSnapshotForUser(value: unknown, username: string): value is SyncSnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const snapshot = value as Record<string, unknown>;
  return snapshot.username === username
    && Array.isArray(snapshot.projects)
    && typeof snapshot.syncedAt === 'string'
    && Number.isFinite(Date.parse(snapshot.syncedAt));
}

function isStoredDetail(value: unknown): value is ProjectDetails {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const detail = value as Record<string, unknown>;
  return typeof detail.projectId === 'number'
    && Number.isInteger(detail.projectId)
    && detail.projectId > 0
    && typeof detail.repositoryName === 'string';
}

export function profileProjectIds(snapshot: SyncSnapshot | undefined): number[] {
  return snapshot
    ? [...new Set(snapshot.projects.map(({ id }) => id))].sort((left, right) => left - right)
    : [];
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
      const snapshotRequest = transaction.objectStore('snapshots').get(username);
      const activityRequest = transaction.objectStore('activityEvents')
        .index('byUsername')
        .getAll(IDBKeyRange.only(username));
      const detailRequest = transaction.objectStore('projectDetails').getAll();
      const [rawSnapshot, activityValues, detailValues] = await Promise.all([
        requestResult(snapshotRequest),
        requestResult(activityRequest),
        requestResult(detailRequest),
      ]);
      const snapshot = isSnapshotForUser(rawSnapshot, username) ? rawSnapshot : undefined;
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
        projectCount: snapshot?.projects.length ?? 0,
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
        ['snapshots', 'activityEvents'],
        'readonly',
      );
      const snapshotRequest = readTransaction.objectStore('snapshots').get(username);
      const activityKeysRequest = readTransaction.objectStore('activityEvents')
        .index('byUsername')
        .getAllKeys(IDBKeyRange.only(username));
      const [rawSnapshot, activityKeys] = await Promise.all([
        requestResult(snapshotRequest),
        requestResult(activityKeysRequest),
      ]);
      const snapshot = isSnapshotForUser(rawSnapshot, username) ? rawSnapshot : undefined;
      const projectIds = profileProjectIds(snapshot);

      const transaction = database.transaction(
        ['snapshots', 'activityEvents', 'projectDetails'],
        'readwrite',
      );
      const completion = transactionDone(transaction);
      transaction.objectStore('snapshots').delete(username);
      const activityStore = transaction.objectStore('activityEvents');
      for (const key of activityKeys) activityStore.delete(key);
      const detailStore = transaction.objectStore('projectDetails');
      for (const projectId of projectIds) detailStore.delete(projectId);
      await completion;

      return {
        username,
        snapshotDeleted: snapshot !== undefined,
        activityDeleted: activityKeys.length,
        detailsDeleted: projectIds.length,
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
