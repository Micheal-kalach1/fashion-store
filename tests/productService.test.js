import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getProductById,
  listProducts,
  listProductCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../src/services/productService.js';

test('listProducts returns products with computed label', () => {
  const products = listProducts();

  assert.ok(products.length > 0);
  assert.ok(products[0].label.includes(products[0].category));
});

test('listProducts can filter and sort products', () => {
  const filtered = listProducts({ category: 'Women', sortBy: 'price', sortOrder: 'desc' });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].category, 'Women');
});

test('listProducts supports min/max price filtering', () => {
  const filtered = listProducts({ minPrice: 80, maxPrice: 100 });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'p-001');
});

test('listProductCategories returns sorted unique categories', () => {
  assert.deepEqual(listProductCategories(), ['Men', 'Unisex', 'Women']);
});

test('getProductById returns enriched product for known id', () => {
  const product = getProductById('p-001');

  assert.ok(product);
  assert.equal(product?.id, 'p-001');
  assert.match(product?.label || '', /Women/);
});

test('service supports create, update and delete product', () => {
  const created = createProduct({ name: 'New Item', category: 'Women', price: 45, inStock: true });
  assert.ok(created.id);

  const updated = updateProduct(created.id, { price: 49.5, inStock: false });
  assert.ok(updated);
  assert.equal(updated?.price, 49.5);
  assert.equal(updated?.inStock, false);

  const deleted = deleteProduct(created.id);
  assert.equal(deleted, true);
  assert.equal(getProductById(created.id), null);
});

test('getProductById returns null for unknown id', () => {
  const product = getProductById('unknown-id');

  assert.equal(product, null);
});
