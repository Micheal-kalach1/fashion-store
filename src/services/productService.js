import { products } from '../data/products.js';

export function listProducts() {
  return products.map((item) => ({
    ...item,
    label: `${item.name} (${item.category})`
  }));
}

export function getProductById(id) {
  return products.find((item) => item.id === id) || null;
}
