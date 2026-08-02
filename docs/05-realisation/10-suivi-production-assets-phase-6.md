# Suivi de production des assets de la Phase 6

## Autorité

**Ce fichier est l’unique registre opérationnel des assets Phase 6.**

Dernière révision documentaire : 2026-08-02.

Il conserve l’historique canonique 6A, définit la porte d’entrée 6B et retire les prévisions graphiques des personnalisations ultérieures encore non cadrées.

## Statuts

### Sources

- **A** : direction approuvée ;
- **R** : source canonique versionnée dans `docs/assets/phase-6/`.

### Assets

- **P** : fichier final contrôlé et versionné dans `public/assets/phase-6/` ;
- **V** : validation humaine ;
- **I** : consommation réelle par l’application.

### Planches

- **P** : capture versionnée dans `docs/assets/phase-6/` ;
- **V** : capture validée ;
- jamais de statut I.

## Emplacements

- masters et planches : `docs/assets/phase-6/` ;
- assets runtime : `public/assets/phase-6/` ;
- nouveaux fichiers à plat ;
- sous-dossiers historiques gelés ;
- aucun ZIP, Base64 ou fichier temporaire.

## Décision de révision 6B

Les cadres et rails géométriques SVG C01 à C10 de l’ancienne conception ne correspondent pas au contrat 6B. Ils ne reçoivent aucun statut P/V/I et ne sont pas intégrés.

La nouvelle doctrine est :

- WebP pour les matières, skins, bandeaux, bannières et couvertures ;
- HTML/CSS pour les données, la progression, les séparateurs et la structure ;
- SVG pour les icônes fonctionnelles et de style.

---

# 1. Historique canonique Phase 6A

## Sources

| ID | Source | Fichier | A | R |
|---|---|---|---|---|
| M01 | Enseigne | `p6-m01-brand-sign-master-1600x720.webp` | [x] | [x] |
| M02 | Fond d’atelier | `p6-m02-background-workshop-master-2048x1152.webp` | [x] | [x] |

## Assets intégrés

| ID | Fichier | Format | Rôle | P | V | I |
|---|---|---|---|---|---|---|
| A01 | `p6-a01-brand-sign-1600x720.webp` | WebP | enseigne bureau | [x] | [x] | [x] |
| A02 | `p6-a02-brand-sign-800x360.webp` | WebP | enseigne tablette | [x] | [x] | [x] |
| A03 | `p6-a03-brand-sign-mobile-960x560.webp` | WebP | variante étroite de robustesse | [x] | [x] | [x] |
| A04 | `p6-a04-brand-mark.svg` | SVG | symbole compact | [x] | [x] | [x] |
| B01 | `p6-b01-background-workshop-2048x1152.webp` | WebP | fond bureau | [x] | [x] | [x] |
| B02 | `p6-b02-background-workshop-tablet-1366x1024.webp` | WebP | fond tablette paysage | [x] | [x] | [x] |
| B03 | `p6-b03-background-workshop-tablet-1024x1366.webp` | WebP | fond portrait de robustesse | [x] | [x] | [x] |
| B04 | `p6-b04-background-workshop-mobile-780x1386.webp` | WebP | fond étroit de robustesse | [x] | [x] | [x] |
| B07 | `p6-b07-texture-wood-structure-1024x1024.webp` | WebP | texture de structure | [x] | [x] | [x] |
| B12 | `p6-b12-light-main-1600x900.png` | PNG | lumière principale | [x] | [x] | [x] |
| D01–D05 | icônes navigation et synchronisation | SVG | shell | [x] | [x] | [x] |
| D21–D26 | icônes réseau et feedback | SVG | états | [x] | [x] | [x] |

## Planches 6A

| ID | Fichier | P | V |
|---|---|---|---|
| G15a | `p6-g15a-shell-desktop-1440x1024.png` | [x] | [x] |
| G15b | `p6-g15b-shell-tablet-1024x1366.png` | [x] | [x] |
| G15c | `p6-g15c-shell-mobile-390x844.png` | [x] | [x] |

---

# 2. Sources historiques utiles à 6B

| ID | Source | Fichier | A | R | Décision |
|---|---|---|---|---|---|
| M03 | Ancien cadre de carte | `p6-m03-project-card-frame-master-640x960.webp` | [x] | [x] | référence de matière, pas contrat géométrique |
| M04 | Carte Gargotte complète | `p6-m04-gargotte-card-master-640x960.webp` | [x] | [x] | référence de composition |
| M05 | Panneau bienvenue | `p6-m05-welcome-panel-master-640x960.webp` | [x] | [x] | hors périmètre actif 6B |
| S01a | Couverture Gargotte | `p6-s01a-gargotte-adventure-cover-master-960x600.webp` | [x] | [x] | source valide |
| S01c | Logo Gargotte | `p6-s01c-gargotte-adventure-logo-master-1024x320.webp` | [x] | [x] | source valide |

