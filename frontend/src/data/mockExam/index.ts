import type { Question } from "../../types";
import { backpropMocks } from "./backprop";
import { fundamentalsMocks } from "./fundamentals";
import { generalizationMocks } from "./generalization";
import { linearMocks } from "./linear";
import { logisticMocks } from "./logistic";
import { mlpMocks } from "./mlp";
import { numpyMocks } from "./numpy";
import { sgdMocks } from "./sgd";
import { examChapters, type ExamChapter, type MockQuestion } from "./types";
import { sourceExamples, sourceMappedMockQuestions } from "./sourceMapped";

export { examChapterNames, examChapters } from "./types";
export type { ExamChapter } from "./types";
export { sourceExamples };

export const mockExamQuestionBank: MockQuestion[] = [
  // Every explicit example subquestion from the supplied Theory Test 1 document:
  ...sourceMappedMockQuestions,
  ...fundamentalsMocks,
  ...linearMocks,
  ...logisticMocks,
  ...generalizationMocks,
  ...mlpMocks,
  ...sgdMocks,
  ...backpropMocks,
  ...numpyMocks
];

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Every short exam covers all eight chapters. For 15 questions, seven
 * chapters get two questions and one gets one. For 20, four get three,
 * and the remaining four get two questions. New tests reshuffle both
 * prompts and independently validated statement choices.
 */
export function generateMockExam(
  count: 15 | 20,
  random: () => number = Math.random
): Question[] {
  // A source subquestion and its siblings may point to the same base question.
  // A single exam should not show the same base stem multiple times.
  const byChapter = new Map<ExamChapter, MockQuestion[]>(
    examChapters.map((chapter) => {
      const usedAnchors = new Set<string>();
      const candidates = shuffle(mockExamQuestionBank.filter((q) => q.chapter === chapter), random)
        .filter((question) => {
          const anchor = question.topics.find(t => t.startsWith("source-anchor-")) ?? question.id;
          if (usedAnchors.has(anchor)) return false;
          usedAnchors.add(anchor);
          return true;
        });
      return [chapter, candidates];
    })
  );

  if (mockExamQuestionBank.length < count || examChapters.some((c) => (byChapter.get(c)?.length ?? 0) < 3)) {
    throw new Error("The mock-exam question pool is incomplete.");
  }

  const chosen: MockQuestion[] = [];
  const chapters = shuffle(examChapters, random);

  // Spread minimum coverage across the entire syllabus, then rotate extras.
  for (const chapter of chapters) chosen.push(byChapter.get(chapter)![0]);
  const extras = count - examChapters.length;
  for (let i = 0; i < extras; i++) {
    const chapter = chapters[i % chapters.length];
    const index = 1 + Math.floor(i / chapters.length);
    chosen.push(byChapter.get(chapter)![index]);
  }

  return shuffle(chosen, random).map((question): Question => {
    const trueOptions = question.choices.filter((choice) => question.correctIds.includes(choice.id));
    const falseOptions = question.choices.filter((choice) => !question.correctIds.includes(choice.id));

    const displayedCount = 3 + Math.floor(random() * 4); // 3–6
    const maxTrue = Math.min(3, displayedCount - 1);
    const nTrue = 1 + Math.floor(random() * maxTrue);
    const choices = shuffle([
      ...shuffle(trueOptions, random).slice(0, nTrue),
      ...shuffle(falseOptions, random).slice(0, displayedCount - nTrue)
    ], random);

    const present = new Set(choices.map((choice) => choice.id));
    return {
      id: question.id,
      topics: question.topics,
      prompt: question.prompt,
      choices,
      correctIds: question.correctIds.filter((id) => present.has(id)),
      explanation: question.explanation
    };
  });
}
