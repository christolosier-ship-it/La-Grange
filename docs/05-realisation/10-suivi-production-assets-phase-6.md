# Suivi de production des assets de la Phase 6

## Statut et autorité

**Ce fichier est la source de vérité unique du catalogue des assets de la Phase 6.**

Dernière mise à jour : 2026-07-30.

Il fixe les identifiants, noms finaux, formats, dimensions, transparences, usages, fallbacks, budgets, provenances, droits et statuts. En cas de conflit, le présent registre prime pour la production et l’intégration des assets.

## Dossiers autorisés et exception transitoire

- masters et planches : `docs/assets/phase-6/`, à plat ;
- assets canoniques produits : `public/assets/phase-6/`, à plat.

Un asset peut être présent à la racine de `public/assets/phase-6/` avec P et V cochés tout en conservant I décoché. Sa présence versionnée permet la validation, les planches et les mesures ; I signifie uniquement que l’application le consomme réellement.

Les sous-dossiers hérités `brand/`, `components/`, `panels/`, `projects/` et `shell/` constituent une **exception transitoire gelée** :

- aucun nouveau fichier n’y est ajouté ;
- leur contenu reste non canonique ;
- ils ne satisfont aucun statut P, V ou I ;
- ils sont retirés manuellement, fichier par fichier, après remplacement et contrôle des références ;
- le contrôle de dossier plat porte sur tous les nouveaux fichiers canoniques.

## Nommage obligatoire

- raster : `p6-<id>-<nom>-<largeur>x<hauteur>.<extension>` ;
- SVG : `p6-<id>-<nom>.svg` ;
- minuscules, tirets, aucun espace, accent ou date ;
- dimensions obligatoires dans tout nom raster ;
- identifiant exact du registre obligatoire ;
- aucune variante non enregistrée ;
- aucun ZIP, Base64, fragment ou workflow de matérialisation ;
- les planches documentaires suivent la même convention `p6-<id>-...`.

## Méthode obligatoire

### Masters et sources

1. sélectionner une seule ligne M ou S ;
2. produire ou importer le fichier canonique ;
3. contrôler nom, format, dimensions, alpha, budget, provenance et droits ;
4. le placer à plat dans `docs/assets/phase-6/` ;
5. obtenir l’approbation humaine A ;
6. cocher R uniquement lorsque le fichier exact est versionné.

### Assets

1. sélectionner une seule ligne A à F ;
2. vérifier que la source M, S ou asset dérivé est versionnée ;
3. produire uniquement ce fichier ;
4. exporter exactement au nom, format, dimensions et budget indiqués ;
5. contrôler signature, dimensions, alpha, poids et absence de texte fonctionnel ;
6. renseigner précisément la provenance et les droits ;
7. placer le fichier à plat dans `public/assets/phase-6/` ;
8. cocher P après contrôle technique et présence versionnée ;
9. obtenir la validation humaine puis cocher V ;
10. mettre à jour le champ « Prochain élément autorisé ».

### Intégration ultérieure

L’intégration ne suit pas immédiatement la validation. Elle commence uniquement lorsque la matrice des lots ci-dessous est satisfaite.

Dans la PR 6A à 6E :

1. raccorder les fichiers déjà présents à la racine du dossier ;
2. raccorder les fallbacks ;
3. contrôler responsive, hors ligne, performance et accessibilité ;
4. cocher I uniquement lorsque l’application consomme réellement le fichier.

La production en masse sans validation intermédiaire est interdite.

## Statuts

### Masters et sources

- **A** : direction ou source approuvée par le propriétaire ;
- **R** : fichier canonique présent sous son nom final dans `docs/assets/phase-6/`.

### Assets

- **P** : export conforme, contrôlé et versionné sous son nom final dans `public/assets/phase-6/` ;
- **V** : export validé humainement ;
- **I** : fichier réellement consommé par l’application.

La valeur `à renseigner avant P` ou `à confirmer avant R` est bloquante.

## Priorités

- P0 : shell ou premier lot visuel ;
- P1 : cartes, vues principales ou projets mis en avant ;
- P2 : cohérence complète ;
- P3 : ornement facultatif.

---

# 1. Masters artistiques

| ID | P | Master | Fichier canonique | Dimensions | Alpha | Usage | Source / droits | Budget max | A | R |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M01 | P0 | Enseigne La Grange | `p6-m01-brand-sign-master-1600x720.webp` | 1600 × 720 | oui | Direction approuvée de l’enseigne | création utilisateur/IA, droits projet à confirmer avant R | 1,5 Mo | [x] | [ ] |
| M02 | P0 | Fond d’atelier | `p6-m02-background-workshop-master-2048x1152.webp` | 2048 × 1152 | non | Direction approuvée du fond nocturne | création utilisateur/IA, droits projet à confirmer avant R | 2 Mo | [x] | [ ] |
| M03 | P0 | Cadre de carte vide | `p6-m03-project-card-frame-master-640x960.webp` | 640 × 960 | oui | Direction approuvée du cadre vertical | création utilisateur/IA, droits projet à confirmer avant R | 1,2 Mo | [x] | [ ] |
| M04 | P1 | Carte Gargotte complète | `p6-m04-gargotte-card-master-640x960.webp` | 640 × 960 | non | Référence de composition Gargotte, jamais intégrée telle quelle | création utilisateur/IA, droits projet à confirmer avant R | 1,2 Mo | [x] | [ ] |
| M05 | P0 | Panneau de bienvenue | `p6-m05-welcome-panel-master-640x960.webp` | 640 × 960 | oui | Direction approuvée du papier suspendu | création utilisateur/IA, droits projet à confirmer avant R | 1,2 Mo | [x] | [ ] |

## 1.2 Sources canoniques des projets

Une couverture et un logo possèdent des sources séparées. Les lignes F ne peuvent pas recevoir P tant que leur source S n’a pas R coché.

