# Synchronisation

## Algorithme d’une session

```text
loadCachedSnapshot(username)
render(cache)
if offline: stop with offline status
loadOverrides()
fetchAllRepositories(username)
validateCompleteResponse()
mapRepositories()
mergeOverrides()
compareByRepositoryId()
computeNewFlags()
writeSnapshotAndEventsAtomically()
refreshActivity(username)
inspectProfileCache(username)
publishStoreUpdate()
```

## Déclencheurs

- lancement lorsque le snapshot du profil actif dépasse la durée de fraîcheur ;
- retour au premier plan ;
- bouton manuel ;
- récupération réseau après passage hors ligne ;
- changement confirmé de profil ;
- changement de fréquence, sans forcer une nouvelle récupération si le cache reste frais.

Les durées proposées sont bornées à 5, 15, 30 ou 60 minutes. La valeur initiale reste 15 minutes.

## Profils

`ProfileCoordinator` possède une session à la fois. Une session regroupe les services de synchronisation, détails et activité pour un `username` donné. Les services ne changent jamais de compte en cours de vie : ils sont annulés puis reconstruits.

Lors d’un changement confirmé :

1. annuler la synchronisation et les détails en cours ;
2. vider l’état distant en mémoire ;
3. construire la session du nouveau profil ;
4. lire son journal et son snapshot distincts ;
5. synchroniser si le réseau est disponible ;
6. conserver le nouveau profil si un snapshot local valide existe malgré l’échec réseau ;
7. restaurer l’ancien profil si aucune donnée du nouveau profil ne peut être validée.

Les snapshots et événements des profils non actifs ne sont jamais supprimés pendant ce changement.

## Concurrence

Une seule synchronisation active par session. Les changements de profil annulent les requêtes obsolètes. Les lectures d’activité et diagnostics utilisent un identifiant de requête afin qu’une réponse ancienne ne remplace pas un état plus récent.

## Atomicité

Le nouvel instantané est construit et validé en mémoire, puis écrit dans une transaction avec les événements et le nettoyage des détails disparus. La table n’est jamais vidée avant une réponse complète.

## Détection des changements

- nouveau : identifiant absent ;
- renommé : même identifiant, nom différent ;
- archivé : drapeau GitHub passant à vrai ;
- lien d’application modifié : URL HTTPS suivie différente ;
- disparu : identifiant absent après récupération complète uniquement.

## Journal local

Le journal conserve les événements factuels des synchronisations complètes. Il est limité à 500 entrées par utilisateur et ne prétend pas remplacer l’historique GitHub.

## Reset du cache

Le reset ciblé annule la session, supprime les données persistantes du profil actif, puis reconstruit une session vide du même compte. Il ne relance pas automatiquement GitHub. Cette reconstruction empêche un snapshot encore présent dans la mémoire de l’ancien `SyncService` de réapparaître après la suppression IndexedDB.
