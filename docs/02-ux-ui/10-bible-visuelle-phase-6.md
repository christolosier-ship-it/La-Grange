# Bible visuelle de la Phase 6

## Autorité

Ce document fixe le langage visuel général. Le contrat exact de l’étape courante se trouve dans `12-contrat-dashboard-phase-6b.md`. Le registre des fichiers reste `docs/05-realisation/10-suivi-production-assets-phase-6.md`.

## Phrase de conception

> Une interface de projets fabriquée dans un atelier illustré, où le décor forme la scène et non une succession de conteneurs.

## Matières

- bois structurel sombre pour le fond et le rail ;
- bois de caisse plus chaud pour les cartes ;
- métal patiné pour les attaches ;
- papier réservé aux messages qui le justifient ;
- lumière ambrée commune.

## Règle d’empilement

Le dashboard 6B utilise au maximum :

1. fond général ;
2. rail fixe et bandeau ;
3. cartes ;
4. overlay de modale.

Sont interdits :

- panneau central entourant les cartes ;
- fond secondaire derrière la grille ;
- en-tête de section ;
- rail droit ;
- cartes statistiques séparées ;
- conteneur décoratif autour d’un conteneur fonctionnel.

## Technologies

- WebP : matières, cadres, bandeau, rubans et couvertures ;
- SVG : icônes fonctionnelles uniquement ;
- CSS : grille, progression, badges, couleurs, focus et états ;
- HTML : tous les textes, valeurs et actions.

## Dashboard

- rail gauche fixe ;
- marque en haut ;
- navigation stable ;
- synchronisation dans le rail ;
- version et état administrateur en bas ;
- bandeau de quatre statistiques ;
- grille continue directement sur le fond ;
- défilement limité à la zone principale.

## Carte

La couverture attire, le nom identifie, la version contextualise, la description explique, l’activité date et les cinq actions ouvrent les destinations.

La carte reste un objet matériel, mais ses espaces ne sont pas pré-dessinés comme des boutons figés. Les rails de métadonnées et d’actions sont construits en CSS.

## Styles

Neuf styles génériques :

- style de vie ;
- jeux ;
- productivité ;
- santé ;
- éducation ;
- nature ;
- création ;
- technique et métier ;
- inclassable.

Chaque style fournit une icône, une bannière et trois couleurs. Il ne change pas la structure de la carte.

## Imperfection contrôlée

- textures irrégulières ;
- bords et rivets non parfaitement uniformes ;
- texte et hitbox toujours droits ;
- aucune variation aléatoire au runtime ;
- ombres courtes et cohérentes avec une lumière commune.

## Validation

La référence, le master M06 et les planches 6B sont comparés sur tablette paysage et bureau. Une proposition belle isolément mais incompatible avec les données réelles ou l’accessibilité est rejetée.
