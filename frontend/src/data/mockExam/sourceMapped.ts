import type { Choice } from "../../types";
import { lectureSourceExamples, type SourceExample } from "./sourceLectures";
import { numpySourceExamples } from "./sourceNumpy";
import { lectureAnswers, type SourceAnswer } from "./sourceExactLectures";
import { numpyAnswers } from "./sourceExactNumpy";
import { topicAnswers } from "./sourceExactTopics";
import type { MockQuestion } from "./types";
import { originalDocumentContext } from "./sourceContext";
import { verbatimSourceEnglish } from "./verbatimSource";

/** Explicit subquestions and four additional exercise categories mentioned in
 * the original seven-page Theory Test 1 example file.
 */
export const sourceExamples: SourceExample[] = [...lectureSourceExamples, ...numpySourceExamples];
export const sourceTopicExamples: SourceExample[] = [
  {
    id: "T001", documentParagraph: 78, chapter: "logistic",
    anchorId: "log-q8", variationPoolId: "mock-log-3",
    focusHu: "Hasonló kérdések más veszteségfüggvényekkel, például a BCE-vel",
    focusEn: "Analogous questions involving other losses, such as BCE"
  },
  {
    id: "T002", documentParagraph: 86, chapter: "mlp",
    anchorId: "mlp-q13", variationPoolId: "mock-mlp-2",
    focusHu: "MLP-kimenet és veszteség bináris osztályozási feladatban",
    focusEn: "MLP output and loss for binary classification"
  },
  {
    id: "T003", documentParagraph: 87, chapter: "mlp",
    anchorId: "mlp-q14", variationPoolId: "mock-mlp-3",
    focusHu: "MLP-kimenet és veszteség többosztályos osztályozásban",
    focusEn: "MLP output and loss for multiclass classification"
  },
  {
    id: "T004", documentParagraph: 88, chapter: "mlp",
    anchorId: "mlp-q10", variationPoolId: "mock-mlp-2",
    focusHu: "Aktivációfüggvények felismerése és kimeneti tartományuk",
    focusEn: "Recognizing activation functions and their output ranges"
  }
];

const sourceAnswers: Record<string, SourceAnswer> = {
  ...lectureAnswers, ...numpyAnswers, ...topicAnswers
};

function asMockQuestion(source: SourceExample): MockQuestion {
  const answer = sourceAnswers[source.id];
  if (!answer) throw new Error("Missing source-specific answer key for " + source.id);
  if (!answer.trueChoices.length || answer.falseChoices.length < 2) {
    throw new Error("Incomplete source-specific statements for " + source.id);
  }
  const contextual = originalDocumentContext(source.id);
  const exactEnglish = verbatimSourceEnglish[source.id];
  if (source.id.startsWith("M") || source.id.startsWith("N")) {
    if (!exactEnglish) throw new Error("Missing verbatim original question: " + source.id);
  }
  const option = ([hu,en]: readonly [string,string], id: string): Choice => ({
    id, text: { hu, en }
  });
  // Keep each source question to a manageable 4–6 mutually relevant choices.
  // Supplementary lectures are deliberately separate from the source-only pool.
  const trueVariants = answer.trueChoices.slice(0, 3);
  const falseVariants = answer.falseChoices.slice(0, 6 - trueVariants.length);
  if (trueVariants.length < 1 || falseVariants.length < 2) {
    throw new Error("Incomplete source-specific answer set: " + source.id);
  }
  return {
    id: "source-" + source.id,
    chapter: source.chapter,
    topics: ["mock-exam", "mock-" + source.chapter, "source-" + source.id,
      "source-paragraph-" + source.documentParagraph],
    prompt: {
      hu: [contextual.hu, source.focusHu, exactEnglish
        ? "Eredeti kérdés (EN): " + exactEnglish : ""].filter(Boolean).join("\n"),
      en: [contextual.en, exactEnglish ?? source.focusEn].filter(Boolean).join("\n")
    },
    choices: [
      ...trueVariants.map((v,i)=>option(v,"t"+(i+1))),
      ...falseVariants.map((v,i)=>option(v,"f"+(i+1)))
    ],
    correctIds: trueVariants.map((_,i)=>"t"+(i+1)),
    explanation: { hu: answer.explanation[0], en: answer.explanation[1] }
  };
}

export const sourceMappedMockQuestions: MockQuestion[] = sourceExamples.map(asMockQuestion);
export const supplementaryTopicQuestions: MockQuestion[] = sourceTopicExamples.map(asMockQuestion);
