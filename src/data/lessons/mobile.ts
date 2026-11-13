import type { Lesson } from "@/lib/types";

export const MOBILE: Lesson = {
  slug: "mobile",
  title: "Smartphone, Wi-Fi et objets connectés",
  icon: "📱",
  summary: "Ton téléphone est ton ordinateur le plus intime. Protège-le comme tel.",
  duration: "6 min",
  sections: [
    {
      title: "Le téléphone, une cible de choix",
      paragraphs: [
        "Il contient tes mails, tes photos, ta banque, et reçoit tes codes de double authentification.",
        "Code de verrouillage solide, mises à jour régulières et applications installées uniquement depuis les magasins officiels : la base.",
      ],
    },
    {
      title: "Les permissions des applications",
      paragraphs: [
        "Une application ne devrait demander que ce dont elle a vraiment besoin. Une lampe torche qui veut tes contacts et ton micro, c'est suspect.",
        "Passe régulièrement en revue les autorisations dans les réglages et retire celles qui ne servent pas.",
      ],
    },
    {
      title: "SMS, QR codes et appels",
      paragraphs: [
        "Smishing (SMS piégés), quishing (faux QR codes), vishing (appels frauduleux) : le phishing s'adapte au téléphone, où l'on vérifie moins.",
        "Ne communique jamais un code reçu par SMS : c'est la clé de ton compte.",
      ],
    },
    {
      title: "Wi-Fi public et faux points d'accès",
      paragraphs: [
        "Un Wi-Fi ouvert peut être surveillé, et n'importe qui peut créer un réseau qui porte le même nom qu'un vrai (evil twin).",
        "Pour le sensible, utilise ta connexion 4G/5G ou un VPN, et désactive la connexion automatique aux réseaux ouverts.",
      ],
    },
    {
      title: "Les objets connectés",
      paragraphs: [
        "Caméras, box, montres, ampoules : beaucoup sont livrés avec un mot de passe par défaut et rarement mis à jour.",
        "Des millions d'objets piratés forment des botnets utilisés pour des attaques DDoS. Change toujours le mot de passe par défaut.",
      ],
    },
  ],
  quiz: [
    {
      question: "Un « support » te demande au téléphone le code que tu viens de recevoir par SMS. Tu…",
      options: ["Le lui donnes", "Raccroches : c'est le code de ton compte", "Lui donnes la moitié"],
      correct: 1,
      explanation: "Ce code est ton second facteur : le donner revient à ouvrir ton compte.",
    },
    {
      question: "Deux Wi-Fi portent le même nom, l'un ouvert avec un fort signal. C'est sans doute…",
      options: ["Un répéteur du café", "Un faux point d'accès (evil twin)", "Normal"],
      correct: 1,
      explanation: "Même nom, pas de mot de passe, signal plus fort : la signature du jumeau maléfique.",
    },
    {
      question: "Quelle est la première chose à faire en installant une caméra connectée ?",
      options: ["La placer en hauteur", "Changer le mot de passe par défaut", "Désactiver les mises à jour"],
      correct: 1,
      explanation: "Les mots de passe par défaut sont connus de tous les attaquants.",
    },
  ],
};
