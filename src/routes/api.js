import { listProducts, getProductById, listProductCategories } from '../services/productService.js';
import { sendJson } from '../middleware/json.js';
import { validateProductPayload } from '../../utils/validators.js';

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
    const filters = {
      category: searchParams.get('category') || undefined,
      inStock: searchParams.get('inStock') ?? undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || 'name',
      sortOrder: searchParams.get('sortOrder') || 'asc',
      limit: searchParams.get('limit') ?? undefined,
      offset: searchParams.get('offset') ?? 0
    };

    sendJson(res, 200, { data: listProducts(filters) });
    return true;
  }

  if (pathname === '/api/products/validate' && req.method === 'POST') {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      try {
        const payload = rawBody ? JSON.parse(rawBody) : {};
        const result = validateProductPayload(payload);
        sendJson(res, result.valid ? 200 : 422, result);
      } catch {
        sendJson(res, 400, { error: 'Invalid JSON payload' });
      }
    });

    return true;
  }

  const productIdMatch = pathname.match(/^\/api\/products\/([a-z0-9-]+)$/i);
  if (productIdMatch && req.method === 'GET') {
    const [, productId] = productIdMatch;
    const product = getProductById(productId);

    if (!product) {
      sendJson(res, 404, { error: 'Product not found' });
      return true;
    }

    sendJson(res, 200, { data: product });
    return true;
  }

  return false;
}
