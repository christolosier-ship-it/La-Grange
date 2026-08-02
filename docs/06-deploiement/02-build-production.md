# Build de production

## Objectif

Produire le build PWA et les Functions d’administration sans exposer les variables serveur.

## Cibles

### Netlify canonique

- `base` racine ou domaine configuré ;
- build Vite ;
- assets locaux ;
- manifest et service worker ;
- Functions déployées séparément ;
- variables secrètes disponibles uniquement à l’exécution serveur.

### GitHub Pages de consultation

- `base` `/La-Grange/` ;
- build statique seulement ;
- administration absente ou indisponible explicitement ;
- aucun secret.

## Étapes

1. `npm ci` ;
2. typecheck ;
3. lint ;
4. tests ;
5. tests des Functions ;
6. build Vite ;
7. validation des assets et données générées ;
8. inspection du bundle ;
9. preview ;
10. smoke tests.

## Contrôles

- aucune variable serveur dans `dist` ;
- aucun secret dans les source maps ;
- chemins d’assets corrects ;
- overrides valides ;
- index de releases valide s’il est généré ;
- route hash fonctionnelle ;
- service worker isolé ;
- bundle admin chargé à la demande ;
- budgets respectés.
