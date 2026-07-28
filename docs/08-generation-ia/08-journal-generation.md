# Journal de génération

Ce fichier trace les interventions importantes réalisées avec une IA afin de conserver le contexte des décisions et validations.

## Modèle d’entrée

```text
Date :
Phase :
Branche / PR :
Objectif :
Documents lus :
Fichiers modifiés :
Décisions prises :
Tests exécutés :
Résultats :
Limites ou tests non exécutés :
Dette créée :
Prochaine étape :
```

## Règles

- une entrée par PR importante, pas par micro-commit ;
- faits vérifiables uniquement ;
- ne jamais copier de secret, token ou donnée privée ;
- mentionner les divergences entre demande et implémentation ;
- l’entrée est ajoutée avant la fusion ;
- les corrections post-revue complètent la même entrée.

## Entrée initiale

Date : 2026-07-28

Phase : 0 — Documentation

Objectif : définir la totalité de la documentation d’architecture, produit, UX, technique, qualité, réalisation et déploiement avant le développement.

Décisions : MVP public, lecture seule, sans backend, TypeScript/Vite, sans framework UI, cache IndexedDB, routeur hash et overrides centralisés.
