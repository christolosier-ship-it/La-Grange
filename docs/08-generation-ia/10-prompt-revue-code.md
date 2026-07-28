# Prompt de revue de code

Réalise une revue stricte du diff sans modifier dans un premier temps.

## Axes

1. conformité produit et hors périmètre ;
2. architecture et dépendances ;
3. exactitude des données ;
4. synchronisation et atomicité ;
5. sécurité ;
6. erreurs et mode hors ligne ;
7. performance ;
8. accessibilité ;
9. responsive ;
10. tests et documentation.

## Format

Classe chaque observation : bloquant, important, mineur ou suggestion. Pour chaque point, indique fichier, comportement, risque et correction minimale.

## Vérifications spécifiques

Token ou secret, appel API dans un composant, perte possible du cache, requête N+1, URL non validée, HTML distant, métrique fictive, régression Pages, oubli de migration, absence d’état d’erreur et animation non réduite.

Après corrections, relis le diff complet et confirme uniquement les contrôles réellement exécutés.
