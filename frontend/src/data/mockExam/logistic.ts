import { createMockQuestion } from "./types";

export const logisticMocks = [
  createMockQuestion({
    id: "mock-log-1",
    chapter: "logistic",
    prompt: { hu: "Mely állítások helyesek a bináris osztályozásról és a logisztikus regresszióról?", en: "Which statements about binary classification and logistic regression are true?" },
    trueFacts: [
      ["A logisztikus regresszió használható bináris osztályozásra.", "Logistic regression can perform binary classification."],
      ["A szigmoid a lineáris z pontszámot 0 és 1 közé képezi.", "Sigmoid maps the linear score z into the interval (0,1)."],
      ["A modell hθ(x) kimenete értelmezhető az 1-es osztály becsült valószínűségeként.", "Model output hθ(x) can be interpreted as the estimated probability of class 1."],
      ["A két laborjellemzőhöz és a bias taghoz három modellparaméter tartozhat.", "Two laboratory features plus an intercept can use three model parameters."],
      ["100 mintánál, 2 jellemzővel és biasoszloppal X alakja (100,3).", "With 100 examples, two features and bias, X has shape (100,3)."],
      ["100 mintára g(Xθ) egy 100 elemű vektor lehet.", "For 100 examples g(Xθ) can be a vector of length 100."]
    ],
    falseFacts: [
      ["A logisztikus regresszió kizárólag folytonos célértékek becslésére szolgál.", "Logistic regression is exclusively for predicting continuous targets."],
      ["A szigmoid kimenete negatív is lehet.", "Sigmoid outputs can be negative."],
      ["A logisztikus regresszió minden egyes mintán egyszerre mátrixot ad vissza.", "Logistic regression always produces a matrix for a single sample."],
      ["Két bemeneti jellemző esetén a modellnek szükségképpen 100 paramétere van.", "With two features the model necessarily has 100 parameters."],
      ["A laborértékek a tanulható θ-ban találhatók, nem az X-ben.", "Laboratory measurements are stored in learnable θ, not in X."],
      ["A g(Xθ) minden komponensét tanítás előtt 0-ra kell állítani.", "Every component of g(Xθ) must be initialized to zero before training."]
    ],
    explanation: { hu: "A modell a bemeneti jellemzők súlyozott összegéből a szigmoidon át becsült osztályvalószínűséget számol.", en: "Logistic regression transforms a linear combination of input features into an estimated class probability using sigmoid." }
  }),
  createMockQuestion({
    id: "mock-log-2",
    chapter: "logistic",
    prompt: { hu: "Mely állítások igazak a szigmoidra, a 0,5-ös küszöbre és a döntési határra?", en: "Which statements about sigmoid, the 0.5 threshold and the decision boundary are correct?" },
    trueFacts: [
      ["A sigmoid(0) értéke pontosan 0,5.", "sigmoid(0) is exactly 0.5."],
      ["A szigmoid szigorúan monoton növekvő függvény.", "Sigmoid is strictly increasing."],
      ["Két jellemzővel a z=θ₀+θ₁x₁+θ₂x₂=0 lineáris határ egy egyenes lehet.", "With two features the linear boundary z=θ₀+θ₁x₁+θ₂x₂=0 can be a line."],
      ["Ha h(x)=0,8, a 0,5-ös küszöb az 1-es osztályt választja.", "For h(x)=0.8, a 0.5 threshold predicts class 1."],
      ["Ha z negatív, akkor a sigmoid(z) 0,5-nél kisebb.", "If z is negative, sigmoid(z) is below 0.5."],
      ["A döntési küszöb megváltoztatása módosíthatja a besorolt példák számát.", "Changing the decision threshold can change how many examples are classified positive."]
    ],
    falseFacts: [
      ["A sigmoid(0)=0.", "sigmoid(0)=0."],
      ["A szigmoid kimenete 2 lehet, ha z elég nagy.", "Sigmoid can output 2 if z is sufficiently large."],
      ["A 0,5-ös döntési határ minden kétjellemzős lineáris logisztikus modellnél kör.", "The 0.5 decision boundary of every two-feature linear logistic model is a circle."],
      ["A h(x)=0,8 becslés 0,5-ös küszöbnél 0-s osztályt jelent.", "Prediction h(x)=0.8 at threshold 0.5 means class 0."],
      ["Ha z pozitív, akkor sigmoid(z) szükségszerűen negatív.", "If z is positive then sigmoid(z) is necessarily negative."],
      ["A döntési határ azonos a teljes háromdimenziós valószínűségi felülettel.", "The decision boundary is identical to the entire three-dimensional probability surface."]
    ],
    explanation: { hu: "A szigmoid 0-nál 0,5, monoton növekvő, így a 0,5-ös küszöb határa a z=0 egyenletből következik.", en: "Sigmoid equals 0.5 at zero and is monotonic, so a 0.5 decision threshold corresponds to z=0." }
  }),
  createMockQuestion({
    id: "mock-log-3",
    chapter: "logistic",
    prompt: { hu: "Mely állítások helyesek a bináris keresztentrópiáról (BCE) és a veszteségfüggvényekről?", en: "Which statements about binary cross-entropy (BCE) and loss functions are correct?" },
    trueFacts: [
      ["BCE-nél a helyes y=1 címkéhez közeli 1-es becslés kis veszteséget ad.", "Under BCE, prediction near 1 incurs low loss when y=1."],
      ["BCE-nél a helyes y=0 címkéhez közeli 0-s becslés kis veszteséget ad.", "Under BCE, prediction near 0 incurs low loss when y=0."],
      ["Egyetlen példára a BCE egy skalár veszteséget számíthat.", "BCE can produce a scalar loss for one example."],
      ["y=1 mellett BCE alakja −log(h), ha h a becsült 1-es valószínűség.", "For y=1, BCE reduces to −log(h) when h is the class-1 probability."],
      ["y=0 mellett BCE alakja −log(1−h).", "For y=0, BCE reduces to −log(1−h)."],
      ["A biztosan rossz irányú valószínűségi becslést a BCE erősen bünteti.", "BCE heavily penalizes very confident incorrect probability estimates."]
    ],
    falseFacts: [
      ["y=1 mellett a h=0,01 becslés kisebb BCE-veszteségű, mint h=0,99.", "For y=1 prediction h=0.01 has lower BCE than h=0.99."],
      ["A BCE képletében a logaritmus helyett kötelezően négyzetgyök szerepel.", "BCE must use a square root instead of a logarithm."],
      ["BCE-vel egyetlen mintára szükségszerűen egy 100×100-as mátrixot kapunk.", "BCE for one sample necessarily returns a 100×100 matrix."],
      ["y=1 mellett a BCE mindig −log(1−h).", "For y=1, BCE always equals −log(1−h)."],
      ["y=0 mellett a helyes becslés h=0,9 adja a legkisebb veszteséget.", "For y=0, prediction h=0.9 produces the smallest loss."],
      ["A loss function értékét tanításkor általában maximalizálni próbáljuk.", "Training generally attempts to maximize the loss function."]
    ],
    explanation: { hu: "BCE: L=−y log(h)−(1−y) log(1−h). A helyes címkéhez adott kis valószínűség nagy veszteséget okoz.", en: "BCE is −y log(h)−(1−y) log(1−h); assigning low probability to the true label produces high loss." }
  })
];
