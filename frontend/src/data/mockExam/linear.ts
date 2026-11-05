import { createMockQuestion } from "./types";

export const linearMocks = [
  createMockQuestion({
    id: "mock-linear-1",
    chapter: "linear",
    prompt: { hu: "Mely állítások igazak a lineáris regresszió hipotézisére és geometriai értelmezésére?", en: "Which statements about the linear-regression hypothesis and its geometry are true?" },
    trueFacts: [
      ["Egy bemeneti változóval a lineáris hipotézis grafikonja egyenes.", "With one input variable the linear hypothesis is a line."],
      ["Két bemeneti változóval a lineáris hipotézis 3D-ben síkot ad.", "With two input variables its graph is a plane in 3D."],
      ["A bias (eltolás) a bemenettől független konstans tag.", "The bias is a constant term independent of features."],
      ["Négy jellemzőnél bias mellett öt súlyjellegű paraméter szerepel.", "With four features and an intercept there are five model parameters."],
      ["A hθ(x)=θ₀+θ₁x képlet tetszőleges valós becslést adhat.", "The hypothesis θ₀+θ₁x can output any real-valued prediction."],
      ["A θ₁ egyváltozós esetben az egyenes meredekségét határozza meg.", "With one feature θ₁ determines the slope of the line."]
    ],
    falseFacts: [
      ["Egy bemeneti változóval a lineáris regresszió görbéje szükségszerűen kör.", "With one feature the linear regression curve is necessarily a circle."],
      ["Két bemeneti változó mellett a modell paraméterei csak θ₀ és θ₁ lehetnek.", "With two input features the model can only have θ₀ and θ₁."],
      ["A bias minden mintánál azonos a valódi y címkével.", "The bias always equals the true y label for every sample."],
      ["A lineáris regresszió alapértelmezésben kizárólag két osztály közül választ.", "Linear regression by default only chooses between two classes."],
      ["Az x jellemzők értékeit a θ paraméterek között tároljuk.", "Observed x feature values are stored in θ parameters."],
      ["A lineáris hipotézis mindig 0 és 1 közötti értéket ad.", "A linear hypothesis always outputs values between 0 and 1."]
    ],
    explanation: { hu: "A lineáris regresszió bemeneti jellemzők súlyozott összegét és eltolást használ; a geometria a változók számától függ.", en: "Linear regression uses a weighted sum of features plus an intercept; its geometry depends on the feature count." }
  }),
  createMockQuestion({
    id: "mock-linear-2",
    chapter: "linear",
    prompt: { hu: "200 beteg, 4 mért bemeneti jellemző és biasoszlop esetén mely állítások helyesek a mátrixokról?", en: "For 200 patients, four input features and a bias column, which matrix-shape statements are correct?" },
    trueFacts: [
      ["Az X alakja (200,5).", "X has shape (200,5)."],
      ["A θ paramétervektor hossza 5.", "The parameter vector θ has length 5."],
      ["A becslések Xθ vektora 200 értéket tartalmaz.", "Prediction vector Xθ contains 200 values."],
      ["Az XᵀX mátrix alakja (5,5).", "The matrix XᵀX has shape (5,5)."],
      ["Az Xᵀy vektor hossza 5, ha y hossza 200.", "Xᵀy has length 5 if y has length 200."],
      ["Az ötödik oszlopig bezárólag az X tartalmazza a bias- és jellemzőértékeket.", "X has five columns holding the intercept and four feature values."]
    ],
    falseFacts: [
      ["Az X alakja (5,200), ha a betegeket soronként tároljuk.", "X has shape (5,200) when patients are stored as rows."],
      ["A θ vektor hossza 200, mert 200 beteget mérünk.", "θ has 200 entries because we have 200 patients."],
      ["Az Xθ becslés mindig egyetlen skalár a 200 betegre együtt.", "Xθ always yields one scalar for all 200 patients."],
      ["Az XᵀX alakja (200,200).", "XᵀX has shape (200,200)."],
      ["A θ vektorban tároljuk mind a 200 beteg korát.", "θ stores all 200 patients' ages."],
      ["Az X mátrixot tanítás közben a veszteség minimalizálásához folyamatosan optimalizálni kell.", "The input matrix X must be optimized during training to minimize loss."]
    ],
    explanation: { hu: "A biasoszlop hozzáadása után m=200 sor és n+1=5 oszlop van; a paraméterek és az előrejelzések alakja ezekből következik.", en: "With m=200 and n+1=5, X is 200×5, θ has five entries and predictions form a 200-vector." }
  }),
  createMockQuestion({
    id: "mock-linear-3",
    chapter: "linear",
    prompt: { hu: "Mely állítások helyesek az MSE, gradienscsökkentés, normálegyenlet és jellemzőskálázás témában?", en: "Which statements about MSE, gradient descent, the normal equation and feature scaling are correct?" },
    trueFacts: [
      ["Az MSE négyzetre emeli a becslési hibákat.", "MSE squares prediction errors."],
      ["A gradiens a paraméterek szerinti parciális deriváltakból áll.", "The gradient consists of partial derivatives with respect to parameters."],
      ["Pozitív tanulási rátánál a gradienscsökkentés a negatív gradiens irányába lép.", "With a positive learning rate gradient descent steps in the negative-gradient direction."],
      ["A normálegyenlet legkisebb négyzetes probléma közvetlen megoldására szolgálhat.", "The normal equation can solve least-squares problems directly."],
      ["A standardizálás átlagot és szórást használ.", "Standardization uses mean and standard deviation."],
      ["A min-max skálázás a minimumot és maximumot használja.", "Min-max scaling uses minimum and maximum."]
    ],
    falseFacts: [
      ["Az MSE az előjeles hibák egyszerű átlaga négyzetre emelés nélkül.", "MSE is the plain mean of signed errors without squaring."],
      ["A gradiens a tanítóhalmaz összes címkéjéből álló változatlan vektor.", "The gradient is the unchanged vector of all training labels."],
      ["A gradienscsökkentés pozitív lépésmérettel mindig a gradiens irányába emelkedik.", "With a positive step size gradient descent always steps uphill along the gradient."],
      ["A normálegyenlet tanításkor szükségszerűen több ezer SGD-iterációt végez.", "The normal equation necessarily performs thousands of SGD updates."],
      ["A min-max skálázás mindig teljesen érzéketlen a kiugró értékekre.", "Min-max scaling is always completely unaffected by outliers."],
      ["A túl nagy tanulási ráta garantálja a leggyorsabb stabil konvergenciát.", "A very large learning rate guarantees the fastest stable convergence."]
    ],
    explanation: { hu: "A veszteség egyetlen skalár értéke a tanítás célja; a gradiens, a közvetlen megoldás és a skálázás eltérő szerepet töltenek be.", en: "Loss defines the objective, gradients guide iterative updates, the normal equation is a direct solution, and scaling changes feature magnitudes." }
  })
];
