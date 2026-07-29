# Suivi de production des assets de la Phase 6

## Statut

Registre actif de production graphique.

Dernière mise à jour : 2026-07-29.

Ce document suit les assets depuis le master artistique jusqu'à l'intégration. Il ne remplace ni la bible visuelle ni l'inventaire technique :

- `docs/02-ux-ui/10-bible-visuelle-phase-6.md` définit la direction ;
- `docs/02-ux-ui/11-inventaire-assets-phase-6.md` définit les formats, budgets et fallbacks ;
- le présent fichier indique ce qui est produit, validé, préparé et intégré.

## Règles de suivi

- une case n'est cochée qu'après contrôle réel du livrable concerné ;
- un master artistique validé n'est pas automatiquement prêt pour le runtime ;
- les textes fonctionnels restent en HTML, sauf l'identité de marque explicitement approuvée ;
- les cadres adaptables privilégient SVG, CSS, masques ou découpes transparentes ;
- les couvertures de projets ne contiennent ni version, ni progression, ni statut, ni bouton ;
- chaque raster final est recadré, nettoyé, redimensionné et compressé ;
- aucun asset n'est copié dans `public/` avant validation humaine du lot ;
- GitHub reste la source de vérité de la production et de l'intégration ;
- le suivi doit être mis à jour après chaque lot produit ou rejeté.

## Légende

- `[x]` : livrable produit et validé pour l'étape indiquée ;
- `[ ]` : livrable restant à produire, corriger ou valider ;
- **Master** : image de direction artistique, pas nécessairement utilisable telle quelle ;
- **Production** : asset nettoyé, découpé, dimensionné et compressé ;
- **Intégration** : asset copié dans une branche GitHub et raccordé au code.

## Priorités

- **P0** : indispensable au shell ou à la première PR visuelle ;
- **P1** : indispensable aux cartes, vues principales ou projets mis en avant ;
- **P2** : nécessaire à la cohérence complète de l'application ;
- **P3** : ornement ou enrichissement facultatif.

---

# 1. Masters artistiques validés

Ces cinq éléments fixent la direction. Ils restent hors du dépôt de production tant que leurs exports techniques ne sont pas prêts.

- [x] **M01 | P0 | Enseigne La Grange** : bois sculpté, corde, attaches, lettrage de marque.
- [x] **M02 | P0 | Fond d'atelier** : grange-atelier nocturne, charpente, établis et lumière ambrée.
- [x] **M03 | P0 | Cadre de carte vide** : cadre vertical en bois, ruban, zones de contenu et commandes.
- [x] **M04 | P1 | Carte Gargotte complète** : master de composition et de niveau de finition.
- [x] **M05 | P0 | Panneau de bienvenue** : papier suspendu, dessin de grange et notes épinglées.

Décision associée : ces masters sont approuvés comme base de direction, mais ne sont pas déclarés prêts pour l'intégration.

---

# 2. Identité de marque et icônes d'application

## 2.1 Enseigne et marque

- [ ] **A01 | P0 | Enseigne large détourée** : master nettoyé, fond transparent, largeur de production 1600 px.
- [ ] **A02 | P0 | Enseigne moyenne détourée** : variante 800 px pour tablette et écrans intermédiaires.
- [ ] **A03 | P0 | Enseigne compacte** : composition raccourcie pour mobile, sans perdre la lisibilité de la marque.
- [ ] **A04 | P1 | Symbole carré La Grange** : marque sans sous-titre pour navigation compacte et raccourcis.
- [ ] **A05 | P2 | Variante monochrome claire** : SVG ou masque pour fond sombre.
- [ ] **A06 | P2 | Variante monochrome sombre** : SVG ou masque pour fond clair.

## 2.2 Favicon et PWA

- [ ] **A07 | P2 | Favicon 32 x 32**.
- [ ] **A08 | P2 | Favicon 48 x 48**.
- [ ] **A09 | P2 | Icône PWA 192 x 192**.
- [ ] **A10 | P2 | Icône PWA 512 x 512**.
- [ ] **A11 | P2 | Icône maskable 512 x 512** : safe area contrôlée.
- [ ] **A12 | P2 | Icône Apple touch** : format adapté à Safari iOS et iPadOS.

