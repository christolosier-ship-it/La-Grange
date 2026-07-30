# Suivi de production des assets de la Phase 6

## Statut et autorité

**Ce fichier est la source de vérité unique du catalogue des assets de la Phase 6.**

Dernière mise à jour : 2026-07-30.

Il fixe les identifiants, noms finaux, formats, dimensions, transparences, usages, fallbacks, provenances et statuts. En cas de conflit avec un autre document, le présent registre prime pour la production et l’intégration des assets.

## Dossiers autorisés

- runtime : `public/assets/phase-6/` ;
- masters et planches : `docs/assets/phase-6/`.

Ces deux dossiers restent **plats**. Aucun sous-dossier par famille ou projet n’est autorisé.

## Nommage obligatoire

- raster : `p6-<id>-<nom>-<largeur>x<hauteur>.<extension>` ;
- SVG : `p6-<id>-<nom>.svg` ;
- minuscules, tirets, aucun espace, accent ou date ;
- dimensions obligatoires dans tout nom raster ;
- identifiant exact du registre obligatoire ;
- aucune variante non enregistrée ;
- aucun ZIP, Base64, fragment ou workflow de matérialisation.

Les planches documentaires utilisent la même convention `p6-<id>-...`.

## Méthode obligatoire

### Production et validation

1. sélectionner une seule ligne ;
2. vérifier que sa source ou son master est versionné ;
3. produire uniquement ce fichier ;
4. exporter exactement au nom, format et dimensions indiqués ;
5. contrôler signature, dimensions, alpha, poids et absence de texte fonctionnel ;
6. renseigner la provenance et les droits ;
7. cocher P après contrôle technique ;
8. obtenir la validation humaine puis cocher V ;
9. mettre à jour le champ « Prochain élément autorisé ».

### Intégration ultérieure

L’intégration ne suit pas immédiatement chaque validation. Elle commence uniquement lorsque les assets et planches nécessaires au lot 6A, 6B, 6C, 6D ou 6E sont validés.

Lors de la PR d’intégration :

1. copier manuellement le fichier dans `public/assets/phase-6/` ;
2. raccorder le code et le fallback ;
3. contrôler responsive, hors ligne, performance et accessibilité ;
4. cocher I seulement lorsque l’application consomme réellement le fichier.

La production en masse sans validation intermédiaire est interdite.

## Statuts

### Masters

- **A** : direction artistique approuvée par le propriétaire ;
- **R** : fichier de référence canonique présent sous son nom final dans `docs/assets/phase-6/`.

Un master approuvé mais non versionné ne peut pas servir de source de production.

### Assets

- **P** : export conforme produit et contrôlé techniquement ;
- **V** : export validé humainement ;
- **I** : fichier intégré sous son nom final et consommé par l’application.

Les premières tentatives restent des **prototypes hérités non canoniques**. Elles ne valident aucune ligne et seront supprimées manuellement après leur remplacement.

## Provenance et droits

La colonne « Source / droits » est obligatoire avant de cocher P. Elle contient :

- le master ou la source précise ;
- l’auteur, l’outil ou la méthode de production ;
- le statut des droits d’utilisation ;
- le cas échéant, la licence et son lien documentaire.

La valeur `à renseigner avant P` bloque la production considérée comme terminée.

## Priorités

- P0 : shell ou premier lot visuel ;
- P1 : cartes, vues principales ou projets mis en avant ;
- P2 : cohérence complète ;
- P3 : ornement facultatif.

---

# 1. Masters artistiques

