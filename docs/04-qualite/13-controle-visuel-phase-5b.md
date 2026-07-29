# Contrôle visuel — Phase 5B Paramètres

## Périmètre

Vue `#/settings`, préférences appliquées aux autres vues, confirmations, diagnostic et états de cache. Aucun polissage graphique de Phase 6.

## Formats contrôlés

### 390 px — mobile

- panneaux en colonne unique ;
- champs et listes sans débordement ;
- actions de confirmation repliables ;
- diagnostic défilable et sélectionnable ;
- navigation basse conservée ;
- favoris longs cassés proprement.

### 768 px — tablette portrait

- grille de deux panneaux lorsque l’espace le permet ;
- labels et listes de définition lisibles ;
- modale centrée sans dépasser le viewport ;
- rail de navigation existant conservé.

### 1024 px — tablette paysage

- panneaux équilibrés en deux colonnes ;
- diagnostic sur toute la largeur ;
- densité compacte visible sans réduire les cibles interactives sous 44 px.

### 1440 px — bureau

- largeur du shell et hiérarchie existantes respectées ;
- aucune colonne supplémentaire non documentée ;
- lignes de diagnostic et favoris lisibles sans étirement excessif.

## États contrôlés

- préférences par défaut ;
- migration Phase 4 ;
- préférence invalide réparée ;
- profil identique ;
- nom de profil invalide ;
- changement confirmé et annulé ;
- nouveau profil avec cache ;
- nouveau profil sans cache et erreur réseau ;
- mode hors ligne ;
- IndexedDB disponible et indisponible ;
- favoris présents, vides et indisponibles ;
- reset annulé, réussi et échoué ;
- Clipboard API disponible et refusée ;
- densité compacte ;
- mouvement réduit utilisateur et système ;
- listes où tous les projets sont masqués ;
- fiche directe d’un fork ou d’une archive masquée.

## Accessibilité

- un seul `h1` ;
- labels explicites pour chaque champ ;
- validation avec `aria-invalid` et message d’alerte ;
- confirmations avec `role="dialog"`, `aria-modal`, titre et description ;
- focus initial sur Annuler ;
- focus piégé, fermeture Échap et restitution au déclencheur ;
- boutons destructifs nommés précisément ;
- feedback de copie et maintenance via `role="status"` ;
- erreur locale bloquante via `role="alert"` ;
- aucune information portée uniquement par la couleur ;
- fiche directe conservée lorsque le projet est masqué des listes.

## Mouvement et densité

La densité est portée par `data-density` sur la racine. Le mouvement effectif est porté par `data-reduce-motion` et vaut vrai si l’utilisateur ou le système demande une réduction. Les animations et transitions sont alors ramenées à une durée quasi nulle.

## Contrôles automatisés

- migration, validation et réparation des préférences ;
- sélection forks et archives ;
- coordinateur de profils et reconstruction après reset ;
- plan de suppression ciblé ;
- diagnostic sans donnée sensible ;
- Clipboard API ;
- modale et focus ;
- interactions de la vue Paramètres ;
- visibilité catalogue et accès direct aux fiches ;
- store, TypeScript strict, ESLint, suite Vitest, smoke GitHub réel et build.

## Limite

Le pipeline actuel ne produit pas de captures multi-viewport automatisées. Le contrôle repose sur les règles responsive, les tests DOM et la revue statique. Une automatisation navigateur visuelle reste recommandée pour la Phase 7.
