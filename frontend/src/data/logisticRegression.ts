import type { Lesson, Question } from "../types";

export const logisticRegressionLesson: Lesson = {
  id: "logistic-regression",
  title: {
    hu: "Logisztikus regresszió és bináris osztályozás",
    en: "Logistic Regression and Binary Classification"
  },
  subtitle: {
    hu: "Hogyan lesz a lineáris pontszámból 0 és 1 közötti valószínűség, döntési határ és osztálycímke?",
    en: "How a linear score becomes a probability, decision boundary, and binary class label"
  },
  source: "Lectures 3–4",
  sections: [
    {
      id: "binary-classification",
      title: {
        hu: "Miért nem elég a lineáris regresszió osztályozásra?",
        en: "Why is linear regression not enough for classification?"
      },
      body: {
        hu: "Bináris osztályozásnál (binary classification) két kategória közül választunk, például beteg / nem beteg vagy túlélte / nem élte túl. A lineáris regresszió tetszőleges valós számot adhat kimenetként, ezért nem természetes valószínűségi modell ehhez a feladathoz. A tananyag ellenpéldával mutatja, hogy lineáris regresszióval egy küszöb alapján létrehozott döntési határ (decision boundary) érzékeny lehet az adatok eloszlására és rosszul viselkedhet osztályozási feladatban.",
        en: "Binary classification chooses between two categories, such as ill / healthy or survived / did not survive. Linear regression can output any real number, so it is not a natural probability model for this task. The course uses a counterexample to show that thresholding linear-regression outputs can yield an unsuitable decision boundary."
      },
      why: {
        hu: "Osztályozásnál olyan kimenetet szeretnénk, amely értelmezhető az egyik osztályhoz tartozás valószínűségeként. Ehhez a kimenetet 0 és 1 közé kell korlátozni.",
        en: "For classification, we want an output that can be interpreted as the probability of belonging to one class, so the output should be constrained to [0,1]."
      },
      connections: {
        hu: "A logisztikus regresszió megtartja a lineáris regresszió súlyozott összegét, de hozzáad egy nemlineáris szigmoid függvényt (sigmoid), amely a lineáris pontszámot valószínűséggé alakítja.",
        en: "Logistic regression keeps the weighted linear sum from linear regression but adds a nonlinear sigmoid that maps the score into a probability."
      },
      examTrap: {
        hu: "A logisztikus regresszió neve félrevezető lehet: a tananyagban ez bináris osztályozási (classification), nem regressziós feladat megoldására szolgál.",
        en: "Despite its name, logistic regression is used for binary classification in this course, not for a regression task."
      },
      keyTerms: [
        { term: "binary classification", hu: "bináris osztályozás" },
        { term: "decision boundary", hu: "döntési határ" }
      ]
    },
    {
      id: "sigmoid",
      title: {
        hu: "A szigmoid függvény: valós számból valószínűség",
        en: "The sigmoid: mapping a real number to a probability"
      },
      body: {
        hu: "A szigmoid függvény (sigmoid function) bármilyen valós z értéket 0 és 1 közé képez. A logisztikus regresszió először kiszámít egy lineáris pontszámot (linear score), majd ezt vezeti át a szigmoidon. Nagyon negatív z esetén a kimenet 0-hoz közelít, z=0 esetén pontosan 0,5, nagyon pozitív z esetén pedig 1-hez közelít.",
        en: "The sigmoid maps any real-valued z into the interval (0,1). Logistic regression first computes a linear score and then passes it through the sigmoid. Large negative z values map near 0, z=0 maps to 0.5, and large positive z values map near 1."
      },
      why: {
        hu: "A 0–1 közötti tartomány miatt a kimenet természetesen értelmezhető az 1-es osztályhoz tartozás becsült valószínűségeként.",
        en: "Because the output lies between 0 and 1, it can naturally be interpreted as the estimated probability of class 1."
      },
      formula: {
        hu: "g(z) = 1 / (1 + e^(−z))",
        en: "g(z) = 1 / (1 + e^(−z))"
      },
      formulaTerms: [
        { symbol: "z", hu: "A szigmoid bemenete; a logisztikus regresszióban lineáris pontszám.", en: "Input to the sigmoid; in logistic regression it is a linear score." },
        { symbol: "e", hu: "Az exponenciális függvény alapja.", en: "Base of the natural exponential function." },
        { symbol: "g(z)", hu: "A szigmoid kimenete, 0 és 1 közötti érték.", en: "Sigmoid output, between 0 and 1." }
      ],
      workedExample: {
        hu: "Ha z=0, akkor g(0)=1/(1+1)=0,5. Ez a bináris döntési küszöb természetes közepe. Ha z nagy pozitív szám, a nevezőben e^(−z) közel 0, ezért a kimenet 1-hez közelít.",
        en: "If z=0 then g(0)=1/(1+1)=0.5. For a large positive z, e^(−z) is near zero, so the output approaches 1."
      },
      examTrap: {
        hu: "A szigmoid kimenete folytonos szám, de ettől a logisztikus regresszió nem válik általános regressziós módszerré. A kimenet 0 és 1 közé van korlátozva, ezért valószínűségként használjuk.",
        en: "The sigmoid output is continuous, but logistic regression is not therefore a general regression method. Its output is constrained to [0,1] and is used as a probability."
      },
      keyTerms: [
        { term: "sigmoid", hu: "szigmoid függvény" },
        { term: "probability", hu: "valószínűség" }
      ]
    },
    {
      id: "logistic-hypothesis",
      title: {
        hu: "A logisztikus hipotézis",
        en: "The logistic hypothesis"
      },
      body: {
        hu: "Egy bemeneti jellemzőnél a logisztikus regresszió lineáris pontszáma z=θ₀+θ₁x. A hipotézisfüggvény ezt a szigmoidon vezeti át: hθ(x)=g(θ₀+θ₁x). Több jellemzőnél a lineáris rész θ₀+θ₁x₁+…+θₙxₙ alakú.",
        en: "With one input feature, logistic regression computes z=θ₀+θ₁x and applies the sigmoid: hθ(x)=g(θ₀+θ₁x). With multiple features the linear part becomes θ₀+θ₁x₁+…+θₙxₙ."
      },
      why: {
        hu: "A modell két lépést választ szét: a súlyok (weights) lineárisan összegzik a jellemzők hatását, a szigmoid pedig ezt 0–1 közötti értelmezhető kimenetté alakítja.",
        en: "The model separates two roles: weights form a linear combination of the features, and the sigmoid maps that score to an interpretable 0–1 output."
      },
      formula: {
        hu: "hθ(x) = g(θ₀ + θ₁x₁ + … + θₙxₙ)",
        en: "hθ(x) = g(θ₀ + θ₁x₁ + … + θₙxₙ)"
      },
      formulaTerms: [
        { symbol: "xᵢ", hu: "Az i-edik bemeneti jellemző.", en: "The i-th input feature." },
        { symbol: "θᵢ", hu: "Az i-edik jellemző tanulható súlya (weight).", en: "Learnable weight of feature i." },
        { symbol: "θ₀", hu: "Eltolás (bias).", en: "Bias." },
        { symbol: "z", hu: "A szigmoid előtti lineáris pontszám.", en: "Linear score before the sigmoid." },
        { symbol: "hθ(x)", hu: "Az 1-es osztály becsült valószínűsége.", en: "Estimated probability of class 1." }
      ],
      workedExample: {
        hu: "Szemléltető példa: két laborértékből betegségkockázatot becsülünk. A modell z=θ₀+θ₁x₁+θ₂x₂ pontszámot számol, majd a szigmoid például h=0,82 értéket adhat, amit 82%-os becsült az 1-es osztály valószínűségeként (class-1 probability) értelmezünk.",
        en: "Illustrative example: estimate disease risk from two lab values. The model computes z=θ₀+θ₁x₁+θ₂x₂ and the sigmoid may produce h=0.82, interpreted as an 82% estimated class-1 probability."
      },
      connections: {
        hu: "Ha a mesterséges neuron (artificial neuron) aktivációs függvénye szigmoid, akkor a a 4–6. előadás (Lectures 4–6) megfogalmazása szerint maga a neuron többváltozós logisztikus regressziónak tekinthető.",
        en: "If an artificial neuron uses sigmoid activation, Lectures 4–6 describe it as multivariate logistic regression."
      },
      examTrap: {
        hu: "A konkrét bemeneti értékek x/X-ben vannak, nem θ-ban. θ a megtanult súlyokat és eltolást tartalmazza.",
        en: "Concrete input values are stored in x/X, not θ. θ contains learned weights and bias."
      }
    },
    {
      id: "decision-boundary",
      title: {
        hu: "Döntési határ: hol vált osztályt a modell?",
        en: "Decision boundary: where does the model change class?"
      },
      body: {
        hu: "Ha 0,5 küszöböt használunk, akkor hθ(x)≥0,5 esetén az 1-es osztályt, hθ(x)<0,5 esetén a 0-s osztályt választjuk. Mivel g(0)=0,5, a döntési határt azok a pontok alkotják, ahol a szigmoid előtti lineáris pontszám z=0.",
        en: "With a 0.5 threshold, hθ(x)≥0.5 predicts class 1 and hθ(x)<0.5 predicts class 0. Because g(0)=0.5, the decision boundary consists of inputs where the pre-sigmoid linear score z equals zero."
      },
      formula: {
        hu: "θ₀ + θ₁x₁ + … + θₙxₙ = 0  ⇔  hθ(x)=0,5",
        en: "θ₀ + θ₁x₁ + … + θₙxₙ = 0  ⇔  hθ(x)=0.5"
      },
      formulaTerms: [
        { symbol: "0,5", hu: "A példákban használt osztályozási küszöb.", en: "Classification threshold used in the examples." },
        { symbol: "z=0", hu: "A szigmoid azon bemenete, ahol a kimenet pontosan 0,5.", en: "Sigmoid input where the output is exactly 0.5." }
      ],
      intuition: {
        hu: "Egy bemeneti változónál a határ egy pont az x tengelyen. Két bemeneti változónál egy egyenes választja szét a síkot. Több változónál hipersíkot kapunk.",
        en: "With one feature the boundary is a point on the x-axis; with two features it is a line in the input plane; in higher dimensions it is a hyperplane."
      },
      examTrap: {
        hu: "A döntési határ nem maga a 3D valószínűségi felület. A döntési határ az inputtér azon pontjainak halmaza, amelyeknél hθ(x)=0,5.",
        en: "The decision boundary is not the entire probability surface. It is the set of input points where hθ(x)=0.5."
      }
    },
    {
      id: "binary-cross-entropy",
      title: {
        hu: "Bináris keresztentrópia: a logisztikus regresszió vesztesége",
        en: "Binary cross-entropy: the logistic-regression loss"
      },
      body: {
        hu: "Bináris osztályozáshoz a tananyag logisztikus veszteséget, más néven bináris keresztentrópiát (binary cross-entropy, BCE) használ. Egy példára a veszteség L=−y·log(h)−(1−y)·log(1−h), ahol h a modell által becsült valószínűség.",
        en: "For binary classification, the course uses logistic loss, also called binary cross-entropy (BCE). For one example, L=−y·log(h)−(1−y)·log(1−h), where h is the predicted probability."
      },
      why: {
        hu: "A képlet azt jutalmazza, ha a modell nagy valószínűséget ad a helyes osztálynak, és különösen erősen bünteti a nagy magabiztosságú, de hibás előrejelzéseket.",
        en: "The formula rewards assigning high probability to the correct class and strongly penalizes confident but incorrect predictions."
      },
      formula: {
        hu: "L = −y log(h) − (1−y) log(1−h)",
        en: "L = −y log(h) − (1−y) log(1−h)"
      },
      formulaTerms: [
        { symbol: "y", hu: "A valódi bináris címke: 0 vagy 1.", en: "True binary label: 0 or 1." },
        { symbol: "h", hu: "A modell becsült 1-es osztályhoz tartozás valószínűsége (class-1 probability).", en: "Predicted probability of class 1." },
        { symbol: "log", hu: "Természetes logaritmus a veszteségképletben.", en: "Natural logarithm used in the loss." },
        { symbol: "L", hu: "Egyetlen példa vesztesége.", en: "Loss for a single example." }
      ],
      workedExample: {
        hu: "Ha y=1, akkor a második tag eltűnik, és L=−log(h). Ha h közel 1, a veszteség kicsi; ha h közel 0, a veszteség nagyon nagy. Ha y=0, akkor L=−log(1−h).",
        en: "If y=1, the second term vanishes and L=−log(h). If h is near 1, loss is small; if h is near 0, loss becomes very large. For y=0, L=−log(1−h)."
      },
      examTrap: {
        hu: "A lineáris regresszió MSE vesztesége és a logisztikus regresszió BCE vesztesége nem cserélhető fel automatikusan. A kurzus a feladat típusához megfelelő veszteséget társít.",
        en: "Linear-regression MSE and logistic-regression BCE are not interchangeable by default. The course associates each task with an appropriate loss."
      },
      keyTerms: [
        { term: "binary cross-entropy", hu: "bináris keresztentrópia" },
        { term: "logistic loss", hu: "logisztikus veszteség" }
      ]
    },
    {
      id: "convex-logistic",
      title: {
        hu: "Miért található meg a globális optimum?",
        en: "Why can the global optimum be found?"
      },
      body: {
        hu: "A tananyag szerint a logisztikus regresszió logisztikus vesztesége a modell paramétereire nézve konvex. Ez azt jelenti, hogy nincs több, egymástól különálló rossz lokális minimum, amelyben a gradienscsökkentés csapdába eshetne. Megfelelő beállítások mellett a gradiensalapú optimalizálás eljuthat a globális optimumhoz.",
        en: "According to the course, logistic loss for logistic regression is convex in the model parameters. Therefore there are no separate bad local minima that trap gradient descent, and gradient-based optimization can reach the global optimum with suitable settings."
      },
      why: {
        hu: "Ez fontos különbség a több rétegű neurális hálózatokhoz képest. Egy MLP veszteségfelülete általában nem konvex, ezért ott a globális optimum megtalálása nincs ugyanígy garantálva.",
        en: "This is an important difference from multilayer neural networks, whose loss surfaces are generally non-convex, so the same global-optimum guarantee does not apply."
      },
      connections: {
        hu: "A lineáris regresszió MSE-vesztesége is konvex kvadratikus függvény. A Theory Test ezért külön összehasonlíthatja a lineáris/logisztikus regresszió és az MLP optimalizálhatóságát.",
        en: "Linear-regression MSE is also convex and quadratic. The Theory Test can therefore contrast linear/logistic regression with MLP optimization."
      },
      examTrap: {
        hu: "A „globális optimum” állítás a logisztikus regresszió megfelelő veszteségére vonatkozik, nem tetszőleges neurális hálózatra.",
        en: "The global-optimum statement applies to logistic regression with its appropriate loss, not to arbitrary neural networks."
      }
    }
  ]
};

