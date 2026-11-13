const ALPHABET_SIZE = 26;

/**
 * Chiffre de César : décale chaque lettre de `shift` positions.
 * Un décalage négatif permet de déchiffrer.
 */
export function caesar(text: string, shift: number): string {
  const s = ((shift % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
  return text.replace(/[a-z]/gi, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + s) % ALPHABET_SIZE) + base);
  });
}

/** Décode une chaîne Base64. Renvoie `null` si elle n'est pas valide. */
export function decodeBase64(value: string): string | null {
  try {
    return atob(value.trim());
  } catch {
    return null;
  }
}
