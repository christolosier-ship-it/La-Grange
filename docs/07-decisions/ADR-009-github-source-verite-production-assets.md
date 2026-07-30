# ADR-009 - GitHub et le registre sont les sources de vérité de la production des assets

- **Statut** : accepté pour la Phase 6
- **Date initiale** : 2026-07-29
- **Révision** : 2026-07-30

## Contexte

La première méthode de Phase 6 reposait sur une exploration visuelle externe et une production trop large. Elle a entraîné des variantes difficiles à comparer, des dimensions incohérentes, des noms non stabilisés et une arborescence d’assets trop complexe.

La Phase 6 doit désormais privilégier une production lente, vérifiable et réversible.

La PR historique d’assets a toutefois déjà ajouté cinq sous-dossiers non canoniques dans `public/assets/phase-6/`. Leur suppression immédiate contredirait la décision du propriétaire de les conserver jusqu’au remplacement individuel.

## Décision

GitHub reste l’unique source de vérité du code, des documents, des fichiers versionnés, de la CI et des décisions.

Le fichier suivant est l’unique catalogue autorisé pour les assets :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Il fixe les identifiants, noms, formats, dimensions, transparences, usages, fallbacks, budgets, provenances, droits et statuts.

La production suit obligatoirement ces règles :

1. un seul fichier est produit à la fois ;
2. le nom, le format, les dimensions, l’alpha et le budget sont définis avant la génération ;
3. une source canonique M ou S est approuvée et versionnée avant tout dérivé ;
4. l’asset est contrôlé, versionné puis validé humainement ;
5. les nouveaux assets canoniques sont placés à plat à la racine de `public/assets/phase-6/` ;
6. aucun nouveau sous-dossier n’est autorisé ;
7. aucun ZIP, fragment Base64 ou workflow de reconstruction n’est autorisé ;
8. les prototypes hérités ne sont pas canoniques ;
9. un prototype hérité n’est supprimé qu’après son remplacement validé et le contrôle des références ;
10. le statut I est réservé à la consommation réelle du fichier par l’application ;
11. les planches sont des preuves d’acceptation produites dans les PR d’intégration, pas des prérequis de démarrage.

## Exception transitoire gelée

Les sous-dossiers historiques suivants peuvent rester temporairement présents :

- `brand/` ;
- `components/` ;
- `panels/` ;
- `projects/` ;
- `shell/`.

Cette exception est strictement transitoire :

- aucun nouveau fichier n’y est ajouté ;
- aucun fichier canonique n’y est produit ;
- leur contenu ne valide aucun statut R, P, V ou I ;
- ils sont supprimés manuellement, fichier par fichier, après remplacement ;
- tous les nouveaux fichiers suivent immédiatement la règle du dossier plat.

L’existence temporaire de ces sous-dossiers n’autorise aucune nouvelle arborescence.

## Raisons

- limiter les dérives de périmètre ;
- rendre chaque livrable comparable à la référence ;
- empêcher les erreurs de dimensions et de nommage ;
- rendre les budgets et droits vérifiables ;
- éviter les transferts binaires complexes ;
- garder une arborescence cible simple ;
- préserver la traçabilité ;
- permettre un rollback fichier par fichier ;
- dissocier clairement source, production, validation et intégration ;
- respecter la décision de suppression manuelle des prototypes hérités.

## Conséquences positives

- chaque fichier possède un contrat précis ;
- la validation humaine intervient tôt ;
- les fichiers canoniques sont nommés, dimensionnés, budgétés et traçables ;
- les erreurs restent locales à un seul fichier ;
- les anciennes tentatives sont remplacées progressivement ;
- le registre reflète l’état réel ;
- les PR d’intégration disposent de preuves d’acceptation observables.

## Conséquences négatives

- la production est plus lente ;
- les lots visuels sont plus petits ;
- davantage de validations intermédiaires sont nécessaires ;
- les variantes non prévues attendent une modification documentaire ;
- l’arborescence n’est pas physiquement plate tant que tous les prototypes hérités ne sont pas remplacés.

## Alternatives rejetées

### Production de masse

Rejetée car elle reporte trop tard les erreurs de direction, dimensions, droits et cohérence.

### Nouvelle arborescence par familles et projets

Rejetée pour la Phase 6 afin de conserver un dossier runtime unique, visible et simple à gérer manuellement.

### Suppression immédiate des sous-dossiers hérités

Rejetée car elle contredirait la décision du propriétaire et supprimerait des prototypes avant leur remplacement.

### Intégration fonctionnelle avant validation

Rejetée car la présence d’un fichier dans le dépôt ne constitue pas une preuve de qualité, et sa consommation par le code doit rester un état distinct.

## Réversibilité

La règle du dossier plat pourra évoluer uniquement via un nouvel ADR, après la Phase 6 et avec un plan de migration explicite. L’exception transitoire disparaît automatiquement lorsque le dernier prototype hérité est remplacé et supprimé manuellement.