import "server-only";

/**
 * Envoi d'e-mails via Resend (https://resend.com), utilisé pour la vérification étudiante.
 * Variables Vercel : RESEND_API_KEY et EMAIL_FROM (ex. « CyberEscape <noreply@ton-domaine.fr> »).
 */
const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM;

export const EMAIL_ENABLED = Boolean(API_KEY && FROM);

export async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  if (!API_KEY || !FROM) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], subject, html, text }),
    cache: "no-store",
  });
  return response.ok;
}

/** Échappe le texte inséré dans un e-mail HTML. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}
