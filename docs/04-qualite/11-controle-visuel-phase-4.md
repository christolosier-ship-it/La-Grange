# Contrôle visuel — Phase 4 Catalogue et fiche projet

## Référence

La Phase 4 conserve l’atelier sombre et chaleureux validé en Phase 3. Le catalogue devient l’inventaire complet et la fiche ouvre une caisse sans perdre le contexte de recherche. Les couvertures éditoriales finales restent planifiées en Phase 6 ; les fallbacks déterministes doivent donc être pleinement utilisables.

## Catalogue par format

### Smartphone — 390 px

- une carte par ligne en grille ;
- mode liste avec visuel compact et contenu sans débordement ;
- recherche sur toute la largeur avec bouton Effacer séparé ;
- filtres d’état repliés naturellement sur plusieurs lignes ;
- selects et actions d’au moins 44 px ;
- navigation principale basse conservée ;
- aucun défilement horizontal global.

### Tablette portrait — 768 px

- rail principal à gauche ;
- deux cartes par ligne ;
- commandes secondaires sur deux colonnes ;
- compteur et résultats visibles sans masquer la recherche ;
- liste suffisamment large pour afficher description et métadonnées.

### Tablette paysage — 1024 px

- deux cartes confortables par ligne ;
- filtres, tri, favoris et mode d’affichage accessibles sans menu caché ;
- recherche instantanée sans remplacement complet de la page ;
- focus conservé lors des mises à jour du store.

### Bureau — 1440 px et plus

- trois cartes par ligne, quatre à partir de 1472 px environ ;
- largeur maximale du shell conservée ;
- champs et contrôles alignés sans lignes de texte excessivement longues.

## Fiche projet par format

### Smartphone — 390 px

- illustration, identité, description, badges et actions en colonne ;
- actions externes repliées sans chevauchement ;
- métadonnées en définition lisible ;
- détails à la demande après la fiche de base ;
- retour catalogue visible avant le hero.

### Tablette — 768 à 1024 px

- hero en deux colonnes ;
- logo superposé à l’illustration sans masquer le titre ;
- détails récents sur deux colonnes ;
- métadonnées replacées sous le contenu avant le seuil bureau.

### Bureau — 1440 px et plus

- contenu principal et rail de métadonnées ;
- rail sticky sans dépasser le viewport ;
- trois groupes de détails sur une ligne lorsque l’espace le permet.

## États contrôlés

- inventaire indisponible au premier chargement ;
- catalogue vide ;
- recherche sans résultat et réinitialisation ;
- combinaison état, catégorie, langage et favoris ;
- grille et liste ;
- nom très long ;
- description absente ;
- projet archivé ;
- URL d’application absente ;
- couverture ou logo absent ou en erreur ;
- fiche directe par hash ;
- ancienne URL après renommage ;
- retour vers un catalogue filtré ;
- détails non chargés ;
- cache de détails frais ;
- chargement avec cache visible ;
- erreur GitHub avec et sans cache ;
- erreur IndexedDB après réponse réseau valide ;
- hors ligne avec et sans détails locaux ;
- absence de commits, release ou README ;
- limite GitHub.

## Accessibilité et mouvement

- un seul `h1` par vue ;
- boutons de filtre et favoris avec `aria-pressed` ;
- compteur de résultats avec `aria-live` ;
- dates relatives complétées par des dates absolues ;
- liens externes annoncés comme nouvel onglet et connexion requise hors ligne ;
- navigation clavier visible ;
- aucun état porté par la couleur seule ;
- transitions existantes neutralisées par `prefers-reduced-motion`.

## Preuves automatisées

- `catalogue-model.test.ts` : recherche, filtres, tris et URL ;
- `catalogue-view.test.ts` : interactions, état vide, favoris, mode hors ligne et contexte de fiche ;
- `project-detail-view.test.ts` : fiche complète, archives, liens absents, détails, erreurs, hors ligne et retour ;
- `project-detail-service.test.ts` : cache, fraîcheur, concurrence et dégradation ;
- `detail-client.test.ts` : trois endpoints ciblés, requêtes simples, formats et limite ;
- `router.integration.test.ts` : hash direct, contexte, focus et alias de renommage ;
- `live-smoke.test.ts` : inventaire et détails réels de `La-Grange`.

## Limite du contrôle

Aucune capture Playwright n’est produite par le pipeline actuel. Le contrôle responsive repose sur les règles CSS, les tests DOM et la revue manuelle des seuils. L’ajout d’un navigateur E2E automatisé reste une amélioration qualité future, pas une dette fonctionnelle de la Phase 4.