---

# 3. Fond, matières et lumière du shell

## 3.1 Fond d'atelier

- [ ] **B01 | P0 | Fond desktop large** : 2048 px minimum, recadrable, sans information fonctionnelle.
- [ ] **B02 | P0 | Cadrage tablette paysage** : 1024 à 1366 px, centre de lecture préservé.
- [ ] **B03 | P0 | Cadrage tablette portrait** : rails transformables en flux.
- [ ] **B04 | P0 | Cadrage mobile vertical** : établi compact, décor allégé, 390 px de référence.
- [ ] **B05 | P2 | Variante faible densité** : décor simplifié pour mobile étroit ou économie de données.
- [ ] **B06 | P2 | Fallback sans image documenté** : gradients et couleurs uniquement.

## 3.2 Matières répétables

- [ ] **B07 | P0 | Texture bois structurel** : tuile 1024 px, raccord invisible, veinage peu contrasté.
- [ ] **B08 | P0 | Texture bois de caisse** : tuile 1024 px, légèrement plus claire que la charpente.
- [ ] **B09 | P1 | Texture papier calme** : tuile 512 px, très faible bruit derrière le texte.
- [ ] **B10 | P1 | Texture métal sombre** : tuile ou bande 512 px, sans chrome brillant.
- [ ] **B11 | P2 | Texture verre sombre** : reflet discret, surface de lecture stable.

## 3.3 Lumière

- [ ] **B12 | P0 | Masque de lumière principal** : halo ambré transparent pour le shell.
- [ ] **B13 | P1 | Halo local de synchronisation** : petit masque, sans animation permanente.
- [ ] **B14 | P1 | Halo local de nouvelle arrivée** : accent temporaire, non clignotant.
- [ ] **B15 | P2 | Masque d'ombre structurelle** : profondeur des poutres sans couvrir le contenu.

---

# 4. Cadres et surfaces réutilisables

Les exports de cette section ne doivent contenir aucun texte fonctionnel.

## 4.1 Cartes projets

- [ ] **C01 | P0 | Cadre de carte standard** : transparent, extensible ou découpable, ratio catalogue.
- [ ] **C02 | P0 | Cadre de carte compacte** : dashboard, favoris et applications disponibles.
- [ ] **C03 | P1 | Cadre de carte mise en avant** : projet principal ou nouvelle arrivée.
- [ ] **C04 | P1 | Cadre de carte liste** : variante horizontale.
- [ ] **C05 | P1 | Cadre archivé** : même structure, traitement atténué par CSS privilégié.
- [ ] **C06 | P1 | Ruban de catégorie neutre** : recolorable par CSS ou masque.
- [ ] **C07 | P1 | Ruban de nouvelle arrivée** : forme dédiée, sans texte rasterisé.
- [ ] **C08 | P1 | Étiquette de statut neutre** : active, publiée, prototype ou archive via texte HTML.
- [ ] **C09 | P1 | Emplacement de métadonnées** : séparateur ou rail décoratif réutilisable.
- [ ] **C10 | P1 | Rail d'actions inférieur** : quatre emplacements maximum, sans icônes intégrées.

## 4.2 Panneaux et sections

- [ ] **C11 | P0 | Poutre supérieure de statistiques** : quatre cellules maximum.
- [ ] **C12 | P0 | Poutre de titre de section** : titre HTML et lien secondaire conservés hors image.
- [ ] **C13 | P0 | Cadre de panneau bois secondaire** : navigation, filtres ou résumé.
- [ ] **C14 | P1 | Cadre de panneau verre sombre** : activité et données techniques.
- [ ] **C15 | P1 | Cadre de note papier vide** : aide, état vide ou message éditorial.
- [ ] **C16 | P0 | Panneau de bienvenue sans texte** : dérivé technique de M05.
- [ ] **C17 | P1 | Emplacement vide** : ajout ou absence de projet sans faux bouton.
- [ ] **C18 | P1 | Couverture fallback générique** : fond déterministe, initiales en HTML et pictogramme de caisse.
- [ ] **C19 | P2 | Cadre de modale** : compatible avec un overlay accessible.
- [ ] **C20 | P2 | Cadre de toast** : léger, temporaire, lisible sur le shell.
- [ ] **C21 | P2 | Panneau de diagnostic** : papier ou verre calme, texte sélectionnable.