| ID | P | Master | Fichier canonique | Dimensions | Description | A | R |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M01 | P0 | Enseigne La Grange | `p6-m01-brand-sign-master-1600x720.webp` | 1600 × 720 | Bois sculpté, corde, attaches et lettrage de marque. | [x] | [ ] |
| M02 | P0 | Fond d’atelier | `p6-m02-background-workshop-master-2048x1152.webp` | 2048 × 1152 | Grange-atelier nocturne, charpente et lumière ambrée. | [x] | [ ] |
| M03 | P0 | Cadre de carte vide | `p6-m03-project-card-frame-master-640x960.webp` | 640 × 960 | Cadre vertical, fenêtre libre et zones de contenu. | [x] | [ ] |
| M04 | P1 | Carte Gargotte complète | `p6-m04-gargotte-card-master-640x960.webp` | 640 × 960 | Master de composition, jamais intégré comme carte figée. | [x] | [ ] |
| M05 | P0 | Panneau de bienvenue | `p6-m05-welcome-panel-master-640x960.webp` | 640 × 960 | Papier suspendu, dessin et attaches. | [x] | [ ] |

---

# 2. Identité de marque

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage / fallback | Source / droits | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A01 | P0 | `p6-a01-brand-sign-1600x720.webp` | WebP | 1600 × 720 | oui | Enseigne desktop / texte « La Grange ». | M01 / à renseigner avant P | [ ] | [ ] | [ ] |
| A02 | P0 | `p6-a02-brand-sign-800x360.webp` | WebP | 800 × 360 | oui | Enseigne tablette / texte « La Grange ». | A01 / à renseigner avant P | [ ] | [ ] | [ ] |
| A03 | P0 | `p6-a03-brand-sign-mobile-960x560.webp` | WebP | 960 × 560 | oui | Enseigne mobile / texte « La Grange ». | M01 / à renseigner avant P | [ ] | [ ] | [ ] |
| A04 | P1 | `p6-a04-brand-mark.svg` | SVG | viewBox 256 × 256 | oui | Marque compacte / initiales LG. | M01 / à renseigner avant P | [ ] | [ ] | [ ] |
| A05 | P2 | `p6-a05-brand-mark-light.svg` | SVG | viewBox 256 × 256 | oui | Marque monochrome claire / initiales LG. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A06 | P2 | `p6-a06-brand-mark-dark.svg` | SVG | viewBox 256 × 256 | oui | Marque monochrome sombre / initiales LG. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A07 | P2 | `p6-a07-favicon-32x32.png` | PNG | 32 × 32 | oui | Favicon 32 / initiales LG. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A08 | P2 | `p6-a08-favicon-48x48.png` | PNG | 48 × 48 | oui | Favicon 48 / initiales LG. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A09 | P2 | `p6-a09-pwa-icon-192x192.png` | PNG | 192 × 192 | non | Icône PWA / icône provisoire actuelle. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A10 | P2 | `p6-a10-pwa-icon-512x512.png` | PNG | 512 × 512 | non | Icône PWA HD / icône provisoire actuelle. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A11 | P2 | `p6-a11-pwa-maskable-512x512.png` | PNG | 512 × 512 | non | Icône maskable / A10. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |
| A12 | P2 | `p6-a12-apple-touch-icon-180x180.png` | PNG | 180 × 180 | non | Icône iOS / A10. | A04 / à renseigner avant P | [ ] | [ ] | [ ] |

---

