import type { Lesson } from "@/lib/types";
import { BASES } from "./bases";
import { CRYPTO } from "./crypto";
import { CRYPTO_MODERNE } from "./crypto-moderne";
import { DETECTION } from "./detection";
import { INCIDENT } from "./incident";
import { MOBILE } from "./mobile";
import { MOTS_DE_PASSE } from "./mots-de-passe";
import { OSINT } from "./osint";
import { PHISHING } from "./phishing";
import { RESEAU } from "./reseau";
import { SAUVEGARDES } from "./sauvegardes";
import { SYSTEME } from "./systeme";
import { VIE_PRIVEE } from "./vie-privee";
import { WEB } from "./web";

/** Ordre conseillé de lecture dans la salle de cours, des bases vers le SOC. */
export const LESSONS: Lesson[] = [
  BASES,
  MOTS_DE_PASSE,
  PHISHING,
  VIE_PRIVEE,
  MOBILE,
  SAUVEGARDES,
  WEB,
  CRYPTO,
  CRYPTO_MODERNE,
  RESEAU,
  OSINT,
  SYSTEME,
  INCIDENT,
  DETECTION,
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}
