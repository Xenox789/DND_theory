import type { Language, Lesson } from "../types";
import {
  getSectionProgress,
  isReviewDue,
  masteryLabel,
  type StudyProgress
} from "../study/progress";

type Props = {
  lessons: Lesson[];
  language: Language;
  progress: StudyProgress;
  onOpenLesson: (lessonId: string, sectionId?: string) => void;
};

export function LearningDashboard({
  lessons,
  language,
  progress,
  onOpenLesson
}: Props) {
  const allSections = lessons.flatMap((lesson) =>
    lesson.sections.map((section) => ({
      lesson,
      section,
      progress: getSectionProgress(progress, lesson.id, section.id)
    }))
  );

  const reviewed = allSections.filter((item) => item.progress.visits > 0).length;
  const mastered = allSections.filter((item) => item.progress.streak >= 3).length;
  const due = allSections.filter((item) => isReviewDue(item.progress));
  const total = allSections.length;
  const progressPercent = total === 0 ? 0 : Math.round((reviewed / total) * 100);

  return (
    <div className="learning-dashboard">
      <div className="hero-card learning-home-hero">
        <div>
          <span className="eyebrow">GUIDED LEARNING</span>
          <h1>{language === "hu" ? "Tanulási útvonal" : "Learning path"}</h1>
          <p>
            {language === "hu"
              ? "Ne csak olvasd az anyagot: gondolkodj előre, fedezd fel a magyarázatot, idézd fel emlékezetből, majd ütemezd vissza ismétlésre."
              : "Do more than read: predict first, reveal the explanation, retrieve from memory, then schedule the concept for review."}
          </p>
        </div>
        <div className="learning-progress-ring">
          <strong>{progressPercent}%</strong>
          <span>{language === "hu" ? "megnyitva" : "reviewed"}</span>
        </div>
      </div>

      <div className="learning-summary-grid">
        <div className="metric-card">
          <span>{language === "hu" ? "Tananyagrészek" : "Concept steps"}</span>
          <strong>{total}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Már tanult" : "Reviewed"}</span>
          <strong>{reviewed}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Stabil tudás" : "Mastered"}</span>
          <strong>{mastered}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Ismétlésre esedékes" : "Due for review"}</span>
          <strong>{due.length}</strong>
        </div>
      </div>

      {due.length > 0 && (
        <section className="review-queue">
          <div className="dashboard-section-title">
            <div>
              <span className="eyebrow">SPACED REVIEW</span>
              <h2>{language === "hu" ? "Most érdemes ismételni" : "Review due now"}</h2>
            </div>
            <span className="queue-count">{due.length}</span>
          </div>

          <div className="review-queue-list">
            {due.slice(0, 6).map(({ lesson, section }) => (
              <button
                key={lesson.id + section.id}
                onClick={() => onOpenLesson(lesson.id, section.id)}
              >
                <small>{lesson.title[language]}</small>
                <strong>{section.title[language]}</strong>
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="dashboard-section-title">
          <div>
            <span className="eyebrow">CHAPTERS</span>
            <h2>{language === "hu" ? "Fejezetek" : "Chapters"}</h2>
          </div>
        </div>

        <div className="chapter-card-grid">
          {lessons.map((lesson, index) => {
            const items = lesson.sections.map((section) =>
              getSectionProgress(progress, lesson.id, section.id)
            );
            const learned = items.filter((item) => item.visits > 0).length;
            const lessonMastered = items.filter((item) => item.streak >= 3).length;
            const lessonDue = items.filter((item) => isReviewDue(item)).length;
            const pct = Math.round((learned / Math.max(1, items.length)) * 100);

            return (
              <button
                className="chapter-card"
                key={lesson.id}
                onClick={() => onOpenLesson(lesson.id)}
              >
                <div className="chapter-card-top">
                  <span className="chapter-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className={"mastery-status " + (
                    lessonMastered === items.length && items.length > 0
                      ? "mastered"
                      : learned > 0
                        ? "learning"
                        : "new"
                  )}>
                    {language === "hu"
                      ? lessonMastered === items.length && items.length > 0
                        ? "Stabil"
                        : learned > 0
                          ? "Folyamatban"
                          : "Új"
                      : masteryLabel(items[0] ?? { visits: 0, streak: 0, lastReviewed: null, nextReview: null, rating: null })}
                  </span>
                </div>
                <h3>{lesson.title[language]}</h3>
                <p>{lesson.subtitle[language]}</p>
                <div className="chapter-progress">
                  <div style={{ width: pct + "%" }} />
                </div>
                <div className="chapter-meta">
                  <span>{learned}/{items.length} {language === "hu" ? "lépés" : "steps"}</span>
                  {lessonDue > 0 && (
                    <strong>{lessonDue} {language === "hu" ? "ismétlendő" : "due"}</strong>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
