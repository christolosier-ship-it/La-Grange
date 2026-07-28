# ADR-007 — Configuration éditoriale centralisée

- **Statut** : accepté pour le MVP
- **Date** : 2026-07-28

## Contexte

Chaque projet a besoin d’une couverture, d’une catégorie ou d’un nom d’affichage. Lire un fichier `.grange.json` dans chaque dépôt multiplierait les appels API.

## Décision

Centraliser les overrides dans `public/data/project-overrides.json` dans le dépôt La Grange.

## Raisons

- une seule ressource locale ;
- synchronisation globale rapide ;
- contrôle visuel cohérent ;
- nouveau repo visible même sans configuration ;
- maintenance simple.

## Conséquences

- une modification visuelle nécessite une PR dans La Grange ;
- le fichier doit être validé par schéma ;
- les clés utilisent le nom du dépôt, avec rapprochement prudent par identifiant lorsque possible ;
- `.grange.json` reste une piste future si un backend ou un index généré évite les requêtes multiples.
