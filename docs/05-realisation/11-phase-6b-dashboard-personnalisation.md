# Phase 6B - Dashboard et personnalisation des projets

## Objectif

Réaliser le dashboard validé le 2026-08-02 et conserver une personnalisation éditoriale versionnée, compatible avec l’hébergement GitHub Pages choisi par le propriétaire.

## Statut d’implémentation

Le dashboard 6B est implémenté. La tentative initiale de publication automatique reposait sur Netlify et a été retirée, car aucun compte ni backend tiers ne fait partie du projet.

Sont réalisés :

- dashboard 6B et rail fixe ;
- cartes C01 et bandeau C11 ;
- styles, couleurs, version et avancement ;
- schéma versionné des overrides ;
- connexion GitHub facultative pour les lectures authentifiées ;
- mode public cache-first ;
- GitHub Actions et GitHub Pages ;
- tests de sécurité du jeton local ;
- documentation corrigée.

La personnalisation automatique par branche et pull request n’est pas activée. Le cinquième bouton de carte explique le parcours manuel vers `project-overrides.json`.

## Noyau graphique retenu

La production graphique 6B est limitée à :

- C01, skin partagé de carte ;
- C11, bandeau de statistiques ;
- D06, accès GitHub ;
- D07, lancement de l’application ;
- D20, détail du projet ;
- D42, accès au README ;
- D43, accès à la personnalisation versionnée.

Aucun master, bannière raster de style, fallback de couverture illustré, pack de projet ou planche PNG canonique n’est requis.

## Lot connexion

- mode public sans jeton ;
- saisie locale d’un jeton personnel finement contrôlé ;
- validation du compte GitHub ;
- stockage dans la session par défaut ;
- mémorisation persistante facultative ;
- suppression à la déconnexion ou après rejet GitHub ;
- envoi uniquement à `api.github.com` ;
- aucune écriture distante.

## Lot interface

- rail gauche fixe à partir de la cible tablette ;
- version et état GitHub dans le rail ;
- bandeau de statistiques C11 ;
- grille continue directement sur le fond ;
- carte habillée par C01 ;
- cinq actions alignées ;
- infobulles au survol et au focus ;
- progression manuelle ;
- version manuelle ou dernière release GitHub ;
- neuf styles avec marqueur HTML/CSS et palettes ;
- dialogue explicatif pour la personnalisation manuelle.

## Couvertures

Les couvertures restent facultatives et versionnées dans `public/assets/phase-6/covers/`. Leur préparation et leur publication sont réalisées lors d’une modification du dépôt, pas depuis la PWA.

Sans couverture, la carte utilise un fallback HTML/CSS avec le nom ou les initiales du projet.

## Critères d’acceptation

- contrat visuel respecté ;
- aucune section redondante ;
- aucune boîte derrière la grille ;
- cinq actions alignées ;
- infobulles accessibles ;
- GitHub Pages comme unique déploiement ;
- mode public fonctionnel ;
- lecture authentifiée facultative ;
- aucun token dans le bundle ou IndexedDB ;
- aucune écriture depuis le navigateur ;
- personnalisation versionnée manuellement ;
- hors ligne préservé ;
- accessibilité et performances ;
- validation sur tablette paysage, bureau, zoom 200 % et images bloquées ;
- aucun P1 ou P2.

## Sortie

La Phase 6B est terminée après fusion de l’implémentation corrective, contrôle de `main`, déploiement GitHub Pages, test multi-appareil et résolution de tous les P1/P2. Elle ne déclenche pas automatiquement la Phase 7.
