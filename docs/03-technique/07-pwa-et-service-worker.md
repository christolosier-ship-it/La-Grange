# PWA et service worker

## Objectifs

- installation sur iOS, Android et bureau compatibles ;
- démarrage rapide ;
- consultation du shell et du dernier instantané hors ligne ;
- mise à jour maîtrisée.

## Manifest

Définir nom, nom court, description, couleurs, `display: standalone`, orientation libre, start URL compatible avec le `base` Vite, icônes 192, 512 et maskable.

## Stratégies de cache

- shell versionné : cache-first avec renouvellement lors d’une release ;
- assets graphiques : stale-while-revalidate ;
- API GitHub : gérée par l’application et IndexedDB, pas comme vérité unique du service worker ;
- navigation : fallback vers `index.html` ou page hors ligne compatible hash routing.

## Mise à jour

Une nouvelle version du service worker se prépare sans interrompre la session. L’utilisateur reçoit une proposition « Une nouvelle version de l’atelier est prête » lorsque l’activation exige un rechargement.

## Sécurité

Le service worker ne met pas en cache de secret, ne modifie pas les requêtes externes et limite son scope au projet.

## Tests

Premier chargement, rechargement hors ligne, mise à jour de version, cache corrompu, suppression de données, navigation directe vers une route hash et installation.
