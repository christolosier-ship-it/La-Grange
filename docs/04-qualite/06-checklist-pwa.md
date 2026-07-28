# Checklist PWA

## Manifest

- [ ] nom et nom court ;
- [ ] start URL compatible GitHub Pages ;
- [ ] scope correct ;
- [ ] display standalone ;
- [ ] couleurs ;
- [ ] icônes 192 et 512 ;
- [ ] icône maskable ;
- [ ] description ;
- [ ] aucune URL absolue fragile.

## Service worker

- [ ] enregistré uniquement en production ou mode test contrôlé ;
- [ ] scope limité ;
- [ ] version de cache explicite ;
- [ ] nettoyage des anciens caches ;
- [ ] fallback navigation ;
- [ ] absence de secret ;
- [ ] stratégie séparée des données IndexedDB.

## Hors ligne

- [ ] shell disponible ;
- [ ] dernier instantané disponible ;
- [ ] fiches principales consultables ;
- [ ] message hors ligne ;
- [ ] actions réseau expliquées ;
- [ ] premier lancement hors ligne traité proprement.

## Mise à jour

- [ ] nouvelle version détectée ;
- [ ] rechargement proposé ;
- [ ] données locales préservées ;
- [ ] rollback possible ;
- [ ] test après modification du manifest.

## Installation

- [ ] iOS Safari ;
- [ ] Chrome Android ;
- [ ] navigateur bureau compatible ;
- [ ] rendu standalone sans marges anormales ;
- [ ] safe areas iOS prises en compte.
