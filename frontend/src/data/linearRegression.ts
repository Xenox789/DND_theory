import type { Lesson, Question } from "../types";

export const linearRegressionLesson: Lesson = {
  id: "linear-regression-optimization",
  title: {
    hu: "Linear Regression és optimalizáció",
    en: "Linear Regression and Optimization"
  },
  subtitle: {
    hu: "Hypothesis, least squares / MSE, gradient descent, normal equation és feature scaling",
    en: "Hypothesis, least squares / MSE, gradient descent, normal equation, and feature scaling"
  },
  source: "Lectures 2–4",
  sections: [
    {
      id: "regression-linear-hypothesis",
      title: {
        hu: "Regression és a linear hypothesis",
        en: "Regression and the linear hypothesis"
      },
      body: {
        hu: "Regression esetén a label folytonos érték. Egy input variable esetén a linear regression hypothesis: hθ(x) = θ₁x + θ₀. θ₁ a slope, θ₀ az intercept / bias. A prediction ŷ = hθ(x).",
        en: "In regression, the label is continuous. With one input variable, the linear regression hypothesis is hθ(x) = θ₁x + θ₀. θ₁ is the slope and θ₀ is the intercept / bias. The prediction is ŷ = hθ(x)."
      },
      intuition: {
        hu: "Lakásár-becslésnél x lehet az alapterület, ŷ pedig a becsült ár. θ₁ azt mondja meg, mennyit változik a becsült ár egy egységnyi x-változásra; θ₀ pedig az egyenes eltolása.",
        en: "For apartment-price prediction, x can be floor area and ŷ the predicted price. θ₁ controls how much the prediction changes per unit change in x; θ₀ shifts the line."
      },
      realWorld: {
        hu: "A modell training előtt nem tudja a megfelelő θ₀ és θ₁ értékeket. Ezeket a training data alapján kell megtalálni.",
        en: "Before training, the model does not know suitable θ₀ and θ₁ values. They must be found from the training data."
      },
      examTrap: {
        hu: "A linear regression regression method, nem classification method. A hypothesis outputja egy scalar folytonos érték lehet, és nincs sigmoid által [0,1]-re korlátozva.",
        en: "Linear regression is a regression method, not a classification method. Its hypothesis output can be a continuous scalar and is not constrained to [0,1] by a sigmoid."
      },
      formula: {
        hu: "ŷ = hθ(x) = θ₁x + θ₀",
        en: "ŷ = hθ(x) = θ₁x + θ₀"
      },
      keyTerms: [
        { term: "regression" },
        { term: "hypothesis function" },
        { term: "slope" },
        { term: "intercept", hu: "tengelymetszet" },
        { term: "bias" }
      ]
    },
    {
      id: "multivariate-geometry",
      title: {
        hu: "Univariate → multivariate linear regression",
        en: "Univariate → multivariate linear regression"
      },
      body: {
        hu: "Több input feature esetén a hypothesis minden feature-höz külön weightet használ: hθ(x) = θₙxₙ + … + θ₁x₁ + θ₀. n input variable mellett n+1 parameter van, mert θ₀ az intercept.",
        en: "With multiple input features, the hypothesis uses a separate weight for every feature: hθ(x) = θₙxₙ + … + θ₁x₁ + θ₀. With n input variables there are n+1 parameters because θ₀ is the intercept."
      },
      intuition: {
        hu: "Egy feature esetén az adatpontokat 2D-ben látjuk és a hypothesis egy egyenes. Két feature esetén az adatpontok 3D-ben vannak és a hypothesis egy sík. n feature esetén ennek általánosítása egy hyperplane.",
        en: "With one feature, data can be viewed in 2D and the hypothesis is a line. With two features, the data are in 3D and the hypothesis is a plane. With n features, the generalization is a hyperplane."
      },
      examTrap: {
        hu: "1 input variable → 2 parameters. 2 input variables → 3 parameters. Általánosan n input variable → n+1 parameters.",
        en: "1 input variable → 2 parameters. 2 input variables → 3 parameters. In general, n input variables → n+1 parameters."
      },
      formula: {
        hu: "hθ(x) = θ₀ + θ₁x₁ + … + θₙxₙ",
        en: "hθ(x) = θ₀ + θ₁x₁ + … + θₙxₙ"
      },
      keyTerms: [
        { term: "univariate" },
        { term: "multivariate" },
        { term: "hyperplane" },
        { term: "feature" },
        { term: "weight" }
      ]
    },
    {
      id: "matrix-form",
      title: {
        hu: "Matrix form és shape-ek",
        en: "Matrix form and shapes"
      },
      body: {
        hu: "A dot product formához bevezetjük az x₀ = 1 dummy variable-t. Ha m training example és n valódi input feature van, akkor az intercept oszloppal együtt X shape-je (m, n+1), θ shape-je (n+1,), és ŷ = Xθ shape-je (m,).",
        en: "For the dot-product form, we introduce the dummy variable x₀ = 1. With m training examples and n real input features, including the intercept column X has shape (m, n+1), θ has shape (n+1,), and ŷ = Xθ has shape (m,)."
      },
      intuition: {
        hu: "X minden sora egy training example. Az első oszlop csupa 1, utána következnek az adott example feature értékei. A θ vector elemei pontosan ezekhez az oszlopokhoz tartozó model parameters.",
        en: "Each row of X is one training example. The first column contains ones, followed by that example's feature values. The elements of θ are the model parameters corresponding to these columns."
      },
      examTrap: {
        hu: "A feature értékek X-ben vannak, nem θ-ban. A labels y-ban vannak. A θ a megtanulandó model parameters vector. A course későbbi összefoglalója explicit X ∈ R^(m×(n+1)), θ ∈ R^(n+1) alakot használ.",
        en: "Feature values are in X, not θ. Labels are in y. θ is the learnable model-parameter vector. The later course summary explicitly uses X ∈ R^(m×(n+1)), θ ∈ R^(n+1)."
      },
      formula: {
        hu: "x₀ := 1;   ŷ = Xθ;   X ∈ R^(m×(n+1));   θ ∈ R^(n+1);   ŷ,y ∈ R^m",
        en: "x₀ := 1;   ŷ = Xθ;   X ∈ R^(m×(n+1));   θ ∈ R^(n+1);   ŷ,y ∈ R^m"
      },
      keyTerms: [
        { term: "design matrix" },
        { term: "dummy variable" },
        { term: "dot product" },
        { term: "shape" }
      ]
    },
    {
      id: "least-squares",
      title: {
        hu: "Least squares és MSE loss",
        en: "Least squares and MSE loss"
      },
      body: {
        hu: "A least squares method a prediction és a true label különbségének négyzetét összegzi a training examples felett. A tárgyban használt loss: J(θ) = (1/(2m)) Σⱼ(hθ(x⁽ʲ⁾) − y⁽ʲ⁾)². A loss egyetlen scalar szám.",
        en: "The least-squares method sums squared differences between predictions and true labels over the training examples. The course uses J(θ) = (1/(2m)) Σⱼ(hθ(x⁽ʲ⁾) − y⁽ʲ⁾)². The loss is a single scalar."
      },
      intuition: {
        hu: "A squaring miatt a pozitív és negatív prediction error nem oltja ki egymást, és a nagyobb hibák erősebben számítanak. A course formula 1/(2m) faktort használ; a 1/2 nem változtatja meg, hol van a minimum.",
        en: "Squaring prevents positive and negative prediction errors from cancelling and gives larger errors more weight. The course formula uses the factor 1/(2m); the 1/2 does not change the location of the minimum."
      },
      examTrap: {
        hu: "j a training example indexe, m a training examples száma. J(θ) scalar, még akkor is, ha sok example-ből számoljuk.",
        en: "j indexes the training examples, and m is the number of training examples. J(θ) is a scalar even though it is computed from many examples."
      },
      formula: {
        hu: "J(θ) = 1/(2m) · Σⱼ₌₁ᵐ (hθ(x⁽ʲ⁾) − y⁽ʲ⁾)²",
        en: "J(θ) = 1/(2m) · Σⱼ₌₁ᵐ (hθ(x⁽ʲ⁾) − y⁽ʲ⁾)²"
      },
      keyTerms: [
        { term: "least squares" },
        { term: "Mean Squared Error (MSE)" },
        { term: "loss function" },
        { term: "scalar" }
      ]
    },
    {
      id: "gradient",
      title: {
        hu: "Gradient és partial derivatives",
        en: "Gradient and partial derivatives"
      },
      body: {
        hu: "A gradient vector a loss partial derivative-jeit tartalmazza minden parameter szerint. A gradient a legmeredekebb növekedés irányába mutat. Gradient descentnél ezért a gradient ellenkező irányába lépünk.",
        en: "The gradient vector contains the partial derivatives of the loss with respect to every parameter. The gradient points in the direction of steepest increase, so gradient descent moves in the opposite direction."
      },
      intuition: {
        hu: "Képzeld el a loss surface-t hegyvidékként. A gradient felfelé, a legmeredekebb emelkedés felé mutat. Ha lefelé akarunk menni, kivonjuk a gradientet.",
        en: "Imagine the loss surface as terrain. The gradient points uphill in the direction of steepest increase. To move downhill, we subtract the gradient."
      },
      examTrap: {
        hu: "Partial differentiation során egy parameter szerint deriválunk, a többit konstansként kezeljük. A gradient nem a minimum felé mutat, hanem a maximum increase irányába.",
        en: "In partial differentiation, we differentiate with respect to one parameter while treating the others as constants. The gradient does not point toward the minimum; it points toward maximum increase."
      },
      formula: {
        hu: "∇J(θ) = [∂J/∂θ₀, ∂J/∂θ₁, …]ᵀ",
        en: "∇J(θ) = [∂J/∂θ₀, ∂J/∂θ₁, …]ᵀ"
      },
      keyTerms: [
        { term: "gradient" },
        { term: "partial derivative" },
        { term: "steepest increase" }
      ]
    },
    {
      id: "gradient-descent",
      title: {
        hu: "Gradient Descent és learning rate",
        en: "Gradient Descent and learning rate"
      },
      body: {
        hu: "Gradient descent iteratívan frissíti a parameters értékeit: θ := θ − α∇J(θ). Az α a learning rate / step size, amely a lépés nagyságát skálázza.",
        en: "Gradient descent iteratively updates the parameters: θ := θ − α∇J(θ). α is the learning rate / step size and scales the size of the update."
      },
      intuition: {
        hu: "Túl kicsi α esetén sok apró lépés kell. Túl nagy α esetén átléphetjük a minimumot, oszcillálhatunk vagy nem konvergálunk.",
        en: "With an excessively small α, many tiny steps are needed. With an excessively large α, updates may overshoot the minimum, oscillate, or fail to converge."
      },
      examTrap: {
        hu: "Linear regression + MSE loss esetén a loss quadratic és convex. A lecture szerint megfelelően kicsi step size mellett gradient descenttel elérhető / közelíthető a global optimum. Ez a garancia nem vihető át általánosan egy MLP non-convex lossára.",
        en: "For linear regression with MSE, the loss is quadratic and convex. According to the lecture, with a sufficiently small step size gradient descent can reach / approximate the global optimum. This guarantee does not generally transfer to a non-convex MLP loss."
      },
      formula: {
        hu: "θ := θ − α∇J(θ)",
        en: "θ := θ − α∇J(θ)"
      },
      keyTerms: [
        { term: "gradient descent" },
        { term: "learning rate" },
        { term: "step size" },
        { term: "convex" },
        { term: "global minimum" }
      ]
    },
    {
      id: "normal-equation",
      title: {
        hu: "Normal equation: exact least-squares solution",
        en: "Normal equation: exact least-squares solution"
      },
      body: {
        hu: "Linear regression least-squares problémánál az optimal parameters egy lépésben is meghatározhatók a normal equation segítségével: θ = (XᵀX)⁻¹Xᵀy. A lecture megadja a Moore–Penrose pseudoinverse formát is: θ = X⁺y.",
        en: "For a linear-regression least-squares problem, the optimal parameters can also be obtained in one step with the normal equation: θ = (XᵀX)⁻¹Xᵀy. The lecture also gives the Moore–Penrose pseudoinverse form θ = X⁺y."
      },
      intuition: {
        hu: "Gradient descent sok iterációval közelít. A normal equation közvetlen algebrai megoldást ad erre a speciális least-squares problémára.",
        en: "Gradient descent approaches the solution iteratively. The normal equation gives a direct algebraic solution for this specific least-squares problem."
      },
      examTrap: {
        hu: "A regularized formula a lecture-ben: θ = (XᵀX + λI)⁻¹Xᵀy. I az identity matrix, amelynek shape-je megegyezik XᵀX shape-jével, tehát n+1 parameter esetén (n+1)×(n+1).",
        en: "The regularized formula in the lecture is θ = (XᵀX + λI)⁻¹Xᵀy. I is the identity matrix and has the same shape as XᵀX, so with n+1 parameters it is (n+1)×(n+1)."
      },
      formula: {
        hu: "θ = (XᵀX)⁻¹Xᵀy;   regularized: θ = (XᵀX + λI)⁻¹Xᵀy",
        en: "θ = (XᵀX)⁻¹Xᵀy;   regularized: θ = (XᵀX + λI)⁻¹Xᵀy"
      },
      keyTerms: [
        { term: "normal equation" },
        { term: "Moore-Penrose pseudoinverse" },
        { term: "identity matrix" },
        { term: "regularized least squares" }
      ]
    },
    {
      id: "feature-scaling-why",
      title: {
        hu: "Miért kell Feature Scaling?",
        en: "Why do we need Feature Scaling?"
      },
      body: {
        hu: "Feature scaling célja, hogy az input variables hasonló nagyságrendbe kerüljenek. Ha a feature-ek nagyságrendje nagyon eltér, a loss surface erősen megnyúlhat, és gradient descent konvergenciája nagyon lassú lehet.",
        en: "Feature scaling brings input variables to a similar order of magnitude. If feature magnitudes differ greatly, the loss surface can become highly elongated and gradient-descent convergence can be very slow."
      },
      intuition: {
        hu: "Egy keskeny, hosszú völgyben gradient descent könnyen cikk-cakkban halad. Hasonló feature scale mellett a contour közelebb kerül a kör alakhoz, így közvetlenebb út vezethet a minimumhoz.",
        en: "In a long, narrow valley, gradient descent can zig-zag. With similar feature scales, contours become closer to circular, allowing a more direct path toward the minimum."
      },
      examTrap: {
        hu: "Feature scalinget minden input variable-re külön végzünk. Nem a labels vagy a model parameters 'minimalizálása' történik, hanem az input feature skálák átalakítása.",
        en: "Feature scaling is performed independently for each input variable. It does not mean minimizing labels or model parameters; it transforms input-feature scales."
      },
      keyTerms: [
        { term: "feature scaling" },
        { term: "convergence" },
        { term: "order of magnitude" }
      ]
    },
    {
      id: "feature-scaling-methods",
      title: {
        hu: "Min-max scaling és standardization",
        en: "Min-max scaling and standardization"
      },
      body: {
        hu: "Min-max scaling feature-önként a [0,1] intervalba transzformál: (x − min)/(max − min). Standardization feature-önként (x − μ)/σ transzformációt használ, így a transzformált feature mean-je 0, standard deviation-je 1.",
        en: "Min-max scaling independently maps each feature to [0,1] using (x − min)/(max − min). Standardization independently uses (x − μ)/σ, giving the transformed feature mean 0 and standard deviation 1."
      },
      intuition: {
        hu: "Min-max scaling a dataset minimumát és maximumát rögzíti a két végpontra. Egy szélsőséges outlier ezért erősen összenyomhatja a többi pontot.",
        en: "Min-max scaling anchors the dataset minimum and maximum to the endpoints. An extreme outlier can therefore compress the remaining points strongly."
      },
      examTrap: {
        hu: "A lecture explicit kiemeli: min-max scaling érzékenyebb az outliers-re. A két tárgyalt módszer közül ezért standardization a robusztusabb egy kis számú outlierrel szemben.",
        en: "The lecture explicitly states that min-max scaling is more sensitive to outliers. Between the two discussed methods, standardization is therefore more robust to a small number of outliers."
      },
      formula: {
        hu: "min-max: x' = (x − min)/(max − min)   |   standardization: x' = (x − μ)/σ",
        en: "min-max: x' = (x − min)/(max − min)   |   standardization: x' = (x − μ)/σ"
      },
      keyTerms: [
        { term: "min-max scaling" },
        { term: "standardization" },
        { term: "mean", hu: "átlag" },
        { term: "standard deviation", hu: "szórás" },
        { term: "outlier" }
      ]
    }
  ]
};

