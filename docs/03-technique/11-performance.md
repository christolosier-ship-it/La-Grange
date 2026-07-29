# Performance

## Objectif

La Phase 6 doit augmenter la richesse perçue sans transformer le chargement initial en téléchargement d’illustration. L’application reste interactive dès l’affichage du cache et les assets visuels arrivent selon leur priorité réelle.

## Budgets applicatifs

- JavaScript initial compressé : viser moins de 150 Ko hors assets ;
- CSS initial compressé : viser moins de 80 Ko ;
- aucune couverture chargée en taille originale si elle n’est pas visible ;
- interaction possible dès affichage du cache ;
- score Lighthouse performance élevé sur appareil moyen ;
- aucune dépendance lourde ajoutée uniquement pour le visuel ou le mouvement.

## Budgets Phase 6

### Shell critique

- décor critique supplémentaire au premier affichage : cible inférieure à 250 Ko compressés ;
- fond principal : cible inférieure à 140 Ko en AVIF ou 190 Ko en WebP ;
- textures et cadres critiques : cible cumulée inférieure à 100 Ko ;
- icônes critiques : cible cumulée inférieure à 30 Ko ;
- police décorative : cible inférieure à 80 Ko par graisse ;
- nombre de polices et graisses limité au strict nécessaire.

### Cartes projets

- miniature 640 px : cible entre 35 et 80 Ko ;
- logo : cible inférieure à 30 Ko ;
- couverture 960 px chargée uniquement lorsque la fiche l’exige ;
- aucune couverture d’une vue non visitée préchargée sans mesure justifiant le gain ;
- dimensions et ratio réservés avant téléchargement.

### Décor non critique

- chargé après le contenu utile ou lors de l’inactivité ;
- supprimé des formats où il n’apporte pas de valeur ;
- absent du chemin critique hors ligne si le shell fonctionnel possède déjà un fallback ;
- aucun ornement individuel supérieur à 50 Ko sans justification.

Les budgets sont des cibles. Tout dépassement doit être mesuré et expliqué dans la PR.

## Mesures

- images AVIF ou WebP avec dimensions explicites ;
- lazy loading sous la ligne de flottaison ;
- miniatures dédiées plutôt que grandes images redimensionnées ;
- CSS critique léger ;
- aucune bibliothèque de graphique pour un simple anneau de répartition ;
- rendu par lots pour de nombreuses cartes ;
- recherche locale indexée en mémoire ;
- cache pour réduire les appels et rechargements ;
- `aspect-ratio`, largeur et hauteur réservés pour éviter les layout shifts ;
- SVG optimisés et dépourvus de script ;
- textures répétables ou recadrables plutôt que plusieurs fonds proches ;
- variantes responsive uniquement lorsque leur gain est mesurable ;
- `font-display: swap` ou comportement équivalent ;
- assets partagés mis en cache par le service worker sans gonfler inutilement le shell obligatoire.

## Stratégie de chargement visuel

### Priorité 1

- couleur de fond ;
- structure CSS ;
- typographie système ou fallback ;
- contenu et contrôles ;
- focus ;
- fallback de carte.

### Priorité 2

- cadres critiques ;
- icônes ;
- enseigne ;
- fond principal optimisé ;
- couvertures visibles au-dessus de la ligne de flottaison.

### Priorité 3

- couvertures sous la ligne de flottaison ;
- logos secondaires ;
- textures de détail ;
- ornements ;
- grandes images de fiche.

Une erreur de priorité 3 ne doit jamais dégrader la priorité 1.

## Éviter

- requête détaillée par dépôt au démarrage ;
- animation de grandes surfaces ;
- ombres floues multiples ;
- écouteurs globaux non nettoyés ;
- re-rendu complet à chaque frappe ;
- calcul de dates répété sans nécessité ;
- image en base64 volumineuse dans le CSS ;
- décor distant ;
- texture différente par composant ;
- grande image utilisée comme fond sur mobile sans variante ou recadrage ;
- filtres CSS coûteux appliqués à de nombreuses cartes ;
- particules ou canvas décoratif permanent ;
- préchargement de toutes les couvertures ;
- police avec de nombreux alphabets ou graisses inutilisés.

## Layout shifts

- réserver les ratios des images ;
- ne pas modifier la hauteur des cartes après chargement d’une police ;
- ne pas injecter un cadre qui change la boîte ;
- ne pas déplacer les cartes existantes lors de l’arrivée d’une nouvelle caisse ;
- conserver une largeur stable pour les compteurs ;
- vérifier les valeurs longues et les noms de projets longs.

## Mesures obligatoires en PR Phase 6

Chaque PR visuelle publie :

- poids du CSS avant et après ;
- poids des nouveaux assets par famille ;
- poids du shell critique ;
- nombre de requêtes au premier affichage ;
- LCP, CLS et interaction sur mobile simulé ;
- comparaison avec et sans cache ;
- contrôle du lazy loading ;
- contrôle du mouvement réduit ;
- justification des écarts.

## Scénarios de test

- premier chargement en réseau limité ;
- retour avec cache chaud ;
- mode hors ligne ;
- blocage des images ;
- tablette paysage ;
- smartphone 390 px ;
- appareil moyen avec réduction de mouvement ;
- liste proche du nombre maximal de projets actuel ;
- couvertures absentes ou en erreur.

## Suivi

Mesurer sur mobile simulé et iPad réel. Toute régression significative doit être justifiée dans la PR. Le contrôle final de Phase 7 compare les mesures à la dernière version fonctionnelle validée avant la Phase 6.