# Checklist qualité de la Phase 6

## Usage

Cette checklist est complétée dans chaque PR visuelle avec les éléments applicables. Un contrôle non exécuté est noté comme tel et ne peut pas être déclaré réussi par déduction.

## Périmètre

- [ ] la PR ne mélange pas fonction métier et visuel ;
- [ ] le lot correspond au document Phase 6 ;
- [ ] les documents concernés sont à jour ;
- [ ] le registre est à jour ;
- [ ] les écarts aux planches validées sont explicités ;
- [ ] les idées hors périmètre ne sont pas implémentées.

## Vérité des données

- [ ] aucune métrique fictive ;
- [ ] aucune progression inventée ;
- [ ] aucune version, release, branche ou conflit dessiné dans un asset ;
- [ ] aucune donnée réelle remplacée par une donnée de démonstration ;
- [ ] aucun contenu de prototype hérité utilisé en production ;
- [ ] les états sans donnée restent honnêtes.

## Registre et méthode

- [ ] chaque asset figure dans `10-suivi-production-assets-phase-6.md` ;
- [ ] le nom final est strictement identique ;
- [ ] le format réel correspond ;
- [ ] les dimensions décodées correspondent ;
- [ ] la transparence correspond ;
- [ ] toute source M/S requise possède A et R, y compris sa source amont lorsqu’elle est dérivée ;
- [ ] tout asset cité comme dépendance ou fallback possède P et V avant son dépendant ;
- [ ] une création interne sans source canonique possède méthode, provenance et droits sans statut R artificiel ;
- [ ] un seul asset a été produit avant validation ;
- [ ] P correspond à un fichier contrôlé et versionné à la racine du dossier runtime ;
- [ ] la validation humaine est tracée ;
- [ ] V est distinct de I, réservé à la consommation réelle par l’application ;
- [ ] le prochain asset autorisé a été respecté ;
- [ ] aucun nouveau sous-dossier n’a été créé dans `public/assets/phase-6/` ;
- [ ] aucun fichier n’a été ajouté aux sous-dossiers hérités gelés ;
- [ ] aucun ZIP, Base64, fragment ou workflow de reconstruction ;
- [ ] les prototypes hérités ne sont pas comptés comme validés ;
- [ ] aucun prototype remplacé n’est supprimé avant contrôle des références.
- [ ] chaque contrôle CSS requis était spécifié avant le lot et est intégré avant fusion ;
- [ ] les planches du lot ont été produites après ses changements et validées avant fusion.

## Direction artistique

- [ ] l’univers est immédiatement reconnaissable ;
- [ ] le rendu est stylisé, ni photoréaliste ni cartoon ;
- [ ] le décor reste secondaire ;
- [ ] les matériaux suivent la bible ;
- [ ] la lumière reste cohérente ;
- [ ] les identités de projet sont plus colorées que le shell ;
- [ ] les détails décoratifs ne ressemblent pas à des contrôles ;
- [ ] aucune texture complexe sous un long texte ;
- [ ] les irrégularités ne déforment ni texte ni hitbox ;
- [ ] l’application reste cohérente sans ornements.

## Composants

- [ ] shell ;
- [ ] navigation ;
- [ ] statistiques ;
- [ ] cartes standard ;
- [ ] cartes compactes ;
- [ ] cartes liste ;
- [ ] badges ;
- [ ] panneaux ;
- [ ] recherche ;
- [ ] filtres ;
- [ ] états vides ;
- [ ] toasts ;
- [ ] modales ;
- [ ] chronologie ;
- [ ] paramètres.

Pour chaque composant traité :

- [ ] normal ;
- [ ] survol ;
- [ ] focus ;
- [ ] pressé ;
- [ ] désactivé ;
- [ ] erreur ;
- [ ] contenu long ;
- [ ] asset absent ;
- [ ] densité compacte ;
- [ ] mouvement réduit.

## Responsive

### 320 px

- [ ] aucune fonction perdue ;
- [ ] aucun scroll horizontal ;
- [ ] aucun cadre coupé ;
- [ ] cibles tactiles de 44 px.

### 390 px

- [ ] navigation basse utilisable ;
- [ ] cartes lisibles ;
- [ ] actions près du pouce ;
- [ ] ornements réduits.

### 768 px

- [ ] composition tablette portrait ;
- [ ] deux colonnes seulement lorsque possible ;
- [ ] panneaux secondaires dans le flux ;
- [ ] zoom 200 % sans perte.

### 1024 px

- [ ] tablette paysage confortable ;
- [ ] rail gauche compact ;
- [ ] zone centrale prioritaire ;
- [ ] safe areas contrôlées.

### 1440 px

- [ ] scène complète ;
- [ ] rail droit lisible ;
- [ ] grille stable ;
- [ ] longueurs de ligne limitées.

### 1920 px

