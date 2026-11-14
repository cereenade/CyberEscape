import type { RoomContent } from "@/lib/types";
import { answer, card, choice, room } from "./_build";

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
  room(
    "tres-difficile-102",
    "La copie du coffre-fort",
    "3 h 12 : l'EDR remonte une commande lancée sur le contrôleur de domaine DC01. Si c'est ce que tu crois, l'attaquant vient d'emporter tous les mots de passe du domaine.",
    card("Détecter le vol de NTDS.dit", "Défense", "🗄️", "NTDS.dit contient les hachages de tous les comptes du domaine : une copie hors procédure est un incident majeur.", [
      "Le fichier est verrouillé par Windows : les attaquants passent par ntdsutil (option IFM), un cliché instantané ou une réplication.",
      "Surveille sur les contrôleurs de domaine : ntdsutil avec « ifm », la création de clichés, des copies de fichiers .dit.",
      "Le fichier SYSTEM du registre est souvent copié en même temps : il sert à déchiffrer la base.",
      "Réaction : isoler, chercher la sortie des fichiers, puis réinitialiser les mots de passe, dont krbtgt deux fois.",
    ], "Que contient le dossier créé par la commande ?"),
    choice("Comment interpréter cette commande ?", [
      ["Une copie de la base Active Directory : à traiter comme un vol de tous les hachages du domaine", true, "IFM crée une copie complète de NTDS.dit et du registre SYSTEM."],
      ["Une simple défragmentation de la base, sans risque", false, "La défragmentation ne crée pas de copie IFM dans un dossier temporaire."],
      ["Une mise à jour Windows automatique", false, "Windows Update ne lance pas ntdsutil à 3 h du matin vers C:\\Windows\\Temp."],
    ], {
      content: "Process: ntdsutil.exe\nCommandLine: ntdsutil \"ac i ntds\" \"ifm\" \"create full C:\\Windows\\Temp\\x\" q q\nUser: SERVEUR-CORP\\svc-backup\nHost: DC01",
      contentLabel: "Alerte EDR sur DC01",
    }),
    "Copie interceptée avant sa sortie. Compte svc-backup désactivé, krbtgt réinitialisé deux fois.",
  ),
];
