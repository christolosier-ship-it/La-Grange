# Architecture de La Grange

## Résumé

La Grange est une PWA statique déployée sur GitHub Pages. Elle possède deux modes de consultation :

1. **mode public** : lectures directes de l’API GitHub sans authentification ;
2. **mode connecté** : les mêmes lectures directes reçoivent un jeton personnel fourni localement par l’utilisateur.

```text
Mode public ────────────────────────────────┐
                                             │
Jeton local facultatif ─> Authorization ─────┼─> API GitHub
                                             │
                                             v
GitHubClient ─> RepositoryMapper ─> ProjectEnricher
                                       │
project-overrides.json ────────────────┘
                                       │
                                SyncService
                               │          │
                          IndexedDB     Store
                                       │
                                      Vues

main ─> GitHub Actions ─> build Vite ─> GitHub Pages
```

Aucune Function, aucun proxy applicatif et aucun service Netlify ne participent à l’exécution.

## Frontières

- les données techniques des projets viennent de GitHub ;
- les données éditoriales viennent des overrides versionnés ;
- le mode public reste disponible sans compte ;
- le jeton facultatif n’est jamais intégré au code, au bundle ou au dépôt ;
- le jeton est envoyé uniquement à `https://api.github.com` ;
- le stockage par défaut est `sessionStorage` ;
- `localStorage` est utilisé uniquement après choix explicite « Mémoriser sur cet appareil » ;
- le jeton n’est jamais écrit dans IndexedDB ou dans les diagnostics ;
- aucune requête d’écriture GitHub n’est produite par l’application ;
- la personnalisation partagée reste gérée manuellement dans `project-overrides.json`.

## Shell 6B

- fond général fixe ;
- rail gauche fixe contenant marque, navigation, synchronisation, version et état GitHub ;
- zone principale avec défilement vertical indépendant ;
- bandeau de statistiques WebP avec données HTML ;
- grille de cartes directement sur le fond ;
- aucun rail droit sur le dashboard.

## Connexion GitHub

Le bouton **Connecter GitHub** ouvre une boîte de dialogue locale :

1. l’utilisateur crée un jeton personnel finement contrôlé sur GitHub ;
2. il le colle dans La Grange ;
3. La Grange vérifie le jeton avec `GET /user` ;
4. le jeton est conservé dans la session, ou sur l’appareil si l’utilisateur le demande ;
5. une synchronisation forcée utilise les lectures authentifiées ;
6. la déconnexion supprime toutes les copies locales du jeton.

Le wrapper réseau ajoute l’en-tête `Authorization` uniquement lorsque l’origine cible est exactement `https://api.github.com`. Toute autre origine reçoit la requête sans jeton.

## Personnalisation

Les styles, palettes, versions manuelles, progressions et couvertures restent versionnés dans le dépôt `La-Grange`. Depuis GitHub Pages, l’application ne peut pas protéger un jeton doté de droits d’écriture. La création automatique de branches et de pull requests est donc désactivée.

Le cinquième bouton de carte conserve l’équilibre du composant et explique le parcours manuel vers `public/data/project-overrides.json`.

## Hébergement

GitHub Pages est la cible canonique unique. Le workflow `.github/workflows/pages.yml` exécute typecheck, lint, tests, smoke test, build puis déploie `dist`.

## Contraintes

- aucun token codé en dur ou partagé dans le bundle ;
- jeton utilisateur limité aux lectures nécessaires ;
- aucune écriture distante depuis la PWA ;
- aucune fusion automatique ;
- aucune donnée sensible dans IndexedDB ;
- mode public et cache local conservés si le jeton est absent ou révoqué ;
- l’interface ne doit jamais prétendre qu’une personnalisation a été publiée automatiquement.
