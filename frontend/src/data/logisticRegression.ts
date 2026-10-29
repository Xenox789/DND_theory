import type { Lesson, Question } from "../types";

export const logisticRegressionLesson: Lesson = {
  id: "logistic-regression",
  title: {
    hu: "Logistic Regression és binary classification",
    en: "Logistic Regression and Binary Classification"
  },
  subtitle: {
    hu: "Sigmoid, probability, decision boundary, binary cross-entropy és gradient descent",
    en: "Sigmoid, probability, decision boundary, binary cross-entropy, and gradient descent"
  },
  source: "Lectures 3–4",
  sections: [
    {
      id: "classification-vs-regression",
      title: {
        hu: "Classification nem regression",
        en: "Classification is not regression"
      },
      body: {
        hu: "Classification esetén a labels diszkrét kategóriákat jelentenek. Binary classificationnél két category van, amelyeket a course példáiban 0 és 1 labellel reprezentálunk. A modell egy probability-szerű folytonos értéket becsül, majd threshold alapján class labelt rendel hozzá.",
        en: "In classification, labels represent discrete categories. Binary classification has two categories, represented as labels 0 and 1 in the course examples. The model estimates a continuous probability-like value and then assigns a class label using a threshold."
      },
      intuition: {
        hu: "A 'beteg vagy egészséges?' kérdésre a modell először például 0.82 probability-t adhat. Ez még nem maga a discrete class label; 0.5 threshold mellett ebből lesz label 1.",
        en: "For a 'diseased or healthy?' task, the model may first output a probability such as 0.82. This is not yet the discrete class label; with a 0.5 threshold it becomes label 1."
      },
      examTrap: {
        hu: "A logistic regression neve ellenére classification method. A prediction folytonos probability estimate, de a feladat binary classification.",
        en: "Despite its name, logistic regression is a classification method. Its prediction is a continuous probability estimate, but the task is binary classification."
      },
      keyTerms: [
        { term: "classification" },
        { term: "binary classification" },
        { term: "class label" },
        { term: "probability" },
        { term: "threshold" }
      ]
    },
    {
      id: "why-not-linear-regression",
      title: {
        hu: "Miért nem linear regression classificationre?",
        en: "Why not linear regression for classification?"
      },
      body: {
        hu: "A lecture egy counterexample-t mutat: linear regression classificationnél nagyon érzékeny lehet egy outlierre. Egy új, de a korábbi döntési logikának nem ellentmondó szélsőséges pont jelentősen eltolhatja a fitted line-t és így a decision boundary-t.",
        en: "The lecture gives a counterexample: linear regression can be very sensitive to an outlier when used for classification. A new extreme point, even one that does not contradict the previous decision rule, can significantly shift the fitted line and therefore the decision boundary."
      },
      intuition: {
        hu: "Classificationnél nem az a cél, hogy egy tetszőleges valós számot illesszünk a 0/1 label értékekre, hanem hogy jól modellezzük a category membership valószínűségét.",
        en: "For classification, the goal is not to fit arbitrary real-valued outputs to the 0/1 labels, but to model category-membership probability appropriately."
      },
      examTrap: {
        hu: "A course explicit következtetése: linear regression nem ideális classification task tanulására, mert nagyon érzékeny lehet outliers-re.",
        en: "The course explicitly concludes that linear regression is not ideal for learning classification tasks because it can be very sensitive to outliers."
      },
      keyTerms: [
        { term: "outlier" },
        { term: "decision boundary" },
        { term: "linear regression" }
      ]
    },
    {
      id: "sigmoid",
      title: {
        hu: "Sigmoid function",
        en: "Sigmoid function"
      },
      body: {
        hu: "A sigmoid function a teljes valós számegyenest 0 és 1 közé képezi, ezért alkalmas probability estimate előállítására. A course definíciója: g(z)=1/(1+e^(−z)).",
        en: "The sigmoid function maps the real line between 0 and 1, making it suitable for producing probability estimates. The course defines it as g(z)=1/(1+e^(−z))."
      },
      intuition: {
        hu: "Nagy negatív z esetén g(z) közel 0; z=0 esetén pontosan 0.5; nagy pozitív z esetén közel 1.",
        en: "For a large negative z, g(z) is close to 0; at z=0 it is exactly 0.5; for a large positive z it is close to 1."
      },
      examTrap: {
        hu: "Finite z esetén a sigmoid matematikailag 0 és 1 között van. A course ezt probability estimate-ként használja; nem arbitrary regression outputként.",
        en: "For finite z, the sigmoid is mathematically between 0 and 1. The course uses this as a probability estimate, not as an arbitrary regression output."
      },
      formula: {
        hu: "g(z) = 1 / (1 + e^(−z))",
        en: "g(z) = 1 / (1 + e^(−z))"
      },
      keyTerms: [
        { term: "sigmoid" },
        { term: "probability estimate" }
      ]
    },
    {
      id: "logistic-hypothesis",
      title: {
        hu: "Logistic regression hypothesis",
        en: "Logistic regression hypothesis"
      },
      body: {
        hu: "A logistic regression hypothesis a sigmoid és a linear combination kompozíciója. Univariate esetben hθ(x)=g(θ₁x+θ₀). Multivariate esetben ugyanaz az elv: előbb z=Xθ, majd h=g(z).",
        en: "The logistic-regression hypothesis composes the sigmoid with a linear combination. In the univariate case hθ(x)=g(θ₁x+θ₀). In the multivariate case the same principle applies: first z=Xθ, then h=g(z)."
      },
      intuition: {
        hu: "A linear rész elkészít egy score-t, a sigmoid pedig ezt a score-t 0 és 1 közötti probability estimate-té alakítja.",
        en: "The linear part produces a score, and the sigmoid converts that score into a probability estimate between 0 and 1."
      },
      examTrap: {
        hu: "A hypothesis már nem linear function, mert a linear score-ra sigmoid kerül. Ettől még a parameter count ugyanúgy n+1 az intercepttel együtt.",
        en: "The hypothesis is no longer a linear function because a sigmoid is applied to the linear score. The parameter count is still n+1 including the intercept."
      },
      formula: {
        hu: "z = Xθ;   ŷ = hθ(X) = g(Xθ)",
        en: "z = Xθ;   ŷ = hθ(X) = g(Xθ)"
      },
      keyTerms: [
        { term: "linear score" },
        { term: "composition" },
        { term: "hypothesis function" }
      ]
    },
    {
      id: "decision-boundary",
      title: {
        hu: "Decision boundary és threshold",
        en: "Decision boundary and threshold"
      },
      body: {
        hu: "A course 0.5 thresholdot használ. Ha h(x)<0.5, a predicted label 0; ha h(x)≥0.5, a predicted label 1. A decision boundary azoknak az input pontoknak a halmaza, ahol h(x)=0.5.",
        en: "The course uses a 0.5 threshold. If h(x)<0.5, the predicted label is 0; if h(x)≥0.5, the predicted label is 1. The decision boundary is the set of input points where h(x)=0.5."
      },
      intuition: {
        hu: "Egy input variable esetén a boundary egy pont az x tengelyen. Két input variable esetén a course ábráján egy line az input plane-ben.",
        en: "With one input variable, the boundary is a point on the x-axis. With two input variables, the course shows a line in the input plane."
      },
      examTrap: {
        hu: "A probability prediction és a class decision két külön lépés. h(x)=0.73 prediction; threshold után ebből lesz class 1.",
        en: "The probability prediction and class decision are two separate steps. h(x)=0.73 is the prediction; thresholding turns it into class 1."
      },
      formula: {
        hu: "decision boundary = { x | hθ(x)=0.5 };   h<0.5 → 0;   h≥0.5 → 1",
        en: "decision boundary = { x | hθ(x)=0.5 };   h<0.5 → 0;   h≥0.5 → 1"
      },
      keyTerms: [
        { term: "decision boundary" },
        { term: "threshold" }
      ]
    },
    {
      id: "logistic-shapes",
      title: {
        hu: "Matrix form és shape-ek",
        en: "Matrix form and shapes"
      },
      body: {
        hu: "m example és n valódi feature esetén, az x₀=1 intercept oszloppal X shape-je (m,n+1), θ shape-je (n+1,), z=Xθ shape-je (m,), és g(z)=ŷ shape-je szintén (m,).",
        en: "With m examples and n real features, using the x₀=1 intercept column, X has shape (m,n+1), θ has shape (n+1,), z=Xθ has shape (m,), and g(z)=ŷ also has shape (m,)."
      },
      intuition: {
        hu: "A sigmoid elementwise kerül az Xθ vector minden elemére, ezért nem változtatja meg a vector shape-jét.",
        en: "The sigmoid is applied elementwise to every element of Xθ, so it does not change the vector shape."
      },
      examTrap: {
        hu: "A blood-test feature értékek X-ben vannak. θ csak model parameters. A sigmoid output range-e probability-ként 0 és 1 közötti.",
        en: "Blood-test feature values are stored in X. θ contains only model parameters. The sigmoid output lies between 0 and 1 as a probability."
      },
      formula: {
        hu: "X:(m,n+1), θ:(n+1,), Xθ:(m,), g(Xθ):(m,)",
        en: "X:(m,n+1), θ:(n+1,), Xθ:(m,), g(Xθ):(m,)"
      },
      keyTerms: [
        { term: "shape" },
        { term: "elementwise" },
        { term: "design matrix" }
      ]
    },
    {
      id: "bce",
      title: {
        hu: "Logistic loss / Binary Cross-Entropy",
        en: "Logistic loss / Binary Cross-Entropy"
      },
      body: {
        hu: "A course logistic regressionhez logistic loss / binary cross-entropy (BCE) használatát adja meg: az egyes example-oknál −y log(h) − (1−y) log(1−h) tagokat átlagoljuk.",
        en: "For logistic regression, the course uses logistic loss / binary cross-entropy (BCE): for each example, the terms −y log(h) − (1−y) log(1−h) are averaged."
      },
      intuition: {
        hu: "Ha a true label 1, akkor csak a −log(h) rész marad; ha a true label 0, akkor csak a −log(1−h) rész. A magabiztos, de rossz probability prediction nagy büntetést kap.",
        en: "If the true label is 1, only −log(h) remains; if the true label is 0, only −log(1−h) remains. A confident but wrong probability prediction receives a large penalty."
      },
      examTrap: {
        hu: "A course külön bemutatja, hogy sigmoid hypothesis + MSE problémás lehet a nem-convex loss miatt. Logistic regressionhez a tárgyalt megfelelő loss a logistic loss / BCE.",
        en: "The course explicitly shows that sigmoid hypothesis + MSE can be problematic because the resulting loss may be non-convex. The discussed appropriate loss for logistic regression is logistic loss / BCE."
      },
      formula: {
        hu: "J(θ)=1/m · Σⱼ [−y⁽ʲ⁾log(h⁽ʲ⁾) − (1−y⁽ʲ⁾)log(1−h⁽ʲ⁾)]",
        en: "J(θ)=1/m · Σⱼ [−y⁽ʲ⁾log(h⁽ʲ⁾) − (1−y⁽ʲ⁾)log(1−h⁽ʲ⁾)]"
      },
      keyTerms: [
        { term: "logistic loss" },
        { term: "binary cross-entropy (BCE)" },
        { term: "convex" }
      ]
    },
    {
      id: "logistic-gradient-descent",
      title: {
        hu: "Gradient Descent logistic regressionnél",
        en: "Gradient Descent for logistic regression"
      },
      body: {
        hu: "A Lecture 4 NumPy összefoglalója a gradientet így adja meg: gradient = Xᵀ(h−y)/m, majd θ := θ − α·gradient. A logistic loss a logistic hypothesis-szel convex, ezért egy local minimum egyben global minimum is.",
        en: "The Lecture 4 NumPy recap gives the gradient as gradient = Xᵀ(h−y)/m, followed by θ := θ − α·gradient. Logistic loss with the logistic hypothesis is convex, so its local minimum is also the global minimum."
      },
      intuition: {
        hu: "A training loop szerkezete hasonló linear regressionhöz: prediction → loss/gradient → parameter update. A különbség az, hogy a prediction itt sigmoid(Xθ), és BCE lossot használunk.",
        en: "The training-loop structure resembles linear regression: prediction → loss/gradient → parameter update. The difference is that prediction is sigmoid(Xθ) and the loss is BCE."
      },
      examTrap: {
        hu: "Nem a sigmoid g-t minimalizáljuk, és nem θ numerikus értékét. A minimalizált objective a logistic/BCE loss J(θ).",
        en: "We do not minimize the sigmoid g or the numerical value of θ itself. The objective being minimized is the logistic/BCE loss J(θ)."
      },
      formula: {
        hu: "h=g(Xθ);   ∇J = Xᵀ(h−y)/m;   θ := θ − α∇J",
        en: "h=g(Xθ);   ∇J = Xᵀ(h−y)/m;   θ := θ − α∇J"
      },
      keyTerms: [
        { term: "gradient descent" },
        { term: "global minimum" },
        { term: "convex loss" }
      ]
    }
  ]
};

