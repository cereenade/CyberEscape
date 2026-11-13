"use server";

import { ROOMS } from "@/data/game";
import { LESSONS } from "@/data/lessons";
import { TOKENS_PER_DAY } from "@/data/meta";
import { checkSubmission } from "@/server/game-logic";
import { GUEST_STATUS, getPlayerStatus, getSessionUser, getSubscription, isActive } from "@/server/player";
import { getAdminSupabase } from "@/server/supabase-admin";
import type { PlayerStatus, Submission, SubmitResult } from "@/lib/types";

/** Nombre maximal d'essais par salle et par jour (empêche de deviner une réponse par force brute). */
const MAX_ATTEMPTS_PER_ROOM = 30;

const SERVICE_UNAVAILABLE = "Le jeu est momentanément indisponible. Réessaie dans quelques minutes.";

/** État du joueur : connexion, abonnement, jetons et progression. */
export async function getStatus(): Promise<PlayerStatus> {
  const user = await getSessionUser();
  return getPlayerStatus(user);
}

/** Vérifie une réponse sur le serveur et, si elle est juste, consomme un jeton. */
export async function submitAnswer(roomId: string, submission: Submission): Promise<SubmitResult> {
  const user = await getSessionUser();
  if (!user) return { correct: false, message: "Connecte-toi pour jouer." };

  const admin = getAdminSupabase();
  if (!admin) return { correct: false, message: SERVICE_UNAVAILABLE };

  const room = ROOMS.find((r) => r.id === roomId);
  if (!room || typeof submission !== "object" || submission === null) {
    return { correct: false, message: "Salle inconnue." };
  }

  const { data: allowed, error: attemptError } = await admin.rpc("register_attempt", {
    p_user: user.id,
    p_room: room.id,
    p_max: MAX_ATTEMPTS_PER_ROOM,
  });
  if (attemptError) return { correct: false, message: SERVICE_UNAVAILABLE };
  if (allowed === false) {
    return { correct: false, message: "Trop d'essais sur cette salle aujourd'hui. Reviens demain, ou relis la carte et les cours !" };
  }

  const check = checkSubmission(room.puzzle, submission);
  if (!check.correct) {
    return { correct: false, explanations: check.explanations, missing: check.missing };
  }

  const premium = isActive(await getSubscription(user.id));
  const { data, error } = await admin.rpc("consume_room", {
    p_user: user.id,
    p_room: room.id,
    p_premium: premium,
    p_limit: TOKENS_PER_DAY,
  });
  if (error || !data) return { correct: false, message: SERVICE_UNAVAILABLE };

  const result = data as { ok: boolean; reason?: string };
  const status = await getPlayerStatus(user);
  if (!result.ok) {
    return {
      correct: false,
      noTokens: true,
      message: "Bonne réponse… mais tu n'as plus de jetons aujourd'hui. Reviens demain, ou passe à l'abonnement illimité !",
      status,
    };
  }
  return { correct: true, successText: room.successText, status };
}

/** Ajoute la carte d'une salle au deck (quand le joueur peut jouer cette salle). */
export async function collectCard(roomId: string): Promise<PlayerStatus> {
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return GUEST_STATUS;

  const room = ROOMS.find((r) => r.id === roomId);
  if (room) {
    const status = await getPlayerStatus(user);
    const canPlay = status.premium || status.tokensLeft > 0 || status.progress.solvedRooms.includes(room.id);
    if (canPlay) await admin.rpc("add_progress_item", { p_user: user.id, p_field: "cards", p_value: room.id });
  }
  return getPlayerStatus(user);
}

/** Marque une leçon comme validée (après un quiz parfait). */
export async function completeLesson(slug: string): Promise<PlayerStatus> {
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return GUEST_STATUS;

  if (LESSONS.some((lesson) => lesson.slug === slug)) {
    await admin.rpc("add_progress_item", { p_user: user.id, p_field: "lessons_done", p_value: slug });
  }
  return getPlayerStatus(user);
}

/** Remet la progression à zéro (les jetons déjà utilisés aujourd'hui ne sont pas rendus). */
export async function resetProgress(): Promise<PlayerStatus> {
  const user = await getSessionUser();
  const admin = getAdminSupabase();
  if (!user || !admin) return GUEST_STATUS;

  await admin
    .from("progress")
    .update({ cards: [], solved_rooms: [], lessons_done: [], updated_at: new Date().toISOString() })
    .eq("user_id", user.id);
  return getPlayerStatus(user);
}
