import { createMockQuestion } from "./types";

export const fundamentalsMocks = [
  createMockQuestion({
    id: "mock-fund-1",
    chapter: "fundamentals",
    prompt: {
      hu: "Mely állítások helyesek a felügyelt, felügyelet nélküli és megerősítéses tanulásról?",
      en: "Which statements about supervised, unsupervised and reinforcement learning are correct?"
    },
    trueFacts: [
      ["Felügyelt tanulásnál gyakran (x,y) bemenet–címke párokból tanulunk.", "Supervised learning commonly uses input-label pairs (x,y)."],
      ["Az osztályozás tipikusan felügyelt tanulási feladat.", "Classification is typically a supervised learning task."],
      ["A regresszió folytonos célértékek becslésére alkalmas.", "Regression estimates continuous target values."],
      ["A klaszterezés címkézetlen adatokban csoportokat kereshet.", "Clustering can find groups in unlabeled data."],
      ["Megerősítéses tanulásban az agent cselekedeteire jutalom érkezhet.", "In reinforcement learning an agent may receive rewards for its actions."],
      ["Az RL-jutalom késleltetve is érkezhet az agenthez.", "Reinforcement-learning rewards can be delayed."]
    ],
    falseFacts: [
      ["A felügyelt tanulásban a helyes kimenetek soha nem ismertek.", "In supervised learning the correct outputs are never known."],
      ["A klaszterezéshez minden mintához előre megadott osztálycímke szükséges.", "Clustering requires a predefined class label for every example."],
      ["Az RL-környezet minden állapotban közvetlenül megadja a helyes akciót.", "An RL environment directly provides the correct action in every state."],
      ["A regresszió kizárólag felügyelet nélküli feladat lehet.", "Regression can only be an unsupervised task."],
      ["A megerősítéses tanulásban az agent mindig előre megkapja minden állapothoz a legjobb cselekvést címkeként.", "In reinforcement learning the agent always receives the best action as a label for every state."],
      ["A felügyelt és a felügyelet nélküli tanulást kizárólag a bemenet adattípusa különbözteti meg.", "Only input data type distinguishes supervised from unsupervised learning."]
    ],
    explanation: {
      hu: "A fő különbség a tanuláshoz felhasznált visszajelzés: címkék, adatmintázatok vagy környezeti jutalmak.",
      en: "The key difference is learning feedback: target labels, patterns in unlabeled data, or rewards from an environment."
    }
  }),
  createMockQuestion({
    id: "mock-fund-2",
    chapter: "fundamentals",
    prompt: {
      hu: "Mely állítások helyesek a hipotézisfüggvény, a paraméterek és a címkék jelölésére?",
      en: "Which claims about the hypothesis function, parameters and label representations are correct?"
    },
    trueFacts: [
      ["Az x általában a modell bemenete vagy bemeneti jellemzővektora.", "x typically denotes the model input or feature vector."],
      ["A θ jelölheti a modell tanulható paramétereit.", "θ can denote learnable model parameters."],
      ["A hθ(x) értéke lehet a modell ŷ becslése.", "The value hθ(x) can denote prediction ŷ."],
      ["Egyetlen tanítópélda y címkéje lehet skalár.", "A single training example's y label can be scalar."],
      ["Egyetlen tanítópélda y címkéje lehet vektor.", "A single training example's y label can be a vector."],
      ["Egy szegmentációs feladat címkéje ábrázolható kétdimenziós maszkként.", "A segmentation target can be represented as a two-dimensional mask."]
    ],
    falseFacts: [
      ["Az x általában a tanítás közben optimalizált súlyok vektora.", "x generally represents the weight vector optimized during training."],
      ["A θ jelöli minden esetben a valódi címkék teljes halmazát.", "θ always represents the complete set of true labels."],
      ["A valódi y címke minden esetben a tanulható θ paramétervektor egyik eleme.", "The true y label is always an element of the trainable parameter vector θ."],
      ["Minden gépi tanulási címke szükségszerűen egyetlen skalár.", "Every machine-learning label is necessarily a scalar."],
      ["A modell előrejelzése minden feladatban kizárólag 0 vagy 1 lehet.", "Model predictions must be either 0 or 1 in every task."],
      ["Tanuláskor mindig az X bemeneti mátrixot próbáljuk minimalizálni.", "Training always tries to minimize the input matrix X."]
    ],
    explanation: {
      hu: "Az x/X adathordozó, a θ tanulható paraméter, az y cél, az ŷ becslés. A címke és a modell kimenete a feladattól függően többféle alakú lehet.",
      en: "x/X holds inputs, θ holds trainable parameters, y is the target and ŷ the prediction; output shape depends on the task."
    }
  }),
  createMockQuestion({
    id: "mock-fund-3",
    chapter: "fundamentals",
    prompt: {
      hu: "Mely állítások igazak a gépi tanulási feladatok céljáról és a veszteségről?",
      en: "Which statements about machine-learning tasks and losses are true?"
    },
    trueFacts: [
      ["Lakásár folytonos értékének becslése regressziós feladat.", "Predicting a continuous house price is a regression task."],
      ["Egy hírcikk témakörének meghatározása osztályozás lehet.", "Predicting a news article's topic can be classification."],
      ["A dimenziócsökkentés kevesebb dimenziós reprezentációt keres.", "Dimensionality reduction seeks a lower-dimensional representation."],
      ["A denoising célja zajos bemenetből tisztább jel előállítása.", "Denoising aims to recover a cleaner signal from noisy input."],
      ["A loss function segíthet számszerűsíteni a becslés hibáját.", "A loss function can quantify prediction error."],
      ["A teljes optimalizálási célfüggvény eredménye tipikusan skalár.", "The overall optimization objective is typically scalar."]
    ],
    falseFacts: [
      ["A logisztikus regresszió neve ellenére soha nem végezhet osztályozást.", "Despite its name, logistic regression can never classify examples."],
      ["A dimenziócsökkentés minden esetben új osztálycímkét állít elő.", "Dimensionality reduction always produces a new class label."],
      ["A klaszterezés fő célja egy ismert folytonos y célérték pontos becslése.", "Clustering primarily predicts a known continuous target y."],
      ["Minden feladathoz ugyanaz a veszteségfüggvény az egyetlen helyes választás.", "There is exactly one universally correct loss function for all tasks."],
      ["A training loss értéke mindig mátrix, mert több adatponton mérjük.", "Training loss is always a matrix because it uses multiple samples."],
      ["A zajszűrés kizárólag olyan bináris osztályozás lehet, amely a zaj jelenlétét jelzi.", "Denoising can only be a binary classifier indicating whether noise is present."]
    ],
    explanation: {
      hu: "A regresszió, osztályozás, klaszterezés, dimenziócsökkentés és zajszűrés eltérő célt követ; a veszteség és a kimenet alakja a feladathoz igazodik.",
      en: "Regression, classification, clustering, dimensionality reduction and denoising solve different problems, so outputs and losses must fit the task."
    }
  })
];
