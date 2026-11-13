import type { Lesson } from "@/lib/types";

export const INTERNET_INFRA: Lesson = {
  slug: "internet-infra",
  title: "Les fondations d'Internet et de l'industrie",
  icon: "🌍",
  theme: "reseau",
  level: "avance",
  summary: "BGP, SS7, systèmes industriels : des infrastructures critiques conçues sur la confiance.",
  duration: "10 min",
  objectives: [
    "Comprendre les détournements BGP et le rôle de RPKI",
    "Connaître les faiblesses du réseau téléphonique (SS7)",
    "Découvrir les enjeux de sécurité des systèmes industriels",
  ],
  sections: [
    {
      title: "BGP, la confiance entre réseaux",
      paragraphs: [
        "Les grands réseaux d'Internet s'annoncent mutuellement quelles adresses ils savent joindre. Une annonce erronée ou malveillante peut détourner le trafic.",
        "RPKI permet de vérifier qu'un réseau a bien le droit d'annoncer un bloc d'adresses ; son adoption progresse.",
      ],
    },
    {
      title: "Le réseau téléphonique",
      paragraphs: [
        "SS7, qui relie les opérateurs, fait confiance aux messages reçus : un accès suffit pour rediriger des SMS ou localiser un téléphone.",
        "C'est une raison de plus pour préférer les applis d'authentification ou les passkeys aux codes SMS.",
      ],
    },
    {
      title: "Les systèmes industriels",
      paragraphs: [
        "Automates, capteurs et protocoles comme Modbus ont été conçus pour des réseaux fermés, sans authentification.",
        "Stuxnet a montré en 2010 qu'un malware pouvait saboter des installations physiques, même sur un réseau isolé.",
      ],
    },
    {
      title: "Protéger l'industriel",
      paragraphs: [
        "Séparer strictement les réseaux industriel et bureautique, contrôler les accès distants des prestataires, surveiller avec des sondes dédiées.",
        "La disponibilité et la sûreté des personnes passent avant tout : on ne met pas à jour un automate comme un PC.",
      ],
    },
  ],
  keyPoints: [
    "BGP fait confiance aux annonces ; RPKI les valide.",
    "SS7 permet d'intercepter des SMS : préférer d'autres facteurs.",
    "Les protocoles industriels n'ont pas d'authentification.",
    "Segmentation stricte et surveillance dédiée pour l'industriel.",
  ],
  quiz: [
    {
      question: "Quel mécanisme valide l'origine des annonces BGP ?",
      options: ["RPKI", "DKIM", "WPA3"],
      correct: 0,
      explanation: "Il vérifie qui peut annoncer quelles adresses.",
    },
    {
      question: "Pourquoi les codes SMS sont-ils un facteur faible ?",
      options: ["Ils sont trop courts", "Ils peuvent être interceptés via le réseau des opérateurs ou un SIM swap", "Ils coûtent cher"],
      correct: 1,
      explanation: "SS7 et le SIM swapping permettent de les détourner.",
    },
    {
      question: "Que vérifie Modbus avant d'exécuter une commande ?",
      options: ["Un mot de passe", "Un certificat", "Rien du tout"],
      correct: 2,
      explanation: "D'où l'importance de la segmentation.",
    },
  ],
};
