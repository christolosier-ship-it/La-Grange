# ADR-002 — Architecture sans framework UI

- **Statut** : accepté
- **Date** : 2026-07-28

## Contexte

Le MVP possède cinq vues, un état global limité et peu de formulaires. L’enjeu principal est la qualité visuelle, la synchronisation et le cache.

## Décision

Construire l’interface avec modules TypeScript, composants DOM légers, HTML sémantique et CSS natif, sans React, Vue, Angular ou équivalent.

## Raisons

- bundle réduit ;
- contrôle direct du DOM et de l’accessibilité ;
- cohérence avec les autres PWA du propriétaire ;
- complexité proportionnée ;
- absence de besoin de rendu serveur.

## Conséquences

- le routeur, le store et le cycle de vie doivent être simples et documentés ;
- attention particulière au nettoyage des écouteurs ;
- composants testables sans inventer un mini-framework.

## Réévaluation

Seulement si le nombre de vues, la collaboration ou la complexité d’état augmente fortement. Un nouvel ADR est obligatoire.
