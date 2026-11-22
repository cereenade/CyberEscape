import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 101 à 120 du niveau Difficile. */
export const DIFFICILE_7: RoomContent[] = [
  room(
    "difficile-101",
    "Le cadenas disparu",
    "Sur le Wi-Fi d'un café, un employé tape serveur-corp.fr. La page s'affiche… en http, sans cadenas. Quelqu'un sur le réseau a intercepté la première requête et l'a gardée en clair.",
    card("Le SSL stripping et HSTS", "Web", "🔓", "Un attaquant placé au milieu peut empêcher le passage de http vers https, sauf si le site impose HSTS.", [
      "Quand tu tapes un domaine sans https://, la première requête part souvent en http.",
      "Un attaquant sur le même réseau peut répondre à la place du site et garder la connexion en clair.",
      "L'en-tête Strict-Transport-Security (HSTS) dit au navigateur : « toujours en https pour ce site ».",
      "La liste de préchargement HSTS protège même la toute première visite.",
    ], "Quel en-tête force le navigateur à n'utiliser que https ?"),
    choice("Quelle mesure empêche le mieux cette attaque côté site ?", [
      ["Activer HSTS (Strict-Transport-Security) et s'inscrire au préchargement", true, "Le navigateur refuse alors toute connexion en http vers ce site."],
      ["Rediriger http vers https, sans rien d'autre", false, "La redirection passe justement par la requête http que l'attaquant intercepte."],
      ["Afficher un logo de cadenas dans la page", false, "Un dessin de cadenas ne chiffre rien."],
    ]),
    "HSTS activé et préchargé. Le navigateur ne parle plus jamais en clair à ce site.",
  ),
  room(
    "difficile-102",
    "Le champ de trop",
    "Sur le site de serveur-corp.fr, le formulaire « Modifier mon profil » envoie un nom et une ville. L'auditrice ajoute un champ en plus dans la requête… et son compte devient administrateur.",
    card("L'affectation de masse (mass assignment)", "Web", "🧩", "Quand le serveur enregistre tous les champs reçus, un utilisateur peut modifier ce qu'il ne devrait pas.", [
      "Certains frameworks copient automatiquement tout le JSON reçu dans l'objet en base.",
      "Un champ invisible dans le formulaire (rôle, solde, statut) peut alors être modifié en l'ajoutant à la main.",
      "Défense : une liste blanche des champs modifiables, côté serveur, pour chaque action.",
      "Utilise des objets dédiés aux entrées (DTO) plutôt que l'objet de la base.",
    ], "Compare ce que le formulaire envoie normalement et ce que l'auditrice a envoyé."),
    answer("Quel champ l'auditrice a-t-elle ajouté pour devenir administratrice ?", ["role"], {
      content: "Requête normale :\n{\"nom\": \"Inès\", \"ville\": \"Lyon\"}\n\nRequête de l'auditrice :\n{\"nom\": \"Inès\", \"ville\": \"Lyon\", \"role\": \"admin\"}",
      contentLabel: "Requêtes PUT /api/profil",
      placeholder: "Nom du champ",
    }),
    "Liste blanche en place : seuls nom et ville sont modifiables. Le champ role est ignoré.",
  ),
  room(
    "difficile-103",
    "Le cookie surprise",
    "Dans les journaux du WAF de serveur-corp.fr, un paramètre de langue a été enregistré en Base64. Une fois décodé, il cache des caractères de fin de ligne… et un en-tête HTTP inattendu.",
    card("L'injection CRLF", "Web", "↩️", "Des retours à la ligne (%0D%0A) glissés dans une entrée peuvent ajouter de faux en-têtes à une réponse HTTP.", [
      "En HTTP/1.1, chaque en-tête se termine par CR LF (retour chariot + saut de ligne).",
      "Si le site recopie une entrée dans un en-tête (redirection, cookie) sans filtrer CR et LF, on peut y ajouter des lignes.",
      "Conséquences : faux cookie, redirection forcée, empoisonnement de cache ou de journaux.",
      "Défense : refuser CR et LF dans tout ce qui va dans un en-tête, et utiliser les fonctions du framework plutôt que de construire les en-têtes à la main.",
    ], "Décode le Base64, puis les %XX : lis le nom de l'en-tête ajouté."),
    answer("Quel en-tête HTTP l'entrée tente-t-elle d'ajouter ?", ["Set-Cookie"], {
      tools: ["base64", "url", "hex"],
      workshopInput: "bGFuZz1mciUwRCUwQVNldC1Db29raWUlM0ElMjBhZG1pbiUzRDE=",
      placeholder: "Le nom de l'en-tête",
    }),
    "Les caractères CR et LF sont désormais rejetés. L'en-tête parasite ne passera plus.",
  ),
  room(
    "difficile-104",
    "Le binaire trop puissant",
    "Pendant un audit interne, tu listes les capacités Linux accordées aux programmes d'un serveur. La plupart sont normales. Une seule permettrait à n'importe quel utilisateur de devenir root.",
    card("Les capacités Linux (capabilities)", "Système", "🧩", "Les capabilities découpent les pouvoirs de root en morceaux : certains morceaux suffisent à redevenir root.", [
      "Au lieu de donner tous les droits (SUID root), on accorde un seul pouvoir précis à un programme.",
      "cap_net_raw (envoyer des paquets bruts) est normale pour ping ; cap_net_bind_service sert à écouter sur un port sous 1024.",
      "cap_setuid, cap_sys_admin ou cap_dac_override sur un interpréteur (python, perl) équivalent presque à root.",
      "Audit : la commande getcap liste les capacités ; retire celles qui ne servent pas (setcap -r).",
    ], "Quel pouvoir permet de changer d'identité, et sur quel type de programme ?"),
    choice("Quelle ligne présente un risque d'élévation de privilèges ?", [
      ["/usr/bin/python3.11 cap_setuid=ep", true, "Un interpréteur qui peut changer d'UID peut devenir root : capacité à retirer."],
      ["/usr/bin/ping cap_net_raw=ep", false, "C'est le réglage normal de ping, limité à l'envoi de paquets ICMP."],
      ["/opt/web/serveur cap_net_bind_service=ep", false, "Écouter sur le port 443 sans être root : c'est l'usage prévu."],
    ], {
      contentLabel: "Résultat de getcap -r /",
      content: "/usr/bin/ping cap_net_raw=ep\n/usr/bin/python3.11 cap_setuid=ep\n/opt/web/serveur cap_net_bind_service=ep",
    }),
    "Capacité retirée de python. Plus aucun raccourci vers root sur ce serveur.",
  ),
  room(
    "difficile-105",
    "L'adresse qui mentait",
    "La page d'administration de serveur-corp.fr n'est censée répondre qu'au réseau interne. Pourtant, le journal montre une connexion réussie venue d'Internet… avec un en-tête un peu trop arrangeant.",
    card("L'en-tête X-Forwarded-For falsifié", "Web", "🎭", "X-Forwarded-For indique l'adresse du client derrière un proxy, mais n'importe qui peut l'écrire : il ne doit jamais servir seul à autoriser un accès.", [
      "Un proxy ou un répartiteur de charge ajoute cet en-tête pour transmettre l'adresse d'origine.",
      "Si l'application lui fait confiance sans vérifier d'où vient la requête, un visiteur peut se déclarer « 127.0.0.1 ».",
      "Les conséquences : contournement de listes d'adresses autorisées, de limites de débit ou de journaux.",
      "Défense : ne lire l'en-tête que s'il vient d'un proxy de confiance, et ne garder que l'adresse ajoutée par ce proxy.",
    ], "Qui a écrit cet en-tête ?"),
    choice("Quelle correction est la bonne ?", [
      ["N'accepter X-Forwarded-For que depuis le proxy de l'entreprise, et filtrer l'accès admin au niveau réseau", true, "L'adresse vient d'une source de confiance et l'accès est aussi bloqué en amont."],
      ["Vérifier que l'en-tête contient bien une adresse privée", false, "L'attaquant écrit justement une adresse privée."],
      ["Lire la première adresse de la liste X-Forwarded-For", false, "La première adresse est celle que le client a choisie lui-même."],
      ["Renommer la page /admin en /admin2", false, "Cacher la page ne corrige pas la confiance aveugle."],
    ], {
      content: "203.0.113.45 - - [16/Nov/2026:03:12:08 +0100] \"GET /admin HTTP/1.1\" 200 \"X-Forwarded-For: 127.0.0.1\"",
      contentLabel: "journal d'accès",
    }),
    "Confiance limitée au proxy, admin filtré par le pare-feu. L'adresse menteuse est démasquée.",
  ),
  room(
    "difficile-106",
    "La base sans tables",
    "La nouvelle appli de serveur-corp.fr stocke ses comptes dans une base de documents JSON. « Pas de SQL, donc pas d'injection », affirme le développeur. Le formulaire de connexion accepte pourtant un objet à la place du mot de passe.",
    card("L'injection NoSQL", "Web", "🍃", "Les bases NoSQL ont aussi leurs injections : si l'appli insère tel quel ce que le client envoie, il peut glisser des opérateurs de requête.", [
      "Dans une base de documents, une requête est souvent un objet : { utilisateur: …, motDePasse: … }.",
      "Si le client peut envoyer un objet au lieu d'un texte, il peut y mettre un opérateur (comme « différent de ») et changer le sens de la requête.",
      "Résultat possible : connexion sans mot de passe ou lecture de données d'autres comptes.",
      "Défense : vérifier le type et le format de chaque champ, refuser les opérateurs venus du client, utiliser les filtres de requête prévus par la bibliothèque.",
    ], "Un mot de passe doit-il pouvoir être un objet ?"),
    multi("Quelles mesures bloquent cette injection ?", [
      ["Exiger que le mot de passe soit une simple chaîne de caractères", true, "Un objet avec opérateur est rejeté dès l'entrée."],
      ["Valider chaque champ avec un schéma (type, longueur, format)", true, "Seules les données attendues atteignent la base."],
      ["Retirer les clés commençant par $ dans les données reçues", true, "Les opérateurs de requête ne passent plus."],
      ["Se dire qu'une base sans SQL ne peut pas être injectée", false, "C'est exactement l'erreur du développeur."],
      ["Chiffrer le trafic en HTTPS et s'arrêter là", false, "HTTPS protège le transport, pas la logique de la requête."],
    ]),
    "Schéma de validation en place. La base de documents ne se laisse plus raconter d'histoires.",
  ),
  room(
    "difficile-107",
    "Le formulaire qui fige le serveur",
    "Le site de serveur-corp.fr vérifie les adresses e-mail avec une expression régulière. Un visiteur a envoyé une seule « adresse » très longue et bizarre : le processeur du serveur est resté bloqué à 100 % pendant une minute.",
    card("Le déni de service par expression régulière (ReDoS)", "Web", "🌀", "Une expression régulière mal écrite peut mettre un temps énorme à analyser certaines chaînes : un seul message suffit alors à figer un serveur.", [
      "Les motifs avec des répétitions imbriquées, comme (a+)+ ou (\\w+\\s?)*, peuvent essayer des milliards de combinaisons avant d'échouer.",
      "Le temps de calcul explose avec la longueur de l'entrée : quelques dizaines de caractères suffisent.",
      "Se protéger : limiter la taille des entrées, simplifier les motifs, fixer un délai maximal, ou utiliser un moteur à temps linéaire (comme RE2).",
      "Des outils d'analyse de code repèrent les expressions régulières dangereuses avant la mise en production.",
    ], "Qu'est-ce qui empêche l'analyse de durer des heures ?"),
    choice("Quelle correction protège le mieux ce formulaire ?", [
      ["Limiter la longueur du champ et remplacer le motif par une version sans répétitions imbriquées (ou un moteur à temps linéaire)", true, "Tu supprimes la cause : l'analyse reste rapide quelle que soit l'entrée."],
      ["Ajouter un serveur de plus", false, "Chaque requête piégée bloquera aussi le nouveau serveur."],
      ["Vérifier l'adresse seulement en JavaScript dans le navigateur", false, "L'attaquant envoie sa requête directement au serveur."],
      ["Masquer le message d'erreur du formulaire", false, "Le serveur calcule toujours aussi longtemps."],
    ], {
      content: "Motif utilisé : ^([a-zA-Z0-9]+\\.?)+@serveur-corp\\.fr$\nEntrée reçue : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!\nTemps d'analyse : 61 s (processeur à 100 %)",
      contentLabel: "rapport d'incident",
    }),
    "Motif réécrit, longueur limitée à 254 caractères. Le formulaire répond en une milliseconde.",
  ),
  room(
    "difficile-108",
    "Le site qui parlait au routeur",
    "Une collègue a visité un site de jeux en ligne. Peu après, la page d'administration de son routeur, qui n'est joignable que depuis le réseau interne, a reçu des requêtes venues… de son propre navigateur.",
    card("Le DNS rebinding", "Réseau", "🔁", "Le DNS rebinding change l'adresse d'un nom de domaine en cours de visite pour que le navigateur, sans le savoir, envoie des requêtes à un appareil du réseau interne.", [
      "Le navigateur autorise une page à parler à son propre domaine (même origine) : c'est le nom qui compte, pas l'adresse IP.",
      "L'attaquant donne une durée de vie (TTL) très courte à son domaine, puis le fait pointer vers une adresse interne.",
      "Les services internes sans mot de passe, ou qui ne vérifient pas l'en-tête Host, sont les plus exposés.",
      "Se protéger : vérifier l'en-tête Host, exiger une authentification même en interne, et filtrer au résolveur DNS les réponses qui renvoient des adresses privées.",
    ], "Le nom reste le même, mais l'adresse derrière change."),
    order("Remets les étapes de cette attaque dans l'ordre :", [
      "La victime visite une page de l'attaquant, dont le domaine pointe vers le serveur de l'attaquant avec un TTL très court",
      "Le script de la page attend que la réponse DNS expire",
      "Le domaine de l'attaquant est redirigé vers l'adresse interne du routeur",
      "Le navigateur, pensant rester sur le même site, envoie les requêtes du script au routeur interne",
    ]),
    "Le routeur vérifie maintenant l'en-tête Host et le résolveur filtre les adresses privées. Le site de jeux ne parle plus qu'à lui-même.",
  ),
  room(
    "difficile-109",
    "Le dossier qui n'aurait pas dû être là",
    "Pendant un audit autorisé de serveur-corp.fr, tu remarques que l'adresse /.git/HEAD répond au lieu d'afficher une erreur. Le dossier de versions du site a été copié avec le reste.",
    card("Le dossier .git exposé", "Web", "🗂️", "Un dossier .git publié par erreur permet de reconstruire tout le code du site, historique et secrets compris.", [
      "Le dossier .git contient l'historique complet du projet : chaque fichier, chaque version.",
      "S'il est accessible en ligne, on peut reconstituer le code source, y compris des mots de passe supprimés depuis.",
      "Supprimer un secret dans un nouveau commit ne suffit pas : il reste dans l'historique, il faut le changer.",
      "Défense : déployer sans le dossier .git, bloquer les fichiers cachés sur le serveur et scanner les dépôts à la recherche de secrets.",
    ], "Un secret effacé du code est-il effacé de l'historique ?"),
    multi("Quelles mesures corrigent vraiment le problème ?", [
      ["Bloquer l'accès aux dossiers cachés (/.git, /.env) dans la configuration du serveur", true, "Le dossier ne répond plus aux visiteurs."],
      ["Déployer le site sans le dossier .git (copie des seuls fichiers utiles)", true, "La cause est traitée à la source."],
      ["Changer tous les mots de passe et clés présents dans l'historique", true, "Ils ont pu être copiés : seuls de nouveaux secrets sont sûrs."],
      ["Supprimer le mot de passe du fichier dans un nouveau commit, et s'arrêter là", false, "Il reste lisible dans les versions précédentes."],
      ["Renommer la page d'accueil pour brouiller les pistes", false, "Ça ne change rien à l'accès au dossier .git."],
    ]),
    "Dossier bloqué, déploiement corrigé, secrets renouvelés. L'historique ne raconte plus rien d'utile.",
  ),
  room(
    "difficile-110",
    "L'installateur trop généreux",
    "Sur un poste Windows de serveur-corp.fr, un utilisateur sans droits d'administration arrive à installer n'importe quel paquet .msi… avec les droits SYSTEM. Tu inspectes le registre.",
    card("AlwaysInstallElevated", "Système", "📦", "Ce réglage Windows installe tout paquet MSI avec les droits SYSTEM : n'importe quel utilisateur devient administrateur.", [
      "AlwaysInstallElevated est une stratégie qui existe à deux endroits : HKLM et HKCU.",
      "Si elle vaut 1 aux deux endroits, chaque fichier .msi s'installe avec les droits les plus élevés.",
      "Un utilisateur malveillant peut alors fabriquer un paquet qui lui donne les pleins pouvoirs.",
      "Défense : laisser la stratégie désactivée par GPO et passer par un outil de déploiement contrôlé.",
    ], "Que se passe-t-il quand la valeur vaut 1 des deux côtés ?"),
    choice("Que montre ce relevé, et que faut-il faire ?", [
      ["La stratégie est active aux deux endroits : il faut la désactiver par GPO", true, "Avec 1 dans HKLM et HKCU, tout MSI s'installe en SYSTEM : c'est une élévation de privilèges toute prête."],
      ["Rien d'anormal : seuls les administrateurs peuvent installer des MSI", false, "Justement non : ce réglage donne ce pouvoir à tout le monde."],
      ["Il suffit de supprimer la clé dans HKCU de cet utilisateur", false, "La GPO doit être corrigée, sinon la valeur revient et touche les autres postes."],
    ], {
      content: "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer\n    AlwaysInstallElevated    REG_DWORD    0x1\n\nHKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer\n    AlwaysInstallElevated    REG_DWORD    0x1",
      contentLabel: "relevé du registre",
    }),
    "Stratégie désactivée sur tout le parc. Les installations repassent par l'outil de déploiement validé.",
  ),
  room(
    "difficile-111",
    "Le mot de passe « 0 »",
    "Pendant un audit autorisé de serveur-corp.fr, tu relis le code PHP de la page de connexion. La comparaison du mot de passe utilise deux signes égal, pas trois.",
    card("La comparaison laxiste (type juggling)", "Web", "⚖️", "Certains langages convertissent les types avant de comparer : deux valeurs différentes peuvent alors être jugées « égales ».", [
      "En PHP, == compare après conversion de type ; === compare aussi le type.",
      "Dans les anciennes versions, « 0e123 » == « 0e456 » est vrai : les deux sont lus comme 0 en notation scientifique.",
      "Un hachage qui commence par 0e suivi de chiffres peut donc être « égal » à un autre.",
      "Défense : comparaison stricte (===), fonctions dédiées comme hash_equals() et password_verify().",
    ], "Deux égal ou trois ?"),
    choice("Quelle correction rend la vérification fiable ?", [
      ["Utiliser password_verify() avec un hachage moderne, ou au minimum une comparaison stricte", true, "Plus de conversion de type : seule la vraie valeur passe."],
      ["Garder == mais ajouter un message d'erreur plus vague", false, "Le message ne change rien à la comparaison fautive."],
      ["Mettre le mot de passe en majuscules avant la comparaison", false, "La conversion de type reste possible."],
    ], {
      content: "$hash = md5($_POST['password']);\nif ($hash == $user['password_md5']) {\n    connecter($user);\n}",
      contentLabel: "login.php (extrait)",
    }),
    "Comparaison stricte et password_verify() en place. Le « 0 » magique ne passe plus.",
  ),
  room(
    "difficile-112",
    "La tâche de minuit",
    "Sur un serveur Linux de test, un script de sauvegarde tourne chaque nuit en root grâce à cron. Tu remarques ses droits : tout le monde peut le modifier.",
    card("Les scripts cron modifiables par tous", "Système", "⏰", "Un script lancé par root mais modifiable par n'importe qui permet à n'importe qui de devenir root.", [
      "cron lance des commandes à heure fixe, souvent avec les droits root (/etc/crontab, /etc/cron.d).",
      "Si le script appelé est en -rwxrwxrwx, un simple utilisateur peut y ajouter ses propres commandes.",
      "À minuit, root les exécutera sans poser de question.",
      "Défense : script appartenant à root, droits 700 ou 750, dossier parent protégé aussi.",
    ], "Regarde le dernier groupe de droits du script."),
    multi("Quelles mesures corrigent ce risque ?", [
      ["Donner le script à root (chown root:root)", true, "Seul root peut alors le modifier."],
      ["Retirer l'écriture aux autres (chmod 750 ou 700)", true, "Plus personne d'autre ne peut glisser une commande dedans."],
      ["Vérifier aussi les droits du dossier qui contient le script", true, "Un dossier modifiable permet de remplacer le fichier entier."],
      ["Déplacer la tâche à 3 h du matin", false, "L'heure ne change rien : le script reste modifiable."],
      ["Renommer le script en .backup_secret.sh", false, "Un nom caché ne protège pas des droits trop larges."],
    ], {
      content: "$ cat /etc/crontab\n0 0 * * * root /opt/scripts/sauvegarde.sh\n\n$ ls -l /opt/scripts/sauvegarde.sh\n-rwxrwxrwx 1 deploy deploy 412 nov. 20 sauvegarde.sh",
      contentLabel: "terminal",
    }),
    "Script rendu à root, droits resserrés. La tâche de minuit ne fait plus que des sauvegardes.",
  ),
];
