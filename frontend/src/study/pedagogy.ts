import type { LocalizedText } from "../types";

export type ActiveTask = {
  prompt: LocalizedText;
  answer: LocalizedText;
};

export type MisconceptionCheck = {
  statement: LocalizedText;
  isTrue: boolean;
  explanation: LocalizedText;
};

export type PedagogyProfile = {
  sourceFocus: LocalizedText;
  prediction: LocalizedText;
  activeTask?: ActiveTask;
  misconception?: MisconceptionCheck;
};

const t = (hu: string, en: string): LocalizedText => ({ hu, en });

const p = (
  sourceHu: string,
  sourceEn: string,
  predictionHu: string,
  predictionEn: string,
  task?: [string, string, string, string],
  misconception?: [string, string, boolean, string, string]
): PedagogyProfile => ({
  sourceFocus: t(sourceHu, sourceEn),
  prediction: t(predictionHu, predictionEn),
  activeTask: task
    ? { prompt: t(task[0], task[1]), answer: t(task[2], task[3]) }
    : undefined,
  misconception: misconception
    ? {
        statement: t(misconception[0], misconception[1]),
        isTrue: misconception[2],
        explanation: t(misconception[3], misconception[4])
      }
    : undefined
});

export const pedagogyProfiles: Record<string, PedagogyProfile> = {
  "why-ml": p(
    "1. előadás — miért használunk gépi tanulást?",
    "Lecture 1 — why use machine learning?",
    "Mikor lehet jobb adatból modellt tanulni, mint minden lehetséges esethez kézzel szabályt írni?",
    "When can learning a model from data be preferable to hand-writing rules for every possible case?",
    [
      "Gondolj egy olyan feladatra, ahol a kézi szabályok száma gyorsan kezelhetetlenné válna. Mi lenne a tanulható rész?",
      "Think of a task where hand-written rules would quickly become unmanageable. What part could be learned?",
      "A kurzus motivációja szerint a gépi tanulás akkor különösen hasznos, amikor a szabályrendszer túl nagy/összetett, nincs jó explicit algoritmusunk, vagy a kívánt viselkedést példákon keresztül könnyebb megadni.",
      "In the course motivation, ML is especially useful when the rule set is too large/complex, no good explicit algorithm is known, or desired behavior is easier to specify through examples."
    ]
  ),

  "data-point": p(
    "1. előadás + Theory Test példa — felügyelt tanítási minta",
    "Lecture 1 + Theory Test example — supervised training sample",
    "Egy beteg életkora és koleszterinszintje közül melyik lehet x része, és melyik lehet y, ha a koleszterinszintet becsüljük?",
    "If predicting cholesterol level, which of age and cholesterol belongs in x, and which can be y?",
    [
      "Írd fel egyetlen tanítási példát (x, y) alakban a koleszterines feladathoz.",
      "Write one training example as (x, y) for the cholesterol task.",
      "x tartalmazza a beteg bemeneti jellemzőit, például súly, életkor, magasság, nem; y a hozzá tartozó koleszterinszint.",
      "x contains patient input features such as weight, age, height, and sex; y is the corresponding cholesterol level."
    ],
    [
      "A θ modellparaméterek ugyanannak a tanítási adatpontnak a részei, mint x és y.",
      "The model parameters θ are part of the same training data point as x and y.",
      false,
      "A tanítási adatpont a bemenetet és a címkét adja. A θ paramétereket a modell tanulja meg az adatokból.",
      "A training data point provides the input and label. The model learns θ from the data."
    ]
  ),

  "hypothesis": p(
    "1. előadás + Theory Test példa — hθ(x)",
    "Lecture 1 + Theory Test example — hθ(x)",
    "Mit kap bemenetként a hθ(x), és milyen jelölést használunk a kimenetére?",
    "What does hθ(x) depend on, and what notation is used for its output?",
    [
      "Ha x rögzített, de θ megváltozik, változhat-e ŷ? Indokold egy mondatban.",
      "If x is fixed but θ changes, can ŷ change? Explain in one sentence.",
      "Igen. A hθ jelölés éppen azt fejezi ki, hogy a becslés az x bemenettől és a θ modellparaméterektől is függ.",
      "Yes. The notation hθ indicates that the prediction depends on both input x and model parameters θ."
    ],
    [
      "A hipotézisfüggvény kimenete maga a valódi címke y.",
      "The output of the hypothesis function is the true label y.",
      false,
      "A modell hθ(x)=ŷ becslést készít; y a tanítóadatból ismert valódi címke.",
      "The model produces hθ(x)=ŷ; y is the true label supplied by the training data."
    ]
  ),

  "loss": p(
    "1–2. előadás + Theory Test példa — veszteségfüggvény",
    "Lectures 1–2 + Theory Test example — loss function",
    "Miért nem elég csak azt tudni, hogy ŷ és y különbözik? Miért kell egy számszerű célfüggvény?",
    "Why is knowing that ŷ differs from y not enough? Why do we need a numeric objective?",
    [
      "A Theory Test szempontjából döntsd el: a teljes J(θ) tipikusan skalár, vektor vagy mátrix?",
      "For the Theory Test, decide whether the overall J(θ) is typically a scalar, vector, or matrix.",
      "A teljes veszteség/célfüggvény értéke skalár.",
      "The overall loss/objective value is a scalar."
    ],
    [
      "Minden gépi tanulási feladathoz ugyanazt a veszteségfüggvényt használjuk.",
      "The same loss function is used for every machine-learning task.",
      false,
      "A megfelelő veszteség a feladattól függ; a kurzus például regressziónál MSE-t, bináris osztályozásnál logisztikus/BCE-veszteséget használ.",
      "The appropriate loss depends on the task; the course uses MSE for regression and logistic/BCE loss for binary classification."
    ]
  ),

  "three-groups": p(
    "1. előadás + Theory Test példa — supervised / unsupervised / reinforcement learning",
    "Lecture 1 + Theory Test example — supervised / unsupervised / reinforcement learning",
    "Mi a legfontosabb különbség abban, milyen visszajelzésből tanul a felügyelt és a megerősítéses tanulás?",
    "What is the key difference in feedback between supervised and reinforcement learning?",
    [
      "Nevezd meg emlékezetből a kurzus három fő gépi tanulási csoportját.",
      "Name the three main machine-learning groups from the course from memory.",
      "Felügyelt tanulás (supervised learning), felügyelet nélküli tanulás (unsupervised learning), megerősítéses tanulás (reinforcement learning).",
      "Supervised learning, unsupervised learning, and reinforcement learning."
    ],
    [
      "Megerősítéses tanulásban minden lépéshez ugyanúgy megkapjuk a helyes y címkét, mint felügyelt tanulásban.",
      "In reinforcement learning, every step provides the correct y label just like supervised learning.",
      false,
      "A Theory Test külön rákérdez a visszajelzés különbségére; a két tanulási helyzet nem azonos címke-visszajelzést használ.",
      "The Theory Test explicitly asks about the difference in feedback; the two learning settings do not use the same label feedback."
    ]
  ),

  "tasks": p(
    "1. előadás + Theory Test példa — regresszió, osztályozás és unsupervised feladatok",
    "Lecture 1 + Theory Test example — regression, classification, and unsupervised tasks",
    "Melyikből tudod gyorsabban eldönteni, hogy regresszió vagy osztályozás: a bemenet típusából vagy a címke természetéből?",
    "What tells you more directly whether a supervised task is regression or classification: input type or label type?",
    [
      "Sorold két csoportba: regression, classification, clustering, dimensionality reduction, denoising.",
      "Split these into two groups: regression, classification, clustering, dimensionality reduction, denoising.",
      "A mintakérdések kerete szerint regression és classification felügyelt; clustering, dimensionality reduction és denoising felügyelet nélküli feladatként szerepelnek.",
      "In the example-question framing, regression and classification are supervised; clustering, dimensionality reduction, and denoising are listed as unsupervised tasks."
    ]
  ),

  "regression-linear-hypothesis": p(
    "2. előadás + Theory Test példa — lineáris regresszió",
    "Lecture 2 + Theory Test example — linear regression",
    "Ha a címke koleszterinszint, miért lineáris regresszió a természetesebb választás a logisztikus regressziónál?",
    "If the label is cholesterol level, why is linear regression more natural than logistic regression?",
    [
      "Egyetlen x bemenetnél mondd meg, milyen geometriai objektumot rajzol a lineáris hipotézis az x–y síkon.",
      "With one input x, identify the geometric object represented by the linear hypothesis in the x–y plane.",
      "Egy egyenest.",
      "A line."
    ],
    [
      "A lineáris regresszió a kurzusban osztályozási módszer.",
      "Linear regression is a classification method in the course.",
      false,
      "A kurzus és a Theory Test példa regressziós, folytonos címkés feladathoz társítja.",
      "The course and Theory Test example associate it with regression and continuous labels."
    ]
  ),

  "multivariate-geometry": p(
    "2–3. előadás + Theory Test példa — többváltozós lineáris regresszió",
    "Lectures 2–3 + Theory Test example — multivariate linear regression",
    "Ha 4 valódi bemeneti jellemzőnk van és külön eltolást is használunk, hány tanulható paraméter kell?",
    "With 4 real input features plus an intercept, how many learnable parameters are needed?",
    [
      "Két valódi bemeneti változó esetén milyen geometriai objektum a lineáris hipotézis a 3D bemenet–címke ábrán?",
      "With two real input variables, what geometric object is the linear hypothesis in the 3D input–label plot?",
      "Egy sík.",
      "A plane."
    ],
    [
      "A beteg életkora a θ paramétervektor egyik eleme.",
      "The patient's age is one element of θ.",
      false,
      "Az életkor bemeneti adat, tehát X/x része; θ a megtanulandó modellparamétereket tartalmazza.",
      "Age is input data, so it belongs in X/x; θ contains the learned model parameters."
    ]
  ),

  "matrix-form": p(
    "3–4. előadás + Theory Test példa — Xθ és alakok",
    "Lectures 3–4 + Theory Test example — Xθ and shapes",
    "200 beteg, 4 valódi jellemző és eltolás esetén milyen alakú X és θ?",
    "For 200 patients, 4 real features, and an intercept, what are the shapes of X and θ?",
    [
      "Számold végig az alakokat: X∈R^(200×5), θ∈R^5. Mi lesz Xθ alakja?",
      "Track the shapes: X∈R^(200×5), θ∈R^5. What is the shape of Xθ?",
      "200 elemű becslési vektor, vagyis egy becslés minden beteghez.",
      "A prediction vector with 200 elements, one prediction per patient."
    ],
    [
      "Az x₀=1 segédoszlop egy ötödik mért betegjellemző.",
      "The x₀=1 helper column is a fifth measured patient feature.",
      false,
      "Az x₀=1 technikai segédváltozó, amellyel az eltolás θ₀ ugyanabba a mátrixos szorzásba kerül.",
      "x₀=1 is a helper variable that lets intercept θ₀ participate in the same matrix multiplication."
    ]
  ),

  "least-squares": p(
    "2. előadás + Theory Test példa — least squares / MSE",
    "Lecture 2 + Theory Test example — least squares / MSE",
    "Mi történne, ha a pozitív és negatív becslési hibákat négyzetre emelés nélkül egyszerűen összeadnánk?",
    "What could happen if positive and negative prediction errors were simply added without squaring?",
    [
      "A kurzus képletében az m és a j mit jelöl?",
      "In the course formula, what do m and j denote?",
      "m a tanítási példák száma, j pedig a példákat indexeli a szummában.",
      "m is the number of training examples and j indexes examples in the sum."
    ],
    [
      "A tárgyban használt MSE-képlet előfaktora pontosan 1/m.",
      "The MSE formula used in the course has exactly a 1/m prefactor.",
      false,
      "A kurzus a least-squares veszteséget 1/(2m)·Σ(error²) alakban írja, és ezt nevezi MSE lossnak.",
      "The course writes the least-squares loss as 1/(2m)·Σ(error²) and calls it MSE loss."
    ]
  ),

  "gradient": p(
    "2–3. előadás — parciális derivált és gradiens",
    "Lectures 2–3 — partial derivatives and gradient",
    "Ha θ₀ és θ₁ is változtatható, hogyan foglalnád egyetlen objektumba J mindkét paraméter szerinti érzékenységét?",
    "If both θ₀ and θ₁ can change, how would you collect J's sensitivities to both parameters into one object?",
    [
      "A gradiens a legmeredekebb növekedés vagy csökkenés irányába mutat?",
      "Does the gradient point toward steepest increase or steepest decrease?",
      "A legmeredekebb növekedés irányába; ezért gradienscsökkentéskor a negatív irányába lépünk.",
      "Toward steepest increase; gradient descent therefore steps in the negative-gradient direction."
    ],
    [
      "A gradiens maga a gradienscsökkentés lépésiránya.",
      "The gradient itself is the gradient-descent step direction.",
      false,
      "A gradiens a növekedés irányát adja. A csökkentéshez −∇J irányba lépünk.",
      "The gradient gives the direction of increase. Descent moves along −∇J."
    ]
  ),

  "gradient-descent": p(
    "2–3. előadás + Theory Test példa — gradient descent",
    "Lectures 2–3 + Theory Test example — gradient descent",
    "A θ := θ − α∇J(θ) képletben melyik rész mondja meg az irányt, és melyik a lépés nagyságát?",
    "In θ := θ − α∇J(θ), which part determines direction and which controls step size?",
    [
      "Miért szerepel mínuszjel a frissítésben?",
      "Why is there a minus sign in the update?",
      "Mert ∇J a legmeredekebb növekedés felé mutat; a veszteség csökkentéséhez az ellenkező irányba kell lépni.",
      "Because ∇J points toward steepest increase; to reduce loss we move in the opposite direction."
    ],
    [
      "Lineáris regresszió + MSE esetén bármilyen nagy α mellett garantált a globális optimum.",
      "For linear regression + MSE, the global optimum is guaranteed for any arbitrarily large α.",
      false,
      "A Theory Test explicit feltétele a megfelelően kicsi lépésméret.",
      "The Theory Test explicitly conditions the guarantee on a sufficiently small step size."
    ]
  ),

  "feature-scaling": p(
    "3. előadás + Theory Test példa — feature scaling",
    "Lecture 3 + Theory Test example — feature scaling",
    "Mi történik a veszteség kontúrjaival, ha az input változók nagyságrendje nagyon eltér?",
    "What happens to the loss contours when input variables differ greatly in magnitude?",
    [
      "Hasonlítsd össze: min-max scaling és standardization. Melyik érzékenyebb kevés outlierre a kurzus szerint?",
      "Compare min-max scaling and standardization. Which is more sensitive to a small number of outliers according to the course?",
      "A min-max scaling érzékenyebb az outlierekre.",
      "Min-max scaling is more sensitive to outliers."
    ],
    [
      "A feature scaling célja a címkék y átskálázása ugyanarra a nagyságrendre.",
      "The purpose of feature scaling is to rescale labels y to the same order of magnitude.",
      false,
      "A bemeneti változókat skálázzuk, egymástól függetlenül, hogy a gradienscsökkentés kedvezőbb veszteségfelületen haladjon.",
      "The input variables are scaled independently to give gradient descent a better-conditioned loss surface."
    ]
  ),

  "normal-equation": p(
    "4. előadás + Theory Test példa — normal equation",
    "Lecture 4 + Theory Test example — normal equation",
    "Mi a lényegi különbség a normálegyenlet és a gradienscsökkentés között a least-squares lineáris regressziónál?",
    "What is the key difference between the normal equation and gradient descent for least-squares linear regression?",
    [
      "A regularizált képletben milyen alakú az I, ha θ öt elemű?",
      "In the regularized formula, what is the shape of I if θ has five elements?",
      "5×5-ös egységmátrix, vagyis az XᵀX alakjához illeszkedik.",
      "A 5×5 identity matrix, matching the shape of XᵀX."
    ],
    [
      "A normálegyenlet levezetése része a kurzus vizsgakövetelményének.",
      "Deriving the normal equation is part of the course requirement.",
      false,
      "A 4. előadás explicit jelzi, hogy a normálegyenlet levezetése kimarad a kurzusból.",
      "Lecture 4 explicitly states that derivation of the normal equation is omitted."
    ]
  ),

  "binary-classification": p(
    "Theory Test példa + 4–5. előadás — bináris osztályozás",
    "Theory Test example + Lectures 4–5 — binary classification",
    "Két laborértékből beteg/nem beteg címkét becsülünk. Miért logisztikus, nem lineáris regresszió a megfelelő kurzusbeli választás?",
    "We predict ill/healthy from two lab values. Why is logistic rather than linear regression the course-appropriate choice?",
    [
      "100 beteg, 2 valódi jellemző és eltolás esetén hány paramétere van a logisztikus regressziónak?",
      "For 100 patients, 2 real features, and an intercept, how many parameters does logistic regression have?",
      "3 paraméter: két súly és egy eltolás.",
      "3 parameters: two weights and one intercept/bias."
    ],
    [
      "A logisztikus regresszió a neve miatt regressziós feladat megoldására szolgál ebben a tananyagban.",
      "Because of its name, logistic regression is used for regression tasks in this course.",
      false,
      "A Theory Test példa bináris osztályozási módszerként kezeli.",
      "The Theory Test example treats it as a binary-classification method."
    ]
  ),

  "sigmoid": p(
    "5. előadás + Theory Test példa — sigmoid",
    "Lecture 5 + Theory Test example — sigmoid",
    "Ha z tetszőleges valós szám lehet, milyen tartományba képezi a sigmoid?",
    "If z can be any real number, what range does sigmoid map it into?",
    [
      "Mi a sigmoid értéke z=0-nál, és miért fontos ez a döntési határhoz?",
      "What is sigmoid at z=0, and why is that important for the decision boundary?",
      "g(0)=0,5; ezért 0,5-ös küszöbnél a döntési határ a z=0 helyekhez tartozik.",
      "g(0)=0.5; therefore with a 0.5 threshold the decision boundary corresponds to z=0."
    ],
    [
      "A sigmoid előtti z érték is csak 0 és 1 között lehet.",
      "The pre-sigmoid value z must also lie between 0 and 1.",
      false,
      "z lehet tetszőleges valós szám; a sigmoid kimenete kerül 0 és 1 közé.",
      "z may be any real number; the sigmoid output is mapped between 0 and 1."
    ]
  ),

  "logistic-hypothesis": p(
    "5. előadás + Theory Test példa — logistic hypothesis",
    "Lecture 5 + Theory Test example — logistic hypothesis",
    "A logisztikus modell melyik része lineáris, és melyik teszi a kimenetet 0–1 közé?",
    "Which part of the logistic model is linear, and which part maps the output to 0–1?",
    [
      "100×3-as X és 3 elemű θ esetén milyen alakú Xθ, majd g(Xθ)?",
      "With X shaped 100×3 and θ having 3 elements, what are the shapes of Xθ and then g(Xθ)?",
      "Mindkettő 100 elemű becslési vektor; a sigmoid elemenként alkalmazható.",
      "Both are prediction vectors with 100 elements; sigmoid is applied elementwise."
    ],
    [
      "Tanulás közben a sigmoid g függvényt akarjuk minimalizálni.",
      "During learning we want to minimize the sigmoid function g.",
      false,
      "A veszteségfüggvényt minimalizáljuk a modellparaméterek változtatásával; nem magát g-t.",
      "We minimize the loss by changing model parameters; we do not minimize g itself."
    ]
  ),

  "decision-boundary": p(
    "5. előadás + Theory Test példa — decision boundary",
    "Lecture 5 + Theory Test example — decision boundary",
    "0,5-ös klasszifikációs küszöbnél milyen z érték választja el a két osztályt?",
    "With a 0.5 classification threshold, what z value separates the two classes?",
    [
      "Két bemeneti változónál milyen geometriai objektum a logisztikus regresszió döntési határa?",
      "With two input variables, what geometric object is the logistic-regression decision boundary?",
      "Egy egyenes az x₁–x₂ síkon; általánosabban lineáris döntési felület/hipersík.",
      "A line in the x₁–x₂ plane; more generally a linear decision surface/hyperplane."
    ],
    [
      "A sigmoid görbéje maga a kétváltozós bemeneti tér döntési határa.",
      "The sigmoid curve itself is the decision boundary in the two-feature input space.",
      false,
      "A döntési határ az input tér azon pontjainak halmaza, ahol a küszöb teljesül; 0,5 esetén z=0.",
      "The decision boundary is the set of input-space points at the threshold; for 0.5, z=0."
    ]
  ),

  "binary-cross-entropy": p(
    "5. előadás + Theory Test példa — logistic loss / BCE",
    "Lecture 5 + Theory Test example — logistic loss / BCE",
    "Ha y=1, a BCE melyik logaritmikus tagja marad meg? És ha y=0?",
    "If y=1, which logarithmic term remains in BCE? What about y=0?",
    [
      "Töltsd ki: y=1 esetén L=____; y=0 esetén L=____.",
      "Fill in: when y=1, L=____; when y=0, L=____.",
      "y=1: L=−log(h). y=0: L=−log(1−h).",
      "y=1: L=−log(h). y=0: L=−log(1−h)."
    ],
    [
      "A BCE természetes választás a kurzus lineáris regressziós, folytonos címkés példájához.",
      "BCE is the natural choice for the course's continuous-label linear-regression example.",
      false,
      "A kurzus BCE/logisztikus veszteséget bináris osztályozáshoz, MSE-t regresszióhoz társít.",
      "The course associates BCE/logistic loss with binary classification and MSE with regression."
    ]
  ),

  "convex-logistic": p(
    "logisztikus regresszió optimalizálási tulajdonsága a tananyagban",
    "optimization property of logistic regression in the course",
    "Miért fontos külön kezelni a logisztikus veszteséget és a sigmoid + MSE kombinációt?",
    "Why is it important to distinguish logistic loss from a sigmoid + MSE combination?",
    [
      "Milyen optimumgarancia különbözteti meg a kurzusban a konvex lineáris/logisztikus eseteket az MLP-től?",
      "What optimum guarantee distinguishes the convex linear/logistic cases from an MLP in the course?",
      "A konvex célfüggvényeknél megfelelő optimalizálási feltételek mellett nem a rossz lokális minimumok jelentik a fő problémát; MLP-nél a Theory Test nem ad globális optimumgaranciát.",
      "For convex objectives under suitable optimization conditions, bad local minima are not the issue; for an MLP the Theory Test gives no global-optimum guarantee."
    ]
  ),

  "generalization": p(
    "4–5. előadás — generalization",
    "Lectures 4–5 — generalization",
    "Ha egy modell a tanítóhalmazon kiváló, de új példákon gyenge, teljesítette-e a tanulás valódi célját?",
    "If a model is excellent on the training set but poor on new examples, has it achieved the real learning objective?",
    [
      "Fogalmazd meg egy mondatban, mit jelent az általánosítás.",
      "Define generalization in one sentence.",
      "A modell képessége arra, hogy korábban nem látott adatokon is jól becsüljön/teljesítsen.",
      "The model's ability to perform/predict well on previously unseen data."
    ]
  ),

  "underfit-overfit": p(
    "4. előadás + Theory Test példa — underfitting / overfitting",
    "Lecture 4 + Theory Test example — underfitting / overfitting",
    "Melyik mintázat utal inkább túlillesztésre: magas train és magas evaluation loss, vagy csökkenő train és romló evaluation loss?",
    "Which pattern suggests overfitting more strongly: high train and high evaluation loss, or falling train loss with worsening evaluation loss?",
    [
      "Párosítsd: underfitting és overfitting — melyiknél túl kicsi, illetve túl nagy a modell kifejezőereje a feladathoz képest?",
      "Match underfitting and overfitting to insufficient versus excessive model expressiveness for the available task/data.",
      "Underfitting: túl egyszerű modell. Overfitting: a modell a tanítóhalmaz sajátosságait túl pontosan megtanulhatja, és romlik az általánosítás.",
      "Underfitting: model too simple. Overfitting: the model can learn training-set specifics too precisely and generalization degrades."
    ]
  ),

  "risk-factors": p(
    "4. előadás + Theory Test példa — overfitting risk factors",
    "Lecture 4 + Theory Test example — overfitting risk factors",
    "Mi növeli inkább a túlillesztés kockázatát: több tanulható paraméter vagy több tanítási példa?",
    "Which is more likely to increase overfitting risk: more learnable parameters or more training examples?",
    [
      "A Theory Test alapján döntsd el: a tesztpéldák számának csökkentése önmagában súlyosabbá teszi-e a betanított modell túlillesztését?",
      "According to the Theory Test framing, does reducing the number of test examples by itself make the trained model overfit more severely?",
      "Nem ez a modell túlillesztésének oka; a test set az értékelésre szolgál, nem a modell tanítására.",
      "That is not the cause of model overfitting; the test set is for evaluation, not model training."
    ]
  ),

  "three-way-split": p(
    "5. előadás — training / validation / test, helyes modellválasztási eljárás",
    "Lecture 5 — training / validation / test, correct model-selection procedure",
    "Melyik halmaz tanítja θ-t, melyik választ Ψ-t, és melyik marad a végső független értékeléshez?",
    "Which set trains θ, which selects Ψ, and which remains for final independent evaluation?",
    [
      "Rendeld szerephez: training, validation, test.",
      "Assign roles to training, validation, and test.",
      "Training → modellparaméterek θ. Validation → hiperparaméterek/modellválasztás. Test → végső értékelés.",
      "Training → model parameters θ. Validation → hyperparameters/model selection. Test → final evaluation."
    ],
    [
      "A test setet minden hiperparaméter-konfiguráció után felhasználjuk a következő konfiguráció kiválasztására.",
      "The test set is used after every hyperparameter configuration to choose the next one.",
      false,
      "A helyes eljárásban a validation set irányítja a modellválasztást; a test set a végső értékeléshez marad.",
      "In the correct procedure the validation set guides model selection; the test set is reserved for final evaluation."
    ]
  ),

  "hyperparameters": p(
    "5. előadás + Theory Test példa — θ vs Ψ",
    "Lecture 5 + Theory Test example — θ vs Ψ",
    "A learning rate és a neurális hálózat rétegszáma θ része vagy hiperparaméter?",
    "Are learning rate and number of neural-network layers part of θ or hyperparameters?",
    [
      "Sorolj két modellparamétert és két hiperparamétert a tananyagból.",
      "Give two model parameters and two hyperparameters from the course.",
      "Példa modellparaméterek: weights, biases / θ. Példa hiperparaméterek: learning rate, polynomial degree vagy network architecture, illetve az iterációk száma early stoppingnál.",
      "Example model parameters: weights, biases / θ. Example hyperparameters: learning rate, polynomial degree or network architecture, and number of iterations for early stopping."
    ],
    [
      "A neurális hálózat hiperparamétereit tipikusan ugyanazzal a gradient descent algoritmussal tanítjuk, mint a weights értékeit.",
      "Neural-network hyperparameters are typically trained by the same gradient-descent algorithm as the weights.",
      false,
      "A Theory Test külön megkülönbözteti a gradient-based módon tanult modellparamétereket és a validációval választott hiperparamétereket.",
      "The Theory Test distinguishes gradient-trained model parameters from hyperparameters selected using validation."
    ]
  ),

  "l2": p(
    "4. előadás — L2 regularization",
    "Lecture 4 — L2 regularization",
    "Miért csökkentheti a modell túlzott rugalmasságát, ha a nagy paraméterértékeket plusz költséggel büntetjük?",
    "Why can penalizing large parameter values reduce excessive model flexibility?",
    [
      "A kurzus regularizációs tagjában mit szabályoz λ?",
      "What does λ control in the course's regularization term?",
      "A predikciós veszteség és a paraméterbüntetés közötti erősséget/súlyt.",
      "The strength/weight of the parameter penalty relative to prediction loss."
    ]
  ),

  "early-stopping": p(
    "5. előadás + Theory Test példa — early stopping",
    "Lecture 5 + Theory Test example — early stopping",
    "Melyik görbét kell figyelni a helyes early stopping döntéshez: J_train vagy J_val?",
    "Which curve should guide the correct early-stopping decision: J_train or J_val?",
    [
      "Ha J_train tovább csökken, de J_val emelkedni kezd, mit jelez ez?",
      "If J_train keeps decreasing while J_val begins to rise, what does that indicate?",
      "A túlillesztés súlyosbodásának jele; a validációs teljesítmény már romlik.",
      "A sign of worsening overfitting; validation performance is already degrading."
    ],
    [
      "Early stoppingnál akkor kell megállni, amikor a training loss először emelkedni kezd.",
      "With early stopping, training should stop when training loss first starts increasing.",
      false,
      "A helyes kurzuseljárás a validation loss javulását figyeli.",
      "The correct course procedure monitors improvement of validation loss."
    ]
  ),

  "solutions-summary": p(
    "4. előadás — overfitting kezelése",
    "Lecture 4 — handling overfitting",
    "Emlékezetből hány fő overfitting-kezelési megoldást sorol fel a kurzus?",
    "From memory, how many main approaches to handling overfitting does the course list?",
    [
      "Sorold fel a négyet.",
      "List all four.",
      "Egyszerűbb modell; több tanítóadat; regularizáció, például L2; early stopping.",
      "Simpler model; more training data; regularization such as L2; early stopping."
    ]
  ),

  "artificial-neuron": p(
    "5. előadás — artificial neuron",
    "Lecture 5 — artificial neuron",
    "Mi történik egy neuronban az aktivációs függvény előtt?",
    "What happens inside a neuron before the activation function?",
    [
      "Egészítsd ki: lineáris/súlyozott összeg + eltolás → ____.",
      "Complete: weighted/linear sum + bias → ____.",
      "Aktivációs függvény g(·), amelyből a neuron kimenete lesz.",
      "Activation function g(·), producing the neuron's output."
    ],
    [
      "Ha g sigmoid, a kurzus szerint a mesterséges neuron többváltozós logisztikus regresszióként értelmezhető.",
      "If g is sigmoid, the course says the artificial neuron can be interpreted as multivariate logistic regression.",
      true,
      "Ezt az 5. előadás explicit kimondja.",
      "Lecture 5 states this explicitly."
    ]
  ),

  "single-neuron-limit": p(
    "5–6. előadás — single neuron and linear decision surface",
    "Lectures 5–6 — single neuron and linear decision surface",
    "Mi a döntő korlátja egyetlen sigmoid neuronnak két bemeneti változó esetén?",
    "What is the decisive limitation of a single sigmoid neuron with two input variables?",
    [
      "El tud-e választani egy lineárisan nem szeparálható mintát egyetlen egyenes döntési határral?",
      "Can it separate a linearly inseparable pattern with one straight decision boundary?",
      "Nem. Egyetlen neuron lineáris döntési felületet ad.",
      "No. A single neuron gives a linear decision surface."
    ]
  ),

  "fully-connected": p(
    "5–6. előadás — fully connected / dense layers",
    "Lectures 5–6 — fully connected / dense layers",
    "Mit jelent szó szerint, hogy egy réteg fully connected?",
    "What does fully connected literally mean for a layer?",
    [
      "Ha 3 bemenet és 2 neuron van a következő rétegben, hány súlykapcsolat van az eltolások nélkül?",
      "With 3 inputs and 2 neurons in the next layer, how many weight connections are there before biases?",
      "3×2=6 súly.",
      "3×2=6 weights."
    ]
  ),

  "parameter-count": p(
    "Theory Test példa + 5–6. előadás — MLP parameter count",
    "Theory Test example + Lectures 5–6 — MLP parameter count",
    "20 input → 10 hidden neuron → 1 output esetén melyik két tagból áll az első réteg paraméterszáma?",
    "For 20 inputs → 10 hidden neurons → 1 output, what two terms make up the first-layer parameter count?",
    [
      "Számold ki az első réteg és a teljes hálózat paraméterszámát.",
      "Compute the first-layer and total network parameter counts.",
      "Első réteg: 20×10 + 10 = 210. Második réteg: 10×1 + 1 = 11. Összesen 221.",
      "First layer: 20×10 + 10 = 210. Second layer: 10×1 + 1 = 11. Total 221."
    ],
    [
      "A bias értékek nem számítanak tanulható paraméternek.",
      "Bias values are not learnable parameters.",
      false,
      "Minden kimeneti neuronhoz tartozó bias is tanulható paraméter.",
      "Each output neuron's bias is also a learnable parameter."
    ]
  ),

  "two-layer-hypothesis": p(
    "5–6. előadás — two-layer MLP hypothesis",
    "Lectures 5–6 — two-layer MLP hypothesis",
    "A h(x)=g₂(W₂g₁(W₁x+b₁)+b₂) kifejezésben mi az első réteg kimenete?",
    "In h(x)=g₂(W₂g₁(W₁x+b₁)+b₂), what is the output of the first layer?",
    [
      "Miért kell köztes nemlinearitás az MLP-ben?",
      "Why is an intermediate nonlinearity needed in an MLP?",
      "A kurzus szerint az intermediate activation functions/nonlinearities szükségesek az MLP kifejezőerejéhez; pusztán egymásra rakott lineáris transzformációk nem adják ezt a pluszt.",
      "The course states that intermediate activation functions/nonlinearities are needed for MLP expressiveness; stacking only linear transformations does not provide that added expressive power."
    ]
  ),

  "activation-functions": p(
    "5–6. előadás + Theory Test példa — sigmoid, tanh, ReLU",
    "Lectures 5–6 + Theory Test example — sigmoid, tanh, ReLU",
    "Melyik aktiváció kimeneti tartománya 0–1, melyiké −1–1, és melyik nullázza a negatív bemenetet?",
    "Which activation outputs 0–1, which −1–1, and which zeros negative input?",
    [
      "Nevezd meg grafikon nélkül a három függvényt ezekből a tartományokból.",
      "Identify the three functions from those ranges without looking at a graph.",
      "Sigmoid → (0,1); tanh → (−1,1); ReLU → max(0,z), tehát nemnegatív kimenet.",
      "Sigmoid → (0,1); tanh → (−1,1); ReLU → max(0,z), so nonnegative output."
    ]
  ),

  "output-by-task": p(
    "5–6. előadás + Theory Test példa — output layer by task",
    "Lectures 5–6 + Theory Test example — output layer by task",
    "Miért nem jó sigmoid kimenet egy tetszőleges életkor regressziós becslésére?",
    "Why is a sigmoid output unsuitable for predicting an arbitrary age in regression?",
    [
      "Párosítsd: regression / binary classification / multiclass classification → final activation + loss.",
      "Match regression / binary classification / multiclass classification → final activation + loss.",
      "Regression → identity/no final nonlinearity + MSE. Binary classification → sigmoid + BCE/logistic loss. Multiclass → softmax + cross-entropy.",
      "Regression → identity/no final nonlinearity + MSE. Binary classification → sigmoid + BCE/logistic loss. Multiclass → softmax + cross-entropy."
    ],
    [
      "Az MLP köztes aktivációit is el kell hagyni regressziónál, mert a kimenet folytonos.",
      "For regression, intermediate MLP activations should also be removed because the output is continuous.",
      false,
      "A kurzus a köztes nemlinearitásokat megtartja; regressziónál a legutolsó aktivációt érdemes identitásra hagyni/elhagyni.",
      "The course keeps intermediate nonlinearities; for regression the final activation is typically identity/omitted."
    ]
  ),

  "softmax": p(
    "5–6. előadás — multiclass output and softmax",
    "Lectures 5–6 — multiclass output and softmax",
    "Több osztálynál miért nem elég egyetlen 0–1 közötti skalár kimenet?",
    "For multiple classes, why is a single scalar between 0 and 1 not enough?",
    [
      "Milyen két alapvető tulajdonságot várunk a softmax kimeneti vektortól?",
      "What two basic properties do we expect from the softmax output vector?",
      "Az elemek pozitívak, és összegük 1; így osztályonkénti valószínűségként értelmezhetők.",
      "Entries are positive and sum to 1, allowing interpretation as per-class probabilities."
    ]
  ),

  "nonconvex": p(
    "Theory Test példa — MLP vs linear regression optimum guarantee",
    "Theory Test example — MLP vs linear-regression optimum guarantee",
    "Miért veszélyes a lineáris regresszió globális optimumgaranciáját automatikusan MLP-re átvinni?",
    "Why is it wrong to automatically transfer the linear-regression global-optimum guarantee to an MLP?",
    [
      "Igaz vagy hamis: MLP + MSE + elég kicsi learning rate garantálja a globális optimumot.",
      "True or false: MLP + MSE + sufficiently small learning rate guarantees the global optimum.",
      "Hamis. A Theory Test ezt explicit ellenpontként kérdezi a lineáris regressziós esettel szemben.",
      "False. The Theory Test explicitly contrasts this with the linear-regression case."
    ]
  ),

  "batch-gradient-descent": p(
    "6. előadás — batch gradient descent",
    "Lecture 6 — batch gradient descent",
    "Egyetlen paraméterfrissítés előtt a batch gradient descent a tanítóhalmaz mekkora részét használja?",
    "Before one parameter update, how much of the training set does batch gradient descent use?",
    [
      "Mi történik a loss számításával a kurzus batch GD ábráján?",
      "What happens to loss computation in the course's batch-GD slide?",
      "A veszteséget az egész tanítóhalmaz adatpontjain átlagoljuk, majd ebből számoljuk a gradienseket.",
      "Loss is averaged over the entire training set, and gradients are computed from that."
    ]
  ),

  "why-sgd": p(
    "6. előadás + Theory Test példa — SGD / mini-batch",
    "Lecture 6 + Theory Test example — SGD / mini-batch",
    "Mit nyerünk azzal, hogy az egész dataset helyett véletlen részhalmazon számolunk gradienst?",
    "What do we gain by computing gradients on a random subset instead of the full dataset?",
    [
      "A kurzus megfogalmazásában pontos vagy közelítő gradienst kapunk mini-batchből?",
      "In the course wording, do we obtain an exact or approximate gradient from a mini-batch?",
      "Közelítő gradienst, de a számítás általában sokkal gyorsabb.",
      "An approximate gradient, but usually much faster to compute."
    ],
    [
      "A Theory Test szerint az SGD definíciója szükségképpen azt jelenti, hogy minden lépésben pontosan egyetlen tanítási példát használunk.",
      "According to the Theory Test, SGD necessarily means using exactly one training example in every step.",
      false,
      "A kurzus az SGD-t véletlen részhalmaz/mini-batch alapján mutatja be; ezért az 'egy darab példa' állítás csapda.",
      "The course presents SGD using a random subset/mini-batch; therefore the 'exactly one example' statement is a trap."
    ]
  ),

  "batch-size-tradeoff": p(
    "Theory Test példa + SGD tananyag — batch size effects",
    "Theory Test example + SGD material — batch-size effects",
    "Ha csökkented a batch méretét, a gradiensbecslés varianciája várhatóan nő vagy csökken?",
    "If you decrease batch size, does gradient-estimate variance tend to increase or decrease?",
    [
      "Fogalmazd meg a fő trade-offot egy sorban.",
      "State the main trade-off in one line.",
      "Kisebb batch: olcsóbb/kevesebb adat egy frissítéshez, de zajosabb/nagyobb varianciájú gradiensbecslés. Nagyobb batch: stabilabb becslés, nagyobb számítási és memóriaigény.",
      "Smaller batch: less data/cost per update but noisier, higher-variance gradient estimate. Larger batch: more stable estimate but higher computation and memory use."
    ]
  ),

  "learning-rate-batch": p(
    "SGD tananyag — batch size és learning rate",
    "SGD material — batch size and learning rate",
    "Miért lehet problémás ugyanazt a nagy learning rate-et megtartani, ha a gradiensbecslés sokkal zajosabb lesz?",
    "Why can keeping the same large learning rate be problematic when gradient estimates become much noisier?",
    [
      "A kurzus milyen irányú learning-rate változtatást említ kis batch esetén?",
      "What learning-rate adjustment does the course mention for a small batch?",
      "Kisebb learning rate válhat szükségessé a konvergenciához.",
      "A smaller learning rate may be needed for convergence."
    ]
  ),

  "gpu-memory": p(
    "SGD tananyag — batch size gyakorlati korlátja",
    "SGD material — practical batch-size constraint",
    "Miért nem választhatunk tetszőlegesen nagy batch méretet egy nagy neurális hálózatnál?",
    "Why can we not choose an arbitrarily large batch size for a large neural network?",
    [
      "Nevezd meg a kurzusban kiemelt gyakorlati hardverkorlátot.",
      "Name the practical hardware constraint highlighted in the course.",
      "A rendelkezésre álló GPU-memória korlátozhatja a batch méretét.",
      "Available GPU memory can limit batch size."
    ]
  ),

  "sgd-variants": p(
    "SGD tananyag — optimizer variants",
    "SGD material — optimizer variants",
    "Mely optimalizálóneveket kell felismerni anélkül, hogy ebben a Theory Test blokkban a részletes képleteiket megtanulnád?",
    "Which optimizer names should you recognize without learning their detailed equations for this Theory Test block?",
    [
      "Sorolj fel legalább hármat a kurzus listájából.",
      "List at least three from the course list.",
      "SGD with Momentum, AdaGrad, Adam, Adamax, RMSprop.",
      "SGD with Momentum, AdaGrad, Adam, Adamax, RMSprop."
    ]
  ),

  "why-backprop": p(
    "6. előadás — miért kell backpropagation?",
    "Lecture 6 — why backpropagation is needed",
    "Mit kell tudnunk minden tanulható paraméterről ahhoz, hogy gradient-based módon frissítsük?",
    "What must we know for every learnable parameter in order to update it with a gradient-based method?",
    [
      "Egy w paraméter esetén melyik mennyiséget kell kiszámítani a veszteségből?",
      "For a parameter w, which quantity must be computed from the loss?",
      "∂J/∂w.",
      "∂J/∂w."
    ]
  ),

  "computational-graph": p(
    "6. előadás — computational graph",
    "Lecture 6 — computational graph",
    "Mit jelentenek a gráf csomópontjai és élei a kurzus definíciójában?",
    "What do graph nodes and edges represent in the course definition?",
    [
      "Bontsd fel fejben a J=(y−(wx+b))² kifejezést legalább három köztes műveletre.",
      "Mentally decompose J=(y−(wx+b))² into at least three intermediate operations.",
      "Például q=wx, ŷ=q+b, z=y−ŷ, J=z².",
      "For example q=wx, ŷ=q+b, z=y−ŷ, J=z²."
    ],
    [
      "A computational graph csomópontjai kizárólag a tanulható paraméterek.",
      "Computational-graph nodes are exclusively learnable parameters.",
      false,
      "A kurzusban a csomópontok elemi műveleteket reprezentálnak; a gráf köztes változókat és függőségeket is követ.",
      "In the course, nodes represent elementary operations; the graph also tracks intermediate variables and dependencies."
    ]
  ),

  "chain-rule": p(
    "6. előadás — chain rule és backpropagation",
    "Lecture 6 — chain rule and backpropagation",
    "Ha egy csomópont megkapja a kimenete szerinti gradienst, hogyan lesz ebből az inputja szerinti gradiens?",
    "If a node receives the gradient with respect to its output, how do we obtain the gradient with respect to its input?",
    [
      "Egészítsd ki: incoming gradient × ____.",
      "Complete: incoming gradient × ____.",
      "A csomópont lokális deriváltja.",
      "The node's local derivative."
    ]
  ),

  "local-rules": p(
    "6. előadás + Theory Test példa — square / addition local rules",
    "Lecture 6 + Theory Test example — square / addition local rules",
    "c=b² esetén milyen lokális derivált szorozza grad_c-t?",
    "For c=b², what local derivative multiplies grad_c?",
    [
      "Írd fel emlékezetből a két official szabályt: square és addition node.",
      "Write the two official rules from memory: square and addition node.",
      "c=b² → grad_b=grad_c·2b. c=a+b → grad_a=grad_b=grad_c.",
      "c=b² → grad_b=grad_c·2b. c=a+b → grad_a=grad_b=grad_c."
    ],
    [
      "c=b² esetén grad_b=grad_c·2c.",
      "For c=b², grad_b=grad_c·2c.",
      false,
      "A lokális derivált dc/db=2b, ezért grad_b=grad_c·2b.",
      "The local derivative is dc/db=2b, so grad_b=grad_c·2b."
    ]
  ),

  "forward-example": p(
    "6. előadás — computational graph worked example",
    "Lecture 6 — computational-graph worked example",
    "x=2, w=3, b=4, y=5 esetén számold ki előrefelé q, ŷ, z és J értékét.",
    "For x=2, w=3, b=4, y=5, compute q, ŷ, z, and J in the forward pass.",
    [
      "Ne fedd fel, amíg végig nem számoltad.",
      "Do not reveal until you have computed all values.",
      "q=wx=6; ŷ=q+b=10; z=y−ŷ=−5; J=z²=25.",
      "q=wx=6; ŷ=q+b=10; z=y−ŷ=−5; J=z²=25."
    ]
  ),

  "backward-example": p(
    "6. előadás — step-by-step backprop example",
    "Lecture 6 — step-by-step backprop example",
    "A forward example J=25 értékéből indulva mi az első nemtriviális visszafelé derivált?",
    "Starting from J=25 in the forward example, what is the first nontrivial backward derivative?",
    [
      "Számold ki ∂J/∂z, ∂J/∂ŷ, ∂J/∂b és ∂J/∂w értékét.",
      "Compute ∂J/∂z, ∂J/∂ŷ, ∂J/∂b, and ∂J/∂w.",
      "∂J/∂z=−10; ∂J/∂ŷ=10; ∂J/∂b=10; ∂J/∂w=20.",
      "∂J/∂z=−10; ∂J/∂ŷ=10; ∂J/∂b=10; ∂J/∂w=20."
    ]
  ),

  "parameter-update": p(
    "6. előadás — gradient computation vs parameter update",
    "Lecture 6 — gradient computation vs parameter update",
    "Mi a különbség aközött, hogy kiszámoltuk ∂J/∂w-t, és aközött, hogy megváltoztattuk w-t?",
    "What is the difference between computing ∂J/∂w and actually changing w?",
    [
      "Melyik lépés tartozik backprophoz és melyik gradient descenthez?",
      "Which step belongs to backprop and which to gradient descent?",
      "Backpropagation kiszámítja a gradienseket; az optimalizáló/gradienscsökkentés ezekből frissíti a paramétereket.",
      "Backpropagation computes gradients; the optimizer/gradient descent uses them to update parameters."
    ],
    [
      "A backpropagation és a gradient-descent parameter update ugyanannak a műveletnek két neve.",
      "Backpropagation and the gradient-descent parameter update are two names for the same operation.",
      false,
      "A kurzus külön lépésként kezeli a gradiens kiszámítását és a paraméterfrissítést.",
      "The course treats gradient computation and parameter updating as separate steps."
    ]
  ),

  "training-cycle": p(
    "6. előadás — teljes tanítási ciklus",
    "Lecture 6 — complete training cycle",
    "Mi a helyes sorrend: forward pass, gradient/backprop, parameter update?",
    "What is the correct order: forward pass, gradient/backprop, parameter update?",
    [
      "Mondd végig a ciklust a tanítási példa/mini-batch kiválasztásától a következő iterációig.",
      "Walk through the cycle from selecting a training example/mini-batch to the next iteration.",
      "Példa/mini-batch kiválasztása → forward számítás → loss → backprop/gradiensek → paraméterfrissítés → következő iteráció.",
      "Select example/mini-batch → forward computation → loss → backprop/gradients → parameter update → next iteration."
    ]
  ),

  "autograd": p(
    "6. előadás — PyTorch automatic differentiation",
    "Lecture 6 — PyTorch automatic differentiation",
    "Mit vesz le a programozó válláról az automatic differentiation?",
    "What does automatic differentiation remove from the programmer's manual workload?",
    [
      "Mit kell a frameworknek követnie ahhoz, hogy vissza tudja terjeszteni a gradienseket?",
      "What must the framework track in order to propagate gradients backward?",
      "A számítási gráfot: milyen műveletekből és függőségekből jött létre az eredmény.",
      "The computational graph: which operations and dependencies produced the result."
    ]
  ),

  "numpy-array-programming": p(
    "Practice video weeks 3–6 — NumPy array programming",
    "Practice videos weeks 3–6 — NumPy array programming",
    "Mi a különbség aközött, hogy Python-ciklussal elemenként dolgozol és aközött, hogy egy ndarray-en vektorizált műveletet végzel?",
    "What is the distinction between looping element by element in Python and applying a vectorized operation to an ndarray?",
    [
      "Ha a=np.arange(4), milyen shape-et vársz a*2+1 után?",
      "If a=np.arange(4), what shape do you expect after a*2+1?",
      "Ugyanazt: (4,). Az aritmetika elemenkénti, nem változtatja meg az alakot.",
      "The same: (4,). Arithmetic is elementwise and does not change the shape."
    ]
  ),

  "numpy-attributes": p(
    "Theory Test NumPy példa — shape, dtype, size, ndim",
    "Theory Test NumPy example — shape, dtype, size, ndim",
    "Melyik attribútum tuple, melyik két attribútum skalár egész, és melyik írja le az elemek adattípusát?",
    "Which attribute is a tuple, which two are scalar integers, and which describes element datatype?",
    [
      "Egy (32,5) shape-jű ndarray esetén add meg shape, ndim és size értékét.",
      "For an ndarray with shape (32,5), give shape, ndim, and size.",
      "shape=(32,5), ndim=2, size=160.",
      "shape=(32,5), ndim=2, size=160."
    ]
  ),

  "numpy-zero-shapes": p(
    "Theory Test NumPy példa — zero-length axes",
    "Theory Test NumPy example — zero-length axes",
    "Lehet-e egy ndarray shape-je (0,1,0)?",
    "Can an ndarray have shape (0,1,0)?",
    [
      "Mennyi a size egy (2,0,3) shape esetén?",
      "What is size for shape (2,0,3)?",
      "0, mert a tengelyhosszak szorzata 2·0·3=0.",
      "0, because the product of axis lengths is 2·0·3=0."
    ],
    [
      "A 0 hosszúságú tengely önmagában érvénytelen ndarray-shape-et jelent.",
      "A zero-length axis by itself makes an ndarray shape invalid.",
      false,
      "A hivatalos példák explicit megengednek 0-t tartalmazó shape-eket.",
      "The official examples explicitly allow shapes containing zero."
    ]
  ),

  "numpy-creation-reshape": p(
    "Practice video + Theory Test példa — reshape",
    "Practice video + Theory Test example — reshape",
    "Mi az az egy mennyiség, amelyet reshape nem változtathat meg?",
    "What is the one quantity reshape cannot change?",
    [
      "np.arange(4).reshape(2,-1) milyen shape-et ad?",
      "What shape does np.arange(4).reshape(2,-1) produce?",
      "(2,2). A −1 helyén a NumPy az elemszámból következteti ki a hiányzó tengelyhosszt.",
      "(2,2). NumPy infers the missing axis length at −1 from the number of elements."
    ]
  ),

  "numpy-indexing-types": p(
    "Practice video + Theory Test példa — indexing categories",
    "Practice video + Theory Test example — indexing categories",
    "Mi a gyors felismerési szabály: mikor basic és mikor advanced egy indexelés?",
    "What is the quick recognition rule for basic versus advanced indexing?",
    [
      "Sorold be: a[:,1], a[1:3,:], a[[0,2],:], a[a>0].",
      "Classify: a[:,1], a[1:3,:], a[[0,2],:], a[a>0].",
      "Az első kettő basic indexing; az integer-listás és boolean-maskos eset advanced indexing.",
      "The first two are basic indexing; integer-list and boolean-mask cases are advanced indexing."
    ]
  ),

  "numpy-basic-indexing": p(
    "Theory Test NumPy példa — basic indexing shapes",
    "Theory Test NumPy example — basic-indexing shapes",
    "Egy (32,5) arraynél mi történik a shape-pel, ha egy tengelyt integerrel indexelsz, és mi történik slice esetén?",
    "For a (32,5) array, what happens to shape when an axis is indexed by an integer versus a slice?",
    [
      "Számold ki: a[:,1], a[1,:], a[1:,:], ha a.shape=(32,5).",
      "Compute shapes of a[:,1], a[1,:], a[1:,:] when a.shape=(32,5).",
      "a[:,1]→(32,), a[1,:]→(5,), a[1:,:]→(31,5).",
      "a[:,1]→(32,), a[1,:]→(5,), a[1:,:]→(31,5)."
    ]
  ),

  "numpy-advanced-indexing": p(
    "Practice week 6 + Theory Test példa — advanced indexing and copies",
    "Practice week 6 + Theory Test example — advanced indexing and copies",
    "Mi a memória-megosztási különbség basic slice és advanced indexing között a tananyag szabálya szerint?",
    "What is the memory-sharing difference between a basic slice and advanced indexing according to the material?",
    [
      "Ha a2=a[[1,2]], majd a2[:]=99, megváltozik-e az eredeti a?",
      "If a2=a[[1,2]] and then a2[:]=99, does original a change?",
      "Nem. Az advanced indexing új arrayt/copy-t ad.",
      "No. Advanced indexing creates a new array/copy."
    ],
    [
      "Az advanced indexing view-t ad, ezért a módosítás mindig visszahat az eredeti arrayre.",
      "Advanced indexing returns a view, so changes always affect the original array.",
      false,
      "A week 6 szabály szerint advanced indexing nem ad view-t.",
      "The week 6 rule states that advanced indexing does not return a view."
    ]
  ),

  "numpy-broadcasting": p(
    "Theory Test NumPy példa — broadcasting",
    "Theory Test NumPy example — broadcasting",
    "Miért hibás a (32,5)+(32,), de működhet a (32,5)+(32,1)?",
    "Why does (32,5)+(32,) fail while (32,5)+(32,1) can work?",
    [
      "Hasonlítsd a shape-eket jobbról balra, és döntsd el: (32,5)+(1,5), (32,5)+(32,1), (32,5)+(32,).",
      "Compare shapes right-to-left and decide: (32,5)+(1,5), (32,5)+(32,1), (32,5)+(32,).",
      "Az első kettő broadcastolható (32,5)-re. A (32,) shape-et (1,32)-ként igazítjuk, így a 32 és 5 ütközik, ezért nem kompatibilis.",
      "The first two broadcast to (32,5). Shape (32,) aligns as (1,32), so 32 conflicts with 5 and is not compatible."
    ]
  ),

  "numpy-newaxis": p(
    "Theory Test NumPy példa — None / np.newaxis",
    "Theory Test NumPy example — None / np.newaxis",
    "Ha a.shape=(32,), milyen shape lesz a[:,None] és a[None,:]?",
    "If a.shape=(32,), what are the shapes of a[:,None] and a[None,:]?",
    [
      "Melyik alak illeszthető közvetlenül egy (32,5) arrayhez úgy, hogy soronként egy értéket adjunk hozzá?",
      "Which shape can be directly broadcast with a (32,5) array to add one value per row?",
      "(32,1), például a[:,None].",
      "(32,1), for example a[:,None]."
    ]
  ),

  "numpy-reductions": p(
    "Theory Test NumPy példa — reductions and axis",
    "Theory Test NumPy example — reductions and axis",
    "Egy (32,5) arrayen np.mean(a,axis=0) melyik tengelyt tünteti el, és milyen shape marad?",
    "For a (32,5) array, which axis does np.mean(a,axis=0) reduce, and what shape remains?",
    [
      "Add meg: mean(axis=0), mean(axis=1), sum() eredményének shape/típus-jellegét.",
      "Give the result shape/type character of mean(axis=0), mean(axis=1), and sum().",
      "mean(axis=0)→(5,), mean(axis=1)→(32,), sum()→skalár NumPy-érték.",
      "mean(axis=0)→(5,), mean(axis=1)→(32,), sum()→a scalar NumPy value."
    ]
  ),

  "numpy-transpose": p(
    "Theory Test NumPy példa — transpose",
    "Theory Test NumPy example — transpose",
    "Ha a.shape=(32,5), mi a.T shape-je, és mi lesz a.T.T után?",
    "If a.shape=(32,5), what is the shape of a.T, and what happens after a.T.T?",
    [
      "Írd fel a két shape-et.",
      "Write both shapes.",
      "a.T→(5,32), a.T.T→(32,5).",
      "a.T→(5,32), a.T.T→(32,5)."
    ]
  ),

  "numpy-views-copies": p(
    "Theory Test NumPy példa — view vs copy",
    "Theory Test NumPy example — view vs copy",
    "Mit jelent gyakorlatban, ha két ndarray ugyanazt az underlying memóriát osztja meg?",
    "What does it mean in practice when two ndarrays share the same underlying memory?",
    [
      "Az official példában a=np.arange(4), a2=a.reshape(2,2). Ha a2[:,:]=99, mi történik a-val?",
      "In the official example a=np.arange(4), a2=a.reshape(2,2). If a2[:,:]=99, what happens to a?",
      "Ebben a példában a reshape view/shared-memory kapcsolatot tart fenn, ezért a elemei is megváltoznak.",
      "In this example reshape maintains a view/shared-memory relationship, so a changes too."
    ],
    [
      "A boolean maskkal készített kiválasztás módosítása visszahat az eredeti arrayre.",
      "Modifying an array selected with a boolean mask changes the original array.",
      false,
      "A boolean-maskos kiválasztás advanced indexing, amely új arrayt ad.",
      "Boolean-mask selection is advanced indexing and returns a new array."
    ]
  ),

  "numpy-common-functions": p(
    "Theory Test NumPy példa — count_nonzero, any, all, unique, bincount, sort, argsort",
    "Theory Test NumPy example — count_nonzero, any, all, unique, bincount, sort, argsort",
    "Ezeknél a kérdéseknél mi a jobb stratégia: a függvény nevét memorizálni, vagy kézzel végigkövetni a konkrét array eredményét?",
    "For these questions, is it better to memorize function names or trace the concrete array result?",
    [
      "a=np.array([3,1,2]) esetén számold ki np.unique(a), np.bincount(a), np.argsort(a).",
      "For a=np.array([3,1,2]), compute np.unique(a), np.bincount(a), and np.argsort(a).",
      "np.unique(a)→[1,2,3]; np.bincount(a)→[0,1,1,1]; np.argsort(a)→[1,2,0].",
      "np.unique(a)→[1,2,3]; np.bincount(a)→[0,1,1,1]; np.argsort(a)→[1,2,0]."
    ]
  ),

  "numpy-scope": p(
    "Official Theory Test 1 example document — NumPy scope",
    "Official Theory Test 1 example document — NumPy scope",
    "Mely hetek videóanyagaiból jönnek a NumPy-kérdések, és melyik két stride-téma van explicit kizárva?",
    "Which weeks' video material supplies the NumPy questions, and which two stride topics are explicitly excluded?",
    [
      "Mondd ki pontosan a scope-ot.",
      "State the scope precisely.",
      "Weeks 3–6 'Video to watch before practice', csak NumPy; ndarray.strides és stride tricks nem része a Theory Test 1-nek.",
      "Weeks 3–6 'Video to watch before practice', NumPy only; ndarray.strides and stride tricks are excluded from Theory Test 1."
    ]
  )
};

export function pedagogyForSection(sectionId: string): PedagogyProfile | null {
  return pedagogyProfiles[sectionId] ?? null;
}
