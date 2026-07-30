# Performance

## Objectif

La Phase 6 augmente la richesse perçue sans transformer le chargement initial en téléchargement d’illustrations. L’application reste interactive dès l’affichage du cache et les assets arrivent selon leur priorité réelle.

Le registre `docs/05-realisation/10-suivi-production-assets-phase-6.md` fixe les dimensions, formats et budgets individuels de chaque fichier ainsi que leur affectation aux lots.

## Budgets applicatifs

- JavaScript initial compressé : viser moins de 150 Ko hors assets ;
- CSS initial compressé : viser moins de 80 Ko ;
- aucune couverture chargée en taille fiche si elle n’est pas nécessaire ;
- interaction possible dès l’affichage du cache ;
- performance Lighthouse élevée sur appareil moyen ;
- aucune dépendance lourde ajoutée pour le visuel.

## Budgets Phase 6

### Shell critique

- décor critique supplémentaire chargé pour un viewport, hors variante de fond active : cible inférieure à 250 Ko compressés ;
- une seule variante de fond B01 à B04 est chargée initialement ; B01 desktop WebP 2048 × 1152 : cible inférieure à 190 Ko ;
- plafond desktop d’images critiques Phase 6 : B01 à 190 Ko maximum + décor supplémentaire à 250 Ko maximum, soit 440 Ko ;
- textures et cadres critiques : cible cumulée inférieure à 100 Ko ;
- icônes critiques : cible cumulée inférieure à 30 Ko ;
- aucune police décorative sans licence, mesure et justification.

Les variantes responsive non retenues pour le viewport ne sont ni préchargées ni additionnées au poids du shell initial.

### Cartes projets

- couverture catalogue 640 × 400 : cible de 35 à 80 Ko ;
- logo 512 × 160 : cible inférieure à 30 Ko ;
- couverture fiche 960 × 600 chargée uniquement sur la fiche ;
- aucune couverture d’une vue non visitée préchargée sans mesure ;
- dimensions et ratio réservés avant téléchargement.

### Décor non critique

- chargé après le contenu utile ou lors de l’inactivité ;
- supprimé des formats où il n’apporte pas de valeur ;
- absent du chemin critique hors ligne si le fallback suffit ;
- aucun ornement individuel supérieur à 50 Ko sans justification.

Les budgets sont des cibles. Tout dépassement est mesuré et expliqué dans la PR.

## Contrat de fichier

Chaque asset mesuré doit :

- être inscrit dans le registre ;
- porter son nom final exact ;
- présenter les dimensions décodées attendues ;
- être stocké à la racine de `public/assets/phase-6/`, même si I reste décoché ;
- posséder un fallback ;
- être absent du chargement initial s’il n’est pas critique.

Les prototypes hérités ne sont pas inclus dans le budget cible et ne constituent pas une référence de poids.

## Mesures

- WebP avec dimensions explicites pour les rasters de production ;
- SVG optimisés pour cadres et icônes ;
- lazy loading sous la ligne de flottaison ;
- miniatures dédiées ;
- CSS critique léger ;
- aucune bibliothèque de graphique pour un simple anneau ;
- rendu par lots pour de nombreuses cartes ;
- cache pour réduire appels et rechargements ;
- `aspect-ratio`, largeur et hauteur réservés ;
- textures répétables ou recadrages explicitement inscrits au registre ;
- variantes responsive uniquement lorsque prévues ;
- assets partagés mis en cache sans gonfler inutilement le shell.

## Stratégie de chargement

### Priorité 1

- couleur de fond ;
- structure CSS ;
- typographie système ;
- contenu et contrôles ;
- focus ;
- fallback de carte.

### Priorité 2

- cadres critiques ;
- icônes P0 ;
- enseigne ;
- fond principal ;
- couvertures visibles au-dessus de la ligne de flottaison.

### Priorité 3

- couvertures sous la ligne de flottaison ;
- logos secondaires ;
- textures de détail ;
- ornements ;
- images de fiche.

Une erreur de priorité 3 ne dégrade jamais la priorité 1.

## À éviter

- requête détaillée par dépôt au démarrage ;
- animation de grandes surfaces ;
- ombres floues multiples ;
- re-rendu complet à chaque frappe ;
- image Base64 dans le CSS ;
- archive ou fragment d’asset dans le dépôt ;
- décor distant ;
- texture différente par composant sans registre ;
- grande image desktop utilisée sur mobile ;
- filtres CSS coûteux sur de nombreuses cartes ;
- particules ou canvas décoratif permanent ;
- préchargement de toutes les couvertures ;
- police avec des graisses inutilisées ;
- double chaîne WebP/AVIF non approuvée.

## Layout shifts

- réserver les ratios ;
- ne pas modifier la hauteur des cartes après chargement ;
- ne pas injecter un cadre qui change la boîte ;
- ne pas déplacer les cartes lors d’une nouvelle arrivée ;
- conserver une largeur stable pour les compteurs ;
- vérifier les valeurs et noms longs.

## Mesures obligatoires en PR

Chaque PR visuelle publie :

- poids CSS avant et après ;
- nom, dimensions et poids de chaque nouvel asset ;
- poids du shell critique ;
- nombre de requêtes initiales ;
- LCP, CLS et interaction sur mobile simulé ;
- comparaison cache froid et chaud ;
- contrôle du lazy loading ;
- contrôle du mouvement réduit ;
- contrôle des images bloquées ;
- justification des écarts.

## Scénarios de test

- premier chargement en réseau limité ;
- retour avec cache chaud ;
- mode hors ligne ;
- blocage des images ;
- tablette paysage ;
- smartphone 390 px ;
- appareil moyen avec mouvement réduit ;
- liste proche du nombre maximal de projets ;
- couvertures absentes ou en erreur.

## Suivi

Mesurer sur mobile simulé et iPad réel lorsque disponible. Toute régression significative est justifiée dans la PR. Le contrôle final compare la Phase 6 à la dernière version fonctionnelle validée avant son démarrage.
