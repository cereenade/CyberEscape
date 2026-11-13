import type { RoomContent } from "@/lib/types";
import { card, choice, multi, order, phishing, room } from "./_build";

/** Salles 61 à 80 du niveau Facile. */
export const FACILE_5: RoomContent[] = [
  room(
    "facile-61",
    "La clé physique",
    "La directrice reçoit une petite clé USB avec un bouton doré : « C'est pour te connecter, plus besoin de codes SMS. »",
    card("Les passkeys et clés de sécurité", "Mots de passe", "🗝️", "Une connexion sans mot de passe, impossible à hameçonner.", [
      "Une passkey (ou clé FIDO2) prouve ton identité avec ton téléphone, ton empreinte ou une clé USB.",
      "Elle ne fonctionne que sur le vrai site : un faux site ne peut pas la réutiliser.",
      "C'est aujourd'hui la protection la plus solide contre le phishing.",
    ], "Une passkey peut-elle servir sur un faux site ?"),
    choice("Pourquoi une passkey protège-t-elle du phishing ?", [
      ["Elle est liée au vrai site et refuse de marcher sur un faux", true, "Même si tu cliques sur un faux lien, rien n'est volé."],
      ["Elle est plus jolie qu'un mot de passe", false, "Ce n'est pas une question d'apparence."],
      ["Elle change de couleur en cas d'attaque", false, "Ce n'est pas ainsi qu'elle fonctionne."],
    ]),
    "Passkey activée. Les faux sites n'ont plus rien à voler.",
  ),
  room(
    "facile-62",
    "L'extension miracle",
    "« Téléchargez des vidéos YouTube en un clic ! » L'extension de navigateur demande à « lire et modifier toutes vos données sur tous les sites ».",
    card("Les extensions de navigateur", "Web", "🧩", "Une extension peut voir tout ce que tu fais dans ton navigateur.", [
      "Avec la permission « tous les sites », elle peut lire tes mots de passe et tes mails.",
      "Installe peu d'extensions, venant d'éditeurs connus, et vérifie leurs permissions.",
      "Supprime celles que tu n'utilises plus.",
    ], "Que permet la permission « tous les sites » ?"),
    choice("Que fais-tu ?", [
      ["J'installe, tout le monde l'utilise", false, "Le nombre d'utilisateurs ne garantit rien."],
      ["Je refuse : la permission est bien trop large pour ce service", true, "Elle pourrait espionner toute ta navigation."],
      ["J'installe et je verrai plus tard", false, "Le mal peut être fait dès l'installation."],
    ]),
    "Extension refusée. Ta navigation reste privée.",
  ),
  room(
    "facile-63",
    "Le jeu craqué",
    "Sur un forum, un lien propose le dernier jeu à la mode, « gratuit et déjà cracké ». Il faut juste désactiver l'antivirus avant d'installer.",
    card("Les logiciels piratés", "Système", "🏴‍☠️", "Les cracks sont le moyen préféré pour cacher un malware.", [
      "Beaucoup de cracks contiennent des voleurs de mots de passe (infostealers) ou des mineurs de cryptomonnaie.",
      "Demander de désactiver l'antivirus est un énorme signal d'alarme.",
      "Les jeux gratuits légaux existent : utilise les boutiques officielles.",
    ], "Pourquoi te demande-t-on de couper l'antivirus ?"),
    choice("Quel est le vrai risque ?", [
      ["Aucun, c'est juste un jeu", false, "Le fichier peut contenir n'importe quoi."],
      ["Un malware qui vole tes mots de passe ou prend le contrôle du PC", true, "Et l'antivirus coupé ne pourra pas l'arrêter."],
      ["Le jeu sera un peu plus lent", false, "C'est bien plus grave que ça."],
    ]),
    "Tu n'as rien téléchargé. Ton PC et tes comptes sont saufs.",
  ),
  room(
    "facile-64",
    "La pub piégée",
    "En cherchant « ma banque » sur un moteur de recherche, le premier résultat est une annonce sponsorisée vers « ma-banque-connexion.net ».",
    card("Les publicités piégées", "Web", "📢", "Des escrocs achètent des publicités pour apparaître avant le vrai site.", [
      "Le premier résultat « Sponsorisé » n'est pas forcément le site officiel.",
      "Pour ta banque, utilise l'appli officielle ou un favori enregistré.",
      "Vérifie toujours l'adresse dans la barre avant de te connecter.",
    ], "Regarde bien la mention au-dessus du premier résultat."),
    choice("Comment accéder à ta banque en sécurité ?", [
      ["Cliquer sur le premier résultat sponsorisé", false, "C'est exactement le piège."],
      ["Passer par l'appli officielle ou un favori enregistré", true, "Tu es sûr d'arriver sur le vrai site."],
      ["Chercher « banque connexion rapide »", false, "Tu tomberas sur d'autres annonces."],
    ]),
    "Connexion par le favori. La fausse pub a été évitée.",
  ),
  room(
    "facile-65",
    "Les notifications envahissantes",
    "Un site de streaming affiche : « Cliquez sur Autoriser pour prouver que vous n'êtes pas un robot. » Depuis, ton navigateur crache des alertes « virus détecté ».",
    card("Les notifications de navigateur", "Web", "🔔", "Autoriser les notifications d'un site douteux, c'est lui ouvrir ton écran.", [
      "Un vrai test anti-robot ne demande jamais d'autoriser les notifications.",
      "Ces notifications affichent ensuite de fausses alertes et des arnaques.",
      "Retire l'autorisation dans les réglages du navigateur (Notifications → Bloquer).",
    ], "Où retirer l'autorisation donnée par erreur ?"),
    choice("Comment faire cesser les fausses alertes ?", [
      ["Installer l'antivirus proposé par l'alerte", false, "C'est une arnaque de plus."],
      ["Retirer l'autorisation de notifications de ce site dans les réglages", true, "Les alertes s'arrêtent immédiatement."],
      ["Racheter un ordinateur", false, "Ton ordinateur n'a rien."],
    ]),
    "Notifications bloquées. Le calme revient sur ton écran.",
  ),
  room(
    "facile-66",
    "L'enceinte qui écoute",
    "La salle de réunion a une enceinte connectée. Des sujets confidentiels y sont discutés tous les jours.",
    card("Les assistants vocaux", "Système", "🔊", "Un micro toujours prêt à écouter n'a rien à faire dans une salle confidentielle.", [
      "Les assistants vocaux écoutent en permanence le mot d'activation.",
      "Des enregistrements peuvent être envoyés sur des serveurs et parfois réécoutés.",
      "Coupe le micro (bouton physique) ou retire l'appareil des lieux sensibles.",
    ], "Quel bouton existe sur la plupart des enceintes ?"),
    choice("Que faire dans la salle de réunion ?", [
      ["Couper le micro ou retirer l'enceinte", true, "Plus rien ne peut être entendu."],
      ["Parler plus bas", false, "Le micro capte quand même."],
      ["Lui demander de ne pas écouter", false, "Ce n'est pas une mesure de sécurité."],
    ]),
    "Enceinte débranchée. Les réunions restent entre vous.",
  ),
  room(
    "facile-67",
    "Le réseau des invités",
    "Les visiteurs demandent le Wi-Fi. L'accueil leur donne le mot de passe du réseau principal, celui des serveurs.",
    card("Le réseau invité", "Réseau", "🛜", "Les invités et les objets connectés sur un réseau séparé.", [
      "Un réseau invité donne Internet sans accès aux autres appareils.",
      "Mets aussi les objets connectés (caméras, ampoules) sur un réseau séparé.",
      "Un appareil infecté ne pourra pas atteindre tes ordinateurs.",
    ], "Comment donner Internet sans donner accès au reste ?"),
    choice("Quelle est la bonne pratique ?", [
      ["Créer un réseau invité séparé", true, "Les visiteurs ont Internet, pas tes serveurs."],
      ["Changer le mot de passe principal chaque visite", false, "Fastidieux, et le visiteur accède quand même au réseau."],
      ["Refuser tout Wi-Fi aux visiteurs", false, "Possible, mais un réseau invité est plus pratique et sûr."],
    ]),
    "Réseau invité créé. Les serveurs sont hors de portée.",
  ),
  room(
    "facile-68",
    "La course du matin",
    "L'appli de sport du directeur publie ses courses en public. Le parcours démarre et finit chaque jour… devant chez lui.",
    card("Les applis de sport", "Social", "🏃", "Les traces GPS publiques révèlent ton adresse et tes habitudes.", [
      "Un trajet qui commence toujours au même endroit révèle ton domicile.",
      "Passe tes activités en privé et crée une zone de confidentialité autour de chez toi.",
      "Même des bases militaires ont été révélées par ces applis.",
    ], "Où commencent toutes les courses ?"),
    choice("Quel réglage règle le problème ?", [
      ["Activités privées + zone masquée autour du domicile", true, "Le point de départ n'est plus visible."],
      ["Courir plus vite", false, "Le trajet reste visible."],
      ["Changer de chaussures", false, "Aucun rapport."],
    ]),
    "Zone masquée. Ton adresse disparaît des cartes.",
  ),
  room(
    "facile-69",
    "Le recruteur généreux",
    "Message WhatsApp : « Gagnez 300 €/jour en aimant des vidéos ! Pour commencer, versez 50 € de frais d'inscription. »",
    card("Les fausses offres d'emploi", "Social", "💼", "Un vrai employeur ne te fait jamais payer pour travailler.", [
      "Les « missions » de likes rapportent d'abord un peu, puis demandent de plus en plus d'argent.",
      "Un salaire énorme pour un travail facile est toujours suspect.",
      "Un recruteur sérieux passe par un site d'entreprise ou une plateforme reconnue.",
    ], "Qui paie qui dans un vrai emploi ?"),
    choice("Que fais-tu ?", [
      ["Je verse les 50 €, c'est vite rentabilisé", false, "Tu ne reverras jamais cet argent."],
      ["Je bloque et je signale : un employeur ne fait pas payer", true, "C'est une arnaque classique."],
      ["J'envoie ma carte d'identité pour vérifier", false, "Tu offrirais en plus ton identité."],
    ]),
    "Contact bloqué. Tu n'as rien payé pour un faux job.",
  ),
  room(
    "facile-70",
    "Le placement miracle",
    "Une pub avec une célébrité promet de « transformer 250 € en 5 000 € en un mois grâce à la crypto ».",
    card("Les arnaques à l'investissement", "Social", "📈", "Un rendement garanti et énorme, ça n'existe pas.", [
      "Les fausses pubs utilisent des célébrités sans leur accord.",
      "Les plateformes affichent de faux gains pour te pousser à verser plus.",
      "Vérifie la liste noire de l'AMF avant tout placement.",
    ], "Un gain énorme et garanti, est-ce possible ?"),
    multi("Quels signaux d'arnaque vois-tu ?", [
      ["Un gain énorme et rapide promis", true, "Aucun placement honnête ne garantit ça."],
      ["Une célébrité qui en fait la promotion", true, "Son image est utilisée sans accord."],
      ["La plateforme n'est pas autorisée par l'AMF", true, "Les escrocs ne sont jamais enregistrés."],
      ["Le montant de départ est petit", true, "C'est fait pour que tu te lances sans réfléchir."],
      ["La publicité est en français", false, "Ce n'est pas un indice : les arnaques sont traduites dans toutes les langues."],
    ]),
    "Arnaque repérée. Tes économies restent sur ton compte.",
  ),
  room(
    "facile-71",
    "Le paiement par lien",
    "Sur un site d'annonces, un acheteur veut payer ta table « via le service de paiement sécurisé du site ». Il t'envoie un lien par SMS.",
    card("Le faux paiement sécurisé", "Social", "🔗", "Le paiement sécurisé se fait sur le site, jamais via un lien reçu.", [
      "Le lien mène à une copie du site qui demande ta carte bancaire « pour recevoir l'argent ».",
      "Pour recevoir de l'argent, tu n'as jamais à donner ton numéro de carte.",
      "Reste dans la messagerie et le système de paiement du site.",
    ], "Faut-il donner sa carte pour recevoir de l'argent ?"),
    choice("Que fais-tu ?", [
      ["Je clique et j'entre ma carte pour être payé", false, "Tu ne recevrais rien : ta carte serait débitée."],
      ["Je refuse et je reste sur le système de paiement du site", true, "Aucun lien extérieur, aucun risque."],
      ["Je donne mon IBAN et mon code de carte", false, "Le code de carte ne se donne jamais."],
    ]),
    "Faux acheteur démasqué. La table reste à vendre, ta carte en sécurité.",
  ),
  room(
    "facile-72",
    "Maman, j'ai changé de numéro",
    "SMS d'un numéro inconnu : « Coucou maman, j'ai cassé mon téléphone, c'est mon nouveau numéro. Tu peux me faire un virement urgent ? »",
    card("L'arnaque au proche en détresse", "Social", "🆘", "Un « proche » sur un nouveau numéro qui demande de l'argent : vérifie toujours.", [
      "Les escrocs envoient ce message à des milliers de numéros au hasard.",
      "Appelle ton proche sur son ancien numéro ou pose une question que lui seul connaît.",
      "Ne fais jamais de virement sans avoir parlé de vive voix.",
    ], "Comment vérifier qu'il s'agit vraiment de ton enfant ?"),
    choice("Quelle est la bonne réaction ?", [
      ["Faire le virement tout de suite", false, "C'est ce que veut l'escroc."],
      ["Appeler son enfant sur l'ancien numéro pour vérifier", true, "Tu découvriras qu'il va très bien."],
      ["Répondre en donnant ses codes bancaires", false, "Jamais."],
    ]),
    "Un appel a suffi. Ton enfant va bien, l'escroc repart bredouille.",
  ),
  room(
    "facile-73",
    "Le code WhatsApp",
    "« Coucou ! Je t'ai envoyé un code à 6 chiffres par erreur, tu peux me le renvoyer ? » écrit une amie sur WhatsApp.",
    card("Le vol de compte de messagerie", "Social", "💬", "Ce code permet d'installer TON compte sur le téléphone du pirate.", [
      "Le compte de ton amie a déjà été piraté, et le pirate vise maintenant le tien.",
      "Le code SMS de WhatsApp sert à activer ton compte sur un nouvel appareil.",
      "Active la « vérification en deux étapes » de WhatsApp avec un code PIN.",
    ], "À quoi sert un code d'activation WhatsApp ?"),
    choice("Que fais-tu ?", [
      ["Je renvoie le code, c'est mon amie", false, "Son compte est piraté : tu perdrais le tien."],
      ["Je ne donne rien et je préviens mon amie par un autre moyen", true, "Ton compte reste à toi et elle sait qu'elle est piratée."],
      ["Je donne le code mais je change mon mot de passe après", false, "Trop tard : le pirate aura déjà ton compte."],
    ]),
    "Code gardé. Tu as même aidé ton amie à récupérer son compte.",
  ),
  room(
    "facile-74",
    "La carte d'embarquement",
    "« En route pour Rome ✈️ » : photo de la carte d'embarquement, code-barres bien visible, publiée en story.",
    card("Les documents en photo", "Social", "🎫", "Un code-barres ou un QR code contient souvent bien plus qu'on ne croit.", [
      "Le code-barres d'une carte d'embarquement contient ton nom et le code de réservation.",
      "Avec, on peut modifier ou annuler ton vol sur le site de la compagnie.",
      "Même chose pour les billets de concert, les clés et les cartes bancaires.",
    ], "Que contient le code-barres ?"),
    choice("Pourquoi ne fallait-il pas publier cette photo ?", [
      ["Le code-barres permet d'accéder à la réservation", true, "On peut modifier ou annuler ton vol."],
      ["La photo est floue", false, "Le problème n'est pas la qualité."],
      ["Il ne faut jamais parler de voyage", false, "Le problème est le code, pas le voyage."],
    ]),
    "Story supprimée. Ton vol reste à toi.",
  ),
  room(
    "facile-75",
    "Le visiteur pressé",
    "Un livreur, les bras chargés, attend devant la porte à badge. Un employé lui tient la porte, par politesse.",
    card("Le talonnage", "Défense", "🚪", "Entrer derrière quelqu'un qui a badgé : la technique d'intrusion la plus simple.", [
      "Le talonnage (tailgating) exploite la politesse.",
      "Chacun doit badger, et les visiteurs passent par l'accueil.",
      "Tu peux dire poliment : « Je vous accompagne à l'accueil. »",
    ], "Par où doit passer un visiteur ?"),
    choice("Quelle est la bonne réaction ?", [
      ["Tenir la porte, il a les bras chargés", false, "N'importe qui peut entrer ainsi."],
      ["L'accompagner poliment à l'accueil", true, "Tu restes aimable et l'accès reste contrôlé."],
      ["Lui prêter son badge", false, "Pire encore."],
    ]),
    "Visiteur orienté vers l'accueil. Personne n'entre sans contrôle.",
  ),
  room(
    "facile-76",
    "Le bureau en désordre",
    "Le soir, le bureau du DRH : contrats sur la table, clé USB branchée, mot de passe Wi-Fi au mur. Le ménage passe à 20 h.",
    card("Le bureau rangé", "Défense", "🧹", "En partant, rien de confidentiel ne doit rester visible.", [
      "La politique du « bureau propre » : documents rangés et verrouillés, écrans éteints.",
      "Clés USB et ordinateurs portables rangés sous clé.",
      "Aucune information sensible affichée au mur.",
    ], "Que doit-on voir sur un bureau le soir ?"),
    multi("Que fallait-il ranger ?", [
      ["Les contrats", true, "Documents confidentiels."],
      ["La clé USB", true, "Elle peut contenir des données ou être volée."],
      ["Le mot de passe Wi-Fi affiché", true, "Une information d'accès ne s'affiche pas."],
      ["La plante verte", false, "Elle peut rester !"],
    ]),
    "Bureau rangé. Rien ne traîne pour les curieux.",
  ),
  room(
    "facile-77",
    "Le chatbot confident",
    "Pour gagner du temps, un employé colle le contrat confidentiel d'un client dans un assistant IA en ligne gratuit et demande un résumé.",
    card("L'IA et les données confidentielles", "Défense", "🤖", "Ce que tu colles dans un outil en ligne sort de ton entreprise.", [
      "Selon les services et leurs réglages, les textes peuvent être conservés ou servir à entraîner l'IA.",
      "Utilise seulement les outils validés par ton entreprise pour les documents internes.",
      "Retire les noms, chiffres et informations sensibles avant de demander de l'aide.",
    ], "Où partent les données collées dans un service en ligne ?"),
    choice("Quelle était la bonne pratique ?", [
      ["Utiliser un outil validé par l'entreprise ou anonymiser le texte", true, "Les données confidentielles restent maîtrisées."],
      ["Coller le contrat, c'est plus rapide", false, "Les données quittent l'entreprise."],
      ["Coller le contrat en plusieurs fois", false, "Le contenu part quand même."],
    ]),
    "Contrat gardé en interne. L'IA, oui, mais sans fuite.",
  ),
  room(
    "facile-78",
    "La démarche payante",
    "Pour refaire ta carte grise, le premier site trouvé demande 49 € de « frais de dossier ». Le service officiel est gratuit.",
    card("Les faux sites administratifs", "Web", "🏛️", "Des sites imitent les démarches officielles pour te faire payer.", [
      "Les démarches officielles se font sur des sites en .gouv.fr.",
      "Ces sites copient les couleurs de l'administration et facturent des démarches gratuites.",
      "Certains revendent aussi tes données personnelles.",
    ], "Par quoi se termine l'adresse d'un site officiel ?"),
    choice("Où faire la démarche ?", [
      ["Sur le premier site trouvé", false, "Il peut s'agir d'un intermédiaire payant ou d'une arnaque."],
      ["Sur le site officiel en .gouv.fr", true, "C'est le seul site officiel, souvent gratuit."],
      ["Sur un site qui ressemble beaucoup au site officiel", false, "Ressembler ne veut pas dire être officiel."],
    ]),
    "Démarche faite sur le site officiel. 49 € économisés.",
  ),
  room(
    "facile-79",
    "La boîte mail pleine",
    "Trois mails attendent dans la boîte de l'assistant. L'un d'eux est un piège.",
    card("Le faux quota dépassé", "Social", "📬", "« Votre boîte est pleine, reconnectez-vous » : un classique pour voler les identifiants.", [
      "Ce faux message mène vers une fausse page de connexion à ta messagerie.",
      "Ton fournisseur ne te demande pas de te reconnecter via un lien pour libérer de l'espace.",
      "Vérifie ton espace de stockage directement dans les réglages de ta messagerie.",
    ], "Inspecte les liens : où mènent-ils ?"),
    phishing([
      ["Support Messagerie", "noreply@messagerie-quota-alerte.com", "Votre boîte mail est pleine (99 %)", "Vos nouveaux messages seront supprimés. Reconnectez-vous dans les 2 heures pour augmenter votre quota gratuitement.", "Augmenter mon quota", "https://messagerie-quota-alerte.com/login", true, "Domaine sans rapport avec ta messagerie, urgence et demande de reconnexion : c'est une fausse page de connexion."],
      ["Julie (Compta)", "julie.martin@serveur-corp.fr", "Notes de frais de mars", "Salut, n'oublie pas de déposer tes notes de frais dans l'outil habituel avant vendredi.", "Outil notes de frais", "https://intranet.serveur-corp.fr/frais", false, "Collègue connue, domaine de l'entreprise, aucune demande de mot de passe."],
      ["Calendrier", "calendar@serveur-corp.fr", "Invitation : point d'équipe lundi 10 h", "Vous êtes invité au point d'équipe hebdomadaire.", "Répondre", "https://intranet.serveur-corp.fr/agenda", false, "Invitation interne habituelle, lien vers l'intranet."],
    ]),
    "Faux quota démasqué. Tes identifiants restent secrets.",
  ),
  room(
    "facile-80",
    "Le téléphone volé",
    "Dans le métro, on vient de te voler ton téléphone. Il contient tes mails pro et ton appli bancaire.",
    card("Perte ou vol du téléphone", "Défense", "🚨", "Agir vite limite les dégâts : localiser, verrouiller, effacer, bloquer.", [
      "Les services « Localiser » (Apple, Google) permettent de verrouiller ou d'effacer à distance.",
      "Appelle ton opérateur pour bloquer la ligne (et la carte SIM).",
      "Préviens ta banque et ton service informatique, puis porte plainte.",
    ], "Que fait-on en premier : protéger les données ou porter plainte ?"),
    order("Remets les actions dans l'ordre le plus efficace.", [
      "Verrouiller le téléphone à distance avec le service Localiser",
      "S'il reste introuvable, l'effacer à distance",
      "Porter plainte en donnant le numéro IMEI",
    ]),
    "Téléphone verrouillé, ligne bloquée. Le voleur n'a qu'un objet inutilisable.",
  ),
];
