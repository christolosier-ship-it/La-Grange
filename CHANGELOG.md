# Changelog

Toutes les évolutions notables de La Grange sont consignées ici.

## [Non publié]

### Connexion et synchronisation GitHub

- bouton de connexion GitHub directement dans La Grange avec retour OAuth automatique ;
- conservation du jeton OAuth dans une session chiffrée `HttpOnly`, limitée à huit heures ;
- distinction explicite entre compte GitHub connecté et droits administrateur ;
- proxy Netlify de lecture GitHub limité aux dépôts, commits, releases et README ;
- bascule automatique des lectures vers le quota authentifié après connexion ;
- requêtes conditionnelles par ETag réactivées sur le chemin same-origin ;
- synchronisation forcée et rechargement des versions après authentification ;
- maintien de la consultation publique directe pour les visiteurs non connectés ;
- tests du chiffrement, de la liste blanche du proxy et du routage client.

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
- modale administrateur avec aperçu, couleurs, avancement, version et couverture ;
- schéma v3 de `project-overrides.json` avec compatibilité de lecture de l’ancien format ;
- conversion des couvertures en WebP 640 × 400 et validation serveur stricte ;
- authentification OAuth GitHub, session chiffrée et liste blanche administrateur ;
- GitHub App limitée au dépôt `La-Grange` pour créer branche, commit et PR sans fusion automatique ;
- configuration Netlify, en-têtes de sécurité et typecheck des Functions ;
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
