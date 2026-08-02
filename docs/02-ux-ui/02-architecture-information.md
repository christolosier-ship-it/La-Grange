# Architecture de l’information

## Navigation principale fixe

1. Vue d’ensemble ;
2. Projets ;
3. Activité ;
4. Paramètres.

Le rail gauche demeure visible pendant le défilement. Il porte également la synchronisation, la version de La Grange et l’état administrateur.

## Routes publiques

```text
#/                         Dashboard
#/projects                 Catalogue
#/projects?filter=active   Catalogue filtré
#/project/:repositoryName  Fiche projet
#/activity                 Activité récente
#/settings                 Paramètres
```

La modale de personnalisation est un overlay du projet courant et ne crée pas une nouvelle sous-application.

## Hiérarchie du dashboard 6B

1. bandeau de quatre statistiques ;
2. grille continue de projets.

Sont supprimés du dashboard :

- titres « L’établi » et « Prêts à partir » ;
- descriptions de section ;
- lien « Voir tout l’inventaire » ;
- rail droit ;
- panneaux d’activité et de répartition ;
- fond local de la grille.

Les fonctions détaillées restent accessibles par le menu gauche.

## Hiérarchie d’une carte

1. bannière de style ;
2. couverture et identité ;
3. version ;
4. description ;
5. activité et technologie ;
6. progression éventuelle ;
7. cinq actions.

## Hiérarchie de la modale

1. titre et aperçu ;
2. couverture ;
3. style et couleurs ;
4. avancement et version ;
5. résumé de publication ;
6. annulation ou création de PR ;
7. statut et lien GitHub.

## Règles

- une seule grille de projets sur le dashboard ;
- aucune navigation dupliquée dans un en-tête de section ;
- liens externes identifiables ;
- bouton d’administration absent hors session ;
- aucune donnée factuelle modifiée depuis la modale.
