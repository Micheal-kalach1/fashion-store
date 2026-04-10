import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = join(ROOT_DIR, 'public');
const ASSETS_DIR = join(ROOT_DIR, 'assets');
const CONFIG_DIR = join(ROOT_DIR, 'config');

const STATIC_PREFIXES = [
  { prefix: '/assets/', baseDir: ASSETS_DIR },
  { prefix: '/config/', baseDir: CONFIG_DIR }
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

function toSafePath(pathname) {
  return normalize(pathname).replace(/^([.]{2}[/\\])+/, '');
}

function resolveFilePath(pathname) {
  if (pathname === '/' || pathname.startsWith('/pages/')) {
    const requestedPath = pathname === '/' ? '/index.html' : pathname;
    return join(PUBLIC_DIR, toSafePath(requestedPath));
  }

  for (const mapping of STATIC_PREFIXES) {
    if (pathname.startsWith(mapping.prefix)) {
      return join(mapping.baseDir, toSafePath(pathname.slice(1)));
    }
  }

  return join(PUBLIC_DIR, toSafePath(pathname));
}

function isReadableFile(filePath) {
  if (!existsSync(filePath)) return false;

  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

export function handleStaticRoutes(req, res, pathname) {
  if (req.method !== 'GET') {
    return false;
  }

  const filePath = resolveFilePath(pathname);

  if (!isReadableFile(filePath)) {
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
