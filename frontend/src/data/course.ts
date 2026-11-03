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
import { officialTheoryQuestions } from "./officialTheoryQuestions";

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
  ...officialTheoryQuestions,
  {
    id: "q1",
    topics: ["supervised-learning", "data"],
    prompt: {
      hu: "Mely állítások igazak a felügyelt tanulás (supervised learning) tanítómintájára (training sample)?",
      en: "Which statements are true about a supervised learning training sample?"
    },
    choices: [
      { id: "a", text: { hu: "bemenet (input)–címke (label) párokból állhat.", en: "It can consist of input–label pairs." } },
      { id: "b", text: { hu: "Az x jelöli a bemenetet.", en: "x denotes the input." } },
      { id: "c", text: { hu: "Az y jelöli a modellparaméterek értékeit.", en: "y denotes the model parameters." } },
      { id: "d", text: { hu: "Az y jelölheti a valódi címkét.", en: "y can denote the true label." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "Felügyelt tanulásban a tanítóminta (training sample) (x,y) párokból áll: x a bemenet (input), y a valódi címke (label). A modellparamétereket ettől külön, például θ-val jelöljük.",
      en: "In supervised learning the training sample consists of (x, y) pairs. x is the input and y is the true label. Model parameters are separate, for example θ."
    }
  },
  {
    id: "q2",
    topics: ["hypothesis-function"],
    prompt: {
      hu: "Mely állítások igazak a hθ(x) hipotézisfüggvényre (hypothesis function)?",
      en: "Which statements are true about the hypothesis function hθ(x)?"
    },
    choices: [
      { id: "a", text: { hu: "Bemenetből becslést állít elő.", en: "It produces a prediction from an input." } },
      { id: "b", text: { hu: "A θ a modell paraméterei (parameters) értékeit jelölheti.", en: "θ can denote model parameters." } },
      { id: "c", text: { hu: "A hθ(x) értéke ŷ lehet.", en: "The value of hθ(x) can be ŷ." } },
      { id: "d", text: { hu: "Tanulás közben X-et próbáljuk minimalizálni.", en: "During learning we try to minimize X." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A hipotézisfüggvény a bemenet és a modellparaméterek alapján becslést készít. Tanításkor nem X-et, hanem a veszteségfüggvény értékét minimalizáljuk a paraméterek módosításával.",
      en: "The hypothesis function produces a prediction using the input and parameters. Optimization does not minimize X."
    }
  },
  {
    id: "q3",
    topics: ["loss"],
    prompt: {
      hu: "Mely állítások igazak a veszteségfüggvény (loss function) szerepére?",
      en: "Which statements are true about the role of the loss function?"
    },
    choices: [
      { id: "a", text: { hu: "A modell hibáját/teljesítményét számszerűsíti.", en: "It quantifies model error/performance." } },
      { id: "b", text: { hu: "A tanulás során általában minimalizálni szeretnénk.", en: "During learning we usually want to minimize it." } },
      { id: "c", text: { hu: "A teljes célfüggvény (objective) értéke tipikusan skalár (scalar).", en: "The overall objective value is typically a scalar." } },
      { id: "d", text: { hu: "Minden gépi tanulási feladathoz ugyanazt a veszteségfüggvényt (loss function) használjuk.", en: "We always use the same loss function for every ML task." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A veszteség (loss) az optimalizálás célértéke. A megfelelő veszteségfüggvény a feladattól függ; regressziónál és osztályozásnál például eltérő választás lehet indokolt.",
      en: "Loss is the optimization objective. The appropriate loss depends on the task; regression and classification may require different losses."
    }
  },
  {
    id: "q4",
    topics: ["ml-types"],
    prompt: {
      hu: "Melyek szerepelnek a tananyagban a gépi tanulás (Machine Learning) három fő csoportjaként?",
      en: "Which are listed in the course material as the three main groups of Machine Learning?"
    },
    choices: [
      { id: "a", text: { hu: "felügyelt tanulás (supervised learning)", en: "Supervised learning" } },
      { id: "b", text: { hu: "felügyelet nélküli tanulás (unsupervised learning)", en: "Unsupervised learning" } },
      { id: "c", text: { hu: "megerősítéses tanulás (reinforcement learning)", en: "Reinforcement learning" } },
      { id: "d", text: { hu: "lineáris programming", en: "Linear programming" } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Az előadás három fő csoportot nevez meg: felügyelt tanulás (supervised learning), felügyelet nélküli tanulás (unsupervised learning) és megerősítéses tanulás (reinforcement learning).",
      en: "The lecture names supervised, unsupervised, and reinforcement learning as the three main groups."
    }
  },
  {
    id: "q5",
    topics: ["regression", "classification"],
    prompt: {
      hu: "Egy beteg koleszterinszintjét szeretnénk megbecsülni testsúly, életkor, magasság és nem alapján. Mely állítások igazak?",
      en: "We want to predict a patient's cholesterol level from weight, age, height, and sex. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "Ez regresszió (regression) feladat.", en: "This is a regression task." } },
      { id: "b", text: { hu: "A koleszterinszint (cholesterol level) a címke (label).", en: "The cholesterol level is the label." } },
      { id: "c", text: { hu: "Az életkor (age) a modellparaméter θ egyik eleme.", en: "Age is one of the model parameters θ." } },
      { id: "d", text: { hu: "A személyes jellemzők (personal attributes) a jellemző (feature)/bemenet (input) adatok részei.", en: "The personal attributes are part of the feature/input data." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A koleszterinszint folytonos célváltozó, ezért regressziós feladatról van szó. A beteg tulajdonságai az X/x bemeneti jellemzői (features), nem a megtanulandó θ paraméterek.",
      en: "Cholesterol level is a continuous target, so this is regression. Patient attributes are X/x features, not learnable θ parameters."
    }
  },
  {
    id: "q6",
    topics: ["linear-regression"],
    prompt: {
      hu: "Mely állítások igazak a lineáris regresszió (linear regression) geometriai értelmezésére?",
      en: "Which statement is true about the geometric interpretation of linear regression?"
    },
    choices: [
      { id: "a", text: { hu: "Egy bemeneti változó (input variable) esetén a hipotézis (hypothesis) egy egyenes lehet a 2D x–y síkon.", en: "With one input variable, the hypothesis can be a line in the 2D x–y plane." } },
      { id: "b", text: { hu: "Két bemeneti változó (input variable) esetén a lineáris hipotézis (hypothesis) egy sík lehet 3D-ben.", en: "With two input variables, the linear hypothesis can be a plane in 3D." } },
      { id: "c", text: { hu: "A lineáris regresszió (linear regression) csak osztályozásra használható.", en: "Linear regression can only be used for classification." } },
      { id: "d", text: { hu: "A slope és eltolás (bias) a modell paraméterei (parameters) részei lehetnek.", en: "Slope and bias can be model parameters." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A lineáris regresszió folytonos érték becslésére szolgál. Egy bemeneti változónál a hipotézis egyenes, két bemeneti változónál sík.",
      en: "Linear regression predicts continuous values. Geometrically, with one input the linear hypothesis is a line; with two inputs it is a plane."
    }
  },
  {
    id: "q7",
    topics: ["optimization"],
    prompt: {
      hu: "Mit szeretnénk minimalizálni modelltanítás során?",
      en: "What do we want to minimize during model training?"
    },
    choices: [
      { id: "a", text: { hu: "A bemeneti mátrix X méretét.", en: "The size of the input matrix X." } },
      { id: "b", text: { hu: "A veszteségfüggvény (loss function) J(θ) értékét.", en: "The value of the loss function J(θ)." } },
      { id: "c", text: { hu: "A tanítási példák (training examples) számát.", en: "The number of training examples." } },
      { id: "d", text: { hu: "Olyan θ értékeket keresünk, amelyek kis veszteséget (loss) eredményeznek.", en: "We search for θ values that result in low loss." } }
    ],
    correctIds: ["b", "d"],
    explanation: {
      hu: "A paramétereket azért változtatjuk, hogy J(θ) csökkenjen. Nem a bemeneti adatokat vagy az adathalmaz méretét minimalizáljuk.",
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
      { id: "a", text: { hu: "y → valódi címke (true label)", en: "y → true label" } },
      { id: "b", text: { hu: "ŷ → becslés (prediction)", en: "ŷ → prediction" } },
      { id: "c", text: { hu: "θ → modellparaméterek", en: "θ → model parameters" } },
      { id: "d", text: { hu: "x → veszteségfüggvény (loss function)", en: "x → loss function" } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A szokásos jelölésben x a bemenet (input), y a valódi címke (label), ŷ a becslés (prediction), θ pedig a modellparaméterek vektora.",
      en: "In the usual notation x is the input, y the true label, ŷ the prediction, and θ the model parameters."
    }
  },
  {
    id: "q9",
    topics: ["supervised-learning", "ml-types"],
    prompt: {
      hu: "Mely állítások írják le helyesen a felügyelt tanulást (supervised learning)?",
      en: "Which statements correctly describe supervised learning?"
    },
    choices: [
      { id: "a", text: { hu: "A tanítóminta (x,y) bemenet–címke párokat tartalmaz.", en: "The training sample contains input-label pairs (x,y)." } },
      { id: "b", text: { hu: "A modell ŷ becslését össze tudjuk hasonlítani a valódi y címkével.", en: "The model prediction ŷ can be compared with the true label y." } },
      { id: "c", text: { hu: "A cél tipikusan olyan paramétereket tanulni, amelyekkel új x bemenetekhez is jól becsüljük y-t.", en: "The goal is typically to learn parameters that predict y well for new x inputs." } },
      { id: "d", text: { hu: "A tanítás során nincs szükség semmilyen ismert célértékre vagy címkére.", en: "Training requires no known targets or labels." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Felügyelt tanulásban minden tanítási példához ismert y címke tartozik. A modell hθ(x)=ŷ becslést készít, és a tanítás azt próbálja elérni, hogy ŷ jól közelítse y-t.",
      en: "In supervised learning, each training example has a known label y. The model produces hθ(x)=ŷ and training tries to make ŷ approximate y."
    }
  },
  {
    id: "q10",
    topics: ["unsupervised-learning", "ml-types"],
    prompt: {
      hu: "Mely állítások igazak a felügyelet nélküli tanulásra (unsupervised learning) az 1. előadás alapján?",
      en: "Which statements are true about unsupervised learning according to Lecture 1?"
    },
    choices: [
      { id: "a", text: { hu: "Nincs minden x bemenethez megadott helyes y címke.", en: "There is no provided correct y label for every input x." } },
      { id: "b", text: { hu: "A klaszterezés (clustering) lehet unsupervised feladat.", en: "Clustering can be an unsupervised task." } },
      { id: "c", text: { hu: "A dimenziócsökkentés (dimensionality reduction) lehet unsupervised feladat.", en: "Dimensionality reduction can be an unsupervised task." } },
      { id: "d", text: { hu: "Mivel nincs y címke, ezért semmilyen célfüggvény nem lehet.", en: "Because there is no y label, there cannot be any objective function." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Unsupervised learningben nincs klasszikus y címke minden példához, de ettől még van feladat és cél. Az előadás példái között szerepel a klaszterezés, dimenziócsökkentés, mintagenerálás és denoising.",
      en: "Unsupervised learning lacks a classical y label for every example, but it still has a task and objective. Lecture examples include clustering, dimensionality reduction, sample generation, and denoising."
    }
  },
  {
    id: "q11",
    topics: ["reinforcement-learning", "ml-types"],
    prompt: {
      hu: "Mely állítások írják le helyesen a megerősítéses tanulást (reinforcement learning)?",
      en: "Which statements correctly describe reinforcement learning?"
    },
    choices: [
      { id: "a", text: { hu: "Egy agent állapotot figyel meg és akciót választ.", en: "An agent observes a state and chooses an action." } },
      { id: "b", text: { hu: "Az agent pozitív vagy negatív rewardot kaphat.", en: "The agent may receive positive or negative reward." } },
      { id: "c", text: { hu: "A cél olyan akciók választása, amelyek várhatóan maximalizálják a jövőbeli összjutalmat.", en: "The goal is to choose actions expected to maximize total future reward." } },
      { id: "d", text: { hu: "Minden állapothoz előre megkapjuk a helyes akciót y címkeként.", en: "For every state, the correct action is provided in advance as a label y." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "RL-ben az agent a környezettel kölcsönhatásban tanul. A reward a következmények értékelése, nem minden lépéshez megadott helyes címke.",
      en: "In RL, the agent learns through interaction with the environment. Reward evaluates consequences; it is not a correct label supplied for every step."
    }
  },
  {
    id: "q12",
    topics: ["ml-types", "comparison"],
    prompt: {
      hu: "Mely párosítások helyesek a három gépi tanulási paradigma között?",
      en: "Which pairings correctly distinguish the three machine-learning paradigms?"
    },
    choices: [
      { id: "a", text: { hu: "Címkézett képosztályozás → supervised learning.", en: "Labeled image classification → supervised learning." } },
      { id: "b", text: { hu: "Címke nélküli klaszterezés → unsupervised learning.", en: "Clustering without labels → unsupervised learning." } },
      { id: "c", text: { hu: "Játékot játszó agent jutalmakkal → reinforcement learning.", en: "A game-playing agent with rewards → reinforcement learning." } },
      { id: "d", text: { hu: "Ha nincs y címke, akkor a feladat mindig unsupervised learning.", en: "If there is no label y, the task is always unsupervised learning." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A címke hiánya önmagában nem elég az unsupervised besoroláshoz. RL-ben sincs minden állapothoz y címke, de van agent–environment interakció és reward.",
      en: "The absence of y alone is not enough to classify a task as unsupervised. RL also lacks y for every state but includes agent-environment interaction and reward."
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


export const officialQuestionBank: Question[] = questionBank.filter((question) =>
  question.topics.includes("official-example")
);

export const extendedQuestionBank: Question[] = questionBank;
