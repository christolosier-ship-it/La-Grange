# Direction artistique

## Intention

La Grange est un atelier numérique chaleureux, nocturne et accueillant. Le décor s’appuie sur le bois sombre, le papier, le métal patiné et une lumière ambrée. L’ensemble doit évoquer un lieu réel sans reproduire littéralement une ferme.

La Phase 6 transforme l’interface fonctionnelle existante en décor interactif stylisé. Chaque zone doit sembler appartenir à un atelier cohérent, mais conserver la simplicité, la prévisibilité et la lisibilité d’une application moderne.

## Principe directeur

> L’utilisateur entre dans un atelier, mais il utilise toujours une interface.

Le décor raconte. La structure explique. Aucune matière, illustration ou animation ne peut masquer une action, une donnée ou un état.

## Ratio de conception

- 70 % de priorité fonctionnelle : hiérarchie, lisibilité, navigation, états et performance ;
- 30 % de priorité narrative : matière, lumière, profondeur, objets et détails d’ambiance.

Ce ratio exprime une priorité de décision, pas un pourcentage de pixels. Une vue peut sembler très immersive tout en restant fonctionnellement dominée par une grille, des zones de lecture nettes et des contrôles familiers.

## Référence visuelle validée

La référence principale de la Phase 6 est le tableau de bord illustré fourni par le propriétaire du projet et conservé dans :

`docs/assets/phase-6/reference-dashboard-grange.webp`

Cette référence fixe :

- l’impression d’un atelier complet plutôt qu’un simple thème brun ;
- une navigation à gauche intégrée dans une structure en bois ;
- une poutre de statistiques en partie haute ;
- des cartes projets traitées comme des caisses, cadres ou panneaux ;
- une colonne d’activité à droite ;
- des notes et informations secondaires sur papier ;
- une lumière chaude et localisée ;
- une densité visuelle riche mais organisée.

La référence est une cible d’ambiance, pas une spécification pixel-perfect. Les données fictives qu’elle contient, notamment les progressions, commits, releases, branches ou conflits inventés, ne doivent jamais être reproduites dans l’application.

## Niveau de stylisation

Le rendu attendu est stylisé, illustré et tactile. Il n’est ni photoréaliste, ni cartoon.

À rechercher :

- matières simplifiées mais crédibles ;
- usure discrète et répétable ;
- lumière peinte ou simulée avec retenue ;
- silhouettes lisibles ;
- détails visibles surtout sur les grandes surfaces ;
- objets légèrement irréguliers sans déformer les zones interactives.

À éviter :

- bois photographique très contrasté derrière le contenu ;
- accumulation de vis, cordes, outils ou poussière sur chaque composant ;
- perspective forcée qui déforme les textes ;
- effet jeu vidéo au détriment de l’ergonomie ;
- textures générées différentes sur chaque écran sans langage commun.

## Piliers visuels

### 1. Structure en bois

Le bois porte la scène, les grands cadres, les séparateurs et certaines cartes. Il doit être sombre, chaud et peu saturé. Le veinage reste secondaire.

### 2. Métal patiné

Le métal souligne les bordures, plaques, attaches, vis et actions secondaires. Il apporte du contraste sans transformer l’interface en univers industriel froid.

### 3. Papier utile

Le papier accueille les messages, notes, états vides, diagnostics courts et informations secondaires. Un fond papier doit toujours présenter une zone de lecture calme.

### 4. Lumière ambrée

La lumière organise la profondeur. Elle éclaire les zones importantes, réchauffe les matériaux et peut signaler une synchronisation. Elle ne doit jamais réduire le contraste ni clignoter.

### 5. Identités de projet

Les projets sont plus colorés que le shell. Leur couverture, leur logo et leur accent peuvent sortir de la palette de l’atelier, à condition de rester encadrés par des surfaces cohérentes.

## Métaphore des objets

Les composants conservent leur rôle sémantique tout en adoptant une apparence physique :

- shell : charpente de l’atelier ;
- navigation : panneau mural ou liste d’étagères ;
- carte projet : caisse, cadre ou fiche d’atelier ;
- statistique : plaque ou compteur fixé à une poutre ;
- badge : étiquette, ruban ou plaque courte ;
- panneau d’information : planche, papier ou vitre sombre ;
- bouton principal : plaque ou commande clairement actionnable ;
- état vide : emplacement libre, caisse manquante ou note explicative ;
- modale : panneau au premier plan, jamais une pièce entière du décor.

La métaphore ne doit jamais modifier les libellés métier, l’ordre de tabulation, la taille des zones tactiles ou la compréhension d’un contrôle.

## Profondeur et couches

La scène utilise quatre couches maximum :

1. arrière-plan de grange très discret ;
2. structure du shell et grands panneaux ;
3. cartes, contenus et contrôles ;
4. overlays, focus et feedback temporaire.

Les ombres servent à séparer ces couches. Elles ne doivent pas produire un empilement de halos flous.

## Typographie

- marque et grands titres : caractère display ou serif local, lisible et modérément expressif ;
- titres d’interface : serif robuste ou sans-serif expressive ;
- corps, métadonnées et contrôles : sans-serif très lisible ;
- chiffres de compteurs : chiffres tabulaires ;
- aucun texte courant ne doit être dessiné dans une image ;
- aucun texte fonctionnel ne doit utiliser une police manuscrite.

## Iconographie

Les icônes fonctionnelles restent des SVG locaux cohérents. Elles peuvent évoquer des outils, plaques ou symboles gravés, mais conservent un trait lisible et une forme simple.

Les objets décoratifs ne remplacent jamais une icône fonctionnelle. Un marteau posé dans le décor ne doit pas être confondu avec un bouton.

## Densité visuelle

La richesse se concentre sur :

- les grands fonds ;
- les cadres de sections ;
- les couvertures de projets ;
- quelques attaches ou ornements récurrents.

Les zones de lecture et les contrôles restent calmes. La densité compacte réduit les espacements et non la taille minimale des cibles.

## Garde-fous

- jamais de texture complexe derrière un long texte sans fond de lecture ;
- pas d’ombre excessive ;
- pas de police décorative pour le corps ;
- pas d’animation permanente ;
- pas de brun sur brun insuffisamment contrasté ;
- pas de métrique ajoutée uniquement pour remplir le décor ;
- pas de commande fonctionnelle uniquement représentée par un objet ambigu ;
- pas de décor qui provoque un scroll horizontal global ;
- les fallbacks doivent rester cohérents même sans aucune image de projet ;
- la réduction de mouvement doit conserver une composition visuelle complète.

## Critère de réussite

Une personne découvrant l’application doit reconnaître immédiatement l’univers de La Grange. Une personne qui l’utilise quotidiennement doit pouvoir ignorer le décor et trouver chaque information aussi vite qu’avant la Phase 6.