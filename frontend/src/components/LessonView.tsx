import type { Language, Lesson } from "../types";

type Props = {
  lesson: Lesson;
  language: Language;
};

export function LessonView({ lesson, language }: Props) {
  return (
    <div className="lesson">
      <div className="hero-card">
        <div>
          <span className="eyebrow">{lesson.source}</span>
          <h1>{lesson.title[language]}</h1>
          <p>{lesson.subtitle[language]}</p>
        </div>
        <div className="hero-badge">LEARN</div>
      </div>

      <div className="lesson-grid">
        {lesson.sections.map((section, index) => (
          <article className="lesson-card" key={section.id}>
            <div className="section-number">{String(index + 1).padStart(2, "0")}</div>
            <h2>{section.title[language]}</h2>
            <p>{section.body[language]}</p>

            {section.intuition && (
              <div className="callout intuition">
                <strong>{language === "hu" ? "Intuíció" : "Intuition"}</strong>
                <span>{section.intuition[language]}</span>
              </div>
            )}

            {section.realWorld && (
              <div className="callout real-world">
                <strong>{language === "hu" ? "Valós példa" : "Real-world example"}</strong>
                <span>{section.realWorld[language]}</span>
              </div>
            )}

            {section.examTrap && (
              <div className="callout exam-trap">
                <strong>{language === "hu" ? "Vizsgacsapda" : "Exam trap"}</strong>
                <span>{section.examTrap[language]}</span>
              </div>
            )}

            {section.keyTerms && (
              <div className="term-list">
                {section.keyTerms.map((term) => (
                  <span className="term" key={term.term}>
                    {term.hu && language === "hu" ? term.hu + " (" + term.term + ")" : term.term}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
