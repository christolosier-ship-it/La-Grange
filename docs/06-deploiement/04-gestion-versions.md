# Gestion des versions

## Produit

Semantic Versioning : `MAJOR.MINOR.PATCH`.

La valeur canonique de La Grange reste définie une seule fois et affichée en bas du rail gauche.

## Versions des projets

La version affichée sur une carte n’est pas la version de La Grange. Elle suit :

1. version manuelle de l’override ;
2. release stable ;
3. préversion ;
4. aucune.

Le texte du tag est conservé.

## Configuration

`project-overrides.json` possède son propre `schemaVersion`. Une évolution incompatible exige validation, migration et tests.

## API admin

Les contrats des Functions sont versionnés lorsque leur format change. Le client et le serveur doivent être compatibles pendant un déploiement progressif.

## PWA

La version du cache reste distincte de la version produit. Elle change lorsque les ressources précachées ou la stratégie l’exigent.

## Tags et changelog

- tag `vX.Y.Z` après validation sur `main` ;
- changelog mis à jour dans chaque PR ;
- une PR de personnalisation n’augmente pas obligatoirement la version produit ;
- une modification de code ou de schéma suit la politique normale.
