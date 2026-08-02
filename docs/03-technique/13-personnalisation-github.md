# Personnalisation versionnée via GitHub

## Objectif

Permettre au propriétaire de personnaliser une carte depuis La Grange tout en conservant une configuration identique sur tablette et ordinateur.

## Principes validés

- modale ouverte depuis le cinquième bouton de la carte ;
- cinquième bouton toujours visible afin de conserver les cinq emplacements du skin ;
- création d’une PR réservée à une session administrateur authentifiée ;
- authentification GitHub ;
- GitHub App limitée au dépôt `La-Grange` ;
- Netlify Functions pour les opérations privilégiées ;
- aucune clé dans le navigateur ;
- toute modification passe par une PR automatique ;
- fusion manuelle ;
- publication effective après déploiement et mise à jour PWA.

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

- non authentifié ;
- authentification en cours ;
- administrateur connecté ;
- validation locale ;
- upload ;
- création de PR ;
- PR créée ;
- conflit avec `main` ;
- erreur récupérable ;
- hors ligne.

## Critères d’acceptation

- un visiteur voit les cinq actions et peut ouvrir la modale ;
- un visiteur ou un compte non autorisé ne peut pas créer de PR ;
- aucun secret dans le bundle ou les diagnostics ;
- seuls les fichiers autorisés changent ;
- une PR est créée sans fusion ;
- une couverture non conforme est refusée ;
- un conflit ne détruit aucune modification ;
- après fusion et déploiement, tous les appareils affichent la même personnalisation.
