# ADR-008 - Absence de backend de consultation

- **Statut** : remplacé pour l’administration par ADR-010
- **Date initiale** : 2026-07-28
- **Révision** : 2026-08-02

## Décision maintenue

La consultation de La Grange reste une application statique dans le navigateur :

- données publiques ;
- cache IndexedDB ;
- PWA ;
- aucune donnée utilisateur envoyée à un serveur métier ;
- aucune authentification nécessaire pour consulter.

## Réouverture validée

La personnalisation commune à plusieurs appareils exige une écriture sécurisée dans le dépôt `La-Grange`. Un secret ne pouvant pas être embarqué dans la PWA, un petit backend de Functions est autorisé par ADR-010.

## Limites du backend

Il ne devient pas une API générale de La Grange. Il sert uniquement :

- l’authentification administrateur ;
- la validation d’une personnalisation ;
- le traitement d’une couverture ;
- la création d’une branche, d’un commit et d’une PR.

Il ne stocke ni inventaire parallèle, ni compte métier, ni données privées des projets.

## Déploiement

Netlify est retenu pour servir le build et les Functions sous une même origine. GitHub Pages peut subsister en lecture seule.
