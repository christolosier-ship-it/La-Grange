# Suivi de production des assets de la Phase 6

## Statut et autorité

**Ce fichier est la source de vérité unique du catalogue des assets de la Phase 6.**

Dernière mise à jour : 2026-07-30.

Il fixe les identifiants, noms finaux, formats, dimensions, usages, fallbacks et statuts. En cas de conflit avec un autre document, le présent registre prime pour la production et l’intégration des assets.

## Dossiers autorisés

- runtime : `public/assets/phase-6/` ;
- références et planches : `docs/assets/phase-6/`.

Ces deux dossiers restent **plats**. Aucun sous-dossier `brand`, `shell`, `components`, `icons` ou `projects` n’est autorisé.

## Nommage obligatoire

- raster : `p6-<id>-<nom>-<largeur>x<hauteur>.<extension>` ;
- SVG : `p6-<id>-<nom>.svg` ;
- minuscules, tirets, aucun espace, accent ou date ;
- dimensions obligatoires dans tout nom raster ;
- identifiant du registre obligatoire ;
- aucune variante non enregistrée ;
- aucun ZIP, Base64, fragment ou workflow de matérialisation.

## Méthode obligatoire

1. sélectionner une seule ligne ;
2. produire l’asset ;
3. exporter exactement au nom, format et dimensions indiqués ;
4. contrôler signature, dimensions, alpha, poids et absence de texte fonctionnel ;
5. obtenir la validation humaine ;
6. intégrer manuellement dans `public/assets/phase-6/` ;
7. mettre à jour le registre ;
8. tester le fallback avant de passer au suivant.

La production en masse sans validation intermédiaire est interdite.

## Statuts

- **M** : master artistique validé ;
- **P** : export conforme produit ;
- **V** : export validé humainement ;
- **I** : fichier intégré sous son nom final et consommé par l’application.

Les fichiers issus des premières tentatives sont des **prototypes hérités non canoniques**. Ils ne valident aucune ligne, même s’ils existent dans `main`. Ils seront supprimés manuellement après leur remplacement.

## Priorités

- P0 : shell ou premier lot visuel ;
- P1 : cartes, vues principales ou projets mis en avant ;
- P2 : cohérence complète ;
- P3 : ornement facultatif.

---

# 1. Masters validés

| ID | P | Master | Dimensions de référence | Description | M |
| --- | --- | --- | --- | --- | --- |
| M01 | P0 | Enseigne La Grange | 1600 × 720 | Bois sculpté, corde, attaches et lettrage de marque. | [x] |
| M02 | P0 | Fond d’atelier | 2048 × 1152 | Grange-atelier nocturne, charpente et lumière ambrée. | [x] |
| M03 | P0 | Cadre de carte vide | 640 × 960 | Cadre vertical, fenêtre libre et zones de contenu. | [x] |
| M04 | P1 | Carte Gargotte complète | 640 × 960 | Master de composition, jamais intégré comme carte figée. | [x] |
| M05 | P0 | Panneau de bienvenue | 640 × 960 | Papier suspendu, dessin et attaches, sans texte fonctionnel final. | [x] |

---

# 2. Identité de marque

| ID | P | Fichier final | Format | Dimensions | Alpha | Critère principal | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A01 | P0 | `p6-a01-brand-sign-1600x720.webp` | WebP | 1600 × 720 | oui | Dérivé fidèle de M01, sans marge noire. | [ ] | [ ] | [ ] |
| A02 | P0 | `p6-a02-brand-sign-800x360.webp` | WebP | 800 × 360 | oui | Même composition qu’A01. | [ ] | [ ] | [ ] |
| A03 | P0 | `p6-a03-brand-sign-mobile-960x560.webp` | WebP | 960 × 560 | oui | Composition resserrée lisible à 280 px CSS. | [ ] | [ ] | [ ] |
| A04 | P1 | `p6-a04-brand-mark.svg` | SVG | viewBox 256 × 256 | oui | Symbole sans sous-titre, lisible à 24 px. | [ ] | [ ] | [ ] |
| A05 | P2 | `p6-a05-brand-mark-light.svg` | SVG | viewBox 256 × 256 | oui | Monochrome `currentColor` pour fond sombre. | [ ] | [ ] | [ ] |
| A06 | P2 | `p6-a06-brand-mark-dark.svg` | SVG | viewBox 256 × 256 | oui | Monochrome `currentColor` pour fond clair. | [ ] | [ ] | [ ] |
| A07 | P2 | `p6-a07-favicon-32x32.png` | PNG | 32 × 32 | oui | Contraste contrôlé. | [ ] | [ ] | [ ] |
| A08 | P2 | `p6-a08-favicon-48x48.png` | PNG | 48 × 48 | oui | Même dessin qu’A07. | [ ] | [ ] | [ ] |
| A09 | P2 | `p6-a09-pwa-icon-192x192.png` | PNG | 192 × 192 | non | Fond opaque. | [ ] | [ ] | [ ] |
| A10 | P2 | `p6-a10-pwa-icon-512x512.png` | PNG | 512 × 512 | non | Version haute définition. | [ ] | [ ] | [ ] |
| A11 | P2 | `p6-a11-pwa-maskable-512x512.png` | PNG | 512 × 512 | non | Sujet dans la safe area 409 × 409. | [ ] | [ ] | [ ] |
| A12 | P2 | `p6-a12-apple-touch-icon-180x180.png` | PNG | 180 × 180 | non | Coins non pré-arrondis. | [ ] | [ ] | [ ] |

