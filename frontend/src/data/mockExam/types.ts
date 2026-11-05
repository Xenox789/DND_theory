import type { LocalizedText, Question } from "../../types";

export const examChapters = [
  "fundamentals",
  "linear",
  "logistic",
  "generalization",
  "mlp",
  "sgd",
  "backprop",
  "numpy"
] as const;

export type ExamChapter = (typeof examChapters)[number];

export const examChapterNames: Record<ExamChapter, LocalizedText> = {
  fundamentals: { hu: "ML alapfogalmak", en: "ML fundamentals" },
  linear: { hu: "Lineáris regresszió", en: "Linear regression" },
  logistic: { hu: "Logisztikus regresszió", en: "Logistic regression" },
  generalization: { hu: "Általánosítás és regularizáció", en: "Generalization" },
  mlp: { hu: "Neuronok és MLP", en: "Neurons and MLP" },
  sgd: { hu: "SGD és mini-batch", en: "SGD and mini-batches" },
  backprop: { hu: "Backpropagation", en: "Backpropagation" },
  numpy: { hu: "NumPy", en: "NumPy" }
};

type Fact = readonly [hu: string, en: string];

export type MockQuestion = Question & { chapter: ExamChapter };

type QuestionSeed = {
  id: string;
  chapter: ExamChapter;
  prompt: LocalizedText;
  trueFacts: Fact[];
  falseFacts: Fact[];
  explanation: LocalizedText;
};

/** A dedicated, source-reviewed pool: 12 distinct factual statements per question.
 * The candidate's 3-6 choices are sampled from here; never invent correctness at runtime.
 */
export function createMockQuestion(seed: QuestionSeed): MockQuestion {
  if (seed.trueFacts.length !== 6 || seed.falseFacts.length !== 6) {
    throw new Error("Each mock question must supply exactly six true and six false variants: " + seed.id);
  }
  return {
    id: seed.id,
    chapter: seed.chapter,
    topics: ["mock-exam", "mock-" + seed.chapter],
    prompt: seed.prompt,
    choices: [
      ...seed.trueFacts.map(([hu, en], i) => ({
        id: "t" + (i + 1),
        text: { hu, en }
      })),
      ...seed.falseFacts.map(([hu, en], i) => ({
        id: "f" + (i + 1),
        text: { hu, en }
      }))
    ],
    correctIds: seed.trueFacts.map((_, i) => "t" + (i + 1)),
    explanation: seed.explanation
  };
}
