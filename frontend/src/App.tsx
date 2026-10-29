import { useMemo, useState } from "react";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LessonView } from "./components/LessonView";
import { LinearRegressionLab } from "./components/LinearRegressionLab";
import { QuizView } from "./components/QuizView";
import { lessons, questionBank } from "./data/course";
import type { Language } from "./types";

type View = "learn" | "quiz" | "lab";

export default function App() {
  const [view, setView] = useState<View>("learn");
  const [learningLanguage, setLearningLanguage] = useState<Language>("hu");
  const [examLanguage, setExamLanguage] = useState<Language>("en");

  const ui = useMemo(
    () =>
      learningLanguage === "hu"
        ? {
            learn: "Tananyag",
            quiz: "Teszt",
            lab: "Szimulációk",
            course: "Deep Network Development",
            subtitle: "Theory Test 1 Study Lab",
            learningLanguage: "Tanulás",
            examLanguage: "Teszt"
          }
        : {
            learn: "Learn",
            quiz: "Test",
            lab: "Labs",
            course: "Deep Network Development",
            subtitle: "Theory Test 1 Study Lab",
            learningLanguage: "Learning",
            examLanguage: "Test"
          },
    [learningLanguage]
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DND</div>
          <div>
            <strong>{ui.course}</strong>
            <span>{ui.subtitle}</span>
          </div>
        </div>

        <nav>
          <button className={view === "learn" ? "active" : ""} onClick={() => setView("learn")}>
            <span>01</span>{ui.learn}
          </button>
          <button className={view === "quiz" ? "active" : ""} onClick={() => setView("quiz")}>
            <span>02</span>{ui.quiz}
          </button>
          <button className={view === "lab" ? "active" : ""} onClick={() => setView("lab")}>
            <span>03</span>{ui.lab}
          </button>
        </nav>

        <div className="scope-card">
          <strong>Theory Test 1</strong>
          <span>Lectures 1–6</span>
          <span>NumPy • Weeks 3–6</span>
          <small>strides excluded</small>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="status">
            <span className="status-dot" />
            <span>Study Lab v0.1</span>
          </div>
          <div className="language-row">
            <LanguageSwitcher
              label={ui.learningLanguage}
              value={learningLanguage}
              onChange={setLearningLanguage}
            />
            <LanguageSwitcher
              label={ui.examLanguage}
              value={examLanguage}
              onChange={setExamLanguage}
            />
          </div>
        </header>

        <div className="content">
          {view === "learn" && (
            <LessonView lesson={lessons[0]} language={learningLanguage} />
          )}
          {view === "quiz" && (
            <QuizView questions={questionBank} language={examLanguage} />
          )}
          {view === "lab" && (
            <LinearRegressionLab language={learningLanguage} />
          )}
        </div>
      </main>
    </div>
  );
}
