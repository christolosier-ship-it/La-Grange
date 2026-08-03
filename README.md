# La Grange

> L’atelier où vivent mes projets.

La Grange est une PWA personnelle hébergée sur GitHub Pages. Elle récupère les dépôts publics d’un profil GitHub, les enrichit avec une identité visuelle locale et les présente comme un atelier de projets installable.

## Objectif

La Grange permet de retrouver, comprendre et lancer les projets depuis un seul écran. La consultation reste publique et cache-first. Une connexion locale facultative permet d’utiliser le quota API authentifié de GitHub sans dépendre d’un hébergeur ou d’un backend tiers.

## Principes

- données GitHub réelles ;
- cache immédiat et fonctionnement hors ligne ;
- fond général et rail gauche fixes ;
- tablette paysage et bureau comme cibles de confort ;
- personnalisation versionnée dans `project-overrides.json` ;
- aucune écriture distante depuis l’application ;
- aucun secret ou jeton intégré au bundle ou au dépôt ;
- déploiement exclusivement par GitHub Pages.

## Architecture

- Vite + TypeScript strict ;
- HTML sémantique et CSS natif ;
- routeur par hash ;
- API GitHub publique pour la consultation anonyme ;
- jeton personnel finement contrôlé facultatif pour les lectures authentifiées ;
- `sessionStorage` par défaut, `localStorage` uniquement sur choix explicite ;
- IndexedDB pour les snapshots et détails, jamais pour le jeton ;
- `project-overrides.json` pour la personnalisation éditoriale ;
- GitHub Actions et GitHub Pages pour le déploiement ;
- service worker et manifest PWA.

## Connexion GitHub facultative

Le bouton **Connecter GitHub** permet de saisir un jeton personnel finement contrôlé. Aucun droit supplémentaire n’est nécessaire pour lire les dépôts publics. Le jeton est envoyé uniquement à `api.github.com` et peut être supprimé à tout moment avec **Se déconnecter**.

La personnalisation automatique par pull request est désactivée : GitHub Pages ne fournit pas de backend capable de protéger un jeton d’écriture. Les overrides restent modifiables directement dans le dépôt `La-Grange`.

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
- [`docs/06-deploiement/07-deploiement-github-pages.md`](docs/06-deploiement/07-deploiement-github-pages.md) ;
- [`docs/07-decisions/ADR-011-github-pages-authentification-locale.md`](docs/07-decisions/ADR-011-github-pages-authentification-locale.md).

## État

Les Phases 1 à 5 sont implémentées. La Phase 6A a intégré les fondations visuelles. La Phase 6B couvre le dashboard et les cartes projet ; la publication automatique des personnalisations a été retirée pour respecter l’hébergement GitHub Pages choisi par le propriétaire.
