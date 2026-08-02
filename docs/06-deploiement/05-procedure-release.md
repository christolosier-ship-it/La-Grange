# Procédure de release

## Prérequis

- Phase 7 terminée avec Go ;
- aucun P1/P2 ;
- CI verte ;
- documentation à jour ;
- permissions GitHub App contrôlées ;
- Functions testées ;
- assets et overrides validés ;
- rollback vérifié.

## PR de release

Elle contient uniquement les ajustements de version et corrections nécessaires. Elle liste :

- tests ;
- appareils ;
- accessibilité ;
- performance ;
- PWA ;
- sécurité ;
- administration ;
- déploiement de preview ;
- risques résiduels.

## Publication

1. fusionner sur `main` ;
2. attendre le déploiement Netlify ;
3. vérifier l’application publique ;
4. vérifier la session admin ;
5. créer une PR de personnalisation de test sans la fusionner automatiquement ;
6. tester cache et mise à jour ;
7. créer le tag ;
8. créer la release GitHub ;
9. tester l’installation ou la mise à jour sur appareil réel.

## Smoke test

- rail fixe ;
- statistiques ;
- cartes ;
- cinq actions ;
- synchronisation ;
- catalogue et fiche ;
- activité ;
- paramètres ;
- hors ligne ;
- images bloquées ;
- login/logout ;
- modale ;
- refus non-admin ;
- conflit Git ;
- URL de PR ;
- mise à jour multi-appareil.

## Clôture

Documenter toute anomalie. Une correction urgente utilise une branche dédiée, un patch de version et les mêmes contrôles.
