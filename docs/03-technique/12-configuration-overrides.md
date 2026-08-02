# Configuration des overrides

## Emplacement

`public/data/project-overrides.json`

## Autorité

Ce fichier versionné dans `La-Grange` est la source commune de personnalisation sur tous les appareils. Les préférences locales de confort ne remplacent pas cette configuration.

## Schéma

```json
{
  "schemaVersion": 3,
  "projects": {
    "BibiLeaf": {
      "displayName": "BibiLeaf",
      "description": "Entretien des plantes",
      "style": "nature",
      "colors": {
        "primary": "#5f8f2f",
        "secondary": "#b8d76c",
        "progress": "#76b82a"
      },
      "progress": 40,
      "manualVersion": "v1.4.0",
      "cover": "assets/phase-6/p6-f03a-bibileaf-cover-640x400.webp",
      "logo": "assets/phase-6/p6-f03c-bibileaf-logo-512x160.webp",
      "featured": true,
      "appUrl": "https://example.invalid/",
      "hidden": false,
      "sortOrder": 30
    }
  }
}
```

## Champs Phase 6B

La modale peut modifier uniquement :

- `style` ;
- `colors.primary` ;
- `colors.secondary` ;
- `colors.progress` ;
- `progress` ;
- `manualVersion` ;
- `cover`.

Elle ne modifie pas le nom du dépôt, son URL GitHub, l’URL du README, ses dates ou son état d’activité.

## Validation

- `schemaVersion` exact ;
- racine `projects` indexée par nom exact de dépôt ;
- propriétés inconnues rejetées côté serveur ;
- style dans la liste des neuf valeurs ;
- couleurs au format autorisé et contraste contrôlé ;
- progression entière entre 0 et 100 ;
- version manuelle courte, sans HTML ;
- chemin de couverture local, canonique et inscrit au registre ;
- URL d’application HTTPS ;
- nombres finis ;
- booléens stricts.

## Valeurs par défaut

- style absent : `uncategorized` ;
- couleurs absentes : palette du style ;
- progression absente : barre non rendue ;
- version manuelle absente : release GitHub résolue ;
- couverture absente : fallback ;
- logo absent : nom HTML.

## Publication

La modale ne modifie jamais ce fichier directement depuis le navigateur. Elle soumet un patch à la Function sécurisée, qui relit le document canonique, applique le patch validé et crée une PR.

## Robustesse

Un fichier absent ou invalide ne bloque pas la synchronisation. Les projets restent visibles avec leurs fallbacks et un diagnostic explicite. Une configuration plus récente n’est jamais écrasée silencieusement.
