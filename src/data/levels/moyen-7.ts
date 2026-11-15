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
];
