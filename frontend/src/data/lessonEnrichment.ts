import type { Lesson, LessonSection, LocalizedText } from "../types";
import { fundamentalsExtras } from "./enrichment/fundamentals";
import { linearExtras } from "./enrichment/linear";
import { logisticExtras } from "./enrichment/logistic";
import { generalizationExtras } from "./enrichment/generalization";
import { mlpExtras } from "./enrichment/mlp";
import { sgdExtras } from "./enrichment/sgd";
import { backpropExtras } from "./enrichment/backprop";
import { numpyExtras } from "./enrichment/numpy";

type Paired = [string, string];

/**
 * Pedagogical supplements are kept separately from the lecture-derived core.
 * The same sections and IDs remain stable, preserving saved progress and labs.
 */
export type LessonContentSupplement = {
  ex?: Paired;
  intuition?: Paired;
  connections?: Paired;
};

const perLesson: Record<string, Record<string, LessonContentSupplement>> = {
  "ml-fundamentals": fundamentalsExtras,
  "linear-regression-optimization": linearExtras,
  "logistic-regression": logisticExtras,
  "generalization-overfitting": generalizationExtras,
  "artificial-neuron-mlp": mlpExtras,
  "sgd-minibatches": sgdExtras,
  "backprop-computational-graphs": backpropExtras,
  "numpy-theory": numpyExtras
};

function mergeText(original: LocalizedText | undefined, extra: Paired | undefined): LocalizedText | undefined {
  if (!extra) return original;
  if (!original) return { hu: extra[0], en: extra[1] };
  return {
    hu: original.hu + "\n\n" + extra[0],
    en: original.en + "\n\n" + extra[1]
  };
}

export function enrichLesson(lesson: Lesson): Lesson {
  const enrichments = perLesson[lesson.id];
  if (!enrichments) return lesson;
  return {
    ...lesson,
    sections: lesson.sections.map((section): LessonSection => {
      const extra = enrichments[section.id];
      if (!extra) return section;
      return {
        ...section,
        workedExample: mergeText(section.workedExample, extra.ex),
        intuition: mergeText(section.intuition, extra.intuition),
        connections: mergeText(section.connections, extra.connections)
      };
    })
  };
}
