# Build de production

## Objectif

Produire un dossier statique autonome, compatible avec le sous-chemin GitHub Pages du dépôt `La-Grange`.

## Configuration Vite

Le `base` doit correspondre à `/La-Grange/` lorsque le site est publié à l’adresse standard du projet. Si un domaine personnalisé ou un site racine est utilisé plus tard, ce choix doit devenir configurable et documenté.

## Étapes

1. installation reproductible des dépendances ;
2. typecheck ;
3. lint ;
4. tests ;
5. génération du build ;
6. vérification des assets et du manifest ;
7. prévisualisation locale du dossier produit ;
8. audit des chemins et du service worker.

## Contenu attendu

- HTML d’entrée ;
- bundles avec hash ;
- manifest ;
- icônes ;
- service worker ;
- textures et assets optimisés ;
- fichier d’overrides ;
- fallback de navigation.

## Contrôles

- aucune source map publique contenant un secret ;
- aucun chemin commençant par `/src` ;
- aucune dépendance de développement dans le runtime ;
- assets résolus sous le bon `base` ;
- ouverture d’une route hash après rechargement ;
- taille des bundles conforme au budget.
