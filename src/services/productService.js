import { products } from '../data/products.js';

function normalizeProduct(product) {
  return {
    ...product,
    label: `${product.name} (${product.category})`
  };
}

export function listProducts(options = {}) {
  const {
    category,
    inStock,
    search,
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
