# Bible visuelle de la Phase 6

## Rôle du document

Ce document traduit la direction artistique en règles concrètes de composition. Il sert de référence aux prototypes Lovable, aux assets générés, aux composants CSS et aux revues visuelles.

Il ne remplace pas les spécifications fonctionnelles. Lorsqu’une métaphore visuelle entre en conflit avec l’accessibilité, la performance ou la compréhension, la fonction prime.

## Phrase de conception

> Une application moderne installée dans un atelier stylisé, pas un décor de grange transformé en application.

## Sensation recherchée

La Grange doit paraître :

- chaleureuse ;
- artisanale ;
- nocturne ;
- organisée ;
- dense mais maîtrisée ;
- tactile sans être réaliste ;
- personnelle sans paraître bricolée.

Elle ne doit pas paraître :

- poussiéreuse au point d’être sale ;
- médiévale ;
- western ;
- steampunk ;
- photoréaliste ;
- enfantine ;
- saturée d’ornements ;
- construite comme un jeu vidéo.

## Grammaire de composition

### Charpente

Le shell donne l’impression d’une structure fixe. Les rails, panneaux et sections s’alignent sur une grille régulière même si leurs bordures paraissent légèrement irrégulières.

La charpente ne doit pas :

- déformer les colonnes ;
- imposer des largeurs fixes au contenu ;
- masquer les safe areas ;
- créer un scroll horizontal ;
- empêcher le zoom à 200 %.

### Établi central

La zone principale reste la plus claire et la plus stable. Elle accueille les listes, cartes et fiches. Le décor périphérique ne doit pas détourner l’attention des projets.

### Rails latéraux

Le rail gauche porte l’identité et la navigation. Le rail droit porte les informations secondaires, l’activité et les notes. Sur les formats étroits, ces rails deviennent des sections dans le flux plutôt que des colonnes miniatures.

### Poutre supérieure

Les statistiques peuvent être présentées sur une poutre ou une grande plaque. Quatre métriques maximum restent autorisées. Toute métrique doit être réelle, utile et déjà prévue par le produit.

## Système de matières

### Bois structurel

Usage : arrière-plan, grandes poutres, cadres de sections, navigation.

Caractéristiques :

- brun très sombre ;
- veinage large et peu contrasté ;
- usure localisée sur les arêtes ;
- répétition peu visible ;
- aucune écharde ou fissure derrière du texte.

Le bois ne doit pas être utilisé comme texture de lecture directe pour un paragraphe long.

### Bois de caisse

Usage : cartes projets, petits panneaux, actions encadrées.

Caractéristiques :

- légèrement plus clair que le fond ;
- grain simplifié ;
- bordure nette ;
- profondeur courte ;
- variation contrôlée entre composants.

### Métal sombre

Usage : bordures fines, attaches, plaques, séparateurs, boutons secondaires.

Caractéristiques :

- gris brun ou bronze sombre ;
- reflets courts ;
- texture presque unie ;
- pas de chrome brillant.

### Laiton ou ambre

Usage : focus, action principale, état actif, petites attaches importantes.

Le laiton est un accent. Il ne couvre jamais de grandes surfaces.

### Papier

Usage : notes, états vides, aide, diagnostic court, panneau de bienvenue.

Caractéristiques :

- beige chaud ;
- texture très faible ;
- contraste élevé avec le texte ;
- bord légèrement irrégulier uniquement en décor ;
- aucune rotation qui gêne la lecture.

### Verre sombre

Usage : panneaux techniques secondaires ou activité.

Caractéristiques :

- surface sombre semi-opaque ;
- faible reflet ;
- bordure visible ;
- pas de transparence qui mélange le texte avec le décor.

## Éclairage

### Lumière principale

Une lumière ambrée semble provenir du haut ou d’un point fixe de la scène. Elle donne du relief au shell, pas à chaque composant individuellement.

### Lumière locale

Certaines zones peuvent recevoir un halo discret :

- enseigne ;
- synchronisation ;
- nouvelle arrivée ;
- action principale au focus.

### Interdictions

- aucun clignotement ;
- aucune pulsation permanente ;
- pas de bloom autour du texte ;
- pas de filtre qui modifie la couleur des couvertures de projet ;
- pas de grandes ombres animées.

## Typographie

### Marque

La marque peut utiliser une police display locale avec une personnalité artisanale. Elle reste lisible en capitales, à petite taille et sur écran Retina.

### Titres

Les titres de sections peuvent utiliser une serif robuste. La casse reste cohérente et les lettres espacées avec modération.

### Corps

Le corps reste une sans-serif locale ou système, avec une hauteur de ligne confortable. Le texte n’imite jamais une gravure, une craie ou une écriture manuscrite.

### Notes décoratives

Une police manuscrite locale peut être utilisée pour une phrase purement décorative ou éditoriale, jamais pour une instruction, un statut, un bouton ou une donnée.

## Iconographie

### Style

