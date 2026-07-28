# ADR-001 — TypeScript et Vite

- **Statut** : accepté
- **Date** : 2026-07-28

## Contexte

La Grange nécessite un build moderne, des modules, un typage fort, des tests et un déploiement statique GitHub Pages.

## Décision

Utiliser TypeScript en mode strict avec Vite comme outil de développement et de build.

## Raisons

- démarrage léger ;
- configuration limitée ;
- gestion correcte des assets et du sous-chemin ;
- écosystème de tests mature ;
- détection précoce des erreurs de modèle et d’état.

## Conséquences

- Node et un gestionnaire de paquets deviennent nécessaires au développement ;
- le code source n’est plus directement publiable sans build ;
- le `base` doit être configuré pour GitHub Pages ;
- les versions doivent être verrouillées.

## Alternatives rejetées

JavaScript vanilla non typé, plus fragile pour les migrations et DTO ; bundler artisanal, sans bénéfice ; framework complet, traité dans ADR-002.
