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

            {section.why && (
              <div className="callout concept-why">
                <strong>{language === "hu" ? "Miért fontos?" : "Why does it matter?"}</strong>
                <span>{section.why[language]}</span>
              </div>
            )}

            {section.formula && (
              <div className="formula-block">
                {section.formula[language]}
              </div>
            )}

            {section.formulaTerms && (
              <div className="formula-term-grid">
                {section.formulaTerms.map((item) => (
                  <div className="formula-term-row" key={item.symbol}>
                    <code>{item.symbol}</code>
                    <span>{language === "hu" ? item.hu : item.en}</span>
                  </div>
                ))}
              </div>
            )}

            {section.intuition && (
              <div className="callout intuition">
                <strong>{language === "hu" ? "Intuíció" : "Intuition"}</strong>
                <span>{section.intuition[language]}</span>
              </div>
            )}

            {section.workedExample && (
              <div className="callout worked-example">
                <strong>{language === "hu" ? "Lépésenkénti példa" : "Worked example"}</strong>
                <span>{section.workedExample[language]}</span>
              </div>
            )}

            {section.connections && (
              <div className="callout connections">
                <strong>{language === "hu" ? "Kapcsolat más fogalmakkal" : "Connections"}</strong>
                <span>{section.connections[language]}</span>
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
