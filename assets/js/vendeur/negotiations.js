import { supabase } from '/config/supabase.js';

export async function getSellerNegotiations(vendeurId) {
  const { data, error } = await supabase
    .from('negotiations')
    .select('*')
    .eq('vendeur_id', vendeurId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function closeNegotiation(negotiationId, status = 'accepte') {
  const { error } = await supabase
    .from('negotiations')
    .update({ statut: status })
    .eq('id', negotiationId);

  return error ? error.message : 'NÉGOCIATION MISE À JOUR';
}
