# Design system

## Principe

Les tokens fonctionnels restent indépendants des images. Les WebP donnent la matière, tandis que HTML et CSS garantissent structure, contraste et états.

## Couches

1. couleur ou gradient de fallback ;
2. texture ou skin WebP ;
3. contenu HTML ;
4. focus et feedback.

## Palettes de style

Chaque style fournit :

- `--project-primary` ;
- `--project-secondary` ;
- `--project-progress` ;
- `--project-on-primary` ;
- `--project-muted`.

Styles :

- style de vie ;
- jeux ;
- productivité ;
- santé ;
- éducation ;
- nature ;
- création ;
- technique et métier ;
- inclassable.

Les valeurs exactes sont contrôlées par contraste. Une personnalisation peut remplacer les trois couleurs, mais l’application recalcule ou refuse toute combinaison illisible.

## Carte

- cadre WebP unique et adaptable ;
- bordure CSS fonctionnelle conservée ;
- ombre de contact courte ;
- couverture 8:5 ;
- progression CSS ;
- badge de version en HTML/CSS ;
- bannière neutre texturée colorée par tokens ;
- cinq boutons de 44 px minimum.

## Bandeau

Le bandeau de statistiques est un WebP à zones extensibles ou une image prévue pour les largeurs cibles. Les séparateurs visuels ne déterminent pas le nombre de données, qui reste fixé à quatre en HTML.

## États

- focus : anneau ambre de 3 px ;
- survol : lumière ou élévation légère ;
- pressé : enfoncement de 1 à 2 px ;
- désactivé : contraste lisible et infobulle explicative ;
- administrateur connecté : état textuel dans le rail ;
- publication en cours : texte et icône, sans animation obligatoire.

## Interdictions

- palette codée dans chaque composant ;
- texte rasterisé ;
- quatre boutons pré-dessinés dans un asset ;
- conteneur opaque autour de la grille ;
- couleur seule pour un état ;
- redimensionnement déformant les coins du cadre.
