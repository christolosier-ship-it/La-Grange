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
- version de La Grange et état administrateur en bas.

## Bandeau

- un seul WebP C11 ;
- quatre statistiques HTML : projets, actifs, applications, archives ;
- aucun texte ou chiffre dans l’image ;
- défile avec la zone principale.

## Grille

- une seule grille continue ;
- aucun titre « L’établi » ou « Prêts à partir » ;
- aucun lien « Voir tout l’inventaire » ;
- aucun en-tête de section ;
- aucun rail droit ;
- aucun fond ou voile derrière les cartes ;
- seul le fond général de La Grange est visible.

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
10. image de couverture ou fallback.

## Rangée d’actions

Les cinq boutons sont alignés sur une ligne et possèdent une cible de 44 px minimum, une icône SVG, une infobulle au survol et au focus, et un libellé accessible.

Le bouton de personnalisation est absent hors session administrateur.

## Progression

- saisie manuellement ;
- 0 à 100 ;
- absence de valeur : aucune barre ;
- couleur issue du style ou personnalisée ;
- libellé accessible indiquant une estimation manuelle.

## Version

- version manuelle prioritaire ;
- sinon dernière release stable ;
- sinon dernière préversion ;
- sinon aucun badge ;
- drafts ignorés ;
- tag affiché tel quel.

## Styles

Neuf styles maximum : style de vie, jeux, productivité, santé, éducation, nature, création, technique et métier, inclassable.

Chaque style fournit une bannière, une couleur principale, une couleur secondaire et une couleur de progression. L’icône peut provenir de l’iconographie locale existante.

## Couverture

La couverture n’est pas un asset pré-produit de la Phase 6B. Elle est ajoutée depuis la modale administrateur :

- entrée PNG, JPEG ou WebP ;
- recadrage 8:5 ;
- sortie WebP 640 × 400 ;
- PR automatique ;
- fallback C18 si absente.

Aucun logo séparé n’est exigé. Le nom du projet reste en HTML.

## Modale

Elle permet de modifier la couverture, le style, les trois couleurs, l’avancement et la version manuelle. Elle affiche un aperçu fidèle et crée une PR automatique dans `La-Grange`.

## Cibles

- tablette paysage ;
- bureau ;
- grand bureau ;
- zoom 200 %.

La Phase 6B ne définit pas d’expérience mobile dédiée.
