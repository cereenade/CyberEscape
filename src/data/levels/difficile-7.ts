import type { RoomContent } from "@/lib/types";
import { answer, card, choice, room } from "./_build";

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
];
