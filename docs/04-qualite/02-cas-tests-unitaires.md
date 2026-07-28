# Cas de tests unitaires

## RepositoryMapper

- transforme tous les champs attendus ;
- remplace description nulle par chaîne vide ;
- produit les URLs secondaires correctes ;
- conserve l’identifiant numérique ;
- normalise les topics ;
- rejette les données structurellement invalides.

## ProjectEnricher

- applique chaque override autorisé ;
- ne remplace pas une donnée par `undefined` ;
- valide `appUrl` ;
- masque un projet uniquement si `hidden` est explicite ;
- produit un fallback déterministe ;
- signale un override orphelin en développement.

## ActivityRules

- seuils à 30, 31, 180 et 181 jours ;
- priorité du statut archivé ;
- gestion d’une date absente ;
- calcul en UTC ;
- absence de mutation de l’objet source.

## RepoComparator

- nouveau repo ;
- repo renommé ;
- repo inchangé ;
- repo modifié ;
- repo absent après réponse complète ;
- pas de suppression après réponse incomplète.

## Recherche et filtres

- casse et accents ;
- recherche multi-champs ;
- filtres combinés ;
- reset ;
- tri stable ;
- favoris.

## URL et sécurité

- HTTPS accepté ;
- protocole dangereux rejeté ;
- URL malformée rejetée ;
- échappement des textes assuré par l’API de rendu choisie.
