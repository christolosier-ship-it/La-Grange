# Checklist d’audit final

## Cohérence produit

- [ ] l’application reste un hub en lecture seule ;
- [ ] aucune fonction de pilotage ;
- [ ] ajout automatique démontré ;
- [ ] toutes les données ont une provenance claire ;
- [ ] aucune métrique décorative ;
- [ ] aucune donnée de démonstration ou de prototype dans le chemin de production ;
- [ ] aucune progression, release, branche ou conflit inventé pour reproduire la référence.

## Architecture

- [ ] dépendances orientées vers le domaine ;
- [ ] aucun composant n’appelle directement IndexedDB ou GitHub ;
- [ ] synchronisation atomique ;
- [ ] pagination et annulation ;
- [ ] migrations de données ;
- [ ] routeur compatible Pages ;
- [ ] GitHub et la documentation restent la source de vérité ;
- [ ] aucune architecture parallèle requise au runtime ;
- [ ] aucune dépendance visuelle lourde non justifiée.

## Sécurité

- [ ] recherche de secrets ;
- [ ] bundle inspecté ;
- [ ] URL validées ;
- [ ] HTML distant non injecté ;
- [ ] CSP ;
- [ ] dépendances auditées ;
- [ ] aucun asset distant obligatoire ;
- [ ] aucun script dans les SVG ;
- [ ] provenance et licence des assets externes documentées.

## UX

- [ ] référence et planches validées respectées dans l’esprit ;
- [ ] rendu stylisé, ni photoréaliste ni cartoon ;
- [ ] lisibilité supérieure au décor ;
- [ ] tablette confortable ;
- [ ] mobile conçu comme un établi compact, pas comme un bureau réduit ;
- [ ] nouveaux dépôts visibles ;
- [ ] feedback réseau clair ;
- [ ] fallback d’asset propre ;
- [ ] toutes les vues appartiennent au même atelier ;
- [ ] focus visible sur les textures ;
- [ ] zoom 200 % ;
- [ ] mouvement réduit complet ;
- [ ] checklist `14-checklist-phase-6.md` clôturée.

## Assets

- [ ] `10-suivi-production-assets-phase-6.md` est le registre final exact ;
- [ ] chaque fichier possède un identifiant, un nom final et un statut exacts ;
- [ ] dimensions explicites et décodées ;
- [ ] poids publiés ;
- [ ] formats optimisés ;
- [ ] transparence contrôlée ;
- [ ] sources M/S requises approuvées A et versionnées R avant leurs dérivés ;
- [ ] assets de dépendance et de fallback P/V avant leurs dépendants ;
- [ ] créations internes tracées sans statut R artificiel ;
- [ ] assets contrôlés et versionnés à la racine avec P, validés avec V puis consommés avec I ;
- [ ] aucun nouveau sous-dossier par famille ou projet ;
- [ ] sous-dossiers hérités gelés, sans nouveau fichier ni statut canonique ;
- [ ] `README.md` et `manifest.json` hérités sans autorité sur le registre ;
- [ ] aucun ZIP, Base64, fragment ou workflow de reconstruction ;
- [ ] lazy loading ;
- [ ] aucun texte fonctionnel rasterisé ;
- [ ] fallbacks CSS ou SVG ;
- [ ] contrôles CSS spécifiés avant leur lot puis intégrés avant fusion ;
- [ ] planches produites après les changements de leur lot ;
- [ ] aucune sortie IA brute intégrée ;
- [ ] prototypes hérités non comptés comme validés ;
- [ ] fichiers remplacés supprimés seulement après contrôle des références ;
- [ ] référence documentaire non servie dans le runtime.

## Performance et PWA

- [ ] budgets tenus ou écarts justifiés ;
- [ ] poids du shell critique mesuré ;
- [ ] nombre de requêtes initiales mesuré ;
- [ ] LCP et CLS contrôlés ;
- [ ] lazy loading ;
- [ ] fonctionnement hors ligne ;
- [ ] mise à jour testée ;
- [ ] installation testée ;
- [ ] cache froid et chaud comparés ;
- [ ] fonctionnement avec images bloquées ;
- [ ] aucun asset décoratif ne bloque l’interaction depuis le cache.

## Documentation

- [ ] README à jour ;
- [ ] changelog ;
- [ ] architecture réelle conforme ;
- [ ] bible visuelle conforme aux composants finaux ;
- [ ] inventaire d’assets conforme au registre et aux fichiers finaux ;
- [ ] instructions de déploiement testées ;
- [ ] journal de génération clôturé ;
- [ ] écarts aux masters et planches documentés ;
- [ ] PR et SHA de chaque lot consignés.

## Revue

- [ ] toutes les PR Phase 6 fusionnées sur un SHA vert ;
- [ ] review threads interrogés après chaque correction ;
- [ ] aucun P1 ou P2 ouvert ;
- [ ] `main` contrôlé directement ;
- [ ] version et cache PWA vérifiés ;
- [ ] aucune dette visuelle bloquante reportée silencieusement en Phase 7.
