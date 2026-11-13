import { NextResponse, type NextRequest } from "next/server";
import type { PaidPlan } from "@/data/meta";
import { PLANS } from "@/data/meta";
import {
  MOLLIE_ENABLED,
  PLAN_AMOUNTS,
  WEBHOOK_URL,
  isoDay,
  mollie,
  oneMonthFrom,
  type MolliePayment,
  type MollieSubscription,
} from "@/server/mollie";
import { getAdminSupabase } from "@/server/supabase-admin";

export const dynamic = "force-dynamic";

/** Quelques jours de marge pour laisser le temps au prélèvement mensuel d'aboutir. */
const GRACE_DAYS = 3;

function withGrace(date: Date): string {
  return new Date(date.getTime() + GRACE_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

/**
 * Mollie appelle cette adresse à chaque changement d'état d'un paiement, en envoyant seulement son identifiant.
 * On relit toujours le paiement auprès de l'API Mollie avec notre clé secrète : un faux appel ne peut donc
 * rien activer (c'est la méthode recommandée par Mollie).
 */
export async function POST(request: NextRequest) {
  if (!MOLLIE_ENABLED) return NextResponse.json({ error: "disabled" }, { status: 404 });
  const admin = getAdminSupabase();
  if (!admin) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const form = await request.formData().catch(() => null);
  const id = String(form?.get("id") ?? "");
  // Mollie attend une réponse 200 même pour un identifiant inconnu.
  if (!/^tr_[A-Za-z0-9]+$/.test(id)) return NextResponse.json({ received: true });

  try {
    const payment = await mollie<MolliePayment>("GET", `/payments/${id}`);
    const now = new Date();

    if (payment.sequenceType === "first") {
      const userId = payment.metadata?.user_id;
      const plan = payment.metadata?.plan === "etudiant" ? "etudiant" : payment.metadata?.plan === "standard" ? "standard" : null;
      if (!userId || !plan || !payment.customerId || payment.status !== "paid") return NextResponse.json({ received: true });

      const { data: existing } = await admin.from("subscriptions").select("mollie_subscription_id, cancel_at_period_end").eq("user_id", userId).maybeSingle();
      if (existing?.mollie_subscription_id && !existing.cancel_at_period_end) return NextResponse.json({ received: true });

      // Le 1er mois est payé : l'abonnement mensuel démarre dans un mois.
      const start = oneMonthFrom(now);
      const subscription = await mollie<MollieSubscription>(
        "POST",
        `/customers/${encodeURIComponent(payment.customerId)}/subscriptions`,
        {
          amount: { currency: "EUR", value: PLAN_AMOUNTS[plan as PaidPlan] },
          interval: "1 month",
          startDate: isoDay(start),
          description: `CyberEscape – ${PLANS[plan as PaidPlan].name} – ${payment.id}`,
          webhookUrl: WEBHOOK_URL,
          metadata: { user_id: userId, plan },
        },
        `sub-${payment.id}`,
      );

      const { error } = await admin.from("subscriptions").upsert(
        {
          user_id: userId,
          plan,
          status: "active",
          current_period_end: withGrace(start),
          mollie_customer_id: payment.customerId,
          mollie_subscription_id: subscription.id,
          cancel_at_period_end: false,
          updated_at: now.toISOString(),
        },
        { onConflict: "user_id" },
      );
      // 23503 : le compte a été supprimé entre-temps.
      if (error && error.code !== "23503") throw new Error(error.message);
      return NextResponse.json({ received: true });
    }

    if (payment.sequenceType === "recurring" && payment.subscriptionId) {
      const { data: row } = await admin
        .from("subscriptions")
        .select("user_id, current_period_end")
        .eq("mollie_subscription_id", payment.subscriptionId)
        .maybeSingle();
      if (!row) return NextResponse.json({ received: true });

      if (payment.status === "paid") {
        // Prélèvement réussi : un mois de plus à partir de la fin de période actuelle.
        const base = row.current_period_end && new Date(row.current_period_end as string) > now ? new Date(row.current_period_end as string) : now;
        await admin
          .from("subscriptions")
          .update({ status: "active", current_period_end: withGrace(oneMonthFrom(base)), updated_at: now.toISOString() })
          .eq("user_id", row.user_id);
      } else if (payment.status === "failed" || payment.status === "expired" || payment.status === "canceled") {
        // Prélèvement refusé : l'accès s'arrête à la fin de la période déjà payée.
        await admin.from("subscriptions").update({ status: "past_due", updated_at: now.toISOString() }).eq("user_id", row.user_id);
      }
    }
  } catch {
    // Mollie réessaiera plus tard.
    return NextResponse.json({ error: "processing failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
