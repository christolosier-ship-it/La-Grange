# Bible visuelle de la Phase 6

## Rôle du document

Ce document traduit la direction artistique en règles concrètes de composition. Il sert de référence aux assets produits, aux composants CSS et aux revues visuelles.

Il ne remplace pas les spécifications fonctionnelles. Lorsqu’une métaphore visuelle entre en conflit avec l’accessibilité, la performance ou la compréhension, la fonction prime.

Le registre `docs/05-realisation/10-suivi-production-assets-phase-6.md` fixe le contrat opérationnel complet : noms, formats, dimensions, transparences, usages, fallbacks, budgets, provenances, droits, dépendances, lots et statuts.

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

La charpente ne déforme jamais les colonnes, n’impose pas de largeur fixe, ne masque pas les safe areas, ne crée pas de scroll horizontal et n’empêche pas le zoom à 200 %.

### Établi central

La zone principale reste la plus claire et la plus stable. Elle accueille les listes, cartes et fiches. Le décor périphérique ne détourne pas l’attention des projets.

### Rails latéraux

Le rail gauche porte l’identité et la navigation. Le rail droit porte les informations secondaires, l’activité et les notes. Sur les formats étroits, ces rails deviennent des sections dans le flux.

### Poutre supérieure

Quatre métriques maximum. Toute métrique est réelle, utile et déjà prévue par le produit.

## Système de matières

### Bois structurel

Usage : arrière-plan, poutres, cadres de sections et navigation.

Caractéristiques : brun très sombre, veinage large et faible contraste, usure localisée, répétition invisible et aucune fissure derrière du texte.

### Bois de caisse

Usage : cartes, petits panneaux et actions encadrées.

Caractéristiques : plus clair que le fond, grain simplifié, bordure nette, profondeur courte et variation contrôlée.

### Métal sombre

Usage : bordures, attaches, plaques, séparateurs et boutons secondaires.

Caractéristiques : gris brun ou bronze, reflets courts, texture presque unie et aucun chrome brillant.

### Laiton ou ambre

Usage : focus, action principale, état actif et petites attaches importantes. Il reste un accent et ne couvre jamais une grande surface.

### Papier

Usage : notes, états vides, aide, diagnostic court et panneau de bienvenue.

Caractéristiques : beige chaud, texture faible, contraste élevé, bord légèrement irrégulier uniquement en décor et aucune rotation gênante.

### Verre sombre

Usage : panneaux techniques secondaires ou activité.

Caractéristiques : surface sombre semi-opaque, faible reflet, bordure visible et aucune transparence qui mélange le texte avec le décor.

## Éclairage

Une lumière ambrée principale semble provenir d’un point fixe. Elle donne du relief au shell, pas à chaque composant.

Des halos locaux sont autorisés pour l’enseigne, la synchronisation, une nouvelle arrivée et l’action principale au focus.

Interdictions : clignotement, pulsation permanente, bloom autour du texte, filtre altérant les couvertures et grandes ombres animées.

## Typographie

### Marque

La marque est portée par les assets A01 à A06 ou par un fallback texte. Aucun fichier de police n’est ajouté pour imiter l’enseigne.

### Titres

Serif robuste, casse cohérente et espacement modéré.

### Corps

Sans-serif locale ou système, hauteur de ligne confortable. Le texte n’imite jamais une gravure, une craie ou une écriture manuscrite.

### Notes décoratives

Une manuscrite locale licenciée peut servir à une phrase purement décorative, jamais à une instruction, un statut, un bouton ou une donnée.

## Iconographie

- SVG local ;
- `viewBox 0 0 24 24` ;
- trait homogène ;
- angles légèrement arrondis ;
- formes immédiatement identifiables ;
- couleur héritée par `currentColor` ;
- aucun emoji fonctionnel ;
- aucun texte dans l’icône.

Les noms finaux D01 à D41 sont définis dans le registre.

## Métaphore par composant

| Composant | Métaphore | Élément moderne conservé |
| --- | --- | --- |
| Shell | charpente | grille et landmarks |
| Navigation | panneau mural | liens, focus et ordre stable |
| StatCard | plaque de compteur | valeur et libellé nets |
| ProjectCard | caisse ou cadre | contenu structuré et lien principal |
| StatusBadge | étiquette ou ruban | texte obligatoire |
| Bouton principal | plaque active | bouton, pressé et focus |
| SearchField | tiroir ou encart | champ natif |
| FilterChip | petite étiquette | `aria-pressed` et contraste |
| EmptyState | emplacement vide ou note | message et action unique |
| Toast | étiquette temporaire | durée et annonce accessibles |
| Modal | panneau au premier plan | fond inerte et focus piégé |
| Timeline | registre ou planche | ordre chronologique |
| Paramètres | panneau de réglages | contrôles natifs |

## Anatomie de la carte projet

Une carte comporte au maximum : cadre, couverture ou fallback, logo ou nom, état, description courte, métadonnées utiles, action principale et actions secondaires limitées.

Hiérarchie : la couverture attire, le nom identifie, l’état explique, la description contextualise et l’action reste évidente.

Sans couverture ni logo, la carte utilise C18, des initiales, le nom HTML et le même cadre que les cartes illustrées.

Variantes : standard, mise en avant, compacte, liste, archivée et nouvelle arrivée.

## États interactifs

### Survol

Relèvement léger, changement de lumière ou contraste de bordure. Aucun déplacement important.

### Focus

Bordure ou anneau ambre de 2 px minimum, visible au-dessus de toute texture.

### Pressé

Enfoncement de 1 à 2 px ou réduction légère de l’ombre.

### Désactivé

Contraste lisible et cause expliquée si nécessaire.

### Erreur

Rouge avec texte et icône, sans transformer toute la scène en alerte.

## Imperfection contrôlée

- rotation maximale : 0,5 degré ;
- décalage maximal : 2 px ;
- variation de bordure subtile ;
- variation aléatoire au runtime interdite ;
- texte et hitbox toujours droits.

## Règles de décor

Un détail décoratif renforce une matière, explique la profondeur, équilibre une zone vide ou renforce l’identité.

Il est supprimé s’il ressemble à un contrôle, réduit le contraste, se répète trop, coûte beaucoup sans valeur, attire plus que les projets ou gêne le zoom.

## Règles de production

- textes en HTML ;
- cadres adaptables en CSS ou SVG ;
- textures en WebP ;
- fallback CSS pour chaque élément critique ;
- aucun asset distant ;
- un seul asset produit et validé à la fois ;
- nom, format et dimensions issus du registre ;
- source M/S citée approuvée A et versionnée R avant tout dérivé ;
- asset canonique Phase 6 cité par identifiant déjà P/V, fallback hors registre décrit exactement par la ligne du registre puis présent et testé sans faux statut, ou provenance interne renseignée en l’absence de source canonique ;
- asset contrôlé et versionné à la racine du dossier runtime avec P, puis validé avec V ;
- raccord manuel au code et statut I uniquement dans le lot 6A à 6E concerné ;
- aucun nouveau sous-dossier ; l’exception héritée reste gelée ;
- aucune sortie brute intégrée ;
- droits et provenance documentés.

## Validation de la bible

La validation s’appuie sur les planches G01 à G15c du registre, produites après les changements de leur lot. Elles démontrent séparément le shell, le dashboard final, la navigation, les statistiques, les cartes, les panneaux, les fallbacks, le focus et les formats desktop, tablette et mobile.

La bible est validée seulement après comparaison des planches avec la référence, l’application actuelle et les contraintes d’accessibilité.
