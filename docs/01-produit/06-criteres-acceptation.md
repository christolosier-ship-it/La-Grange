# Critères d’acceptation produit

## Dashboard 6B

- rail gauche fixe ;
- seule la zone principale défile ;
- un bandeau WebP unique porte quatre statistiques réelles ;
- aucune carte statistique indépendante ;
- aucune section « L’établi » ou « Prêts à partir » ;
- aucun lien « Voir tout l’inventaire » ;
- aucun rail droit ;
- aucune surface derrière la grille autre que le fond général ;
- une grille continue de cartes.

## Carte projet

- couverture au ratio 8:5 ;
- bannière de style ;
- version selon la règle métier ;
- temps depuis dernière activité ;
- avancement manuel facultatif ;
- cinq actions alignées ;
- action absente ou désactivée proprement si la destination n’existe pas ;
- infobulles accessibles ;
- personnalisation invisible hors session administrateur ;
- fonctionnement complet avec image bloquée.

## Personnalisation

- modale accessible avec aperçu ;
- style limité à neuf valeurs ;
- trois couleurs cohérentes avec retour aux valeurs par défaut ;
- image recadrée en 640 × 400 et convertie en WebP ;
- validation du JSON et du fichier ;
- PR créée sans écrire sur `main` ;
- lien de PR affiché ;
- aucune permission vers un autre dépôt ;
- rendu identique après fusion et déploiement sur plusieurs appareils.

## Qualité

- aucun secret dans le bundle ;
- consultation fonctionnelle lorsque le backend est indisponible ;
- tests 1024, 1366, 1440 et 1920 px ;
- zoom 200 % ;
- clavier, tactile et mouvement réduit ;
- typecheck, lint, tests et build réussis.
