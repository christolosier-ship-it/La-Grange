# Synchronisation

## Synchronisation de consultation

```text
loadCachedSnapshot(username)
render(cache)
if offline: stop with offline status
loadOverrides()
loadCachedReleaseIndex()
fetchAllRepositories(username)
validateCompleteResponse()
mapRepositories()
mergeOverrides()
resolveVersions()
compareByRepositoryId()
writeSnapshotAndEventsAtomically()
publishStoreUpdate()
```

Le dernier snapshot valide reste affiché en cas d’échec.

## Déclencheurs

- lancement si le cache est périmé ;
- retour au premier plan ;
- action manuelle dans le rail gauche ;
- retour du réseau ;
- changement de profil confirmé ;
- déploiement d’une personnalisation détecté après mise à jour PWA.

## Synchronisation éditoriale

Une personnalisation n’écrit pas immédiatement dans l’état public canonique. Son cycle est :

```text
modale validée
→ PR créée
→ validation et fusion manuelles
→ build et déploiement
→ nouveau service worker
→ rechargement des overrides
→ rendu identique sur tous les appareils
```

La modale distingue :

- validation locale ;
- création de la branche ;
- PR créée ;
- publication en attente de fusion ;
- publication déployée ;
- erreur.

## Cohérence

La requête d’administration contient le SHA de base lu lors de l’ouverture de la modale. Si `main` a évolué, le serveur refuse l’écriture avec un conflit explicite. Il ne réécrit pas silencieusement une configuration plus récente.

## Hors ligne

- lecture : dernier snapshot et derniers overrides en cache ;
- actions externes : signalées comme nécessitant le réseau ;
- personnalisation : formulaire consultable si utile, mais publication désactivée ;
- aucune file d’écriture silencieuse n’est créée.

## Cache PWA

Après fusion d’une PR, le déploiement renouvelle les ressources versionnées. L’utilisateur reçoit un feedback de mise à jour et choisit de recharger. L’ancien cache n’est jamais supprimé avant activation sûre du nouveau shell.
