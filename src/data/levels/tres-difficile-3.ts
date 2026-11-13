import { reverse, toBase64, toXorHex } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const STRINGS = toBase64(reverse(toXorHex("C2=nimbus-relay.net;cible=compta;delai=3600", "apt")));

/** Salles 21 à 40 du niveau Très difficile. */
export const TRES_DIFFICILE_3: RoomContent[] = [
  {
    id: "tres-difficile-21",
    name: "Les chaînes cachées",
    story: "Un nouvel échantillon du malware du pirate. Ses chaînes de caractères sont protégées : Base64, puis inversées, puis XOR avec la clé « apt ».",
    card: {
      title: "L'analyse statique",
      category: "Défense",
      icon: "🔬",
      summary: "Étudier un malware sans l'exécuter : chaînes, imports, structure.",
      details: [
        "On commence toujours par le hash, le type réel du fichier et ses chaînes lisibles (domaines, IP, chemins).",
        "Les malwares cachent ces chaînes avec des encodages et du XOR pour gêner l'analyse.",
        "Les défaire révèle souvent la configuration : serveur C2, cibles, délais.",
      ],
      hint: "Défais dans l'ordre inverse : Base64 → Inverser → XOR (hex) avec la clé apt.",
    },
    puzzle: {
      kind: "answer",
      content: STRINGS,
      tools: ["base64", "reverse", "xor", "hex", "rot13"],
      workshopInput: STRINGS,
      question: "Quel est le domaine du serveur C2 ?",
      answers: ["nimbus-relay.net"],
      placeholder: "exemple.com",
    },
    successText: "Configuration extraite : nimbus-relay.net est bloqué partout.",
  },
  {
    id: "tres-difficile-22",
    name: "Les fonctions importées",
    story: "L'analyse de l'échantillon liste les fonctions Windows qu'il utilise. Trois d'entre elles, ensemble, trahissent une technique bien précise.",
    card: {
      title: "L'injection de processus",
      category: "Système",
      icon: "💉",
      summary: "Cacher son code à l'intérieur d'un processus légitime.",
      details: [
        "Le malware réserve de la mémoire dans un autre processus, y écrit son code, puis l'y exécute.",
        "Trio classique : VirtualAllocEx, WriteProcessMemory, CreateRemoteThread.",
        "Le code malveillant tourne alors sous le nom d'un programme de confiance (explorer.exe, svchost.exe…).",
      ],
      hint: "Allouer de la mémoire, y écrire, lancer un thread… dans un autre processus.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "imports de l'échantillon (extrait)",
      content: `kernel32.dll
  OpenProcess
  VirtualAllocEx
  WriteProcessMemory
  CreateRemoteThread
  Sleep`,
      question: "Quelle technique ces fonctions suggèrent-elles ?",
      options: [
        { label: "Le chiffrement de fichiers", correct: false, explanation: "Aucune fonction de chiffrement ou de parcours de fichiers ici." },
        { label: "L'injection de code dans un autre processus", correct: true, explanation: "Allouer, écrire et exécuter dans un processus distant : c'est l'injection." },
        { label: "L'envoi de mails", correct: false, explanation: "Aucune fonction réseau ou de messagerie." },
      ],
    },
    successText: "Technique identifiée (ATT&CK T1055). Une règle EDR est ajoutée.",
  },
  {
    id: "tres-difficile-23",
    name: "La moisson de tickets",
    story: "Le journal du contrôleur de domaine montre un compte qui demande, en quelques secondes, des tickets Kerberos pour des dizaines de comptes de service.",
    card: {
      title: "Le Kerberoasting",
      category: "Système",
      icon: "🎫",
      summary: "Demander des tickets de service pour casser hors ligne les mots de passe des comptes de service.",
      details: [
        "Dans l'Active Directory, n'importe quel utilisateur peut demander un ticket pour un service.",
        "Une partie du ticket est chiffrée avec le mot de passe du compte de service : l'attaquant le casse ensuite chez lui.",
        "Signes : beaucoup d'événements 4769 en peu de temps, souvent avec un chiffrement RC4 ; parade : mots de passe de service très longs.",
      ],
      hint: "Beaucoup de tickets de service demandés d'un coup par un seul compte.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "Journal Sécurité du contrôleur de domaine",
      content: `10:02:01  4769  compte : m.bernard  service : svc-sql      chiffrement : RC4
10:02:01  4769  compte : m.bernard  service : svc-backup   chiffrement : RC4
10:02:02  4769  compte : m.bernard  service : svc-web      chiffrement : RC4
…         (47 autres services en 6 secondes)`,
      question: "De quelle attaque s'agit-il ?",
      options: [
        { label: "Kerberoasting", correct: true, explanation: "Des dizaines de tickets de service demandés d'un coup, en RC4, pour les casser hors ligne." },
        { label: "Phishing", correct: false, explanation: "Aucun message n'est impliqué." },
        { label: "DDoS", correct: false, explanation: "Le but n'est pas de saturer le serveur." },
      ],
    },
    successText: "Kerberoasting détecté. Les mots de passe des comptes de service passent à 30 caractères.",
  },
  {
    id: "tres-difficile-24",
    name: "Le hash qui suffit",
    story: "Le pirate n'a jamais trouvé le mot de passe de l'admin. Il a seulement volé son hash NTLM… et il se connecte quand même aux serveurs.",
    card: {
      title: "Le pass-the-hash",
      category: "Mots de passe",
      icon: "🪙",
      summary: "Utiliser directement le hash d'un mot de passe pour s'authentifier, sans le casser.",
      details: [
        "Avec l'authentification NTLM, le hash suffit à prouver qu'on « connaît » le mot de passe.",
        "L'attaquant récupère les hashs en mémoire (LSASS) puis s'en sert pour se connecter ailleurs.",
        "Parades : comptes admin différents par machine (LAPS), protection de LSASS, limiter NTLM.",
      ],
      hint: "Pas besoin de casser le hash : il sert directement de clé.",
    },
    puzzle: {
      kind: "choice",
      question: "Comment le pirate se connecte-t-il sans connaître le mot de passe ?",
      options: [
        { label: "Il a cassé le hash avec une table arc-en-ciel", correct: false, explanation: "L'énoncé précise qu'il ne connaît pas le mot de passe." },
        { label: "Il utilise directement le hash pour s'authentifier (pass-the-hash)", correct: true, explanation: "Avec NTLM, le hash fait office de mot de passe." },
        { label: "Il a deviné le mot de passe par chance", correct: false, explanation: "Il n'en a pas eu besoin." },
      ],
    },
    successText: "Pass-the-hash bloqué : chaque serveur a désormais son propre mot de passe admin.",
  },
  {
    id: "tres-difficile-25",
    name: "Les notifications à 3 heures",
    story: "À 3 h du matin, une employée reçoit 40 demandes de validation sur son application de double authentification. À la 41e, elle appuie sur « Approuver » pour que ça s'arrête.",
    card: {
      title: "La fatigue MFA",
      category: "Mots de passe",
      icon: "😩",
      summary: "Bombarder la victime de demandes de validation jusqu'à ce qu'elle accepte.",
      details: [
        "L'attaquant a déjà le mot de passe ; il ne lui manque que la validation du deuxième facteur.",
        "Il envoie des demandes en boucle, parfois avec un appel « du support » pour pousser à accepter.",
        "Parades : saisie d'un nombre affiché à l'écran (number matching), limitation des demandes, alerte au SOC.",
      ],
      hint: "La victime a été épuisée par les notifications.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle mesure empêche le mieux cette attaque ?",
      options: [
        { label: "La saisie d'un nombre affiché sur l'écran de connexion (number matching)", correct: true, explanation: "La victime ne peut pas valider sans voir l'écran de l'attaquant." },
        { label: "Désactiver la double authentification", correct: false, explanation: "L'attaquant entrerait encore plus facilement." },
        { label: "Mettre le téléphone en silencieux la nuit", correct: false, explanation: "Ça ne change rien au fond du problème." },
      ],
    },
    successText: "Number matching activé. Les notifications en rafale ne servent plus à rien.",
  },
  {
    id: "tres-difficile-26",
    name: "Le proxy invisible",
    story: "Une victime s'est connectée sur une fausse page, avec sa double authentification. Le pirate est entré quand même : il a volé le cookie de session au passage.",
    card: {
      title: "Le vol de session (AitM)",
      category: "Web",
      icon: "🪞",
      summary: "Une fausse page relaie tout au vrai site et capture le cookie de session, MFA comprise.",
      details: [
        "Le kit de phishing se place entre la victime et le vrai site (adversary-in-the-middle) et relaie chaque échange.",
        "La victime valide sa double authentification sur le vrai site… et le pirate récupère le cookie de session créé.",
        "Parades : MFA résistante au phishing (clés FIDO2, passkeys), alertes sur les connexions inhabituelles.",
      ],
      hint: "Le mot de passe et le code ne lui servent plus : il a mieux.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle protection résiste à ce type d'attaque ?",
      options: [
        { label: "Un code reçu par SMS", correct: false, explanation: "Le code est relayé par la fausse page, comme le mot de passe." },
        { label: "Une clé de sécurité FIDO2 ou une passkey", correct: true, explanation: "Elle est liée au vrai domaine : elle refuse de fonctionner sur la fausse page." },
        { label: "Un mot de passe plus long", correct: false, explanation: "Il est capturé et relayé de la même façon." },
      ],
    },
    successText: "Sessions révoquées, passkeys déployées pour les comptes sensibles.",
  },
  {
    id: "tres-difficile-27",
    name: "Le capteur Sysmon",
    story: "Sysmon est installé sur tous les postes. Pour ta règle de détection, il te faut l'identifiant d'événement qui enregistre les connexions réseau.",
    card: {
      title: "Sysmon",
      category: "Défense",
      icon: "📡",
      summary: "Un outil gratuit de Microsoft qui enrichit énormément les journaux Windows.",
      details: [
        "Événement 1 : création de processus, avec la ligne de commande et le processus parent.",
        "Événement 3 : connexion réseau. 11 : création de fichier. 13 : modification du registre. 22 : requête DNS.",
        "C'est l'une des sources les plus utiles pour un SOC sur un parc Windows.",
      ],
      hint: "Regarde la liste : quel identifiant parle de connexion réseau ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "aide-mémoire Sysmon",
      content: `ID 1   Process creation
ID 3   Network connection detected
ID 7   Image loaded
ID 11  File created
ID 13  Registry value set
ID 22  DNS query`,
      question: "Quel ID Sysmon enregistre les connexions réseau ?",
      answers: ["3"],
    },
    successText: "Règle créée sur l'événement 3 : chaque connexion suspecte est remontée au SOC.",
  },
  {
    id: "tres-difficile-28",
    name: "L'arbre généalogique",
    story: "L'EDR montre l'arbre des processus d'un poste infecté. Le malware n'est pas apparu de nulle part : un programme parent l'a lancé.",
    card: {
      title: "L'arbre de processus",
      category: "Système",
      icon: "🌲",
      summary: "Savoir quel programme en a lancé un autre révèle souvent le point d'entrée d'une attaque.",
      details: [
        "Chaque processus a un parent : explorer.exe lance les programmes ouverts par l'utilisateur.",
        "Une application bureautique (Word, Excel, Outlook) qui lance cmd.exe ou powershell.exe est très suspecte.",
        "Remonter l'arbre permet de trouver le document ou le mail à l'origine de l'infection.",
      ],
      hint: "Quel programme n'a aucune raison de lancer un terminal ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "arbre des processus (EDR)",
      content: `explorer.exe
 └─ outlook.exe
     └─ winword.exe  "Facture_novembre.docm"
         └─ cmd.exe /c powershell -w hidden -enc JABjAD0A…
             └─ powershell.exe`,
      question: "Quel programme a lancé la chaîne malveillante (le parent de cmd.exe) ?",
      answers: ["winword.exe", "winword"],
    },
    successText: "Point d'entrée trouvé : le document Word piégé reçu par mail.",
  },
  {
    id: "tres-difficile-29",
    name: "Les noms au hasard",
    story: "Le poste infecté tente de joindre des dizaines de domaines qui n'existent pas. Un seul répond : c'est le serveur du pirate.",
    card: {
      title: "Les domaines générés (DGA)",
      category: "Réseau",
      icon: "🎲",
      summary: "Des malwares génèrent chaque jour des centaines de noms de domaine pour retrouver leur serveur.",
      details: [
        "Un algorithme de génération de domaines (DGA) produit des noms aléatoires ; l'attaquant n'en enregistre que quelques-uns.",
        "Bloquer un domaine ne suffit pas : le malware en essaie d'autres le lendemain.",
        "Détection : beaucoup de réponses NXDOMAIN (domaine inexistant) et des noms à l'allure aléatoire.",
      ],
      hint: "Cherche la seule requête qui a reçu une adresse IP.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "requêtes DNS du poste 10.0.0.37",
      content: `qzkxwvbfrt.net     NXDOMAIN
mplqazrtyu.org     NXDOMAIN
xvbnrtkwlq.com     NXDOMAIN
hjkqwzxpvr.net     → 198.51.100.99
trzqmxvwkl.org     NXDOMAIN`,
      question: "Quel domaine est le serveur actif du pirate ?",
      answers: ["hjkqwzxpvr.net"],
    },
    successText: "Domaine actif bloqué, et une règle surveille les rafales de NXDOMAIN.",
  },
  {
    id: "tres-difficile-30",
    name: "Le faux serveur",
    story: "L'équipe a installé un faux serveur de fichiers, sans aucune donnée réelle, que personne n'est censé utiliser. Cette nuit, quelqu'un s'y est connecté.",
    card: {
      title: "Les leurres (honeypots)",
      category: "Défense",
      icon: "🍯",
      summary: "Un piège qui n'a aucune utilité réelle : toute personne qui y touche est suspecte.",
      details: [
        "Un honeypot imite un serveur, un compte ou un fichier attrayant pour un attaquant.",
        "Comme personne n'a de raison légitime d'y accéder, chaque connexion est une alerte quasi certaine.",
        "Il permet de détecter tôt une intrusion et d'observer les techniques de l'attaquant.",
      ],
      hint: "Personne n'a de raison légitime d'y toucher.",
    },
    puzzle: {
      kind: "choice",
      question: "Pourquoi cette connexion est-elle une alerte sérieuse ?",
      options: [
        { label: "Parce que le serveur contient des données importantes", correct: false, explanation: "Il ne contient justement rien de réel." },
        { label: "Parce que personne n'a de raison légitime d'accéder à un leurre", correct: true, explanation: "Toute activité sur un honeypot est suspecte par nature." },
        { label: "Ce n'est pas une alerte, c'est sûrement une erreur", correct: false, explanation: "Un leurre génère très peu de faux positifs." },
      ],
    },
    successText: "Le leurre a fonctionné : le pirate est repéré avant d'atteindre les vrais serveurs.",
  },
  {
    id: "tres-difficile-31",
    name: "La mémoire vive",
    story: "Un rootkit cache un processus dans la liste normale. Mais une analyse de la mémoire vive, qui parcourt toutes les structures, le retrouve.",
    card: {
      title: "L'analyse de la mémoire",
      category: "Défense",
      icon: "🧠",
      summary: "Capturer et étudier la RAM pour trouver ce qu'un malware cache sur le disque et dans le système.",
      details: [
        "Certains malwares ne laissent aucun fichier sur le disque et vivent uniquement en mémoire.",
        "Des outils comme Volatility listent processus, connexions et injections à partir d'une capture de la RAM.",
        "Comparer la liste « officielle » des processus avec un scan complet révèle les processus cachés.",
      ],
      hint: "Compare les deux listes : quel PID n'apparaît que dans le scan complet ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "volatility : pslist (liste officielle) vs psscan (scan complet)",
      content: `pslist :  4 System | 612 svchost.exe | 1320 explorer.exe | 2044 chrome.exe
psscan :  4 System | 612 svchost.exe | 1320 explorer.exe | 2044 chrome.exe | 3377 svc_host.exe`,
      question: "Quel est le PID du processus caché ?",
      answers: ["3377"],
    },
    successText: "Processus caché 3377 trouvé : le rootkit est démasqué.",
  },
  {
    id: "tres-difficile-32",
    name: "Les dates truquées",
    story: "Dans le dossier d'un serveur créé hier, un fichier affiche une date de création de 2009. Le pirate a modifié ses dates pour qu'il se fonde dans la masse.",
    card: {
      title: "Le timestomping",
      category: "Système",
      icon: "🕰️",
      summary: "Modifier les dates d'un fichier pour tromper les enquêteurs.",
      details: [
        "Les attaquants changent les dates de leurs fichiers pour qu'ils paraissent anciens et légitimes.",
        "Les incohérences les trahissent : un fichier « plus vieux » que le dossier ou le système qui le contient.",
        "Les analystes croisent plusieurs sources de dates (MFT, journaux) pour repérer la supercherie.",
      ],
      hint: "Quel fichier serait plus ancien que le dossier qui le contient ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "C:\\ProgramData\\Outils\\  (dossier créé le 12/11/2026)",
      content: `Nom              Créé le
config.ini       12/11/2026 09:14
outil.exe        12/11/2026 09:15
helper.dll       03/02/2009 11:00
readme.txt       12/11/2026 09:15`,
      question: "Quel fichier a des dates truquées ?",
      answers: ["helper.dll"],
    },
    successText: "helper.dll démasqué : il a été déposé hier, pas en 2009.",
  },
  {
    id: "tres-difficile-33",
    name: "Les traces effacées",
    story: "Le journal de sécurité d'un serveur est presque vide. Seule une ligne subsiste, juste avant le trou… et elle en dit long.",
    card: {
      title: "L'effacement des journaux",
      category: "Défense",
      icon: "🧽",
      summary: "Effacer les journaux pour masquer une intrusion laisse, lui aussi, une trace.",
      details: [
        "Sous Windows, vider le journal Sécurité génère l'événement 1102.",
        "Un attaquant efface souvent ses traces avant de partir (ATT&CK T1070).",
        "Parade : envoyer les journaux en temps réel vers un SIEM, où l'attaquant ne peut pas les effacer.",
      ],
      hint: "Quel événement dit « le journal d'audit a été effacé » ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "Journal Sécurité (après l'incident)",
      content: `03:41:07  1102  Le journal d'audit a été effacé.  Compte : svc-backup`,
      question: "Quel Event ID signale l'effacement du journal ?",
      answers: ["1102"],
    },
    successText: "Heureusement, une copie des journaux dormait dans le SIEM. L'enquête continue.",
  },
  {
    id: "tres-difficile-34",
    name: "Le seau ouvert",
    story: "Un espace de stockage cloud de l'entreprise est accessible publiquement. Tu en listes le contenu, comme le pirate avant toi.",
    card: {
      title: "Le stockage cloud mal configuré",
      category: "Défense",
      icon: "🪣",
      summary: "Un espace de stockage rendu public par erreur expose tout son contenu à Internet.",
      details: [
        "Les « buckets » de stockage cloud sont privés par défaut, mais une mauvaise configuration peut les ouvrir à tous.",
        "Des robots scannent Internet à la recherche de ces espaces publics.",
        "Parades : blocage de l'accès public au niveau du compte, audits réguliers, chiffrement.",
      ],
      hint: "Quel fichier ne devrait jamais être public ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "contenu de https://stockage.serveur-corp.fr/public/",
      content: `logo.png                 12 Ko
plaquette-commerciale.pdf  2 Mo
export_clients_2026.csv   48 Mo
banniere-site.jpg         340 Ko`,
      question: "Quel fichier sensible a été exposé ?",
      answers: ["export_clients_2026.csv"],
    },
    successText: "Accès public coupé. La fuite doit maintenant être notifiée à la CNIL sous 72 heures.",
  },
  {
    id: "tres-difficile-35",
    name: "La règle partagée",
    story: "Un autre SOC a partagé une règle de détection au format Sigma. Avant de l'adapter à ton SIEM, il faut comprendre ce qu'elle surveille.",
    card: {
      title: "Les règles Sigma",
      category: "Défense",
      icon: "📐",
      summary: "Un format standard pour écrire une détection une fois et l'utiliser dans n'importe quel SIEM.",
      details: [
        "Une règle Sigma décrit une source de journaux, des critères de sélection et une condition.",
        "Elle se convertit automatiquement vers la langue de requête de chaque SIEM.",
        "Des milliers de règles sont partagées librement par la communauté.",
      ],
      hint: "Lis la section detection : quel programme et quel argument sont recherchés ?",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "regle.yml",
      content: `title: Suppression des clichés instantanés
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\\vssadmin.exe'
    CommandLine|contains: 'delete shadows'
  condition: selection
level: high`,
      question: "Que détecte cette règle ?",
      options: [
        { label: "Une connexion VPN", correct: false, explanation: "La source est la création de processus, pas le réseau." },
        { label: "Le lancement de vssadmin pour supprimer les clichés instantanés", correct: true, explanation: "Un comportement typique des rançongiciels avant le chiffrement." },
        { label: "L'installation d'un antivirus", correct: false, explanation: "Rien ne concerne un antivirus ici." },
      ],
    },
    successText: "Règle convertie et déployée dans ton SIEM.",
  },
  {
    id: "tres-difficile-36",
    name: "Le mail signalé",
    story: "Un employé signale un mail suspect via le bouton dédié. En tant qu'analyste SOC, remets ton processus de traitement dans l'ordre.",
    card: {
      title: "Le triage d'un mail signalé",
      category: "Défense",
      icon: "📥",
      summary: "Analyser vite, extraire les indicateurs, chercher les autres victimes, puis bloquer.",
      details: [
        "On examine d'abord les en-têtes (expéditeur réel, SPF/DKIM/DMARC).",
        "Les liens et pièces jointes s'analysent dans un bac à sable, jamais sur son poste.",
        "Les IOC obtenus servent à chercher qui d'autre a reçu ou cliqué, avant de tout bloquer.",
      ],
      hint: "Comprendre, analyser, chercher l'étendue, puis bloquer.",
    },
    puzzle: {
      kind: "order",
      question: "Dans quel ordre traiter le mail signalé ?",
      items: [
        "Analyser les en-têtes du mail",
        "Analyser liens et pièces jointes dans un bac à sable",
        "Rechercher dans le SIEM qui d'autre l'a reçu ou a cliqué",
        "Bloquer l'expéditeur et les IOC, puis informer les utilisateurs",
      ],
    },
    successText: "Traitement exemplaire : 14 destinataires identifiés, 2 clics, 0 compromission.",
  },
  {
    id: "tres-difficile-37",
    name: "La pyramide",
    story: "Le rapport d'incident liste plusieurs éléments. Pour le partage avec les autres SOC, il faut séparer les indicateurs de compromission du reste.",
    card: {
      title: "IOC et pyramide de la douleur",
      category: "Défense",
      icon: "🔺",
      summary: "Des hashs aux comportements : plus on monte, plus la détection gêne l'attaquant.",
      details: [
        "En bas de la pyramide : hashs, IP, domaines. Faciles à bloquer, faciles à changer pour l'attaquant.",
        "En haut : outils et techniques (TTP). Difficiles à changer : les détecter fait vraiment mal à l'attaquant.",
        "Les IOC restent utiles pour bloquer et rechercher rapidement une menace connue.",
      ],
      hint: "Un IOC est une trace technique concrète, pas une description de comportement.",
    },
    puzzle: {
      kind: "multi",
      question: "Lesquels sont des indicateurs de compromission (IOC) ?",
      options: [
        { label: "Le hash SHA-256 du malware", correct: true, explanation: "C'est une trace technique concrète." },
        { label: "Le domaine meteo-sync.net", correct: true, explanation: "Un domaine malveillant est un IOC classique." },
        { label: "L'adresse IP 198.51.100.66", correct: true, explanation: "Une IP malveillante est un IOC." },
        { label: "« L'attaquant utilise des macros Office pour l'accès initial »", correct: false, explanation: "C'est une technique (TTP), pas un indicateur ponctuel." },
        { label: "Le nom de fichier maj_audio.exe", correct: true, explanation: "Un nom de fichier malveillant est un IOC." },
      ],
    },
    successText: "IOC partagés avec le CERT. La technique, elle, est ajoutée aux règles de détection.",
  },
  {
    id: "tres-difficile-38",
    name: "Le CV piégé",
    story: "Le service RH reçoit trois candidatures. L'une d'elles contient un fichier image disque (.iso) qui cache un raccourci malveillant.",
    card: {
      title: "Les fichiers ISO et LNK",
      category: "Système",
      icon: "💿",
      summary: "Des conteneurs et des raccourcis utilisés pour contourner les protections des pièces jointes.",
      details: [
        "Depuis le blocage des macros, les attaquants envoient des .iso, .img ou .zip contenant un raccourci .lnk.",
        "Le raccourci ressemble à un document mais lance une commande (PowerShell, rundll32…).",
        "Les fichiers extraits d'une image disque échappaient longtemps au marquage « provenant d'Internet ».",
      ],
      hint: "Un CV, c'est un PDF ou un document. Pas une image disque.",
    },
    puzzle: {
      kind: "phishing",
      emails: [
        {
          id: "cv1",
          fromName: "Inès Laurent",
          fromAddress: "ines.laurent@mail-perso.fr",
          subject: "Candidature – Analyste SOC junior",
          body: "Bonjour, veuillez trouver ci-joint mon CV et ma lettre de motivation au format PDF. Bien cordialement.",
          linkText: "CV_Ines_Laurent.pdf",
          linkHref: "pièce jointe : CV_Ines_Laurent.pdf (PDF, 180 Ko)",
          isPhishing: false,
          explanation: "Un simple PDF, comme toute candidature : rien de suspect.",
        },
        {
          id: "cv2",
          fromName: "Thomas Girard",
          fromAddress: "t.girard.candidature@mail-perso.fr",
          subject: "Candidature spontanée – mon CV",
          body: "Bonjour, mon CV est trop volumineux, je l'ai mis dans une image disque. Double-cliquez sur le fichier puis ouvrez CV.pdf.",
          linkText: "CV_Thomas.iso",
          linkHref: "pièce jointe : CV_Thomas.iso → contient « CV.pdf.lnk » (raccourci)",
          isPhishing: true,
          explanation: "Une image disque qui contient un raccourci .lnk déguisé en PDF : technique classique d'accès initial.",
        },
        {
          id: "cv3",
          fromName: "Sarah Nguyen",
          fromAddress: "sarah.nguyen@mail-perso.fr",
          subject: "Candidature – Stage cybersécurité",
          body: "Bonjour, voici mon CV en lien de téléchargement depuis mon espace de stockage personnel, ainsi que mon profil professionnel.",
          linkText: "CV_Sarah_Nguyen.pdf",
          linkHref: "pièce jointe : CV_Sarah_Nguyen.pdf (PDF, 210 Ko)",
          isPhishing: false,
          explanation: "Un PDF classique : rien de suspect.",
        },
      ],
    },
    successText: "Image disque bloquée. Les .iso et .lnk sont désormais filtrés par la messagerie.",
  },
  {
    id: "tres-difficile-39",
    name: "Le rapport du bac à sable",
    story: "Tu as exécuté un échantillon dans un bac à sable. Le rapport liste ses actions. L'une d'elles est la signature d'un rançongiciel.",
    card: {
      title: "La suppression des clichés instantanés",
      category: "Défense",
      icon: "💣",
      summary: "Avant de chiffrer, les rançongiciels détruisent les copies de secours de Windows.",
      details: [
        "Windows garde des clichés instantanés (Shadow Copies) qui permettent de restaurer des fichiers.",
        "Les rançongiciels les suppriment (vssadmin delete shadows, wmic shadowcopy delete) pour empêcher la récupération.",
        "C'est un signal d'alerte critique : à détecter et bloquer immédiatement.",
      ],
      hint: "Quel outil Windows gère les clichés instantanés ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "rapport du bac à sable (actions observées)",
      content: `1. Création de C:\\Users\\Public\\note.txt
2. Exécution : vssadmin.exe delete shadows /all /quiet
3. Connexion vers 198.51.100.120:443
4. Renommage de 2 347 fichiers en *.verrouille`,
      question: "Quel outil a été utilisé pour supprimer les copies de secours ?",
      answers: ["vssadmin", "vssadmin.exe"],
    },
    successText: "Rançongiciel confirmé. Une règle bloque désormais vssadmin delete shadows.",
  },
  {
    id: "tres-difficile-40",
    name: "Le patient zéro",
    story: "Dernière salle du niveau Très difficile. Trois sources de journaux, trois vues partielles. En les croisant, trouve la première machine infectée.",
    card: {
      title: "La corrélation d'événements",
      category: "Défense",
      icon: "🧵",
      summary: "Relier des indices venant de sources différentes pour reconstituer une attaque.",
      details: [
        "Un seul journal montre rarement toute l'attaque : messagerie, proxy, EDR et pare-feu se complètent.",
        "Le SIEM permet de croiser ces sources par machine, utilisateur, IP ou heure.",
        "Retrouver le « patient zéro » permet de comprendre l'accès initial et de vérifier l'étendue de l'incident.",
      ],
      hint: "Qui a ouvert la pièce jointe en premier, puis contacté le serveur du pirate ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "trois sources",
      content: `MESSAGERIE  08:51  facture.docm reçu par : a.martin, l.petit, k.diallo
EDR         09:02  PC-COMPTA-03 (l.petit) : winword.exe → powershell.exe
EDR         09:40  PC-RH-11 (k.diallo)    : winword.exe → powershell.exe
PROXY       09:03  PC-COMPTA-03 → meteo-sync.net
PROXY       09:41  PC-RH-11     → meteo-sync.net`,
      question: "Quelle est la première machine infectée ?",
      answers: ["PC-COMPTA-03"],
    },
    successText: "Patient zéro identifié : PC-COMPTA-03. Niveau Très difficile entièrement terminé !",
  },
];
