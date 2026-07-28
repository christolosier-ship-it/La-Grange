# Cache et IndexedDB

## Base

Nom : `la-grange-db`.

## Stores proposés

- `snapshots` : instantané principal par utilisateur ;
- `projectDetails` : détails chargés à la demande ;
- `activityEvents` : événements locaux récents ;
- `metadata` : version de schéma, ETag et informations de migration.

## Clés

- snapshot : username ;
- détail : repository id ;
- événement : id auto-incrémenté ou UUID ;
- metadata : nom de propriété.

## Durées de fraîcheur indicatives

- liste des repos : 15 minutes ;
- détails projet : 30 à 60 minutes ;
- README ou release : plusieurs heures ;
- assets : stratégie service worker versionnée.

## Garanties

- écriture transactionnelle ;
- ancienne valeur conservée en cas d’échec ;
- dates stockées en ISO UTC ;
- validation du schéma à la lecture ;
- migrations déterministes et testées.

## Nettoyage

Limiter le journal d’activité et les détails des repos disparus. Le bouton « Réinitialiser le cache » supprime les données distantes mises en cache, mais préserve par défaut les préférences. Une confirmation explique les conséquences.
