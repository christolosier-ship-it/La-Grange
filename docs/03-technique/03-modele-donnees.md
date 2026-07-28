# Modèle de données

## Project

```ts
interface Project {
  id: number;
  nodeId?: string;
  repositoryName: string;
  slug: string;
  displayName: string;
  description: string;
  githubUrl: string;
  appUrl?: string;
  readmeUrl: string;
  releasesUrl: string;
  issuesUrl: string;
  language?: string;
  defaultBranch: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt?: string;
  openIssuesCount: number;
  archived: boolean;
  fork: boolean;
  category: ProjectCategory;
  activityState: ActivityState;
  cover?: string;
  logo?: string;
  accent?: string;
  featured: boolean;
  isNew: boolean;
}
```

## ProjectOverride

Champs facultatifs : `displayName`, `description`, `category`, `cover`, `logo`, `accent`, `featured`, `appUrl`, `hidden`, `sortOrder`.

## SyncSnapshot

```ts
interface SyncSnapshot {
  schemaVersion: number;
  username: string;
  projects: Project[];
  syncedAt: string;
  etag?: string;
}
```

## Preferences

Filtres d’affichage persistants, densité, favoris, animations réduites, masquage des forks et archives.

## Versionnement

Toute modification incompatible du stockage augmente `schemaVersion` et fournit une migration testée. Une migration échouée conserve une copie de l’ancien instantané avant réinitialisation contrôlée.
