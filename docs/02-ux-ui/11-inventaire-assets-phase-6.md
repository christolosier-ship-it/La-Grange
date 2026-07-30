# Inventaire des assets de la Phase 6

## Objectif

Définir les familles, formats, budgets, fallbacks et règles techniques des assets sans dupliquer le catalogue détaillé.

Le catalogue précis des fichiers est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Ce registre est l’unique source de vérité pour les identifiants, noms, formats, dimensions et statuts.

## Principes

- aucun asset distant requis au runtime ;
- chaque asset possède un usage documenté ;
- chaque raster possède des dimensions exactes ;
- chaque SVG possède un `viewBox` exact ;
- le chargement initial ne télécharge pas tout le décor ;
- une image manquante ne casse jamais la mise en page ;
- les textes fonctionnels restent en HTML ;
- les textures sont discrètes et répétables ;
- les assets inutilisés sont supprimés après remplacement et contrôle ;
- la présence d’un fichier dans le dépôt ne constitue pas une validation.

## Référence de cadrage

| Fichier | Rôle | Production |
| --- | --- | --- |
| `docs/assets/phase-6/reference-dashboard-grange.webp` | référence d’ambiance et de composition | documentation uniquement |

Cette référence ne doit pas être servie par l’application.

## Arborescence cible

```text
public/
  assets/
    phase-6/
      p6-a01-brand-sign-1600x720.webp
      p6-b01-background-workshop-2048x1152.webp
      p6-c01-project-card-frame-standard.svg
      p6-d01-icon-overview.svg
      p6-f01-gargotte-adventure-cover-640x400.webp
```

Le dossier `public/assets/phase-6/` reste volontairement plat.

Interdictions :

- aucun sous-dossier par famille ;
- aucun sous-dossier par projet ;
- aucun ZIP ;
- aucun fragment Base64 ;
- aucun fichier temporaire ;
- aucun workflow de reconstruction d’assets.

Les références et planches de contrôle restent également à plat dans `docs/assets/phase-6/`.

## Convention de nommage

### Raster

`p6-<id>-<nom-semantique>-<largeur>x<hauteur>.<extension>`

### SVG

`p6-<id>-<nom-semantique>.svg`

### Règles

- minuscules ;
- tirets simples ;
- aucun espace, accent ou date ;
- identifiant du registre obligatoire ;
- dimensions dans tous les noms raster ;
- suffixes sémantiques explicites ;
- aucune variante non inscrite dans le registre ;
- aucun renommage après intégration sans mise à jour préalable du registre.

## Familles

### A. Identité de marque

Enseigne, symbole compact, variantes monochromes, favicon et icônes PWA.

Contraintes :

- SVG préféré pour les symboles ;
- WebP transparent autorisé pour l’enseigne illustrée ;
- aucun fichier de police ajouté pour reproduire le lettrage ;
- lisibilité contrôlée à petite taille ;
- safe area contrôlée pour les icônes maskables.

### B. Fond, matières et lumière

Fond responsive, textures de bois, papier, métal, verre, halos et ombres.

Contraintes :

- aucun texte ou élément fonctionnel ;
- recadrages séparés lorsque le ratio change ;
- textures raccordables ;
- centre de lecture calme ;
- intensité contrôlable par CSS ;
- fallback par gradients et surfaces unies.

### C. Cadres, panneaux et contrôles

Cadres de cartes, rubans, rails, panneaux, notes, modales et plaques.

Contraintes :

- SVG et CSS privilégiés ;
- texte, icônes, états et hitboxes hors de l’asset ;
- focus géré en CSS ;
- variantes archivées ou désactivées dérivées par CSS lorsqu’un nouveau fichier n’est pas nécessaire ;
- aucune image différente pour une simple couleur d’accent.

### D. Iconographie

Navigation, actions, états et données.

Contraintes :

- SVG local ;
- `viewBox 0 0 24 24` ;
- `currentColor` ;
- trait homogène ;
- aucune police d’icônes ;
- absence d’emoji fonctionnel ;
- libellé textuel conservé comme fallback.

### E. Ornements

Lampe, corde, attaches, tasse, plante, outils et notes décoratives.

Contraintes :

- facultatifs ;
- `aria-hidden` ;
- sans pointer event ;
- chargement différé ;
- suppression possible sur mobile ;
- aucun texte lisible ;
- aucun objet ressemblant à un contrôle.

