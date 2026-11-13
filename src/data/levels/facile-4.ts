import type { RoomContent } from "@/lib/types";
import { card, choice, multi, order, phishing, room } from "./_build";

/** Salles 41 à 60 du niveau Facile. */
export const FACILE_4: RoomContent[] = [
  room(
    "facile-41",
    "Le colis fantôme",
    "SMS reçu : « Votre colis est bloqué en douane. Réglez 1,99 € de frais ici : colis-relivraison.info ». Tu n'attends aucun colis.",
    card("Les petits frais de livraison", "Social", "📦", "Un petit montant à payer sert surtout à voler ta carte bancaire.", [
      "1,99 €, ça paraît inoffensif : c'est fait exprès pour que tu ne réfléchisses pas.",
      "Le vrai but est de récupérer ton numéro de carte, puis de valider de gros paiements.",
      "Pour suivre un colis, passe toujours par le site ou l'appli officielle du transporteur.",
    ], "Le montant est petit… mais qu'est-ce qu'on te demande de saisir ?"),
    choice("Que vise vraiment ce message ?", [
      ["Te faire payer 1,99 €", false, "Le petit montant n'est qu'un appât."],
      ["Récupérer les données de ta carte bancaire", true, "Une fois la carte saisie, les pirates font de vrais achats avec."],
      ["Te livrer un colis oublié", false, "Tu n'attends rien et le site n'est pas celui d'un transporteur."],
    ]),
    "Message supprimé. Ta carte reste dans ton portefeuille.",
  ),
  room(
    "facile-42",
    "La webcam qui s'allume",
    "Le voyant de la webcam du poste de l'accueil s'allume tout seul. Personne n'est en visio.",
    card("Protéger sa webcam", "Système", "📹", "Un voyant allumé sans raison peut signaler un logiciel espion.", [
      "Certains malwares (RAT) prennent le contrôle de la caméra et du micro.",
      "Un cache-webcam coulissant coûte quelques euros et bloque l'image à coup sûr.",
      "Vérifie aussi quelles applications ont le droit d'utiliser la caméra dans les réglages.",
    ], "Une solution simple, physique, et qui marche à tous les coups."),
    multi("Quelles réactions sont utiles ?", [
      ["Mettre un cache sur la webcam", true, "Plus aucune image ne peut être capturée."],
      ["Vérifier les applications autorisées à utiliser la caméra", true, "On repère une application qui n'a rien à faire là."],
      ["Lancer une analyse antivirus / EDR", true, "Un logiciel espion doit être détecté et supprimé."],
      ["Ignorer : c'est sûrement un bug", false, "Un voyant qui s'allume seul mérite toujours une vérification."],
    ]),
    "Caméra masquée, poste analysé. L'espion est aveugle.",
  ),
  room(
    "facile-43",
    "Le profil grand ouvert",
    "Le compte Instagram de la stagiaire est public : photos du badge, de son bureau, de sa rue… Le pirate prend des notes.",
    card("Profil public ou privé", "Social", "👁️", "Ce que tu publies en public, tout le monde peut l'utiliser contre toi.", [
      "Un profil public est visible par n'importe qui, y compris les escrocs.",
      "Badge, nom d'entreprise, adresse, habitudes : de quoi préparer une arnaque crédible.",
      "Passe ton compte en privé et trie tes abonnés.",
    ], "Qui peut voir un profil public ?"),
    choice("Quel réglage limite le plus les risques ?", [
      ["Passer le compte en privé et accepter seulement les gens qu'on connaît", true, "Seules les personnes choisies voient les publications."],
      ["Ajouter plus de hashtags", false, "Ça rend les publications encore plus visibles."],
      ["Changer de photo de profil", false, "Les publications restent visibles par tous."],
    ]),
    "Compte privé. Le pirate ne voit plus qu'un cadenas.",
  ),
  room(
    "facile-44",
    "Les vacances en direct",
    "« Trop bien, 3 semaines à Bali ! 🌴 » publié en public, avec la photo de la maison vide la veille du départ.",
    card("Annoncer son absence", "Social", "🏝️", "Publier en direct qu'on est loin, c'est prévenir les cambrioleurs.", [
      "Les cambrioleurs surveillent aussi les réseaux sociaux.",
      "Partage tes photos de vacances au retour, ou seulement à tes proches.",
      "Évite de montrer ton adresse ou l'extérieur de ton domicile.",
    ], "Quand vaut-il mieux partager ses photos de vacances ?"),
    choice("Quel est le meilleur réflexe ?", [
      ["Publier au retour, ou en privé pour ses proches", true, "Personne ne sait que la maison est vide."],
      ["Publier tous les jours en public avec la localisation", false, "C'est un calendrier offert aux cambrioleurs."],
      ["Publier seulement la photo de la maison", false, "C'est justement ce qu'il ne faut pas montrer."],
    ]),
    "Photos gardées pour le retour. La maison reste tranquille.",
  ),
  room(
    "facile-45",
    "Le coup de foudre en ligne",
    "Depuis deux mois, « Alex », rencontré en ligne, est adorable. Il ne peut jamais faire de visio… et aujourd'hui il a besoin de 800 € pour un billet d'avion.",
    card("L'arnaque sentimentale", "Social", "💔", "Une fausse relation construite pour finir par demander de l'argent.", [
      "L'escroc crée un lien affectif pendant des semaines avant de parler d'argent.",
      "Il refuse toujours la visio ou trouve une excuse pour ne pas se rencontrer.",
      "Une urgence financière (billet, hôpital, douane) arrive toujours à un moment.",
    ], "Quel signal revient dans toutes ces arnaques ?"),
    multi("Quels signaux doivent alerter ?", [
      ["Il refuse toujours la visio", true, "Il cache son vrai visage."],
      ["Il demande de l'argent pour une urgence", true, "C'est le but de toute la relation."],
      ["La relation est très intense très vite", true, "C'est une technique pour faire baisser ta garde."],
      ["Il aime le même groupe de musique que toi", false, "Pas suspect en soi."],
    ]),
    "Tu as reconnu l'arnaque. « Alex » n'aura pas un centime.",
  ),
  room(
    "facile-46",
    "Le numéro de la banque",
    "Ton téléphone affiche le vrai numéro de ta banque. Le « conseiller » parle d'un paiement suspect et te demande de valider une opération dans l'appli pour l'annuler.",
    card("L'usurpation de numéro", "Social", "📞", "Le numéro affiché peut être falsifié : il ne prouve rien.", [
      "Les escrocs peuvent faire apparaître n'importe quel numéro (spoofing).",
      "Une banque ne te demandera jamais de valider une opération pour en « annuler » une autre.",
      "Raccroche, puis rappelle toi-même le numéro au dos de ta carte.",
    ], "Valider une opération, c'est l'autoriser, pas l'annuler."),
    choice("Que fais-tu ?", [
      ["Je valide, c'est le numéro officiel", false, "Le numéro affiché peut être truqué."],
      ["Je raccroche et je rappelle le numéro au dos de ma carte", true, "Tu es sûr de parler à ta vraie banque."],
      ["Je donne le code reçu par SMS pour prouver mon identité", false, "Ce code sert à valider un paiement de l'escroc."],
    ]),
    "Tu as rappelé ta vraie banque. Aucune opération suspecte n'existait.",
  ),
  room(
    "facile-47",
    "Le post-it sous le clavier",
    "En soulevant le clavier du comptable, le pirate trouve un post-it : « session : Compta2026! ».",
    card("Le mot de passe noté", "Mots de passe", "📝", "Un mot de passe écrit près de l'ordinateur n'est plus secret.", [
      "Sous le clavier, sur l'écran, dans le tiroir : ce sont les premiers endroits fouillés.",
      "Un gestionnaire de mots de passe retient tout à ta place, en sécurité.",
      "Si tu dois vraiment noter un mot de passe, garde-le sur toi, jamais près du poste.",
    ], "Où ranger ses mots de passe sans avoir à les retenir ?"),
    choice("Quelle est la meilleure solution pour le comptable ?", [
      ["Utiliser un gestionnaire de mots de passe", true, "Il n'a plus qu'un seul mot de passe maître à retenir."],
      ["Cacher le post-it dans le tiroir", false, "C'est le deuxième endroit fouillé."],
      ["Prendre un mot de passe plus court pour le retenir", false, "Il serait plus facile à deviner."],
    ]),
    "Post-it détruit, gestionnaire installé. Le pirate repart les mains vides.",
  ),
  room(
    "facile-48",
    "La phrase secrète",
    "Le système demande un nouveau mot de passe d'au moins 16 caractères. L'employé panique : « Je ne pourrai jamais retenir ça ! »",
    card("La phrase de passe", "Mots de passe", "💬", "Plusieurs mots au hasard : long, solide et facile à retenir.", [
      "La longueur compte plus que les symboles compliqués.",
      "« Girafe-Violon-Nuage-42 » est bien plus solide que « P@ss1 » et plus facile à retenir.",
      "Les mots doivent être choisis au hasard, pas une phrase connue ou une citation.",
    ], "Quelle option est à la fois longue et mémorisable ?"),
    choice("Quel mot de passe est le meilleur ?", [
      ["P@ssw0rd!", false, "Court et dans toutes les listes de mots de passe connus."],
      ["Girafe-Violon-Nuage-42", true, "Long, aléatoire, et facile à retenir."],
      ["azertyuiopqsdfgh", false, "Long, mais c'est une suite de touches du clavier : très prévisible."],
    ]),
    "Phrase de passe adoptée. Solide et facile à retenir.",
  ),
  room(
    "facile-49",
    "Le téléphone sans code",
    "Le téléphone pro oublié sur la table s'ouvre d'un simple glissement de doigt. Mails, contacts, appli bancaire : tout est accessible.",
    card("Verrouiller son smartphone", "Défense", "📱", "Un téléphone sans code, c'est une porte ouverte sur toute ta vie.", [
      "Active un code à 6 chiffres minimum, ou la biométrie (empreinte, visage).",
      "Règle le verrouillage automatique à 30 secondes ou 1 minute.",
      "Évite les codes évidents : 000000, 123456, ta date de naissance.",
    ], "Que faut-il activer en premier ?"),
    choice("Quel réglage protège le mieux ce téléphone ?", [
      ["Un code à 6 chiffres non évident + verrouillage automatique", true, "Plus personne n'y accède sans toi."],
      ["Le code 1234", false, "C'est l'un des codes les plus essayés."],
      ["Baisser la luminosité de l'écran", false, "Ça n'empêche personne de l'utiliser."],
    ]),
    "Téléphone verrouillé. Tes données restent à toi.",
  ),
  room(
    "facile-50",
    "La borne de recharge",
    "À la gare, une borne USB gratuite propose de recharger ton téléphone. Le pirate a eu accès à la borne la veille.",
    card("La recharge USB publique", "Système", "🔌", "Un port USB transporte aussi des données, pas seulement du courant.", [
      "Une borne trafiquée peut tenter d'accéder au téléphone par le câble (juice jacking).",
      "Utilise ton propre chargeur sur une prise électrique, ou une batterie externe.",
      "Si le téléphone demande « Faire confiance à cet appareil ? », réponds non.",
    ], "Qu'est-ce qui ne transporte que du courant ?"),
    choice("Quelle option est la plus sûre ?", [
      ["Brancher son propre chargeur sur une prise électrique", true, "Une prise murale ne transmet aucune donnée."],
      ["Utiliser le câble fourni par la borne", false, "Le câble lui-même peut être piégé."],
      ["Accepter « Faire confiance » pour charger plus vite", false, "Tu autoriserais l'accès à tes données."],
    ]),
    "Rechargé sur ta propre prise. La borne piégée n'a rien obtenu.",
  ),
  room(
    "facile-51",
    "L'imprimante bavarde",
    "Sur l'imprimante partagée traînent depuis ce matin trois feuilles : la liste des salaires de l'équipe.",
    card("Les impressions oubliées", "Défense", "🖨️", "Un document oublié à l'imprimante est un document volé.", [
      "Récupère tes impressions immédiatement.",
      "Beaucoup d'imprimantes proposent l'impression sécurisée : le document sort seulement quand tu badges.",
      "Les documents sensibles se détruisent au broyeur, pas à la poubelle.",
    ], "Une option fait attendre le document jusqu'à ce que tu sois là."),
    choice("Quelle mesure évite ce problème ?", [
      ["L'impression sécurisée avec badge ou code", true, "Le document ne sort qu'en ta présence."],
      ["Imprimer en noir et blanc", false, "Ça ne change rien à la confidentialité."],
      ["Imprimer en plus petit", false, "Ça reste lisible par n'importe qui."],
    ]),
    "Feuilles récupérées, impression sécurisée activée.",
  ),
  room(
    "facile-52",
    "La poubelle du bureau",
    "Le pirate fouille les poubelles derrière l'immeuble. Il y trouve des relevés bancaires et un organigramme complet.",
    card("Jeter ses documents", "Défense", "🗑️", "Les poubelles sont une mine d'or pour préparer une attaque.", [
      "Fouiller les poubelles a même un nom : le dumpster diving.",
      "Un organigramme permet d'imiter un chef ; un relevé permet une fraude.",
      "Broie les documents sensibles (coupe croisée) avant de les jeter.",
    ], "Que faut-il faire du papier avant de le jeter ?"),
    choice("Que faire des documents sensibles ?", [
      ["Les déchirer en deux", false, "On les recolle facilement."],
      ["Les passer au broyeur", true, "Ils deviennent illisibles."],
      ["Les mettre au recyclage", false, "Ils restent lisibles dans le bac."],
    ]),
    "Tout est passé au broyeur. Les poubelles ne parlent plus.",
  ),
  room(
    "facile-53",
    "La promo trop belle",
    "Une console dernier cri à 89 € au lieu de 549 €, sur « super-destockage-france.shop », site créé il y a 5 jours.",
    card("Les faux sites marchands", "Web", "🛒", "Un prix incroyable sur un site inconnu est presque toujours une arnaque.", [
      "Le site encaisse et n'envoie jamais rien, ou vole ta carte.",
      "Vérifie les mentions légales, les avis sur des sites indépendants, l'âge du site.",
      "Paiement par virement ou carte cadeau seulement ? Fuis.",
    ], "Un prix 80 % moins cher, sur un site tout neuf…"),
    multi("Quels éléments doivent alerter ?", [
      ["Le prix est beaucoup trop bas", true, "C'est l'appât classique."],
      ["Le site a été créé il y a 5 jours", true, "Les faux sites vivent quelques semaines puis disparaissent."],
      ["Le site utilise HTTPS", false, "Le cadenas ne garantit pas l'honnêteté du vendeur."],
      ["Aucun avis indépendant n'existe sur le site", true, "Un vrai commerçant laisse des traces."],
    ]),
    "Tu as fermé l'onglet. 89 € économisés… et ta carte aussi.",
  ),
  room(
    "facile-54",
    "Le code de validation",
    "Un acheteur te contacte pour ton vélo en vente : « Je t'envoie l'argent, donne-moi juste le code que tu vas recevoir par SMS pour confirmer. »",
    card("Le code SMS ne se partage pas", "Social", "🔢", "Un code reçu par SMS sert à valider TON action : ne le donne jamais.", [
      "Ce code valide un paiement, une connexion ou un changement de compte.",
      "Recevoir de l'argent ne nécessite jamais de donner un code.",
      "Lis bien le SMS : il dit souvent « ne communiquez jamais ce code ».",
    ], "Pour recevoir de l'argent, a-t-on besoin d'un code ?"),
    choice("Que fais-tu ?", [
      ["Je donne le code, il veut juste payer", false, "Le code va lui servir à prendre le contrôle de ton compte ou à payer à ta place."],
      ["Je refuse : un code SMS ne se donne jamais", true, "Personne n'en a besoin pour te payer."],
      ["Je donne seulement la moitié du code", false, "Il ne faut rien donner du tout."],
    ]),
    "Code gardé. Le faux acheteur disparaît aussitôt.",
  ),
  room(
    "facile-55",
    "Le message de chantage",
    "Mail effrayant : « J'ai piraté ta webcam et j'ai des vidéos de toi. Ton mot de passe est Soleil2019. Paie 500 € en bitcoin sous 48 h. »",
    card("Le chantage par e-mail", "Social", "😱", "Une menace envoyée à des milliers de personnes en espérant que certaines paient.", [
      "L'ancien mot de passe vient d'une fuite de données publique, pas d'un piratage de ta webcam.",
      "Il n'y a aucune vidéo : c'est du bluff envoyé en masse.",
      "Ne paie pas, ne réponds pas, change le mot de passe cité s'il sert encore, et signale le mail.",
    ], "D'où peut venir un vieux mot de passe ?"),
    choice("Quelle est la bonne réaction ?", [
      ["Payer vite pour éviter la diffusion", false, "Il n'y a rien à diffuser, et payer fait de toi une cible."],
      ["Ne pas payer, changer ce mot de passe s'il sert encore, signaler", true, "C'est une arnaque de masse basée sur une vieille fuite."],
      ["Répondre pour négocier", false, "Répondre confirme que ton adresse est active."],
    ]),
    "Mail signalé. Le maître chanteur n'a rien, et toi non plus à craindre.",
  ),
  room(
    "facile-56",
    "La photocopie d'identité",
    "Une agence de location demande une copie de ta carte d'identité par mail. Le pirate rêve de mettre la main dessus.",
    card("Protéger sa pièce d'identité", "Défense", "🪪", "Une copie de pièce d'identité suffit pour ouvrir des comptes à ton nom.", [
      "Ajoute un filigrane : « Copie pour l'agence X, location du 12/03, ne vaut pas pour autre usage ».",
      "L'État propose un outil gratuit pour ça : filigrane.beta.gouv.fr.",
      "Envoie-la seulement aux organismes qui en ont vraiment besoin.",
    ], "Qu'ajouter sur la copie pour qu'elle ne serve qu'une fois ?"),
    choice("Comment envoyer cette copie ?", [
      ["Avec un filigrane indiquant le destinataire et l'usage", true, "Une copie volée devient inutilisable ailleurs."],
      ["En couleur et en haute résolution", false, "Elle serait encore plus facile à réutiliser."],
      ["Sur un groupe WhatsApp pour que l'agence la trouve", false, "Tout le groupe pourrait la récupérer."],
    ]),
    "Copie filigranée. Elle ne servira qu'à l'agence.",
  ),
  room(
    "facile-57",
    "Le partage d'écran",
    "En pleine visio avec un client, la commerciale partage tout son écran. Une notification apparaît : « Code de connexion : 482 913 ».",
    card("Partager son écran", "Défense", "🖥️", "Partager tout son écran, c'est montrer aussi ses notifications et ses onglets.", [
      "Partage seulement la fenêtre utile, pas l'écran entier.",
      "Active le mode « Ne pas déranger » avant une présentation.",
      "Ferme les onglets et documents confidentiels avant la réunion.",
    ], "Qu'est-ce qui est partagé quand on partage « l'écran entier » ?"),
    multi("Quelles bonnes pratiques auraient évité ça ?", [
      ["Partager uniquement la fenêtre de la présentation", true, "Les autres fenêtres restent invisibles."],
      ["Activer le mode Ne pas déranger", true, "Plus aucune notification ne s'affiche."],
      ["Augmenter le volume", false, "Aucun rapport."],
      ["Fermer les documents confidentiels avant", true, "Rien ne peut s'afficher par erreur."],
    ]),
    "Réunion propre, notifications coupées. Rien n'a fuité.",
  ),
  room(
    "facile-58",
    "Ai-je été piraté ?",
    "La presse annonce une fuite massive chez un site de jeux où tu as un compte. Tu veux savoir si ton adresse est concernée.",
    card("Vérifier les fuites", "Mots de passe", "🔍", "Des services sérieux te disent si ton adresse apparaît dans une fuite connue.", [
      "Le site « Have I Been Pwned » recense des milliards de comptes ayant fuité.",
      "Si ton adresse y figure, change le mot de passe du site concerné, et partout où tu l'as réutilisé.",
      "Active la double authentification sur les comptes importants.",
    ], "Que faire si ton adresse apparaît dans la fuite ?"),
    order("Remets les actions dans l'ordre.", [
      "Vérifier son adresse sur un service de fuites connu",
      "Changer le mot de passe du site concerné",
      "Changer ce mot de passe partout où il était réutilisé",
      "Activer la double authentification",
    ]),
    "Comptes vérifiés et sécurisés. La fuite ne te touche plus.",
  ),
  room(
    "facile-59",
    "Les codes de secours",
    "Ton téléphone est tombé dans un lac. Problème : il servait à la double authentification de ton compte mail.",
    card("Les codes de secours", "Mots de passe", "🛟", "Des codes à usage unique pour te connecter si tu perds ton téléphone.", [
      "À l'activation de la double authentification, le site propose une liste de codes de secours.",
      "Imprime-les ou range-les dans ton gestionnaire de mots de passe.",
      "Chaque code ne sert qu'une fois.",
    ], "Que propose le site quand on active la double authentification ?"),
    choice("Qu'aurait-il fallu prévoir ?", [
      ["Garder les codes de secours en lieu sûr", true, "Ils permettent de se reconnecter sans le téléphone."],
      ["Désactiver la double authentification", false, "Le compte serait bien moins protégé."],
      ["Noter son mot de passe sur le téléphone", false, "Le téléphone est au fond du lac…"],
    ]),
    "Grâce aux codes de secours, tu récupères ton compte.",
  ),
  room(
    "facile-60",
    "Le mail des impôts",
    "Trois mails sont arrivés le même jour. L'un d'eux est un piège.",
    card("Les faux remboursements", "Social", "💶", "Un remboursement inattendu est l'appât préféré des escrocs.", [
      "Les impôts ne demandent jamais tes coordonnées bancaires par mail pour te rembourser.",
      "Regarde l'adresse réelle de l'expéditeur et celle du lien.",
      "En cas de doute, connecte-toi toi-même à ton espace officiel.",
    ], "Inspecte les liens : vers où mènent-ils vraiment ?"),
    phishing([
      ["Médiathèque", "contact@mediatheque-ville.fr", "Rappel : livre à rendre", "Bonjour, le livre « Le Petit Prince » est à rendre avant samedi. Merci !", "Mon compte lecteur", "https://mediatheque-ville.fr/compte", false, "Un rappel banal, sans demande de données, avec un lien vers le vrai site."],
      ["Service des impôts", "remboursement@impots-gouv-fr.com", "Vous avez droit à un remboursement de 312,40 €", "Suite à un nouveau calcul, un remboursement est en attente. Saisissez votre carte bancaire sous 24 h pour le recevoir.", "Recevoir mon remboursement", "https://impots-gouv-fr.com/remboursement", true, "Faux domaine (impots-gouv-fr.com), urgence, et demande de carte bancaire : les impôts remboursent par virement, sans rien demander par mail."],
      ["Club de foot", "secretariat@asfootball.fr", "Planning des matchs", "Voici le planning de la saison. À dimanche !", "Voir le planning", "https://asfootball.fr/planning", false, "Message attendu, pas de demande sensible, lien cohérent avec l'expéditeur."],
    ]),
    "Faux remboursement démasqué. Les vrais impôts ne demandent jamais ta carte par mail.",
  ),
];
