# Architecture de La Grange

## Résumé

La Grange est une application web statique installable. Le navigateur charge d’abord les données mises en cache pour le profil actif, puis synchronise en arrière-plan ses dépôts publics GitHub. Les données techniques sont fusionnées avec un fichier local d’overrides graphiques.

```text
Préférences locales ──> ProfileCoordinator ──> Session du profil actif
                                                │
GitHub REST API ──> GitHubClient ──> RepositoryMapper
                                          │
project-overrides.json ──> ProjectEnricher
                                          │
                                      SyncService
                                     │           │
                                IndexedDB      Store
                                     │           │
                         Activité / Maintenance  Vues
```

## Couches

- `app` : démarrage, routes, store et câblage des sessions ;
- `core/github` : clients HTTP, pagination, normalisation et erreurs ;
- `core/projects` : modèle, enrichissement et calcul des états ;
- `core/cache` : données applicatives IndexedDB ;
- `core/activity` : validation, tri, regroupement et lecture du journal ;
- `core/preferences` : schéma versionné, migration, visibilité et confort ;
- `core/profile` : reconstruction contrôlée des services par utilisateur ;
- `core/settings` : inspection, reset ciblé et diagnostics locaux ;
- `core/sync` : orchestration cache-réseau-comparaison ;
- `features` : dashboard, catalogue, détail, activité et paramètres ;
- `ui` : composants réutilisables, modale, préférences d’affichage et shell responsive.

## Session de profil

Le profil actif n’est pas injecté dans des services mutables. `ProfileCoordinator` construit une session composée d’un `SyncService`, d’un `ProjectDetailService` et d’un `ActivityService` pour un nom GitHub et une fréquence donnés.

Un changement de profil :

1. annule les requêtes en cours ;
2. efface uniquement l’état distant en mémoire ;
3. conserve les préférences et les caches des autres profils ;
4. reconstruit les services avec le nouvel utilisateur ;
5. charge son journal et son snapshot distincts ;
6. synchronise ses dépôts publics si le réseau est disponible ;
7. restaure l’ancien profil lorsqu’aucun snapshot ne peut être validé et que la synchronisation échoue.

Changer uniquement la fréquence reconstruit la session du même profil sans vider l’interface. Après un reset ciblé, la session est reconstruite sans appel réseau automatique afin qu’un ancien snapshot conservé en mémoire ne puisse pas réapparaître.

## Flux de démarrage

1. migration et réparation des préférences locales ;
2. application de la densité et du mouvement effectifs ;
3. construction de la session du profil actif ;
4. lecture de son journal et de son dernier snapshot ;
5. chargement des overrides ;
6. appel paginé de l’API GitHub si le réseau est disponible ;
7. transformation, enrichissement et comparaison par identifiant stable ;
8. écriture atomique du snapshot et des nouveaux événements ;
9. inspection non bloquante du cache ;
10. mise à jour de l’interface.

## Préférences et visibilité

Le schéma `la-grange-preferences-v2` conserve le profil, la visibilité des forks et archives, la fraîcheur, la densité, la réduction du mouvement, les favoris et le mode du catalogue. L’ancien stockage Phase 4 est migré une seule fois.

Masquer un fork ou une archive ne modifie jamais le snapshot. Un sélecteur commun filtre uniquement les listes du dashboard et du catalogue. Une fiche ouverte directement reste accessible et explique pourquoi elle est absente des listes.

## Assets visuels Phase 6

Le catalogue des assets est défini dans :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Les règles d’architecture sont :

- tous les nouveaux assets canoniques Phase 6 sont placés à la racine de `public/assets/phase-6/` ;
- aucun nouveau sous-dossier par famille ou projet ;
- les sous-dossiers hérités restent gelés et non canoniques jusqu’au remplacement manuel de leurs fichiers ;
- chaque raster porte son identifiant et ses dimensions dans le nom ;
- chaque SVG porte son identifiant et possède un `viewBox` exact ;
- les overrides référencent uniquement des noms inscrits dans le registre ;
- le code réserve les ratios avant chargement ;
- les couvertures sont chargées paresseusement ;
- les éléments critiques possèdent un fallback CSS ou SVG ;
- aucun asset distant n’est requis ;
- aucun ZIP, contenu Base64, fragment ou workflow de reconstruction ;
- les prototypes hérités sont remplacés puis supprimés manuellement.

Le cycle de preuve distingue A/R pour une source M/S, P/V pour un asset contrôlé et versionné, puis I pour sa consommation réelle. La présence d’un fichier dans `public/` ne signifie donc pas qu’il est consommé par l’interface.

## Maintenance locale

L’adaptateur `IndexedDbMaintenance` inspecte les données du profil actif et peut supprimer uniquement :

- son snapshot ;
- ses événements ;
- les détails réellement présents pour les identifiants de projets contenus dans ce snapshot.

Les préférences et les autres profils restent intacts. Les diagnostics copiables exposent seulement les états, dates, compteurs et préférences effectives, jamais un token, une stack, un README ou le contenu massif du cache.

## Contraintes

- aucun token client ;
- aucun backend dans le MVP ;
- aucune écriture sur GitHub ;
- pas de récupération systématique des commits, branches ou releases de tous les repos ;
- les informations détaillées sont chargées uniquement lors de l’ouverture d’une fiche ;
- un échec réseau ne doit jamais supprimer le dernier cache valide ;
- les préférences de visibilité ne doivent jamais supprimer des projets du cache ;
- le réglage système de mouvement réduit prime toujours sur le choix utilisateur ;
- aucune donnée métier n’est dessinée dans un asset.

## Décisions

Les décisions structurantes sont consignées dans `docs/07-decisions/` sous forme d’ADR. Toute modification d’un choix majeur exige un nouvel ADR et la mise à jour de cette synthèse.
