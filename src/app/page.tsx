import Link from "next/link";
import { LEVELS } from "@/data/game";

const FEATURES = [
  {
    icon: "🚪",
    title: "50 salles piégées",
    text: "Mot de passe dans le code source, message chiffré, faux mail, logs d'attaque… chaque porte cache une énigme.",
  },
  {
    icon: "🃏",
    title: "50 cyber-cartes",
    text: "Une carte par salle. Chacune t'apprend une vraie notion de cyber et te donne la clé pour avancer.",
  },
  {
    icon: "📚",
    title: "Une salle de cours",
    text: "Des leçons courtes par thème et des mini-quiz pour aller plus loin que les cartes.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-kicker">&gt; alerte : intrusion détectée</p>
        <h1 className="hero-title">CyberEscape</h1>
        <p className="hero-text">
          Un pirate a pris le contrôle du serveur, et tu es enfermé dedans. Traverse les salles piégées, résous les
          énigmes de cybersécurité et collectionne les cyber-cartes pour t&apos;en sortir. Pas besoin d&apos;être expert :
          tu apprends en jouant, à ton rythme.
        </p>
        <p className="hero-tagline">Collectionne. Décode. Échappe-toi.</p>
        <div className="actions">
          <Link href="/jeu" className="btn btn-primary btn-large">
            Commencer la partie
          </Link>
          <Link href="/cours" className="btn btn-ghost btn-large">
            Aller en cours
          </Link>
        </div>
      </section>

      <section className="features">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="feature">
            <span className="feature-icon" aria-hidden>
              {feature.icon}
            </span>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="levels-preview">
        <h2>5 niveaux, du premier réflexe au boss final</h2>
        <ol className="levels-list">
          {LEVELS.map((level) => (
            <li key={level.id}>
              <span aria-hidden>{level.icon}</span> <strong>{level.name}</strong>
              <span className="muted"> · {level.tagline}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
