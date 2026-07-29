import type { AppPreferences } from '../core/preferences/app-preferences';
import type { Project } from '../core/projects/model';
import type { CatalogueState } from './catalogue/catalogue-model';

export interface ViewActions {
  readonly onCatalogueChange?: (state: CatalogueState) => void;
  readonly onToggleFavorite?: (projectId: number) => void;
  readonly onRemoveFavorite?: (projectId: number) => void;
  readonly onClearFavorites?: () => void;
  readonly onPreferencesChange?: (preferences: AppPreferences) => void;
  readonly onProfileChange?: (username: string) => Promise<void>;
  readonly onResetCache?: () => Promise<void>;
  readonly onRefreshCacheInfo?: () => Promise<void>;
  readonly onProjectDetailsRequest?: (project: Project, force: boolean) => void;
}
