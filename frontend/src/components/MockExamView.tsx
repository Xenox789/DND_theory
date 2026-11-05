import { useMemo, useState } from "react";
import type { Language, Question } from "../types";
import {
  examChapterNames,
  examChapters,
  generateMockExam,
  sourceExamples,
  sourceTopicExamples,
  type ExamChapter
} from "../data/mockExam";
import { scoreMockQuestion } from "../study/scoring";
import { originalDocumentContext } from "../data/mockExam/sourceContext";
import { verbatimSourceEnglish } from "../data/mockExam/verbatimSource";

type Props = { language: Language };
type Answers = Record<string, string[]>;

function questionChapter(question: Question): ExamChapter {
  const tag = question.topics.find((topic) => topic.startsWith("mock-") && topic !== "mock-exam");
  const chapter = tag?.slice(5) as ExamChapter | undefined;
  return chapter && examChapters.includes(chapter) ? chapter : "fundamentals";
}

function SourceTaskPanel({ question, language }: { question: Question; language: Language }) {
  const sourceId = question.id.startsWith("source-") ? question.id.slice(7) : "";
  if (!sourceId) return null;
  const originalTask = originalDocumentContext(sourceId)[language];
  if (!originalTask) return null;
  return (
    <aside className="mock-source-task" aria-label={language === "hu" ? "A kérdéshez tartozó eredeti példafeladat" : "Original example task"}>
      <div className="mock-source-task-heading">
        <span className="eyebrow">{language === "hu" ? "PÉLDAFELADAT" : "EXAMPLE TASK"}</span>
        <span className="mock-source-task-id">{sourceId}</span>
      </div>
      <p>{originalTask}</p>
      <small>{language === "hu"
        ? "A példadokumentum közös feladatleírása. Az aktuális alkérdésre az alábbi válaszok vonatkoznak."
        : "Shared task description from the example document. The answers apply to the current subquestion."}</small>
    </aside>
  );
}

function OriginalQuestionReference({ question, language }: { question: Question; language: Language }) {
  if (language !== "hu" || !question.id.startsWith("source-")) return null;
  const original = verbatimSourceEnglish[question.id.slice(7)];
  if (!original) return null;
  return <p className="mock-original-english"><strong>Original question:</strong> {original}</p>;
}

