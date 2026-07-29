# Phase 5 — Activité et paramètres

La phase est livrée en deux PR successives afin de séparer le journal local de la mutation plus structurante des profils et préférences.

## Phase 5A — Activité

- journal local des ajouts, renommages, disparitions, archivages et changements d’URL d’application détectés ;
- aucun événement lors du premier import complet ;
- lecture isolée par utilisateur ;
- validation profonde de chaque entrée ;
- tri du plus récent au plus ancien ;
- regroupement par semaine puis par jour dans le fuseau local ;
- formulations prudentes et centralisées ;
- limite de rétention de 500 événements par utilisateur ;
- lien vers la route canonique du projet lorsqu’il existe encore ;
- nom connu sans lien mort lorsqu’un dépôt a disparu ;
- états chargement, vide, hors ligne, cache indisponible et données partiellement invalides ;
- aucune requête GitHub déclenchée par la consultation du journal.

## Phase 5B — Paramètres

- utilisateur GitHub ;
- masquer forks ;
- masquer archives ;
- fréquence de fraîcheur ;
- densité ;
- animations réduites ;
- favoris ;
- date et état du cache ;
- reset cache ;
- version de l’application ;
- diagnostics locaux copiables.

## Contraintes

Changer d’utilisateur crée ou charge un instantané distinct. Une confirmation est nécessaire si cela modifie fortement l’affichage. Aucun champ de token.

Les événements et snapshots restent isolés par utilisateur. Les préférences d’affichage sont globales au navigateur dans le MVP, sauf décision contraire explicitement documentée pendant la Phase 5B.

## Critères de sortie

- préférences persistantes ;
- valeurs invalides réparées ;
- reset cache sûr ;
- activité cohérente avec les changements connus ;
- aucun événement inventé ;
- paramètres utilisables au clavier et sur mobile ;
- tests de migration et de changement d’utilisateur ;
- aucune régression des Phases 1 à 4 ;
- aucun fil P1 ou P2 ouvert avant chaque fusion.
