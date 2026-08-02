# Phase 6B - Dashboard et personnalisation des projets

## Objectif

Réaliser le dashboard validé le 2026-08-02 et permettre au propriétaire de personnaliser chaque carte par une pull request GitHub sécurisée.

## Simplification validée le 2026-08-02

La production graphique 6B est réduite au noyau commun :

- M06, master de composition ;
- C01, skin partagé de carte ;
- C11, poutre de statistiques ;
- C06, bannière neutre recolorable ;
- D42, action README ;
- D43, action personnalisation.

Les couvertures et logos ne sont plus pré-produits. Ils sont ajoutés depuis la modale de personnalisation. Les planches PNG de validation sont supprimées.

## Prérequis

- documentation 6B fusionnée ;
- ADR-010 accepté ;
- GitHub App limitée au dépôt ;
- déploiement Netlify défini ;
- M06 approuvé et versionné ;
- C01, C06, C11, D42 et D43 produits et validés ;
- ancienne PR SVG 6B fermée sans fusion.

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
- poutre de statistiques ;
- grille continue directement sur le fond ;
- nouvelle carte ;
- cinq actions alignées ;
- infobulles ;
- progression manuelle ;
- version manuelle ou release ;
- neuf styles ;
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

Sans couverture, la carte utilise C18 et le fallback HTML/CSS. Aucun logo séparé n’est requis.

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
