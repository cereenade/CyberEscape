import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/Quiz";
import { LESSONS, getLesson } from "@/data/lessons";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson ? lesson.title : "Leçon introuvable" };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const index = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const next = LESSONS[index + 1];

  return (
    <article className="lesson">
      <Link href="/cours" className="back-link">
        ← Salle de cours
      </Link>
      <p className="lesson-meta">
        Leçon {index + 1} / {LESSONS.length} · {lesson.duration}
      </p>
      <h1 className="page-title">
        {lesson.icon} {lesson.title}
      </h1>
      <p className="page-intro">{lesson.summary}</p>

      {lesson.sections.map((section) => (
        <section key={section.title} className="lesson-section">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.example && (
            <pre className="code-block">
              <code>{section.example}</code>
            </pre>
          )}
        </section>
      ))}

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
      </div>
    </article>
  );
}
