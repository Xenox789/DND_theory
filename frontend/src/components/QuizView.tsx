import { useMemo, useState } from "react";
import type { Language, Question } from "../types";

type Props = {
  questions: Question[];
  language: Language;
};

type AnswerState = {
  selected: string[];
  checked: boolean;
};

function scoreQuestion(question: Question, selected: string[]) {
  const correct = new Set(question.correctIds);
  const chosen = new Set(selected);
  const allIds = new Set([...correct, ...chosen]);

  let mistakes = 0;
  for (const id of allIds) {
    if (correct.has(id) !== chosen.has(id)) mistakes += 1;
  }

  if (mistakes === 0) return 1;
  if (mistakes === 1) return 0.5;
  return 0;
}

export function QuizView({ questions, language }: Props) {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

  const totalScore = useMemo(
    () =>
      questions.reduce((sum, q) => {
        const state = answers[q.id];
        return sum + (state?.checked ? scoreQuestion(q, state.selected) : 0);
      }, 0),
    [answers, questions]
  );

  const checkedCount = questions.filter((q) => answers[q.id]?.checked).length;

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
              ? "Több helyes válasz is lehet. Teljes pont: minden helyes és csak a helyes válaszok. Pontosan egy hiba: fél pont."
              : "More than one answer may be correct. Full score requires selecting all and only the correct options. Exactly one mistake gives half credit."}
          </p>
        </div>
        <div className="score-box">
          <strong>{totalScore.toFixed(1)} / {questions.length}</strong>
          <span>{checkedCount}/{questions.length} {language === "hu" ? "ellenőrizve" : "checked"}</span>
        </div>
      </div>

      <div className="question-list">
        {questions.map((question, index) => {
          const state = answers[question.id] ?? { selected: [], checked: false };
          const score = state.checked ? scoreQuestion(question, state.selected) : null;

          return (
            <article className="question-card" key={question.id}>
              <div className="question-header">
                <span>Q{index + 1}</span>
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
    </div>
  );
}