---

# 3. Fond, matières et lumière

| ID | P | Fichier final | Format | Dimensions | Alpha | Critère principal | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B01 | P0 | `p6-b01-background-workshop-2048x1152.webp` | WebP | 2048 × 1152 | non | Fond desktop, centre calme, ≤ 190 Ko. | [ ] | [ ] | [ ] |
| B02 | P0 | `p6-b02-background-workshop-tablet-1366x1024.webp` | WebP | 1366 × 1024 | non | Recadrage tablette paysage. | [ ] | [ ] | [ ] |
| B03 | P0 | `p6-b03-background-workshop-tablet-1024x1366.webp` | WebP | 1024 × 1366 | non | Recadrage tablette portrait. | [ ] | [ ] | [ ] |
| B04 | P0 | `p6-b04-background-workshop-mobile-780x1386.webp` | WebP | 780 × 1386 | non | Export 2× pour 390 px CSS. | [ ] | [ ] | [ ] |
| B05 | P2 | `p6-b05-background-workshop-low-density-780x1386.webp` | WebP | 780 × 1386 | non | Variante économie de données, ≤ 90 Ko. | [ ] | [ ] | [ ] |
| B06 | P2 | aucun fichier | CSS | sans dimension | non | Fallback par gradients et couleurs. | [ ] | [ ] | [ ] |
| B07 | P0 | `p6-b07-texture-wood-structure-1024x1024.webp` | WebP | 1024 × 1024 | non | Tuile raccordable, faible contraste. | [ ] | [ ] | [ ] |
| B08 | P0 | `p6-b08-texture-wood-crate-1024x1024.webp` | WebP | 1024 × 1024 | non | Tuile raccordable, plus claire que B07. | [ ] | [ ] | [ ] |
| B09 | P1 | `p6-b09-texture-paper-calm-512x512.webp` | WebP | 512 × 512 | non | Très faible bruit derrière du texte. | [ ] | [ ] | [ ] |
| B10 | P1 | `p6-b10-texture-metal-dark-512x512.webp` | WebP | 512 × 512 | non | Métal mat, sans chrome. | [ ] | [ ] | [ ] |
| B11 | P2 | `p6-b11-texture-dark-glass-512x512.webp` | WebP | 512 × 512 | oui | Surface semi-opaque et reflet discret. | [ ] | [ ] | [ ] |
| B12 | P0 | `p6-b12-light-main-1600x900.png` | PNG | 1600 × 900 | oui | Halo ambre principal. | [ ] | [ ] | [ ] |
| B13 | P1 | `p6-b13-light-sync-256x256.png` | PNG | 256 × 256 | oui | Halo local de synchronisation. | [ ] | [ ] | [ ] |
| B14 | P1 | `p6-b14-light-new-project-256x256.png` | PNG | 256 × 256 | oui | Accent non clignotant. | [ ] | [ ] | [ ] |
| B15 | P2 | `p6-b15-shadow-structure-1600x900.png` | PNG | 1600 × 900 | oui | Ombres de poutres sans couvrir le contenu. | [ ] | [ ] | [ ] |

---

# 4. Cadres, panneaux et contrôles

