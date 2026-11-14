import type { RoomContent } from "@/lib/types";
import { answer, card, room } from "./_build";

/** Salles 101 à 120 du niveau Très difficile. */
export const TRES_DIFFICILE_7: RoomContent[] = [
  room(
    "tres-difficile-101",
    "La vague de verrouillages",
    "Lundi, 9 h 05 : le support croule sous les appels. Des dizaines de comptes sont verrouillés en même temps. Le SOC ouvre les journaux du contrôleur de domaine.",
    card("L'événement 4740 : compte verrouillé", "Défense", "🔒", "L'ID 4740 indique qu'un compte a été verrouillé, et depuis quel poste.", [
      "Il est journalisé sur le contrôleur de domaine (souvent celui qui a le rôle PDC).",
      "Le champ « Caller Computer Name » donne le poste d'où viennent les échecs.",
      "Beaucoup de comptes verrouillés depuis un même poste : pense à une pulvérisation de mots de passe… ou à un vieux mot de passe enregistré.",
      "Croise avec les 4625 (échecs) et les 4771 (pré-authentification Kerberos refusée).",
    ], "Regarde le champ qui revient à chaque ligne."),
    answer("Depuis quel poste viennent les verrouillages ?", ["PC-COMPTA-07", "pc-compta-07", "pccompta07"], {
      content:
        "09:01:12  4740  Compte: m.durand   Caller Computer Name: PC-COMPTA-07\n09:01:15  4740  Compte: l.bernard  Caller Computer Name: PC-COMPTA-07\n09:01:19  4740  Compte: s.petit    Caller Computer Name: PC-COMPTA-07\n09:01:22  4740  Compte: a.moreau   Caller Computer Name: PC-COMPTA-07\n09:02:40  4740  Compte: j.roux     Caller Computer Name: PC-RH-02",
      contentLabel: "Journal Sécurité du contrôleur de domaine",
      placeholder: "Nom du poste",
    }),
    "PC-COMPTA-07 isolé. L'analyse confirme une pulvérisation de mots de passe : les comptes sont déverrouillés et protégés.",
  ),
];
