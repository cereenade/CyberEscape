import type { RoomContent } from "@/lib/types";
import { card, choice, multi, phishing, room } from "./_build";

/** Salles 101 à 120 du niveau Facile. */
export const FACILE_7: RoomContent[] = [
  room(
    "facile-101",
    "Le point bleu sur la carte",
    "Il y a un an, tu as partagé ta position en direct avec un ami pour un festival. Le partage n'a jamais été coupé : il sait encore où tu es, à chaque instant.",
    card("Le partage de localisation en temps réel", "Social", "📍", "Partager sa position en direct, c'est pratique… à condition de l'arrêter ensuite.", [
      "Les applis de messagerie et de cartes proposent un partage « jusqu'à désactivation ».",
      "Choisis toujours une durée limitée (1 heure, 8 heures).",
      "Fais le tri régulièrement : réglages de localisation, liste des personnes qui te voient.",
    ], "Combien de temps doit durer un partage de position ?"),
    multi("Quelles bonnes pratiques adoptes-tu pour le partage de position ?", [
      ["Choisir une durée limitée à chaque partage", true, "Le partage s'arrête tout seul."],
      ["Vérifier de temps en temps qui voit ta position", true, "Tu repères les partages oubliés."],
      ["Partager ta position en continu avec tous tes contacts", false, "N'importe qui pourrait suivre tes déplacements."],
      ["Laisser un partage actif « au cas où » pendant des mois", false, "C'est exactement le piège de cette salle."],
    ]),
    "Partage coupé. Ton point bleu redevient privé.",
  ),
  room(
    "facile-102",
    "Le portefeuille perdu",
    "Ce matin, ton portefeuille a disparu dans le bus. Ta carte bancaire est dedans, avec le paiement sans contact activé. Tu te demandes ce que peut en faire la personne qui l'a trouvée.",
    card("Le paiement sans contact", "Défense", "💳", "Une carte sans contact paie sans code jusqu'à un plafond : en cas de perte, fais opposition tout de suite.", [
      "Sans code, chaque paiement est limité (souvent 50 € en France), et la carte redemande le code après plusieurs paiements.",
      "Une carte perdue peut donc servir à quelques petits achats avant d'être bloquée.",
      "Fais opposition immédiatement depuis l'appli de ta banque ou par téléphone.",
      "Payer avec ton téléphone (code ou empreinte demandés) ajoute une protection.",
    ], "Qu'est-ce qui bloque vraiment la carte ?"),
    choice("Quelle est la première chose à faire ?", [
      ["Faire opposition sur la carte depuis l'appli ou le numéro de ta banque", true, "La carte est bloquée : plus aucun paiement possible."],
      ["Attendre de voir s'il y a des paiements suspects", false, "Chaque minute compte : bloque d'abord, vérifie ensuite."],
      ["Publier une photo de ta carte pour la retrouver", false, "Tu donnerais son numéro à tout le monde."],
    ]),
    "Carte bloquée en deux minutes. Une nouvelle carte arrive par la poste.",
  ),
  room(
    "facile-103",
    "Le téléphone verrouillé deux fois",
    "On t'a volé ton téléphone. L'écran est verrouillé, ouf. Mais le voleur retire la carte SIM et la glisse dans un autre téléphone pour recevoir tes SMS… sauf si elle demande un code.",
    card("Le code PIN de la carte SIM", "Défense", "📶", "Le code PIN protège ta carte SIM elle-même : sans lui, elle ne marche dans aucun autre téléphone.", [
      "Le verrouillage de l'écran protège le téléphone, pas la carte SIM.",
      "Une SIM sans code peut recevoir tes SMS de connexion dans un autre appareil.",
      "Remplace le code par défaut (0000, 1234) par un code à toi, dans les réglages.",
      "Après 3 erreurs, il faut le code PUK, qui se trouve sur le support de la carte ou dans ton espace client.",
    ], "Qu'est-ce qui protège la petite puce, et pas l'écran ?"),
    choice("Qu'est-ce qui empêche le voleur d'utiliser ta SIM dans un autre téléphone ?", [
      ["Un code PIN personnel activé sur la carte SIM", true, "Sans ce code, la SIM reste muette dans n'importe quel appareil."],
      ["Le code de verrouillage de l'écran", false, "Il protège le téléphone, pas la carte qu'on en retire."],
      ["Le code PIN laissé à 0000", false, "C'est le premier code qu'un voleur essaiera."],
    ]),
    "SIM bloquée, ligne suspendue auprès de l'opérateur. Tes SMS restent à toi.",
  ),
  room(
    "facile-104",
    "Les places du concert complet",
    "Le concert de ton groupe préféré affiche complet. Sur les réseaux, plusieurs personnes proposent de te revendre leur billet. Trois messages arrivent : un seul est un piège.",
    card("La revente de billets entre particuliers", "Social", "🎟️", "Un billet revendu en direct peut être faux, déjà vendu à d'autres ou annulé : passe par la revente officielle.", [
      "Le même billet en PDF peut être vendu dix fois : seul le premier entre.",
      "La revente officielle de l'organisateur ou de la billetterie annule l'ancien billet et t'en crée un nouveau.",
      "Méfie-toi d'un prix trop bas, d'une urgence et d'un paiement par virement, coupon ou « entre amis ».",
      "Un vendeur qui refuse la plateforme officielle n'a souvent rien à vendre.",
    ], "Qui garantit que le billet n'a pas déjà été vendu ?"),
    phishing([
      ["Billetterie Scène-Est", "notifications@scene-est.example.com", "Ta place est disponible sur la revente officielle", "Bonjour, une place que tu suivais vient d'être remise en vente sur notre bourse officielle. Le paiement se fait sur ton compte, et un nouveau billet nominatif te sera envoyé.", "Voir la place sur mon compte", "https://www.scene-est.example.com/compte/revente", false, "C'est la billetterie officielle : l'ancien billet est annulé et un nouveau est créé à ton nom."],
      ["Lou (vendeuse)", "lou.concerts92@example.net", "2 places à -50 % !! dernier moment", "Coucou, je ne peux plus y aller, je te fais les 2 places à moitié prix. Envoie vite le paiement par coupon prépayé ou virement « entre proches », je t'envoie le PDF juste après. Beaucoup de gens sont intéressés !", "Réserver mes places", "https://billets-scene-est.example.org/reserver", true, "Prix cassé, urgence, paiement sans recours et PDF copiable : tous les signaux de l'arnaque au billet."],
      ["Association des fans", "contact@fans-du-groupe.example.com", "Rappel : utilise la bourse officielle", "Petit rappel avant le concert : ne revends et n'achète que via la bourse de la billetterie. Les billets échangés en PDF sur les réseaux sont souvent faux ou déjà utilisés.", "Lire nos conseils", "https://www.fans-du-groupe.example.com/conseils", false, "Un simple rappel de prudence, sans demande de paiement."],
    ]),
    "Billet officiel à ton nom dans ton appli. Rendez-vous au premier rang.",
  ),
  room(
    "facile-105",
    "La caméra qui regardait dehors",
    "Tu as installé une petite caméra connectée pour surveiller ton chat. Un soir, une voix inconnue sort du haut-parleur de la caméra. Quelqu'un s'est connecté à ta place.",
    card("Les caméras et objets connectés à la maison", "Défense", "📹", "Caméras, babyphones, ampoules ou prises connectées sont de petits ordinateurs : ils se protègent comme un téléphone.", [
      "Beaucoup d'objets sortent du carton avec un mot de passe simple, parfois le même pour tous.",
      "Change-le dès l'installation et active la double authentification dans l'appli si elle existe.",
      "Installe les mises à jour de l'objet : elles corrigent des failles connues.",
      "Si ta box le permet, place les objets sur le réseau invité, à l'écart de ton ordinateur.",
    ], "Que vaut un mot de passe livré dans le carton ?"),
    multi("Quels réflexes protègent ta caméra connectée ?", [
      ["Changer le mot de passe fourni dès l'installation", true, "Le mot de passe d'usine est souvent connu de tous."],
      ["Activer les mises à jour automatiques de l'objet", true, "Les failles corrigées ne servent plus aux pirates."],
      ["Activer la double authentification dans l'appli", true, "Un mot de passe volé ne suffit plus pour se connecter."],
      ["Garder le mot de passe d'usine pour ne pas l'oublier", false, "C'est la première chose qu'un pirate essaie."],
      ["Orienter la caméra vers la rue pour qu'elle serve à tout le quartier", false, "Filmer l'espace public pose aussi des problèmes de vie privée et de droit."],
    ]),
    "Nouveau mot de passe, mise à jour faite. La caméra ne parle plus qu'à toi.",
  ),
  room(
    "facile-106",
    "L'appareil que tu ne connais pas",
    "En fouillant les réglages de ta messagerie, tu découvres une liste « Appareils connectés ». Ton téléphone, ton ordinateur… et une tablette à Lyon, où tu n'as jamais mis les pieds.",
    card("Vérifier les appareils connectés à ses comptes", "Mots de passe", "📱", "La plupart des comptes affichent la liste des appareils et sessions ouverts : un coup d'œil régulier suffit à repérer un intrus.", [
      "Tu la trouves souvent dans « Sécurité », « Appareils » ou « Sessions actives ».",
      "Un appareil inconnu, une ville étrange ou un vieux téléphone revendu doivent être déconnectés.",
      "Après avoir déconnecté un intrus, change ton mot de passe et active la double authentification.",
      "Pense aussi aux messageries liées à un ordinateur (version web ou bureau).",
    ], "Que fais-tu d'une session que tu ne reconnais pas ?"),
    choice("Que fais-tu en voyant cette tablette inconnue ?", [
      ["Je la déconnecte, puis je change mon mot de passe et j'active la double authentification", true, "Tu coupes l'accès de l'intrus et tu l'empêches de revenir."],
      ["Je la laisse : c'est sûrement un bug d'affichage", false, "Une session inconnue doit toujours être prise au sérieux."],
      ["Je change seulement ma photo de profil", false, "Ça ne coupe pas l'accès de la tablette."],
      ["Je supprime l'appli de mon téléphone", false, "La tablette resterait connectée à ton compte."],
    ]),
    "Tablette déconnectée, mot de passe changé. Ta liste ne contient plus que tes appareils.",
  ),
];
