import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/Quiz";
import { LESSONS, getLesson, levelName, themeOf } from "@/data/lessons";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson ? lesson.title : "Leçon introuvable", description: lesson?.summary };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const theme = themeOf(lesson);
  // Leçon suivante : la prochaine du même thème, sinon la première du thème suivant.
  const index = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const next = LESSONS[index + 1];

  return (
    <article className="lesson">
      <Link href="/cours" className="back-link">
        ← Salle de cours
      </Link>

      <div className="lesson-badges">
        {theme && (
          <span className="theme-pill">
            {theme.icon} {theme.name}
          </span>
        )}
        <span className={`level-pill level-pill-${lesson.level}`}>{levelName(lesson.level)}</span>
        <span className="lesson-meta">⏱ {lesson.duration}</span>
      </div>

      <h1 className="page-title">
        {lesson.icon} {lesson.title}
      </h1>
      <p className="page-intro">{lesson.summary}</p>

      <aside className="lesson-box objectives" aria-labelledby="objectifs">
        <h2 id="objectifs">🎯 À la fin de cette leçon, tu sauras…</h2>
        <ul>
          {lesson.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </aside>

      {lesson.sections.map((section, i) => (
        <section key={section.title} className="lesson-section">
          <h2>
            <span className="section-number">{i + 1}</span> {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.example && (
            <figure className="lesson-example">
              <figcaption>Exemple</figcaption>
              <pre className="code-block">
                <code>{section.example}</code>
              </pre>
            </figure>
          )}
        </section>
      ))}

      <aside className="lesson-box key-points" aria-labelledby="a-retenir">
        <h2 id="a-retenir">📌 À retenir</h2>
        <ul>
          {lesson.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </aside>

      <Quiz slug={lesson.slug} questions={lesson.quiz} />

      <div className="actions">
        {next ? (
          <Link href={`/cours/${next.slug}`} className="btn btn-ghost">
            Leçon suivante : {next.title} →
          </Link>
        ) : (
          <Link href="/jeu" className="btn btn-ghost">
            Mettre tout ça en pratique dans le jeu →
          </Link>
        )}
        <Link href="/cours" className="btn btn-ghost">
          Toutes les leçons
        </Link>
      </div>
    </article>
  );
}
