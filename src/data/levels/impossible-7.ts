import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

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
  room(
    "impossible-105",
    "La clé volée trop tard",
    "Un attaquant a volé la clé privée du serveur TLS de serveur-corp.fr. Il avait aussi enregistré des mois de trafic chiffré. La direction veut savoir si ces anciennes conversations sont maintenant lisibles.",
    card("La confidentialité persistante (Forward Secrecy)", "Crypto", "🔐", "Avec des clés de session éphémères, voler la clé à long terme d'un serveur ne permet pas de déchiffrer le trafic passé.", [
      "Avec l'ancien échange de clés RSA de TLS, la clé de session voyageait chiffrée avec la clé du serveur : la clé volée ouvre tout l'historique.",
      "Avec (EC)DHE, chaque session crée sa propre paire de clés temporaire, oubliée juste après.",
      "La clé longue durée ne sert plus qu'à signer : la voler permet d'usurper le serveur à l'avenir, pas de lire le passé.",
      "TLS 1.3 impose la confidentialité persistante ; les messageries comme Signal renouvellent même les clés à chaque message.",
    ], "La clé du serveur chiffrait-elle ou signait-elle ?"),
    choice("Si le serveur utilisait uniquement TLS 1.3, que risque le trafic enregistré ?", [
      ["Il reste illisible : les clés éphémères des sessions ont disparu", true, "La clé volée ne permet pas de recalculer les clés de session passées. Il faut tout de même révoquer et remplacer le certificat."],
      ["Il devient entièrement lisible avec la clé volée", false, "Ce serait le cas avec l'échange de clés RSA, absent de TLS 1.3."],
      ["Seules les sessions de la dernière heure sont lisibles", false, "Aucune session passée n'est déchiffrable avec cette clé."],
      ["Rien à faire : le certificat peut rester en place", false, "L'attaquant pourrait se faire passer pour le serveur : il faut révoquer."],
    ]),
    "Certificat révoqué, nouvelle clé dans le HSM. Le passé reste scellé.",
  ),
  room(
    "impossible-106",
    "Calculer sans regarder",
    "Un hôpital partenaire veut confier à serveur-corp.fr le calcul de statistiques sur des données sensibles, sans jamais lui montrer les données en clair. L'équipe étudie le chiffrement homomorphe.",
    card("Le chiffrement homomorphe", "Crypto", "🧪", "Le chiffrement homomorphe permet de faire des calculs directement sur des données chiffrées : le résultat, une fois déchiffré, est le bon.", [
      "Partiellement homomorphe : une seule opération (addition ou multiplication), comme Paillier pour l'addition.",
      "Totalement homomorphe (FHE) : additions et multiplications à volonté, proposé par Craig Gentry en 2009.",
      "Le prestataire calcule sans voir les données ; seul le propriétaire de la clé lit le résultat.",
      "Limites : calculs beaucoup plus lents, chiffrés plus gros, et il faut toujours protéger la clé et limiter ce que révèle le résultat.",
    ], "Qui a besoin de la clé pour lire le résultat ?"),
    multi("Quelles affirmations sont vraies ?", [
      ["Le prestataire peut additionner des valeurs chiffrées sans les déchiffrer", true, "C'est le principe même du chiffrement homomorphe."],
      ["Seul le détenteur de la clé peut lire le résultat du calcul", true, "Le prestataire ne voit que des données chiffrées."],
      ["Les calculs sont nettement plus lents que sur des données en clair", true, "C'est aujourd'hui son principal frein."],
      ["Il rend inutile toute réflexion sur ce que le résultat révèle", false, "Un résultat trop précis peut encore trahir une personne."],
      ["Le prestataire reçoit la clé privée pour pouvoir calculer", false, "Justement non : il calcule sans la clé de déchiffrement."],
    ]),
    "Prototype validé : les statistiques sortent, les données de santé restent chiffrées.",
  ),
  room(
    "impossible-107",
    "L'algorithme gravé dans le code",
    "Le comité de sécurité de serveur-corp.fr veut préparer la migration vers la cryptographie post-quantique. Problème : dans plusieurs applications, l'algorithme de chiffrement est écrit en dur dans des centaines de fichiers. Changer d'algorithme prendrait des années.",
    card("La crypto-agilité", "Crypto", "🔄", "La crypto-agilité, c'est la capacité à changer d'algorithme ou de taille de clé rapidement, sans réécrire les applications.", [
      "Un algorithme peut être affaibli du jour au lendemain (SHA-1, RSA trop court, futur ordinateur quantique).",
      "Première étape : un inventaire des usages cryptographiques (où, quel algorithme, quelles clés, quelles données).",
      "Le code appelle une bibliothèque ou un service central, et l'algorithme est un paramètre de configuration.",
      "Les données et signatures indiquent l'algorithme utilisé, pour faire cohabiter ancien et nouveau pendant la transition (mode hybride).",
    ], "Qu'est-ce qui permet de changer d'algorithme sans tout réécrire ?"),
    choice("Quelle démarche rend le système vraiment crypto-agile ?", [
      ["Inventorier les usages, centraliser la crypto dans une bibliothèque configurable et étiqueter chaque donnée avec son algorithme", true, "Changer d'algorithme devient un changement de configuration, et l'ancien reste lisible pendant la transition."],
      ["Remplacer dès maintenant l'algorithme par un post-quantique, en dur, dans chaque fichier", false, "Tu recrées le même problème pour la prochaine migration."],
      ["Développer un algorithme maison secret", false, "La cryptographie maison est presque toujours plus faible que les standards."],
      ["Attendre qu'un ordinateur quantique existe pour agir", false, "Des données chiffrées aujourd'hui peuvent être stockées et déchiffrées plus tard."],
    ]),
    "Inventaire fait, crypto centralisée. La prochaine migration sera une ligne de configuration.",
  ),
  room(
    "impossible-108",
    "La faille qui ne touchait personne",
    "Une faille critique est publiée dans une bibliothèque présente dans le SBOM du logiciel que serveur-corp.fr vend à ses clients. Vingt clients appellent, inquiets. Or l'équipe pense que la fonction vulnérable n'est jamais appelée par le produit. Il faut le prouver et le communiquer proprement.",
    card("Le VEX (exploitabilité des vulnérabilités)", "Défense", "📑", "Un document VEX indique, pour chaque vulnérabilité d'un composant, si le produit est réellement touché, avec une justification lisible par les machines.", [
      "Le SBOM liste les composants ; le VEX dit si leurs failles concernent vraiment le produit.",
      "Statuts possibles : non concerné (not_affected), concerné (affected), corrigé (fixed), en cours d'analyse (under_investigation).",
      "Un statut « non concerné » doit être justifié, par exemple : le code vulnérable n'est pas présent, ou n'est jamais exécuté.",
      "Formats courants : CSAF, CycloneDX ou OpenVEX. Le VEX se met à jour à chaque nouvelle version du produit.",
    ], "On analyse avant d'affirmer, et on réévalue ensuite."),
    order("Remets les étapes de traitement de cette faille dans l'ordre :", [
      "Repérer dans le SBOM les produits qui contiennent la bibliothèque vulnérable",
      "Analyser si la fonction vulnérable est présente et atteignable dans le produit",
      "Publier un VEX avec le statut et sa justification (ici : code vulnérable jamais exécuté)",
      "Réévaluer et mettre à jour le VEX à chaque nouvelle version du produit",
    ]),
    "VEX publié avec justification. Les clients savent, preuves à l'appui, qu'ils ne sont pas exposés.",
  ),
];
