import type { Lesson } from "@/lib/types";

export const DETECTION: Lesson = {
  slug: "detection",
  title: "Détecter les attaques : le quotidien d'un SOC",
  icon: "🔎",
  summary: "SIEM, EDR, YARA, ATT&CK : les outils et méthodes des analystes pour repérer les attaquants.",
  duration: "8 min",
  sections: [
    {
      title: "Les outils du SOC",
      paragraphs: [
        "Le SIEM centralise et corrèle les journaux de toute l'organisation. L'EDR surveille ce qui se passe sur chaque poste : processus, fichiers, connexions.",
        "Les alertes de ces outils sont triées par les analystes, qui distinguent les faux positifs des vraies menaces.",
      ],
    },
    {
      title: "Écrire une règle de détection",
      paragraphs: [
        "Une bonne règle combine un filtre (quels événements), un regroupement (par utilisateur, par IP…) et un seuil (combien, en combien de temps).",
        "Trop large, elle noie l'équipe sous les faux positifs ; trop précise, elle rate les variantes.",
      ],
      example: "EventID=4625 | count by src_ip | where count > 10 within 5m\n→ plus de 10 échecs de connexion en 5 minutes depuis une même IP",
    },
    {
      title: "Les indicateurs de compromission",
      paragraphs: [
        "Les IOC sont des traces concrètes : adresses IP, domaines, hashs de fichiers, noms de processus. Ils permettent de bloquer et de rechercher une menace connue.",
        "Les règles YARA décrivent les caractéristiques d'une famille de malwares pour la reconnaître même sous un autre nom.",
      ],
    },
    {
      title: "Les comportements suspects",
      paragraphs: [
        "Certains signaux ne dépendent pas d'un IOC : un processus qui lit la mémoire de LSASS, un outil système détourné (certutil qui télécharge un fichier), un poste qui contacte un domaine toutes les 60 secondes (beaconing).",
        "Ces détections comportementales attrapent aussi les attaques inédites.",
      ],
    },
    {
      title: "MITRE ATT&CK et la chasse aux menaces",
      paragraphs: [
        "ATT&CK classe les techniques des attaquants par tactique : accès initial, exécution, persistance, élévation de privilèges, mouvement latéral, exfiltration…",
        "Le threat hunting consiste à partir d'une hypothèse et à chercher activement des traces, sans attendre une alerte. Chaque chasse réussie devient une nouvelle règle.",
      ],
    },
  ],
  quiz: [
    {
      question: "Quel outil centralise les journaux de toute l'entreprise ?",
      options: ["L'EDR", "Le SIEM", "Le pare-feu"],
      correct: 1,
      explanation: "Le SIEM collecte, stocke et corrèle les logs de toutes les sources.",
    },
    {
      question: "Un poste contacte le même domaine exactement toutes les 60 secondes. C'est probablement…",
      options: ["Une mise à jour normale", "Du beaconing vers un serveur C2", "Un utilisateur très rapide"],
      correct: 1,
      explanation: "Une régularité parfaite est typique d'un implant qui demande des ordres.",
    },
    {
      question: "Un hash de fichier malveillant partagé entre SOC est…",
      options: ["Un IOC", "Une tactique ATT&CK", "Un faux positif"],
      correct: 0,
      explanation: "C'est un indicateur de compromission concret, utilisable pour rechercher et bloquer.",
    },
    {
      question: "Le threat hunting consiste à…",
      options: ["Attendre les alertes", "Chercher activement des menaces à partir d'hypothèses", "Désactiver les règles"],
      correct: 1,
      explanation: "Le chasseur ne se contente pas des alertes : il va chercher ce qui leur échappe.",
    },
  ],
};
