# Spécification des vues

## Règle commune Phase 6

Toutes les vues appartiennent au même atelier. Elles partagent le shell, la navigation, les matières, la typographie, le focus et les panneaux. Leur composition interne peut changer, mais aucune vue ne doit sembler provenir d’un second thème.

Le décor se concentre sur les contours, les grands fonds et les couvertures. Les zones de texte, formulaires et données restent calmes.

## Écran de démarrage

Affiche le logo, une phrase courte et un indicateur accessible. Il disparaît dès que le cache est prêt. Il ne doit jamais imposer une durée artificielle.

### Présentation Phase 6

- enseigne ou symbole de La Grange ;
- fond sombre simple ;
- lumière courte et statique sous mouvement réduit ;
- aucun décor lourd chargé avant le shell ;
- aucun faux atelier animé pendant une durée imposée.

## Dashboard

### Bureau

- rail gauche de 250 à 290 px ;
- zone centrale fluide ;
- rail droit de 280 à 340 px ;
- grille de 3 ou 4 cartes selon largeur.

### Contenu

- 4 statistiques maximum ;
- L’établi : projets actifs triés par activité ;
- Prêts à partir : projets avec application ;
- activité récente ;
- répartition par état ;
- nouvelle arrivée prioritaire.

### Présentation Phase 6

- rail gauche comme panneau mural ;
- statistiques sur une poutre ou une plaque ;
- sections centrales comme espaces d’établi ;
- cartes mises en avant comme caisses illustrées ;
- rail droit en panneaux empilés ;
- une note éditoriale facultative ;
- quelques ornements uniquement dans les espaces libres.

La composition ne doit pas reproduire les six destinations fictives de la référence. La navigation reste limitée aux quatre routes réelles.

Aucune progression, release, branche, commit ou conflit ne doit être ajouté pour ressembler à la référence.

## Catalogue

### Fonction

- champ de recherche ;
- puces de filtres ;
- tri ;
- bascule grille ou liste ;
- résultat vide contextualisé ;
- compteur de résultats.

### Présentation Phase 6

- commandes dans un panneau de travail calme ;
- recherche native clairement identifiable ;
- filtres comme étiquettes interactives ;
- grille comme rayonnage ou ensemble de caisses ;
- vue liste comme registre ou fiches alignées ;
- aucun ornement entre le champ et les résultats ;
- état vide comme emplacement libre accompagné d’une action unique.

Le catalogue peut être plus sobre que le dashboard afin de préserver la vitesse de balayage.

## Fiche projet

### Fonction

- hero illustré ;
- actions « Ouvrir l’application » et « Voir sur GitHub » ;
- description complète ;
- métadonnées ;
- derniers éléments chargés à la demande ;
- navigation précédent ou suivant facultative sur bureau.

### Présentation Phase 6

- hero comme grand cadre ou panneau de projet ;
- identité colorée contenue dans le shell ;
- actions principales sur une plaque stable ;
- description sur surface unie ;
- métadonnées sur petites plaques ou lignes de registre ;
- détails GitHub dans un panneau secondaire distinct ;
- aucune grande texture derrière le texte ;
- retour contextualisé toujours visible.

Le projet reste lisible sans couverture, logo ou détails GitHub.

## Activité

### Fonction

Chronologie groupée par date, construite à partir des événements connus. Les formulations restent prudentes : « activité détectée » plutôt que « nouvelle version » sans preuve.

### Présentation Phase 6

- registre, planche ou panneau vertical ;
- groupes de semaines clairement séparés ;
- jours identifiables sans couleur seule ;
- repères discrets ;
- événements encore disponibles liés à leur fiche ;
- dépôts disparus affichés sans lien mort ;
- aucun appel GitHub pour remplir la vue ;
- lecture hors ligne complète.

La chronologie doit rester plus calme que la colonne d’activité synthétique du dashboard.

## Paramètres

### Fonction

Préférences locales, informations de cache, version et actions de maintenance. Aucun secret et aucun token.

### Présentation Phase 6

- panneaux de réglages clairement distincts ;
- contrôles natifs conservés ;
- informations de cache sur un panneau technique calme ;
- favoris sous forme de liste ou fiches simples ;
- diagnostic dans une zone de lecture unie ;
- action destructive séparée ;
- modale au premier plan avec fond inerte ;
- aucune texture derrière le JSON ou texte copiable.

La vue Paramètres privilégie la clarté. Elle reçoit moins d’ornements que le dashboard.

## Page introuvable

### Présentation Phase 6

Une porte fermée, un emplacement vide ou une note peut soutenir la métaphore. Le message, la route et le lien de retour restent directs.

## États transversaux

### Chargement du cache

Structure visible immédiatement, sans animation longue. Le décor critique peut apparaître après le contenu.

### Synchronisation

Lueur ou changement de bordure discret. Statut textuel obligatoire.

### Hors ligne

Dernier contenu conservé. Note ou plaque informative sans transformer toute la scène.

### Erreur récupérable

Message utilisateur clair, contenu précédent conservé, action pertinente.

### Cache vide

Atelier vide mais utilisable. Aucune fausse caisse ni donnée de démonstration.

### Asset absent

Fallback déterministe. La composition conserve ses dimensions.

## Cohérence entre vues

- même enseigne ;
- même navigation ;
- mêmes tokens ;
- mêmes cadres principaux ;
- mêmes règles de focus ;
- mêmes familles d’icônes ;
- mêmes surfaces de lecture ;
- même stratégie de fallback ;
- densité et mouvement appliqués globalement.

## Contrôle de sortie

Chaque vue est validée aux formats 390, 768, 1024 et 1440 px, avec :

- données réelles ou fixtures de test clairement isolées ;
- textes longs ;
- images absentes ;
- hors ligne ;
- mouvement réduit ;
- densité compacte ;
- navigation clavier ;
- zoom 200 %.