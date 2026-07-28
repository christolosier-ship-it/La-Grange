# Arborescence du code

```text
src/
├── app/          démarrage, routeur, store
├── core/
│   ├── github/   accès REST et DTO
│   ├── projects/ modèle et règles
│   ├── cache/    IndexedDB et préférences
│   └── sync/     orchestration
├── features/     vues fonctionnelles
├── ui/
│   ├── components/
│   └── layout/
├── styles/       tokens et styles transversaux
└── utils/        fonctions génériques sans métier
```

## Règles

- un module métier ne dépend pas d’une vue ;
- `utils` ne devient pas un tiroir fourre-tout ;
- les composants génériques ne connaissent pas GitHub ;
- une feature peut assembler des composants mais pas contourner les services ;
- les types GitHub bruts restent dans `core/github` ;
- le modèle `Project` est défini dans `core/projects` ;
- les fichiers CSS de feature ne redéfinissent pas les tokens globaux.

## Nommage

- fichiers en kebab-case ;
- types et classes en PascalCase ;
- fonctions et variables en camelCase ;
- constantes réellement globales en UPPER_SNAKE_CASE ;
- événements nommés au passé pour un fait, à l’infinitif pour une commande.
