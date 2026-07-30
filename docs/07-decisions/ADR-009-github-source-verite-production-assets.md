# ADR-009 - GitHub et le registre sont les sources de vérité de la production des assets

- **Statut** : accepté pour la Phase 6
- **Date initiale** : 2026-07-29
- **Révision** : 2026-07-30

## Contexte

La première méthode de Phase 6 reposait sur une exploration visuelle externe et une production trop large. Elle a entraîné des variantes difficiles à comparer, des dimensions incohérentes, des noms non stabilisés et une arborescence d’assets trop complexe.

La Phase 6 doit désormais privilégier une production lente, vérifiable et réversible.

## Décision

GitHub reste l’unique source de vérité du code, des documents, des fichiers intégrés, de la CI et des décisions.

Le fichier suivant devient l’unique catalogue autorisé pour les assets :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Il fixe les identifiants, noms, formats, dimensions et statuts.

La production suit obligatoirement ces règles :

1. un seul asset est produit à la fois ;
2. le nom, le format et les dimensions sont définis avant la génération ;
3. l’asset est contrôlé puis validé humainement ;
4. l’intégration est manuelle ;
5. tous les assets runtime sont placés à plat dans `public/assets/phase-6/` ;
6. aucun sous-dossier n’est autorisé ;
7. aucun ZIP, fragment Base64 ou workflow de reconstruction n’est autorisé ;
8. les prototypes hérités ne sont pas canoniques ;
9. un prototype hérité n’est supprimé qu’après son remplacement validé.

## Raisons

- limiter les dérives de périmètre ;
- rendre chaque livrable comparable à la référence ;
- empêcher les erreurs de dimensions et de nommage ;
- éviter les transferts binaires complexes ;
- garder une arborescence simple ;
- préserver la traçabilité ;
- permettre un rollback fichier par fichier ;
- dissocier clairement production, validation et intégration.

## Conséquences positives

- chaque asset possède un contrat précis ;
- la validation humaine intervient tôt ;
- le dépôt ne reçoit que des fichiers nommés et dimensionnés ;
- les erreurs restent locales à un seul asset ;
- les anciennes tentatives peuvent être remplacées progressivement ;
- le registre reflète l’état réel.

## Conséquences négatives

- la production est plus lente ;
- les lots visuels sont plus petits ;
- davantage de validations intermédiaires sont nécessaires ;
- les variantes non prévues doivent attendre une modification documentaire.

## Alternatives rejetées

### Production de masse

Rejetée car elle reporte trop tard les erreurs de direction, de dimensions et de cohérence.

### Arborescence par familles et projets

Rejetée pour la Phase 6 afin de conserver un dossier runtime unique, visible et simple à gérer manuellement.

### Intégration avant validation

Rejetée car la présence d’un fichier dans le dépôt ne constitue pas une preuve de qualité ni de conformité.

## Réversibilité

La règle du dossier plat pourra évoluer uniquement via un nouvel ADR, après la Phase 6 et avec un plan de migration explicite. Les fichiers hérités restent remplaçables individuellement.