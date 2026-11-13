import { caesar, toBinary, toHex } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const BINARY = toBinary("ROUTEUR");
const HEX = toHex("journal");
const ROT13 = caesar("LE MOT DE PASSE EST ANTIVIRUS", 13);

export const MOYEN: RoomContent[] = [
  {
    id: "moyen-01",
    name: "Le couloir binaire",
    story: "Sur le mur, une suite de 0 et de 1 clignote au-dessus du digicode. Les ordinateurs, eux, ne parlent que comme ça.",
    card: {
      title: "Binaire et ASCII",
      category: "Crypto",
      icon: "0️⃣",
      summary: "Chaque lettre est stockée comme un nombre, écrit en 0 et en 1.",
      details: [
        "Un bit vaut 0 ou 1 ; 8 bits forment un octet.",
        "La table ASCII associe un nombre à chaque caractère : A = 65 = 01000001.",
        "Savoir lire le binaire aide à comprendre ce qui circule vraiment sur un réseau.",
      ],
      hint: "Groupes de 8 chiffres = un octet = une lettre. Utilise « Binaire → texte ».",
    },
    puzzle: {
      kind: "answer",
      content: BINARY,
      tools: ["binary"],
      workshopInput: BINARY,
      question: "Quel mot se cache dans ce binaire ?",
      answers: ["routeur"],
    },
    successText: "01001111 01001011 ! Le digicode accepte le mot.",
  },
  {
    id: "moyen-02",
    name: "La salle des octets",
    story: "Un écran d'analyse affiche une suite de paires de caractères. C'est la façon dont les outils d'analyse montrent le contenu brut d'un fichier.",
    card: {
      title: "L'hexadécimal",
      category: "Crypto",
      icon: "🔢",
      summary: "Une façon compacte d'écrire des octets, avec les chiffres 0–9 et les lettres a–f.",
      details: [
        "L'hexadécimal compte en base 16 : un octet s'écrit avec 2 caractères (de 00 à ff).",
        "Les analystes l'utilisent partout : contenu de fichiers, paquets réseau, mémoire.",
        "Exemple : 48 65 6c 6c 6f = « Hello ».",
      ],
      hint: "Des paires de caractères entre 0 et f : c'est de l'hexadécimal. Utilise « Hex → texte ».",
    },
    puzzle: {
      kind: "answer",
      content: HEX,
      tools: ["hex"],
      workshopInput: HEX,
      question: "Quel mot est écrit en hexadécimal ?",
      answers: ["journal"],
    },
    successText: "Bien lu. Les octets n'ont plus de secret pour toi.",
  },
  {
    id: "moyen-03",
    name: "Le forum du pirate",
    story: "Tu tombes sur un vieux forum où le pirate laissait des messages « cachés ». Une technique très répandue sur Internet pour masquer les spoilers.",
    card: {
      title: "ROT13",
      category: "Crypto",
      icon: "🔁",
      summary: "Un César avec un décalage de 13 : l'appliquer deux fois redonne le texte.",
      details: [
        "L'alphabet a 26 lettres : décaler de 13, c'est aller pile à la moitié.",
        "Le même geste chiffre et déchiffre.",
        "Il sert à masquer un texte aux yeux pressés, pas à le protéger.",
      ],
      hint: "Un décalage de 13, ça porte un nom : « ROT13 ».",
    },
    puzzle: {
      kind: "answer",
      content: ROT13,
      tools: ["rot13", "caesar"],
      workshopInput: ROT13,
      question: "Quel est le mot de passe ?",
      answers: ["antivirus"],
    },
    successText: "Masqué, pas protégé : le message est lu.",
  },
  {
    id: "moyen-04",
    name: "Le lien piégé",
    story: "Le pirate a envoyé un lien à tout le personnel. Il ressemble à celui de la Banque Horizon. Trouve à qui il appartient vraiment.",
    card: {
      title: "Lire un nom de domaine",
      category: "Web",
      icon: "🌐",
      summary: "Le vrai propriétaire d'une adresse, c'est ce qui se trouve juste avant le premier « / ».",
      details: [
        "Une adresse se lit de droite à gauche : .fr, puis le nom (banque-horizon), puis les sous-domaines.",
        "Dans banque-horizon.fr.arnaque.com, le vrai domaine est arnaque.com.",
        "Les pirates mettent le nom d'une marque au début pour tromper l'œil.",
      ],
      hint: "Repère le premier « / » après https://, puis prends les deux derniers morceaux avant lui.",
    },
    puzzle: {
      kind: "answer",
      intro: "Le lien reçu par mail :",
      content: "https://www.banque-horizon.fr.verification-compte.com/connexion?client=4471",
      question: "Quel domaine contrôle réellement ce lien ?",
      answers: ["verification-compte.com"],
      placeholder: "exemple.com",
    },
    successText: "Démasqué : ce n'était pas la banque du tout.",
  },
  {
    id: "moyen-05",
    name: "Les coulisses du mail",
    story: "Un mail « de la Banque Horizon » a passé les filtres. Tu ouvres ses en-têtes, la partie que personne ne regarde.",
    card: {
      title: "Les en-têtes d'email et SPF",
      category: "Social",
      icon: "📨",
      summary: "Le nom affiché d'un expéditeur se falsifie facilement, les en-têtes beaucoup moins.",
      details: [
        "Le champ « From » est déclaratif : n'importe qui peut y écrire ce qu'il veut.",
        "Return-Path et Received montrent d'où le mail est vraiment parti.",
        "SPF vérifie que le serveur d'envoi a le droit d'écrire au nom du domaine : spf=fail est un signal d'alarme.",
      ],
      hint: "Ne crois pas le « From ». Regarde Return-Path, Received et le résultat SPF.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "en-têtes du message",
      content: `From: "Banque Horizon" <securite@banque-horizon.fr>
To: admin@serveur-corp.fr
Subject: Activité inhabituelle sur votre compte
Return-Path: <bounce@promo-mail-x7.ru>
Received: from mail.promo-mail-x7.ru (mail.promo-mail-x7.ru [203.0.113.9])
Authentication-Results: spf=fail (banque-horizon.fr n'autorise pas 203.0.113.9)`,
      question: "Quel domaine a réellement envoyé ce mail ?",
      answers: ["promo-mail-x7.ru"],
      placeholder: "exemple.com",
    },
    successText: "Les en-têtes ne mentent pas : mail usurpé.",
  },
  {
    id: "moyen-06",
    name: "Le centre de tri",
    story: "Trois mails de suivi de colis ColisExpress attendent. Le pirate en a glissé un faux, très bien imité cette fois.",
    card: {
      title: "Le typosquatting",
      category: "Social",
      icon: "🔍",
      summary: "Un domaine presque identique au vrai, à une lettre près.",
      details: [
        "Les pirates enregistrent des domaines qui ressemblent au vrai : co1is au lieu de colis, rn au lieu de m.",
        "Ces domaines servent aux faux mails et aux faux sites.",
        "Lis l'adresse lettre par lettre, surtout quand on te demande de payer.",
      ],
      hint: "Le vrai domaine est colis-express.fr. Lis chaque lettre des expéditeurs.",
    },
    puzzle: {
      kind: "phishing",
      emails: [
        {
          id: "suivi",
          fromName: "ColisExpress",
          fromAddress: "suivi@colis-express.fr",
          subject: "Votre colis est en cours de livraison",
          body: "Bonne nouvelle, votre colis n°CE48211 sera livré demain entre 9 h et 13 h.",
          linkText: "Suivre mon colis",
          linkHref: "https://www.colis-express.fr/suivi/CE48211",
          isPhishing: false,
          explanation: "Domaine colis-express.fr correct, aucune demande d'argent : légitime.",
        },
        {
          id: "frais",
          fromName: "ColisExpress",
          fromAddress: "service@co1is-express.fr",
          subject: "Colis bloqué : 1,99 € de frais de douane",
          body: "Votre colis est retenu. Réglez 1,99 € de frais de douane sous 24 h pour éviter son retour à l'expéditeur.",
          linkText: "Payer les frais",
          linkHref: "https://co1is-express.fr/paiement",
          isPhishing: true,
          explanation: "« co1is » avec un 1 à la place du l, petite somme urgente à payer : c'est du typosquatting.",
        },
        {
          id: "avis",
          fromName: "ColisExpress",
          fromAddress: "avis@colis-express.fr",
          subject: "Donnez votre avis sur votre livraison",
          body: "Votre colis a été livré. Vous avez 2 minutes pour nous dire comment ça s'est passé ?",
          linkText: "Donner mon avis",
          linkHref: "https://avis.colis-express.fr/CE47002",
          isPhishing: false,
          explanation: "Sous-domaine du vrai colis-express.fr, rien à payer ni à fournir : légitime.",
        },
      ],
    },
    successText: "Une seule lettre de différence, et tu l'as vue.",
  },
  {
    id: "moyen-07",
    name: "La salle des ports",
    story: "Le pirate se connecte au serveur en « bureau à distance » Windows. Le relevé des connexions ouvertes est affiché. Trouve sa porte d'entrée pour la fermer.",
    card: {
      title: "Les ports et les services",
      category: "Réseau",
      icon: "🚪",
      summary: "Chaque service réseau écoute derrière un numéro de port.",
      details: [
        "Une adresse IP désigne une machine, un port désigne un service sur cette machine.",
        "Ports courants : 22 (SSH), 80 (HTTP), 443 (HTTPS), 3389 (RDP, bureau à distance Windows).",
        "Un port ouvert inutilement sur Internet, c'est une porte laissée entrouverte.",
      ],
      hint: "Bureau à distance Windows = RDP. Quel port lui est associé ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "netstat -an",
      content: `Proto  Adresse locale     État
TCP    0.0.0.0:22         LISTEN
TCP    0.0.0.0:80         LISTEN
TCP    0.0.0.0:443        LISTEN
TCP    0.0.0.0:3389       LISTEN`,
      question: "Quel port faut-il fermer ?",
      answers: ["3389"],
    },
    successText: "Port 3389 fermé : fini le bureau à distance pour le pirate.",
  },
  {
    id: "moyen-08",
    name: "Le journal de bord",
    story: "Le serveur garde la trace de chaque tentative de connexion. Quelqu'un a frappé à la porte des centaines de fois cette nuit.",
    card: {
      title: "Les journaux (logs)",
      category: "Système",
      icon: "📜",
      summary: "Les logs racontent tout ce qui s'est passé : il suffit de savoir les lire.",
      details: [
        "Chaque système note ses événements : connexions, erreurs, actions des utilisateurs.",
        "Des échecs en rafale depuis la même adresse = attaque par force brute.",
        "Un succès juste après des dizaines d'échecs est le signe que l'attaquant est entré.",
      ],
      hint: "Cherche l'adresse IP qui revient sur toutes les lignes « Failed password ».",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "/var/log/auth.log",
      content: `Nov 13 02:11:02 srv sshd: Accepted password for marie from 10.0.0.15
Nov 13 02:14:07 srv sshd: Failed password for admin from 203.0.113.45
Nov 13 02:14:08 srv sshd: Failed password for admin from 203.0.113.45
Nov 13 02:14:09 srv sshd: Failed password for admin from 203.0.113.45
Nov 13 02:14:10 srv sshd: Failed password for admin from 203.0.113.45
Nov 13 02:14:11 srv sshd: Failed password for admin from 203.0.113.45
Nov 13 02:14:15 srv sshd: Accepted password for admin from 203.0.113.45
Nov 13 08:02:40 srv sshd: Accepted password for karim from 10.0.0.22`,
      question: "Quelle est l'adresse IP de l'attaquant ?",
      answers: ["203.0.113.45"],
      placeholder: "ex. 192.168.1.1",
    },
    successText: "Adresse bloquée sur le pare-feu. Une bonne lecture de logs, ça change tout.",
  },
  {
    id: "moyen-09",
    name: "La salle verrouillée",
    story: "Tous les fichiers de cette salle viennent d'être renommés en .locked. Un message s'affiche : « Payez 2 bitcoins pour récupérer vos données ».",
    card: {
      title: "Le rançongiciel",
      category: "Défense",
      icon: "💰",
      summary: "Un malware qui chiffre tes fichiers et réclame une rançon.",
      details: [
        "Le rançongiciel (ransomware) chiffre les données, puis exige un paiement pour la clé.",
        "Premier réflexe : isoler la machine du réseau pour stopper la propagation, puis alerter.",
        "Payer ne garantit rien : les sauvegardes hors ligne sont la vraie protection.",
      ],
      hint: "Avant tout, il faut empêcher le malware d'atteindre les autres machines.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle est la première chose à faire ?",
      options: [
        { label: "Payer la rançon pour récupérer vite les fichiers", correct: false, explanation: "Rien ne garantit la clé, et ça finance les attaquants." },
        { label: "Débrancher la machine du réseau et prévenir l'équipe sécurité", correct: true, explanation: "Isoler pour stopper la propagation, puis alerter : c'est le bon réflexe." },
        { label: "Éteindre et rallumer pour voir si ça part", correct: false, explanation: "Le malware reste là, et on peut perdre des traces utiles à l'enquête." },
        { label: "Supprimer les fichiers .locked", correct: false, explanation: "Tu perdrais définitivement des données récupérables par d'autres moyens." },
      ],
    },
    successText: "Machine isolée, propagation stoppée. Les sauvegardes feront le reste.",
  },
  {
    id: "moyen-10",
    name: "La pièce jointe",
    story: "Dernier obstacle du niveau : une pièce jointe envoyée « par la comptabilité ». Ton explorateur de fichiers affiche « Facture_novembre.pdf »… mais quelque chose cloche.",
    card: {
      title: "Les extensions de fichiers",
      category: "Système",
      icon: "📎",
      summary: "Seule la dernière extension compte : facture.pdf.exe est un programme.",
      details: [
        "L'extension (.pdf, .docx, .exe) indique au système comment ouvrir un fichier.",
        "Windows masque souvent les extensions connues : « facture.pdf.exe » s'affiche « facture.pdf ».",
        "Les pirates utilisent cette double extension pour faire passer un programme pour un document.",
      ],
      hint: "Une seule extension décide de ce que fait le fichier : la toute dernière.",
    },
    puzzle: {
      kind: "answer",
      intro: "Le nom complet du fichier, extensions affichées :",
      content: "Facture_novembre.pdf.exe",
      question: "Quelle est la vraie extension de ce fichier ?",
      answers: ["exe", ".exe"],
    },
    successText: "Programme bloqué avant d'être lancé. Niveau moyen terminé !",
  },
];
