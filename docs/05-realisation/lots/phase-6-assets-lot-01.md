# Phase 6 - Production des assets - Lot 01

## Statut

Lot produit hors dépôt le 2026-07-29. Aucun fichier graphique n'est encore copié dans `public/` et aucune intégration applicative n'a commencé.

Archive de validation fournie séparément : `la-grange-phase6-assets-lot-01.zip`.

Ce journal complète le registre principal :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

## Assets produits

### Identité

- [x] **A01 | Enseigne large détourée** : PNG et WebP transparents, largeur 1600 px.
- [x] **A02 | Enseigne moyenne détourée** : PNG et WebP transparents, largeur 800 px.
- [x] **A03 | Enseigne compacte mobile** : composition resserrée, canevas 960 x 560 px.
- [x] **Variante runtime de l'enseigne** : WebP 800 px, 99,8 Ko.

### Fond d'atelier

- [x] **B01 | Fond desktop** : 2048 x 1152 px, WebP et AVIF.
- [x] **B02 | Tablette paysage** : 1366 x 1024 px, WebP et AVIF.
- [x] **B03 | Tablette portrait** : 1024 x 1366 px, WebP et AVIF.
- [x] **B04 | Mobile vertical** : 780 x 1386 px, WebP et AVIF.

L'AVIF desktop pèse 134,4 Ko et reste sous la cible de 140 Ko. Le WebP desktop pèse 202,6 Ko et dépasse légèrement la cible de 190 Ko ; l'AVIF est donc le candidat prioritaire, avec WebP en fallback.

### Cadre de carte

- [x] **C01 | Cadre standard** : exports 1024 et 640 px.
- [x] Fenêtre d'illustration réellement transparente.
- [x] Zones de placement documentées dans `project-card-frame-standard-regions.json`.
- [x] Variante runtime 560 px : 87,3 Ko.

Le texte, les badges, les métadonnées, la progression et les actions restent en HTML ou SVG.

### Gargotte Adventure

- [x] **F01 | Couverture autonome** sans version, progression, statut ou bouton.
- [x] Export catalogue 640 x 400 px : 28,2 Ko en AVIF et 47,5 Ko en WebP.
- [x] Export fiche 960 x 600 px : 52,9 Ko en AVIF et 88,1 Ko en WebP.
- [x] Logo ou mot-symbole séparé sur fond transparent.
- [x] Variante runtime du logo : 450 x 135 px, 28,3 Ko.
- [x] Accent documenté : `#C58B35`.
- [x] Fallback déterministe documenté dans `theme.json`.

### Panneau de bienvenue

- [ ] **C16 | Panneau sans texte fonctionnel**.

Les essais automatiques de suppression du texte ont dégradé la matière du papier. Ils sont rejetés. Le master approuvé est conservé comme référence uniquement et ne doit pas être déclaré prêt pour le runtime.

## Contrôles réalisés

- [x] Transparence de l'enseigne, du cadre et du logo.
- [x] Absence de badge de version sur la couverture Gargotte.
- [x] Absence de texte métier dans la couverture Gargotte.
- [x] Cadrages desktop, tablette paysage, tablette portrait et mobile.
- [x] Formats WebP et AVIF lisibles.
- [x] Manifest avec dimensions et poids.
- [x] Trois planches de validation produites.
- [x] Aucun asset distant.
- [x] Aucun fichier de police ajouté.
- [x] Aucun fichier copié dans le runtime de La Grange.

## Décision de lot

Le lot est techniquement exploitable pour la marque, le fond, le cadre standard et Gargotte Adventure. Le panneau de bienvenue reste bloquant uniquement pour sa variante sans texte.

Les assets ne seront intégrés qu'après validation humaine de l'archive et des trois planches de contrôle.

## Prochain lot recommandé

1. produire proprement C16 avec une génération ou une retouche dédiée, pas une suppression automatique destructive ;
2. produire B07 à B12 : bois structurel, bois de caisse, papier calme, métal sombre, verre sombre et lumière principale ;
3. produire C11 à C13 : poutre de statistiques, titre de section et panneau bois secondaire ;
4. produire l'iconographie P0 D01 à D05 et D21 à D26 ;
5. poursuivre avec les couvertures F02 à F08 après validation du lot 01.
