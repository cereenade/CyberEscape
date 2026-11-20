import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, room } from "./_build";

/** Salles 101 à 120 du niveau Moyen. */
export const MOYEN_7: RoomContent[] = [
  room(
    "moyen-101",
    "Le chercheur qui voulait prévenir",
    "Un chercheur a trouvé une faille sur serveur-corp.fr. Il veut la signaler, mais ne trouve aucun contact. Il cherche un petit fichier texte standard prévu pour ça.",
    card("Le fichier security.txt", "Web", "📄", "Un fichier standard qui indique comment signaler une faille à un site.", [
      "Il se place à l'adresse /.well-known/security.txt du site.",
      "Il contient au minimum un contact (Contact:) et une date d'expiration (Expires:).",
      "Il peut aussi indiquer une clé de chiffrement, une politique de divulgation ou les langues acceptées.",
    ], "Le fichier se cache dans un dossier « bien connu »…"),
    answer("Dans quel dossier du site place-t-on le fichier security.txt ?", [".well-known", "well-known", "/.well-known", "/.well-known/", ".well-known/"], {
      content: "Contact: mailto:securite@serveur-corp.fr\nExpires: 2027-12-31T23:00:00Z\nPreferred-Languages: fr, en\nPolicy: https://serveur-corp.fr/divulgation",
      contentLabel: "Le fichier trouvé (sans son adresse)",
      placeholder: "ex. /images",
    }),
    "Fichier publié dans /.well-known/. Les chercheurs savent enfin qui prévenir.",
  ),
  room(
    "moyen-102",
    "L'attaquant venu de Paris",
    "Une alerte indique : « Connexion depuis Paris ». Mais l'utilisatrice habite Lyon et jure qu'elle était chez elle. Le SOC se demande si l'adresse IP dit vraiment la vérité.",
    card("La géolocalisation d'une adresse IP", "Réseau", "🗺️", "Situer une adresse IP donne une zone approximative, pas une position fiable.", [
      "Les bases de géolocalisation devinent la ville à partir des blocs d'adresses du fournisseur d'accès.",
      "Un VPN, un proxy ou un réseau mobile peuvent afficher une ville très éloignée de la vraie position.",
      "Plusieurs abonnés peuvent partager la même adresse publique (CGNAT).",
      "Croise toujours avec d'autres indices : appareil, navigateur, heure, historique.",
    ], "Que se passe-t-il si elle utilise un VPN ou la 4G ?"),
    multi("Qu'est-ce qui peut expliquer la ville affichée ?", [
      ["Un VPN dont le serveur de sortie est à Paris", true, "La connexion semble venir du serveur VPN."],
      ["Un réseau mobile dont les adresses sont rattachées à une autre ville", true, "Les opérateurs mobiles regroupent souvent leurs sorties Internet."],
      ["Une base de géolocalisation imprécise ou périmée", true, "Les blocs d'adresses changent de main et de région."],
      ["L'adresse IP indique toujours la rue exacte de la personne", false, "La géolocalisation IP reste approximative."],
      ["Le navigateur envoie automatiquement le GPS dans chaque requête", false, "La position GPS n'est partagée qu'avec ton accord, et ne fait pas partie de l'adresse IP."],
    ]),
    "C'était son VPN d'entreprise, sorti à Paris. Fausse alerte expliquée, règle de détection ajustée.",
  ),
  room(
    "moyen-103",
    "Le plan du site",
    "Le site de serveur-corp.fr publie un fichier pour aider les moteurs de recherche à trouver ses pages. En le lisant, tu remarques qu'une adresse n'aurait jamais dû s'y trouver.",
    card("Le fichier sitemap.xml", "Web", "🗺️", "Le sitemap liste les pages d'un site pour les moteurs de recherche : tout le monde peut le lire.", [
      "Il se trouve souvent à la racine (/sitemap.xml) et robots.txt indique parfois où il est.",
      "Il est généré automatiquement : une page de test ou d'administration peut s'y glisser par erreur.",
      "Un curieux ou un attaquant le lit pour cartographier le site en une seconde.",
      "N'y mets que des pages publiques, et protège les autres par une vraie authentification.",
    ], "Quelle adresse n'a rien à faire sur un plan destiné au public ?"),
    answer("Quel chemin ne devrait pas apparaître dans ce sitemap ?", ["/preprod-admin/", "https://www.serveur-corp.fr/preprod-admin/"], {
      contentLabel: "https://www.serveur-corp.fr/sitemap.xml",
      content: `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.serveur-corp.fr/</loc></url>
  <url><loc>https://www.serveur-corp.fr/offres/</loc></url>
  <url><loc>https://www.serveur-corp.fr/blog/</loc></url>
  <url><loc>https://www.serveur-corp.fr/preprod-admin/</loc></url>
  <url><loc>https://www.serveur-corp.fr/contact/</loc></url>
</urlset>`,
      placeholder: "Le chemin",
    }),
    "Page retirée du plan et protégée par mot de passe. Le sitemap ne montre plus que la vitrine.",
  ),
  room(
    "moyen-104",
    "Le ping qui parle trop",
    "Un collègue lance un ping vers une machine inconnue du réseau local. Il ne sait pas quel système elle utilise. Toi, tu regardes un petit nombre dans la réponse.",
    card("Le TTL des paquets", "Réseau", "⏳", "Le TTL est un compteur qui baisse d'un à chaque routeur : sa valeur de départ trahit souvent le système.", [
      "TTL veut dire Time To Live : chaque routeur traversé retire 1, et le paquet est détruit à 0.",
      "Cela évite qu'un paquet tourne en boucle à l'infini sur Internet.",
      "Valeurs de départ courantes : 64 (Linux, macOS), 128 (Windows), 255 (beaucoup d'équipements réseau).",
      "Un TTL reçu de 127 veut donc dire : départ à 128, un routeur traversé.",
    ], "Remonte au nombre de départ le plus proche, juste au-dessus."),
    choice("Quel système utilise probablement cette machine ?", [
      ["Windows : départ à 128, un saut", true, "127 est juste sous 128, la valeur par défaut de Windows."],
      ["Linux : départ à 64", false, "Linux part de 64 : le TTL reçu serait au plus 64."],
      ["Un équipement réseau : départ à 255", false, "Il faudrait 128 routeurs entre vous deux : impossible sur un réseau local."],
    ], {
      contentLabel: "Résultat du ping",
      content: "Réponse de 192.168.10.42 : octets=32 temps=2 ms TTL=127\nRéponse de 192.168.10.42 : octets=32 temps=1 ms TTL=127",
    }),
    "Bien vu : un poste Windows oublié dans l'inventaire. Il rejoint la liste des machines suivies.",
  ),
  room(
    "moyen-105",
    "Le mail aux signes égal",
    "En ouvrant la source d'un mail suspect reçu à serveur-corp.fr, tu tombes sur des mots bizarres : « Votre acc=C3=A8s =C3=A0 la messagerie… ». Ce n'est pas du chiffrement, juste un encodage.",
    card("L'encodage quoted-printable", "Web", "✉️", "Dans la source d'un mail, « =XX » remplace un octet en hexadécimal : c'est le quoted-printable, prévu pour faire passer les accents.", [
      "Il est défini pour les mails (MIME, RFC 2045) et s'annonce par l'en-tête Content-Transfer-Encoding: quoted-printable.",
      "Chaque « = » suivi de deux chiffres hexadécimaux est un octet : =C3=A9 donne « é » en UTF-8.",
      "Un « = » en fin de ligne signifie juste que la ligne continue.",
      "Les filtres anti-spam le décodent avant d'analyser le texte : un analyste doit savoir le lire aussi.",
    ], "=C3=A9 se lit « é »."),
    answer("Quel mot se cache derrière « s=C3=A9curit=C3=A9 » ?", ["securite", "sécurité"], {
      content: "Content-Type: text/plain; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\nMerci de v=C3=A9rifier votre s=C3=A9curit=C3=A9 avant vendredi.",
      contentLabel: "source du mail",
      placeholder: "le mot décodé",
    }),
    "Mail décodé, phishing confirmé et signalé. Les signes égal n'ont plus de secret.",
  ),
  room(
    "moyen-106",
    "Le commentaire étrange",
    "Sur le site de serveur-corp.fr, un commentaire s'affiche normalement. Mais dans le code source de la page, il ressemble à une suite de « &#… ; ». Tu veux comprendre ce que le site a fait.",
    card("Les entités HTML", "Web", "🔣", "En HTML, « &lt; » ou « &#83; » représentent un caractère : le navigateur l'affiche sans l'interpréter comme du code.", [
      "Entités nommées : &lt; pour <, &gt; pour >, &amp; pour &, &quot; pour \".",
      "Entités numériques : &#83; (décimal) ou &#x53; (hexadécimal) donnent le caractère de code 83, soit « S ».",
      "Transformer < et > en entités avant d'afficher un texte est la base de la protection contre les failles XSS.",
      "Elles servent aussi à cacher un mot aux filtres naïfs : un analyste les décode pour voir le vrai contenu.",
    ], "Les nombres sont des codes ASCII en décimal."),
    answer("Quel mot affiche le navigateur pour « &#83;&#79;&#67; » ?", ["soc"], {
      content: "<p class=\"commentaire\">Bravo à l'équipe &#83;&#79;&#67; !</p>",
      contentLabel: "code source",
      placeholder: "le mot affiché",
    }),
    "Entités décodées. Tu sais maintenant pourquoi le site échappe les caractères spéciaux.",
  ),
  room(
    "moyen-107",
    "Qui écoute sur ce serveur ?",
    "Le serveur web de serveur-corp.fr est censé n'ouvrir que les ports 22 et 443. Tu lances la commande qui liste les connexions et les ports en écoute. Une ligne ne devrait pas être là.",
    card("Lire les connexions actives (netstat)", "Réseau", "🔌", "Les commandes netstat ou ss affichent les ports en écoute et les connexions établies : un port inattendu mérite une enquête.", [
      "Sous Linux, « ss -tulpn » liste les ports TCP et UDP en écoute avec le programme qui les ouvre. Sous Windows, « netstat -ano ».",
      "LISTEN signifie que le programme attend des connexions ; ESTABLISHED, qu'une connexion est en cours.",
      "Une écoute sur 127.0.0.1 n'est joignable que depuis la machine ; sur 0.0.0.0, depuis tout le réseau.",
      "Compare toujours avec la liste des services prévus : tout le reste doit être expliqué ou fermé.",
    ], "Quel port n'était pas prévu, et qui l'ouvre ?"),
    choice("Quelle ligne doit attirer ton attention ?", [
      ["Le programme « kworkerd » qui écoute sur 0.0.0.0:4444", true, "Port non prévu, ouvert à tout le réseau, par un programme au nom qui imite un processus du noyau."],
      ["sshd qui écoute sur 0.0.0.0:22", false, "Le port 22 fait partie des services prévus."],
      ["nginx qui écoute sur 0.0.0.0:443", false, "C'est le site web, prévu lui aussi."],
      ["postgres qui écoute sur 127.0.0.1:5432", false, "Il n'écoute que localement : il n'est pas joignable depuis le réseau."],
    ], {
      content: "Netid State  Local Address:Port  Process\ntcp   LISTEN 0.0.0.0:22          users:((\"sshd\",pid=812))\ntcp   LISTEN 0.0.0.0:443         users:((\"nginx\",pid=1033))\ntcp   LISTEN 127.0.0.1:5432      users:((\"postgres\",pid=954))\ntcp   LISTEN 0.0.0.0:4444        users:((\"kworkerd\",pid=6671))",
      contentLabel: "sortie de ss -tulpn",
    }),
    "Programme inconnu isolé et analysé. Le port 4444 est refermé.",
  ),
  room(
    "moyen-108",
    "Les refus du pare-feu",
    "Cette nuit, le pare-feu de serveur-corp.fr a refusé beaucoup de connexions. La plupart sont du bruit habituel d'Internet, mais une adresse insiste bien plus que les autres sur le même service.",
    card("Lire un journal de pare-feu", "Défense", "🧱", "Un journal de pare-feu dit qui a tenté de joindre quoi, et si c'était autorisé ou bloqué : il révèle les tentatives répétées.", [
      "Chaque ligne indique l'heure, l'action (ALLOW ou DENY), l'adresse source, l'adresse de destination et le port.",
      "Le port renseigne sur le service visé : 22 pour SSH, 3389 pour le bureau à distance, 443 pour le web.",
      "Une même source qui revient en boucle sur un même port signale souvent une attaque par force brute ou un scan.",
      "Les blocages montrent que le pare-feu fait son travail ; ce qui compte, c'est de repérer la source qui insiste et ce qu'elle vise.",
    ], "Compte les lignes de chaque adresse source."),
    answer("Quelle adresse source insiste le plus sur le port 22 ?", ["198.51.100.23"], {
      content: "02:10:04 DENY src=203.0.113.8 dst=10.0.0.5 dport=3389\n02:10:11 DENY src=198.51.100.23 dst=10.0.0.5 dport=22\n02:10:12 DENY src=198.51.100.23 dst=10.0.0.5 dport=22\n02:10:12 ALLOW src=10.0.0.40 dst=10.0.0.5 dport=443\n02:10:13 DENY src=198.51.100.23 dst=10.0.0.5 dport=22\n02:10:15 DENY src=192.0.2.77 dst=10.0.0.5 dport=22\n02:10:15 DENY src=198.51.100.23 dst=10.0.0.5 dport=22\n02:10:16 DENY src=198.51.100.23 dst=10.0.0.5 dport=22",
      contentLabel: "journal du pare-feu",
      placeholder: "Une adresse IP",
    }),
    "198.51.100.23 est ajoutée à la liste de blocage, et SSH n'accepte plus que les clés.",
  ),
];
