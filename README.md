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
- `GET /api/products`
- `GET /api/products/:id`

## Structure du dépôt

- `src/` : logique backend
- `public/` : pages statiques
- `assets/` : scripts front et styles par rôle
- `database/` : schéma SQL, seeds, politiques
- `docs/` : documentation technique
- `utils/` : helpers utilitaires
