# Architecture système

## Style architectural

La Grange est une PWA modulaire en TypeScript, entièrement statique et déployée sur GitHub Pages. La consultation fonctionne cache-first dans le navigateur, avec une authentification de lecture facultative fournie localement par l’utilisateur.

## Architecture cible

```text
Mode public ────────────────────────────┐
                                        │
Jeton de lecture local facultatif ──────┼─> GitHub REST
                                        │
                                        v
GitHubClient ─> RepositoryMapper ─> ProjectEnricher
                                      │
project-overrides.json ───────────────┤
project-releases.json ────────────────┤
                                      ▼
                               SyncService
                               │         │
                           IndexedDB   Store
                                         │
                              Shell / Dashboard

main ─> GitHub Actions ─> dist ─> GitHub Pages
```

## Frontières

- les données publiques GitHub restent accessibles sans authentification ;
- le jeton utilisateur n’est ni intégré au bundle ni stocké dans IndexedDB ;
- l’en-tête `Authorization` est ajouté uniquement pour `api.github.com` ;
- aucune Function ou API applicative n’existe ;
- aucune écriture GitHub n’est effectuée depuis le navigateur ;
- la personnalisation partagée reste un fichier versionné ;
- le mode public reste disponible si le jeton est absent, expiré ou révoqué.

## Modules applicatifs

- `core/github` : lectures GitHub publiques ou authentifiées ;
- `core/projects` : fusion des données factuelles et éditoriales ;
- `core/cache` : snapshots et détails IndexedDB ;
- `core/sync` : synchronisation cache-réseau ;
- `core/customization` : état local de connexion GitHub et styles projet ;
- `features/dashboard` : poutre statistique et grille continue ;
- `features/project-customization` : orientation vers la personnalisation versionnée manuelle ;
- `ui/layout` : rail gauche fixe et zone principale défilante.

## Shell 6B

Le viewport possède deux zones :

1. rail gauche fixe : marque, navigation, synchronisation, version et état GitHub ;
2. contenu principal défilant : bandeau de statistiques puis grille continue de cartes.

Le fond général Phase 6A reste l’unique fond sous les cartes. Aucun panneau de section, rail droit ou voile intermédiaire n’est ajouté.

## Connexion authentifiée

1. l’utilisateur crée un jeton personnel finement contrôlé ;
2. La Grange le valide avec `GET /user` ;
3. il est conservé en session ou mémorisé sur demande ;
4. les clients GitHub ajoutent l’autorisation aux lectures ;
5. la déconnexion ou un rejet `401` supprime le jeton.

## Personnalisation versionnée

Les overrides et couvertures sont modifiés directement dans le dépôt. La PWA ne crée pas de branche, commit ou pull request, car GitHub Pages ne possède pas de coffre serveur capable de protéger un jeton d’écriture.

## Déploiement

Le workflow GitHub Actions contrôle le code, construit `dist` puis le publie sur GitHub Pages. Aucun hébergement secondaire n’est requis.

## Évolution

Toute réintroduction d’un backend, d’un flux OAuth serveur ou d’une écriture automatisée exige une nouvelle décision explicite du propriétaire et un ADR préalable. La Phase 7 reste l’audit final après clôture explicite de toute la Phase 6.
