import { useMemo, useState } from "react";
import type { Language, Question } from "../types";
import {
  examChapterNames,
  examChapters,
  generateMockExam,
  type ExamChapter
} from "../data/mockExam";
import { scoreMockQuestion } from "../study/scoring";

type Props = { language: Language };
type Answers = Record<string, string[]>;

function questionChapter(question: Question): ExamChapter {
  const tag = question.topics.find((topic) => topic.startsWith("mock-") && topic !== "mock-exam");
  const chapter = tag?.slice(5) as ExamChapter | undefined;
  return chapter && examChapters.includes(chapter) ? chapter : "fundamentals";
}

export function MockExamView({ language }: Props) {
  const [length, setLength] = useState<15 | 20>(15);
  const [exam, setExam] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [confirmIncomplete, setConfirmIncomplete] = useState(false);

  const startExam = () => {
    setExam(generateMockExam(length));
    setAnswers({});
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
    if (submitted) return;
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
          <span>{isHu ? "8 témakör" : "8 chapters"}</span>
        </div>
        <h2>{isHu ? "Új, véletlenszerű teszt indítása" : "Start a new randomized exam"}</h2>
        <p>{isHu
          ? "Mind a nyolc fő témakörből kerülnek be kérdések. Kérdésenként 12 előre ellenőrzött állítás közül véletlenszerűen 3–6 jelenik meg, több helyes válasszal is. A megoldások csak a teszt leadása után láthatók."
          : "Questions cover all eight chapters. Each draws 3–6 statements from a curated pool of 12, potentially with multiple correct choices. Answers are revealed only after submission."}</p>
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
                <article className="question-card" key={question.id}>
                  <div className="question-header">
                    <span>Q{index + 1} · {examChapterNames[questionChapter(question)][language]}</span>
                    <span className={`score-pill score-${String(score).replace(".", "-")}`}>{score.toFixed(1)} pt</span>
                  </div>
                  <h2>{question.prompt[language]}</h2>
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
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const current = exam[currentIndex];
  const selected = answers[current.id] ?? [];
  return (
    <div className="mock-exam">
      <section className="mock-exam-toolbar">
        <div>
          <span className="eyebrow">{isHu ? "PRÓBAVIZSGA" : "MOCK EXAM"}</span>
          <strong>{currentIndex + 1} / {exam.length}</strong>
        </div>
        <span>{answered}/{exam.length} {isHu ? "megválaszolva" : "answered"}</span>
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

      <article className="question-card">
        <div className="question-header">
          <span>{isHu ? "KÉRDÉS" : "QUESTION"} {currentIndex + 1}</span>
          <span>{examChapterNames[questionChapter(current)][language]}</span>
        </div>
        <h2>{current.prompt[language]}</h2>
        <p className="mock-choices-hint">
          {isHu
            ? "Jelöld be az összes igaz állítást. Legalább egy helyes válasz van; több is lehet."
            : "Select all true statements. At least one answer is correct, possibly more."}
        </p>
        <div className="choices">
          {current.choices.map((choice, index) => (
            <label key={choice.id} className={selected.includes(choice.id) ? "choice selected" : "choice"}>
              <input
                type="checkbox"
                checked={selected.includes(choice.id)}
                onChange={() => toggle(current, choice.id)}
              />
              <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
              <span>{choice.text[language]}</span>
            </label>
          ))}
        </div>
        <div className="mock-nav-actions">
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
