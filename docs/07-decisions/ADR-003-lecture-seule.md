# ADR-003 — Lecture seule

- **Statut** : accepté
- **Date** : 2026-07-28

## Contexte

La Grange est conçue comme une porte d’entrée et une galerie, pas comme un outil de gestion GitHub.

## Décision

Le MVP ne réalise aucune écriture distante : pas d’issue, de PR, de label, de commentaire, de release ou de modification de repo.

## Raisons

- sécurité maximale sans authentification ;
- interface plus simple ;
- absence de responsabilité destructive ;
- distinction claire avec GitHub ;
- cohérence avec « pas de pilotage ».

## Conséquences

- les actions ouvrent des destinations externes ;
- aucune connexion n’est nécessaire ;
- les préférences locales ne sont pas synchronisées ;
- toute future écriture exige authentification, autorisations minimales, backend éventuel et nouvel ADR.
