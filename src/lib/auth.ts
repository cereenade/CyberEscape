/** Règles de validation et messages d'erreur des comptes, en français. */

export const PSEUDO_RULE = /^[A-Za-z0-9_-]{3,20}$/;
export const PASSWORD_MIN_LENGTH = 8;

export function validateEmail(email: string): string | null {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Adresse e-mail invalide.";
}

export function validatePseudo(pseudo: string): string | null {
  return PSEUDO_RULE.test(pseudo)
    ? null
    : "Le pseudo doit faire 3 à 20 caractères : lettres, chiffres, tiret ou tiret bas.";
}

export function validatePassword(password: string, confirm?: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Le mot de passe doit faire au moins ${PASSWORD_MIN_LENGTH} caractères. Une phrase de passe, c'est encore mieux !`;
  }
  if (confirm !== undefined && password !== confirm) return "Les deux mots de passe ne correspondent pas.";
  return null;
}

/** Traduit les erreurs renvoyées par Supabase en messages compréhensibles. */
export function translateAuthError(message: string | undefined): string {
  const m = (message ?? "").toLowerCase();
  if (m.includes("invalid login credentials")) return "E-mail ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Confirme d'abord ton adresse e-mail grâce au lien reçu par mail.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Un compte existe déjà avec cet e-mail.";
  if (m.includes("weak") || m.includes("pwned") || m.includes("leaked")) {
    return "Ce mot de passe est trop faible ou a déjà fuité. Choisis-en un autre.";
  }
  if (m.includes("password should be at least")) return "Le mot de passe est trop court.";
  if (m.includes("should be different")) return "Le nouveau mot de passe doit être différent de l'ancien.";
  if (m.includes("rate limit") || m.includes("for security purposes") || m.includes("too many")) {
    return "Trop de tentatives. Patiente un peu avant de réessayer.";
  }
  if (m.includes("database error saving new user")) return "Impossible de créer le compte : ce pseudo est peut-être déjà pris.";
  if (m.includes("fetch") || m.includes("network")) return "Impossible de joindre le serveur. Vérifie ta connexion.";
  return "Une erreur est survenue. Réessaie dans un instant.";
}

/** Échappe les caractères spéciaux d'un motif ILIKE (% et _). */
export function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}