## 4.3 Contrôles visuels

- [ ] **C22 | P1 | Plaque de bouton principal** : forme adaptable, texte HTML.
- [ ] **C23 | P1 | Plaque de bouton secondaire** : métal sombre, texte HTML.
- [ ] **C24 | P1 | Plaque destructive** : traitement danger limité, texte HTML.
- [ ] **C25 | P1 | Encart de champ de recherche** : le champ natif reste visible.
- [ ] **C26 | P1 | Étiquette de filtre** : état pressé et `aria-pressed` gérés en code.
- [ ] **C27 | P2 | Séparateur métallique horizontal**.
- [ ] **C28 | P2 | Séparateur métallique vertical**.
- [ ] **C29 | P2 | Anneau de focus décoratif** : complément visuel, jamais seul indicateur de focus.

---

# 5. Iconographie fonctionnelle

Toutes les icônes sont locales, en SVG, avec un `viewBox` cohérent et `currentColor` lorsque possible.

## 5.1 Navigation

- [ ] **D01 | P0 | Vue d'ensemble**.
- [ ] **D02 | P0 | Catalogue ou projets**.
- [ ] **D03 | P0 | Activité**.
- [ ] **D04 | P0 | Paramètres**.

## 5.2 Actions

- [ ] **D05 | P0 | Synchroniser ou actualiser**.
- [ ] **D06 | P1 | GitHub** : marque officielle ou traitement conforme.
- [ ] **D07 | P1 | Ouvrir l'application**.
- [ ] **D08 | P1 | Lien externe**.
- [ ] **D09 | P1 | Favori vide et rempli**.
- [ ] **D10 | P1 | Recherche**.
- [ ] **D11 | P1 | Filtrer**.
- [ ] **D12 | P1 | Trier**.
- [ ] **D13 | P1 | Vue grille**.
- [ ] **D14 | P1 | Vue liste**.
- [ ] **D15 | P1 | Copier**.
- [ ] **D16 | P1 | Réinitialiser ou supprimer le cache**.
- [ ] **D17 | P1 | Retour**.
- [ ] **D18 | P1 | Fermer**.
- [ ] **D19 | P2 | Plus d'actions**.
- [ ] **D20 | P2 | Ouvrir les détails**.

## 5.3 États et données

- [ ] **D21 | P0 | En ligne**.
- [ ] **D22 | P0 | Hors ligne**.
- [ ] **D23 | P0 | Synchronisation en cours**.
- [ ] **D24 | P0 | Succès**.
- [ ] **D25 | P0 | Avertissement**.
- [ ] **D26 | P0 | Erreur**.
- [ ] **D27 | P1 | Nouveau projet**.
- [ ] **D28 | P1 | Projet archivé**.
- [ ] **D29 | P1 | Fork**.
- [ ] **D30 | P1 | Application disponible**.
- [ ] **D31 | P1 | Dépôt uniquement**.
- [ ] **D32 | P1 | Cache local**.
- [ ] **D33 | P1 | Date ou calendrier**.
- [ ] **D34 | P1 | Horloge ou activité récente**.
- [ ] **D35 | P1 | Version ou release**.
- [ ] **D36 | P1 | Langage ou code**.
- [ ] **D37 | P1 | Branche**.
- [ ] **D38 | P1 | Pull request**.
- [ ] **D39 | P1 | Conflit ou protection**.
- [ ] **D40 | P2 | Dépôt renommé**.
- [ ] **D41 | P2 | URL d'application modifiée**.

---

# 6. Ornements décoratifs

Ces assets sont facultatifs, `aria-hidden`, sans pointer event et supprimables sur mobile.

