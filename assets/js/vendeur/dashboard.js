import { supabase } from '/config/supabase.js';

export async function loadSellerDashboard(vendeurId) {
  const [{ data: products, error: productsError }, { data: negotiations, error: negotiationsError }] =
    await Promise.all([
      supabase.from('products').select('id, stock, prix').eq('vendeur_id', vendeurId),
      supabase.from('negotiations').select('id, statut').eq('vendeur_id', vendeurId)
    ]);

  if (productsError) throw new Error(productsError.message);
  if (negotiationsError) throw new Error(negotiationsError.message);

  return {
    totalProducts: products?.length ?? 0,
    lowStock: (products ?? []).filter((p) => Number(p.stock) <= 3).length,
    activeNegotiations: (negotiations ?? []).filter((n) => n.statut === 'en_cours').length
  };
}