| ID | P | Fichier final | Format | Dimensions | Critère principal | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C01 | P0 | `p6-c01-project-card-frame-standard.svg` | SVG | viewBox 640 × 960 | Fenêtre libre, aucun texte ou contrôle. | [ ] | [ ] | [ ] |
| C02 | P0 | `p6-c02-project-card-frame-compact.svg` | SVG | viewBox 512 × 720 | Variante compacte de C01. | [ ] | [ ] | [ ] |
| C03 | P1 | `p6-c03-project-card-frame-featured.svg` | SVG | viewBox 800 × 960 | Projet mis en avant. | [ ] | [ ] | [ ] |
| C04 | P1 | `p6-c04-project-card-frame-list.svg` | SVG | viewBox 960 × 320 | Variante horizontale. | [ ] | [ ] | [ ] |
| C05 | P1 | aucun fichier | CSS | sans dimension | Traitement archivé dérivé de C01 à C04. | [ ] | [ ] | [ ] |
| C06 | P1 | `p6-c06-ribbon-category.svg` | SVG | viewBox 160 × 240 | Recolorable, aucun texte. | [ ] | [ ] | [ ] |
| C07 | P1 | `p6-c07-ribbon-new-project.svg` | SVG | viewBox 160 × 240 | Nouvelle arrivée, aucun texte. | [ ] | [ ] | [ ] |
| C08 | P1 | `p6-c08-status-label.svg` | SVG | viewBox 320 × 96 | Texte HTML séparé. | [ ] | [ ] | [ ] |
| C09 | P1 | `p6-c09-metadata-rail.svg` | SVG | viewBox 640 × 96 | Séparateur sans icône. | [ ] | [ ] | [ ] |
| C10 | P1 | `p6-c10-actions-rail.svg` | SVG | viewBox 640 × 120 | Quatre actions maximum, icônes séparées. | [ ] | [ ] | [ ] |
| C11 | P0 | `p6-c11-stats-beam.svg` | SVG | viewBox 1600 × 220 | Quatre cellules maximum. | [ ] | [ ] | [ ] |
| C12 | P0 | `p6-c12-section-beam.svg` | SVG | viewBox 1600 × 120 | Titre et lien hors image. | [ ] | [ ] | [ ] |
| C13 | P0 | `p6-c13-panel-wood-secondary.svg` | SVG | viewBox 640 × 960 | Navigation, filtres ou résumé. | [ ] | [ ] | [ ] |
| C14 | P1 | `p6-c14-panel-dark-glass.svg` | SVG | viewBox 640 × 960 | Activité et données secondaires. | [ ] | [ ] | [ ] |
| C15 | P1 | `p6-c15-paper-note.svg` | SVG | viewBox 640 × 800 | Papier vide, texte HTML. | [ ] | [ ] | [ ] |
| C16 | P0 | `p6-c16-welcome-panel-640x960.webp` | WebP | 640 × 960 | Papier, dessin et attaches, sans texte fonctionnel. | [ ] | [ ] | [ ] |
| C17 | P1 | `p6-c17-empty-slot.svg` | SVG | viewBox 512 × 720 | État vide non ambigu. | [ ] | [ ] | [ ] |
| C18 | P1 | `p6-c18-project-cover-fallback.svg` | SVG | viewBox 640 × 400 | Initiales et nom en HTML. | [ ] | [ ] | [ ] |
| C19 | P2 | `p6-c19-modal-frame.svg` | SVG | viewBox 960 × 720 | Décor périphérique uniquement. | [ ] | [ ] | [ ] |
| C20 | P2 | `p6-c20-toast-frame.svg` | SVG | viewBox 640 × 160 | Texte et icône séparés. | [ ] | [ ] | [ ] |
| C21 | P2 | `p6-c21-diagnostic-panel.svg` | SVG | viewBox 960 × 720 | Texte sélectionnable. | [ ] | [ ] | [ ] |
| C22 | P1 | `p6-c22-button-primary.svg` | SVG | viewBox 480 × 112 | Texte HTML et focus distinct. | [ ] | [ ] | [ ] |
| C23 | P1 | `p6-c23-button-secondary.svg` | SVG | viewBox 480 × 112 | Métal sombre. | [ ] | [ ] | [ ] |
| C24 | P1 | `p6-c24-button-danger.svg` | SVG | viewBox 480 × 112 | Danger limité, texte obligatoire. | [ ] | [ ] | [ ] |
| C25 | P1 | `p6-c25-search-field-frame.svg` | SVG | viewBox 960 × 112 | Champ natif visible. | [ ] | [ ] | [ ] |
| C26 | P1 | `p6-c26-filter-chip.svg` | SVG | viewBox 320 × 96 | État pressé en CSS. | [ ] | [ ] | [ ] |
| C27 | P2 | `p6-c27-separator-horizontal.svg` | SVG | viewBox 1024 × 32 | Extensible. | [ ] | [ ] | [ ] |
| C28 | P2 | `p6-c28-separator-vertical.svg` | SVG | viewBox 32 × 1024 | Masqué sur mobile. | [ ] | [ ] | [ ] |
| C29 | P2 | aucun fichier | CSS | 2 px minimum | Focus visible au-dessus des textures. | [ ] | [ ] | [ ] |

