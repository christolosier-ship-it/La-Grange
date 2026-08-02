# La Grange

> L’atelier où vivent mes projets.

La Grange est une PWA personnelle qui récupère les dépôts publics d’un profil GitHub, les enrichit avec une identité visuelle locale et les présente comme un atelier de projets installable.

## Objectif

La Grange permet de retrouver, comprendre, lancer et personnaliser les projets depuis un seul écran. La consultation des dépôts reste publique et cache-first. La seule écriture distante autorisée concerne la configuration éditoriale de La Grange et passe par une pull request automatique dans son propre dépôt.

## Principes

- données GitHub réelles ;
- cache immédiat et fonctionnement hors ligne ;
- fond général et rail gauche fixes ;
- tablette paysage et bureau comme cibles de confort ;
- personnalisation versionnée, commune à tous les appareils ;
- aucune écriture dans les dépôts présentés ;
- aucun secret dans le navigateur ;
- aucune fusion automatique.

## Architecture

- Vite + TypeScript strict ;
- HTML sémantique et CSS natif ;
- routeur par hash ;
- API GitHub publique pour la consultation ;
- IndexedDB pour les snapshots et détails ;
- `project-overrides.json` pour la personnalisation ;
- Netlify Functions et GitHub App limitée à `La-Grange` pour créer une PR de personnalisation ;
- aucun token GitHub permanent dans le client ;
- service worker et manifest PWA.

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

## Documentation

Le point d’entrée documentaire est [`docs/INDEX.md`](docs/INDEX.md).

Documents majeurs :

- [`ARCHITECTURE.md`](ARCHITECTURE.md) ;
- [`AGENTS.md`](AGENTS.md) ;
- [`docs/02-ux-ui/12-contrat-dashboard-phase-6b.md`](docs/02-ux-ui/12-contrat-dashboard-phase-6b.md) ;
- [`docs/03-technique/13-personnalisation-github.md`](docs/03-technique/13-personnalisation-github.md) ;
- [`docs/05-realisation/11-phase-6b-dashboard-personnalisation.md`](docs/05-realisation/11-phase-6b-dashboard-personnalisation.md) ;
- [`docs/07-decisions/ADR-010-personnalisation-versionnee-via-github.md`](docs/07-decisions/ADR-010-personnalisation-versionnee-via-github.md).

## État

Les Phases 1 à 5 sont implémentées. La Phase 6A a intégré les fondations visuelles.

L’étape 6B est désormais la refonte du dashboard, des cartes projet et de leur personnalisation versionnée. Les anciennes subdivisions ultérieures de la Phase 6 ont été retirées de la documentation. Les prochaines étapes UI/UX seront définies au fur et à mesure par le propriétaire. La Phase 7 de validation et release est conservée, mais ne pourra démarrer qu’après clôture explicite de l’ensemble de la Phase 6.
