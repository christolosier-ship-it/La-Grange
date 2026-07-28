# Architecture système

## Style architectural

Application statique modulaire, sans backend. L’interface fonctionne comme un client de consultation de ressources publiques, enrichies localement.

## Modules principaux

```text
AppShell
 ├─ Router
 ├─ Store
 ├─ SyncService
 │   ├─ GitHubClient
 │   ├─ RepositoryMapper
 │   ├─ ProjectEnricher
 │   ├─ RepoComparator
 │   └─ ProjectCache
 └─ Features
     ├─ Dashboard
     ├─ Projects
     ├─ ProjectDetail
     ├─ Activity
     └─ Settings
```

## Frontières

- le client GitHub retourne des DTO bruts ;
- le mapper convertit les DTO en modèle de domaine ;
- l’enricher fusionne les overrides ;
- le service de synchronisation orchestre mais ne rend pas l’UI ;
- les vues consomment des sélecteurs du store ;
- IndexedDB n’est jamais appelée directement depuis un composant.

## Asynchronisme

Chaque synchronisation possède un identifiant ou un contrôleur d’annulation. Une nouvelle synchronisation annule la précédente. Les réponses tardives ne doivent pas écraser un état plus récent.

## Évolution

Un futur backend ou OAuth devra implémenter une nouvelle source de données derrière une interface, sans contaminer le modèle de domaine avec des secrets ou détails d’authentification.
