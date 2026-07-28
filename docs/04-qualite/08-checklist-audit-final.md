# Checklist d’audit final

## Cohérence produit

- [ ] l’application reste un hub en lecture seule ;
- [ ] aucune fonction de pilotage ;
- [ ] ajout automatique démontré ;
- [ ] toutes les données ont une provenance claire ;
- [ ] aucune métrique décorative.

## Architecture

- [ ] dépendances orientées vers le domaine ;
- [ ] aucun composant n’appelle directement IndexedDB ou GitHub ;
- [ ] synchronisation atomique ;
- [ ] pagination et annulation ;
- [ ] migrations de données ;
- [ ] routeur compatible Pages.

## Sécurité

- [ ] recherche de secrets ;
- [ ] bundle inspecté ;
- [ ] URL validées ;
- [ ] HTML distant non injecté ;
- [ ] CSP ;
- [ ] dépendances auditées.

## UX

- [ ] prototype respecté dans l’esprit ;
- [ ] lisibilité supérieure au décor ;
- [ ] tablette confortable ;
- [ ] nouveaux repos visibles ;
- [ ] feedback réseau clair ;
- [ ] fallback d’asset propre.

## Performance et PWA

- [ ] budgets tenus ou écarts justifiés ;
- [ ] lazy loading ;
- [ ] fonctionnement hors ligne ;
- [ ] mise à jour testée ;
- [ ] installation testée.

## Documentation

- [ ] README à jour ;
- [ ] changelog ;
- [ ] architecture réelle conforme ;
- [ ] instructions de déploiement testées ;
- [ ] journal de génération clôturé.
