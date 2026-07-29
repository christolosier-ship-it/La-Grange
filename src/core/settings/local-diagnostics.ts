import { AppError } from '../errors/app-error';
import type { AppPreferences } from '../preferences/app-preferences';
import type { SyncState } from '../sync/sync-service';
import type { SettingsState } from './cache-maintenance';

export interface LocalDiagnosticsInput {
  readonly version: string;
  readonly online: boolean;
  readonly preferences: AppPreferences;
  readonly sync: SyncState;
  readonly settings: SettingsState;
  readonly generatedAt?: Date;
}

function safeError(error: Error | undefined): { code?: string; message: string } | undefined {
  if (!error) return undefined;
  if (error instanceof AppError) return { code: error.code, message: error.userMessage };
  return { message: 'Une erreur locale non détaillée a été détectée.' };
}

export function buildLocalDiagnostics(input: LocalDiagnosticsInput): string {
  const cache = input.settings.cache;
  const payload = {
    generatedAt: (input.generatedAt ?? new Date()).toISOString(),
    application: {
      version: input.version,
      readOnly: true,
    },
    profile: {
      username: input.preferences.username,
    },
    connection: {
      online: input.online,
    },
    synchronization: {
      status: input.sync.status,
      syncedAt: input.sync.snapshot?.syncedAt,
      projectCount: input.sync.snapshot?.projects.length ?? 0,
      error: safeError(input.sync.error),
      warning: safeError(input.sync.warning),
    },
    cache: {
      status: input.settings.status,
      available: cache?.available ?? false,
      snapshotPresent: cache?.snapshotPresent ?? false,
      activityCount: cache?.activityCount ?? 0,
      invalidActivityCount: cache?.invalidActivityCount ?? 0,
      detailCount: cache?.detailCount ?? 0,
      error: safeError(input.settings.error),
    },
    preferences: {
      hideForks: input.preferences.hideForks,
      hideArchived: input.preferences.hideArchived,
      freshnessMinutes: input.preferences.freshnessMinutes,
      density: input.preferences.density,
      reduceMotion: input.preferences.reduceMotion,
      catalogueView: input.preferences.catalogueView,
      favoriteCount: input.preferences.favoriteIds.length,
    },
  };

  return JSON.stringify(payload, null, 2);
}

export async function copyText(
  text: string,
  clipboard?: Pick<Clipboard, 'writeText'>,
): Promise<boolean> {
  const browserClipboard = (navigator as unknown as { clipboard?: Clipboard }).clipboard;
  const target = clipboard ?? browserClipboard;
  if (!target) return false;
  try {
    await target.writeText(text);
    return true;
  } catch {
    return false;
  }
}
