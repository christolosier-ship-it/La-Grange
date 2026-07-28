# Synchronisation

## Algorithme

```text
loadCachedSnapshot()
render(cache)
if offline: stop with offline status
loadOverrides()
fetchAllRepositories(etag)
validateCompleteResponse()
mapRepositories()
mergeOverrides()
compareByRepositoryId()
computeNewFlags()
writeSnapshotAtomically()
publishStoreUpdate()
```

## Déclencheurs

- lancement si le cache a dépassé la durée de fraîcheur ;
- retour au premier plan après une durée configurable ;
- bouton manuel ;
- récupération réseau après passage hors ligne, avec temporisation.

## Concurrence

Une seule synchronisation active. Le bouton est désactivé pendant l’opération. Un `AbortController` annule les appels obsolètes.

## Atomicité

Construire le nouvel instantané en mémoire, le valider, puis effectuer une transaction IndexedDB. Ne jamais vider la table avant d’avoir une réponse complète.

## Détection des changements

- nouveau : identifiant absent ;
- renommé : même identifiant, nom différent ;
- modifié : champs suivis différents ;
- supprimé : identifiant absent après récupération complète uniquement.

## Journal local

Conserver les événements utiles des dernières synchronisations : ajout, renommage, archivage et changement de lien d’application. Limiter la taille et ne pas prétendre remplacer l’historique GitHub.
