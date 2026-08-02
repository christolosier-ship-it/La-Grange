# ADR-007 - Configuration éditoriale centralisée et versionnée

- **Statut** : accepté, étendu par ADR-010
- **Date initiale** : 2026-07-28
- **Révision** : 2026-08-02

## Décision

Les enrichissements des projets sont centralisés dans :

`public/data/project-overrides.json`

Le fichier appartient au dépôt `La-Grange`, possède un schéma versionné et est commun à tous les appareils après déploiement.

## Contenu

Il peut porter :

- nom et description éditoriaux ;
- catégorie ;
- couverture et logo ;
- style ;
- couleurs ;
- progression manuelle ;
- version manuelle ;
- mise en avant ;
- URL d’application ;
- visibilité et ordre.

Les champs factuels GitHub ne sont pas remplacés.

## Modification 6B

La modale admin peut proposer une modification d’un sous-ensemble autorisé. La Function serveur relit le fichier, applique un patch validé et crée une PR.

## Raisons

- une source unique ;
- historique Git ;
- cohérence multi-appareil ;
- revue avant publication ;
- fallback pour les dépôts non configurés ;
- pas de requête de configuration dans chaque dépôt.

## Conséquences

- le schéma doit être migré et testé ;
- un conflit de base doit être refusé ;
- une PR non fusionnée ne modifie pas la production ;
- une fusion déclenche le déploiement et la mise à jour PWA.
