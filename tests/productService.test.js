import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductById, listProducts } from '../src/services/productService.js';

test('listProducts returns products with computed label', () => {
  const products = listProducts();

  assert.ok(products.length > 0);
  assert.ok(products[0].label.includes(products[0].category));
});

test('getProductById returns null for unknown id', () => {
  const product = getProductById('unknown-id');

  assert.equal(product, null);
});
