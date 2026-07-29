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
  sortOrder?: number;
}
```

## ProjectOverride

Champs facultatifs : `displayName`, `description`, `category`, `cover`, `logo`, `accent`, `featured`, `appUrl`, `hidden`, `sortOrder`.

Une signature déterministe de la configuration valide est conservée dans le snapshot. Lorsque cette signature change, l’ETag GitHub n’est pas envoyé afin de récupérer une liste technique complète avant de réappliquer les overrides. Cela permet notamment de faire réapparaître un projet précédemment masqué sans attendre une modification côté GitHub.

## SyncSnapshot

```ts
interface SyncSnapshot {
  schemaVersion: number;
  username: string;
  projects: Project[];
  syncedAt: string;
  etag?: string;
  overridesSignature?: string;
}
```

## ActivityEvent

Le journal local enregistre les ajouts, renommages, disparitions, archivages et changements d’URL d’application. Il est indexé par utilisateur et par date. La rétention est bornée aux 500 événements les plus récents par utilisateur afin d’éviter une croissance illimitée d’IndexedDB.

## Preferences

Filtres d’affichage persistants, densité, favoris, animations réduites, masquage des forks et archives.

## Versionnement

Toute modification incompatible du stockage augmente `schemaVersion` et fournit une migration testée. La version de la base IndexedDB est distincte du schéma de snapshot : elle évolue lors de l’ajout d’index ou d’object stores sans invalider inutilement les projets déjà enregistrés. Une migration échouée doit préserver le dernier snapshot lisible avant toute réinitialisation contrôlée.
