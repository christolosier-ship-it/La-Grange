# Accessibilité

## Cible

Respecter WCAG 2.2 niveau AA autant que possible.

La Phase 6 ne traite pas l’accessibilité comme une correction finale. Les textures, cadres, animations, polices et objets décoratifs sont conçus dès l’origine pour préserver la lecture, le clavier, le zoom et les technologies d’assistance.

## Structure

- landmarks `header`, `nav`, `main`, `aside`, `footer` ;
- un seul `h1` par vue ;
- hiérarchie de titres sans saut artificiel ;
- lien d’évitement vers le contenu ;
- la charpente visuelle ne modifie pas les landmarks ;
- les panneaux décoratifs ne créent pas de régions inutiles dans l’arbre d’accessibilité.

## Clavier

Toutes les cartes et actions sont accessibles au clavier. Une carte ne contient pas plusieurs zones cliquables imbriquées de manière invalide. Le focus suit la navigation et revient à l’élément déclencheur après fermeture d’un overlay.

### Phase 6

- focus visible de 2 px minimum au-dessus des textures et cadres ;
- aucun cadre SVG ne masque l’anneau de focus ;
- aucun ornement ne reçoit le focus ;
- l’ordre de tabulation suit l’ordre visuel utile ;
- une animation ne déplace pas le focus ;
- les contrôles natifs des paramètres restent identifiables ;
- les cartes conservent une action principale explicite ;
- les contrôles recréés après rerender utilisent une clé de restauration stable lorsque nécessaire.

## Couleur et contraste

Les états possèdent texte et icône. Les textures ne réduisent pas le contraste. Les textes normaux atteignent 4,5:1 et les grands textes 3:1.

### Mesure Phase 6

Le contraste est mesuré sur le rendu final comprenant :

- couleur de fond ;
- gradient ;
- texture ;
- lumière ;
- état interactif.

Une moyenne de texture n’est pas suffisante. Les zones les plus claires et les plus sombres sous le texte sont contrôlées.

Les surfaces de lecture longues utilisent une couleur unie ou une texture presque imperceptible. Les états ne dépendent jamais du vert, du rouge ou de l’ambre seuls.

## Lecteurs d’écran

- statut de synchronisation annoncé avec modération ;
- dates relatives accompagnées d’une valeur complète accessible ;
- images décoratives avec alt vide ;
- couvertures informatives avec alt concis ;
- liens externes annoncés ;
- cadres, vis, cordes, lampes et textures hors de l’arbre d’accessibilité ;
- aucun texte fonctionnel inclus uniquement dans une image ;
- les métaphores visuelles conservent des libellés explicites ;
- une carte fallback ne s’annonce pas comme une image cassée.

## Modales

- rôle et titre accessibles ;
- description reliée ;
- focus initial maîtrisé ;
- focus piégé ;
- fermeture par Échap avant le lancement de l’action ;
- fermeture bloquée pendant une action non annulable ;
- erreur utilisateur annoncée dans la modale ;
- arrière-plan rendu `inert` et masqué de l’arbre d’accessibilité ;
- état initial de l’arrière-plan restauré à la fermeture ;
- focus restauré sur un contrôle encore connecté ou son équivalent recréé.

Le cadre décoratif de la modale ne doit pas réduire l’espace utile au point de pousser les actions hors écran.

## Mouvement et zoom

Respect de `prefers-reduced-motion`, zoom à 200 %, orientation libre et zones tactiles adaptées.

### Mouvement réduit

- aucune translation ou rotation décorative ;
- aucune entrée narrative ;
- aucun halo animé ;
- état final présenté immédiatement ou par fondu très court ;
- structure et information identiques ;
- réglage système prioritaire sur le réglage local.

### Zoom

À 200 % :

- aucun texte coupé par un cadre ;
- aucun panneau fixe recouvre le contenu ;
- la navigation reste accessible ;
- les colonnes se replient ;
- les ornements disparaissent avant le contenu ;
- aucun scroll horizontal global.

## Cibles tactiles

- minimum 44 x 44 px ;
- espacement suffisant entre actions ;
- apparence de petit clou ou petite icône autorisée uniquement si la hitbox visible ou compréhensible reste suffisante ;
- aucune action critique uniquement dans une rangée d’icônes serrées ;
- safe areas iOS respectées.

## Images et assets

- dimensions réservées pour éviter les déplacements ;
- couverture informative avec alt concis fondé sur le projet, pas sur le style de l’image ;
- logo décoratif avec alt vide si le nom est déjà présent ;
- texte de marque accessible même si l’enseigne est un SVG ;
- SVG local sans script ;
- fonctionnement complet avec images bloquées ;
- aucune police distante nécessaire à la lecture.

## Contraste accru et préférences système

Lorsque disponible :

- les contours restent visibles en mode contraste accru ;
- les ombres ne sont pas la seule séparation ;
- les textures peuvent être atténuées ;
- les états actifs conservent texte, bordure ou icône ;
- les couleurs forcées ne rendent pas les contrôles invisibles.

## Tests

- navigation clavier manuelle ;
- VoiceOver sur iOS ;
- audit automatisé ;
- vérification des contrastes avant release ;
- zoom 200 % ;
- mouvement réduit système et local ;
- images bloquées ;
- textes longs ;
- modales ;
- densité compacte ;
- formats 390, 768, 1024 et 1440 px ;
- contrôle de la référence visuelle sans sacrifier les critères précédents.

Une conformité automatisée ne remplace pas le contrôle manuel sur les textures, le focus, les modales et la lecture VoiceOver.