import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, room } from "./_build";

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
  room(
    "impossible-103",
    "La collision d'anniversaire",
    "Un développeur de serveur-corp.fr identifie les fichiers par une empreinte de 64 bits. « Il faudrait 2^64 essais pour une collision, on est tranquilles », dit-il. Tu n'en es pas si sûr.",
    card("Le paradoxe des anniversaires", "Crypto", "🎂", "Pour trouver deux entrées qui ont la même empreinte de n bits, il suffit d'environ 2^(n/2) essais, pas 2^n.", [
      "Dans un groupe de 23 personnes, il y a plus d'une chance sur deux que deux aient le même anniversaire.",
      "On ne cherche pas une empreinte précise, mais n'importe quelle paire identique : les paires possibles explosent.",
      "Une empreinte de 64 bits tombe donc vers 2^32 essais, à la portée d'un simple ordinateur.",
      "C'est pourquoi on exige au moins 256 bits (SHA-256) quand la résistance aux collisions compte.",
    ], "Divise le nombre de bits par deux."),
    answer("Vers combien d'essais une collision devient-elle probable ? (réponds sous la forme 2^n)", ["2^32", "2 puissance 32"], {
      placeholder: "2^…",
    }),
    "Empreinte passée à SHA-256. Les collisions retournent dans le domaine de l'impossible.",
  ),
  room(
    "impossible-104",
    "Le robot recruteur",
    "Serveur-corp veut acheter un outil d'IA qui trie automatiquement les CV et classe les candidats. La direction te demande ce que dit le règlement européen sur l'IA avant de signer.",
    card("Le règlement européen sur l'IA (AI Act)", "Défense", "🤖", "L'AI Act classe les systèmes d'IA selon leur risque : plus le risque est élevé, plus les obligations sont fortes.", [
      "Risque inacceptable : interdit (notation sociale, manipulation des personnes vulnérables…).",
      "Haut risque : recrutement, crédit, éducation, infrastructures critiques… avec gestion des risques, qualité des données, journalisation, contrôle humain et cybersécurité.",
      "Risque limité : obligation de transparence (dire qu'on parle à une IA, signaler les contenus générés).",
      "Risque minimal : pas d'obligation spécifique. Le règlement s'applique par étapes depuis 2025.",
    ], "Un tri de candidats peut changer la vie de quelqu'un."),
    choice("Dans quelle catégorie entre cet outil de tri de CV ?", [
      ["Haut risque : il influence l'accès à l'emploi", true, "Le recrutement figure dans la liste des usages à haut risque, avec des obligations strictes."],
      ["Risque minimal : c'est un simple outil de bureautique", false, "Il prend des décisions qui touchent directement des personnes."],
      ["Risque limité : il suffit de prévenir les candidats", false, "La transparence ne suffit pas pour un usage aussi sensible."],
      ["Interdit dans tous les cas", false, "Il est autorisé, mais encadré."],
    ]),
    "Contrat revu : contrôle humain, journaux et audit du fournisseur. Le robot recruteur reste sous surveillance.",
  ),
];
