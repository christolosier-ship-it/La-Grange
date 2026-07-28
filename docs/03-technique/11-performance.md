# Performance

## Budgets initiaux

- JavaScript initial compressé : viser moins de 150 Ko hors assets ;
- CSS initial : viser moins de 80 Ko ;
- aucune couverture chargée en taille originale si elle n’est pas visible ;
- interaction possible dès affichage du cache ;
- score Lighthouse performance élevé sur appareil moyen.

## Mesures

- images WebP ou AVIF avec dimensions explicites ;
- lazy loading sous la ligne de flottaison ;
- miniatures dédiées plutôt que grandes images redimensionnées ;
- CSS critique léger ;
- aucune bibliothèque de graphique pour un simple anneau de répartition ;
- rendu par lots pour de nombreuses cartes ;
- recherche locale indexée en mémoire ;
- cache et ETag pour réduire les appels.

## Éviter

- requête détaillée par dépôt au démarrage ;
- animation de grandes surfaces ;
- ombres floues multiples ;
- écouteurs globaux non nettoyés ;
- re-rendu complet à chaque frappe ;
- calcul de dates répété sans nécessité.

## Suivi

Mesurer sur mobile simulé et iPad réel. Toute régression significative doit être justifiée dans la PR.
