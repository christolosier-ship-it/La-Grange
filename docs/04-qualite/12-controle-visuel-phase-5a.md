# Contrôle visuel — Phase 5A Activité

## Périmètre

Contrôle de la vue `#/activity`, de ses états locaux et de la chronologie groupée. La Phase 5B et l’écran Paramètres sont hors périmètre.

## Formats contrôlés

### 390 px — mobile

- en-tête, messages et semaines occupent toute la largeur disponible sans débordement horizontal ;
- navigation basse conservée ;
- chaque événement utilise une colonne de marqueur et une colonne de contenu ;
- noms de projets et libellés longs utilisent `overflow-wrap` ;
- date relative reste sous le texte ;
- zones cliquables de projet restent distinctes et lisibles.

### 768 px — tablette portrait

- navigation latérale active ;
- chaque journée utilise une colonne de date et une colonne de chronologie ;
- la zone d’événements reste fluide ;
- les cartes ne fixent aucune largeur empêchant le redimensionnement.

### 1024 px — tablette paysage

- espacement confortable entre le rail et le journal ;
- semaines et journées restent alignées ;
- absence de rail droit ou de statistiques non prévues ;
- densité cohérente avec le dashboard et le catalogue.

### 1440 px — bureau

- largeur du shell existant respectée ;
- événements plus généreusement espacés sans étirement artificiel ;
- hiérarchie semaine, jour, projet et changement lisible ;
- aucune animation décorative supplémentaire.

## États contrôlés

- chargement initial sans événements ;
- actualisation avec événements déjà visibles ;
- journal vide ;
- plusieurs événements le même jour ;
- plusieurs jours dans une semaine ;
- plusieurs semaines ;
- projet courant avec lien canonique ;
- dépôt disparu sans lien ;
- renommage avec détail ;
- mode hors ligne ;
- IndexedDB indisponible ;
- anciennes données conservées après erreur ;
- une ou plusieurs entrées invalides ignorées.

## Accessibilité

- `h1` unique et focalisable par le routeur ;
- structure `h2` semaine, `h3` jour et `h4` projet ;
- événements exposés dans des listes ordonnées ;
- date relative complétée par la date complète dans le nom accessible et l’attribut `title` ;
- messages temporaires avec `role="status"` ;
- erreur bloquante sans données avec `role="alert"` ;
- liens présents uniquement lorsqu’une route valide existe ;
- couleur jamais utilisée seule pour expliquer le type d’événement ;
- styles `forced-colors` conservant des bordures explicites.

## Mouvement

L’entrée visuelle d’un événement dure 180 ms et se limite à une faible translation verticale avec fondu. Elle est entièrement désactivée lorsque `prefers-reduced-motion: reduce` est actif.

## Preuves automatisées

- tests du modèle pour validation, tri, regroupement et résolution des liens ;
- tests du service pour chargement, erreur et course de lecture ;
- tests DOM pour les états vide, multi-jours, hors ligne, invalides et erreur localisée ;
- TypeScript strict, ESLint, suite Vitest, smoke GitHub réel et build production dans la CI.

## Limite

Le pipeline ne produit pas encore de captures navigateur automatiques. Le contrôle repose sur les breakpoints CSS, les tests DOM et la revue statique du rendu. Une preuve visuelle automatisée multi-viewport reste recommandée pour la Phase 7.
