# Inventaire des assets de la Phase 6

## Principe

Le registre détaillé est `docs/05-realisation/10-suivi-production-assets-phase-6.md`.

## Formats

### WebP

Format principal pour :

- fonds ;
- cadres matériels ;
- poutre de statistiques ;
- bannière de style ;
- couvertures ;
- logos éditoriaux ;
- ornements utiles.

### SVG

Réservé aux icônes fonctionnelles, symboles de style et formes simples devant hériter de `currentColor`.

Les cadres de cartes, rails de métadonnées, rails d’actions et grandes poutres ne sont plus produits sous forme de SVG géométriques.

### PNG

Réservé aux halos, masques et planches documentaires.

## Arborescence

Les nouveaux assets canoniques restent à plat dans :

`public/assets/phase-6/`

Les masters et planches restent à plat dans :

`docs/assets/phase-6/`

Les sous-dossiers hérités restent gelés jusqu’au remplacement de leurs fichiers.

## Familles actives

- A : marque et icônes PWA déjà définies ;
- B : fond, textures et lumière déjà définis ;
- C : skins WebP du dashboard, bandeau et éléments de carte ;
- D : icônes d’action et de style en SVG ;
- F : couvertures et logos des projets prioritaires ;
- G : planches d’acceptation 6A et 6B.

Les familles et fichiers prévus pour des étapes UI/UX ultérieures ont été retirés. Ils seront recréés uniquement après nouveau cadrage.

## Dimensions 6B

- skin de carte master : 640 × 960 WebP transparent ;
- couverture : 640 × 400 WebP ;
- logo : 512 × 160 WebP transparent ;
- bandeau de statistiques : 1600 × 220 WebP ;
- bannière de style : 160 × 240 WebP transparent ;
- icône : `viewBox 0 0 24 24` ;
- planche bureau : 1440 × 1024 PNG ;
- planche tablette paysage : 1366 × 1024 PNG.

## Upload depuis la modale

Entrées acceptées : PNG, JPEG et WebP.

Sortie canonique :

- WebP ;
- 640 × 400 ;
- nom issu du registre et du projet ;
- cible 35 à 80 Ko ;
- signature, dimensions et poids contrôlés côté serveur ;
- aucune métadonnée sensible ;
- aucune image distante conservée par URL.

## Budgets

- bandeau : cible inférieure à 70 Ko ;
- skin de carte : cible inférieure à 60 Ko ;
- couverture : 35 à 80 Ko ;
- logo : moins de 30 Ko ;
- icône SVG : moins de 8 Ko ;
- aucune image non visible préchargée sans mesure.

## Fallbacks

- fond : gradients CSS ;
- bandeau : grille CSS avec bordure ;
- skin de carte : surface CSS opaque ;
- couverture : C18 et initiales HTML ;
- logo : nom HTML ;
- icône : libellé accessible ;
- bannière : couleur et icône de style ;
- administration : fonction absente sans casser la consultation.
