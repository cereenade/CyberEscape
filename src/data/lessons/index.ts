import type { Lesson, LessonLevel, LessonTheme } from "@/lib/types";
import { ACTIVE_DIRECTORY } from "./active-directory";
import { ADRESSAGE_IP } from "./adressage-ip";
import { ANALYSE_RISQUE } from "./analyse-risque";
import { API_CLOUD } from "./api-cloud";
import { ARNAQUES } from "./arnaques";
import { ARNAQUES_QUOTIDIEN } from "./arnaques-quotidien";
import { ASYMETRIQUE } from "./asymetrique";
import { ATTACK } from "./attack";
import { AUTHENTIFICATION_WEB } from "./authentification-web";
import { BASES } from "./bases";
import { CONTINUITE_ACTIVITE } from "./continuite-activite";
import { COOKIES_SESSIONS } from "./cookies-sessions";
import { CRYPTANALYSE } from "./cryptanalyse";
import { CRYPTO } from "./crypto";
import { CRYPTO_FUTUR } from "./crypto-futur";
import { CRYPTO_MODERNE } from "./crypto-moderne";
import { CTI } from "./cti";
import { DEFENSE_RESEAU } from "./defense-reseau";
import { DETECTION } from "./detection";
import { DNS } from "./dns";
import { FORENSIQUE_WINDOWS } from "./forensique-windows";
import { FRAUDE_ENTREPRISE } from "./fraude-entreprise";
import { GOUVERNANCE } from "./gouvernance";
import { GRC_INTRODUCTION } from "./grc-introduction";
import { HACHAGE } from "./hachage";
import { HTTP } from "./http";
import { IA_MANIPULATION } from "./ia-manipulation";
import { INCIDENT } from "./incident";
import { INFRA_ARCHITECTURE } from "./infra-architecture";
import { INFRA_CLOUD } from "./infra-cloud";
import { INFRA_CORRECTIFS } from "./infra-correctifs";
import { INFRA_DURCISSEMENT } from "./infra-durcissement";
import { INFRA_IAM } from "./infra-iam";
import { INFRA_POSTE } from "./infra-poste";
import { INFRA_SEGMENTATION } from "./infra-segmentation";
import { INGENIERIE_DETECTION } from "./ingenierie-detection";
import { INGENIERIE_SOCIALE } from "./ingenierie-sociale";
import { INJECTION_SQL } from "./injection-sql";
import { INTERNET_INFRA } from "./internet-infra";
import { ISO_27001 } from "./iso-27001";
import { LIGNE_COMMANDE } from "./ligne-commande";
import { LINUX } from "./linux";
import { LIRE_JOURNAUX } from "./lire-journaux";
import { LOI } from "./loi";
import { MALWARE } from "./malware";
import { METIERS } from "./metiers";
import { MOBILE } from "./mobile";
import { MODES_CHIFFREMENT } from "./modes-chiffrement";
import { MOTS_DE_PASSE } from "./mots-de-passe";
import { OSINT } from "./osint";
import { OWASP } from "./owasp";
import { PENTEST_INTERNE } from "./pentest-interne";
import { PENTEST_METHODOLOGIE } from "./pentest-methodologie";
import { PENTEST_METIER } from "./pentest-metier";
import { PENTEST_RAPPORT } from "./pentest-rapport";
import { PENTEST_RECONNAISSANCE } from "./pentest-reconnaissance";
import { PENTEST_SCAN } from "./pentest-scan";
import { PENTEST_VULNERABILITES } from "./pentest-vulnerabilites";
import { PENTEST_WEB } from "./pentest-web";
import { PHISHING } from "./phishing";
import { PRIVILEGES_LINUX } from "./privileges-linux";
import { PRIVILEGES_WINDOWS } from "./privileges-windows";
import { RECONNAITRE_ENCODAGES } from "./reconnaitre-encodages";
import { REGLEMENTATIONS_EUROPE } from "./reglementations-europe";
import { RESEAU } from "./reseau";
import { RESEAU_LOCAL_ATTAQUES } from "./reseau-local-attaques";
import { RESEAUX_SOCIAUX } from "./reseaux-sociaux";
import { RGPD_SECURITE } from "./rgpd-securite";
import { SAUVEGARDES } from "./sauvegardes";
import { SECURITE_CLOUD } from "./securite-cloud";
import { SECURITE_NAVIGATEUR } from "./securite-navigateur";
import { SECURITE_PHYSIQUE } from "./securite-physique";
import { SYSTEME } from "./systeme";
import { TCP_IP } from "./tcp-ip";
import { TELETRAVAIL } from "./teletravail";
import { TIERS_AUDIT } from "./tiers-audit";
import { TRIAGE_ALERTES } from "./triage-alertes";
import { VIE_PRIVEE } from "./vie-privee";
import { WEB } from "./web";
import { WEB_AVANCE } from "./web-avance";
import { WIFI } from "./wifi";
import { WINDOWS } from "./windows";
import { ZERO_TRUST } from "./zero-trust";

