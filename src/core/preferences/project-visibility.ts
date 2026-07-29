import type { Project } from '../projects/model';
import type { AppPreferences } from './app-preferences';

export type ProjectHiddenReason = 'fork' | 'archived';

export function projectHiddenReason(
  project: Project,
  preferences: Pick<AppPreferences, 'hideForks' | 'hideArchived'>,
): ProjectHiddenReason | undefined {
  if (preferences.hideArchived && project.archived) return 'archived';
  if (preferences.hideForks && project.fork) return 'fork';
  return undefined;
}

export function selectVisibleProjects(
  projects: readonly Project[],
  preferences: Pick<AppPreferences, 'hideForks' | 'hideArchived'>,
): Project[] {
  return projects.filter((project) => projectHiddenReason(project, preferences) === undefined);
}
