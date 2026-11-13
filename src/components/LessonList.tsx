"use client";

import Link from "next/link";
import { useState } from "react";
import { LESSONS, LESSON_LEVELS, THEMES, levelName } from "@/data/lessons";
import type { LessonLevel } from "@/lib/types";
import { useGame } from "./GameProvider";

type Filter = LessonLevel | "tous";

export function LessonList() {
  const { save, loaded } = useGame();
  const [filter, setFilter] = useState<Filter>("tous");
  const done = loaded ? save.lessonsDone.length : 0;

  return (
    <>
      <div className="lesson-toolbar">
        <p className="deck-count">
          {done} / {LESSONS.length} leçons validées
        </p>
        <div className="filter-group" role="group" aria-label="Filtrer par niveau">
          {[{ id: "tous" as const, name: "Tous les niveaux" }, ...LESSON_LEVELS].map((level) => (
            <button
              key={level.id}
              type="button"
              className={filter === level.id ? "filter-btn active" : "filter-btn"}
              aria-pressed={filter === level.id}
              onClick={() => setFilter(level.id)}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {THEMES.map((theme) => {
        const lessons = LESSONS.filter((l) => l.theme === theme.id && (filter === "tous" || l.level === filter));
        if (lessons.length === 0) return null;
        const themeDone = lessons.filter((l) => loaded && save.lessonsDone.includes(l.slug)).length;
        return (
          <section key={theme.id} className="theme-section">
            <header className="theme-header">
              <h2>
                {theme.name}
                <span className="muted theme-count">
                  {" "}
                  · {themeDone}/{lessons.length}
                </span>
              </h2>
              <p className="muted">{theme.description}</p>
            </header>
            <div className="lesson-grid">
              {lessons.map((lesson) => {
                const isDone = loaded && save.lessonsDone.includes(lesson.slug);
                return (
                  <Link key={lesson.slug} href={`/cours/${lesson.slug}`} className="lesson-card">
                    <div className="lesson-card-top">
                      <span className={`level-pill level-pill-${lesson.level}`}>{levelName(lesson.level)}</span>
                    </div>
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <p className="lesson-summary">{lesson.summary}</p>
                    <div className="lesson-card-bottom">
                      <span className="lesson-meta">{lesson.duration}</span>
                      <span className={isDone ? "lesson-status done" : "lesson-status"}>
                        {isDone ? "Validée" : "À découvrir"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
