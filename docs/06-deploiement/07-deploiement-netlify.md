# Déploiement Netlify

## Rôle

Netlify est la cible canonique de La Grange lorsque la connexion GitHub et la personnalisation 6B sont activées. Il sert le build statique et les Functions sous une même origine.

## Composants

- build Vite ;
- fichiers PWA ;
- Netlify Functions dans `netlify/functions/` ;
- proxy GitHub authentifié en lecture seule ;
- variables serveur ;
- redirections OAuth ;
- en-têtes de sécurité définis dans `netlify.toml` ;
- déploiements de prévisualisation des PR.

## Variables serveur exactes

| Variable | Fonction |
|---|---|
| `LA_GRANGE_PUBLIC_ORIGIN` | origine HTTPS canonique, sans chemin |
| `LA_GRANGE_SESSION_SECRET` | secret de chiffrement et de signature de session, 32 caractères minimum |
| `LA_GRANGE_ADMIN_LOGINS` | liste des comptes GitHub administrateurs, séparés par des virgules |
| `GITHUB_OAUTH_CLIENT_ID` | identifiant du client OAuth GitHub |
| `GITHUB_OAUTH_CLIENT_SECRET` | secret du client OAuth GitHub |
| `GITHUB_APP_ID` | identifiant de la GitHub App |
| `GITHUB_APP_PRIVATE_KEY` | clé privée PEM de la GitHub App |
| `GITHUB_APP_INSTALLATION_ID` | installation limitée au dépôt La-Grange |
| `GITHUB_REPOSITORY_OWNER` | `christolosier-ship-it` |
| `GITHUB_REPOSITORY_NAME` | `La-Grange` |

Ces variables ne portent jamais le préfixe public de Vite et ne sont jamais copiées dans le build client.

## GitHub App

Permissions minimales :

- Metadata : Read-only ;
- Contents : Read and write ;
- Pull requests : Read and write.

L’installation doit être limitée au seul dépôt `christolosier-ship-it/La-Grange`.

## OAuth

Le callback à déclarer côté GitHub est :

```text
https://<origine-canonique>/api/admin/callback
```

Le client OAuth sert à :

- identifier le compte connecté ;
- obtenir un jeton utilisé uniquement pour les lectures GitHub de la session ;
- déterminer séparément si ce login appartient à la liste blanche administrateur.

Le jeton OAuth est chiffré avec AES-256-GCM dans le cookie de session `HttpOnly`. Il n’est pas exposé par l’API de session et n’est jamais accessible au JavaScript client. Les écritures restent réalisées avec le jeton d’installation de la GitHub App.

## Flux

1. push ou merge sur `main` ;
2. installation ;
3. typecheck de l’application et des Functions ;
4. lint et tests ;
5. build ;
6. déploiement des fichiers et Functions ;
7. smoke tests ;
8. activation ;
9. notification de mise à jour PWA.

## Functions implémentées

- `GET /api/admin/session` ;
- `GET /api/admin/login` ;
- `GET /api/admin/callback` ;
- `POST /api/admin/logout` ;
- `GET /api/github/*` ;
- `POST /api/projects/:repositoryName/customization-pr`.

## Proxy GitHub

`GET /api/github/*` utilise le jeton OAuth de la session connectée. La Function :

- exige une session GitHub valide ;
- n’autorise que les routes de lecture nécessaires ;
- refuse toute méthode autre que `GET` ;
- valide les noms de comptes, dépôts et paramètres ;
- transmet `If-None-Match` pour les requêtes conditionnelles ;
- retransmet les en-têtes de pagination, d’ETag et de quota utiles ;
- n’enregistre ni le jeton ni les réponses dans les journaux.

Les routes autorisées couvrent uniquement :

- `/users/:username/repos` ;
- `/repos/:owner/:repository/commits` ;
- `/repos/:owner/:repository/releases` ;
- `/repos/:owner/:repository/releases/latest` ;
- `/repos/:owner/:repository/readme`.

## Publication d’une couverture

Le navigateur recadre et réencode l’image en WebP 640 × 400. La Function vérifie ensuite :

- le contrat JSON ;
- la signature RIFF/WebP ;
- le sous-format ;
- les dimensions réelles ;
- le poids maximal de 220 Ko ;
- le chemin canonique calculé côté serveur.

La couverture et le patch JSON sont ajoutés au même commit de personnalisation. La Function ne peut écrire que dans `public/data/project-overrides.json` et `public/assets/phase-6/covers/`.

## Sécurité

- état OAuth signé et à durée courte ;
- session chiffrée et authentifiée en cookie `HttpOnly`, `Secure`, `SameSite=Lax` ;
- durée de session limitée à huit heures ;
- rôle administrateur sur liste blanche ;
- proxy GitHub strictement limité aux lectures nécessaires ;
- contrôle strict de l’origine et en-tête CSRF dédié pour les écritures ;
- schémas et propriétés en liste blanche ;
- SHA de `main` revérifié avant création de branche ;
- aucune fusion automatique ;
- aucun secret dans le client, IndexedDB ou les journaux ;
- CSP, politique de frame, `X-Content-Type-Options` et permissions navigateur limitées.

## Prévisualisations

Une PR de personnalisation peut obtenir une URL de preview Netlify. Cette preview sert à contrôler la carte avant fusion et ne remplace pas la revue GitHub.

Pour tester la connexion OAuth sur une preview, celle-ci doit disposer d’une origine et d’un callback explicitement autorisés dans la configuration OAuth. À défaut, la validation de la connexion s’effectue sur l’origine canonique.

## Rollback

Le rollback consiste à redéployer un commit antérieur de `main`. Les PR non fusionnées n’affectent pas la production. Le dernier cache PWA valide reste utilisable pendant la propagation. Une session créée avec le nouveau format devient invalide après retour à une version antérieure, ce qui force simplement une reconnexion GitHub.
