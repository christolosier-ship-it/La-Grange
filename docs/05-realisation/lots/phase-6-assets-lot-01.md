# Phase 6 - Production des assets - Lot 01

## Statut

Tentative historique non canonique.

Ce lot a servi à explorer l’identité de La Grange avant la stabilisation de la méthode et avant le nouveau contrat 6B du 2026-08-02.

## Autorité

Le registre actif est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Le contrat dashboard actif est :

`docs/02-ux-ui/12-contrat-dashboard-phase-6b.md`

## Décision

- les fondations validées et réellement intégrées en 6A restent canoniques ;
- les masters et couvertures déjà validés restent tracés ;
- les cadres SVG C01 à C10 issus de l’ancienne conception ne sont pas la cible 6B ;
- aucun prototype n’est renommé artificiellement ;
- aucun fichier n’est supprimé avant contrôle des références ;
- les nouveaux skins matériels de carte sont produits en WebP après validation du nouveau master ;
- la branche et la PR d’assets héritées ne doivent pas être fusionnées sous l’ancien contrat.

## Raisons

Les SVG simples reproduisent des contours, dégradés et rivets, mais pas la matière, la patine et la lumière de la référence. Ils figent également des compartiments de données et d’actions qui doivent rester dynamiques en HTML/CSS.

## Remplacement

1. documenter le contrat 6B ;
2. produire un master complet de dashboard ;
3. produire un skin WebP de carte ;
4. produire un bandeau WebP de statistiques ;
5. produire une bannière de style réutilisable ;
6. conserver les icônes fonctionnelles en SVG ;
7. intégrer les données et actions en HTML/CSS ;
8. supprimer les prototypes remplacés après contrôle.
