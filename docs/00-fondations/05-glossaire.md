# Glossaire

- **Projet** : représentation enrichie d’un dépôt GitHub dans La Grange.
- **Dépôt** : repository GitHub brut.
- **Caisse** : métaphore visuelle d’une carte projet, notamment pour un nouvel arrivage.
- **Override** : donnée éditoriale locale qui complète GitHub sans modifier le dépôt source.
- **Instantané** : ensemble cohérent des projets stocké dans IndexedDB.
- **Synchronisation** : récupération, transformation, comparaison et sauvegarde des données GitHub.
- **Nouvelle arrivée** : dépôt dont l’identifiant n’existait pas dans l’instantané précédent.
- **Activité récente** : activité estimée à partir de `pushed_at`, `updated_at` et des données détaillées éventuellement chargées.
- **En sommeil** : projet sans activité récente selon les seuils documentés.
- **Prêt à partir** : projet disposant d’une URL d’application exploitable.
- **Établi** : regroupement des projets récemment actifs.
- **Grenier** : regroupement éditorial de projets peu actifs ou en attente, sans notion de tâche.
- **Mode dégradé** : fonctionnement sur cache lorsque le réseau ou GitHub est indisponible.
