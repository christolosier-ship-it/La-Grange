# Accessibilité

## Cible

WCAG 2.2 AA autant que possible sur tablette paysage et bureau.

## Structure

- landmarks conservés ;
- un `h1` visuellement masqué peut nommer le dashboard ;
- rail gauche identifié comme navigation et zone d’état ;
- zone principale unique ;
- absence de régions artificielles pour chaque morceau de décor.

## Carte et actions

- cinq cibles de 44 × 44 px minimum ;
- ordre de tabulation : GitHub, application, README, détail, personnalisation ;
- liens externes annoncés ;
- bouton de personnalisation absent hors authentification ;
- date relative avec date complète accessible ;
- avancement annoncé comme estimation manuelle ;
- nom du projet présent même avec logo.

## Infobulles

- déclenchées au survol et au focus ;
- reliées avec `aria-describedby` lorsque pertinentes ;
- fermables avec `Échap` ;
- non interactives ;
- jamais seules porteuses d’une information nécessaire.

## Modale

- rôle, titre et description ;
- focus initial maîtrisé ;
- focus piégé ;
- arrière-plan `inert` ;
- fermeture par `Échap` avant envoi ;
- état occupé annoncé ;
- erreurs de champs et erreur serveur annoncées ;
- focus restauré sur le cinquième bouton.

## Contraste

Le contraste est mesuré après application des textures, couleurs de style et lumières. Les trois couleurs personnalisées sont refusées ou corrigées si elles rendent le texte, la progression ou le focus illisible.

## Zoom

À 200 % :

- rail et zone principale ne se recouvrent pas ;
- la grille se replie ;
- les cinq actions restent atteignables ;
- la modale reste entièrement utilisable ;
- aucun texte n’est coupé par le skin WebP.

## Tests

- clavier ;
- VoiceOver sur iPad ;
- zoom 200 % ;
- mouvement réduit ;
- images bloquées ;
- administrateur connecté et déconnecté ;
- infobulles ;
- modale et erreurs ;
- palettes par défaut et personnalisées.
