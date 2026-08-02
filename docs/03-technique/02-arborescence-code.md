# Arborescence du code

## Cible 6B

```text
src/
├── app/                         démarrage, routes, store
├── core/
│   ├── activity/
│   ├── cache/
│   ├── customization/           types, validation client, état de publication
│   ├── github/                  lecture publique
│   ├── preferences/
│   ├── profile/
│   ├── projects/
│   ├── settings/
│   └── sync/
├── features/
│   ├── dashboard/
│   ├── project-customization/   modale, aperçu, appels API
│   ├── project-detail/
│   ├── activity/
│   └── settings/
├── ui/
│   ├── components/
│   └── layout/
├── styles/
└── utils/

netlify/
└── functions/
    ├── admin-session/
    ├── admin-login/
    ├── admin-logout/
    └── project-customization-pr/

public/
├── assets/phase-6/
└── data/
    ├── project-overrides.json
    └── project-releases.json     si génération retenue
```

## Frontières

- `core/github` ne contient que la lecture publique ;
- `core/customization` ne possède aucun secret ;
- la feature modale parle à une API same-origin ;
- les Functions seules utilisent la GitHub App ;
- le traitement d’image est serveur ;
- aucun composant n’écrit directement dans GitHub ;
- IndexedDB reste inaccessible directement depuis les vues.

## Nommage

- fichiers en kebab-case ;
- types en PascalCase ;
- fonctions en camelCase ;
- routes d’API explicites ;
- fonctions serveur à responsabilité unique ;
- validation partagée seulement si elle n’embarque aucun secret.

## Tests

- tests unitaires dans les modules ;
- tests d’intégration pour la modale ;
- tests Functions avec GitHub simulé ;
- smoke test public séparé du smoke test admin ;
- aucun secret réel requis dans les tests de PR.
