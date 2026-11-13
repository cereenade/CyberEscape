import { atbash, toMorse, toUrl } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const ATBASH = atbash("LE CODE DE LA PORTE EST MIROIR INVERSE : PRISME");
const MORSE = toMorse("SOS LE MOT EST RADAR");
const URL_ENCODED = toUrl("mot=passerelle");

/** Salles 11 à 20 du niveau Moyen. */
export const MOYEN_2: RoomContent[] = [
  {
    id: "moyen-11",
    name: "Le miroir de l'alphabet",
    story: "Un message gravé sur un miroir. Les lettres semblent avoir été remplacées une à une, toujours de la même façon.",
    card: {
      title: "L'Atbash",
      category: "Crypto",
      icon: "🪞",
      summary: "Un alphabet retourné : A devient Z, B devient Y, et ainsi de suite.",
      details: [
        "C'est une substitution monoalphabétique : chaque lettre est toujours remplacée par la même.",
        "Il n'y a pas de clé : appliquer Atbash deux fois redonne le texte.",
        "Toutes les substitutions de ce type se cassent par analyse de fréquence (le E reste la lettre la plus fréquente, quelle que soit sa forme).",
      ],
      hint: "Un alphabet vu dans un miroir : A↔Z. Essaie l'étape « Atbash ».",
    },
    puzzle: {
      kind: "answer",
      content: ATBASH,
      tools: ["atbash", "caesar", "rot13"],
      workshopInput: ATBASH,
      question: "Quel est le code de la porte ?",
      answers: ["prisme"],
    },
    successText: "Le miroir se fend : le code était bien PRISME.",
  },
  {
    id: "moyen-12",
    name: "La radio",
    story: "Une vieille radio grésille et émet des bips longs et courts. Quelqu'un a noté le signal sur un carnet.",
    card: {
      title: "Le morse",
      category: "Crypto",
      icon: "📻",
      summary: "Un encodage en signaux courts et longs, conçu pour le télégraphe.",
      details: [
        "Chaque lettre devient une suite de points (court) et de traits (long) : S = ..., O = ---.",
        "Comme Base64, c'est un encodage public, pas un chiffrement.",
        "Il montre une idée clé : on peut transporter de l'information par n'importe quel canal, même lumineux ou sonore.",
      ],
      hint: "Des points et des traits : c'est du morse. Utilise « Morse → texte ».",
    },
    puzzle: {
      kind: "answer",
      content: MORSE,
      tools: ["morse"],
      workshopInput: MORSE,
      question: "Quel mot est transmis ?",
      answers: ["radar"],
    },
    successText: "Signal décodé. La radio s'éteint, la porte s'ouvre.",
  },
  {
    id: "moyen-13",
    name: "L'adresse bizarre",
    story: "Dans l'historique du navigateur du pirate, une adresse pleine de signes %. Le mot de passe y est caché.",
    card: {
      title: "L'encodage URL",
      category: "Web",
      icon: "🔗",
      summary: "Dans une adresse web, les caractères spéciaux s'écrivent %XX.",
      details: [
        "Une URL ne peut contenir que certains caractères : les autres sont encodés (espace = %20, / = %2F).",
        "Les attaquants encodent leurs charges pour passer certains filtres.",
        "Décoder une URL suspecte est un réflexe d'analyste.",
      ],
      hint: "Chaque %XX est un caractère en hexadécimal. Utilise « URL → texte ».",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "historique",
      content: `https://pirate.local/login?${URL_ENCODED}`,
      tools: ["url", "hex"],
      workshopInput: URL_ENCODED,
      question: "Quel est le mot de passe ?",
      answers: ["passerelle"],
    },
    successText: "Adresse décodée, mot de passe récupéré.",
  },
  {
    id: "moyen-14",
    name: "L'analyse du mail",
    story: "Cette fois, un seul mail. Pour ouvrir la porte, il faut repérer tous ses signaux d'alerte, sans en oublier un seul.",
    card: {
      title: "Les signaux d'alerte d'un mail",
      category: "Social",
      icon: "🚩",
      summary: "Un mail piégé combine souvent plusieurs indices : apprends à tous les voir.",
      details: [
        "Expéditeur inattendu ou au domaine étrange, salutation générique (« Cher client »).",
        "Urgence, menace ou récompense trop belle, demande d'informations ou de paiement.",
        "Lien dont l'adresse réelle ne correspond pas, pièce jointe inattendue.",
      ],
      hint: "Il y a quatre signaux. Le logo et la signature, eux, se copient facilement : ils ne prouvent rien.",
    },
    puzzle: {
      kind: "multi",
      contentLabel: "le mail",
      content: `De : Banque Horizon <service@banque-horizon-alerte.net>
Objet : Dernier avertissement avant blocage

Cher client,
Votre compte sera bloqué sous 24 h suite à une activité suspecte.
Confirmez vos identifiants et votre code de carte ici :
https://banque-horizon.fr/securite  (lien réel : http://bh-verif.ru/form)

[Logo Banque Horizon]
Service Sécurité – Banque Horizon`,
      question: "Quels éléments sont des signaux d'alerte ?",
      options: [
        { label: "Le domaine banque-horizon-alerte.net", correct: true, explanation: "Ce n'est pas le domaine officiel banque-horizon.fr." },
        { label: "« Cher client » au lieu de ton nom", correct: true, explanation: "Une salutation générique trahit un envoi en masse." },
        { label: "Le blocage sous 24 h", correct: true, explanation: "L'urgence pousse à agir sans réfléchir." },
        { label: "La demande du code de carte", correct: true, explanation: "Aucune banque ne demande ton code par mail." },
        { label: "La présence du logo de la banque", correct: false, explanation: "Un logo se copie en deux secondes : ce n'est ni une preuve ni un signal." },
      ],
    },
    successText: "Quatre signaux repérés, aucun oublié. Analyse parfaite.",
  },
  {
    id: "moyen-15",
    name: "Les adresses du réseau",
    story: "Le pirate a laissé une liste d'adresses IP. L'une d'elles appartient au réseau interne : c'est par là qu'il est passé.",
    card: {
      title: "IP privées et publiques",
      category: "Réseau",
      icon: "🏠",
      summary: "Certaines plages d'adresses sont réservées aux réseaux internes.",
      details: [
        "Plages privées : 10.x.x.x, 172.16.x.x à 172.31.x.x et 192.168.x.x.",
        "Elles ne sont pas accessibles directement depuis Internet.",
        "Dans un log, une IP privée indique une machine du réseau interne ; une IP publique, l'extérieur.",
      ],
      hint: "Cherche l'adresse qui commence par 10., 172.16–31. ou 192.168.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle adresse est une adresse privée (réseau interne) ?",
      options: [
        { label: "8.8.8.8", correct: false, explanation: "Une adresse publique, sur Internet." },
        { label: "192.168.1.42", correct: true, explanation: "192.168.x.x est une plage privée : c'est une machine interne." },
        { label: "203.0.113.45", correct: false, explanation: "Une adresse publique (réservée aux exemples)." },
        { label: "172.64.10.5", correct: false, explanation: "Les adresses privées en 172 vont seulement de 172.16 à 172.31." },
      ],
    },
    successText: "Machine interne identifiée et isolée.",
  },
  {
    id: "moyen-16",
    name: "L'annuaire",
    story: "Le pirate a redirigé le site de l'intranet. Tu interroges l'annuaire DNS pour voir vers quelle adresse il pointe maintenant.",
    card: {
      title: "Le DNS",
      category: "Réseau",
      icon: "📖",
      summary: "L'annuaire d'Internet : il traduit un nom de domaine en adresse IP.",
      details: [
        "Quand tu tapes un nom, ton ordinateur demande au DNS l'adresse IP correspondante.",
        "Un enregistrement A donne une adresse IPv4, MX le serveur mail, TXT du texte libre.",
        "Si un attaquant modifie le DNS, il peut rediriger tout le monde vers un faux site.",
      ],
      hint: "Cherche la ligne « Address » dans la réponse, pas celle du serveur interrogé.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "nslookup intranet.serveur-corp.fr",
      content: `Server:   10.0.0.2
Address:  10.0.0.2#53

Non-authoritative answer:
Name:     intranet.serveur-corp.fr
Address:  198.51.100.66`,
      question: "Vers quelle adresse IP pointe maintenant l'intranet ?",
      answers: ["198.51.100.66"],
      placeholder: "ex. 192.168.1.1",
    },
    successText: "Redirection repérée : l'intranet pointait vers un serveur du pirate.",
  },
  {
    id: "moyen-17",
    name: "La photo de vacances",
    story: "Le pirate a posté une photo pour narguer l'équipe. Il a oublié que les photos gardent des informations cachées.",
    card: {
      title: "Les métadonnées EXIF",
      category: "Social",
      icon: "📸",
      summary: "Une photo peut contenir la date, l'appareil… et les coordonnées GPS du lieu de prise de vue.",
      details: [
        "Les métadonnées EXIF sont enregistrées automatiquement par les appareils photo et téléphones.",
        "Elles peuvent révéler où tu habites ou où tu te trouves.",
        "Beaucoup de réseaux sociaux les suppriment, mais pas les mails ni les messageries.",
      ],
      hint: "Compare les coordonnées GPS de la photo avec le tableau des villes.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "exiftool vacances.jpg",
      content: `Make           : Pixelphone
Model          : Pixelphone 9
Date/Time      : 2026:11:12 18:42:10
GPS Latitude   : 43.2965 N
GPS Longitude  : 5.3698 E

Tableau de référence :
Paris      48.8566 N  2.3522 E
Lyon       45.7640 N  4.8357 E
Marseille  43.2965 N  5.3698 E
Lille      50.6292 N  3.0573 E`,
      question: "Dans quelle ville se cache le pirate ?",
      answers: ["marseille"],
    },
    successText: "Le pirate est localisé. Il aurait dû effacer ses métadonnées.",
  },
  {
    id: "moyen-18",
    name: "Le radar",
    story: "Tu lances un scan sur le serveur du pirate pour trouver un service vulnérable. Un des logiciels est connu pour une porte dérobée célèbre.",
    card: {
      title: "Le scan de ports",
      category: "Réseau",
      icon: "🛰️",
      summary: "Lister les ports ouverts et les logiciels qui écoutent derrière.",
      details: [
        "Des outils comme nmap envoient des paquets pour voir quels ports répondent.",
        "Ils devinent aussi le logiciel et sa version : précieux pour trouver une faille connue.",
        "Attaquants et défenseurs scannent : les uns pour attaquer, les autres pour fermer avant eux.",
      ],
      hint: "vsftpd 2.3.4 est une version célèbre pour avoir été distribuée avec une porte dérobée.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "nmap -sV 198.51.100.66",
      content: `PORT     STATE  SERVICE  VERSION
21/tcp   open   ftp      vsftpd 2.3.4
22/tcp   open   ssh      OpenSSH 9.6
80/tcp   open   http     nginx 1.26.2
443/tcp  open   https    nginx 1.26.2`,
      question: "Sur quel port tourne le service vulnérable ?",
      answers: ["21"],
    },
    successText: "Service vulnérable trouvé. Tu viens de faire ta première reconnaissance.",
  },
  {
    id: "moyen-19",
    name: "Le classement",
    story: "Le pirate a fixé quatre mots de passe sur un panneau. Pour passer, classe-les du plus faible au plus solide.",
    card: {
      title: "L'entropie d'un mot de passe",
      category: "Mots de passe",
      icon: "📊",
      summary: "Mesure de l'imprévisibilité : plus elle est grande, plus il faut d'essais pour deviner.",
      details: [
        "Un mot du dictionnaire, même déformé, se devine en quelques secondes.",
        "La longueur fait exploser le nombre de combinaisons bien plus que les symboles.",
        "Une phrase de passe aléatoire de 4 ou 5 mots bat un mot de 8 caractères « compliqué ».",
      ],
      hint: "Une suite clavier < un mot connu avec des chiffres < 8 caractères aléatoires < 5 mots au hasard.",
    },
    puzzle: {
      kind: "order",
      question: "Classe ces mots de passe du plus faible au plus solide.",
      items: ["azerty", "Soleil2026!", "q7#Lm9!x", "orage-cactus-violon-plume-38"],
    },
    successText: "Classement parfait : la longueur l'emporte.",
  },
  {
    id: "moyen-20",
    name: "Le compte du quotidien",
    story: "Dernière salle du niveau. L'admin utilise son compte administrateur pour lire ses mails et naviguer. Le pirate adore ça.",
    card: {
      title: "Le moindre privilège",
      category: "Défense",
      icon: "🪪",
      summary: "Chacun n'a que les droits dont il a besoin, et seulement quand il en a besoin.",
      details: [
        "Un malware ouvert depuis un compte admin obtient tous les droits de l'admin.",
        "On utilise un compte standard au quotidien, et un compte admin séparé seulement pour administrer.",
        "Moins de droits = moins de dégâts quand un compte est compromis.",
      ],
      hint: "Si tu ouvres une pièce jointe piégée, avec quels droits tourne le malware ?",
    },
    puzzle: {
      kind: "choice",
      question: "Quel compte l'admin doit-il utiliser pour ses mails et internet ?",
      options: [
        { label: "Son compte administrateur, c'est plus pratique", correct: false, explanation: "Un clic piégé donnerait tous les droits au pirate." },
        { label: "Un compte utilisateur standard, et l'admin seulement pour administrer", correct: true, explanation: "C'est le principe du moindre privilège." },
        { label: "Le compte d'un collègue", correct: false, explanation: "Partager un compte empêche de savoir qui fait quoi." },
      ],
    },
    successText: "Comptes séparés. Niveau moyen entièrement terminé !",
  },
];
