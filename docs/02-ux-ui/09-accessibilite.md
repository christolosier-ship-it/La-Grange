# Accessibilité

## Cible

Respecter WCAG 2.2 niveau AA autant que possible.

## Structure

- landmarks `header`, `nav`, `main`, `aside`, `footer` ;
- un seul `h1` par vue ;
- hiérarchie de titres sans saut artificiel ;
- lien d’évitement vers le contenu.

## Clavier

Toutes les cartes et actions sont accessibles au clavier. Une carte ne contient pas plusieurs zones cliquables imbriquées de manière invalide. Le focus suit la navigation et revient à l’élément déclencheur après fermeture d’un overlay.

## Couleur et contraste

Les états possèdent texte et icône. Les textures ne réduisent pas le contraste. Les textes normaux atteignent 4,5:1 et les grands textes 3:1.

## Lecteurs d’écran

- statut de synchronisation annoncé avec modération ;
- dates relatives accompagnées d’une valeur complète accessible ;
- images décoratives avec alt vide ;
- couvertures informatives avec alt concis ;
- liens externes annoncés.

## Mouvement et zoom

Respect de `prefers-reduced-motion`, zoom à 200 %, orientation libre et zones tactiles adaptées.

## Tests

Navigation clavier manuelle, VoiceOver sur iOS, audit automatisé et vérification des contrastes avant release.
