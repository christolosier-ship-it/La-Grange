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
  etag?: string;
  overridesSignature?: string;
  aliases?: Record<string, number>;
}
```

`username` est la clé d’isolation du snapshot. `aliases` relie un ancien nom de dépôt à son identifiant GitHub stable. Les alias sont supprimés lorsque le projet disparaît ou lorsqu’un nom redevient canonique.

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

Les détails sont séparés du snapshot principal. Ils sont chargés uniquement pour la fiche ouverte, validés avant mapping et enregistrés dans l’object store `projectDetails`. Les identifiants numériques GitHub étant globaux, ils permettent un nettoyage ciblé à partir des projets du snapshot actif.

## ActivityEvent

```ts
interface ActivityEvent {
  id?: number;
  username: string;
  projectId: number;
  type: 'added' | 'renamed' | 'removed' | 'archived' | 'app-url-changed';
  occurredAt: string;
  detail?: string;
}
```

Le journal local enregistre uniquement les changements produits par la comparaison de deux synchronisations complètes réussies. Le premier import ne génère aucun événement. Les entrées sont isolées par utilisateur, triées de la plus récente à la plus ancienne et limitées aux 500 événements les plus récents par utilisateur.

Chaque entrée relue depuis IndexedDB est validée profondément. Une entrée invalide est ignorée individuellement et comptabilisée. Les regroupements par semaine et par jour sont calculés dans le fuseau local sans modifier la date ISO UTC stockée.

## AppPreferences

```ts
interface AppPreferences {
  schemaVersion: 2;
  username: string;
  hideForks: boolean;
  hideArchived: boolean;
  freshnessMinutes: 5 | 15 | 30 | 60;
  density: 'comfortable' | 'compact';
  reduceMotion: boolean;
  favoriteIds: number[];
  catalogueView: 'grid' | 'list';
}
```

Les préférences sont globales à ce navigateur dans le MVP. Elles sont stockées sous `la-grange-preferences-v2`. Le profil initial est `christolosier-ship-it`. Chaque champ est validé et réparé indépendamment, afin qu’une valeur corrompue ne supprime pas les autres choix valides.

L’ancienne clé `la-grange-catalogue-preferences-v1` est migrée une fois. Les favoris et le mode grille ou liste sont conservés, puis l’ancienne entrée est supprimée lorsque le navigateur l’autorise.

Masquer les forks ou archives ne modifie jamais `SyncSnapshot`. Ces préférences s’appliquent uniquement aux sélecteurs des listes. Une fiche directe reste accessible. La réduction du mouvement effective correspond au choix utilisateur **ou** au réglage système `prefers-reduced-motion`.

La recherche, les filtres, le tri et le contexte de retour restent sérialisés dans le hash de l’URL. Ils ne sont pas dupliqués dans les préférences.

## Diagnostics locaux

Le diagnostic copiable n’est pas un export de données. Il contient uniquement version, profil, état réseau, état et date de synchronisation, compteurs du cache, préférences effectives et messages utilisateur des erreurs. Il exclut les tokens, stacks, descriptions, README et contenus complets d’IndexedDB.

## Versionnement

Toute modification incompatible du stockage augmente `schemaVersion` et fournit une migration testée. La version de la base IndexedDB est distincte du schéma des objets. La Phase 5 ne modifie pas la version de la base, car les stores et index nécessaires existaient déjà.
