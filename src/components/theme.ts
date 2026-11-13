/** Thème d'affichage, mémorisé dans le navigateur (préférence personnelle, sans donnée sensible). */
export type ThemeChoice = "dark" | "light" | "system";

const KEY = "cyberescape-theme";

export function readTheme(): ThemeChoice {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "system" ? value : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(choice: ThemeChoice) {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // Stockage indisponible : le thème s'applique quand même pour cette page.
  }
  const light = choice === "light" || (choice === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
  document.documentElement.dataset.theme = light ? "light" : "dark";
}

/** Script exécuté avant l'affichage, pour éviter un flash de la mauvaise couleur. */
export const THEME_SCRIPT = `(function(){try{var c=localStorage.getItem("${KEY}");var l=c==="light"||(c==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches);document.documentElement.dataset.theme=l?"light":"dark";}catch(e){}})();`;
