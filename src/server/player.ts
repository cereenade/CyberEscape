import "server-only";
import type { User } from "@supabase/supabase-js";
import { TOKENS_PER_DAY } from "@/data/meta";
import { getServerSupabase } from "@/lib/supabase/server";
import type { PlayerStatus, Progress } from "@/lib/types";
import { getAdminSupabase } from "./supabase-admin";

export const EMPTY_PROGRESS: Progress = { cards: [], solvedRooms: [], lessonsDone: [] };

export const GUEST_STATUS: PlayerStatus = {
  loggedIn: false,
  premium: false,
  plan: null,
  isAdmin: false,
  tokensLeft: 0,
  tokensPerDay: TOKENS_PER_DAY,
  progress: EMPTY_PROGRESS,
};

/** Joueur connecté, vérifié auprès de Supabase (jamais seulement d'après le cookie). */
export async function getSessionUser(): Promise<User | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Date du jour à Paris, au format AAAA-MM-JJ (les jetons se renouvellent à minuit, heure de Paris). */
export function todayInParis(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export interface Subscription {
  plan: "etudiant" | "standard" | "offert";
  status: string;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  cancel_at_period_end: boolean;
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  const admin = getAdminSupabase();
  if (!admin) return null;
  const { data } = await admin
    .from("subscriptions")
    .select("plan, status, current_period_end, stripe_customer_id, stripe_subscription_id, cancel_at_period_end")
    .eq("user_id", userId)
    .maybeSingle();
  return (data as Subscription | null) ?? null;
}

export function isActive(sub: Subscription | null): boolean {
  if (!sub) return false;
  if (!["active", "trialing"].includes(sub.status)) return false;
  return !sub.current_period_end || new Date(sub.current_period_end).getTime() > Date.now();
}

export async function isAdmin(userId: string): Promise<boolean> {
  const admin = getAdminSupabase();
  if (!admin) return false;
  const { data } = await admin.from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  return Boolean(data);
}

/** Accès illimité : abonnement actif ou compte administrateur. */
export async function hasUnlimitedAccess(userId: string): Promise<boolean> {
  const [sub, adminAccess] = await Promise.all([getSubscription(userId), isAdmin(userId)]);
  return adminAccess || isActive(sub);
}

export async function getPlayerStatus(user: User | null): Promise<PlayerStatus> {
  const admin = getAdminSupabase();
  if (!user || !admin) return GUEST_STATUS;

  const [progressRes, usageRes, sub, adminAccess] = await Promise.all([
    admin.from("progress").select("cards, solved_rooms, lessons_done").eq("user_id", user.id).maybeSingle(),
    admin.from("daily_usage").select("tokens_used").eq("user_id", user.id).eq("day", todayInParis()).maybeSingle(),
    getSubscription(user.id),
    isAdmin(user.id),
  ]);

  // Les administrateurs ont toujours l'accès illimité, sans abonnement.
  const subscribed = isActive(sub);
  const premium = subscribed || adminAccess;
  const used = (usageRes.data?.tokens_used as number | undefined) ?? 0;
  const row = progressRes.data as { cards: string[]; solved_rooms: string[]; lessons_done: string[] } | null;

  return {
    loggedIn: true,
    premium,
    plan: adminAccess ? "admin" : subscribed && sub ? sub.plan : null,
    isAdmin: adminAccess,
    tokensLeft: premium ? TOKENS_PER_DAY : Math.max(0, TOKENS_PER_DAY - used),
    tokensPerDay: TOKENS_PER_DAY,
    progress: row ? { cards: row.cards, solvedRooms: row.solved_rooms, lessonsDone: row.lessons_done } : EMPTY_PROGRESS,
  };
}
