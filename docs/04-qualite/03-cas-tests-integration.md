# Cas de tests d’intégration

## Cache-first

- cache présent puis réponse réseau nouvelle ;
- cache présent puis 304 ;
- cache présent puis erreur réseau ;
- cache absent puis succès ;
- cache absent puis échec ;
- cache invalide puis récupération réseau.

## Pagination

- une page ;
- plusieurs pages ;
- dernière page vide ;
- erreur en page intermédiaire ;
- doublon accidentel entre pages ;
- annulation en cours de pagination.

## Atomicité

- l’ancien instantané reste lisible avant commit ;
- transaction échouée ne remplace rien ;
- nouvel instantané complet devient la seule version active ;
- événements locaux écrits dans la même opération logique.

## Routeur et store

- navigation directe vers une fiche ;
- projet introuvable ;
- retour vers catalogue avec filtres ;
- changement de titre ;
- focus déplacé vers le contenu principal.

## Overrides

- fichier valide ;
- fichier absent ;
- JSON invalide ;
- asset absent ;
- appUrl prioritaire ;
- projet caché.

## Préférences

- lecture initiale ;
- migration ;
- valeur inconnue remplacée par défaut ;
- reset du cache sans perte des préférences.
