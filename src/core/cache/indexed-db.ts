import { AppError } from '../errors/app-error';
import type { ActivityEvent, SyncSnapshot } from '../projects/model';

const DATABASE = 'la-grange-db';
const VERSION = 1;

export interface SnapshotCache {
  getSnapshot(username: string): Promise<SyncSnapshot | undefined>;
  saveSnapshot(snapshot: SyncSnapshot, events: readonly ActivityEvent[], removedIds: readonly number[]): Promise<void>;
}

function request<T>(value: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => { value.onsuccess = () => resolve(value.result); value.onerror = () => reject(value.error); });
}

function validSnapshot(value: unknown): value is SyncSnapshot {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SyncSnapshot>;
  return item.schemaVersion === VERSION && typeof item.username === 'string' && typeof item.syncedAt === 'string' && Array.isArray(item.projects);
}

export class IndexedDbCache implements SnapshotCache {
  private database?: Promise<IDBDatabase>;
  constructor(private readonly indexedDBFactory: IDBFactory = indexedDB) {}

  private open(): Promise<IDBDatabase> {
    this.database ??= new Promise((resolve, reject) => {
      const opening = this.indexedDBFactory.open(DATABASE, VERSION);
      opening.onupgradeneeded = () => {
        const database = opening.result;
        if (!database.objectStoreNames.contains('snapshots')) database.createObjectStore('snapshots', { keyPath: 'username' });
        if (!database.objectStoreNames.contains('projectDetails')) database.createObjectStore('projectDetails', { keyPath: 'projectId' });
        if (!database.objectStoreNames.contains('activityEvents')) database.createObjectStore('activityEvents', { keyPath: 'id', autoIncrement: true });
        if (!database.objectStoreNames.contains('metadata')) database.createObjectStore('metadata', { keyPath: 'key' });
      };
      opening.onsuccess = () => resolve(opening.result);
      opening.onerror = () => reject(opening.error);
      opening.onblocked = () => reject(new Error('IndexedDB upgrade blocked'));
    });
    return this.database;
  }

  async getSnapshot(username: string): Promise<SyncSnapshot | undefined> {
    try {
      const database = await this.open();
      const transaction = database.transaction('snapshots', 'readonly');
      const value: unknown = await request(transaction.objectStore('snapshots').get(username));
      return validSnapshot(value) ? value : undefined;
    } catch (error) { throw new AppError('cache', error instanceof Error ? error.message : 'Cache read failed', 'Cache local indisponible.', true); }
  }

  async saveSnapshot(snapshot: SyncSnapshot, events: readonly ActivityEvent[], removedIds: readonly number[]): Promise<void> {
    try {
      const database = await this.open();
      const transaction = database.transaction(['snapshots', 'activityEvents', 'projectDetails'], 'readwrite');
      transaction.objectStore('snapshots').put(snapshot);
      for (const event of events) transaction.objectStore('activityEvents').add(event);
      for (const id of removedIds) transaction.objectStore('projectDetails').delete(id);
      await new Promise<void>((resolve, reject) => { transaction.oncomplete = () => resolve(); transaction.onerror = () => reject(transaction.error); transaction.onabort = () => reject(transaction.error); });
    } catch (error) { throw new AppError('cache', error instanceof Error ? error.message : 'Cache write failed', 'Enregistrement local impossible.', true); }
  }
}
