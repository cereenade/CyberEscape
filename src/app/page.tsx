import Link from "next/link";
import { MiniPuzzle } from "@/components/home/MiniPuzzle";
import { CARDS, LEVELS, ROOMS } from "@/data/game";
import { LESSONS } from "@/data/lessons";

const FEATURES = [
  {
    icon: "🚪",
    title: `${ROOMS.length} salles piégées`,
    text: "Mot de passe dans le code source, message chiffré, faux mail, logs d'attaque… chaque porte cache une énigme.",
  },
  {
    icon: "🃏",
    title: `${CARDS.length} cyber-cartes`,
    text: "Une carte par salle. Chacune t'apprend une vraie notion de cyber et te donne la clé pour avancer.",
  },
  {
    icon: "📚",
    title: `${LESSONS.length} leçons`,
    text: "Une salle de cours rangée par thème et par niveau, avec objectifs, exemples, résumés et mini-quiz.",
  },
];

const STEPS = [
  {
    icon: "🔍",
    title: "Explore la salle",
    text: "Chaque salle raconte une scène de l'attaque : un terminal, une boîte mail, un journal de connexions…",
  },
  {
    icon: "🃏",
    title: "Ramasse la cyber-carte",
    text: "Elle t'explique une vraie notion de cybersécurité, en quelques lignes, et te sert d'indice.",
  },
  {
    icon: "🧩",
    title: "Résous l'énigme",
    text: "Décode un message, démasque un faux mail, analyse un log… et la porte s'ouvre sur la salle suivante.",
  },
  {
    icon: "🏆",
    title: "Progresse",
    text: "Ton deck grandit, tes niveaux avancent, et tu peux approfondir chaque thème dans la salle de cours.",
  },
];

interface Props {
  searchParams: Promise<{ compte?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { compte } = await searchParams;

  return (
    <>
      {compte === "supprime" && (
        <p className="feedback feedback-success">Ton compte et tes données ont bien été supprimés. À bientôt !</p>
      )}
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

      <section className="home-section" aria-labelledby="how-title">
        <p className="section-kicker">&gt; mode d&apos;emploi</p>
        <h2 id="how-title">Comment ça marche ?</h2>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-number">{index + 1}</span>
              <span className="step-icon" aria-hidden>
                {step.icon}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
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

      <MiniPuzzle />

      <section className="levels-preview">
        <h2>{LEVELS.length} niveaux, du premier réflexe au boss final</h2>
        <ol className="levels-list">
          {LEVELS.map((level) => (
            <li key={level.id}>
              <span aria-hidden>{level.icon}</span> <strong>{level.name}</strong>
              <span className="muted"> · {level.tagline}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-cta">
        <h2>Prêt(e) à t&apos;échapper ?</h2>
        <p className="muted">C&apos;est gratuit, sans inscription obligatoire, et ta progression est sauvegardée.</p>
        <div className="actions">
          <Link href="/jeu" className="btn btn-primary btn-large">
            Commencer la partie
          </Link>
          <Link href="/inscription" className="btn btn-ghost btn-large">
            Créer un compte
          </Link>
        </div>
      </section>
    </>
  );
}
