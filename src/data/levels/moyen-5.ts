import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 61 à 80 du niveau Moyen. */
export const MOYEN_5: RoomContent[] = [
  room(
    "moyen-61",
    "L'alphabet radio",
    "Le talkie-walkie du vigile grésille : « Papa – Hotel – India – Sierra – Hotel ». Un mot de passe épelé par radio ?",
    card("L'alphabet radio", "Social", "📻", "Chaque lettre a un mot pour être comprise sans erreur : Alpha, Bravo, Charlie…", [
      "L'alphabet de l'OTAN sert à épeler par téléphone ou radio sans confusion.",
      "On ne garde que la première lettre de chaque mot.",
      "Épeler un mot de passe au téléphone, même ainsi, reste une très mauvaise idée.",
    ], "Garde la première lettre de chaque mot."),
    answer("Quel mot a été épelé ?", ["phish"], { placeholder: "Le mot" }),
    "PHISH. Le vigile ne devait vraiment pas dire ça à la radio.",
  ),
  room(
    "moyen-62",
    "Le mot de passe transformé",
    "La politique impose des chiffres et symboles. Résultat, l'admin a choisi « P@$$w0rd ». Il pense être tranquille.",
    card("Le leet speak", "Mots de passe", "🔣", "Remplacer des lettres par des chiffres (a→@, o→0) ne trompe pas les outils de cassage.", [
      "Les logiciels de cassage testent automatiquement toutes ces substitutions.",
      "« P@$$w0rd » est dans toutes les listes de mots de passe connus.",
      "La longueur et le hasard comptent bien plus que les symboles.",
    ], "Les outils de cassage connaissent-ils ces substitutions ?"),
    choice("« P@$$w0rd » est-il un bon mot de passe ?", [
      ["Oui, il contient des symboles et des chiffres", false, "Les règles sont respectées, mais il est connu de tous les outils."],
      ["Non, c'est « password » déguisé, testé en quelques secondes", true, "Les substitutions sont automatiquement essayées."],
      ["Oui, s'il est écrit en majuscules", false, "Ça ne change rien."],
    ]),
    "Mot de passe remplacé par une vraie phrase de passe.",
  ),
  room(
    "moyen-63",
    "La liste des pirates",
    "Sur la clé USB du pirate : un fichier rockyou.txt de 14 millions de lignes. « 123456 », « iloveyou », « princess »…",
    card("Les dictionnaires de mots de passe", "Mots de passe", "📚", "Des listes de vrais mots de passe issus de fuites, testées en premier.", [
      "rockyou.txt vient d'une fuite de 2009 : 14 millions de mots de passe réels.",
      "Les attaques par dictionnaire testent ces listes avant toute force brute.",
      "Un mot de passe déjà vu dans une fuite tombe en quelques secondes.",
    ], "D'où viennent ces mots de passe ?"),
    choice("Que contient ce genre de fichier ?", [
      ["De vrais mots de passe issus de fuites de données", true, "Les gens réutilisent souvent les mêmes."],
      ["Des mots de passe générés au hasard", false, "Ce sont des mots de passe humains, donc prévisibles."],
      ["Des clés de chiffrement", false, "Ce sont des mots de passe."],
    ]),
    "Ton mot de passe n'est dans aucune liste : il a été généré aléatoirement.",
  ),
  room(
    "moyen-64",
    "Le Wi-Fi d'un autre âge",
    "Le vieux point d'accès de l'entrepôt utilise encore le chiffrement WEP. Le pirate sourit.",
    card("WEP, WPA2, WPA3", "Réseau", "📶", "Tous les chiffrements Wi-Fi ne se valent pas.", [
      "WEP est cassé depuis les années 2000 : quelques minutes suffisent.",
      "WPA2 reste correct avec un long mot de passe ; WPA3 est le plus solide aujourd'hui.",
      "Un Wi-Fi ouvert ou en WEP doit être remplacé.",
    ], "Lequel est le plus récent ?"),
    order("Classe du moins sûr au plus sûr.", ["Réseau ouvert (sans chiffrement)", "WEP", "WPA2", "WPA3"]),
    "Point d'accès passé en WPA3. Le pirate range ses outils.",
  ),
  room(
    "moyen-65",
    "Le réseau invisible",
    "L'admin a masqué le nom du réseau Wi-Fi (SSID caché) et autorisé seulement certaines adresses MAC. « Personne ne pourra entrer », dit-il.",
    card("Les fausses protections Wi-Fi", "Réseau", "🙈", "Cacher le SSID ou filtrer les MAC ne protège presque rien.", [
      "Un SSID caché apparaît quand même dans le trafic des appareils qui s'y connectent.",
      "Une adresse MAC autorisée se copie facilement en écoutant le réseau.",
      "La vraie protection : WPA2/WPA3 avec un long mot de passe.",
    ], "Peut-on copier une adresse MAC ?"),
    multi("Pourquoi ces mesures sont-elles faibles ?", [
      ["Le nom caché se retrouve dans le trafic réseau", true, "Les appareils qui s'y connectent le révèlent."],
      ["Une adresse MAC autorisée peut être copiée", true, "Il suffit d'en écouter une et de l'usurper."],
      ["Elles remplacent avantageusement le chiffrement WPA", false, "Au contraire, le chiffrement est indispensable."],
      ["Elles compliquent surtout la vie des utilisateurs légitimes", true, "Pour très peu de sécurité en échange."],
    ]),
    "Les vraies protections sont en place : WPA3 et mot de passe long.",
  ),
  room(
    "moyen-66",
    "L'intermédiaire",
    "Au bureau, toutes les connexions web passent par une machine qui filtre les sites et garde un journal.",
    card("Le proxy", "Réseau", "🚦", "Un intermédiaire qui relaie les connexions web, les filtre et les journalise.", [
      "Le proxy de l'entreprise bloque les sites dangereux et enregistre les visites.",
      "Ses journaux sont précieux pour une enquête : qui a visité quoi, et quand.",
      "Un proxy ne chiffre rien à lui seul : ce n'est pas un VPN.",
    ], "Un intermédiaire entre toi et le web."),
    choice("Comment s'appelle cette machine ?", [
      ["Un proxy", true, "Il relaie, filtre et journalise les connexions."],
      ["Un serveur DNS", false, "Le DNS traduit les noms, il ne relaie pas les pages."],
      ["Un switch", false, "Le switch relie les machines du réseau local."],
    ]),
    "Grâce aux journaux du proxy, tu retrouves qui a visité le site piégé.",
  ),
  room(
    "moyen-67",
    "Les trois relais",
    "Le pirate se connecte via un navigateur spécial : sa connexion rebondit sur trois relais chiffrés avant d'arriver au site.",
    card("Tor", "Réseau", "🧅", "Un réseau qui fait passer ta connexion par plusieurs relais pour masquer ton adresse.", [
      "Chaque relais ne connaît que le précédent et le suivant (routage en oignon).",
      "Le site visité voit l'adresse du dernier relais (nœud de sortie), pas la tienne.",
      "Tor sert aux journalistes et défenseurs des libertés… et aussi aux attaquants.",
    ], "On l'appelle le routage « en oignon »."),
    answer("Comment s'appelle ce réseau d'anonymisation ?", ["tor", "the onion router"], { placeholder: "Trois lettres" }),
    "Connexions venant de Tor repérées. Elles sont désormais signalées dans le SIEM.",
  ),
  room(
    "moyen-68",
    "Seuls les deux bouts",
    "« Même nous, nous ne pouvons pas lire vos messages », affirme une messagerie. Comment est-ce possible ?",
    card("Le chiffrement de bout en bout", "Crypto", "🔏", "Seuls l'expéditeur et le destinataire ont les clés pour lire le message.", [
      "Le message est chiffré sur ton téléphone et déchiffré seulement sur celui du destinataire.",
      "Le serveur transporte un message illisible.",
      "Attention : si ton téléphone est compromis, le message est lisible sur ton téléphone.",
    ], "Où se trouvent les clés de déchiffrement ?"),
    choice("Pourquoi le service ne peut-il pas lire les messages ?", [
      ["Seuls les téléphones des correspondants ont les clés", true, "Le serveur ne voit que des données chiffrées."],
      ["Le service promet de ne pas regarder", false, "C'est technique, pas une simple promesse."],
      ["Les messages sont supprimés tout de suite", false, "Ce n'est pas ce qui les protège."],
    ]),
    "Messagerie chiffrée de bout en bout adoptée pour les échanges sensibles.",
  ),
  room(
    "moyen-69",
    "L'avertissement rouge",
    "Le navigateur affiche : « Votre connexion n'est pas privée. NET::ERR_CERT_DATE_INVALID ». Un collègue clique sur « Continuer quand même ».",
    card("Les erreurs de certificat", "Web", "⚠️", "Un avertissement de certificat signale qu'on ne peut pas vérifier l'identité du site.", [
      "Un certificat expiré, mal configuré ou faux déclenche cet écran.",
      "Ça peut être une simple négligence… ou une interception (homme du milieu).",
      "Ne saisis jamais de mot de passe après avoir forcé un tel avertissement.",
    ], "DATE_INVALID : que lui arrive-t-il ?"),
    choice("Que signifie ce code d'erreur ?", [
      ["Le certificat du site a expiré (ou n'est pas encore valide)", true, "Ou l'horloge de ton ordinateur est fausse."],
      ["Le site est en panne", false, "Le site répond, c'est son certificat qui pose problème."],
      ["Ton mot de passe est faux", false, "Aucun rapport avec ton mot de passe."],
    ]),
    "Certificat renouvelé par l'admin. Plus d'avertissement, plus de risque.",
  ),
  room(
    "moyen-70",
    "L'empreinte du navigateur",
    "Tu as tout refusé : cookies, publicité… Pourtant un site te reconnaît d'une visite à l'autre.",
    card("Le fingerprinting", "Web", "🖐️", "Ton navigateur a une empreinte presque unique : écran, polices, langue, version…", [
      "En combinant des dizaines de détails, un site peut te reconnaître sans cookie.",
      "Les navigateurs orientés vie privée brouillent ou uniformisent ces détails.",
      "Le mode navigation privée ne suffit pas à l'éviter.",
    ], "Pas besoin de cookie : on combine plein de petits détails."),
    choice("Comment le site te reconnaît-il ?", [
      ["Grâce à l'empreinte unique de ton navigateur", true, "Écran, polices, langue… la combinaison est presque unique."],
      ["Il lit dans ta mémoire", false, "Non, il observe les caractéristiques du navigateur."],
      ["Par hasard", false, "C'est volontaire et précis."],
    ]),
    "Navigateur protégé contre le fingerprinting. Tu redeviens un parmi d'autres.",
  ),
  room(
    "moyen-71",
    "L'image invisible",
    "Le mail de prospection contient une image de 1 pixel transparent, chargée depuis « tracker.example/open?id=8841 ».",
    card("Les pixels espions", "Web", "🕵️", "Une image invisible qui prévient l'expéditeur que tu as ouvert le mail.", [
      "Au chargement de l'image, le serveur apprend l'heure, ton adresse IP et ton appareil.",
      "L'identifiant dans l'adresse dit exactement quel destinataire a ouvert.",
      "Bloquer le chargement automatique des images limite ce traçage.",
    ], "Que se passe-t-il quand l'image se charge ?"),
    multi("Qu'apprend l'expéditeur quand tu ouvres le mail ?", [
      ["Que tu as ouvert le mail, et à quelle heure", true, "Le chargement de l'image le signale."],
      ["Ton adresse IP approximative", true, "Elle est visible par le serveur de l'image."],
      ["Le contenu de tes autres mails", false, "Le pixel n'y a pas accès."],
      ["Quel destinataire précis a ouvert", true, "Grâce à l'identifiant unique dans l'adresse."],
    ]),
    "Images bloquées par défaut. Les pixels espions restent aveugles.",
  ),
  room(
    "moyen-72",
    "Spam, phishing ou arnaque ?",
    "Le filtre antispam hésite sur un message. Pub non sollicitée, vol d'identifiants ou escroquerie financière : à toi de trancher.",
    card("Spam, phishing et scam", "Social", "🗂️", "Tous indésirables, mais pas pour la même raison.", [
      "Spam : publicité non sollicitée, envoyée en masse.",
      "Phishing (hameçonnage) : imiter un service pour voler identifiants ou données.",
      "Scam (escroquerie) : te convaincre de payer (faux héritage, faux investissement).",
    ], "Le phishing vise surtout tes identifiants."),
    choice("« Votre compte Netflix est suspendu, reconnectez-vous ici » est…", [
      ["Du spam", false, "Ce n'est pas une simple publicité."],
      ["Du phishing", true, "Il imite un service pour voler tes identifiants."],
      ["Une offre commerciale", false, "C'est une tentative de vol d'identifiants."],
    ]),
    "Bien classé. Chaque catégorie se signale à sa façon.",
  ),
  room(
    "moyen-73",
    "Le domaine bizarre",
    "Dans un lien, tu remarques « xn--pple-43d.com ». Le navigateur, lui, affiche une adresse qui ressemble à apple.com.",
    card("Le punycode", "Web", "🌍", "Les noms de domaine avec caractères spéciaux sont codés en « xn-- ».", [
      "Le punycode permet les domaines avec accents ou autres alphabets.",
      "Les pirates utilisent des lettres cyrilliques identiques aux lettres latines.",
      "Un domaine commençant par xn-- mérite une vérification attentive.",
    ], "Que signifie le préfixe xn-- ?"),
    choice("Que cache cette adresse ?", [
      ["Un domaine avec une lettre étrangère qui imite apple.com", true, "Le « а » cyrillique ressemble au « a » latin."],
      ["Le vrai site d'Apple", false, "Le vrai domaine n'est pas codé en punycode."],
      ["Une adresse IP", false, "C'est un nom de domaine codé."],
    ]),
    "Faux domaine démasqué grâce au préfixe xn--.",
  ),
  room(
    "moyen-74",
    "Les étiquettes",
    "Le DSI veut que chaque document soit étiqueté selon sa sensibilité. Range ces niveaux du plus ouvert au plus protégé.",
    card("La classification des données", "Défense", "🏷️", "On protège une information selon sa sensibilité.", [
      "Public : peut être diffusé à tous (plaquette commerciale).",
      "Interne : réservé aux salariés (organigramme).",
      "Confidentiel puis secret : accès très restreint (contrats, données clients, fusions).",
    ], "Du plus ouvert au plus restreint."),
    order("Classe du plus ouvert au plus protégé.", ["Public", "Interne", "Confidentiel", "Secret"]),
    "Documents étiquetés. Chacun sait ce qui peut sortir ou pas.",
  ),
  room(
    "moyen-75",
    "La sauvegarde du dimanche",
    "Sauvegarde complète le dimanche, puis chaque soir seulement les fichiers modifiés depuis la veille. Le rançongiciel frappe jeudi matin.",
    card("Sauvegarde complète et incrémentielle", "Défense", "💾", "Une sauvegarde incrémentielle ne copie que ce qui a changé depuis la dernière sauvegarde.", [
      "Complète : tout est copié, c'est long mais simple à restaurer.",
      "Incrémentielle : rapide, mais la restauration nécessite la complète + toutes les incrémentielles.",
      "Différentielle : tout ce qui a changé depuis la dernière complète.",
    ], "De quoi a-t-on besoin pour revenir à mercredi soir ?"),
    choice("Pour restaurer l'état de mercredi soir, il faut…", [
      ["Seulement la sauvegarde de mercredi", false, "Elle ne contient que les changements de mercredi."],
      ["La complète de dimanche + les incrémentielles de lundi, mardi et mercredi", true, "On rejoue chaque changement dans l'ordre."],
      ["Seulement la complète de dimanche", false, "Tu perdrais trois jours de travail."],
    ]),
    "Restauration réussie jusqu'à mercredi soir. Le rançongiciel a perdu.",
  ),
  room(
    "moyen-76",
    "Les deux disques",
    "« Pas besoin de sauvegarde, le serveur a deux disques en RAID 1 qui se copient en permanence », affirme le stagiaire.",
    card("RAID n'est pas une sauvegarde", "Défense", "🪞", "Le RAID protège d'une panne de disque, pas d'une suppression ou d'un rançongiciel.", [
      "En RAID 1, chaque écriture est copiée sur les deux disques… y compris les fichiers chiffrés par un rançongiciel.",
      "Une suppression accidentelle est supprimée des deux côtés.",
      "Il faut en plus de vraies sauvegardes, hors ligne ou isolées.",
    ], "Que se passe-t-il sur le 2e disque quand un fichier est chiffré ?"),
    choice("Le stagiaire a-t-il raison ?", [
      ["Oui, deux copies valent une sauvegarde", false, "Les deux copies sont modifiées en même temps."],
      ["Non : un rançongiciel chiffrerait les deux disques à la fois", true, "Le RAID copie aussi les dégâts."],
      ["Oui, si les disques sont neufs", false, "L'âge des disques n'y change rien."],
    ]),
    "Vraies sauvegardes ajoutées en plus du RAID.",
  ),
  room(
    "moyen-77",
    "Le deuxième mardi",
    "Chaque mois, le même jour, l'équipe système installe une grosse vague de correctifs sur tous les postes Windows.",
    card("Le Patch Tuesday", "Système", "🗓️", "Microsoft publie ses correctifs de sécurité le deuxième mardi de chaque mois.", [
      "Les équipes informatiques planifient leurs mises à jour autour de cette date.",
      "Les attaquants étudient aussi les correctifs pour attaquer ceux qui tardent à les installer.",
      "Les failles critiques peuvent avoir des correctifs d'urgence hors calendrier.",
    ], "C'est le deuxième… quel jour ?"),
    answer("Quel jour de la semaine Microsoft publie-t-il ses correctifs ?", ["mardi", "le mardi", "tuesday"], { placeholder: "Un jour" }),
    "Correctifs installés dans la semaine. Les attaquants arrivent trop tard.",
  ),
  room(
    "moyen-78",
    "La faille du jour zéro",
    "Une faille est exploitée par des pirates alors que l'éditeur ne la connaît même pas encore. Aucun correctif n'existe.",
    card("Les failles zero-day", "Système", "0️⃣", "Une faille inconnue de l'éditeur, donc sans correctif disponible.", [
      "« Zéro jour » : l'éditeur a eu zéro jour pour la corriger.",
      "On se protège par la défense en profondeur : moindre privilège, segmentation, détection (EDR).",
      "Une fois le correctif publié, la faille devient « connue » : il faut l'installer vite.",
    ], "Combien de jours l'éditeur a-t-il eu pour réagir ?"),
    multi("Qu'est-ce qui aide face à une zero-day ?", [
      ["Limiter les droits des utilisateurs", true, "Une exploitation réussie fait moins de dégâts."],
      ["Un EDR qui détecte les comportements anormaux", true, "Il repère l'attaque même sans signature connue."],
      ["Attendre le correctif sans rien faire", false, "Il faut limiter les risques en attendant."],
      ["Segmenter le réseau", true, "L'attaquant a du mal à se propager."],
    ]),
    "Défense en profondeur en place. La zero-day reste contenue.",
  ),
  room(
    "moyen-79",
    "Le bac à sable",
    "Une pièce jointe suspecte est ouverte automatiquement dans une machine isolée, qui observe ce qu'elle fait avant de la livrer.",
    card("La sandbox", "Défense", "🏖️", "Un environnement isolé où l'on exécute un fichier suspect pour observer son comportement.", [
      "Si le fichier tente de contacter un serveur pirate ou de chiffrer des fichiers, il est bloqué.",
      "Les malwares évolués essaient de détecter les sandbox pour ne rien faire.",
      "C'est une analyse dynamique, complémentaire de l'antivirus.",
    ], "Un lieu isolé pour jouer sans risque."),
    choice("Comment s'appelle cet environnement ?", [
      ["Une sandbox (bac à sable)", true, "On y observe le fichier sans risque pour le réseau."],
      ["Un pare-feu", false, "Il filtre les connexions mais n'exécute pas de fichiers."],
      ["Un VPN", false, "Il chiffre les connexions."],
    ]),
    "La sandbox a vu le fichier contacter un serveur pirate : il est bloqué.",
  ),
  room(
    "moyen-80",
    "La lettre en code",
    "Sur un post-it du pirate : « 112 97 115 115 101 114 101 108 108 101 ». Un indice vers la salle suivante ?",
    card("Les codes ASCII", "Crypto", "🔢", "Chaque caractère correspond à un nombre : a = 97, b = 98…", [
      "Les minuscules vont de 97 (a) à 122 (z), les majuscules de 65 (A) à 90 (Z).",
      "L'atelier convertit ces nombres décimaux en texte.",
      "C'est un encodage : n'importe qui peut le lire, il ne protège rien.",
    ], "Utilise la conversion décimal → texte."),
    answer("Quel mot est caché ?", ["passerelle"], {
      tools: ["decimal", "hex", "binary"],
      workshopInput: "112 97 115 115 101 114 101 108 108 101",
      placeholder: "Le mot",
    }),
    "« passerelle » : la porte suivante s'ouvre.",
  ),
];