# 3. Fond, matières et lumière

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage / fallback | Source / droits | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B01 | P0 | `p6-b01-background-workshop-2048x1152.webp` | WebP | 2048 × 1152 | non | Fond desktop / gradients du design system. | M02 / à renseigner avant P | [ ] | [ ] | [ ] |
| B02 | P0 | `p6-b02-background-workshop-tablet-1366x1024.webp` | WebP | 1366 × 1024 | non | Fond tablette paysage / gradients. | M02 / à renseigner avant P | [ ] | [ ] | [ ] |
| B03 | P0 | `p6-b03-background-workshop-tablet-1024x1366.webp` | WebP | 1024 × 1366 | non | Fond tablette portrait / gradients. | M02 / à renseigner avant P | [ ] | [ ] | [ ] |
| B04 | P0 | `p6-b04-background-workshop-mobile-780x1386.webp` | WebP | 780 × 1386 | non | Fond mobile 390 px CSS / gradients. | M02 / à renseigner avant P | [ ] | [ ] | [ ] |
| B05 | P2 | `p6-b05-background-workshop-low-density-780x1386.webp` | WebP | 780 × 1386 | non | Économie de données / couleur unie. | B04 / à renseigner avant P | [ ] | [ ] | [ ] |
| B06 | P2 | aucun fichier | CSS | sans dimension | non | Fallback global du shell. | CSS interne / droits projet | [ ] | [ ] | [ ] |
| B07 | P0 | `p6-b07-texture-wood-structure-1024x1024.webp` | WebP | 1024 × 1024 | non | Charpente et rails / brun uni. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B08 | P0 | `p6-b08-texture-wood-crate-1024x1024.webp` | WebP | 1024 × 1024 | non | Cartes et caisses / brun de surface. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B09 | P1 | `p6-b09-texture-paper-calm-512x512.webp` | WebP | 512 × 512 | non | Notes et aides / beige uni. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B10 | P1 | `p6-b10-texture-metal-dark-512x512.webp` | WebP | 512 × 512 | non | Attaches et plaques / gris brun uni. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B11 | P2 | `p6-b11-texture-dark-glass-512x512.webp` | WebP | 512 × 512 | oui | Panneaux techniques / fond sombre opaque. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B12 | P0 | `p6-b12-light-main-1600x900.png` | PNG | 1600 × 900 | oui | Halo principal / gradient radial CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B13 | P1 | `p6-b13-light-sync-256x256.png` | PNG | 256 × 256 | oui | Halo synchronisation / bordure CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B14 | P1 | `p6-b14-light-new-project-256x256.png` | PNG | 256 × 256 | oui | Accent nouvelle arrivée / bordure CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| B15 | P2 | `p6-b15-shadow-structure-1600x900.png` | PNG | 1600 × 900 | oui | Ombres de poutres / ombres CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |

---