| ID | P | Source | Fichier canonique | Dimensions | Alpha | Usage | Source / droits | Budget max | A | R |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S01a | P0 | Gargotte Adventure, master couverture | `p6-s01a-gargotte-adventure-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | M04 + adaptation interne, droits projet à confirmer avant R | 1,5 Mo | [x] | [ ] |
| S01c | P0 | Gargotte Adventure, master logo | `p6-s01c-gargotte-adventure-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | M04 + adaptation interne, droits projet à confirmer avant R | 1 Mo | [x] | [ ] |
| S02a | P0 | Les Petites Quêtes, master couverture | `p6-s02a-les-petites-quetes-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S02c | P0 | Les Petites Quêtes, master logo | `p6-s02c-les-petites-quetes-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S03a | P0 | BibiLeaf, master couverture | `p6-s03a-bibilleaf-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S03c | P0 | BibiLeaf, master logo | `p6-s03c-bibilleaf-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S04a | P0 | Agripine, master couverture | `p6-s04a-agripine-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S04c | P0 | Agripine, master logo | `p6-s04c-agripine-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S05a | P0 | Luma, master couverture | `p6-s05a-luma-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S05c | P0 | Luma, master logo | `p6-s05c-luma-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S06a | P0 | Tracker Habit, master couverture | `p6-s06a-tracker-habit-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S06c | P0 | Tracker Habit, master logo | `p6-s06c-tracker-habit-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S07a | P0 | ZythoHunt, master couverture | `p6-s07a-zythohunt-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S07c | P0 | ZythoHunt, master logo | `p6-s07c-zythohunt-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S08a | P0 | MaintBoard V3, master couverture | `p6-s08a-maintboard-v3-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S08c | P0 | MaintBoard V3, master logo | `p6-s08c-maintboard-v3-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S09a | P1 | CadeauScope, master couverture | `p6-s09a-cadeauscope-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S09c | P1 | CadeauScope, master logo | `p6-s09c-cadeauscope-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S10a | P1 | GargoGen, master couverture | `p6-s10a-gargogen-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S10c | P1 | GargoGen, master logo | `p6-s10c-gargogen-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S11a | P1 | Tiny Universe, master couverture | `p6-s11a-tiny-universe-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S11c | P1 | Tiny Universe, master logo | `p6-s11c-tiny-universe-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S12a | P1 | TeissAI, master couverture | `p6-s12a-teissai-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S12c | P1 | TeissAI, master logo | `p6-s12c-teissai-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S13a | P1 | DermIA Quantum, master couverture | `p6-s13a-dermia-quantum-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S13c | P1 | DermIA Quantum, master logo | `p6-s13c-dermia-quantum-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S14a | P1 | Casse-latte Simulator 2026, master couverture | `p6-s14a-casse-latte-simulator-2026-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S14c | P1 | Casse-latte Simulator 2026, master logo | `p6-s14c-casse-latte-simulator-2026-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S15a | P2 | Gargotte V5, master couverture | `p6-s15a-gargotte-v5-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S15c | P2 | Gargotte V5, master logo | `p6-s15c-gargotte-v5-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S16a | P2 | PQ-, master couverture | `p6-s16a-pq-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S16c | P2 | PQ-, master logo | `p6-s16c-pq-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S17a | P2 | AI Agents for Beginners, master couverture | `p6-s17a-ai-agents-for-beginners-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S17c | P2 | AI Agents for Beginners, master logo | `p6-s17c-ai-agents-for-beginners-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |
| S18a | P2 | La Grange, master couverture | `p6-s18a-la-grange-cover-master-960x600.webp` | 960 × 600 | non | Source des couvertures 640 et 960 | direction du projet à approuver, droits à confirmer avant R | 1,5 Mo | [ ] | [ ] |
| S18c | P2 | La Grange, master logo | `p6-s18c-la-grange-logo-master-1024x320.webp` | 1024 × 320 | oui | Source du logo 512 × 160 | identité du projet à approuver, droits à confirmer avant R | 1 Mo | [ ] | [ ] |

---

# 2. Identité de marque

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage | Fallback | Source / droits | Budget max | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A01 | P0 | `p6-a01-brand-sign-1600x720.webp` | WebP | 1600 × 720 | oui | Enseigne desktop, marque seule, centrée dans le rail gauche | texte HTML « La Grange » | M01, méthode et droits à renseigner précisément avant P | 100 Ko | [ ] | [ ] | [ ] |
| A02 | P0 | `p6-a02-brand-sign-800x360.webp` | WebP | 800 × 360 | oui | Enseigne tablette, même composition que A01 | texte HTML « La Grange » | A01, méthode et droits à renseigner précisément avant P | 60 Ko | [ ] | [ ] | [ ] |
| A03 | P0 | `p6-a03-brand-sign-mobile-960x560.webp` | WebP | 960 × 560 | oui | Composition resserrée pour mobile, lisible à 280 px CSS | texte HTML « La Grange » | M01, méthode et droits à renseigner précisément avant P | 80 Ko | [ ] | [ ] | [ ] |
| A04 | P1 | `p6-a04-brand-mark.svg` | SVG | viewBox 256 × 256 | oui | Symbole compact de navigation et raccourcis | initiales LG en texte | M01, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| A05 | P2 | `p6-a05-brand-mark-light.svg` | SVG | viewBox 256 × 256 | oui | Variante monochrome claire | A04 avec `currentColor` | A04, méthode et droits à renseigner précisément avant P | 12 Ko | [ ] | [ ] | [ ] |
| A06 | P2 | `p6-a06-brand-mark-dark.svg` | SVG | viewBox 256 × 256 | oui | Variante monochrome sombre | A04 avec `currentColor` | A04, méthode et droits à renseigner précisément avant P | 12 Ko | [ ] | [ ] | [ ] |
| A07 | P2 | `p6-a07-favicon-32x32.png` | PNG | 32 × 32 | oui | Favicon 32 px | initiales LG | A04, méthode et droits à renseigner précisément avant P | 8 Ko | [ ] | [ ] | [ ] |
| A08 | P2 | `p6-a08-favicon-48x48.png` | PNG | 48 × 48 | oui | Favicon 48 px | initiales LG | A04, méthode et droits à renseigner précisément avant P | 10 Ko | [ ] | [ ] | [ ] |
| A09 | P2 | `p6-a09-pwa-icon-192x192.png` | PNG | 192 × 192 | non | Icône PWA opaque | icône provisoire actuelle | A04, méthode et droits à renseigner précisément avant P | 45 Ko | [ ] | [ ] | [ ] |
| A10 | P2 | `p6-a10-pwa-icon-512x512.png` | PNG | 512 × 512 | non | Icône PWA haute définition | icône provisoire actuelle | A04, méthode et droits à renseigner précisément avant P | 150 Ko | [ ] | [ ] | [ ] |
| A11 | P2 | `p6-a11-pwa-maskable-512x512.png` | PNG | 512 × 512 | non | Icône maskable, sujet dans la safe area 409 × 409 | A10 | A04, méthode et droits à renseigner précisément avant P | 150 Ko | [ ] | [ ] | [ ] |
| A12 | P2 | `p6-a12-apple-touch-icon-180x180.png` | PNG | 180 × 180 | non | Icône Apple Touch sans coins pré-arrondis | A10 | A04, méthode et droits à renseigner précisément avant P | 50 Ko | [ ] | [ ] | [ ] |

