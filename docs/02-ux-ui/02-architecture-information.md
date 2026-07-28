# Architecture de l’information

## Navigation principale

1. Vue d’ensemble ;
2. Tous les projets ;
3. Activité ;
4. Paramètres.

Les regroupements narratifs du dashboard, comme L’établi ou Prêts à partir, sont des sections et filtres, pas des sous-applications.

## Routes

```text
#/                         Dashboard
#/projects                 Catalogue
#/projects?filter=active   Catalogue filtré
#/project/:repositoryName  Fiche projet
#/activity                 Activité récente
#/settings                 Paramètres
```

## Hiérarchie du dashboard

1. identité et état de synchronisation ;
2. statistiques utiles ;
3. projets actifs ;
4. applications lançables ;
5. activité et répartition ;
6. nouvelle arrivée ;
7. raccourcis.

## Hiérarchie d’une fiche

1. identité ;
2. actions principales ;
3. description ;
4. métadonnées ;
5. activité détaillée facultative ;
6. liens secondaires.

## Règles

- une action principale ne doit pas être noyée dans plus de deux niveaux ;
- le nom du projet doit toujours être visible ;
- le retour doit conserver la position ou le filtre lorsque possible ;
- les liens externes doivent être explicitement identifiables ;
- l’activité n’est jamais assimilée à une santé logicielle.