---

# 5. Iconographie fonctionnelle

Règle commune : SVG local, `viewBox 0 0 24 24`, trait 1,75 à 2 px, `currentColor`, aucun texte et fallback par libellé.

| ID | P | Fonction | Fichier final | P | V | I |
| --- | --- | --- | --- | --- | --- | --- |
| D01 | P0 | Vue d’ensemble | `p6-d01-icon-overview.svg` | [ ] | [ ] | [ ] |
| D02 | P0 | Catalogue ou projets | `p6-d02-icon-projects.svg` | [ ] | [ ] | [ ] |
| D03 | P0 | Activité | `p6-d03-icon-activity.svg` | [ ] | [ ] | [ ] |
| D04 | P0 | Paramètres | `p6-d04-icon-settings.svg` | [ ] | [ ] | [ ] |
| D05 | P0 | Synchroniser | `p6-d05-icon-sync.svg` | [ ] | [ ] | [ ] |
| D06 | P1 | GitHub | `p6-d06-icon-github.svg` | [ ] | [ ] | [ ] |
| D07 | P1 | Ouvrir l’application | `p6-d07-icon-launch-app.svg` | [ ] | [ ] | [ ] |
| D08 | P1 | Lien externe | `p6-d08-icon-external-link.svg` | [ ] | [ ] | [ ] |
| D09 | P1 | Favori vide et rempli | `p6-d09-icon-favorite.svg` | [ ] | [ ] | [ ] |
| D10 | P1 | Recherche | `p6-d10-icon-search.svg` | [ ] | [ ] | [ ] |
| D11 | P1 | Filtrer | `p6-d11-icon-filter.svg` | [ ] | [ ] | [ ] |
| D12 | P1 | Trier | `p6-d12-icon-sort.svg` | [ ] | [ ] | [ ] |
| D13 | P1 | Vue grille | `p6-d13-icon-grid.svg` | [ ] | [ ] | [ ] |
| D14 | P1 | Vue liste | `p6-d14-icon-list.svg` | [ ] | [ ] | [ ] |
| D15 | P1 | Copier | `p6-d15-icon-copy.svg` | [ ] | [ ] | [ ] |
| D16 | P1 | Réinitialiser le cache | `p6-d16-icon-reset-cache.svg` | [ ] | [ ] | [ ] |
| D17 | P1 | Retour | `p6-d17-icon-back.svg` | [ ] | [ ] | [ ] |
| D18 | P1 | Fermer | `p6-d18-icon-close.svg` | [ ] | [ ] | [ ] |
| D19 | P2 | Plus d’actions | `p6-d19-icon-more.svg` | [ ] | [ ] | [ ] |
| D20 | P2 | Ouvrir les détails | `p6-d20-icon-details.svg` | [ ] | [ ] | [ ] |
| D21 | P0 | En ligne | `p6-d21-icon-online.svg` | [ ] | [ ] | [ ] |
| D22 | P0 | Hors ligne | `p6-d22-icon-offline.svg` | [ ] | [ ] | [ ] |
| D23 | P0 | Synchronisation en cours | `p6-d23-icon-sync-running.svg` | [ ] | [ ] | [ ] |
| D24 | P0 | Succès | `p6-d24-icon-success.svg` | [ ] | [ ] | [ ] |
| D25 | P0 | Avertissement | `p6-d25-icon-warning.svg` | [ ] | [ ] | [ ] |
| D26 | P0 | Erreur | `p6-d26-icon-error.svg` | [ ] | [ ] | [ ] |
| D27 | P1 | Nouveau projet | `p6-d27-icon-new-project.svg` | [ ] | [ ] | [ ] |
| D28 | P1 | Projet archivé | `p6-d28-icon-archived.svg` | [ ] | [ ] | [ ] |
| D29 | P1 | Fork | `p6-d29-icon-fork.svg` | [ ] | [ ] | [ ] |
| D30 | P1 | Application disponible | `p6-d30-icon-app-available.svg` | [ ] | [ ] | [ ] |
| D31 | P1 | Dépôt uniquement | `p6-d31-icon-repository-only.svg` | [ ] | [ ] | [ ] |
| D32 | P1 | Cache local | `p6-d32-icon-local-cache.svg` | [ ] | [ ] | [ ] |
| D33 | P1 | Date ou calendrier | `p6-d33-icon-calendar.svg` | [ ] | [ ] | [ ] |
| D34 | P1 | Horloge ou activité récente | `p6-d34-icon-clock.svg` | [ ] | [ ] | [ ] |
| D35 | P1 | Version ou release | `p6-d35-icon-release.svg` | [ ] | [ ] | [ ] |
| D36 | P1 | Langage ou code | `p6-d36-icon-code.svg` | [ ] | [ ] | [ ] |
| D37 | P1 | Branche | `p6-d37-icon-branch.svg` | [ ] | [ ] | [ ] |
| D38 | P1 | Pull request | `p6-d38-icon-pull-request.svg` | [ ] | [ ] | [ ] |
| D39 | P1 | Conflit ou protection | `p6-d39-icon-shield.svg` | [ ] | [ ] | [ ] |
| D40 | P2 | Dépôt renommé | `p6-d40-icon-renamed.svg` | [ ] | [ ] | [ ] |
| D41 | P2 | URL d’application modifiée | `p6-d41-icon-app-url-changed.svg` | [ ] | [ ] | [ ] |