export const logisticRegressionQuestions: Question[] = [
  {
    id: "log-q1",
    topics: ["logistic-regression", "classification"],
    prompt: {
      hu: "Mely állítások igazak logisztikus regresszióra?",
      en: "Which statements are true about logistic regression?"
    },
    choices: [
      { id: "a", text: { hu: "Bináris osztályozásra (binary classification) használható.", en: "It can be used for binary classification." } },
      { id: "b", text: { hu: "felügyelt tanulás (supervised learning) módszer (method).", en: "It is a supervised learning method." } },
      { id: "c", text: { hu: "valószínűség (probability) becslést állít elő.", en: "It produces a probability estimate." } },
      { id: "d", text: { hu: "tetszőleges folytonos (arbitrary continuous) regresszió (regression) célértékek becslésére tervezték.", en: "It is designed for arbitrary continuous regression targets." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Az előadás (lecture) szerint logisztikus regresszió (logistic regression) bináris osztályozás (binary classification) módszer (method). A sigmoid miatt valószínűség (probability) becslést állít elő 0 és 1 között.",
      en: "According to the lecture, logistic regression is a binary-classification method. The sigmoid produces a probability estimate between 0 and 1."
    }
  },
  {
    id: "log-q2",
    topics: ["sigmoid"],
    prompt: {
      hu: "Mely állítások igazak a g(z)=1/(1+e^(−z)) szigmoid függvényre?",
      en: "Which statements are true about the sigmoid function g(z)=1/(1+e^(−z))?"
    },
    choices: [
      { id: "a", text: { hu: "g(0)=0.5.", en: "g(0)=0.5." } },
      { id: "b", text: { hu: "Nagy pozitív z esetén g(z) 1-hez közelít.", en: "For large positive z, g(z) approaches 1." } },
      { id: "c", text: { hu: "Nagy negatív z esetén g(z) 0-hoz közelít.", en: "For large negative z, g(z) approaches 0." } },
      { id: "d", text: { hu: "Véges z (finite z) esetén g(z) lehet 5.", en: "For finite z, g(z) can equal 5." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A sigmoid 0 és 1 közé képez. z=0-nál 1/(1+1)=0.5.",
      en: "The sigmoid maps between 0 and 1. At z=0, 1/(1+1)=0.5."
    }
  },
  {
    id: "log-q3",
    topics: ["logistic-regression", "hypothesis"],
    prompt: {
      hu: "Mely állítások igazak a logisztikus regresszió (logistic regression) hipotézisre?",
      en: "Which statements are true about the logistic-regression hypothesis?"
    },
    choices: [
      { id: "a", text: { hu: "Előbb lineáris pontszámot (linear score) számolunk.", en: "A linear score is computed first." } },
      { id: "b", text: { hu: "A lineáris pontszámra (linear score) sigmoid kerül.", en: "A sigmoid is applied to the linear score." } },
      { id: "c", text: { hu: "Multivariate formában h=g(Xθ).", en: "In multivariate form h=g(Xθ)." } },
      { id: "d", text: { hu: "A hipotézis (hypothesis) maga tisztán lineáris függvény (function).", en: "The hypothesis itself is purely linear." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A kurzus (course) megfogalmazása: logisztikus regresszió (logistic regression) hipotézis (hypothesis) = Sigmoid ∘ lineáris regresszió (linear regression). Emiatt maga a teljes hipotézis (hypothesis) nem lineáris.",
      en: "The course states: Logistic regression hypothesis = Sigmoid ∘ Linear regression. Therefore, the complete hypothesis itself is not linear."
    }
  },
  {
    id: "log-q4",
    topics: ["decision-boundary"],
    prompt: {
      hu: "A kurzus (course) 0.5 thresholdja mellett mely állítások igazak?",
      en: "With the course's 0.5 threshold, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "h(x)<0.5 → predicted címke (label) 0.", en: "h(x)<0.5 → predicted label 0." } },
      { id: "b", text: { hu: "h(x)≥0.5 → predicted címke (label) 1.", en: "h(x)≥0.5 → predicted label 1." } },
      { id: "c", text: { hu: "A döntési határ (decision boundary) pontjain h(x)=0.5.", en: "At points on the decision boundary, h(x)=0.5." } },
      { id: "d", text: { hu: "A valószínűség (probability) becslés (prediction) és a osztálycímke (class label) mindig ugyanaz a numerikus érték.", en: "The probability prediction and class label are always numerically identical." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A valószínűség (probability) becslés (prediction) küszöbölése külön lépés. Például h=0.73 esetén a osztálycímke (class label) 1.",
      en: "Thresholding the probability prediction is a separate step. For example, h=0.73 gives class label 1."
    }
  },
  {
    id: "log-q5",
    topics: ["decision-boundary", "geometry"],
    prompt: {
      hu: "Mely geometriai állítások igazak a kurzus (course) logisztikus regresszió (logistic regression) (regression) példáiban?",
      en: "Which geometric statements are true in the course logistic-regression examples?"
    },
    choices: [
      { id: "a", text: { hu: "Egy bemeneti változó (input variable) esetén a döntési határ (decision boundary) egy pont lehet az x tengelyen.", en: "With one input variable, the decision boundary can be a point on the x-axis." } },
      { id: "b", text: { hu: "Két bemeneti változó (input variable) esetén a kétváltozós döntési határ (decision boundary) egy egyenes (line) a bemeneti síkban (input plane).", en: "With two input variables, the bivariate decision boundary is a line in the input plane." } },
      { id: "c", text: { hu: "A boundary azokból az bemenetekből (inputs) áll, ahol h=0.5.", en: "The boundary consists of inputs where h=0.5." } },
      { id: "d", text: { hu: "A döntési határ (decision boundary) a veszteség (loss) minimumának 3D görbéje.", en: "The decision boundary is a 3D curve of loss minima." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A döntési határ (decision boundary) bemeneti térbeli (input space) fogalom: {x | h(x)=0.5}. Egy jellemző (feature) esetén pont, két jellemző (feature) esetén a kurzus (course) ábráján egyenes (line).",
      en: "The decision boundary is defined in input space: {x | h(x)=0.5}. With one feature it is a point; with two features the course shows a line."
    }
  },
  {
    id: "log-q6",
    topics: ["logistic-regression", "shapes"],
    prompt: {
      hu: "100 beteg, 2 laborvizsgálati (blood-test) jellemző (feature) és x₀=1 tengelymetszet / eltolás (intercept) oszlop esetén mely állítások igazak?",
      en: "With 100 patients, 2 blood-test features, and an x₀=1 intercept column, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "X shape-je (100,3).", en: "X has shape (100,3)." } },
      { id: "b", text: { hu: "θ shape-je (3,).", en: "θ has shape (3,)." } },
      { id: "c", text: { hu: "Xθ shape-je (100,).", en: "Xθ has shape (100,)." } },
      { id: "d", text: { hu: "g(Xθ) shape-je (100,).", en: "g(Xθ) has shape (100,)." } },
      { id: "e", text: { hu: "Két jellemző (feature) miatt pontosan 2 paraméter (parameter) van.", en: "There are exactly 2 parameters because there are two features." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "2 jellemző (feature) + tengelymetszet / eltolás (intercept) = 3 paraméter (parameter) és 3 X-oszlop. Mind Xθ, mind az elemenkénti (element-wise) szigmoid kimenete (sigmoid output) egy 100 elemű vektor (vector).",
      en: "Two features plus the intercept give 3 parameters and 3 columns in X. Both Xθ and its elementwise sigmoid output are 100-element vectors."
    }
  },
  {
    id: "log-q7",
    topics: ["logistic-regression", "data"],
    prompt: {
      hu: "A 100 beteg / 2 laborvizsgálati (blood-test) jellemző (feature) példában mely állítások igazak?",
      en: "In the 100-patient / 2-blood-test-feature example, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A laborvizsgálati (blood-test) values X-ben vannak.", en: "The blood-test values are in X." } },
      { id: "b", text: { hu: "A disease/healthy címkék (labels) y-ban vannak.", en: "The disease/healthy labels are in y." } },
      { id: "c", text: { hu: "θ a megtanulandó modellparaméterek (model parameters) vektor (vector).", en: "θ is the learnable model-parameter vector." } },
      { id: "d", text: { hu: "A laborvizsgálati (blood-test) values θ-ban vannak.", en: "The blood-test values are in θ." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "X a jellemző (feature) mátrix (matrix), y a címke (label) vektor (vector), θ pedig a modellparaméterek (model parameters) vektor (vector).",
      en: "X is the feature matrix, y the label vector, and θ the model-parameter vector."
    }
  },
  {
    id: "log-q8",
    topics: ["bce", "loss"],
    prompt: {
      hu: "Mely állítások igazak a logisztikus veszteség (logistic loss) / bináris keresztentrópia (binary cross-entropy) veszteségre?",
      en: "Which statements are true about logistic loss / binary cross-entropy loss?"
    },
    choices: [
      { id: "a", text: { hu: "Binary classificationhöz alkalmas veszteség (loss).", en: "It is a suitable loss for binary classification." } },
      { id: "b", text: { hu: "A teljes J(θ) skalár (scalar).", en: "The overall J(θ) is a scalar." } },
      { id: "c", text: { hu: "A képlet (formula) log(h) és log(1−h) tagokat tartalmaz.", en: "The formula contains log(h) and log(1−h) terms." } },
      { id: "d", text: { hu: "A kurzus (course) logisztikus regresszióhoz (logistic regression) MSE-t választ végső megfelelő veszteségként (loss).", en: "The course ultimately chooses MSE as the appropriate loss for logistic regression." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A kurzus (course) logisztikus regresszióhoz (logistic regression) logisztikus veszteség (logistic loss) / BCE-t használ. A veszteség (loss) példák (examples) felett átlagolt skalár (scalar) célfüggvény (objective).",
      en: "The course uses logistic loss / BCE for logistic regression. It is a scalar objective averaged over examples."
    }
  },
  {
    id: "log-q9",
    topics: ["bce"],
    prompt: {
      hu: "Egyetlen példa (example) BCE tagjánál, ha y=1, mely állítások igazak?",
      en: "For one BCE example term, if y=1, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A −log(h) tag marad releváns.", en: "The −log(h) term remains relevant." } },
      { id: "b", text: { hu: "A (1−y)log(1−h) rész nullázódik.", en: "The (1−y)log(1−h) part becomes zero." } },
      { id: "c", text: { hu: "h közel 1 kis veszteséget (loss) ad.", en: "h close to 1 gives a small loss." } },
      { id: "d", text: { hu: "h közel 0 ideális becslés (prediction).", en: "h close to 0 is the ideal prediction." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "y=1 esetén BCE = −log(h). Ez akkor kicsi, ha h közel 1.",
      en: "When y=1, BCE reduces to −log(h), which is small when h is close to 1."
    }
  },
  {
    id: "log-q10",
    topics: ["bce"],
    prompt: {
      hu: "Egyetlen példa (example) BCE tagjánál, ha y=0, mely állítások igazak?",
      en: "For one BCE example term, if y=0, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A −log(1−h) tag marad releváns.", en: "The −log(1−h) term remains relevant." } },
      { id: "b", text: { hu: "A y log(h) rész nullázódik.", en: "The y log(h) part becomes zero." } },
      { id: "c", text: { hu: "h közel 0 kis veszteséget (loss) ad.", en: "h close to 0 gives a small loss." } },
      { id: "d", text: { hu: "h közel 1 a jó becslés (prediction).", en: "h close to 1 is the good prediction." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "y=0 esetén BCE = −log(1−h), ami h≈0 esetén kicsi.",
      en: "When y=0, BCE reduces to −log(1−h), which is small when h≈0."
    }
  },
  {
    id: "log-q11",
    topics: ["logistic-regression", "optimization"],
    prompt: {
      hu: "Mit minimalizálunk logisztikus regresszió (logistic regression) tanítás során?",
      en: "What do we minimize during logistic-regression training?"
    },
    choices: [
      { id: "a", text: { hu: "A logisztikus/BCE-veszteség (logistic/BCE loss) J(θ) értékét.", en: "The logistic/BCE loss J(θ)." } },
      { id: "b", text: { hu: "X-et.", en: "X." } },
      { id: "c", text: { hu: "A sigmoid függvény (function) g-t.", en: "The sigmoid function g." } },
      { id: "d", text: { hu: "θ numerikus értékét önmagában.", en: "The numerical value of θ itself." } }
    ],
    correctIds: ["a"],
    explanation: {
      hu: "A modellparaméterek (model parameters) azért változnak, hogy a logisztikus/BCE-célfüggvény (logistic/BCE objective) (objective) J(θ) csökkenjen.",
      en: "Model parameters are changed so that the logistic/BCE objective J(θ) decreases."
    }
  },
  {
    id: "log-q12",
    topics: ["logistic-regression", "gradient"],
    prompt: {
      hu: "Az előadás (lecture) 4 NumPy recap alapján mely állítások igazak logisztikus regresszió (logistic regression) gradiens (gradient) descentnél?",
      en: "According to the Lecture 4 NumPy recap, which statements are true for logistic-regression gradient descent?"
    },
    choices: [
      { id: "a", text: { hu: "h = sigmoid(Xθ).", en: "h = sigmoid(Xθ)." } },
      { id: "b", text: { hu: "gradiens (gradient) = Xᵀ(h−y)/m.", en: "gradient = Xᵀ(h−y)/m." } },
      { id: "c", text: { hu: "θ := θ − α·gradiens (gradient).", en: "θ := θ − α·gradient." } },
      { id: "d", text: { hu: "A sigmoid miatt a gradiens (gradient) vektor (vector) shape-je ugyanaz, mint X shape-je.", en: "Because of the sigmoid, the gradient vector has the same shape as X." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A gradiens (gradient) θ-val kompatibilis vektor (vector), nem X-szel azonos shape-jű mátrix (matrix). A kurzus (course) kódja: X.T @ (h-y) / y.size.",
      en: "The gradient is a vector compatible with θ, not a matrix with the same shape as X. The course code uses X.T @ (h-y) / y.size."
    }
  },
  {
    id: "log-q13",
    topics: ["logistic-regression", "convexity"],
    prompt: {
      hu: "Mely állítások igazak a kurzus (course) veszteségválasztási (loss-selection) magyarázatára?",
      en: "Which statements are true about the course explanation for choosing the loss?"
    },
    choices: [
      { id: "a", text: { hu: "Szigmoid hipotézis (sigmoid hypothesis) + MSE esetén a veszteségnek (loss) több lokális minimuma (local minima) is lehet.", en: "With a sigmoid hypothesis + MSE, the loss may have multiple local minima." } },
      { id: "b", text: { hu: "A logisztikus/BCE-veszteség (logistic/BCE loss) a logisztikus hipotézissel (logistic hypothesis) konvex (convex).", en: "Logistic/BCE loss with the logistic hypothesis is convex." } },
      { id: "c", text: { hu: "A konvex logisztikus veszteségnek (convex logistic loss) egy lokális/globális minimuma (local/global minimum) van.", en: "The convex logistic loss has a local/global minimum." } },
      { id: "d", text: { hu: "Ezért gradienscsökkentés (gradient descent) a logisztikus veszteségnél (logistic loss) megtalálhatja a globálisan (globally) optimális (optimal) paraméterek (parameters) értékeket.", en: "Therefore gradient descent can find the globally optimal parameters for logistic loss." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "Pontosan ez az előadás (lecture) érvelése: az MSE+sigmoid problémás nem konvex (non-convex) célfüggvényt (objective) adhat; a logisztikus/BCE-veszteség (logistic/BCE loss) konvex (convex), ezért gradienscsökkentés (gradient descent) számára megfelelőbb.",
      en: "This is exactly the lecture's argument: MSE + sigmoid can create a problematic non-convex objective; logistic/BCE loss is convex and therefore better suited to gradient descent."
    }
  },
  {
    id: "log-q14",
    topics: ["logistic-regression", "prediction"],
    prompt: {
      hu: "Egyetlen betegre a logisztikus regresszió (logistic regression) kimenet (output) hθ(x)=0.82. A kurzus (course) 0.5 küszöbét használva mely állítások igazak?",
      en: "For one patient, logistic regression outputs hθ(x)=0.82. Using the course's 0.5 threshold, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "0.82 a valószínűség (probability) becslés.", en: "0.82 is a probability estimate." } },
      { id: "b", text: { hu: "A becsült osztály (predicted class) címke (label) 1.", en: "The predicted class label is 1." } },
      { id: "c", text: { hu: "A hipotézis (hypothesis) kimenete (output) ezen az példán (example) skalár (scalar).", en: "The hypothesis output for this example is a scalar." } },
      { id: "d", text: { hu: "A becsült osztály (predicted class) címke (label) 0.82.", en: "The predicted class label is 0.82." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "0.82 a skalár (scalar) valószínűség (probability) becslés. Thresholdolás után diszkrét (discrete) címke (label) 1 lesz.",
      en: "0.82 is a scalar probability estimate. After thresholding, the discrete label is 1."
    }
  }
];
