# Checklist qualité de la Phase 6

## Usage

Cette checklist est complétée dans chaque PR visuelle avec les éléments applicables. La dernière PR de Phase 6 fournit une synthèse consolidée.

Un contrôle non exécuté est noté comme tel. Il ne doit jamais être marqué réussi par déduction.

## Périmètre

- [ ] la PR ne mélange pas une nouvelle fonction métier avec le visuel ;
- [ ] le périmètre correspond au lot Phase 6 annoncé ;
- [ ] les documents concernés sont à jour ;
- [ ] les écarts au prototype sont explicités ;
- [ ] les idées hors périmètre sont consignées sans être implémentées.

## Vérité des données

- [ ] aucune métrique fictive ;
- [ ] aucune progression inventée ;
- [ ] aucune version, release, branche ou conflit dessiné dans un asset ;
- [ ] aucune donnée réelle remplacée par une donnée de démonstration ;
- [ ] les placeholders de prototype ne sont pas présents en production ;
- [ ] les états sans donnée restent honnêtes.

## Direction artistique

- [ ] l’univers de La Grange est immédiatement reconnaissable ;
- [ ] le rendu est stylisé, ni photoréaliste ni cartoon ;
- [ ] le décor reste secondaire par rapport aux projets ;
- [ ] les matériaux suivent la bible visuelle ;
- [ ] la lumière reste cohérente ;
- [ ] les identités de projet peuvent être plus colorées que le shell ;
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
- [ ] panneaux secondaires ;
- [ ] recherche ;
- [ ] filtres ;
- [ ] états vides ;
- [ ] toasts ;
- [ ] modales ;
- [ ] chronologie ;
- [ ] paramètres.

Pour chaque composant traité :

- [ ] état normal ;
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
- [ ] aucun scroll horizontal global ;
- [ ] aucun cadre coupé ;
- [ ] cibles tactiles de 44 px minimum.

### 390 px

- [ ] navigation basse utilisable ;
- [ ] cartes lisibles ;
- [ ] actions près du pouce ;
- [ ] ornements réduits.

### 768 px

- [ ] composition tablette portrait ;
- [ ] deux colonnes seulement lorsque le contenu le permet ;
- [ ] panneaux secondaires dans le flux ;
- [ ] zoom 200 % sans perte.

### 1024 px

- [ ] tablette paysage confortable ;
- [ ] rail gauche compact ;
- [ ] zone centrale prioritaire ;
- [ ] safe areas contrôlées.

### 1440 px

- [ ] scène complète cohérente ;
- [ ] rail droit lisible ;
- [ ] grille de cartes stable ;
- [ ] lignes de texte limitées.

### 1920 px

- [ ] scène centrée ;
- [ ] fond prolongé sans agrandir excessivement le contenu ;
- [ ] aucune carte supplémentaire ajoutée uniquement pour remplir ;
- [ ] absence de répétition visible des textures.

## Accessibilité

- [ ] landmarks conservés ;
- [ ] un seul `h1` par vue ;
- [ ] ordre de titres cohérent ;
- [ ] lien d’évitement visible au focus ;
- [ ] navigation clavier complète ;
- [ ] focus visible sur toutes les textures ;
- [ ] ordre de tabulation stable ;
- [ ] aucune zone cliquable imbriquée illégalement ;
- [ ] textes normaux à 4,5:1 ;
- [ ] grands textes à 3:1 ;
- [ ] états avec texte et icône ;
- [ ] images décoratives avec alt vide ;
- [ ] couvertures informatives avec alt concis ;
- [ ] liens externes annoncés ;
- [ ] dates relatives avec date complète accessible ;
- [ ] VoiceOver iOS ou contrôle équivalent ;
- [ ] modale avec fond inerte ;
- [ ] restauration du focus après fermeture ;
- [ ] erreur annoncée dans la modale ;
- [ ] zoom 200 % ;
- [ ] orientation libre ;
- [ ] mode contraste accru contrôlé lorsque disponible.

