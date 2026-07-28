# Prompt Phase 4 — Catalogue et fiche projet

Implémente exclusivement `docs/05-realisation/06-phase-4-fiche-projet.md`.

## Catalogue

Recherche normalisée, filtres combinables, tri stable, modes grille/liste, état vide et conservation du contexte.

## Fiche

Hero, actions externes sûres, métadonnées, topics, détails chargés à la demande, cache dédié et gestion des routes inconnues ou renommées.

## Cas obligatoires

Nom long, description absente, repo archivé, URL absente, URL invalide, erreur du détail, retour navigateur, accès direct par hash et recherche accentuée.

## Interdictions

Aucune écriture GitHub, aucune requête détaillée globale, aucun HTML de README injecté sans stratégie de rendu sûre et validée.

## Contrôles

Tests recherche/filtre, E2E navigation, quota API, sécurité des liens, clavier, VoiceOver et responsive.
