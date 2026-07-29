# La Grange

> L’atelier où vivent mes projets.

La Grange est une PWA personnelle, en lecture seule, qui récupère automatiquement les dépôts publics du compte GitHub `christolosier-ship-it`, les enrichit avec une identité visuelle locale et les présente comme une galerie d’applications chaleureuse et installable.

## Objectif

La Grange n’est ni une GMAO du code, ni un clone de GitHub, ni un outil de pilotage. Elle fournit un accès synthétique aux projets, à leurs applications déployées, à leur dépôt, à leur README, à leurs releases et à leur activité récente.

## Principes

- lecture seule ;
- ajout automatique des nouveaux dépôts publics ;
- affichage immédiat depuis le cache ;
- fonctionnement hors ligne ;
- aucune clé GitHub exposée ;
- données réelles, sans faux pourcentage de progression ;
- tablette comme cible de confort, avec responsive complet ;
- ambiance d’atelier chaleureuse sans sacrifier la lisibilité.

## Architecture du MVP

- Vite + TypeScript ;
- HTML sémantique et CSS natif ;
- routeur par hash compatible GitHub Pages ;
- API REST publique GitHub ;
- IndexedDB pour les données ;
- localStorage pour les préférences légères ;
- service worker et manifest PWA ;
- configuration éditoriale centralisée dans `public/data/project-overrides.json`.

## Développement local

Prérequis : Node.js 20.19 ou plus récent et npm.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Le service worker est enregistré uniquement par le build de production. Pour repartir d’un environnement propre, supprimer le service worker et les données du site depuis les outils de développement du navigateur.

## Documentation

Le point d’entrée documentaire est [`docs/INDEX.md`](docs/INDEX.md).

Documents majeurs :

- [`ARCHITECTURE.md`](ARCHITECTURE.md) : synthèse technique ;
- [`AGENTS.md`](AGENTS.md) : règles obligatoires pour les agents IA ;
- [`docs/00-fondations/`](docs/00-fondations/) : vision et périmètre ;
- [`docs/01-produit/`](docs/01-produit/) : besoins et règles métier ;
- [`docs/02-ux-ui/`](docs/02-ux-ui/) : vues et design system ;
- [`docs/03-technique/`](docs/03-technique/) : conception détaillée ;
- [`docs/05-realisation/`](docs/05-realisation/) : phases de construction.

## État

Les phases 1 à 3 sont implémentées : socle PWA, synchronisation GitHub cache-first et dashboard responsive avec statistiques réelles, cartes accessibles, fallbacks visuels, activité synthétique, nouvelle arrivée et états réseau complets.
