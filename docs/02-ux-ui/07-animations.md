# Animations

## Rôle

Les animations expliquent une interaction ou un changement réel. Elles ne créent pas l’ambiance à elles seules et ne déplacent pas la structure fixe du dashboard.

## Phase 6B

Autorisées :

- relèvement léger d’une carte au survol ;
- enfoncement court d’un bouton ;
- apparition et disparition d’une infobulle ;
- ouverture et fermeture de la modale ;
- transition de l’aperçu après modification d’un champ ;
- état de synchronisation ;
- progression de la création de PR ;
- notification de mise à jour disponible.

Interdites :

- mouvement du rail gauche ;
- parallaxe ;
- animation du fond général ;
- défilement automatique ;
- oscillation de ruban ;
- progression décorative ;
- compteur animé ;
- grande ombre animée sur toute la grille ;
- animation permanente de l’état administrateur.

## Durées

- micro-interaction : 100 à 180 ms ;
- infobulle : 120 à 180 ms ;
- modale : 180 à 260 ms ;
- feedback de publication : changement d’état immédiat ou fondu court.

## Réduction du mouvement

Sous `prefers-reduced-motion` ou préférence locale :

- aucune translation ;
- aucune élévation animée ;
- modale affichée directement ou par fondu court ;
- infobulle sans déplacement ;
- états de publication uniquement textuels et iconographiques.

## Accessibilité

- aucune animation nécessaire à la compréhension ;
- aucun changement de focus provoqué par une animation ;
- l’infobulle suit le focus sans le voler ;
- la modale restaure le focus ;
- aucun clignotement ;
- les états occupés sont annoncés indépendamment du mouvement.

## Performance

- privilégier `transform` et `opacity` ;
- éviter les filtres lourds ;
- ne pas animer simultanément toutes les cartes ;
- tester sur iPad paysage et bureau ;
- supprimer toute animation sans bénéfice observable.
