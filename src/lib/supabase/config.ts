/**
 * Configuration Supabase lue depuis les variables d'environnement.
 * L'intégration Vercel ↔ Supabase les remplit automatiquement.
 * Si elles sont absentes, le site fonctionne quand même, sans comptes.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const SUPABASE_URL = url ?? "";
export const SUPABASE_KEY = key ?? "";

/** `true` quand les comptes utilisateurs sont disponibles. */
export const AUTH_ENABLED = Boolean(url && key);