export const logisticRegressionQuestions: Question[] = [
  {
    id: "log-q1",
    topics: ["logistic-regression", "classification"],
    prompt: {
      hu: "Mely állítások igazak logistic regressionre?",
      en: "Which statements are true about logistic regression?"
    },
    choices: [
      { id: "a", text: { hu: "Binary classificationre használható.", en: "It can be used for binary classification." } },
      { id: "b", text: { hu: "Supervised learning method.", en: "It is a supervised learning method." } },
      { id: "c", text: { hu: "Probability estimate-et állít elő.", en: "It produces a probability estimate." } },
      { id: "d", text: { hu: "Arbitrary continuous regression targetok becslésére tervezték.", en: "It is designed for arbitrary continuous regression targets." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A lecture szerint logistic regression binary classification method. A sigmoid miatt probability estimate-et állít elő 0 és 1 között.",
      en: "According to the lecture, logistic regression is a binary-classification method. The sigmoid produces a probability estimate between 0 and 1."
    }
  },
  {
    id: "log-q2",
    topics: ["sigmoid"],
    prompt: {
      hu: "Mely állítások igazak a g(z)=1/(1+e^(−z)) sigmoid functionre?",
      en: "Which statements are true about the sigmoid function g(z)=1/(1+e^(−z))?"
    },
    choices: [
      { id: "a", text: { hu: "g(0)=0.5.", en: "g(0)=0.5." } },
      { id: "b", text: { hu: "Nagy pozitív z esetén g(z) 1-hez közelít.", en: "For large positive z, g(z) approaches 1." } },
      { id: "c", text: { hu: "Nagy negatív z esetén g(z) 0-hoz közelít.", en: "For large negative z, g(z) approaches 0." } },
      { id: "d", text: { hu: "Finite z esetén g(z) lehet 5.", en: "For finite z, g(z) can equal 5." } }
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
      hu: "Mely állítások igazak a logistic regression hypothesisre?",
      en: "Which statements are true about the logistic-regression hypothesis?"
    },
    choices: [
      { id: "a", text: { hu: "Előbb linear score-t számolunk.", en: "A linear score is computed first." } },
      { id: "b", text: { hu: "A linear score-ra sigmoid kerül.", en: "A sigmoid is applied to the linear score." } },
      { id: "c", text: { hu: "Multivariate formában h=g(Xθ).", en: "In multivariate form h=g(Xθ)." } },
      { id: "d", text: { hu: "A hypothesis maga tisztán linear function.", en: "The hypothesis itself is purely linear." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A course megfogalmazása: Logistic regression hypothesis = Sigmoid ∘ Linear regression. Emiatt maga a teljes hypothesis nem linear.",
      en: "The course states: Logistic regression hypothesis = Sigmoid ∘ Linear regression. Therefore, the complete hypothesis itself is not linear."
    }
  },
  {
    id: "log-q4",
    topics: ["decision-boundary"],
    prompt: {
      hu: "A course 0.5 thresholdja mellett mely állítások igazak?",
      en: "With the course's 0.5 threshold, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "h(x)<0.5 → predicted label 0.", en: "h(x)<0.5 → predicted label 0." } },
      { id: "b", text: { hu: "h(x)≥0.5 → predicted label 1.", en: "h(x)≥0.5 → predicted label 1." } },
      { id: "c", text: { hu: "A decision boundary pontjain h(x)=0.5.", en: "At points on the decision boundary, h(x)=0.5." } },
      { id: "d", text: { hu: "A probability prediction és a class label mindig ugyanaz a numerikus érték.", en: "The probability prediction and class label are always numerically identical." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A probability prediction thresholdolása külön lépés. Például h=0.73 esetén a class label 1.",
      en: "Thresholding the probability prediction is a separate step. For example, h=0.73 gives class label 1."
    }
  },
  {
    id: "log-q5",
    topics: ["decision-boundary", "geometry"],
    prompt: {
      hu: "Mely geometriai állítások igazak a course logistic-regression példáiban?",
      en: "Which geometric statements are true in the course logistic-regression examples?"
    },
    choices: [
      { id: "a", text: { hu: "Egy input variable esetén a decision boundary egy pont lehet az x tengelyen.", en: "With one input variable, the decision boundary can be a point on the x-axis." } },
      { id: "b", text: { hu: "Két input variable esetén a bivariate decision boundary egy line az input plane-ben.", en: "With two input variables, the bivariate decision boundary is a line in the input plane." } },
      { id: "c", text: { hu: "A boundary azokból az inputokból áll, ahol h=0.5.", en: "The boundary consists of inputs where h=0.5." } },
      { id: "d", text: { hu: "A decision boundary a loss minimumának 3D görbéje.", en: "The decision boundary is a 3D curve of loss minima." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A decision boundary input space-beli fogalom: {x | h(x)=0.5}. Egy feature esetén pont, két feature esetén a course ábráján line.",
      en: "The decision boundary is defined in input space: {x | h(x)=0.5}. With one feature it is a point; with two features the course shows a line."
    }
  },
  {
    id: "log-q6",
    topics: ["logistic-regression", "shapes"],
    prompt: {
      hu: "100 beteg, 2 blood-test feature és x₀=1 intercept oszlop esetén mely állítások igazak?",
      en: "With 100 patients, 2 blood-test features, and an x₀=1 intercept column, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "X shape-je (100,3).", en: "X has shape (100,3)." } },
      { id: "b", text: { hu: "θ shape-je (3,).", en: "θ has shape (3,)." } },
      { id: "c", text: { hu: "Xθ shape-je (100,).", en: "Xθ has shape (100,)." } },
      { id: "d", text: { hu: "g(Xθ) shape-je (100,).", en: "g(Xθ) has shape (100,)." } },
      { id: "e", text: { hu: "Két feature miatt pontosan 2 parameter van.", en: "There are exactly 2 parameters because there are two features." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "2 feature + intercept = 3 parameter és 3 X-oszlop. Mind Xθ, mind az elementwise sigmoid outputja egy 100 elemű vector.",
      en: "Two features plus the intercept give 3 parameters and 3 columns in X. Both Xθ and its elementwise sigmoid output are 100-element vectors."
    }
  },
  {
    id: "log-q7",
    topics: ["logistic-regression", "data"],
    prompt: {
      hu: "A 100 beteg / 2 blood-test feature példában mely állítások igazak?",
      en: "In the 100-patient / 2-blood-test-feature example, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A blood-test values X-ben vannak.", en: "The blood-test values are in X." } },
      { id: "b", text: { hu: "A disease/healthy labels y-ban vannak.", en: "The disease/healthy labels are in y." } },
      { id: "c", text: { hu: "θ a megtanulandó model parameters vector.", en: "θ is the learnable model-parameter vector." } },
      { id: "d", text: { hu: "A blood-test values θ-ban vannak.", en: "The blood-test values are in θ." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "X a feature matrix, y a label vector, θ pedig a model parameters vector.",
      en: "X is the feature matrix, y the label vector, and θ the model-parameter vector."
    }
  },
  {
    id: "log-q8",
    topics: ["bce", "loss"],
    prompt: {
      hu: "Mely állítások igazak a logistic loss / binary cross-entropy lossra?",
      en: "Which statements are true about logistic loss / binary cross-entropy loss?"
    },
    choices: [
      { id: "a", text: { hu: "Binary classificationhöz alkalmas loss.", en: "It is a suitable loss for binary classification." } },
      { id: "b", text: { hu: "A teljes J(θ) scalar.", en: "The overall J(θ) is a scalar." } },
      { id: "c", text: { hu: "A formula log(h) és log(1−h) tagokat tartalmaz.", en: "The formula contains log(h) and log(1−h) terms." } },
      { id: "d", text: { hu: "A course logistic regressionhez MSE-t választ végső megfelelő lossként.", en: "The course ultimately chooses MSE as the appropriate loss for logistic regression." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A course logistic regressionhez logistic loss / BCE-t használ. A loss examples felett átlagolt scalar objective.",
      en: "The course uses logistic loss / BCE for logistic regression. It is a scalar objective averaged over examples."
    }
  },
  {
    id: "log-q9",
    topics: ["bce"],
    prompt: {
      hu: "Egyetlen example BCE tagjánál, ha y=1, mely állítások igazak?",
      en: "For one BCE example term, if y=1, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A −log(h) tag marad releváns.", en: "The −log(h) term remains relevant." } },
      { id: "b", text: { hu: "A (1−y)log(1−h) rész nullázódik.", en: "The (1−y)log(1−h) part becomes zero." } },
      { id: "c", text: { hu: "h közel 1 kis loss-t ad.", en: "h close to 1 gives a small loss." } },
      { id: "d", text: { hu: "h közel 0 ideális prediction.", en: "h close to 0 is the ideal prediction." } }
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
      hu: "Egyetlen example BCE tagjánál, ha y=0, mely állítások igazak?",
      en: "For one BCE example term, if y=0, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A −log(1−h) tag marad releváns.", en: "The −log(1−h) term remains relevant." } },
      { id: "b", text: { hu: "A y log(h) rész nullázódik.", en: "The y log(h) part becomes zero." } },
      { id: "c", text: { hu: "h közel 0 kis loss-t ad.", en: "h close to 0 gives a small loss." } },
      { id: "d", text: { hu: "h közel 1 a jó prediction.", en: "h close to 1 is the good prediction." } }
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
      hu: "Mit minimalizálunk logistic regression training során?",
      en: "What do we minimize during logistic-regression training?"
    },
    choices: [
      { id: "a", text: { hu: "A logistic/BCE loss J(θ) értékét.", en: "The logistic/BCE loss J(θ)." } },
      { id: "b", text: { hu: "X-et.", en: "X." } },
      { id: "c", text: { hu: "A sigmoid function g-t.", en: "The sigmoid function g." } },
      { id: "d", text: { hu: "θ numerikus értékét önmagában.", en: "The numerical value of θ itself." } }
    ],
    correctIds: ["a"],
    explanation: {
      hu: "A model parameters azért változnak, hogy a logistic/BCE objective J(θ) csökkenjen.",
      en: "Model parameters are changed so that the logistic/BCE objective J(θ) decreases."
    }
  },
  {
    id: "log-q12",
    topics: ["logistic-regression", "gradient"],
    prompt: {
      hu: "A Lecture 4 NumPy recap alapján mely állítások igazak logistic regression gradient descentnél?",
      en: "According to the Lecture 4 NumPy recap, which statements are true for logistic-regression gradient descent?"
    },
    choices: [
      { id: "a", text: { hu: "h = sigmoid(Xθ).", en: "h = sigmoid(Xθ)." } },
      { id: "b", text: { hu: "gradient = Xᵀ(h−y)/m.", en: "gradient = Xᵀ(h−y)/m." } },
      { id: "c", text: { hu: "θ := θ − α·gradient.", en: "θ := θ − α·gradient." } },
      { id: "d", text: { hu: "A sigmoid miatt a gradient vector shape-je ugyanaz, mint X shape-je.", en: "Because of the sigmoid, the gradient vector has the same shape as X." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A gradient θ-val kompatibilis vector, nem X-szel azonos shape-jű matrix. A course kódja: X.T @ (h-y) / y.size.",
      en: "The gradient is a vector compatible with θ, not a matrix with the same shape as X. The course code uses X.T @ (h-y) / y.size."
    }
  },
  {
    id: "log-q13",
    topics: ["logistic-regression", "convexity"],
    prompt: {
      hu: "Mely állítások igazak a course loss-választási magyarázatára?",
      en: "Which statements are true about the course explanation for choosing the loss?"
    },
    choices: [
      { id: "a", text: { hu: "Sigmoid hypothesis + MSE esetén a lossnak lehetnek több local minimumai.", en: "With a sigmoid hypothesis + MSE, the loss may have multiple local minima." } },
      { id: "b", text: { hu: "A logistic/BCE loss a logistic hypothesis-szel convex.", en: "Logistic/BCE loss with the logistic hypothesis is convex." } },
      { id: "c", text: { hu: "A convex logistic lossnak egy local/global minimuma van.", en: "The convex logistic loss has a local/global minimum." } },
      { id: "d", text: { hu: "Ezért gradient descent a logistic lossnál megtalálhatja a globally optimal parameters értékeket.", en: "Therefore gradient descent can find the globally optimal parameters for logistic loss." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "Pontosan ez a lecture érvelése: az MSE+sigmoid problémás non-convex objective-et adhat; a logistic/BCE loss convex, ezért gradient descent számára megfelelőbb.",
      en: "This is exactly the lecture's argument: MSE + sigmoid can create a problematic non-convex objective; logistic/BCE loss is convex and therefore better suited to gradient descent."
    }
  },
  {
    id: "log-q14",
    topics: ["logistic-regression", "prediction"],
    prompt: {
      hu: "Egyetlen betegre a logistic regression output hθ(x)=0.82. A course 0.5 thresholdját használva mely állítások igazak?",
      en: "For one patient, logistic regression outputs hθ(x)=0.82. Using the course's 0.5 threshold, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "0.82 a probability estimate.", en: "0.82 is a probability estimate." } },
      { id: "b", text: { hu: "A predicted class label 1.", en: "The predicted class label is 1." } },
      { id: "c", text: { hu: "A hypothesis outputja ezen az example-on scalar.", en: "The hypothesis output for this example is a scalar." } },
      { id: "d", text: { hu: "A predicted class label 0.82.", en: "The predicted class label is 0.82." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "0.82 a scalar probability estimate. Thresholdolás után discrete label 1 lesz.",
      en: "0.82 is a scalar probability estimate. After thresholding, the discrete label is 1."
    }
  }
];