---

# 6. Ornements décoratifs

| ID | P | Fichier final | Format | Dimensions | Critère principal | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E01 | P2 | `p6-e01-lamp-512x768.webp` et `p6-e01-lamp-halo-1024x1024.png` | WebP + PNG | 512 × 768 et 1024 × 1024 | Lampe et halo séparés. | [ ] | [ ] | [ ] |
| E02 | P2 | `p6-e02-rope-segment-1024x128.webp` et `p6-e02-rope-corner-256x256.webp` | WebP | 1024 × 128 et 256 × 256 | Segment et angle raccordables. | [ ] | [ ] | [ ] |
| E03 | P2 | `p6-e03-screws-bolts-512x512.webp` | WebP | 512 × 512 | Quatre variantes. | [ ] | [ ] | [ ] |
| E04 | P2 | `p6-e04-nails-pins-512x512.webp` | WebP | 512 × 512 | Quatre variantes. | [ ] | [ ] | [ ] |
| E05 | P3 | `p6-e05-mug-512x512.webp` | WebP | 512 × 512 | Objet non interactif. | [ ] | [ ] | [ ] |
| E06 | P3 | `p6-e06-potted-plant-512x768.webp` | WebP | 512 × 768 | Supprimable sur mobile. | [ ] | [ ] | [ ] |
| E07 | P3 | `p6-e07-wrench-768x256.webp` | WebP | 768 × 256 | Sans chrome brillant. | [ ] | [ ] | [ ] |
| E08 | P3 | `p6-e08-notebook-plan-768x512.webp` | WebP | 768 × 512 | Aucun texte lisible. | [ ] | [ ] | [ ] |
| E09 | P3 | `p6-e09-leaves-sprouts-512x512.webp` | WebP | 512 × 512 | Faible contraste. | [ ] | [ ] | [ ] |
| E10 | P3 | `p6-e10-workshop-crate-768x512.webp` | WebP | 768 × 512 | Ne ressemble pas à un bouton. | [ ] | [ ] | [ ] |
| E11 | P3 | `p6-e11-laboratory-vial-512x768.webp` | WebP | 512 × 768 | Accent discret. | [ ] | [ ] | [ ] |
| E12 | P3 | `p6-e12-workbench-tool-512x512.webp` | WebP | 512 × 512 | Outil isolé, sans marque. | [ ] | [ ] | [ ] |

---

# 7. Couvertures et identités de projets

