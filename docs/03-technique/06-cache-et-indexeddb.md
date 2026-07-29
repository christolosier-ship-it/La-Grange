# Cache et IndexedDB

## Base

Nom : `la-grange-db`.

## Stores actifs

- `snapshots` : instantané principal par utilisateur ;
- `projectDetails` : détails chargés à la demande ;
- `activityEvents` : événements locaux récents ;
- `metadata` : emplacement réservé aux informations de migration futures.

## Clés

- snapshot : username ;
- détail : identifiant numérique stable du dépôt ;
- événement : id auto-incrémenté ;
- metadata : nom de propriété.

## Durées de fraîcheur

- liste des repos : 15 minutes ;
- détails projet : 45 minutes ;
- assets : stratégie service worker versionnée.

Les commits, la release et l’existence du README forment une seule entrée `ProjectDetails`. Ils sont donc validés et rafraîchis ensemble, uniquement après ouverture de la fiche et action explicite de l’utilisateur.

## Garanties

- écriture transactionnelle du snapshot, des événements et du nettoyage des détails disparus ;
- écriture dédiée des détails projets ;
- ancienne valeur conservée à l’écran en cas d’échec ;
- dates stockées en ISO UTC ;
- validation profonde du schéma à la lecture ;
- URL de détails limitées au protocole HTTPS ;
- migration non nécessaire pour la Phase 4, l’object store `projectDetails` ayant été réservé dès la version 2 de la base.

## Nettoyage

Le journal d’activité est limité aux 500 événements les plus récents par utilisateur. Les détails d’un dépôt sont supprimés dans la même transaction que le snapshot lorsque ce dépôt disparaît. Une entrée dont le nom ne correspond plus au dépôt courant est ignorée après un renommage et remplacée lors du prochain chargement à la demande.

Le futur bouton « Réinitialiser le cache » supprimera les données distantes mises en cache, mais préservera par défaut les préférences légères. Une confirmation expliquera les conséquences.
