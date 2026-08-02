# ADR-009 - GitHub et le registre sont les sources de vérité des assets

- **Statut** : accepté
- **Date initiale** : 2026-07-29
- **Révision** : 2026-08-02

## Décision

GitHub conserve :

- documentation ;
- masters ;
- assets ;
- code ;
- statuts ;
- CI ;
- décisions ;
- planches ;
- historique de fusion.

Le registre opérationnel est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

## Cycle

- A : source approuvée ;
- R : source versionnée ;
- P : asset final contrôlé et versionné ;
- V : validation humaine ;
- I : consommation réelle.

## Règles

- un seul élément produit et validé à la fois ;
- contrat fixé avant production ;
- nom, format, dimensions, alpha, budget et fallback exacts ;
- nouveaux fichiers à plat ;
- prototypes hérités gelés ;
- aucun ZIP, Base64 ou reconstruction opaque ;
- texte fonctionnel hors images ;
- planches après intégration ;
- aucune étape UI/UX future ajoutée au registre sans cadrage.

## Révision 6B

La production des cadres de carte passe d’une approche SVG géométrique à une architecture hybride :

- WebP pour matière et skins ;
- HTML/CSS pour structure et données ;
- SVG pour icônes.

Les fichiers C01 à C10 produits selon l’ancien contrat ne sont pas validés par leur simple présence.

## Portée

Le registre contient l’historique 6A et le contrat actif 6B. Les personnalisations ultérieures seront ajoutées au fur et à mesure. La Phase 7 reste un audit, pas un lot d’assets.
