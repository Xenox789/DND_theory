export type ReviewRating = "again" | "hard" | "good";

export type SectionProgress = {
  visits: number;
  streak: number;
  lastReviewed: string | null;
  nextReview: string | null;
  rating: ReviewRating | null;
};

export type StudyProgress = Record<string, SectionProgress>;

const STORAGE_KEY = "dnd-study-progress-v1";

const EMPTY: SectionProgress = {
  visits: 0,
  streak: 0,
  lastReviewed: null,
  nextReview: null,
  rating: null
};

export function sectionProgressKey(lessonId: string, sectionId: string) {
  return lessonId + "::" + sectionId;
}

export function loadStudyProgress(): StudyProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as StudyProgress : {};
  } catch {
    return {};
  }
}

export function saveStudyProgress(progress: StudyProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getSectionProgress(
  progress: StudyProgress,
  lessonId: string,
  sectionId: string
): SectionProgress {
  return progress[sectionProgressKey(lessonId, sectionId)] ?? EMPTY;
}

function nextIntervalMs(rating: ReviewRating, currentStreak: number) {
  if (rating === "again") return 20 * 60 * 1000;
  if (rating === "hard") return 12 * 60 * 60 * 1000;

  const intervals = [
    24 * 60 * 60 * 1000,
    3 * 24 * 60 * 60 * 1000,
    7 * 24 * 60 * 60 * 1000,
    14 * 24 * 60 * 60 * 1000
  ];
  return intervals[Math.min(currentStreak, intervals.length - 1)];
}

export function reviewSection(
  progress: StudyProgress,
  lessonId: string,
  sectionId: string,
  rating: ReviewRating
): StudyProgress {
  const key = sectionProgressKey(lessonId, sectionId);
  const current = progress[key] ?? EMPTY;
  const now = new Date();
  const nextStreak =
    rating === "again"
      ? 0
      : rating === "good"
        ? current.streak + 1
        : current.streak;

  const next = new Date(
    now.getTime() + nextIntervalMs(rating, current.streak)
  );

  return {
    ...progress,
    [key]: {
      visits: current.visits + 1,
      streak: nextStreak,
      lastReviewed: now.toISOString(),
      nextReview: next.toISOString(),
      rating
    }
  };
}

export function isReviewDue(item: SectionProgress, now = Date.now()) {
  if (!item.nextReview) return false;
  return new Date(item.nextReview).getTime() <= now;
}

export function masteryLabel(item: SectionProgress) {
  if (item.streak >= 3) return "mastered";
  if (item.visits > 0) return "learning";
  return "new";
}
