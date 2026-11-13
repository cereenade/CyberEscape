import type { Metadata } from "next";
import { LessonList } from "@/components/LessonList";

export const metadata: Metadata = {
  title: "Salle de cours",
};

export default function CoursesPage() {
  return (
    <>
      <h1 className="page-title">📚 La salle de cours</h1>
      <p className="page-intro">
        Les cyber-cartes donnent l&apos;essentiel ; ici, tu vas plus loin. Les leçons sont rangées par thème et par
        niveau : chacune annonce ses objectifs, explique pas à pas avec des exemples, résume l&apos;essentiel et se
        termine par un mini-quiz.
      </p>
      <LessonList />
    </>
  );
}
