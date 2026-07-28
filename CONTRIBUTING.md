# Contribuer à La Grange

## Branches

- `main` doit rester publiable ;
- nouvelles fonctions : `feature/<sujet>` ;
- corrections : `fix/<sujet>` ;
- documentation : `docs/<sujet>` ;
- refactor : `refactor/<sujet>`.

## Commits

Utiliser des messages explicites :

- `feat: add repository synchronization` ;
- `fix: preserve cache after API failure` ;
- `docs: detail project card states` ;
- `test: cover new repository detection`.

## Pull requests

Une PR doit :

- traiter un objectif cohérent ;
- décrire le comportement avant et après ;
- lister les tests réalisés ;
- indiquer les impacts PWA, cache, responsive et accessibilité ;
- mettre à jour les documents concernés ;
- ne contenir aucun secret.

## Revue

La revue vérifie d’abord les règles produit, puis l’architecture, la sécurité, les erreurs, les performances et enfin la finition visuelle. Les écarts majeurs nécessitent une correction avant fusion.
