import { useEffect, useState } from "react";
import type { Language, Lesson, Question } from "../types";
import {
  getSectionProgress,
  reviewSection,
  type ReviewRating,
  type StudyProgress
} from "../study/progress";
import { ConceptCheck } from "./ConceptCheck";
import { ChapterSummaryPractice } from "./ChapterSummaryPractice";
import { checkpointsForSection } from "../study/checkpoints";
import { pedagogyForSection } from "../study/pedagogy";

type Props = {
  lesson: Lesson;
  language: Language;
  questions: Question[];
  progress: StudyProgress;
  initialSectionId?: string;
  onProgressChange: (progress: StudyProgress) => void;
  onBack: () => void;
  onOpenLab?: (sectionId: string) => void;
  hasRelatedLab?: (sectionId: string) => boolean;
};

function formatReviewDate(value: string | null, language: Language) {
  if (!value) return null;
  const date = new Date(value);
  return new Intl.DateTimeFormat(language === "hu" ? "hu-HU" : "en-GB", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function GuidedLessonView({
  lesson,
  language,
  questions,
  progress,
  initialSectionId,
  onProgressChange,
  onBack,
  onOpenLab,
  hasRelatedLab
}: Props) {
  const initialIndex = Math.max(
    0,
    initialSectionId
      ? lesson.sections.findIndex((section) => section.id === initialSectionId)
      : 0
  );

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [courseVisible, setCourseVisible] = useState(false);
  const [symbolsVisible, setSymbolsVisible] = useState(false);
  const [understandingVisible, setUnderstandingVisible] = useState(false);
  const [deepDiveVisible, setDeepDiveVisible] = useState(false);

  useEffect(() => {
    if (!initialSectionId) return;
    const index = lesson.sections.findIndex((section) => section.id === initialSectionId);
    if (index >= 0) setActiveIndex(index);
  }, [initialSectionId, lesson]);

  const section = lesson.sections[activeIndex];
  const sectionProgress = getSectionProgress(progress, lesson.id, section.id);
  const nextReview = formatReviewDate(sectionProgress.nextReview, language);
  const pedagogy = pedagogyForSection(section.id);

  const conceptChecks = checkpointsForSection(questions, section.id, 3);

  const hasUnderstanding = Boolean(
    section.why ||
    section.intuition ||
    section.workedExample ||
    section.connections
  );
  const hasDeepDive = Boolean(section.realWorld);

  const resetLearningState = () => {
    setCourseVisible(false);
    setSymbolsVisible(false);
    setUnderstandingVisible(false);
    setDeepDiveVisible(false);
  };

  const goTo = (index: number) => {
    const bounded = Math.max(0, Math.min(lesson.sections.length - 1, index));
    setActiveIndex(bounded);
    resetLearningState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rate = (rating: ReviewRating) => {
    const next = reviewSection(progress, lesson.id, section.id, rating);
    onProgressChange(next);
  };

  const sectionPct = Math.round(((activeIndex + 1) / lesson.sections.length) * 100);

  return (
    <div className="guided-lesson">
      <div className="guided-topbar">
        <button className="secondary-button inline" onClick={onBack}>
          ← {language === "hu" ? "Tanulási útvonal" : "Learning path"}
        </button>

        <div className="guided-progress-meta">
          <span>{lesson.title[language]}</span>
          <strong>{activeIndex + 1} / {lesson.sections.length}</strong>
        </div>

        {onOpenLab && hasRelatedLab?.(section.id) && (
          <button className="secondary-button inline" onClick={() => onOpenLab(section.id)}>
            {language === "hu" ? "Kapcsolódó szimuláció →" : "Open related lab →"}
          </button>
        )}
      </div>

      <div className="guided-progress-track">
        <div style={{ width: sectionPct + "%" }} />
      </div>

      <div className="guided-layout">
        <aside className="learning-step-rail">
          <span className="eyebrow">{lesson.source}</span>
          <h2>{lesson.title[language]}</h2>
          <div className="learning-step-list">
            {lesson.sections.map((item, index) => {
              const itemProgress = getSectionProgress(progress, lesson.id, item.id);
              return (
                <button
                  key={item.id}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => goTo(index)}
                >
                  <span className={"step-state " + (
                    itemProgress.streak >= 3
                      ? "mastered"
                      : itemProgress.visits > 0
                        ? "learning"
                        : "new"
                  )}>
                    {itemProgress.streak >= 3 ? "✓" : String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.title[language]}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="guided-main">
          <article className="guided-concept-card">
            <div className="concept-heading">
              <div>
                <span className="eyebrow">
                  {language === "hu" ? "FOGALMI LÉPÉS" : "CONCEPT STEP"} • {activeIndex + 1}/{lesson.sections.length}
                </span>
                <h1>{section.title[language]}</h1>
              </div>
              <div className={"mastery-status " + (
                sectionProgress.streak >= 3
                  ? "mastered"
                  : sectionProgress.visits > 0
                    ? "learning"
                    : "new"
              )}>
                {language === "hu"
                  ? sectionProgress.streak >= 3
                    ? "Stabil"
                    : sectionProgress.visits > 0
                      ? "Tanulás alatt"
                      : "Új"
                  : sectionProgress.streak >= 3
                    ? "Mastered"
                    : sectionProgress.visits > 0
                      ? "Learning"
                      : "New"}
              </div>
            </div>

            <section className="think-first-card">
              <div className="learning-layer-header">
                <span className="layer-badge predict">THINK FIRST</span>
                <span>
                  {language === "hu"
                    ? "Ne olvasd el rögtön a választ."
                    : "Do not reveal the explanation immediately."}
                </span>
              </div>
              <h3>
                {pedagogy
                  ? pedagogy.prediction[language]
                  : language === "hu"
                    ? "Mielőtt felfeded: fogalmazd meg saját szavaiddal, mit vársz ettől a fogalomtól."
                    : "Before revealing: explain in your own words what you expect this concept to mean."}
              </h3>
              {pedagogy && (
                <div className="source-focus">
                  <strong>{language === "hu" ? "Forrásfókusz" : "Source focus"}</strong>
                  <span>{pedagogy.sourceFocus[language]}</span>
                </div>
              )}
              {!courseVisible && (
                <button className="primary-button" onClick={() => setCourseVisible(true)}>
                  {language === "hu" ? "Kurzusmagyarázat felfedése" : "Reveal course explanation"}
                </button>
              )}
            </section>

            {courseVisible && (
              <section className="learning-layer course-layer">
                <div className="learning-layer-header">
                  <span className="layer-badge course">COURSE</span>
                  <span>
                    {language === "hu"
                      ? "A tananyagból és a Theory Test forrásaiból származó mag."
                      : "Core material derived from the course and Theory Test sources."}
                  </span>
                </div>

                <p className="concept-body">{section.body[language]}</p>

                {section.formula && (
                  <>
                    <div className="formula-block guided-formula">
                      {section.formula[language]}
                    </div>
                    {section.formulaTerms && (
                      <div className="formula-reveal">
                        <button
                          className="secondary-button inline"
                          onClick={() => setSymbolsVisible((value) => !value)}
                        >
                          {symbolsVisible
                            ? language === "hu" ? "Jelölések elrejtése" : "Hide symbols"
                            : language === "hu" ? "Jelölések jelentésének felfedése" : "Reveal symbol meanings"}
                        </button>

                        {symbolsVisible && (
                          <div className="formula-term-grid guided-terms">
                            {section.formulaTerms.map((item) => (
                              <div className="formula-term-row" key={item.symbol}>
                                <code>{item.symbol}</code>
                                <span>{language === "hu" ? item.hu : item.en}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
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
                        {term.hu && language === "hu"
                          ? term.hu + " (" + term.term + ")"
                          : term.term}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )}


            {courseVisible && conceptChecks.length > 0 && (
              <ConceptCheck
                key={lesson.id + "::" + section.id}
                questions={conceptChecks}
                language={language}
              />
            )}

            {courseVisible && hasUnderstanding && (
              <section className={"learning-layer understanding-layer" + (understandingVisible ? " open" : "")}>
                <button
                  className="layer-toggle"
                  onClick={() => setUnderstandingVisible((value) => !value)}
                >
                  <span>
                    <span className="layer-badge understanding">UNDERSTANDING</span>
                    <strong>{language === "hu" ? "Miért működik és hogyan érdemes elképzelni?" : "Why does it work and how should you think about it?"}</strong>
                  </span>
                  <b>{understandingVisible ? "−" : "+"}</b>
                </button>

                {understandingVisible && (
                  <div className="learning-layer-content">
                    {section.why && (
                      <div className="callout concept-why">
                        <strong>{language === "hu" ? "Miért fontos?" : "Why does it matter?"}</strong>
                        <span>{section.why[language]}</span>
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
                        <strong>{language === "hu" ? "Kidolgozott példa" : "Worked example"}</strong>
                        <span>{section.workedExample[language]}</span>
                      </div>
                    )}
                    {section.connections && (
                      <div className="callout connections">
                        <strong>{language === "hu" ? "Kapcsolat más fogalmakkal" : "Connections"}</strong>
                        <span>{section.connections[language]}</span>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {courseVisible && hasDeepDive && (
              <section className={"learning-layer deep-dive-layer" + (deepDiveVisible ? " open" : "")}>
                <button
                  className="layer-toggle"
                  onClick={() => setDeepDiveVisible((value) => !value)}
                >
                  <span>
                    <span className="layer-badge deep">DEEP DIVE</span>
                    <strong>
                      {language === "hu"
                        ? "Szemléltető háttér — nem külön vizsgakövetelmény"
                        : "Illustrative background — not a separate exam requirement"}
                    </strong>
                  </span>
                  <b>{deepDiveVisible ? "−" : "+"}</b>
                </button>

                {deepDiveVisible && (
                  <div className="learning-layer-content">
                    <div className="callout real-world">
                      <strong>{language === "hu" ? "Alkalmazási példa" : "Application example"}</strong>
                      <span>{section.realWorld?.[language]}</span>
                    </div>
                  </div>
                )}
              </section>
            )}

            {courseVisible && (
              <section className="review-rating-card">
                <div>
                  <span className="eyebrow">SPACED REVIEW</span>
                  <h3>{language === "hu" ? "Mennyire ment emlékezetből?" : "How well could you recall it?"}</h3>
                  {nextReview && (
                    <p>
                      {language === "hu" ? "Következő ismétlés: " : "Next review: "}
                      <strong>{nextReview}</strong>
                    </p>
                  )}
                </div>
                <div className="rating-buttons">
                  <button className="rating-again" onClick={() => rate("again")}>
                    {language === "hu" ? "Újra" : "Again"}
                    <small>~20 min</small>
                  </button>
                  <button className="rating-hard" onClick={() => rate("hard")}>
                    {language === "hu" ? "Nehéz" : "Hard"}
                    <small>~12 h</small>
                  </button>
                  <button className="rating-good" onClick={() => rate("good")}>
                    {language === "hu" ? "Jó" : "Good"}
                    <small>{sectionProgress.streak > 0 ? "3–14 d" : "~1 d"}</small>
                  </button>
                </div>
                <small className="scheduler-note">
                  {language === "hu"
                    ? "Az intervallumok egyszerű, adaptív ismétlési ütemezést adnak; nem egyetlen „optimális” tudományos algoritmust állítanak."
                    : "Intervals provide a simple adaptive review schedule; they are not presented as a uniquely optimal scientific algorithm."}
                </small>
              </section>
            )}
          </article>

          {activeIndex === lesson.sections.length - 1 && (
            <ChapterSummaryPractice lesson={lesson} language={language} />
          )}

          <div className="guided-nav">
            <button
              className="secondary-button inline"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            >
              ← {language === "hu" ? "Előző" : "Previous"}
            </button>
            <span>{activeIndex + 1} / {lesson.sections.length}</span>
            <button
              className="primary-button"
              disabled={activeIndex === lesson.sections.length - 1}
              onClick={() => goTo(activeIndex + 1)}
            >
              {language === "hu" ? "Következő" : "Next"} →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