---

# 3. Fond, matières et lumière

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage | Fallback | Source / droits | Budget max | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B01 | P0 | `p6-b01-background-workshop-2048x1152.webp` | WebP | 2048 × 1152 | non | Fond desktop, centre calme, aucune information fonctionnelle | gradients du design system | M02, méthode et droits à renseigner précisément avant P | 190 Ko | [ ] | [ ] | [ ] |
| B02 | P0 | `p6-b02-background-workshop-tablet-1366x1024.webp` | WebP | 1366 × 1024 | non | Recadrage tablette paysage, rail gauche préservé | gradients | M02, méthode et droits à renseigner précisément avant P | 160 Ko | [ ] | [ ] | [ ] |
| B03 | P0 | `p6-b03-background-workshop-tablet-1024x1366.webp` | WebP | 1024 × 1366 | non | Recadrage tablette portrait, centre de lecture libre | gradients | M02, méthode et droits à renseigner précisément avant P | 160 Ko | [ ] | [ ] | [ ] |
| B04 | P0 | `p6-b04-background-workshop-mobile-780x1386.webp` | WebP | 780 × 1386 | non | Export 2× pour 390 px CSS, décor fortement allégé | gradients | M02, méthode et droits à renseigner précisément avant P | 120 Ko | [ ] | [ ] | [ ] |
| B05 | P2 | `p6-b05-background-workshop-low-density-780x1386.webp` | WebP | 780 × 1386 | non | Variante économie de données, faible détail | couleur unie | B04, méthode et droits à renseigner précisément avant P | 90 Ko | [ ] | [ ] | [ ] |
| B07 | P0 | `p6-b07-texture-wood-structure-1024x1024.webp` | WebP | 1024 × 1024 | non | Tuile raccordable de charpente, veinage faible | brun uni | création interne, méthode et droits à renseigner précisément avant P | 70 Ko | [ ] | [ ] | [ ] |
| B08 | P0 | `p6-b08-texture-wood-crate-1024x1024.webp` | WebP | 1024 × 1024 | non | Tuile raccordable de caisse, plus claire que B07 | brun de surface | création interne, méthode et droits à renseigner précisément avant P | 70 Ko | [ ] | [ ] | [ ] |
| B09 | P1 | `p6-b09-texture-paper-calm-512x512.webp` | WebP | 512 × 512 | non | Papier très discret derrière texte | beige uni | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| B10 | P1 | `p6-b10-texture-metal-dark-512x512.webp` | WebP | 512 × 512 | non | Métal mat sans chrome | gris brun uni | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| B11 | P2 | `p6-b11-texture-dark-glass-512x512.webp` | WebP | 512 × 512 | oui | Surface semi-opaque pour données secondaires | fond sombre opaque | création interne, méthode et droits à renseigner précisément avant P | 40 Ko | [ ] | [ ] | [ ] |
| B12 | P0 | `p6-b12-light-main-1600x900.png` | PNG | 1600 × 900 | oui | Masque de lumière ambre principal | gradient radial CSS | création interne, méthode et droits à renseigner précisément avant P | 60 Ko | [ ] | [ ] | [ ] |
| B13 | P1 | `p6-b13-light-sync-256x256.png` | PNG | 256 × 256 | oui | Halo court de synchronisation | bordure CSS | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| B14 | P1 | `p6-b14-light-new-project-256x256.png` | PNG | 256 × 256 | oui | Accent temporaire nouvelle arrivée | bordure CSS | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| B15 | P2 | `p6-b15-shadow-structure-1600x900.png` | PNG | 1600 × 900 | oui | Ombres de poutres sans couvrir le contenu | ombres CSS | création interne, méthode et droits à renseigner précisément avant P | 60 Ko | [ ] | [ ] | [ ] |

---

