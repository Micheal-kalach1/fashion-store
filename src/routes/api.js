import {
  listProducts,
  getProductById,
  listProductCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService.js';
import { sendJson } from '../middleware/json.js';
import { validateProductPayload } from '../../utils/validators.js';

function readJsonBody(req, maxSize = 1_000_000) {
  return new Promise((resolve, reject) => {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk;

      if (rawBody.length > maxSize) {
        reject(new Error('Payload too large'));
      }
    });

    req.on('end', () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {});
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', () => {
      reject(new Error('Unable to read request body'));
    });
  });
}

function mapFilters(searchParams) {
  return {
    category: searchParams.get('category') || undefined,
    inStock: searchParams.get('inStock') ?? undefined,
    search: searchParams.get('search') || undefined,
    minPrice: searchParams.get('minPrice') ?? undefined,
    maxPrice: searchParams.get('maxPrice') ?? undefined,
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: searchParams.get('sortOrder') || 'asc',
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? 0
  };
}

export function handleApiRoutes(req, res, requestUrl) {
  const { pathname, searchParams } = requestUrl;

  if (pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, {
      status: 'ok',
      service: 'fashion-store',
      timestamp: new Date().toISOString()
    });
    return true;
  }

  if (pathname === '/api/products/categories' && req.method === 'GET') {
    sendJson(res, 200, { data: listProductCategories() });
    return true;
  }

  if (pathname === '/api/products' && req.method === 'GET') {
    sendJson(res, 200, { data: listProducts(mapFilters(searchParams)) });
    return true;
  }

  if (pathname === '/api/products' && req.method === 'POST') {
    readJsonBody(req)
      .then((payload) => {
        const validation = validateProductPayload(payload);
        if (!validation.valid) {
          sendJson(res, 422, validation);
          return;
        }

        const product = createProduct(payload);
        sendJson(res, 201, { data: product });
      })
      .catch((error) => {
        const status = error.message === 'Payload too large' ? 413 : 400;
        sendJson(res, status, { error: error.message });
      });

    return true;
  }

  if (pathname === '/api/products/validate' && req.method === 'POST') {
    readJsonBody(req)
      .then((payload) => {
        const result = validateProductPayload(payload);
        sendJson(res, result.valid ? 200 : 422, result);
      })
      .catch((error) => {
        sendJson(res, 400, { error: error.message });
      });

    return true;
  }

  const productIdMatch = pathname.match(/^\/api\/products\/([a-z0-9-]+)$/i);
  if (productIdMatch) {
    const [, productId] = productIdMatch;

    if (req.method === 'GET') {
      const product = getProductById(productId);

      if (!product) {
        sendJson(res, 404, { error: 'Product not found' });
        return true;
      }

      sendJson(res, 200, { data: product });
      return true;
    }

    if (req.method === 'PATCH') {
      readJsonBody(req)
        .then((payload) => {
          const updated = updateProduct(productId, payload);

          if (!updated) {
            sendJson(res, 404, { error: 'Product not found' });
            return;
          }

          sendJson(res, 200, { data: updated });
        })
        .catch((error) => {
          sendJson(res, 400, { error: error.message });
        });

      return true;
    }

    if (req.method === 'DELETE') {
      const removed = deleteProduct(productId);

      if (!removed) {
        sendJson(res, 404, { error: 'Product not found' });
        return true;
      }

      sendJson(res, 200, { data: { id: productId, deleted: true } });
      return true;
    }
  }

  return false;
}
