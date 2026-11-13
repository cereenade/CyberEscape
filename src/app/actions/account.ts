"use server";

import { getSessionUser, getSubscription } from "@/server/player";
import { MOLLIE_ENABLED, mollie } from "@/server/mollie";
import { getAdminSupabase } from "@/server/supabase-admin";

/**
 * Supprime définitivement le compte : le client Mollie est supprimé d'abord (abonnement et mandat résiliés,
 * donc plus aucun prélèvement), puis l'utilisateur et toutes ses données sont effacés.
 */
export async function deleteAccount(confirm: string): Promise<{ ok: boolean; error?: string }> {
  if (confirm !== "SUPPRIMER") return { ok: false, error: "Tape SUPPRIMER pour confirmer." };
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return { ok: false, error: "Connecte-toi d'abord." };

  const sub = await getSubscription(user.id);
  if (sub?.mollie_customer_id && MOLLIE_ENABLED) {
    try {
      // Supprimer le client Mollie résilie ses abonnements et ses mandats de prélèvement.
      await mollie("DELETE", `/customers/${encodeURIComponent(sub.mollie_customer_id)}`);
    } catch (error) {
      // Client déjà supprimé côté Mollie : on peut continuer.
      if (!/not found|404|gone/i.test(String(error)))
        return { ok: false, error: "Impossible de résilier ton abonnement pour le moment. Réessaie plus tard." };
    }
  }

  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) return { ok: false, error: "La suppression a échoué. Réessaie plus tard." };
  return { ok: true };
}
