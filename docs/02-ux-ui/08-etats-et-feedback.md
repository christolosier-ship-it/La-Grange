# États et feedback

## Principe

Chaque état reste compréhensible sans animation, sans couleur et sans image. Le dernier contenu valide reste visible pendant les opérations réseau.

## Synchronisation

Le panneau reste dans le rail gauche.

- cache : contenu immédiat ;
- synchronisation : état textuel et icône ;
- succès : date mise à jour ;
- hors ligne : cache conservé ;
- limite API : heure de reprise ;
- erreur : explication sans masquer les cartes.

## Dashboard

Le chargement n’introduit pas de grand conteneur central. Le bandeau utilise son fallback CSS et la grille réserve les dimensions des cartes.

## Liens de carte

- GitHub : toujours disponible si le projet existe ;
- application : absente ou signalée si aucune URL ;
- README : absente ou signalée si indisponible ;
- détail : toujours disponible ;
- personnalisation : absente hors administrateur.

Une action indisponible ne devient pas un bouton mort.

## Image absente

Le fallback utilise C18 ou une surface CSS, les initiales et le nom HTML. L’icône d’image cassée native n’apparaît pas.

## Progression

Absence de valeur : aucun rail. Valeur présente : texte et barre cohérents. Une erreur d’override retire la progression et produit un diagnostic, sans casser la carte.

## Version

- manuelle ;
- stable ;
- préversion ;
- absente.

La source n’est pas annoncée visuellement sauf nécessité, mais reste déterministe.

## Administration

États :

- visiteur ;
- authentification ;
- administrateur connecté ;
- session expirée ;
- hors ligne ;
- validation ;
- upload ;
- création de branche ;
- création de PR ;
- PR créée ;
- conflit ;
- erreur récupérable.

La mention « publié » n’est utilisée qu’après déploiement. Après création de PR, afficher « PR créée, en attente de fusion ».

## Modale

Les erreurs de champs restent proches des contrôles. Une erreur serveur conserve les valeurs et propose une action. Le focus revient au bouton d’origine après fermeture.

## Mise à jour PWA

Après fusion et déploiement, une notification accessible propose le rechargement. Aucun rechargement brutal pendant une saisie de modale.
