# Performance

## Objectif

La richesse visuelle de 6B ne doit pas transformer le dashboard en planche d’images lourde. Le cache reste affiché immédiatement et l’interface est utilisable avant le chargement des couvertures.

## Budgets

### Shell et dashboard

- une seule variante du fond Phase 6A par viewport ;
- bandeau de statistiques WebP : cible inférieure à 70 Ko ;
- skin de carte standard WebP transparent : cible inférieure à 60 Ko ;
- bannière de style partagée : cible inférieure à 20 Ko si raster ;
- icônes fonctionnelles SVG : cible cumulée inférieure à 40 Ko ;
- aucune grande surface raster dupliquée par carte.

### Projet

- couverture 640 × 400 : 35 à 80 Ko ;
- logo facultatif 512 × 160 : moins de 30 Ko ;
- dimensions réservées ;
- couvertures sous la ligne de flottaison en lazy loading ;
- progression, version et textes en HTML/CSS.

### Administration

- code de la modale chargé à la demande ;
- bibliothèque de recadrage ou d’encodage non incluse dans le chemin critique public si le traitement est serveur ;
- aperçu local avec URL objet libérée à la fermeture ;
- upload maximal documenté et contrôlé.

## Stratégie visuelle

- WebP pour matière, skins, bandeau et couvertures ;
- SVG pour icônes ;
- HTML/CSS pour grille, données, barre de progression et infobulles ;
- aucun SVG complexe utilisé pour simuler du bois ;
- aucun cadre raster complet recréé pour une simple couleur ;
- un skin partagé par variante de carte.

## Layout

- rail gauche fixe sans provoquer deux scrolls verticaux concurrents ;
- contenu principal seul défilant ;
- aucune hauteur injectée après chargement des couvertures ;
- aucun conteneur de section autour de la grille ;
- aucun rail droit ;
- bandeau et cartes alignés par grille CSS stable.

## Mesures obligatoires en PR

- poids CSS et JavaScript avant/après ;
- poids de chaque asset ;
- requêtes initiales ;
- LCP et CLS ;
- cache froid et chaud ;
- tablette paysage et bureau ;
- zoom 200 % ;
- grille avec 18 projets ;
- images bloquées ;
- mode hors ligne ;
- ouverture de la modale ;
- upload nominal et refus d’un fichier excessif.

Tout dépassement est mesuré et approuvé avant fusion.
