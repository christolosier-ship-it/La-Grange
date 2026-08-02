# Architecture de La Grange

## Résumé

La Grange combine deux chemins strictement séparés :

1. **consultation publique** : PWA cache-first lisant les dépôts publics GitHub ;
2. **personnalisation administrateur** : service serveur minimal créant une pull request dans le seul dépôt `La-Grange`.

```text
API GitHub publique ──> GitHubClient ──> RepositoryMapper ──> ProjectEnricher
                                                        │
project-overrides.json ─────────────────────────────────┘
                                                        │
                                                 SyncService
                                                │          │
                                           IndexedDB     Store
                                                        │
                                                       Vues

Modale admin ──> API Netlify same-origin ──> GitHub App limitée à La-Grange
                                      ├─ valide JSON et images
                                      ├─ crée branche et commit
                                      └─ ouvre une pull request
```

## Frontières

- les données techniques des projets restent issues de GitHub ;
- les données éditoriales sont issues des overrides versionnés ;
- le navigateur ne reçoit jamais le secret de la GitHub App ;
- le service d’écriture ne peut cibler qu’une liste blanche de chemins dans `La-Grange` ;
- aucune écriture n’est effectuée sur les dépôts présentés ;
- la fusion de la PR reste une action explicite sur GitHub.

## Shell 6B

- fond général fixe déjà implémenté ;
- rail gauche fixe contenant marque, navigation, synchronisation, version et état administrateur ;
- zone principale avec défilement vertical indépendant ;
- bandeau de statistiques WebP avec données HTML ;
- grille de cartes directement sur le fond, sans panneau intermédiaire ;
- aucun rail droit sur le dashboard.

## Personnalisation

La modale édite une proposition de configuration. Après validation :

1. l’image est recadrée et vérifiée ;
2. l’override est validé ;
3. le service relit la tête de `main` ;
4. une branche dédiée est créée ;
5. les fichiers sont commités ;
6. une PR est ouverte ;
7. l’interface affiche le lien et l’état de publication ;
8. le rendu multi-appareil devient effectif après fusion, déploiement et renouvellement du cache.

## Hébergement

Le déploiement avec administration utilise Netlify afin de servir l’interface et les Functions sur la même origine. GitHub Pages peut rester un fallback temporaire de consultation pendant la transition, mais ne porte pas le chemin d’écriture.

## Contraintes

- permissions minimales de GitHub App ;
- aucun PAT dans le navigateur ;
- aucune écriture directe sur `main` ;
- CSP, CSRF, validation d’origine et limitation de débit ;
- upload limité à PNG, JPEG et WebP, vérifié par signature réelle ;
- aucune donnée sensible dans IndexedDB ou les diagnostics ;
- fonctionnement de consultation conservé lorsque le service administrateur est indisponible.
