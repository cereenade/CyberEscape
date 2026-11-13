import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaidPlan } from "@/data/meta";

/**
 * Paiements Stripe, appelés directement via l'API REST (pas de dépendance supplémentaire).
 * Tant que les variables ci-dessous ne sont pas définies sur Vercel, la vente est désactivée
 * et la page « Offres » affiche « bientôt disponible ».
 */
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const PRICES: Record<PaidPlan, string | undefined> = {
  etudiant: process.env.STRIPE_PRICE_STUDENT,
  standard: process.env.STRIPE_PRICE_STANDARD,
};

export const STRIPE_ENABLED = Boolean(SECRET_KEY && WEBHOOK_SECRET && PRICES.etudiant && PRICES.standard);

export function priceFor(plan: PaidPlan): string | undefined {
  return PRICES[plan];
}

export function planForPrice(priceId: string | undefined): PaidPlan | null {
  if (!priceId) return null;
  if (priceId === PRICES.etudiant) return "etudiant";
  if (priceId === PRICES.standard) return "standard";
  return null;
}

type Params = Record<string, string | number | boolean | undefined>;

/** Appel à l'API Stripe. Les paramètres sont envoyés au format formulaire, comme l'attend Stripe. */
export async function stripe<T = Record<string, unknown>>(method: "GET" | "POST" | "DELETE", path: string, params: Params = {}): Promise<T> {
  if (!SECRET_KEY) throw new Error("Stripe n'est pas configuré.");
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) body.append(key, String(value));
  }
  const encoded = body.toString();
  const query = method === "GET" && encoded ? `?${encoded}` : "";
  const response = await fetch(`https://api.stripe.com/v1${path}${query}`, {
    method,
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: method === "GET" ? undefined : encoded,
    cache: "no-store",
  });
  const json = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(json.error?.message ?? `Erreur Stripe ${response.status}`);
  return json;
}

const TOLERANCE_SECONDS = 5 * 60;

/**
 * Vérifie que la requête vient bien de Stripe (signature HMAC de l'en-tête « Stripe-Signature »).
 * Sans ça, n'importe qui pourrait se déclarer abonné en appelant le webhook.
 */
export function verifyStripeSignature(rawBody: string, header: string | null): boolean {
  if (!WEBHOOK_SECRET || !header) return false;
  const parts = header.split(",").map((part) => part.split("=") as [string, string]);
  const timestamp = Number(parts.find(([key]) => key === "t")?.[1]);
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!Number.isFinite(timestamp) || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > TOLERANCE_SECONDS) return false;

  const expected = Buffer.from(createHmac("sha256", WEBHOOK_SECRET).update(`${timestamp}.${rawBody}`).digest("hex"));
  return signatures.some((signature) => {
    const given = Buffer.from(signature);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
