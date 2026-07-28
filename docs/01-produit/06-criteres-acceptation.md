# Critères d’acceptation produit

## Synchronisation

- tous les dépôts publics paginés sont importés ;
- un repo ajouté apparaît au prochain rafraîchissement ;
- aucun doublon après renommage ;
- le dernier cache reste présent après une erreur ;
- la date de synchronisation correspond uniquement à une synchronisation complète réussie.

## Dashboard

- les compteurs proviennent des projets chargés ;
- les sections n’affichent pas le même projet deux fois sans raison explicitée ;
- une carte sans image reste exploitable ;
- aucune progression fictive n’est visible.

## Catalogue et fiche

- recherche locale insensible à la casse et aux accents ;
- filtres combinables et réinitialisables ;
- fiche accessible directement par URL hash ;
- boutons externes présents uniquement si valides ;
- retour conserve l’état raisonnable du catalogue.

## PWA

- installation possible sur navigateurs compatibles ;
- shell et dernier instantané consultables hors ligne ;
- mise à jour du service worker ne détruit pas les données ;
- mode réduit en animations respecté.

## Qualité

- navigation clavier complète ;
- contraste conforme ;
- aucun secret dans le bundle ;
- typecheck, tests et build réussis.