# 4. Cadres, panneaux et contrôles

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage | Fallback | Source / droits | Budget max | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C01 | P0 | `p6-c01-project-card-frame-standard.svg` | SVG | viewBox 640 × 960 | oui | Cadre carte standard, fenêtre libre, aucun texte | bordure CSS | M03, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| C02 | P0 | `p6-c02-project-card-frame-compact.svg` | SVG | viewBox 512 × 720 | oui | Cadre compact, géométrie issue de C01 | bordure CSS | C01, méthode et droits à renseigner précisément avant P | 30 Ko | [ ] | [ ] | [ ] |
| C03 | P1 | `p6-c03-project-card-frame-featured.svg` | SVG | viewBox 800 × 960 | oui | Carte mise en avant, accent plus large | C01 | C01, méthode et droits à renseigner précisément avant P | 40 Ko | [ ] | [ ] | [ ] |
| C04 | P1 | `p6-c04-project-card-frame-list.svg` | SVG | viewBox 960 × 320 | oui | Cadre horizontal de vue liste | bordure CSS | C01, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| C06 | P1 | `p6-c06-ribbon-category.svg` | SVG | viewBox 160 × 240 | oui | Ruban de catégorie recolorable, sans texte | badge CSS | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| C07 | P1 | `p6-c07-ribbon-new-project.svg` | SVG | viewBox 160 × 240 | oui | Ruban nouvelle arrivée, sans texte | badge texte | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| C08 | P1 | `p6-c08-status-label.svg` | SVG | viewBox 320 × 96 | oui | Étiquette d’état neutre, texte séparé | badge CSS et texte | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| C09 | P1 | `p6-c09-metadata-rail.svg` | SVG | viewBox 640 × 96 | oui | Rail de métadonnées sans icône intégrée | séparateur CSS | création interne, méthode et droits à renseigner précisément avant P | 18 Ko | [ ] | [ ] | [ ] |
| C10 | P1 | `p6-c10-actions-rail.svg` | SVG | viewBox 640 × 120 | oui | Rail inférieur, quatre actions maximum | ligne CSS | création interne, méthode et droits à renseigner précisément avant P | 20 Ko | [ ] | [ ] | [ ] |
| C11 | P0 | `p6-c11-stats-beam.svg` | SVG | viewBox 1600 × 220 | oui | Poutre de quatre statistiques réelles maximum | panneau CSS | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| C12 | P0 | `p6-c12-section-beam.svg` | SVG | viewBox 1600 × 120 | oui | Poutre de titre, texte et lien hors asset | texte et bordure CSS | création interne, méthode et droits à renseigner précisément avant P | 30 Ko | [ ] | [ ] | [ ] |
| C13 | P0 | `p6-c13-panel-wood-secondary.svg` | SVG | viewBox 640 × 960 | oui | Panneau bois de navigation, filtre ou résumé | panneau CSS | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| C14 | P1 | `p6-c14-panel-dark-glass.svg` | SVG | viewBox 640 × 960 | oui | Panneau sombre pour activité et données secondaires | fond sombre CSS | création interne, méthode et droits à renseigner précisément avant P | 30 Ko | [ ] | [ ] | [ ] |
| C15 | P1 | `p6-c15-paper-note.svg` | SVG | viewBox 640 × 800 | oui | Papier vide pour aide et état vide | panneau beige CSS | création interne, méthode et droits à renseigner précisément avant P | 30 Ko | [ ] | [ ] | [ ] |
| C16 | P0 | `p6-c16-welcome-panel-640x960.webp` | WebP | 640 × 960 | oui | Panneau de bienvenue illustré, sans texte fonctionnel | C15 et texte HTML | M05, méthode et droits à renseigner précisément avant P | 100 Ko | [ ] | [ ] | [ ] |
| C17 | P1 | `p6-c17-empty-slot.svg` | SVG | viewBox 512 × 720 | oui | Emplacement vide non ambigu | bordure pointillée CSS | création interne, méthode et droits à renseigner précisément avant P | 20 Ko | [ ] | [ ] | [ ] |
| C18 | P1 | `p6-c18-project-cover-fallback.svg` | SVG | viewBox 640 × 400 | oui | Fallback de couverture, initiales hors asset | initiales et nom HTML | création interne, méthode et droits à renseigner précisément avant P | 25 Ko | [ ] | [ ] | [ ] |
| C19 | P2 | `p6-c19-modal-frame.svg` | SVG | viewBox 960 × 720 | oui | Décor périphérique de modale accessible | panneau CSS | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| C20 | P2 | `p6-c20-toast-frame.svg` | SVG | viewBox 640 × 160 | oui | Cadre léger de notification temporaire | bordure CSS | création interne, méthode et droits à renseigner précisément avant P | 20 Ko | [ ] | [ ] | [ ] |
| C21 | P2 | `p6-c21-diagnostic-panel.svg` | SVG | viewBox 960 × 720 | oui | Panneau de diagnostic, texte sélectionnable | surface CSS | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| C22 | P1 | `p6-c22-button-primary.svg` | SVG | viewBox 480 × 112 | oui | Plaque de bouton principal, texte HTML | bouton CSS | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| C23 | P1 | `p6-c23-button-secondary.svg` | SVG | viewBox 480 × 112 | oui | Plaque de bouton secondaire | bouton CSS | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| C24 | P1 | `p6-c24-button-danger.svg` | SVG | viewBox 480 × 112 | oui | Plaque danger limitée, texte obligatoire | bouton CSS rouge | création interne, méthode et droits à renseigner précisément avant P | 15 Ko | [ ] | [ ] | [ ] |
| C25 | P1 | `p6-c25-search-field-frame.svg` | SVG | viewBox 960 × 112 | oui | Cadre de recherche, champ natif visible | champ natif sans cadre | création interne, méthode et droits à renseigner précisément avant P | 20 Ko | [ ] | [ ] | [ ] |
| C26 | P1 | `p6-c26-filter-chip.svg` | SVG | viewBox 320 × 96 | oui | Étiquette de filtre, état en CSS | bouton natif | création interne, méthode et droits à renseigner précisément avant P | 12 Ko | [ ] | [ ] | [ ] |
| C27 | P2 | `p6-c27-separator-horizontal.svg` | SVG | viewBox 1024 × 32 | oui | Séparateur horizontal extensible | bordure CSS | création interne, méthode et droits à renseigner précisément avant P | 12 Ko | [ ] | [ ] | [ ] |
| C28 | P2 | `p6-c28-separator-vertical.svg` | SVG | viewBox 32 × 1024 | oui | Séparateur vertical, masqué sur mobile | bordure CSS | création interne, méthode et droits à renseigner précisément avant P | 12 Ko | [ ] | [ ] | [ ] |

## 4.2 Contrôles CSS sans fichier

Ces lignes ne sont pas des assets et ne possèdent pas P ou V.

| ID | Lot | Contrôle | Critère | Spécifié | Intégré |
| --- | --- | --- | --- | --- | --- |
| B06 | 6A | Fallback global du fond | gradients et couleurs du design system, compréhensible images bloquées | [x] | [ ] |
| C05 | 6B | Traitement archivé | contraste atténué par CSS sans fichier supplémentaire | [x] | [ ] |
| C29 | 6A | Focus visible | outline ou anneau CSS de 2 px minimum au-dessus des textures | [x] | [ ] |

---

# 5. Iconographie fonctionnelle

Règles communes : SVG local, `viewBox 0 0 24 24`, trait 1,75 à 2 px, `currentColor`, aucun texte. Chaque ligne possède sa provenance propre.

