# Assets de production Phase 6

Ce dossier reçoit uniquement des fichiers graphiques validés et lisibles par le navigateur.

## Règles

- aucun fragment Base64, ZIP ou workflow de matérialisation ne doit rester dans le dépôt ;
- chaque asset est ajouté sous son nom final puis vérifié avant le suivant ;
- le manifeste décrit uniquement les fichiers réellement présents ;
- `integratedInUi` reste à `false` tant que le code applicatif ne consomme pas l’asset.

## Lot de fondation présent

- `brand/brand-sign.svg` : enseigne vectorielle accessible ;
- `shell/background-workshop.webp` : fond d’atelier 800 × 450 ;
- `components/project-card-frame.webp` : cadre de carte transparent 280 × 416 ;
- `panels/welcome-panel.webp` : panneau décoratif transparent 80 × 124 ;
- `projects/gargotte/cover.webp` : couverture Gargotte 480 × 300 ;
- `projects/gargotte/logo.webp` : logo Gargotte transparent 260 × 78.

## Périmètre

Cette PR ajoute les assets au dépôt sans encore modifier le rendu applicatif. Leur consommation par le shell, les cartes et les overrides fera l’objet d’une PR d’intégration séparée, avec tests responsive et contrôle des fallbacks.
