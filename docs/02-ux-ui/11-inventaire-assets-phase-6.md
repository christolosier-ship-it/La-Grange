# Inventaire des assets de la Phase 6

## Objectif

Définir les assets nécessaires à l’identité visuelle sans rendre l’application dépendante d’images lourdes, fragiles ou impossibles à maintenir.

Ce document distingue :

- les assets structurants, partagés par plusieurs vues ;
- les assets éditoriaux propres aux projets ;
- les ornements facultatifs ;
- les fallbacks CSS ou SVG obligatoires.

## Principes

- aucun asset distant requis au runtime ;
- chaque asset possède un usage documenté ;
- chaque image possède des dimensions explicites ;
- le chargement initial ne doit pas télécharger tout le décor ;
- une image manquante ne casse jamais la mise en page ;
- les textes fonctionnels restent en HTML ;
- les textures sont discrètes et répétables ;
- les assets inutilisés sont supprimés avant fusion.

## Référence de cadrage

| Fichier | Rôle | Production |
| --- | --- | --- |
| `docs/assets/phase-6/reference-dashboard-grange.webp` | référence d’ambiance et de composition | documentation uniquement |

Cette référence ne doit pas être servie par l’application.

## Arborescence cible

```text
public/
  assets/
    shell/
      background-workshop.webp
      wood-structure.webp
      paper-grain.webp
      metal-edge.svg
      brand-sign.svg
    components/
      crate-frame.svg
      panel-frame.svg
      tag-frame.svg
      paper-note.svg
      empty-slot.svg
    icons/
      navigation/
      actions/
      states/
    projects/
      <slug>/
        cover-640.webp
        cover-960.webp
        logo.svg
        logo.webp
```

L’arborescence finale peut être adaptée à l’existant, mais les familles doivent rester séparées.

## Lots d’assets

### A. Identité de marque

Priorité : critique.

À produire :

- enseigne La Grange ;
- symbole compact pour la navigation et la PWA ;
- variante monochrome ;
- variante lisible sur fond sombre ;
- favicon et icônes PWA finales si la marque évolue.

Contraintes :

- SVG préféré ;
- aucun texte rasterisé sauf justification ;
- lisible à 32 px ;
- contraste suffisant sans halo ;
- aucun fichier de police intégré dans le dépôt sans licence vérifiée.

### B. Fond et structure du shell

Priorité : critique.

À produire :

- fond d’atelier très discret ;
- texture de bois structurel ;
- cadre ou bordure de panneau réutilisable ;
- papier calme ;
- petite texture métallique ou bordure SVG ;
- masque de lumière ou gradient de référence.

Contraintes :

- le fond doit supporter un recadrage important ;
- aucune information indispensable dans le fond ;
- répétition ou extension sans raccord visible ;
- intensité contrôlable par CSS ;
- version simplifiée possible en économie de données ou faible largeur.

### C. Composants réutilisables

Priorité : critique.

À produire :

- cadre de carte standard ;
- cadre de carte compacte ;
- étiquette ou ruban d’état ;
- plaque de statistique ;
- panneau secondaire ;
- note papier ;
- emplacement vide ;
- attaches ou vis réutilisables.

Contraintes :

- privilégier SVG et CSS ;
- ne pas créer une image différente pour chaque taille ;
- permettre la couleur d’accent ;
- préserver le focus visible ;
- ne pas inclure de texte dans l’asset.

### D. Iconographie

Priorité : critique.

À produire :

- navigation ;
- lancement d’application ;
- GitHub et lien externe ;
- synchronisation ;
- états ;
- favoris ;
- recherche, filtre et tri ;
- cache, diagnostic et maintenance.

Contraintes :

- SVG local ;
- `currentColor` lorsque possible ;
- taille optique cohérente ;
- zone de dessin stable ;
- absence d’emoji fonctionnel ;
- marques externes utilisées conformément à leurs règles.

### E. Couvertures de projets

Priorité : progressive.

À produire d’abord pour :

1. projets mis en avant sur le dashboard ;
2. applications lançables ;
3. favoris ;
4. autres projets selon usage.

Chaque projet peut disposer de :

- couverture 640 px ;
- couverture 960 px si la fiche l’exige ;
- logo SVG ou WebP ;
- couleur d’accent ;
- fallback déterministe obligatoire.

Une couverture ne doit pas afficher une fausse version, un faux pourcentage, un faux statut ou une action.

### F. Ornements

Priorité : facultative.

Exemples :

- petite lampe ;
- corde ;
- vis ;
- outil posé ;
- feuille ou plante ;
- tache de lumière ;
- étiquette vide.

Règles :

- aucun ornement nécessaire à la compréhension ;
- nombre limité par vue ;
- `aria-hidden` ou image décorative ;
- aucun pointer event ;
- pas de chargement prioritaire ;
- suppression sur mobile si la densité devient excessive.

## Dimensions recommandées

