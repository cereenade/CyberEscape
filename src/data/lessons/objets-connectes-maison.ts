import type { Lesson } from "@/lib/types";

export const OBJETS_CONNECTES_MAISON: Lesson = {
  slug: "objets-connectes-maison",
  title: "Sécuriser les objets connectés de la maison",
  icon: "📹",
  theme: "bases",
  level: "debutant",
  summary: "Caméras, babyphones, prises ou ampoules connectées : les bons réglages pour qu'ils ne deviennent pas une porte d'entrée.",
  duration: "5 min",
  objectives: [
    "Comprendre pourquoi un objet connecté est un petit ordinateur",
    "Appliquer les trois réglages essentiels à l'installation",
    "Isoler les objets du reste de tes appareils",
  ],
  sections: [
    {
      title: "Un petit ordinateur dans ton salon",
      paragraphs: [
        "Une caméra connectée a un processeur, un système et une connexion à Internet. Si elle est mal protégée, quelqu'un peut la regarder, l'écouter ou s'en servir pour attaquer d'autres machines.",
        "Comme dans la salle « La caméra qui regardait dehors », le scénario classique est un mot de passe d'usine jamais changé.",
      ],
    },
    {
      title: "Les trois réglages à l'installation",
      paragraphs: [
        "Change le mot de passe fourni par un mot de passe long et unique, rangé dans ton gestionnaire de mots de passe.",
        "Active la double authentification sur le compte de l'appli, et les mises à jour automatiques de l'objet.",
        "Désactive les fonctions inutiles : accès à distance si tu ne t'en sers pas, micro, partage avec d'autres comptes.",
      ],
    },
    {
      title: "Isoler et faire le tri",
      paragraphs: [
        "Si ta box propose un réseau invité, places-y tes objets : ils auront Internet sans voir ton ordinateur.",
        "Avant d'acheter, regarde si le fabricant promet des mises à jour sur plusieurs années. Avant de revendre ou de jeter, réinitialise l'objet.",
      ],
    },
  ],
  keyPoints: [
    "Un objet connecté se protège comme un téléphone.",
    "Mot de passe changé, double authentification, mises à jour : dès l'installation.",
    "Le réseau invité isole les objets de tes appareils importants.",
    "Réinitialise toujours un objet avant de t'en séparer.",
  ],
  quiz: [
    {
      question: "Quelle est la première chose à faire en installant une caméra connectée ?",
      options: ["La placer près de la fenêtre", "Changer le mot de passe fourni", "Désactiver les mises à jour"],
      correct: 1,
      explanation: "Le mot de passe d'usine est souvent connu ou facile à deviner.",
    },
    {
      question: "À quoi sert le réseau invité de ta box pour tes objets ?",
      options: ["À les rendre plus rapides", "À les séparer de tes ordinateurs et téléphones", "À couper Internet la nuit"],
      correct: 1,
      explanation: "Un objet piraté sur le réseau invité ne voit pas tes autres appareils.",
    },
    {
      question: "Que fais-tu avant de revendre une ampoule ou une caméra connectée ?",
      options: ["Rien de spécial", "Je la réinitialise aux réglages d'usine", "Je change juste son nom"],
      correct: 1,
      explanation: "La réinitialisation efface ton compte et tes réglages Wi-Fi.",
    },
  ],
  sources: [
    { label: "Cybermalveillance.gouv.fr — Sécuriser les objets connectés", url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/bonnes-pratiques/objets-connectes" },
    { label: "CNIL — Objets connectés", url: "https://www.cnil.fr/fr/objets-connectes" },
  ],
};
