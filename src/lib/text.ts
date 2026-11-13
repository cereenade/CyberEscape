/**
 * Normalise une réponse pour la comparer sans tenir compte
 * des majuscules, des accents, des espaces ni de la ponctuation.
 * Exemple : " Pare-Feu ! " → "parefeu"
 */
export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function isCorrectAnswer(input: string, expected: string): boolean {
  return normalizeAnswer(input) === normalizeAnswer(expected);
}
