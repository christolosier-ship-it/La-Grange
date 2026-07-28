# Index documentaire

Cette documentation est la source de vérité de La Grange.

## Ordre de lecture recommandé

1. **Fondations** : vision, limites et vocabulaire.
2. **Produit** : utilisateurs, parcours et règles métier.
3. **UX/UI** : vues, composants, responsive et accessibilité.
4. **Technique** : architecture, données, GitHub, cache et PWA.
5. **Qualité** : tests et critères de sortie.
6. **Réalisation** : ordre des phases et livrables.
7. **Déploiement** : publication et retour arrière.
8. **Décisions** : raisons des choix structurants.
9. **Génération IA** : prompts et garde-fous pour réaliser le projet.

## Source de vérité en cas de conflit

1. ADR accepté le plus récent ;
2. règles métier ;
3. spécification de la vue ou du composant ;
4. document de phase ;
5. README.

Un conflit documentaire doit être corrigé avant d’implémenter. Il ne doit pas être arbitré silencieusement dans le code.

## Gouvernance

Chaque PR modifiant le comportement doit identifier les documents impactés. Les décisions structurantes sont immuables sans nouvel ADR. Les documents de phase décrivent un ordre de réalisation, pas une invitation à étendre le périmètre.
