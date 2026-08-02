# Suivi de production des assets de la Phase 6

## Autorité

**Ce fichier est l’unique registre opérationnel des assets Phase 6.**

Dernière révision : 2026-08-02, après purge du dépôt.

## Doctrine

- conserver uniquement les fichiers réellement consommés ou explicitement nécessaires à la prochaine intégration ;
- WebP ou PNG pour les matières et décors ;
- SVG pour les icônes fonctionnelles ;
- HTML/CSS pour les textes, états, couleurs, progression, séparateurs et fallbacks ;
- couvertures ajoutées depuis la modale, puis réencodées en WebP 640 × 400 ;
- aucun master, planche de validation, ZIP, doublon ou asset prospectif dans le dépôt.

## Statuts

- **P** : fichier final présent et techniquement contrôlé ;
- **V** : validation humaine ;
- **I** : fichier réellement consommé par l’application.

---

# 1. Assets intégrés au shell actuel

| ID | Fichier ou série | Fonction | P | V | I |
|---|---|---|---|---|---|
| A01–A03 | enseignes WebP responsive | marque principale | [x] | [x] | [x] |
| A04 | `p6-a04-brand-mark.svg` | médaillon LG | [x] | [x] | [x] |
| B01–B04 | fonds d’atelier responsive | fond général | [x] | [x] | [x] |
| B07 | `p6-b07-texture-wood-structure-1024x1024.webp` | texture du shell | [x] | [x] | [x] |
| B12 | `p6-b12-light-main-1600x900.png` | lumière principale | [x] | [x] | [x] |
| D01–D05 | navigation et synchronisation | shell fixe | [x] | [x] | [x] |
| D21–D26 | états réseau et feedback | panneau de synchronisation | [x] | [x] | [x] |

Ces fichiers restent protégés tant que le shell actuel les référence.

---

# 2. Noyau graphique de la Phase 6B

| ID | Fichier | Format | Dimensions | Alpha | Fonction | P | V | I |
|---|---|---|---|---|---|---|---|---|
| C01 | `p6-c01-project-card-skin-standard-640x960.webp` | WebP | 640 × 960 | oui | skin commun des cartes | [x] | [x] | [ ] |
| C11 | `p6-c11-stats-beam-1600x220.webp` | WebP | 1600 × 220 | oui | bandeau supérieur des statistiques | [x] | [x] | [ ] |
| D06 | `p6-d06-icon-github.svg` | SVG | 24 × 24 | oui | accès GitHub | [x] | [x] | [ ] |
| D07 | `p6-d07-icon-launch-app.svg` | SVG | 24 × 24 | oui | lancement de l’application | [x] | [x] | [ ] |
| D20 | `p6-d20-icon-details.svg` | SVG | 24 × 24 | oui | détail du projet | [x] | [x] | [ ] |
| D42 | `p6-d42-icon-readme.svg` | SVG | 24 × 24 | oui | README | [x] | [x] | [ ] |
| D43 | `p6-d43-icon-customize.svg` | SVG | 24 × 24 | oui | personnalisation | [x] | [x] | [ ] |

## Éléments sans fichier graphique

- marqueur de style du projet ;
- palettes principale, secondaire et progression ;
- badge de version ;
- barre de progression ;
- cinq emplacements d’action ;
- infobulles ;
- fallback de couverture ;
- modale et ses états.

Ces éléments sont réalisés en HTML/CSS et ne doivent pas recréer C06, C18 ou une autre image décorative dédiée.

---

# 3. Couvertures de projets

Les couvertures ne sont pas pré-produites.

La modale administrateur :

1. accepte PNG, JPEG ou WebP ;
2. permet le recadrage 8:5 ;
3. supprime les métadonnées ;
4. réencode en WebP 640 × 400 ;
5. calcule le chemin canonique ;
6. met à jour `project-overrides.json` ;
7. crée une branche, un commit et une pull request.

Sans couverture, la carte utilise un fallback HTML/CSS avec le nom ou les initiales du projet. Aucun logo séparé n’est requis.

---

# 4. Assets purgés

Sont explicitement retirés et ne doivent pas être recréés sans nouvelle décision :

- variantes de marque A05 à A12 dupliquant les icônes PWA existantes ;
- fonds, textures, lumières et ombres B05, B08 à B11 et B13 à B15 ;
- anciens cadres C01, C02 et C03 ;
- bannière raster C06 ;
- papier C15, panneau C16 et fallback C18 ;
- icônes D08 à D19 et D27 à D41 non consommées ;
- pack Gargotte F01a à F01c ;
- masters et planches sous `docs/assets/phase-6/` ;
- anciens sous-dossiers `brand`, `components`, `panels`, `projects` et `shell`.

---

# 5. Porte d’entrée de l’intégration 6B

L’intégration peut commencer avec C01, C11, D06, D07, D20, D42 et D43.

Les icônes des neuf styles sont réutilisées depuis l’iconographie locale ou dessinées au moment du raccord. Elles ne sont pas pré-produites dans le registre.

## Prochain travail autorisé

**Intégrer le dashboard 6B et la modale de personnalisation, sans produire de nouveau lot graphique préalable.**
