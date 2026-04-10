import { supabase } from '../config/supabase.js';

export function getSupabaseClient() {
  return supabase;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Impossible de récupérer la session: ${error.message}`);
  }

  return data.user ?? null;
}
