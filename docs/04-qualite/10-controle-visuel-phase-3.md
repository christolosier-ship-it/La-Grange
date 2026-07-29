# Contrôle visuel — Phase 3 Dashboard

## Référence

Le prototype validé reste la cible d’ambiance : atelier sombre et chaleureux, navigation à gauche, poutre de statistiques, cartes illustrées et rail d’informations. La phase 3 applique cette composition avec des données réelles et réserve les textures et assets finaux à la phase 6.

## Contrôle par format

### Smartphone — 390 px

- navigation principale fixée en bas avec quatre destinations textuelles et repères graphiques ;
- statistiques dans un défilement horizontal local, sans scroll global ;
- une carte par ligne ;
- rail d’activité replacé sous les sections principales ;
- boutons et liens d’au moins 44 px ;
- safe areas iOS prises en compte.

### Tablette portrait — 768 px

- rail de navigation à gauche ;
- deux cartes par ligne ;
- note de synchronisation dans le rail ;
- activité et répartition sous les sections centrales ;
- aucune largeur fixe provoquant un débordement.

### Tablette paysage — 1024 px

- rail gauche compact permanent ;
- deux cartes par ligne dans L’établi ;
- statistiques visibles sans défilement ;
- sections et note de synchronisation lisibles sans masquer les actions ;
- cible principale de confort respectée.

### Bureau — 1440 px et plus

- rail de navigation de 15 rem ;
- dashboard central avec rail d’activité interne ;
- deux à trois cartes selon la largeur disponible ;
- largeur maximale de l’application afin d’éviter les lignes trop longues ;
- panneau Nouvelle arrivée prioritaire dans le rail droit.

## États contrôlés

- cache disponible pendant synchronisation ;
- premier lancement sans cache ;
- hors ligne avec et sans cache ;
- erreur GitHub avec et sans cache ;
- avertissement d’override ;
- inventaire vide ;
- section L’établi vide ;
- section Prêts à partir vide ;
- aucune nouvelle arrivée ;
- couverture absente ou en erreur ;
- nom et description longs ;
- projet archivé ;
- projet nouvellement détecté.

## Différences volontaires avec le prototype

- aucune progression ou métrique décorative ;
- aucun total global de commits, branches ou releases ;
- l’activité est formulée comme « détectée » à partir des dates publiques ;
- les couvertures finales et textures détaillées restent prévues en phase 6 ;
- les cartes centrales évitent les doublons, tandis que le rail d’activité peut référencer les mêmes projets sous forme de résumé factuel.

## Preuves automatisées

- `dashboard-selectors.test.ts` : statistiques, distribution, sélection et absence de doublon central ;
- `project-card.test.ts` : actions sûres, lazy loading, dimensions, fallback et états ;
- `dashboard-view.test.ts` : rendu nominal, nouvelle arrivée, hors ligne, erreur, inventaire vide et synchronisation manuelle ;
- `router.integration.test.ts` : navigation, focus et rafraîchissement depuis le store.
