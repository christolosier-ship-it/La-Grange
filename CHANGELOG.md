# Changelog

Toutes les évolutions notables de La Grange sont consignées ici.

## [Non publié]

### Simplification de la production 6B

- production et validation du master M06 ;
- production de C01, C11, C06, D42 et D43 ;
- passage à un noyau graphique partagé de trois WebP et deux nouvelles icônes ;
- retrait de la pré-production des couvertures et logos de projets ;
- couvertures désormais téléversées, recadrées et versionnées depuis la modale administrateur ;
- retrait des planches PNG canoniques G16a à G20 ;
- validation visuelle réalisée directement sur le build et jointe à la PR ;
- maintien des neuf styles, avec iconographie produite ou réutilisée pendant l’intégration.

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
