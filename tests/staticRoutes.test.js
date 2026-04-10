import test from 'node:test';
import assert from 'node:assert/strict';
import { handleStaticRoutes } from '../src/routes/static.js';

test('handleStaticRoutes rejects path traversal attempts', () => {
  const req = { method: 'GET' };
  const res = {
    writeHead() {
      throw new Error('writeHead should not be called for invalid path');
    },
    end() {
      throw new Error('end should not be called for invalid path');
    }
  };

  const handled = handleStaticRoutes(req, res, '/../package.json');
  assert.equal(handled, false);
});

test('handleStaticRoutes ignores non-GET requests', () => {
  const req = { method: 'POST' };
  const res = {};

  const handled = handleStaticRoutes(req, res, '/index.html');
  assert.equal(handled, false);
});
