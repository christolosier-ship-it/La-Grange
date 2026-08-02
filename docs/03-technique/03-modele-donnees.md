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
  style: ProjectStyle;
  colors: ProjectColors;
  progress?: number;
  manualVersion?: string;
  resolvedVersion?: string;
  featured: boolean;
  isNew: boolean;
  sortOrder?: number;
}
```

`progress` est une estimation éditoriale manuelle. Elle n’est jamais déduite des commits, issues, branches ou releases.

## ProjectStyle

```ts
type ProjectStyle =
  | 'lifestyle'
  | 'games'
  | 'productivity'
  | 'health'
  | 'education'
  | 'nature'
  | 'creation'
  | 'technical'
  | 'uncategorized';

interface ProjectColors {
  primary: string;
  secondary: string;
  progress: string;
}
```

Chaque style possède un trio de couleurs par défaut et une icône fonctionnelle. Les couleurs personnalisées sont facultatives et doivent conserver les contrastes exigés.

## Configuration éditoriale

Le fichier canonique `public/data/project-overrides.json` utilise un schéma versionné :

```json
{
  "schemaVersion": 3,
  "projects": {
    "Les-Petites-Quetes": {
      "displayName": "Les Petites Quêtes",
      "description": "Quêtes et routines familiales",
      "style": "games",
      "colors": {
        "primary": "#d78a18",
        "secondary": "#f0c55b",
        "progress": "#e99312"
      },
      "progress": 65,
      "manualVersion": "v0.7.1",
      "cover": "assets/phase-6/p6-f02a-les-petites-quetes-cover-640x400.webp"
    }
  }
}
```

Champs modifiables par la modale 6B :

- `style` ;
- `colors.primary` ;
- `colors.secondary` ;
- `colors.progress` ;
- `progress` ;
- `manualVersion` ;
- `cover`.

Les autres champs éditoriaux peuvent exister dans le fichier, mais ne sont pas modifiés par cette modale sans décision ultérieure.

## Règles de fusion

- identité, dates, archive et activité viennent de GitHub ;
- couverture, style, couleurs, avancement et version manuelle viennent des overrides ;
- couleurs absentes : valeurs par défaut du style ;
- `progress` absent : aucune barre ;
- `manualVersion` absente : résolution automatique ;
- configuration invalide : projet conservé avec fallback et diagnostic.

## Résolution de version

Priorité :

1. `manualVersion` non vide ;
2. dernière release stable ;
3. dernière préversion si aucune stable ;
4. aucune version.

Les brouillons sont ignorés et le tag est conservé tel quel. La résolution automatique est mise en cache et ne provoque jamais un appel réseau par carte à chaque rendu. Un artefact généré ou cache serveur, par exemple `public/data/project-releases.json`, peut porter cette donnée factuelle.

## PublicationCustomization

```ts
interface PublicationCustomization {
  projectId: number;
  repositoryName: string;
  baseSha: string;
  overridePatch: ProjectCustomizationPatch;
  coverUpload?: File;
}

interface PublicationResult {
  status: 'validating' | 'creating-branch' | 'creating-pr' | 'ready' | 'failed';
  pullRequestUrl?: string;
  branchName?: string;
  errorCode?: string;
}
```

## Données existantes

`SyncSnapshot`, `ProjectDetails`, `ActivityEvent` et `AppPreferences` conservent leur rôle. Une évolution incompatible de leur stockage exige une migration testée. La configuration éditoriale versionnée dans Git est distincte des préférences locales de confort.
