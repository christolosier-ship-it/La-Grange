# Prompt Phase 2 — GitHub et cache

Implémente exclusivement `docs/05-realisation/04-phase-2-integration-github.md`.

## Livrable

Client GitHub paginé sans authentification, mapping, enrichissement par overrides, IndexedDB versionnée, synchronisation atomique, détection des nouveaux repos et feedback réseau minimal.

## Cas obligatoires

- plusieurs pages ;
- 304 ;
- 403/429 ;
- 5xx ;
- cache absent ;
- cache présent ;
- réponse partielle ;
- repo renommé ;
- nouveau repo ;
- JSON override invalide ;
- annulation d’une synchronisation concurrente.

## Interdictions

- requête détaillée par repo ;
- suppression avant validation complète ;
- token ;
- métrique inventée ;
- UI finale du dashboard.

## Contrôles

Tests unitaires et intégration, inspection IndexedDB, démarrage hors ligne, absence de doubles appels et conservation du cache après erreur.
