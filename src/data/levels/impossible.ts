import { caesar, reverse, toBase64, toHex, toMorse, toXorHex, vigenereEncode } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const REUSED_KEY = vigenereEncode("LE PIRATE REUTILISE SES MOTS DE PASSE LE CODE EST MIROIR", "PAREFEU");
const FOUR_LAYERS = toHex(toBase64(reverse(caesar("CLE FINALE : HORIZON", 7))), "");
const SYMMETRIC = toXorHex("ACCES ACCORDE CODE ORBITE", "sentinelle");
const MORSE_NOTE = toMorse("LA SORTIE EST AU SOUS SOL");
const FINAL = reverse(toBase64(toXorHex("CODE D ARRET DU PIRATE : RENAISSANCE", "phoenix")));

export const IMPOSSIBLE: RoomContent[] = [
  {
    id: "impossible-01",
    name: "La mémoire du pirate",
    story:
      "Un message chiffré au Vigenère, sans clé. Mais une note du pirate traîne : « Pourquoi retenir plusieurs mots de passe ? J'utilise toujours celui de la toute première porte. »",
    card: {
      title: "La réutilisation de mots de passe",
      category: "Mots de passe",
      icon: "♻️",
      summary: "Un même mot de passe partout : une seule fuite, et tous les comptes tombent.",
      details: [
        "Les pirates testent les identifiants volés sur d'autres sites : c'est le credential stuffing.",
        "Un mot de passe réutilisé transforme une petite fuite en catastrophe.",
        "Un gestionnaire de mots de passe permet d'en avoir un différent, et solide, pour chaque service.",
      ],
      hint: "La première porte du jeu, c'est la salle 1 du niveau Facile. Son mot de passe sert de clé (sans le tiret).",
    },
    puzzle: {
      kind: "answer",
      content: REUSED_KEY,
      tools: ["vigenere", "caesar", "atbash", "rot13"],
      workshopInput: REUSED_KEY,
      question: "Quel est le code ?",
      answers: ["miroir"],
    },
    successText: "Le pirate est retombé dans son propre piège : un mot de passe pour tout.",
  },
  {
    id: "impossible-02",
    name: "La recette du chef",
    story:
      "Quatre transformations empilées. Les traces du pirate ne donnent qu'une information : « César 7 a été appliqué en tout premier ». Le reste, à toi de le deviner.",
    card: {
      title: "Les recettes de décodage",
      category: "Défense",
      icon: "👩‍🍳",
      summary: "Reconnaître chaque encodage à son allure pour reconstruire la recette à l'envers.",
      details: [
        "Hexadécimal : uniquement 0–9 et a–f. Base64 : lettres, chiffres, + / et souvent = à la fin.",
        "Les analystes utilisent des outils comme CyberChef pour enchaîner les opérations.",
        "À chaque étape, observe le résultat : il dit quelle opération appliquer ensuite.",
      ],
      hint: "Hex → Base64 → Inverser → César (recule de 7). Observe le résultat entre chaque étape.",
    },
    puzzle: {
      kind: "answer",
      content: FOUR_LAYERS,
      tools: ["hex", "base64", "binary", "reverse", "rot13", "caesar", "atbash", "url"],
      workshopInput: FOUR_LAYERS,
      question: "Quelle est la clé finale ?",
      answers: ["horizon"],
    },
    successText: "Quatre couches, zéro indice superflu. Recette reconstituée.",
  },
  {
    id: "impossible-03",
    name: "Les algorithmes",
    story:
      "Dans une vieille sauvegarde, quatre comptes avec quatre hashs de formats différents. Le pirate veut savoir lequel sera le plus long à casser. Toi aussi.",
    card: {
      title: "Identifier un hash",
      category: "Crypto",
      icon: "🧬",
      summary: "La longueur et le préfixe d'un hash trahissent souvent l'algorithme utilisé.",
      details: [
        "32 caractères hexa : MD5. 40 : SHA-1. 64 : SHA-256.",
        "Un hash qui commence par $2b$ est du bcrypt ; le nombre suivant ($12$) est son coût.",
        "MD5, SHA-1 et SHA-256 sont rapides : parfait pour un pirate. bcrypt est volontairement lent.",
      ],
      hint: "Le plus résistant n'est pas le plus long : c'est celui qui est conçu pour être lent.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "sauvegarde_comptes.txt",
      content: `alice  b6edd10559b20cb0a3ddaeb15e5267cc
bruno  940c0f26fd5a30775bb1cbd1f6840398d39bb813
chloe  967520ae23e8ee14888bae72809031b98398ae4a636773e18fff917d77679334
dylan  $2b$12$Q7xN1kLm8vR2pT5wYz3eUeK9oJ4hG6fD1sA0bC8nM2qW7xE5rT9yu`,
      question: "Quel compte a le mot de passe le plus difficile à casser par force brute ?",
      options: [
        { label: "alice (MD5)", correct: false, explanation: "MD5 se calcule des milliards de fois par seconde sur une carte graphique." },
        { label: "bruno (SHA-1)", correct: false, explanation: "SHA-1 est rapide lui aussi, et considéré comme obsolète." },
        { label: "chloe (SHA-256)", correct: false, explanation: "Plus long, mais toujours très rapide, et sans sel ici." },
        { label: "dylan (bcrypt)", correct: true, explanation: "bcrypt est salé et volontairement lent (coût 12) : chaque essai coûte cher au pirate." },
      ],
    },
    successText: "Exact : pour les mots de passe, la lenteur est une qualité.",
  },
  {
    id: "impossible-04",
    name: "La porte dérobée",
    story:
      "Le pirate est entré cette nuit, mais il a aussi préparé son retour. Analyse tout le journal pour trouver comment il compte revenir.",
    card: {
      title: "La persistance",
      category: "Défense",
      icon: "🪝",
      summary: "Tout ce qu'un attaquant met en place pour revenir, même après un redémarrage ou un changement de mot de passe.",
      details: [
        "Exemples : création d'un compte caché, clé SSH ajoutée, tâche planifiée, service malveillant.",
        "Changer le mot de passe compromis ne suffit pas si la persistance n'est pas supprimée.",
        "Les créations de comptes et les ajouts au groupe sudo/admin sont à surveiller de près.",
      ],
      hint: "Suis le compte compromis après sa connexion : quelles commandes lance-t-il avec sudo ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "/var/log/auth.log",
      content: `02:14:07 sshd: Failed password for root from 198.51.100.23
02:14:09 sshd: Failed password for root from 198.51.100.23
02:15:02 sshd: Failed password for deploy from 198.51.100.23
02:15:31 sshd: Accepted password for deploy from 198.51.100.23
02:16:02 sudo: deploy : USER=root ; COMMAND=/usr/sbin/useradd -m svc-backup
02:16:10 sudo: deploy : USER=root ; COMMAND=/usr/sbin/usermod -aG sudo svc-backup
02:16:30 sudo: deploy : USER=root ; COMMAND=/usr/bin/tee /home/svc-backup/.ssh/authorized_keys
02:17:45 sshd: Accepted publickey for svc-backup from 198.51.100.23
08:02:11 sshd: Accepted publickey for marie from 10.0.0.15`,
      question: "Quel compte le pirate a-t-il créé pour revenir ?",
      answers: ["svc-backup"],
    },
    successText: "Compte svc-backup supprimé, clé SSH retirée. La porte dérobée est murée.",
  },
  {
    id: "impossible-05",
    name: "La clé partagée",
    story:
      "Un nouveau fichier chiffré en XOR. Le pirate a écrit : « J'ai repris le code du coffre que tu as ouvert au tout début. »",
    card: {
      title: "Le chiffrement symétrique",
      category: "Crypto",
      icon: "🔐",
      summary: "Une seule clé pour chiffrer et déchiffrer : celui qui l'a peut tout lire.",
      details: [
        "XOR, AES ou ChaCha20 sont des chiffrements symétriques : la même clé sert dans les deux sens.",
        "Tout repose sur le secret de la clé : si elle fuite ou est réutilisée, le chiffrement ne protège plus rien.",
        "Le vrai défi est de partager la clé en sécurité ; c'est le rôle du chiffrement asymétrique.",
      ],
      hint: "Le coffre se trouvait dans la salle 4 du niveau Facile. Son code est la clé XOR.",
    },
    puzzle: {
      kind: "answer",
      content: SYMMETRIC,
      tools: ["xor", "hex", "base64", "vigenere"],
      workshopInput: SYMMETRIC,
      question: "Quel est le code ?",
      answers: ["orbite"],
    },
    successText: "Clé réutilisée, chiffrement brisé. Le pirate ne retient décidément rien.",
  },
  {
    id: "impossible-06",
    name: "Le poème",
    story:
      "Sur l'écran, un « poème » signé du pirate. Il semble ne rien vouloir dire. Pourtant, il cache le nom de son outil favori.",
    card: {
      title: "La stéganographie",
      category: "Crypto",
      icon: "🖼️",
      summary: "Cacher un message dans un autre, pour que personne ne remarque qu'il existe.",
      details: [
        "Contrairement au chiffrement, le but est que le message passe inaperçu.",
        "On peut cacher des données dans une image, un son, ou… les premières lettres d'un texte (acrostiche).",
        "Les malwares cachent parfois leur code dans les pixels d'images en apparence innocentes.",
      ],
      hint: "Lis le poème verticalement.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "poeme.txt",
      content: `Bientôt, le serveur sera à moi.
Aucun pare-feu ne m'arrêtera.
Chaque nuit, je copie vos fichiers.
Kilomètres de câbles, et personne ne me voit.
Demain, j'effacerai mes traces.
On ne me trouvera jamais.
Oubliez vos sauvegardes.
Rien ne pourra me déloger.`,
      question: "Quel mot le pirate a-t-il caché ?",
      answers: ["backdoor"],
    },
    successText: "BACKDOOR. Le pirate signe même ses outils.",
  },
  {
    id: "impossible-07",
    name: "Les factures des autres",
    story:
      "Connecté avec un compte invité, tu peux voir tes factures via l'API. En changeant juste un numéro dans l'adresse, tu vois aussi celles des autres…",
    card: {
      title: "L'IDOR",
      category: "Web",
      icon: "🧾",
      summary: "Accéder aux données d'autrui en changeant simplement un identifiant dans une requête.",
      details: [
        "IDOR = Insecure Direct Object Reference : le serveur ne vérifie pas que l'objet t'appartient.",
        "Des identifiants qui se suivent (1041, 1042, 1043…) rendent l'attaque triviale.",
        "La parade : vérifier les droits à chaque requête, côté serveur.",
      ],
      hint: "Regarde le format des requêtes et lis le commentaire trouvé dans le code.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "tes requêtes",
      content: `Connecté en tant que « invite »

GET /api/factures/1042 → 200 {"id":1042,"client":"invite","montant":"19 €"}
GET /api/factures/1043 → 200 {"id":1043,"client":"lea.compta","montant":"240 €"}
GET /api/factures/1041 → 200 {"id":1041,"client":"karim.dev","montant":"80 €"}

// trouvé dans le code source :
// la facture n°1000 est générée à l'installation pour le compte admin`,
      question: "Quelle URL exacte affiche la facture de l'admin ?",
      answers: ["/api/factures/1000", "api/factures/1000", "GET /api/factures/1000"],
      placeholder: "/api/…",
    },
    successText: "Facture admin affichée : faille IDOR prouvée et signalée.",
  },
  {
    id: "impossible-08",
    name: "La chaîne de l'attaque",
    story:
      "Le tableau blanc de la salle de crise montre les étapes de l'attaque, dans le désordre. Pour ouvrir la porte, il faut l'ordre exact du modèle utilisé par les analystes.",
    card: {
      title: "La Cyber Kill Chain",
      category: "Défense",
      icon: "⛓️",
      summary: "Les 7 étapes d'une attaque, de la reconnaissance jusqu'à l'objectif final.",
      details: [
        "Reconnaissance → Armement → Livraison → Exploitation → Installation → Commande et contrôle → Actions sur l'objectif.",
        "Chaque étape est une occasion de détecter et de stopper l'attaque.",
        "Plus on casse la chaîne tôt, moins l'attaque fait de dégâts.",
      ],
      hint: "Avant de livrer une arme, il faut l'avoir fabriquée. Avant de la fabriquer, il faut connaître sa cible.",
    },
    puzzle: {
      kind: "choice",
      question: "Quel est le bon ordre ?",
      options: [
        {
          label: "Reconnaissance → Armement → Livraison → Exploitation → Installation → Commande et contrôle → Actions",
          correct: true,
          explanation: "C'est l'ordre de la Cyber Kill Chain de Lockheed Martin.",
        },
        {
          label: "Reconnaissance → Livraison → Armement → Exploitation → Installation → Commande et contrôle → Actions",
          correct: false,
          explanation: "On ne peut pas livrer une arme qu'on n'a pas encore préparée.",
        },
        {
          label: "Armement → Reconnaissance → Livraison → Installation → Exploitation → Commande et contrôle → Actions",
          correct: false,
          explanation: "On étudie la cible d'abord, et l'exploitation précède l'installation.",
        },
        {
          label: "Reconnaissance → Armement → Livraison → Installation → Exploitation → Actions → Commande et contrôle",
          correct: false,
          explanation: "Il faut exploiter une faille pour installer quoi que ce soit, et le C2 vient avant les actions.",
        },
      ],
    },
    successText: "Chaîne reconstituée. Tu penses désormais comme une équipe SOC.",
  },
  {
    id: "impossible-09",
    name: "L'horloge Unix",
    story:
      "Le pirate a effacé l'heure lisible de ses logs, mais pas les timestamps. Pour le rapport, il faut l'heure exacte de l'intrusion. Une note morse sur le mur indique aussi la sortie.",
    card: {
      title: "L'horodatage Unix",
      category: "Système",
      icon: "⏱️",
      summary: "Le nombre de secondes écoulées depuis le 1er janvier 1970 à minuit UTC.",
      details: [
        "Les systèmes stockent souvent le temps en secondes depuis le 01/01/1970 00:00 UTC (l'« epoch »).",
        "Une journée dure 86 400 secondes, une heure 3 600.",
        "Remettre tous les logs sur la même heure (UTC) est indispensable pour reconstituer une attaque.",
      ],
      hint: "Le 13/11/2026 à 00:00:00 UTC correspond à 1794528000. Fais la différence, puis divise par 3 600.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "intrusion.log",
      content: `1794520812  connexion de marie depuis 10.0.0.15
1794563587  connexion root depuis 198.51.100.23   <-- intrusion
1794563901  fichier déposé : /tmp/.x

note sur le mur : ${MORSE_NOTE}`,
      tools: ["morse"],
      workshopInput: MORSE_NOTE,
      question: "À quelle heure UTC a eu lieu l'intrusion (HH:MM) ?",
      answers: ["09:53", "9:53", "09h53", "9h53"],
      placeholder: "HH:MM",
    },
    successText: "09:53 UTC. Le rapport est précis à la minute près.",
  },
  {
    id: "impossible-10",
    name: "Le noyau",
    story:
      "La dernière porte. Le pirate a laissé un fichier contenant le code d'arrêt de son attaque, protégé par trois couches. Il a signé son passage dans le log. C'est le moment de tout utiliser.",
    card: {
      title: "La réponse à incident",
      category: "Défense",
      icon: "🚨",
      summary: "Préparer, détecter, contenir, éradiquer, restaurer, tirer les leçons.",
      details: [
        "Préparation : plans, outils et sauvegardes prêts avant l'attaque.",
        "Détection et analyse, puis confinement (isoler), éradication (supprimer la menace) et restauration.",
        "Retour d'expérience : comprendre ce qui a échoué pour que ça ne se reproduise pas.",
      ],
      hint: "La signature donne la clé (phoenix). Le contenu a été XORé, passé en Base64, puis retourné : défais dans l'ordre inverse.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "/var/log/pirate.log",
      content: `[03:33:33] connexion root depuis 198.51.100.66
[03:33:40] fichier déposé : /tmp/.cache/arret.txt
# -- Ph03n1x était là. Ma clé ? Mon nom, en minuscules et sans chiffres. --

contenu de arret.txt :
${FINAL}`,
      tools: ["base64", "hex", "binary", "reverse", "rot13", "caesar", "atbash", "url", "morse", "vigenere", "xor"],
      workshopInput: FINAL,
      question: "Quel est le code d'arrêt du pirate ?",
      answers: ["renaissance"],
    },
    successText: "Code d'arrêt envoyé. Le pirate est éjecté, le serveur est libre. Tu as terminé CyberEscape !",
  },
];
