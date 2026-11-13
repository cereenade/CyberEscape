import type { RoomContent } from "@/lib/types";

/** Salles 21 à 40 du niveau Facile. */
export const FACILE_3: RoomContent[] = [
  {
    id: "facile-21",
    name: "La pause café",
    story: "L'admin part chercher un café en laissant sa session ouverte. Le pirate rôde dans le couloir. Que fallait-il faire ?",
    card: {
      title: "Verrouiller sa session",
      category: "Défense",
      icon: "🔐",
      summary: "Un poste ouvert sans surveillance, c'est un accès offert à n'importe qui.",
      details: [
        "Windows + L (ou Ctrl + Cmd + Q sur Mac) verrouille l'écran en une seconde.",
        "Il suffit de quelques secondes pour brancher une clé piégée ou envoyer un mail en ton nom.",
        "Active aussi le verrouillage automatique après quelques minutes d'inactivité.",
      ],
      hint: "Une seule combinaison de touches suffit.",
    },
    puzzle: {
      kind: "choice",
      question: "Avant de quitter son poste, l'admin aurait dû…",
      options: [
        { label: "Éteindre l'écran", correct: false, explanation: "L'ordinateur reste ouvert : il suffit de rallumer l'écran." },
        { label: "Verrouiller sa session (Windows + L)", correct: true, explanation: "Il faut le mot de passe pour revenir : le poste est protégé." },
        { label: "Demander à un collègue de surveiller", correct: false, explanation: "Le collègue peut s'absenter, et ce n'est pas son rôle." },
      ],
    },
    successText: "Session verrouillée. Le pirate repart bredouille.",
  },
  {
    id: "facile-22",
    name: "L'écran bloqué",
    story: "Un écran rouge clignote : « ALERTE VIRUS ! Votre ordinateur est bloqué. Appelez le support Microsoft au 01 89 00 00 00. »",
    card: {
      title: "L'arnaque au faux support",
      category: "Social",
      icon: "☎️",
      summary: "Une fausse alerte qui te pousse à appeler un faux technicien.",
      details: [
        "Le faux technicien te fait installer un logiciel de prise en main à distance, puis te fait payer.",
        "Aucune entreprise n'affiche de numéro à appeler dans une alerte de navigateur.",
        "Ferme l'onglet ou le navigateur ; redémarre si l'écran reste bloqué.",
      ],
      hint: "Microsoft n'affiche jamais de numéro à appeler dans une page web.",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu ?",
      options: [
        { label: "J'appelle le numéro pour débloquer l'ordinateur", correct: false, explanation: "C'est exactement le piège : le faux technicien va te voler." },
        { label: "Je ferme le navigateur (ou je redémarre)", correct: true, explanation: "Ce n'est qu'une page web qui fait peur : la fermer suffit." },
        { label: "Je paie l'antivirus proposé sur la page", correct: false, explanation: "C'est un faux antivirus : tu paierais le pirate." },
      ],
    },
    successText: "Page fermée, arnaque évitée. Ton ordinateur n'avait rien.",
  },
  {
    id: "facile-23",
    name: "Le bandeau des cookies",
    story: "Le site du pirate affiche un bandeau : « Nous utilisons des cookies pour améliorer votre expérience. » Trois boutons s'offrent à toi.",
    card: {
      title: "Cookies et traçage",
      category: "Web",
      icon: "🍪",
      summary: "Certains cookies sont utiles, d'autres servent surtout à te suivre de site en site.",
      details: [
        "Les cookies nécessaires font fonctionner le site (connexion, panier).",
        "Les cookies publicitaires et de mesure suivent ta navigation pour établir ton profil.",
        "En Europe, refuser doit être aussi simple qu'accepter : « Tout refuser » garde les cookies nécessaires.",
      ],
      hint: "Quel choix protège le mieux ta vie privée tout en gardant le site fonctionnel ?",
    },
    puzzle: {
      kind: "choice",
      question: "Quel bouton protège le mieux ta vie privée ?",
      options: [
        { label: "Tout accepter", correct: false, explanation: "Tu acceptes tous les traceurs publicitaires." },
        { label: "Tout refuser", correct: true, explanation: "Seuls les cookies nécessaires au fonctionnement restent actifs." },
        { label: "Fermer le bandeau avec la croix sans choisir", correct: false, explanation: "Selon les sites, ce n'est pas un refus clair." },
      ],
    },
    successText: "Traceurs refusés. Le pirate ne saura pas ce que tu fais ailleurs.",
  },
  {
    id: "facile-24",
    name: "La caméra du hall",
    story: "La caméra de surveillance du hall a été piratée. Son interface d'administration est accessible depuis Internet. Tu trouves sa notice.",
    card: {
      title: "Les identifiants par défaut",
      category: "Mots de passe",
      icon: "📷",
      summary: "admin/admin : le premier mot de passe que tout pirate essaie.",
      details: [
        "Les objets connectés sont souvent livrés avec un identifiant et un mot de passe identiques pour tous.",
        "Ces listes sont publiques : des robots les testent en permanence sur Internet.",
        "Change toujours le mot de passe par défaut dès l'installation.",
      ],
      hint: "Regarde dans la notice les identifiants « d'usine ».",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "notice_camera.pdf (extrait)",
      content: `Installation rapide
1. Branchez la caméra sur votre box.
2. Ouvrez http://192.168.1.50 dans votre navigateur.
3. Connectez-vous avec les identifiants d'usine :
   Identifiant : admin
   Mot de passe : 123456
4. (Recommandé) Changez le mot de passe dans Réglages > Sécurité.`,
      question: "Quel mot de passe le pirate a-t-il utilisé ?",
      answers: ["123456"],
    },
    successText: "Mot de passe d'usine remplacé. La caméra ne filme plus pour le pirate.",
  },
  {
    id: "facile-25",
    name: "Le métro",
    story: "Dans le métro, un passager tape son code de déverrouillage. Le pirate, juste derrière lui, regarde par-dessus son épaule.",
    card: {
      title: "L'espionnage par-dessus l'épaule",
      category: "Social",
      icon: "👀",
      summary: "Pas besoin de pirater quand on peut simplement regarder l'écran.",
      details: [
        "Le « shoulder surfing » consiste à observer quelqu'un taper un code ou lire un écran.",
        "Transports, cafés, open space : les lieux publics sont propices.",
        "Cache ton clavier, utilise la biométrie et un filtre de confidentialité sur l'écran.",
      ],
      hint: "Le pirate n'a rien piraté : il a juste observé.",
    },
    puzzle: {
      kind: "choice",
      question: "Comment s'appelle cette technique ?",
      options: [
        { label: "Le phishing", correct: false, explanation: "Le phishing passe par un faux message." },
        { label: "Le shoulder surfing", correct: true, explanation: "Regarder par-dessus l'épaule pour voir un code ou un écran." },
        { label: "Le DDoS", correct: false, explanation: "Le DDoS sature un serveur, rien à voir." },
      ],
    },
    successText: "Bien vu. Désormais, l'admin cache son code d'une main.",
  },
  {
    id: "facile-26",
    name: "Le lien raccourci",
    story: "Un message contient un lien court : « bit.ly/promo-cyber ». Impossible de savoir où il mène… sauf en regardant son aperçu.",
    card: {
      title: "Les liens raccourcis",
      category: "Web",
      icon: "✂️",
      summary: "Un lien court cache sa vraie destination.",
      details: [
        "Les raccourcisseurs remplacent une longue adresse par une courte : pratique, mais opaque.",
        "Les pirates s'en servent pour masquer un faux site.",
        "Utilise un outil d'aperçu (souvent : ajouter + à la fin du lien) pour voir la destination avant de cliquer.",
      ],
      hint: "Lis l'adresse de destination indiquée par l'aperçu, et repère le vrai domaine.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "aperçu du lien bit.ly/promo-cyber+",
      content: `Lien court   : bit.ly/promo-cyber
Destination  : https://banque-horizon.securite-client.top/connexion
Créé le      : il y a 2 heures
Clics        : 3 412`,
      question: "Quel domaine se cache derrière ce lien ?",
      answers: ["securite-client.top"],
      placeholder: "exemple.com",
    },
    successText: "Lien démasqué : ce n'était pas la banque.",
  },
  {
    id: "facile-27",
    name: "L'archive secrète",
    story: "Un inconnu t'envoie « Facture.zip, mot de passe : 4512 ». Un antivirus ne peut pas regarder à l'intérieur d'une archive protégée…",
    card: {
      title: "Les archives piégées",
      category: "Système",
      icon: "🗜️",
      summary: "Une archive protégée par mot de passe échappe souvent à l'analyse antivirus.",
      details: [
        "Les filtres de messagerie ne peuvent pas ouvrir une archive chiffrée : le malware passe.",
        "Donner le mot de passe dans le même mail est une technique classique des pirates.",
        "N'ouvre jamais une archive inattendue venant d'un inconnu.",
      ],
      hint: "Pourquoi un vrai fournisseur protégerait-il une simple facture avec un mot de passe écrit juste à côté ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu de cette archive ?",
      options: [
        { label: "Je l'ouvre avec le mot de passe fourni", correct: false, explanation: "C'est ce que veut le pirate : l'archive contient sûrement un malware." },
        { label: "Je ne l'ouvre pas et je la signale à l'équipe sécurité", correct: true, explanation: "Archive inattendue + mot de passe fourni = piège classique." },
        { label: "Je la transfère à un collègue pour avoir son avis", correct: false, explanation: "Tu risques de le piéger lui aussi." },
      ],
    },
    successText: "Archive signalée : elle contenait bien un cheval de Troie.",
  },
  {
    id: "facile-28",
    name: "Les écouteurs",
    story: "Le téléphone de l'admin a toujours le Bluetooth activé et visible par tous. Le pirate tente de s'y appairer dans la salle d'attente.",
    card: {
      title: "Le Bluetooth",
      category: "Réseau",
      icon: "🎧",
      summary: "Une porte sans fil qu'on oublie souvent de fermer.",
      details: [
        "Un Bluetooth visible permet à des inconnus de tenter un appairage ou de t'envoyer des fichiers.",
        "Des failles Bluetooth ont déjà permis de prendre le contrôle d'appareils à distance.",
        "Désactive-le quand tu ne t'en sers pas, et refuse les demandes d'appairage inconnues.",
      ],
      hint: "La meilleure porte, c'est celle qui est fermée quand on ne s'en sert pas.",
    },
    puzzle: {
      kind: "choice",
      question: "Quel est le bon réflexe ?",
      options: [
        { label: "Laisser le Bluetooth visible en permanence, c'est pratique", correct: false, explanation: "Tu exposes ton téléphone à n'importe qui à proximité." },
        { label: "Désactiver le Bluetooth quand il ne sert pas et refuser les appairages inconnus", correct: true, explanation: "Moins de portes ouvertes, moins de risques." },
        { label: "Accepter les demandes d'appairage pour voir qui c'est", correct: false, explanation: "Tu donnerais un accès à un inconnu." },
      ],
    },
    successText: "Bluetooth désactivé. Une porte de moins pour le pirate.",
  },
  {
    id: "facile-29",
    name: "Le magasin d'applis",
    story: "L'admin veut une application de retouche photo payante. Un site propose sa version « gratuite » à télécharger directement en fichier APK.",
    card: {
      title: "Les sources d'installation",
      category: "Système",
      icon: "🏪",
      summary: "Une appli « crackée » gratuite est souvent un malware déguisé.",
      details: [
        "Les magasins officiels (Google Play, App Store) vérifient les applications, même si ce n'est pas parfait.",
        "Les APK et logiciels piratés téléchargés ailleurs contiennent souvent des logiciels espions.",
        "Installe uniquement depuis les magasins officiels ou le site de l'éditeur.",
      ],
      hint: "Si c'est gratuit alors que c'est payant partout ailleurs, qui paie vraiment ?",
    },
    puzzle: {
      kind: "choice",
      question: "D'où installer l'application ?",
      options: [
        { label: "Depuis le site qui propose l'APK gratuit", correct: false, explanation: "Les versions piratées contiennent souvent un malware." },
        { label: "Depuis le magasin officiel (ou le site de l'éditeur)", correct: true, explanation: "C'est la source la plus fiable." },
        { label: "Depuis un lien envoyé dans un groupe de discussion", correct: false, explanation: "Impossible de savoir ce que contient le fichier." },
      ],
    },
    successText: "Appli installée depuis le magasin officiel. Pas d'espion dans le téléphone.",
  },
  {
    id: "facile-30",
    name: "Le compte partagé",
    story: "Trois collègues partagent le même compte « compta » avec le même mot de passe. Une facture a été modifiée, et personne ne sait qui l'a fait.",
    card: {
      title: "Les comptes partagés",
      category: "Mots de passe",
      icon: "👥",
      summary: "Un compte pour plusieurs personnes, c'est impossible de savoir qui fait quoi.",
      details: [
        "Avec un compte partagé, les journaux ne permettent pas d'identifier l'auteur d'une action.",
        "Quand quelqu'un part, il faut changer le mot de passe pour tous.",
        "Chaque personne doit avoir son propre compte, avec ses propres droits.",
      ],
      hint: "Ce qui manque, c'est la traçabilité.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle est la bonne pratique ?",
      options: [
        { label: "Garder le compte partagé mais changer le mot de passe chaque semaine", correct: false, explanation: "On ne sait toujours pas qui fait quoi." },
        { label: "Un compte personnel pour chacun, avec les bons droits", correct: true, explanation: "Chaque action est attribuée à une personne précise." },
        { label: "Noter le mot de passe sur un post-it commun", correct: false, explanation: "C'est encore moins sûr." },
      ],
    },
    successText: "Trois comptes personnels créés. Chaque action est désormais traçable.",
  },
  {
    id: "facile-31",
    name: "La roue de la fortune",
    story: "Une pop-up géante : « 🎉 Félicitations ! Vous êtes le 1 000 000e visiteur ! Tournez la roue et gagnez un smartphone ! »",
    card: {
      title: "Les arnaques au cadeau",
      category: "Social",
      icon: "🎁",
      summary: "Un gain inespéré qui demande tes coordonnées bancaires est toujours un piège.",
      details: [
        "Le gain sert d'appât pour récupérer ta carte bancaire ou t'abonner à un service caché.",
        "Les « frais de livraison » de quelques euros sont le signal classique.",
        "Pas de participation, pas de gain : ferme la fenêtre.",
      ],
      hint: "As-tu participé à un concours ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu ?",
      options: [
        { label: "Je tourne la roue, je n'ai rien à perdre", correct: false, explanation: "Tu « gagneras » forcément, puis on te demandera ta carte." },
        { label: "Je ferme la fenêtre", correct: true, explanation: "Aucun concours, aucun gain : c'est une arnaque." },
        { label: "Je donne juste mon adresse pour la livraison", correct: false, explanation: "Tes données seront revendues ou utilisées pour d'autres arnaques." },
      ],
    },
    successText: "Pop-up fermée. Le « smartphone gratuit » n'a jamais existé.",
  },
  {
    id: "facile-32",
    name: "La fenêtre privée",
    story: "Un collègue pense être invisible sur Internet parce qu'il utilise la navigation privée. Il est sur le point de télécharger un logiciel douteux.",
    card: {
      title: "La navigation privée",
      category: "Web",
      icon: "🕶️",
      summary: "Elle n'enregistre rien sur ton ordinateur, mais elle ne te rend pas invisible.",
      details: [
        "Historique, cookies et formulaires sont effacés à la fermeture de la fenêtre.",
        "Ton fournisseur d'accès, ton employeur et les sites visités voient toujours ton activité.",
        "Elle ne protège ni des malwares ni du phishing.",
      ],
      hint: "Ce mode efface tes traces… sur quel appareil, exactement ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que fait réellement la navigation privée ?",
      options: [
        { label: "Elle te rend anonyme sur Internet", correct: false, explanation: "Les sites et ton réseau voient toujours ton activité." },
        { label: "Elle bloque les virus", correct: false, explanation: "Elle n'a aucune fonction antivirus." },
        { label: "Elle n'enregistre pas l'historique et les cookies sur ton appareil", correct: true, explanation: "C'est tout : elle protège seulement des autres utilisateurs de l'ordinateur." },
      ],
    },
    successText: "Mythe brisé. Ton collègue renonce au logiciel douteux.",
  },
  {
    id: "facile-33",
    name: "Le vieux disque",
    story: "L'entreprise jette ses anciens ordinateurs. Le pirate fouille la benne : il espère récupérer des disques durs encore lisibles.",
    card: {
      title: "L'effacement sécurisé",
      category: "Défense",
      icon: "🧹",
      summary: "Supprimer un fichier ne l'efface pas vraiment.",
      details: [
        "La corbeille et même le formatage rapide laissent les données récupérables avec des outils simples.",
        "Il faut un effacement sécurisé (écrasement des données) ou la destruction physique du disque.",
        "Un disque chiffré dès le départ est beaucoup plus simple à recycler sans risque.",
      ],
      hint: "Supprimer ou formater, est-ce vraiment effacer ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que fallait-il faire avant de jeter les disques ?",
      options: [
        { label: "Vider la corbeille", correct: false, explanation: "Les fichiers restent récupérables." },
        { label: "Faire un formatage rapide", correct: false, explanation: "Les données sont toujours là, seule la table des fichiers est effacée." },
        { label: "Faire un effacement sécurisé ou détruire physiquement les disques", correct: true, explanation: "C'est la seule façon de rendre les données irrécupérables." },
      ],
    },
    successText: "Disques broyés. La benne ne contient plus rien d'intéressant.",
  },
  {
    id: "facile-34",
    name: "Le cybercafé",
    story: "Tu dois consulter tes mails sur l'ordinateur d'un cybercafé. Avant de partir, quels gestes faut-il faire ?",
    card: {
      title: "Les ordinateurs partagés",
      category: "Défense",
      icon: "🖥️",
      summary: "Sur un ordinateur public, considère que tout peut être enregistré.",
      details: [
        "Un ordinateur public peut contenir un enregistreur de frappe (keylogger).",
        "Ne coche jamais « Se souvenir de moi » et refuse l'enregistrement du mot de passe.",
        "Déconnecte-toi de tous tes comptes et ferme le navigateur en partant.",
      ],
      hint: "Pense à tout ce que le prochain utilisateur pourrait retrouver.",
    },
    puzzle: {
      kind: "multi",
      question: "Quels sont les bons réflexes sur un ordinateur public ?",
      options: [
        { label: "Refuser l'enregistrement du mot de passe", correct: true, explanation: "Sinon le prochain utilisateur peut se connecter à ta place." },
        { label: "Se déconnecter de ses comptes avant de partir", correct: true, explanation: "Une session ouverte reste accessible au suivant." },
        { label: "Cocher « Se souvenir de moi »", correct: false, explanation: "Ta session resterait ouverte sur cet ordinateur." },
        { label: "Fermer complètement le navigateur", correct: true, explanation: "Ça efface la session en cours." },
        { label: "Éviter de s'y connecter à sa banque", correct: true, explanation: "Un ordinateur public peut enregistrer ce que tu tapes." },
      ],
    },
    successText: "Session fermée proprement. Le prochain utilisateur ne trouvera rien.",
  },
  {
    id: "facile-35",
    name: "La question secrète",
    story: "Pour récupérer un compte, le site demande : « Quel est le nom de votre ville de naissance ? » Le pirate, lui, a trouvé la réponse sur ton profil public.",
    card: {
      title: "Les questions secrètes",
      category: "Mots de passe",
      icon: "❓",
      summary: "Une question secrète dont la réponse se trouve en ligne n'a rien de secret.",
      details: [
        "Ville de naissance, nom de jeune fille, premier animal : ces infos se trouvent souvent sur les réseaux.",
        "Astuce : réponds par un faux mot aléatoire, et garde-le dans ton gestionnaire de mots de passe.",
        "Préfère la double authentification quand elle est proposée.",
      ],
      hint: "La meilleure réponse n'est pas forcément la vraie…",
    },
    puzzle: {
      kind: "choice",
      question: "Comment répondre à une question secrète ?",
      options: [
        { label: "Donner la vraie réponse, c'est plus simple à retenir", correct: false, explanation: "La vraie réponse se trouve souvent en ligne." },
        { label: "Mettre une fausse réponse aléatoire, gardée dans un gestionnaire de mots de passe", correct: true, explanation: "Impossible à deviner, même en connaissant ta vie." },
        { label: "Répondre « 1234 » partout", correct: false, explanation: "C'est la première réponse qu'un pirate essaie." },
      ],
    },
    successText: "Réponse changée en « Chaussette-Volcan-7 ». Bonne chance au pirate.",
  },
  {
    id: "facile-36",
    name: "Le compte volé",
    story: "Le compte de messagerie d'une collègue a été piraté : il envoie des liens bizarres à tous ses contacts. Remets les étapes de récupération dans l'ordre.",
    card: {
      title: "Compte piraté : que faire",
      category: "Défense",
      icon: "🚑",
      summary: "Agir vite et dans l'ordre limite les dégâts.",
      details: [
        "D'abord reprendre le contrôle : changer le mot de passe depuis un appareil sain.",
        "Ensuite fermer les portes : déconnecter toutes les sessions et activer la double authentification.",
        "Enfin prévenir les contacts, qui ont peut-être reçu des messages piégés.",
      ],
      hint: "Reprendre le contrôle, fermer les portes, puis prévenir.",
    },
    puzzle: {
      kind: "order",
      question: "Dans quel ordre agir ?",
      items: [
        "Changer le mot de passe depuis un appareil sain",
        "Déconnecter toutes les sessions ouvertes",
        "Activer la double authentification",
        "Prévenir ses contacts des messages frauduleux",
      ],
    },
    successText: "Compte récupéré et sécurisé. Les contacts sont prévenus.",
  },
  {
    id: "facile-37",
    name: "Le PC bizarre",
    story: "L'ordinateur de l'accueil se comporte étrangement depuis ce matin. Le pirate y a-t-il installé quelque chose ?",
    card: {
      title: "Les signes d'infection",
      category: "Système",
      icon: "🤒",
      summary: "Certains symptômes doivent faire penser à un malware.",
      details: [
        "Lenteur soudaine, ventilateur qui tourne sans raison, pop-ups publicitaires, programmes inconnus au démarrage.",
        "Page d'accueil ou moteur de recherche changés sans ton accord, antivirus désactivé.",
        "Au moindre doute : déconnecte du réseau et préviens le support informatique.",
      ],
      hint: "Cherche ce qui sort de l'ordinaire, pas ce qui est normal.",
    },
    puzzle: {
      kind: "multi",
      question: "Quels signes peuvent indiquer une infection ?",
      options: [
        { label: "Des pop-ups publicitaires partout", correct: true, explanation: "Typique d'un adware." },
        { label: "L'antivirus s'est désactivé tout seul", correct: true, explanation: "Les malwares tentent souvent de désactiver les protections." },
        { label: "Un nouveau programme inconnu se lance au démarrage", correct: true, explanation: "C'est souvent un mécanisme de persistance." },
        { label: "Le fond d'écran que tu as choisi hier", correct: false, explanation: "Un changement que tu as fait toi-même n'a rien d'inquiétant." },
        { label: "Le moteur de recherche a changé sans ton accord", correct: true, explanation: "Signe classique d'un pirate de navigateur." },
      ],
    },
    successText: "Diagnostic posé : le poste est isolé et nettoyé.",
  },
  {
    id: "facile-38",
    name: "L'alerte de connexion",
    story: "Trois mails « Nouvelle connexion à votre compte » arrivent. Ils semblent venir du réseau social Pixelo. L'un d'eux est faux.",
    card: {
      title: "Les fausses alertes de connexion",
      category: "Social",
      icon: "🔔",
      summary: "Une fausse alerte de sécurité pousse à « sécuriser » son compte… sur un faux site.",
      details: [
        "Les pirates imitent les alertes de connexion pour créer la panique.",
        "Le lien mène à une fausse page de connexion qui vole ton mot de passe.",
        "Pour vérifier, ouvre l'appli ou le site officiel toi-même, jamais via le lien du mail.",
      ],
      hint: "Le domaine officiel de Pixelo est pixelo.com.",
    },
    puzzle: {
      kind: "phishing",
      emails: [
        {
          id: "vrai1",
          fromName: "Pixelo",
          fromAddress: "securite@pixelo.com",
          subject: "Nouvelle connexion depuis Chrome sur Windows",
          body: "Une connexion a eu lieu depuis Paris. Si c'était toi, tu n'as rien à faire. Sinon, va dans Paramètres > Sécurité de l'application.",
          linkText: "En savoir plus",
          linkHref: "https://help.pixelo.com/connexions",
          isPhishing: false,
          explanation: "Domaine officiel, aucune urgence, et il te renvoie vers l'application : légitime.",
        },
        {
          id: "faux",
          fromName: "Pixelo Security",
          fromAddress: "alert@pixelo-securite-compte.com",
          subject: "⚠️ Connexion suspecte depuis la Russie – agissez maintenant",
          body: "Quelqu'un tente d'accéder à votre compte. Si ce n'était pas vous, sécurisez votre compte dans les 30 minutes en vous reconnectant ici.",
          linkText: "Sécuriser mon compte",
          linkHref: "https://pixelo-securite-compte.com/login",
          isPhishing: true,
          explanation: "Faux domaine, panique, délai très court et lien de connexion : c'est du phishing.",
        },
        {
          id: "vrai2",
          fromName: "Pixelo",
          fromAddress: "no-reply@pixelo.com",
          subject: "Ton mot de passe a bien été modifié",
          body: "Ton mot de passe a été changé aujourd'hui. Si tu es à l'origine de ce changement, ignore ce message.",
          linkText: "Centre d'aide",
          linkHref: "https://help.pixelo.com",
          isPhishing: false,
          explanation: "Simple confirmation sur le domaine officiel : légitime.",
        },
      ],
    },
    successText: "Fausse alerte démasquée. Le vrai compte n'a jamais été menacé.",
  },
  {
    id: "facile-39",
    name: "La clé USB perdue",
    story: "Un commercial a perdu sa clé USB avec tous les contrats clients. Elle n'était pas protégée. Comment éviter que ça recommence ?",
    card: {
      title: "Chiffrer ses supports amovibles",
      category: "Défense",
      icon: "🔏",
      summary: "Une clé USB se perd facilement : son contenu doit rester illisible sans mot de passe.",
      details: [
        "BitLocker To Go (Windows), FileVault ou VeraCrypt chiffrent une clé USB entière.",
        "Sans le mot de passe, celui qui trouve la clé ne voit que des données illisibles.",
        "Encore mieux : éviter de transporter des données sensibles quand un partage sécurisé suffit.",
      ],
      hint: "Ce n'est pas la perte qu'on peut empêcher, c'est la lecture.",
    },
    puzzle: {
      kind: "choice",
      question: "Qu'est-ce qui aurait protégé les contrats ?",
      options: [
        { label: "Renommer les fichiers en « vacances.jpg »", correct: false, explanation: "N'importe qui peut quand même les ouvrir." },
        { label: "Chiffrer la clé USB", correct: true, explanation: "Sans le mot de passe, son contenu est illisible." },
        { label: "Écrire son numéro de téléphone sur la clé", correct: false, explanation: "Utile pour la retrouver, mais n'empêche pas la lecture." },
      ],
    },
    successText: "Toutes les clés de l'équipe sont désormais chiffrées.",
  },
  {
    id: "facile-40",
    name: "La box de la maison",
    story: "Dernière salle du niveau Facile. Le pirate a accédé au Wi-Fi de l'admin depuis la rue. Dans les réglages de la box, tu découvres pourquoi.",
    card: {
      title: "Sécuriser sa box Wi-Fi",
      category: "Réseau",
      icon: "📡",
      summary: "Un Wi-Fi mal protégé laisse entrer n'importe qui dans ton réseau.",
      details: [
        "WEP est cassé depuis des années ; WPA2 est le minimum, WPA3 est recommandé.",
        "Change le mot de passe Wi-Fi par défaut (et celui de l'interface de la box).",
        "Désactive le WPS, qui permet de se connecter avec un simple code à 8 chiffres.",
      ],
      hint: "Cherche le protocole de sécurité obsolète dans les réglages.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "réglages de la box",
      content: `Nom du réseau (SSID) : Maison-Admin
Sécurité            : WEP
Mot de passe Wi-Fi  : 1234567890
WPS                 : activé`,
      question: "Quel réglage faut-il changer en priorité ?",
      options: [
        { label: "Le nom du réseau", correct: false, explanation: "Le nom ne protège rien en lui-même." },
        { label: "Passer de WEP à WPA2 ou WPA3", correct: true, explanation: "WEP se casse en quelques minutes : c'est par là que le pirate est entré." },
        { label: "Rien, tout est correct", correct: false, explanation: "WEP, mot de passe faible et WPS activé : tout est à revoir." },
      ],
    },
    successText: "Box passée en WPA3 avec une phrase de passe. Niveau Facile entièrement terminé !",
  },
];
