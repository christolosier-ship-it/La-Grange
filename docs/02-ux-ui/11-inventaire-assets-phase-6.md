# Inventaire des assets Phase 6B

## Principe

La Phase 6B utilise un noyau graphique volontairement réduit. Les cartes et le bandeau sont habillés par trois WebP partagés ; l’interface, les textes, les couleurs et les états restent en HTML/CSS ; les actions utilisent des SVG locaux.

Les couvertures de projets ne sont pas produites à l’avance. Elles sont ajoutées depuis la modale administrateur et versionnées par une pull request automatique.

## Assets produits

| ID | Fichier | Format | Dimensions | Alpha | Usage | Poids réel |
|---|---|---|---|---|---|---:|
| M06 | `p6-m06-dashboard-phase-6b-master-1920x1080.webp` | WebP | 1920 × 1080 | non | master de composition | inférieur à 2 Mo |
| C01 | `p6-c01-project-card-skin-standard-640x960.webp` | WebP | 640 × 960 | oui | skin partagé des cartes | inférieur à 60 Ko |
| C11 | `p6-c11-stats-beam-1600x220.webp` | WebP | 1600 × 220 | oui | poutre de statistiques | inférieur à 70 Ko |
| C06 | `p6-c06-style-ribbon-neutral-160x240.webp` | WebP | 160 × 240 | oui | bannière de style recolorable | inférieur à 20 Ko |
| D42 | `p6-d42-icon-readme.svg` | SVG | viewBox 0 0 24 24 | oui | action README | inférieur à 8 Ko |
| D43 | `p6-d43-icon-customize.svg` | SVG | viewBox 0 0 24 24 | oui | action personnalisation | inférieur à 8 Ko |

## Assets existants réutilisés

- D06 : GitHub ;
- D07 : lancement de l’application ;
- D20 : détail du projet ;
- C18 : fallback de couverture ;
- enseigne, fonds, texture et lumière issus de la Phase 6A.

## Iconographie de styles

Les neuf styles restent : style de vie, jeux, productivité, santé, éducation, nature, création, technique et métier, inclassable.

Leurs icônes D44 à D52 peuvent être créées ou réutilisées depuis l’iconographie locale pendant l’intégration. Elles ne bloquent plus la production du noyau graphique.

## Éléments qui ne sont pas des assets

- rail fixe ;
- grille ;
- progression ;
- badge de version ;
- rangée des cinq actions ;
- infobulles ;
- modale ;
- palettes des styles ;
- séparateurs fonctionnels ;
- textes et statistiques.

## Couvertures

Les couvertures sont téléversées manuellement dans l’application :

- entrée PNG, JPEG ou WebP ;
- recadrage 8:5 ;
- sortie WebP 640 × 400 ;
- validation et réencodage côté serveur ;
- mise à jour des overrides ;
- branche, commit et PR automatiques.

Aucune série de masters Sxx, exports Fxx ou logos séparés n’est requise par la Phase 6B.

## Validation

Aucune planche PNG canonique n’est produite. Les captures de contrôle restent des preuves temporaires jointes à la PR d’intégration.
