# États et feedback

## Principe Phase 6

Chaque état reste compréhensible sans animation, sans couleur et sans asset. La métaphore de l’atelier peut soutenir le message, jamais le remplacer.

Les feedbacks utilisent une surface de lecture calme. Un état réseau ne doit pas transformer toute la scène ni faire disparaître le dernier contenu valide.

## Chargement initial sans cache

Écran de démarrage, progression indéterminée et message « Inventaire de l’atelier ». Après un délai raisonnable, afficher une explication plutôt qu’un spinner infini.

### Présentation Phase 6

- enseigne ou symbole compact ;
- fond sombre simple ;
- aucune grande illustration bloquante ;
- aucune durée artificielle ;
- fallback typographique immédiat ;
- mouvement réduit sans translation.

## Chargement avec cache

Afficher immédiatement les données. Un indicateur discret signale la mise à jour en cours.

### Présentation Phase 6

Une petite lueur, bordure ou plaque de statut peut signaler la synchronisation. Les cartes et panneaux ne changent pas de position.

## Succès

- message court ;
- date de synchronisation mise à jour ;
- nouvelle arrivée mise en évidence si nécessaire.

### Présentation Phase 6

Le succès utilise une bordure, une étiquette ou une note courte. Il ne provoque pas une pluie d’éléments, une animation longue ou un changement général de lumière.

## Hors ligne

Bandeau non bloquant : « La Grange fonctionne sur ses réserves. » Les liens externes peuvent rester visibles mais sont signalés.

### Présentation Phase 6

Le hors ligne peut être présenté comme une note ou une plaque sobre. La scène reste éclairée et le dernier contenu conserve son apparence normale.

## Limite API

Afficher l’ancien cache, le moment estimé de réessai s’il est disponible et éviter les relances automatiques répétées.

### Présentation Phase 6

Le bouton désactivé conserve un contraste lisible. L’heure de reprise est du texte. Aucun sablier animé en boucle.

## Erreur sans cache

État plein écran avec cause compréhensible, bouton Réessayer et lien vers les paramètres du nom d’utilisateur.

### Présentation Phase 6

L’atelier peut sembler vide ou fermé, mais le message et les actions restent conventionnels. Aucun décor dramatique ne doit suggérer une perte de données non confirmée.

## Erreur avec cache

Le dernier contenu valide reste visible. Le message explique que la synchronisation est incomplète et propose une action seulement si elle est utile.

### Présentation Phase 6

Une plaque ou note d’avertissement suffit. Les cartes ne deviennent pas rouges et ne sont pas assombries.

## Image absente

Fallback immédiat, sans icône d’image cassée.

### Présentation Phase 6

Fond déterministe, initiales, pictogramme de caisse et cadre standard. Le fallback doit paraître prévu, pas réparé à la hâte.

## Recherche vide

Message « Aucun projet ne correspond à cet inventaire » et bouton de réinitialisation.

### Présentation Phase 6

Emplacement libre, étagère vide ou note papier facultative. Aucun faux projet n’est ajouté pour remplir l’espace.

## Nouvelle arrivée

Badge persistant jusqu’à consultation. Le toast n’est qu’un complément.

### Présentation Phase 6

Une caisse peut entrer par une translation courte. Sous mouvement réduit, elle apparaît directement. Les cartes existantes ne sont pas déplacées et la séquence ne se rejoue pas après acquittement.

## Asset du shell absent

La couleur et les gradients CSS prennent le relais. La navigation, les panneaux et le focus conservent leurs contours fonctionnels.

## Police décorative indisponible

Le fallback système s’affiche sans changement important de hauteur ni perte de hiérarchie.

## Diagnostic ou cache indisponible

Le panneau concerné explique l’indisponibilité sans faire croire que toute l’application ou IndexedDB est cassée. Les erreurs de profil, de synchronisation et de maintenance restent distinctes.

## Règles de feedback

- aucun toast comme seule explication d’un échec durable ;
- aucune animation permanente ;
- aucune couleur seule ;
- texte utilisateur séparé du diagnostic technique ;
- focus restauré après une confirmation ;
- fond inerte pendant une modale ;
- aucune donnée précédente effacée par un état transitoire ;
- aucune métaphore obscure ;
- aucun asset requis pour comprendre l’état ;
- aucune fausse date ou fausse progression.