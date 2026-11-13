/**
 * Encodages et chiffrements classiques utilisés par les énigmes.
 * Les fonctions `from…` / `decode…` lèvent une erreur lisible si l'entrée est invalide.
 */

export type Op =
  | "base64"
  | "hex"
  | "binary"
  | "rot13"
  | "caesar"
  | "atbash"
  | "reverse"
  | "url"
  | "morse"
  | "vigenere"
  | "xor";

export interface OpInfo {
  label: string;
  /** Paramètre éventuel : décalage (nombre) ou clé (texte). */
  param?: "shift" | "key";
  description: string;
}

export const OPS: Record<Op, OpInfo> = {
  base64: { label: "Base64 → texte", description: "Décode du Base64." },
  hex: { label: "Hex → texte", description: "Décode de l'hexadécimal (ex. 48 65 6c)." },
  binary: { label: "Binaire → texte", description: "Décode des octets écrits en 0 et 1." },
  rot13: { label: "ROT13", description: "Décale chaque lettre de 13 rangs." },
  caesar: { label: "César", param: "shift", description: "Recule chaque lettre de N rangs." },
  atbash: { label: "Atbash", description: "Inverse l'alphabet : A↔Z, B↔Y…" },
  reverse: { label: "Inverser", description: "Lit le texte à l'envers." },
  url: { label: "URL → texte", description: "Décode les %XX d'une URL." },
  morse: { label: "Morse → texte", description: "Décode du morse (. et -, / entre les mots)." },
  vigenere: { label: "Vigenère", param: "key", description: "Déchiffre avec une clé." },
  xor: { label: "XOR (hex)", param: "key", description: "Applique un XOR avec une clé sur de l'hexadécimal." },
};

export interface Step {
  op: Op;
  /** Décalage (César) ou clé (Vigenère, XOR). */
  param?: string;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

function bytesToText(bytes: Uint8Array): string {
  return decoder.decode(bytes);
}

function textToBytes(text: string): Uint8Array {
  return encoder.encode(text);
}

/* ---------- Substitutions ---------- */

/** Chiffre de César : décale chaque lettre de `shift` rangs (négatif = déchiffrer). */
export function caesar(text: string, shift: number): string {
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-z]/gi, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26) + base);
  });
}

export function atbash(text: string): string {
  return text.replace(/[a-z]/gi, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(base + 25 - (char.charCodeAt(0) - base));
  });
}

export function reverse(text: string): string {
  return Array.from(text).reverse().join("");
}

function vigenere(text: string, key: string, direction: 1 | -1): string {
  const shifts = key
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((c) => c.charCodeAt(0) - 65);
  if (shifts.length === 0) throw new Error("Il faut une clé faite de lettres.");
  let i = 0;
  return text.replace(/[a-z]/gi, (char) => caesar(char, direction * shifts[i++ % shifts.length]));
}

export function vigenereEncode(text: string, key: string): string {
  return vigenere(text, key, 1);
}

export function vigenereDecode(text: string, key: string): string {
  return vigenere(text, key, -1);
}

/* ---------- Encodages ---------- */

export function toBase64(text: string): string {
  let binary = "";
  textToBytes(text).forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function fromBase64(value: string): string {
  const clean = value.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  let binary: string;
  try {
    binary = atob(clean);
  } catch {
    throw new Error("Ce n'est pas du Base64 valide.");
  }
  return bytesToText(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

function hexToBytes(value: string): Uint8Array {
  const clean = value.replace(/[\s:]/g, "").replace(/^0x/i, "");
  if (!/^(?:[0-9a-f]{2})+$/i.test(clean)) throw new Error("Ce n'est pas de l'hexadécimal valide.");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

function bytesToHex(bytes: Uint8Array, separator: string): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(separator);
}

export function toHex(text: string, separator = " "): string {
  return bytesToHex(textToBytes(text), separator);
}

export function fromHex(value: string): string {
  return bytesToText(hexToBytes(value));
}

export function toBinary(text: string): string {
  return Array.from(textToBytes(text), (b) => b.toString(2).padStart(8, "0")).join(" ");
}

export function fromBinary(value: string): string {
  const groups = value.trim().split(/\s+/);
  if (!groups.every((g) => /^[01]{8}$/.test(g))) {
    throw new Error("Le binaire doit être en groupes de 8 chiffres (0 ou 1).");
  }
  return bytesToText(Uint8Array.from(groups, (g) => parseInt(g, 2)));
}

export function toUrl(text: string): string {
  return Array.from(textToBytes(text), (b) => "%" + b.toString(16).toUpperCase().padStart(2, "0")).join("");
}

export function fromUrl(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    throw new Error("Encodage URL invalide.");
  }
}

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..",
  J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};
const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export function toMorse(text: string): string {
  return text
    .toUpperCase()
    .split(/\s+/)
    .map((word) =>
      Array.from(word)
        .map((c) => MORSE[c])
        .filter(Boolean)
        .join(" "),
    )
    .join(" / ");
}

export function fromMorse(value: string): string {
  return value
    .trim()
    .split(/\s*\/\s*/)
    .map((word) =>
      word
        .split(/\s+/)
        .map((code) => {
          const letter = MORSE_REVERSE[code];
          if (!letter) throw new Error(`Code morse inconnu : « ${code} ».`);
          return letter;
        })
        .join(""),
    )
    .join(" ");
}

/** Chiffre un texte avec XOR et renvoie le résultat en hexadécimal (sans espaces). */
export function toXorHex(text: string, key: string): string {
  const k = textToBytes(key);
  return bytesToHex(
    textToBytes(text).map((b, i) => b ^ k[i % k.length]),
    "",
  );
}

export function fromXorHex(value: string, key: string): string {
  const k = textToBytes(key);
  if (k.length === 0) throw new Error("Il faut une clé.");
  return bytesToText(hexToBytes(value).map((b, i) => b ^ k[i % k.length]));
}

/* ---------- Atelier ---------- */

export function applyStep(input: string, step: Step): string {
  switch (step.op) {
    case "base64":
      return fromBase64(input);
    case "hex":
      return fromHex(input);
    case "binary":
      return fromBinary(input);
    case "rot13":
      return caesar(input, 13);
    case "caesar": {
      const shift = Number(step.param ?? "0");
      if (!Number.isInteger(shift)) throw new Error("Le décalage doit être un nombre entier.");
      return caesar(input, -shift);
    }
    case "atbash":
      return atbash(input);
    case "reverse":
      return reverse(input);
    case "url":
      return fromUrl(input);
    case "morse":
      return fromMorse(input);
    case "vigenere":
      return vigenereDecode(input, step.param ?? "");
    case "xor":
      return fromXorHex(input, step.param ?? "");
  }
}

export interface RecipeResult {
  output: string;
  /** Message d'erreur et numéro de l'étape fautive (à partir de 1). */
  error?: { step: number; message: string };
}

export function applyRecipe(input: string, steps: Step[]): RecipeResult {
  let current = input;
  for (let i = 0; i < steps.length; i++) {
    try {
      current = applyStep(current, steps[i]);
    } catch (error) {
      return {
        output: current,
        error: { step: i + 1, message: error instanceof Error ? error.message : String(error) },
      };
    }
  }
  return { output: current };
}
