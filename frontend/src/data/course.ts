import type { Lesson, Question } from "../types";
import { linearRegressionLesson, linearRegressionQuestions } from "./linearRegression";
import { logisticRegressionLesson, logisticRegressionQuestions } from "./logisticRegression";
import { generalizationLesson } from "./generalizationLesson";
import { generalizationQuestions } from "./generalizationQuestions";

export const lessons: Lesson[] = [
  {
    id: "ml-fundamentals",
    title: {
      hu: "Machine Learning alapok",
      en: "Machine Learning Fundamentals"
    },
    subtitle: {
      hu: "A modellektől a hypothesis function és loss function fogalmáig",
      en: "From models to the hypothesis function and loss function"
    },
    source: "Lecture 1–2",
    sections: [
      {
        id: "why-ml",
        title: {
          hu: "Miért használunk Machine Learninget?",
          en: "Why do we use Machine Learning?"
        },
        body: {
          hu: "A hagyományos programozásban mi írjuk le explicit módon az algoritmust. Machine Learning esetén olyan modellt definiálunk, amelynek vannak tanulható paraméterei (parameters), és példák segítségével olyan paraméterértékeket keresünk, amelyekkel a modell jól oldja meg a feladatot.",
          en: "In classical programming, we explicitly write the algorithm. In Machine Learning, we define a model with learnable parameters and use examples to find parameter values that make the model solve the task well."
        },
        intuition: {
          hu: "Képzeld el, hogy nem tudsz olyan szabályhalmazt írni, ami minden kutyát felismer egy képen. Viszont sok példát tudsz mutatni. A modell a példákból állítja be a saját parameters értékeit.",
          en: "Imagine that you cannot write a reliable rule set for recognizing every dog in an image, but you can show many examples. The model adjusts its parameters from those examples."
        },
        realWorld: {
          hu: "Képfelismerésnél, beszédfelismerésnél vagy összetett előrejelzési problémáknál gyakran könnyebb példákat gyűjteni, mint teljes megoldó algoritmust kézzel megírni.",
          en: "For image recognition, speech recognition, or complex prediction problems, it is often easier to collect examples than to manually write the complete solving algorithm."
        },
        examTrap: {
          hu: "A Machine Learning nem azt jelenti, hogy nincs algoritmus. A learning algorithm létezik; azt tanuljuk meg, hogy a model parameters milyen értékeket vegyenek fel.",
          en: "Machine Learning does not mean that no algorithm exists. A learning algorithm exists; it is used to find suitable model parameter values."
        },
        keyTerms: [
          { term: "model", hu: "modell" },
          { term: "parameter", hu: "paraméter" },
          { term: "training example", hu: "tanítópélda" }
        ]
      },
      {
        id: "three-groups",
        title: {
          hu: "A Machine Learning három fő csoportja",
          en: "Three main groups of Machine Learning"
        },
        body: {
          hu: "A tananyag három fő csoportot különít el: supervised learning, unsupervised learning és reinforcement learning. A Theory Testben fontos felismerni, hogy egy adott feladat melyik csoportba tartozik.",
          en: "The material separates Machine Learning into three main groups: supervised learning, unsupervised learning, and reinforcement learning. In the Theory Test it is important to identify which group a task belongs to."
        },
        intuition: {
          hu: "Supervised learning esetén vannak helyes válaszaink (labels). Unsupervised learning esetén ilyen megadott labels nélkül keresünk szerkezetet az adatokban. Reinforcement learning esetén az agent az environmenttel való interakcióból kap feedbacket.",
          en: "In supervised learning, correct answers (labels) are available. In unsupervised learning, structure is sought without supplied labels. In reinforcement learning, an agent receives feedback through interaction with an environment."
        },
        examTrap: {
          hu: "A regression és classification tipikusan supervised learning feladat. A clustering és dimensionality reduction a mintakérdések szerint unsupervised learning témakörként jelenik meg.",
          en: "Regression and classification are typically supervised learning tasks. In the example topics, clustering and dimensionality reduction are treated as unsupervised learning topics."
        },
        keyTerms: [
          { term: "supervised learning" },
          { term: "unsupervised learning" },
          { term: "reinforcement learning" },
          { term: "label", hu: "címke / elvárt kimenet" }
        ]
      },
      {
        id: "supervised-data",
        title: {
          hu: "Supervised learning: input és label",
          en: "Supervised Learning: input and label"
        },
        body: {
          hu: "A training sample (tanítóminta) input–label párokból áll: (x, y). Az x a modell bemenete, az y pedig a true label, vagyis a helyes/elvárt kimenet. A modell predictionje általában ŷ (y-hat).",
          en: "The training sample consists of input–label pairs (x, y). x is the model input, while y is the true label, the expected output. The model prediction is usually denoted by ŷ (y-hat)."
        },
        intuition: {
          hu: "Lakásár-becslésnél x lehet az alapterület, távolság a központtól stb., y pedig a tényleges lakásár. A modell x alapján állít elő egy ŷ becslést.",
          en: "For apartment-price prediction, x can contain floor area, distance from the center, and other features, while y is the actual price. The model produces a prediction ŷ from x."
        },
        examTrap: {
          hu: "Az input adatok nem a θ paramétervektorba kerülnek. x/X tartalmazza a példák feature értékeit; θ a modell megtanulandó parameters értékeit tartalmazza.",
          en: "Input data are not stored in the θ parameter vector. x/X contains feature values of the examples; θ contains learnable model parameters."
        },
        keyTerms: [
          { term: "input" },
          { term: "feature" },
          { term: "label" },
          { term: "true label" },
          { term: "prediction" }
        ]
      },
      {
        id: "hypothesis",
        title: {
          hu: "Hypothesis function",
          en: "Hypothesis Function"
        },
        body: {
          hu: "A hypothesis function hθ(x) a modell leképezése: az input x és a parameters θ alapján predictiont készít. Formálisan hθ(x) = ŷ, és azt szeretnénk, hogy ŷ a lehető legközelebb legyen y-hoz.",
          en: "The hypothesis function hθ(x) is the model mapping: from input x and parameters θ it produces a prediction. Formally hθ(x) = ŷ, and we want ŷ to be as close as possible to y."
        },
        intuition: {
          hu: "Tekints rá úgy, mint a már betanított modell 'előre irányú számítására': beadod az inputot, ő pedig a jelenlegi parameters alapján válaszol.",
          en: "Think of it as the model's forward computation: provide an input and it produces an answer using its current parameters."
        },
        examTrap: {
          hu: "A hypothesis function outputja nem mindig ugyanaz a formátum. Lehet scalar vagy vector is a feladattól függően. A mintakérdések külön rákérdeznek a label és prediction shape-jére.",
          en: "The hypothesis function output does not always have the same format. Depending on the task it can be a scalar or a vector. The example questions explicitly test label and prediction shapes."
        },
        keyTerms: [
          { term: "hypothesis function" },
          { term: "prediction" },
          { term: "parameters" }
        ]
      },
      {
        id: "loss",
        title: {
          hu: "Loss function: mit optimalizálunk?",
          en: "Loss Function: what do we optimize?"
        },
        body: {
          hu: "A loss function J számszerűsíti, hogy a modell mennyire rosszul teljesít. A tanulás célja olyan θ parameters megtalálása, amelyek mellett a loss minimális. Nem X-et és nem egyszerűen a θ numerikus értékét akarjuk minimalizálni, hanem J(θ)-t.",
          en: "The loss function J quantifies how poorly the model performs. Learning aims to find θ parameters for which the loss is minimal. We do not minimize X or simply the numerical size of θ; we minimize J(θ)."
        },
        intuition: {
          hu: "A loss olyan, mint egy hibapontszám. A learning algorithm azt keresi, hogyan állítsa a modell parameters értékeit úgy, hogy ez a hibapontszám egyre kisebb legyen.",
          en: "Loss is like an error score. The learning algorithm searches for parameter values that make this error score smaller."
        },
        examTrap: {
          hu: "A teljes loss function értéke tipikusan scalar. A prediction vagy label lehet vector, de a model optimizationhoz egy összehasonlítható scalar célértéket használunk.",
          en: "The overall loss function value is typically a scalar. Predictions or labels may be vectors, but model optimization uses a comparable scalar objective value."
        },
        keyTerms: [
          { term: "loss function" },
          { term: "objective" },
          { term: "minimize" },
          { term: "model parameters" }
        ]
      }
    ]
  },
  linearRegressionLesson,
  logisticRegressionLesson,
  generalizationLesson
];

