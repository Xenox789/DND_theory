import type { Lesson, Question } from "../types";
import { mlFundamentalsLesson } from "./mlFundamentals";
import { linearRegressionLesson, linearRegressionQuestions } from "./linearRegression";
import { logisticRegressionLesson, logisticRegressionQuestions } from "./logisticRegression";
import { generalizationLesson } from "./generalizationLesson";
import { generalizationQuestions } from "./generalizationQuestions";
import { mlpLesson, mlpQuestions } from "./mlp";
import { sgdLesson, sgdQuestions } from "./sgd";
import { backpropLesson, backpropQuestions } from "./backprop";
import { numpyLesson } from "./numpyLesson";
import { numpyCoreQuestions } from "./numpyQuestionsCore";
import { numpyExampleQuestions } from "./numpyQuestionsExamples";

export const lessons: Lesson[] = [
  mlFundamentalsLesson,
  linearRegressionLesson,
  logisticRegressionLesson,
  generalizationLesson,
  mlpLesson,
  sgdLesson,
  backpropLesson,
  numpyLesson
];

export const questionBank: Question[] = [
  {
    id: "q1",
    topics: ["supervised-learning", "data"],
    prompt: {
      hu: "Mely állítások igazak egy supervised learning tanítóminta (tanítás sample)-re?",
      en: "Which statements are true about a supervised learning training sample?"
    },
    choices: [
      { id: "a", text: { hu: "bemenet (input)–címke (label) párokból állhat.", en: "It can consist of input–label pairs." } },
      { id: "b", text: { hu: "Az x jelöli az inputot.", en: "x denotes the input." } },
      { id: "c", text: { hu: "Az y jelöli a modellparaméterek (model parameters) értékeit.", en: "y denotes the model parameters." } },
      { id: "d", text: { hu: "Az y jelölheti a true labelt.", en: "y can denote the true label." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "Supervised learningben a tanítóminta (tanítás sample) (x, y) párokból áll. x az bemenet (input), y a valódi címke (valódi címke true label). A modellparaméterek (model parameters) külön, például θ-val vannak jelölve.",
      en: "In supervised learning the training sample consists of (x, y) pairs. x is the input and y is the true label. Model parameters are separate, for example θ."
    }
  },
  {
    id: "q2",
    topics: ["hypothesis-function"],
    prompt: {
      hu: "Mely állítások igazak a hipotézisfüggvény (hypothesis függvény) hθ(x) függvényre?",
      en: "Which statements are true about the hypothesis function hθ(x)?"
    },
    choices: [
      { id: "a", text: { hu: "Inputból predictiont állít elő.", en: "It produces a prediction from an input." } },
      { id: "b", text: { hu: "A θ a modell paraméterek (parameters) értékeit jelölheti.", en: "θ can denote model parameters." } },
      { id: "c", text: { hu: "A hθ(x) értéke ŷ lehet.", en: "The value of hθ(x) can be ŷ." } },
      { id: "d", text: { hu: "Tanulás közben X-et próbáljuk minimalizálni.", en: "During learning we try to minimize X." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A hipotézisfüggvény (hypothesis függvény) az bemenet (input) és a paraméterek (parameters) alapján predictiont ad. Az optimization célja nem X minimalizálása.",
      en: "The hypothesis function produces a prediction using the input and parameters. Optimization does not minimize X."
    }
  },
  {
    id: "q3",
    topics: ["loss"],
    prompt: {
      hu: "Mely állítások igazak a veszteségfüggvény (loss függvény) szerepére?",
      en: "Which statements are true about the role of the loss function?"
    },
    choices: [
      { id: "a", text: { hu: "A modell hibáját/teljesítményét számszerűsíti.", en: "It quantifies model error/performance." } },
      { id: "b", text: { hu: "A tanulás során általában minimalizálni szeretnénk.", en: "During learning we usually want to minimize it." } },
      { id: "c", text: { hu: "A teljes célfüggvény értéke tipikusan skalár.", en: "The overall objective value is typically a scalar." } },
      { id: "d", text: { hu: "Mindig ugyanazt a veszteség (loss) függvényt használjuk minden ML tasknál.", en: "We always use the same loss function for every ML task." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A veszteség (loss) az optimization célértéke. A megfelelő veszteség (loss) a feladattól függ; például regresszió (regression) és osztályozás (classification) esetén eltérő veszteség (loss) lehet indokolt.",
      en: "Loss is the optimization objective. The appropriate loss depends on the task; regression and classification may require different losses."
    }
  },
  {
    id: "q4",
    topics: ["ml-types"],
    prompt: {
      hu: "Melyek szerepelnek a tananyagban a Machine Learning három fő csoportjaként?",
      en: "Which are listed in the course material as the three main groups of Machine Learning?"
    },
    choices: [
      { id: "a", text: { hu: "Supervised learning", en: "Supervised learning" } },
      { id: "b", text: { hu: "Unsupervised learning", en: "Unsupervised learning" } },
      { id: "c", text: { hu: "Reinforcement learning", en: "Reinforcement learning" } },
      { id: "d", text: { hu: "Linear programming", en: "Linear programming" } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A lecture három fő csoportot nevez meg: supervised, unsupervised és reinforcement learning.",
      en: "The lecture names supervised, unsupervised, and reinforcement learning as the three main groups."
    }
  },
  {
    id: "q5",
    topics: ["regression", "classification"],
    prompt: {
      hu: "Egy beteg cholesterol level értékét szeretnénk becsülni súly (weight), age, height és sex alapján. Mely állítások igazak?",
      en: "We want to predict a patient's cholesterol level from weight, age, height, and sex. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "Ez regressziós feladat (regression task).", en: "This is a regression task." } },
      { id: "b", text: { hu: "A cholesterol level a címke (label).", en: "The cholesterol level is the label." } },
      { id: "c", text: { hu: "Az age a modellparaméter (model parameter) θ egyik eleme.", en: "Age is one of the model parameters θ." } },
      { id: "d", text: { hu: "A personal attributes a jellemző (feature)/bemenet (input) adatok részei.", en: "The personal attributes are part of the feature/input data." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A cholesterol level folytonos célváltozó, ezért regresszió (regression). A beteg tulajdonságai X/x jellemző (feature) adatok, nem a megtanulandó θ paraméterek (parameters).",
      en: "Cholesterol level is a continuous target, so this is regression. Patient attributes are X/x features, not learnable θ parameters."
    }
  },
  {
    id: "q6",
    topics: ["linear-regression"],
    prompt: {
      hu: "Melyik állítás igaz a egyenesáris regresszió (egyenesar regression) geometriai értelmezésére?",
      en: "Which statement is true about the geometric interpretation of linear regression?"
    },
    choices: [
      { id: "a", text: { hu: "Egy bemeneti változó (input variable) esetén a hypothesis egy egyenes lehet a 2D x–y síkon.", en: "With one input variable, the hypothesis can be a line in the 2D x–y plane." } },
      { id: "b", text: { hu: "Két bemeneti változó (input variable) esetén a egyenesar hypothesis egy sík lehet 3D-ben.", en: "With two input variables, the linear hypothesis can be a plane in 3D." } },
      { id: "c", text: { hu: "A egyenesáris regresszió (egyenesar regression) csak classificationre használható.", en: "Linear regression can only be used for classification." } },
      { id: "d", text: { hu: "A slope és eltolás (bias) a modell paraméterek (parameters) részei lehetnek.", en: "Slope and bias can be model parameters." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "Linear regresszió (regression) folytonos érték becslésére szolgál. Egy inputnál egyenes, két inputnál sík a geometriai egyenesar hypothesis.",
      en: "Linear regression predicts continuous values. Geometrically, with one input the linear hypothesis is a line; with two inputs it is a plane."
    }
  },
  {
    id: "q7",
    topics: ["optimization"],
    prompt: {
      hu: "Mit szeretnénk minimalizálni modelltanítás (model tanítás) során?",
      en: "What do we want to minimize during model training?"
    },
    choices: [
      { id: "a", text: { hu: "Az bemenet (input) mátrix X méretét.", en: "The size of the input matrix X." } },
      { id: "b", text: { hu: "A veszteségfüggvény (loss függvény) J(θ) értékét.", en: "The value of the loss function J(θ)." } },
      { id: "c", text: { hu: "A tanítási példák (tanítás példas) számát.", en: "The number of training examples." } },
      { id: "d", text: { hu: "Olyan θ értékeket keresünk, amelyek kis veszteség (loss)-t eredményeznek.", en: "We search for θ values that result in low loss." } }
    ],
    correctIds: ["b", "d"],
    explanation: {
      hu: "A paraméterek (parameters) értékeit azért változtatjuk, hogy J(θ) csökkenjen. Nem az bemenet (input) adatokat vagy a adathalmaz (dataset) méretét minimalizáljuk.",
      en: "We change parameter values so that J(θ) decreases. We do not minimize the input data or dataset size."
    }
  },
  {
    id: "q8",
    topics: ["prediction"],
    prompt: {
      hu: "Mely párosítások helyesek?",
      en: "Which pairings are correct?"
    },
    choices: [
      { id: "a", text: { hu: "y → valódi címke (valódi címke true label)", en: "y → true label" } },
      { id: "b", text: { hu: "ŷ → becslés (prediction)", en: "ŷ → prediction" } },
      { id: "c", text: { hu: "θ → modellparaméterek (model parameters)", en: "θ → model parameters" } },
      { id: "d", text: { hu: "x → veszteségfüggvény (loss függvény)", en: "x → loss function" } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A szokásos jelölésben x az bemenet (input), y a valódi címke (valódi címke true label), ŷ a becslés (prediction), θ pedig a modellparaméterek (model parameters).",
      en: "In the usual notation x is the input, y the true label, ŷ the prediction, and θ the model parameters."
    }
  },
  ...linearRegressionQuestions,
  ...logisticRegressionQuestions,
  ...generalizationQuestions,
  ...mlpQuestions,
  ...sgdQuestions,
  ...backpropQuestions,
  ...numpyCoreQuestions,
  ...numpyExampleQuestions
];
