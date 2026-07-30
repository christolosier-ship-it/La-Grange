# Inventaire des assets de la Phase 6

## Objectif

Définir les familles, formats, budgets, fallbacks et règles techniques des assets sans dupliquer le catalogue détaillé.

Le catalogue précis des fichiers est :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Ce registre est l’unique source de vérité pour les identifiants, noms, formats, dimensions, transparences, usages, fallbacks, budgets, provenances, droits, dépendances, affectations aux lots et statuts.

## Principes

- aucun asset distant requis au runtime ;
- chaque asset possède un usage et un fallback documentés ;
- chaque raster possède des dimensions exactes ;
- chaque SVG possède un `viewBox` exact ;
- une ligne du registre correspond à un seul fichier ;
- le chargement initial ne télécharge pas tout le décor ;
- une image manquante ne casse jamais la mise en page ;
- les textes fonctionnels restent en HTML ;
- les textures sont discrètes et répétables ;
- les assets inutilisés sont supprimés après remplacement et contrôle ;
- la présence seule d’un fichier dans le dépôt ne constitue pas une validation.

## Référence de cadrage

| Fichier | Rôle | Production |
| --- | --- | --- |
| `docs/assets/phase-6/reference-dashboard-grange.webp` | référence d’ambiance et de composition | documentation uniquement |

Cette référence ne doit pas être servie par l’application.

Les masters M01 à M05 et les sources projet S sont enregistrés séparément sous les noms canoniques du registre avant toute production dérivée. S01a et S01c ne peuvent recevoir R qu’après M04.

## Arborescence cible

```text
public/
  assets/
    phase-6/
      p6-a01-brand-sign-1600x720.webp
      p6-b01-background-workshop-2048x1152.webp
      p6-c01-project-card-frame-standard.svg
      p6-d01-icon-overview.svg
      p6-f01a-gargotte-adventure-cover-640x400.webp
```

Tous les nouveaux assets canoniques sont versionnés à la racine de `public/assets/phase-6/`, y compris avec P/V cochés et I décoché.

Interdictions :

- aucun nouveau sous-dossier par famille ;
- aucun nouveau sous-dossier par projet ;
- aucun ZIP ;
- aucun fragment Base64 ;
- aucun fichier temporaire ;
- aucun workflow de reconstruction d’assets.

Les masters et planches de contrôle restent également à plat dans `docs/assets/phase-6/`.

Les sous-dossiers historiques `brand/`, `components/`, `panels/`, `projects/` et `shell/` restent une exception transitoire gelée : aucun fichier n’y est ajouté et aucun de leurs fichiers ne reçoit P, V ou I. Leur `README.md` et leur `manifest.json` historiques n’ont aucune autorité sur le registre.

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
- une variante possède son propre identifiant ;
- aucune variante non inscrite dans le registre ;
- aucun renommage après intégration sans mise à jour préalable du registre.

## Familles

### M. Masters

Références artistiques canoniques, approuvées puis versionnées dans `docs/assets/phase-6/`.

Contraintes :

- une case A confirme la direction ;
- une case R confirme la présence du fichier canonique ;
- aucun dérivé n’est produit tant que R n’est pas cochée ;
- le master n’est jamais servi par l’application ;
- sa provenance et ses droits sont documentés.

### A. Identité de marque

Enseigne, symbole compact, variantes monochromes, favicon et icônes PWA.

Contraintes :

- SVG préféré pour les symboles ;
- WebP transparent autorisé pour l’enseigne illustrée ;
- aucun fichier de police ajouté pour reproduire le lettrage ;
- lisibilité contrôlée à petite taille ;
- safe area contrôlée pour les icônes maskables ;
- fallback texte pour la marque.

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
- aucune image différente pour une simple couleur d’accent ;
- fallback CSS ou composant indiqué dans le registre.

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
- alpha explicite dans le registre ;
- `aria-hidden` ;
- sans pointer event ;
- chargement différé ;
- suppression possible sur mobile ;
- aucun texte lisible ;
- aucun objet ressemblant à un contrôle ;
- absence tolérée comme fallback général.

### F. Couvertures et logos de projets

Pour chaque projet retenu, trois fichiers indépendants :

- ligne `Fa` : couverture catalogue 640 × 400 ;
- ligne `Fb` : couverture fiche 960 × 600 ;
- ligne `Fc` : logo transparent 512 × 160.

Chaque fichier possède ses propres statuts P, V et I. Une couverture ne contient jamais de version, progression, statut, branche, release, conflit ou bouton.

Fallbacks :

- couverture catalogue : C18, initiales et nom HTML ;
- couverture fiche : ligne `Fa` agrandie de manière maîtrisée ou C18 ;
- logo : nom HTML.

## Dimensions

Les dimensions exactes sont définies dans le registre. Les règles générales sont :

| Famille | Dimension de référence | Format privilégié |
| --- | --- | --- |
| master enseigne | 1600 × 720 | WebP documentaire |
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

- décor critique supplémentaire par viewport, hors fond responsive actif : cible inférieure à 250 Ko compressés ;
- une seule variante de fond B01 à B04 chargée initialement ; B01 desktop : cible inférieure à 190 Ko en WebP ;
- plafond desktop d’images critiques Phase 6 : 190 Ko pour B01 + 250 Ko supplémentaires, soit 440 Ko maximum ;
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

## Provenance et droits

La colonne `Source / droits` du registre est la source officielle. Elle est renseignée avant P avec :

- master ou source ;
- auteur, outil ou méthode ;
- statut des droits ;
- licence et référence lorsqu’elles existent.

Aucun manifeste runtime ne porte cette information documentaire.

## Production et validation

Chaque fichier suit le protocole :

`docs/08-generation-ia/13-protocole-production-assets-phase-6.md`

Étapes minimales :

1. master ou source canonique approuvé A et versionné R ;
2. source amont R vérifiée lorsqu’une source S est dérivée ;
3. contrat lu dans le registre ;
4. production d’un seul fichier ;
5. export exact et provenance renseignée ;
6. versionnement à la racine de `public/assets/phase-6/`, contrôle technique et P ;
7. validation humaine et V ;
8. conservation du fichier à la racine avec I décoché jusqu’au futur lot d’intégration ;
9. mise à jour du prochain élément autorisé.

L’intégration manuelle et le statut I interviennent plus tard, lorsque les assets, fallbacks et planches du lot 6A à 6E sont réunis.

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
| enseigne | texte « La Grange » |
| fond d’atelier | gradients et couleurs du design system |
| texture bois | surface unie sombre |
| cadre SVG | bordure CSS |
| couverture projet | C18, initiales et nom HTML |
| logo projet | nom texte |
| icône | libellé textuel |
| police décorative | pile système |
| ornement | absence tolérée |

## Critères d’acceptation

- le fichier est présent dans le registre ;
- sa source canonique est disponible ;
- son nom, son format, ses dimensions et son alpha sont exacts ;
- le poids est publié ;
- la provenance et les droits sont documentés ;
- aucun texte fonctionnel n’est rasterisé ;
- le fallback est testé ;
- le fichier canonique est à la racine du dossier runtime ;
- aucun nouveau sous-dossier n’est créé et l’exception héritée reste gelée ;
- aucun asset externe ou secret n’est introduit ;
- l’application reste compréhensible avec toutes les images bloquées.
