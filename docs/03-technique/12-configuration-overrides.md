# Configuration des overrides

## Emplacement

`public/data/project-overrides.json`

## But

Compléter les données publiques GitHub avec une présentation éditoriale propre à La Grange, sans empêcher l’affichage d’un dépôt non configuré.

## Structure

```json
{
  "Luma": {
    "displayName": "Luma",
    "description": "Suivi de traitements",
    "category": "applications",
    "cover": "projects/luma/cover.webp",
    "logo": "projects/luma/logo.webp",
    "accent": "firefly",
    "featured": true,
    "appUrl": "https://example.github.io/Luma/",
    "hidden": false,
    "sortOrder": 10
  }
}
```

## Validation

- racine : objet indexé par nom exact de dépôt ;
- propriétés inconnues : rejetées en développement, ignorées avec avertissement en production ;
- `category` : valeur de l’énumération documentée ;
- `cover` et `logo` : chemins relatifs au `base` de l’application ;
- `appUrl` : HTTPS uniquement ;
- `featured`, `hidden` : booléens ;
- `sortOrder` : nombre fini.

## Priorités de fusion

- identité technique, dates et statut GitHub restent issus de GitHub ;
- nom, description éditoriale, catégorie et visuels peuvent être remplacés ;
- `appUrl` override prime sur `homepage` si valide ;
- une valeur vide ne doit pas écraser une valeur GitHub utile sauf intention explicite documentée.

## Phase 6 et assets

La Phase 6 enrichit les visuels sans transformer les overrides en manifest complet d’assets.

### Règles

- `cover` reste le point d’entrée éditorial principal ;
- `logo` reste facultatif ;
- `accent` pilote des tokens documentés, pas une couleur libre injectée directement ;
- un projet sans override reste visible avec son fallback ;
- un chemin invalide ne bloque pas la synchronisation ;
- aucune donnée métier ne doit être encodée dans le nom ou l’image ;
- les assets sont locaux et servis sous le `base` de l’application ;
- les chemins ne doivent pas pointer vers Lovable, un CDN ou un service externe.

### Variantes de taille

L’inventaire Phase 6 recommande des variantes 640 et 960 px. Cette recommandation n’approuve pas automatiquement un changement de schéma JSON.

Trois stratégies sont possibles, dans cet ordre de préférence :

1. un fichier `cover` optimisé suffisamment polyvalent pour les usages existants ;
2. une convention de nommage dérivée par la couche d’assets, documentée et testée ;
3. de nouveaux champs explicites dans le schéma, uniquement après mise à jour du modèle, du validateur, des tests et de la documentation.

Aucun composant ne doit deviner silencieusement un chemin non documenté.

### Couleur d’accent

`accent` référence une clé de palette définie par le design system. La clé fournit des couleurs de texte, fond, bordure et état atténué avec contraste contrôlé.

Une valeur d’accent inconnue retombe sur l’accent par défaut et produit au plus un avertissement de diagnostic.

### Provenance

Les overrides ne stockent pas la provenance ou la licence de l’asset. Ces informations sont conservées dans le manifest documentaire ou généré prévu par `docs/02-ux-ui/11-inventaire-assets-phase-6.md`.

## Robustesse

Un fichier invalide ne bloque pas la synchronisation. Les dépôts s’affichent avec leurs fallbacks, et une erreur de configuration est signalée dans les diagnostics.

La Phase 6 doit tester au minimum :

- fichier absent ;
- JSON invalide ;
- propriété inconnue ;
- couverture absente ;
- logo absent ;
- accent inconnu ;
- chemin cassé ;
- projet renommé ;
- projet sans override ;
- toutes les images bloquées.