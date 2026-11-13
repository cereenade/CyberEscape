import { caesar, reverse, toBase64, toBinary, toHex, vigenereEncode } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const ACROSTIC_CIPHER = toHex(vigenereEncode("LA CLE ETAIT CACHEE DANS LES LIGNES LE CODE EST COMETE", "SPECTRE"), "");
const FINAL_BOSS = toBinary(toBase64(reverse(caesar("CHASSE TERMINEE : LE DERNIER MOT EST AURORE", 13))));

/** Salles 11 à 20 du niveau Impossible. */
export const IMPOSSIBLE_2: RoomContent[] = [
  {
    id: "impossible-11",
    name: "Le spectre",
    story:
      "Un message chiffré, accompagné d'un court texte du pirate. La clé n'est écrite nulle part… ou plutôt, elle est écrite partout.",
    card: {
      title: "L'analyse de fréquence",
      category: "Crypto",
      icon: "📈",
      summary: "Compter les lettres d'un texte chiffré pour en déduire la clé ou l'alphabet utilisé.",
      details: [
        "En français, E, A, S, I, N, T sont les lettres les plus fréquentes.",
        "Dans une substitution simple, la lettre la plus fréquente du texte chiffré correspond souvent au E.",
        "Pour Vigenère, on devine d'abord la longueur de la clé, puis on fait une analyse de fréquence par colonne.",
      ],
      hint: "Hex → texte, puis Vigenère. La clé se lit verticalement dans le texte du pirate.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "note du pirate + message",
      content: `Silence dans les couloirs.
Personne ne m'a vu entrer.
Encore une nuit sans traces.
Chaque serveur m'appartient.
Tôt ou tard, vous comprendrez.
Rien ne m'échappe.
Et surtout pas vos secrets.

${ACROSTIC_CIPHER}`,
      tools: ["hex", "base64", "vigenere", "caesar", "atbash", "reverse"],
      workshopInput: ACROSTIC_CIPHER,
      question: "Quel est le code ?",
      answers: ["comete"],
    },
    successText: "SPECTRE, la clé était dans les initiales. Message déchiffré.",
  },
  {
    id: "impossible-12",
    name: "La chronologie",
    story:
      "Les journaux de trois machines n'utilisent pas le même fuseau horaire. Le serveur web est en UTC, le poste en heure de Paris (UTC+1), le pare-feu en UTC-5. Remets l'attaque dans l'ordre.",
    card: {
      title: "La chronologie d'incident",
      category: "Défense",
      icon: "🕰️",
      summary: "Reconstituer la séquence exacte d'une attaque à partir de sources multiples.",
      details: [
        "La timeline est le cœur d'une enquête : elle montre comment l'attaquant a progressé.",
        "Chaque source peut avoir son propre fuseau horaire ou une horloge décalée.",
        "On convertit tout en UTC avant de trier les événements.",
      ],
      hint: "Convertis tout en UTC : heure de Paris − 1 h, heure du pare-feu + 5 h.",
    },
    puzzle: {
      kind: "order",
      contentLabel: "événements relevés",
      content: `Poste (UTC+1)      10:20  ouverture de la pièce jointe « facture.docm »
Pare-feu (UTC-5)   04:23  connexion sortante vers meteo-sync.net
Serveur web (UTC)  09:05  envoi du mail piégé depuis 203.0.113.9
Serveur web (UTC)  09:40  exfiltration de 2 Go vers 198.51.100.66`,
      question: "Remets les événements dans l'ordre chronologique réel.",
      items: [
        "Envoi du mail piégé (09:05 UTC)",
        "Ouverture de la pièce jointe (09:20 UTC)",
        "Connexion vers meteo-sync.net (09:23 UTC)",
        "Exfiltration de 2 Go (09:40 UTC)",
      ],
    },
    successText: "Chronologie reconstituée à la minute près, fuseaux compris.",
  },
  {
    id: "impossible-13",
    name: "La double menace",
    story:
      "Le pirate envoie un nouveau message : « J'ai chiffré vos serveurs. Et avant ça, j'ai copié vos données clients. Payez, ou je publie tout. »",
    card: {
      title: "La double extorsion",
      category: "Défense",
      icon: "🎭",
      summary: "Chiffrer les données ET menacer de les publier : les sauvegardes ne suffisent plus.",
      details: [
        "Les groupes de rançongiciels volent les données avant de les chiffrer.",
        "Même avec de bonnes sauvegardes, la menace de publication reste.",
        "Il faut détecter l'exfiltration tôt, chiffrer les données sensibles et préparer la communication de crise (et la notification à la CNIL).",
      ],
      hint: "Les sauvegardes règlent le chiffrement. Mais la fuite, elle, a déjà eu lieu.",
    },
    puzzle: {
      kind: "choice",
      question: "Pourquoi les sauvegardes ne suffisent-elles plus ici ?",
      options: [
        { label: "Parce que les sauvegardes sont forcément chiffrées aussi", correct: false, explanation: "Pas si elles sont hors ligne : elles permettent de restaurer." },
        { label: "Parce que les données ont déjà été volées et peuvent être publiées", correct: true, explanation: "La restauration ne fait pas disparaître la copie détenue par le pirate." },
        { label: "Parce que payer est obligatoire", correct: false, explanation: "Payer n'est jamais une garantie, ni de restitution ni de non-publication." },
      ],
    },
    successText: "Bonne analyse. La cellule de crise prépare la notification des clients.",
  },
  {
    id: "impossible-14",
    name: "La dépendance piégée",
    story: "Le site de l'entreprise a été compromis sans qu'aucune ligne de son code ne change. Le coupable se cache dans les bibliothèques installées.",
    card: {
      title: "La chaîne d'approvisionnement",
      category: "Défense",
      icon: "📦",
      summary: "Attaquer une cible en piégeant un logiciel ou une bibliothèque qu'elle utilise.",
      details: [
        "Un projet moderne dépend de centaines de bibliothèques écrites par d'autres.",
        "Les attaquants publient des paquets au nom presque identique à un paquet connu (typosquatting).",
        "Parades : vérifier les noms, verrouiller les versions, scanner les dépendances.",
      ],
      hint: "Lis chaque nom de paquet lettre par lettre.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "package.json",
      content: `"dependencies": {
  "next": "^15.5.9",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "lodahs": "^4.17.21",
  "zod": "^3.23.8"
}`,
      question: "Quel paquet est malveillant ?",
      answers: ["lodahs"],
    },
    successText: "« lodahs » au lieu de « lodash » : paquet supprimé, mots de passe changés.",
  },
  {
    id: "impossible-15",
    name: "La visioconférence",
    story:
      "La directrice financière reçoit un appel vidéo du président. Son visage, sa voix : tout est parfait. Il demande un virement urgent de 250 000 €.",
    card: {
      title: "Les deepfakes",
      category: "Social",
      icon: "🎬",
      summary: "Des voix et des visages générés par IA, assez réalistes pour tromper en direct.",
      details: [
        "Quelques secondes d'audio suffisent aujourd'hui pour cloner une voix.",
        "Des fraudes au président utilisent déjà des vidéos truquées en temps réel.",
        "Parade : une procédure de validation hors bande (rappel, double signature) pour toute demande sensible.",
      ],
      hint: "Si l'image et la voix peuvent être fausses, il faut vérifier par un autre moyen.",
    },
    puzzle: {
      kind: "choice",
      question: "Que doit faire la directrice financière ?",
      options: [
        { label: "Faire le virement : elle a vu le président en vidéo", correct: false, explanation: "Une vidéo peut aujourd'hui être générée en direct." },
        { label: "Raccrocher et rappeler le président sur son numéro habituel, puis appliquer la double validation", correct: true, explanation: "Une vérification hors bande déjoue le deepfake." },
        { label: "Lui demander de lever la main pour prouver que c'est lui", correct: false, explanation: "Les deepfakes en temps réel savent reproduire ce genre de geste." },
      ],
    },
    successText: "Le vrai président n'avait jamais appelé. 250 000 € sauvés.",
  },
  {
    id: "impossible-16",
    name: "La requête interne",
    story:
      "Le site du pirate propose un aperçu de page : on donne une URL, le serveur va la chercher. Les journaux montrent une requête vers une adresse très particulière.",
    card: {
      title: "La faille SSRF",
      category: "Web",
      icon: "🪃",
      summary: "Forcer un serveur à faire des requêtes à ta place, vers des ressources internes.",
      details: [
        "Quand un serveur récupère une URL fournie par l'utilisateur, on peut lui faire viser son propre réseau interne.",
        "Dans le cloud, l'adresse 169.254.169.254 donne accès aux métadonnées de la machine, parfois avec des clés d'accès.",
        "Parades : listes blanches de domaines, blocage des adresses internes, métadonnées protégées (IMDSv2).",
      ],
      hint: "Cherche l'adresse IP « link-local » bien connue des services cloud.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "access.log",
      content: `GET /apercu?url=https://www.wikipedia.org            200
GET /apercu?url=http://localhost:8080/admin           403
GET /apercu?url=http://169.254.169.254/latest/meta-data/iam/  200`,
      question: "Quelle adresse IP interne le pirate a-t-il atteinte avec succès ?",
      answers: ["169.254.169.254"],
      placeholder: "ex. 192.168.1.1",
    },
    successText: "Faille SSRF prouvée : les clés cloud ont été révoquées à temps.",
  },
  {
    id: "impossible-17",
    name: "Le registre",
    story:
      "Après chaque redémarrage, le malware revient. Il s'est inscrit dans le registre Windows pour se lancer au démarrage de la session.",
    card: {
      title: "Les clés Run du registre",
      category: "Système",
      icon: "🗝️",
      summary: "Un emplacement du registre Windows qui lance des programmes à chaque ouverture de session.",
      details: [
        "HKCU\\...\\CurrentVersion\\Run lance automatiquement les programmes listés.",
        "C'est l'une des techniques de persistance les plus courantes (ATT&CK T1547.001).",
        "Méfie-toi des chemins dans AppData, Temp ou Public, et des noms qui imitent des logiciels connus.",
      ],
      hint: "Compare les chemins : qui se lance depuis un dossier où aucun logiciel légitime ne s'installe ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "reg query HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
      content: `OneDrive        REG_SZ  "C:\\Users\\marie\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe" /background
SecurityHealth  REG_SZ  C:\\Windows\\System32\\SecurityHealthSystray.exe
AdobeUpdater    REG_SZ  C:\\Users\\Public\\Libraries\\adobe_upd.exe -silent
Teams           REG_SZ  "C:\\Users\\marie\\AppData\\Local\\Microsoft\\Teams\\Update.exe" --processStart`,
      question: "Quel est le nom de l'entrée malveillante ?",
      answers: ["AdobeUpdater"],
    },
    successText: "Entrée supprimée, exécutable mis en quarantaine. Le malware ne reviendra plus.",
  },
  {
    id: "impossible-18",
    name: "Les flux",
    story: "Le pirate a exfiltré des données lentement, sur plusieurs heures. Les relevés de flux réseau (NetFlow) permettent de trouver la machine qui a tout envoyé.",
    card: {
      title: "L'analyse des flux réseau",
      category: "Réseau",
      icon: "🌊",
      summary: "Étudier qui parle à qui, combien et quand, sans regarder le contenu des paquets.",
      details: [
        "NetFlow résume chaque connexion : source, destination, port, volume, durée.",
        "Un volume sortant anormal vers une adresse inconnue trahit souvent une exfiltration.",
        "C'est léger à stocker et ça fonctionne même quand le trafic est chiffré.",
      ],
      hint: "Additionne les octets envoyés vers l'extérieur par chaque machine interne.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "netflow (trafic sortant, 00:00 → 06:00)",
      content: `Source       Destination      Port  Octets envoyés
10.0.0.12    142.250.74.110   443   12 Mo
10.0.0.37    198.51.100.66    443   640 Mo
10.0.0.21    142.250.74.110   443   8 Mo
10.0.0.37    198.51.100.66    443   710 Mo
10.0.0.44    151.101.1.69     443   35 Mo
10.0.0.37    198.51.100.66    443   690 Mo`,
      question: "Quelle machine interne a exfiltré les données ?",
      answers: ["10.0.0.37"],
      placeholder: "ex. 10.0.0.1",
    },
    successText: "2 Go envoyés par 10.0.0.37 cette nuit : machine isolée, enquête lancée.",
  },
  {
    id: "impossible-19",
    name: "La file des correctifs",
    story:
      "Trois failles viennent d'être annoncées. L'équipe ne peut en corriger qu'une ce soir. Laquelle passe en premier ?",
    card: {
      title: "CVE et CVSS",
      category: "Défense",
      icon: "🩹",
      summary: "Identifier les failles (CVE) et mesurer leur gravité (CVSS) pour savoir quoi corriger d'abord.",
      details: [
        "Chaque faille publique reçoit un identifiant CVE et un score CVSS de 0 à 10.",
        "Mais le score seul ne suffit pas : exposition à Internet et exploitation active comptent énormément.",
        "Le catalogue KEV de la CISA liste les failles réellement exploitées par des attaquants.",
      ],
      hint: "Une faille exploitée activement, sur une machine exposée à Internet, passe avant un score plus élevé sur une machine isolée.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle faille corriger en premier ?",
      options: [
        { label: "CVSS 9.8 sur un serveur de test isolé, sans accès réseau", correct: false, explanation: "Grave sur le papier, mais presque inaccessible pour un attaquant." },
        { label: "CVSS 8.6 sur le VPN exposé à Internet, déjà exploitée activement", correct: true, explanation: "Exposée et exploitée en ce moment : risque réel immédiat." },
        { label: "CVSS 5.3 sur l'imprimante du 3e étage", correct: false, explanation: "Faible gravité et faible exposition : elle peut attendre." },
      ],
    },
    successText: "VPN corrigé dans la soirée. Deux heures plus tard, les premiers scans arrivaient.",
  },
  {
    id: "impossible-20",
    name: "La chasse finale",
    story:
      "Le pirate a laissé une dernière énigme avant de disparaître pour de bon. Quatre couches, aucune indication. Tout ce que tu as appris jusqu'ici te sera utile.",
    card: {
      title: "Le threat hunting",
      category: "Défense",
      icon: "🏹",
      summary: "Partir à la recherche des menaces cachées, sans attendre qu'une alerte se déclenche.",
      details: [
        "Le chasseur part d'une hypothèse (« un attaquant utilise certutil ») et la vérifie dans les données.",
        "Il s'appuie sur ATT&CK, les logs, l'EDR et sa connaissance de l'environnement.",
        "Chaque chasse fructueuse devient une nouvelle règle de détection automatique.",
      ],
      hint: "0 et 1 → Binaire. Puis = à la fin → Base64. Le texte est ensuite à l'envers, et une dernière rotation de 13…",
    },
    puzzle: {
      kind: "answer",
      content: FINAL_BOSS,
      tools: ["base64", "hex", "binary", "reverse", "rot13", "caesar", "atbash", "url", "morse", "vigenere", "xor"],
      workshopInput: FINAL_BOSS,
      question: "Quel est le dernier mot ?",
      answers: ["aurore"],
    },
    successText: "AURORE. Tu es officiellement un(e) chasseur(se) de menaces… mais le pirate a laissé un dernier étage. Retiens bien ce mot !",
  },
];
