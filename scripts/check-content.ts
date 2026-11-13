/**
 * Vérifie tout le contenu du jeu : salles, cartes et leçons.
 * Lancé par la CI (npm run check:content) et après chaque ajout de salles.
 */
import { ROOMS } from "../src/data/game";
import { LESSONS, THEMES } from "../src/data/lessons";
import { LEVELS, ROOM_COUNTS, levelOfRoom } from "../src/data/meta";
import { checkSubmission, toPublicRoom } from "../src/server/game-logic";
import type { Submission } from "../src/lib/types";

const errors: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) errors.push(message);
};

// Salles
check(new Set(ROOMS.map((r) => r.id)).size === ROOMS.length, "Des identifiants de salles sont en double.");
for (const level of LEVELS) {
  const rooms = ROOMS.filter((r) => r.level === level.id);
  check(rooms.length === ROOM_COUNTS[level.id], `${level.id} : ${rooms.length} salles au lieu de ${ROOM_COUNTS[level.id]} (src/data/meta.ts).`);
  check(rooms[rooms.length - 1]?.id === `${level.id}-100`, `${level.id} : la salle de sortie ${level.id}-100 doit rester la dernière.`);
}

const titles = ROOMS.map((r) => r.card.title.toLowerCase());
const duplicates = [...new Set(titles.filter((t, i) => titles.indexOf(t) !== i))];
check(duplicates.length === 0, `Titres de cartes en double : ${duplicates.join(", ")}`);

for (const room of ROOMS) {
  const p = room.puzzle;
  check(levelOfRoom(room.id) === room.level, `${room.id} : identifiant incohérent avec son niveau.`);
  for (const text of [room.name, room.story, room.successText, room.card.summary, room.card.hint]) {
    check(typeof text === "string" && text.trim().length > 0, `${room.id} : texte vide.`);
  }
  check(room.card.details.length > 0, `${room.id} : la carte n'a pas d'explications.`);

  // Aucune réponse ne doit partir vers le navigateur.
  const publicJson = JSON.stringify(toPublicRoom(room));
  for (const secret of ['"correct"', '"answers"', '"isPhishing"', '"explanation"', "successText"]) {
    check(!publicJson.includes(secret), `${room.id} : la version publique contient ${secret}.`);
  }

  let good: Submission;
  switch (p.kind) {
    case "answer":
      check(p.answers.length > 0, `${room.id} : aucune réponse acceptée.`);
      good = { kind: "answer", value: p.answers[0] ?? "" };
      break;
    case "choice":
      check(p.options.filter((o) => o.correct).length === 1, `${room.id} : il faut exactement une bonne réponse.`);
      good = { kind: "choice", index: p.options.findIndex((o) => o.correct) };
      break;
    case "multi":
      check(p.options.some((o) => o.correct) && p.options.some((o) => !o.correct), `${room.id} : il faut des bonnes et des mauvaises options.`);
      good = { kind: "multi", indices: p.options.flatMap((o, i) => (o.correct ? [i] : [])) };
      break;
    case "order":
      check(p.items.length >= 3 && new Set(p.items).size === p.items.length, `${room.id} : au moins 3 étapes distinctes.`);
      good = { kind: "order", sequence: p.items };
      break;
    case "phishing":
      check(p.emails.filter((e) => e.isPhishing).length === 1, `${room.id} : il faut exactement un mail piégé.`);
      good = { kind: "phishing", emailId: p.emails.find((e) => e.isPhishing)?.id ?? "" };
      break;
  }
  check(checkSubmission(p, good).correct, `${room.id} : la bonne réponse n'est pas acceptée par le serveur.`);
}

// Leçons
check(new Set(LESSONS.map((l) => l.slug)).size === LESSONS.length, "Des slugs de leçons sont en double.");
for (const lesson of LESSONS) {
  check(THEMES.some((t) => t.id === lesson.theme), `${lesson.slug} : thème inconnu.`);
  check(lesson.sections.length >= 3, `${lesson.slug} : au moins 3 sections.`);
  check(lesson.quiz.length >= 3, `${lesson.slug} : au moins 3 questions de quiz.`);
  for (const q of lesson.quiz) check(q.correct >= 0 && q.correct < q.options.length, `${lesson.slug} : index de bonne réponse invalide.`);
}

if (errors.length > 0) {
  console.error(`❌ ${errors.length} problème(s) :\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`✅ Contenu valide : ${ROOMS.length} salles, ${LESSONS.length} leçons.`);
