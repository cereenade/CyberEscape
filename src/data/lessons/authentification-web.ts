import type { Lesson } from "@/lib/types";

export const AUTHENTIFICATION_WEB: Lesson = {
  slug: "authentification-web",
  title: "OAuth, SSO et jetons",
  icon: "🎫",
  theme: "web",
  level: "avance",
  summary: "Les mécanismes modernes de connexion, et les erreurs qui les rendent dangereux.",
  duration: "10 min",
  objectives: [
    "Comprendre le flux OAuth 2.0 / OpenID Connect",
    "Repérer les erreurs courantes : redirect_uri, alg, stockage des jetons",
    "Connaître les protections : PKCE, state, validation stricte",
  ],
  sections: [
    {
      title: "Le flux OAuth en bref",
      paragraphs: [
        "L'application redirige vers le fournisseur d'identité, l'utilisateur s'y connecte, puis le fournisseur renvoie un code à l'adresse de retour (redirect_uri).",
        "L'application échange ce code contre des jetons. Elle ne voit jamais le mot de passe de l'utilisateur.",
      ],
    },
    {
      title: "Les adresses de retour",
      paragraphs: [
        "Si le fournisseur accepte une adresse de retour par préfixe ou par motif, le pirate peut recevoir le code sur son propre domaine.",
        "Les adresses doivent correspondre exactement à une liste enregistrée ; PKCE lie le code à l'application qui l'a demandé, et le paramètre state bloque le CSRF.",
      ],
    },
    {
      title: "Les jetons JWT",
      paragraphs: [
        "Un JWT est signé, pas chiffré : son contenu est lisible par tous.",
        "Le serveur doit imposer l'algorithme attendu : accepter alg=none ou confondre RS256 et HS256 permet de forger des jetons. Il vérifie aussi l'expiration, l'émetteur et l'audience.",
      ],
      example: "{\"alg\":\"RS256\",\"typ\":\"JWT\"} . {\"sub\":\"42\",\"exp\":1767225600} . signature",
    },
    {
      title: "SAML et signatures XML",
      paragraphs: [
        "Avec SAML, l'application doit utiliser exactement les éléments couverts par la signature, sinon un élément ajouté non signé peut être lu à la place.",
        "Des bibliothèques à jour et une configuration stricte sont indispensables.",
      ],
    },
  ],
  keyPoints: [
    "L'application ne voit jamais le mot de passe : elle reçoit des jetons.",
    "redirect_uri en correspondance exacte, avec PKCE et state.",
    "Un JWT est lisible par tous ; l'algorithme est imposé par le serveur.",
    "En SAML, seules les données signées comptent.",
  ],
  quiz: [
    {
      question: "Le contenu d'un JWT est-il secret ?",
      options: ["Oui, il est chiffré", "Non, il est seulement signé", "Seulement le week-end"],
      correct: 1,
      explanation: "Il est encodé en Base64URL et lisible par tous.",
    },
    {
      question: "Quelle vérification de redirect_uri est sûre ?",
      options: ["Par préfixe", "Correspondance exacte", "Contient le nom de l'appli"],
      correct: 1,
      explanation: "Les autres se contournent avec un domaine bien choisi.",
    },
    {
      question: "Qui doit décider de l'algorithme de signature d'un JWT ?",
      options: ["Le champ alg du jeton", "La configuration du serveur", "Le navigateur"],
      correct: 1,
      explanation: "Faire confiance au champ alg ouvre la porte aux jetons forgés.",
    },
  ],
};
