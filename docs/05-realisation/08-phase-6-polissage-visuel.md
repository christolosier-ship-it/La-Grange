# Phase 6 - Identité visuelle et personnalisation progressive

## Statut

Phase active. Les fondations 6A sont intégrées. La seule étape actuellement spécifiée est 6B. Les personnalisations suivantes seront définies plus tard par le propriétaire et ne doivent pas être anticipées.

## Objectif

Transformer La Grange en atelier illustré cohérent sans perdre les données réelles, le cache-first, l’accessibilité et les performances.

## Référence

`docs/assets/phase-6/reference-dashboard-grange.webp`

La référence fournit l’ambiance, les matières et la profondeur. Elle ne fournit pas les données, l’ordre des sections ni un contrat pixel-perfect.

## Principes

- WebP pour matières, skins, bandeaux et couvertures ;
- HTML/CSS pour structure, textes, états et progression ;
- SVG pour les icônes fonctionnelles ;
- aucune donnée fonctionnelle rasterisée ;
- aucun secret dans le client ;
- aucun asset distant ;
- fallback pour chaque élément critique ;
- tablette paysage et bureau comme cibles 6B ;
- Phase 7 conservée après clôture de la Phase 6.

## Phase 6A - Fondations réalisées

- enseigne responsive ;
- fond général de La Grange ;
- lumière ;
- texture structurelle ;
- navigation principale ;
- iconographie de synchronisation et d’état ;
- focus visible ;
- fallbacks du shell.

Les preuves G15 documentent cette étape.

## Phase 6B - Dashboard, cartes et personnalisation

Source UX/UI exacte :

`docs/02-ux-ui/12-contrat-dashboard-phase-6b.md`

Source technique :

`docs/03-technique/13-personnalisation-github.md`

### Shell et composition

- rail gauche fixe ;
- marque, navigation et synchronisation dans le rail ;
- version et état administrateur en bas ;
- contenu principal défilant ;
- bandeau supérieur WebP avec quatre statistiques HTML ;
- une seule grille continue ;
- aucun en-tête de section ;
- aucun lien « Voir tout l’inventaire » ;
- aucun rail droit ;
- aucun fond local derrière les cartes.

### Cartes

Chaque carte expose :

1. GitHub ;
2. application ;
3. README ;
4. détail ;
5. personnalisation ;
6. progression manuelle facultative ;
7. dernière activité ;
8. style ;
9. version ;
10. couverture.

Les cinq actions restent alignées. Les infobulles fonctionnent au survol et au focus.

### Administration

- modale ;
- aperçu ;
- couverture ;
- style ;
- palette ;
- progression ;
- version manuelle ;
- authentification GitHub ;
- GitHub App limitée à `La-Grange` ;
- Netlify Functions ;
- branche, commit et PR automatiques ;
- fusion manuelle ;
- déploiement puis mise à jour PWA.

### Hors périmètre 6B

- redesign du catalogue ;
- redesign de la fiche projet ;
- redesign de l’activité ;
- redesign complet des paramètres ;
- expérience smartphone dédiée ;
- autres types de personnalisation ;
- fusion automatique des PR ;
- modification de données GitHub factuelles.

Ces sujets ne sont affectés à aucune étape future tant que le propriétaire ne les a pas cadrés.

## Production

1. fusionner la documentation 6B ;
2. geler les SVG C01 à C10 produits selon l’ancien contrat ;
3. produire et valider le master 6B ;
4. produire les skins et le bandeau WebP ;
5. produire les icônes manquantes ;
6. produire les couvertures prioritaires ;
7. implémenter l’architecture serveur et la modale ;
8. intégrer le dashboard ;
9. produire les planches d’acceptation ;
10. corriger les P1/P2 ;
11. fusionner après validation humaine.

## Critères de sortie 6B

- composition conforme au contrat ;
- aucune boîte de section ;
- cartes directement sur le fond général ;
- cinq actions fonctionnelles ;
- progression honnête ;
- version conforme ;
- styles cohérents ;
- personnalisation protégée ;
- PR automatique sans fusion ;
- mêmes données sur deux appareils après déploiement ;
- responsive tablette paysage et bureau ;
- zoom 200 % ;
- images bloquées ;
- hors ligne ;
- budgets tenus ;
- aucun P1/P2.

## Fin de Phase 6

La fin globale n’est pas déclarée par la seule fin de 6B. Elle intervient lorsque le propriétaire indique que toutes les étapes de personnalisation souhaitées ont été cadrées et réalisées. La Phase 7 reste inchangée jusque-là.