| ID | P | Fonction | Fichier final | Dimensions | Alpha | Fallback | Source / droits | Budget max | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D01 | P0 | Vue d’ensemble | `p6-d01-icon-overview.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D02 | P0 | Catalogue ou projets | `p6-d02-icon-projects.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D03 | P0 | Activité | `p6-d03-icon-activity.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D04 | P0 | Paramètres | `p6-d04-icon-settings.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D05 | P0 | Synchroniser | `p6-d05-icon-sync.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D06 | P1 | GitHub | `p6-d06-icon-github.svg` | viewBox 0 0 24 24 | oui | libellé textuel | marque GitHub officielle, licence à documenter avant P | 8 Ko | [ ] | [ ] | [ ] |
| D07 | P1 | Ouvrir l’application | `p6-d07-icon-launch-app.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D08 | P1 | Lien externe | `p6-d08-icon-external-link.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D09 | P1 | Favori vide et rempli | `p6-d09-icon-favorite.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D10 | P1 | Recherche | `p6-d10-icon-search.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D11 | P1 | Filtrer | `p6-d11-icon-filter.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D12 | P1 | Trier | `p6-d12-icon-sort.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D13 | P1 | Vue grille | `p6-d13-icon-grid.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D14 | P1 | Vue liste | `p6-d14-icon-list.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D15 | P1 | Copier | `p6-d15-icon-copy.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D16 | P1 | Réinitialiser le cache | `p6-d16-icon-reset-cache.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D17 | P1 | Retour | `p6-d17-icon-back.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D18 | P1 | Fermer | `p6-d18-icon-close.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D19 | P2 | Plus d’actions | `p6-d19-icon-more.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D20 | P2 | Ouvrir les détails | `p6-d20-icon-details.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D21 | P0 | En ligne | `p6-d21-icon-online.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D22 | P0 | Hors ligne | `p6-d22-icon-offline.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D23 | P0 | Synchronisation en cours | `p6-d23-icon-sync-running.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D24 | P0 | Succès | `p6-d24-icon-success.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D25 | P0 | Avertissement | `p6-d25-icon-warning.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D26 | P0 | Erreur | `p6-d26-icon-error.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D27 | P1 | Nouveau projet | `p6-d27-icon-new-project.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D28 | P1 | Projet archivé | `p6-d28-icon-archived.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D29 | P1 | Fork | `p6-d29-icon-fork.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D30 | P1 | Application disponible | `p6-d30-icon-app-available.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D31 | P1 | Dépôt uniquement | `p6-d31-icon-repository-only.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D32 | P1 | Cache local | `p6-d32-icon-local-cache.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D33 | P1 | Date ou calendrier | `p6-d33-icon-calendar.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D34 | P1 | Horloge ou activité récente | `p6-d34-icon-clock.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D35 | P1 | Version ou release | `p6-d35-icon-release.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D36 | P1 | Langage ou code | `p6-d36-icon-code.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D37 | P1 | Branche | `p6-d37-icon-branch.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D38 | P1 | Pull request | `p6-d38-icon-pull-request.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D39 | P1 | Conflit ou protection | `p6-d39-icon-shield.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D40 | P2 | Dépôt renommé | `p6-d40-icon-renamed.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |
| D41 | P2 | URL d’application modifiée | `p6-d41-icon-app-url-changed.svg` | viewBox 0 0 24 24 | oui | libellé textuel | création interne, droits projet à confirmer avant P | 8 Ko | [ ] | [ ] | [ ] |

---

# 6. Ornements décoratifs

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage | Fallback | Source / droits | Budget max | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E01a | P2 | `p6-e01a-lamp-512x768.webp` | WebP | 512 × 768 | oui | Lampe suspendue | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 45 Ko | [ ] | [ ] | [ ] |
| E01b | P2 | `p6-e01b-lamp-halo-1024x1024.png` | PNG | 1024 × 1024 | oui | Halo de lampe | gradient CSS | création interne, méthode et droits à renseigner précisément avant P | 50 Ko | [ ] | [ ] | [ ] |
| E02a | P2 | `p6-e02a-rope-segment-1024x128.webp` | WebP | 1024 × 128 | oui | Segment de corde raccordable | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| E02b | P2 | `p6-e02b-rope-corner-256x256.webp` | WebP | 256 × 256 | oui | Angle de corde raccordable | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 20 Ko | [ ] | [ ] | [ ] |
| E03 | P2 | `p6-e03-screws-bolts-512x512.webp` | WebP | 512 × 512 | oui | Jeu d’attaches | cercles CSS | création interne, méthode et droits à renseigner précisément avant P | 30 Ko | [ ] | [ ] | [ ] |
| E04 | P2 | `p6-e04-nails-pins-512x512.webp` | WebP | 512 × 512 | oui | Jeu de clous et punaises | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 30 Ko | [ ] | [ ] | [ ] |
| E05 | P3 | `p6-e05-mug-512x512.webp` | WebP | 512 × 512 | oui | Tasse décorative | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| E06 | P3 | `p6-e06-potted-plant-512x768.webp` | WebP | 512 × 768 | oui | Plante décorative | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 45 Ko | [ ] | [ ] | [ ] |
| E07 | P3 | `p6-e07-wrench-768x256.webp` | WebP | 768 × 256 | oui | Clé décorative | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| E08 | P3 | `p6-e08-notebook-plan-768x512.webp` | WebP | 768 × 512 | oui | Carnet sans texte lisible | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 45 Ko | [ ] | [ ] | [ ] |
| E09 | P3 | `p6-e09-leaves-sprouts-512x512.webp` | WebP | 512 × 512 | oui | Feuilles et pousses | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |
| E10 | P3 | `p6-e10-workshop-crate-768x512.webp` | WebP | 768 × 512 | oui | Caisse décorative non interactive | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 50 Ko | [ ] | [ ] | [ ] |
| E11 | P3 | `p6-e11-laboratory-vial-512x768.webp` | WebP | 512 × 768 | oui | Fiole décorative | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 40 Ko | [ ] | [ ] | [ ] |
| E12 | P3 | `p6-e12-workbench-tool-512x512.webp` | WebP | 512 × 512 | oui | Outil d’établi sans marque | absence tolérée | création interne, méthode et droits à renseigner précisément avant P | 35 Ko | [ ] | [ ] | [ ] |

---

# 7. Couvertures et identités de projets

Une ligne correspond à un seul fichier. Les droits sont hérités de la source S citée, qui doit être R avant production.

| ID | P | Projet / usage | Fichier final | Dimensions | Alpha | Usage / fallback | Source / droits | Budget max | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F01a | P0 | Gargotte Adventure, couverture catalogue | `p6-f01a-gargotte-adventure-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S01a / droits renseignés sur S01a | 80 Ko | [ ] | [ ] | [ ] |
| F01b | P0 | Gargotte Adventure, couverture fiche | `p6-f01b-gargotte-adventure-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F01a agrandie ou C18 | S01a / droits renseignés sur S01a | 130 Ko | [ ] | [ ] | [ ] |
| F01c | P0 | Gargotte Adventure, logo | `p6-f01c-gargotte-adventure-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S01c / droits renseignés sur S01c | 30 Ko | [ ] | [ ] | [ ] |
| F02a | P0 | Les Petites Quêtes, couverture catalogue | `p6-f02a-les-petites-quetes-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S02a / droits renseignés sur S02a | 80 Ko | [ ] | [ ] | [ ] |
| F02b | P0 | Les Petites Quêtes, couverture fiche | `p6-f02b-les-petites-quetes-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F02a agrandie ou C18 | S02a / droits renseignés sur S02a | 130 Ko | [ ] | [ ] | [ ] |
| F02c | P0 | Les Petites Quêtes, logo | `p6-f02c-les-petites-quetes-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S02c / droits renseignés sur S02c | 30 Ko | [ ] | [ ] | [ ] |
| F03a | P0 | BibiLeaf, couverture catalogue | `p6-f03a-bibilleaf-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S03a / droits renseignés sur S03a | 80 Ko | [ ] | [ ] | [ ] |
| F03b | P0 | BibiLeaf, couverture fiche | `p6-f03b-bibilleaf-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F03a agrandie ou C18 | S03a / droits renseignés sur S03a | 130 Ko | [ ] | [ ] | [ ] |
| F03c | P0 | BibiLeaf, logo | `p6-f03c-bibilleaf-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S03c / droits renseignés sur S03c | 30 Ko | [ ] | [ ] | [ ] |
| F04a | P0 | Agripine, couverture catalogue | `p6-f04a-agripine-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S04a / droits renseignés sur S04a | 80 Ko | [ ] | [ ] | [ ] |
| F04b | P0 | Agripine, couverture fiche | `p6-f04b-agripine-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F04a agrandie ou C18 | S04a / droits renseignés sur S04a | 130 Ko | [ ] | [ ] | [ ] |
| F04c | P0 | Agripine, logo | `p6-f04c-agripine-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S04c / droits renseignés sur S04c | 30 Ko | [ ] | [ ] | [ ] |
| F05a | P0 | Luma, couverture catalogue | `p6-f05a-luma-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S05a / droits renseignés sur S05a | 80 Ko | [ ] | [ ] | [ ] |
| F05b | P0 | Luma, couverture fiche | `p6-f05b-luma-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F05a agrandie ou C18 | S05a / droits renseignés sur S05a | 130 Ko | [ ] | [ ] | [ ] |
| F05c | P0 | Luma, logo | `p6-f05c-luma-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S05c / droits renseignés sur S05c | 30 Ko | [ ] | [ ] | [ ] |
| F06a | P0 | Tracker Habit, couverture catalogue | `p6-f06a-tracker-habit-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S06a / droits renseignés sur S06a | 80 Ko | [ ] | [ ] | [ ] |
| F06b | P0 | Tracker Habit, couverture fiche | `p6-f06b-tracker-habit-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F06a agrandie ou C18 | S06a / droits renseignés sur S06a | 130 Ko | [ ] | [ ] | [ ] |
| F06c | P0 | Tracker Habit, logo | `p6-f06c-tracker-habit-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S06c / droits renseignés sur S06c | 30 Ko | [ ] | [ ] | [ ] |
| F07a | P0 | ZythoHunt, couverture catalogue | `p6-f07a-zythohunt-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S07a / droits renseignés sur S07a | 80 Ko | [ ] | [ ] | [ ] |
| F07b | P0 | ZythoHunt, couverture fiche | `p6-f07b-zythohunt-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F07a agrandie ou C18 | S07a / droits renseignés sur S07a | 130 Ko | [ ] | [ ] | [ ] |
| F07c | P0 | ZythoHunt, logo | `p6-f07c-zythohunt-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S07c / droits renseignés sur S07c | 30 Ko | [ ] | [ ] | [ ] |
| F08a | P0 | MaintBoard V3, couverture catalogue | `p6-f08a-maintboard-v3-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S08a / droits renseignés sur S08a | 80 Ko | [ ] | [ ] | [ ] |
| F08b | P0 | MaintBoard V3, couverture fiche | `p6-f08b-maintboard-v3-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F08a agrandie ou C18 | S08a / droits renseignés sur S08a | 130 Ko | [ ] | [ ] | [ ] |
| F08c | P0 | MaintBoard V3, logo | `p6-f08c-maintboard-v3-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S08c / droits renseignés sur S08c | 30 Ko | [ ] | [ ] | [ ] |
| F09a | P1 | CadeauScope, couverture catalogue | `p6-f09a-cadeauscope-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S09a / droits renseignés sur S09a | 80 Ko | [ ] | [ ] | [ ] |
| F09b | P1 | CadeauScope, couverture fiche | `p6-f09b-cadeauscope-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F09a agrandie ou C18 | S09a / droits renseignés sur S09a | 130 Ko | [ ] | [ ] | [ ] |
| F09c | P1 | CadeauScope, logo | `p6-f09c-cadeauscope-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S09c / droits renseignés sur S09c | 30 Ko | [ ] | [ ] | [ ] |
| F10a | P1 | GargoGen, couverture catalogue | `p6-f10a-gargogen-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S10a / droits renseignés sur S10a | 80 Ko | [ ] | [ ] | [ ] |
| F10b | P1 | GargoGen, couverture fiche | `p6-f10b-gargogen-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F10a agrandie ou C18 | S10a / droits renseignés sur S10a | 130 Ko | [ ] | [ ] | [ ] |
| F10c | P1 | GargoGen, logo | `p6-f10c-gargogen-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S10c / droits renseignés sur S10c | 30 Ko | [ ] | [ ] | [ ] |
| F11a | P1 | Tiny Universe, couverture catalogue | `p6-f11a-tiny-universe-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S11a / droits renseignés sur S11a | 80 Ko | [ ] | [ ] | [ ] |
| F11b | P1 | Tiny Universe, couverture fiche | `p6-f11b-tiny-universe-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F11a agrandie ou C18 | S11a / droits renseignés sur S11a | 130 Ko | [ ] | [ ] | [ ] |
| F11c | P1 | Tiny Universe, logo | `p6-f11c-tiny-universe-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S11c / droits renseignés sur S11c | 30 Ko | [ ] | [ ] | [ ] |
| F12a | P1 | TeissAI, couverture catalogue | `p6-f12a-teissai-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S12a / droits renseignés sur S12a | 80 Ko | [ ] | [ ] | [ ] |
| F12b | P1 | TeissAI, couverture fiche | `p6-f12b-teissai-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F12a agrandie ou C18 | S12a / droits renseignés sur S12a | 130 Ko | [ ] | [ ] | [ ] |
| F12c | P1 | TeissAI, logo | `p6-f12c-teissai-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S12c / droits renseignés sur S12c | 30 Ko | [ ] | [ ] | [ ] |
| F13a | P1 | DermIA Quantum, couverture catalogue | `p6-f13a-dermia-quantum-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S13a / droits renseignés sur S13a | 80 Ko | [ ] | [ ] | [ ] |
| F13b | P1 | DermIA Quantum, couverture fiche | `p6-f13b-dermia-quantum-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F13a agrandie ou C18 | S13a / droits renseignés sur S13a | 130 Ko | [ ] | [ ] | [ ] |
| F13c | P1 | DermIA Quantum, logo | `p6-f13c-dermia-quantum-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S13c / droits renseignés sur S13c | 30 Ko | [ ] | [ ] | [ ] |
| F14a | P1 | Casse-latte Simulator 2026, couverture catalogue | `p6-f14a-casse-latte-simulator-2026-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S14a / droits renseignés sur S14a | 80 Ko | [ ] | [ ] | [ ] |
| F14b | P1 | Casse-latte Simulator 2026, couverture fiche | `p6-f14b-casse-latte-simulator-2026-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F14a agrandie ou C18 | S14a / droits renseignés sur S14a | 130 Ko | [ ] | [ ] | [ ] |
| F14c | P1 | Casse-latte Simulator 2026, logo | `p6-f14c-casse-latte-simulator-2026-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S14c / droits renseignés sur S14c | 30 Ko | [ ] | [ ] | [ ] |
| F15a | P2 | Gargotte V5, couverture catalogue | `p6-f15a-gargotte-v5-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S15a / droits renseignés sur S15a | 80 Ko | [ ] | [ ] | [ ] |
| F15b | P2 | Gargotte V5, couverture fiche | `p6-f15b-gargotte-v5-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F15a agrandie ou C18 | S15a / droits renseignés sur S15a | 130 Ko | [ ] | [ ] | [ ] |
| F15c | P2 | Gargotte V5, logo | `p6-f15c-gargotte-v5-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S15c / droits renseignés sur S15c | 30 Ko | [ ] | [ ] | [ ] |
| F16a | P2 | PQ-, couverture catalogue | `p6-f16a-pq-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S16a / droits renseignés sur S16a | 80 Ko | [ ] | [ ] | [ ] |
| F16b | P2 | PQ-, couverture fiche | `p6-f16b-pq-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F16a agrandie ou C18 | S16a / droits renseignés sur S16a | 130 Ko | [ ] | [ ] | [ ] |
| F16c | P2 | PQ-, logo | `p6-f16c-pq-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S16c / droits renseignés sur S16c | 30 Ko | [ ] | [ ] | [ ] |
| F17a | P2 | AI Agents for Beginners, couverture catalogue | `p6-f17a-ai-agents-for-beginners-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S17a / droits renseignés sur S17a | 80 Ko | [ ] | [ ] | [ ] |
| F17b | P2 | AI Agents for Beginners, couverture fiche | `p6-f17b-ai-agents-for-beginners-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F17a agrandie ou C18 | S17a / droits renseignés sur S17a | 130 Ko | [ ] | [ ] | [ ] |
| F17c | P2 | AI Agents for Beginners, logo | `p6-f17c-ai-agents-for-beginners-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S17c / droits renseignés sur S17c | 30 Ko | [ ] | [ ] | [ ] |
| F18a | P2 | La Grange, couverture catalogue | `p6-f18a-la-grange-cover-640x400.webp` | 640 × 400 | non | Carte catalogue / C18 + nom HTML | S18a / droits renseignés sur S18a | 80 Ko | [ ] | [ ] | [ ] |
| F18b | P2 | La Grange, couverture fiche | `p6-f18b-la-grange-cover-960x600.webp` | 960 × 600 | non | Fiche projet / F18a agrandie ou C18 | S18a / droits renseignés sur S18a | 130 Ko | [ ] | [ ] | [ ] |
| F18c | P2 | La Grange, logo | `p6-f18c-la-grange-logo-512x160.webp` | 512 × 160 | oui | Logo éditorial / nom HTML | S18c / droits renseignés sur S18c | 30 Ko | [ ] | [ ] | [ ] |

