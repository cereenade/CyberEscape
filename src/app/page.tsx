import Link from "next/link";

const FEATURES = [
  {
    icon: "🚪",
    title: "Des salles piégées",
    text: "Chaque porte cache une énigme : un mot de passe dans le code source, un message chiffré, un faux mail à démasquer.",
  },
  {
    icon: "🃏",
    title: "Des cyber-cartes",
    text: "Ramasse-les en explorant. Chacune t'apprend une vraie notion de cyber et te donne la clé pour avancer.",
  },
  {
    icon: "🧠",
    title: "Zéro prérequis",
    text: "Pas besoin d'être expert : tu apprends en jouant, à ton rythme, directement dans ton navigateur.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-kicker">&gt; alerte : intrusion détectée</p>
        <h1 className="hero-title">CyberEscape</h1>
        <p className="hero-text">
          Un pirate a pris le contrôle du serveur, et tu es enfermé dedans. Traverse les salles piégées, résous
          les énigmes de cybersécurité et collectionne les cyber-cartes pour t&apos;en sortir.
        </p>
        <p className="hero-tagline">Collectionne. Décode. Échappe-toi.</p>
        <div className="actions">
          <Link href="/jeu" className="btn btn-primary btn-large">
            Commencer la partie
          </Link>
          <Link href="/deck" className="btn btn-ghost btn-large">
            Voir mon deck
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
    </>
  );
}
