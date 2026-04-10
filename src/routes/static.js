import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const PUBLIC_DIR = join(process.cwd(), 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

export function handleStaticRoutes(req, res, pathname) {
  if (req.method !== 'GET') {
    return false;
  }

  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = join(PUBLIC_DIR, safePath);

  if (!existsSync(filePath)) {
    return false;
  }

  const contentType = MIME_TYPES[extname(filePath)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });

  const stream = createReadStream(filePath);
  stream.pipe(res);

  stream.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  });

  return true;
}
