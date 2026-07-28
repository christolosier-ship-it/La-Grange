# Règles métier

## Identité

- l’identifiant GitHub numérique est la clé stable ;
- le nom de dépôt sert de slug lisible ;
- un changement de nom ne doit pas créer un doublon ;
- un override inconnu est ignoré avec avertissement de développement.

## Nouveaux dépôts

- un dépôt absent du précédent instantané est marqué `isNew` ;
- ce marqueur disparaît après ouverture de sa fiche ou acquittement explicite ;
- le premier import complet ne marque pas tous les dépôts comme nouveaux.

## Activité

Seuil initial configurable :

- actif : activité dans les 30 derniers jours ;
- maintenance : de 31 à 180 jours ;
- en sommeil : au-delà de 180 jours ;
- archivé : le drapeau GitHub prime sur les dates.

Ces états mesurent l’activité constatée, jamais la qualité ni l’avancement.

## Publication

Un projet est « prêt à partir » si `homepage` ou un override `appUrl` contient une URL HTTPS valide.

## Fallback visuel

Sans couverture, la carte utilise un fond déterministe, des initiales et un pictogramme générique. Aucun projet ne doit disparaître pour manque d’asset.

## Suppression

Un dépôt disparu de l’API n’est retiré qu’après une synchronisation complète réussie. Une réponse partielle ou en erreur ne peut pas déclencher sa suppression.
