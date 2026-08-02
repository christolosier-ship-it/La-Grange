# ADR-003 - Lecture seule des données de projets

- **Statut** : partiellement remplacé par ADR-010
- **Date initiale** : 2026-07-28
- **Révision** : 2026-08-02

## Décision maintenue

La Grange ne modifie aucune donnée métier des dépôts présentés :

- issues ;
- pull requests des projets ;
- labels ;
- releases ;
- branches ;
- contenu des dépôts projets.

La consultation publique demeure anonyme et cache-first.

## Exception 6B

ADR-010 autorise un chemin d’administration strictement limité au dépôt `La-Grange`, pour modifier sa configuration éditoriale et ses couvertures.

Cette exception :

- exige une authentification ;
- utilise une GitHub App côté serveur ;
- crée uniquement une branche, un commit et une PR ;
- ne fusionne jamais automatiquement ;
- ne donne aucun accès d’écriture aux dépôts présentés ;
- ne met aucun secret dans le navigateur.

## Conséquence

La Grange reste un hub de consultation des projets. Elle devient seulement capable de proposer, dans son propre dépôt, une modification versionnée de sa présentation.
