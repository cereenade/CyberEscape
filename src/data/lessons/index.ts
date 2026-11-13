import type { Lesson } from "@/lib/types";
import { BASES } from "./bases";
import { CRYPTO } from "./crypto";
import { INCIDENT } from "./incident";
import { MOTS_DE_PASSE } from "./mots-de-passe";
import { PHISHING } from "./phishing";
import { RESEAU } from "./reseau";
import { SYSTEME } from "./systeme";
import { WEB } from "./web";

/** Ordre conseillé de lecture dans la salle de cours. */
export const LESSONS: Lesson[] = [BASES, MOTS_DE_PASSE, PHISHING, WEB, CRYPTO, RESEAU, SYSTEME, INCIDENT];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}
