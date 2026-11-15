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
];