export const linearRegressionQuestions: Question[] = [
  {
    id: "lr-q1",
    topics: ["linear-regression", "shapes"],
    prompt: {
      hu: "200 betegből álló training setünk van. Minden betegnél 4 feature (weight, age, height, sex) alapján cholesterol levelt becslünk linear regressionnel. Az interceptet x₀=1 oszloppal kezeljük. Mely állítások igazak?",
      en: "We have a training set of 200 patients. We predict cholesterol level with linear regression from 4 features (weight, age, height, sex), using an x₀=1 column for the intercept. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "X shape-je (200, 5).", en: "X has shape (200, 5)." } },
      { id: "b", text: { hu: "θ 5 model parametert tartalmaz.", en: "θ contains 5 model parameters." } },
      { id: "c", text: { hu: "y shape-je (200,).", en: "y has shape (200,)." } },
      { id: "d", text: { hu: "Az age értékek θ-ban találhatók.", en: "Age values are stored in θ." } },
      { id: "e", text: { hu: "Ez classification task.", en: "This is a classification task." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "4 valódi feature + az x₀=1 intercept oszlop miatt X-ben 5 oszlop van, és θ-ban 5 parameter. A 200 cholesterol label a y vectorban van. Az age X egyik feature oszlopa. A cholesterol level folytonos label, ezért regression.",
      en: "Four real features plus the x₀=1 intercept column give X five columns and θ five parameters. The 200 cholesterol labels form y. Age is a feature column in X. Cholesterol level is continuous, so this is regression."
    }
  },
  {
    id: "lr-q2",
    topics: ["linear-regression", "geometry"],
    prompt: {
      hu: "Mely geometriai állítások igazak linear regression esetén?",
      en: "Which geometric statements are true for linear regression?"
    },
    choices: [
      { id: "a", text: { hu: "1 input variable esetén a hypothesis egyenes a 2D x–y síkon.", en: "With 1 input variable, the hypothesis is a line in the 2D x–y plane." } },
      { id: "b", text: { hu: "2 input variable esetén a hypothesis sík lehet 3D-ben.", en: "With 2 input variables, the hypothesis can be a plane in 3D." } },
      { id: "c", text: { hu: "n input variable esetén a linear hypothesis hyperplane.", en: "With n input variables, the linear hypothesis is a hyperplane." } },
      { id: "d", text: { hu: "2 input variable esetén csak 2 model parameter van.", en: "With 2 input variables there are only 2 model parameters." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Az intercept miatt n input variable mellett n+1 parameter van. 1 feature → line, 2 feature → plane, általánosan hyperplane.",
      en: "Because of the intercept, n input variables require n+1 parameters. 1 feature → line, 2 features → plane, generally a hyperplane."
    }
  },
  {
    id: "lr-q3",
    topics: ["least-squares", "loss"],
    prompt: {
      hu: "A course-ban használt J(θ)=1/(2m) Σⱼ(hθ(x⁽ʲ⁾)−y⁽ʲ⁾)² loss formuláról mely állítások igazak?",
      en: "Which statements are true about the course loss formula J(θ)=1/(2m) Σⱼ(hθ(x⁽ʲ⁾)−y⁽ʲ⁾)²?"
    },
    choices: [
      { id: "a", text: { hu: "j a training examples indexe.", en: "j indexes the training examples." } },
      { id: "b", text: { hu: "m a training examples száma.", en: "m is the number of training examples." } },
      { id: "c", text: { hu: "J(θ) értéke scalar.", en: "J(θ) is a scalar." } },
      { id: "d", text: { hu: "A squared prediction errors szerepelnek benne.", en: "It contains squared prediction errors." } },
      { id: "e", text: { hu: "J(θ) shape-je mindig ugyanaz, mint X shape-je.", en: "J(θ) always has the same shape as X." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "A loss az összes example hibájából egyetlen scalar objective-et készít. j example-index, m a példák száma, és a prediction error négyzete szerepel az összegben.",
      en: "The loss combines errors from all examples into one scalar objective. j is the example index, m is the number of examples, and squared prediction error is summed."
    }
  },
  {
    id: "lr-q4",
    topics: ["gradient", "gradient-descent"],
    prompt: {
      hu: "Mely állítások igazak a gradientre és gradient descentre?",
      en: "Which statements are true about the gradient and gradient descent?"
    },
    choices: [
      { id: "a", text: { hu: "A gradient komponensei partial derivatives.", en: "The components of the gradient are partial derivatives." } },
      { id: "b", text: { hu: "A gradient a loss legmeredekebb növekedésének irányába mutat.", en: "The gradient points in the direction of steepest increase of the loss." } },
      { id: "c", text: { hu: "Gradient descentben θ := θ − α∇J(θ).", en: "Gradient descent uses θ := θ − α∇J(θ)." } },
      { id: "d", text: { hu: "A gradientet hozzá kell adni θ-hoz, hogy lefelé menjünk.", en: "The gradient must be added to θ to move downhill." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A gradient felfelé mutat, ezért descentnél kivonjuk a learning rate-tel skálázott gradientet.",
      en: "The gradient points uphill, so descent subtracts the gradient scaled by the learning rate."
    }
  },
  {
    id: "lr-q5",
    topics: ["gradient-descent", "convexity"],
    prompt: {
      hu: "Mely állítások igazak linear regression + MSE gradient descent trainingre?",
      en: "Which statements are true for gradient-descent training of linear regression with MSE?"
    },
    choices: [
      { id: "a", text: { hu: "A loss quadratic és convex.", en: "The loss is quadratic and convex." } },
      { id: "b", text: { hu: "Megfelelően kicsi step size mellett a global optimum megtalálható / közelíthető.", en: "With a sufficiently small step size, the global optimum can be found / approximated." } },
      { id: "c", text: { hu: "Túl nagy learning rate ronthatja a convergence-t.", en: "An excessively large learning rate can harm convergence." } },
      { id: "d", text: { hu: "Ugyanez a global-optimum guarantee minden MLP-re is igaz.", en: "The same global-optimum guarantee holds for every MLP." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Linear regression MSE loss convex, ezért megfelelő step size mellett gradient descent a global minimum felé konvergálhat. MLP loss általánosan nem convex, ezért ugyanez a garancia nincs.",
      en: "The MSE loss of linear regression is convex, so with an appropriate step size gradient descent can converge toward the global minimum. MLP losses are generally non-convex, so the same guarantee does not hold."
    }
  },
  {
    id: "lr-q6",
    topics: ["matrix-form", "shapes"],
    prompt: {
      hu: "Általánosan m training example és n valódi input feature esetén, ha x₀=1 intercept oszlopot használunk, mely shape-ek helyesek?",
      en: "In general, with m training examples and n real input features, using an x₀=1 intercept column, which shapes are correct?"
    },
    choices: [
      { id: "a", text: { hu: "X: (m, n+1)", en: "X: (m, n+1)" } },
      { id: "b", text: { hu: "θ: (n+1,)", en: "θ: (n+1,)" } },
      { id: "c", text: { hu: "ŷ = Xθ: (m,)", en: "ŷ = Xθ: (m,)" } },
      { id: "d", text: { hu: "y: (n+1,)", en: "y: (n+1,)" } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "X minden example-hoz egy sort és az n feature + intercept miatt n+1 oszlopot tartalmaz. Xθ ezért egy predictiont ad mind az m example-ra.",
      en: "X has one row per example and n+1 columns for n features plus intercept. Therefore Xθ produces one prediction for each of the m examples."
    }
  },
  {
    id: "lr-q7",
    topics: ["matrix-form"],
    prompt: {
      hu: "Mi az x₀=1 dummy variable szerepe?",
      en: "What is the role of the x₀=1 dummy variable?"
    },
    choices: [
      { id: "a", text: { hu: "Lehetővé teszi, hogy az intercept θ₀ is a dot product része legyen.", en: "It allows the intercept θ₀ to be included in the dot product." } },
      { id: "b", text: { hu: "Minden training example esetén az értéke 1.", en: "Its value is 1 for every training example." } },
      { id: "c", text: { hu: "Ez maga a label.", en: "It is the label itself." } },
      { id: "d", text: { hu: "Ez egy külön tanulandó feature value minden example-ra.", en: "It is a separately learned feature value for every example." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "Az x₀=1 konstans oszloppal θ₀ ugyanúgy szerepelhet az Xθ dot productban, mint a többi parameter.",
      en: "The constant x₀=1 column lets θ₀ appear in the Xθ dot product just like the other parameters."
    }
  },
  {
    id: "lr-q8",
    topics: ["normal-equation"],
    prompt: {
      hu: "Mely állítások igazak a normal equationre linear least squares esetén?",
      en: "Which statements are true about the normal equation for linear least squares?"
    },
    choices: [
      { id: "a", text: { hu: "θ = (XᵀX)⁻¹Xᵀy egy közvetlen megoldási formula.", en: "θ = (XᵀX)⁻¹Xᵀy is a direct solution formula." } },
      { id: "b", text: { hu: "A lecture a θ = X⁺y pseudoinverse formát is megadja.", en: "The lecture also gives the pseudoinverse form θ = X⁺y." } },
      { id: "c", text: { hu: "Ehhez ugyanúgy sok gradient descent iteration kötelező.", en: "It necessarily requires many gradient-descent iterations." } },
      { id: "d", text: { hu: "X és y a data alapján ismert.", en: "X and y are known from the data." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A normal equation algebrai, egy lépéses least-squares megoldás. A lecture a Moore–Penrose pseudoinverse alakot is megadja.",
      en: "The normal equation is a direct algebraic least-squares solution. The lecture also gives the Moore–Penrose pseudoinverse form."
    }
  },
  {
    id: "lr-q9",
    topics: ["normal-equation", "regularization"],
    prompt: {
      hu: "A θ=(XᵀX+λI)⁻¹Xᵀy regularized least-squares formulában mely állítások igazak?",
      en: "Which statements are true in the regularized least-squares formula θ=(XᵀX+λI)⁻¹Xᵀy?"
    },
    choices: [
      { id: "a", text: { hu: "I identity matrix.", en: "I is the identity matrix." } },
      { id: "b", text: { hu: "I shape-je megegyezik XᵀX shape-jével.", en: "I has the same shape as XᵀX." } },
      { id: "c", text: { hu: "λ egy scalar regularization parameter.", en: "λ is a scalar regularization parameter." } },
      { id: "d", text: { hu: "I a label vector.", en: "I is the label vector." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "λI hozzáadható XᵀX-hez, ezért I ugyanakkora square identity matrix. λ scalar parameter.",
      en: "λI is added to XᵀX, so I is an identity matrix of the same square shape. λ is a scalar parameter."
    }
  },
  {
    id: "lr-q10",
    topics: ["feature-scaling"],
    prompt: {
      hu: "Mi a feature scaling fő célja a lecture szerint?",
      en: "What is the main purpose of feature scaling according to the lecture?"
    },
    choices: [
      { id: "a", text: { hu: "Az input variables hasonló nagyságrendbe hozása.", en: "Bringing input variables to a similar order of magnitude." } },
      { id: "b", text: { hu: "A nagyon megnyúlt loss surface és lassú convergence mérséklése.", en: "Reducing the highly elongated loss surface and slow convergence problem." } },
      { id: "c", text: { hu: "A training labels számának csökkentése.", en: "Reducing the number of training labels." } },
      { id: "d", text: { hu: "A scalinget feature-önként külön végezzük.", en: "Scaling is performed independently for each feature." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A lecture a különböző feature scale-ekből eredő elnyúlt loss surface és lassú gradient-descent convergence miatt javasolja a feature scalinget, minden variable-re külön.",
      en: "The lecture motivates feature scaling by the elongated loss surface and slow gradient-descent convergence caused by different feature scales, independently for each variable."
    }
  },
  {
    id: "lr-q11",
    topics: ["feature-scaling", "min-max"],
    prompt: {
      hu: "Mely állítások igazak a min-max scalingre a course szerint?",
      en: "Which statements are true about min-max scaling according to the course?"
    },
    choices: [
      { id: "a", text: { hu: "A tárgyalt formula a feature-t [0,1] intervalba skálázza.", en: "The discussed formula scales the feature to the [0,1] interval." } },
      { id: "b", text: { hu: "A formula (x−min)/(max−min).", en: "The formula is (x−min)/(max−min)." } },
      { id: "c", text: { hu: "A lecture szerint érzékenyebb az outliers-re.", en: "According to the lecture it is more sensitive to outliers." } },
      { id: "d", text: { hu: "Az eredmény mean-je szükségszerűen 0.", en: "The result necessarily has mean 0." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Min-max scaling a minimumot 0-ra, a maximumot 1-re viszi. A mean nem lesz általában 0, és a lecture kiemeli az outlier-érzékenységet.",
      en: "Min-max scaling maps the minimum to 0 and maximum to 1. The mean is not generally 0, and the lecture highlights its sensitivity to outliers."
    }
  },
  {
    id: "lr-q12",
    topics: ["feature-scaling", "standardization"],
    prompt: {
      hu: "Mely állítások igazak standardization után egy feature-re?",
      en: "Which statements are true for a feature after standardization?"
    },
    choices: [
      { id: "a", text: { hu: "A formula (x−μ)/σ.", en: "The formula is (x−μ)/σ." } },
      { id: "b", text: { hu: "A transzformált feature mean-je 0.", en: "The transformed feature has mean 0." } },
      { id: "c", text: { hu: "A transzformált feature standard deviation-je 1.", en: "The transformed feature has standard deviation 1." } },
      { id: "d", text: { hu: "Minden érték szükségszerűen [0,1] közé kerül.", en: "Every value necessarily lies in [0,1]." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Standardization a mean-t kivonja és standard deviation-nel oszt. Nem korlátozza az értékeket [0,1]-re.",
      en: "Standardization subtracts the mean and divides by standard deviation. It does not constrain values to [0,1]."
    }
  },
  {
    id: "lr-q13",
    topics: ["feature-scaling", "outliers"],
    prompt: {
      hu: "A course két tárgyalt scaling módszere közül mely állítás igaz kis számú outlier esetén?",
      en: "Which statement is true, according to the course, when comparing the two discussed scaling methods in the presence of a small number of outliers?"
    },
    choices: [
      { id: "a", text: { hu: "Min-max scaling érzékenyebb az outliers-re.", en: "Min-max scaling is more sensitive to outliers." } },
      { id: "b", text: { hu: "Standardization a kettő közül robusztusabb.", en: "Standardization is more robust of the two." } },
      { id: "c", text: { hu: "A két módszer outlier érzékenysége mindig teljesen azonos.", en: "The two methods always have exactly the same sensitivity to outliers." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "A lecture explicit megjegyzése: 'Min-max scaling: More sensitive to outliers.' Ezért a két itt tárgyalt módszer közül standardization a robusztusabb.",
      en: "The lecture explicitly notes: 'Min-max scaling: More sensitive to outliers.' Therefore, among these two methods, standardization is the more robust one."
    }
  },
  {
    id: "lr-q14",
    topics: ["linear-regression", "prediction"],
    prompt: {
      hu: "Egyetlen example-ra hθ(x)=θ₁x+θ₀ linear regression hypothesis esetén mely állítások igazak?",
      en: "For a single example with the linear-regression hypothesis hθ(x)=θ₁x+θ₀, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "hθ(x)=ŷ egy scalar lehet.", en: "hθ(x)=ŷ can be a scalar." } },
      { id: "b", text: { hu: "A prediction nincs [0,1]-re korlátozva.", en: "The prediction is not restricted to [0,1]." } },
      { id: "c", text: { hu: "x az example input feature értéke.", en: "x is the example's input-feature value." } },
      { id: "d", text: { hu: "θ₀ és θ₁ training data values, nem model parameters.", en: "θ₀ and θ₁ are training-data values, not model parameters." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Egy univariate linear regression example predictionje scalar. θ₀ és θ₁ model parameters, míg x input feature value.",
      en: "The prediction for one univariate linear-regression example is a scalar. θ₀ and θ₁ are model parameters, while x is the input-feature value."
    }
  }
];
