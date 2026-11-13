import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 61 à 80 du niveau Difficile. */
export const DIFFICILE_5: RoomContent[] = [
  room(
    "difficile-61",
    "Le bouton magique",
    "La box de l'entrepôt a un bouton WPS et un code PIN à 8 chiffres collé dessous. Le pirate lance un outil qui teste les PIN.",
    card("La faille du PIN WPS", "Réseau", "🔘", "Le PIN WPS se casse en quelques heures, car il est vérifié en deux moitiés.", [
      "Le PIN à 8 chiffres est vérifié par blocs de 4 puis 3 chiffres (le dernier est un contrôle).",
      "Il ne reste qu'environ 11 000 combinaisons au lieu de 100 millions.",
      "Désactive le WPS par PIN dans les réglages de la box.",
    ], "Le PIN est vérifié en deux morceaux."),
    choice("Que faut-il faire ?", [
      ["Désactiver le WPS par PIN", true, "La porte dérobée disparaît."],
      ["Changer le PIN tous les ans", false, "Il reste cassable en quelques heures."],
      ["Cacher l'autocollant", false, "Le PIN se devine sans l'autocollant."],
    ]),
    "WPS désactivé. Le Wi-Fi ne dépend plus que d'un mot de passe solide.",
  ),
  room(
    "difficile-62",
    "Les tables arc-en-ciel",
    "Le pirate a volé une base de hashs MD5 non salés. Il ne les casse pas : il les cherche dans des tables précalculées géantes.",
    card("Les tables arc-en-ciel", "Crypto", "🌈", "Des tables précalculées qui associent des millions de hashs à leur mot de passe.", [
      "Sans sel, deux personnes ayant le même mot de passe ont le même hash.",
      "Le pirate retrouve le mot de passe par simple recherche dans la table.",
      "Un sel unique par utilisateur rend ces tables inutiles.",
    ], "Qu'est-ce qui rend chaque hash unique ?"),
    choice("Qu'est-ce qui rend ces tables inutiles ?", [
      ["Ajouter un sel unique à chaque mot de passe avant le hachage", true, "Il faudrait une table par sel : impossible."],
      ["Utiliser des mots de passe en majuscules", false, "Les tables couvrent aussi les majuscules."],
      ["Stocker les hashs dans un autre fichier", false, "Ça ne change rien s'ils sont volés."],
    ]),
    "Mots de passe re-hachés avec sel. Les tables arc-en-ciel ne trouvent plus rien.",
  ),
  room(
    "difficile-63",
    "Le hachage trop rapide",
    "La carte graphique du pirate calcule 50 milliards de hashs SHA-256 par seconde. Les mots de passe du site sont hachés en SHA-256 salé.",
    card("Les hachages lents", "Crypto", "🐢", "Pour les mots de passe, on veut un hachage volontairement lent.", [
      "SHA-256 est conçu pour être rapide : parfait pour vérifier des fichiers, mauvais pour des mots de passe.",
      "bcrypt, scrypt et Argon2 sont lents et réglables (facteur de coût).",
      "Pour un utilisateur, 100 ms ne se voient pas ; pour un pirate, c'est des milliards de fois plus lent.",
    ], "Quel algorithme est conçu pour les mots de passe ?"),
    choice("Quel algorithme choisir pour stocker des mots de passe ?", [
      ["SHA-256", false, "Trop rapide : idéal pour l'attaquant."],
      ["Argon2 (ou bcrypt)", true, "Lent et réglable, conçu pour les mots de passe."],
      ["MD5", false, "Cassé et ultra-rapide."],
    ]),
    "Migration vers Argon2. La carte graphique du pirate tourne dans le vide.",
  ),
  room(
    "difficile-64",
    "Deux clés pour une serrure",
    "Pour recevoir des messages secrets, la journaliste publie une clé sur son site. Elle garde l'autre précieusement.",
    card("Le chiffrement asymétrique", "Crypto", "🔐", "Une clé publique pour chiffrer, une clé privée pour déchiffrer.", [
      "Tout le monde peut chiffrer avec la clé publique.",
      "Seule la clé privée permet de déchiffrer.",
      "RSA et les courbes elliptiques sont les algorithmes les plus courants.",
    ], "Quelle clé peut-on publier ?"),
    choice("Avec quelle clé un informateur chiffre-t-il son message ?", [
      ["La clé publique de la journaliste", true, "Seule sa clé privée pourra le déchiffrer."],
      ["La clé privée de la journaliste", false, "Elle ne la partage jamais."],
      ["Sa propre clé privée", false, "Ça servirait à signer, pas à chiffrer pour elle."],
    ]),
    "Message chiffré avec la clé publique. Seule la journaliste peut le lire.",
  ),
  room(
    "difficile-65",
    "Le sceau numérique",
    "Une mise à jour arrive avec un fichier .sig. Le système vérifie qu'elle vient bien de l'éditeur et qu'elle n'a pas été modifiée.",
    card("La signature numérique", "Crypto", "✒️", "Signer avec sa clé privée, vérifier avec la clé publique.", [
      "L'éditeur calcule le hash du fichier et le chiffre avec sa clé privée : c'est la signature.",
      "N'importe qui vérifie avec la clé publique de l'éditeur.",
      "Elle prouve l'origine et l'intégrité, mais ne cache pas le contenu.",
    ], "Quelle clé sert à signer ?"),
    multi("Que garantit une signature valide ?", [
      ["Le fichier vient bien du détenteur de la clé privée", true, "C'est l'authenticité."],
      ["Le fichier n'a pas été modifié", true, "C'est l'intégrité."],
      ["Le contenu du fichier est secret", false, "Une signature ne chiffre pas le contenu."],
      ["Le fichier est forcément sans bug", false, "Signé ne veut pas dire parfait."],
    ]),
    "Signature vérifiée. La mise à jour est authentique.",
  ),
  room(
    "difficile-66",
    "Le certificat fait maison",
    "Le serveur interne utilise un certificat signé par… lui-même. Les employés ont pris l'habitude de cliquer sur « Continuer ».",
    card("Les certificats auto-signés", "Crypto", "🪪", "Un certificat que personne de confiance n'a vérifié.", [
      "Le navigateur ne peut pas savoir si le certificat est le vrai ou celui d'un pirate.",
      "Habituer les gens à ignorer l'alerte rend les attaques par interception invisibles.",
      "Pour l'interne, on crée une autorité de certification d'entreprise déployée sur les postes.",
    ], "Qui garantit l'identité du serveur ?"),
    choice("Quel est le vrai danger ?", [
      ["Les employés ignoreront aussi l'alerte lors d'une vraie attaque", true, "Un pirate pourra intercepter sans être remarqué."],
      ["Le site sera plus lent", false, "Ce n'est pas le problème."],
      ["Aucun, c'est un site interne", false, "Les attaques internes existent aussi."],
    ]),
    "Autorité de certification interne déployée. Plus aucune alerte à ignorer.",
  ),
  room(
    "difficile-67",
    "Le pingouin visible",
    "Une image chiffrée en AES mode ECB laisse encore deviner la silhouette du logo d'origine.",
    card("Le mode ECB", "Crypto", "🐧", "En ECB, deux blocs identiques donnent deux blocs chiffrés identiques.", [
      "Les motifs répétés de l'original restent visibles dans le chiffré.",
      "Les modes CBC, CTR ou GCM mélangent chaque bloc avec un vecteur ou un compteur.",
      "GCM ajoute en plus une vérification d'intégrité.",
    ], "Que deviennent deux blocs identiques en ECB ?"),
    choice("Pourquoi voit-on encore le logo ?", [
      ["En ECB, des blocs identiques restent identiques une fois chiffrés", true, "Les zones de même couleur forment encore le dessin."],
      ["AES est cassé", false, "AES est solide, c'est le mode d'utilisation qui est mauvais."],
      ["L'image n'a pas été chiffrée", false, "Elle l'a été, mais en mode ECB."],
    ]),
    "Chiffrement refait en AES-GCM. Le logo a disparu dans le bruit.",
  ),
  room(
    "difficile-68",
    "Les droits sudo",
    "Connecté en simple utilisateur, le pirate tape « sudo -l ». Réponse : (root) NOPASSWD: /usr/bin/find.",
    card("Les abus de sudo", "Système", "🪜", "Un programme autorisé en sudo peut parfois lancer un shell root.", [
      "sudo -l liste les commandes qu'on peut lancer en root.",
      "find, vim, less ou tar peuvent exécuter d'autres commandes : ils deviennent une porte vers root.",
      "Le site GTFOBins recense ces détournements ; n'autorise en sudo que le strict nécessaire.",
    ], "find peut-il exécuter une commande ?"),
    choice("Que peut faire le pirate ?", [
      ["Lancer un shell root via find -exec", true, "find peut exécuter n'importe quelle commande en root."],
      ["Seulement chercher des fichiers", false, "find peut aussi exécuter des commandes."],
      ["Rien sans mot de passe", false, "NOPASSWD : aucun mot de passe n'est demandé."],
    ]),
    "Règle sudo supprimée. L'escalier vers root est démonté.",
  ),
  room(
    "difficile-69",
    "Le bit spécial",
    "Le pirate liste les fichiers : -rwsr-xr-x root root /usr/local/bin/sauvegarde. Il remarque le « s ».",
    card("Le bit SUID", "Système", "🅂", "Un programme SUID s'exécute avec les droits de son propriétaire, souvent root.", [
      "Le « s » à la place du « x » du propriétaire indique le bit SUID.",
      "Un programme SUID mal écrit permet de devenir root.",
      "find / -perm -4000 liste les fichiers SUID : à auditer régulièrement.",
    ], "Avec quels droits ce programme s'exécute-t-il ?"),
    choice("Que signifie ce « s » ?", [
      ["Le programme s'exécute avec les droits de root", true, "Toute faille dedans devient une faille root."],
      ["Le fichier est sauvegardé", false, "Le « s » ne veut pas dire sauvegarde."],
      ["Le fichier est secret", false, "Il est lisible et exécutable par tous."],
    ]),
    "Bit SUID retiré du script de sauvegarde. Une porte de moins vers root.",
  ),
  room(
    "difficile-70",
    "L'historique trop fidèle",
    "Dans le dossier de l'admin, le pirate ouvre le fichier caché .bash_history.",
    card("L'historique des commandes", "Système", "📜", "Le shell garde les dernières commandes tapées, y compris les mots de passe en clair.", [
      "Taper un mot de passe dans une commande le laisse dans ~/.bash_history.",
      "Utilise des fichiers de configuration protégés ou des variables d'environnement.",
      "Une commande précédée d'un espace n'est pas enregistrée (si HISTCONTROL=ignorespace).",
    ], "Cherche ce qui suit -p."),
    answer("Quel mot de passe l'admin a-t-il laissé dans son historique ?", ["Bdd!2026prod"], {
      content: "cd /var/www\nls -la\nmysql -u root -pBdd!2026prod\nsystemctl restart nginx\nexit",
      contentLabel: "/home/admin/.bash_history",
      strict: true,
      placeholder: "Le mot de passe exact",
    }),
    "Mot de passe changé et historique nettoyé. L'admin utilise maintenant un fichier protégé.",
  ),
  room(
    "difficile-71",
    "Le fichier des empreintes",
    "Sous Linux, /etc/passwd est lisible par tous. Le pirate y cherche les mots de passe… mais ils n'y sont pas.",
    card("/etc/shadow", "Système", "🌑", "Les hashs des mots de passe Linux sont dans /etc/shadow, lisible seulement par root.", [
      "/etc/passwd liste les comptes ; le « x » indique que le hash est dans /etc/shadow.",
      "Une ligne de shadow ressemble à : $6$sel$hash (6 = SHA-512 crypt, y = yescrypt).",
      "Si /etc/shadow devient lisible, tous les hashs peuvent être attaqués hors ligne.",
    ], "Un fichier dont le nom évoque l'ombre."),
    answer("Dans quel fichier sont stockés les hashs des mots de passe Linux ?", ["/etc/shadow", "etc/shadow", "shadow"], { placeholder: "Chemin du fichier" }),
    "Droits de /etc/shadow vérifiés : 640, propriétaire root. Parfait.",
  ),
  room(
    "difficile-72",
    "La clé laissée ouverte",
    "La clé privée SSH de l'admin a les droits -rw-r--r-- (644). N'importe quel utilisateur du serveur peut la lire.",
    card("Protéger sa clé privée", "Système", "🔓", "Une clé privée lisible par d'autres n'est plus privée.", [
      "Les droits doivent être 600 : lecture et écriture pour le propriétaire seulement.",
      "SSH refuse d'ailleurs d'utiliser une clé trop ouverte (« UNPROTECTED PRIVATE KEY FILE »).",
      "Protège-la aussi avec une phrase de passe.",
    ], "Seul le propriétaire doit lire."),
    choice("Quels droits faut-il appliquer ?", [
      ["chmod 600", true, "Seul le propriétaire peut lire et écrire."],
      ["chmod 777", false, "Tout le monde aurait tous les droits !"],
      ["chmod 644", false, "C'est le réglage actuel, lisible par tous."],
    ]),
    "chmod 600 appliqué. La clé redevient privée.",
  ),
  room(
    "difficile-73",
    "Le chemin sans guillemets",
    "Un service Windows tourne en SYSTEM avec le chemin C:\\Program Files\\Outil Sauvegarde\\svc.exe, sans guillemets.",
    card("Les chemins de service sans guillemets", "Système", "🛣️", "Un chemin avec des espaces et sans guillemets peut lancer un autre programme.", [
      "Windows essaie d'abord C:\\Program.exe, puis C:\\Program Files\\Outil.exe…",
      "Si le pirate peut écrire un de ces fichiers, son programme s'exécute en SYSTEM.",
      "Corriger : mettre le chemin entre guillemets et protéger les dossiers en écriture.",
    ], "Que fait Windows quand il rencontre un espace ?"),
    choice("Quel fichier le pirate pourrait-il déposer pour être exécuté ?", [
      ["C:\\Program Files\\Outil.exe", true, "Windows le testerait avant le vrai programme."],
      ["C:\\svc.exe", false, "Ce chemin n'est jamais essayé."],
      ["C:\\Program Files\\Outil Sauvegarde\\svc.txt", false, "Un .txt ne s'exécute pas."],
    ]),
    "Chemin mis entre guillemets. Le service lance bien le bon programme.",
  ),
  room(
    "difficile-74",
    "La politique contournée",
    "La politique d'exécution PowerShell est « Restricted ». Le pirate tape : powershell -ExecutionPolicy Bypass -File outil.ps1. Ça marche.",
    card("La politique d'exécution PowerShell", "Système", "🚧", "Elle évite les erreurs, mais ce n'est pas une barrière de sécurité.", [
      "Microsoft le dit lui-même : elle ne protège pas contre un attaquant.",
      "N'importe quel utilisateur peut la contourner pour son propre processus.",
      "Les vraies protections : AppLocker/WDAC, journalisation PowerShell, AMSI, EDR.",
    ], "Est-ce une vraie barrière de sécurité ?"),
    choice("Que retenir ?", [
      ["La politique d'exécution n'est pas une protection de sécurité", true, "Il faut des contrôles comme AppLocker/WDAC et la journalisation."],
      ["Restricted bloque tous les attaquants", false, "La démonstration prouve le contraire."],
      ["Il faut désinstaller PowerShell", false, "Il est indispensable ; il faut l'encadrer."],
    ]),
    "WDAC et journalisation PowerShell activés. Le contournement ne suffit plus.",
  ),
  room(
    "difficile-75",
    "Les identifiants recyclés",
    "Le site de réservation reçoit 200 000 tentatives de connexion en une nuit, chacune avec un couple e-mail/mot de passe différent issu de fuites.",
    card("Le credential stuffing", "Mots de passe", "🧃", "Tester en masse des identifiants volés ailleurs, en pariant sur la réutilisation.", [
      "Chaque couple vient d'une fuite d'un autre site.",
      "Différent du password spraying (un mot de passe, beaucoup de comptes).",
      "Parades : double authentification, détection des mots de passe ayant fuité, limitation et CAPTCHA.",
    ], "D'où viennent les couples testés ?"),
    multi("Quelles protections sont efficaces ?", [
      ["La double authentification", true, "Le mot de passe seul ne suffit plus."],
      ["Refuser les mots de passe présents dans des fuites connues", true, "Les couples volés ne marchent plus."],
      ["Limiter les tentatives et détecter les pics", true, "L'attaque est ralentie et repérée."],
      ["Imposer un changement de mot de passe tous les 30 jours", false, "Peu efficace et pousse à des mots de passe faibles."],
    ]),
    "Attaque bloquée. Les comptes protégés par double authentification ont tenu.",
  ),
  room(
    "difficile-76",
    "Le point d'eau",
    "Les pirates n'attaquent pas directement la banque : ils piègent le site d'une association que tous les banquiers visitent.",
    card("L'attaque du point d'eau", "Social", "💧", "Piéger un site fréquenté par les cibles, comme un prédateur attend au point d'eau.", [
      "Le site légitime est compromis et distribue un malware aux visiteurs.",
      "Les attaquants peuvent filtrer pour ne viser que les visiteurs d'une entreprise précise.",
      "Navigateur à jour, isolation et EDR limitent les dégâts.",
    ], "Où attend le prédateur ?"),
    choice("Comment s'appelle cette technique ?", [
      ["L'attaque du point d'eau (watering hole)", true, "On piège le lieu où vont les cibles."],
      ["Le phishing", false, "Ici, aucun mail n'est envoyé à la victime."],
      ["Le déni de service", false, "Le but est d'infecter, pas de bloquer."],
    ]),
    "Le site de l'association est nettoyé, les postes infectés isolés.",
  ),
  room(
    "difficile-77",
    "Le paquet presque identique",
    "Un développeur tape npm install reqeusts au lieu de requests. Le paquet existe… et envoie les variables d'environnement à un inconnu.",
    card("Le typosquatting de paquets", "Système", "📦", "Des paquets malveillants portent des noms proches des paquets populaires.", [
      "Une faute de frappe suffit à installer le paquet piégé.",
      "Il vole souvent les secrets (clés d'API, jetons) présents sur la machine.",
      "Vérifie le nom, le nombre de téléchargements et l'éditeur ; utilise un fichier de dépendances verrouillé.",
    ], "Relis le nom du paquet."),
    choice("Que s'est-il passé ?", [
      ["Un paquet au nom proche d'un paquet connu a été installé", true, "C'est du typosquatting."],
      ["Le paquet officiel a été mis à jour", false, "Ce n'est pas le bon paquet."],
      ["npm est en panne", false, "npm a fait exactement ce qui était demandé."],
    ]),
    "Paquet supprimé, secrets changés. Le nom exact est désormais verrouillé.",
  ),
  room(
    "difficile-78",
    "La bibliothèque périmée",
    "L'outil d'analyse signale : « log4j-core 2.14.1 — vulnérabilité critique connue ». Personne ne savait que le projet l'utilisait.",
    card("Les dépendances vulnérables", "Système", "🧱", "Ton code est sûr ? Les bibliothèques que tu utilises, peut-être pas.", [
      "Un projet moderne dépend de centaines de bibliothèques, souvent indirectement.",
      "Les outils d'analyse de composition (SCA) et Dependabot signalent les versions vulnérables.",
      "Un inventaire des composants (SBOM) permet de savoir où une faille te touche.",
    ], "Quel outil du dépôt propose déjà les mises à jour ?"),
    multi("Quelles bonnes pratiques adopter ?", [
      ["Analyser automatiquement les dépendances (SCA, Dependabot)", true, "Les versions vulnérables sont signalées."],
      ["Tenir un inventaire des composants (SBOM)", true, "On sait vite si une faille nous concerne."],
      ["Mettre à jour régulièrement les dépendances", true, "Moins de retard, moins de failles."],
      ["Ne jamais mettre à jour pour éviter les bugs", false, "Les failles connues s'accumulent."],
    ]),
    "Dépendance mise à jour et analyse automatique activée.",
  ),
  room(
    "difficile-79",
    "L'image Docker bavarde",
    "L'image Docker publique de l'entreprise contient une couche avec un fichier .env, supprimé dans la couche suivante.",
    card("Les secrets dans les images", "Système", "🐳", "Supprimer un fichier dans une couche Docker ne l'efface pas des couches précédentes.", [
      "Chaque instruction d'un Dockerfile crée une couche, et toutes sont téléchargées.",
      "docker history ou l'extraction des couches révèle le fichier « supprimé ».",
      "Passe les secrets à l'exécution (variables, gestionnaire de secrets), jamais dans l'image.",
    ], "Une couche Docker peut-elle être modifiée après coup ?"),
    choice("Le fichier .env est-il récupérable ?", [
      ["Oui, il reste dans la couche précédente de l'image", true, "Il suffit d'extraire les couches."],
      ["Non, il a été supprimé", false, "Il est seulement masqué dans la couche suivante."],
      ["Seulement par Docker Inc.", false, "N'importe qui ayant l'image peut le lire."],
    ]),
    "Image reconstruite sans secret, clés changées. La fuite est refermée.",
  ),
  room(
    "difficile-80",
    "La clé dans le JavaScript",
    "En lisant le fichier app.js du site, le pirate trouve : const STRIPE_SECRET = \"sk_live_51H…\".",
    card("Les secrets côté navigateur", "Web", "🗝️", "Tout ce qui est envoyé au navigateur est lisible par le visiteur.", [
      "Le code JavaScript du site est téléchargé et lisible par tous (F12).",
      "Seules les clés publiques (publishable) peuvent y figurer.",
      "Les clés secrètes restent sur le serveur ; si l'une fuit, il faut la révoquer tout de suite.",
    ], "Qui peut lire le code JavaScript d'un site ?"),
    order("Remets la réponse à l'incident dans l'ordre.", [
      "Révoquer immédiatement la clé exposée",
      "Créer une nouvelle clé et la stocker côté serveur uniquement",
      "Déployer le site corrigé, qui passe par le serveur",
      "Ajouter une détection de secrets dans le pipeline de code",
    ]),
    "Clé révoquée, nouvelle clé côté serveur, détection automatique en place.",
  ),
];
