import { caesar, toBase64, toHex, vigenereEncode } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const CAESAR_UNKNOWN = caesar("BRAVO TU AS TROUVE LE DECALAGE LE MOT EST CATAPULTE", 17);
const VIGENERE = vigenereEncode("LA PORTE S OUVRE AVEC LE MOT HORLOGE", "ORACLE");
const DOUBLE = toBase64(toHex("le code est ECLIPSE"));

export const DIFFICILE: RoomContent[] = [
  {
    id: "difficile-01",
    name: "Le décalage perdu",
    story: "Un nouveau message chiffré au César. Cette fois, le pirate a changé de décalage, et il ne l'a écrit nulle part.",
    card: {
      title: "L'attaque par force brute",
      category: "Crypto",
      icon: "🔨",
      summary: "Tester toutes les possibilités une par une, jusqu'à trouver la bonne.",
      details: [
        "Quand les combinaisons sont peu nombreuses, on peut toutes les essayer.",
        "César n'a que 25 décalages : la force brute le casse en quelques secondes.",
        "Contre un bon mot de passe long, il faudrait des milliards d'années : la longueur protège.",
      ],
      hint: "Ajoute une étape César et fais varier le décalage de 1 à 25 jusqu'à lire du français.",
    },
    puzzle: {
      kind: "answer",
      content: CAESAR_UNKNOWN,
      tools: ["caesar"],
      workshopInput: CAESAR_UNKNOWN,
      question: "Quel est le mot caché ?",
      answers: ["catapulte"],
    },
    successText: "25 essais au maximum : César ne résiste pas à la force brute.",
  },
  {
    id: "difficile-02",
    name: "L'oracle",
    story: "Au centre de la pièce, une statue porte une inscription : « Seul l'ORACLE connaît la clé ». À ses pieds, un message chiffré.",
    card: {
      title: "Le chiffre de Vigenère",
      category: "Crypto",
      icon: "🗝️",
      summary: "Un César dont le décalage change à chaque lettre, selon un mot-clé.",
      details: [
        "La clé (ex. ORACLE) donne un décalage différent pour chaque lettre : O = 14, R = 17…",
        "Une même lettre ne donne donc pas toujours la même lettre chiffrée.",
        "Réputé « indéchiffrable » pendant 300 ans, il a fini par être cassé par l'analyse statistique.",
      ],
      hint: "La clé est écrite sur la statue, en majuscules.",
    },
    puzzle: {
      kind: "answer",
      content: VIGENERE,
      tools: ["vigenere", "caesar"],
      workshopInput: VIGENERE,
      question: "Quel mot ouvre la porte ?",
      answers: ["horloge"],
    },
    successText: "L'oracle s'incline. Vigenère n'a plus de secret pour toi.",
  },
  {
    id: "difficile-03",
    name: "Les poupées russes",
    story: "Le pirate a encodé son message… puis encodé le résultat. Il faut ouvrir les couches une par une, de l'extérieur vers l'intérieur.",
    card: {
      title: "Les encodages en chaîne",
      category: "Crypto",
      icon: "🪆",
      summary: "Encoder plusieurs fois ne protège pas plus : il suffit de défaire chaque couche.",
      details: [
        "Les malwares empilent souvent plusieurs encodages pour échapper aux antivirus.",
        "On décode dans l'ordre inverse de l'encodage : la dernière couche ajoutée part en premier.",
        "Le résultat de chaque étape donne un indice sur la suivante (=, chiffres hexadécimaux…).",
      ],
      hint: "La couche extérieure finit par = : Base64. Regarde ensuite le résultat : des paires de 0–9 et a–f…",
    },
    puzzle: {
      kind: "answer",
      content: DOUBLE,
      tools: ["base64", "hex", "binary", "rot13"],
      workshopInput: DOUBLE,
      question: "Quel est le code ?",
      answers: ["eclipse"],
    },
    successText: "Deux couches, deux étapes. Les poupées sont ouvertes.",
  },
  {
    id: "difficile-04",
    name: "La base volée",
    story: "Le pirate a laissé traîner une copie de la table des utilisateurs. Les mots de passe sont « protégés » par un hash MD5… et il avait aussi une table de correspondance.",
    card: {
      title: "Le hachage",
      category: "Crypto",
      icon: "#️⃣",
      summary: "Une empreinte à sens unique : facile à calculer, impossible à inverser.",
      details: [
        "Un hash transforme un texte en empreinte de taille fixe ; on ne peut pas revenir en arrière.",
        "Mais un même mot donne toujours le même hash : les pirates précalculent ceux des mots courants (tables arc-en-ciel).",
        "MD5 est trop rapide et trop connu : on utilise bcrypt ou Argon2 pour les mots de passe.",
      ],
      hint: "Compare le hash d'admin avec chaque ligne de la table, caractère par caractère.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "dump_users.txt",
      content: `table users
id | login | mot_de_passe_md5
1  | admin | f02368945726d5fc2a14eb576f7276c0

table arc-en-ciel trouvée en ligne (extrait)
23206deb7eba65b3fbc80a2ffbc53c28 → soleil
8621ffdbc5698829397d97767ac13db3 → dragon
ab4f63f9ac65152575886860dde480a1 → azerty
f02368945726d5fc2a14eb576f7276c0 → bonjour
e10adc3949ba59abbe56e057f20f883e → 123456`,
      question: "Quel est le mot de passe d'admin ?",
      answers: ["bonjour"],
    },
    successText: "Hash retrouvé. MD5 sans sel, c'est presque du texte clair.",
  },
  {
    id: "difficile-05",
    name: "Le formulaire bavard",
    story: "Le panneau d'administration du pirate a un formulaire de connexion. Tu as récupéré le code qui vérifie les identifiants. Il colle ce que tu tapes directement dans la requête…",
    card: {
      title: "L'injection SQL",
      category: "Web",
      icon: "💉",
      summary: "Quand une saisie est collée telle quelle dans une requête, elle peut la réécrire.",
      details: [
        "Une base de données s'interroge en SQL : SELECT * FROM users WHERE login='...'.",
        "Si le site insère la saisie sans précaution, une apostrophe permet de modifier la requête.",
        "La parade : les requêtes préparées, qui séparent toujours le code et les données.",
      ],
      hint: "Ferme l'apostrophe, ajoute une condition toujours vraie (OR 1=1), puis neutralise la suite avec --.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "login.php",
      content: `$login = $_POST['login'];
$pass  = $_POST['pass'];
$sql = "SELECT * FROM users WHERE login='$login' AND pass='$pass'";
// si la requête renvoie au moins une ligne → connexion réussie`,
      question: "Que tapes-tu dans le champ login pour entrer sans mot de passe ?",
      answers: [
        "' OR 1=1 --",
        "' OR 1=1 -- -",
        "' OR 1=1 #",
        "' OR 1=1;--",
        "' OR '1'='1' --",
        "' OR '1'='1",
        "' OR TRUE --",
        "admin' --",
        "admin' #",
        "admin'--",
      ],
      strict: true,
      placeholder: "ta saisie",
    },
    successText: "La requête renvoie tous les comptes : te voilà connecté. Requêtes préparées, la prochaine fois !",
  },
  {
    id: "difficile-06",
    name: "Le livre d'or",
    story: "Le site du pirate a un livre d'or qui affiche les commentaires des visiteurs tels quels. Prouve que la page est vulnérable.",
    card: {
      title: "La faille XSS",
      category: "Web",
      icon: "📝",
      summary: "Injecter du JavaScript dans une page pour qu'il s'exécute chez les autres visiteurs.",
      details: [
        "Le cross-site scripting (XSS) apparaît quand un site affiche une saisie sans la filtrer.",
        "Le script injecté s'exécute chez chaque visiteur : vol de session, fausse page, redirection…",
        "La parade : échapper les caractères spéciaux (< > \" ') avant de les afficher.",
      ],
      hint: "Quelle saisie contient du code que le navigateur va exécuter ?",
    },
    puzzle: {
      kind: "choice",
      question: "Quel commentaire révèle une faille XSS s'il déclenche une alerte ?",
      options: [
        { label: "Super site, merci !", correct: false, explanation: "Texte normal : il ne teste rien." },
        { label: "<script>alert('XSS')</script>", correct: true, explanation: "Si une alerte s'affiche, le site exécute le code des visiteurs : faille XSS." },
        { label: "' OR 1=1 --", correct: false, explanation: "C'est un test d'injection SQL, pas de XSS." },
        { label: "../../etc/passwd", correct: false, explanation: "C'est un test de traversée de répertoires." },
      ],
    },
    successText: "Alerte affichée : le livre d'or est vulnérable, le pirate aussi.",
  },
  {
    id: "difficile-07",
    name: "Le biscuit",
    story: "Le panneau du pirate te reconnaît grâce à un cookie. Tu as intercepté ta propre requête : ton rôle y est écrit… en Base64.",
    card: {
      title: "Les cookies de session",
      category: "Web",
      icon: "🍪",
      summary: "Un cookie est stocké chez toi : tu peux le lire et le modifier.",
      details: [
        "Le serveur dépose un cookie dans ton navigateur pour te reconnaître à chaque page.",
        "Tout ce qui est dans un cookie est modifiable par l'utilisateur.",
        "Un site sérieux stocke un identifiant aléatoire ou signe le cookie, jamais un rôle en clair.",
      ],
      hint: "Décode dXNlcg== dans l'atelier, puis vérifie quelle option donne « admin » une fois décodée.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "requête interceptée",
      content: `GET /panel HTTP/1.1
Host: panel.pirate.local
Cookie: session=7f3a91; role=dXNlcg==`,
      tools: ["base64"],
      workshopInput: "dXNlcg==",
      question: "Quelle valeur de cookie te donne les droits admin ?",
      options: [
        { label: "role=admin", correct: false, explanation: "Le serveur attend du Base64 : « admin » en clair ne sera pas compris." },
        { label: "role=YWRtaW4=", correct: true, explanation: "YWRtaW4= est « admin » en Base64 : le serveur te prend pour l'admin." },
        { label: "role=dXNlcg==admin", correct: false, explanation: "Ce n'est pas du Base64 valide." },
        { label: "session=admin", correct: false, explanation: "Le rôle est dans le cookie role, pas dans session." },
      ],
    },
    successText: "Cookie modifié, droits admin obtenus. Ne jamais faire confiance au client !",
  },
  {
    id: "difficile-08",
    name: "Le bureau du président",
    story: "La comptable reçoit trois mails ce matin. L'un d'eux, signé du président, demande un virement. Les noms sont tous corrects. Trouve la fraude.",
    card: {
      title: "La fraude au président",
      category: "Social",
      icon: "👔",
      summary: "Se faire passer pour un dirigeant pour obtenir un virement urgent et secret.",
      details: [
        "L'attaquant usurpe l'identité d'un chef et exige un virement rapide, souvent « confidentiel ».",
        "Leviers : autorité, urgence, secret (« n'en parle à personne »).",
        "La parade : toujours vérifier par un autre canal (appel au numéro habituel) avant de payer.",
      ],
      hint: "Autorité + urgence + secret + virement… et regarde bien le domaine complet de l'expéditeur.",
    },
    puzzle: {
      kind: "phishing",
      emails: [
        {
          id: "compta",
          fromName: "Julie Morel (Comptabilité)",
          fromAddress: "j.morel@serveur-corp.fr",
          subject: "Clôture mensuelle",
          body: "Hello, pense à m'envoyer les notes de frais de novembre avant vendredi pour la clôture. Merci !",
          linkText: "Dossier notes de frais",
          linkHref: "https://intranet.serveur-corp.fr/compta/frais",
          isPhishing: false,
          explanation: "Demande habituelle, domaine officiel, rien d'urgent : légitime.",
        },
        {
          id: "president",
          fromName: "Marc Durand (Président)",
          fromAddress: "marc.durand@serveur-corp.fr-direction.com",
          subject: "Confidentiel – virement urgent",
          body: "Je suis en réunion et injoignable. J'ai besoin que tu fasses un virement de 48 500 € aujourd'hui pour finaliser un rachat. C'est strictement confidentiel, n'en parle à personne. Je compte sur toi.",
          linkText: "Coordonnées bancaires",
          linkHref: "https://serveur-corp.fr-direction.com/rib",
          isPhishing: true,
          explanation: "Le domaine réel est fr-direction.com, et on retrouve autorité, urgence et secret : fraude au président.",
        },
        {
          id: "it",
          fromName: "Service Informatique",
          fromAddress: "it@serveur-corp.fr",
          subject: "Maintenance samedi",
          body: "Une maintenance aura lieu samedi de 8 h à 10 h. L'intranet sera indisponible pendant ce créneau.",
          linkText: "Détails de la maintenance",
          linkHref: "https://intranet.serveur-corp.fr/maintenance",
          isPhishing: false,
          explanation: "Simple information, domaine officiel, aucune action demandée : légitime.",
        },
      ],
    },
    successText: "Virement bloqué. Un coup de fil au vrai président aurait suffi.",
  },
  {
    id: "difficile-09",
    name: "Le mur de feu",
    story: "Tu accèdes aux règles du pare-feu. Le pirate en a ajouté une qui ouvre la base de données au monde entier. Trouve-la.",
    card: {
      title: "Le pare-feu",
      category: "Réseau",
      icon: "🧱",
      summary: "Il filtre le trafic réseau selon des règles : qui, vers quoi, sur quel port.",
      details: [
        "Chaque règle indique une source, une destination, un port et une action (ALLOW ou DENY).",
        "0.0.0.0/0 veut dire « n'importe quelle adresse », donc tout Internet.",
        "Une base de données (port 3306 pour MySQL) ne doit jamais être exposée à Internet.",
      ],
      hint: "Cherche la règle qui combine la source 0.0.0.0/0 et le port de la base de données.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "règles du pare-feu",
      content: `#  Action  Source        Destination  Port  Proto
1  ALLOW   10.0.0.0/8    web-01       443   TCP
2  ALLOW   0.0.0.0/0     web-01       443   TCP
3  ALLOW   10.0.0.0/8    db-01        3306  TCP
4  ALLOW   0.0.0.0/0     db-01        3306  TCP
5  DENY    0.0.0.0/0     any          any   any`,
      question: "Quel est le numéro de la règle dangereuse ?",
      answers: ["4"],
    },
    successText: "Règle 4 supprimée. La base de données n'est plus visible depuis Internet.",
  },
  {
    id: "difficile-10",
    name: "Les droits d'accès",
    story: "Le pirate revient chaque nuit grâce à un script lancé automatiquement par le serveur. Il a trouvé un fichier que tout le monde peut modifier.",
    card: {
      title: "Les permissions Linux",
      category: "Système",
      icon: "🛂",
      summary: "rwx : lire, écrire, exécuter… pour le propriétaire, le groupe et tous les autres.",
      details: [
        "ls -l affiche des droits comme -rwxr-x--- : 3 blocs (propriétaire, groupe, autres).",
        "r = lire, w = écrire, x = exécuter ; un « - » veut dire que le droit est absent.",
        "Un script lancé par root mais modifiable par tous (rwxrwxrwx) donne les pleins pouvoirs à n'importe qui.",
      ],
      hint: "Cherche le fichier dont le dernier bloc de droits (les « autres ») contient un w.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "ls -l /opt/scripts",
      content: `-rwxr-x---  1 root  admin  2048  nettoyage.sh
-rwxr-xr-x  1 root  root   1312  rapport.sh
-rwxrwxrwx  1 root  root    512  backup.sh
-rw-r-----  1 root  admin   880  config.ini`,
      question: "Quel fichier n'importe qui peut-il modifier ?",
      answers: ["backup.sh"],
    },
    successText: "Droits corrigés en rwxr-x---. Mi-parcours du niveau atteint !",
  },
];
