import { useEffect, useMemo, useState } from "react";
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

  allIds.forEach((id) => {
    if (correct.has(id) !== chosen.has(id)) mistakes += 1;
  });

  if (mistakes === 0) return 1;
  if (mistakes === 1) return 0.5;
  return 0;
}

export function ConceptCheck({ questions, language }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

  useEffect(() => {
    setIndex(0);
    setAnswers({});
  }, [questions]);

  const current = questions[index];
  const state = current
    ? answers[current.id] ?? { selected: [], checked: false }
    : { selected: [], checked: false };

  const totalScore = useMemo(
    () =>
      questions.reduce((sum, question) => {
        const answer = answers[question.id];
        return sum + (answer?.checked ? scoreQuestion(question, answer.selected) : 0);
      }, 0),
    [answers, questions]
  );

  if (!current) return null;

  const toggle = (choiceId: string) => {
    if (state.checked) return;
    setAnswers((previous) => {
      const currentState = previous[current.id] ?? { selected: [], checked: false };
      const selected = currentState.selected.includes(choiceId)
        ? currentState.selected.filter((id) => id !== choiceId)
        : [...currentState.selected, choiceId];

      return {
        ...previous,
        [current.id]: { selected, checked: false }
      };
    });
  };

  const check = () => {
    setAnswers((previous) => ({
      ...previous,
      [current.id]: { ...state, checked: true }
    }));
  };

  const score = state.checked ? scoreQuestion(current, state.selected) : null;

  return (
    <section className="concept-check-card">
      <div className="concept-check-header">
        <div className="learning-layer-header">
          <span className="layer-badge retrieval">MINI TEST</span>
          <span>
            {language === "hu"
              ? "Automatikusan ellenőrizhető, több helyes válaszos kérdés."
              : "Automatically checked multiple-answer question."}
          </span>
        </div>
        <strong>{index + 1}/{questions.length}</strong>
      </div>

      <h3>{current.prompt[language]}</h3>

      <div className="recall-choices">
        {current.choices.map((choice) => {
          const selected = state.selected.includes(choice.id);
          const correct = current.correctIds.includes(choice.id);
          const className = [
            "recall-choice",
            selected ? "selected" : "",
            state.checked && correct ? "correct" : "",
            state.checked && selected && !correct ? "incorrect" : ""
          ].filter(Boolean).join(" ");

          return (
            <label className={className} key={choice.id}>
              <input
                type="checkbox"
                checked={selected}
                disabled={state.checked}
                onChange={() => toggle(choice.id)}
              />
              <span className="choice-letter">{choice.id.toUpperCase()}</span>
              <span>{choice.text[language]}</span>
            </label>
          );
        })}
      </div>

      {!state.checked ? (
        <button
          className="primary-button"
          disabled={state.selected.length === 0}
          onClick={check}
        >
          {language === "hu" ? "Válasz ellenőrzése" : "Check answer"}
        </button>
      ) : (
        <>
          <div className={"concept-check-feedback score-" + String(score).replace(".", "-")}>
            <strong>
              {language === "hu"
                ? "Eredmény: " + score?.toFixed(1) + " / 1"
                : "Score: " + score?.toFixed(1) + " / 1"}
            </strong>
            <p>{current.explanation[language]}</p>
          </div>

          <div className="concept-check-nav">
            <span>
              {language === "hu"
                ? "Eddigi pont: " + totalScore.toFixed(1) + " / " + questions.length
                : "Current score: " + totalScore.toFixed(1) + " / " + questions.length}
            </span>
            {index < questions.length - 1 ? (
              <button className="secondary-button inline" onClick={() => setIndex(index + 1)}>
                {language === "hu" ? "Következő kérdés →" : "Next question →"}
              </button>
            ) : (
              <button
                className="secondary-button inline"
                onClick={() => {
                  setIndex(0);
                  setAnswers({});
                }}
              >
                {language === "hu" ? "Mini-teszt újrakezdése" : "Restart mini test"}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
