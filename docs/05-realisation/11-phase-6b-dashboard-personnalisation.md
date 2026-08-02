# Phase 6B - Dashboard et personnalisation des projets

## Objectif

Réaliser le dashboard validé le 2026-08-02 et permettre au propriétaire de personnaliser chaque carte par une pull request GitHub sécurisée.

## Statut d’implémentation

L’implémentation est portée par la PR #33.

Sont réalisés dans le dépôt :

- dashboard 6B et rail fixe ;
- cartes C01 et bandeau C11 ;
- styles, couleurs, version et avancement ;
- modale de personnalisation ;
- schéma versionné des overrides ;
- recadrage et conversion des couvertures ;
- session OAuth administrateur ;
- Netlify Functions ;
- écriture par GitHub App et création automatique de PR ;
- tests, typecheck des Functions, cache PWA et documentation.

Restent externes au code et nécessaires à l’activation réelle :

- création ou configuration du client OAuth GitHub ;
- création et installation de la GitHub App sur le seul dépôt `La-Grange` ;
- configuration des variables Netlify ;
- contrôle visuel sur les appareils cibles ;
- test bout en bout de création d’une PR depuis le déploiement Netlify.

## Noyau graphique retenu

La production graphique 6B est limitée à :

- C01, skin partagé de carte ;
- C11, bandeau de statistiques ;
- D06, accès GitHub ;
- D07, lancement de l’application ;
- D20, détail du projet ;
- D42, accès au README ;
- D43, personnalisation.

Aucun master, bannière raster de style, fallback de couverture illustré, pack de projet ou planche PNG canonique n’est requis.

## Lot serveur implémenté

- authentification OAuth GitHub ;
- session HMAC sécurisée en cookie ;
- Function de lecture et de fermeture de session ;
- Function de publication ;
- validation stricte du patch ;
- contrôle réel du WebP, de ses dimensions et de son poids ;
- chemin de couverture calculé côté serveur ;
- création de branche, commit et PR ;
- contrôle de la SHA de `main` ;
- aucune écriture directe sur `main` ;
- aucune fusion automatique.

## Lot interface implémenté

- rail gauche fixe à partir de la cible tablette ;
- version et état administrateur dans le rail ;
- bandeau de statistiques C11 ;
- grille continue directement sur le fond ;
- carte habillée par C01 ;
- cinq actions alignées ;
- infobulles au survol et au focus ;
- progression manuelle ;
- version manuelle ou dernière release GitHub ;
- neuf styles avec marqueur HTML/CSS et palettes ;
- modale et aperçu ;
- téléversement et recadrage de couverture ;
- publication et feedback.

## Couvertures

La couverture est facultative et gérée depuis la modale :

1. sélection PNG, JPEG ou WebP ;
2. décodage dans le navigateur ;
3. recadrage central 8:5 ;
4. réencodage WebP 640 × 400 par canvas, ce qui retire les métadonnées sources ;
5. validation serveur de la signature, du sous-format, des dimensions et du poids ;
6. mise à jour des overrides ;
7. création de PR.

Sans couverture, la carte utilise un fallback HTML/CSS avec le nom ou les initiales du projet. Aucun logo séparé n’est requis.

## Critères d’acceptation

- contrat visuel respecté ;
- aucune section redondante ;
- aucune boîte derrière la grille ;
- cinq actions alignées ;
- infobulles accessibles ;
- même personnalisation après fusion sur plusieurs appareils ;
- publication uniquement par PR ;
- aucune fusion automatique ;
- aucun secret client ;
- couverture conforme ou fallback complet ;
- hors ligne préservé ;
- accessibilité et performances ;
- validation sur tablette paysage, bureau, zoom 200 % et images bloquées ;
- aucun P1 ou P2.

## Validation

Les preuves sont jointes à la PR d’intégration sous forme de captures et de résultats de tests. Elles ne deviennent pas des assets canoniques et ne sont pas ajoutées au registre.

## Sortie

La Phase 6B est terminée après fusion de l’implémentation, contrôle de `main`, déploiement, test multi-appareil, test de publication réel et résolution de tous les P1/P2. Elle ne déclenche pas automatiquement la Phase 7.
