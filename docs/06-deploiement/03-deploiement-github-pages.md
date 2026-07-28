# Déploiement GitHub Pages

## Méthode retenue

Utiliser GitHub Actions avec la source Pages configurée sur « GitHub Actions ». Le workflow construit le projet puis déploie le dossier généré.

## Déclencheurs

- push sur `main` après mise en place de la release continue ;
- déclenchement manuel pour diagnostic ;
- pas de déploiement de production depuis une branche de fonctionnalité.

## Workflow logique

1. checkout ;
2. setup Node avec cache ;
3. `npm ci` ;
4. contrôles qualité ;
5. `npm run build` ;
6. upload de l’artefact Pages ;
7. déploiement dans l’environnement `github-pages`.

## Permissions

Le workflow utilise les permissions minimales requises pour Pages. Aucun token personnel n’est stocké.

## Concurrence

Un seul déploiement de production actif. Une exécution plus récente peut annuler une exécution obsolète sans interrompre une publication déjà critique selon la configuration retenue.

## Vérifications post-déploiement

- page d’accueil ;
- assets ;
- manifest ;
- service worker ;
- route fiche ;
- synchronisation GitHub ;
- mode standalone ;
- absence d’erreur console bloquante.

## Référence

https://vite.dev/guide/static-deploy.html
