import type { Lesson } from "@/lib/types";

export const DNS: Lesson = {
  slug: "dns",
  title: "Le DNS en profondeur",
  icon: "📇",
  theme: "reseau",
  level: "intermediaire",
  summary: "L'annuaire d'Internet : ses enregistrements, ses attaques et ce qu'il révèle aux analystes.",
  duration: "9 min",
  objectives: [
    "Connaître les principaux enregistrements DNS",
    "Comprendre les attaques : empoisonnement, transfert de zone, sous-domaine abandonné",
    "Utiliser le DNS comme source d'enquête",
  ],
  sections: [
    {
      title: "Les enregistrements",
      paragraphs: [
        "A et AAAA : adresses IPv4 et IPv6. CNAME : alias. MX : serveurs de mail. TXT : texte libre (SPF, DKIM, vérifications). PTR : DNS inverse.",
        "NS indique les serveurs qui font autorité pour le domaine.",
      ],
      example: "serveur-corp.fr.  MX  10 mail.serveur-corp.fr.\nserveur-corp.fr.  TXT \"v=spf1 include:_spf.example -all\"",
    },
    {
      title: "Ce que le DNS révèle",
      paragraphs: [
        "Un transfert de zone (AXFR) ouvert livre tous les noms du domaine : il doit être limité aux serveurs secondaires.",
        "Un sous-domaine qui pointe vers un service supprimé peut être récupéré par un pirate (subdomain takeover).",
      ],
    },
    {
      title: "Les attaques sur les réponses",
      paragraphs: [
        "L'empoisonnement de cache injecte de fausses réponses dans un résolveur. DNSSEC signe les réponses pour les rendre vérifiables.",
        "DNS over HTTPS ou TLS chiffre les requêtes, mais ne prouve pas l'authenticité des réponses : c'est le rôle de DNSSEC.",
      ],
    },
    {
      title: "Le DNS pour les analystes",
      paragraphs: [
        "Les journaux DNS montrent les domaines contactés : domaines tout neufs, noms aléatoires (DGA), sous-domaines très longs (exfiltration par DNS).",
        "Le DNS inverse et l'historique d'un domaine donnent des pistes sur l'infrastructure d'un attaquant.",
      ],
    },
  ],
  keyPoints: [
    "MX pour le mail, TXT pour SPF/DKIM, PTR pour l'inverse.",
    "AXFR limité, enregistrements orphelins supprimés.",
    "DNSSEC authentifie, DoH/DoT chiffrent.",
    "Les journaux DNS sont une mine pour la détection.",
  ],
  quiz: [
    {
      question: "Quel enregistrement indique les serveurs de mail d'un domaine ?",
      options: ["A", "MX", "PTR"],
      correct: 1,
      explanation: "MX = Mail eXchanger.",
    },
    {
      question: "Que garantit DNSSEC ?",
      options: ["La confidentialité des requêtes", "L'authenticité des réponses", "La vitesse"],
      correct: 1,
      explanation: "Les réponses sont signées et vérifiables.",
    },
    {
      question: "Des requêtes vers « a8f3k2…x9.exfil.example » très longues et nombreuses évoquent…",
      options: ["Une exfiltration par DNS", "Une mise à jour Windows", "Un DNS inverse"],
      correct: 0,
      explanation: "Les données sont cachées dans les sous-domaines.",
    },
  ],
};
