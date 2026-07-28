# ADR-005 — Routeur par hash

- **Statut** : accepté
- **Date** : 2026-07-28

## Contexte

GitHub Pages sert des fichiers statiques et ne fournit pas naturellement de fallback serveur pour des routes de type `/project/luma`.

## Décision

Utiliser des routes dans le fragment URL : `#/project/Luma`.

## Raisons

- rechargement fiable ;
- aucune page 404 ;
- configuration minimale ;
- liens internes partageables ;
- indépendance d’un hack `404.html`.

## Conséquences

- URLs moins élégantes ;
- le routeur gère focus, titre et historique ;
- les paramètres sont encodés dans le fragment ;
- une migration vers History API nécessiterait un hébergement avec réécriture et un nouvel ADR.
