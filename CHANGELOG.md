# Changelog

Toutes les évolutions notables de La Grange sont consignées ici.

## [Non publié]

### Purge des assets Phase 6

- suppression des masters et planches documentaires devenus inutiles ;
- suppression des anciens sous-dossiers runtime et de leurs prototypes ;
- suppression des variantes, textures, cadres, icônes et packs de projets non consommés ;
- conservation exclusive des assets du shell réellement utilisés et du noyau C01, C11, D06, D07, D20, D42 et D43 nécessaire à la Phase 6B ;
- reconstruction du manifeste et synchronisation de la documentation ;
- fallback de couverture et marqueur de style désormais réalisés en HTML/CSS.

### Conception 6B

- refonte de l’étape 6B autour du dashboard, des cartes projet et de la personnalisation versionnée ;
- rail gauche fixe avec synchronisation, version et état administrateur ;
- bandeau de statistiques unique en WebP avec valeurs HTML superposées ;
- suppression des grands conteneurs, des en-têtes de sections, du rail droit et du lien redondant vers l’inventaire ;
- grille continue de cartes directement sur le fond général de La Grange ;
- cinq actions alignées avec infobulles accessibles ;
- avancement manuel facultatif ;
- neuf styles génériques ;
- règle de version : valeur manuelle, sinon release stable, sinon préversion ;
- GitHub App limitée au dépôt `La-Grange` et Netlify Functions pour ouvrir une PR automatique ;
- conservation de la Phase 7 comme jalon final.

### Historique conservé

- Phases 1 à 5 fonctionnelles ;
- fondations visuelles 6A intégrées ;
- prototypes SVG C01 à C10 de la PR historique non retenus.

## Versionnement prévu

- `0.x` : construction et personnalisation ;
- `1.0.0` : version stable validée en Phase 7 ;
- correctif : correction compatible ;
- mineur : fonction compatible ;
- majeur : rupture de données, de sécurité ou d’expérience.
