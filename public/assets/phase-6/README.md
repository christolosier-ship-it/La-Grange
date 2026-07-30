# Assets Phase 6

## Source de vérité

Le catalogue canonique est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Il fixe les identifiants, noms finaux, formats, dimensions et statuts.

## Arborescence autorisée

Tous les nouveaux fichiers runtime sont intégrés manuellement **à plat** dans :

`public/assets/phase-6/`

Aucun nouveau sous-dossier par famille ou projet n’est autorisé.

## Fichiers hérités actuellement présents

Les sous-dossiers suivants proviennent de la tentative antérieure à la révision de méthode du 2026-07-30 :

- `brand/` ;
- `shell/` ;
- `components/` ;
- `panels/` ;
- `projects/`.

Leur contenu est **non canonique** : noms, dimensions et chemins ne correspondent pas au registre actif. Ces fichiers :

- ne valident aucune case P, V ou I ;
- ne doivent pas être consommés par une nouvelle intégration ;
- ne doivent pas être renommés artificiellement ;
- restent temporairement présents jusqu’à leur remplacement ;
- seront supprimés manuellement après contrôle des références.

## Règles de production

- un seul asset produit et validé à la fois ;
- nom, format et dimensions définis avant génération ;
- aucun ZIP, Base64, fragment ou workflow de reconstruction ;
- aucun texte fonctionnel rasterisé ;
- fallback testé avant de passer à l’asset suivant ;
- registre mis à jour après production, validation et intégration.
