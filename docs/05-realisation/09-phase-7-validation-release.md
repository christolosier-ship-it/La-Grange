# Phase 7 — Validation et release

## Objectif

Prouver que le MVP est stable avant la version 1.0.0.

## Audit

1. revue du périmètre ;
2. audit architecture ;
3. audit sécurité ;
4. exécution complète des tests ;
5. contrôle accessibilité ;
6. contrôle performance ;
7. contrôle PWA et hors ligne ;
8. test API limitée ;
9. test nouveau repo réel ou fixture de bout en bout ;
10. test iPad, iPhone et bureau ;
11. vérification documentation ;
12. inspection du bundle.

## Préparation release

- mettre à jour version et changelog ;
- générer build propre ;
- publier via GitHub Actions ;
- vérifier l’URL publique ;
- créer tag `v1.0.0` ;
- conserver artefact de build ou commit traçable ;
- documenter le rollback.

## Go / No-Go

No-Go si perte de cache, secret, problème d’installation, navigation cassée, nouveau dépôt non détecté, contraste bloquant ou échec de CI.

## Après publication

Effectuer une vérification de fumée, surveiller les erreurs manuellement et ne lancer aucune extension fonctionnelle avant correction des anomalies de release.
