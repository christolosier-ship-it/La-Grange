# Phase 2 — GitHub, données et cache

## Objectif

Afficher des projets réels et fiables à partir de GitHub.

## Travaux

1. définir DTO et modèle `Project` ;
2. implémenter client HTTP et pagination ;
3. gérer en-têtes, ETag et limites ;
4. mapper les repos ;
5. charger et valider les overrides ;
6. calculer activité et fallbacks ;
7. implémenter IndexedDB et migrations ;
8. construire SyncService ;
9. détecter ajout, renommage et disparition ;
10. publier l’état dans le store ;
11. créer feedback de synchronisation ;
12. écrire fixtures et tests complets.

## Données provisoires UI

Une liste technique simple suffit. La mise en scène appartient à la phase 3.

## Critères de sortie

- tous les repos publics présents ;
- pagination prouvée par test ;
- nouveau repo détecté ;
- renommage sans doublon ;
- cache instantané au redémarrage ;
- erreur réseau sans perte ;
- mode hors ligne ;
- pas plus d’un flux global de requêtes ;
- aucune clé ou authentification.
