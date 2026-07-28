# Responsive design

## Approche

Conception mobile-first avec enrichissement progressif. Les ruptures exactes seront déterminées par le contenu, pas par des modèles d’appareil rigides.

## Smartphone

- navigation basse de 4 destinations ;
- une carte par ligne ;
- statistiques en défilement horizontal ;
- fiche en colonne unique ;
- actions principales accessibles près du pouce ;
- aucun rail latéral permanent.

## Tablette portrait

- navigation escamotable ;
- deux cartes par ligne ;
- activité sous les sections principales ;
- hero de fiche compact.

## Tablette paysage

- rail gauche compact ;
- deux ou trois cartes ;
- panneau d’activité facultatif ;
- cible principale de confort.

## Bureau

- rail gauche permanent ;
- zone centrale de 3 à 4 cartes ;
- panneau droit ;
- largeur maximale pour éviter les lignes excessives.

## Règles

- aucune fonction ne disparaît selon la taille ;
- les tableaux sont évités ;
- les zones tactiles font au moins 44 px ;
- le texte peut grossir à 200 % sans perte ;
- les couvertures utilisent `object-fit` et des ratios stables ;
- pas de scroll horizontal global.