# 4. Cadres, panneaux et contrôles

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage / fallback | Source / droits | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C01 | P0 | `p6-c01-project-card-frame-standard.svg` | SVG | viewBox 640 × 960 | oui | Carte standard / bordure CSS. | M03 / à renseigner avant P | [ ] | [ ] | [ ] |
| C02 | P0 | `p6-c02-project-card-frame-compact.svg` | SVG | viewBox 512 × 720 | oui | Carte compacte / bordure CSS. | C01 / à renseigner avant P | [ ] | [ ] | [ ] |
| C03 | P1 | `p6-c03-project-card-frame-featured.svg` | SVG | viewBox 800 × 960 | oui | Carte mise en avant / C01. | C01 / à renseigner avant P | [ ] | [ ] | [ ] |
| C04 | P1 | `p6-c04-project-card-frame-list.svg` | SVG | viewBox 960 × 320 | oui | Carte liste / bordure CSS. | C01 / à renseigner avant P | [ ] | [ ] | [ ] |
| C05 | P1 | aucun fichier | CSS | sans dimension | n/a | Traitement archivé / contenu inchangé. | CSS interne / droits projet | [ ] | [ ] | [ ] |
| C06 | P1 | `p6-c06-ribbon-category.svg` | SVG | viewBox 160 × 240 | oui | Catégorie / badge CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C07 | P1 | `p6-c07-ribbon-new-project.svg` | SVG | viewBox 160 × 240 | oui | Nouvelle arrivée / badge texte. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C08 | P1 | `p6-c08-status-label.svg` | SVG | viewBox 320 × 96 | oui | Statut / badge CSS et texte. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C09 | P1 | `p6-c09-metadata-rail.svg` | SVG | viewBox 640 × 96 | oui | Métadonnées / séparateur CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C10 | P1 | `p6-c10-actions-rail.svg` | SVG | viewBox 640 × 120 | oui | Rail d’actions / ligne CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C11 | P0 | `p6-c11-stats-beam.svg` | SVG | viewBox 1600 × 220 | oui | Statistiques / panneau CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C12 | P0 | `p6-c12-section-beam.svg` | SVG | viewBox 1600 × 120 | oui | Titre de section / texte et bordure CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C13 | P0 | `p6-c13-panel-wood-secondary.svg` | SVG | viewBox 640 × 960 | oui | Navigation ou résumé / panneau CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C14 | P1 | `p6-c14-panel-dark-glass.svg` | SVG | viewBox 640 × 960 | oui | Activité / fond sombre CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C15 | P1 | `p6-c15-paper-note.svg` | SVG | viewBox 640 × 800 | oui | Note ou aide / panneau beige CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C16 | P0 | `p6-c16-welcome-panel-640x960.webp` | WebP | 640 × 960 | oui | Bienvenue / C15 et texte HTML. | M05 / à renseigner avant P | [ ] | [ ] | [ ] |
| C17 | P1 | `p6-c17-empty-slot.svg` | SVG | viewBox 512 × 720 | oui | État vide / bordure pointillée CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C18 | P1 | `p6-c18-project-cover-fallback.svg` | SVG | viewBox 640 × 400 | oui | Couverture absente / initiales et nom HTML. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C19 | P2 | `p6-c19-modal-frame.svg` | SVG | viewBox 960 × 720 | oui | Modale / panneau CSS accessible. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C20 | P2 | `p6-c20-toast-frame.svg` | SVG | viewBox 640 × 160 | oui | Toast / bordure CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C21 | P2 | `p6-c21-diagnostic-panel.svg` | SVG | viewBox 960 × 720 | oui | Diagnostic / surface CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C22 | P1 | `p6-c22-button-primary.svg` | SVG | viewBox 480 × 112 | oui | Bouton principal / bouton CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C23 | P1 | `p6-c23-button-secondary.svg` | SVG | viewBox 480 × 112 | oui | Bouton secondaire / bouton CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C24 | P1 | `p6-c24-button-danger.svg` | SVG | viewBox 480 × 112 | oui | Bouton destructif / bouton CSS rouge. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C25 | P1 | `p6-c25-search-field-frame.svg` | SVG | viewBox 960 × 112 | oui | Recherche / champ natif sans cadre. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C26 | P1 | `p6-c26-filter-chip.svg` | SVG | viewBox 320 × 96 | oui | Filtre / bouton natif. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C27 | P2 | `p6-c27-separator-horizontal.svg` | SVG | viewBox 1024 × 32 | oui | Séparateur horizontal / bordure CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C28 | P2 | `p6-c28-separator-vertical.svg` | SVG | viewBox 32 × 1024 | oui | Séparateur vertical / bordure CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| C29 | P2 | aucun fichier | CSS | 2 px minimum | n/a | Focus visible / outline natif. | CSS interne / droits projet | [ ] | [ ] | [ ] |

---

# 5. Iconographie fonctionnelle

Règles communes : SVG local, `viewBox 0 0 24 24`, alpha oui, trait 1,75 à 2 px, `currentColor`, source et droits à renseigner avant P, fallback par libellé textuel de la fonction.

| ID | P | Fonction et usage | Fichier final | P | V | I |
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

| ID | P | Fichier final | Format | Dimensions | Alpha | Usage / fallback | Source / droits | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E01a | P2 | `p6-e01a-lamp-512x768.webp` | WebP | 512 × 768 | oui | Lampe suspendue / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E01b | P2 | `p6-e01b-lamp-halo-1024x1024.png` | PNG | 1024 × 1024 | oui | Halo de lampe / gradient CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E02a | P2 | `p6-e02a-rope-segment-1024x128.webp` | WebP | 1024 × 128 | oui | Segment de corde / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E02b | P2 | `p6-e02b-rope-corner-256x256.webp` | WebP | 256 × 256 | oui | Angle de corde / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E03 | P2 | `p6-e03-screws-bolts-512x512.webp` | WebP | 512 × 512 | oui | Attaches / cercles CSS. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E04 | P2 | `p6-e04-nails-pins-512x512.webp` | WebP | 512 × 512 | oui | Punaises / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E05 | P3 | `p6-e05-mug-512x512.webp` | WebP | 512 × 512 | oui | Tasse décorative / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E06 | P3 | `p6-e06-potted-plant-512x768.webp` | WebP | 512 × 768 | oui | Plante décorative / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E07 | P3 | `p6-e07-wrench-768x256.webp` | WebP | 768 × 256 | oui | Clé décorative / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E08 | P3 | `p6-e08-notebook-plan-768x512.webp` | WebP | 768 × 512 | oui | Carnet sans texte / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E09 | P3 | `p6-e09-leaves-sprouts-512x512.webp` | WebP | 512 × 512 | oui | Feuilles / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E10 | P3 | `p6-e10-workshop-crate-768x512.webp` | WebP | 768 × 512 | oui | Caisse décorative / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E11 | P3 | `p6-e11-laboratory-vial-512x768.webp` | WebP | 512 × 768 | oui | Fiole décorative / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |
| E12 | P3 | `p6-e12-workbench-tool-512x512.webp` | WebP | 512 × 512 | oui | Outil décoratif / absence tolérée. | Création interne / à renseigner avant P | [ ] | [ ] | [ ] |

