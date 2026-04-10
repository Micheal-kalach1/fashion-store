import { supabase } from '/config/supabase.js';

export async function getClientOrders(clientId) {
  const { data, error } = await supabase
    .from('orders')
    .select('id, total, statut, created_at')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function cancelOrder(orderId, clientId) {
  const { error } = await supabase
    .from('orders')
    .update({ statut: 'annule' })
    .eq('id', orderId)
    .eq('client_id', clientId)
    .in('statut', ['en_attente', 'negociation']);

  return error ? error.message : 'COMMANDE ANNULÉE';
}
