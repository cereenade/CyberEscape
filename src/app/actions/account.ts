"use server";

import { getSessionUser, getSubscription } from "@/server/player";
import { STRIPE_ENABLED, stripe } from "@/server/stripe";
import { getAdminSupabase } from "@/server/supabase-admin";

/**
 * Supprime définitivement le compte : l'abonnement Stripe est résilié d'abord
 * (plus aucun prélèvement), puis l'utilisateur et toutes ses données sont effacés.
 */
export async function deleteAccount(confirm: string): Promise<{ ok: boolean; error?: string }> {
  if (confirm !== "SUPPRIMER") return { ok: false, error: "Tape SUPPRIMER pour confirmer." };
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return { ok: false, error: "Connecte-toi d'abord." };

  const sub = await getSubscription(user.id);
  if (sub?.stripe_subscription_id && STRIPE_ENABLED && sub.status !== "canceled") {
    try {
      await stripe("DELETE", `/subscriptions/${encodeURIComponent(sub.stripe_subscription_id)}`);
    } catch (error) {
      // Abonnement déjà supprimé côté Stripe : on peut continuer.
      if (!String(error).includes("No such subscription"))
        return { ok: false, error: "Impossible de résilier ton abonnement pour le moment. Réessaie plus tard." };
    }
  }

  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) return { ok: false, error: "La suppression a échoué. Réessaie plus tard." };
  return { ok: true };
}
