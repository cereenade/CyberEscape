import type { Lesson } from "@/lib/types";

export const JOURNAL_PARE_FEU: Lesson = {
  slug: "journal-pare-feu",
  title: "Lire un journal de pare-feu",
  icon: "🧱",
  theme: "reseau",
  level: "intermediaire",
  summary: "ALLOW, DENY, ports et sources : repérer dans les journaux la source qui insiste.",
  duration: "7 min",
  objectives: [
    "Lire une ligne de journal de pare-feu",
    "Relier un port au service visé",
    "Repérer une force brute ou un scan",
  ],
  sections: [
    {
      title: "Une ligne de journal",
      paragraphs: [
        "On y trouve l'heure, l'action (ALLOW ou DENY), l'adresse source, l'adresse de destination, le protocole et le port de destination.",
        "Le port indique le service visé : 22 pour SSH, 3389 pour le bureau à distance, 443 pour le web, 445 pour les partages Windows.",
      ],
    },
    {
      title: "Reconnaître les motifs",
      paragraphs: [
        "Une source qui frappe très souvent le même port : force brute probable (comme 198.51.100.23 sur SSH dans la salle des refus).",
        "Une source qui essaie beaucoup de ports différents : scan de ports. Beaucoup de sources sur un même port : campagne ou ver.",
        "Les refus isolés venus d'Internet sont le bruit de fond habituel : ce qui compte, c'est la répétition et ce qui a été autorisé.",
      ],
    },
    {
      title: "Réagir",
      paragraphs: [
        "Bloque la source qui insiste, mais surtout réduis l'exposition : SSH par clé uniquement, accès d'administration derrière un VPN.",
        "Envoie les journaux au SIEM et crée une alerte sur les seuils (par exemple 20 refus en une minute depuis une même source).",
      ],
    },
  ],
  keyPoints: [
    "Chaque ligne : heure, action, source, destination, port.",
    "Même source + même port en boucle = force brute.",
    "Même source + ports variés = scan.",
    "Regarde aussi ce qui a été autorisé, pas seulement les refus.",
  ],
  quiz: [
    {
      question: "Une source tente 500 fois le port 22 en 2 minutes. C'est probablement :",
      options: ["Un scan de ports", "Une force brute sur SSH", "Une mise à jour automatique"],
      correct: 1,
      explanation: "Même port, répétitions rapides : essais de mots de passe.",
    },
    {
      question: "Une source essaie les ports 21, 22, 23, 80, 443, 3389… C'est :",
      options: ["Un scan de ports", "Une sauvegarde", "Un DNS"],
      correct: 0,
      explanation: "Elle cherche quels services répondent.",
    },
    {
      question: "Quel port correspond au bureau à distance Windows ?",
      options: ["22", "3389", "53"],
      correct: 1,
      explanation: "RDP utilise le port 3389.",
    },
  ],
};
