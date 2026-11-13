import type { Lesson, LessonLevel, LessonTheme } from "@/lib/types";
import { API_CLOUD } from "./api-cloud";
import { ARNAQUES } from "./arnaques";
import { ATTACK } from "./attack";
import { BASES } from "./bases";
import { CRYPTANALYSE } from "./cryptanalyse";
import { CRYPTO } from "./crypto";
import { CRYPTO_MODERNE } from "./crypto-moderne";
import { CTI } from "./cti";
import { DEFENSE_RESEAU } from "./defense-reseau";
import { DETECTION } from "./detection";
import { HACHAGE } from "./hachage";
import { HTTP } from "./http";
import { INCIDENT } from "./incident";
import { INGENIERIE_SOCIALE } from "./ingenierie-sociale";
import { LINUX } from "./linux";
import { LOI } from "./loi";
import { MALWARE } from "./malware";
import { METIERS } from "./metiers";
import { MOBILE } from "./mobile";
import { MOTS_DE_PASSE } from "./mots-de-passe";
import { OSINT } from "./osint";
import { OWASP } from "./owasp";
import { PHISHING } from "./phishing";
import { RESEAU } from "./reseau";
import { SAUVEGARDES } from "./sauvegardes";
import { SYSTEME } from "./systeme";
import { TCP_IP } from "./tcp-ip";
import { VIE_PRIVEE } from "./vie-privee";
import { WEB } from "./web";
import { WINDOWS } from "./windows";

export const THEMES: { id: LessonTheme; name: string; icon: string; description: string }[] = [
  { id: "bases", name: "Les fondamentaux", icon: "🛡️", description: "Les notions et les réflexes indispensables pour bien démarrer." },
  { id: "humain", name: "L'humain et les arnaques", icon: "🎣", description: "Phishing, ingénierie sociale, vie privée : quand l'attaque vise les personnes." },
  { id: "web", name: "Le web", icon: "🌐", description: "Comment fonctionne le web et comment on attaque les sites et les API." },
  { id: "crypto", name: "La cryptographie", icon: "🔐", description: "Encoder, chiffrer, hacher, et casser les chiffres classiques." },
  { id: "reseau", name: "Les réseaux", icon: "📡", description: "IP, ports, protocoles, pare-feu et reconnaissance." },
  { id: "systeme", name: "Les systèmes", icon: "🖥️", description: "Linux, Windows, permissions, processus et journaux." },
  { id: "soc", name: "Défense et SOC", icon: "🔎", description: "Détecter, analyser et répondre aux attaques comme une équipe SOC." },
];

export const LESSON_LEVELS: { id: LessonLevel; name: string }[] = [
  { id: "debutant", name: "Débutant" },
  { id: "intermediaire", name: "Intermédiaire" },
  { id: "avance", name: "Avancé" },
];

const LEVEL_ORDER: Record<LessonLevel, number> = { debutant: 0, intermediaire: 1, avance: 2 };

const ALL: Lesson[] = [
  BASES, MOTS_DE_PASSE, MOBILE, SAUVEGARDES, METIERS, LOI,
  PHISHING, VIE_PRIVEE, ARNAQUES, INGENIERIE_SOCIALE,
  HTTP, WEB, OWASP, API_CLOUD,
  CRYPTO, CRYPTO_MODERNE, HACHAGE, CRYPTANALYSE,
  RESEAU, TCP_IP, DEFENSE_RESEAU, OSINT,
  SYSTEME, LINUX, WINDOWS,
  INCIDENT, DETECTION, MALWARE, ATTACK, CTI,
];

/** Leçons triées par thème, puis par niveau (débutant → avancé). */
export const LESSONS: Lesson[] = THEMES.flatMap((theme) =>
  ALL.filter((lesson) => lesson.theme === theme.id).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]),
);

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}

export function levelName(level: LessonLevel): string {
  return LESSON_LEVELS.find((l) => l.id === level)?.name ?? level;
}

export function themeOf(lesson: Lesson) {
  return THEMES.find((t) => t.id === lesson.theme);
}
