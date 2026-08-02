# Direction artistique

## Intention

La Grange est un atelier numérique nocturne, chaleureux et matériel. Le bois, le métal patiné, le papier et la lumière ambrée forment une scène unique.

## Principe directeur

> Une interface de projets fabriquée dans un atelier illustré, sans sacrifier la compréhension.

La référence conservée dans `docs/assets/phase-6/reference-dashboard-grange.webp` fixe le niveau de matière, de profondeur et d’identité. Elle n’est pas une maquette pixel-perfect.

## Direction 6B

La Phase 6B abandonne l’empilement de panneaux. Le dashboard utilise seulement :

1. le fond général fixe ;
2. le rail gauche fixe ;
3. le bandeau de statistiques ;
4. les cartes projet ;
5. les overlays temporaires, dont la modale.

Il n’existe aucun grand conteneur central, aucun fond derrière la grille, aucun rail droit et aucun en-tête de section.

## Répartition des technologies visuelles

- WebP : fond, bandeau, cadres matériels, rubans, couvertures et détails illustrés ;
- HTML/CSS : textes, données, grille, états, progression, badges et interactions ;
- SVG : icônes fonctionnelles ;
- PNG : halos ou masques seulement lorsqu’un WebP ne convient pas.

Les SVG géométriques C01 à C10 produits dans la tentative précédente ne constituent pas la cible finale.

## Matières

- bois structurel sombre pour le shell ;
- bois plus chaud et détaillé pour les cartes ;
- métal patiné pour les attaches ;
- papier seulement pour les messages qui le justifient ;
- lumière commune à la scène, pas un halo indépendant sur chaque composant.

## Identité des projets

Les projets utilisent neuf styles génériques. Le style agit sur la bannière, l’icône et une palette de trois couleurs. La couverture reste la principale zone narrative. Le nom du projet demeure lisible en HTML, même lorsqu’un logo visuel est présent.

## Garde-fous

- aucun texte fonctionnel uniquement dans une image ;
- aucune progression fictive ;
- aucune texture derrière un long texte sans contraste ;
- aucune perspective déformant les zones interactives ;
- aucun objet décoratif ressemblant à un bouton ;
- aucune personnalisation future inventée sans validation du propriétaire.
