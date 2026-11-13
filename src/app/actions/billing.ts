"use server";

import { revalidatePath } from "next/cache";
import { PLANS, type PaidPlan } from "@/data/meta";
import { SITE_URL } from "@/lib/site";
import { MOLLIE_ENABLED, PLAN_AMOUNTS, WEBHOOK_URL, mollie, type MolliePayment } from "@/server/mollie";
import { getSessionUser, getSubscription, isActive } from "@/server/player";
import { isVerifiedStudent } from "@/server/student";
import { getAdminSupabase } from "@/server/supabase-admin";

interface RedirectResult {
  url?: string;
  error?: string;
}

/**
 * Démarre l'abonnement : un premier paiement Mollie (1er mois) qui crée aussi le mandat
 * de prélèvement. Le webhook crée ensuite l'abonnement mensuel.
 */
export async function startCheckout(plan: PaidPlan, waiverAccepted: boolean): Promise<RedirectResult> {
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return { error: "Connecte-toi pour t'abonner." };
  if (!MOLLIE_ENABLED) return { error: "Le paiement sera bientôt disponible." };
  if (plan !== "etudiant" && plan !== "standard") return { error: "Offre inconnue." };
  if (waiverAccepted !== true) return { error: "Coche la case pour accéder tout de suite au contenu." };

  const sub = await getSubscription(user.id);
  if (isActive(sub)) {
    return { error: sub?.cancel_at_period_end ? "Ton abonnement résilié reste actif jusqu'à la fin du mois payé : tu pourras te réabonner ensuite." : "Tu as déjà un abonnement actif." };
  }
  if (plan === "etudiant" && !(await isVerifiedStudent(user.id))) {
    return { error: "Vérifie d'abord ton adresse e-mail d'école pour l'offre étudiante." };
  }

  try {
    let customerId = sub?.mollie_customer_id ?? null;
    if (!customerId) {
      const customer = await mollie<{ id: string }>("POST", "/customers", {
        email: user.email,
        locale: "fr_FR",
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      // On garde le client Mollie, sans donner d'accès tant que le paiement n'est pas confirmé.
      await admin.from("subscriptions").upsert(
        { user_id: user.id, plan, status: "incomplete", mollie_customer_id: customerId, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    }

    const payment = await mollie<MolliePayment>("POST", "/payments", {
      amount: { currency: "EUR", value: PLAN_AMOUNTS[plan] },
      description: `CyberEscape – abonnement ${PLANS[plan].name} (1er mois)`,
      customerId,
      sequenceType: "first",
      redirectUrl: `${SITE_URL}/abonnement?paiement=retour`,
      cancelUrl: `${SITE_URL}/abonnement?paiement=annule`,
      webhookUrl: WEBHOOK_URL,
      locale: "fr_FR",
      metadata: { user_id: user.id, plan, kind: "first", waiver_accepted_at: new Date().toISOString() },
    });
    const url = payment._links?.checkout?.href;
    return url ? { url } : { error: "Le paiement est momentanément indisponible." };
  } catch {
    return { error: "Le paiement est momentanément indisponible. Réessaie plus tard." };
  }
}

/** Résilie l'abonnement : plus aucun prélèvement, l'accès reste jusqu'à la fin du mois payé. */
export async function cancelSubscription(): Promise<{ ok: boolean; error?: string }> {
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return { ok: false, error: "Connecte-toi d'abord." };
  if (!MOLLIE_ENABLED) return { ok: false, error: "Le paiement n'est pas encore activé." };

  const sub = await getSubscription(user.id);
  if (!sub?.mollie_customer_id || !sub.mollie_subscription_id) return { ok: false, error: "Aucun abonnement payant trouvé sur ce compte." };
  if (sub.cancel_at_period_end) return { ok: true };

  try {
    await mollie("DELETE", `/customers/${encodeURIComponent(sub.mollie_customer_id)}/subscriptions/${encodeURIComponent(sub.mollie_subscription_id)}`);
  } catch (error) {
    // Déjà résilié côté Mollie : on met simplement la base à jour.
    if (!/canceled|not found|404/i.test(String(error))) return { ok: false, error: "La résiliation a échoué. Réessaie plus tard." };
  }
  await admin
    .from("subscriptions")
    .update({ cancel_at_period_end: true, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);
  revalidatePath("/abonnement");
  return { ok: true };
}
