# États et feedback

## Chargement initial sans cache

Écran de démarrage, progression indéterminée et message « Inventaire de l’atelier ». Après un délai raisonnable, afficher une explication plutôt qu’un spinner infini.

## Chargement avec cache

Afficher immédiatement les données. Un indicateur discret signale la mise à jour en cours.

## Succès

- message court ;
- date de synchronisation mise à jour ;
- nouvelle arrivée mise en évidence si nécessaire.

## Hors ligne

Bandeau non bloquant : « La Grange fonctionne sur ses réserves. » Les liens externes peuvent rester visibles mais sont signalés.

## Limite API

Afficher l’ancien cache, le moment estimé de réessai s’il est disponible et éviter les relances automatiques répétées.

## Erreur sans cache

État plein écran avec cause compréhensible, bouton Réessayer et lien vers les paramètres du nom d’utilisateur.

## Image absente

Fallback immédiat, sans icône d’image cassée.

## Recherche vide

Message « Aucun projet ne correspond à cet inventaire » et bouton de réinitialisation.

## Nouvelle arrivée

Badge persistant jusqu’à consultation. Le toast n’est qu’un complément.