## Assets historiques validés non requis à l’entrée

| ID | Fichier | P | V | I | Décision |
|---|---|---|---|---|---|
| C15 | `p6-c15-paper-note.svg` | [x] | [x] | [ ] | conservé, hors composition dashboard 6B |
| C16 | `p6-c16-welcome-panel-640x960.webp` | [x] | [x] | [ ] | conservé, hors composition dashboard 6B |
| C18 | `p6-c18-project-cover-fallback.svg` | [x] | [x] | [ ] | fallback 6B autorisé |
| F01a | `p6-f01a-gargotte-adventure-cover-640x400.webp` | [x] | [x] | [ ] | requis par carte Gargotte |
| F01b | `p6-f01b-gargotte-adventure-cover-960x600.webp` | [x] | [x] | [ ] | conservé, fiche non traitée en 6B |
| F01c | `p6-f01c-gargotte-adventure-logo-512x160.webp` | [x] | [x] | [ ] | logo facultatif |

---

# 3. Master actif Phase 6B

| ID | Source | Fichier | Dimensions | Alpha | Budget | A | R |
|---|---|---|---|---|---|---|---|
| M06 | Composition dashboard 6B validée | `p6-m06-dashboard-phase-6b-master-1920x1080.webp` | 1920 × 1080 | non | 2 Mo | [ ] | [ ] |

M06 démontre simultanément :

- rail gauche fixe ;
- poutre de statistiques ;
- grille sans section ;
- carte standard ;
- cinq actions ;
- bannière, version, progression et couverture ;
- absence de rail droit et de fond local.

Aucun nouvel asset 6B dérivé ne reçoit P avant A/R de M06.

---

# 4. Assets visuels actifs Phase 6B

## Skins et bandeau

| ID | Fichier final | Format | Dimensions | Alpha | Usage | Fallback | Budget | P | V | I |
|---|---|---|---|---|---|---|---|---|---|---|
| C01 | `p6-c01-project-card-skin-standard-640x960.webp` | WebP | 640 × 960 | oui | skin matériel partagé de carte | surface CSS `FB-PANEL` | 60 Ko | [ ] | [ ] | [ ] |
| C06 | `p6-c06-style-ribbon-neutral-160x240.webp` | WebP | 160 × 240 | oui | bannière neutre recolorable | couleur + icône HTML/SVG | 20 Ko | [ ] | [ ] | [ ] |
| C11 | `p6-c11-stats-beam-1600x220.webp` | WebP | 1600 × 220 | oui | poutre unique des statistiques | grille CSS `FB-PANEL` | 70 Ko | [ ] | [ ] | [ ] |

Le texte, les chiffres, la progression, les boutons et leurs séparateurs ne sont jamais dans ces fichiers.

## Contrôles CSS sans fichier

| ID | Contrôle | Critère | Spécifié | Intégré |
|---|---|---|---|---|
| C05 | traitement archivé | lisible, sans masquer actions | [x] | [ ] |
| C08 | badge de version | texte HTML, couleur de palette | [x] | [ ] |
| C09 | progression | 0–100 manuelle, absente si non renseignée | [x] | [ ] |
| C10 | rangée d’actions | cinq emplacements flexibles sans image prégravée | [x] | [ ] |
| C30 | rail fixe | rail entier fixe dans le viewport | [x] | [ ] |
| C31 | scroll principal | seule la zone principale défile | [x] | [ ] |
| C32 | grille directe | aucun panneau, en-tête ou rail droit | [x] | [ ] |
| C33 | infobulle | survol, focus, Échap, non exclusive | [x] | [ ] |
| C34 | modale | focus piégé, fond inerte, restauration | [x] | [ ] |

---

# 5. Iconographie active Phase 6B

Règles : SVG local, `viewBox 0 0 24 24`, `currentColor`, moins de 8 Ko, libellé accessible.

| ID | Fonction | Fichier | P | V | I |
|---|---|---|---|---|---|
| D06 | GitHub | `p6-d06-icon-github.svg` | [x] | [x] | [ ] |
| D07 | lancer l’application | `p6-d07-icon-launch-app.svg` | [x] | [x] | [ ] |
| D20 | détail du projet | `p6-d20-icon-details.svg` | [x] | [x] | [ ] |
| D42 | README | `p6-d42-icon-readme.svg` | [ ] | [ ] | [ ] |
| D43 | personnaliser | `p6-d43-icon-customize.svg` | [ ] | [ ] | [ ] |
| D44 | style de vie | `p6-d44-icon-style-lifestyle.svg` | [ ] | [ ] | [ ] |
| D45 | jeux | `p6-d45-icon-style-games.svg` | [ ] | [ ] | [ ] |
| D46 | productivité | `p6-d46-icon-style-productivity.svg` | [ ] | [ ] | [ ] |
| D47 | santé | `p6-d47-icon-style-health.svg` | [ ] | [ ] | [ ] |
| D48 | éducation | `p6-d48-icon-style-education.svg` | [ ] | [ ] | [ ] |
| D49 | nature | `p6-d49-icon-style-nature.svg` | [ ] | [ ] | [ ] |
| D50 | création | `p6-d50-icon-style-creation.svg` | [ ] | [ ] | [ ] |
| D51 | technique et métier | `p6-d51-icon-style-technical.svg` | [ ] | [ ] | [ ] |
| D52 | inclassable | `p6-d52-icon-style-uncategorized.svg` | [ ] | [ ] | [ ] |

