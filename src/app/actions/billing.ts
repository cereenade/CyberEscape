"use server";

import type { PaidPlan } from "@/data/meta";
import { SITE_URL } from "@/lib/site";
import { getSessionUser, getSubscription, isActive } from "@/server/player";
import { STRIPE_ENABLED, priceFor, stripe } from "@/server/stripe";
import { isVerifiedStudent } from "@/server/student";

interface RedirectResult {
  url?: string;
  error?: string;
}

/** Crée une page de paiement Stripe pour l'abonnement choisi. */
export async function startCheckout(plan: PaidPlan, waiverAccepted: boolean): Promise<RedirectResult> {
  const user = await getSessionUser();
  if (!user) return { error: "Connecte-toi pour t'abonner." };
  if (!STRIPE_ENABLED) return { error: "Le paiement sera bientôt disponible." };
  if (plan !== "etudiant" && plan !== "standard") return { error: "Offre inconnue." };
  if (waiverAccepted !== true) return { error: "Coche la case pour accéder tout de suite au contenu." };

  const sub = await getSubscription(user.id);
  if (isActive(sub)) return { error: "Tu as déjà un abonnement actif." };
  if (plan === "etudiant" && !(await isVerifiedStudent(user.id))) {
    return { error: "Vérifie d'abord ton adresse e-mail d'école pour l'offre étudiante." };
  }

  try {
    const session = await stripe<{ url: string }>("POST", "/checkout/sessions", {
      mode: "subscription",
      "line_items[0][price]": priceFor(plan),
      "line_items[0][quantity]": 1,
      success_url: `${SITE_URL}/abonnement?paiement=ok`,
      cancel_url: `${SITE_URL}/abonnement?paiement=annule`,
      client_reference_id: user.id,
      customer: sub?.stripe_customer_id ?? undefined,
      customer_email: sub?.stripe_customer_id ? undefined : user.email,
      locale: "fr",
      allow_promotion_codes: true,
      "metadata[user_id]": user.id,
      "metadata[plan]": plan,
      "metadata[waiver_accepted_at]": new Date().toISOString(),
      "subscription_data[metadata][user_id]": user.id,
      "subscription_data[metadata][plan]": plan,
    });
    return { url: session.url };
  } catch {
    return { error: "Le paiement est momentanément indisponible. Réessaie plus tard." };
  }
}

/** Ouvre l'espace client Stripe (changer de carte, résilier, factures). */
export async function openBillingPortal(): Promise<RedirectResult> {
  const user = await getSessionUser();
  if (!user) return { error: "Connecte-toi d'abord." };
  if (!STRIPE_ENABLED) return { error: "Le paiement n'est pas encore activé." };

  const sub = await getSubscription(user.id);
  if (!sub?.stripe_customer_id) return { error: "Aucun abonnement payant trouvé sur ce compte." };
  try {
    const session = await stripe<{ url: string }>("POST", "/billing_portal/sessions", {
      customer: sub.stripe_customer_id,
      return_url: `${SITE_URL}/compte`,
      locale: "fr",
    });
    return { url: session.url };
  } catch {
    return { error: "L'espace de facturation est momentanément indisponible." };
  }
}
