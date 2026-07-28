# ADR-008 — Absence de backend dans le MVP

- **Statut** : accepté
- **Date** : 2026-07-28

## Contexte

Le besoin principal porte sur des données publiques et une consultation personnelle. Un backend ajouterait hébergement, secrets, maintenance et sécurité.

## Décision

Déployer uniquement des fichiers statiques sur GitHub Pages.

## Raisons

- coût nul ou minimal ;
- disponibilité simple ;
- aucune donnée serveur ;
- maintenance réduite ;
- cohérence avec la lecture seule.

## Conséquences

- pas de webhooks ;
- pas de dépôts privés ;
- pas de synchronisation multi-appareil des préférences ;
- contraintes de quota public ;
- toutes les fonctions doivent pouvoir s’exécuter dans le navigateur.

## Critères de réouverture

Besoin réel d’authentification, de données privées, de webhook ou de traitement serveur impossible côté client. Un backend « pour faire plus pro » n’est pas un motif.
