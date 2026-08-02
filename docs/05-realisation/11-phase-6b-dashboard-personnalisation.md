# Phase 6B - Dashboard et personnalisation des projets

## Objectif

Réaliser le dashboard validé le 2026-08-02 et permettre au propriétaire de personnaliser chaque carte par une PR GitHub sécurisée.

## Prérequis

- documentation 6B fusionnée ;
- ADR-010 accepté ;
- GitHub App créée et limitée au dépôt ;
- déploiement Netlify défini ;
- master artistique 6B validé ;
- registre actualisé ;
- ancienne PR SVG 6B gelée ou fermée sans fusion.

## Lot documentaire

- direction artistique ;
- contrat dashboard ;
- architecture ;
- modèle de données ;
- sécurité ;
- déploiement ;
- registre ;
- qualité.

## Lot assets

- master de composition ;
- skin WebP standard ;
- bandeau WebP ;
- bannière de style ;
- icônes README et personnalisation ;
- icônes des neuf styles ;
- couvertures prioritaires ;
- fallbacks.

## Lot serveur

- GitHub App ;
- OAuth ou connexion GitHub ;
- session sécurisée ;
- Function de lecture de session ;
- Function de publication ;
- validation du patch ;
- traitement de couverture ;
- création de branche, commit et PR ;
- journalisation sûre ;
- tests d’autorisation et de conflit.

## Lot interface

- rail gauche fixe ;
- version et état admin ;
- poutre de statistiques ;
- grille continue ;
- nouvelle carte ;
- cinq actions ;
- infobulles ;
- progression ;
- version ;
- styles ;
- modale ;
- aperçu ;
- publication et feedback.

## Données

La modale modifie uniquement les champs explicitement autorisés dans `project-overrides.json`. Les données GitHub factuelles restent en lecture seule.

## Critères d’acceptation

- contrat visuel respecté ;
- aucune section redondante ;
- aucune boîte derrière la grille ;
- même personnalisation après fusion sur plusieurs appareils ;
- publication uniquement par PR ;
- aucune fusion automatique ;
- aucun secret client ;
- couverture conforme ;
- fallback complet ;
- hors ligne préservé ;
- accessibilité ;
- performances ;
- validation humaine des planches.

## Planches

- dashboard bureau ;
- dashboard tablette paysage ;
- états de carte ;
- modale ;
- images bloquées ;
- zoom 200 %.

## Sortie

La Phase 6B est terminée après fusion de l’implémentation, contrôle de `main`, déploiement, test multi-appareil et résolution de tous les P1/P2. Elle ne déclenche pas automatiquement la Phase 7.
