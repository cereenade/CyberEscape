import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 81 à 100 du niveau Facile. */
export const FACILE_6: RoomContent[] = [
  room(
    "facile-81",
    "La carte SIM détournée",
    "Plus de réseau sur ton téléphone depuis une heure. Puis des mails : « Votre mot de passe a été modifié ». Quelqu'un a obtenu une nouvelle SIM à ton nom.",
    card("Le SIM swapping", "Social", "📶", "Un escroc convainc l'opérateur de transférer ton numéro sur sa carte SIM.", [
      "Il reçoit alors tes SMS, dont les codes de double authentification.",
      "Signal d'alerte : perte soudaine de réseau sans raison.",
      "Préfère une appli d'authentification ou une passkey aux codes SMS pour les comptes importants.",
    ], "Qui reçoit tes SMS quand ton numéro est transféré ?"),
    choice("Quelle mesure aurait le plus limité les dégâts ?", [
      ["Utiliser une appli d'authentification plutôt que les SMS", true, "Les codes ne dépendent plus de ton numéro de téléphone."],
      ["Changer de fond d'écran", false, "Aucun rapport."],
      ["Désactiver la double authentification", false, "Ce serait encore pire."],
    ]),
    "Opérateur prévenu, comptes repris. Tes codes ne passent plus par SMS.",
  ),
  room(
    "facile-82",
    "La messagerie vocale",
    "Le pirate appelle la messagerie vocale du standard et tape 0000. Il entend tous les messages, dont des codes d'accès laissés par un collègue.",
    card("Le code de la messagerie vocale", "Mots de passe", "📟", "Un répondeur avec le code par défaut se consulte à distance par n'importe qui.", [
      "Beaucoup de messageries ont un code par défaut (0000, 1234) jamais changé.",
      "Change-le pour un code personnel et ne laisse jamais d'information sensible en message vocal.",
      "Certaines attaques utilisent aussi la messagerie pour recevoir des codes de vérification par appel.",
    ], "Quel code avait gardé le standard ?"),
    choice("Que fallait-il faire ?", [
      ["Changer le code par défaut de la messagerie", true, "Plus personne ne peut l'écouter à distance."],
      ["Supprimer le message d'accueil", false, "Les messages restent accessibles."],
      ["Parler plus vite dans les messages", false, "Aucun effet."],
    ]),
    "Code changé. La messagerie ne parle plus aux inconnus.",
  ),
  room(
    "facile-83",
    "Le lien de partage",
    "Pour envoyer un dossier à un client, la chef de projet crée un lien cloud « Toute personne disposant du lien peut consulter ». Le lien finit dans un forum public.",
    card("Les liens de partage cloud", "Défense", "☁️", "« Toute personne disposant du lien » veut dire : vraiment n'importe qui.", [
      "Un lien public peut être transféré, indexé ou fuiter.",
      "Partage plutôt avec des personnes nommées, et ajoute une date d'expiration.",
      "Fais régulièrement le tri dans tes anciens partages.",
    ], "Qui peut ouvrir un lien « public » ?"),
    choice("Quel réglage était le plus sûr ?", [
      ["Partager seulement avec l'adresse du client + date d'expiration", true, "Seul le client y accède, et pour un temps limité."],
      ["Toute personne disposant du lien, sans expiration", false, "C'est ce qui a causé la fuite."],
      ["Mettre le lien en majuscules", false, "Ça ne change rien."],
    ]),
    "Partage restreint au client. Le lien public est désactivé.",
  ),
  room(
    "facile-84",
    "Le mail à 200 personnes",
    "L'association envoie son invitation à ses 200 adhérents… avec toutes les adresses visibles dans le champ « À ».",
    card("La copie cachée (Cci)", "Défense", "✉️", "Pour écrire à beaucoup de monde, mets les adresses en Cci.", [
      "Dans « À » ou « Cc », chaque destinataire voit toutes les adresses.",
      "En « Cci » (copie cachée), chacun ne voit que la sienne.",
      "Afficher les adresses de tous peut être une fuite de données personnelles.",
    ], "Quel champ cache les adresses aux autres destinataires ?"),
    answer("Dans quel champ fallait-il mettre les 200 adresses ? (son abréviation)", ["cci", "bcc", "copie cachee", "copie carbone invisible"], {
      placeholder: "ex. À, Cc…",
    }),
    "Prochain envoi en Cci. Les adresses restent privées.",
  ),
  room(
    "facile-85",
    "Le mauvais destinataire",
    "En tapant « Mar », la messagerie propose « Marc Dupont (externe) » au lieu de « Marc Durand (RH) ». Le fichier des salaires part chez le mauvais Marc.",
    card("L'erreur de destinataire", "Défense", "📤", "L'autocomplétion des adresses cause beaucoup de fuites.", [
      "Relis toujours le destinataire avant d'envoyer un fichier sensible.",
      "Beaucoup de messageries permettent de retarder l'envoi de quelques secondes pour annuler.",
      "Si c'est trop tard : préviens tout de suite ton responsable ou le service informatique.",
    ], "Quelle option permet d'annuler un mail juste après l'envoi ?"),
    multi("Quelles mesures auraient évité l'erreur ?", [
      ["Relire le destinataire avant d'envoyer", true, "Le réflexe le plus simple."],
      ["Activer le délai d'annulation d'envoi", true, "Quelques secondes pour corriger."],
      ["Écrire le mail en gras", false, "Aucun effet sur le destinataire."],
      ["Protéger le fichier par un mot de passe envoyé à part", true, "Même mal envoyé, il resterait illisible."],
    ]),
    "Erreur signalée à temps. La prochaine fois, relecture et délai d'envoi.",
  ),
  room(
    "facile-86",
    "Le train bondé",
    "Dans le TGV, le voisin de siège lit par-dessus ton épaule pendant que tu modifies le budget confidentiel du projet.",
    card("Travailler en public", "Défense", "🚆", "Dans les transports, ton écran et tes appels sont publics.", [
      "Un filtre de confidentialité rend l'écran illisible de côté.",
      "Évite de travailler sur des documents sensibles dans les lieux publics.",
      "Attention aussi aux appels : les noms de clients s'entendent à plusieurs rangs.",
    ], "Un accessoire rend l'écran illisible de côté."),
    choice("Quelle est la meilleure solution ?", [
      ["Utiliser un filtre de confidentialité, ou travailler sur autre chose", true, "Le voisin ne voit plus rien."],
      ["Monter la luminosité au maximum", false, "Ce sera encore plus lisible."],
      ["Fermer les yeux du voisin", false, "Hum…"],
    ]),
    "Filtre posé. Le budget reste entre toi et ton écran.",
  ),
  room(
    "facile-87",
    "Les vieux comptes",
    "Le pirate retrouve ton compte sur un forum oublié de 2014. Même mot de passe que ta messagerie actuelle…",
    card("Les comptes oubliés", "Mots de passe", "🕸️", "Chaque vieux compte inutilisé est une porte d'entrée de plus.", [
      "Les vieux sites sont souvent moins protégés et peuvent fuiter.",
      "Supprime les comptes que tu n'utilises plus.",
      "Cherche ton adresse dans ta boîte mail (« bienvenue », « inscription ») pour les retrouver.",
    ], "Que faire des comptes inutilisés ?"),
    choice("Quel est le bon réflexe ?", [
      ["Supprimer les comptes inutilisés", true, "Moins de comptes, moins de risques de fuite."],
      ["Les garder au cas où", false, "Ils restent des cibles."],
      ["Leur donner tous le même mot de passe", false, "C'est justement le problème."],
    ]),
    "Vieux comptes supprimés. Ta surface d'attaque a fondu.",
  ),
  room(
    "facile-88",
    "Les pièces gratuites",
    "Un site promet « 10 000 pièces gratuites pour ton jeu préféré ». Il faut juste entrer ton identifiant et ton mot de passe du jeu.",
    card("Le vol de comptes de jeux", "Social", "🎮", "Monnaie gratuite, skins offerts : l'appât pour voler les comptes de joueurs.", [
      "Les comptes de jeux valent de l'argent : ils sont revendus avec leurs objets.",
      "Aucun générateur de monnaie gratuite n'existe : c'est toujours un piège.",
      "Active la double authentification sur tes comptes de jeux.",
    ], "Que demande-t-on vraiment sur ce site ?"),
    choice("Que va-t-il se passer si tu entres tes identifiants ?", [
      ["Tu reçois 10 000 pièces", false, "Ces générateurs n'existent pas."],
      ["Ton compte est volé et revendu", true, "C'est le seul but du site."],
      ["Rien de spécial", false, "Tes identifiants sont envoyés au pirate."],
    ]),
    "Tu n'as rien saisi. Ton compte et tes objets sont saufs.",
  ),
  room(
    "facile-89",
    "Le cadeau Discord",
    "Message privé d'un ami sur Discord : « Abonnement Nitro offert pour toi 🎁 » avec un lien vers « discorcl-gift.com ».",
    card("Les faux cadeaux sur les messageries", "Social", "🎁", "Un ami piraté peut t'envoyer un faux cadeau sans le savoir.", [
      "Le lien imite le vrai site avec une lettre changée (discorcl au lieu de discord).",
      "Il demande de se connecter ou de scanner un QR code, puis vole le compte.",
      "Les vrais cadeaux s'ouvrent directement dans l'application.",
    ], "Relis l'adresse lettre par lettre."),
    choice("Qu'est-ce qui trahit l'arnaque ?", [
      ["L'adresse discorcl-gift.com imite discord", true, "Une lettre changée : c'est un faux site."],
      ["Le cadeau vient d'un ami", false, "Son compte est peut-être piraté."],
      ["Le message contient un emoji", false, "Pas un indice fiable."],
    ]),
    "Faux cadeau ignoré. Tu as prévenu ton ami que son compte était piraté.",
  ),
  room(
    "facile-90",
    "La revente du téléphone",
    "Tu revends ton ancien smartphone. L'acheteur te demande s'il est « bien vidé ».",
    card("Réinitialiser avant de revendre", "Défense", "♻️", "Avant de vendre un appareil, déconnecte tes comptes puis remets-le à zéro.", [
      "Supprimer ses photos à la main ne suffit pas : comptes, messages et mots de passe restent.",
      "Déconnecte d'abord ton compte Apple ou Google (sinon l'appareil reste bloqué).",
      "Retire la carte SIM et la carte mémoire.",
    ], "Que faut-il faire avant la réinitialisation ?"),
    order("Remets les étapes dans l'ordre.", [
      "Sauvegarder ses données",
      "Se déconnecter de son compte Apple ou Google",
      "Réinitialiser le téléphone aux paramètres d'usine",
      "Retirer la carte SIM et la carte mémoire avant de le remettre",
    ]),
    "Téléphone remis à zéro. L'acheteur ne trouvera rien de toi.",
  ),
  room(
    "facile-91",
    "L'amende surprise",
    "SMS : « Amende impayée de 35 €. Sans paiement sous 24 h, majoration à 375 €. Payez sur amendes-gouv-paiement.fr ».",
    card("Les fausses amendes", "Social", "🚔", "Les avis d'amende ne s'envoient pas par SMS avec un lien de paiement.", [
      "La menace d'une majoration énorme sert à te faire paniquer.",
      "Le site officiel est antai.gouv.fr ou amendes.gouv.fr, et l'avis arrive par courrier ou dans ton espace officiel.",
      "Signale ce SMS en le transférant au 33700.",
    ], "Le domaine se termine-t-il par .gouv.fr ?"),
    choice("Que fais-tu ?", [
      ["Je paie vite pour éviter la majoration", false, "C'est un faux site."],
      ["Je ne clique pas et je signale le SMS au 33700", true, "C'est le numéro de signalement des SMS indésirables."],
      ["Je réponds STOP", false, "Cela confirme que ton numéro est actif."],
    ]),
    "SMS signalé au 33700. La fausse amende finit à la corbeille.",
  ),
  room(
    "facile-92",
    "Le service client introuvable",
    "Ton colis n'arrive pas. Tu cherches « service client transporteur » et appelles le premier numéro trouvé : un 08 99 surtaxé, où l'on te demande ta carte.",
    card("Les faux services clients", "Social", "☎️", "Des escrocs se font passer pour le service client d'une marque.", [
      "Ils publient des numéros surtaxés ou de faux comptes sur les réseaux sociaux.",
      "Trouve le contact uniquement sur le site officiel ou dans l'appli.",
      "Un service client n'a pas besoin du code de ta carte ni de tes mots de passe.",
    ], "Où trouver le vrai contact d'une entreprise ?"),
    choice("Comment trouver le bon numéro ?", [
      ["Le premier résultat du moteur de recherche", false, "Il peut s'agir d'un faux."],
      ["La page contact du site officiel ou l'appli", true, "C'est la seule source fiable."],
      ["Un numéro donné en commentaire sur les réseaux", false, "Les escrocs en publient partout."],
    ]),
    "Vrai service client trouvé. Pas de surtaxe, pas d'arnaque.",
  ),
  room(
    "facile-93",
    "Le concours de vote",
    "« Vote pour moi au concours photo ! » écrit une amie sur Instagram. Le lien demande de te connecter à Instagram pour voter.",
    card("Les faux votes", "Social", "🗳️", "Un faux concours demande tes identifiants pour voler ton compte.", [
      "La page de connexion est une copie : tes identifiants partent chez le pirate.",
      "Le compte volé envoie ensuite le même message à tous tes contacts.",
      "Un vrai vote ne demande jamais ton mot de passe de réseau social.",
    ], "Pourquoi un concours aurait-il besoin de ton mot de passe ?"),
    choice("Que fais-tu ?", [
      ["Je me connecte pour aider mon amie", false, "Ton compte serait volé à son tour."],
      ["Je ne me connecte pas et je préviens mon amie", true, "Son compte est sûrement déjà piraté."],
      ["Je vote avec le compte d'un autre ami", false, "Il serait piraté à ta place."],
    ]),
    "Tu n'as pas voté… et tu as sauvé ton compte.",
  ),
  room(
    "facile-94",
    "La box oubliée",
    "Le routeur du bureau n'a pas été mis à jour depuis 6 ans. Une faille connue permet de le contrôler à distance.",
    card("Mettre à jour la box et le routeur", "Réseau", "📡", "Le routeur est la porte d'entrée de ton réseau : il doit être à jour.", [
      "Les routeurs ont aussi des failles, corrigées par des mises à jour (firmware).",
      "Active les mises à jour automatiques quand elles existent.",
      "Un vieux routeur qui n'est plus mis à jour doit être remplacé.",
    ], "Comment s'appelle le logiciel interne d'un routeur ?"),
    choice("Que faire ?", [
      ["Mettre à jour le firmware, ou remplacer le routeur s'il n'est plus suivi", true, "La faille est corrigée."],
      ["Le débrancher le week-end", false, "La faille reste là en semaine."],
      ["Le cacher dans un placard", false, "Les attaques passent par le réseau, pas par la vue."],
    ]),
    "Routeur à jour. La faille est refermée.",
  ),
  room(
    "facile-95",
    "Le signalement des SMS",
    "Tu reçois chaque jour des SMS frauduleux. Ta collègue te dit qu'on peut les signaler gratuitement.",
    card("Le 33700", "Défense", "📲", "Transfère les SMS et appels frauduleux au 33700 pour les faire bloquer.", [
      "Le 33700 est le service gratuit de signalement des spams vocaux et SMS en France.",
      "Pour un site frauduleux, il existe aussi la plateforme PHAROS ou cybermalveillance.gouv.fr.",
      "Signaler aide à bloquer les numéros pour tout le monde.",
    ], "Un numéro à 5 chiffres."),
    answer("À quel numéro transférer un SMS frauduleux ?", ["33700", "33 700"], { placeholder: "Numéro à 5 chiffres" }),
    "SMS transféré au 33700. Un escroc de moins pour tout le monde.",
  ),
  room(
    "facile-96",
    "La fuite annoncée",
    "Un site où tu es inscrit t'envoie un mail : « Nous avons subi une fuite de données. Les mots de passe étaient chiffrés. »",
    card("Réagir à une fuite de données", "Mots de passe", "💧", "Même « chiffrés », change ton mot de passe après une fuite.", [
      "Change le mot de passe du site, et partout où tu l'as réutilisé.",
      "Méfie-toi des mails de phishing qui vont utiliser les infos volées.",
      "Vérifie que le mail d'alerte est authentique : connecte-toi au site directement, pas via le lien.",
    ], "Faut-il cliquer sur le lien du mail d'alerte ?"),
    multi("Quelles actions faire ?", [
      ["Changer le mot de passe en allant directement sur le site", true, "Sans passer par un lien qui pourrait être faux."],
      ["Changer ce mot de passe partout où il était réutilisé", true, "Sinon les autres comptes sont menacés."],
      ["Être encore plus vigilant face aux mails suspects", true, "Les données volées servent à des arnaques ciblées."],
      ["Ne rien faire puisque c'était chiffré", false, "Un chiffrement peut être faible ou cassé."],
    ]),
    "Mots de passe changés, vigilance au maximum. La fuite ne te touchera pas.",
  ),
  room(
    "facile-97",
    "La validation surprise",
    "23 h, ton téléphone vibre : « Est-ce bien vous qui essayez de vous connecter ? Approuver / Refuser ». Tu es en train de regarder un film.",
    card("Une demande que tu n'as pas faite", "Mots de passe", "🙅", "Si tu n'as rien demandé, refuse : quelqu'un a ton mot de passe.", [
      "Une demande de validation signifie que quelqu'un a saisi ton mot de passe.",
      "Refuse, puis change ton mot de passe immédiatement.",
      "Préviens le service informatique s'il s'agit d'un compte pro.",
    ], "Que signifie une demande de validation que tu n'as pas déclenchée ?"),
    choice("Que fais-tu ?", [
      ["J'approuve pour que ça arrête de vibrer", false, "Tu ouvrirais la porte au pirate."],
      ["Je refuse, puis je change mon mot de passe", true, "Le pirate est bloqué et son mot de passe ne sert plus à rien."],
      ["J'ignore la notification", false, "Le pirate a ton mot de passe : il faut le changer."],
    ]),
    "Connexion refusée, mot de passe changé. Le pirate reste dehors.",
  ),
  room(
    "facile-98",
    "Le fichier des mots de passe",
    "Sur le bureau du serveur partagé, un fichier Excel s'appelle « mots_de_passe_TOUS.xlsx ».",
    card("Ne pas stocker ses mots de passe en clair", "Mots de passe", "📊", "Un fichier de mots de passe non protégé est la première chose qu'un pirate cherche.", [
      "Les pirates cherchent les fichiers nommés « mdp », « password », « identifiants ».",
      "Un gestionnaire de mots de passe chiffre tout derrière un mot de passe maître.",
      "Pour une équipe, il existe des gestionnaires partagés avec des droits par personne.",
    ], "Quel outil chiffre les mots de passe pour toute une équipe ?"),
    choice("Par quoi remplacer ce fichier ?", [
      ["Un gestionnaire de mots de passe d'équipe", true, "Tout est chiffré et chacun n'accède qu'à ce qui le concerne."],
      ["Le même fichier, renommé « recettes.xlsx »", false, "Le contenu reste en clair."],
      ["Un fichier texte sur le bureau", false, "Toujours en clair."],
    ]),
    "Fichier supprimé, coffre-fort d'équipe en place.",
  ),
  room(
    "facile-99",
    "Les captures d'écran",
    "Pour demander de l'aide, un collègue publie une capture d'écran sur un forum public. On y voit sa clé de licence et l'adresse du serveur interne.",
    card("Les captures d'écran trop bavardes", "Défense", "📸", "Une capture d'écran peut contenir bien plus que ce que tu veux montrer.", [
      "Noms, adresses mail, onglets ouverts, clés, adresses internes… tout est visible.",
      "Recadre et masque les informations sensibles avant de partager.",
      "Attention : un simple flou peut parfois être annulé ; préfère un rectangle opaque.",
    ], "Comment masquer proprement une information sur une capture ?"),
    choice("Que fallait-il faire avant de publier ?", [
      ["Recadrer et masquer les infos sensibles avec un rectangle opaque", true, "Plus rien d'exploitable n'est visible."],
      ["Réduire la taille de l'image", false, "Le texte reste souvent lisible."],
      ["Ajouter un filtre noir et blanc", false, "Ça ne cache rien."],
    ]),
    "Capture nettoyée. Le forum n'apprend rien de trop.",
  ),
  room(
    "facile-100",
    "La sortie du niveau",
    "Dernière porte du niveau. Le pirate a laissé un message : « Tu as appris les bons réflexes… mais dans quel ordre réagir face à un mail suspect ? »",
    card("Le réflexe face au doute", "Défense", "🏁", "Stop, vérifie, signale : trois étapes qui évitent la plupart des pièges.", [
      "Prends le temps : l'urgence est l'arme numéro un des escrocs.",
      "Vérifie par un autre canal (appel, site officiel tapé toi-même).",
      "Signale au service informatique ou sur les plateformes officielles, puis supprime.",
    ], "Ne te précipite pas : que fais-tu en tout premier ?"),
    order("Remets le réflexe dans l'ordre.", [
      "Ne pas cliquer et prendre le temps de réfléchir",
      "Vérifier par un autre moyen (appel, site officiel)",
      "Signaler le message",
      "Supprimer le message",
    ]),
    "Niveau Facile terminé : tu as les bons réflexes du quotidien !",
  ),
];