export function MockExamView({ language }: Props) {
  const [length, setLength] = useState<15 | 20>(15);
  const [includeSupplementary, setIncludeSupplementary] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState<"final" | "instant">("final");
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [exam, setExam] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [confirmIncomplete, setConfirmIncomplete] = useState(false);

  const startExam = () => {
    setExam(generateMockExam(length, Math.random, includeSupplementary));
    setAnswers({});
    setCheckedQuestions({});
    setCurrentIndex(0);
    setSubmitted(false);
    setShowReview(false);
    setConfirmIncomplete(false);
  };

  const answered = exam.filter((q) => (answers[q.id]?.length ?? 0) > 0).length;
  const total = useMemo(
    () => exam.reduce((sum, q) => sum + scoreMockQuestion(q, answers[q.id] ?? []), 0),
    [exam, answers]
  );
  const chapterResults = useMemo(() =>
    examChapters.map((chapter) => {
      const items = exam.filter((q) => questionChapter(q) === chapter);
      const points = items.reduce((sum, q) => sum + scoreMockQuestion(q, answers[q.id] ?? []), 0);
      return { chapter, points, count: items.length };
    }).filter((item) => item.count > 0),
  [exam, answers]);

  const toggle = (question: Question, id: string) => {
    if (submitted || (feedbackMode === "instant" && checkedQuestions[question.id])) return;
    setConfirmIncomplete(false);
    setAnswers((previous) => {
      const selected = previous[question.id] ?? [];
      return {
        ...previous,
        [question.id]: selected.includes(id)
          ? selected.filter((value) => value !== id)
          : [...selected, id]
      };
    });
  };

  const isHu = language === "hu";
  const checkedCount = exam.filter((q) => checkedQuestions[q.id]).length;
  const checkCurrent = () => {
    if (feedbackMode !== "instant" || submitted || checkedQuestions[exam[currentIndex].id]) return;
    setCheckedQuestions((previous) => ({ ...previous, [exam[currentIndex].id]: true }));
    setConfirmIncomplete(false);
  };

  const finalize = () => {
    if (answered < exam.length) {
      setConfirmIncomplete(true);
    } else {
      setSubmitted(true);
    }
  };

  if (exam.length === 0) {
    return (
      <section className="mock-setup question-card">
        <div className="question-header">
          <span>{isHu ? "RÖVID PRÓBAVIZSGA" : "SHORT MOCK EXAM"}</span>
          <span>{isHu ? `${sourceExamples.length} eredeti alkérdés` : `${sourceExamples.length} original subquestions`}</span>
        </div>
        <h2>{isHu ? "Új, véletlenszerű teszt indítása" : "Start a new randomized exam"}</h2>
        <p>{isHu
          ? "A teszt kizárólag a Theory Test 1 példadokumentumának 129 konkrét alkérdéséből válogat, az eredeti angol kérdést változatlanul megjelenítve. A közös példafeladat külön dobozban látható. Kérdésenként 3–6, kifejezetten ahhoz tartozó válasz jelenik meg."
          : "By default, the exam draws only from the 129 explicit subquestions in the Theory Test 1 examples, preserving the original English question. Any shared task context is shown separately. Each question displays 3–6 directly relevant answer statements."}</p>
        <div className="mock-length-options" role="group" aria-label={isHu ? "Kérdések száma" : "Question count"}>
          {([15, 20] as const).map((count) => (
            <button
              key={count}
              type="button"
              className={length === count ? "mock-length active" : "mock-length"}
              aria-pressed={length === count}
              onClick={() => setLength(count)}
            >
              <strong>{count}</strong>
              <span>{isHu ? "kérdés" : "questions"}</span>
            </button>
          ))}
        </div>
        <div className="mock-feedback-options" role="group" aria-label={isHu ? "Visszajelzés módja" : "Feedback mode"}>
          <button
            type="button"
            className={feedbackMode === "final" ? "mock-feedback-choice active" : "mock-feedback-choice"}
            aria-pressed={feedbackMode === "final"}
            onClick={() => setFeedbackMode("final")}
          >
            <strong>{isHu ? "Vizsgamód" : "Exam mode"}</strong>
            <span>{isHu ? "Helyes válaszok a teszt végén" : "Answers shown after submission"}</span>
          </button>
          <button
            type="button"
            className={feedbackMode === "instant" ? "mock-feedback-choice active" : "mock-feedback-choice"}
            aria-pressed={feedbackMode === "instant"}
            onClick={() => setFeedbackMode("instant")}
          >
            <strong>{isHu ? "Tanulómód" : "Study mode"}</strong>
            <span>{isHu ? "Ellenőrzés és magyarázat minden kérdés után" : "Check answers after each question"}</span>
          </button>
        </div>
        <label className="mock-extra-toggle">
          <input
            type="checkbox"
            checked={includeSupplementary}
            onChange={(event) => setIncludeSupplementary(event.target.checked)}
          />
          <span>{isHu
            ? "Kiegészítő gyakorlás: a dokumentum 4 további feladattípusa és 24 önálló, előadásalapú kérdéssablon is bekerül a válogatásba."
            : "Extended practice: include 4 additional example topics and 24 lecture-based question templates; these are separate from the 129 verbatim examples."}</span>
        </label>
        <p className="mock-setup-caption">
          {isHu
            ? "Értékelés: minden helyes választás szükséges. Pontosan egy eltérés 0,5 pontot ér; kettő vagy több eltérés 0 pont."
            : "Scoring: all correct options required for full credit. Exactly one selection mistake earns 0.5 points; two or more earn zero."}
        </p>
        <button type="button" className="primary-button" onClick={startExam}>
          {isHu ? "Próbavizsga indítása" : "Start mock exam"}
        </button>
      </section>
    );
  }

  if (submitted) {
    const percentage = Math.round(total / exam.length * 100);
    return (
      <div className="mock-result">
        <section className="hero-card compact">
          <div>
            <span className="eyebrow">{isHu ? "PRÓBAVIZSGA EREDMÉNYE" : "MOCK EXAM RESULT"}</span>
            <h1>{percentage}%</h1>
            <p>{isHu
              ? `${answered}/${exam.length} kérdésre adtál választ. A kihagyott kérdések 0 pontot érnek.`
              : `You answered ${answered}/${exam.length} questions. Unanswered questions score zero.`}</p>
          </div>
          <div className="score-box">
            <strong>{total.toFixed(1)} / {exam.length}</strong>
            <span>{isHu ? "pont" : "points"}</span>
          </div>
        </section>

        <section className="question-card mock-topic-report">
          <h2>{isHu ? "Eredmény témakörönként" : "Scores by chapter"}</h2>
          <div className="mock-topic-list">
            {chapterResults.map((item) => (
              <div className="mock-topic" key={item.chapter}>
                <span>{examChapterNames[item.chapter][language]}</span>
                <div className="mock-topic-track" aria-hidden="true">
                  <div style={{ width: (100 * item.points / item.count) + "%" }} />
                </div>
                <strong>{item.points.toFixed(1)}/{item.count}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="mock-result-actions">
          <button className="primary-button" type="button" onClick={startExam}>
            {isHu ? "Új véletlenszerű teszt" : "Generate another exam"}
          </button>
          <button className="secondary-button" type="button" onClick={() => setShowReview((value) => !value)}>
            {isHu ? (showReview ? "Megoldások elrejtése" : "Megoldások átnézése") : (showReview ? "Hide explanations" : "Review answers")}
          </button>
          <button className="secondary-button" type="button" onClick={() => { setExam([]); setAnswers({}); }}>
            {isHu ? "Teszt beállításai" : "Exam settings"}
          </button>
        </div>

        {showReview && (
          <div className="question-list mock-review">
            {exam.map((question, index) => {
              const chosen = answers[question.id] ?? [];
              const score = scoreMockQuestion(question, chosen);
              return (
                <div className="mock-question-layout mock-review-layout" key={question.id}>
                <article className="question-card">
                  <div className="question-header">
                    <span>Q{index + 1} · {examChapterNames[questionChapter(question)][language]}</span>
                    <span className={`score-pill score-${String(score).replace(".", "-")}`}>{score.toFixed(1)} pt</span>
                  </div>
                  <h2>{question.prompt[language]}</h2>
                  <OriginalQuestionReference question={question} language={language} />
                  <div className="choices">
                    {question.choices.map((choice, optionIndex) => {
                      const selected = chosen.includes(choice.id);
                      const correct = question.correctIds.includes(choice.id);
                      return (
                        <div className={[
                          "choice",
                          correct ? "correct" : "",
                          selected && !correct ? "incorrect" : ""
                        ].filter(Boolean).join(" ")} key={choice.id}>
                          <input type="checkbox" checked={selected} readOnly aria-label={choice.text[language]} />
                          <span className="choice-letter">{String.fromCharCode(65 + optionIndex)}</span>
                          <span>{choice.text[language]}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="explanation">
                    <strong>{isHu ? "Magyarázat" : "Explanation"}</strong>
                    <p>{question.explanation[language]}</p>
                  </div>
                </article>
                <SourceTaskPanel question={question} language={language} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const current = exam[currentIndex];
  const selected = answers[current.id] ?? [];
  const currentChecked = feedbackMode === "instant" && Boolean(checkedQuestions[current.id]);
  const currentScore = currentChecked ? scoreMockQuestion(current, selected) : null;
  return (
    <div className="mock-exam">
      <section className="mock-exam-toolbar">
        <div>
          <span className="eyebrow">{isHu ? "PRÓBAVIZSGA" : "MOCK EXAM"}</span>
          <strong>{currentIndex + 1} / {exam.length}</strong>
        </div>
        <span>{feedbackMode === "instant"
          ? `${checkedCount}/${exam.length} ${isHu ? "ellenőrizve" : "checked"}`
          : `${answered}/${exam.length} ${isHu ? "megválaszolva" : "answered"}`}</span>
      </section>
      <div className="mock-progress-track" aria-label={isHu ? "Vizsga előrehaladása" : "Exam progress"}>
        <div style={{ width: (100 * (currentIndex + 1) / exam.length) + "%" }} />
      </div>
      <div className="mock-question-nav" aria-label={isHu ? "Ugrás kérdéshez" : "Jump to a question"}>
        {exam.map((q, index) => (
          <button
            key={q.id}
            type="button"
            className={[
              "mock-question-number",
              index === currentIndex ? "active" : "",
              (answers[q.id]?.length ?? 0) > 0 ? "answered" : ""
            ].filter(Boolean).join(" ")}
            onClick={() => setCurrentIndex(index)}
            aria-label={isHu ? `Ugrás a(z) ${index + 1}. kérdésre` : `Go to question ${index + 1}`}
            aria-current={index === currentIndex ? "step" : undefined}
          >{index + 1}</button>
        ))}
      </div>

      <div className="mock-question-layout">
      <article className="question-card">
        <div className="question-header">
          <span>{isHu ? "KÉRDÉS" : "QUESTION"} {currentIndex + 1}</span>
          <span>{examChapterNames[questionChapter(current)][language]}</span>
          {current.topics.some(topic => /^source-[MNT]\d+$/.test(topic)) && (
            <span className="mock-source-label">
              {isHu ? "Példadokumentum" : "Example document"}
            </span>
          )}
          {currentScore !== null && (
            <span className={`score-pill score-${String(currentScore).replace(".", "-")}`}>
              {currentScore.toFixed(1)} pt
            </span>
          )}
        </div>
        <h2>{current.prompt[language]}</h2>
        <OriginalQuestionReference question={current} language={language} />
        <p className="mock-choices-hint">
          {isHu
            ? "Jelöld be az összes igaz állítást. Legalább egy helyes válasz van; több is lehet."
            : "Select all true statements. At least one answer is correct, possibly more."}
        </p>
        <div className="choices">
          {current.choices.map((choice, index) => (
            <label
              key={choice.id}
              className={[
                "choice",
                selected.includes(choice.id) ? "selected" : "",
                currentChecked && current.correctIds.includes(choice.id) ? "correct" : "",
                currentChecked && selected.includes(choice.id) && !current.correctIds.includes(choice.id) ? "incorrect" : ""
              ].filter(Boolean).join(" ")}
            >
              <input
                type="checkbox"
                checked={selected.includes(choice.id)}
                disabled={currentChecked}
                onChange={() => toggle(current, choice.id)}
              />
              <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
              <span>{choice.text[language]}</span>
            </label>
          ))}
        </div>
        {currentChecked && (
          <div className="explanation mock-instant-feedback" role="status">
            <strong>{isHu ? "Eredmény és magyarázat" : "Result and explanation"} · {currentScore?.toFixed(1)} / 1</strong>
            <p>{isHu
              ? "A zöld állítások helyesek; az általad kiválasztott hibás válaszok pirossal jelennek meg. Ez a kérdés már nem módosítható."
              : "Correct statements are green; any incorrect answers you selected are red. This question is now locked."}</p>
            <p>{current.explanation[language]}</p>
          </div>
        )}
        <div className="mock-nav-actions">
          {feedbackMode === "instant" && !currentChecked && (
            <button
              type="button"
              className="primary-button"
              disabled={selected.length === 0}
              onClick={checkCurrent}
            >{isHu ? "Válasz ellenőrzése" : "Check answer"}</button>
          )}
          <button
            type="button"
            className="secondary-button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((index) => index - 1)}
          >{isHu ? "Előző" : "Previous"}</button>
          {currentIndex < exam.length - 1 ? (
            <button
              className="primary-button"
              type="button"
              onClick={() => setCurrentIndex((index) => index + 1)}
            >{isHu ? "Következő" : "Next"}</button>
          ) : (
            <button type="button" className="primary-button" onClick={finalize}>
              {isHu ? "Teszt leadása és kiértékelés" : "Submit and score"}
            </button>
          )}
        </div>
      </article>
      <SourceTaskPanel question={current} language={language} />
      </div>
      {currentIndex !== exam.length - 1 && (
        <div className="mock-finish-early">
          <button type="button" className="secondary-button" onClick={finalize}>
            {isHu ? "Teszt leadása" : "Submit exam"} · {answered}/{exam.length}
          </button>
        </div>
      )}
      {confirmIncomplete && (
        <div className="mock-submit-warning" role="alert">
          <strong>{isHu ? "Nem válaszoltál minden kérdésre." : "Some questions are unanswered."}</strong>
          <p>{isHu
            ? `${exam.length - answered} kérdés kimaradt. Ezek 0 pontot érnek. Biztosan szeretnéd leadni a tesztet?`
            : `${exam.length - answered} questions are blank and will score zero. Submit anyway?`}</p>
          <div className="mock-submit-warning-actions">
            <button type="button" className="secondary-button" onClick={() => setConfirmIncomplete(false)}>
              {isHu ? "Vissza a kérdésekhez" : "Return to questions"}
            </button>
            <button type="button" className="primary-button" onClick={() => { setSubmitted(true); setConfirmIncomplete(false); }}>
              {isHu ? "Igen, leadom" : "Submit anyway"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
