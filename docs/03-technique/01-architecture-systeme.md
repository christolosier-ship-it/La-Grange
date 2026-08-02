# Architecture système

## Style architectural

La Grange reste une PWA modulaire en TypeScript. La consultation publique continue de fonctionner cache-first dans le navigateur. La Phase 6B ajoute un chemin d’administration séparé, authentifié et limité à la personnalisation éditoriale du dépôt `La-Grange`.

## Architecture cible

```text
Consultation
GitHub REST public ──> GitHubClient ──> RepositoryMapper
                                             │
project-overrides.json ──> ProjectEnricher ──┤
project-releases.json ────────────────────────┤
                                             ▼
                                      SyncService
                                      │         │
                                  IndexedDB   Store
                                                │
                                     Shell / Dashboard

Administration
Navigateur administrateur
        │ session HTTPS
        ▼
Netlify Functions
        │ GitHub App limitée au dépôt La-Grange
        ▼
Branche de personnalisation ──> commit ──> PR automatique
```

## Frontières

- les données publiques GitHub restent lues sans authentification côté client ;
- aucun jeton GitHub n’est envoyé au navigateur ;
- les fonctions d’administration sont servies sous la même origine que l’application canonique ;
- le service sécurisé ne peut modifier qu’une liste blanche de fichiers ;
- toute personnalisation crée une branche et une pull request ;
- aucune fusion automatique ;
- l’application publique reste consultable sans session administrateur.

## Modules applicatifs

- `core/github` : lecture publique et modèles distants ;
- `core/projects` : fusion des données factuelles et éditoriales ;
- `core/cache` : snapshots et détails IndexedDB ;
- `core/sync` : synchronisation cache-réseau ;
- `core/customization` : modèle, validation et état de publication de la personnalisation ;
- `features/dashboard` : poutre statistique et grille continue ;
- `features/project-customization` : modale, aperçu et soumission ;
- `ui/layout` : rail gauche fixe et zone principale défilante ;
- fonctions Netlify : authentification, validation, traitement d’image et création de PR.

## Shell 6B

Le viewport possède deux zones :

1. rail gauche fixe : marque, navigation, synchronisation, version et état administrateur ;
2. contenu principal défilant : bandeau de statistiques puis grille continue de cartes.

Le fond général Phase 6A reste l’unique fond sous les cartes. Aucun panneau de section, rail droit ou voile intermédiaire n’est ajouté.

## Écriture sécurisée

La GitHub App est installée uniquement sur `christolosier-ship-it/La-Grange`. Permissions minimales :

- métadonnées : lecture ;
- contenus : lecture et écriture ;
- pull requests : lecture et écriture.

Le serveur :

1. valide la session administrateur ;
2. relit la tête de `main` ;
3. valide le schéma et les fichiers reçus ;
4. transforme éventuellement la couverture ;
5. crée une branche `personalize/<slug>-<horodatage>` ;
6. met à jour uniquement les chemins autorisés ;
7. crée un commit ;
8. ouvre une PR ;
9. retourne l’URL et l’état de publication.

## Déploiement

Le déploiement canonique avec personnalisation utilise Netlify afin de fournir l’application statique et les Functions sous une même origine. GitHub Pages peut rester une copie de consultation ou une solution de repli, sans bouton d’administration fonctionnel.

## Évolution

Les personnalisations UX/UI postérieures à 6B ne sont pas définies ici. Elles feront l’objet de nouveaux documents avant toute implémentation. La Phase 7 reste l’audit final après clôture explicite de toute la Phase 6.
