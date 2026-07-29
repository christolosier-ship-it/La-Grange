# Design system

## Principe

Le design system conserve des tokens fonctionnels indépendants des assets. Les textures, cadres et illustrations enrichissent les composants sans devenir leur seule source de couleur, de contraste ou de structure.

La Phase 6 doit partir des tokens existants, les renommer ou les compléter de manière sémantique, puis migrer les composants par lots. Il est interdit de dupliquer une palette différente dans chaque feuille CSS.

## Tokens de couleur actuels

```css
--color-bg-deep: #15100b;
--color-surface-wood: #2a1d13;
--color-surface-panel: #33251a;
--color-paper: #ead8b5;
--color-text: #f6eddc;
--color-text-muted: #c7b79e;
--color-amber: #d69a32;
--color-green: #71923d;
--color-blue: #4d7895;
--color-purple: #765188;
--color-danger: #b65b45;
--color-border: rgba(244, 214, 165, 0.22);
```

Les valeurs restent provisoires jusqu’au contrôle de contraste sur les composants Phase 6.

## Familles de tokens à introduire

### Surfaces

- fond profond ;
- fond d’atelier ;
- bois structurel ;
- bois de caisse ;
- panneau sombre ;
- papier ;
- verre sombre ;
- overlay.

### Texte

- texte principal sombre et clair ;
- texte secondaire ;
- texte sur papier ;
- texte sur accent ;
- lien ;
- danger ;
- succès ;
- avertissement.

### Bordures et métal

- bordure faible ;
- bordure standard ;
- bordure forte ;
- métal sombre ;
- laiton ;
- focus ;
- séparation interne.

### Lumière

- lumière ambrée faible ;
- lumière de focus ;
- lumière de synchronisation ;
- ombre de structure ;
- ombre de carte ;
- ombre interne courte.

### Projet

Les accents de projet restent éditoriaux. Ils ne doivent pas être codés en dur dans le shell. Un accent doit fournir au minimum :

- une couleur principale ;
- une couleur de contraste ;
- une variante atténuée ;
- une couleur de bordure.

## Matières

Les matières sont appliquées par couches :

1. couleur de fallback ;
2. gradient ou lumière CSS ;
3. texture raster facultative ;
4. bordure ou cadre SVG facultatif.

Le composant doit rester lisible si les couches 3 et 4 échouent.

## Typographie

- titres de marque : police serif ou display lisible, chargée localement ;
- titres d’interface : serif robuste ou sans-serif expressive ;
- corps : sans-serif très lisible ;
- nombres : chiffres tabulaires pour les compteurs ;
- notes purement éditoriales : police manuscrite facultative et locale.

### Règles de chargement

- formats modernes locaux ;
- sous-ensembles de caractères lorsque possible ;
- `font-display: swap` ou comportement équivalent ;
- une graisse principale par famille, deux maximum sans justification ;
- fallback système documenté ;
- aucune police distante.

## Échelle

Espacement basé sur 4 px : 4, 8, 12, 16, 24, 32, 48, 64.

Les éléments décoratifs ne créent pas une seconde échelle. Les espacements visuels du cadre s’ajoutent à l’intérieur de la boîte sans réduire les zones tactiles.

## Rayons et irrégularité

Rayons fonctionnels : 6, 10 et 14 px.

Les cadres peuvent paraître plus irréguliers grâce à un asset ou un pseudo-élément. La boîte interactive conserve un rayon et une géométrie stables.

La rotation décorative recommandée reste inférieure ou égale à 0,5 degré. Le texte et la hitbox restent droits.

## Élévation

Quatre niveaux maximum :

1. décor d’arrière-plan ;
2. structure du shell ;
3. carte ou panneau ;
4. overlay et focus.

Les ombres doivent conserver un contour visible en mode contraste accru. Éviter les ombres floues multiples et les grandes surfaces animées.

## Bordures

Une bordure fonctionnelle reste visible même lorsqu’un cadre SVG est présent. Le cadre décoratif peut être interrompu ou texturé, mais la séparation de surface ne dépend pas de lui.

## Icônes

Jeu cohérent en SVG local, trait uniforme. Aucun emoji comme icône fonctionnelle principale.

Les icônes utilisent `currentColor` lorsque possible et possèdent un `viewBox` cohérent. Les symboles de marques externes restent distincts des icônes internes.

## États

### Focus

Focus visible ambre clair, bordure ou anneau de 2 px minimum. Il reste visible au-dessus des cadres et textures.

### Survol

Changement court de bordure, de lumière ou d’élévation. Le survol ne révèle jamais une information indispensable.

### Pressé

Réduction courte de l’ombre ou translation de 1 à 2 px.

### Désactivé

Contraste lisible, curseur cohérent et cause expliquée lorsque nécessaire.

### Erreur

Texte et icône accompagnent la couleur. L’erreur ne doit pas colorer toute la scène.

### Nouveau

Accent temporaire, étiquette et animation facultative. Aucun clignotement.

## Densité

### Confortable

Espacements standards, descriptions plus visibles, panneaux aérés.

### Compacte

Espacements réduits et métadonnées resserrées. Les tailles de texte minimales, cibles tactiles et contrastes ne changent pas.

Les assets décoratifs peuvent être réduits ou masqués en densité compacte.

## Réduction du mouvement

Le design system expose un état de mouvement effectif issu du réglage utilisateur et du système. Cet état peut :

- supprimer les translations ;
- supprimer les oscillations ;
- supprimer les halos animés ;
- raccourcir les fondus ;
- afficher immédiatement l’état final.

La composition ne doit pas dépendre d’une animation pour être comprise.

## Contraste et textures

- texte normal : 4,5:1 minimum ;
- grand texte : 3:1 minimum ;
- composants et focus : contraste suffisant avec les surfaces adjacentes ;
- contrôle réalisé sur la couleur finale après texture et lumière ;
- fond de lecture uni ou très calme pour les paragraphes ;
- mode contraste accru conservant contours et états.

## Fallbacks

Chaque token de matière possède une couleur de fallback. Chaque cadre possède une bordure CSS. Chaque image possède une zone réservée. Chaque police possède une famille système de remplacement.

## Validation

Le design system Phase 6 est accepté lorsque :

- une planche de tokens et matières est validée ;
- les états normal, survol, focus, pressé, désactivé et erreur sont visibles ;
- une carte avec asset et une carte fallback sont cohérentes ;
- le shell reste lisible sans texture ;
- la densité compacte et le mouvement réduit fonctionnent ;
- les contrastes sont mesurés sur les surfaces finales ;
- aucun composant ne possède sa propre palette non documentée.