import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 81 à 100 du niveau Moyen. */
export const MOYEN_6: RoomContent[] = [
  room(
    "moyen-81",
    "L'aiguille dans la botte de foin",
    "Le journal fait 2 millions de lignes. Tu dois trouver toutes celles qui contiennent l'adresse IP du pirate, 45.155.205.9.",
    card("La commande grep", "Système", "🔎", "grep affiche les lignes d'un fichier qui contiennent un motif.", [
      "grep \"45.155.205.9\" access.log affiche toutes les lignes contenant cette IP.",
      "-i ignore la casse, -c compte les lignes, -v inverse la recherche.",
      "On l'enchaîne avec d'autres commandes : grep … | wc -l.",
    ], "Une commande Linux de quatre lettres."),
    answer("Quelle commande Linux sert à chercher un motif dans un fichier ?", ["grep"], { placeholder: "La commande" }),
    "grep a trouvé 1 432 lignes. La trace du pirate est complète.",
  ),
  room(
    "moyen-82",
    "Le motif qui attrape tout",
    "Tu veux repérer toutes les adresses e-mail d'un document, quelle que soit leur forme. Un collègue te parle d'un langage de motifs.",
    card("Les expressions régulières", "Système", "🧵", "Un mini-langage pour décrire des motifs de texte.", [
      "\\d = un chiffre, + = « une ou plusieurs fois », . = n'importe quel caractère.",
      "^ = début de ligne, $ = fin de ligne.",
      "Exemple : ^\\d{3}$ correspond à exactement trois chiffres.",
    ], "\\d{4} = quatre chiffres."),
    choice("Quelle chaîne correspond au motif ^\\d{4}$ ?", [
      ["2026", true, "Exactement quatre chiffres, du début à la fin."],
      ["20261", false, "Cinq chiffres : trop long."],
      ["an 2026", false, "Le texte « an » empêche la correspondance dès le début."],
    ]),
    "Motif maîtrisé. Les adresses ressortent toutes seules.",
  ),
  room(
    "moyen-83",
    "Remonter d'un cran",
    "Le pirate est dans /var/www/site/images. Il tape « cd ../../ ». Où arrive-t-il ?",
    card("Les chemins de fichiers", "Système", "📂", "« .. » désigne le dossier parent, « . » le dossier courant.", [
      "Un chemin absolu part de la racine : /var/www/site.",
      "Un chemin relatif part du dossier courant : ../config.",
      "Les attaques par traversée de répertoire abusent des « ../ » pour sortir du dossier autorisé.",
    ], "Chaque « .. » remonte d'un dossier."),
    choice("Où arrive le pirate ?", [
      ["/var/www", true, "images → site → www."],
      ["/var/www/site", false, "Il est remonté de deux niveaux, pas d'un seul."],
      ["/", false, "Il faudrait remonter encore deux fois."],
    ]),
    "Bien suivi. Le serveur bloque désormais les « ../ » dans les URL.",
  ),
  room(
    "moyen-84",
    "Les fichiers qui se cachent",
    "La commande ls ne montre rien de suspect dans le dossier personnel. Avec ls -a, apparaît un fichier « .ssh_keys_backup ».",
    card("Les fichiers cachés", "Système", "👻", "Sous Linux, un fichier dont le nom commence par un point est caché.", [
      "ls -a affiche aussi les fichiers cachés.",
      "On y trouve des configurations (.bashrc, .ssh)… et parfois des outils de pirates.",
      "Sous Windows, l'attribut « caché » joue le même rôle.",
    ], "Par quel caractère commence le nom ?"),
    choice("Pourquoi le fichier n'apparaissait-il pas ?", [
      ["Son nom commence par un point", true, "Il n'apparaît qu'avec ls -a."],
      ["Il était chiffré", false, "Un fichier chiffré apparaît quand même."],
      ["Il était trop gros", false, "La taille n'a aucun rapport."],
    ]),
    "Fichier caché analysé : une copie de clés volées. Supprimée !",
  ),
  room(
    "moyen-85",
    "Le PC qui chauffe",
    "Le poste de l'accueil est très lent, le ventilateur hurle. Le gestionnaire des tâches montre « svch0st.exe » à 98 % de processeur.",
    card("Le cryptominage", "Système", "⛏️", "Un malware qui utilise ta machine pour miner de la cryptomonnaie.", [
      "Signes : processeur au maximum, machine lente et bruyante, facture d'électricité.",
      "Le nom imite souvent un processus Windows légitime (svch0st au lieu de svchost).",
      "Il peut arriver par un logiciel piraté ou une faille sur un serveur.",
    ], "Regarde bien l'orthographe du processus."),
    multi("Quels indices pointent vers un mineur caché ?", [
      ["Processeur à 98 % sans raison", true, "Le minage consomme énormément de calcul."],
      ["Le nom svch0st.exe avec un zéro", true, "Il imite svchost.exe."],
      ["Le ventilateur qui hurle", true, "Conséquence directe du calcul intensif."],
      ["L'horloge affiche la bonne heure", false, "Aucun rapport."],
    ]),
    "Mineur supprimé. Le PC retrouve son calme.",
  ),
  room(
    "moyen-86",
    "L'armée de zombies",
    "Des milliers de caméras connectées dans le monde envoient en même temps des requêtes vers le site de l'entreprise.",
    card("Le botnet", "Réseau", "🧟", "Un réseau d'appareils infectés contrôlés à distance par un pirate.", [
      "Les appareils (PC, caméras, routeurs) sont infectés à l'insu de leurs propriétaires.",
      "Le pirate les commande depuis un serveur de contrôle (C2).",
      "Ils servent aux attaques par déni de service, au spam, au cassage de mots de passe.",
    ], "Un réseau de « robots »."),
    answer("Comment appelle-t-on ce réseau d'appareils infectés ?", ["botnet", "un botnet", "reseau de zombies"], { placeholder: "Un mot anglais" }),
    "Attaque absorbée par la protection anti-DDoS. Le botnet a échoué.",
  ),
  room(
    "moyen-87",
    "L'adresse d'un jour",
    "Pour télécharger un livre blanc, un site exige ton adresse mail. Tu ne veux pas recevoir de spam toute ta vie.",
    card("Les adresses e-mail jetables et alias", "Défense", "📧", "Une adresse alternative protège ta vraie boîte.", [
      "Les adresses jetables durent quelques minutes ou quelques jours.",
      "Les alias (ex. prenom+site@…) permettent de savoir qui a revendu ton adresse.",
      "Certains services créent des alias qui transfèrent vers ta vraie boîte.",
    ], "Une adresse qu'on peut jeter après usage."),
    choice("Quelle solution protège ta boîte principale ?", [
      ["Utiliser un alias ou une adresse jetable", true, "Ta vraie adresse reste à l'abri du spam."],
      ["Donner l'adresse de ton chef", false, "Pas très sympa… ni sûr."],
      ["Donner ta vraie adresse et espérer", false, "Elle risque d'être revendue."],
    ]),
    "Alias utilisé. Quand le spam arrive, tu sais qui a revendu ton adresse.",
  ),
  room(
    "moyen-88",
    "L'auteur oublié",
    "Le pirate publie un faux communiqué au format Word. Les propriétés du fichier indiquent : Auteur « j.moreau », Société « Concurrent SA ».",
    card("Les métadonnées des documents", "Système", "🧾", "Un document Office ou PDF garde l'auteur, l'entreprise, les dates et parfois l'historique.", [
      "Fichier → Informations : on y voit l'auteur, la société, les dates de création et de modification.",
      "Les commentaires et modifications suivies peuvent aussi rester cachés dans le fichier.",
      "Utilise « Inspecter le document » pour nettoyer avant de publier.",
    ], "Regarde les propriétés du fichier."),
    choice("Qu'apprends-tu grâce aux métadonnées ?", [
      ["Le document a été créé par un employé d'une autre société", true, "L'auteur et la société trahissent l'origine du faux."],
      ["Le document est authentique", false, "Les métadonnées pointent l'inverse."],
      ["Rien, les métadonnées sont toujours vides", false, "Elles sont remplies automatiquement."],
    ]),
    "Le faux communiqué est démasqué par ses propres métadonnées.",
  ),
  room(
    "moyen-89",
    "Le code de la porte",
    "La porte de la salle serveur a un clavier à 4 chiffres. Le pirate commence par 1234, puis 0000, puis 1111.",
    card("Les codes PIN prévisibles", "Mots de passe", "🔢", "Une poignée de codes représente une grosse part des codes choisis.", [
      "1234, 0000, 1111, 1212, 7777 et les années de naissance sont les plus courants.",
      "Un code à 4 chiffres n'offre que 10 000 possibilités.",
      "Les touches usées du clavier trahissent aussi les chiffres utilisés.",
    ], "Combien de combinaisons pour 4 chiffres ?"),
    answer("Combien de codes différents existent avec 4 chiffres (0 à 9) ?", ["10000", "10 000", "dix mille"], { placeholder: "Un nombre" }),
    "Code changé pour un code aléatoire, clavier remplacé. 1234 ne passe plus.",
  ),
  room(
    "moyen-90",
    "Le lien magique",
    "Pour se connecter, le site ne demande pas de mot de passe : il envoie un lien à usage unique par mail.",
    card("La connexion par lien magique", "Mots de passe", "✨", "Un lien temporaire envoyé par mail remplace le mot de passe.", [
      "Plus de mot de passe à retenir ou à voler.",
      "Mais la sécurité repose alors entièrement sur ta boîte mail.",
      "Le lien doit expirer vite et ne servir qu'une fois.",
    ], "De quoi dépend toute la sécurité ici ?"),
    choice("Quel est le point faible de cette méthode ?", [
      ["Quiconque accède à ta boîte mail accède au compte", true, "La boîte mail devient la clé unique."],
      ["Il faut retenir un mot de passe compliqué", false, "Justement, il n'y en a plus."],
      ["Le lien fonctionne indéfiniment", false, "Un bon lien magique expire vite."],
    ]),
    "Boîte mail protégée par une passkey : la clé du compte est en sécurité.",
  ),
  room(
    "moyen-91",
    "Se connecter avec…",
    "Le site propose « Se connecter avec Google ». Le stagiaire se demande si le site va connaître son mot de passe Google.",
    card("La connexion unique (SSO)", "Mots de passe", "🔑", "Un seul compte pour se connecter à plusieurs services, sans leur donner ton mot de passe.", [
      "Le site te redirige vers Google, qui confirme ton identité et transmet un jeton.",
      "Le site ne voit jamais ton mot de passe Google.",
      "Vérifie les autorisations demandées (accès à tes contacts, à tes fichiers…).",
    ], "Qui voit le mot de passe ?"),
    choice("Le site connaît-il ton mot de passe Google ?", [
      ["Non, seul Google le voit ; le site reçoit un jeton", true, "C'est le principe de l'authentification déléguée."],
      ["Oui, il le reçoit en clair", false, "Ce serait une faille grave."],
      ["Oui, mais chiffré", false, "Il ne le reçoit pas du tout."],
    ]),
    "Connexion par SSO, autorisations minimales. Propre.",
  ),
  room(
    "moyen-92",
    "La clé du serveur",
    "Pour se connecter en SSH au serveur, l'admin n'utilise pas de mot de passe mais une paire de fichiers : id_ed25519 et id_ed25519.pub.",
    card("Les clés SSH", "Crypto", "🗝️", "Une clé privée gardée secrète, une clé publique déposée sur le serveur.", [
      "La clé publique (.pub) se dépose dans ~/.ssh/authorized_keys du serveur.",
      "La clé privée ne quitte jamais ton poste, idéalement protégée par une phrase de passe.",
      "Bien plus résistant à la force brute qu'un mot de passe.",
    ], "Laquelle peut-on partager ?"),
    choice("Quel fichier peut être copié sur le serveur ?", [
      ["id_ed25519.pub (la clé publique)", true, "Elle est faite pour être partagée."],
      ["id_ed25519 (la clé privée)", false, "Elle ne doit jamais quitter ton poste."],
      ["Les deux", false, "La clé privée doit rester secrète."],
    ]),
    "Clé publique déposée. Les mots de passe SSH sont désactivés.",
  ),
  room(
    "moyen-93",
    "Le bureau à distance exposé",
    "Un scan révèle que le serveur Windows de l'entreprise a le port 3389 ouvert sur Internet.",
    card("RDP exposé sur Internet", "Réseau", "🖥️", "Le bureau à distance ouvert à tous est une des premières portes des rançongiciels.", [
      "RDP (port 3389) permet de prendre le contrôle d'un PC Windows à distance.",
      "Exposé sur Internet, il subit des attaques par force brute en continu.",
      "Passe par un VPN avec double authentification, ou ferme-le.",
    ], "Port 3389 : quel service ?"),
    choice("Que faire ?", [
      ["Fermer le port et passer par un VPN avec double authentification", true, "Le service n'est plus visible depuis Internet."],
      ["Changer le fond d'écran du serveur", false, "Aucun rapport."],
      ["Laisser ouvert, le mot de passe est long", false, "Une seule fuite de mot de passe suffit."],
    ]),
    "Port 3389 fermé. Le serveur disparaît des radars des pirates.",
  ),
  room(
    "moyen-94",
    "Le dossier partagé",
    "Sur le réseau, le dossier \\\\SERVEUR\\Partage est accessible en lecture et écriture par « Tout le monde ».",
    card("Les partages réseau", "Réseau", "🗄️", "Un dossier partagé trop ouvert permet à un rançongiciel de tout chiffrer.", [
      "Les partages Windows utilisent le protocole SMB (port 445).",
      "Donne les droits par groupe de personnes, et en lecture seule quand c'est possible.",
      "Un poste infecté chiffre tous les partages sur lesquels il peut écrire.",
    ], "Qui devrait avoir accès ?"),
    choice("Quel réglage est le plus sûr ?", [
      ["Droits limités au groupe concerné, lecture seule si possible", true, "Moins de personnes, moins de dégâts possibles."],
      ["Tout le monde en contrôle total", false, "C'est le pire réglage."],
      ["Renommer le dossier", false, "Les droits restent les mêmes."],
    ]),
    "Droits revus. Le rançongiciel ne pourra plus tout chiffrer.",
  ),
  room(
    "moyen-95",
    "Encodé deux fois",
    "Dans le journal du serveur, une requête bizarre : /page?user=%2561%2564%256d%2569%256e. Le pirate a tenté de passer sous le filtre.",
    card("Le double encodage URL", "Web", "🎭", "Encoder deux fois un texte pour tromper un filtre qui ne décode qu'une fois.", [
      "%25 est l'encodage du caractère « % » lui-même.",
      "Une première passe donne %61%64… ; une seconde donne le texte final.",
      "Les filtres doivent décoder complètement avant de vérifier.",
    ], "Décode l'URL… puis décode encore."),
    answer("Quel nom d'utilisateur se cache après décodage complet ?", ["admin"], {
      tools: ["url", "hex", "base64"],
      workshopInput: "%2561%2564%256d%2569%256e",
      placeholder: "Le mot",
    }),
    "admin ! Le filtre décode maintenant complètement avant de vérifier.",
  ),
  room(
    "moyen-96",
    "Le message à l'envers",
    "Une lampe clignote derrière la vitre : un message en morse. Mais le pirate a eu une idée sournoise.",
    card("Combiner les encodages", "Crypto", "🔄", "Plusieurs transformations simples enchaînées restent simples à défaire.", [
      "Il suffit de défaire les étapes dans l'ordre inverse.",
      "Ici : décode le morse, puis regarde bien le résultat.",
      "Empiler des encodages ne remplace jamais un vrai chiffrement.",
    ], "Le résultat du morse se lit… à l'envers."),
    answer("Quel mot est caché ?", ["firewall"], {
      tools: ["morse", "reverse", "rot13"],
      workshopInput: ".-.. .-.. .- .-- . .-. .. ..-.",
      placeholder: "Le mot",
    }),
    "FIREWALL : le mot de passe de la salle suivante.",
  ),
  room(
    "moyen-97",
    "Le damier de Polybe",
    "Sur le mur, une grille 5×5 et des paires de chiffres : 35 11 43 43. Chaque paire indique une ligne puis une colonne.",
    card("Le carré de Polybe", "Crypto", "▦", "Chaque lettre est remplacée par ses coordonnées dans une grille 5×5.", [
      "Ligne 1 : A B C D E ; ligne 2 : F G H I/J K ; ligne 3 : L M N O P ; ligne 4 : Q R S T U ; ligne 5 : V W X Y Z.",
      "11 = A, 15 = E, 35 = P, 43 = S.",
      "Un chiffrement très ancien, cassé par analyse de fréquence.",
    ], "35 = ligne 3, colonne 5."),
    answer("Quel mot donnent les coordonnées 35 11 43 43 ?", ["pass"], {
      content: "    1 2 3 4 5\n1   A B C D E\n2   F G H I K\n3   L M N O P\n4   Q R S T U\n5   V W X Y Z\n\n35 11 43 43",
      contentLabel: "Grille de Polybe (I et J partagent la même case)",
      placeholder: "Le mot",
    }),
    "PASS. Les Grecs avaient déjà des mots de passe.",
  ),
  room(
    "moyen-98",
    "Les majuscules et le 7",
    "Une chaîne étrange : « MZXW6YTBOI====== ». Que des majuscules, des chiffres de 2 à 7, et des « = » à la fin.",
    card("Base32", "Crypto", "🔠", "Un encodage qui n'utilise que les lettres A–Z et les chiffres 2 à 7.", [
      "Base32 évite les caractères ambigus : pas de 0, 1, 8, 9.",
      "On le reconnaît à ses majuscules et à son remplissage par des « = ».",
      "Il sert souvent pour les secrets des applis de double authentification (TOTP).",
    ], "Majuscules + chiffres 2 à 7 + « = »."),
    choice("Quel encodage reconnais-tu ?", [
      ["Base32", true, "Lettres majuscules, chiffres 2 à 7 et remplissage « = »."],
      ["Hexadécimal", false, "L'hexa n'utilise que 0-9 et A-F."],
      ["Binaire", false, "Seulement des 0 et des 1."],
    ]),
    "Base32 reconnu : c'était le secret TOTP d'un compte de test.",
  ),
  room(
    "moyen-99",
    "Le relevé des ports",
    "Le pirate a scanné le serveur. Associe chaque numéro de port à son service, du plus petit au plus grand.",
    card("Les ports courants", "Réseau", "🔌", "Certains numéros de port sont associés à des services bien connus.", [
      "22 : SSH, 25 : SMTP (mail), 53 : DNS, 80 : HTTP, 443 : HTTPS.",
      "445 : partages Windows (SMB), 3389 : bureau à distance (RDP).",
      "Un service peut tourner sur un autre port : le numéro n'est qu'une convention.",
    ], "SSH a le plus petit numéro des quatre."),
    order("Range ces services selon leur port habituel, du plus petit au plus grand.", ["SSH", "DNS", "HTTPS", "RDP"]),
    "22, 53, 443, 3389 : tu connais les ports par cœur.",
  ),
  room(
    "moyen-100",
    "La sortie du niveau",
    "Dernière porte du niveau Moyen. Le pirate a laissé une ligne de journal et une question : « Qui m'a laissé entrer ? »",
    card("Relier les indices", "Défense", "🧩", "Une enquête, c'est relier plusieurs indices simples entre eux.", [
      "IP source, compte utilisé, heure et résultat : chaque champ raconte une partie de l'histoire.",
      "Une connexion réussie hors des horaires habituels mérite toujours une vérification.",
      "Note tout ce que tu observes : c'est la base d'un rapport d'incident.",
    ], "Lis le champ qui identifie le compte."),
    answer("Quel compte a été utilisé pour entrer ?", ["svc_sauvegarde"], {
      content: "2026-03-14T02:47:13Z  auth=success  user=svc_sauvegarde  src=185.220.101.4  method=password  geo=NL",
      contentLabel: "Journal d'authentification du VPN",
      placeholder: "Nom du compte",
    }),
    "Niveau Moyen terminé : tu sais lire les indices comme un vrai analyste !",
  ),
];
