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

/** Ignore seulement la casse, les espaces et le style des apostrophes. */
export function normalizeStrict(value: string): string {
  return value.toLowerCase().replace(/[\u2018\u2019`]/g, "'").replace(/\s+/g, "");
}

export function isCorrectAnswer(input: string, accepted: string[], strict = false): boolean {
  const normalize = strict ? normalizeStrict : normalizeAnswer;
  const normalized = normalize(input);
  return normalized !== "" && accepted.some((answer) => normalize(answer) === normalized);
}
