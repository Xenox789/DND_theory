import type { Choice } from "../../types";
import { lectureSourceExamples, type SourceExample } from "./sourceLectures";
import { numpySourceExamples } from "./sourceNumpy";
import { lectureAnswers, type SourceAnswer } from "./sourceExactLectures";
import { numpyAnswers } from "./sourceExactNumpy";
import { topicAnswers } from "./sourceExactTopics";
import type { MockQuestion } from "./types";

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

function contextFor(source: SourceExample): { hu: string; en: string } {
  const number = Number(source.id.slice(1));
  if (source.id.startsWith("M")) {
    if (number >= 12 && number <= 38 && number !== 34 && number !== 35 && number !== 36 && number !== 37 && number !== 38) {
      return {
        hu: "Példa: 200 beteg, 4 bemeneti jellemző (testsúly, életkor, magasság, nem), valamint koleszterinszint-címke; lineáris regresszió, x₀=1 biasoszlop.",
        en: "Example: 200 patients with 4 input features (weight, age, height, sex) and cholesterol targets; linear regression with intercept x₀=1."
      };
    }
    if (number >= 39 && number <= 55) return {
      hu: "Példa: 100 beteg, 2 laboreredmény mint bemenet és beteg/egészséges bináris címke; logisztikus regresszió, x₀=1 biasoszlop.",
      en: "Example: 100 patients, 2 blood-test input features and a binary illness label; logistic regression with intercept x₀=1."
    };
    if (number >= 60 && number <= 64) return {
      hu: "Példa: 20 bemenetű MLP, 10 rejtett neuron az első rétegben és 1 folytonos regressziós kimenet.",
      en: "Example: MLP with 20 inputs, 10 neurons in the first hidden layer and 1 continuous regression output."
    };
    if (number >= 79) return {
      hu: number===79 ? "Számítási gráf: c=b², a grad_c=∂J/∂c gradiens adott." : "Számítási gráf: c=a+b, a grad_c=∂J/∂c gradiens adott.",
      en: number===79 ? "Computational graph: c=b², given grad_c=∂J/∂c." : "Computational graph: c=a+b, given grad_c=∂J/∂c."
    };
    return { hu: "", en: "" };
  }
  if (source.id.startsWith("N")) {
    if (number <= 8) return {
      hu: "my_array egy NumPy ndarray objektum.",
      en: "my_array is a NumPy ndarray."
    };
    if (number <= 28) return {
      hu: number>=16 && number<=19
        ? "my_array1.shape=(32,5), my_array2.shape=(32,); mindkettő numerikus NumPy-tömb."
        : "my_array.shape=(32,5), ahol my_array numerikus NumPy-tömb.",
      en: number>=16 && number<=19
        ? "my_array1.shape=(32,5), my_array2.shape=(32,); both are numeric NumPy arrays."
        : "my_array.shape=(32,5), a numeric NumPy array."
    };
    if (number <= 33 || (number>=41 && number<=43)) return {
      hu: "a=np.arange(4).reshape(2,-1), tehát a=[[0,1],[2,3]].",
      en: "a=np.arange(4).reshape(2,-1), so a=[[0,1],[2,3]]."
    };
    if (number <= 40) return {
      hu: "a=np.arange(4); a második tömbbe 99-et írunk a leírt művelet után.",
      en: "a=np.arange(4); after the stated operation, 99 is assigned through the derived array."
    };
    return {
      hu: "a=np.array([3,1,2]).",
      en: "a=np.array([3,1,2])."
    };
  }
  return { hu: "", en: "" };
}

function asMockQuestion(source: SourceExample): MockQuestion {
  const answer = sourceAnswers[source.id];
  if (!answer) throw new Error("Missing source-specific answer key for " + source.id);
  if (!answer.trueChoices.length || answer.falseChoices.length < 2) {
    throw new Error("Incomplete source-specific statements for " + source.id);
  }
  const contextual = contextFor(source);
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
      hu: [contextual.hu, source.focusHu].filter(Boolean).join("\n"),
      en: [contextual.en, source.focusEn].filter(Boolean).join("\n")
    },
    choices: [
      ...trueVariants.map((v,i)=>option(v,"t"+(i+1))),
      ...falseVariants.map((v,i)=>option(v,"f"+(i+1)))
    ],
    correctIds: trueVariants.map((_,i)=>"t"+(i+1)),
    explanation: { hu: answer.explanation[0], en: answer.explanation[1] }
  };
}

export const sourceMappedMockQuestions: MockQuestion[] =
  [...sourceExamples, ...sourceTopicExamples].map(asMockQuestion);
