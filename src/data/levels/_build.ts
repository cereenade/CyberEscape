/**
 * Petits raccourcis pour écrire les salles de façon compacte (salles 41 et suivantes).
 * Ils produisent exactement les mêmes objets que l'écriture « longue » des premiers fichiers.
 */
import type { Op } from "@/lib/crypto";
import type { CardCategory, CardContent, ChoiceOption, Email, Puzzle, RoomContent } from "@/lib/types";

/** Option de réponse : [libellé, bonne réponse ?, explication]. */
export type Opt = [label: string, correct: boolean, explanation: string];

/** Éléments facultatifs d'une énigme : document à analyser, atelier de décodage… */
export interface Extra {
  intro?: string;
  content?: string;
  contentLabel?: string;
  tools?: Op[];
  workshopInput?: string;
}

const toOptions = (opts: Opt[]): ChoiceOption[] => opts.map(([label, correct, explanation]) => ({ label, correct, explanation }));

export function card(title: string, category: CardCategory, icon: string, summary: string, details: string[], hint: string): CardContent {
  return { title, category, icon, summary, details, hint };
}

export function choice(question: string, opts: Opt[], extra: Extra = {}): Puzzle {
  return { kind: "choice", question, options: toOptions(opts), ...extra };
}

export function multi(question: string, opts: Opt[], extra: Extra = {}): Puzzle {
  return { kind: "multi", question, options: toOptions(opts), ...extra };
}

/** `items` dans le BON ordre : le jeu les mélange. */
export function order(question: string, items: string[], extra: Extra = {}): Puzzle {
  return { kind: "order", question, items, ...extra };
}

export function answer(question: string, answers: string[], extra: Extra & { placeholder?: string; strict?: boolean } = {}): Puzzle {
  return { kind: "answer", question, answers, ...extra };
}

/** Mail de la chasse au phishing : [nom, adresse, objet, texte, texte du lien, vraie adresse du lien, piège ?, explication]. */
export type Mail = [fromName: string, fromAddress: string, subject: string, body: string, linkText: string, linkHref: string, isPhishing: boolean, explanation: string];

export function phishing(mails: Mail[], extra: Extra = {}): Puzzle {
  const emails: Email[] = mails.map(([fromName, fromAddress, subject, body, linkText, linkHref, isPhishing, explanation], i) => ({
    id: `m${i + 1}`,
    fromName,
    fromAddress,
    subject,
    body,
    linkText,
    linkHref,
    isPhishing,
    explanation,
  }));
  return { kind: "phishing", emails, ...extra };
}

export function room(id: string, name: string, story: string, roomCard: CardContent, puzzle: Puzzle, successText: string): RoomContent {
  return { id, name, story, card: roomCard, puzzle, successText };
}
