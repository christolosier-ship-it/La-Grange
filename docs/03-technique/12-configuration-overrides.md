# Configuration des overrides

## Emplacement

`public/data/project-overrides.json`

## But

Compléter les données publiques GitHub avec une présentation éditoriale propre à La Grange, sans empêcher l’affichage d’un dépôt non configuré.

## Structure

```json
{
  "Luma": {
    "displayName": "Luma",
    "description": "Suivi de traitements",
    "category": "applications",
    "cover": "assets/phase-6/p6-f05a-luma-cover-640x400.webp",
    "logo": "assets/phase-6/p6-f05c-luma-logo-512x160.webp",
    "accent": "firefly",
    "featured": true,
    "appUrl": "https://example.github.io/Luma/",
    "hidden": false,
    "sortOrder": 10
  }
}
```

## Validation

- racine : objet indexé par nom exact de dépôt ;
- propriétés inconnues : rejetées en développement, ignorées avec avertissement en production ;
- `category` : valeur de l’énumération documentée ;
- `cover` et `logo` : chemins relatifs au `base` de l’application ;
- `appUrl` : HTTPS uniquement ;
- `featured`, `hidden` : booléens ;
- `sortOrder` : nombre fini.

## Priorités de fusion

- identité technique, dates et statut GitHub restent issus de GitHub ;
- nom, description éditoriale, catégorie et visuels peuvent être remplacés ;
- `appUrl` override prime sur `homepage` si valide ;
- une valeur vide ne doit pas écraser une valeur GitHub utile sauf intention explicite documentée.

## Phase 6 et assets

La Phase 6 enrichit les visuels sans transformer les overrides en catalogue d’assets.

### Règles

- `cover` pointe vers la couverture catalogue 640 × 400 de la ligne `Fa` concernée ;
- `logo` pointe vers la ligne `Fc` concernée et reste facultatif ;
- la couverture fiche 960 × 600 de la ligne `Fb` est résolue par une couche d’assets documentée ou par un futur champ validé, jamais devinée silencieusement ;
- `accent` pilote des tokens documentés, pas une couleur libre injectée directement ;
- un projet sans override reste visible avec C18 ;
- un chemin invalide ne bloque pas la synchronisation ;
- aucune donnée métier ne doit être encodée dans le nom ou l’image ;
- les assets sont locaux et servis sous le `base` de l’application ;
- les chemins Phase 6 pointent exclusivement vers la racine canonique `assets/phase-6/`, jamais vers un sous-dossier hérité ;
- le nom du fichier doit correspondre exactement au registre `docs/05-realisation/10-suivi-production-assets-phase-6.md` ;
- aucun chemin ne pointe vers un CDN, une URL temporaire ou un service externe ;
- aucun override ne référence un prototype hérité.

### Variantes de taille

Le registre définit une ligne distincte pour chaque couverture :

- `Fa` : catalogue 640 × 400 ;
- `Fb` : fiche 960 × 600 ;
- `Fc` : logo 512 × 160.

Cette distinction n’approuve pas automatiquement un changement de schéma JSON.

Trois stratégies sont possibles, dans cet ordre de préférence :

1. `cover` référence la ligne `Fa`, et la fiche utilise temporairement cette image avec un rendu maîtrisé ;
2. une couche d’assets mappe explicitement `Fa` vers `Fb`, avec table testée issue du registre ;
3. un champ `detailCover` est ajouté uniquement après mise à jour du modèle, du validateur, des tests et de la documentation.

Aucun composant ne recompose un nom de fichier par simple remplacement de chaîne.

### Couleur d’accent

`accent` référence une clé de palette définie par le design system. La clé fournit des couleurs de texte, fond, bordure et état atténué avec contraste contrôlé.

Une valeur d’accent inconnue retombe sur l’accent par défaut et produit au plus un avertissement de diagnostic.

### Provenance et droits

Les overrides ne stockent ni provenance ni licence.

La source officielle est la colonne `Source / droits` de chaque ligne du registre :

`docs/05-realisation/10-suivi-production-assets-phase-6.md`

Avant de cocher P, cette colonne indique :

- le master ou la source ;
- l’auteur, l’outil ou la méthode ;
- le statut des droits ;
- la licence et sa référence lorsqu’elle existe.

Aucun manifeste runtime n’est utilisé pour porter ces informations documentaires.

## Robustesse

Un fichier invalide ne bloque pas la synchronisation. Les dépôts s’affichent avec leurs fallbacks, et une erreur de configuration est signalée dans les diagnostics.

La Phase 6 doit tester au minimum :

- fichier absent ;
- JSON invalide ;
- propriété inconnue ;
- couverture absente ;
- logo absent ;
- accent inconnu ;
- chemin cassé ;
- projet renommé ;
- projet sans override ;
- toutes les images bloquées.