- SVG local ;
- trait homogène ;
- angles légèrement arrondis ;
- formes immédiatement identifiables ;
- remplissage limité ;
- couleur héritée du composant.

### Familles recommandées

- maison ou atelier pour l’accueil ;
- caisse ou dossier pour les projets ;
- horloge ou trace pour l’activité ;
- outil ou engrenage pour les paramètres ;
- étiquette pour les versions et états ;
- feuille, fiole, clé, luciole ou autre symbole pour les accents éditoriaux.

Les icônes ne doivent pas copier visuellement GitHub ou une autre marque lorsqu’elles décrivent une fonction interne.

## Métaphore par composant

| Composant fonctionnel | Métaphore visuelle | Élément qui reste moderne |
| --- | --- | --- |
| Shell | charpente | grille et landmarks |
| Navigation | panneau mural | liens, focus, ordre stable |
| StatCard | plaque de compteur | valeur et libellé nets |
| ProjectCard | caisse ou cadre | contenu structuré, lien principal clair |
| StatusBadge | étiquette ou ruban | texte obligatoire |
| Bouton principal | plaque active | forme de bouton, état pressé et focus |
| Bouton secondaire | commande métallique | libellé explicite |
| SearchField | tiroir ou encart | champ natif visible |
| FilterChip | petite étiquette | `aria-pressed` et contraste |
| EmptyState | emplacement vide ou note | message et action unique |
| Toast | étiquette temporaire | durée et annonce accessibles |
| Modal | panneau au premier plan | fond inerte, focus piégé |
| Timeline | registre ou planche | ordre chronologique évident |
| Paramètres | panneau de réglages | contrôles natifs conservés |

## Anatomie de la carte projet

Une carte de Phase 6 comporte au maximum :

1. un cadre ou une caisse ;
2. une couverture ou un fallback ;
3. un logo ou un nom lisible ;
4. une étiquette d’état ;
5. une description courte ;
6. deux ou trois métadonnées utiles ;
7. une action principale ;
8. des actions secondaires limitées.

### Hiérarchie

- la couverture attire ;
- le nom identifie ;
- l’état explique ;
- la description contextualise ;
- l’action reste évidente.

### Fallback

Sans couverture ni logo, la carte utilise :

- un fond déterministe ;
- les initiales ;
- un pictogramme de caisse ;
- le même cadre que les cartes illustrées.

Le fallback n’est jamais présenté comme une erreur.

### Variantes

- standard : catalogue ;
- mise en avant : dashboard ;
- compacte : production ou favoris ;
- liste : vue catalogue ;
- archivée : contraste réduit mais texte lisible ;
- nouvelle arrivée : accent temporaire et non clignotant.

## États interactifs

### Survol

Un léger relèvement, changement de lumière ou contraste de bordure est autorisé. Aucun déplacement important.

### Focus

Le focus ne doit pas être simulé uniquement par une ombre. Une bordure ou un anneau ambre de 2 px minimum reste visible au-dessus de toute texture.

### Pressé

Le composant peut s’enfoncer de 1 à 2 px ou réduire légèrement son ombre.

### Désactivé

Le contraste reste lisible. La cause est expliquée lorsque nécessaire. Un composant désactivé ne devient pas un objet décoratif ambigu.

### Erreur

L’erreur utilise le rouge avec texte et icône. Elle ne transforme pas toute la scène en alerte.

## Imperfection contrôlée

Les irrégularités autorisées sont appliquées à des pseudo-éléments ou assets décoratifs :

- rotation maximale recommandée : 0,5 degré ;
- décalage maximal recommandé : 2 px ;
- variation de bordure : subtile ;
- variation aléatoire au runtime : interdite ;
- texte et hitbox : toujours droits.

## Règles de décor

Un détail décoratif doit satisfaire au moins une condition :

- renforcer une matière ;
- expliquer la profondeur ;
- équilibrer une zone vide ;
- renforcer l’identité de La Grange.

Il doit être supprimé s’il :

- ressemble à un contrôle ;
- réduit le contraste ;
- se répète trop visiblement ;
- coûte beaucoup de poids sans valeur ;
- attire plus que les projets ;
- devient gênant à 200 % de zoom.

## Règles de production

- les textes restent en HTML ;
- les cadres réutilisables privilégient CSS et SVG ;
- les textures privilégient WebP ou AVIF ;
- les éléments critiques possèdent toujours un fallback CSS ;
- aucun asset distant n’est requis au runtime ;
- les assets générés par IA sont revus, optimisés et renommés avant intégration ;
- les droits et la provenance de chaque police ou asset externe sont documentés.

## Validation de la bible

Le premier prototype doit démontrer uniquement :

- le shell ;
- la navigation ;
- la poutre de statistiques ;
- une carte projet standard ;
- une carte compacte ;
- un panneau secondaire ;
- un état sans image ;
- un état focus ;
- un format bureau et un format mobile.

La bible n’est considérée validée qu’après comparaison de ce prototype avec la référence, les écrans actuels et les contraintes d’accessibilité.