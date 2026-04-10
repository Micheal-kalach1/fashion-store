# Architecture du projet Fashion Store

## Vue d'ensemble

Le projet est organisé en couches pour faciliter la maintenance :

- `src/` : backend Node.js (API + serveur statique)
- `public/` : pages HTML/JS directement servies
- `assets/` : scripts métier par rôle et modules transverses
- `database/` : schéma SQL, politiques RLS, données de seed
- `utils/` : fonctions utilitaires réutilisables

## Backend

- `src/server.js` : point d'entrée HTTP
- `src/routes/api.js` : endpoints JSON
- `src/routes/static.js` : routage des fichiers publics
- `src/services/` : logique métier serveur
- `src/data/` : données locales de démonstration

## Frontend

- `public/pages/*` : pages par rôle (admin, client, vendeur, caissier, auth)
- `assets/js/modules/*` : modules métier (orders, payments, products, users)
- `assets/js/{admin,client,vendeur,caissier}` : logique par contexte d'interface

## Cibles d'évolution

1. Uniformiser les conventions de nommage (`prix/price`, `nom/name`).
2. Centraliser la gestion d'erreurs Supabase.
3. Ajouter des tests sur les modules front critiques (panier, paiement).