export const THEMES: { id: LessonTheme; name: string; icon: string; description: string }[] = [
  { id: "bases", name: "Les fondamentaux", icon: "🛡️", description: "Les notions et les réflexes indispensables pour bien démarrer." },
  { id: "humain", name: "L'humain et les arnaques", icon: "🎣", description: "Phishing, ingénierie sociale, vie privée : quand l'attaque vise les personnes." },
  { id: "web", name: "Le web", icon: "🌐", description: "Comment fonctionne le web et comment on attaque les sites et les API." },
  { id: "crypto", name: "La cryptographie", icon: "🔐", description: "Encoder, chiffrer, hacher, et casser les chiffres classiques." },
  { id: "reseau", name: "Les réseaux", icon: "📡", description: "IP, ports, protocoles, pare-feu et reconnaissance." },
  { id: "systeme", name: "Les systèmes", icon: "🖥️", description: "Linux, Windows, permissions, processus et journaux." },
  { id: "soc", name: "Défense et SOC", icon: "🔎", description: "Détecter, analyser et répondre aux attaques comme une équipe SOC." },
  { id: "pentest", name: "Pentest", icon: "🗡️", description: "Tester la sécurité comme un attaquant, avec méthode et autorisation." },
  { id: "infra", name: "Infrastructure", icon: "🏗️", description: "Concevoir, durcir et exploiter un système d'information sûr." },
  { id: "grc", name: "Gouvernance, risques et conformité", icon: "⚖️", description: "Piloter la sécurité : risques, normes, lois et continuité d'activité." },
];

export const LESSON_LEVELS: { id: LessonLevel; name: string }[] = [
  { id: "debutant", name: "Débutant" },
  { id: "intermediaire", name: "Intermédiaire" },
  { id: "avance", name: "Avancé" },
];

const LEVEL_ORDER: Record<LessonLevel, number> = { debutant: 0, intermediaire: 1, avance: 2 };

const ALL: Lesson[] = [
  BASES, MOTS_DE_PASSE, MOBILE, SAUVEGARDES, SECURITE_PHYSIQUE, TELETRAVAIL, METIERS, LOI,
  PHISHING, VIE_PRIVEE, ARNAQUES, RESEAUX_SOCIAUX, ARNAQUES_QUOTIDIEN, INGENIERIE_SOCIALE, FRAUDE_ENTREPRISE, IA_MANIPULATION,
  HTTP, COOKIES_SESSIONS, WEB, INJECTION_SQL, SECURITE_NAVIGATEUR, OWASP, API_CLOUD, AUTHENTIFICATION_WEB, WEB_AVANCE,
  CRYPTO, RECONNAITRE_ENCODAGES, CRYPTO_MODERNE, HACHAGE, CRYPTANALYSE, ASYMETRIQUE, MODES_CHIFFREMENT, CRYPTO_FUTUR,
  RESEAU, ADRESSAGE_IP, TCP_IP, DEFENSE_RESEAU, OSINT, WIFI, DNS, RESEAU_LOCAL_ATTAQUES, INTERNET_INFRA,
  LIGNE_COMMANDE, SYSTEME, LINUX, WINDOWS, PRIVILEGES_LINUX, PRIVILEGES_WINDOWS, ACTIVE_DIRECTORY, FORENSIQUE_WINDOWS,
  LIRE_JOURNAUX, INCIDENT, DETECTION, TRIAGE_ALERTES, MALWARE, ATTACK, CTI, INGENIERIE_DETECTION, SECURITE_CLOUD,
  PENTEST_METIER, PENTEST_METHODOLOGIE, PENTEST_RECONNAISSANCE, PENTEST_SCAN, PENTEST_VULNERABILITES, PENTEST_WEB, PENTEST_INTERNE, PENTEST_RAPPORT,
  INFRA_ARCHITECTURE, INFRA_CORRECTIFS, INFRA_DURCISSEMENT, INFRA_SEGMENTATION, INFRA_IAM, INFRA_POSTE, ZERO_TRUST, INFRA_CLOUD,
  GRC_INTRODUCTION, ANALYSE_RISQUE, ISO_27001, RGPD_SECURITE, CONTINUITE_ACTIVITE, GOUVERNANCE, REGLEMENTATIONS_EUROPE, TIERS_AUDIT,
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
