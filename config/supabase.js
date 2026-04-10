import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// =========================
// SUPABASE CONFIG
// =========================
const SUPABASE_URL = "https://ujfpxfaegrjofavmwvcd.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZnB4ZmFlZ3Jvb2Zhdm13dmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjUyNjcsImV4cCI6MjA5MTM0MTI2N30.MKlonii8CdHgc39zdED96tB6N9cgn500P2Qo7gCrICU";

// =========================
// CLIENT GLOBAL SUPABASE
// =========================
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);