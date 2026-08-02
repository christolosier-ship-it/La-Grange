# Phase 6B - Dashboard et personnalisation des projets

## Objectif

Réaliser le dashboard validé le 2026-08-02 et permettre au propriétaire de personnaliser chaque carte par une pull request GitHub sécurisée.

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

## Prérequis

- documentation 6B fusionnée ;
- ADR-010 accepté ;
- GitHub App limitée au dépôt ;
- déploiement Netlify défini ;
- C01, C11, D06, D07, D20, D42 et D43 présents et validés ;
- dépôt purgé des assets prospectifs et des doublons.

## Lot serveur

- authentification GitHub ;
- session sécurisée ;
- Function de lecture de session ;
- Function de publication ;
- validation stricte du patch ;
- traitement de couverture ;
- création de branche, commit et PR ;
- journalisation sûre ;
- tests d’autorisation, de fichier et de conflit.

## Lot interface

- rail gauche fixe ;
- version et état administrateur dans le rail ;
- bandeau de statistiques C11 ;
- grille continue directement sur le fond ;
- carte habillée par C01 ;
- cinq actions alignées ;
- infobulles ;
- progression manuelle ;
- version manuelle ou release ;
- neuf styles réalisés en HTML/CSS et iconographie locale ;
- modale et aperçu ;
- téléversement et recadrage de couverture ;
- publication et feedback.

## Couvertures

La couverture est facultative et gérée depuis la modale :

1. sélection PNG, JPEG ou WebP ;
2. aperçu et recadrage 8:5 ;
3. validation et réencodage serveur en WebP 640 × 400 ;
4. mise à jour des overrides ;
5. création de PR.

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

La Phase 6B est terminée après fusion de l’implémentation, contrôle de `main`, déploiement, test multi-appareil et résolution de tous les P1/P2. Elle ne déclenche pas automatiquement la Phase 7.
