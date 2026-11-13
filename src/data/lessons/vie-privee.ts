import type { Lesson } from "@/lib/types";

export const VIE_PRIVEE: Lesson = {
  slug: "vie-privee",
  title: "Vie privée et données personnelles",
  icon: "🕶️",
  theme: "humain",
  level: "debutant",
  summary: "Ce que tu laisses en ligne, ce que les autres en font, et tes droits.",
  duration: "6 min",
  objectives: [
    "Mesurer ce que révèle ton empreinte numérique",
    "Repérer les données cachées dans les fichiers",
    "Connaître tes droits grâce au RGPD",
  ],
  sections: [
    {
      title: "L'empreinte numérique",
      paragraphs: [
        "Chaque publication, photo, like ou commentaire laisse une trace. Prises une par une, elles semblent anodines ; recoupées, elles dessinent un portrait très précis.",
        "Les attaquants s'en servent pour rendre leurs arnaques crédibles ou deviner tes réponses aux questions secrètes.",
      ],
    },
    {
      title: "Les données cachées",
      paragraphs: [
        "Les photos contiennent des métadonnées EXIF : appareil, date et parfois coordonnées GPS précises.",
        "Les documents Office et PDF peuvent garder le nom de l'auteur, l'historique des modifications ou des commentaires masqués.",
      ],
      example: "exiftool photo.jpg\nGPS Position : 43.2965 N, 5.3698 E",
    },
    {
      title: "Le RGPD et tes droits",
      paragraphs: [
        "En Europe, le RGPD encadre l'usage des données personnelles. Tu as le droit d'accéder à tes données, de les faire corriger, effacer, ou de t'opposer à certains traitements.",
        "Une entreprise victime d'une fuite doit la notifier à la CNIL sous 72 heures, et prévenir les personnes concernées si le risque est élevé.",
      ],
    },
    {
      title: "Les bons réflexes",
      paragraphs: [
        "Profils en privé, publications réfléchies, localisation désactivée par défaut, métadonnées supprimées avant de partager une photo.",
        "Vérifie si tes comptes ont fuité sur des services comme haveibeenpwned.com et change les mots de passe concernés.",
      ],
    },
  ],
  keyPoints: [
    "Des infos anodines, une fois recoupées, dessinent un portrait précis.",
    "Photos et documents contiennent des métadonnées (GPS, auteur…).",
    "Le RGPD te donne un droit d'accès, de rectification et d'effacement.",
    "Une fuite doit être notifiée à la CNIL sous 72 heures.",
  ],
  quiz: [
    {
      question: "Que peut révéler une photo envoyée par mail ?",
      options: ["Rien d'autre que l'image", "Ses métadonnées, dont parfois la position GPS", "Uniquement sa taille"],
      correct: 1,
      explanation: "Les données EXIF peuvent contenir la date, l'appareil et les coordonnées GPS.",
    },
    {
      question: "Sous combien de temps une fuite de données doit-elle être notifiée à la CNIL ?",
      options: ["72 heures", "30 jours", "Jamais"],
      correct: 0,
      explanation: "Le RGPD impose une notification sous 72 heures.",
    },
    {
      question: "Pourquoi éviter de publier le nom de ton premier animal ?",
      options: ["Ce n'est pas joli", "C'est une réponse fréquente aux questions secrètes", "C'est interdit"],
      correct: 1,
      explanation: "Les attaquants s'en servent pour réinitialiser des comptes.",
    },
  ],
};
