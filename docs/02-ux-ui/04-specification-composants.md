# Spécification des composants

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

## StatCard

Affiche une valeur réelle, un libellé et une icône. Le clic est autorisé uniquement s’il applique un filtre explicite.

## StatusBadge

Texte toujours présent avec la couleur : Actif, Maintenance, En sommeil, Archivé. La couleur seule ne suffit jamais.

## SyncButton

États : prêt, synchronisation, succès, erreur, hors ligne. Empêche les doubles lancements et expose le statut via `aria-live`.

## SearchField

Recherche locale avec bouton d’effacement, label accessible et délai léger facultatif. Pas d’appel API à chaque frappe.

## FilterChip

Bouton à état pressé avec `aria-pressed`. Les filtres combinés sont visibles et réinitialisables.

## Toast

Réservé aux événements non bloquants : nouveau dépôt, synchronisation terminée, erreur récupérable. Jamais comme seul moyen de comprendre un échec durable.

## EmptyState

Message, explication et action unique pertinente. Peut adopter la métaphore de l’atelier sans humour obscur.

## Modal

À limiter aux confirmations rares, comme vider le cache. Focus piégé, fermeture clavier et restauration du focus obligatoires.
