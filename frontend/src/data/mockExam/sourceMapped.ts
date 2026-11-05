import type { Question, Choice } from "../../types";
import { questionBank } from "../course";
import { lectureSourceExamples, type SourceExample } from "./sourceLectures";
import { numpySourceExamples } from "./sourceNumpy";
import {
  fundamentalsMocks,
  linearMocks,
  logisticMocks,
  generalizationMocks,
  mlpMocks,
  sgdMocks,
  backpropMocks,
  numpyMocks
} from "./topicPools";
import type { MockQuestion } from "./types";

export const sourceExamples: SourceExample[] = [...lectureSourceExamples, ...numpySourceExamples];

/** This manifest is a direct trace from the 129 question-marked paragraphs
 * in the user-supplied example file to reviewed question content.
 * Source "M" = Lectures 1–6; "N" = NumPy.
 */
const anchors = new Map(questionBank.map(q => [q.id, q]));
const topicPools = new Map([
  ...fundamentalsMocks,
  ...linearMocks,
  ...logisticMocks,
  ...generalizationMocks,
  ...mlpMocks,
  ...sgdMocks,
  ...backpropMocks,
  ...numpyMocks
].map(q => [q.id, q]));

function sixUnique(
  anchorChoices: Choice[],
  poolChoices: Choice[],
  sourceId: string
): Choice[] {
  const result: Choice[] = [];
  const seenHu = new Set<string>();
  const seenEn = new Set<string>();
  for (const choice of [...anchorChoices, ...poolChoices]) {
    const hu = choice.text.hu.toLocaleLowerCase().trim().replace(/\s+/g, " ");
    const en = choice.text.en.toLocaleLowerCase().trim().replace(/\s+/g, " ");
    if (!hu || !en || seenHu.has(hu) || seenEn.has(en)) continue;
    seenHu.add(hu);
    seenEn.add(en);
    result.push(choice);
    if (result.length === 6) break;
  }
  if (result.length !== 6) throw new Error("Missing reviewed answer variants for " + sourceId);
  return result;
}

function asMockQuestion(source: SourceExample): MockQuestion {
  const anchor = anchors.get(source.anchorId);
  const pool = topicPools.get(source.variationPoolId);
  if (!anchor || !pool) {
    throw new Error("Unresolved Theory Test example source: " + source.id +
      " → " + source.anchorId + ", " + source.variationPoolId);
  }

  const answerKey = new Set(anchor.correctIds);
  const poolKey = new Set(pool.correctIds);
  const trueOptions = sixUnique(
    anchor.choices.filter(choice => answerKey.has(choice.id)),
    pool.choices.filter(choice => poolKey.has(choice.id)),
    source.id
  );
  const falseOptions = sixUnique(
    anchor.choices.filter(choice => !answerKey.has(choice.id)),
    pool.choices.filter(choice => !poolKey.has(choice.id)),
    source.id
  );

  const choices: Choice[] = [
    ...trueOptions.map((choice, i) => ({
      id: "t" + (i + 1),
      text: choice.text
    })),
    ...falseOptions.map((choice, i) => ({
      id: "f" + (i + 1),
      text: choice.text
    }))
  ];
  return {
    id: "source-" + source.id,
    chapter: source.chapter,
    topics: [
      "mock-exam", "mock-" + source.chapter,
      "source-" + source.id,
      "source-anchor-" + source.anchorId,
      "source-paragraph-" + source.documentParagraph
    ],
    prompt: {
      hu: anchor.prompt.hu + "\nA példadokumentum kiemelt alkérdése: " + source.focusHu + ".",
      en: anchor.prompt.en + "\nExample document focus: " + source.focusEn + "."
    },
    choices,
    correctIds: trueOptions.map((_, i) => "t" + (i + 1)),
    explanation: anchor.explanation
  };
}

export const sourceMappedMockQuestions: MockQuestion[] = sourceExamples.map(asMockQuestion);
