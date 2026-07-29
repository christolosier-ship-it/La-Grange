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
- activité : pas de durée de fraîcheur réseau, le journal reflète les événements locaux écrits après synchronisation complète ;
- assets : stratégie service worker versionnée.

Les commits, la release et l’existence du README forment une seule entrée `ProjectDetails`. Ils sont donc validés et rafraîchis ensemble, uniquement après ouverture de la fiche et action explicite de l’utilisateur.

## Lecture du journal

`activityEvents` est lu par l’index `byUsername`. Les entrées du profil actif sont validées individuellement, triées par `occurredAt` décroissant puis par clé décroissante en cas d’égalité. Une entrée invalide est ignorée sans invalider les autres et son exclusion est signalée à l’interface.

La lecture ne déclenche aucun appel GitHub. Elle est effectuée au démarrage puis après chaque tentative de synchronisation afin de refléter immédiatement les événements éventuellement ajoutés par une écriture transactionnelle réussie. Une lecture plus ancienne terminant après une requête plus récente ne peut pas remplacer le résultat courant.

## Garanties

- écriture transactionnelle du snapshot, des événements et du nettoyage des détails disparus ;
- lecture isolée des événements par utilisateur ;
- écriture dédiée des détails projets ;
- ancienne valeur conservée à l’écran en cas d’échec ;
- dates stockées en ISO UTC ;
- validation profonde du schéma à la lecture ;
- URL de détails limitées au protocole HTTPS ;
- aucune migration nécessaire pour la Phase 5A, l’object store `activityEvents` et ses index existant déjà en version 2.

## Nettoyage

Le journal d’activité est limité aux 500 événements les plus récents par utilisateur. Les clés auto-incrémentées les plus anciennes sont supprimées après chaque écriture du snapshot. Les détails d’un dépôt sont supprimés dans la même transaction que le snapshot lorsque ce dépôt disparaît. Une entrée dont le nom ne correspond plus au dépôt courant est ignorée après un renommage et remplacée lors du prochain chargement à la demande.

Le futur bouton « Réinitialiser le cache » de la Phase 5B supprimera les données distantes mises en cache pour le profil actif, mais préservera par défaut les préférences légères. Une confirmation expliquera les conséquences.
