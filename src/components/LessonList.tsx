"use client";

import Link from "next/link";
import { LESSONS } from "@/data/lessons";
import { useGame } from "./GameProvider";

export function LessonList() {
  const { save, loaded } = useGame();
  const done = loaded ? save.lessonsDone.length : 0;

  return (
    <>
      <p className="deck-count">
        {done} / {LESSONS.length} leçons validées
      </p>
      <div className="lesson-grid">
        {LESSONS.map((lesson, index) => {
          const isDone = loaded && save.lessonsDone.includes(lesson.slug);
          return (
            <Link key={lesson.slug} href={`/cours/${lesson.slug}`} className="lesson-card">
              <div className="lesson-card-top">
                <span className="lesson-icon" aria-hidden>
                  {lesson.icon}
                </span>
                <span className="lesson-meta">
                  Leçon {index + 1} · {lesson.duration}
                </span>
              </div>
              <h2 className="lesson-title">{lesson.title}</h2>
              <p className="lesson-summary">{lesson.summary}</p>
              <span className={isDone ? "lesson-status done" : "lesson-status"}>
                {isDone ? "✅ Validée" : "À découvrir"}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
