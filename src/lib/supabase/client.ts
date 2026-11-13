import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AUTH_ENABLED, SUPABASE_KEY, SUPABASE_URL } from "./config";

let client: SupabaseClient | null = null;

/** Client Supabase côté navigateur (une seule instance). `null` si les comptes ne sont pas configurés. */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!AUTH_ENABLED) return null;
  if (!client) client = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
  return client;
}
