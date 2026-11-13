import type { RoomContent } from "@/lib/types";

/** Salles 11 à 20 du niveau Facile. */
export const FACILE_2: RoomContent[] = [
  {
    id: "facile-11",
    name: "Le profil public",
    story:
      "Le pirate a préparé son attaque en fouillant le profil public d'un employé. Aide-le à faire le ménage avant que d'autres ne s'en servent.",
    card: {
      title: "L'empreinte numérique",
      category: "Social",
      icon: "👣",
      summary: "Tout ce que tu publies en ligne peut être retrouvé, recoupé et utilisé contre toi.",
      details: [
        "Date de naissance, adresse, nom de ton animal : ce sont souvent des réponses à des questions secrètes.",
        "Une photo de billet ou de carte d'embarquement contient un code-barres lisible par n'importe qui.",
        "Règle simple : ne publie rien que tu ne voudrais pas voir sur une affiche dans la rue.",
      ],
      hint: "Coche ce qui permet de te localiser, d'usurper ton identité ou de répondre à tes questions secrètes.",
    },
    puzzle: {
      kind: "multi",
      question: "Quelles informations ne devraient pas être publiques ?",
      options: [
        { label: "Une photo de ta carte d'embarquement", correct: true, explanation: "Le code-barres permet de modifier ou d'annuler ta réservation." },
        { label: "Ta date de naissance complète", correct: true, explanation: "Elle sert à usurper ton identité et à deviner tes mots de passe." },
        { label: "Ton adresse postale", correct: true, explanation: "Elle permet de te localiser et de rendre une arnaque plus crédible." },
        { label: "Ta passion pour la cuisine", correct: false, explanation: "Un centre d'intérêt général ne met pas en danger." },
        { label: "Le nom de ton premier animal", correct: true, explanation: "C'est une question secrète très courante." },
      ],
    },
    successText: "Profil nettoyé. Le pirate n'a plus grand-chose à se mettre sous la dent.",
  },
  {
    id: "facile-12",
    name: "Le SMS du livreur",
    story: "Ton téléphone vibre : « ColisExpress : votre colis est en attente. Réglez 1,49 € ici : colis-reprogrammer.info ».",
    card: {
      title: "Le smishing",
      category: "Social",
      icon: "💬",
      summary: "Le phishing par SMS : plus court, plus direct, et souvent plus efficace.",
      details: [
        "Sur un téléphone, on vérifie moins les liens et l'adresse complète est souvent coupée.",
        "Thèmes classiques : colis bloqué, amende impayée, remboursement, compte suspendu.",
        "Ne clique pas : va directement sur l'application ou le site officiel du service.",
      ],
      hint: "Est-ce que colis-reprogrammer.info ressemble au site officiel colis-express.fr ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu ?",
      options: [
        { label: "Je paie, ce n'est que 1,49 €", correct: false, explanation: "Le but est de récupérer ta carte bancaire, pas 1,49 €." },
        { label: "Je supprime le SMS et je vérifie sur le site officiel du transporteur", correct: true, explanation: "Le bon réflexe : passer par le canal officiel." },
        { label: "Je réponds STOP pour ne plus recevoir de messages", correct: false, explanation: "Répondre confirme au pirate que ton numéro est actif." },
      ],
    },
    successText: "SMS supprimé, carte bancaire sauvée.",
  },
  {
    id: "facile-13",
    name: "L'appel du support",
    story:
      "Le téléphone du bureau sonne : « Bonjour, ici le support informatique. Nous migrons votre compte, je vais vous envoyer un code par SMS, pouvez-vous me le lire ? »",
    card: {
      title: "Le vishing",
      category: "Social",
      icon: "📞",
      summary: "L'arnaque par téléphone : une voix rassurante qui te demande un code ou un mot de passe.",
      details: [
        "L'attaquant joue un rôle crédible : support, banque, police, collègue.",
        "Un code reçu par SMS est le deuxième facteur de ton compte : le donner, c'est ouvrir la porte.",
        "Aucun vrai support ne demande ton mot de passe ou ton code de validation.",
      ],
      hint: "À quoi sert ce code reçu par SMS, à ton avis ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que réponds-tu ?",
      options: [
        { label: "Je lis le code, c'est le support", correct: false, explanation: "Le code est ta double authentification : le pirate entre dans ton compte." },
        { label: "Je raccroche et je rappelle le support au numéro officiel", correct: true, explanation: "Vérifier par un canal que tu connais déjà, c'est la parade." },
        { label: "Je lui donne plutôt mon mot de passe", correct: false, explanation: "C'est encore pire : ne le donne jamais à personne." },
      ],
    },
    successText: "Tu as raccroché. Le vrai support n'avait jamais appelé.",
  },
  {
    id: "facile-14",
    name: "Le hall de gare",
    story: "Tu dois envoyer un document confidentiel depuis une gare. Plusieurs réseaux sont disponibles.",
    card: {
      title: "Le Wi-Fi public",
      category: "Réseau",
      icon: "📶",
      summary: "Un Wi-Fi ouvert, c'est un réseau partagé avec des inconnus.",
      details: [
        "Sur un Wi-Fi sans mot de passe, les autres utilisateurs peuvent parfois voir ton trafic.",
        "N'importe qui peut créer un réseau nommé « Gare_WiFi_Gratuit ».",
        "Pour du sensible : partage de connexion 4G/5G ou VPN de ton entreprise.",
      ],
      hint: "Quel réseau est le seul que tu contrôles vraiment ?",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle connexion utilises-tu ?",
      options: [
        { label: "Gare_WiFi_Gratuit (ouvert)", correct: false, explanation: "Réseau ouvert et peut-être créé par un pirate." },
        { label: "Free_WiFi_Officiel (ouvert)", correct: false, explanation: "Le mot « officiel » dans un nom de réseau ne prouve rien." },
        { label: "Le partage de connexion de mon téléphone", correct: true, explanation: "C'est ton propre réseau, protégé par ton mot de passe." },
      ],
    },
    successText: "Document envoyé en sécurité via ta propre connexion.",
  },
  {
    id: "facile-15",
    name: "La salle des archives",
    story: "Le pirate menace d'effacer toutes les archives. Heureusement, l'équipe avait une stratégie de sauvegarde. Laquelle protège vraiment ?",
    card: {
      title: "La règle 3-2-1",
      category: "Défense",
      icon: "💽",
      summary: "3 copies, sur 2 supports différents, dont 1 hors site.",
      details: [
        "3 copies de tes données (l'original + 2 sauvegardes).",
        "2 types de supports différents (disque externe, cloud, NAS…).",
        "1 copie à l'extérieur ou déconnectée, pour survivre à un incendie ou à un rançongiciel.",
      ],
      hint: "3 copies, 2 supports, 1 ailleurs.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle stratégie respecte la règle 3-2-1 ?",
      options: [
        { label: "Les fichiers sur le PC + une copie dans un autre dossier du même PC", correct: false, explanation: "Un seul support : si le disque meurt, tout disparaît." },
        { label: "Les fichiers sur le PC + un disque externe + une copie dans le cloud", correct: true, explanation: "3 copies, 2 supports, 1 hors site : parfait." },
        { label: "Uniquement le cloud, c'est suffisant", correct: false, explanation: "Une seule copie de sauvegarde, et elle peut être chiffrée si ton compte est piraté." },
      ],
    },
    successText: "Les archives sont restaurées depuis la copie hors site.",
  },
  {
    id: "facile-16",
    name: "Le protocole d'alerte",
    story: "Un mail suspect vient d'arriver. Sur le mur, les étapes du protocole d'alerte ont été mélangées par le pirate. Remets-les dans l'ordre.",
    card: {
      title: "Signaler un incident",
      category: "Défense",
      icon: "📣",
      summary: "Un signalement rapide peut protéger toute l'entreprise.",
      details: [
        "Si tu as reçu un mail piégé, d'autres l'ont sûrement reçu aussi.",
        "Signaler permet à l'équipe sécurité de bloquer l'expéditeur pour tout le monde.",
        "Même si tu as cliqué par erreur : signale vite, sans honte. Chaque minute compte.",
      ],
      hint: "D'abord ne rien casser, ensuite vérifier, puis prévenir, et enfin faire le ménage.",
    },
    puzzle: {
      kind: "order",
      question: "Dans quel ordre réagir face à un mail suspect ?",
      items: [
        "Ne pas cliquer sur les liens ni ouvrir les pièces jointes",
        "Vérifier l'adresse de l'expéditeur",
        "Signaler le mail à l'équipe sécurité",
        "Supprimer le mail",
      ],
    },
    successText: "Protocole rétabli. L'équipe sécurité a bloqué l'expéditeur pour tout le monde.",
  },
  {
    id: "facile-17",
    name: "La lampe torche",
    story: "Une application « Lampe torche gratuite » est installée sur le téléphone de l'admin. Elle demande beaucoup d'autorisations…",
    card: {
      title: "Les permissions des applications",
      category: "Système",
      icon: "📱",
      summary: "Une appli ne devrait demander que ce dont elle a vraiment besoin.",
      details: [
        "Contacts, micro, localisation, SMS : des données précieuses que certaines applis revendent.",
        "Une demande sans rapport avec la fonction de l'appli est un signal d'alerte.",
        "Vérifie régulièrement les autorisations dans les réglages de ton téléphone.",
      ],
      hint: "Une lampe torche a besoin d'allumer le flash. Le reste ?",
    },
    puzzle: {
      kind: "multi",
      question: "Quelles autorisations sont suspectes pour une lampe torche ?",
      options: [
        { label: "Accès à l'appareil photo et au flash", correct: false, explanation: "Nécessaire : c'est le flash de l'appareil photo qui sert de lampe." },
        { label: "Accès à tes contacts", correct: true, explanation: "Aucun rapport avec une lampe : tes contacts peuvent être revendus." },
        { label: "Accès au micro", correct: true, explanation: "Une lampe n'a pas besoin d'écouter." },
        { label: "Localisation précise", correct: true, explanation: "Inutile pour éclairer, très utile pour te pister." },
        { label: "Lecture de tes SMS", correct: true, explanation: "Les SMS contiennent tes codes de validation." },
      ],
    },
    successText: "Appli désinstallée. Elle envoyait les contacts de l'admin vers un serveur inconnu.",
  },
  {
    id: "facile-18",
    name: "Le bouclier",
    story: "Un collègue affirme : « J'ai un antivirus, donc je peux cliquer sur tout ce que je veux. » La porte s'ouvrira si tu rectifies.",
    card: {
      title: "Antivirus et EDR",
      category: "Défense",
      icon: "🛡️",
      summary: "Une protection indispensable, mais pas une garantie absolue.",
      details: [
        "L'antivirus reconnaît surtout les menaces déjà connues.",
        "Un EDR (comme ceux utilisés par les SOC) surveille en plus les comportements suspects.",
        "Aucun outil n'arrête tout : la vigilance reste la première défense.",
      ],
      hint: "Un antivirus reconnaît surtout ce qu'il a déjà vu.",
    },
    puzzle: {
      kind: "choice",
      question: "Que lui réponds-tu ?",
      options: [
        { label: "Il a raison, l'antivirus bloque tout", correct: false, explanation: "Les menaces nouvelles ou bien déguisées passent souvent." },
        { label: "L'antivirus aide, mais ne détecte pas tout : il faut rester prudent", correct: true, explanation: "La sécurité repose sur plusieurs couches, dont toi." },
        { label: "Les antivirus ne servent à rien", correct: false, explanation: "Ils bloquent énormément de menaces connues : il en faut un." },
      ],
    },
    successText: "Collègue convaincu. Il ne clique plus sur n'importe quoi.",
  },
  {
    id: "facile-19",
    name: "Le trousseau",
    story: "L'admin avoue noter tous ses mots de passe dans un fichier « mdp.txt » sur le bureau. Propose-lui mieux.",
    card: {
      title: "Le gestionnaire de mots de passe",
      category: "Mots de passe",
      icon: "🗃️",
      summary: "Un coffre-fort chiffré qui retient et génère tous tes mots de passe.",
      details: [
        "Tu ne retiens plus qu'un mot de passe maître, long et solide.",
        "Il génère un mot de passe unique et aléatoire pour chaque site.",
        "Il remplit les champs seulement sur le vrai site : une protection en plus contre le phishing.",
      ],
      hint: "Il faut un outil chiffré, pas un fichier ou un carnet.",
    },
    puzzle: {
      kind: "choice",
      question: "Que lui conseilles-tu ?",
      options: [
        { label: "Renommer le fichier en « courses.txt »", correct: false, explanation: "Le fichier reste en clair : n'importe quel malware peut le lire." },
        { label: "Utiliser un gestionnaire de mots de passe", correct: true, explanation: "Chiffré, pratique, et un mot de passe différent partout." },
        { label: "Utiliser le même mot de passe partout pour ne plus rien noter", correct: false, explanation: "Une fuite et tous ses comptes tombent." },
      ],
    },
    successText: "Fichier supprimé, gestionnaire installé.",
  },
  {
    id: "facile-20",
    name: "Le parcmètre",
    story:
      "Dernière salle du niveau. Sur la porte de sortie, un autocollant : « Payez votre sortie en scannant ce QR code ». Il est collé par-dessus un autre.",
    card: {
      title: "Le quishing",
      category: "Social",
      icon: "🔳",
      summary: "Du phishing caché dans un QR code.",
      details: [
        "Un QR code n'est qu'un lien : on ne voit pas où il mène avant de le scanner.",
        "Les pirates collent de faux QR codes sur des parcmètres, des affiches ou des menus.",
        "Vérifie l'adresse affichée avant d'ouvrir, et méfie-toi des autocollants rajoutés.",
      ],
      hint: "Un autocollant collé par-dessus un autre, ça devrait t'alerter.",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu ?",
      options: [
        { label: "Je scanne et je paie, c'est pratique", correct: false, explanation: "Le QR code mène vers une fausse page de paiement." },
        { label: "Je décolle l'autocollant et j'utilise le moyen de paiement officiel", correct: true, explanation: "Le QR code rajouté était un piège." },
        { label: "Je scanne mais je ne paie pas", correct: false, explanation: "Ouvrir le lien peut déjà t'exposer à un site piégé." },
      ],
    },
    successText: "Faux QR code démasqué. Niveau facile entièrement terminé !",
  },
];
