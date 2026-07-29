# Phase 7 - Validation et release

## Objectif

Prouver que le MVP est stable avant la version 1.0.0.

La Phase 7 ne complète pas la direction artistique. Elle vérifie que la Phase 6 est réellement terminée, performante, accessible et cohérente avec la référence validée.

## Prérequis

- toutes les PR Phase 6 fusionnées ;
- checklist `docs/04-qualite/14-checklist-phase-6.md` clôturée ;
- bible visuelle alignée avec l’implémentation finale ;
- inventaire ou manifest d’assets à jour ;
- captures multi-écrans disponibles ;
- budgets mesurés ;
- aucun P1 ou P2 ouvert ;
- `main` contrôlé directement après le dernier lot.

## Audit

1. revue du périmètre ;
2. audit architecture ;
3. audit sécurité ;
4. exécution complète des tests ;
5. contrôle accessibilité ;
6. contrôle performance ;
7. contrôle PWA et hors ligne ;
8. test API limitée ;
9. test nouveau dépôt réel ou fixture de bout en bout ;
10. test iPad, iPhone et bureau ;
11. vérification documentation ;
12. inspection du bundle ;
13. comparaison avec la référence visuelle Phase 6 ;
14. contrôle de cohérence entre toutes les vues ;
15. fonctionnement avec images bloquées ;
16. audit des fallbacks CSS et SVG ;
17. vérification du manifest et des licences d’assets ;
18. comparaison des budgets avant et après Phase 6 ;
19. contrôle du mouvement réduit et de la densité compacte ;
20. validation des formats 320, 390, 768, 1024, 1440 et 1920 px.

## Audit visuel final

### Référence

`docs/assets/phase-6/reference-dashboard-grange.webp`

La comparaison porte sur :

- reconnaissance immédiate de l’atelier ;
- structure en bois et panneaux ;
- lumière ambrée ;
- cartes comme caisses ou cadres ;
- hiérarchie des projets ;
- richesse maîtrisée ;
- cohérence du mobile et du bureau.

Elle ne porte pas sur une reproduction pixel-perfect ni sur les données fictives de l’illustration.

### Preuves

Conserver ou référencer :

- captures des cinq vues en 390, 768, 1024 et 1440 px ;
- captures des principaux fallbacks ;
- captures en densité compacte ;
- captures ou vidéo courte du mouvement normal et réduit ;
- résultats de contraste ;
- poids du shell et des assets ;
- LCP et CLS ;
- liste des écarts visuels acceptés.

## Préparation release

- mettre à jour version et changelog ;
- générer build propre ;
- publier via GitHub Actions ;
- vérifier l’URL publique ;
- créer tag `v1.0.0` ;
- conserver artefact de build ou commit traçable ;
- documenter le rollback ;
- contrôler la version et le cache du service worker ;
- confirmer que la référence documentaire n’est pas incluse dans le runtime ;
- confirmer qu’aucun asset Lovable distant n’est requis.

## Go ou No-Go

No-Go si :

- perte de cache ;
- secret ;
- problème d’installation ;
- navigation cassée ;
- nouveau dépôt non détecté ;
- contraste bloquant ;
- échec de CI ;
- vue majeure restée dans l’ancien langage visuel ;
- donnée fictive ajoutée ;
- fallback cassé ;
- fonctionnement sans images incomplet ;
- asset distant obligatoire ;
- mouvement réduit incomplet ;
- scroll horizontal global ;
- régression de performance non approuvée ;
- provenance ou licence d’un asset non clarifiée ;
- P1 ou P2 ouvert.

## Après publication

Effectuer une vérification de fumée, surveiller les erreurs manuellement et ne lancer aucune extension fonctionnelle avant correction des anomalies de release.

La vérification de fumée comprend le chargement de chaque vue, le mode hors ligne, une carte fallback, une fiche directe, le changement de profil, le mouvement réduit et l’affichage correct de la version publiée.