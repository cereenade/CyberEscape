import { atbash, reverse } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const TRANSPOSED = atbash(reverse("LA PORTE CACHEE MENE AU MOT ARCHIPEL"));

/** Salles 11 à 20 du niveau Difficile. */
export const DIFFICILE_2: RoomContent[] = [
  {
    id: "difficile-11",
    name: "Le message retourné",
    story: "Le pirate combine deux idées : il écrit à l'envers, puis remplace chaque lettre par son reflet. Défais les deux.",
    card: {
      title: "Substitution et transposition",
      category: "Crypto",
      icon: "🔀",
      summary: "Remplacer les lettres (substitution) ou les déplacer (transposition) : les deux briques des chiffres classiques.",
      details: [
        "Substitution : chaque lettre change d'identité (César, Atbash, Vigenère).",
        "Transposition : les lettres restent les mêmes mais changent de place (inversion, grille…).",
        "Les chiffres modernes comme AES combinent des substitutions et des permutations, répétées de nombreuses fois.",
      ],
      hint: "Les lettres ont été inversées (transposition) puis passées en Atbash (substitution). L'ordre des deux étapes n'a pas d'importance ici.",
    },
    puzzle: {
      kind: "answer",
      content: TRANSPOSED,
      tools: ["atbash", "reverse", "rot13", "caesar"],
      workshopInput: TRANSPOSED,
      question: "Vers quel mot mène la porte cachée ?",
      answers: ["archipel"],
    },
    successText: "Deux transformations défaites, la porte cachée s'ouvre.",
  },
  {
    id: "difficile-12",
    name: "Les en-têtes du serveur",
    story: "Tu audites le site du pirate. Sa réponse HTTP contient plusieurs en-têtes. Lesquels le protègent réellement ?",
    card: {
      title: "Les en-têtes de sécurité HTTP",
      category: "Web",
      icon: "📋",
      summary: "Quelques lignes dans la réponse du serveur bloquent des familles entières d'attaques.",
      details: [
        "Strict-Transport-Security force le navigateur à utiliser HTTPS.",
        "Content-Security-Policy limite les scripts autorisés : un frein majeur contre le XSS.",
        "X-Frame-Options empêche d'afficher le site dans une page piégée (clickjacking).",
      ],
      hint: "Trois en-têtes protègent ; les deux autres décrivent juste le contenu… ou le révèlent.",
    },
    puzzle: {
      kind: "multi",
      contentLabel: "réponse HTTP",
      content: `HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Server: Apache/2.4.29 (Ubuntu)
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY`,
      question: "Quels en-têtes sont des protections de sécurité ?",
      options: [
        { label: "Content-Type", correct: false, explanation: "Il indique seulement le format de la page." },
        { label: "Server: Apache/2.4.29", correct: false, explanation: "Au contraire : il révèle la version du serveur aux attaquants." },
        { label: "Strict-Transport-Security", correct: true, explanation: "Il impose HTTPS pour toutes les visites futures." },
        { label: "Content-Security-Policy", correct: true, explanation: "Il limite d'où peuvent venir les scripts." },
        { label: "X-Frame-Options", correct: true, explanation: "Il empêche le clickjacking." },
      ],
    },
    successText: "Audit validé : tu sais lire les protections d'un serveur.",
  },
  {
    id: "difficile-13",
    name: "Le formulaire fantôme",
    story:
      "Connecté au panneau du pirate, tu visites une autre page. Elle contient un formulaire invisible qui s'envoie tout seul vers le panneau… avec ta session.",
    card: {
      title: "La faille CSRF",
      category: "Web",
      icon: "👻",
      summary: "Faire exécuter une action à un utilisateur connecté, à son insu, depuis un autre site.",
      details: [
        "Le navigateur envoie automatiquement tes cookies au site concerné, même si la requête vient d'ailleurs.",
        "Une page piégée peut ainsi déclencher un virement ou un changement de mot de passe en ton nom.",
        "Parades : jetons anti-CSRF uniques et cookies SameSite.",
      ],
      hint: "Ce n'est ni un vol de mot de passe ni du code injecté sur le site cible : c'est ta session qui est utilisée depuis un autre site.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "page-piegee.html",
      content: `<form action="https://panel.pirate.local/virement" method="POST" id="f">
  <input type="hidden" name="vers" value="compte-attaquant">
  <input type="hidden" name="montant" value="5000">
</form>
<script>document.getElementById("f").submit();</script>`,
      question: "De quelle attaque s'agit-il ?",
      options: [
        { label: "Injection SQL", correct: false, explanation: "Aucune requête SQL n'est manipulée ici." },
        { label: "CSRF (falsification de requête intersite)", correct: true, explanation: "Une page externe fait agir ton navigateur connecté à ta place." },
        { label: "Force brute", correct: false, explanation: "Aucun mot de passe n'est deviné." },
        { label: "Phishing", correct: false, explanation: "On ne te demande aucune information : l'action se fait toute seule." },
      ],
    },
    successText: "Attaque CSRF identifiée. Le panneau a besoin de jetons anti-CSRF.",
  },
  {
    id: "difficile-14",
    name: "Les instructions aux robots",
    story: "Chaque site a souvent un fichier destiné aux moteurs de recherche. Le pirate y a listé ce qu'il ne veut pas voir indexé… donc ce qu'il cache.",
    card: {
      title: "robots.txt et reconnaissance",
      category: "Web",
      icon: "🤖",
      summary: "Un fichier public qui dit aux robots quoi ne pas visiter, et donne souvent des idées aux attaquants.",
      details: [
        "/robots.txt indique aux moteurs de recherche les pages à ne pas indexer.",
        "Il n'empêche rien : c'est une simple demande, que n'importe qui peut lire.",
        "Y lister des pages sensibles revient à les signaler. Une page privée doit être protégée par une authentification.",
      ],
      hint: "Cherche la ligne Disallow qui ressemble le plus à une page d'administration.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "https://pirate.local/robots.txt",
      content: `User-agent: *
Disallow: /tmp/
Disallow: /images/brouillons/
Disallow: /panel-admin-x9/
Disallow: /recherche?`,
      question: "Quel chemin mène sans doute au panneau d'administration ?",
      answers: ["/panel-admin-x9/", "/panel-admin-x9", "panel-admin-x9"],
      placeholder: "/chemin/",
    },
    successText: "Panneau caché trouvé. robots.txt n'est pas un coffre-fort.",
  },
  {
    id: "difficile-15",
    name: "Le dépôt public",
    story: "Le complice du pirate a publié par erreur une clé d'accès au cloud de l'entreprise sur un dépôt GitHub public. Il faut agir vite.",
    card: {
      title: "Les secrets dans le code",
      category: "Défense",
      icon: "🔓",
      summary: "Clés d'API, mots de passe, jetons : ils n'ont rien à faire dans un dépôt de code.",
      details: [
        "Des robots scannent GitHub en permanence et exploitent une clé publiée en quelques minutes.",
        "Supprimer le commit ne suffit pas : la clé reste dans l'historique et a pu être copiée.",
        "Il faut révoquer la clé immédiatement, puis stocker les secrets dans des variables d'environnement ou un coffre.",
      ],
      hint: "Ce qui est publié doit être considéré comme volé.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "git show 4f2a1c9",
      content: `+ CLOUD_ACCESS_KEY = "AKIAEXEMPLE7Q2LX9TZ"
+ CLOUD_SECRET     = "wJx9-exemple-Kp3vN8sQ1mZ"`,
      question: "Quelle est la première chose à faire ?",
      options: [
        { label: "Supprimer le commit et espérer que personne ne l'a vu", correct: false, explanation: "La clé est dans l'historique et a peut-être déjà été copiée." },
        { label: "Révoquer la clé immédiatement et en générer une nouvelle", correct: true, explanation: "Une clé publiée est compromise : il faut la rendre inutilisable." },
        { label: "Passer le dépôt en privé", correct: false, explanation: "Utile ensuite, mais la clé reste valable si elle a été copiée." },
      ],
    },
    successText: "Clé révoquée en quelques minutes. Les robots du pirate arrivent trop tard.",
  },
  {
    id: "difficile-16",
    name: "La tempête",
    story: "Le site de l'entreprise ne répond plus. Les journaux montrent un déluge de requêtes venant de partout.",
    card: {
      title: "Le déni de service (DDoS)",
      category: "Réseau",
      icon: "🌪️",
      summary: "Saturer un service avec un flot de requêtes pour le rendre indisponible.",
      details: [
        "Un DDoS utilise des milliers de machines (souvent un botnet d'appareils piratés).",
        "Le but n'est pas de voler, mais de bloquer : il touche la disponibilité.",
        "On se protège avec des services anti-DDoS, des CDN et la limitation du nombre de requêtes.",
      ],
      hint: "Beaucoup d'adresses différentes, une seule cible, un volume énorme.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "trafic web (requêtes par seconde)",
      content: `11:59  120 req/s   adresses sources : 85
12:00  98 400 req/s  adresses sources : 23 117
12:01  101 250 req/s adresses sources : 24 902
12:02  site indisponible (503)`,
      question: "Quelle attaque est en cours ?",
      options: [
        { label: "Une attaque par force brute", correct: false, explanation: "On ne cherche pas un mot de passe : on noie le serveur." },
        { label: "Un déni de service distribué (DDoS)", correct: true, explanation: "Des dizaines de milliers de sources saturent le site." },
        { label: "Une exfiltration de données", correct: false, explanation: "Le trafic entre vers le serveur, il n'en sort pas de données." },
      ],
    },
    successText: "Protection anti-DDoS activée, le site revient en ligne.",
  },
  {
    id: "difficile-17",
    name: "Le jumeau maléfique",
    story: "Au café, deux réseaux portent exactement le même nom. L'un est celui du café, l'autre a été créé par le pirate assis à côté.",
    card: {
      title: "Le point d'accès jumeau",
      category: "Réseau",
      icon: "👯",
      summary: "Un faux Wi-Fi qui copie le nom d'un vrai pour intercepter les connexions.",
      details: [
        "L'« evil twin » imite le nom d'un réseau connu, souvent sans mot de passe et avec un signal plus fort.",
        "Une fois connecté, tout ton trafic passe par la machine de l'attaquant.",
        "Méfie-toi des doublons, préfère ta 4G ou un VPN, et oublie les réseaux publics enregistrés.",
      ],
      hint: "Le vrai réseau du café a un mot de passe affiché au comptoir.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "réseaux disponibles",
      content: `Cafe_Libre   🔒 WPA2   signal ▂▄▆_
Cafe_Libre   🔓 ouvert  signal ▂▄▆█

(au comptoir : « Wi-Fi Cafe_Libre – mot de passe : croissant42 »)`,
      question: "Lequel est sans doute le faux réseau ?",
      options: [
        { label: "Celui protégé par WPA2", correct: false, explanation: "C'est celui du café : son mot de passe est affiché au comptoir." },
        { label: "Celui qui est ouvert, avec le signal le plus fort", correct: true, explanation: "Même nom, pas de mot de passe et signal plus fort : le jumeau maléfique typique." },
      ],
    },
    successText: "Faux réseau évité. Le pirate n'intercepte rien.",
  },
  {
    id: "difficile-18",
    name: "Le téléchargement",
    story: "Deux copies de l'outil de nettoyage traînent sur le serveur. Le site officiel publie l'empreinte SHA-256 du vrai fichier. L'une des copies a été modifiée.",
    card: {
      title: "Vérifier l'intégrité d'un fichier",
      category: "Crypto",
      icon: "🧪",
      summary: "Comparer l'empreinte d'un fichier avec celle publiée par l'éditeur pour détecter toute modification.",
      details: [
        "Un hash change complètement si un seul bit du fichier change.",
        "Les éditeurs publient l'empreinte SHA-256 officielle de leurs fichiers.",
        "Commande : sha256sum fichier (Linux) ou Get-FileHash (PowerShell).",
      ],
      hint: "Compare chaque empreinte calculée avec l'empreinte officielle, en entier.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "sha256sum *.exe",
      content: `Empreinte officielle publiée par l'éditeur :
6e8b39abb3a336748a7a0055b4b184571e96524f882a9407618d4bc7ab8baf64

6e8b39abb3a336748a7a0055b4b184571e96524f882a9407618d4bc7ab8baf64  nettoyeur_v2.exe
268d4e9b76e2aaf9999893e2d4c547d11bb58b6f41ea21a3a7c0cd81b8264e57  nettoyeur_v2_final.exe`,
      question: "Quel fichier a été modifié ?",
      answers: ["nettoyeur_v2_final.exe"],
    },
    successText: "Fichier piégé repéré grâce à son empreinte.",
  },
  {
    id: "difficile-19",
    name: "Les droits de trop",
    story: "Tu as un accès limité au serveur du pirate. La commande sudo -l montre ce que ton compte a le droit de lancer en root… et c'est une erreur.",
    card: {
      title: "L'élévation de privilèges",
      category: "Système",
      icon: "🪜",
      summary: "Passer d'un compte limité à administrateur en exploitant une erreur de configuration.",
      details: [
        "sudo -l liste les commandes qu'un utilisateur peut lancer en tant que root.",
        "Certains programmes (éditeurs, langages…) permettent d'ouvrir un shell : les autoriser en root, c'est donner root.",
        "Le projet GTFOBins recense ces programmes « dangereux » une fois lancés avec sudo.",
      ],
      hint: "Lequel de ces programmes permet d'ouvrir un terminal depuis l'intérieur (par exemple avec :!sh) ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "sudo -l",
      content: `L'utilisateur stagiaire peut lancer les commandes suivantes :
    (root) NOPASSWD: /usr/bin/systemctl status nginx
    (root) NOPASSWD: /usr/bin/vim
    (root) NOPASSWD: /usr/bin/df -h`,
      question: "Quel programme permet de devenir root ?",
      answers: ["vim", "/usr/bin/vim"],
    },
    successText: "Mauvaise configuration repérée : vim lancé en root ouvre un shell root.",
  },
  {
    id: "difficile-20",
    name: "L'ordinateur volé",
    story: "L'ordinateur portable de l'admin a été volé dans le train. Le voleur a démonté le disque pour le lire sur une autre machine.",
    card: {
      title: "Le chiffrement de disque",
      category: "Défense",
      icon: "💻",
      summary: "Sans la clé, un disque chiffré n'est qu'une suite de données illisibles.",
      details: [
        "BitLocker (Windows), FileVault (macOS) ou LUKS (Linux) chiffrent tout le disque.",
        "Le mot de passe de session seul ne protège pas : on peut lire le disque depuis une autre machine.",
        "Indispensable sur tout portable qui sort du bureau.",
      ],
      hint: "Le voleur contourne Windows en lisant le disque ailleurs. Qu'est-ce qui reste illisible même hors de l'ordinateur ?",
    },
    puzzle: {
      kind: "choice",
      question: "Qu'est-ce qui aurait protégé les données ?",
      options: [
        { label: "Un mot de passe de session Windows très long", correct: false, explanation: "Le voleur lit le disque sur une autre machine : la session n'est jamais ouverte." },
        { label: "Le chiffrement complet du disque (BitLocker)", correct: true, explanation: "Sans la clé, les données restent illisibles, même hors du portable." },
        { label: "Un antivirus à jour", correct: false, explanation: "L'antivirus ne protège pas contre la lecture physique du disque." },
      ],
    },
    successText: "Le disque était chiffré : le voleur n'a rien pu lire. Encore 20 salles avant la sortie du niveau !",
  },
];
