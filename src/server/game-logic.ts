import "server-only";
import { isCorrectAnswer } from "@/lib/text";
import type { PublicPuzzle, PublicRoom, Puzzle, Room, Submission } from "@/lib/types";

/* ---------- Ce qu'on envoie au navigateur ---------- */

/** Mélange stable (toujours le même pour une liste donnée), jamais identique au bon ordre. */
function stableShuffle(items: string[]): string[] {
  const score = (text: string) => Array.from(text).reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 1_000_003, 7);
  const mixed = [...items].sort((a, b) => score(a) - score(b));
  const same = mixed.every((item, i) => item === items[i]);
  return same ? [...mixed.slice(1), mixed[0]] : mixed;
}

/** Retire toutes les réponses d'une énigme avant de l'envoyer au navigateur. */
export function toPublicPuzzle(puzzle: Puzzle): PublicPuzzle {
  const base = {
    intro: puzzle.intro,
    content: puzzle.content,
    contentLabel: puzzle.contentLabel,
    tools: puzzle.tools,
    workshopInput: puzzle.workshopInput,
  };
  switch (puzzle.kind) {
    case "answer":
      return { ...base, kind: "answer", question: puzzle.question, placeholder: puzzle.placeholder };
    case "choice":
      return { ...base, kind: "choice", question: puzzle.question, options: puzzle.options.map((o) => o.label) };
    case "multi":
      return { ...base, kind: "multi", question: puzzle.question, options: puzzle.options.map((o) => o.label) };
    case "phishing":
      return {
        ...base,
        kind: "phishing",
        emails: puzzle.emails.map(({ id, fromName, fromAddress, subject, body, linkText, linkHref }) => ({
          id,
          fromName,
          fromAddress,
          subject,
          body,
          linkText,
          linkHref,
        })),
      };
    case "order":
      return { ...base, kind: "order", question: puzzle.question, items: stableShuffle(puzzle.items) };
  }
}

export function toPublicRoom(room: Room): PublicRoom {
  return {
    id: room.id,
    level: room.level,
    index: room.index,
    name: room.name,
    story: room.story,
    card: { ...room.card, id: room.id, level: room.level },
    puzzle: toPublicPuzzle(room.puzzle),
  };
}

/* ---------- Vérification d'une réponse ---------- */

export interface CheckResult {
  correct: boolean;
  explanations?: string[];
  missing?: number;
}

const MAX_TEXT = 300;

export function checkSubmission(puzzle: Puzzle, submission: Submission): CheckResult {
  if (puzzle.kind !== submission.kind) return { correct: false };

  switch (puzzle.kind) {
    case "answer": {
      const value = (submission as { value: unknown }).value;
      if (typeof value !== "string" || value.length > MAX_TEXT) return { correct: false };
      return { correct: isCorrectAnswer(value, puzzle.answers, puzzle.strict) };
    }
    case "choice": {
      const index = (submission as { index: unknown }).index;
      const option = Number.isInteger(index) ? puzzle.options[index as number] : undefined;
      if (!option) return { correct: false };
      return option.correct ? { correct: true } : { correct: false, explanations: [option.explanation] };
    }
    case "multi": {
      const raw = (submission as { indices: unknown }).indices;
      if (!Array.isArray(raw) || raw.length > puzzle.options.length) return { correct: false };
      const indices = Array.from(new Set(raw.filter((i): i is number => Number.isInteger(i) && i >= 0 && i < puzzle.options.length)));
      const wrong = indices.filter((i) => !puzzle.options[i].correct);
      const missing = puzzle.options.filter((o, i) => o.correct && !indices.includes(i)).length;
      if (wrong.length === 0 && missing === 0) return { correct: true };
      return {
        correct: false,
        explanations: wrong.map((i) => `${puzzle.options[i].label} : ${puzzle.options[i].explanation}`),
        missing,
      };
    }
    case "phishing": {
      const emailId = (submission as { emailId: unknown }).emailId;
      const email = puzzle.emails.find((e) => e.id === emailId);
      if (!email) return { correct: false };
      return email.isPhishing ? { correct: true } : { correct: false, explanations: [email.explanation] };
    }
    case "order": {
      const sequence = (submission as { sequence: unknown }).sequence;
      if (!Array.isArray(sequence) || sequence.length !== puzzle.items.length) return { correct: false };
      return { correct: sequence.every((item, i) => item === puzzle.items[i]) };
    }
  }
}
