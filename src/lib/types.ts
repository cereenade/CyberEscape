import type { Op } from "./crypto";

/* ---------- Niveaux ---------- */

export type LevelId = "facile" | "moyen" | "difficile" | "tres-difficile" | "impossible";

export interface Level {
  id: LevelId;
  name: string;
  icon: string;
  tagline: string;
  description: string;
}

/* ---------- Cyber-cartes ---------- */

export type CardCategory =
  | "Web"
  | "Crypto"
  | "Social"
  | "Mots de passe"
  | "Réseau"
  | "Système"
  | "Défense";

/** Contenu d'une carte tel qu'il est écrit dans une salle. */
export interface CardContent {
  title: string;
  category: CardCategory;
  icon: string;
  /** Résumé en une phrase, affiché sur la carte. */
  summary: string;
  /** Explication détaillée de la notion. */
  details: string[];
  /** Indice pour résoudre l'énigme de la salle. */
  hint: string;
}

/** Carte complète : son identifiant est celui de la salle où on la trouve. */
export interface CyberCard extends CardContent {
  id: string;
  level: LevelId;
}

/* ---------- Énigmes ---------- */

export interface Email {
  id: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  body: string;
  linkText: string;
  linkHref: string;
  isPhishing: boolean;
  /** Pourquoi ce mail est (ou n'est pas) un piège. */
  explanation: string;
}

export interface ChoiceOption {
  label: string;
  correct: boolean;
  explanation: string;
}

interface PuzzleBase {
  /** Texte d'introduction de l'énigme. */
  intro?: string;
  /** Document à analyser (code, log, message…), affiché en police mono. */
  content?: string;
  contentLabel?: string;
  /** Outils disponibles dans l'atelier de décodage (aucun = pas d'atelier). */
  tools?: Op[];
  /** Texte placé au départ dans l'atelier de décodage. */
  workshopInput?: string;
}

export type Puzzle =
  | (PuzzleBase & {
      kind: "answer";
      question: string;
      /** Réponses acceptées (comparées sans accents, casse ni ponctuation). */
      answers: string[];
      placeholder?: string;
      /** Comparaison stricte : seuls la casse et les espaces sont ignorés (utile pour du code). */
      strict?: boolean;
    })
  | (PuzzleBase & { kind: "phishing"; emails: Email[] })
  | (PuzzleBase & { kind: "choice"; question: string; options: ChoiceOption[] })
  | (PuzzleBase & {
      kind: "multi";
      /** Cocher toutes les bonnes réponses (et seulement elles). */
      question: string;
      options: ChoiceOption[];
    })
  | (PuzzleBase & {
      kind: "order";
      /** Remettre les étapes dans l'ordre ; `items` est écrit dans le BON ordre. */
      question: string;
      items: string[];
    });

/* ---------- Salles ---------- */

export interface RoomContent {
  id: string;
  name: string;
  story: string;
  card: CardContent;
  puzzle: Puzzle;
  successText: string;
}

export interface Room extends RoomContent {
  level: LevelId;
  /** Position dans le niveau, à partir de 0. */
  index: number;
}

/* ---------- Salle de cours ---------- */

export interface LessonSection {
  title: string;
  paragraphs: string[];
  example?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index de la bonne réponse dans `options`. */
  correct: number;
  explanation: string;
}

export type LessonTheme = "bases" | "humain" | "web" | "crypto" | "reseau" | "systeme" | "soc" | "pentest" | "infra" | "grc";
export type LessonLevel = "debutant" | "intermediaire" | "avance";

export interface Lesson {
  slug: string;
  title: string;
  icon: string;
  theme: LessonTheme;
  level: LessonLevel;
  summary: string;
  duration: string;
  /** Ce que la leçon permet de savoir faire, affiché en tête. */
  objectives: string[];
  sections: LessonSection[];
  /** Les points essentiels, résumés avant le quiz. */
  keyPoints: string[];
  quiz: QuizQuestion[];
  /** Références officielles pour vérifier et aller plus loin. */
  sources?: { label: string; url: string }[];
}

/* ---------- Données envoyées au navigateur (sans les réponses) ---------- */

export interface PublicEmail {
  id: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  body: string;
  linkText: string;
  linkHref: string;
}

interface PublicPuzzleBase {
  intro?: string;
  content?: string;
  contentLabel?: string;
  tools?: Op[];
  workshopInput?: string;
}

export type PublicPuzzle =
  | (PublicPuzzleBase & { kind: "answer"; question: string; placeholder?: string })
  | (PublicPuzzleBase & { kind: "phishing"; emails: PublicEmail[] })
  | (PublicPuzzleBase & { kind: "choice"; question: string; options: string[] })
  | (PublicPuzzleBase & { kind: "multi"; question: string; options: string[] })
  | (PublicPuzzleBase & { kind: "order"; question: string; items: string[] });

export interface PublicRoom {
  id: string;
  level: LevelId;
  index: number;
  name: string;
  story: string;
  card: CyberCard;
  puzzle: PublicPuzzle;
}

/* ---------- Réponses envoyées au serveur ---------- */

export type Submission =
  | { kind: "answer"; value: string }
  | { kind: "choice"; index: number }
  | { kind: "multi"; indices: number[] }
  | { kind: "phishing"; emailId: string }
  | { kind: "order"; sequence: string[] };

export interface SubmitResult {
  correct: boolean;
  /** Message à afficher en cas d'erreur (mauvaise réponse, plus de jetons…). */
  message?: string;
  /** Explications des mauvais choix (choix unique, multiple, phishing). */
  explanations?: string[];
  /** Nombre de bonnes réponses manquantes (choix multiples). */
  missing?: number;
  successText?: string;
  /** Plus de jetons aujourd'hui : afficher l'offre d'abonnement. */
  noTokens?: boolean;
  status?: PlayerStatus;
}

/* ---------- État du joueur ---------- */

export interface Progress {
  cards: string[];
  solvedRooms: string[];
  lessonsDone: string[];
}

export interface PlayerStatus {
  loggedIn: boolean;
  premium: boolean;
  plan: "etudiant" | "standard" | "offert" | null;
  tokensLeft: number;
  tokensPerDay: number;
  progress: Progress;
}
