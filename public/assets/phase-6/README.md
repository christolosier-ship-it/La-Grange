# Assets de production Phase 6

Ce dossier ne contient que les assets réellement utilisés par le shell et l’interface 6B.

## Assets intégrés au shell

- enseigne : `p6-a01` à `p6-a04` ;
- fonds : `p6-b01` à `p6-b04` ;
- texture bois : `p6-b07-texture-wood-structure-1024x1024.webp` ;
- lumière principale : `p6-b12-light-main-1600x900.png` ;
- navigation et synchronisation : `p6-d01` à `p6-d05` et `p6-d21` à `p6-d26`.

## Assets intégrés à la Phase 6B

- `p6-c01-project-card-skin-standard-640x960.webp` : skin commun des cartes ;
- `p6-c11-stats-beam-1600x220.webp` : bandeau supérieur ;
- `p6-d06-icon-github.svg` : accès GitHub ;
- `p6-d07-icon-launch-app.svg` : lancement de l’application ;
- `p6-d20-icon-details.svg` : détail du projet ;
- `p6-d42-icon-readme.svg` : accès au README ;
- `p6-d43-icon-customize.svg` : ouverture de la personnalisation.

## Couvertures ajoutées par l’application

Les couvertures validées sont écrites sous :

```text
public/assets/phase-6/covers/<slug>-cover-640x400.webp
```

Elles sont référencées par `public/data/project-overrides.json` et créées uniquement dans une branche de personnalisation accompagnée d’une PR.

## Règles

- nouveaux assets partagés à plat dans ce dossier ;
- couvertures administrateur dans `covers/` ;
- aucun master, planche de validation, ZIP ou doublon runtime ;
- absence de couverture gérée en HTML/CSS ;
- styles, couleurs, badges, progression et séparateurs fonctionnels restent en HTML/CSS ;
- le manifeste décrit uniquement les fichiers partagés présents ;
- les couvertures dynamiques ne sont pas ajoutées manuellement au manifeste.
