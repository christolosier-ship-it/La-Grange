# Responsive design

## Approche

Conception mobile-first avec enrichissement progressif. Les ruptures exactes sont déterminées par le contenu, pas par des modèles d’appareil rigides.

La Phase 6 ne réduit pas simplement un décor de bureau. Elle réorganise la métaphore de l’atelier selon l’espace disponible, tout en conservant les mêmes fonctions, données et routes.

## Principe de transformation

- smartphone : établi compact et navigation basse ;
- tablette portrait : carnet ou panneau organisé en deux colonnes ;
- tablette paysage : atelier principal avec rail compact ;
- bureau : scène complète avec charpente et rails latéraux.

Aucune vue ne doit sembler être une capture de bureau compressée.

## Smartphone

### Structure

- navigation basse de 4 destinations ;
- une carte par ligne ;
- statistiques en défilement horizontal ou grille compacte ;
- fiche en colonne unique ;
- actions principales accessibles près du pouce ;
- aucun rail latéral permanent ;
- panneaux secondaires replacés dans le flux ;
- décor périphérique fortement réduit.

### Direction artistique

Le smartphone évoque un établi vu de près :

- fond simple ;
- une traverse ou bordure de shell ;
- cartes comme fiches ou petites caisses ;
- peu d’ornements ;
- lumière concentrée sur le contenu ;
- note papier uniquement si elle reste lisible.

### Contraintes

- aucun cadre ne réduit la largeur utile sous 320 px ;
- aucune texture ne crée un faux bord d’écran ;
- les actions ne sont jamais remplacées par de petites icônes seules ;
- les ornements disparaissent avant les informations ;
- aucune zone interactive sous 44 px.

## Tablette portrait

### Structure

- navigation escamotable ou compacte ;
- deux cartes par ligne lorsque le contenu le permet ;
- activité sous les sections principales ;
- hero de fiche compact ;
- panneaux de paramètres sur une ou deux colonnes selon largeur.

### Direction artistique

La composition évoque un grand panneau ou un carnet d’atelier. La structure en bois encadre, mais ne fractionne pas excessivement la hauteur.

### Contraintes

- éviter les colonnes secondaires trop étroites ;
- conserver les cartes suffisamment larges pour le nom et l’état ;
- ne pas multiplier les cadres imbriqués ;
- contrôler l’orientation et le zoom à 200 %.

## Tablette paysage

### Structure

- rail gauche compact ;
- deux ou trois cartes ;
- panneau d’activité facultatif à droite ;
- cible principale de confort ;
- largeur de contenu prioritaire sur la richesse du décor.

### Direction artistique

C’est le format de référence pour l’atelier complet portable. La charpente, la poutre de statistiques et les cartes illustrées peuvent être visibles simultanément.

### Contraintes

- safe areas respectées ;
- aucun élément décoratif sous la barre système ;
- panneau droit replié avant de réduire excessivement la zone centrale ;
- interaction tactile conservée malgré l’apparence de bureau.

## Bureau

### Structure

- rail gauche permanent ;
- zone centrale de 3 à 4 cartes ;
- panneau droit ;
- largeur maximale pour éviter les lignes excessives ;
- poutre de statistiques au-dessus de la zone principale ;
- ornements autorisés dans les espaces réellement libres.

### Direction artistique

Le bureau peut présenter la scène la plus riche : enseigne, poutres, panneaux, lumière et quelques objets. La richesse reste concentrée en périphérie et dans les grands cadres.

### Contraintes

- le décor ne doit pas augmenter artificiellement la largeur maximale ;
- les colonnes restent alignées ;
- aucune perspective ne déforme les cartes ;
- les grands fonds ne doivent pas produire de moiré ou de répétition visible ;
- les lignes de texte restent limitées en longueur.

## Grandes largeurs

Au-delà de la largeur maximale de l’application :

- centrer la scène ;
- prolonger seulement le fond ;
- ne pas ajouter une cinquième ou sixième carte si la documentation de vue ne le prévoit pas ;
- ne pas agrandir indéfiniment les illustrations ;
- utiliser les marges comme décor calme.

## Règles communes

- aucune fonction ne disparaît selon la taille ;
- les tableaux sont évités ;
- les zones tactiles font au moins 44 px ;
- le texte peut grossir à 200 % sans perte ;
- les couvertures utilisent `object-fit` et des ratios stables ;
- pas de scroll horizontal global ;
- les textes restent en HTML ;
- les ornements ne participent pas au calcul de la hauteur utile ;
- les assets possèdent des variantes ou un recadrage documenté ;
- la densité compacte ne réduit pas les cibles tactiles ;
- la réduction de mouvement ne modifie pas la structure finale.

## Matrice de priorité en cas de manque d’espace

Supprimer ou réduire dans cet ordre :

1. ornements libres ;
2. détails de texture ;
3. attaches et vis secondaires ;
4. notes éditoriales non indispensables ;
5. panneau droit replacé dans le flux ;
6. couverture raccourcie dans sa variante compacte.

Ne jamais supprimer :

- nom du projet ;
- état ;
- action principale ;
- feedback réseau ;
- navigation ;
- focus visible ;
- message d’erreur ou état vide.

## Formats de contrôle obligatoires

- 320 px pour le seuil minimal de robustesse ;
- 390 px pour smartphone courant ;
- 768 px pour tablette portrait ;
- 1024 px pour tablette paysage ;
- 1440 px pour bureau ;
- 1920 px pour grande largeur ;
- zoom navigateur 200 % ;
- orientation portrait et paysage sur iPad réel lorsque disponible.

## Critères de sortie

- aucun scroll horizontal global ;
- aucune fonction perdue ;
- aucun texte coupé par un cadre ;
- aucun contrôle recouvert par un ornement ;
- cartes fallback et illustrées de dimensions cohérentes ;
- navigation utilisable au pouce sur smartphone ;
- tablette paysage confortable ;
- composition de bureau riche mais non surchargée ;
- captures comparatives documentées pour chaque format.