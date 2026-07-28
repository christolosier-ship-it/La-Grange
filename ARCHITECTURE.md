# Architecture de La Grange

## Résumé

La Grange est une application web statique installable. Le navigateur charge d’abord les données mises en cache, puis synchronise en arrière-plan la liste des dépôts publics GitHub. Les données techniques sont fusionnées avec un fichier local d’overrides graphiques.

```text
GitHub REST API ──> GitHubClient ──> RepositoryMapper
                                         │
project-overrides.json ──> ProjectEnricher
                                         │
                                  ProjectService
                                    │        │
                               IndexedDB   Store
                                         │
                                  Vues et composants
```

## Couches

- `app` : démarrage, routes et état global ;
- `core/github` : client HTTP, pagination, normalisation et erreurs ;
- `core/projects` : modèle, enrichissement et calcul des états ;
- `core/cache` : IndexedDB et préférences ;
- `core/sync` : orchestration cache-réseau-comparaison ;
- `features` : dashboard, catalogue, détail, activité, paramètres ;
- `ui` : composants réutilisables et shell responsive.

## Flux de démarrage

1. ouverture de la base locale ;
2. affichage du dernier instantané valide ;
3. chargement des overrides ;
4. appel paginé de l’API GitHub si le réseau est disponible ;
5. transformation et enrichissement ;
6. comparaison par identifiant GitHub stable ;
7. marquage des nouveaux dépôts ;
8. écriture atomique du nouvel instantané ;
9. mise à jour non bloquante de l’interface.

## Contraintes

- aucun token client ;
- aucun backend dans le MVP ;
- aucune écriture sur GitHub ;
- pas de récupération systématique des commits, branches ou releases de tous les repos ;
- les informations détaillées sont chargées uniquement lors de l’ouverture d’une fiche ;
- un échec réseau ne doit jamais supprimer le dernier cache valide.

## Décisions

Les décisions structurantes sont consignées dans `docs/07-decisions/` sous forme d’ADR. Toute modification d’un choix majeur exige un nouvel ADR et la mise à jour de cette synthèse.
