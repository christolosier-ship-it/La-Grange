# Stratégie de tests

## Pyramide

1. tests unitaires nombreux pour les règles et transformations ;
2. tests d’intégration pour synchronisation, cache et routeur ;
3. tests end-to-end ciblés sur les parcours critiques ;
4. contrôles manuels sur appareils réels pour PWA, tactile et accessibilité.

## Outils envisagés

- Vitest pour les tests unitaires et d’intégration ;
- environnement DOM léger pour les composants ;
- Playwright pour les parcours E2E ;
- fixtures JSON représentatives de l’API GitHub ;
- Lighthouse et audits d’accessibilité automatisés en complément.

Les versions exactes seront fixées lors de la phase socle.

## Isolation

Les tests ne dépendent pas de l’API GitHub réelle. Le client HTTP est injecté ou simulé. Les fixtures couvrent pagination, réponse 304, limite API, données nulles et renommage.

## Criticité

Priorité maximale :

- ne pas perdre le cache ;
- ne pas créer de doublon ;
- ne pas exposer de secret ;
- ne pas supprimer des projets après une réponse partielle ;
- pouvoir démarrer hors ligne ;
- conserver des liens sûrs.

## CI

Chaque PR exécute formatage, lint, typecheck, tests, build et tests E2E essentiels. Les audits lourds peuvent être réservés à la branche principale ou aux releases.
