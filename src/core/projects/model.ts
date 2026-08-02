export type ProjectCategory =
  | 'games'
  | 'applications'
  | 'professional-tools'
  | 'experiments'
  | 'learning'
  | 'uncategorized';

export type ActivityState = 'active' | 'maintenance' | 'sleeping' | 'archived';

export type ProjectStyle =
  | 'lifestyle'
  | 'games'
  | 'productivity'
  | 'health'
  | 'education'
  | 'nature'
  | 'creation'
  | 'technical'
  | 'uncategorized';

export interface ProjectColors {
  readonly primary: string;
  readonly secondary: string;
  readonly progress: string;
}

export interface Project {
  readonly id: number;
  readonly nodeId?: string;
  readonly repositoryName: string;
  readonly slug: string;
  readonly displayName: string;
  readonly description: string;
  readonly githubUrl: string;
  readonly appUrl?: string;
  readonly readmeUrl: string;
  readonly releasesUrl: string;
  readonly issuesUrl: string;
  readonly language?: string;
  readonly defaultBranch: string;
  readonly topics: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly pushedAt?: string;
  readonly openIssuesCount: number;
  readonly archived: boolean;
  readonly fork: boolean;
  readonly category: ProjectCategory;
  readonly activityState: ActivityState;
  readonly cover?: string;
  readonly logo?: string;
  readonly accent?: string;
  readonly style?: ProjectStyle;
  readonly colors?: ProjectColors;
  readonly progress?: number;
  readonly manualVersion?: string;
  readonly resolvedVersion?: string;
  readonly featured: boolean;
  readonly isNew: boolean;
  readonly sortOrder?: number;
}

export interface SyncSnapshot {
  readonly schemaVersion: number;
  readonly username: string;
  readonly projects: readonly Project[];
  readonly syncedAt: string;
  readonly etag?: string;
  readonly overridesSignature?: string;
  readonly aliases?: Readonly<Record<string, number>>;
}

export interface ActivityEvent {
  readonly id?: number;
  readonly username: string;
  readonly projectId: number;
  readonly type: 'added' | 'renamed' | 'removed' | 'archived' | 'app-url-changed';
  readonly occurredAt: string;
  readonly detail?: string;
}
