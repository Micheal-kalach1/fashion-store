import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { handleApiRoutes } from '../src/routes/api.js';

function createResponseRecorder() {
  return {
    statusCode: null,
    headers: null,
    payload: null,
    writeHead(statusCode, headers) {
      this.statusCode = statusCode;
      this.headers = headers;
    },
    end(payload) {
      this.payload = payload;
    }
  };
}

function createBodyRequest(method, body) {
  const req = new EventEmitter();
  req.method = method;

  queueMicrotask(() => {
    if (body !== undefined) {
      req.emit('data', body);
    }
    req.emit('end');
  });

  return req;
}

test('handleApiRoutes returns filtered product list', () => {
  const req = { method: 'GET' };
  const res = createResponseRecorder();
  const url = new URL('http://localhost/api/products?category=Women&minPrice=10');

  const handled = handleApiRoutes(req, res, url);

  assert.equal(handled, true);
  assert.equal(res.statusCode, 200);
  const body = JSON.parse(res.payload);
  assert.equal(body.data.length, 1);
  assert.equal(body.data[0].category, 'Women');
});

test('handleApiRoutes validates incoming product payload', async () => {
  const req = createBodyRequest('POST', JSON.stringify({ name: '', price: -4, stock: 0 }));
  const res = createResponseRecorder();
  const url = new URL('http://localhost/api/products/validate');

  const handled = handleApiRoutes(req, res, url);
  assert.equal(handled, true);

  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(res.statusCode, 422);
  const body = JSON.parse(res.payload);
  assert.equal(body.valid, false);
  assert.ok(body.errors.length >= 2);
});

test('handleApiRoutes supports product create, patch and delete', async () => {
  const createReq = createBodyRequest(
    'POST',
    JSON.stringify({ name: 'T-shirt test', category: 'Men', price: 35, inStock: true })
  );
  const createRes = createResponseRecorder();

  assert.equal(handleApiRoutes(createReq, createRes, new URL('http://localhost/api/products')), true);
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(createRes.statusCode, 201);
  const created = JSON.parse(createRes.payload).data;

  const patchReq = createBodyRequest('PATCH', JSON.stringify({ price: 39 }));
  const patchRes = createResponseRecorder();
  assert.equal(
    handleApiRoutes(patchReq, patchRes, new URL(`http://localhost/api/products/${created.id}`)),
    true
  );
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(patchRes.statusCode, 200);
  assert.equal(JSON.parse(patchRes.payload).data.price, 39);

  const deleteReq = { method: 'DELETE' };
  const deleteRes = createResponseRecorder();
  assert.equal(
    handleApiRoutes(deleteReq, deleteRes, new URL(`http://localhost/api/products/${created.id}`)),
    true
  );
  assert.equal(deleteRes.statusCode, 200);
  assert.equal(JSON.parse(deleteRes.payload).data.deleted, true);
});
