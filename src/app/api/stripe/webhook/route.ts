import { NextResponse, type NextRequest } from "next/server";
import { STRIPE_ENABLED, planForPrice, stripe, verifyStripeSignature } from "@/server/stripe";
import { getAdminSupabase } from "@/server/supabase-admin";

export const dynamic = "force-dynamic";

interface StripeSubscription {
  id: string;
  customer: string;
  status: string;
  cancel_at_period_end: boolean;
  current_period_end?: number;
  metadata?: { user_id?: string; plan?: string };
  items?: { data?: { current_period_end?: number; price?: { id?: string } }[] };
}

interface StripeEvent {
  type: string;
  data: { object: Record<string, unknown> };
}

/** Enregistre l'état d'un abonnement Stripe dans la base. */
async function saveSubscription(sub: StripeSubscription, fallbackUserId?: string) {
  const admin = getAdminSupabase();
  if (!admin) throw new Error("Base indisponible");

  let userId = sub.metadata?.user_id ?? fallbackUserId;
  if (!userId) {
    const { data } = await admin.from("subscriptions").select("user_id").eq("stripe_subscription_id", sub.id).maybeSingle();
    userId = data?.user_id as string | undefined;
  }
  if (!userId) return;

  const item = sub.items?.data?.[0];
  const plan = planForPrice(item?.price?.id) ?? (sub.metadata?.plan === "etudiant" ? "etudiant" : "standard");
  // Selon la version de l'API Stripe, la fin de période est sur l'abonnement ou sur la ligne.
  const periodEnd = sub.current_period_end ?? item?.current_period_end;

  const { error } = await admin.from("subscriptions").upsert({
    user_id: userId,
    plan,
    status: sub.status,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    stripe_customer_id: sub.customer,
    stripe_subscription_id: sub.id,
    cancel_at_period_end: sub.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  });
  // 23503 : le compte a été supprimé entre-temps, rien à enregistrer.
  if (error && error.code !== "23503") throw new Error(error.message);
}

/**
 * Stripe appelle cette adresse à chaque paiement, renouvellement ou résiliation.
 * La signature est vérifiée : impossible de simuler un abonnement.
 */
export async function POST(request: NextRequest) {
  if (!STRIPE_ENABLED) return NextResponse.json({ error: "disabled" }, { status: 404 });

  const rawBody = await request.text();
  if (!verifyStripeSignature(rawBody, request.headers.get("stripe-signature"))) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as StripeEvent;
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { subscription?: string; client_reference_id?: string };
        if (session.subscription) {
          // On relit l'abonnement chez Stripe pour avoir son état exact.
          const sub = await stripe<StripeSubscription>("GET", `/subscriptions/${encodeURIComponent(session.subscription)}`);
          await saveSubscription(sub, session.client_reference_id);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await saveSubscription(event.data.object as unknown as StripeSubscription);
        break;
      default:
        break;
    }
  } catch {
    // Stripe réessaiera automatiquement plus tard.
    return NextResponse.json({ error: "processing failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
