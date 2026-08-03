# Déploiement GitHub Pages

## Rôle

GitHub Pages est la cible canonique unique de La Grange. L’application est entièrement statique : aucun serveur applicatif, aucune Function et aucun compte d’hébergement tiers ne sont requis.

## Chaîne de déploiement

Le workflow `.github/workflows/pages.yml` s’exécute sur chaque push vers `main` :

1. installation des dépendances ;
2. typecheck TypeScript ;
3. lint ;
4. tests ;
5. smoke test sur les dépôts publics réels ;
6. build Vite ;
7. téléversement de `dist` ;
8. déploiement GitHub Pages.

## Connexion GitHub facultative

GitHub Pages ne peut pas conserver un secret serveur. La connexion authentifiée repose donc sur un jeton personnel finement contrôlé créé par l’utilisateur.

Règles :

- aucun jeton dans les variables de build ou le dépôt ;
- aucune permission supplémentaire nécessaire pour les lectures publiques ;
- validation par `GET https://api.github.com/user` ;
- stockage dans `sessionStorage` par défaut ;
- stockage dans `localStorage` seulement après choix explicite ;
- envoi uniquement à l’origine `https://api.github.com` ;
- suppression à la déconnexion ou après réponse `401` ;
- aucune écriture GitHub depuis l’application.

## Mode public

Sans jeton, La Grange continue à fonctionner avec l’API GitHub publique, son cache IndexedDB et le service worker. Une limitation GitHub peut interrompre temporairement les rafraîchissements, sans supprimer la dernière copie locale valide.

## Personnalisation

La création automatique de branche et de pull request n’est pas disponible depuis GitHub Pages. Les personnalisations partagées sont modifiées directement dans :

- `public/data/project-overrides.json` ;
- `public/assets/phase-6/covers/` pour les couvertures canoniques.

Elles deviennent visibles après commit, revue éventuelle, fusion sur `main`, déploiement Pages et renouvellement du cache PWA.

## Sécurité

- aucun backend caché ou dormant ;
- aucun secret de GitHub App ;
- aucun jeton dans IndexedDB, les diagnostics ou les journaux ;
- contrôle strict de l’origine avant ajout de l’en-tête `Authorization` ;
- fonctionnement anonyme conservé ;
- aucune mutation GitHub depuis la PWA.

## Rollback

Le rollback consiste à rétablir un commit antérieur de `main`. GitHub Actions redéploie alors automatiquement la version restaurée. Le changement de version applicative déclenche la mise à jour du service worker.
