# Architecture de La Grange

## Résumé

La Grange combine trois chemins strictement séparés :

1. **consultation publique** : PWA cache-first lisant les dépôts publics GitHub sans authentification ;
2. **consultation connectée** : les mêmes lectures passent par un proxy Netlify authentifié avec la session OAuth GitHub ;
3. **personnalisation administrateur** : service serveur minimal créant une pull request dans le seul dépôt `La-Grange`.

```text
Visiteur anonyme ──> API GitHub publique ──> GitHubClient

Utilisateur connecté ──> proxy Netlify /api/github/* ──> API GitHub authentifiée
                               │
                               └─ session OAuth chiffrée en cookie HttpOnly

GitHubClient ──> RepositoryMapper ──> ProjectEnricher
                                         │
project-overrides.json ──────────────────┘
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
- la consultation anonyme reste disponible sans compte ;
- après connexion OAuth, les lectures GitHub utilisent le quota authentifié du compte connecté ;
- le jeton OAuth est chiffré dans une session `HttpOnly` et n’est jamais accessible au JavaScript client ;
- le proxy de lecture n’accepte qu’une liste blanche de routes GitHub en `GET` ;
- le rôle administrateur reste distinct de la simple connexion GitHub ;
- le navigateur ne reçoit jamais le secret de la GitHub App ;
- le service d’écriture ne peut cibler qu’une liste blanche de chemins dans `La-Grange` ;
- aucune écriture n’est effectuée sur les dépôts présentés ;
- la fusion de la PR reste une action explicite sur GitHub.

## Shell 6B

- fond général fixe déjà implémenté ;
- rail gauche fixe contenant marque, navigation, synchronisation, version et état de connexion GitHub ;
- zone principale avec défilement vertical indépendant ;
- bandeau de statistiques WebP avec données HTML ;
- grille de cartes directement sur le fond, sans panneau intermédiaire ;
- aucun rail droit sur le dashboard.

## Connexion GitHub

La connexion est déclenchée depuis l’application par le bouton « Se connecter avec GitHub » :

1. redirection vers l’autorisation OAuth officielle GitHub ;
2. retour sur `/api/admin/callback` ;
3. vérification de l’identité GitHub ;
4. chiffrement du jeton OAuth dans une session à durée limitée ;
5. relance immédiate de la synchronisation ;
6. routage automatique des lectures vers `/api/github/*` ;
7. destruction de la session à la déconnexion.

Le proxy autorise seulement les lectures nécessaires à La Grange : inventaire des dépôts, commits récents, releases et README. Les appels anonymes continuent à joindre directement l’API publique GitHub.

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

La capacité d’écriture exige en plus que le login connecté appartienne à la liste blanche administrateur. Elle utilise toujours la GitHub App dédiée et non le jeton OAuth de lecture.

## Hébergement

Le déploiement avec connexion et administration utilise Netlify afin de servir l’interface, le proxy GitHub et les Functions sur la même origine. GitHub Pages peut rester un fallback temporaire de consultation anonyme pendant la transition, mais ne porte ni la connexion authentifiée ni le chemin d’écriture.

## Contraintes

- permissions minimales de la GitHub App ;
- aucun PAT dans le navigateur ;
- jeton OAuth chiffré et limité à la durée de session ;
- proxy GitHub en lecture seule et à routes explicitement autorisées ;
- aucune écriture directe sur `main` ;
- aucune fusion automatique ;
- CSP, CSRF, validation d’origine et limitation de débit ;
- upload limité à PNG, JPEG et WebP, vérifié par signature réelle ;
- aucune donnée sensible dans IndexedDB ou les diagnostics ;
- fonctionnement de consultation conservé lorsque le service connecté est indisponible.
