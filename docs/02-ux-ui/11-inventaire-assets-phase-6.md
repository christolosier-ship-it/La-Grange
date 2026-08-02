# Inventaire des assets Phase 6B

## Principe

La Phase 6B utilise un noyau graphique minimal. Les cartes et le bandeau reçoivent deux WebP partagés ; les actions utilisent cinq SVG ; tout le reste demeure en HTML/CSS.

Les couvertures de projets sont ajoutées depuis la modale administrateur et versionnées par pull request automatique.

## Assets spécifiques 6B

| ID | Fichier | Format | Dimensions | Alpha | Usage |
|---|---|---|---|---|---|
| C01 | `p6-c01-project-card-skin-standard-640x960.webp` | WebP | 640 × 960 | oui | skin commun des cartes |
| C11 | `p6-c11-stats-beam-1600x220.webp` | WebP | 1600 × 220 | oui | bandeau de statistiques |
| D06 | `p6-d06-icon-github.svg` | SVG | viewBox 0 0 24 24 | oui | GitHub |
| D07 | `p6-d07-icon-launch-app.svg` | SVG | viewBox 0 0 24 24 | oui | lancer l’application |
| D20 | `p6-d20-icon-details.svg` | SVG | viewBox 0 0 24 24 | oui | détail du projet |
| D42 | `p6-d42-icon-readme.svg` | SVG | viewBox 0 0 24 24 | oui | README |
| D43 | `p6-d43-icon-customize.svg` | SVG | viewBox 0 0 24 24 | oui | personnalisation |

## Assets du shell conservés

- enseignes A01 à A04 ;
- fonds B01 à B04 ;
- texture B07 ;
- lumière B12 ;
- navigation D01 à D05 ;
- états D21 à D26.

Ils sont déjà consommés par l’application et ne font pas partie du travail graphique restant de 6B.

## Éléments réalisés sans asset

- marqueur et libellé du style ;
- couleurs principale, secondaire et progression ;
- version ;
- progression ;
- zones d’action ;
- infobulles ;
- fallback de couverture ;
- modale ;
- séparateurs fonctionnels.

## Couvertures

- entrée PNG, JPEG ou WebP ;
- recadrage 8:5 ;
- sortie WebP 640 × 400 ;
- validation et réencodage côté serveur ;
- mise à jour des overrides ;
- branche, commit et PR automatiques.

Aucun master, logo séparé, pack de couverture, planche PNG canonique ou bannière raster de style n’est requis.

## Référence

Le registre détaillé et la liste des fichiers purgés sont dans `docs/05-realisation/10-suivi-production-assets-phase-6.md`.
