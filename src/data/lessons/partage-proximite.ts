import type { Lesson } from "@/lib/types";

export const PARTAGE_PROXIMITE: Lesson = {
  slug: "partage-proximite",
  title: "Le partage de proximité",
  icon: "📲",
  theme: "bases",
  level: "debutant",
  summary: "AirDrop, Quick Share : envoyer des fichiers sans fil sans s'exposer aux inconnus.",
  duration: "5 min",
  objectives: [
    "Comprendre le fonctionnement du partage de proximité",
    "Choisir le bon mode de visibilité",
    "Garder un nom d'appareil discret",
  ],
  sections: [
    {
      title: "Comment ça marche",
      paragraphs: [
        "Le partage de proximité utilise le Bluetooth et le Wi-Fi pour envoyer photos et fichiers aux appareils situés à quelques mètres.",
        "C'est pratique entre amis, mais tout dépend de qui peut te voir.",
      ],
    },
    {
      title: "Les modes de visibilité",
      paragraphs: [
        "« Réception désactivée » : personne ne peut t'envoyer de fichier.",
        "« Contacts uniquement » : seules les personnes de ton carnet d'adresses te voient.",
        "« Tout le monde » : n'importe qui à proximité, comme dans la salle du train. Beaucoup de téléphones limitent désormais ce mode à 10 minutes.",
      ],
    },
    {
      title: "Les risques",
      paragraphs: [
        "Recevoir des images choquantes ou non désirées d'un inconnu.",
        "Révéler ton prénom par le nom de l'appareil, par exemple « Téléphone de Léa ».",
        "Accepter par erreur un fichier piégé.",
      ],
    },
    {
      title: "Les bons réflexes",
      paragraphs: [
        "Reste en « Contacts uniquement » par défaut.",
        "Donne un nom neutre à ton appareil dans les réglages.",
        "Refuse tout envoi venant d'un appareil inconnu, et signale les envois insistants s'ils te mettent mal à l'aise.",
      ],
    },
  ],
  keyPoints: [
    "« Tout le monde » = n'importe qui à proximité.",
    "Par défaut : « Contacts uniquement ».",
    "Nom d'appareil neutre et refus des envois inconnus.",
  ],
  quiz: [
    {
      question: "Quel mode est le plus prudent au quotidien ?",
      options: ["Tout le monde", "Contacts uniquement", "Laisser au hasard"],
      correct: 1,
      explanation: "Seules les personnes que tu connais peuvent t'envoyer des fichiers.",
    },
    {
      question: "Pourquoi renommer « iPhone de Léa » ?",
      options: ["Pour gagner de la batterie", "Pour ne pas révéler son prénom aux inconnus", "C'est obligatoire"],
      correct: 1,
      explanation: "Le nom est visible par les appareils proches.",
    },
    {
      question: "Un inconnu tente de t'envoyer une photo. Que fais-tu ?",
      options: ["J'accepte pour voir", "Je refuse", "Je lui réponds"],
      correct: 1,
      explanation: "Refuser est le bon réflexe.",
    },
  ],
  sources: [
    { label: "Apple — Utiliser AirDrop sur iPhone", url: "https://support.apple.com/fr-fr/119857" },
    { label: "Google — Quick Share", url: "https://support.google.com/android/answer/9286773?hl=fr" },
  ],
};
