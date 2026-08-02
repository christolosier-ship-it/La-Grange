# Checklist PWA

## Installation

- [ ] manifest valide ;
- [ ] icônes ;
- [ ] nom et couleurs ;
- [ ] installation iPad ;
- [ ] lancement standalone ;
- [ ] origine canonique Netlify.

## Service worker

- [ ] scope exact ;
- [ ] cache versionné ;
- [ ] activation sûre ;
- [ ] anciens caches La Grange seulement ;
- [ ] aucune Function mise en cache comme réponse permanente ;
- [ ] aucune session admin mise en cache ;
- [ ] aucune réponse privée servie hors ligne.

## Hors ligne

- [ ] shell ;
- [ ] dernier snapshot ;
- [ ] overrides ;
- [ ] couvertures déjà mises en cache ;
- [ ] fallbacks ;
- [ ] liens externes signalés ;
- [ ] publication désactivée ;
- [ ] aucune file d’écriture silencieuse.

## Mise à jour

- [ ] nouvelle version détectée ;
- [ ] message accessible ;
- [ ] rechargement consenti ;
- [ ] nouvelles personnalisations visibles ;
- [ ] IndexedDB conservée ;
- [ ] ancien shell utilisable jusqu’à activation.

## Administration

- [ ] bouton absent sans session ;
- [ ] session vérifiée en ligne ;
- [ ] déconnexion ;
- [ ] erreur réseau ;
- [ ] aucune donnée sensible dans Cache Storage ;
- [ ] aucune clé dans le manifest ou le bundle.

## Performance

- [ ] assets critiques seulement ;
- [ ] couvertures lazy ;
- [ ] bandeau et skin budgétés ;
- [ ] cache froid/chaud ;
- [ ] LCP ;
- [ ] CLS ;
- [ ] grille complète.
