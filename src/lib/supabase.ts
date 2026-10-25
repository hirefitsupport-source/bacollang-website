import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client using the secret service-role key. It bypasses row-level
// security, so it must never be imported into client components (server-only enforces this).
// Returns null when Supabase isn't configured, so the site still works without it.
let client: SupabaseClient | null | undefined;

export function getSupabaseAdmin() {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}
