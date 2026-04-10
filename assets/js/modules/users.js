import { supabase } from '/config/supabase.js';
import { redirectByRole } from '../redirect.js';

export async function getCurrentProfile() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError) return null;
  return profile;
}

export async function initSessionRedirect() {
  const profile = await getCurrentProfile();
  if (profile?.role) {
    redirectByRole(profile.role);
  }
}
