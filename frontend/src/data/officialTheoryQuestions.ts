import type { Question } from "../types";

export const officialTheoryQuestions: Question[] = [
  {
    id: "official-q1",
    topics: ["official-example", "official-theory", "hypothesis-function"],
    prompt: {
      hu: "Mik a hipotézisfüggvény (hypothesis function) bemenetei, és mi a függvény kimenete?",
      en: "What are the inputs to the hypothesis function, and what is the output (the value) of the hypothesis function?"
    },
    choices: [
      { id: "a", text: { hu: "Az x bemenet (input) alapján készít becslést.", en: "It makes a prediction from the input x." } },
      { id: "b", text: { hu: "A θ a modell megtanulandó paramétereit jelöli.", en: "θ denotes learnable model parameters." } },
      { id: "c", text: { hu: "A hθ(x) értéke lehet ŷ, vagyis a címke becslése.", en: "The value hθ(x) can be ŷ, the estimate of the label." } },
      { id: "d", text: { hu: "A hθ(x) kimenete mindig maga a valódi y címke.", en: "The output hθ(x) is always the true label y itself." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A modell a bemenetből (x), a θ paraméterekkel meghatározott hipotézisfüggvény segítségével ŷ becslést készít. A valódi címke y a tanítóadat része.",
      en: "The model uses input x and parameters θ to produce prediction ŷ. The true label y belongs to the training data."
    }
  },
  {
    id: "official-q2",
    topics: ["official-example", "official-theory", "label-format"],
    prompt: {
      hu: "Milyen formátumú lehet egy címke (label): skalár, vektor vagy mátrix?",
      en: "What can be the format of a label? (scalar, vector, matrix?)"
    },
    choices: [
      { id: "a", text: { hu: "Skalár.", en: "Scalar." } },
      { id: "b", text: { hu: "Vektor.", en: "Vector." } },
      { id: "c", text: { hu: "Mátrix.", en: "Matrix." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A kurzusban szerepelnek skalár címkék, az MLP-részben vektoros címkék, az 1. előadás objektumszegmentálási példájában pedig a pixelszintű kimenet kétdimenziós, mátrixként reprezentálható címke lehet.",
      en: "The course includes scalar labels, vector labels in the MLP material, and a pixel-level object-segmentation target in Lecture 1 that can be represented as a two-dimensional matrix label."
    }
  },
  {
    id: "official-q3",
    topics: ["official-example", "official-theory", "supervised-learning"],
    prompt: {
      hu: "Miből áll egy adatpont a felügyelt tanulásban (supervised learning)?",
      en: "What are the constituents of a data point in supervised learning?"
    },
    choices: [
      { id: "a", text: { hu: "Bemenetből (input) x.", en: "An input x." } },
      { id: "b", text: { hu: "A hozzá tartozó valódi címkéből (label) y.", en: "The corresponding true label y." } },
      { id: "c", text: { hu: "A megtanult θ paramétervektorból.", en: "The learned parameter vector θ." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "A felügyelt tanítóminta (training sample) bemenet–címke párokból, vagyis (x,y) adatpontokból áll. θ a modell paramétere, nem egy adatpont része.",
      en: "A supervised training sample consists of input–label pairs, i.e. data points (x,y). θ contains model parameters, not part of one data point."
    }
  },
  {
    id: "official-q4",
    topics: ["official-example", "official-theory", "loss"],
    prompt: {
      hu: "Mi a veszteségfüggvény (loss function) szerepe, és milyen alakú a teljes veszteség értéke?",
      en: "What is the role of the loss function, and can the value of the loss function be a scalar / vector / matrix?"
    },
    choices: [
      { id: "a", text: { hu: "Számszerűsíti, mennyire tér el a modell becslése a kívánt eredménytől.", en: "It quantifies how far the model prediction is from the desired result." } },
      { id: "b", text: { hu: "A tanítás során a veszteséget szeretnénk csökkenteni.", en: "During training we want to reduce the loss." } },
      { id: "c", text: { hu: "A teljes J veszteségérték skalár.", en: "The overall loss value J is a scalar." } },
      { id: "d", text: { hu: "A teljes J veszteségértéknek vektornak kell lennie, ha y vektor.", en: "The overall J must be a vector whenever y is a vector." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A Lecture 1 explicit kiemeli, hogy a veszteségnek egyetlen számnak, vagyis skalárnak kell lennie akkor is, ha a címke több változóból áll.",
      en: "Lecture 1 explicitly states that the loss must be a single number, i.e. a scalar, even when the label contains multiple variables."
    }
  },
  {
    id: "official-q5",
    topics: ["official-example", "official-theory", "reinforcement-learning"],
    prompt: {
      hu: "Milyen visszajelzést kapunk a környezettől megerősítéses tanulásban (reinforcement learning), és miben tér ez el a felügyelt tanulástól?",
      en: "In reinforcement learning, what form of feedback do we get from the environment? How is it different from feedback in supervised learning?"
    },
    choices: [
      { id: "a", text: { hu: "A környezet pozitív vagy negatív jutalmat (reward) adhat.", en: "The environment can provide a positive or negative reward." } },
      { id: "b", text: { hu: "A felügyelt tanulás tanítóadataiban közvetlen címkék (labels) tartoznak a bemenetekhez.", en: "Supervised learning training data provides labels associated with inputs." } },
      { id: "c", text: { hu: "Megerősítéses tanulásban minden akció után kötelezően megkapjuk a helyes y címkét.", en: "In reinforcement learning, the correct y label is necessarily provided after every action." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "A kurzus RL-példájában az agent a környezet állapotát megfigyeli, cselekszik, és a célok teljesülésétől függően jutalmat kaphat. Ez nem azonos a felügyelt tanulás közvetlen (x,y) címkézésével.",
      en: "In the course RL example, the agent observes the environment, acts, and may receive a reward depending on achieved goals. This differs from direct (x,y) labeling in supervised learning."
    }
  },
  {
    id: "official-q6",
    topics: ["official-example", "official-theory", "ml-tasks"],
    prompt: {
      hu: "Az alábbi feladatok közül melyek felügyelt (supervised), illetve felügyelet nélküli (unsupervised) tanulási feladatok a kurzus példáiban?",
      en: "Given regression, classification, clustering, dimensionality reduction, and denoising, which tasks are supervised and which are unsupervised in the course examples?"
    },
    choices: [
      { id: "a", text: { hu: "A regresszió (regression) felügyelt tanulási feladat.", en: "Regression is a supervised-learning task." } },
      { id: "b", text: { hu: "Az osztályozás (classification) felügyelt tanulási feladat.", en: "Classification is a supervised-learning task." } },
      { id: "c", text: { hu: "A klaszterezés (clustering) felügyelet nélküli tanulási feladat.", en: "Clustering is an unsupervised-learning task." } },
      { id: "d", text: { hu: "A dimenziócsökkentés (dimensionality reduction) és a zajcsökkentés (denoising) a kurzus unsupervised példái között szerepel.", en: "Dimensionality reduction and denoising appear among the course's unsupervised examples." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "A Lecture 1 regressziót és osztályozást felügyelt feladatként, a klaszterezést, dimenziócsökkentést és zajcsökkentést pedig a felügyelet nélküli tanulás példáiként tárgyalja.",
      en: "Lecture 1 treats regression and classification as supervised tasks, and clustering, dimensionality reduction, and denoising as unsupervised examples."
    }
  },
  {
    id: "official-q7",
    topics: ["official-example", "official-theory", "linear-regression"],
    prompt: {
      hu: "A lineáris regresszió (linear regression) regressziós vagy osztályozási feladatot old meg, és felügyelt vagy felügyelet nélküli módszer?",
      en: "Is linear regression used to solve regression or classification tasks? Is it a supervised or unsupervised learning method?"
    },
    choices: [
      { id: "a", text: { hu: "Regressziós feladatokra használjuk.", en: "It is used for regression tasks." } },
      { id: "b", text: { hu: "Felügyelt tanulási módszer.", en: "It is a supervised-learning method." } },
      { id: "c", text: { hu: "Alapvetően bináris osztályozásra szolgál.", en: "It is primarily for binary classification." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "A kurzus a lineáris regressziót folytonos címke becslésére szolgáló felügyelt módszerként használja.",
      en: "The course uses linear regression as a supervised method for predicting continuous labels."
    }
  },
  {
    id: "official-q8",
    topics: ["official-example", "official-theory", "logistic-regression"],
    prompt: {
      hu: "A logisztikus regresszió (logistic regression) regressziós vagy osztályozási feladatot old meg, és felügyelt vagy felügyelet nélküli módszer?",
      en: "Is logistic regression used to solve regression or classification tasks? Is it a supervised or unsupervised learning method?"
    },
    choices: [
      { id: "a", text: { hu: "Bináris osztályozásra használható.", en: "It can be used for binary classification." } },
      { id: "b", text: { hu: "Felügyelt tanulási módszer.", en: "It is a supervised-learning method." } },
      { id: "c", text: { hu: "A neve miatt folytonos regressziós célértéket becsülünk vele.", en: "Because of its name, it is used to predict a continuous regression target." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "A kurzusban a logisztikus regresszió bináris osztályozási modell.",
      en: "In this course, logistic regression is a binary-classification model."
    }
  },
  {
    id: "official-q9",
    topics: ["official-example", "official-theory", "cholesterol-example"],
    prompt: {
      hu: "200 beteg koleszterinszintjét szeretnénk megbecsülni súly, életkor, magasság és nem alapján. Mely állítások igazak?",
      en: "We want to predict cholesterol level for 200 patients from weight, age, height, and sex. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A lineáris regresszió megfelelőbb választás, mint a logisztikus regresszió.", en: "Linear regression is more suitable than logistic regression." } },
      { id: "b", text: { hu: "Négy valódi jellemző és egy eltolás mellett 5 paraméterünk van.", en: "With four real features and an intercept, there are 5 parameters." } },
      { id: "c", text: { hu: "A kurzusban ehhez a least-squares/MSE veszteséget használjuk.", en: "The course uses least-squares/MSE loss for this task." } },
      { id: "d", text: { hu: "A koleszterinszint diszkrét osztálycímke.", en: "Cholesterol level is a discrete class label." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A koleszterinszint folytonos címke, ezért regressziós feladat. Négy jellemző + θ₀ eltolás összesen öt tanulható paramétert ad.",
      en: "Cholesterol level is continuous, so this is a regression task. Four features plus intercept θ₀ give five learnable parameters."
    }
  },
  {
    id: "official-q10",
    topics: ["official-example", "official-theory", "cholesterol-example", "shapes"],
    prompt: {
      hu: "A 200 beteges lineáris regressziós példában, x₀=1 eltolásoszloppal, mely állítások igazak X-re, θ-ra és a becslésre?",
      en: "In the 200-patient linear-regression example, using an x₀=1 intercept column, which statements about X, θ, and the prediction are true?"
    },
    choices: [
      { id: "a", text: { hu: "X alakja (200,5).", en: "X has shape (200,5)." } },
      { id: "b", text: { hu: "θ 5 elemű vektor.", en: "θ is a vector with 5 elements." } },
      { id: "c", text: { hu: "Xθ 200 elemű becslési vektor.", en: "Xθ is a prediction vector with 200 elements." } },
      { id: "d", text: { hu: "Az életkorértékek X-ben vannak, nem θ-ban.", en: "Patient ages are in X, not in θ." } },
      { id: "e", text: { hu: "Tanulás közben J(θ)-t minimalizáljuk, nem X-et és nem önmagában θ nagyságát.", en: "During learning we minimize J(θ), not X and not the magnitude of θ by itself." } }
    ],
    correctIds: ["a", "b", "c", "d", "e"],
    explanation: {
      hu: "Minden beteg egy sort ad X-ben; a négy jellemző mellett az x₀=1 oszlop kezeli az eltolást. A tanítás célja a veszteség minimalizálása a paraméterek módosításával.",
      en: "Each patient contributes one row of X; the x₀=1 column handles the intercept. Training minimizes the loss by changing parameters."
    }
  },
  {
    id: "official-q11",
    topics: ["official-example", "official-theory", "cholesterol-example", "single-example"],
    prompt: {
      hu: "Egyetlen betegre alkalmazott lineáris regressziós hipotézis esetén mely állítások igazak?",
      en: "For the linear-regression hypothesis applied to a single patient, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A hθ(x) becslés skalár lehet.", en: "The prediction hθ(x) can be a scalar." } },
      { id: "b", text: { hu: "A lineáris kimenet nincs 0 és 1 közé korlátozva.", en: "The linear output is not restricted to the interval 0 to 1." } },
      { id: "c", text: { hu: "A beteg életkora az x bemenet egyik komponense.", en: "The patient's age is one component of input x." } },
      { id: "d", text: { hu: "A beteg életkora θ egyik megtanult súlya.", en: "The patient's age is one of the learned weights in θ." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Egyetlen példára egy skalár koleszterinbecslést kapunk. A beteg jellemzői x-ben vannak; θ a modell paramétereit tartalmazza.",
      en: "For one example, the model produces one scalar cholesterol prediction. Patient attributes are in x; θ contains model parameters."
    }
  },
  {
    id: "official-q12",
    topics: ["official-example", "official-theory", "linear-regression", "geometry"],
    prompt: {
      hu: "Mi a lineáris regressziós hipotézis geometriai alakja egy, illetve két bemeneti változó esetén?",
      en: "What geometric object represents the linear-regression hypothesis with one input variable and with two input variables?"
    },
    choices: [
      { id: "a", text: { hu: "Egy bemeneti változónál egyenes a 2D x–y síkon.", en: "With one input variable it is a line in the 2D x–y plane." } },
      { id: "b", text: { hu: "Két bemeneti változónál sík a 3D ábrán.", en: "With two input variables it is a plane in the 3D plot." } },
      { id: "c", text: { hu: "Két bemeneti változónál mindig kör.", en: "With two input variables it is always a circle." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "A lineáris hipotézis egy bemenetnél egyenes, két bemenetnél sík.",
      en: "A linear hypothesis is a line with one input and a plane with two inputs."
    }
  },
  {
    id: "official-q13",
    topics: ["official-example", "official-theory", "normal-equation"],
    prompt: {
      hu: "A 200 beteges least-squares feladat regularizált normálegyenleténél mely állítások igazak?",
      en: "For the regularized normal equation in the 200-patient least-squares task, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "X alakja (200,5).", en: "X has shape (200,5)." } },
      { id: "b", text: { hu: "y 200 elemű vektor.", en: "y is a vector with 200 elements." } },
      { id: "c", text: { hu: "θ 5 elemű vektor.", en: "θ is a vector with 5 elements." } },
      { id: "d", text: { hu: "A koleszterinszintek y-ban vannak.", en: "The cholesterol levels are stored in y." } },
      { id: "e", text: { hu: "Az I egységmátrix az XᵀX alakjához illeszkedik.", en: "I is an identity matrix matching the shape of XᵀX." } }
    ],
    correctIds: ["a", "b", "c", "d", "e"],
    explanation: {
      hu: "Öt paraméter esetén XᵀX 5×5-ös, így a regularizáló I is ehhez az alakhoz illeszkedik.",
      en: "With five parameters, XᵀX is 5×5, so the regularization identity matrix I matches that shape."
    }
  },
  {
    id: "official-q14",
    topics: ["official-example", "official-theory", "linear-regression", "gradient-descent"],
    prompt: {
      hu: "Lineáris regresszió és MSE esetén garantált-e, hogy elegendően kicsi lépésmérettel a gradienscsökkentés közelítőleg megtalálja a globális optimumot?",
      en: "In linear regression with the MSE loss function, are we guaranteed to approximately find the globally optimal parameters by gradient descent, given a small enough step size?"
    },
    choices: [
      { id: "a", text: { hu: "Igen, ez a kurzus állítása a konvex least-squares veszteségre.", en: "Yes, this is the course statement for the convex least-squares loss." } },
      { id: "b", text: { hu: "Nem, lineáris regressziónál mindig sok külön lokális minimum van.", en: "No, linear regression always has many separate local minima." } }
    ],
    correctIds: ["a"],
    explanation: {
      hu: "A least-squares lineáris regresszió vesztesége kvadratikus és konvex; a kurzus a megfelelően kicsi α feltételével globális optimumhoz tartó gradienscsökkentést emel ki.",
      en: "Least-squares linear-regression loss is quadratic and convex; the course states the global-optimum result with a sufficiently small step size."
    }
  },
  {
    id: "official-q15",
    topics: ["official-example", "official-theory", "mlp", "optimization"],
    prompt: {
      hu: "MLP és MSE esetén garantált-e, hogy elegendően kicsi lépésmérettel a gradienscsökkentés közelítőleg megtalálja a globális optimumot?",
      en: "In the case of a Multi-Layer Perceptron with the MSE loss function, are we guaranteed to approximately find the globally optimal parameters by gradient descent, given a small enough step size?"
    },
    choices: [
      { id: "a", text: { hu: "Nem, az MLP-re nincs ilyen általános globális optimumgarancia.", en: "No, there is no such general global-optimum guarantee for an MLP." } },
      { id: "b", text: { hu: "Igen, ugyanaz a garancia érvényes, mint least-squares lineáris regressziónál.", en: "Yes, the same guarantee holds as for least-squares linear regression." } }
    ],
    correctIds: ["a"],
    explanation: {
      hu: "A Theory Test példa ezt direkt a lineáris regressziós konvex esettel állítja szembe.",
      en: "The Theory Test example explicitly contrasts this with the convex linear-regression case."
    }
  },
  {
    id: "official-q16",
    topics: ["official-example", "official-theory", "feature-scaling"],
    prompt: {
      hu: "Mi a jellemzőskálázás (feature scaling) célja, mi történhet nélküle, és melyik tárgyalt módszer robusztusabb kevés outlierrel szemben?",
      en: "What is the purpose of feature scaling, what may happen without it, and which of min-max scaling and standardization is more robust to a small number of outliers?"
    },
    choices: [
      { id: "a", text: { hu: "A bemeneti változókat hasonló nagyságrendre hozzuk.", en: "We bring input variables to a similar order of magnitude." } },
      { id: "b", text: { hu: "Nagyon eltérő skálák esetén a veszteségfelület megnyúlhat, és a konvergencia lassú lehet.", en: "With very different scales, the loss surface can become elongated and convergence can be slow." } },
      { id: "c", text: { hu: "A kurzus szerint a standardizálás robusztusabb kevés outlierrel szemben, mint a min-max skálázás.", en: "According to the course, standardization is more robust to a small number of outliers than min-max scaling." } },
      { id: "d", text: { hu: "A jellemzőskálázás célja a y címkék 0 és 1 közé kényszerítése.", en: "Feature scaling is used to force labels y into the interval 0 to 1." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A Lecture 3 a bemeneti változók egymástól független skálázását tanítja; a min-max módszert érzékenyebbnek jelöli az outlierekre.",
      en: "Lecture 3 scales input variables independently and explicitly marks min-max scaling as more sensitive to outliers."
    }
  },
  {
    id: "official-q17",
    topics: ["official-example", "official-theory", "feature-scaling", "formula"],
    prompt: {
      hu: "A tárgyalt skálázási képletekben mely jelölések szerepét kell felismerni?",
      en: "Given one of the feature-scaling formulas discussed, which symbol roles should you be able to identify?"
    },
    choices: [
      { id: "a", text: { hu: "Min-max skálázásnál az adott jellemző minimuma és maximuma szerepel.", en: "Min-max scaling uses the minimum and maximum of the given feature." } },
      { id: "b", text: { hu: "Standardizálásnál μ az adott jellemző átlaga.", en: "In standardization, μ is the mean of the given feature." } },
      { id: "c", text: { hu: "Standardizálásnál σ az adott jellemző szórása.", en: "In standardization, σ is the standard deviation of the given feature." } },
      { id: "d", text: { hu: "Minden jellemzőt ugyanazzal a közös μ és σ értékkel kell skálázni.", en: "Every feature must be scaled using the same shared μ and σ values." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A Lecture 3 explicit kiemeli, hogy a skálázást minden bemeneti változóra külön végezzük.",
      en: "Lecture 3 explicitly states that scaling is performed independently for each input variable."
    }
  },
  {
    id: "official-q18",
    topics: ["official-example", "official-theory", "illness-example", "logistic-regression"],
    prompt: {
      hu: "100 beteg két laboreredménye alapján szeretnénk megkülönböztetni a betegeket az egészségesektől. Mely állítások igazak?",
      en: "We want to distinguish patients with a certain illness from healthy persons using two laboratory blood-test values for 100 patients. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A logisztikus regresszió megfelelő választás.", en: "Logistic regression is a suitable choice." } },
      { id: "b", text: { hu: "Két jellemző és egy eltolás mellett 3 paraméterünk van.", en: "With two features and an intercept, there are 3 parameters." } },
      { id: "c", text: { hu: "A kurzusban BCE/logisztikus veszteséget használunk.", en: "The course uses BCE/logistic loss." } },
      { id: "d", text: { hu: "Ez folytonos célértékű regressziós feladat.", en: "This is a regression task with a continuous target." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A beteg/nem beteg címke bináris, ezért a kurzus logisztikus regressziót, sigmoid kimenetet és BCE/logisztikus veszteséget társít hozzá.",
      en: "Ill/healthy is binary, so the course associates it with logistic regression, sigmoid output, and BCE/logistic loss."
    }
  },
  {
    id: "official-q19",
    topics: ["official-example", "official-theory", "illness-example", "shapes"],
    prompt: {
      hu: "A 100 beteges logisztikus regressziós példában, x₀=1 oszloppal, mely állítások igazak?",
      en: "In the 100-patient logistic-regression example, using an x₀=1 column, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "X alakja (100,3).", en: "X has shape (100,3)." } },
      { id: "b", text: { hu: "θ 3 elemű vektor.", en: "θ is a vector with 3 elements." } },
      { id: "c", text: { hu: "g(Xθ) 100 elemű becslési vektor.", en: "g(Xθ) is a prediction vector with 100 elements." } },
      { id: "d", text: { hu: "A sigmoid utáni becslések 0 és 1 közé esnek.", en: "Predictions after sigmoid lie between 0 and 1." } },
      { id: "e", text: { hu: "A laboreredmények X-ben vannak, nem θ-ban.", en: "The laboratory values are in X, not in θ." } }
    ],
    correctIds: ["a", "b", "c", "d", "e"],
    explanation: {
      hu: "A két laborértékhez jön az x₀=1 oszlop; a sigmoid minden beteg lineáris pontszámát 0 és 1 közötti becsléssé alakítja.",
      en: "The x₀=1 column is added to the two lab values; sigmoid maps each patient's linear score to a prediction between 0 and 1."
    }
  },
  {
    id: "official-q20",
    topics: ["official-example", "official-theory", "illness-example", "single-example"],
    prompt: {
      hu: "Egyetlen beteg logisztikus regressziós becslésénél mely állítások igazak?",
      en: "For logistic regression applied to a single patient, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "A sigmoid előtti lineáris érték z skalár lehet.", en: "The pre-sigmoid linear value z can be a scalar." } },
      { id: "b", text: { hu: "z tetszőleges valós szám lehet.", en: "z can be any real number." } },
      { id: "c", text: { hu: "g(z) skalár, és 0 és 1 közé esik.", en: "g(z) is a scalar and lies between 0 and 1." } },
      { id: "d", text: { hu: "A laboreredmények a θ súlyok.", en: "The laboratory values are the θ weights." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Az inputjellemzőkből és θ-ból előálló lineáris pontszám z nincs 0–1 közé korlátozva; ezt a sigmoid képezi valószínűségszerű kimenetté.",
      en: "The linear score z computed from features and θ is not restricted to 0–1; sigmoid maps it to a probability-like output."
    }
  },
  {
    id: "official-q21",
    topics: ["official-example", "official-theory", "loss-formula"],
    prompt: {
      hu: "Egy tanítóhalmazon összegzett veszteségképletben mit jelöl j és m, és milyen alakú J(Θ)?",
      en: "For a loss function summed over a training set, what do j and m represent, and is J(Θ) a scalar, vector, or matrix?"
    },
    choices: [
      { id: "a", text: { hu: "j a tanítási példákat indexeli.", en: "j indexes the training examples." } },
      { id: "b", text: { hu: "m a tanítási példák száma.", en: "m is the number of training examples." } },
      { id: "c", text: { hu: "J(Θ) skalár.", en: "J(Θ) is a scalar." } },
      { id: "d", text: { hu: "j a modell rétegeit indexeli.", en: "j indexes model layers." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A kurzus veszteségképleteiben j a példák indexe, m pedig a példák száma; a teljes célfüggvény egy skalár.",
      en: "In the course loss formulas, j indexes examples, m is the number of examples, and the overall objective is scalar."
    }
  },
  {
    id: "official-q22",
    topics: ["official-example", "official-theory", "mlp", "parameter-count"],
    prompt: {
      hu: "Egy 20 bemenetű, 10 neuronos első rétegű, egyetlen folytonos kimenetet becslő MLP-ről mely állítások igazak?",
      en: "For an MLP with 20 input variables, 10 neurons in the first layer, and one continuous output, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "Az első réteg paraméterszáma 20×10+10=210.", en: "The first layer has 20×10+10=210 parameters." } },
      { id: "b", text: { hu: "A második réteg 10×1+1=11 paramétert tartalmaz.", en: "The second layer contains 10×1+1=11 parameters." } },
      { id: "c", text: { hu: "A teljes hálózat paraméterszáma 221.", en: "The whole network has 221 parameters." } },
      { id: "d", text: { hu: "A köztes g₁ aktivációt el kell hagyni regressziónál.", en: "The intermediate activation g₁ should be omitted for regression." } },
      { id: "e", text: { hu: "A végső g₂ aktiváció regressziónál tipikusan identitás, vagy elhagyható.", en: "For regression, final activation g₂ is typically identity or can be omitted." } }
    ],
    correctIds: ["a", "b", "c", "e"],
    explanation: {
      hu: "A kurzus szerint a köztes nemlinearitás szükséges az MLP-ben. Regressziónál viszont a végső aktiváció tipikusan identitás, hogy a kimenet ne szoruljon 0–1 közé.",
      en: "The course requires intermediate nonlinearities in an MLP. For regression, the final activation is typically identity so the output is not restricted to 0–1."
    }
  },
  {
    id: "official-q23",
    topics: ["official-example", "official-theory", "activation-functions"],
    prompt: {
      hu: "Mely állítások igazak a tárgyalt aktivációs függvények (activation functions) kimeneti tartományára?",
      en: "Which statements are true about the output ranges of the activation functions discussed in the course?"
    },
    choices: [
      { id: "a", text: { hu: "A sigmoid kimenete 0 és 1 közé esik.", en: "Sigmoid outputs lie between 0 and 1." } },
      { id: "b", text: { hu: "A tanh kimenete −1 és 1 közé esik.", en: "tanh outputs lie between −1 and 1." } },
      { id: "c", text: { hu: "A ReLU negatív bemenetre 0-t ad, pozitív bemenetre a bemenetet adja vissza.", en: "ReLU outputs 0 for negative inputs and returns the input for positive inputs." } },
      { id: "d", text: { hu: "A ReLU kimenete mindig −1 és 1 közé esik.", en: "ReLU output is always between −1 and 1." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Ezek a Lecture 5–6-ban bemutatott sigmoid, tanh és ReLU alapvető tulajdonságai.",
      en: "These are the basic properties of sigmoid, tanh, and ReLU shown in Lectures 5–6."
    }
  },
  {
    id: "official-q24",
    topics: ["official-example", "official-theory", "overfitting"],
    prompt: {
      hu: "Hogyan változik várhatóan a túlillesztés (overfitting) kockázata a tanító-/tesztpéldák és a modellparaméterek számának változtatásakor?",
      en: "How is overfitting expected to change when we alter the number of training examples, test examples, or model parameters?"
    },
    choices: [
      { id: "a", text: { hu: "Kevesebb tanítási példa mellett általában súlyosabb túlillesztés várható.", en: "With fewer training examples, more severe overfitting is generally expected." } },
      { id: "b", text: { hu: "Több tanítási példa általában csökkentheti a túlillesztést.", en: "More training examples can generally reduce overfitting." } },
      { id: "c", text: { hu: "Kevesebb modellparaméter általában csökkentheti a túlillesztést.", en: "Fewer model parameters can generally reduce overfitting." } },
      { id: "d", text: { hu: "Több modellparaméter növelheti a túlillesztés kockázatát.", en: "More model parameters can increase overfitting risk." } },
      { id: "e", text: { hu: "A tesztpéldák számának csökkentése önmagában nem teszi túlillesztettebbé a már tanított modellt.", en: "Reducing the number of test examples by itself does not make the trained model more overfit." } }
    ],
    correctIds: ["a", "b", "c", "d", "e"],
    explanation: {
      hu: "A teszthalmaz az értékelésre szolgál; mérete az értékelés megbízhatóságát befolyásolja, nem a modell tanítási túlillesztésének közvetlen oka.",
      en: "The test set is used for evaluation; its size affects evaluation reliability, not the model's training overfitting directly."
    }
  },
  {
    id: "official-q25",
    topics: ["official-example", "official-theory", "early-stopping"],
    prompt: {
      hu: "Miért használunk korai leállítást (early stopping), és mikor kell megállni?",
      en: "For what reason do we use early stopping, and when should training stop according to early stopping?"
    },
    choices: [
      { id: "a", text: { hu: "A túlillesztés csökkentésére használjuk.", en: "It is used to reduce overfitting." } },
      { id: "b", text: { hu: "A validációs veszteség (validation loss) javulását figyeljük.", en: "We monitor improvement of validation loss." } },
      { id: "c", text: { hu: "Nem a tanítási veszteség első növekedése a helyes leállítási feltétel.", en: "The first increase of training loss is not the correct stopping criterion." } },
      { id: "d", text: { hu: "Csökkenő training loss és növekvő validation loss súlyosbodó overfitting jele lehet.", en: "Decreasing training loss with increasing validation loss can indicate worsening overfitting." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "A kurzus helyes early-stopping eljárása a validációs halmazt használja. A teszthalmaz bevonása a modellválasztásba adat-szivárgást okozna.",
      en: "The correct course procedure uses the validation set for early stopping. Using the test set for model selection would leak test information."
    }
  },
  {
    id: "official-q26",
    topics: ["official-example", "official-theory", "parameters", "hyperparameters"],
    prompt: {
      hu: "A neurális hálózat paramétereit és hiperparamétereit általában ugyanúgy, gradiensalapú algoritmussal tanítjuk?",
      en: "Are the parameters and hyper-parameters of a neural network usually trained with a gradient-descent-based algorithm such as SGD?"
    },
    choices: [
      { id: "a", text: { hu: "A súlyok és biasok tipikusan gradiensalapú optimalizálással tanulhatók.", en: "Weights and biases are typically learned with gradient-based optimization." } },
      { id: "b", text: { hu: "A learning rate vagy a hálózat architektúrája hiperparaméter.", en: "Learning rate or network architecture is a hyperparameter." } },
      { id: "c", text: { hu: "A hiperparamétereket a kurzusban tipikusan validációs teljesítmény alapján választjuk.", en: "In the course, hyperparameters are typically selected using validation performance." } },
      { id: "d", text: { hu: "Minden hiperparamétert szükségképpen ugyanazzal az SGD-frissítéssel tanítunk, mint a súlyokat.", en: "Every hyperparameter is necessarily learned with the same SGD update as the weights." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A modellparaméterek és hiperparaméterek szerepét a kurzus különválasztja: θ-t a tanítóhalmazon optimalizáljuk, Ψ-t validációval választjuk.",
      en: "The course separates model parameters and hyperparameters: θ is optimized on training data, while Ψ is selected using validation."
    }
  },
  {
    id: "official-q27",
    topics: ["official-example", "official-theory", "sgd", "batch-size"],
    prompt: {
      hu: "Az SGD és a mini-batch méret kapcsán mely állítások igazak a kurzus szerint?",
      en: "Which statements about SGD and mini-batch size are true according to the course?"
    },
    choices: [
      { id: "a", text: { hu: "SGD-ben a gradiens egy véletlenül kiválasztott részhalmazon, vagyis mini-batch-en is számolható.", en: "In SGD, gradients can be computed on a randomly selected subset, i.e. a mini-batch." } },
      { id: "b", text: { hu: "Nem kötelező minden frissítéshez pontosan egyetlen tanítási példát használni.", en: "It is not necessary to use exactly one training example for every update." } },
      { id: "c", text: { hu: "Kisebb mini-batch mellett nő a gradiensbecslés varianciája.", en: "A smaller mini-batch increases gradient-estimate variance." } },
      { id: "d", text: { hu: "Nagyobb mini-batch növeli a számítási és memóriaigényt.", en: "A larger mini-batch increases computational and memory requirements." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "A Lecture 5–6 mini-batch-alapú SGD-t tanít; a 6. előadás külön kiemeli, hogy nem szükségképpen egyetlen példát használunk.",
      en: "Lectures 5–6 present mini-batch-based SGD; Lecture 6 explicitly notes that it is not necessarily a single example."
    }
  },
  {
    id: "official-q28",
    topics: ["official-example", "official-theory", "backprop", "square-node"],
    prompt: {
      hu: "A számítási gráfban c=b² és grad_c=∂J/∂c. Mit terjesztünk vissza b irányába?",
      en: "Given c=b² and grad_c=∂J/∂c, what do we propagate back in the direction of b, i.e. what is grad_b?"
    },
    choices: [
      { id: "a", text: { hu: "grad_b = grad_c · 2 · b", en: "grad_b = grad_c * 2 * b" } },
      { id: "b", text: { hu: "grad_b = grad_c · 2 · c", en: "grad_b = grad_c * 2 * c" } },
      { id: "c", text: { hu: "grad_b = grad_c · c²", en: "grad_b = grad_c * c^2" } },
      { id: "d", text: { hu: "grad_b = grad_c", en: "grad_b = grad_c" } }
    ],
    correctIds: ["a"],
    explanation: {
      hu: "A lokális derivált dc/db=2b, ezért a láncszabály szerint grad_b=grad_c·2b.",
      en: "The local derivative is dc/db=2b, so by the chain rule grad_b=grad_c·2b."
    }
  },
  {
    id: "official-q29",
    topics: ["official-example", "official-theory", "backprop", "addition-node"],
    prompt: {
      hu: "A számítási gráfban c=a+b és grad_c=∂J/∂c. Mit terjesztünk vissza a és b irányába?",
      en: "Given c=a+b and grad_c=∂J/∂c, what do we propagate back in the directions of a and b?"
    },
    choices: [
      { id: "a", text: { hu: "grad_a = grad_b = grad_c", en: "grad_a = grad_b = grad_c" } },
      { id: "b", text: { hu: "grad_a = grad_c + b, grad_b = grad_c + a", en: "grad_a = grad_c + b, grad_b = grad_c + a" } },
      { id: "c", text: { hu: "grad_a = grad_c + a, grad_b = grad_c + b", en: "grad_a = grad_c + a, grad_b = grad_c + b" } }
    ],
    correctIds: ["a"],
    explanation: {
      hu: "Az összeadás lokális deriváltja mindkét bemenet szerint 1, ezért a bejövő gradiens változatlanul megy mindkét irányba.",
      en: "The local derivative of addition is 1 with respect to both inputs, so the incoming gradient is passed unchanged to both."
    }
  }
];
