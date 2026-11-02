import { useEffect, useState } from "react";
import type { Language, Question } from "../types";

type Props = {
  question: Question;
  language: Language;
  compact?: boolean;
};

export function RecallCheckpoint({ question, language, compact = false }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelected([]);
    setChecked(false);
  }, [question.id]);

  const toggle = (choiceId: string) => {
    if (checked) return;
    setSelected((current) =>
      current.includes(choiceId)
        ? current.filter((id) => id !== choiceId)
        : [...current, choiceId]
    );
  };

  const correct = new Set(question.correctIds);
  const chosen = new Set(selected);
  const ids = new Set([...correct, ...chosen]);
  let mistakes = 0;
  ids.forEach((id) => {
    if (correct.has(id) !== chosen.has(id)) mistakes += 1;
  });
  const score = mistakes === 0 ? 1 : mistakes === 1 ? 0.5 : 0;

  return (
    <div className={"recall-card" + (compact ? " compact" : "")}>
      <div className="learning-layer-header">
        <span className="layer-badge retrieval">RETRIEVAL</span>
        <span>
          {language === "hu"
            ? "Próbáld meg emlékezetből, mielőtt visszanéznél."
            : "Answer from memory before looking back."}
        </span>
      </div>

      <h3>{question.prompt[language]}</h3>

      <div className="recall-choices">
        {question.choices.map((choice) => {
          const isSelected = selected.includes(choice.id);
          const isCorrect = question.correctIds.includes(choice.id);
          const className = [
            "recall-choice",
            isSelected ? "selected" : "",
            checked && isCorrect ? "correct" : "",
            checked && isSelected && !isCorrect ? "incorrect" : ""
          ].filter(Boolean).join(" ");

          return (
            <label className={className} key={choice.id}>
              <input
                type="checkbox"
                checked={isSelected}
                disabled={checked}
                onChange={() => toggle(choice.id)}
              />
              <span className="choice-letter">{choice.id.toUpperCase()}</span>
              <span>{choice.text[language]}</span>
            </label>
          );
        })}
      </div>

      {!checked ? (
        <button
          className="primary-button"
          disabled={selected.length === 0}
          onClick={() => setChecked(true)}
        >
          {language === "hu" ? "Ellenőrzés" : "Check"}
        </button>
      ) : (
        <div className="recall-feedback">
          <strong>
            {language === "hu"
              ? score === 1
                ? "Helyes."
                : score === 0.5
                  ? "Majdnem — egy eltérés."
                  : "Nézd át még egyszer ezt a részt."
              : score === 1
                ? "Correct."
                : score === 0.5
                  ? "Almost — one mismatch."
                  : "Review this concept once more."}
          </strong>
          <p>{question.explanation[language]}</p>
        </div>
      )}
    </div>
  );
}
