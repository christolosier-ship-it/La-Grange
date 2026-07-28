# Intégration GitHub

## Endpoint principal

Utiliser l’endpoint public listant les dépôts d’un utilisateur, avec pagination jusqu’à absence de page suivante. Paramètres recommandés : tri par mise à jour et taille de page maximale autorisée.

## En-têtes

- `Accept: application/vnd.github+json` ;
- version d’API explicitement fixée et mise à jour volontairement ;
- `If-None-Match` lorsque l’ETag est connu.

## Données exploitées

`id`, `node_id`, `name`, `description`, `html_url`, `homepage`, `fork`, `archived`, `language`, `default_branch`, `topics`, `open_issues_count`, `created_at`, `updated_at`, `pushed_at`.

## Limites

Sans authentification, le quota public est partagé par adresse IP. La Grange doit limiter les appels grâce au cache, aux ETags et au chargement à la demande. Elle ne doit jamais interroger chaque dépôt lors du rafraîchissement global.

## Détails à la demande

La fiche peut demander :

- derniers commits ;
- dernière release ;
- contenu ou existence du README.

Ces résultats ont leur propre cache et une durée de fraîcheur supérieure à quelques minutes.

## Erreurs

- 304 : conserver le cache et actualiser uniquement le statut de vérification ;
- 403/429 : lire les en-têtes de limite, suspendre les reprises ;
- 404 utilisateur : erreur de configuration ;
- 5xx : conserver le cache et proposer un réessai ;
- réponse invalide : ne pas remplacer l’instantané.

## Références

- https://docs.github.com/en/rest/repos/repos
- https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
- https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api
