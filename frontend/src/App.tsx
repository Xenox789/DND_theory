import { useMemo, useState } from "react";
import { FeatureScalingLab } from "./components/FeatureScalingLab";
import { GradientDescentLab } from "./components/GradientDescentLab";
import { GeneralizationLab } from "./components/GeneralizationLab";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { GuidedLessonView } from "./components/GuidedLessonView";
import { LearningDashboard } from "./components/LearningDashboard";
import { LinearRegressionLab } from "./components/LinearRegressionLab";
import { LogisticRegressionLab } from "./components/LogisticRegressionLab";
import { MLPLab } from "./components/MLPLab";
import { SGDLab } from "./components/SGDLab";
import { BackpropLab } from "./components/BackpropLab";
import { NumPyLab } from "./components/NumPyLab";
import { QuizView } from "./components/QuizView";
import { lessons, questionBank } from "./data/course";
import { loadStudyProgress, saveStudyProgress, type StudyProgress } from "./study/progress";
import type { Language } from "./types";

type View = "learn" | "quiz" | "lab";
type LearnScreen = "dashboard" | "chapter";
type LabId = "linear-regression" | "gradient-descent" | "feature-scaling" | "logistic-regression" | "generalization" | "mlp" | "sgd" | "backprop" | "numpy";

export default function App() {
  const [view, setView] = useState<View>("learn");
  const [learnScreen, setLearnScreen] = useState<LearnScreen>("dashboard");
  const [initialSectionId, setInitialSectionId] = useState<string | undefined>();
  const [studyProgress, setStudyProgress] = useState<StudyProgress>(() => loadStudyProgress());
  const [learningLanguage, setLearningLanguage] = useState<Language>("hu");
  const [examLanguage, setExamLanguage] = useState<Language>("en");
  const [lessonId, setLessonId] = useState(lessons[0].id);
  const [labId, setLabId] = useState<LabId>("linear-regression");

  const selectedLesson = lessons.find((lesson) => lesson.id === lessonId) ?? lessons[0];

  const questionsForSelectedLesson = useMemo(() => {
    const prefixes: Record<string, string> = {
      "ml-fundamentals": "q",
      "linear-regression": "lr-q",
      "logistic-regression": "log-q",
      "generalization-overfitting": "gen-q",
      "artificial-neuron-mlp": "mlp-q",
      "sgd-minibatches": "sgd-q",
      "backprop-computational-graphs": "bp-q",
      "numpy-theory": "np-q"
    };

    const prefix = prefixes[selectedLesson.id];
    if (!prefix) return [];
    if (prefix === "q") {
      return questionBank.filter((question) => /^q\d+$/.test(question.id));
    }
    return questionBank.filter((question) => question.id.startsWith(prefix));
  }, [selectedLesson]);

  const lessonLabMap: Partial<Record<string, LabId>> = {
    "linear-regression": "linear-regression",
    "logistic-regression": "logistic-regression",
    "generalization-overfitting": "generalization",
    "artificial-neuron-mlp": "mlp",
    "sgd-minibatches": "sgd",
    "backprop-computational-graphs": "backprop",
    "numpy-theory": "numpy"
  };

  const openLesson = (targetLessonId: string, sectionId?: string) => {
    setLessonId(targetLessonId);
    setInitialSectionId(sectionId);
    setLearnScreen("chapter");
    setView("learn");
  };

  const updateStudyProgress = (next: StudyProgress) => {
    setStudyProgress(next);
    saveStudyProgress(next);
  };

  const openRelatedLab = () => {
    const target = lessonLabMap[selectedLesson.id];
    if (!target) return;
    setLabId(target);
    setView("lab");
  };

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
          <button className={view === "learn" ? "active" : ""} onClick={() => { setView("learn"); setLearnScreen("dashboard"); }}>
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
            <span>Study Lab v1.0</span>
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
            learnScreen === "dashboard" ? (
              <LearningDashboard
                lessons={lessons}
                language={learningLanguage}
                progress={studyProgress}
                onOpenLesson={openLesson}
              />
            ) : (
              <GuidedLessonView
                lesson={selectedLesson}
                language={learningLanguage}
                questions={questionsForSelectedLesson}
                progress={studyProgress}
                initialSectionId={initialSectionId}
                onProgressChange={updateStudyProgress}
                onBack={() => {
                  setInitialSectionId(undefined);
                  setLearnScreen("dashboard");
                }}
                onOpenLab={lessonLabMap[selectedLesson.id] ? openRelatedLab : undefined}
              />
            )
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
