# Animations

## Rôle

Les animations donnent de la présence à l’atelier et expliquent les changements. Elles ne doivent pas ralentir l’accès.

## Animations autorisées

- fondu et léger déplacement des cartes au premier affichage ;
- expansion d’une fiche depuis une carte lorsque techniquement simple ;
- lueur discrète pendant une synchronisation ;
- glissement d’une nouvelle caisse lors de la détection d’un repo ;
- transition de filtre courte ;
- feedback tactile sur les boutons.

## Durées

- micro-interaction : 100 à 180 ms ;
- transition de panneau : 180 à 280 ms ;
- entrée narrative rare : 300 à 450 ms.

## Interdictions

- parallaxe permanent ;
- particules continues ;
- clignotement ;
- déplacement automatique du contenu après interaction ;
- animation bloquant le clic ;
- son automatique.

## Réduction de mouvement

`prefers-reduced-motion` désactive les translations, remplace les séquences par des fondus très courts et supprime toute animation décorative. Un réglage local permet également de forcer ce mode.
