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
        Les cyber-cartes donnent l&apos;essentiel. Ici, tu vas plus loin : une leçon courte par thème, et un mini-quiz pour
        vérifier que tout est clair.
      </p>
      <LessonList />
    </>
  );
}