---

# 8. Planches de validation documentaire

Ces PNG sont placés à plat dans `docs/assets/phase-6/`, n’entrent pas dans le runtime et utilisent uniquement des assets P et V.

| ID | P | Nom final | Dimensions | Usage | Source / droits | Budget max | P | V |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G01 | P0 | `p6-g01-dashboard-desktop-1440x1024.png` | 1440 × 1024 | Dashboard desktop | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G02 | P0 | `p6-g02-dashboard-tablet-1024x1366.png` | 1024 × 1366 | Dashboard tablette | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G03 | P0 | `p6-g03-dashboard-mobile-390x844.png` | 390 × 844 | Dashboard mobile | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G04a | P1 | `p6-g04a-catalogue-desktop-1440x1024.png` | 1440 × 1024 | Catalogue desktop | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G04b | P1 | `p6-g04b-catalogue-mobile-390x844.png` | 390 × 844 | Catalogue mobile | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G05a | P1 | `p6-g05a-project-detail-desktop-1440x1024.png` | 1440 × 1024 | Fiche desktop | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G05b | P1 | `p6-g05b-project-detail-mobile-390x844.png` | 390 × 844 | Fiche mobile | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G06a | P1 | `p6-g06a-activity-desktop-1440x1024.png` | 1440 × 1024 | Activité desktop | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G06b | P1 | `p6-g06b-activity-mobile-390x844.png` | 390 × 844 | Activité mobile | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G07a | P1 | `p6-g07a-settings-desktop-1440x1024.png` | 1440 × 1024 | Paramètres desktop | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G07b | P1 | `p6-g07b-settings-mobile-390x844.png` | 390 × 844 | Paramètres mobile | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G08 | P1 | `p6-g08-components-gallery-1920x1080.png` | 1920 × 1080 | Galerie de composants | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G09 | P1 | `p6-g09-no-images-1440x1024.png` | 1440 × 1024 | Fallbacks sans images | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G10a | P1 | `p6-g10a-long-content-1440x1024.png` | 1440 × 1024 | Contenus longs desktop | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G10b | P1 | `p6-g10b-long-content-mobile-390x844.png` | 390 × 844 | Contenus longs mobile | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G11 | P1 | `p6-g11-zoom-200-780x1688.png` | 780 × 1688 | Zoom 200 % | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G12 | P1 | `p6-g12-compact-density-1440x1024.png` | 1440 × 1024 | Densité compacte | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G13 | P1 | `p6-g13-reduced-motion-1440x1024.png` | 1440 × 1024 | Mouvement réduit | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G14a | P2 | `p6-g14a-low-light-1440x1024.png` | 1440 × 1024 | Lumière faible | captures du projet / droits projet | 2 Mo | [ ] | [ ] |
| G14b | P2 | `p6-g14b-bright-light-1440x1024.png` | 1440 × 1024 | Lumière forte | captures du projet / droits projet | 2 Mo | [ ] | [ ] |