- [ ] scène centrée ;
- [ ] fond prolongé sans étirer le contenu ;
- [ ] aucune carte ajoutée pour remplir ;
- [ ] aucune répétition visible.

## Accessibilité

- [ ] landmarks conservés ;
- [ ] un seul `h1` ;
- [ ] titres cohérents ;
- [ ] lien d’évitement ;
- [ ] clavier complet ;
- [ ] focus visible ;
- [ ] tabulation stable ;
- [ ] aucune zone cliquable imbriquée illégalement ;
- [ ] contrastes 4,5:1 et 3:1 ;
- [ ] états avec texte et icône ;
- [ ] images décoratives avec alt vide ;
- [ ] couvertures avec alt concis ;
- [ ] liens externes annoncés ;
- [ ] dates relatives avec date complète accessible ;
- [ ] VoiceOver ou équivalent ;
- [ ] modale avec fond inerte ;
- [ ] restauration du focus ;
- [ ] erreur annoncée ;
- [ ] zoom 200 % ;
- [ ] orientation libre ;
- [ ] contraste accru contrôlé.

## Mouvement

- [ ] aucune animation permanente ;
- [ ] aucune particule continue ;
- [ ] aucun clignotement ;
- [ ] aucune grande surface animée ;
- [ ] aucune animation ne bloque le clic ;
- [ ] durées conformes ;
- [ ] `transform` et `opacity` privilégiés ;
- [ ] focus stable ;
- [ ] mouvement réduit complet ;
- [ ] synchronisation compréhensible sans lueur.

## Assets

- [ ] identifiant documenté ;
- [ ] chemin plat et stable ;
- [ ] dimensions documentées ;
- [ ] poids documenté ;
- [ ] format justifié ;
- [ ] provenance documentée ;
- [ ] licence vérifiée si externe ;
- [ ] aucun script dans le SVG ;
- [ ] aucun texte fonctionnel rasterisé ;
- [ ] fallback testé ;
- [ ] lazy loading ;
- [ ] ratio réservé ;
- [ ] asset inutilisé retiré après remplacement ;
- [ ] aucune requête CDN.

## Performance

- [ ] poids CSS et JavaScript avant/après ;
- [ ] poids des nouveaux assets ;
- [ ] poids du shell critique ;
- [ ] requêtes initiales ;
- [ ] LCP ;
- [ ] CLS ;
- [ ] interaction depuis le cache ;
- [ ] cache froid et chaud ;
- [ ] réseau limité ;
- [ ] images bloquées ;
- [ ] lazy loading ;
- [ ] aucune couverture 960 dans une carte compacte ;
- [ ] aucune police inutile ;
- [ ] appareil moyen ;
- [ ] iPad réel lorsque disponible ;
- [ ] écart de budget approuvé.

## PWA et hors ligne

- [ ] shell hors ligne ;
- [ ] dernier snapshot visible ;
- [ ] assets critiques mis en cache ;
- [ ] absence d’asset non critique tolérée ;
- [ ] service worker contrôlé ;
- [ ] IndexedDB préservé ;
- [ ] installation iOS contrôlée ;
- [ ] version visible mise à jour.

## Fonctionnel non régressé

- [ ] synchronisation ;
- [ ] limite GitHub ;
- [ ] changement de profil ;
- [ ] dashboard ;
- [ ] catalogue ;
- [ ] recherche ;
- [ ] filtres ;
- [ ] favoris ;
- [ ] fiche directe ;
- [ ] détails ;
- [ ] activité ;
- [ ] paramètres ;
- [ ] diagnostic ;
- [ ] reset ciblé ;
- [ ] hors ligne ;
- [ ] renommage et alias.

## CI et revue

- [ ] `npm ci` ;
- [ ] TypeScript strict ;
- [ ] ESLint ;
- [ ] Vitest complet ;
- [ ] smoke test GitHub ;
- [ ] build Vite ;
- [ ] aucun test désactivé ;
- [ ] diff relu ;
- [ ] fichiers parasites absents ;
- [ ] dépendances justifiées ;
- [ ] revue Codex demandée ;
- [ ] fils interrogés ;
- [ ] P1 et P2 corrigés avec tests ;
- [ ] fils résolus ;
- [ ] seconde interrogation ;
- [ ] CI verte sur le SHA exact ;
- [ ] fusion verrouillée ;
- [ ] `main` contrôlé.

## No-Go final

No-Go si : donnée fictive, contraste bloquant, fonction perdue, fallback cassé, hors ligne dégradé, focus perdu, scroll horizontal, asset distant, secret, animation obligatoire, budget non approuvé, nom ou dimensions non conformes, nouveau sous-dossier runtime ou ajout dans l’exception héritée, prototype hérité utilisé, P1/P2 ouvert, CI non verte ou vue majeure non traitée.
