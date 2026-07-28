# Configuration des overrides

## Emplacement

`public/data/project-overrides.json`

## But

Compléter les données publiques GitHub avec une présentation éditoriale propre à La Grange, sans empêcher l’affichage d’un repo non configuré.

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

## Robustesse

Un fichier invalide ne bloque pas la synchronisation. Les repos s’affichent avec leurs fallbacks, et une erreur de configuration est signalée dans les diagnostics.