## Mouvement

- [ ] aucune animation permanente ;
- [ ] aucune particule continue ;
- [ ] aucun clignotement ;
- [ ] aucune animation de grande surface ;
- [ ] aucune animation bloque le clic ;
- [ ] durée conforme aux tokens ;
- [ ] propriétés privilégiées : `transform` et `opacity` ;
- [ ] focus stable pendant les transitions ;
- [ ] mouvement réduit complet ;
- [ ] nouvelle arrivée non rejouée sans cause ;
- [ ] synchronisation compréhensible sans lueur.

## Assets

- [ ] asset inventorié ;
- [ ] chemin stable ;
- [ ] dimensions documentées ;
- [ ] poids documenté ;
- [ ] format justifié ;
- [ ] provenance documentée ;
- [ ] licence vérifiée si externe ;
- [ ] aucun script dans le SVG ;
- [ ] aucun texte fonctionnel rasterisé ;
- [ ] fallback testé ;
- [ ] lazy loading appliqué ;
- [ ] ratio réservé ;
- [ ] asset inutilisé supprimé ;
- [ ] aucune requête vers un CDN externe.

## Performance

- [ ] poids CSS avant et après ;
- [ ] poids JavaScript avant et après ;
- [ ] poids des nouveaux assets ;
- [ ] poids du shell critique ;
- [ ] nombre de requêtes initiales ;
- [ ] LCP mesuré ;
- [ ] CLS mesuré ;
- [ ] interaction possible depuis le cache ;
- [ ] cache froid ;
- [ ] cache chaud ;
- [ ] réseau limité ;
- [ ] images bloquées ;
- [ ] lazy loading vérifié ;
- [ ] aucune couverture 960 px dans une carte compacte ;
- [ ] aucune police ou graisse inutile ;
- [ ] test sur appareil moyen ;
- [ ] test iPad réel lorsque disponible ;
- [ ] écart de budget justifié.

## PWA et hors ligne

- [ ] shell disponible hors ligne ;
- [ ] dernier snapshot visible ;
- [ ] assets critiques mis en cache ;
- [ ] absence d’asset non critique tolérée ;
- [ ] mise à jour du service worker contrôlée ;
- [ ] données IndexedDB préservées ;
- [ ] installation iOS et navigateur compatible contrôlée ;
- [ ] version visible mise à jour lorsque le lot est publié.

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
- [ ] détails à la demande ;
- [ ] activité ;
- [ ] paramètres ;
- [ ] diagnostic ;
- [ ] reset ciblé ;
- [ ] mode hors ligne ;
- [ ] renommage et alias.

## CI

- [ ] `npm ci` ;
- [ ] TypeScript strict ;
- [ ] ESLint ;
- [ ] suite Vitest complète ;
- [ ] smoke test GitHub réel ;
- [ ] build Vite production ;
- [ ] aucun test désactivé pour faire passer la PR ;
- [ ] aucun avertissement bloquant.

## Revue

- [ ] diff complet relu ;
- [ ] fichiers parasites absents ;
- [ ] dépendances inchangées ou justifiées ;
- [ ] review Codex demandée ;
- [ ] review threads interrogés ;
- [ ] chaque P1 corrigé avec test ;
- [ ] chaque P2 corrigé avec test ;
- [ ] fils résolus formellement ;
- [ ] seconde interrogation des fils ;
- [ ] CI verte sur le SHA exact ;
- [ ] fusion verrouillée sur ce SHA ;
- [ ] `main` contrôlé après fusion.

## Go ou No-Go final

No-Go si une seule condition suivante est vraie :

- donnée fictive ;
- contraste bloquant ;
- fonction perdue ;
- fallback cassé ;
- mode hors ligne dégradé ;
- focus perdu ;
- scroll horizontal global ;
- asset distant requis ;
- secret ;
- animation obligatoire ;
- budget dépassé sans approbation ;
- P1 ou P2 ouvert ;
- CI non verte ;
- vue majeure non traitée.