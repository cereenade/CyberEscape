import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 41 à 60 du niveau Difficile. */
export const DIFFICILE_4: RoomContent[] = [
  room(
    "difficile-41",
    "La question oui/non",
    "Le site ne renvoie aucune erreur SQL. Mais avec ?id=5 AND 1=1 la page s'affiche, et avec ?id=5 AND 1=2 elle est vide.",
    card("L'injection SQL aveugle", "Web", "🦯", "Pas de message d'erreur, mais la page répond différemment selon une condition vraie ou fausse.", [
      "Le pirate pose des questions oui/non à la base : « la 1re lettre du mot de passe est-elle un a ? ».",
      "Il peut aussi mesurer le temps de réponse (SLEEP) : on parle d'injection temporelle.",
      "La solution est la même : des requêtes préparées.",
    ], "Que montre la différence entre 1=1 et 1=2 ?"),
    choice("Que prouve ce comportement ?", [
      ["La condition ajoutée est exécutée par la base : injection SQL aveugle", true, "Le pirate peut extraire les données bit par bit."],
      ["Le site est simplement lent", false, "La différence vient de la condition, pas de la vitesse."],
      ["Le site est protégé puisqu'il n'affiche pas d'erreur", false, "Cacher les erreurs ne corrige pas la faille."],
    ]),
    "Requêtes préparées en place. La base ne répond plus aux questions du pirate.",
  ),
  room(
    "difficile-42",
    "L'union fait la fuite",
    "Le pirate ajoute à l'URL : ' UNION SELECT login, password FROM users --. La liste des produits affiche soudain des identifiants.",
    card("L'injection SQL par UNION", "Web", "🔗", "UNION ajoute les résultats d'une seconde requête à ceux de la première.", [
      "La seconde requête doit avoir le même nombre de colonnes que la première.",
      "Le « -- » transforme la fin de la requête d'origine en commentaire.",
      "Les données d'une autre table s'affichent alors dans la page.",
    ], "Que fait « -- » en SQL ?"),
    multi("Quelles affirmations sont vraies ?", [
      ["UNION combine les résultats de deux requêtes", true, "C'est ce qui affiche les identifiants."],
      ["« -- » met la suite de la requête en commentaire", true, "La fin de la requête d'origine est ignorée."],
      ["Les deux requêtes doivent avoir le même nombre de colonnes", true, "Sinon la base renvoie une erreur."],
      ["Un pare-feu réseau suffit à empêcher ça", false, "La requête passe par le port web autorisé."],
    ]),
    "Requêtes paramétrées et mots de passe hachés : la fuite est colmatée.",
  ),
  room(
    "difficile-43",
    "La bonne correction",
    "Le développeur veut corriger l'injection SQL de la page de connexion. Il hésite entre plusieurs solutions.",
    card("Les requêtes préparées", "Web", "🧱", "La requête et les données sont envoyées séparément : les données ne sont jamais exécutées.", [
      "On écrit la requête avec des emplacements : SELECT * FROM users WHERE login = ?.",
      "Les valeurs saisies sont transmises à part et traitées comme du texte, jamais comme du code.",
      "Filtrer les apostrophes à la main est fragile et contournable.",
    ], "Quelle solution sépare le code et les données ?"),
    choice("Quelle est la vraie correction ?", [
      ["Supprimer les apostrophes des champs", false, "Il existe d'autres façons d'injecter."],
      ["Utiliser des requêtes préparées (paramétrées)", true, "Les données ne peuvent plus devenir du code SQL."],
      ["Cacher les messages d'erreur", false, "La faille reste, elle est juste plus discrète."],
    ]),
    "Requêtes préparées partout. L'injection SQL est définitivement fermée.",
  ),
  room(
    "difficile-44",
    "Le commentaire piégé",
    "Sur le livre d'or du site, le pirate a posté un commentaire contenant du JavaScript. Chaque visiteur qui affiche la page l'exécute.",
    card("La XSS stockée", "Web", "💾", "Le script malveillant est enregistré sur le site et touche tous les visiteurs.", [
      "XSS réfléchie : le script est dans le lien, il touche celui qui clique.",
      "XSS stockée : le script est enregistré (commentaire, profil) et touche tout le monde.",
      "Encoder les caractères spéciaux à l'affichage (< devient &lt;) neutralise le script.",
    ], "Le script est-il dans un lien ou enregistré sur le site ?"),
    choice("De quel type de XSS s'agit-il ?", [
      ["XSS stockée", true, "Le script est enregistré et s'exécute chez chaque visiteur."],
      ["XSS réfléchie", false, "Il faudrait que le script soit dans un lien envoyé à la victime."],
      ["Injection SQL", false, "On injecte ici du JavaScript, pas du SQL."],
    ]),
    "Affichage encodé. Le commentaire n'est plus que du texte inoffensif.",
  ),
  room(
    "difficile-45",
    "Tous les sites bienvenus",
    "L'API de la banque répond avec l'en-tête « Access-Control-Allow-Origin: * » et accepte les cookies de session.",
    card("CORS mal configuré", "Web", "🌐", "CORS dit quels autres sites ont le droit de lire les réponses d'une API.", [
      "Par défaut, un site ne peut pas lire les réponses d'un autre site (même origine).",
      "CORS assouplit cette règle : autoriser n'importe quelle origine peut exposer des données.",
      "Une API sensible doit lister précisément les origines autorisées.",
    ], "Que signifie l'étoile ?"),
    choice("Quel est le risque ?", [
      ["N'importe quel site pourrait lire les réponses de l'API", true, "Une liste blanche d'origines est nécessaire."],
      ["Aucun, CORS sert seulement au design", false, "CORS est un mécanisme de sécurité du navigateur."],
      ["Le site sera plus lent", false, "Ce n'est pas une question de performance."],
    ]),
    "Seul le site officiel de la banque est autorisé. L'API est protégée.",
  ),
  room(
    "difficile-46",
    "La liste blanche des scripts",
    "Même si un pirate injecte un script, le navigateur refuse de l'exécuter. L'en-tête de la page commence par « Content-Security-Policy: script-src 'self' ».",
    card("La Content-Security-Policy", "Web", "📋", "Une liste des sources autorisées pour les scripts, styles et connexions.", [
      "script-src 'self' : seuls les scripts venant du site lui-même sont exécutés.",
      "Un script injecté dans la page (inline) ou venant d'un autre domaine est bloqué.",
      "C'est une protection supplémentaire contre la XSS, pas un remplacement de l'encodage.",
    ], "Que signifie 'self' ?"),
    choice("Que fait cette politique ?", [
      ["Elle n'autorise que les scripts venant du site lui-même", true, "Les scripts injectés ou externes sont bloqués."],
      ["Elle chiffre la page", false, "La CSP ne chiffre rien."],
      ["Elle empêche les images de s'afficher", false, "Cette directive ne concerne que les scripts."],
    ]),
    "CSP déployée. Même une XSS oubliée ne pourra plus rien exécuter.",
  ),
  room(
    "difficile-47",
    "Le jeton imposé",
    "Le pirate envoie à sa victime un lien contenant un identifiant de session qu'il a choisi : ?PHPSESSID=pirate123. La victime se connecte.",
    card("La fixation de session", "Web", "📌", "Le pirate impose un identifiant de session connu, puis l'utilise après la connexion de la victime.", [
      "Si le site garde le même identifiant après la connexion, le pirate partage la session.",
      "La parade : générer un nouvel identifiant de session à chaque connexion.",
      "Refuser aussi les identifiants de session passés dans l'URL.",
    ], "Que doit faire le site au moment de la connexion ?"),
    choice("Quelle est la bonne correction ?", [
      ["Régénérer l'identifiant de session à la connexion", true, "L'identifiant imposé par le pirate devient inutile."],
      ["Allonger la durée de session", false, "Ça aiderait plutôt le pirate."],
      ["Afficher l'identifiant dans la page", false, "Aucune protection."],
    ]),
    "Session régénérée à chaque connexion. Le jeton du pirate ne vaut plus rien.",
  ),
  room(
    "difficile-48",
    "Le champ en trop",
    "Le formulaire de profil envoie {\"pseudo\":\"bob\"}. Le pirate ajoute {\"pseudo\":\"bob\",\"role\":\"admin\"}… et devient administrateur.",
    card("L'assignation de masse", "Web", "📦", "Le serveur enregistre tous les champs reçus, même ceux qui ne devraient pas être modifiables.", [
      "Certains frameworks copient automatiquement le JSON reçu dans l'objet en base.",
      "Il faut lister explicitement les champs modifiables (liste blanche).",
      "Ne jamais faire confiance aux champs envoyés par le navigateur.",
    ], "Quels champs le serveur aurait-il dû accepter ?"),
    choice("Comment corriger ?", [
      ["N'accepter que les champs autorisés (ici, pseudo)", true, "Le champ role est ignoré."],
      ["Cacher le champ role dans le formulaire", false, "Le pirate l'ajoute lui-même dans la requête."],
      ["Renommer le champ role en r0le", false, "La sécurité par l'obscurité ne tient pas."],
    ]),
    "Liste blanche de champs. Plus personne ne s'auto-promeut admin.",
  ),
  room(
    "difficile-49",
    "Un million d'essais",
    "La page « mot de passe oublié » envoie un code à 6 chiffres. Rien n'empêche de tester des milliers de codes par minute.",
    card("La limitation de débit", "Web", "⏱️", "Limiter le nombre de tentatives empêche de tout essayer.", [
      "Un code à 6 chiffres = 1 million de possibilités : vite testées sans limite.",
      "On limite les essais par compte et par adresse IP, et le code expire vite.",
      "Après quelques échecs, on invalide le code.",
    ], "Combien d'essais un attaquant devrait-il avoir ?"),
    multi("Quelles protections ajouter ?", [
      ["Limiter le nombre d'essais par compte", true, "Après 5 échecs, le code est invalidé."],
      ["Faire expirer le code en quelques minutes", true, "Moins de temps pour essayer."],
      ["Limiter les requêtes par adresse IP", true, "Ralentit les attaques automatisées."],
      ["Passer le code à 4 chiffres pour simplifier", false, "Ça le rendrait encore plus facile à deviner."],
    ]),
    "Limites en place. Le million d'essais devient 5.",
  ),
  room(
    "difficile-50",
    "Le lien de réinitialisation",
    "Le lien de réinitialisation reçu par mail est : /reset?token=1712922000. Le pirate reconnaît un horodatage Unix…",
    card("Les jetons prévisibles", "Web", "🎲", "Un jeton de sécurité doit être imprévisible, donc généré aléatoirement.", [
      "Un horodatage, un compteur ou un identifiant se devine facilement.",
      "Un bon jeton est long et vient d'un générateur aléatoire cryptographique.",
      "Il doit aussi expirer vite et ne servir qu'une fois.",
    ], "Peut-on deviner l'heure à laquelle un mail a été demandé ?"),
    choice("Pourquoi ce jeton est-il dangereux ?", [
      ["Il se devine : c'est l'heure de la demande", true, "Le pirate peut générer les jetons des autres comptes."],
      ["Il est trop long", false, "Le problème est qu'il est prévisible."],
      ["Il contient des chiffres", false, "Un bon jeton peut contenir des chiffres, s'il est aléatoire."],
    ]),
    "Jetons aléatoires de 32 octets. Plus rien à deviner.",
  ),
  room(
    "difficile-51",
    "Le serveur trop bavard",
    "En visitant /images/, le pirate voit la liste de tous les fichiers du dossier, dont « backup_bdd_2025.sql ».",
    card("Le listage de répertoires", "Web", "📂", "Quand le serveur affiche le contenu d'un dossier sans page d'accueil.", [
      "Le pirate peut parcourir les fichiers et trouver des sauvegardes ou des configurations.",
      "Désactive le listage (Options -Indexes sous Apache, autoindex off sous Nginx).",
      "Et ne laisse jamais de sauvegardes dans les dossiers publics.",
    ], "Que faut-il désactiver sur le serveur ?"),
    choice("Quelle correction faut-il appliquer ?", [
      ["Désactiver le listage des répertoires et retirer la sauvegarde", true, "Le dossier n'affiche plus rien et le fichier n'est plus exposé."],
      ["Renommer la sauvegarde en .txt", false, "Elle resterait téléchargeable."],
      ["Ajouter une image dans le dossier", false, "Aucun effet."],
    ]),
    "Listage désactivé, sauvegarde retirée du dossier public.",
  ),
  room(
    "difficile-52",
    "La page d'erreur",
    "En envoyant une apostrophe dans un champ, le site affiche une page d'erreur complète : version du framework, chemin des fichiers, requête SQL.",
    card("Le mode debug en production", "Web", "🐞", "Les messages d'erreur détaillés aident les pirates autant que les développeurs.", [
      "Versions, chemins et requêtes permettent de cibler des failles connues.",
      "En production, affiche un message générique et garde les détails dans les journaux.",
      "Désactive toujours le mode debug avant la mise en ligne.",
    ], "Où doivent aller les détails des erreurs ?"),
    multi("Que révèle cette page au pirate ?", [
      ["La version du framework", true, "Il peut chercher les failles connues de cette version."],
      ["Le chemin des fichiers sur le serveur", true, "Utile pour d'autres attaques."],
      ["La requête SQL et donc une injection possible", true, "Elle confirme une faille d'injection."],
      ["Le mot de passe Wi-Fi des développeurs", false, "Pas dans cette page."],
    ]),
    "Mode debug coupé. Le pirate ne voit plus qu'un « Oups, une erreur est survenue ».",
  ),
  room(
    "difficile-53",
    "Le fichier inclus",
    "L'URL est /index.php?page=contact.php. Le pirate essaie ?page=../../../../etc/passwd et le contenu du fichier s'affiche.",
    card("L'inclusion de fichier local", "Web", "📎", "Le site inclut un fichier choisi par le visiteur, sans contrôle.", [
      "On parle de LFI (Local File Inclusion).",
      "Le pirate lit des fichiers sensibles, et parfois fait exécuter du code.",
      "La correction : une liste fixe des pages autorisées, jamais un nom de fichier fourni par l'utilisateur.",
    ], "Qui choisit le fichier inclus ?"),
    choice("Quelle est la bonne correction ?", [
      ["N'autoriser qu'une liste fixe de pages (contact, accueil…)", true, "Le visiteur ne peut plus désigner un fichier arbitraire."],
      ["Supprimer seulement « ../ » de la saisie", false, "Il existe des contournements (encodage, ....//)."],
      ["Mettre le site en HTTPS", false, "HTTPS ne change rien à cette faille."],
    ]),
    "Liste blanche de pages. /etc/passwd n'est plus à portée.",
  ),
  room(
    "difficile-54",
    "Le sous-domaine abandonné",
    "promo.serveur-corp.fr pointe encore vers un service cloud supprimé il y a un an. Le pirate crée un compte et récupère ce nom.",
    card("La prise de contrôle de sous-domaine", "Web", "🏚️", "Un enregistrement DNS qui pointe vers un service supprimé peut être récupéré par un pirate.", [
      "Le DNS dit « promo → service X », mais le service X n'existe plus.",
      "Le pirate recrée la ressource chez le même fournisseur et sert ses pages sous ton nom.",
      "Supprime les enregistrements DNS dès qu'un service est arrêté.",
    ], "Que faut-il faire du DNS quand un service est arrêté ?"),
    choice("Comment éviter ça ?", [
      ["Supprimer l'enregistrement DNS quand on arrête le service", true, "Le nom ne pointe plus vers rien de récupérable."],
      ["Changer le logo du site", false, "Aucun rapport."],
      ["Augmenter la durée de cache DNS", false, "Le problème reste entier."],
    ]),
    "Enregistrements orphelins supprimés. Plus de sous-domaine à voler.",
  ),
  room(
    "difficile-55",
    "Le transfert de zone",
    "Le pirate demande au serveur DNS de l'entreprise : « Donne-moi tous les noms de ton domaine. » Le serveur obéit.",
    card("Le transfert de zone DNS", "Réseau", "📤", "Un serveur DNS mal configuré livre la liste complète des noms du domaine.", [
      "Le transfert de zone (AXFR) sert normalement à synchroniser les serveurs DNS entre eux.",
      "Ouvert à tous, il révèle tous les serveurs : vpn, intranet, test, backup…",
      "Il faut le limiter aux seuls serveurs DNS secondaires autorisés.",
    ], "Quel type de requête DNS demande toute la zone ?"),
    answer("Quel est le nom (sigle) de cette requête de transfert de zone ?", ["axfr"], { placeholder: "4 lettres" }),
    "AXFR limité aux serveurs autorisés. La carte du réseau n'est plus offerte.",
  ),
  room(
    "difficile-56",
    "La communauté publique",
    "Le pirate interroge l'imprimante réseau avec le mot de passe SNMP « public ». Elle lui livre sa configuration et la liste des utilisateurs.",
    card("SNMP et la communauté « public »", "Réseau", "🖨️", "SNMP sert à superviser les équipements ; « public » est son mot de passe par défaut.", [
      "SNMPv1/v2 utilise une « communauté » en clair qui fait office de mot de passe.",
      "« public » et « private » sont les valeurs par défaut, essayées en premier.",
      "Utilise SNMPv3 (authentification et chiffrement) ou désactive SNMP s'il ne sert pas.",
    ], "Quelle version de SNMP chiffre et authentifie ?"),
    choice("Que faut-il faire ?", [
      ["Passer en SNMPv3 ou désactiver SNMP", true, "Plus de mot de passe par défaut en clair."],
      ["Garder « public », personne ne le connaît", false, "C'est le premier mot essayé par tous les outils."],
      ["Mettre l'imprimante en couleur", false, "Aucun rapport."],
    ]),
    "SNMPv3 activé. L'imprimante ne parle plus aux inconnus.",
  ),
  room(
    "difficile-57",
    "Le faux serveur de noms",
    "Un poste tape mal \\\\serveur-fichier. Le DNS ne trouve rien, le poste demande alors à tout le réseau. Le pirate répond : « C'est moi ! »",
    card("L'empoisonnement LLMNR/NBT-NS", "Réseau", "☠️", "Quand le DNS échoue, Windows demande au réseau local… et n'importe qui peut répondre.", [
      "LLMNR et NBT-NS sont des protocoles de résolution de noms de secours.",
      "Le pirate répond à la place du vrai serveur et récupère le hash du mot de passe de la victime.",
      "Désactive LLMNR et NBT-NS par stratégie de groupe.",
    ], "Que vole le pirate quand le poste se connecte à lui ?"),
    choice("Quelle est la meilleure protection ?", [
      ["Désactiver LLMNR et NBT-NS", true, "Plus personne ne peut répondre à la place du serveur."],
      ["Écrire les noms de serveurs en majuscules", false, "Aucun effet."],
      ["Changer le fond d'écran", false, "Aucun effet."],
    ]),
    "LLMNR désactivé sur tout le parc. Le pirate n'attrape plus rien.",
  ),
  room(
    "difficile-58",
    "Le routeur usurpé",
    "Le pirate envoie sur le réseau local des messages : « L'adresse IP du routeur, c'est ma carte réseau. » Tout le trafic passe désormais par lui.",
    card("L'empoisonnement ARP", "Réseau", "🎭", "De fausses réponses ARP font passer le trafic par la machine du pirate.", [
      "ARP n'authentifie pas les réponses : n'importe qui peut prétendre être le routeur.",
      "Le pirate se place au milieu et lit ou modifie le trafic non chiffré.",
      "Protections : inspection ARP dynamique sur les switchs, HTTPS partout, segmentation.",
    ], "Quel protocole relie IP et adresse MAC ?"),
    choice("Quelle attaque est en cours ?", [
      ["Un empoisonnement ARP pour un homme du milieu", true, "Le trafic passe par la machine du pirate."],
      ["Une injection SQL", false, "On est sur le réseau local, pas dans une base de données."],
      ["Un déni de service", false, "Le pirate veut intercepter, pas bloquer."],
    ]),
    "Inspection ARP activée sur les switchs. L'usurpateur est bloqué.",
  ),
  room(
    "difficile-59",
    "Le message chiffré",
    "Sur le bureau du pirate, un message chiffré et une note : « clé = CYBER ». Il a aussi été encodé avant d'être chiffré.",
    card("Chiffrer puis encoder", "Crypto", "🧪", "Les étapes se défont dans l'ordre inverse de leur application.", [
      "Le pirate a chiffré avec Vigenère, puis encodé le résultat en Base64 pour l'envoyer.",
      "Pour lire : d'abord décoder le Base64, puis déchiffrer avec la clé.",
      "Une clé courte et réutilisée rend Vigenère vulnérable à l'analyse.",
    ], "Base64 d'abord, Vigenère ensuite."),
    answer("Quel est le message en clair ?", ["porte derobee", "portederobee"], {
      tools: ["base64", "vigenere", "rot13", "reverse"],
      workshopInput: "Uk1TWFYgRkNTU1NHQw==",
      placeholder: "Le message",
    }),
    "« PORTE DEROBEE » : la salle suivante a une sortie secrète.",
  ),
  room(
    "difficile-60",
    "La poignée de main volée",
    "Le pirate a capturé la poignée de main Wi-Fi WPA2 d'un employé qui se connectait. Il l'emporte chez lui pour la casser.",
    card("Casser un mot de passe WPA2", "Réseau", "📡", "Une poignée de main capturée permet de tester des mots de passe hors ligne.", [
      "Le pirate n'a plus besoin d'être près du réseau : il teste des millions de mots de passe sur sa machine.",
      "Seul un mot de passe long et aléatoire résiste.",
      "WPA3 protège contre ce type d'attaque hors ligne.",
    ], "Qu'est-ce qui ralentit le plus une attaque hors ligne ?"),
    multi("Quelles mesures protègent le réseau ?", [
      ["Un mot de passe Wi-Fi long et aléatoire", true, "Les dictionnaires ne le trouvent pas."],
      ["Passer en WPA3", true, "Il résiste aux attaques par dictionnaire hors ligne."],
      ["Changer le nom du réseau toutes les semaines", false, "Ça ne renforce pas le mot de passe."],
      ["Pour l'entreprise, WPA2/WPA3-Entreprise avec un compte par personne", true, "Il n'y a plus de mot de passe commun à casser."],
    ]),
    "Wi-Fi passé en WPA3-Entreprise. La capture du pirate ne sert à rien.",
  ),
];
