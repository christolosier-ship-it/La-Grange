# Responsive design

## Cibles produit

La Grange est conçue pour :

- tablette paysage, notamment iPad ;
- bureau standard ;
- grand bureau.

Il n’existe pas de cible mobile dédiée dans la Phase 6B.

## Rail fixe

- largeur indicative : 220 à 270 px ;
- hauteur du viewport ;
- aucun défilement avec la grille ;
- version et état administrateur ancrés en bas ;
- si la hauteur devient insuffisante, le rail privilégie la navigation et la synchronisation avant les éléments décoratifs.

## Zone principale

- défilement vertical indépendant ;
- bandeau de statistiques en tête ;
- grille sans conteneur ;
- deux colonnes sur tablette paysage ;
- trois ou quatre colonnes sur bureau si la largeur minimale de carte est respectée ;
- aucune cinquième colonne ajoutée pour remplir une très grande largeur.

## Formats de contrôle

- 1024 × 768 ;
- 1180 × 820 ou équivalent iPad paysage ;
- 1366 × 1024 ;
- 1440 × 1024 ;
- 1920 × 1080 ;
- zoom 200 %.

## Formats étroits

Sous le seuil de support, la priorité est l’absence de perte de données et d’action. Ce comportement de robustesse n’est pas une composition mobile à valider en 6B et ne doit pas dicter le design tablette ou bureau.

## Règles

- aucune fonction perdue aux formats cibles ;
- cinq actions alignées ;
- aucune carte plus étroite que son contenu ;
- pas de scroll horizontal global aux formats cibles ;
- safe areas iPad respectées ;
- le fond reste le seul arrière-plan de la grille ;
- les ornements disparaissent avant les données ;
- le zoom peut provoquer le repli de la grille, jamais le recouvrement du rail.
