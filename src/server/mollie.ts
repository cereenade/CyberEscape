import "server-only";
import type { PaidPlan } from "@/data/meta";
import { SITE_URL } from "@/lib/site";

/**
 * Paiements Mollie, appelés directement via l'API REST v2 (pas de dépendance supplémentaire).
 * Tant que MOLLIE_API_KEY n'est pas définie sur Vercel, la vente est désactivée
 * et la page « Offres » affiche « bientôt disponible ».
 */
const API_KEY = process.env.MOLLIE_API_KEY;

export const MOLLIE_ENABLED = Boolean(API_KEY);

/** Montants envoyés à Mollie (format exigé : chaîne avec deux décimales). */
export const PLAN_AMOUNTS: Record<PaidPlan, string> = {
  etudiant: "2.99",
  standard: "4.99",
};

export const WEBHOOK_URL = `${SITE_URL}/api/mollie/webhook`;

export interface MolliePayment {
  id: string;
  status: "open" | "canceled" | "pending" | "authorized" | "expired" | "failed" | "paid";
  sequenceType: "oneoff" | "first" | "recurring";
  customerId?: string;
  subscriptionId?: string;
  metadata?: { user_id?: string; plan?: string; kind?: string } | null;
  _links?: { checkout?: { href: string } };
}

export interface MollieSubscription {
  id: string;
  status: "pending" | "active" | "canceled" | "suspended" | "completed";
  nextPaymentDate?: string;
  metadata?: { user_id?: string; plan?: string } | null;
}

/** Appel à l'API Mollie. `idempotencyKey` évite de créer deux fois la même ressource si Mollie réessaie. */
export async function mollie<T>(method: "GET" | "POST" | "DELETE", path: string, body?: unknown, idempotencyKey?: string): Promise<T> {
  if (!API_KEY) throw new Error("Mollie n'est pas configuré.");
  const headers: Record<string, string> = { Authorization: `Bearer ${API_KEY}` };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

  const response = await fetch(`https://api.mollie.com/v2${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (response.status === 204) return undefined as T;
  const json = (await response.json()) as T & { detail?: string };
  if (!response.ok) throw new Error(json.detail ?? `Erreur Mollie ${response.status}`);
  return json;
}

/** Date au format AAAA-MM-JJ, décalée d'un mois (prochain prélèvement). */
export function oneMonthFrom(date: Date): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 1);
  return next;
}

export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}
