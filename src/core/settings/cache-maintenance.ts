export interface ProfileCacheDiagnostics {
  readonly username: string;
  readonly available: boolean;
  readonly snapshotPresent: boolean;
  readonly projectCount: number;
  readonly activityCount: number;
  readonly invalidActivityCount: number;
  readonly detailCount: number;
}

export interface ProfileResetResult {
  readonly username: string;
  readonly snapshotDeleted: boolean;
  readonly activityDeleted: number;
  readonly detailsDeleted: number;
}

export interface CacheMaintenanceApi {
  inspectProfileCache(username: string): Promise<ProfileCacheDiagnostics>;
  resetProfileCache(username: string): Promise<ProfileResetResult>;
}

export type SettingsStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface SettingsState {
  readonly status: SettingsStatus;
  readonly username?: string;
  readonly cache?: ProfileCacheDiagnostics;
  readonly error?: Error;
  readonly message?: string;
}

export const INITIAL_SETTINGS_STATE: SettingsState = { status: 'idle' };

export type SettingsListener = (state: SettingsState) => void;

export class CacheMaintenanceService {
  private requestId = 0;
  private state: SettingsState = INITIAL_SETTINGS_STATE;

  constructor(
    private readonly cache: CacheMaintenanceApi,
    private readonly publish: SettingsListener,
  ) {}

  async inspect(username: string): Promise<SettingsState> {
    const cleanUsername = username.trim();
    const requestId = ++this.requestId;
    this.emit({
      ...this.state,
      status: 'loading',
      username: cleanUsername,
      error: undefined,
      message: undefined,
    });

    try {
      const cache = await this.cache.inspectProfileCache(cleanUsername);
      if (requestId !== this.requestId) return this.state;
      return this.emit({ status: 'ready', username: cleanUsername, cache });
    } catch (error) {
      if (requestId !== this.requestId) return this.state;
      return this.emit({
        ...this.state,
        status: 'error',
        username: cleanUsername,
        error: error instanceof Error ? error : new Error('Cache diagnostics failed'),
      });
    }
  }

  async reset(username: string): Promise<ProfileResetResult> {
    const cleanUsername = username.trim();
    const requestId = ++this.requestId;
    this.emit({
      ...this.state,
      status: 'loading',
      username: cleanUsername,
      error: undefined,
      message: 'Réinitialisation du cache local en cours…',
    });

    try {
      const result = await this.cache.resetProfileCache(cleanUsername);
      const cache = await this.cache.inspectProfileCache(cleanUsername);
      if (requestId === this.requestId) {
        this.emit({
          status: 'ready',
          username: cleanUsername,
          cache,
          message: 'Le cache du profil actif a été réinitialisé. Les préférences sont conservées.',
        });
      }
      return result;
    } catch (error) {
      if (requestId === this.requestId) {
        this.emit({
          ...this.state,
          status: 'error',
          username: cleanUsername,
          error: error instanceof Error ? error : new Error('Cache reset failed'),
        });
      }
      throw error;
    }
  }

  resetState(): SettingsState {
    this.requestId += 1;
    return this.emit(INITIAL_SETTINGS_STATE);
  }

  private emit(state: SettingsState): SettingsState {
    this.state = state;
    this.publish(state);
    return state;
  }
}
