import type { RoomContent } from "@/lib/types";
import { answer, card, room } from "./_build";

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
];
