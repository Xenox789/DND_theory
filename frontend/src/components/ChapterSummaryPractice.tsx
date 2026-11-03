import { useState } from "react";
import type { Language, Lesson } from "../types";
import { pedagogyForSection } from "../study/pedagogy";

type Props = {
  lesson: Lesson;
  language: Language;
};

export function ChapterSummaryPractice({ lesson, language }: Props) {
  const tasks = lesson.sections
    .map((section) => ({
      section,
      task: pedagogyForSection(section.id)?.activeTask
    }))
    .filter((item) => Boolean(item.task));

  const [openIds, setOpenIds] = useState<string[]>([]);

  if (tasks.length === 0) return null;

  const toggle = (id: string) => {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <section className="chapter-summary-practice">
      <div className="dashboard-section-title">
        <div>
          <span className="eyebrow">CHAPTER REVIEW</span>
          <h2>
            {language === "hu"
              ? "Összefoglaló feladatsor"
              : "Chapter summary exercises"}
          </h2>
        </div>
        <span className="queue-count">{tasks.length}</span>
      </div>

      <p className="summary-practice-intro">
        {language === "hu"
          ? "Ezek a hosszabb, nyílt feladatok nem automatikusan pontozhatók. Előbb oldd meg őket papíron vagy fejben, és csak utána fedd fel a megoldási kulcsot."
          : "These longer open-ended exercises are not automatically scored. Solve them on paper or mentally before revealing the answer key."}
      </p>

      <div className="summary-task-list">
        {tasks.map(({ section, task }, index) => {
          if (!task) return null;
          const isOpen = openIds.includes(section.id);
          return (
            <article className="summary-task" key={section.id}>
              <div className="summary-task-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{section.title[language]}</small>
                  <h3>{task.prompt[language]}</h3>
                </div>
              </div>

              <button className="secondary-button inline" onClick={() => toggle(section.id)}>
                {isOpen
                  ? language === "hu" ? "Megoldási kulcs elrejtése" : "Hide answer key"
                  : language === "hu" ? "Megoldási kulcs felfedése" : "Reveal answer key"}
              </button>

              {isOpen && (
                <div className="active-task-answer">
                  <strong>{language === "hu" ? "Megoldási kulcs" : "Answer key"}</strong>
                  <p>{task.answer[language]}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
