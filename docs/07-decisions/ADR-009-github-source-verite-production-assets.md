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

Le fichier suivant devient l’unique catalogue opérationnel autorisé pour les assets :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Il fixe les identifiants, noms, formats, dimensions, `viewBox`, transparences, usages, fallbacks, budgets, sources, provenances, droits, dépendances, affectations aux lots, planches d’acceptation, priorités, statuts et ordre de production.

Le cycle de preuve est :

1. **A** : direction ou source M/S approuvée ;
2. **R** : source M/S versionnée sous son nom canonique dans `docs/assets/phase-6/` ;
3. **P** : asset contrôlé et versionné à la racine de `public/assets/phase-6/` ;
4. **V** : asset validé humainement ;
5. **I** : asset réellement consommé par l’application dans un lot 6A à 6E.

La présence d’un asset P/V dans `public/` ne vaut pas intégration fonctionnelle.

Les planches documentaires G utilisent également P/V, mais sont versionnées dans `docs/assets/phase-6/` et ne reçoivent jamais I.

La production suit obligatoirement ces règles :

1. un seul fichier est produit, contrôlé puis validé à la fois ;
2. le contrat complet est défini dans le registre avant la production ;
3. une source S dérivée ne reçoit R que lorsque sa source amont M ou S est elle-même R ;
4. l’asset est contrôlé, versionné à la racine du dossier public puis reçoit P ;
5. la validation humaine donne V, sans donner I ;
6. l’intégration manuelle raccorde ultérieurement le fichier au code et donne I ;
7. tous les nouveaux assets canoniques sont placés à plat dans `public/assets/phase-6/` ;
8. aucun nouveau sous-dossier n’est autorisé ;
9. aucun ZIP, fragment Base64 ou workflow de reconstruction n’est autorisé ;
10. les prototypes hérités ne sont pas canoniques ;
11. un prototype hérité n’est supprimé qu’après son remplacement validé et le contrôle de ses références ;
12. les planches sont des preuves d’acceptation produites dans les PR d’intégration et bloquent leur fusion, pas leur démarrage.

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
- leur contenu ne valide aucun statut A, R, P, V ou I ;
- ils sont supprimés manuellement, fichier par fichier, après remplacement et contrôle des références ;
- tous les nouveaux fichiers suivent immédiatement la règle du dossier plat.

Le `README.md` et le `manifest.json` présents dans `public/assets/phase-6/` sont des traces de la tentative historique : ils ne peuvent attribuer aucun statut A, R, P, V ou I et ne priment jamais sur le registre.

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

Rejetée car la présence seule d’un fichier dans le dépôt ne constitue pas une preuve de qualité. Un fichier peut être versionné pour recevoir P puis V, mais il ne reçoit I qu’après raccord réel au code et contrôles du lot.

## Réversibilité

La règle de la racine canonique plate pourra évoluer uniquement via un nouvel ADR, après la Phase 6 et avec un plan de migration explicite. L’exception héritée reste gelée et prend fin lorsque le dernier prototype est remplacé puis supprimé manuellement.