- [ ] **E01 | P2 | Lampe suspendue** : version détourée et halo séparé.
- [ ] **E02 | P2 | Corde d'enseigne** : segment et angles réutilisables.
- [ ] **E03 | P2 | Jeu de vis et boulons** : plusieurs orientations cohérentes.
- [ ] **E04 | P2 | Clous et punaises** : papier et petites attaches.
- [ ] **E05 | P3 | Tasse La Grange**.
- [ ] **E06 | P3 | Petite plante en pot**.
- [ ] **E07 | P3 | Clé ou grande clé plate**.
- [ ] **E08 | P3 | Carnet, plan ou feuille d'idées**.
- [ ] **E09 | P3 | Feuilles et petites pousses**.
- [ ] **E10 | P3 | Caisse ou coffre d'atelier**.
- [ ] **E11 | P3 | Petite fiole ou élément laboratoire**.
- [ ] **E12 | P3 | Outil ou symbole d'établi**.

---

# 7. Couvertures et identités de projets

## Règles communes

Pour chaque projet retenu :

- couverture master sans texte fonctionnel ;
- export catalogue environ 640 x 400 px ;
- export fiche environ 960 x 600 px si nécessaire ;
- logo ou mot-symbole séparé lorsque pertinent ;
- couleur d'accent documentée ;
- fallback contrôlé lorsque l'asset est absent.

La liste ci-dessous correspond aux 18 dépôts publics détectés le 2026-07-29. Un dépôt masqué par les préférences peut conserver uniquement le fallback jusqu'à ce qu'il redevienne prioritaire.

## 7.1 Priorité P0 : projets mis en avant

### F01 | Gargotte Adventure

- [ ] Couverture standalone dérivée de l'univers de M04, sans interface ni texte.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F02 | Les Petites Quêtes

- [ ] Couverture master : monde nocturne, luciole et ambiance enfantine maîtrisée.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F03 | BibiLeaf

- [ ] Couverture master : serre végétale et lumière verte chaude.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F04 | Agripine

- [ ] Couverture master : petit robot violet dans une chambre technique ou capsule.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F05 | Luma

- [ ] Couverture master : luciole médicinale, lumière douce, univers rassurant.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F06 | Tracker Habit

- [ ] Couverture master : discipline, croissance et personnage du tracker.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F07 | ZythoHunt

- [ ] Couverture master : chope, mousse et univers de découverte brassicole.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

### F08 | MaintBoard V3

- [ ] Couverture master : maintenance, outil, établi et ambiance industrielle.
- [ ] Export 640 px.
- [ ] Export 960 px.
- [ ] Logo ou mot-symbole séparé.
- [ ] Accent et fallback validés.

## 7.2 Priorité P1 : autres applications personnelles

### F09 | CadeauScope

- [ ] Couverture master.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

### F10 | GargoGen

- [ ] Couverture master.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

### F11 | Tiny Universe

- [ ] Couverture master.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

### F12 | TeissAI

- [ ] Couverture master.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

### F13 | DermIA Quantum

- [ ] Couverture master.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

### F14 | Casse-latte Simulator 2026

- [ ] Couverture master.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

## 7.3 Priorité P2 : dépôts techniques, doublons ou apprentissage

### F15 | Gargotte V5

- [ ] Décider si la couverture est distincte ou partagée avec l'univers Gargotte.
- [ ] Produire les exports retenus.
- [ ] Accent et fallback.

### F16 | PQ-

- [ ] Identifier le rôle éditorial du dépôt.
- [ ] Produire une couverture dédiée ou appliquer le fallback.
- [ ] Accent et fallback.

### F17 | AI Agents for Beginners

- [ ] Vérifier le statut de fork et sa visibilité effective.
- [ ] Produire une couverture dédiée uniquement si le dépôt reste visible.
- [ ] Accent et fallback.

### F18 | La Grange

- [ ] Couverture auto-référentielle cohérente avec la marque.
- [ ] Exports 640 et 960 px.
- [ ] Logo ou mot-symbole.
- [ ] Accent et fallback.

---

# 8. Planches de validation avant intégration

Ces compositions ne sont pas servies par l'application. Elles permettent de valider les assets ensemble avant de toucher au code.

