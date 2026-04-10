import { supabase } from '/config/supabase.js';
import { reduceStock } from './stock.js';

export async function createOrder(clientId, total) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        client_id: clientId,
        total,
        statut: 'en_attente'
      }
    ])
    .select('id, client_id, total, statut, created_at')
    .single();

  if (error) {
    return { error: error.message, data: null };
  }

  return { error: null, data };
}

export async function addOrderItems(orderId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    return 'AUCUN ARTICLE À AJOUTER';
  }

  const payload = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price: item.prix
  }));

  const { error } = await supabase.from('order_items').insert(payload);
  if (error) return error.message;

  await Promise.all(items.map((item) => reduceStock(item.id, item.quantity)));
  return 'SUCCESS';
}
