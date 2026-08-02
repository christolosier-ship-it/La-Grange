# Protocole de production des assets Phase 6

## Autorité

Le seul catalogue autorisé est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

## Principe

> Un élément, un contrat, une production, une validation, puis une intégration.

## Formats

- WebP : fonds, skins matériels, poutres, bannières, couvertures et logos ;
- SVG : icônes fonctionnelles et symboles simples ;
- PNG : halos, masques et planches ;
- HTML/CSS : texte, données, progression, états, séparateurs et hitboxes.

Un SVG géométrique n’est pas utilisé pour simuler la richesse d’une matière de carte lorsque le contrat prévoit un WebP.

## Cycle

1. lire la ligne ;
2. vérifier source A/R ;
3. vérifier dépendances P/V ;
4. produire un seul fichier ;
5. exporter exactement ;
6. contrôler signature, dimensions, alpha et poids ;
7. versionner à plat ;
8. cocher P ;
9. obtenir validation humaine ;
10. cocher V ;
11. intégrer plus tard ;
12. cocher I seulement si consommé.

## Interdictions

- production de masse ;
- nom décidé après génération ;
- dimension approximative ;
- texte fonctionnel ;
- bouton dessiné dans un asset ;
- progression ou version inventée ;
- ressource distante ;
- script SVG ;
- ZIP, Base64 ou fragment ;
- ajout dans un sous-dossier hérité ;
- validation par simple présence ;
- intégration d’une sortie brute.

## Phase 6B

L’ordre est :

1. M06 ;
2. C01 WebP ;
3. C11 WebP ;
4. C06 WebP ;
5. D42 et D43 ;
6. D44 à D52 ;
7. sources et couvertures prioritaires ;
8. intégration ;
9. planches G16a à G20.

Les SVG C01 à C10 de l’ancien contrat restent non canoniques.

## Couvertures depuis la modale

La Function :

- accepte PNG/JPEG/WebP ;
- contrôle les octets ;
- limite taille et dimensions ;
- recadre en 640 × 400 ;
- retire les métadonnées ;
- encode en WebP ;
- mesure le poids ;
- applique le nom canonique ;
- ajoute le fichier à la PR.

## Planches

Les planches sont capturées depuis l’application modifiée, après les changements et avant fusion. Elles ne servent pas à inventer une maquette alternative.

## Suite de Phase 6

Aucun asset d’une personnalisation ultérieure n’est produit avant son cadrage documentaire.
