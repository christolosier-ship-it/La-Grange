# Animations

## Rôle

Les animations donnent de la présence à l’atelier et expliquent les changements. Elles ne doivent pas ralentir l’accès, déplacer une information utile ou servir de cache-misère à un chargement.

La Phase 6 adopte une grammaire de mouvement fondée sur le poids, la matière et l’amortissement. Les mouvements restent courts, rares et déclenchés par une action ou un événement réel.

## Principes

- une animation répond à une cause identifiable ;
- l’état final est immédiatement compréhensible ;
- le contenu reste cliquable dès qu’il est visible ;
- une animation ne modifie pas l’ordre de lecture ;
- une animation décorative n’est jamais nécessaire ;
- une même famille de composants utilise la même courbe et la même durée ;
- les propriétés animées privilégient `transform` et `opacity` ;
- les grandes surfaces et textures ne sont pas animées en continu.

## Sensations autorisées

### Objet léger

Étiquette, badge ou note.

- translation de 2 à 6 px ;
- rotation maximale de 0,5 degré ;
- amortissement court ;
- aucune oscillation permanente.

### Objet moyen

Carte ou petit panneau.

- relèvement de 1 à 3 px ;
- variation courte d’ombre ou de bordure ;
- entrée par fondu et léger déplacement ;
- aucune bascule importante.

### Objet lourd

Poutre, rail ou grand panneau.

- transition lente mais courte ;
- aucun rebond marqué ;
- aucune animation lors d’un simple scroll ;
- pas de déplacement de la structure principale après le chargement.

## Animations autorisées

- fondu et léger déplacement des cartes au premier affichage ;
- expansion d’une fiche depuis une carte lorsque techniquement simple et sans bloquer la navigation ;
- lueur discrète pendant une synchronisation ;
- glissement d’une nouvelle caisse lors de la détection d’un dépôt ;
- transition de filtre courte ;
- feedback tactile sur les boutons ;
- relèvement léger d’une carte au survol ;
- enfoncement de 1 à 2 px au pressé ;
- apparition courte d’une note ou d’un toast ;
- changement de lumière très discret sur une action au focus.

## Animations narratives rares

### Nouvelle arrivée

La détection d’un nouveau dépôt peut déclencher une entrée de caisse :

1. emplacement réservé avant le mouvement ;
2. translation courte ;
3. légère décélération ;
4. étiquette « Nouveau » ;
5. état final stable ;
6. aucun déplacement des cartes déjà visibles.

Cette séquence ne se rejoue pas à chaque ouverture. Elle dépend du marqueur réel de nouvelle arrivée et de son acquittement.

### Synchronisation

Une lueur ou un reflet court peut accompagner l’état de synchronisation. Aucun engrenage permanent, aucune pulsation infinie et aucun clignotement.

## Durées

- micro-interaction : 100 à 180 ms ;
- transition de panneau : 180 à 280 ms ;
- entrée narrative rare : 300 à 450 ms ;
- fondu de remplacement sous mouvement réduit : 60 à 120 ms.

Les animations de plus de 450 ms nécessitent une justification et une validation explicite.

## Courbes

- entrée : décélération douce ;
- sortie : accélération courte ;
- pressé : courbe directe ;
- retour : amortissement léger sans rebond élastique ;
- aucun ressort exagéré.

Les courbes sont centralisées dans des tokens. Chaque composant ne crée pas sa propre signature de mouvement.

## Interdictions

- parallaxe permanent ;
- particules continues ;
- poussière animée en boucle ;
- clignotement ;
- pulsation infinie ;
- déplacement automatique du contenu après interaction ;
- animation bloquant le clic ;
- son automatique ;
- animation au scroll sur chaque section ;
- caméra ou zoom de scène ;
- vibration visuelle d’une pancarte ;
- texture ou lumière de grande surface animée en continu ;
- valeur, compteur ou graphique animé sans nécessité fonctionnelle.

## Réduction de mouvement

`prefers-reduced-motion` désactive les translations, rotations, oscillations et séquences narratives. Il remplace les changements par des fondus très courts ou un affichage immédiat.

Le réglage local peut également forcer ce mode. Le réglage système reste prioritaire.

Sous mouvement réduit :

- la nouvelle caisse apparaît directement à son emplacement ;
- les cartes ne se soulèvent pas ;
- les lueurs animées deviennent des changements statiques de bordure ;
- les transitions de filtre ne déplacent pas les éléments ;
- aucune information ou hiérarchie ne disparaît.

## Accessibilité

- aucune animation ne clignote plus de trois fois par seconde ;
- aucun mouvement important proche d’un texte en lecture ;
- aucune animation n’entraîne un changement de focus ;
- le focus reste visible pendant la transition ;
- les annonces `aria-live` ne sont pas synchronisées avec une décoration ;
- une opération en cours reste identifiable sans animation.

## Performance

- pas d’animation de `box-shadow` floue sur de nombreuses cartes simultanément ;
- pas d’animation de filtre CSS lourd ;
- pas de lecture ou écriture de layout à chaque frame ;
- pas de bibliothèque de motion pour ces besoins ;
- nombre d’éléments animés simultanément limité ;
- test sur appareil mobile moyen et iPad réel.

## Validation

Chaque animation ajoutée doit documenter :

- sa cause ;
- sa durée ;
- sa propriété animée ;
- son comportement sous mouvement réduit ;
- son coût approximatif ;
- son test nominal ;
- son absence d’impact sur le focus et le layout.

Une animation est supprimée si elle ne renforce ni la compréhension, ni le feedback, ni l’identité de façon mesurable.