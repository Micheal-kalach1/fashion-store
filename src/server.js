import http from 'node:http';
import { URL } from 'node:url';
import { getConfig } from './config/env.js';
import { handleApiRoutes } from './routes/api.js';
import { handleStaticRoutes } from './routes/static.js';
import { sendJson } from './middleware/json.js';

const { port, env } = getConfig();

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const { pathname } = requestUrl;

  if (handleApiRoutes(req, res, pathname)) {
    return;
  }

  if (handleStaticRoutes(req, res, pathname)) {
    return;
  }

  sendJson(res, 404, {
    error: 'Route not found',
    path: pathname
  });
});

server.listen(port, () => {
  console.log(`[fashion-store] running in ${env} on http://localhost:${port}`);
});
