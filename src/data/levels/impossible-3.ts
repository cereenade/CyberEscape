import { atbash, caesar, reverse, toBase64, toDecimal, toHex, toUrl, toXorHex, vigenereEncode } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const PACKED = toUrl(toBase64(toHex(reverse(caesar("LE CHARGEUR CACHE LE MOT CRISTAL", 13)), "")));
const KEY_MANAGEMENT = toBase64(vigenereEncode("UNE CLE NOTEE QUELQUE PART FINIT TOUJOURS PAR FUIR LE CODE EST VERTIGE", "PRISME"));
const HOMEMADE = toDecimal(atbash("MON ALGORITHME SECRET EST INVIOLABLE LE CODE EST GALAXIE"));
const FINAL = toDecimal(toBase64(toXorHex("LE SERVEUR EST LIBRE POUR TOUJOURS : MOT FINAL ODYSSEE", "aurore")));

/** Salles 21 à 40 du niveau Impossible. */
export const IMPOSSIBLE_3: RoomContent[] = [
  {
    id: "impossible-21",
    name: "Le chargeur",
    story:
      "Le dernier malware du pirate est emballé dans cinq couches de protection. Aucune indication cette fois : à toi de reconnaître chaque couche à son allure.",
    card: {
      title: "Les packers",
      category: "Défense",
      icon: "📦",
      summary: "Compresser ou chiffrer un programme pour cacher son vrai code aux antivirus.",
      details: [
        "Un packer emballe le code malveillant ; un petit programme le déballe en mémoire au lancement.",
        "Sur le disque, l'antivirus ne voit que l'emballage, différent à chaque version.",
        "Les analystes déballent couche par couche, ou laissent le malware se déballer dans un bac à sable.",
      ],
      hint: "%XX → URL. = à la fin → Base64. Que des 0–9 a–f → Hex. Puis le texte est à l'envers, et il reste une rotation de 13.",
    },
    puzzle: {
      kind: "answer",
      content: PACKED,
      tools: ["url", "base64", "hex", "binary", "decimal", "reverse", "rot13", "caesar", "atbash"],
      workshopInput: PACKED,
      question: "Quel mot cache le chargeur ?",
      answers: ["cristal"],
    },
    successText: "Cinq couches défaites à la main. Un vrai travail d'analyste malware.",
  },
  {
    id: "impossible-22",
    name: "Le trousseau du pirate",
    story:
      "Un message chiffré au Vigenère, puis encodé en Base64. Une note dit : « Pour la clé, j'ai repris le code du miroir que tu as brisé au niveau Moyen. »",
    card: {
      title: "La gestion des clés",
      category: "Crypto",
      icon: "🗝️",
      summary: "Le chiffrement le plus solide ne vaut rien si la clé est mal gardée.",
      details: [
        "Générer des clés aléatoires, les stocker dans un coffre (HSM, gestionnaire de secrets), les faire tourner régulièrement.",
        "Ne jamais réutiliser une clé d'un usage à l'autre, ni la noter en clair.",
        "En pratique, on attaque rarement l'algorithme : on vole ou on devine la clé.",
      ],
      hint: "Le miroir du niveau Moyen, c'est la salle 11 : son code sert de clé Vigenère (après le Base64).",
    },
    puzzle: {
      kind: "answer",
      content: KEY_MANAGEMENT,
      tools: ["base64", "vigenere", "caesar", "atbash", "reverse", "hex"],
      workshopInput: KEY_MANAGEMENT,
      question: "Quel est le code ?",
      answers: ["vertige"],
    },
    successText: "Clé réutilisée, message lu. Le pirate n'apprend décidément pas.",
  },
  {
    id: "impossible-23",
    name: "L'algorithme maison",
    story:
      "Le pirate se vante d'avoir inventé son propre chiffrement, « impossible à casser parce que personne ne sait comment il marche ». Voici son message.",
    card: {
      title: "La cryptographie maison",
      category: "Crypto",
      icon: "🏚️",
      summary: "Inventer son propre chiffrement est presque toujours une mauvaise idée.",
      details: [
        "Un algorithme secret ne reste jamais secret longtemps, et il n'a pas été éprouvé par des experts.",
        "Principe de Kerckhoffs : la sécurité doit reposer uniquement sur la clé.",
        "On utilise des standards publics et audités (AES, ChaCha20) via des bibliothèques reconnues.",
      ],
      hint: "Des nombres de 65 à 90 : décimal. Ensuite, le résultat ressemble à un alphabet retourné…",
    },
    puzzle: {
      kind: "answer",
      content: HOMEMADE,
      tools: ["decimal", "hex", "binary", "atbash", "rot13", "caesar", "reverse"],
      workshopInput: HOMEMADE,
      question: "Quel est le code ?",
      answers: ["galaxie"],
    },
    successText: "« Inviolable » en deux étapes. Kerckhoffs avait raison.",
  },
  {
    id: "impossible-24",
    name: "Le ticket en or",
    story:
      "Après avoir volé le hash du compte spécial KRBTGT de l'Active Directory, le pirate fabrique ses propres tickets Kerberos, valables 10 ans, pour n'importe quel utilisateur.",
    card: {
      title: "Le golden ticket",
      category: "Système",
      icon: "🎟️",
      summary: "Un faux ticket Kerberos qui donne un accès total et durable à tout le domaine.",
      details: [
        "Le compte KRBTGT signe tous les tickets Kerberos du domaine.",
        "Avec son hash, l'attaquant forge des tickets pour n'importe qui, avec n'importe quels droits et n'importe quelle durée.",
        "Remédiation : changer deux fois le mot de passe du compte KRBTGT, après avoir chassé l'attaquant.",
      ],
      hint: "Quel compte signe tous les tickets ? C'est son secret qu'il faut changer.",
    },
    puzzle: {
      kind: "choice",
      question: "Que faut-il faire pour invalider les tickets forgés ?",
      options: [
        { label: "Changer le mot de passe de l'administrateur", correct: false, explanation: "Les tickets restent signés par KRBTGT : ils resteraient valables." },
        { label: "Changer deux fois le mot de passe du compte KRBTGT", correct: true, explanation: "Les anciens tickets ne peuvent plus être vérifiés : ils deviennent invalides." },
        { label: "Redémarrer le contrôleur de domaine", correct: false, explanation: "Ça ne change pas la clé qui signe les tickets." },
      ],
    },
    successText: "KRBTGT changé deux fois. Les tickets en or ne valent plus rien.",
  },
  {
    id: "impossible-25",
    name: "Le pipeline",
    story:
      "Le pirate a proposé une pull request sur un projet open source. Le pipeline d'intégration continue l'a exécutée… avec accès aux secrets du projet.",
    card: {
      title: "La sécurité des pipelines CI/CD",
      category: "Défense",
      icon: "🏭",
      summary: "Les pipelines de build ont souvent accès aux secrets : ce sont des cibles de choix.",
      details: [
        "Un pipeline qui exécute le code d'une contribution externe avec des secrets peut les faire fuiter.",
        "Sur GitHub Actions, le déclencheur pull_request_target associé au checkout du code de la PR est un piège connu.",
        "Parades : permissions minimales, secrets jamais exposés au code non relu, actions épinglées par version.",
      ],
      hint: "Le code d'un inconnu a tourné avec les secrets du projet.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: ".github/workflows/test.yml",
      content: `on: pull_request_target
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - run: npm install && npm test
        env:
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}`,
      question: "Quel est le problème de ce workflow ?",
      options: [
        { label: "Il utilise npm au lieu de yarn", correct: false, explanation: "Le gestionnaire de paquets n'est pas en cause." },
        { label: "Il exécute le code de la pull request externe avec accès aux secrets", correct: true, explanation: "Un attaquant peut modifier les tests pour envoyer NPM_TOKEN chez lui." },
        { label: "Il n'y a aucun problème", correct: false, explanation: "C'est une faille connue de la chaîne d'approvisionnement." },
      ],
    },
    successText: "Workflow corrigé, jeton NPM révoqué. La chaîne d'approvisionnement est protégée.",
  },
  {
    id: "impossible-26",
    name: "La double dépense",
    story:
      "Le pirate a envoyé 50 demandes de retrait simultanées sur un compte contenant 100 €. Le site a vérifié le solde pour chacune… avant de le débiter. Il a retiré 5 000 €.",
    card: {
      title: "Les conditions de course",
      category: "Web",
      icon: "🏎️",
      summary: "Une faille qui apparaît quand plusieurs actions simultanées se marchent dessus.",
      details: [
        "Entre la vérification (« le solde suffit ») et l'action (« débiter »), d'autres requêtes peuvent passer.",
        "On parle de race condition, ou de TOCTOU (time of check to time of use).",
        "Parades : opérations atomiques, verrous, transactions en base de données.",
      ],
      hint: "Toutes les requêtes ont vu le même solde, au même moment.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle faille le pirate a-t-il exploitée ?",
      options: [
        { label: "Une injection SQL", correct: false, explanation: "Aucune requête n'a été modifiée." },
        { label: "Une condition de course entre la vérification et le débit", correct: true, explanation: "Les requêtes simultanées ont toutes passé la vérification avant le débit." },
        { label: "Un vol de mot de passe", correct: false, explanation: "Le pirate utilisait son propre compte." },
      ],
    },
    successText: "Débit et vérification sont maintenant une seule opération atomique.",
  },
  {
    id: "impossible-27",
    name: "L'objet empoisonné",
    story:
      "Le site stocke l'état du panier dans un cookie, sous forme d'objet sérialisé que le serveur reconstruit à chaque visite. Le pirate a fabriqué un objet piégé.",
    card: {
      title: "La désérialisation non sûre",
      category: "Web",
      icon: "🧪",
      summary: "Reconstruire un objet à partir de données non fiables peut exécuter du code.",
      details: [
        "La sérialisation transforme un objet en texte pour le stocker ; la désérialisation fait l'inverse.",
        "Dans certains langages, désérialiser des données contrôlées par l'attaquant peut déclencher l'exécution de code.",
        "Parades : ne jamais désérialiser des données de l'utilisateur, préférer du JSON simple et validé.",
      ],
      hint: "Le serveur fait confiance à un objet fabriqué… par le client.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle est la bonne correction ?",
      options: [
        { label: "Encoder l'objet en Base64 avant de le mettre dans le cookie", correct: false, explanation: "L'attaquant peut toujours décoder, modifier et réencoder." },
        { label: "Ne plus désérialiser de données venant du client (JSON simple, validé, ou stockage côté serveur)", correct: true, explanation: "Le serveur ne reconstruit plus d'objet contrôlé par l'attaquant." },
        { label: "Raccourcir la durée du cookie", correct: false, explanation: "L'attaque reste possible pendant toute cette durée." },
      ],
    },
    successText: "Le panier est désormais stocké côté serveur. Plus d'objet empoisonné.",
  },
  {
    id: "impossible-28",
    name: "Le calcul inattendu",
    story: "Dans le champ « Prénom » d'un formulaire, le pirate tape {{7*7}}. La page de confirmation affiche : « Bonjour 49 ! »",
    card: {
      title: "L'injection de template",
      category: "Web",
      icon: "🧮",
      summary: "Quand une saisie est interprétée par le moteur de modèles du serveur, elle peut exécuter du code.",
      details: [
        "Les moteurs de templates (Jinja2, Twig…) évaluent les expressions entre {{ }}.",
        "Si la saisie de l'utilisateur est insérée dans le modèle lui-même, l'attaquant peut faire exécuter des expressions, puis du code.",
        "Test classique : {{7*7}} qui renvoie 49. Parade : passer la saisie comme une donnée, jamais comme du modèle.",
      ],
      hint: "Le serveur a calculé 7 × 7 au lieu d'afficher le texte.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle faille ce test révèle-t-il ?",
      options: [
        { label: "Une injection de template côté serveur (SSTI)", correct: true, explanation: "Le moteur de modèles a évalué l'expression : on peut aller jusqu'à l'exécution de code." },
        { label: "Une faille XSS", correct: false, explanation: "Le calcul a été fait par le serveur, pas par le navigateur." },
        { label: "Une erreur de calcul sans danger", correct: false, explanation: "C'est la preuve que le serveur exécute ce que tape l'utilisateur." },
      ],
    },
    successText: "SSTI confirmée et corrigée : le prénom est maintenant traité comme une simple donnée.",
  },
  {
    id: "impossible-29",
    name: "L'entité externe",
    story: "L'API du pirate accepte des documents XML. Tu lui envoies un document qui déclare une « entité » pointant vers un fichier du serveur. La réponse contient… ce fichier.",
    card: {
      title: "La faille XXE",
      category: "Web",
      icon: "📄",
      summary: "Un document XML qui fait lire au serveur ses propres fichiers.",
      details: [
        "XML permet de déclarer des entités externes, par exemple vers file:///etc/passwd.",
        "Un analyseur XML mal configuré les résout et insère le contenu du fichier dans la réponse.",
        "Parade : désactiver les entités externes (DTD) dans l'analyseur XML.",
      ],
      hint: "Regarde la déclaration ENTITY et le SYSTEM qui la suit.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "document envoyé",
      content: `<?xml version="1.0"?>
<!DOCTYPE commande [
  <!ENTITY secret SYSTEM "file:///etc/passwd">
]>
<commande><produit>&secret;</produit></commande>`,
      question: "Quelle faille ce document exploite-t-il ?",
      options: [
        { label: "XXE (entité externe XML)", correct: true, explanation: "L'entité pointe vers un fichier local que le serveur va lire." },
        { label: "Injection SQL", correct: false, explanation: "Aucune base de données n'est visée." },
        { label: "CSRF", correct: false, explanation: "Aucune action n'est déclenchée à l'insu d'un utilisateur." },
      ],
    },
    successText: "Entités externes désactivées. L'API ne lit plus ses propres fichiers.",
  },
  {
    id: "impossible-30",
    name: "Le plan de l'API",
    story: "L'API GraphQL du pirate a laissé l'introspection activée : en une requête, elle décrit toutes ses opérations, y compris celles qui ne sont pas censées être visibles.",
    card: {
      title: "La sécurité GraphQL",
      category: "Web",
      icon: "🕸️",
      summary: "Une API GraphQL bavarde peut révéler toute sa structure, opérations cachées comprises.",
      details: [
        "L'introspection permet de demander à une API GraphQL la liste de tous ses types et opérations.",
        "Utile en développement, elle doit être désactivée en production.",
        "Il faut aussi contrôler les droits sur chaque opération et limiter la profondeur des requêtes.",
      ],
      hint: "Cherche l'opération (mutation) la plus dangereuse.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "réponse à la requête { __schema { mutationType { fields { name } } } }",
      content: `{
  "mutationType": {
    "fields": [
      { "name": "creerCommande" },
      { "name": "modifierAdresse" },
      { "name": "adminSupprimerTousLesComptes" }
    ]
  }
}`,
      question: "Quelle mutation dangereuse l'introspection révèle-t-elle ?",
      answers: ["adminSupprimerTousLesComptes"],
    },
    successText: "Introspection désactivée, et la mutation est réservée aux vrais administrateurs.",
  },
  {
    id: "impossible-31",
    name: "Le chronomètre",
    story:
      "Le coffre du pirate vérifie un code à 4 chiffres, chiffre par chiffre, et s'arrête dès qu'un chiffre est faux. Plus un chiffre est juste, plus la réponse met de temps. Tu as mesuré les temps.",
    card: {
      title: "Les attaques temporelles",
      category: "Crypto",
      icon: "⏱️",
      summary: "Le temps de réponse d'un système peut trahir ses secrets.",
      details: [
        "Une comparaison qui s'arrête au premier caractère faux répond plus vite quand l'erreur arrive tôt.",
        "En mesurant les temps, on devine le secret caractère par caractère.",
        "Parade : des comparaisons à temps constant, qui prennent toujours la même durée.",
      ],
      hint: "Pour chaque position, le chiffre correct est celui qui fait attendre le plus longtemps.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "temps de réponse (ms) selon le chiffre essayé",
      content: `            0    1    2    3    4    5    6    7    8    9
Position 1  101  102  100  101  103  102  101  154  100  102
Position 2  155  153  154  207  155  154  156  153  155  154
Position 3  257  206  208  207  205  209  207  206  208  207
Position 4  258  257  259  256  257  311  258  257  256  259
(code 0000 : 100 ms ; chaque chiffre juste ajoute environ 50 ms)`,
      question: "Quel est le code du coffre ?",
      answers: ["7305"],
    },
    successText: "7305. Le coffre utilise maintenant une comparaison à temps constant.",
  },
  {
    id: "impossible-32",
    name: "Le départ discret",
    story: "Un employé quitte l'entreprise vendredi. Les journaux de la semaine montrent un comportement inhabituel chez l'un des membres de l'équipe.",
    card: {
      title: "La menace interne",
      category: "Défense",
      icon: "🕴️",
      summary: "Un employé ou prestataire qui abuse de ses accès, volontairement ou par erreur.",
      details: [
        "Elle est difficile à détecter : l'utilisateur a des accès légitimes.",
        "Signaux : téléchargements massifs, accès hors horaires, données envoyées vers un stockage personnel, surtout avant un départ.",
        "Parades : moindre privilège, surveillance des volumes (DLP), retrait des accès dès le départ.",
      ],
      hint: "Compare les volumes et les destinations avec les habitudes de chacun.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "téléchargements depuis le serveur de fichiers (lundi → jeudi)",
      content: `Utilisateur   Volume moyen/jour   Cette semaine       Destination
a.martin      120 Mo              130 Mo / jour       poste de travail
j.robert      80 Mo               14 Go (jeudi 22h)   clé USB + stockage perso
s.nguyen      200 Mo              190 Mo / jour       poste de travail`,
      question: "Quel utilisateur présente le comportement suspect ?",
      answers: ["j.robert"],
    },
    successText: "Exfiltration interne stoppée. Les accès de j.robert sont suspendus.",
  },
  {
    id: "impossible-33",
    name: "La perte acceptable",
    story: "Le plan de reprise de l'entreprise indique que les sauvegardes ont lieu chaque nuit à minuit. Un rançongiciel frappe à 23 h 30.",
    card: {
      title: "RTO et RPO",
      category: "Défense",
      icon: "⏲️",
      summary: "Combien de données peut-on perdre, et combien de temps peut-on rester à l'arrêt ?",
      details: [
        "RPO (Recovery Point Objective) : la perte de données maximale acceptable, fixée par la fréquence des sauvegardes.",
        "RTO (Recovery Time Objective) : la durée maximale d'interruption avant la remise en service.",
        "Ils sont définis dans le plan de continuité (PCA) et de reprise (PRA), en fonction des besoins métier.",
      ],
      hint: "Avec une sauvegarde par jour, quelle est la pire perte possible ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "plan de reprise d'activité (extrait)",
      content: `Sauvegarde complète : chaque nuit à 00:00
Restauration testée : 6 heures
Incident            : rançongiciel à 23:30`,
      question: "Combien d'heures de données au maximum (le RPO) sont perdues avec ce plan ?",
      answers: ["24", "24h", "24 h", "24 heures"],
    },
    successText: "RPO de 24 h confirmé : l'entreprise passe à des sauvegardes toutes les heures.",
  },
  {
    id: "impossible-34",
    name: "Le château sans remparts",
    story: "La direction pense que tout ce qui est dans le réseau interne est sûr. Le pirate, déjà à l'intérieur, en profite. Quel modèle adopter ?",
    card: {
      title: "Le Zero Trust",
      category: "Défense",
      icon: "🚫",
      summary: "Ne jamais faire confiance par défaut : chaque accès est vérifié, même de l'intérieur.",
      details: [
        "Le modèle « château fort » protège le périmètre, mais tout est ouvert une fois à l'intérieur.",
        "Zero Trust : vérifier l'identité (MFA), l'appareil et le contexte à chaque accès, avec des droits minimaux.",
        "Tout est journalisé et le réseau est segmenté pour limiter les déplacements.",
      ],
      hint: "« Ne jamais faire confiance, toujours vérifier. »",
    },
    puzzle: {
      kind: "choice",
      question: "Quel modèle répond au problème ?",
      options: [
        { label: "Renforcer uniquement le pare-feu d'entrée", correct: false, explanation: "Le pirate est déjà à l'intérieur : le périmètre ne suffit plus." },
        { label: "Le Zero Trust : vérifier chaque accès, même interne", correct: true, explanation: "Être dans le réseau ne donne plus aucun droit automatique." },
        { label: "Donner les droits admin à tous pour simplifier", correct: false, explanation: "C'est l'inverse du moindre privilège." },
      ],
    },
    successText: "Feuille de route Zero Trust adoptée. Le réseau interne n'est plus une zone de confiance.",
  },
  {
    id: "impossible-35",
    name: "La faille trouvée",
    story: "En jouant sur un site marchand, tu découvres une faille qui affiche les commandes des autres clients. Remets les étapes de la divulgation responsable dans l'ordre.",
    card: {
      title: "La divulgation responsable",
      category: "Défense",
      icon: "📬",
      summary: "Signaler une faille discrètement et laisser le temps de la corriger avant d'en parler.",
      details: [
        "On s'arrête dès que la faille est prouvée : pas d'exploitation, pas de téléchargement de données.",
        "On prévient l'organisation par un canal dédié (security.txt, programme de bug bounty), ou via l'ANSSI.",
        "On laisse un délai raisonnable pour corriger avant toute publication.",
      ],
      hint: "Arrêter, documenter, prévenir, attendre, publier.",
    },
    puzzle: {
      kind: "order",
      question: "Dans quel ordre agir ?",
      items: [
        "Arrêter les tests sans exploiter ni télécharger de données",
        "Documenter la faille (étapes, impact) de façon minimale",
        "Prévenir l'organisation par un canal de sécurité dédié",
        "Laisser le temps de corriger avant toute publication",
      ],
    },
    successText: "Faille signalée et corrigée en 10 jours. Le site t'a même remercié publiquement.",
  },
  {
    id: "impossible-36",
    name: "Les couleurs de l'équipe",
    story: "L'entreprise organise un exercice : une équipe attaque, une autre défend, et une troisième les fait travailler ensemble pour améliorer la détection.",
    card: {
      title: "Red, blue et purple team",
      category: "Défense",
      icon: "🎨",
      summary: "Attaquants, défenseurs et ceux qui les font progresser ensemble.",
      details: [
        "Red team : simule un vrai attaquant, avec autorisation, sur toute l'organisation.",
        "Blue team : défend, détecte et répond (le SOC).",
        "Purple team : rouges et bleus travaillent ensemble, technique par technique, pour combler les trous de détection.",
      ],
      hint: "Rouge + bleu = …",
    },
    puzzle: {
      kind: "choice",
      question: "Comment s'appelle l'équipe qui fait collaborer attaquants et défenseurs ?",
      options: [
        { label: "La red team", correct: false, explanation: "Elle joue l'attaquant." },
        { label: "La blue team", correct: false, explanation: "Elle défend." },
        { label: "La purple team", correct: true, explanation: "Rouge + bleu : elle fait progresser la détection avec les deux équipes." },
      ],
    },
    successText: "Exercice purple team terminé : 9 nouvelles détections créées.",
  },
  {
    id: "impossible-37",
    name: "Les preuves",
    story: "Le serveur compromis va servir de preuve si l'entreprise porte plainte. Quelles précautions l'enquêteur doit-il prendre ?",
    card: {
      title: "La préservation des preuves",
      category: "Défense",
      icon: "🧾",
      summary: "Une preuve numérique mal collectée peut être contestée et devenir inutilisable.",
      details: [
        "On capture la mémoire vive avant d'éteindre une machine allumée : elle contient des traces précieuses.",
        "On travaille sur une copie bit à bit du disque, dont on calcule l'empreinte (hash) pour prouver qu'elle n'a pas changé.",
        "La chaîne de possession documente qui a manipulé la preuve, quand et pourquoi.",
      ],
      hint: "Il y a quatre bonnes pratiques. Analyser directement l'original n'en fait pas partie.",
    },
    puzzle: {
      kind: "multi",
      question: "Quelles sont les bonnes pratiques ?",
      options: [
        { label: "Capturer la mémoire vive avant d'éteindre la machine", correct: true, explanation: "Une fois éteinte, la RAM est perdue." },
        { label: "Faire une copie bit à bit du disque et calculer son hash", correct: true, explanation: "Le hash prouve que la copie est identique et n'a pas été modifiée." },
        { label: "Analyser directement le disque original", correct: false, explanation: "On risque de modifier la preuve : on travaille toujours sur une copie." },
        { label: "Tenir à jour la chaîne de possession", correct: true, explanation: "Elle prouve qui a eu la preuve entre les mains, et quand." },
        { label: "Noter précisément l'heure et chaque action réalisée", correct: true, explanation: "Une enquête documentée est une enquête défendable." },
      ],
    },
    successText: "Preuves collectées dans les règles. Elles seront recevables.",
  },
  {
    id: "impossible-38",
    name: "La chaîne des relais",
    story: "Un mail de phishing a traversé plusieurs serveurs avant d'arriver. Chaque serveur a ajouté une ligne « Received » en haut des en-têtes. Trouve l'adresse d'origine.",
    card: {
      title: "Lire la chaîne Received",
      category: "Social",
      icon: "🧭",
      summary: "Les en-têtes Received se lisent de bas en haut pour remonter à l'origine d'un mail.",
      details: [
        "Chaque serveur ajoute sa ligne Received au-dessus des précédentes.",
        "La ligne la plus basse est donc la plus proche de l'expéditeur.",
        "Les lignes ajoutées par tes propres serveurs sont fiables ; celles d'avant peuvent être falsifiées.",
      ],
      hint: "La première ligne ajoutée est tout en bas.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "en-têtes Received (dans l'ordre affiché)",
      content: `Received: from mx.serveur-corp.fr (10.0.0.25) by boite.serveur-corp.fr
Received: from relais.mail-envoi.net (192.0.2.44) by mx.serveur-corp.fr
Received: from [203.0.113.200] (poste-pirate) by relais.mail-envoi.net`,
      question: "Quelle est l'adresse IP d'origine du mail ?",
      answers: ["203.0.113.200"],
      placeholder: "ex. 192.168.1.1",
    },
    successText: "Origine retrouvée : 203.0.113.200. L'adresse est bloquée et signalée.",
  },
  {
    id: "impossible-39",
    name: "La fausse signature",
    story: "Le rapport d'un éditeur affirme : « L'attaque vient du groupe X, car le malware contient des commentaires dans sa langue. » Faut-il le croire sur parole ?",
    card: {
      title: "L'attribution",
      category: "Défense",
      icon: "🕵️‍♀️",
      summary: "Désigner un coupable est difficile : les indices peuvent être de fausses pistes.",
      details: [
        "Langue, fuseau horaire des compilations, outils utilisés : chaque indice peut être imité.",
        "Certains groupes plantent volontairement de faux indices (false flags) pour accuser d'autres.",
        "Une attribution sérieuse croise de nombreux éléments techniques et du renseignement, et reste prudente.",
      ],
      hint: "Un indice facile à imiter n'est pas une preuve.",
    },
    puzzle: {
      kind: "choice",
      question: "Que penser de cette attribution ?",
      options: [
        { label: "C'est une preuve suffisante", correct: false, explanation: "Des commentaires se rédigent dans n'importe quelle langue." },
        { label: "C'est un indice faible, qui peut être une fausse piste volontaire", correct: true, explanation: "L'attribution exige de croiser beaucoup d'éléments et reste prudente." },
        { label: "L'attribution n'a jamais aucun intérêt", correct: false, explanation: "Elle aide la stratégie, mais doit être faite avec rigueur." },
      ],
    },
    successText: "Prudence validée : de nouvelles analyses désignent finalement un autre groupe.",
  },
  {
    id: "impossible-40",
    name: "Le dernier verrou",
    story:
      "La toute dernière porte du serveur. Le message final du pirate est protégé par trois couches. La clé XOR ? « Le dernier mot que tu as trouvé lors de la chasse finale. » Tout est lié.",
    card: {
      title: "La défense en profondeur",
      category: "Défense",
      icon: "🏯",
      summary: "Empiler plusieurs couches de protection pour qu'une seule faille ne suffise jamais.",
      details: [
        "Aucune protection n'est parfaite : on superpose formation, MFA, mises à jour, pare-feu, EDR, sauvegardes, surveillance…",
        "Si une couche cède, la suivante arrête ou ralentit l'attaquant, et le SOC a le temps de réagir.",
        "C'est le fil rouge des 200 salles : chaque carte est une couche de plus dans ta défense.",
      ],
      hint: "Décimal → Base64 → XOR. La clé est le dernier mot de la salle 20 de ce niveau (« La chasse finale »).",
    },
    puzzle: {
      kind: "answer",
      content: FINAL,
      tools: ["decimal", "base64", "hex", "binary", "reverse", "rot13", "caesar", "atbash", "url", "morse", "vigenere", "xor"],
      workshopInput: FINAL,
      question: "Quel est le mot final ?",
      answers: ["odyssee"],
    },
    successText: "ODYSSÉE. Les 200 salles sont ouvertes, le serveur est libre pour toujours. Tu as terminé CyberEscape : bravo !",
  },
];
