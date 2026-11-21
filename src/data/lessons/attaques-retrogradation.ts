import type { Lesson } from "@/lib/types";

export const ATTAQUES_RETROGRADATION: Lesson = {
  slug: "attaques-retrogradation",
  title: "Les attaques par rétrogradation",
  icon: "⬇️",
  theme: "crypto",
  level: "avance",
  summary: "FREAK, Logjam, POODLE : comment on force deux parties à choisir une protection faible, et comment TLS 1.3 s'en défend.",
  duration: "9 min",
  objectives: [
    "Comprendre le principe d'une rétrogradation",
    "Connaître les grands exemples historiques",
    "Configurer un serveur pour qu'il n'y ait rien vers quoi rétrograder",
  ],
  sections: [
    {
      title: "Le principe",
      paragraphs: [
        "Au début d'une connexion chiffrée, le client et le serveur négocient : chacun annonce les versions et les algorithmes qu'il accepte, puis ils choisissent le meilleur commun.",
        "Si ces annonces ne sont pas protégées, un attaquant placé au milieu peut retirer les meilleures options. Les deux parties croient alors que la vieille version est la seule possible.",
      ],
    },
    {
      title: "Les exemples historiques",
      paragraphs: [
        "POODLE (2014) : des navigateurs se repliaient vers SSL 3.0 après une erreur de connexion, et SSL 3.0 était cassé.",
        "FREAK et Logjam (2015) : des serveurs acceptaient encore des suites « export » volontairement affaiblies dans les années 1990, cassables en quelques heures.",
        "Le même principe existe ailleurs : repli de l'authentification forte vers une méthode faible, ou du Wi-Fi WPA3 vers WPA2.",
      ],
    },
    {
      title: "Comment TLS 1.3 se protège",
      paragraphs: [
        "Toute la négociation est couverte par la signature et le message Finished : une modification est détectée.",
        "Quand un serveur TLS 1.3 accepte une version plus ancienne, il place une valeur sentinelle dans son aléa : un client récent repère ainsi une rétrogradation forcée.",
        "Le mécanisme TLS_FALLBACK_SCSV jouait un rôle similaire pour les anciennes versions.",
      ],
    },
    {
      title: "La meilleure défense : ne rien laisser derrière",
      paragraphs: [
        "Côté serveur, n'accepter que TLS 1.2 et 1.3 avec des suites robustes (AEAD, échange de clés éphémère).",
        "Désactiver SSL 2.0/3.0, TLS 1.0/1.1 et les suites export, RC4 ou 3DES.",
        "Tester régulièrement sa configuration et suivre les recommandations de l'ANSSI sur TLS.",
      ],
    },
  ],
  keyPoints: [
    "Une rétrogradation force le choix d'une protection plus faible.",
    "Elle exploite une négociation non protégée.",
    "TLS 1.3 signe la négociation et détecte les replis forcés.",
    "Désactiver les vieilles versions supprime le problème à la racine.",
  ],
  quiz: [
    {
      question: "Que fait l'attaquant lors d'une rétrogradation ?",
      options: ["Il vole le certificat du serveur", "Il retire les meilleures options de la négociation", "Il coupe la connexion définitivement"],
      correct: 1,
      explanation: "Les parties finissent par choisir une version faible.",
    },
    {
      question: "Quelle attaque exploitait un repli vers SSL 3.0 ?",
      options: ["POODLE", "Heartbleed", "Spectre"],
      correct: 0,
      explanation: "POODLE visait le repli vers SSL 3.0.",
    },
    {
      question: "Quelle est la défense la plus solide côté serveur ?",
      options: ["Placer les vieilles versions en dernier choix", "Désactiver complètement les versions et suites faibles", "Changer souvent de certificat"],
      correct: 1,
      explanation: "S'il n'y a plus de version faible, il n'y a plus rien vers quoi rétrograder.",
    },
  ],
  sources: [
    { label: "RFC 8446 : TLS 1.3 (section 4.1.3, protection contre la rétrogradation)", url: "https://www.rfc-editor.org/rfc/rfc8446" },
    { label: "ANSSI : Recommandations de sécurité relatives à TLS", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-tls" },
  ],
};
