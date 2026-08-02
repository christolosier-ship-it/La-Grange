# Déploiement Netlify

## Rôle

Netlify devient la cible canonique de La Grange lorsque la personnalisation 6B est activée. Il sert le build statique et les Functions sous une même origine.

## Composants

- build Vite ;
- fichiers PWA ;
- Netlify Functions dans `netlify/functions/` ;
- variables serveur ;
- redirections OAuth ;
- en-têtes de sécurité définis dans `netlify.toml` ;
- déploiements de prévisualisation des PR.

## Variables serveur exactes

| Variable | Fonction |
|---|---|
| `LA_GRANGE_PUBLIC_ORIGIN` | origine HTTPS canonique, sans chemin |
| `LA_GRANGE_SESSION_SECRET` | secret HMAC de session, 32 caractères minimum |
| `LA_GRANGE_ADMIN_LOGINS` | liste des comptes GitHub autorisés, séparés par des virgules |
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

Le client OAuth sert uniquement à vérifier l’identité du propriétaire. Les écritures sont réalisées avec le jeton d’installation de la GitHub App.

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
- `POST /api/projects/:repositoryName/customization-pr`.

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
- session HMAC en cookie `HttpOnly`, `Secure`, `SameSite=Lax` ;
- compte administrateur sur liste blanche ;
- contrôle strict de l’origine et en-tête CSRF dédié ;
- schémas et propriétés en liste blanche ;
- SHA de `main` revérifié avant création de branche ;
- aucune fusion automatique ;
- aucun secret dans le client ou les journaux ;
- CSP, politique de frame, `X-Content-Type-Options` et permissions navigateur limitées.

## Prévisualisations

Une PR de personnalisation peut obtenir une URL de preview Netlify. Cette preview sert à contrôler la carte avant fusion et ne remplace pas la revue GitHub.

## Rollback

Le rollback consiste à redéployer un commit antérieur de `main`. Les PR non fusionnées n’affectent pas la production. Le dernier cache PWA valide reste utilisable pendant la propagation.
