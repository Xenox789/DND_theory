import { useMemo, useState } from "react";
import type { Language, Question } from "../types";
import { MockExamView } from "./MockExamView";
import { scoreQuestion } from "../study/scoring";

type Props = {
  questions: Question[];
  language: Language;
};

type AnswerState = {
  selected: string[];
  checked: boolean;
};

export function QuizView({ questions, language }: Props) {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [mode, setMode] = useState<"mock" | "official" | "extended">("mock");

  const visibleQuestions = useMemo(
    () =>
      mode === "official"
        ? questions.filter((question) => question.topics.includes("official-example"))
        : mode === "extended"
          ? questions
          : [],
    [mode, questions]
  );

  const totalScore = useMemo(
    () =>
      visibleQuestions.reduce((sum, q) => {
        const state = answers[q.id];
        return sum + (state?.checked ? scoreQuestion(q, state.selected) : 0);
      }, 0),
    [answers, visibleQuestions]
  );

  const checkedCount = visibleQuestions.filter((q) => answers[q.id]?.checked).length;

  const toggle = (questionId: string, choiceId: string) => {
    setAnswers((current) => {
      const previous = current[questionId] ?? { selected: [], checked: false };
      if (previous.checked) return current;
      const selected = previous.selected.includes(choiceId)
        ? previous.selected.filter((id) => id !== choiceId)
        : [...previous.selected, choiceId];

      return { ...current, [questionId]: { selected, checked: false } };
    });
  };

  const check = (questionId: string) => {
    setAnswers((current) => {
      const previous = current[questionId] ?? { selected: [], checked: false };
      return { ...current, [questionId]: { ...previous, checked: true } };
    });
  };

  const reset = () => setAnswers({});

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">THEORY TEST ENGINE</span>
          <h1>{language === "hu" ? "Gyakorló teszt" : "Practice Test"}</h1>
          <p>
            {language === "hu"
              ? mode === "mock"
                ? "Rövid, véletlenszerű próbavizsga 15 vagy 20 kérdéssel, minden fő témakörből. A válaszlehetőségek is változnak."
                : mode === "official"
                  ? "Vizsgaközeli gyakorlás a hivatalos példatémák alapján készített kérdésekkel (nem eredeti vizsgakérdések). Több helyes válasz lehet; egyetlen eltérés fél pont."
                  : "Bővített gyakorlás: a teljes kérdésbank. Több helyes válasz is lehet; pontosan egy eltérés fél pont."
              : mode === "mock"
                ? "A short randomized 15- or 20-question mock exam covering all main chapters, with changing answer choices."
                : mode === "official"
                  ? "Exam-style practice with questions written from official example topics (not actual exam questions). Multiple answers may be correct; one mismatch gives half credit."
                  : "Extended practice: the full question bank. Multiple answers may be correct; exactly one mismatch gives half credit."}
          </p>
        </div>
        {mode !== "mock" && (
          <div className="score-box">
            <strong>{totalScore.toFixed(1)} / {visibleQuestions.length}</strong>
            <span>{checkedCount}/{visibleQuestions.length} {language === "hu" ? "ellenőrizve" : "checked"}</span>
          </div>
        )}
      </div>

      <div className="quiz-mode-switch">
        <button
          className={mode === "mock" ? "active" : ""}
          onClick={() => { setMode("mock"); setAnswers({}); }}
        >
          <strong>{language === "hu" ? "Rövid próbavizsga" : "Short mock exam"}</strong>
          <span>{language === "hu" ? "15 vagy 20 random kérdés • 8 témakör" : "15 or 20 random questions • 8 chapters"}</span>
        </button>
        <button
          className={mode === "official" ? "active" : ""}
          onClick={() => {
            setMode("official");
            setAnswers({});
          }}
        >
          <strong>{language === "hu" ? "Vizsgaközeli" : "Exam-close"}</strong>
          <span>{language === "hu" ? "Hivatalos témákból készült kérdések" : "Official topic-based questions"}</span>
        </button>
        <button
          className={mode === "extended" ? "active" : ""}
          onClick={() => {
            setMode("extended");
            setAnswers({});
          }}
        >
          <strong>{language === "hu" ? "Bővített gyakorlás" : "Extended practice"}</strong>
          <span>{language === "hu" ? "Teljes kérdésbank" : "Full question bank"}</span>
        </button>
      </div>

      {mode === "mock" ? (
        <MockExamView language={language} />
      ) : (
        <>
      <div className="question-list">
        {visibleQuestions.map((question, index) => {
          const state = answers[question.id] ?? { selected: [], checked: false };
          const score = state.checked ? scoreQuestion(question, state.selected) : null;

          return (
            <article className="question-card" key={question.id}>
              <div className="question-header">
                <span>Q{index + 1}</span>
                {question.topics.includes("official-example") && (
                  <span className="official-question-badge">
                    {language === "hu" ? "HIVATALOS TÉMA ALAPJÁN" : "OFFICIAL TOPIC-BASED"}
                  </span>
                )}
                {score !== null && (
                  <span className={`score-pill score-${String(score).replace(".", "-")}`}>
                    {score.toFixed(1)} pt
                  </span>
                )}
              </div>
              <h2>{question.prompt[language]}</h2>

              <div className="choices">
                {question.choices.map((choice) => {
                  const selected = state.selected.includes(choice.id);
                  const correct = question.correctIds.includes(choice.id);
                  const classNames = [
                    "choice",
                    selected ? "selected" : "",
                    state.checked && correct ? "correct" : "",
                    state.checked && selected && !correct ? "incorrect" : ""
                  ].filter(Boolean).join(" ");

                  return (
                    <label className={classNames} key={choice.id}>
                      <input
                        type="checkbox"
                        checked={selected}
                        disabled={state.checked}
                        onChange={() => toggle(question.id, choice.id)}
                      />
                      <span className="choice-letter">{choice.id.toUpperCase()}</span>
                      <span>{choice.text[language]}</span>
                    </label>
                  );
                })}
              </div>

              {!state.checked ? (
                <button className="primary-button" onClick={() => check(question.id)}>
                  {language === "hu" ? "Válasz ellenőrzése" : "Check answer"}
                </button>
              ) : (
                <div className="explanation">
                  <strong>{language === "hu" ? "Magyarázat" : "Explanation"}</strong>
                  <p>{question.explanation[language]}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <button className="secondary-button" onClick={reset}>
        {language === "hu" ? "Teszt újrakezdése" : "Restart test"}
      </button>
        </>
      )}
    </div>
  );
}
