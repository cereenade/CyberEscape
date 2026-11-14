import type { RoomContent } from "@/lib/types";
import { card, choice, multi, room } from "./_build";

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
];
