# Checklist Phase 6B

## Noyau graphique

- [x] C01 produit, validé et intégré ;
- [x] C11 produit, validé et intégré ;
- [x] D06, D07 et D20 conservés et intégrés ;
- [x] D42 produit, validé et intégré ;
- [x] D43 produit, validé et intégré ;
- [x] dépôt purgé des masters, doublons et assets prospectifs ;
- [x] neuf styles disponibles avec marqueurs HTML/CSS et palettes locales ;
- [x] aucun texte fonctionnel rasterisé ;
- [x] manifeste des assets synchronisé.

## Dashboard

- [x] rail gauche fixe ;
- [x] version et état administrateur en bas du rail ;
- [x] zone principale seule défilante ;
- [x] bandeau unique C11 avec quatre statistiques HTML ;
- [x] grille continue sans titre ni conteneur ;
- [x] aucun rail droit ;
- [x] aucun fond local derrière les cartes.

## Carte

- [x] skin C01 ;
- [x] couverture ou fallback HTML/CSS ;
- [x] marqueur de style HTML/CSS ;
- [x] version manuelle, release stable ou préversion ;
- [x] dernière activité ;
- [x] progression manuelle facultative ;
- [x] GitHub, application, README, détail et personnalisation alignés ;
- [x] infobulles au survol et au focus ;
- [x] personnalisation masquée hors administrateur.

## Couverture administrateur

- [x] PNG, JPEG et WebP acceptés ;
- [x] recadrage 8:5 ;
- [x] sortie WebP 640 × 400 ;
- [x] métadonnées sources supprimées par réencodage canvas ;
- [x] limites d’octets et dimensions vérifiées côté serveur ;
- [x] chemin calculé côté serveur ;
- [x] fallback HTML/CSS si aucune couverture ;
- [x] aucune série Sxx/Fxx exigée.

## Publication implémentée

- [x] compte administrateur autorisé par liste blanche ;
- [x] session sécurisée ;
- [x] CSRF et origine contrôlés ;
- [x] GitHub App forcée sur `La-Grange` ;
- [x] branche et commit créés ;
- [x] PR automatique ;
- [x] aucune écriture directe sur `main` ;
- [x] aucune fusion automatique ;
- [x] conflit de SHA géré ;
- [x] aucun secret dans le bundle ou les diagnostics.

## Activation externe

- [ ] client OAuth GitHub créé et callback configuré ;
- [ ] GitHub App créée avec permissions minimales ;
- [ ] GitHub App installée uniquement sur `La-Grange` ;
- [ ] variables Netlify renseignées ;
- [ ] test réel de connexion administrateur ;
- [ ] test réel de création, prévisualisation et fusion d’une PR de personnalisation.

## Validation directe

- [ ] tablette paysage ;
- [ ] bureau ;
- [ ] grand bureau ;
- [ ] zoom 200 % ;
- [ ] images bloquées ;
- [x] hors ligne couvert par le cache et les tests ;
- [ ] clavier et lecteur d’écran contrôlés manuellement ;
- [x] mouvement réduit pris en charge ;
- [ ] visiteur et administrateur contrôlés sur le déploiement ;
- [ ] captures jointes à la PR sans créer de planches canoniques.

## Qualité automatisée

- [x] typecheck application et Functions ;
- [x] lint ;
- [x] tests unitaires et intégration ;
- [x] smoke test GitHub réel ;
- [x] build ;
- [x] validation stricte des entrées serveur ;
- [ ] audit visuel et de sécurité final après configuration Netlify ;
- [ ] poids et LCP/CLS mesurés sur le déploiement ;
- [x] manifeste des assets exact ;
- [x] documentation à jour ;
- [ ] aucun P1/P2 confirmé après revue et essais manuels.
