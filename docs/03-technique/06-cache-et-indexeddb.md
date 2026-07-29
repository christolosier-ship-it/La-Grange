# Cache et IndexedDB

## Base

Nom : `la-grange-db`. Version : 2.

## Stores actifs

- `snapshots` : instantané principal par utilisateur ;
- `projectDetails` : détails chargés à la demande, indexés par identifiant GitHub stable ;
- `activityEvents` : événements locaux récents ;
- `metadata` : emplacement réservé aux informations de migration futures.

## Clés

- snapshot : username ;
- détail : identifiant numérique stable du dépôt ;
- événement : id auto-incrémenté ;
- metadata : nom de propriété.

## Durées de fraîcheur

- liste des repos : 5, 15, 30 ou 60 minutes selon la préférence, 15 minutes par défaut ;
- détails projet : 45 minutes ;
- activité : pas de durée réseau, le journal reflète les événements locaux ;
- assets : stratégie service worker versionnée.

## Lecture du journal

`activityEvents` est lu par l’index `byUsername`. Les entrées du profil actif sont validées individuellement, triées par date décroissante puis par clé. Une entrée invalide est ignorée sans invalider les autres et son exclusion est signalée.

La lecture ne déclenche aucun appel GitHub. Une réponse ancienne ne peut pas remplacer une lecture plus récente grâce à l’identifiant de requête du service.

## Inspection du profil actif

`IndexedDbMaintenance` ouvre une connexion courte à la même base et calcule des compteurs réels : présence du snapshot, nombre de projets, événements valides et invalides, et détails réellement rattachés aux identifiants du snapshot actif.

L’inspection est indépendante de la synchronisation. Son échec produit un état local non bloquant et ne retire jamais le snapshot déjà affiché.

## Reset ciblé

Après confirmation, le reset supprime uniquement :

- la clé du snapshot correspondant au `username` actif ;
- les clés d’événements obtenues par l’index `byUsername` ;
- les clés de détails qui existent réellement et appartiennent aux identifiants du snapshot actif.

Le résultat annonce le nombre réel d’entrées supprimées. Les préférences `localStorage`, les snapshots des autres utilisateurs et les détails qui ne peuvent pas être rattachés avec certitude restent intacts.

Après la transaction, les services de la session active sont reconstruits sans appel GitHub automatique afin qu’aucune copie mémoire de l’ancien snapshot ne réapparaisse.

## Garanties

- écriture transactionnelle du snapshot, des événements et du nettoyage des détails disparus ;
- lecture et suppression des événements isolées par utilisateur ;
- ancienne valeur conservée à l’écran en cas d’échec ;
- dates stockées en ISO UTC ;
- validation profonde à la lecture ;
- URL de détails limitées au protocole HTTPS ;
- aucune migration IndexedDB en Phase 5, les stores et index existaient déjà en version 2 ;
- migration des préférences effectuée dans `localStorage`, séparément de la base.

## Rétention

Le journal est limité aux 500 événements les plus récents par utilisateur. Les détails d’un dépôt disparu sont supprimés dans la transaction du snapshot. Une entrée de détail devenue obsolète après renommage est ignorée et remplacée lors du prochain chargement à la demande.
