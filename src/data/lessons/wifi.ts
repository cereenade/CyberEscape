import type { Lesson } from "@/lib/types";

export const WIFI: Lesson = {
  slug: "wifi",
  title: "Le Wi-Fi en profondeur",
  icon: "📶",
  theme: "reseau",
  level: "intermediaire",
  summary: "WEP, WPA2, WPA3, WPS, faux points d'accès : sécuriser un réseau sans fil pour de vrai.",
  duration: "8 min",
  objectives: [
    "Comparer les protections Wi-Fi",
    "Comprendre les attaques sur WPA2 et WPS",
    "Distinguer les vraies protections des fausses",
  ],
  sections: [
    {
      title: "Les générations de chiffrement",
      paragraphs: [
        "WEP est cassé en quelques minutes. WPA2 reste correct avec un long mot de passe. WPA3 protège contre les attaques par dictionnaire hors ligne.",
        "En entreprise, WPA2/WPA3-Entreprise (802.1X) donne un identifiant à chacun au lieu d'un mot de passe commun.",
      ],
    },
    {
      title: "Les attaques sur WPA2",
      paragraphs: [
        "Une poignée de main capturée permet de tester des millions de mots de passe chez soi, hors ligne. Seul un mot de passe long et aléatoire résiste.",
        "Des failles d'implémentation (comme KRACK) se corrigent par les mises à jour des appareils.",
      ],
    },
    {
      title: "WPS et fausses protections",
      paragraphs: [
        "Le PIN WPS se casse en quelques heures : il faut le désactiver.",
        "Cacher le nom du réseau ou filtrer les adresses MAC ne protège presque rien : le nom apparaît dans le trafic et une MAC se copie.",
      ],
    },
    {
      title: "Les faux points d'accès",
      paragraphs: [
        "Un pirate peut créer un réseau du même nom qu'un vrai (evil twin) et intercepter les connexions.",
        "Sur un réseau inconnu : 4G/5G, VPN, et pas de connexion automatique aux réseaux ouverts.",
      ],
    },
  ],
  keyPoints: [
    "WEP est mort ; WPA3 ou WPA2 avec un long mot de passe.",
    "Une capture WPA2 se casse hors ligne si le mot de passe est faible.",
    "WPS par PIN à désactiver ; SSID caché et filtrage MAC = protections illusoires.",
    "Méfiance face aux réseaux ouverts portant un nom connu.",
  ],
  quiz: [
    {
      question: "Quelle protection résiste aux attaques par dictionnaire hors ligne ?",
      options: ["WEP", "WPA2-Personnel", "WPA3"],
      correct: 2,
      explanation: "WPA3 (SAE) empêche de tester des mots de passe hors ligne.",
    },
    {
      question: "Cacher le SSID protège-t-il le réseau ?",
      options: ["Oui, il devient invisible", "Très peu, le nom apparaît dans le trafic", "Oui, si le nom est long"],
      correct: 1,
      explanation: "Les appareils qui s'y connectent le révèlent.",
    },
    {
      question: "Que faire du WPS par PIN ?",
      options: ["Le garder", "Le désactiver", "Changer le PIN chaque année"],
      correct: 1,
      explanation: "Il se casse en quelques heures, quel que soit le PIN.",
    },
  ],
};
