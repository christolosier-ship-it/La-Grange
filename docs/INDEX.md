# Index documentaire

Cette documentation est la source de vérité de La Grange.

## Ordre de lecture recommandé

1. **Fondations** : vision, limites et vocabulaire.
2. **Produit** : utilisateurs, parcours et règles métier.
3. **UX/UI** : vues, composants, responsive et accessibilité.
4. **Technique** : architecture, données, GitHub, cache et PWA.
5. **Qualité** : tests et critères de sortie.
6. **Réalisation** : ordre des phases et livrables.
7. **Déploiement** : publication et retour arrière.
8. **Décisions** : raisons des choix structurants.
9. **Génération IA** : prompts et garde-fous pour réaliser le projet.

## Source de vérité en cas de conflit

1. ADR accepté le plus récent ;
2. règles métier ;
3. spécification de la vue ou du composant ;
4. document de phase ;
5. README.

Exception Phase 6 : `05-realisation/10-suivi-production-assets-phase-6.md` prime pour tous les contrats d’assets, notamment les identifiants, noms de fichiers, formats, dimensions, `viewBox`, transparences, usages, fallbacks, budgets, sources, provenances, droits, priorités, statuts et ordre de production.

L’ADR-009 fixe la gouvernance et l’exception transitoire des prototypes hérités. Le registre fixe ensuite le contrat précis de chaque fichier. Un document secondaire ne peut ni créer une variante implicite, ni élargir un budget, ni valider un statut absent du registre.

Un conflit documentaire doit être corrigé avant d’implémenter. Il ne doit pas être arbitré silencieusement dans le code.

## Dossier de cadrage Phase 6

Avant toute production ou modification visuelle, lire dans cet ordre :

1. [`02-ux-ui/01-direction-artistique.md`](02-ux-ui/01-direction-artistique.md) ;
2. [`02-ux-ui/03-specification-vues.md`](02-ux-ui/03-specification-vues.md) ;
3. [`02-ux-ui/04-specification-composants.md`](02-ux-ui/04-specification-composants.md) ;
4. [`02-ux-ui/05-design-system.md`](02-ux-ui/05-design-system.md) ;
5. [`02-ux-ui/06-responsive-design.md`](02-ux-ui/06-responsive-design.md) ;
6. [`02-ux-ui/07-animations.md`](02-ux-ui/07-animations.md) ;
7. [`02-ux-ui/09-accessibilite.md`](02-ux-ui/09-accessibilite.md) ;
8. [`02-ux-ui/10-bible-visuelle-phase-6.md`](02-ux-ui/10-bible-visuelle-phase-6.md) ;
9. [`02-ux-ui/11-inventaire-assets-phase-6.md`](02-ux-ui/11-inventaire-assets-phase-6.md) ;
10. [`03-technique/11-performance.md`](03-technique/11-performance.md) ;
11. [`04-qualite/14-checklist-phase-6.md`](04-qualite/14-checklist-phase-6.md) ;
12. [`05-realisation/08-phase-6-polissage-visuel.md`](05-realisation/08-phase-6-polissage-visuel.md) ;
13. [`05-realisation/10-suivi-production-assets-phase-6.md`](05-realisation/10-suivi-production-assets-phase-6.md) ;
14. [`07-decisions/ADR-009-github-source-verite-production-assets.md`](07-decisions/ADR-009-github-source-verite-production-assets.md) ;
15. [`08-generation-ia/08-prompt-phase-6.md`](08-generation-ia/08-prompt-phase-6.md) ;
16. [`08-generation-ia/13-protocole-production-assets-phase-6.md`](08-generation-ia/13-protocole-production-assets-phase-6.md).

Référence visuelle :

[`assets/phase-6/reference-dashboard-grange.webp`](assets/phase-6/reference-dashboard-grange.webp)

## Gouvernance de la Phase 6

- GitHub et la documentation restent les sources de vérité ;
- le registre `10-suivi-production-assets-phase-6.md` est l’unique catalogue autorisé ;
- un seul fichier est produit, contrôlé et validé à la fois ;
- une source M ou S est versionnée avant tout dérivé ;
- aucune production en masse sans validation intermédiaire ;
- les nouveaux fichiers canoniques sont versionnés à plat dans `docs/assets/phase-6/` ou `public/assets/phase-6/` selon leur rôle ;
- I est réservé à la consommation réelle par l’application ;
- les cinq sous-dossiers historiques sont une exception transitoire gelée, sans nouvel ajout, jusqu’au remplacement manuel ;
- les planches G sont produites dans les PR d’intégration et bloquent leur fusion, pas leur démarrage ;
- les ornements P3 restent facultatifs ;
- une branche et une PR par lot d’intégration ;
- budgets, fallbacks, provenances, droits, responsive et accessibilité sont documentés ;
- aucune donnée fictive ;
- aucun P1 ou P2 ouvert avant fusion.

## Gouvernance générale

Chaque PR modifiant le comportement doit identifier les documents impactés. Les décisions structurantes sont immuables sans nouvel ADR. Les documents de phase décrivent un ordre de réalisation, pas une invitation à étendre le périmètre.