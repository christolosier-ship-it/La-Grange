# Sécurité

## Menaces principales

- jeton utilisateur exposé par une injection de script ;
- jeton envoyé à une origine non autorisée ;
- stockage persistant activé sans consentement ;
- jeton trop permissif ou sans expiration ;
- contenu GitHub traité comme HTML ;
- fuite dans les diagnostics, journaux ou caches ;
- dépendance client compromise.

## Modèle de privilèges

La consultation publique reste anonyme. La connexion facultative utilise un jeton personnel finement contrôlé fourni par l’utilisateur pour les lectures GitHub authentifiées.

La PWA ne contient jamais :

- jeton intégré au code ou au build ;
- clé privée GitHub App ;
- secret OAuth ;
- variable serveur ;
- capacité de mutation GitHub.

## Stockage du jeton

- `sessionStorage` par défaut ;
- `localStorage` uniquement avec « Mémoriser sur cet appareil » ;
- aucune copie dans IndexedDB ;
- aucune copie dans l’URL, le DOM, les logs ou les diagnostics ;
- champ de saisie de type `password` ;
- suppression des deux stockages à la déconnexion ;
- suppression après réponse GitHub `401` ;
- conservation lors d’une simple erreur réseau afin de permettre une nouvelle tentative.

## Réseau

- validation initiale par `GET https://api.github.com/user` ;
- ajout de `Authorization` seulement si l’origine cible est exactement `https://api.github.com` ;
- `credentials: omit` ;
- aucune redirection vers une API locale ;
- aucune méthode d’écriture ;
- données GitHub rendues comme texte ou attributs sûrs, jamais injectées comme HTML non contrôlé.

## Permissions recommandées

Le jeton finement contrôlé ne reçoit aucun droit supplémentaire : la lecture des ressources publiques suffit. Une date d’expiration est recommandée. Un jeton doté de droits d’écriture ne doit pas être utilisé dans La Grange.

## Personnalisation

La PWA ne publie aucune personnalisation. Les overrides et couvertures sont modifiés dans le dépôt, où les contrôles Git, la revue et le rollback restent disponibles.

## Contrôles avant release

- recherche de secrets ;
- inspection du bundle ;
- test sans jeton ;
- test avec jeton valide ;
- test de rejet `401` ;
- test garantissant l’absence d’en-tête sur une autre origine ;
- test de stockage de session et persistant ;
- audit des dépendances ;
- vérification CSP et absence de scripts distants ;
- contrôle qu’aucune route `/api/*` locale n’est appelée.
