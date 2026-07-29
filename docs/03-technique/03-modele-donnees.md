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

Une signature déterministe de la configuration valide est conservée dans le snapshot. Lorsque cette signature change, une synchronisation complète récupère la liste technique avant de réappliquer les overrides. Cela permet notamment de faire réapparaître un projet précédemment masqué sans attendre une modification côté GitHub.

## SyncSnapshot

```ts
interface SyncSnapshot {
  schemaVersion: number;
  username: string;
  projects: Project[];
  syncedAt: string;
  etag?: string; // compatibilité de schéma, non requis par le client navigateur actuel
  overridesSignature?: string;
  aliases?: Record<string, number>;
}
```

`aliases` relie un ancien nom de dépôt à son identifiant GitHub stable. Le routeur peut ainsi rediriger une ancienne URL de fiche vers le nom courant. Les alias sont supprimés lorsque le projet disparaît ou lorsqu’un nom redevient canonique.

## ProjectDetails

```ts
interface ProjectDetails {
  schemaVersion: 1;
  projectId: number;
  repositoryName: string;
  fetchedAt: string;
  commits: ProjectCommit[];
  release?: ProjectRelease;
  readmeAvailable: boolean;
  readmeUrl?: string;
}
```

Les détails sont séparés du snapshot principal. Ils sont chargés uniquement pour la fiche ouverte, validés avant mapping et enregistrés dans l’object store `projectDetails`. Le nom du dépôt est conservé avec l’identifiant afin d’ignorer proprement une entrée devenue obsolète après renommage.

## ActivityEvent

Le journal local enregistre les ajouts, renommages, disparitions, archivages et changements d’URL d’application. Il est indexé par utilisateur et par date. La rétention est bornée aux 500 événements les plus récents par utilisateur afin d’éviter une croissance illimitée d’IndexedDB.

## Preferences

Les préférences légères de Phase 4 utilisent `localStorage` :

- identifiants des projets favoris ;
- mode d’affichage grille ou liste.

La recherche, les filtres, le tri et le contexte de retour sont sérialisés dans le hash de l’URL. Ils ne sont pas dupliqués dans `localStorage`, ce qui garde le lien partageable et évite deux sources de vérité.

## Versionnement

Toute modification incompatible du stockage augmente `schemaVersion` et fournit une migration testée. La version de la base IndexedDB est distincte du schéma de snapshot : elle évolue lors de l’ajout d’index ou d’object stores sans invalider inutilement les projets déjà enregistrés. Une migration échouée doit préserver le dernier snapshot lisible avant toute réinitialisation contrôlée.
