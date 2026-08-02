# Suivi de production des assets de la Phase 6

## Autorité

**Ce fichier est l’unique registre opérationnel des assets Phase 6.**

Dernière révision : 2026-08-02.

La Phase 6B est volontairement simplifiée : elle ne pré-produit plus les couvertures et logos de chaque projet et ne génère plus de planches PNG documentaires. Les couvertures sont ajoutées depuis la modale de personnalisation, puis versionnées par la pull request automatique.

## Statuts

### Sources

- **A** : direction approuvée ;
- **R** : source canonique versionnée dans `docs/assets/phase-6/`.

### Assets runtime

- **P** : fichier final contrôlé et versionné dans `public/assets/phase-6/` ;
- **V** : validation humaine ;
- **I** : consommation réelle par l’application.

## Emplacements

- masters : `docs/assets/phase-6/` ;
- assets runtime : `public/assets/phase-6/` ;
- nouveaux fichiers à plat ;
- aucun ZIP, Base64, fragment ou workflow de reconstruction.

## Doctrine 6B

- WebP pour les matières, skins et bandeaux ;
- HTML/CSS pour la structure, les textes, les états, les couleurs et la progression ;
- SVG pour les icônes fonctionnelles ;
- aucun texte fonctionnel dans un raster ;
- aucune couverture ou logo de projet pré-produit dans le registre ;
- aucune planche de validation versionnée.

---

# 1. Historique Phase 6A conservé

Les assets 6A déjà validés et intégrés restent canoniques : enseigne A01 à A04, fonds B01 à B04, texture B07, lumière B12, icônes D01 à D05 et D21 à D26.

Les anciens prototypes SVG C01 à C10 de la PR #29 restent non canoniques et ne doivent jamais être intégrés.

---

# 2. Master actif Phase 6B

| ID | Source | Fichier | Format | Dimensions | Alpha | Fonction | Budget max | A | R |
|---|---|---|---|---|---|---|---:|---|---|
| M06 | Composition dashboard 6B | `p6-m06-dashboard-phase-6b-master-1920x1080.webp` | WebP | 1920 × 1080 | non | Référence de composition : rail fixe, bandeau, grille directe, cartes, cinq actions et absence de sections | 2 Mo | [x] | [x] |

Provenance : composition interne `PROD-LG`, dérivée de la référence fournie par le propriétaire le 2026-08-02.

---

# 3. Assets visuels Phase 6B

| ID | Fichier | Format | Dimensions | Alpha | Fonction | Fallback | Budget max | P | V | I |
|---|---|---|---|---|---|---|---:|---|---|---|
| C01 | `p6-c01-project-card-skin-standard-640x960.webp` | WebP | 640 × 960 | oui | Skin matériel partagé de carte, fenêtre de couverture transparente et zones HTML libres | surface CSS `FB-PANEL` | 60 Ko | [x] | [x] | [ ] |
| C06 | `p6-c06-style-ribbon-neutral-160x240.webp` | WebP | 160 × 240 | oui | Bannière neutre recolorable du style de projet | couleur CSS et libellé HTML | 20 Ko | [x] | [x] | [ ] |
| C11 | `p6-c11-stats-beam-1600x220.webp` | WebP | 1600 × 220 | oui | Poutre unique recevant quatre statistiques HTML | grille CSS `FB-PANEL` | 70 Ko | [x] | [x] | [ ] |

Les chiffres, textes, versions, progressions, boutons et séparateurs fonctionnels restent en HTML/CSS.

## Contrôles CSS sans fichier

| ID | Contrôle | Critère | Spécifié | Intégré |
|---|---|---|---|---|
| C05 | traitement archivé | lisible, sans masquer les actions | [x] | [ ] |
| C08 | badge de version | texte HTML, couleur issue de la palette | [x] | [ ] |
| C09 | progression | valeur manuelle 0–100, absente si non renseignée | [x] | [ ] |
| C10 | rangée d’actions | cinq emplacements flexibles | [x] | [ ] |
| C30 | rail fixe | rail entier fixe dans le viewport | [x] | [ ] |
| C31 | scroll principal | seule la zone principale défile | [x] | [ ] |
| C32 | grille directe | aucun panneau, en-tête ou rail droit | [x] | [ ] |
| C33 | infobulle | survol, focus et fermeture clavier | [x] | [ ] |
| C34 | modale | focus piégé, fond inerte et restitution | [x] | [ ] |

---

# 4. Iconographie Phase 6B

Règles communes : SVG local, `viewBox="0 0 24 24"`, `currentColor`, moins de 8 Ko.

| ID | Fonction | Fichier | P | V | I |
|---|---|---|---|---|---|
| D06 | GitHub | `p6-d06-icon-github.svg` | [x] | [x] | [ ] |
| D07 | lancer l’application | `p6-d07-icon-launch-app.svg` | [x] | [x] | [ ] |
| D20 | détail du projet | `p6-d20-icon-details.svg` | [x] | [x] | [ ] |
| D42 | README | `p6-d42-icon-readme.svg` | [x] | [x] | [ ] |
| D43 | personnaliser | `p6-d43-icon-customize.svg` | [x] | [x] | [ ] |
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

# 5. Couvertures et logos ajoutés depuis l’application

Les anciennes séries S02 à S18 et F02 à F18 sont retirées du registre 6B.

La modale administrateur accepte PNG, JPEG ou WebP, affiche un recadrage 8:5, puis le service sécurisé :

1. valide le type, les octets, les dimensions et le poids ;
2. supprime les métadonnées ;
3. réencode en WebP 640 × 400 ;
4. calcule le chemin canonique côté serveur ;
5. met à jour `project-overrides.json` ;
6. crée une branche, un commit et une pull request.

Un projet sans couverture utilise C18 et le fallback HTML/CSS. Aucun logo séparé n’est exigé en 6B : le nom du projet reste du texte HTML.

---

# 6. Validation

Les anciennes planches G16a à G20 sont supprimées du processus.

La validation s’effectue directement sur le build de la PR avec :

- captures jointes à la PR sans statut d’asset ;
- tablette paysage et bureau ;
- zoom 200 % ;
- images bloquées ;
- hors ligne ;
- clavier, focus et lecteur d’écran ;
- état administrateur et visiteur ;
- création de PR de personnalisation sans fusion automatique.

---

# 7. Porte d’entrée de l’intégration 6B

L’intégration peut commencer lorsque :

- M06 possède A/R ;
- C01, C06 et C11 possèdent P/V ;
- D42 et D43 possèdent P/V ;
- C05, C08, C09, C10 et C30 à C34 sont spécifiés ;
- ADR-010 est accepté ;
- le contrat serveur est documenté.

D44 à D52 peuvent être produits dans le lot d’intégration ou remplacés par des icônes locales existantes, sous réserve de conserver les neuf styles validés et une cohérence visuelle.

## Prochain travail autorisé

**Démarrer l’intégration fonctionnelle 6B et produire ou réutiliser l’iconographie des neuf styles au moment du raccord.**