- [ ] **G01 | P0 | Dashboard desktop 1440 px** : shell complet avec données clairement identifiées comme maquette.
- [ ] **G02 | P0 | Dashboard tablette 1024 px**.
- [ ] **G03 | P0 | Dashboard mobile 390 px**.
- [ ] **G04 | P1 | Catalogue desktop et mobile**.
- [ ] **G05 | P1 | Fiche projet desktop et mobile**.
- [ ] **G06 | P1 | Activité desktop et mobile**.
- [ ] **G07 | P1 | Paramètres desktop et mobile**.
- [ ] **G08 | P1 | Galerie de composants et de tous leurs états**.
- [ ] **G09 | P1 | Application sans images** : tous les fallbacks visibles.
- [ ] **G10 | P1 | Noms et descriptions très longs**.
- [ ] **G11 | P1 | Zoom 200 %**.
- [ ] **G12 | P1 | Densité compacte**.
- [ ] **G13 | P1 | Mouvement réduit** : états finaux sans dépendance à l'animation.
- [ ] **G14 | P2 | Éclairage faible et fort** : contraste contrôlé dans les deux cas.

---

# 9. Typographie et lettrage

Les fichiers de police ne sont jamais produits ou ajoutés avant vérification de la licence.

- [ ] **H01 | P0 | Lettrage de marque** : décider entre asset illustré, tracé SVG ou police locale licenciée.
- [ ] **H02 | P0 | Titres de sections** : serif robuste choisie et testée.
- [ ] **H03 | P0 | Corps d'interface** : sans-serif lisible choisie et testée.
- [ ] **H04 | P2 | Notes éditoriales** : manuscrite facultative, jamais fonctionnelle.
- [ ] **H05 | P1 | Fallbacks système** documentés.
- [ ] **H06 | P1 | Contrastes et rendu Retina** contrôlés.

---

# 10. Préparation technique des assets

Cette section commence après validation visuelle des masters concernés.

- [ ] **T01 | P0 | Détourage et nettoyage** de tous les assets transparents.
- [ ] **T02 | P0 | Suppression de tout texte fonctionnel** des cadres, panneaux et couvertures.
- [ ] **T03 | P0 | Recadrage et dimensions finales** conformes au manifest.
- [ ] **T04 | P0 | Compression AVIF ou WebP** selon le support cible.
- [ ] **T05 | P0 | Optimisation SVG** et suppression de tout script.
- [ ] **T06 | P0 | Vérification des poids** face aux budgets Phase 6.
- [ ] **T07 | P0 | Contrôle des raccords** des textures répétables.
- [ ] **T08 | P0 | Contrôle des fallbacks** lorsque les images sont bloquées.
- [ ] **T09 | P1 | Contrôle fond sombre et fond lumineux**.
- [ ] **T10 | P1 | Contrôle zoom 200 % et densité compacte**.
- [ ] **T11 | P1 | Manifest final** : chemin, rôle, dimensions, poids, source, fallback et chargement.
- [ ] **T12 | P1 | Audit des assets inutilisés** avant intégration.

---

# 11. Intégration GitHub

Cette étape reste volontairement non commencée pendant la production artistique.

- [ ] **I01 | PR 6A | Identité, matières, shell, navigation et focus**.
- [ ] **I02 | PR 6B | Cartes, statistiques, panneaux et premiers projets**.
- [ ] **I03 | PR 6C | Dashboard et catalogue**.
- [ ] **I04 | PR 6D | Fiches, activité et paramètres**.
- [ ] **I05 | PR 6E | Mouvement, assets finaux et optimisation**.
- [ ] **I06 | PR 6F éventuelle | Corrections P1 et P2 uniquement**.

Pour chaque PR d'intégration : CI complète, revue des budgets, contrôle responsive, contrôle hors ligne, revue Codex, interrogation réelle des fils et verrouillage sur le SHA validé.

---

# 12. Ordre de production recommandé

1. exports techniques des cinq masters validés ;
2. matières, lumière et cadres P0 ;
3. iconographie P0 ;
4. huit couvertures de projets prioritaires ;
5. planches dashboard desktop, tablette et mobile ;
6. cadres et icônes P1 ;
7. autres couvertures P1 ;
8. fallbacks et états sans image ;
9. ornements P2 et P3 uniquement si la composition reste lisible ;
10. préparation technique et manifest ;
11. intégration GitHub par PR séparées.

## Prochain lot

Produire les exports de production issus de M01 à M05 :

- enseigne détourée et variantes ;
- fond desktop, tablette et mobile ;
- cadre de carte standard sans contenu ;
- couverture Gargotte standalone et logo séparé ;
- panneau de bienvenue sans texte fonctionnel.
