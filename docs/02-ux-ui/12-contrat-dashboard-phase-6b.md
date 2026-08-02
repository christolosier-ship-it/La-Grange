# Contrat du dashboard - Phase 6B

## Statut

Décision validée par le propriétaire le 2026-08-02. Ce document constitue la référence UX/UI exacte de l’étape 6B.

## Composition

```text
┌──────────────────┬────────────────────────────────────────────┐
│ Rail fixe        │ Bandeau de statistiques WebP               │
│                  ├────────────────────────────────────────────┤
│ Enseigne         │ Carte  Carte  Carte                         │
│ Navigation       │ Carte  Carte  Carte                         │
│ Synchronisation  │ Carte  Carte  Carte                         │
│                  │                                            │
│ Version          │ Zone principale défilante                  │
│ État admin       │                                            │
└──────────────────┴────────────────────────────────────────────┘
```

## Rail gauche

- fixe pendant le défilement ;
- enseigne en haut ;
- quatre destinations ;
- panneau de synchronisation sous la navigation ;
- bouton d’actualisation intégré ;
- version de La Grange en bas ;
- état administrateur en bas ;
- aucun scroll avec les cartes.

## Bandeau

- un seul WebP ;
- quatre statistiques HTML : projets, actifs, applications, archives ;
- pas de quatre conteneurs indépendants ;
- pas de données fictives ;
- défile avec la zone principale.

## Grille

- une seule grille continue ;
- aucun titre « L’établi » ;
- aucun titre « Prêts à partir » ;
- aucun lien « Voir tout l’inventaire » ;
- aucun en-tête de section ;
- aucun rail droit ;
- aucun fond ou voile derrière les cartes ;
- le seul arrière-plan est le fond général de La Grange.

## Anatomie de la carte

1. accès GitHub ;
2. lancement de l’application ;
3. accès au README ;
4. accès au détail du projet ;
5. ouverture de la modale de personnalisation ;
6. progression manuelle facultative ;
7. temps depuis la dernière activité du dépôt ;
8. bannière du style ;
9. version de l’application ;
10. image de couverture.

## Rangée d’actions

Les cinq boutons sont alignés proprement sur une ligne. Ils possèdent :

- une icône SVG ;
- une cible de 44 px minimum ;
- une infobulle au survol et au focus ;
- un libellé accessible ;
- un état indisponible explicite lorsque nécessaire.

Le cinquième bouton est absent hors session administrateur.

## Progression

- saisie manuellement ;
- nombre de 0 à 100 ;
- absence de valeur : barre absente ;
- couleur issue du style ou personnalisée ;
- texte accessible « avancement estimé manuellement ».

## Version

- version manuelle prioritaire ;
- sinon dernière release stable ;
- sinon dernière préversion ;
- sinon aucun badge ;
- drafts ignorés ;
- tag affiché tel quel.

## Styles

Maximum neuf styles :

- style de vie ;
- jeux ;
- productivité ;
- santé ;
- éducation ;
- nature ;
- création ;
- technique et métier ;
- inclassable.

Chaque style fournit bannière, icône, couleur principale, couleur secondaire et couleur de progression.

## Modale

Permet de modifier :

- couverture ;
- style ;
- trois couleurs ;
- avancement ;
- version manuelle.

Elle affiche un aperçu de la carte et crée une PR automatique dans `La-Grange`.

## Cibles

- tablette paysage ;
- bureau ;
- grand bureau ;
- zoom 200 %.

La Phase 6B ne définit pas d’expérience mobile dédiée.
