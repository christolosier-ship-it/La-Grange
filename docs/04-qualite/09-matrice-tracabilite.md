# Matrice de traçabilité

| Besoin | Règle / conception | Vue | Tests principaux |
|---|---|---|---|
| Dépôt public automatique | synchronisation par identifiant | dashboard, catalogue | mapping, pagination, comparaison |
| Cache immédiat | cache-first IndexedDB | toutes | cache froid, cache chaud, hors ligne |
| Dashboard sans empilement | contrat 6B | dashboard | captures, inspection DOM |
| Rail gauche fixe | shell à deux zones | toutes | scroll tablette et bureau |
| Statistiques intégrées | WebP de fond + HTML | dashboard | données réelles, images bloquées |
| Grille continue | aucun conteneur de section | dashboard | ordre, noms longs, 18 projets |
| Cinq portes d’accès | rangée d’actions | carte | clavier, liens, absence URL |
| Infobulles | survol et focus | carte | souris, clavier, Échap |
| Progression honnête | champ manuel facultatif | carte, modale | absent, 0, 100, invalide |
| Version factuelle | manuel puis release | carte | stable, préversion, aucune |
| Style générique | neuf styles | carte, modale | valeur valide, fallback |
| Couleurs cohérentes | trio de palette | carte | contraste, reset style |
| Couverture commune | WebP 640 × 400 versionné | carte | crop, poids, erreur |
| Personnalisation multi-appareil | overrides dans Git | modale | fusion, déploiement, second appareil |
| Administration protégée | GitHub App + Function | modale | 401, 403, CSRF |
| Publication réversible | branche et PR | administration | PR créée, aucune fusion |
| Conflit non destructif | SHA de base | administration | `409`, formulaire conservé |
| Chemins limités | liste blanche serveur | administration | tentative hors périmètre |
| Fonctionnement sans images | fallbacks | dashboard | blocage des images |
| Accessibilité | composants sémantiques | toutes | clavier, zoom, VoiceOver |
| Performance | budgets et lazy loading | dashboard | poids, LCP, CLS |
| PWA | service worker et cache | toutes | installation, mise à jour, hors ligne |
| Phase 6 progressive | 6B documentée, suite non pré-écrite | documentation | audit des références |
| Release contrôlée | Phase 7 conservée | dépôt | Go / No-Go final |

## Usage

Toute nouvelle exigence ajoute ou corrige une ligne avant développement. Les personnalisations UI/UX postérieures à 6B seront ajoutées au fur et à mesure des décisions du propriétaire.