Règles communes : couverture catalogue 640 × 400, couverture fiche 960 × 600, logo transparent 512 × 160, aucun texte fonctionnel, aucune version, progression, branche ou bouton. Fallback : C18 + nom HTML + accent déterministe.

| ID | P | Projet | Couverture catalogue | Couverture fiche | Logo | M | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F01 | P0 | Gargotte Adventure | `p6-f01-gargotte-adventure-cover-640x400.webp` | `p6-f01-gargotte-adventure-cover-960x600.webp` | `p6-f01-gargotte-adventure-logo-512x160.webp` | [x] | [ ] | [ ] | [ ] |
| F02 | P0 | Les Petites Quêtes | `p6-f02-les-petites-quetes-cover-640x400.webp` | `p6-f02-les-petites-quetes-cover-960x600.webp` | `p6-f02-les-petites-quetes-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F03 | P0 | BibiLeaf | `p6-f03-bibilleaf-cover-640x400.webp` | `p6-f03-bibilleaf-cover-960x600.webp` | `p6-f03-bibilleaf-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F04 | P0 | Agripine | `p6-f04-agripine-cover-640x400.webp` | `p6-f04-agripine-cover-960x600.webp` | `p6-f04-agripine-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F05 | P0 | Luma | `p6-f05-luma-cover-640x400.webp` | `p6-f05-luma-cover-960x600.webp` | `p6-f05-luma-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F06 | P0 | Tracker Habit | `p6-f06-tracker-habit-cover-640x400.webp` | `p6-f06-tracker-habit-cover-960x600.webp` | `p6-f06-tracker-habit-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F07 | P0 | ZythoHunt | `p6-f07-zythohunt-cover-640x400.webp` | `p6-f07-zythohunt-cover-960x600.webp` | `p6-f07-zythohunt-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F08 | P0 | MaintBoard V3 | `p6-f08-maintboard-v3-cover-640x400.webp` | `p6-f08-maintboard-v3-cover-960x600.webp` | `p6-f08-maintboard-v3-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F09 | P1 | CadeauScope | `p6-f09-cadeauscope-cover-640x400.webp` | `p6-f09-cadeauscope-cover-960x600.webp` | `p6-f09-cadeauscope-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F10 | P1 | GargoGen | `p6-f10-gargogen-cover-640x400.webp` | `p6-f10-gargogen-cover-960x600.webp` | `p6-f10-gargogen-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F11 | P1 | Tiny Universe | `p6-f11-tiny-universe-cover-640x400.webp` | `p6-f11-tiny-universe-cover-960x600.webp` | `p6-f11-tiny-universe-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F12 | P1 | TeissAI | `p6-f12-teissai-cover-640x400.webp` | `p6-f12-teissai-cover-960x600.webp` | `p6-f12-teissai-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F13 | P1 | DermIA Quantum | `p6-f13-dermia-quantum-cover-640x400.webp` | `p6-f13-dermia-quantum-cover-960x600.webp` | `p6-f13-dermia-quantum-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F14 | P1 | Casse-latte Simulator 2026 | `p6-f14-casse-latte-simulator-2026-cover-640x400.webp` | `p6-f14-casse-latte-simulator-2026-cover-960x600.webp` | `p6-f14-casse-latte-simulator-2026-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F15 | P2 | Gargotte V5 | `p6-f15-gargotte-v5-cover-640x400.webp` | `p6-f15-gargotte-v5-cover-960x600.webp` | `p6-f15-gargotte-v5-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F16 | P2 | PQ- | `p6-f16-pq-cover-640x400.webp` | `p6-f16-pq-cover-960x600.webp` | `p6-f16-pq-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F17 | P2 | AI Agents for Beginners | `p6-f17-ai-agents-for-beginners-cover-640x400.webp` | `p6-f17-ai-agents-for-beginners-cover-960x600.webp` | `p6-f17-ai-agents-for-beginners-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |
| F18 | P2 | La Grange | `p6-f18-la-grange-cover-640x400.webp` | `p6-f18-la-grange-cover-960x600.webp` | `p6-f18-la-grange-logo-512x160.webp` | [ ] | [ ] | [ ] | [ ] |

---

# 8. Planches de validation documentaire

Ces PNG sont placés à plat dans `docs/assets/phase-6/` et ne sont jamais servis par l’application.

