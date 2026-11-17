import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 101 à 108 du niveau Difficile. */
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
    "Le formulaire qui fige tout",
    "Le site de serveur-corp.fr vérifie les adresses e-mail avec une expression régulière maison. Une seule saisie très longue et bizarre bloque le serveur pendant une minute.",
    card("Le ReDoS", "Web", "🌀", "Certaines expressions régulières mal écrites mettent un temps énorme à échouer sur une saisie choisie : c'est un déni de service par regex.", [
      "Le problème vient des quantificateurs imbriqués, comme (a+)+ : le moteur essaie une explosion de combinaisons.",
      "Une seule requête peut occuper le processeur pendant des secondes, voire des minutes.",
      "Défense : limiter la taille des saisies, éviter les quantificateurs imbriqués, et fixer un délai maximal d'évaluation.",
      "Les moteurs à temps linéaire (comme RE2) ne reviennent jamais en arrière et évitent ce piège.",
    ], "Qu'est-ce qui, dans la regex, fait exploser le nombre d'essais ?"),
    multi("Quelles mesures protègent contre le ReDoS ?", [
      ["Limiter la longueur des champs avant de tester la regex", true, "Moins de caractères, beaucoup moins de combinaisons."],
      ["Supprimer les quantificateurs imbriqués comme (a+)+", true, "C'est la cause principale du retour arrière catastrophique."],
      ["Utiliser un moteur à temps linéaire ou un délai maximal", true, "Le serveur ne peut plus rester bloqué."],
      ["Ajouter encore plus de groupes pour être précis", false, "Plus de groupes imbriqués, plus de risque."],
      ["Faire tourner la regex deux fois pour être sûr", false, "Tu doubles le temps perdu."],
    ]),
    "Regex simplifiée, saisies limitées. Le formulaire répond à nouveau en un éclair.",
  ),
  room(
    "difficile-108",
    "Le nom qui change d'adresse",
    "L'interface d'administration du routeur interne n'accepte que le réseau local. Pourtant, une page web visitée par un employé a réussi à lui parler, via un nom de domaine dont l'adresse a changé en cours de route.",
    card("Le DNS rebinding", "Réseau", "🔄", "Un domaine contrôlé par un attaquant répond d'abord avec son serveur, puis avec une adresse interne : le navigateur croit parler au même site.", [
      "La règle de même origine se base sur le nom, pas sur l'adresse IP.",
      "Un TTL DNS très court permet de changer l'adresse entre deux requêtes.",
      "La page peut alors envoyer des requêtes vers un service interne depuis le navigateur de la victime.",
      "Défense : vérifier l'en-tête Host côté service, exiger une authentification, et filtrer les réponses DNS pointant vers des adresses privées.",
    ], "Sur quoi le navigateur se base-t-il pour l'origine : le nom ou l'IP ?"),
    order("Remets l'attaque dans l'ordre :", [
      "L'employé visite une page sur le domaine de l'attaquant",
      "Le DNS répond avec l'adresse du serveur de l'attaquant, avec un TTL très court",
      "Le TTL expire et le DNS répond maintenant avec une adresse interne",
      "Le script de la page envoie ses requêtes au même nom, qui pointe vers le routeur interne",
    ]),
    "En-tête Host vérifié, réponses DNS internes filtrées. Le routeur ne parle plus aux inconnus.",
  ),
];