---

# 7. Couvertures et identités de projets

Règles communes : une ligne correspond à un seul fichier. Les couvertures catalogue utilisent C18 + nom HTML en fallback. Les couvertures fiche utilisent la couverture catalogue agrandie ou C18. Les logos utilisent le nom HTML. La provenance et les droits sont renseignés avant P.

| ID | P | Projet / usage | Fichier final | Dimensions | Alpha | Source / droits | P | V | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F01a | P0 | Gargotte, catalogue | `p6-f01a-gargotte-adventure-cover-640x400.webp` | 640 × 400 | non | M04 / à renseigner avant P | [ ] | [ ] | [ ] |
| F01b | P0 | Gargotte, fiche | `p6-f01b-gargotte-adventure-cover-960x600.webp` | 960 × 600 | non | M04 / à renseigner avant P | [ ] | [ ] | [ ] |
| F01c | P0 | Gargotte, logo | `p6-f01c-gargotte-adventure-logo-512x160.webp` | 512 × 160 | oui | M04 / à renseigner avant P | [ ] | [ ] | [ ] |
| F02a | P0 | Les Petites Quêtes, catalogue | `p6-f02a-les-petites-quetes-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F02b | P0 | Les Petites Quêtes, fiche | `p6-f02b-les-petites-quetes-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F02c | P0 | Les Petites Quêtes, logo | `p6-f02c-les-petites-quetes-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F03a | P0 | BibiLeaf, catalogue | `p6-f03a-bibilleaf-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F03b | P0 | BibiLeaf, fiche | `p6-f03b-bibilleaf-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F03c | P0 | BibiLeaf, logo | `p6-f03c-bibilleaf-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F04a | P0 | Agripine, catalogue | `p6-f04a-agripine-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F04b | P0 | Agripine, fiche | `p6-f04b-agripine-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F04c | P0 | Agripine, logo | `p6-f04c-agripine-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F05a | P0 | Luma, catalogue | `p6-f05a-luma-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F05b | P0 | Luma, fiche | `p6-f05b-luma-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F05c | P0 | Luma, logo | `p6-f05c-luma-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F06a | P0 | Tracker Habit, catalogue | `p6-f06a-tracker-habit-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F06b | P0 | Tracker Habit, fiche | `p6-f06b-tracker-habit-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F06c | P0 | Tracker Habit, logo | `p6-f06c-tracker-habit-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F07a | P0 | ZythoHunt, catalogue | `p6-f07a-zythohunt-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F07b | P0 | ZythoHunt, fiche | `p6-f07b-zythohunt-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F07c | P0 | ZythoHunt, logo | `p6-f07c-zythohunt-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F08a | P0 | MaintBoard V3, catalogue | `p6-f08a-maintboard-v3-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F08b | P0 | MaintBoard V3, fiche | `p6-f08b-maintboard-v3-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F08c | P0 | MaintBoard V3, logo | `p6-f08c-maintboard-v3-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F09a | P1 | CadeauScope, catalogue | `p6-f09a-cadeauscope-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F09b | P1 | CadeauScope, fiche | `p6-f09b-cadeauscope-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F09c | P1 | CadeauScope, logo | `p6-f09c-cadeauscope-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F10a | P1 | GargoGen, catalogue | `p6-f10a-gargogen-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F10b | P1 | GargoGen, fiche | `p6-f10b-gargogen-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F10c | P1 | GargoGen, logo | `p6-f10c-gargogen-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F11a | P1 | Tiny Universe, catalogue | `p6-f11a-tiny-universe-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F11b | P1 | Tiny Universe, fiche | `p6-f11b-tiny-universe-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F11c | P1 | Tiny Universe, logo | `p6-f11c-tiny-universe-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F12a | P1 | TeissAI, catalogue | `p6-f12a-teissai-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F12b | P1 | TeissAI, fiche | `p6-f12b-teissai-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F12c | P1 | TeissAI, logo | `p6-f12c-teissai-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F13a | P1 | DermIA Quantum, catalogue | `p6-f13a-dermia-quantum-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F13b | P1 | DermIA Quantum, fiche | `p6-f13b-dermia-quantum-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F13c | P1 | DermIA Quantum, logo | `p6-f13c-dermia-quantum-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F14a | P1 | Casse-latte Simulator 2026, catalogue | `p6-f14a-casse-latte-simulator-2026-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F14b | P1 | Casse-latte Simulator 2026, fiche | `p6-f14b-casse-latte-simulator-2026-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F14c | P1 | Casse-latte Simulator 2026, logo | `p6-f14c-casse-latte-simulator-2026-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F15a | P2 | Gargotte V5, catalogue | `p6-f15a-gargotte-v5-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F15b | P2 | Gargotte V5, fiche | `p6-f15b-gargotte-v5-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F15c | P2 | Gargotte V5, logo | `p6-f15c-gargotte-v5-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F16a | P2 | PQ-, catalogue | `p6-f16a-pq-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F16b | P2 | PQ-, fiche | `p6-f16b-pq-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F16c | P2 | PQ-, logo | `p6-f16c-pq-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F17a | P2 | AI Agents for Beginners, catalogue | `p6-f17a-ai-agents-for-beginners-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F17b | P2 | AI Agents for Beginners, fiche | `p6-f17b-ai-agents-for-beginners-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F17c | P2 | AI Agents for Beginners, logo | `p6-f17c-ai-agents-for-beginners-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F18a | P2 | La Grange, catalogue | `p6-f18a-la-grange-cover-640x400.webp` | 640 × 400 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F18b | P2 | La Grange, fiche | `p6-f18b-la-grange-cover-960x600.webp` | 960 × 600 | non | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |
| F18c | P2 | La Grange, logo | `p6-f18c-la-grange-logo-512x160.webp` | 512 × 160 | oui | Master projet / à renseigner avant P | [ ] | [ ] | [ ] |

