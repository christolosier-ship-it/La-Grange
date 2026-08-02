# Spécification des composants

## ProjectCard 6B

### Contenu

1. bouton ou ruban de style ;
2. couverture ;
3. nom ou logo avec nom accessible ;
4. version ;
5. description courte ;
6. temps depuis dernière activité ;
7. technologie principale ;
8. avancement manuel facultatif ;
9. rangée de cinq actions.

### Actions

1. GitHub ;
2. lancer l’application ;
3. README ;
4. détail du projet ;
5. personnaliser.

Les cinq actions restent alignées sur les formats cibles. Les quatre premières sont des liens ou actions de consultation. La cinquième ouvre une modale et n’est rendue que pour l’administrateur.

### Infobulles

- affichage au survol après un délai court ;
- affichage immédiat ou court au focus clavier ;
- fermeture avec `Échap` ;
- positionnement sans couper le viewport ;
- libellé accessible toujours présent ;
- aucune information indispensable uniquement dans l’infobulle.

### Structure graphique

- skin ou cadre matériel WebP ;
- contenu dynamique en HTML ;
- grille et adaptation en CSS ;
- icônes SVG ;
- progression CSS ;
- pas de rail de boutons dessiné dans l’image ;
- ratio couverture 640 × 400.

## StatsBeam

Un seul composant visuel WebP contient la poutre, les attaches et séparateurs. Les quatre statistiques sont des blocs HTML superposés. Le composant ne contient aucun chiffre rasterisé.

## FixedRail

Le rail regroupe marque, navigation, synchronisation, version et état administrateur. Il ne défile pas avec la zone principale. Il peut avoir son propre fallback CSS, mais pas un empilement de panneaux opaques.

## ProjectCustomizationModal

### Champs

- couverture ;
- style ;
- couleur principale ;
- couleur secondaire ;
- couleur de progression ;
- avancement ;
- version manuelle.

### Actions

- revenir aux couleurs du style ;
- retirer la couverture ;
- retirer l’avancement ;
- annuler ;
- créer la PR ;
- ouvrir la PR créée.

### Accessibilité

- `dialog` modal avec titre ;
- focus initial ;
- piège de focus ;
- fermeture par `Échap` avant envoi ;
- fond inerte ;
- erreurs associées aux champs ;
- état occupé annoncé ;
- focus restauré sur le bouton 5.

## ProgressBar

- rendue uniquement si une valeur est définie ;
- valeur 0 à 100 ;
- largeur et texte cohérents ;
- libellé « avancement estimé manuellement » ;
- couleur issue de la palette du projet ;
- aucune animation obligatoire.

## VersionBadge

- texte HTML ;
- valeur manuelle prioritaire ;
- sinon release résolue ;
- absent sans valeur ;
- préversion annoncée lorsque nécessaire.