### F. Couvertures et logos de projets

Pour chaque projet retenu :

- couverture catalogue 640 × 400 ;
- couverture fiche 960 × 600 ;
- logo transparent 512 × 160 ;
- accent déterministe ;
- fallback C18 + nom HTML.

Une couverture ne contient jamais de version, progression, statut, branche, release, conflit ou bouton.

## Dimensions

Les dimensions exactes sont définies dans le registre. Les règles générales sont :

| Famille | Dimension de référence | Format privilégié |
| --- | --- | --- |
| fond desktop | 2048 × 1152 | WebP |
| fond tablette paysage | 1366 × 1024 | WebP |
| fond tablette portrait | 1024 × 1366 | WebP |
| fond mobile | 780 × 1386 | WebP |
| texture grande | 1024 × 1024 | WebP |
| texture moyenne | 512 × 512 | WebP |
| couverture catalogue | 640 × 400 | WebP |
| couverture fiche | 960 × 600 | WebP |
| logo projet | 512 × 160 | WebP transparent |
| icône fonctionnelle | viewBox 24 × 24 | SVG |
| planche desktop | 1440 × 1024 | PNG documentaire |
| planche mobile | 390 × 844 | PNG documentaire |

Aucune dimension approximative n’est utilisée au moment de l’export.

## Budgets

### Shell initial

- décor critique supplémentaire : cible inférieure à 250 Ko compressés ;
- fond principal : cible inférieure à 190 Ko en WebP ;
- textures et cadres critiques : cible cumulée inférieure à 100 Ko ;
- icônes critiques : cible cumulée inférieure à 30 Ko ;
- aucune police décorative sans licence et justification.

### Carte

- couverture 640 × 400 : cible 35 à 80 Ko ;
- couverture 960 × 600 : chargée uniquement sur la fiche ;
- logo : cible inférieure à 30 Ko ;
- couvertures sous la ligne de flottaison en lazy loading.

Tout dépassement est mesuré et approuvé dans la PR concernée.

## Formats

### WebP

Format raster standard pour fonds, couvertures, textures et transparences illustrées.

### SVG

Format standard pour cadres, icônes, plaques et formes adaptables. Le SVG est local, optimisé, sans script, ressource distante ou style global dangereux.

### PNG

Réservé aux halos, masques et planches documentaires lorsque WebP ou SVG ne conviennent pas.

### AVIF

Non retenu comme format principal de la production manuelle Phase 6. Il pourra être réévalué via un ADR si le gain justifie une double chaîne d’exports.

## Production et validation

Chaque asset suit le protocole :

`docs/08-generation-ia/13-protocole-production-assets-phase-6.md`

Étapes minimales :

1. contrat lu dans le registre ;
2. production d’un seul asset ;
3. export exact ;
4. contrôle technique ;
5. validation humaine ;
6. intégration manuelle ;
7. test du fallback ;
8. mise à jour du registre.

Aucune sortie brute n’est intégrée directement.

## Prototypes hérités

Les fichiers des premières tentatives peuvent présenter des noms, dimensions ou chemins non conformes.

Ils sont :

- non canoniques ;
- exclus des statuts P, V et I ;
- conservés jusqu’à leur remplacement ;
- supprimés manuellement après contrôle des références ;
- jamais renommés artificiellement pour valider une ligne.

## Stratégie de chargement

- shell critique préchargé avec parcimonie ;
- décor non critique différé ;
- couvertures lazy loaded ;
- dimensions ou `aspect-ratio` réservés ;
- aucune image encodée en Base64 dans le CSS ;
- aucune requête vers un CDN externe.

## Fallbacks obligatoires

| Élément absent | Fallback |
| --- | --- |
| fond d’atelier | gradients et couleurs du design system |
| texture bois | surface unie sombre |
| cadre SVG | bordure CSS |
| couverture projet | C18, initiales et nom HTML |
| logo projet | nom texte |
| icône | libellé textuel |
| police décorative | pile système |

## Critères d’acceptation

- le fichier est présent dans le registre ;
- son nom, son format et ses dimensions sont exacts ;
- le poids est publié ;
- la provenance est documentée ;
- aucun texte fonctionnel n’est rasterisé ;
- le fallback est testé ;
- le dossier runtime reste plat ;
- aucun asset externe ou secret n’est introduit ;
- l’application reste compréhensible avec toutes les images bloquées.