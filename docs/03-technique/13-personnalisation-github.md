# Connexion GitHub et personnalisation versionnée

## Objectif

Permettre une synchronisation GitHub authentifiée depuis la PWA statique tout en conservant GitHub Pages comme unique hébergement. La personnalisation éditoriale reste versionnée dans le dépôt, mais n’est plus publiée automatiquement depuis l’application.

## Principes validés

- consultation publique disponible sans connexion ;
- bouton **Connecter GitHub** dans le rail ;
- jeton personnel finement contrôlé créé par l’utilisateur ;
- aucune permission supplémentaire nécessaire pour lire les dépôts publics ;
- validation du jeton par l’API GitHub ;
- stockage de session par défaut ;
- mémorisation sur l’appareil uniquement sur choix explicite ;
- aucune copie dans IndexedDB ;
- ajout de l’en-tête `Authorization` uniquement pour `https://api.github.com` ;
- aucune Function, aucun proxy et aucune dépendance Netlify ;
- aucune écriture GitHub depuis la PWA ;
- personnalisation partagée conservée dans `project-overrides.json`.

## Flux de connexion

```text
Connecter GitHub
→ créer un jeton finement contrôlé sur github.com
→ coller le jeton dans La Grange
→ GET https://api.github.com/user
→ stockage local selon le choix de l’utilisateur
→ synchronisation forcée
→ lectures GitHub authentifiées
```

La déconnexion supprime les copies de `sessionStorage` et `localStorage`. Une réponse GitHub `401` invalide également la session locale.

## Lectures authentifiées

Le wrapper réseau couvre :

- inventaire des dépôts publics ;
- commits récents ;
- releases ;
- README.

Les URL restent celles de l’API GitHub. Les ETag peuvent être envoyés avec les requêtes authentifiées. Le jeton n’est jamais ajouté à une requête vers une autre origine.

## Personnalisation

Le cinquième bouton de la carte reste visible afin de conserver le contrat graphique. Il ouvre une explication et un lien vers :

```text
public/data/project-overrides.json
```

Les champs versionnés restent :

- couverture ;
- style ;
- couleur principale ;
- couleur secondaire ;
- couleur de progression ;
- avancement manuel ;
- version manuelle.

La modification est réalisée sur GitHub ou par une intervention de développement, puis suit le cycle normal commit, revue, fusion et déploiement Pages.

## Pourquoi la PR automatique est désactivée

Une application statique ne possède pas de coffre serveur. Un jeton capable de créer une branche et une pull request serait accessible au JavaScript et augmenterait fortement le risque. La Grange n’accepte donc qu’un jeton de lecture pour améliorer le quota de synchronisation.

## États UX

- vérification locale ;
- mode public ;
- saisie du jeton ;
- compte GitHub connecté ;
- jeton rejeté ou révoqué ;
- limite GitHub atteinte ;
- erreur réseau récupérable ;
- hors ligne.

## Critères d’acceptation

- la PWA fonctionne entièrement sur GitHub Pages ;
- le mode public reste opérationnel ;
- un jeton valide active les lectures authentifiées ;
- le jeton n’est envoyé qu’à `api.github.com` ;
- le stockage persistant exige un choix explicite ;
- la déconnexion et un rejet `401` suppriment le jeton ;
- aucune route `/api/*` locale n’est appelée ;
- aucune écriture GitHub n’est effectuée ;
- la personnalisation manuelle reste versionnée et commune après déploiement.
