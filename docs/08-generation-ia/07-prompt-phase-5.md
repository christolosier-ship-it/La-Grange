# Prompt Phase 5 — Activité et paramètres

Implémente exclusivement `docs/05-realisation/07-phase-5-activite-parametres.md`.

## Livrable

Journal local factuel des changements connus et paramètres locaux validés : utilisateur, affichage, densité, mouvement, favoris, cache, version et diagnostics.

## Règles

- aucun événement inventé ;
- rétention bornée ;
- changement d’utilisateur isolé par instantané ;
- aucun token ;
- reset cache confirmé et non destructeur pour les préférences par défaut ;
- migrations testées.

## Cas obligatoires

Journal vide, événements multiples le même jour, préférence invalide, changement d’utilisateur, IndexedDB indisponible, reset, retour hors ligne et animation réduite.

## Contrôles

Tests de stockage, accessibilité des formulaires, responsive mobile, clarté des confirmations et absence de donnée sensible dans les diagnostics.