---

# 8. Planches de validation documentaire

Ces PNG sont placés à plat dans `docs/assets/phase-6/`, n’entrent pas dans le runtime et suivent la convention raster. Source : captures de l’application avec assets validés ; droits : projet.

| ID | P | Nom final | Dimensions | Usage | P | V |
| --- | --- | --- | --- | --- | --- | --- |
| G01 | P0 | `p6-g01-dashboard-desktop-1440x1024.png` | 1440 × 1024 | Dashboard desktop. | [ ] | [ ] |
| G02 | P0 | `p6-g02-dashboard-tablet-1024x1366.png` | 1024 × 1366 | Dashboard tablette. | [ ] | [ ] |
| G03 | P0 | `p6-g03-dashboard-mobile-390x844.png` | 390 × 844 | Dashboard mobile. | [ ] | [ ] |
| G04a | P1 | `p6-g04a-catalogue-desktop-1440x1024.png` | 1440 × 1024 | Catalogue desktop. | [ ] | [ ] |
| G04b | P1 | `p6-g04b-catalogue-mobile-390x844.png` | 390 × 844 | Catalogue mobile. | [ ] | [ ] |
| G05a | P1 | `p6-g05a-project-detail-desktop-1440x1024.png` | 1440 × 1024 | Fiche desktop. | [ ] | [ ] |
| G05b | P1 | `p6-g05b-project-detail-mobile-390x844.png` | 390 × 844 | Fiche mobile. | [ ] | [ ] |
| G06a | P1 | `p6-g06a-activity-desktop-1440x1024.png` | 1440 × 1024 | Activité desktop. | [ ] | [ ] |
| G06b | P1 | `p6-g06b-activity-mobile-390x844.png` | 390 × 844 | Activité mobile. | [ ] | [ ] |
| G07a | P1 | `p6-g07a-settings-desktop-1440x1024.png` | 1440 × 1024 | Paramètres desktop. | [ ] | [ ] |
| G07b | P1 | `p6-g07b-settings-mobile-390x844.png` | 390 × 844 | Paramètres mobile. | [ ] | [ ] |
| G08 | P1 | `p6-g08-components-gallery-1920x1080.png` | 1920 × 1080 | Galerie de composants. | [ ] | [ ] |
| G09 | P1 | `p6-g09-no-images-1440x1024.png` | 1440 × 1024 | Fallbacks sans images. | [ ] | [ ] |
| G10a | P1 | `p6-g10a-long-content-1440x1024.png` | 1440 × 1024 | Contenus longs desktop. | [ ] | [ ] |
| G10b | P1 | `p6-g10b-long-content-mobile-390x844.png` | 390 × 844 | Contenus longs mobile. | [ ] | [ ] |
| G11 | P1 | `p6-g11-zoom-200-780x1688.png` | 780 × 1688 | Zoom 200 %. | [ ] | [ ] |
| G12 | P1 | `p6-g12-compact-density-1440x1024.png` | 1440 × 1024 | Densité compacte. | [ ] | [ ] |
| G13 | P1 | `p6-g13-reduced-motion-1440x1024.png` | 1440 × 1024 | Mouvement réduit. | [ ] | [ ] |
| G14a | P2 | `p6-g14a-low-light-1440x1024.png` | 1440 × 1024 | Lumière faible. | [ ] | [ ] |
| G14b | P2 | `p6-g14b-bright-light-1440x1024.png` | 1440 × 1024 | Lumière forte. | [ ] | [ ] |