| ID | P | Nom final | Dimensions | P | V |
| --- | --- | --- | --- | --- | --- |
| G01 | P0 | `phase6-g01-dashboard-desktop-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G02 | P0 | `phase6-g02-dashboard-tablet-1024x1366.png` | 1024 × 1366 | [ ] | [ ] |
| G03 | P0 | `phase6-g03-dashboard-mobile-390x844.png` | 390 × 844 | [ ] | [ ] |
| G04 | P1 | `phase6-g04-catalogue-desktop-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G04b | P1 | `phase6-g04b-catalogue-mobile-390x844.png` | 390 × 844 | [ ] | [ ] |
| G05 | P1 | `phase6-g05-project-detail-desktop-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G05b | P1 | `phase6-g05b-project-detail-mobile-390x844.png` | 390 × 844 | [ ] | [ ] |
| G06 | P1 | `phase6-g06-activity-desktop-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G06b | P1 | `phase6-g06b-activity-mobile-390x844.png` | 390 × 844 | [ ] | [ ] |
| G07 | P1 | `phase6-g07-settings-desktop-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G07b | P1 | `phase6-g07b-settings-mobile-390x844.png` | 390 × 844 | [ ] | [ ] |
| G08 | P1 | `phase6-g08-components-gallery-1920x1080.png` | 1920 × 1080 | [ ] | [ ] |
| G09 | P1 | `phase6-g09-no-images-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G10 | P1 | `phase6-g10-long-content-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G10b | P1 | `phase6-g10b-long-content-mobile-390x844.png` | 390 × 844 | [ ] | [ ] |
| G11 | P1 | `phase6-g11-zoom-200-780x1688.png` | 780 × 1688 | [ ] | [ ] |
| G12 | P1 | `phase6-g12-compact-density-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G13 | P1 | `phase6-g13-reduced-motion-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G14 | P2 | `phase6-g14-low-light-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |
| G14b | P2 | `phase6-g14b-bright-light-1440x1024.png` | 1440 × 1024 | [ ] | [ ] |

---

# 9. Typographie

Aucun fichier de police n’est produit avant validation explicite de la licence. A01 à A06 portent la marque. Les titres utilisent une serif robuste locale ou système ; le corps utilise une sans-serif système ; les notes manuscrites restent décoratives.

---

# 10. Contrôles obligatoires

- [ ] T01 détourage et transparence ;
- [ ] T02 aucun texte fonctionnel ;
- [ ] T03 nom exact ;
- [ ] T04 format et dimensions exacts ;
- [ ] T05 signature réelle du fichier ;
- [ ] T06 SVG sans script ni ressource distante ;
- [ ] T07 poids mesuré ;
- [ ] T08 raccord des textures ;
- [ ] T09 fallback images bloquées ;
- [ ] T10 contraste sombre et clair ;
- [ ] T11 zoom 200 %, compact et mobile ;
- [ ] T12 aucun fichier inutilisé ;
- [ ] T13 aucun sous-dossier runtime ;
- [ ] T14 aucun ZIP, Base64, fragment ou workflow temporaire ;
- [ ] T15 statuts P/V/I mis à jour.

---

# 11. Intégration GitHub

- [ ] I01 PR 6A : identité, matières, shell, navigation et focus ;
- [ ] I02 PR 6B : cartes, statistiques, panneaux et premiers projets ;
- [ ] I03 PR 6C : dashboard et catalogue ;
- [ ] I04 PR 6D : fiches, activité et paramètres ;
- [ ] I05 PR 6E : mouvement, assets finaux et optimisation ;
- [ ] I06 PR corrective : P1 et P2 uniquement.

Chaque PR exige CI complète, budgets, responsive, hors ligne, revue Codex, lecture réelle des fils et fusion verrouillée sur le SHA validé.

---

# 12. Ordre de production

1. A01, puis B01, puis C01, puis F01, puis C16 ;
2. variantes strictement enregistrées ;
3. matières et lumière P0 ;
4. iconographie P0 ;
5. cadres et panneaux P0 ;
6. F02 à F08 ;
7. G01 à G03 ;
8. P1 ;
9. P2 et P3 après validation de la composition.

## Prochain asset autorisé

**A01 : `p6-a01-brand-sign-1600x720.webp`.**

Aucun autre asset ne doit être produit ou intégré avant sa validation et la mise à jour de cette ligne.
