# Spécification des vues

## Écran de démarrage

Affiche le logo, une phrase courte et un indicateur accessible. Il disparaît dès que le cache est prêt. Il ne doit jamais imposer une durée artificielle.

## Dashboard

### Bureau

- rail gauche de 250 à 290 px ;
- zone centrale fluide ;
- rail droit de 280 à 340 px ;
- grille de 3 ou 4 cartes selon largeur.

### Contenu

- 4 statistiques maximum ;
- L’établi : projets actifs triés par activité ;
- Prêts à partir : projets avec application ;
- activité récente ;
- répartition par état ;
- nouvelle arrivée prioritaire.

## Catalogue

- champ de recherche ;
- puces de filtres ;
- tri ;
- bascule grille/liste ;
- résultat vide contextualisé ;
- compteur de résultats.

## Fiche projet

- hero illustré ;
- actions « Ouvrir l’application » et « Voir sur GitHub » ;
- description complète ;
- métadonnées ;
- derniers éléments chargés à la demande ;
- navigation précédent/suivant facultative sur bureau.

## Activité

Chronologie groupée par date, construite à partir des événements connus. Les formulations restent prudentes : « activité détectée » plutôt que « nouvelle version » sans preuve.

## Paramètres

Préférences locales, informations de cache, version et actions de maintenance. Aucun secret et aucun token.
