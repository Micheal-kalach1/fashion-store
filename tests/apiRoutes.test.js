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

test('handleApiRoutes returns filtered product list', () => {
  const req = { method: 'GET' };
  const res = createResponseRecorder();
  const url = new URL('http://localhost/api/products?category=Women');

  const handled = handleApiRoutes(req, res, url);

  assert.equal(handled, true);
  assert.equal(res.statusCode, 200);
  const body = JSON.parse(res.payload);
  assert.equal(body.data.length, 1);
  assert.equal(body.data[0].category, 'Women');
});

test('handleApiRoutes validates incoming product payload', async () => {
  const req = new EventEmitter();
  req.method = 'POST';
  const res = createResponseRecorder();
  const url = new URL('http://localhost/api/products/validate');

  const handled = handleApiRoutes(req, res, url);
  assert.equal(handled, true);

  req.emit('data', JSON.stringify({ name: '', price: -4, stock: 0 }));
  req.emit('end');

  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(res.statusCode, 422);
  const body = JSON.parse(res.payload);
  assert.equal(body.valid, false);
  assert.ok(body.errors.length >= 2);
});