| Asset | Dimensions de production | Ratio | Format privilégié |
| --- | --- | --- | --- |
| Fond d’atelier | 1600 à 2048 px de large | libre, recadrable | AVIF puis WebP |
| Texture répétable | 512 ou 1024 px | carré | WebP |
| Couverture catalogue | 640 x 400 px environ | 8:5 | AVIF ou WebP |
| Couverture fiche | 960 x 600 px environ | 8:5 | AVIF ou WebP |
| Logo projet | 256 à 512 px | libre | SVG, sinon WebP |
| Cadre de composant | vectoriel | adaptable | SVG ou CSS |
| Icône | viewBox cohérent | carré | SVG |
| Note papier | vectoriel ou 512 px | adaptable | SVG ou WebP |

Les ratios existants du composant priment si leur modification provoque un layout shift ou une régression.

## Budgets

### Budget initial de shell

- décor critique supplémentaire au premier affichage : cible inférieure à 250 Ko compressés ;
- fond principal : cible inférieure à 140 Ko en AVIF ou 190 Ko en WebP ;
- textures et cadres critiques : cible cumulée inférieure à 100 Ko ;
- icônes critiques : cible cumulée inférieure à 30 Ko ;
- aucune police décorative supérieure à 80 Ko par graisse sans justification.

### Budget par carte

- miniature 640 px : cible de 35 à 80 Ko ;
- logo : cible inférieure à 30 Ko ;
- aucune image 960 px téléchargée dans une carte compacte ;
- couvertures sous la ligne de flottaison en lazy loading.

### Budget par vue

Le premier affichage d’une vue ne doit pas charger les couvertures d’autres vues. Un asset partagé déjà présent dans le cache peut être réutilisé.

Les budgets sont des cibles. Tout dépassement doit être mesuré, justifié et approuvé dans la PR concernée.

## Formats

### AVIF

À privilégier pour les grandes illustrations lorsque le pipeline et les navigateurs cibles sont validés. Prévoir un fallback WebP si nécessaire.

### WebP

Format standard pour les couvertures et textures raster.

### SVG

Format standard pour cadres, icônes, plaques et logos vectoriels. Le SVG doit être local, optimisé et dépourvu de script.

### PNG

Réservé aux cas où une transparence raster de qualité est nécessaire et où WebP ne convient pas.

### JPEG

À éviter dans les assets finaux sauf source documentaire. Il ne doit pas devenir le format principal du shell.

## Convention de nommage

- minuscules ;
- tirets ;
- aucun espace ;
- aucune date dans le nom stable ;
- dimensions dans le nom uniquement pour les variantes raster ;
- suffixes explicites : `cover`, `logo`, `frame`, `texture`, `icon` ;
- noms de projets basés sur un slug stable.

Exemples :

- `background-workshop-1600.avif` ;
- `wood-structure-1024.webp` ;
- `crate-frame.svg` ;
- `projects/luma/cover-640.webp` ;
- `projects/luma/logo.svg`.

## Manifest d’assets

Avant l’intégration finale, un manifest documentaire ou généré doit recenser pour chaque asset :

- chemin ;
- rôle ;
- dimensions ;
- poids ;
- format ;
- source ;
- licence ou statut de génération ;
- vues consommatrices ;
- fallback ;
- stratégie de chargement.

Un simple tableau Markdown est suffisant au MVP si le nombre d’assets reste raisonnable.

## Assets générés par IA

Chaque asset généré doit être :

1. comparé à la bible visuelle ;
2. nettoyé des textes ou symboles indésirables ;
3. recadré ;
4. redimensionné ;
5. compressé ;
6. nommé ;
7. associé à une provenance ;
8. testé avec son fallback ;
9. validé sur écran sombre et lumineux.

Aucun asset généré ne doit être intégré directement depuis une sortie brute.

## Stratégie de chargement

- shell critique préchargé avec parcimonie ;
- décor non critique différé ;
- couvertures lazy loaded ;
- dimensions ou `aspect-ratio` réservés avant chargement ;
- `srcset` ou variantes explicites lorsque le gain est réel ;
- aucune image encodée en base64 dans le CSS de production sans justification ;
- aucune requête vers un CDN externe.

## Fallbacks obligatoires

| Élément absent | Fallback |
| --- | --- |
| fond d’atelier | gradients et couleurs du design system |
| texture bois | surface unie sombre |
| cadre SVG | bordure CSS |
| couverture projet | fond déterministe, initiales et caisse SVG |
| logo projet | nom texte |
| icône | libellé textuel conservé |
| police décorative | serif ou sans-serif système documentée |

## Critères d’acceptation

- les assets du shell sont inventoriés ;
- les poids réels sont publiés dans la PR ;
- aucune image fonctionnelle ne contient de texte obligatoire ;
- les dimensions sont réservées ;
- les fallbacks sont visibles et cohérents ;
- le premier affichage reste interactif depuis le cache ;
- l’application reste compréhensible lorsque toutes les images sont bloquées ;
- aucun asset externe ou secret n’est introduit.