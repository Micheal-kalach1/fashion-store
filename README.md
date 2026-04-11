# Fashion Store

Application web modulaire pour la gestion d'une boutique de mode (catalogue, commandes, paiements, administration).

## Stack

- Backend: Node.js natif (HTTP + routes)
- Frontend: HTML/CSS/JS statiques
- Données: Supabase (PostgreSQL)
- Tests: `node:test`

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrir ensuite: `http://localhost:3000`.

## Scripts

- `npm run dev` : démarre le serveur en mode watch
- `npm start` : démarre le serveur
- `npm test` : exécute les tests unitaires

## API backend locale

- `GET /api/health`
- `GET /api/products` (filtres possibles: `category`, `inStock`, `search`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder`, `limit`, `offset`)
- `GET /api/products/categories`
- `GET /api/products/:id`
- `POST /api/products` (création)
- `PATCH /api/products/:id` (mise à jour partielle)
- `DELETE /api/products/:id` (suppression)
- `POST /api/products/validate` (validation payload)

## Structure du dépôt

- `src/` : logique backend
- `public/` : pages statiques
- `assets/` : scripts front et styles par rôle
- `database/` : schéma SQL, seeds, politiques
- `docs/` : documentation technique
- `utils/` : helpers utilitaires
