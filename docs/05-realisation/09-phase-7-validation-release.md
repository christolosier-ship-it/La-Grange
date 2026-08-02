# Phase 7 - Validation et release

## Statut

Conservée. Non démarrée.

## Objectif

Prouver que La Grange est stable, cohérente, sécurisée, accessible et publiable en version 1.0.0. La Phase 7 n’ajoute aucune personnalisation UI/UX.

## Prérequis

- clôture explicite de toute la Phase 6 par le propriétaire ;
- toutes les PR Phase 6 fusionnées ;
- contrats UX/UI alignés avec l’application ;
- registre d’assets clôturé ;
- documentation à jour ;
- administration sécurisée ;
- budgets mesurés ;
- aucun P1 ou P2 ;
- `main` contrôlé.

## Audit

1. produit et périmètre ;
2. architecture ;
3. sécurité de la GitHub App et des Functions ;
4. lecture publique GitHub ;
5. création de PR de personnalisation ;
6. conflits et erreurs ;
7. modèle de données et migrations ;
8. tests complets ;
9. accessibilité ;
10. performance ;
11. PWA et hors ligne ;
12. responsive décidé pendant la Phase 6 ;
13. images bloquées ;
14. fallbacks ;
15. conformité des assets ;
16. déploiement Netlify canonique ;
17. solution de repli GitHub Pages si conservée ;
18. documentation ;
19. rollback ;
20. audit du bundle et des secrets.

## Preuves

- captures finales des vues ;
- planches de fallbacks ;
- résultats de contraste ;
- résultats clavier et lecteur d’écran ;
- poids et requêtes ;
- LCP et CLS ;
- tests cache froid et chaud ;
- test hors ligne ;
- test de personnalisation sur deux appareils ;
- PR de test sans fusion automatique ;
- contrôle des permissions GitHub App ;
- export final du registre.

## Go / No-Go

No-Go si :

- secret exposé ;
- utilisateur non autorisé capable d’écrire ;
- mutation hors liste blanche ;
- commit direct sur `main` ;
- fusion automatique ;
- perte de cache ;
- navigation cassée ;
- fallback cassé ;
- contraste bloquant ;
- régression hors ligne ;
- personnalisation incohérente entre appareils ;
- donnée fictive ;
- budget non approuvé ;
- vue majeure non validée ;
- P1 ou P2 ouvert ;
- CI non verte.

## Release

- mettre à jour version et changelog ;
- générer le build ;
- déployer l’application canonique ;
- vérifier l’URL ;
- vérifier les Functions ;
- créer le tag `v1.0.0` ;
- documenter le rollback ;
- vérifier le service worker ;
- contrôler l’installation PWA ;
- effectuer une vérification de fumée après publication.
