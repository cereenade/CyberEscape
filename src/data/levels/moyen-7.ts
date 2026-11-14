import type { RoomContent } from "@/lib/types";
import { answer, card, multi, room } from "./_build";

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
];