---

# 9. Typographie

Aucun fichier de police n’est produit avant validation explicite de sa licence. Les assets A portent la marque. Les titres utilisent une serif robuste locale ou système ; le corps utilise une sans-serif système ; les notes manuscrites restent décoratives.

---

# 10. Matrice exacte des lots d’intégration

Un lot ne démarre que lorsque toutes les lignes indiquées sont P et V, toutes ses sources sont R et toutes ses planches sont V.

| Lot | Sources R requises | Assets P/V requis | Contrôles CSS | Planches V requises | Périmètre |
| --- | --- | --- | --- | --- | --- |
| 6A | M01, M02 | A01, A02, A03, A04, B01, B02, B03, B04, B07, B12, D01, D02, D03, D04, D05, D21, D22, D23, D24, D25, D26 | B06, C29 | G01, G02, G03 | Shell, marque, fonds, navigation, états réseau et focus |
| 6B | M03, M05, S01a, S01c, S02a, S02c, S03a, S03c, S04a, S04c, S05a, S05c, S06a, S06c, S07a, S07c, S08a, S08c | C01, C02, C03, C04, C06, C07, C08, C09, C10, C11, C12, C13, C14, C15, C16, C17, C18, C20, F01a, F01b, F01c, F02a, F02b, F02c, F03a, F03b, F03c, F04a, F04b, F04c, F05a, F05b, F05c, F06a, F06b, F06c, F07a, F07b, F07c, F08a, F08b, F08c | C05 | G08, G09, G10a, G10b | Cartes, statistiques, panneaux, fallbacks et huit projets P0 |
| 6C | sources déjà validées par 6A et 6B | C25, C26, D09, D10, D11, D12, D13, D14, D27, D28, D29, D30, D31, D33, D34, D35, D36 | aucun | G04a, G04b, G12 | Dashboard et catalogue, recherche, filtres, tri et densité |
| 6D | sources déjà validées | C19, C21, C22, C23, C24, C27, C28, D06, D07, D08, D15, D16, D17, D18, D19, D20, D32, D37, D38, D39, D40, D41 | aucun | G05a, G05b, G06a, G06b, G07a, G07b | Fiches, activité, paramètres, diagnostics et modales |
| 6E | S09a, S09c, S10a, S10c, S11a, S11c, S12a, S12c, S13a, S13c, S14a, S14c, S15a, S15c, S16a, S16c, S17a, S17c, S18a, S18c | A05, A06, A07, A08, A09, A10, A11, A12, B05, B08, B09, B10, B11, B13, B14, B15, E01a, E01b, E02a, E02b, E03, E04, E05, E06, E07, E08, E09, E10, E11, E12, F09a, F09b, F09c, F10a, F10b, F10c, F11a, F11b, F11c, F12a, F12b, F12c, F13a, F13b, F13c, F14a, F14b, F14c, F15a, F15b, F15c, F16a, F16b, F16c, F17a, F17b, F17c, F18a, F18b, F18c | aucun | G11, G13, G14a, G14b | Finitions, projets P1/P2, mouvement, lumière et optimisation |