---

# 9. Typographie

Aucun fichier de police n’est produit avant validation explicite de sa licence. Les assets A portent la marque. Les titres utilisent une serif robuste locale ou système ; le corps utilise une sans-serif système ; les notes manuscrites restent décoratives.

---

# 10. Contrôles obligatoires

- [ ] T01 source ou master canonique disponible ;
- [ ] T02 provenance et droits renseignés ;
- [ ] T03 détourage et transparence ;
- [ ] T04 aucun texte fonctionnel ;
- [ ] T05 nom exact ;
- [ ] T06 format et dimensions exacts ;
- [ ] T07 signature réelle du fichier ;
- [ ] T08 SVG sans script ni ressource distante ;
- [ ] T09 poids mesuré ;
- [ ] T10 raccord des textures ;
- [ ] T11 fallback images bloquées ;
- [ ] T12 contraste sombre et clair ;
- [ ] T13 zoom 200 %, compact et mobile ;
- [ ] T14 aucun fichier inutilisé ;
- [ ] T15 aucun sous-dossier runtime ;
- [ ] T16 aucun ZIP, Base64, fragment ou workflow temporaire ;
- [ ] T17 statuts P, V et I exacts.

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

1. versionner M01, puis produire A01 ;
2. versionner M02, puis produire B01 ;
3. versionner M03, puis produire C01 ;
4. versionner M04, puis produire F01a, F01b et F01c séparément ;
5. versionner M05, puis produire C16 ;
6. variantes strictement enregistrées ;
7. matières et lumière P0 ;
8. iconographie P0 ;
9. cadres et panneaux P0 ;
10. F02a à F08c, fichier par fichier ;
11. planches G01 à G03 ;
12. P1 ;
13. P2 et P3 après validation de la composition.

## Prochain élément autorisé

**Versionner M01 sous `docs/assets/phase-6/p6-m01-brand-sign-master-1600x720.webp`.**

A01 ne peut pas être produit tant que la case R de M01 n’est pas cochée.
