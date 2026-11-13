export type CardCategory = "Web" | "Crypto" | "Social" | "Mots de passe";

export interface CyberCard {
  id: string;
  title: string;
  category: CardCategory;
  icon: string;
  /** Résumé en une phrase, affiché sur la carte. */
  summary: string;
  /** Explication détaillée de la notion. */
  details: string[];
  /** Indice utilisé pour résoudre l'énigme de la salle. */
  hint: string;
}

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

export type Puzzle =
  | { kind: "source"; code: string; answer: string }
  | { kind: "cipher"; ciphertext: string; answer: string }
  | { kind: "phishing"; emails: Email[] }
  | { kind: "base64"; encoded: string; answer: string }
  | { kind: "choice"; question: string; options: ChoiceOption[] };

export interface Room {
  id: string;
  name: string;
  story: string;
  /** Carte trouvée en explorant la salle. */
  cardId: string;
  puzzle: Puzzle;
  successText: string;
}

export interface GameSave {
  version: 1;
  /** Index de la salle en cours (égal au nombre de salles une fois le jeu fini). */
  currentRoom: number;
  cards: string[];
  solvedRooms: string[];
}