---

# 11. Contrôles obligatoires

- [ ] T01 source ou master canonique disponible ;
- [ ] T02 provenance et droits renseignés ;
- [ ] T03 budget individuel respecté ou écart approuvé ;
- [ ] T04 détourage et transparence ;
- [ ] T05 aucun texte fonctionnel ;
- [ ] T06 nom exact ;
- [ ] T07 format et dimensions exacts ;
- [ ] T08 signature réelle du fichier ;
- [ ] T09 SVG sans script ni ressource distante ;
- [ ] T10 poids mesuré ;
- [ ] T11 raccord des textures ;
- [ ] T12 fallback images bloquées ;
- [ ] T13 contraste sombre et clair ;
- [ ] T14 zoom 200 %, compact et mobile ;
- [ ] T15 aucun nouveau sous-dossier canonique ;
- [ ] T16 exception héritée inchangée jusqu’au remplacement ;
- [ ] T17 aucun ZIP, Base64, fragment ou workflow temporaire ;
- [ ] T18 statuts A, R, P, V et I exacts.

---

# 12. Ordre de production

1. versionner M01, puis produire A01 ;
2. versionner M02, puis produire B01 ;
3. versionner M03, puis produire C01 ;
4. versionner S01a, produire F01a, puis F01b ;
5. versionner S01c, puis produire F01c ;
6. versionner M05, puis produire C16 ;
7. variantes strictement enregistrées ;
8. matières et lumière P0 ;
9. iconographie P0 ;
10. cadres et panneaux P0 ;
11. sources S02a et S02c à S08a et S08c, puis F02a à F08c fichier par fichier ;
12. planches requises par le lot concerné ;
13. P1 ;
14. P2 et P3 après validation de la composition.

## Prochain élément autorisé

**Versionner M01 sous `docs/assets/phase-6/p6-m01-brand-sign-master-1600x720.webp`.**

A01 ne peut pas être produit tant que A et R de M01 ne sont pas cochés.
