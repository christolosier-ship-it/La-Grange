# ADR-006 — IndexedDB pour les données

- **Statut** : accepté
- **Date** : 2026-07-28

## Contexte

La liste, les détails et le journal dépassent la simple préférence. Le stockage doit être structuré, transactionnel et migrable.

## Décision

Utiliser IndexedDB pour les instantanés et détails, et localStorage uniquement pour de petites préférences non critiques.

## Raisons

- transactions ;
- volume adapté aux métadonnées et futurs assets légers ;
- fonctionnement hors ligne ;
- stores séparés ;
- migrations explicites.

## Conséquences

- couche d’accès dédiée ;
- tests avec implémentation simulée ;
- gestion des migrations et des erreurs d’ouverture ;
- l’UI ne dépend jamais directement de l’API IndexedDB.
