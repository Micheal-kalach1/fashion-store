import { listProducts, getProductById } from '../services/productService.js';
import { sendJson } from '../middleware/json.js';

export function handleApiRoutes(req, res, pathname) {
  if (pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, {
      status: 'ok',
      service: 'fashion-store',
      timestamp: new Date().toISOString()
    });
    return true;
  }

  if (pathname === '/api/products' && req.method === 'GET') {
    sendJson(res, 200, { data: listProducts() });
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
