"use server";

import { randomBytes } from "node:crypto";
import { SITE_URL } from "@/lib/site";
import { EMAIL_ENABLED, escapeHtml, sendEmail } from "@/server/email";
import { getSessionUser } from "@/server/player";
import { hashToken, isSchoolEmail, normalizeEmail } from "@/server/student";
import { getAdminSupabase } from "@/server/supabase-admin";

interface ActionResult {
  ok: boolean;
  message: string;
}

/** Délai minimal entre deux envois, et durée de validité du lien. */
const RESEND_DELAY_MS = 60 * 1000;
const LINK_VALIDITY_MS = 24 * 60 * 60 * 1000;

/** Envoie un lien de vérification à l'adresse e-mail de l'école. */
export async function requestStudentVerification(rawEmail: string): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, message: "Connecte-toi d'abord." };
  const admin = getAdminSupabase();
  if (!admin || !EMAIL_ENABLED) return { ok: false, message: "La vérification étudiante sera bientôt disponible." };

  const email = normalizeEmail(String(rawEmail ?? ""));
  if (!isSchoolEmail(email)) {
    return {
      ok: false,
      message: "Cette adresse ne ressemble pas à une adresse d'école (ex. prenom.nom@etu.univ-xxx.fr). Les Gmail, Outlook… ne sont pas acceptés.",
    };
  }

  const { data: taken } = await admin
    .from("student_verifications")
    .select("user_id")
    .eq("school_email", email)
    .neq("user_id", user.id)
    .maybeSingle();
  if (taken) return { ok: false, message: "Cette adresse d'école est déjà utilisée par un autre compte." };

  const { data: current } = await admin.from("student_verifications").select("last_sent_at").eq("user_id", user.id).maybeSingle();
  if (current?.last_sent_at && Date.now() - new Date(current.last_sent_at as string).getTime() < RESEND_DELAY_MS) {
    return { ok: false, message: "Un e-mail vient d'être envoyé. Attends une minute avant de réessayer." };
  }

  // Le lien contient un jeton aléatoire ; la base n'en garde que l'empreinte (SHA-256).
  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  const { error } = await admin.from("student_verifications").upsert({
    user_id: user.id,
    pending_email: email,
    pending_token_hash: hashToken(token),
    pending_expires_at: new Date(now.getTime() + LINK_VALIDITY_MS).toISOString(),
    last_sent_at: now.toISOString(),
  });
  if (error) return { ok: false, message: "Impossible d'enregistrer la demande. Réessaie plus tard." };

  const link = `${SITE_URL}/etudiant/verifier?jeton=${token}`;
  const sent = await sendEmail(
    email,
    "Confirme ton statut étudiant sur CyberEscape",
    `<p>Bonjour,</p><p>Pour confirmer que tu es étudiant(e) et profiter de l'offre à 2,99 €/mois, clique sur ce lien (valable 24 h) :</p><p><a href="${escapeHtml(link)}">Confirmer mon adresse d'école</a></p><p>Si tu n'as rien demandé, ignore simplement ce message.</p><p>— CyberEscape</p>`,
    `Bonjour,\n\nPour confirmer que tu es étudiant(e) sur CyberEscape, ouvre ce lien (valable 24 h) :\n${link}\n\nSi tu n'as rien demandé, ignore ce message.`,
  );
  if (!sent) return { ok: false, message: "L'e-mail n'a pas pu être envoyé. Vérifie l'adresse et réessaie." };

  return { ok: true, message: `C'est envoyé ! Ouvre l'e-mail reçu sur ${email} et clique sur le lien.` };
}
