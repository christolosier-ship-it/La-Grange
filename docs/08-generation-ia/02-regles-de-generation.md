# Règles de génération IA

## Avant

- vérifier branche et dépôt ;
- lire les contrats ;
- identifier l’étape active ;
- ne pas extrapoler la suite de la Phase 6 ;
- lire le registre ;
- vérifier sources et dépendances ;
- annoncer les hypothèses bloquantes.

## Code

- modules courts ;
- TypeScript strict ;
- logique métier hors DOM ;
- tests proches du comportement ;
- aucune donnée de démonstration en production ;
- aucun secret ;
- aucune mutation GitHub depuis le navigateur ;
- aucune fusion automatique ;
- liste blanche imposée côté serveur.

## Assets

- un asset à la fois ;
- master approuvé avant dérivé ;
- WebP pour matière, skins, bandeaux et couvertures ;
- SVG pour icônes ;
- HTML/CSS pour données et structure ;
- nom, format, dimensions et budget avant production ;
- aucune sortie brute ;
- aucun texte fonctionnel dans une image ;
- aucun asset distant ;
- aucun ZIP ou Base64 ;
- P/V avant intégration ;
- I uniquement si réellement consommé.

## Phase 6B

Ne jamais :

- réutiliser comme cible les SVG C01 à C10 de l’ancien contrat ;
- dessiner des emplacements de boutons dans une image ;
- créer quatre cartes statistiques séparées ;
- ajouter un en-tête de section ;
- ajouter un rail droit ;
- ajouter un fond derrière la grille ;
- masquer le bouton admin par CSS seulement sans autorisation serveur ;
- calculer une progression depuis GitHub.

## Administration

- valider session, origine, CSRF et schéma ;
- traiter les images côté serveur ;
- contrôler le SHA de base ;
- créer branche, commit et PR ;
- retourner une erreur explicite ;
- ne jamais fusionner ;
- ne jamais journaliser un secret.

## Après

- relire le diff ;
- rechercher secrets et fichiers parasites ;
- lancer typecheck, lint, tests et build ;
- tester autorisations et conflits ;
- mesurer les assets ;
- vérifier images bloquées ;
- contrôler tablette paysage, bureau et zoom 200 % ;
- interroger les review threads ;
- corriger P1/P2 ;
- vérifier `main`.
