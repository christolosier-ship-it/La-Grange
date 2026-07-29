# Gestion des erreurs

## Typologie

- réseau indisponible ;
- utilisateur GitHub invalide ou introuvable ;
- limite API ;
- réponse partielle ;
- JSON override invalide ;
- IndexedDB indisponible ;
- préférence invalide ;
- changement de profil échoué ;
- reset local échoué ;
- copie presse-papiers refusée ;
- asset absent ;
- route ou lien invalide.

## Modèle

Les erreurs applicatives utilisent un code stable, un message technique, un message utilisateur et un caractère récupérable. L’interface affiche le message utilisateur.

## Préférences et profils

Une préférence invalide est réparée champ par champ. Les autres valeurs valides sont conservées.

Lors d’un changement de profil, un snapshot local valide reste utilisable malgré une erreur réseau. Sans snapshot utilisable, l’ancien profil et ses préférences sont restaurés.

## Cache et diagnostic

Une erreur d’inspection du cache ne retire pas le snapshot affiché. Le reset ne publie un succès qu’après la transaction complète et la nouvelle inspection. La modale reste ouverte si l’action échoue.

La copie du diagnostic utilise Clipboard API. En cas de refus, le diagnostic reste visible et sélectionnable avec un message accessible.

## Politique

- conserver le dernier état valide ;
- ne pas mélanger les données de deux profils ;
- ne pas relancer automatiquement en boucle ;
- distinguer avertissement local et erreur bloquante ;
- proposer une action unique et compréhensible ;
- ne pas exposer le message technique dans l’interface.

## Error boundary léger

Le shell capture les erreurs de rendu d’une vue et affiche un panneau de récupération sans détruire la navigation. Une erreur de composant reste confinée.

## Observabilité MVP

Pas de télémétrie distante. Le diagnostic copiable contient uniquement version, profil, états, dates, compteurs, préférences effectives et messages utilisateur. Il n’exporte pas le contenu complet du cache.
