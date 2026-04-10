import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';

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
  const normalized = normalize(pathname);
  return normalized.replace(/^([.]{2}[\\/])+/, '').replace(/^[/\\]+/, '');
}

function buildSafeFilePath(baseDir, requestPath) {
  const safePath = toSafePath(requestPath);
  const resolvedPath = resolve(baseDir, safePath);

  if (resolvedPath !== baseDir && !resolvedPath.startsWith(`${baseDir}${sep}`)) {
    return null;
  }

  return resolvedPath;
}

function resolveFilePath(pathname) {
  if (pathname === '/' || pathname.startsWith('/pages/')) {
    const requestedPath = pathname === '/' ? 'index.html' : pathname;
    return buildSafeFilePath(PUBLIC_DIR, requestedPath);
  }

  for (const mapping of STATIC_PREFIXES) {
    if (pathname.startsWith(mapping.prefix)) {
      return buildSafeFilePath(mapping.baseDir, pathname.slice(mapping.prefix.length));
    }
  }

  return buildSafeFilePath(PUBLIC_DIR, pathname);
}

function isReadableFile(filePath) {
  if (!filePath || !existsSync(filePath)) return false;

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
  const stream = createReadStream(filePath);

  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('Internal Server Error');
  });

  res.writeHead(200, { 'Content-Type': contentType });
  stream.pipe(res);

  return true;
}