---

# 6. Projets prioritaires 6B

Chaque projet possède :

- source couverture `Sxxa` 960 × 600 ;
- source logo `Sxxc` 1024 × 320 si un logo est retenu ;
- couverture carte `Fxxa` 640 × 400 ;
- logo `Fxxc` 512 × 160 facultatif.

La couverture fiche `Fxxb` n’est pas une porte d’entrée de 6B.

| Projet | Sources requises | Assets requis |
|---|---|---|
| Gargotte Adventure | S01a, S01c déjà R | F01a déjà P/V, F01c facultatif |
| Les Petites Quêtes | S02a, S02c | F02a, F02c facultatif |
| BibiLeaf | S03a, S03c | F03a, F03c facultatif |
| Agripine | S04a, S04c | F04a, F04c facultatif |
| Luma | S05a, S05c | F05a, F05c facultatif |
| Habit Tracker | S06a, S06c | F06a, F06c facultatif |
| ZythoHunt | S07a, S07c | F07a, F07c facultatif |
| MaintBoard V3 | S08a, S08c | F08a, F08c facultatif |

Les noms suivent la convention existante `p6-fxxa-<slug>-cover-640x400.webp` et `p6-fxxc-<slug>-logo-512x160.webp`.

Les fichiers F02 à F08 restent bloqués tant que leurs sources respectives ne possèdent pas A/R.

---

# 7. Planches d’acceptation 6B

| ID | Fichier | Dimensions | Preuve | P | V |
|---|---|---|---|---|---|
| G16a | `p6-g16a-dashboard-6b-desktop-1440x1024.png` | 1440 × 1024 | dashboard bureau | [ ] | [ ] |
| G16b | `p6-g16b-dashboard-6b-tablet-landscape-1366x1024.png` | 1366 × 1024 | tablette paysage | [ ] | [ ] |
| G17 | `p6-g17-project-card-states-1920x1080.png` | 1920 × 1080 | états de carte et cinq actions | [ ] | [ ] |
| G18 | `p6-g18-customization-modal-1440x1024.png` | 1440 × 1024 | modale et aperçu | [ ] | [ ] |
| G19 | `p6-g19-dashboard-no-images-1440x1024.png` | 1440 × 1024 | fallbacks images bloquées | [ ] | [ ] |
| G20 | `p6-g20-dashboard-zoom-200-1366x2048.png` | 1366 × 2048 | zoom 200 % | [ ] | [ ] |

Les planches sont produites après l’intégration, jamais avant pour simuler le résultat.

---

# 8. Porte d’entrée 6B

La PR d’intégration peut démarrer lorsque :

- M06 possède A/R ;
- C01, C06 et C11 possèdent P/V ;
- D42 à D52 possèdent P/V ;
- C18 et les icônes D06, D07, D20 restent disponibles ;
- les couvertures prioritaires nécessaires à la planche sont P/V ;
- C05, C08, C09, C10, C30 à C34 sont spécifiés ;
- ADR-010 est accepté ;
- le contrat serveur est documenté.

La fusion exige :

- I exact pour chaque fichier consommé ;
- contrôles CSS intégrés ;
- G16a à G20 P/V ;
- CI verte ;
- validation humaine ;
- aucun P1/P2.

---

# 9. Ordre autorisé

1. fusionner la présente documentation ;
2. ne pas fusionner les SVG C01 à C10 de l’ancien contrat ;
3. produire M06 ;
4. produire C01 ;
5. produire C11 ;
6. produire C06 ;
7. produire D42 et D43 ;
8. produire D44 à D52 ;
9. produire les sources et couvertures F02a à F08a, projet par projet ;
10. réaliser l’administration sécurisée ;
11. intégrer le dashboard et la modale ;
12. produire G16a à G20 ;
13. corriger les P1/P2 ;
14. fusionner après validation.

## Prochain élément autorisé

**M06 : `docs/assets/phase-6/p6-m06-dashboard-phase-6b-master-1920x1080.webp`.**

---

# 10. Étapes ultérieures

Aucun asset destiné à une personnalisation UI/UX postérieure à 6B n’est inscrit. Il sera ajouté seulement après un nouveau cadrage du propriétaire. La Phase 7 reste hors du registre de production et conserve son rôle d’audit final.
