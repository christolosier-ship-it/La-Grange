# Spécification des vues

## Cible de Phase 6B

L’étape 6B traite uniquement le dashboard et la modale de personnalisation. Les personnalisations détaillées du catalogue, de la fiche, de l’activité et des paramètres seront spécifiées dans des étapes ultérieures, au fur et à mesure des instructions du propriétaire.

## Shell partagé

- fond général fixe déjà implémenté ;
- rail gauche fixe ;
- marque et navigation en haut ;
- panneau de synchronisation sous la navigation ;
- version et état administrateur en bas ;
- zone principale indépendante et défilante.

## Dashboard

### Formats cibles

- tablette paysage à partir d’environ 1024 px CSS ;
- bureau 1366, 1440 et 1920 px ;
- deux cartes par ligne sur tablette paysage ;
- trois ou quatre cartes selon la largeur de bureau et la largeur minimale lisible.

### Contenu

- bandeau de statistiques WebP ;
- quatre données HTML : projets, actifs, applications et archives ;
- grille continue de cartes ;
- aucun en-tête de section ;
- aucun lien « Voir tout » ;
- aucun panneau central ;
- aucun rail droit ;
- aucun fond local derrière les cartes.

### Défilement

Le rail et le fond restent fixes. Le bandeau et les cartes défilent ensemble dans la zone principale.

## Modale de personnalisation

- ouverte par le cinquième bouton ;
- absente pour un visiteur non authentifié ;
- aperçu de la carte ;
- choix ou retrait de couverture ;
- recadrage 8:5 ;
- choix de style ;
- palette par défaut ou couleurs personnalisées ;
- avancement manuel facultatif ;
- version manuelle facultative et rappel de la version automatique ;
- résumé des fichiers modifiés ;
- création de PR ;
- états chargement, succès, erreur et conflit.

## Vues différées

Les vues Catalogue, Fiche projet, Activité et Paramètres conservent leur fonction actuelle. Leur nouvelle personnalisation artistique n’est pas définie dans ce document et ne doit pas être anticipée.

## États transversaux

- cache visible immédiatement ;
- synchronisation sans déplacement de cartes ;
- hors ligne non bloquant ;
- image absente avec fallback ;
- service administrateur indisponible sans casser la consultation ;
- mise à jour PWA après publication.
