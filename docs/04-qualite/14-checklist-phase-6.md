# Checklist Phase 6B

## Noyau graphique

- [x] C01 produit et validé ;
- [x] C11 produit et validé ;
- [x] D06, D07 et D20 conservés ;
- [x] D42 produit et validé ;
- [x] D43 produit et validé ;
- [x] dépôt purgé des masters, doublons et assets prospectifs ;
- [ ] iconographie des neuf styles produite ou réutilisée localement ;
- [ ] aucun texte fonctionnel rasterisé ;
- [ ] dimensions, poids et transparences contrôlés sur le build final.

## Dashboard

- [ ] rail gauche fixe ;
- [ ] version et état administrateur en bas du rail ;
- [ ] zone principale seule défilante ;
- [ ] bandeau unique C11 avec quatre statistiques HTML ;
- [ ] grille continue sans titre ni conteneur ;
- [ ] aucun rail droit ;
- [ ] aucun fond local derrière les cartes.

## Carte

- [ ] skin C01 ;
- [ ] couverture ou fallback HTML/CSS ;
- [ ] marqueur de style HTML/CSS ;
- [ ] version manuelle, release stable ou préversion ;
- [ ] dernière activité ;
- [ ] progression manuelle facultative ;
- [ ] GitHub, application, README, détail et personnalisation alignés ;
- [ ] infobulles au survol et au focus ;
- [ ] personnalisation masquée hors administrateur.

## Couverture administrateur

- [ ] PNG, JPEG et WebP acceptés ;
- [ ] recadrage 8:5 ;
- [ ] sortie WebP 640 × 400 ;
- [ ] métadonnées supprimées ;
- [ ] limites d’octets et dimensions ;
- [ ] chemin calculé côté serveur ;
- [ ] fallback HTML/CSS si aucune couverture ;
- [ ] aucune série Sxx/Fxx exigée.

## Publication

- [ ] compte administrateur autorisé ;
- [ ] session sécurisée ;
- [ ] CSRF et origine contrôlés ;
- [ ] GitHub App limitée à `La-Grange` ;
- [ ] branche et commit créés ;
- [ ] PR automatique ;
- [ ] aucune écriture directe sur `main` ;
- [ ] aucune fusion automatique ;
- [ ] conflit de SHA géré ;
- [ ] aucun secret dans le bundle ou les diagnostics.

## Validation directe

- [ ] tablette paysage ;
- [ ] bureau ;
- [ ] grand bureau ;
- [ ] zoom 200 % ;
- [ ] images bloquées ;
- [ ] hors ligne ;
- [ ] clavier et lecteur d’écran ;
- [ ] mouvement réduit ;
- [ ] visiteur et administrateur ;
- [ ] captures jointes à la PR sans créer de planches canoniques.

## Qualité

- [ ] typecheck ;
- [ ] lint ;
- [ ] tests ;
- [ ] build ;
- [ ] audit de sécurité ;
- [ ] poids et LCP/CLS ;
- [ ] manifeste des assets exact ;
- [ ] documentation à jour ;
- [ ] aucun P1/P2.
