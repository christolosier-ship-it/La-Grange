# Intégration GitHub

## Endpoint principal

Utiliser l’endpoint public listant les dépôts d’un utilisateur, avec pagination jusqu’à absence de page suivante. Paramètres retenus : tri par mise à jour, direction descendante, dépôts possédés par l’utilisateur et taille de page maximale autorisée.

## Requêtes depuis le navigateur

La Grange utilise des requêtes CORS simples, sans jeton et sans en-tête personnalisé. Cette décision évite les prévalidations fragiles observées sur Safari/iOS et conserve le bon récepteur natif de `Window.fetch`.

Les requêtes utilisent :

- `credentials: omit` ;
- `cache: no-store` pour laisser IndexedDB piloter la fraîcheur métier ;
- `redirect: follow` ;
- `referrerPolicy: no-referrer`.

L’application ne dépend pas d’un ETag navigateur pour fonctionner. Le champ reste toléré dans le modèle de cache pour compatibilité de schéma, mais la stratégie active repose sur la durée de fraîcheur et la synchronisation explicite.

## Données exploitées

`id`, `node_id`, `name`, `description`, `html_url`, `homepage`, `fork`, `archived`, `language`, `default_branch`, `topics`, `open_issues_count`, `created_at`, `updated_at`, `pushed_at`.

## Limites

Sans authentification, le quota public est partagé par adresse IP. La Grange limite les appels grâce au cache, au délai de fraîcheur et au chargement ciblé. Elle ne doit jamais interroger chaque dépôt lors du rafraîchissement global.

## Détails à la demande

La fiche peut demander, uniquement après une action explicite de l’utilisateur :

- les trois derniers commits ;
- la dernière release ;
- l’existence et l’URL du README.

Le contenu HTML distant du README n’est jamais injecté dans La Grange. Ces trois réponses sont validées, transformées en modèle interne puis conservées dans le cache `projectDetails` pendant 45 minutes. Une fiche affichée depuis l’inventaire reste utilisable si ce chargement échoue.

## Erreurs

- 403/429 avec quota épuisé : lire l’heure de reprise et suspendre les relances ;
- 404 sur release ou README : absence normale de la ressource ;
- 404 sur le dépôt : détail introuvable sans casser la fiche de base ;
- 409 sur les commits : dépôt vide ;
- 5xx ou erreur réseau : conserver les détails locaux et proposer un réessai ;
- réponse invalide : ne jamais écrire la réponse dans IndexedDB.

## Références

- https://docs.github.com/en/rest/repos/repos
- https://docs.github.com/en/rest/commits/commits
- https://docs.github.com/en/rest/releases/releases
- https://docs.github.com/en/rest/repos/contents
- https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
- https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api
