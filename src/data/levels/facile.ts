import { caesar, toBase64 } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

export const FACILE: RoomContent[] = [
  {
    id: "facile-01",
    name: "Le terminal d'accueil",
    story:
      "Tu te réveilles devant un vieux terminal. La porte est verrouillée par un écran de connexion. Le pirate a récupéré cette page sur l'intranet… mais le développeur n'a pas fait très attention à son code.",
    card: {
      title: "Le code source",
      category: "Web",
      icon: "🧾",
      summary: "Tout ce qu'un site envoie à ton navigateur peut être lu par n'importe qui.",
      details: [
        "Une page web est du code HTML, CSS et JavaScript envoyé à ton navigateur.",
        "Tu peux le lire avec Ctrl+U (afficher la source) ou F12 (outils de développement).",
        "Les commentaires <!-- ... --> ne s'affichent pas à l'écran, mais restent visibles dans le code.",
        "On ne met jamais de mot de passe ou de clé secrète dans le code envoyé au navigateur.",
      ],
      hint: "Les développeurs pressés laissent parfois des notes dans les commentaires HTML…",
    },
    puzzle: {
      kind: "answer",
      intro: "Voici le code source de la page de connexion. Trouve le mot de passe.",
      contentLabel: "connexion.html",
      content: `<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Intranet - Connexion</title>
</head>
<body>
  <h1>Accès administrateur</h1>
  <form action="/login" method="post">
    <input type="text" name="user" placeholder="Identifiant">
    <input type="password" name="pass" placeholder="Mot de passe">
    <!-- TODO : retirer avant la mise en prod !!! -->
    <!-- compte de test : admin / mdp : pare-feu -->
    <button type="submit">Se connecter</button>
  </form>
</body>
</html>`,
      question: "Mot de passe administrateur",
      answers: ["pare-feu"],
    },
    successText: "La porte s'ouvre dans un grincement. Le mot de passe était juste sous ton nez.",
  },
  {
    id: "facile-02",
    name: "La salle des messages",
    story:
      "Un écran affiche un message intercepté entre le pirate et son complice. Il est chiffré, mais avec une méthode vieille de 2 000 ans.",
    card: {
      title: "Le chiffre de César",
      category: "Crypto",
      icon: "🏛️",
      summary: "Décaler chaque lettre de l'alphabet : le plus vieux chiffrement connu.",
      details: [
        "Jules César décalait chaque lettre de 3 rangs : A devient D, B devient E…",
        "Pour déchiffrer, on applique le décalage inverse.",
        "Il n'existe que 25 décalages possibles : on peut tous les tester en quelques secondes.",
      ],
      hint: "César aimait le chiffre 3. Dans l'atelier, ajoute l'étape « César » et recule de 3.",
    },
    puzzle: {
      kind: "answer",
      intro: "Message intercepté :",
      content: caesar("LA CLE DE LA PORTE EST BOUCLIER", 3),
      tools: ["caesar"],
      workshopInput: caesar("LA CLE DE LA PORTE EST BOUCLIER", 3),
      question: "Quelle est la clé de la porte ?",
      answers: ["bouclier"],
    },
    successText: "Message déchiffré ! Le pirate devrait vraiment changer de méthode.",
  },
  {
    id: "facile-03",
    name: "La boîte de réception",
    story:
      "Trois mails viennent d'arriver sur le poste de l'administrateur. L'un d'eux est un piège du pirate. Démasque-le pour ouvrir la porte.",
    card: {
      title: "Le phishing",
      category: "Social",
      icon: "🎣",
      summary: "Un faux message qui se fait passer pour un vrai pour te voler tes accès.",
      details: [
        "Le phishing (hameçonnage) imite un service connu pour te pousser à cliquer ou à donner ton mot de passe.",
        "Signes typiques : urgence, menace, demande d'identifiants, adresse d'expéditeur bizarre.",
        "Le texte d'un lien peut mentir : regarde l'adresse réelle avant de cliquer.",
      ],
      hint: "Le vrai domaine de l'entreprise est serveur-corp.fr. Compare les expéditeurs et inspecte les liens.",
    },
    puzzle: {
      kind: "phishing",
      emails: [
        {
          id: "rh",
          fromName: "Service RH",
          fromAddress: "rh@serveur-corp.fr",
          subject: "Planning des congés de décembre",
          body: "Bonjour, le planning des congés de fin d'année est disponible sur l'intranet. Merci de valider tes dates avant le 30 novembre.",
          linkText: "Voir le planning",
          linkHref: "https://intranet.serveur-corp.fr/conges",
          isPhishing: false,
          explanation: "Expéditeur et lien sur le vrai domaine serveur-corp.fr, sans urgence ni menace : ce mail est légitime.",
        },
        {
          id: "it",
          fromName: "Support Informatique",
          fromAddress: "support@serveur-c0rp-securite.com",
          subject: "URGENT : votre compte sera supprimé dans 1 heure",
          body: "Nous avons détecté une activité suspecte. Sans action de votre part, votre compte sera définitivement supprimé dans 1 heure. Confirmez votre mot de passe immédiatement.",
          linkText: "https://serveur-corp.fr/connexion",
          linkHref: "http://serveur-c0rp-securite.com/vol-identifiants",
          isPhishing: true,
          explanation: "Urgence, menace, demande de mot de passe, faux domaine et lien trompeur : c'est du phishing.",
        },
        {
          id: "newsletter",
          fromName: "Équipe Sécurité",
          fromAddress: "securite@serveur-corp.fr",
          subject: "Rappel : la sensibilisation cyber, c'est jeudi",
          body: "Petit rappel : la session de sensibilisation à la cybersécurité a lieu jeudi à 14 h en salle B. Aucune inscription nécessaire.",
          linkText: "Ajouter à mon agenda",
          linkHref: "https://agenda.serveur-corp.fr/sensibilisation",
          isPhishing: false,
          explanation: "Domaine officiel, ton neutre, aucune information demandée : ce mail est légitime.",
        },
      ],
    },
    successText: "Bien vu ! Le faux mail est signalé, la porte se déverrouille.",
  },
  {
    id: "facile-04",
    name: "Le coffre encodé",
    story:
      "Un coffre-fort numérique bloque le passage. Sur un post-it collé à l'écran, une suite de caractères étrange. Le pirate pensait l'avoir « cachée ».",
    card: {
      title: "Base64",
      category: "Crypto",
      icon: "🔤",
      summary: "Un encodage, pas un chiffrement : tout le monde peut le décoder.",
      details: [
        "Base64 transforme des données en texte avec 64 caractères (A–Z, a–z, 0–9, + et /).",
        "On le reconnaît souvent au signe = à la fin.",
        "Il n'y a aucune clé : encoder n'est pas protéger.",
      ],
      hint: "Cette chaîne finit par « == » : c'est du Base64. Ajoute l'étape « Base64 → texte » dans l'atelier.",
    },
    puzzle: {
      kind: "answer",
      intro: "Sur le post-it :",
      content: toBase64("sentinelle"),
      tools: ["base64"],
      workshopInput: toBase64("sentinelle"),
      question: "Code du coffre (le mot décodé)",
      answers: ["sentinelle"],
    },
    successText: "Le coffre s'ouvre. Encoder, ce n'est vraiment pas chiffrer !",
  },
  {
    id: "facile-05",
    name: "Le nouveau mot de passe",
    story:
      "Un écran te propose de réinitialiser le mot de passe de la porte. Choisis-en un que le pirate ne pourra pas deviner.",
    card: {
      title: "Les mots de passe robustes",
      category: "Mots de passe",
      icon: "🔑",
      summary: "La longueur bat la complexité : une phrase de passe vaut mieux qu'un mot tordu.",
      details: [
        "Les pirates testent d'abord les mots de passe connus et leurs variantes (P@ssw0rd, Admin2024!…).",
        "Chaque caractère ajouté multiplie le nombre de combinaisons à tester.",
        "Une phrase de passe de plusieurs mots au hasard est longue et facile à retenir.",
      ],
      hint: "Cherche le plus long, celui qui n'est pas une variante d'un mot connu.",
    },
    puzzle: {
      kind: "choice",
      question: "Quel mot de passe choisis-tu ?",
      options: [
        { label: "Admin2024!", correct: false, explanation: "Mot connu + année + « ! » : un des premiers schémas testés." },
        { label: "P@ssw0rd", correct: false, explanation: "Remplacer des lettres par des symboles ne trompe personne : il est dans toutes les listes." },
        { label: "Nuage-Velo-Citron-Tempete-92", correct: true, explanation: "Long, fait de mots au hasard et facile à retenir : une vraie phrase de passe." },
        { label: "azerty123", correct: false, explanation: "Une suite du clavier : l'un des mots de passe les plus utilisés au monde." },
      ],
    },
    successText: "Mot de passe changé. Cette porte-là, le pirate ne la rouvrira pas.",
  },
  {
    id: "facile-06",
    name: "Le guichet en ligne",
    story:
      "Pour sortir, tu dois te connecter au site de ta banque, la Banque Horizon. Trois liens s'affichent. Un seul est le vrai site sécurisé.",
    card: {
      title: "HTTPS et le cadenas",
      category: "Web",
      icon: "🔒",
      summary: "HTTPS chiffre la connexion, mais ne prouve pas que le site est honnête.",
      details: [
        "HTTP envoie tout en clair : n'importe qui sur le réseau peut lire ce que tu tapes.",
        "HTTPS chiffre les échanges entre ton navigateur et le site (le petit cadenas).",
        "Un site pirate peut aussi avoir HTTPS : vérifie toujours le nom de domaine.",
      ],
      hint: "Il faut HTTPS ET le bon domaine. Le vrai domaine, c'est ce qui est juste avant le premier « / ».",
    },
    puzzle: {
      kind: "choice",
      question: "Sur quel lien peux-tu taper ton mot de passe ?",
      options: [
        { label: "http://banque-horizon.fr/connexion", correct: false, explanation: "Bon domaine, mais en HTTP : ton mot de passe circulerait en clair." },
        { label: "https://banque-horizon.fr/connexion", correct: true, explanation: "HTTPS et le vrai domaine banque-horizon.fr : c'est le bon." },
        { label: "https://banque-horizon.fr.connexion-securisee.xyz", correct: false, explanation: "Le vrai domaine est connexion-securisee.xyz. Le cadenas ne garantit rien." },
      ],
    },
    successText: "Connexion sécurisée. Tu as lu l'adresse jusqu'au bout, bravo.",
  },
  {
    id: "facile-07",
    name: "Le parking souterrain",
    story:
      "Par terre, une clé USB étiquetée « Salaires 2027 – CONFIDENTIEL ». Elle a l'air tombée d'une poche. Un poste de travail est allumé juste à côté.",
    card: {
      title: "Les clés USB piégées",
      category: "Social",
      icon: "💾",
      summary: "Une clé USB trouvée par hasard est peut-être un appât.",
      details: [
        "Le « baiting » consiste à laisser traîner une clé piégée en comptant sur la curiosité.",
        "Brancher la clé suffit parfois à infecter l'ordinateur (fichiers piégés ou fausse clé qui tape au clavier).",
        "Le bon réflexe : ne pas la brancher et la remettre au service informatique ou sécurité.",
      ],
      hint: "L'étiquette alléchante est faite pour te donner envie de la brancher…",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu de cette clé USB ?",
      options: [
        { label: "Je la branche pour trouver à qui elle appartient", correct: false, explanation: "C'est exactement ce qu'espère le pirate : la clé peut infecter le poste dès qu'elle est branchée." },
        { label: "Je la branche sur un vieil ordinateur sans importance", correct: false, explanation: "Un poste infecté reste dans le réseau et peut servir de porte d'entrée." },
        { label: "Je la remets au service sécurité sans la brancher", correct: true, explanation: "Parfait : l'équipe sécurité pourra l'analyser sans risque." },
        { label: "Je la jette à la poubelle", correct: false, explanation: "Mieux que la brancher, mais l'équipe sécurité doit savoir qu'un appât circule." },
      ],
    },
    successText: "L'équipe sécurité récupère la clé : elle contenait bien un logiciel malveillant.",
  },
  {
    id: "facile-08",
    name: "Le bureau de l'admin",
    story:
      "Tu entres dans le bureau de l'administrateur. Son poste est verrouillé, mais il n'a pas l'air très rigoureux. Fouille le bureau.",
    card: {
      title: "La sécurité physique",
      category: "Défense",
      icon: "🗄️",
      summary: "Le meilleur mot de passe ne sert à rien s'il est collé sous le clavier.",
      details: [
        "Un attaquant qui entre dans un bureau regarde d'abord post-it, carnets et écrans.",
        "La politique du « bureau propre » : rien de sensible ne traîne quand on s'absente.",
        "On verrouille son poste (Windows + L) dès qu'on quitte sa place.",
      ],
      hint: "Regarde sous les objets : clavier, tapis de souris, écran…",
    },
    puzzle: {
      kind: "answer",
      intro: "Ce que tu trouves sur le bureau :",
      contentLabel: "inventaire.txt",
      content: `- Un écran verrouillé : « Session : admin »
- Un mug « Meilleur admin du monde »
- Une plante en plastique
- Un post-it collé SOUS le clavier : « session → Soleil2026 »
- Une photo de chat avec écrit « Moustache, 2019 »`,
      question: "Mot de passe de la session admin",
      answers: ["Soleil2026"],
    },
    successText: "Session déverrouillée. Le post-it a fini à la broyeuse.",
  },
  {
    id: "facile-09",
    name: "La double porte",
    story:
      "Deux portes à la suite, deux preuves d'identité différentes. Le système te demande de choisir une vraie double authentification.",
    card: {
      title: "La double authentification",
      category: "Mots de passe",
      icon: "📲",
      summary: "Deux preuves de natures différentes valent bien mieux qu'un seul mot de passe.",
      details: [
        "Trois familles de preuves : ce que tu sais (mot de passe), ce que tu as (téléphone, clé), ce que tu es (empreinte).",
        "La MFA combine au moins deux familles différentes.",
        "Même si ton mot de passe fuite, le pirate est bloqué sans le deuxième facteur.",
      ],
      hint: "Deux choses que tu SAIS, ça reste une seule famille de preuve.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle combinaison est une vraie double authentification ?",
      options: [
        { label: "Mot de passe + question secrète", correct: false, explanation: "Deux choses que tu sais : c'est la même famille de preuve." },
        { label: "Mot de passe + code reçu sur ton téléphone", correct: true, explanation: "Ce que tu sais + ce que tu as : deux familles différentes." },
        { label: "Mot de passe + un deuxième mot de passe", correct: false, explanation: "Toujours la même famille : si l'un fuite, l'autre peut fuiter aussi." },
      ],
    },
    successText: "Les deux portes s'ouvrent l'une après l'autre.",
  },
  {
    id: "facile-10",
    name: "La fenêtre surgissante",
    story:
      "Une fenêtre clignote : « Votre système est obsolète ! Téléchargez la mise à jour urgente : maj-windows-2026.exe ». Le dernier verrou du niveau en dépend.",
    card: {
      title: "Les mises à jour",
      category: "Défense",
      icon: "🔄",
      summary: "Se mettre à jour, oui. Mais uniquement par les voies officielles.",
      details: [
        "Les mises à jour corrigent des failles connues : un système pas à jour est une cible facile.",
        "Les fausses alertes de mise à jour sont un piège classique pour installer un malware.",
        "On met à jour depuis les paramètres du système ou le site officiel, jamais depuis une pop-up.",
      ],
      hint: "Une vraie mise à jour Windows ne se télécharge pas depuis une fenêtre de site web.",
    },
    puzzle: {
      kind: "choice",
      question: "Comment mets-tu le système à jour ?",
      options: [
        { label: "Je télécharge maj-windows-2026.exe depuis la fenêtre", correct: false, explanation: "C'est un faux : le fichier est un malware déguisé." },
        { label: "Je ferme la fenêtre et je passe par les paramètres de Windows Update", correct: true, explanation: "La seule source fiable, ce sont les paramètres officiels du système." },
        { label: "Je ne fais jamais de mises à jour, c'est trop risqué", correct: false, explanation: "Un système jamais mis à jour garde toutes ses failles connues." },
      ],
    },
    successText: "Système à jour, faux fichier évité. Mi-parcours du niveau atteint !",
  },
];
