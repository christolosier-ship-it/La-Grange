# Index documentaire

Cette documentation est la source de vérité de La Grange.

## Ordre de lecture

1. fondations ;
2. produit ;
3. UX/UI ;
4. technique ;
5. qualité ;
6. réalisation ;
7. déploiement ;
8. ADR ;
9. génération IA.

## Priorité en cas de conflit

1. ADR accepté le plus récent ;
2. règles métier ;
3. contrat de vue ou de composant validé ;
4. conception technique ;
5. document de phase ;
6. registre opérationnel pour les assets ;
7. README.

Un conflit doit être corrigé avant implémentation.

## État des phases

- Phases 1 à 5 : implémentées ;
- Phase 6A : fondations visuelles intégrées ;
- Phase 6B : dashboard et personnalisation définis ;
- suite de Phase 6 : volontairement non définie ;
- Phase 7 : conservée pour l’audit et la release.

Aucun document ne doit réintroduire une étape Phase 6 future sans décision du propriétaire.

## Dossier Phase 6B

Lire dans cet ordre :

1. [`02-ux-ui/01-direction-artistique.md`](02-ux-ui/01-direction-artistique.md) ;
2. [`02-ux-ui/10-bible-visuelle-phase-6.md`](02-ux-ui/10-bible-visuelle-phase-6.md) ;
3. [`02-ux-ui/12-contrat-dashboard-phase-6b.md`](02-ux-ui/12-contrat-dashboard-phase-6b.md) ;
4. [`02-ux-ui/04-specification-composants.md`](02-ux-ui/04-specification-composants.md) ;
5. [`02-ux-ui/05-design-system.md`](02-ux-ui/05-design-system.md) ;
6. [`02-ux-ui/06-responsive-design.md`](02-ux-ui/06-responsive-design.md) ;
7. [`02-ux-ui/09-accessibilite.md`](02-ux-ui/09-accessibilite.md) ;
8. [`02-ux-ui/11-inventaire-assets-phase-6.md`](02-ux-ui/11-inventaire-assets-phase-6.md) ;
9. [`03-technique/01-architecture-systeme.md`](03-technique/01-architecture-systeme.md) ;
10. [`03-technique/03-modele-donnees.md`](03-technique/03-modele-donnees.md) ;
11. [`03-technique/10-securite.md`](03-technique/10-securite.md) ;
12. [`03-technique/11-performance.md`](03-technique/11-performance.md) ;
13. [`03-technique/12-configuration-overrides.md`](03-technique/12-configuration-overrides.md) ;
14. [`03-technique/13-personnalisation-github.md`](03-technique/13-personnalisation-github.md) ;
15. [`04-qualite/14-checklist-phase-6.md`](04-qualite/14-checklist-phase-6.md) ;
16. [`05-realisation/08-phase-6-polissage-visuel.md`](05-realisation/08-phase-6-polissage-visuel.md) ;
17. [`05-realisation/10-suivi-production-assets-phase-6.md`](05-realisation/10-suivi-production-assets-phase-6.md) ;
18. [`05-realisation/11-phase-6b-dashboard-personnalisation.md`](05-realisation/11-phase-6b-dashboard-personnalisation.md) ;
19. [`06-deploiement/07-deploiement-netlify.md`](06-deploiement/07-deploiement-netlify.md) ;
20. [`07-decisions/ADR-009-github-source-verite-production-assets.md`](07-decisions/ADR-009-github-source-verite-production-assets.md) ;
21. [`07-decisions/ADR-010-personnalisation-versionnee-via-github.md`](07-decisions/ADR-010-personnalisation-versionnee-via-github.md) ;
22. [`08-generation-ia/13-protocole-production-assets-phase-6.md`](08-generation-ia/13-protocole-production-assets-phase-6.md).

Référence visuelle :

[`assets/phase-6/reference-dashboard-grange.webp`](assets/phase-6/reference-dashboard-grange.webp)

## Gouvernance des assets

- registre unique ;
- A/R pour les sources ;
- P/V/I pour les assets ;
- fichiers canoniques à plat ;
- prototypes hérités gelés ;
- un fichier à la fois ;
- planches après intégration ;
- aucune production pour une étape future non cadrée.

## Gouvernance de l’administration

- GitHub App limitée à `La-Grange` ;
- secret serveur ;
- compte admin autorisé ;
- liste blanche de fichiers ;
- branche et PR ;
- aucune fusion automatique ;
- même configuration sur tous les appareils après déploiement.

## Phase 7

La Phase 7 reste définie dans [`05-realisation/09-phase-7-validation-release.md`](05-realisation/09-phase-7-validation-release.md). Elle ne démarre qu’après clôture explicite de toute la Phase 6.
