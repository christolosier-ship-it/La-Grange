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

Un conflit documentaire doit être corrigé avant d’implémenter. Il ne doit pas être arbitré silencieusement dans le code.

## Dossier de cadrage Phase 6

Avant tout prototype ou changement visuel, lire dans cet ordre :

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
14. [`07-decisions/ADR-009-github-source-verite-prototypage-visuel.md`](07-decisions/ADR-009-github-source-verite-prototypage-visuel.md) ;
15. [`08-generation-ia/08-prompt-phase-6.md`](08-generation-ia/08-prompt-phase-6.md) ;
16. [`08-generation-ia/13-protocole-lovable-phase-6.md`](08-generation-ia/13-protocole-lovable-phase-6.md).

Référence visuelle :

[`assets/phase-6/reference-dashboard-grange.webp`](assets/phase-6/reference-dashboard-grange.webp)

## Gouvernance de la Phase 6

- GitHub reste la source de vérité ;
- Lovable sert au plan et au prototype isolé ;
- le prototype ne remplace jamais le code de production ;
- aucune implémentation globale avant validation humaine de la direction ;
- une branche et une PR par lot ;
- budgets, fallbacks, responsive et accessibilité documentés ;
- aucune donnée fictive pour reproduire la référence ;
- aucun P1 ou P2 ouvert avant fusion.

## Gouvernance générale

Chaque PR modifiant le comportement doit identifier les documents impactés. Les décisions structurantes sont immuables sans nouvel ADR. Les documents de phase décrivent un ordre de réalisation, pas une invitation à étendre le périmètre.
