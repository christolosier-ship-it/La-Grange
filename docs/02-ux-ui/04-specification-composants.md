# Spécification des composants

## Règle Phase 6

La Phase 6 peut modifier l’apparence, la composition interne et les assets d’un composant. Elle ne peut pas modifier silencieusement son rôle, ses données, ses états, son ordre de tabulation ou sa surface interactive.

Chaque composant possède deux couches :

- une couche fonctionnelle sémantique et testable ;
- une couche de présentation inspirée des objets de l’atelier.

Les objets décoratifs restent hors de l’arbre d’accessibilité et ne capturent aucun événement.

## ProjectCard

### Entrées

Projet, variante, indicateur nouveau, favori, densité.

### Affichage

- couverture ou fallback ;
- nom ;
- description limitée ;
- badge d’état ;
- langage ;
- date relative ;
- icône de lien d’application si disponible.

### États

normal, survol, focus, pressé, nouveau, image en erreur, archivé.

### Présentation Phase 6

La carte adopte la métaphore d’une caisse, d’un cadre ou d’une fiche d’atelier. Elle peut utiliser un cadre SVG ou CSS, une étiquette d’état et une profondeur courte.

Contraintes :

- le nom et l’action principale restent immédiatement identifiables ;
- aucune donnée obligatoire n’est dessinée dans la couverture ;
- le cadre ne modifie pas la hitbox ;
- les textes restent droits ;
- la couverture conserve un ratio stable ;
- le fallback utilise la même structure que la carte illustrée ;
- une carte archivée reste lisible ;
- le favori reste un bouton distinct et non imbriqué dans un autre lien.

## StatCard

Affiche une valeur réelle, un libellé et une icône. Le clic est autorisé uniquement s’il applique un filtre explicite.

### Présentation Phase 6

La statistique peut prendre la forme d’une plaque ou d’un compteur fixé à une poutre. La valeur et le libellé restent du texte HTML. Quatre statistiques maximum sont affichées.

## StatusBadge

Texte toujours présent avec la couleur : Actif, Maintenance, En sommeil, Archivé. La couleur seule ne suffit jamais.

### Présentation Phase 6

Le badge peut devenir une étiquette, un ruban ou une petite plaque. Sa couleur reste secondaire par rapport au texte et à l’icône.

## SyncButton

États : prêt, synchronisation, succès, erreur, hors ligne. Empêche les doubles lancements et expose le statut via `aria-live`.

### Présentation Phase 6

Le bouton peut évoquer une commande d’atelier. Une lueur courte est autorisée pendant la synchronisation. Le bouton conserve une forme immédiatement reconnue comme interactive.

## SearchField

Recherche locale avec bouton d’effacement, label accessible et délai léger facultatif. Pas d’appel API à chaque frappe.

### Présentation Phase 6

Le champ peut être intégré dans un encart ou un tiroir visuel. L’élément `input`, son label et son bouton d’effacement restent visibles et conventionnels.

## FilterChip

Bouton à état pressé avec `aria-pressed`. Les filtres combinés sont visibles et réinitialisables.

### Présentation Phase 6

La puce peut prendre la forme d’une petite étiquette. Elle ne doit pas devenir une étiquette décorative impossible à distinguer d’un bouton.

## Toast

Réservé aux événements non bloquants : nouveau dépôt, synchronisation terminée, erreur récupérable. Jamais comme seul moyen de comprendre un échec durable.

### Présentation Phase 6

Le toast peut évoquer une étiquette ou une note temporaire. Il ne doit pas masquer la navigation ni ressembler à un panneau permanent.

## EmptyState

Message, explication et action unique pertinente. Peut adopter la métaphore de l’atelier sans humour obscur.

### Présentation Phase 6

L’état vide peut utiliser un emplacement de caisse libre, une étagère vide ou une note papier. Le message reste direct et l’action unique reste un vrai bouton ou lien.

## Modal

À limiter aux confirmations rares, comme vider le cache. Focus piégé, fermeture clavier et restauration du focus obligatoires.

### Présentation Phase 6

La modale devient un panneau au premier plan. Le reste de la page est inerte et masqué de l’arbre d’accessibilité pendant son ouverture. Aucun cadre décoratif ne peut réduire la largeur utile ou pousser les actions sous la ligne de flottaison.

## Navigation principale

### Fonction

Présenter les quatre destinations stables : Vue d’ensemble, Projets, Activité et Paramètres.

### Présentation Phase 6

- bureau et tablette paysage : panneau mural vertical ;
- smartphone : barre basse compacte inspirée d’une traverse ou d’un établi ;
- état actif : contraste, texte et marqueur ambre ;
- icônes SVG locales ;
- aucune destination ajoutée pour reproduire le prototype illustré.

## Panneau secondaire

### Fonction

Présenter activité, synchronisation, répartition, aide ou informations de cache selon la vue.

### Présentation Phase 6

Le panneau peut utiliser du papier, du bois ou du verre sombre. Les textes longs utilisent une surface unie. Le panneau ne doit jamais ressembler à une carte projet.

## Timeline d’activité

### Fonction

Présenter les événements locaux dans l’ordre chronologique, groupés par semaine et par jour.

### Présentation Phase 6

La timeline peut évoquer un registre ou une planche d’atelier. Les repères restent alignés, les dates complètes restent accessibles et les événements disparus ne créent aucun lien mort.

## Contrôles de paramètres

Les cases, listes et champs restent des contrôles natifs ou équivalents accessibles. Leur environnement peut utiliser une plaque ou un panneau, mais leur état ne doit jamais dépendre d’une texture ou d’un symbole seul.

## Critères communs Phase 6

- focus visible au-dessus des textures ;
- zone tactile minimale de 44 px ;
- texte zoomable à 200 % ;
- aucun texte fonctionnel dans un asset ;
- état sans asset testé ;
- mouvement réduit testé ;
- densité compacte testée ;
- aucun composant ne dépend d’un pseudo-élément pour son contenu accessible ;
- aucun objet décoratif ne ressemble à une action disponible.