import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductById, listProducts, listProductCategories } from '../src/services/productService.js';

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

test('listProductCategories returns sorted unique categories', () => {
  assert.deepEqual(listProductCategories(), ['Men', 'Unisex', 'Women']);
});

test('getProductById returns enriched product for known id', () => {
  const product = getProductById('p-001');

  assert.ok(product);
  assert.equal(product?.id, 'p-001');
  assert.match(product?.label || '', /Women/);
});

test('getProductById returns null for unknown id', () => {
  const product = getProductById('unknown-id');

  assert.equal(product, null);
});
