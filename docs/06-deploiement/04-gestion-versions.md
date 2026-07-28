# Gestion des versions

## Schéma

Semantic Versioning : `MAJOR.MINOR.PATCH`.

- MAJOR : rupture importante de stockage, architecture ou comportement ;
- MINOR : fonction compatible ;
- PATCH : correction compatible.

Pendant le développement initial, les versions `0.x` peuvent évoluer rapidement, mais les migrations IndexedDB restent obligatoires dès que des données utilisateur existent.

## Sources de version

Une seule valeur canonique dans `package.json`, injectée au build dans l’interface. Le manifest, le changelog et le tag doivent être cohérents avec elle.

## Tags

Tags annotés `vX.Y.Z` créés uniquement après validation et fusion sur `main`.

## Cache PWA

La version du cache du service worker n’est pas un substitut à la version produit. Elle change lorsque les stratégies ou assets précachés l’exigent.

## Changelog

Chaque PR ajoute ses changements à `Non publié`. Lors d’une release, déplacer les entrées sous la version datée.

## Compatibilité

Toute modification du modèle IndexedDB documente : version précédente, migration, stratégie d’échec et test de retour arrière logique.