export const questionBank: Question[] = [
  {
    id: "q1",
    topics: ["supervised-learning", "data"],
    prompt: {
      hu: "Mely állítások igazak egy supervised learning training sample-re?",
      en: "Which statements are true about a supervised learning training sample?"
    },
    choices: [
      { id: "a", text: { hu: "Input–label párokból állhat.", en: "It can consist of input–label pairs." } },
      { id: "b", text: { hu: "Az x jelöli az inputot.", en: "x denotes the input." } },
      { id: "c", text: { hu: "Az y jelöli a model parameters értékeit.", en: "y denotes the model parameters." } },
      { id: "d", text: { hu: "Az y jelölheti a true labelt.", en: "y can denote the true label." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "Supervised learningben a training sample (x, y) párokból áll. x az input, y a true label. A model parameters külön, például θ-val vannak jelölve.",
      en: "In supervised learning the training sample consists of (x, y) pairs. x is the input and y is the true label. Model parameters are separate, for example θ."
    }
  },
  {
    id: "q2",
    topics: ["hypothesis-function"],
    prompt: {
      hu: "Mely állítások igazak a hypothesis function hθ(x) függvényre?",
      en: "Which statements are true about the hypothesis function hθ(x)?"
    },
    choices: [
      { id: "a", text: { hu: "Inputból predictiont állít elő.", en: "It produces a prediction from an input." } },
      { id: "b", text: { hu: "A θ a modell parameters értékeit jelölheti.", en: "θ can denote model parameters." } },
      { id: "c", text: { hu: "A hθ(x) értéke ŷ lehet.", en: "The value of hθ(x) can be ŷ." } },
      { id: "d", text: { hu: "Tanulás közben X-et próbáljuk minimalizálni.", en: "During learning we try to minimize X." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A hypothesis function az input és a parameters alapján predictiont ad. Az optimization célja nem X minimalizálása.",
      en: "The hypothesis function produces a prediction using the input and parameters. Optimization does not minimize X."
    }
  },
  {
    id: "q3",
    topics: ["loss"],
    prompt: {
      hu: "Mely állítások igazak a loss function szerepére?",
      en: "Which statements are true about the role of the loss function?"
    },
    choices: [
      { id: "a", text: { hu: "A modell hibáját/teljesítményét számszerűsíti.", en: "It quantifies model error/performance." } },
      { id: "b", text: { hu: "A tanulás során általában minimalizálni szeretnénk.", en: "During learning we usually want to minimize it." } },
      { id: "c", text: { hu: "A teljes objective értéke tipikusan scalar.", en: "The overall objective value is typically a scalar." } },
      { id: "d", text: { hu: "Mindig ugyanazt a loss functiont használjuk minden ML tasknál.", en: "We always use the same loss function for every ML task." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A loss az optimization célértéke. A megfelelő loss a feladattól függ; például regression és classification esetén eltérő loss lehet indokolt.",
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
      hu: "Egy beteg cholesterol level értékét szeretnénk becsülni weight, age, height és sex alapján. Mely állítások igazak?",
      en: "We want to predict a patient's cholesterol level from weight, age, height, and sex. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "Ez regression task.", en: "This is a regression task." } },
      { id: "b", text: { hu: "A cholesterol level a label.", en: "The cholesterol level is the label." } },
      { id: "c", text: { hu: "Az age a model parameter θ egyik eleme.", en: "Age is one of the model parameters θ." } },
      { id: "d", text: { hu: "A personal attributes a feature/input adatok részei.", en: "The personal attributes are part of the feature/input data." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A cholesterol level folytonos célváltozó, ezért regression. A beteg tulajdonságai X/x feature adatok, nem a megtanulandó θ parameters.",
      en: "Cholesterol level is a continuous target, so this is regression. Patient attributes are X/x features, not learnable θ parameters."
    }
  },
  {
    id: "q6",
    topics: ["linear-regression"],
    prompt: {
      hu: "Melyik állítás igaz a linear regression geometriai értelmezésére?",
      en: "Which statement is true about the geometric interpretation of linear regression?"
    },
    choices: [
      { id: "a", text: { hu: "Egy input variable esetén a hypothesis egy egyenes lehet a 2D x–y síkon.", en: "With one input variable, the hypothesis can be a line in the 2D x–y plane." } },
      { id: "b", text: { hu: "Két input variable esetén a linear hypothesis egy sík lehet 3D-ben.", en: "With two input variables, the linear hypothesis can be a plane in 3D." } },
      { id: "c", text: { hu: "A linear regression csak classificationre használható.", en: "Linear regression can only be used for classification." } },
      { id: "d", text: { hu: "A slope és bias a modell parameters részei lehetnek.", en: "Slope and bias can be model parameters." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "Linear regression folytonos érték becslésére szolgál. Egy inputnál egyenes, két inputnál sík a geometriai linear hypothesis.",
      en: "Linear regression predicts continuous values. Geometrically, with one input the linear hypothesis is a line; with two inputs it is a plane."
    }
  },
  {
    id: "q7",
    topics: ["optimization"],
    prompt: {
      hu: "Mit szeretnénk minimalizálni model training során?",
      en: "What do we want to minimize during model training?"
    },
    choices: [
      { id: "a", text: { hu: "Az input matrix X méretét.", en: "The size of the input matrix X." } },
      { id: "b", text: { hu: "A loss function J(θ) értékét.", en: "The value of the loss function J(θ)." } },
      { id: "c", text: { hu: "A training examples számát.", en: "The number of training examples." } },
      { id: "d", text: { hu: "Olyan θ értékeket keresünk, amelyek kis loss-t eredményeznek.", en: "We search for θ values that result in low loss." } }
    ],
    correctIds: ["b", "d"],
    explanation: {
      hu: "A parameters értékeit azért változtatjuk, hogy J(θ) csökkenjen. Nem az input adatokat vagy a dataset méretét minimalizáljuk.",
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
      { id: "a", text: { hu: "y → true label", en: "y → true label" } },
      { id: "b", text: { hu: "ŷ → prediction", en: "ŷ → prediction" } },
      { id: "c", text: { hu: "θ → model parameters", en: "θ → model parameters" } },
      { id: "d", text: { hu: "x → loss function", en: "x → loss function" } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A szokásos jelölésben x az input, y a true label, ŷ a prediction, θ pedig a model parameters.",
      en: "In the usual notation x is the input, y the true label, ŷ the prediction, and θ the model parameters."
    }
  },
  ...linearRegressionQuestions,
  ...logisticRegressionQuestions,
  ...generalizationQuestions
];
