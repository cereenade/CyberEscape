import type { RoomContent } from "@/lib/types";
import { card, multi, room } from "./_build";

/** Salles 101 à 120 du niveau Impossible. */
export const IMPOSSIBLE_7: RoomContent[] = [
  room(
    "impossible-101",
    "Le serveur trop bavard",
    "Lors d'un audit, l'équipe remarque qu'un vieux service de serveur-corp.fr répond « remplissage invalide » ou « erreur interne » selon le message RSA reçu. Cette simple différence suffit à le rendre vulnérable.",
    card("L'attaque de Bleichenbacher", "Crypto", "🧮", "Un serveur qui révèle si un remplissage RSA PKCS#1 v1.5 est valide devient un oracle exploitable.", [
      "Décrite en 1998, elle cible le chiffrement RSA avec le remplissage PKCS#1 v1.5.",
      "En envoyant beaucoup de messages modifiés et en observant les réponses, on peut déchiffrer un message sans la clé privée.",
      "La fuite peut venir d'un message d'erreur, d'un code de retour ou même d'un temps de réponse.",
      "Elle revient régulièrement (attaque ROBOT en 2017) dans des implémentations mal corrigées.",
    ], "Le problème n'est pas RSA lui-même, mais ce que le serveur laisse deviner."),
    multi("Quelles mesures protègent contre cette attaque ?", [
      ["Utiliser RSA-OAEP plutôt que PKCS#1 v1.5 pour le chiffrement", true, "OAEP est conçu pour résister à ce type d'oracle."],
      ["Renvoyer la même erreur, dans le même temps, quel que soit le problème", true, "Plus de différence observable : plus d'oracle."],
      ["Préférer en TLS les échanges de clés (EC)DHE à l'échange de clés RSA", true, "Le chiffrement RSA n'est plus utilisé pour transporter la clé de session."],
      ["Afficher un message d'erreur plus détaillé pour aider au débogage", false, "Plus de détails, c'est un oracle encore plus précis."],
      ["Doubler la taille de la clé RSA en gardant PKCS#1 v1.5", false, "La taille de clé ne corrige pas la fuite d'information."],
    ]),
    "Service migré vers TLS 1.3 et erreurs uniformisées. L'oracle se tait.",
  ),
  room(
    "impossible-102",
    "La carte qui consommait trop",
    "Le laboratoire d'évaluation branche un oscilloscope sur une carte à puce de serveur-corp.fr. Pendant le chiffrement, la consommation électrique dessine des pics… qui suivent les bits de la clé.",
    card("L'analyse de consommation électrique", "Crypto", "⚡", "Un circuit qui chiffre consomme différemment selon les données : mesurer ce courant peut révéler la clé.", [
      "L'analyse simple (SPA) lit directement les opérations sur une seule courbe.",
      "L'analyse différentielle (DPA) compare statistiquement des milliers de courbes pour retrouver la clé octet par octet.",
      "Elle vise surtout les objets physiques : cartes à puce, modules matériels, objets connectés.",
      "Contre-mesures : masquage des données, exécution en temps et consommation constants, bruit ajouté, certification (Critères communs).",
    ], "L'algorithme est solide : c'est son exécution qui fuit."),
    multi("Quelles contre-mesures réduisent ce risque ?", [
      ["Le masquage : mélanger les données avec un aléa à chaque exécution", true, "La consommation ne dépend plus directement de la clé."],
      ["Des opérations sans branchement qui dépendent de la clé", true, "Le profil de consommation reste le même quel que soit le bit."],
      ["Des composants évalués contre les attaques physiques", true, "Les évaluations (Critères communs, EMVCo) testent précisément ces fuites."],
      ["Passer de AES-128 à AES-256 sans rien changer d'autre", false, "Une clé plus longue fuit tout autant si l'implémentation n'est pas protégée."],
      ["Cacher le nom de l'algorithme utilisé", false, "La sécurité par l'obscurité ne bloque pas une mesure physique."],
    ]),
    "Nouvelle puce masquée, évaluée en laboratoire. Les courbes ne disent plus rien.",
  ),
];
