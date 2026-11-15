import type { Lesson } from "@/lib/types";

export const CODE_PIN_SIM: Lesson = {
  slug: "code-pin-sim",
  title: "Protéger sa carte SIM avec un code PIN",
  icon: "📶",
  theme: "bases",
  level: "debutant",
  summary: "Le verrouillage de l'écran ne suffit pas : la carte SIM a son propre code, qui protège tes SMS et ta ligne.",
  duration: "5 min",
  objectives: [
    "Distinguer le code de l'écran et le code PIN de la SIM",
    "Activer et personnaliser le code PIN",
    "Savoir quoi faire avec le code PUK et en cas de vol",
  ],
  sections: [
    {
      title: "Deux verrous différents",
      paragraphs: [
        "Le code ou l'empreinte de ton écran protège le téléphone. La carte SIM, elle, peut être retirée en quelques secondes et glissée dans un autre appareil.",
        "Sans code PIN, cette SIM fonctionne tout de suite ailleurs : le voleur reçoit tes appels et tes SMS, y compris les codes de connexion envoyés par ta banque ou tes comptes.",
      ],
      example: "Dans la salle « Le téléphone verrouillé deux fois », l'écran est bien verrouillé, mais la SIM sans code part dans un autre téléphone.",
    },
    {
      title: "Activer un vrai code",
      paragraphs: [
        "Le code PIN se règle dans les paramètres du téléphone (rubrique sécurité ou carte SIM). Il est demandé à chaque redémarrage.",
        "Les codes par défaut (0000, 1234) sont connus de tous : remplace-le par 4 à 8 chiffres à toi, différents de ton code d'écran et de ta date de naissance.",
      ],
    },
    {
      title: "Le code PUK et le vol",
      paragraphs: [
        "Après 3 codes PIN faux, la SIM se bloque et demande le code PUK (8 chiffres). Tu le trouves sur le support de la carte ou dans ton espace client.",
        "Après 10 codes PUK faux, la SIM est définitivement inutilisable : il faut en demander une nouvelle.",
        "En cas de vol, appelle ton opérateur pour suspendre la ligne, même si ta SIM a un code : c'est la seule protection complète.",
      ],
    },
  ],
  keyPoints: [
    "L'écran et la SIM ont chacun leur verrou.",
    "Une SIM sans code reçoit tes SMS de connexion dans n'importe quel téléphone.",
    "Remplace le code par défaut par un code personnel.",
    "3 erreurs → code PUK ; en cas de vol, suspends la ligne.",
  ],
  quiz: [
    {
      question: "Que protège le code PIN de la carte SIM ?",
      options: ["L'écran du téléphone", "La carte SIM, même dans un autre téléphone", "Ton compte bancaire directement"],
      correct: 1,
      explanation: "Il empêche la SIM de fonctionner sans le code, quel que soit l'appareil.",
    },
    {
      question: "Que se passe-t-il après 3 codes PIN faux ?",
      options: ["La SIM demande le code PUK", "Le téléphone s'efface", "Rien, on peut réessayer à l'infini"],
      correct: 0,
      explanation: "Le code PUK sert à débloquer la carte.",
    },
    {
      question: "Quel code PIN choisir ?",
      options: ["0000, facile à retenir", "Ta date de naissance", "Un code personnel, différent de ton code d'écran"],
      correct: 2,
      explanation: "Les codes par défaut et les dates sont les premiers essayés.",
    },
  ],
};
