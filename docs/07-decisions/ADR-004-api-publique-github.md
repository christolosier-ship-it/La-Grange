# ADR-004 — API publique GitHub sans authentification

- **Statut** : accepté pour le MVP
- **Date** : 2026-07-28

## Contexte

Les dépôts concernés sont publics et doivent apparaître automatiquement. Un token dans une PWA publique serait un secret exposé.

## Décision

Utiliser l’API REST GitHub publique sans authentification pour la liste globale, avec cache, pagination, ETag et limitation des appels.

## Raisons

- aucun backend ;
- aucun compte dans La Grange ;
- installation et hébergement simples ;
- exposition limitée aux données déjà publiques.

## Conséquences

- quota plus faible par adresse IP ;
- dépôts privés absents ;
- synchronisation non temps réel ;
- détails chargés à la demande ;
- messages dédiés en cas de limite.

## Évolution

Une GitHub App ou OAuth ne sera envisagée que pour un besoin validé de dépôts privés. Le token ne devra jamais transiter comme variable publique Vite.
