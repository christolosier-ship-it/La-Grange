# Design system

## Tokens de couleur

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

Les valeurs seront validées par contrôle de contraste et pourront être ajustées.

## Typographie

- titres de marque : police serif ou display lisible, chargée localement ;
- titres d’interface : serif robuste ou sans-serif expressive ;
- corps : sans-serif très lisible ;
- nombres : chiffres tabulaires pour les compteurs.

## Échelle

Espacement basé sur 4 px : 4, 8, 12, 16, 24, 32, 48, 64.

Rayons modérés : 6, 10, 14 px. Les cartes peuvent simuler un cadre, mais leurs zones interactives restent simples.

## Élévation

Trois niveaux maximum : surface, carte, overlay. Les ombres doivent conserver un contour visible en mode contraste accru.

## Icônes

Jeu cohérent en SVG local, trait uniforme. Aucun emoji comme icône fonctionnelle principale.

## États

Focus visible ambre clair, bordure de 2 px minimum. Les états désactivés conservent un contraste lisible et expliquent la cause lorsque nécessaire.
