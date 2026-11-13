"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser, getSubscription, isActive, isAdmin, todayInParis } from "@/server/player";
import { getAdminSupabase } from "@/server/supabase-admin";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Chaque action admin revérifie les droits : on ne fait jamais confiance au navigateur. */
async function requireAdmin() {
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin || !(await isAdmin(user.id))) throw new Error("Accès refusé");
  return admin;
}

function targetId(form: FormData): string {
  const id = String(form.get("userId") ?? "");
  if (!UUID.test(id)) throw new Error("Identifiant invalide");
  return id;
}

const DURATIONS: Record<string, number | null> = { "30": 30, "365": 365, illimite: null };

/** Offre l'accès illimité à un joueur (sans paiement). */
export async function grantFreeAccess(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const userId = targetId(form);
  const duration = String(form.get("duree") ?? "30");
  if (!(duration in DURATIONS)) throw new Error("Durée invalide");

  const current = await getSubscription(userId);
  // Ne jamais écraser un abonnement payant en cours.
  if (current && current.plan !== "offert" && isActive(current)) return;

  const days = DURATIONS[duration];
  await admin.from("subscriptions").upsert({
    user_id: userId,
    plan: "offert",
    status: "active",
    current_period_end: days ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString() : null,
    cancel_at_period_end: false,
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/admin");
}

export async function revokeFreeAccess(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const userId = targetId(form);
  await admin
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("plan", "offert");
  revalidatePath("/admin");
}

/** Rend ses jetons du jour à un joueur (utile pour tester ou dépanner). */
export async function resetTodayTokens(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const userId = targetId(form);
  await admin.from("daily_usage").delete().eq("user_id", userId).eq("day", todayInParis());
  await admin.from("room_attempts").delete().eq("user_id", userId);
  revalidatePath("/admin");
}

/** Valide manuellement le statut étudiant (ex. carte étudiante envoyée par mail). */
export async function verifyStudentManually(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const userId = targetId(form);
  const now = new Date();
  await admin.from("student_verifications").upsert({
    user_id: userId,
    verified_at: now.toISOString(),
    expires_at: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  });
  revalidatePath("/admin");
}
