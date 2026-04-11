import { products } from '../data/products.js';
import { slugify } from '../../utils/helpers.js';

function normalizeProduct(product) {
  return {
    ...product,
    label: `${product.name} (${product.category})`
  };
}

function toOptionalNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function createProductId(name = 'product') {
  return `p-${slugify(name).slice(0, 24) || 'new'}-${Date.now().toString(36)}`;
}

export function listProducts(options = {}) {
  const {
    category,
    inStock,
    search,
    minPrice,
    maxPrice,
    sortBy = 'name',
    sortOrder = 'asc',
    limit,
    offset = 0
  } = options;

  let results = products.map(normalizeProduct);

  if (category) {
    const normalizedCategory = String(category).toLowerCase();
    results = results.filter((item) => item.category.toLowerCase() === normalizedCategory);
  }

  if (inStock !== undefined) {
    const expected = inStock === true || inStock === 'true';
    results = results.filter((item) => item.inStock === expected);
  }

  if (search) {
    const normalizedSearch = String(search).toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch)
    );
  }

  const minPriceValue = toOptionalNumber(minPrice);
  if (minPriceValue !== undefined) {
    results = results.filter((item) => item.price >= minPriceValue);
  }

  const maxPriceValue = toOptionalNumber(maxPrice);
  if (maxPriceValue !== undefined) {
    results = results.filter((item) => item.price <= maxPriceValue);
  }

  const orderMultiplier = String(sortOrder).toLowerCase() === 'desc' ? -1 : 1;
  const sortKey = ['name', 'category', 'price'].includes(sortBy) ? sortBy : 'name';

  results = results.sort((a, b) => {
    if (sortKey === 'price') {
      return (a.price - b.price) * orderMultiplier;
    }

    return a[sortKey].localeCompare(b[sortKey]) * orderMultiplier;
  });

  const normalizedOffset = Number.isInteger(Number(offset)) && Number(offset) > 0 ? Number(offset) : 0;
  const normalizedLimit = Number.isInteger(Number(limit)) && Number(limit) > 0 ? Number(limit) : undefined;

  if (normalizedLimit !== undefined) {
    results = results.slice(normalizedOffset, normalizedOffset + normalizedLimit);
  } else if (normalizedOffset > 0) {
    results = results.slice(normalizedOffset);
  }

  return results;
}

export function getProductById(id) {
  const product = products.find((item) => item.id === id);
  return product ? normalizeProduct(product) : null;
}

export function listProductCategories() {
  return [...new Set(products.map((product) => product.category))].sort();
}

export function createProduct(payload) {
  const newProduct = {
    id: createProductId(payload.name),
    name: payload.name,
    category: payload.category || 'Uncategorized',
    price: Number(payload.price),
    currency: payload.currency || 'EUR',
    sizes: Array.isArray(payload.sizes) ? payload.sizes : [],
    inStock: payload.inStock !== false
  };

  products.push(newProduct);
  return normalizeProduct(newProduct);
}

export function updateProduct(id, payload) {
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) return null;

  const current = products[index];
  const updated = {
    ...current,
    ...(payload.name ? { name: payload.name } : {}),
    ...(payload.category ? { category: payload.category } : {}),
    ...(payload.price !== undefined ? { price: Number(payload.price) } : {}),
    ...(payload.currency ? { currency: payload.currency } : {}),
    ...(Array.isArray(payload.sizes) ? { sizes: payload.sizes } : {}),
    ...(payload.inStock !== undefined ? { inStock: Boolean(payload.inStock) } : {})
  };

  products[index] = updated;
  return normalizeProduct(updated);
}

export function deleteProduct(id) {
  const index = products.findIndex((item) => item.id === id);
  if (index < 0) return false;

  products.splice(index, 1);
  return true;
}
