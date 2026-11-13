import { caesar } from "@/lib/crypto";
import type { Room } from "@/lib/types";

export const ROOMS: Room[] = [
  {
    id: "terminal",
    name: "Le terminal d'accueil",
    story:
      "Tu te réveilles devant un vieux terminal. La porte est verrouillée par un écran de connexion. Le pirate a récupéré cette page sur l'intranet… mais le développeur n'a pas fait très attention à son code.",
    cardId: "code-source",
    puzzle: {
      kind: "source",
      answer: "pare-feu",
      code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Intranet - Connexion</title>
  <link rel="stylesheet" href="style.css">
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
    },
    successText: "La porte s'ouvre dans un grincement. Le mot de passe était juste sous ton nez.",
  },
  {
    id: "messages",
    name: "La salle des messages",
    story:
      "Un écran affiche un message intercepté entre le pirate et son complice. Il est chiffré, mais le pirate a utilisé une méthode vieille de 2 000 ans.",
    cardId: "cesar",
    puzzle: {
      kind: "cipher",
      ciphertext: caesar("LA CLE DE LA PORTE EST BOUCLIER", 3),
      answer: "bouclier",
    },
    successText: "Message déchiffré ! Le pirate devrait vraiment changer de méthode.",
  },
  {
    id: "inbox",
    name: "La boîte de réception",
    story:
      "Trois mails viennent d'arriver sur le poste de l'administrateur. L'un d'eux est un piège du pirate. Démasque-le pour ouvrir la porte.",
    cardId: "phishing",
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
          explanation: "Expéditeur et lien sur le vrai domaine serveur-corp.fr, pas d'urgence ni de menace : ce mail est légitime.",
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
          explanation: "Urgence et menace, demande de mot de passe, domaine « serveur-c0rp-securite.com » (un zéro à la place du o) et lien qui ne mène pas où il prétend : c'est du phishing.",
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
    id: "coffre",
    name: "Le coffre encodé",
    story:
      "Un coffre-fort numérique bloque le passage. Sur un post-it collé à l'écran, une suite de caractères étrange. Le pirate pensait l'avoir « cachée ».",
    cardId: "base64",
    puzzle: {
      kind: "base64",
      encoded: "c2VudGluZWxsZQ==",
      answer: "sentinelle",
    },
    successText: "Le coffre s'ouvre. Encoder, ce n'est vraiment pas chiffrer !",
  },
  {
    id: "coeur",
    name: "Le cœur du serveur",
    story:
      "Tu es dans la salle principale. Pour reprendre le contrôle, tu dois réinitialiser le mot de passe administrateur. Choisis-en un que le pirate ne pourra pas deviner.",
    cardId: "mot-de-passe",
    puzzle: {
      kind: "choice",
      question: "Quel mot de passe choisis-tu pour le compte administrateur ?",
      options: [
        {
          label: "Admin2024!",
          correct: false,
          explanation: "Un mot connu + une année + un « ! » : c'est l'un des premiers schémas testés par les pirates.",
        },
        {
          label: "P@ssw0rd",
          correct: false,
          explanation: "Remplacer des lettres par des symboles ne trompe personne : « P@ssw0rd » est dans toutes les listes de mots de passe.",
        },
        {
          label: "Nuage-Velo-Citron-Tempete-92",
          correct: true,
          explanation: "Long, fait de mots au hasard, facile à retenir et absent des listes connues : c'est une vraie phrase de passe.",
        },
        {
          label: "azerty123",
          correct: false,
          explanation: "Une suite du clavier : c'est l'un des mots de passe les plus utilisés au monde.",
        },
      ],
    },
    successText: "Mot de passe changé. Le pirate est éjecté du serveur !",
  },
];
