import { useMemo, useState } from "react";
import { FeatureScalingLab } from "./components/FeatureScalingLab";
import { GradientDescentLab } from "./components/GradientDescentLab";
import { GeneralizationLab } from "./components/GeneralizationLab";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LessonView } from "./components/LessonView";
import { LinearRegressionLab } from "./components/LinearRegressionLab";
import { LogisticRegressionLab } from "./components/LogisticRegressionLab";
import { MLPLab } from "./components/MLPLab";
import { SGDLab } from "./components/SGDLab";
import { BackpropLab } from "./components/BackpropLab";
import { NumPyLab } from "./components/NumPyLab";
import { QuizView } from "./components/QuizView";
import { lessons, questionBank } from "./data/course";
import type { Language } from "./types";

type View = "learn" | "quiz" | "lab";
type LabId = "linear-regression" | "gradient-descent" | "feature-scaling" | "logistic-regression" | "generalization" | "mlp" | "sgd" | "backprop" | "numpy";

export default function App() {
  const [view, setView] = useState<View>("learn");
  const [learningLanguage, setLearningLanguage] = useState<Language>("hu");
  const [examLanguage, setExamLanguage] = useState<Language>("en");
  const [lessonId, setLessonId] = useState(lessons[0].id);
  const [labId, setLabId] = useState<LabId>("linear-regression");

  const selectedLesson = lessons.find((lesson) => lesson.id === lessonId) ?? lessons[0];

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
            examLanguage: "Teszt",
            lessons: "Fejezetek",
            labs: "Labok"
          }
        : {
            learn: "Learn",
            quiz: "Test",
            lab: "Labs",
            course: "Deep Network Development",
            subtitle: "Theory Test 1 Study Lab",
            learningLanguage: "Learning",
            examLanguage: "Test",
            lessons: "Chapters",
            labs: "Labs"
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
          <small>ndarray.strides / stride tricks excluded</small>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="status">
            <span className="status-dot" />
            <span>Study Lab v0.7</span>
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
            <>
              <div className="section-toolbar">
                <span>{ui.lessons}</span>
                <div className="subnav">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      className={lesson.id === selectedLesson.id ? "active" : ""}
                      onClick={() => setLessonId(lesson.id)}
                    >
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      {lesson.title[learningLanguage]}
                    </button>
                  ))}
                </div>
              </div>
              <LessonView lesson={selectedLesson} language={learningLanguage} />
            </>
          )}

          {view === "quiz" && (
            <QuizView questions={questionBank} language={examLanguage} />
          )}

          {view === "lab" && (
            <>
              <div className="section-toolbar">
                <span>{ui.labs}</span>
                <div className="subnav">
                  <button
                    className={labId === "linear-regression" ? "active" : ""}
                    onClick={() => setLabId("linear-regression")}
                  >
                    Linear Regression
                  </button>
                  <button
                    className={labId === "gradient-descent" ? "active" : ""}
                    onClick={() => setLabId("gradient-descent")}
                  >
                    Gradient Descent
                  </button>
                  <button
                    className={labId === "feature-scaling" ? "active" : ""}
                    onClick={() => setLabId("feature-scaling")}
                  >
                    Feature Scaling
                  </button>
                  <button
                    className={labId === "logistic-regression" ? "active" : ""}
                    onClick={() => setLabId("logistic-regression")}
                  >
                    Logistic Regression
                  </button>
                  <button
                    className={labId === "generalization" ? "active" : ""}
                    onClick={() => setLabId("generalization")}
                  >
                    Generalization
                  </button>
                  <button
                    className={labId === "mlp" ? "active" : ""}
                    onClick={() => setLabId("mlp")}
                  >
                    MLP
                  </button>
                  <button
                    className={labId === "sgd" ? "active" : ""}
                    onClick={() => setLabId("sgd")}
                  >
                    SGD / Mini-batch
                  </button>
                  <button
                    className={labId === "backprop" ? "active" : ""}
                    onClick={() => setLabId("backprop")}
                  >
                    Backpropagation
                  </button>
                  <button
                    className={labId === "numpy" ? "active" : ""}
                    onClick={() => setLabId("numpy")}
                  >
                    NumPy
                  </button>
                </div>
              </div>

              {labId === "linear-regression" && (
                <LinearRegressionLab language={learningLanguage} />
              )}
              {labId === "gradient-descent" && (
                <GradientDescentLab language={learningLanguage} />
              )}
              {labId === "feature-scaling" && (
                <FeatureScalingLab language={learningLanguage} />
              )}
              {labId === "logistic-regression" && (
                <LogisticRegressionLab language={learningLanguage} />
              )}
              {labId === "generalization" && (
                <GeneralizationLab language={learningLanguage} />
              )}
              {labId === "mlp" && (
                <MLPLab language={learningLanguage} />
              )}
              {labId === "sgd" && (
                <SGDLab language={learningLanguage} />
              )}
              {labId === "backprop" && (
                <BackpropLab language={learningLanguage} />
              )}
              {labId === "numpy" && (
                <NumPyLab language={learningLanguage} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
