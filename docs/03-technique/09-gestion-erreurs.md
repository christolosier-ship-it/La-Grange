# Gestion des erreurs

## Typologie

- réseau indisponible ;
- utilisateur GitHub invalide ;
- limite API ;
- réponse partielle ;
- JSON override invalide ;
- IndexedDB indisponible ;
- migration échouée ;
- asset absent ;
- route inconnue ;
- lien externe invalide.

## Modèle

Créer des erreurs typées avec code stable, message technique, message utilisateur et caractère récupérable.

## Politique

- journaliser en développement sans exposer de détail sensible ;
- afficher un message utilisateur contextualisé ;
- conserver le dernier état valide ;
- proposer une seule action utile ;
- ne pas relancer automatiquement en boucle ;
- distinguer avertissement local et erreur bloquante.

## Error boundary léger

Le shell capture les erreurs de rendu d’une vue et affiche un panneau de récupération sans détruire la navigation. Une erreur de carte individuelle doit rester confinée à cette carte.

## Observabilité MVP

Pas de télémétrie distante. Les diagnostics nécessaires sont disponibles via la console en mode développement et une section technique copiable dans les paramètres, sans données privées.
