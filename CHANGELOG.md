# Changelog

Toutes les évolutions notables de La Grange sont consignées ici.

## [Non publié]

### Correction GitHub Pages

- suppression de Netlify, des Functions, du proxy OAuth et de la GitHub App serveur ;
- restauration de GitHub Pages comme cible canonique unique ;
- connexion facultative par jeton personnel finement contrôlé fourni localement ;
- stockage en session par défaut et mémorisation locale uniquement sur choix explicite ;
- envoi du jeton exclusivement à `api.github.com` ;
- suppression automatique du jeton à la déconnexion ou après rejet GitHub ;
- conservation du mode public sans connexion ;
- lectures authentifiées directes pour l’inventaire, les releases, les commits et les README ;
- désactivation de la création automatique de PR de personnalisation ;
- orientation vers `project-overrides.json` pour les modifications versionnées ;
- nouveaux tests de stockage, d’isolation d’origine et de révocation ;
- documentation d’architecture, de sécurité et de déploiement corrigée.

### Implémentation Phase 6B

- rail gauche fixe sur tablette paysage et bureau, avec défilement réservé à la zone principale ;
- version de La Grange et état de connexion GitHub intégrés au bas du rail ;
- bandeau C11 avec quatre statistiques HTML superposées ;
- suppression des sections et conteneurs redondants du dashboard ;
- grille continue de cartes directement sur le fond général ;
- nouvelle carte C01 avec couverture 8:5, fallback HTML/CSS, style, version, activité et avancement manuel ;
- cinq actions alignées : GitHub, application, README, détail et personnalisation ;
- infobulles accessibles au survol et au focus ;
- neuf styles génériques avec marqueurs HTML/CSS et trois couleurs ;
- résolution de version manuelle ou de la dernière release GitHub stable, puis préversion ;
- schéma v3 de `project-overrides.json` avec compatibilité de lecture de l’ancien format ;
- cache PWA mis à jour avec C01, C11 et les cinq icônes d’action ;
- tests automatisés adaptés au contrat 6B.

### Purge des assets Phase 6

- suppression des masters et planches documentaires devenus inutiles ;
- suppression des anciens sous-dossiers runtime et de leurs prototypes ;
- suppression des variantes, textures, cadres, icônes et packs de projets non consommés ;
- conservation exclusive des assets du shell réellement utilisés et du noyau C01, C11, D06, D07, D20, D42 et D43 nécessaire à la Phase 6B ;
- reconstruction du manifeste et synchronisation de la documentation ;
- fallback de couverture et marqueur de style désormais réalisés en HTML/CSS.

### Conception 6B

- refonte de l’étape 6B autour du dashboard, des cartes projet et de la personnalisation versionnée ;
- conservation de la Phase 7 comme jalon final ;
- futures étapes 6C et suivantes laissées à définir au fil des décisions du propriétaire.

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
