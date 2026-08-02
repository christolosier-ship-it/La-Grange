# Connexion GitHub et personnalisation versionnée

## Objectif

Permettre à l’utilisateur de se connecter à GitHub directement depuis La Grange afin d’utiliser une synchronisation authentifiée, tout en réservant la personnalisation éditoriale aux comptes administrateurs autorisés.

## Principes validés

- bouton « Se connecter avec GitHub » dans l’application ;
- authentification réalisée sur le domaine officiel GitHub ;
- retour automatique dans La Grange après autorisation ;
- session GitHub limitée dans le temps et stockée en cookie `HttpOnly` chiffré ;
- aucune clé ni aucun jeton lisible par le JavaScript client ;
- lectures GitHub authentifiées via un proxy Netlify en liste blanche ;
- consultation publique anonyme conservée ;
- rôle administrateur séparé de la simple connexion GitHub ;
- modale ouverte depuis le cinquième bouton de la carte ;
- cinquième bouton toujours visible afin de conserver les cinq emplacements du skin ;
- création d’une PR réservée à une session administrateur authentifiée ;
- GitHub App limitée au dépôt `La-Grange` pour les écritures ;
- Netlify Functions pour les opérations privilégiées ;
- toute modification passe par une PR automatique ;
- fusion manuelle ;
- publication effective après déploiement et mise à jour PWA.

## Flux de connexion

```text
Se connecter avec GitHub
→ autorisation sur github.com
→ callback Netlify
→ lecture de l’identité GitHub
→ création d’une session chiffrée
→ retour dans La Grange
→ synchronisation forcée
→ lectures GitHub authentifiées
```

La session expose uniquement au client :

- l’état connecté ou non connecté ;
- le login GitHub ;
- le statut administrateur.

Le jeton OAuth reste contenu dans le cookie chiffré `HttpOnly`. Il n’est jamais renvoyé par `/api/admin/session`, écrit dans IndexedDB ou placé dans les diagnostics.

## Proxy de lecture GitHub

Le proxy `/api/github/*` n’accepte que des requêtes `GET` sur les ressources nécessaires :

- liste des dépôts publics d’un profil ;
- commits récents d’un dépôt ;
- liste et dernière release ;
- README.

Les routes, segments et paramètres de requête sont validés par liste blanche avant tout appel à GitHub. Les en-têtes de quota, d’ETag et de pagination utiles sont retransmis au navigateur.

En l’absence de session, les clients continuent à lire directement l’API GitHub publique. Après connexion, ils basculent automatiquement vers le proxy same-origin et relancent la synchronisation.

## Champs de la modale

- couverture ;
- style ;
- couleur principale ;
- couleur secondaire ;
- couleur de progression ;
- avancement manuel ;
- version manuelle.

La modale montre un aperçu fidèle de la carte.

## Styles

Neuf valeurs :

| Clé | Libellé |
|---|---|
| `lifestyle` | Style de vie |
| `games` | Jeux |
| `productivity` | Productivité |
| `health` | Santé |
| `education` | Éducation |
| `nature` | Nature |
| `creation` | Création |
| `technical` | Technique et métier |
| `uncategorized` | Inclassable |

Chaque style fournit une icône locale, un marqueur HTML/CSS et trois couleurs par défaut. Aucune bannière raster dédiée n’est utilisée.

## Traitement de couverture

1. sélection PNG, JPEG ou WebP ;
2. aperçu et recadrage 8:5 ;
3. envoi sécurisé ;
4. validation des octets et dimensions ;
5. suppression des métadonnées ;
6. encodage WebP 640 × 400 ;
7. contrôle du budget ;
8. écriture sous le nom canonique ;
9. remplacement de la référence dans les overrides.

## Cycle de publication

```text
Enregistrer et publier
→ validation
→ vérification du rôle administrateur
→ branche créée
→ commit créé
→ PR ouverte
→ lien affiché
→ fusion manuelle
→ déploiement
→ mise à jour disponible
```

Le formulaire reste disponible après un échec. Aucune fausse confirmation « publié » n’est affichée avant le déploiement.

## États UX

- session GitHub en vérification ;
- non connecté ;
- authentification en cours ;
- compte GitHub connecté ;
- compte GitHub connecté avec droits administrateur ;
- validation locale ;
- upload ;
- création de PR ;
- PR créée ;
- conflit avec `main` ;
- session expirée ;
- limite GitHub atteinte ;
- erreur récupérable ;
- hors ligne.

## Critères d’acceptation

- un visiteur peut consulter les données publiques sans connexion ;
- un utilisateur peut lancer la connexion depuis La Grange et revenir automatiquement dans l’application ;
- la synchronisation suivante utilise la session authentifiée ;
- le jeton OAuth n’est jamais accessible au code client ;
- un compte connecté non administrateur ne peut pas créer de PR ;
- un administrateur voit les cinq actions et peut ouvrir la modale ;
- seuls les fichiers autorisés changent ;
- une PR est créée sans fusion ;
- une couverture non conforme est refusée ;
- un conflit ne détruit aucune modification ;
- la déconnexion détruit la session ;
- après fusion et déploiement, tous les appareils affichent la même personnalisation.
