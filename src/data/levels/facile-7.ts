import type { RoomContent } from "@/lib/types";
import { card, multi, room } from "./_build";

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
];
