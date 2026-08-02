# Changelog

Toutes les évolutions notables de La Grange sont consignées ici.

## [Non publié]

### Conception 6B

- refonte de l’étape 6B autour du dashboard, des cartes projet et de la personnalisation versionnée ;
- rail gauche fixe avec synchronisation, version et état administrateur ;
- bandeau de statistiques unique en WebP avec valeurs HTML superposées ;
- suppression des grands conteneurs, des en-têtes de sections, du rail droit et du lien redondant vers l’inventaire ;
- grille continue de cartes directement sur le fond général de La Grange ;
- contrat détaillé des dix zones de la carte projet ;
- cinq actions alignées avec infobulles accessibles ;
- avancement manuel facultatif ;
- neuf styles génériques avec palette principale, secondaire et progression ;
- règle de version : valeur manuelle, sinon dernière release stable, sinon préversion, sinon absence ;
- modale administrateur pour couverture, style, couleurs, avancement et version ;
- stockage officiel dans `project-overrides.json` et les assets versionnés ;
- GitHub App limitée au dépôt `La-Grange` et Netlify Functions pour ouvrir une PR automatique ;
- même personnalisation sur tous les appareils après fusion et déploiement ;
- création de l’ADR-010 et des contrats UX, technique et réalisation de la Phase 6B ;
- retrait des anciennes étapes futures de Phase 6 de la documentation ; elles seront redéfinies au fil des décisions du propriétaire ;
- conservation de la Phase 7 comme jalon final.

### Historique conservé

- Phases 1 à 5 fonctionnelles ;
- fondations visuelles 6A intégrées ;
- masters et premiers assets validés conservés avec leur traçabilité ;
- prototypes SVG C01 à C10 de la PR historique non retenus comme direction finale.

## Versionnement prévu

- `0.x` : construction et personnalisation ;
- `1.0.0` : version stable validée en Phase 7 ;
- correctif : correction compatible ;
- mineur : fonction compatible ;
- majeur : rupture de données, de sécurité ou d’expérience.
