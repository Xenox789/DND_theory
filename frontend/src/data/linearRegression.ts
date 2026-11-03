import type { Lesson, Question } from "../types";

export const linearRegressionLesson: Lesson = {
  id: "linear-regression-optimization",
  title: {
    hu: "Lineáris regresszió és optimalizálás",
    en: "Linear Regression and Optimization"
  },
  subtitle: {
    hu: "A lineáris hipotézistől a négyzetes hibán, a gradiensen és a gradienscsökkentésen át a normálegyenletig és a jellemzőskálázásig",
    en: "From the linear hypothesis through squared error, gradients, gradient descent, the normal equation, and feature scaling"
  },
  source: "Lectures 2–4",
  sections: [
    {
      id: "regression-linear-hypothesis",
      title: {
        hu: "Mit old meg a lineáris regresszió?",
        en: "What problem does linear regression solve?"
      },
      body: {
        hu: "A lineáris regresszió (linear regression) felügyelt tanulási módszer (supervised learning method), amely folytonos címke (continuous label) becslésére szolgál. Egyetlen bemeneti jellemző (feature) esetén a modell egy egyenest használ: hθ(x)=θ₁x+θ₀. A θ₁ paraméter a meredekség (slope), a θ₀ pedig a tengelymetszet vagy eltolás (intercept / bias). A modell kimenete az ŷ becslés.",
        en: "Linear regression is a supervised-learning method for predicting continuous labels. With a single input feature, the model uses a line: hθ(x)=θ₁x+θ₀. θ₁ is the slope and θ₀ the intercept / bias. The model output is the prediction ŷ."
      },
      why: {
        hu: "A lineáris modell azért hasznos kiindulópont, mert egyszerű, jól értelmezhető, és a veszteségfüggvénye megfelelő választás mellett konvex. Emiatt tisztán meg lehet rajta érteni a paraméter, veszteség, gradiens és optimalizálás fogalmát.",
        en: "The linear model is a useful starting point because it is simple, interpretable, and with the usual squared-error loss its objective is convex. It therefore provides a clean setting for understanding parameters, loss, gradients, and optimization."
      },
      formula: {
        hu: "ŷ = hθ(x) = θ₁x + θ₀",
        en: "ŷ = hθ(x) = θ₁x + θ₀"
      },
      formulaTerms: [
        { symbol: "x", hu: "A bemeneti jellemző (feature) értéke.", en: "The input-jellemzőérték." },
        { symbol: "θ₁", hu: "A meredekség (slope): megadja, mennyit változik a becslés, ha x egy egységgel változik.", en: "The slope: how much the prediction changes when x increases by one unit." },
        { symbol: "θ₀", hu: "A tengelymetszet vagy eltolás (intercept / bias): az egyenes függőleges eltolása.", en: "The intercept / bias: the vertical offset of the line." },
        { symbol: "ŷ", hu: "A modell becslése (prediction).", en: "The model prediction." }
      ],
      workedExample: {
        hu: "Szemléltető példa: ha x egy lakás alapterülete és ŷ a becsült ár, akkor θ₁ azt írja le, átlagosan mennyivel nő a becsült ár egy további négyzetméterrel. θ₀ az a konstans eltolás, amelyet a modell az x=0 helyhez rendel.",
        en: "Illustrative example: if x is apartment floor area and ŷ the predicted price, θ₁ describes how much the predicted price changes per additional square meter, while θ₀ is the constant offset at x=0."
      },
      connections: {
        hu: "A logisztikus regresszió ugyanilyen lineáris kifejezéssel indul, de a lineáris eredményt később szigmoid függvényen (sigmoid) vezeti át. Az egyetlen mesterséges neuron (artificial neuron) is ugyanezt a súlyozott összeget általánosítja.",
        en: "Logistic regression starts from the same kind of linear expression but later passes it through a sigmoid. A single artificial neuron generalizes the same weighted-sum idea."
      },
      examTrap: {
        hu: "A lineáris regresszió nem osztályozási (classification) módszer. A kimenete nincs 0 és 1 közé korlátozva; tetszőleges folytonos értéket felvehet.",
        en: "Linear regression is not a classification method. Its output is not constrained to [0,1] and may take arbitrary continuous values."
      },
      keyTerms: [
        { term: "linear regression", hu: "lineáris regresszió" },
        { term: "slope", hu: "meredekség" },
        { term: "intercept", hu: "tengelymetszet" },
        { term: "bias", hu: "eltolás" }
      ]
    },
    {
      id: "multivariate-geometry",
      title: {
        hu: "Több jellemző: súlyok és geometriai értelmezés",
        en: "Multiple features: weights and geometric interpretation"
      },
      body: {
        hu: "Több bemeneti jellemző esetén minden jellemzőhöz külön súly (weight) tartozik. n valódi jellemző mellett a modellnek n súlya és egy eltolása van, vagyis összesen n+1 paramétere. A hipotézis: hθ(x)=θ₀+θ₁x₁+…+θₙxₙ. Egy jellemzőnél ez egy egyenes, két jellemzőnél egy sík, több jellemzőnél pedig ezek magasabb dimenziós általánosítása, egy hipersík (hyperplane).",
        en: "With multiple input features, each feature has its own weight. With n real input features, the model has n weights plus one bias, for n+1 parameters total. The hypothesis is hθ(x)=θ₀+θ₁x₁+…+θₙxₙ. Geometrically this is a line for one feature, a plane for two features, and a hyperplane in higher dimensions."
      },
      why: {
        hu: "A külön súlyok lehetővé teszik, hogy a modell eltérő erősséggel vegye figyelembe az egyes jellemzőket. A tanítás feladata ezeknek a súlyoknak és az eltolásnak a megtalálása.",
        en: "Separate weights let the model use different strengths for different features. Training finds suitable weights and the bias."
      },
      formula: {
        hu: "hθ(x) = θ₀ + θ₁x₁ + θ₂x₂ + … + θₙxₙ",
        en: "hθ(x) = θ₀ + θ₁x₁ + θ₂x₂ + … + θₙxₙ"
      },
      formulaTerms: [
        { symbol: "xᵢ", hu: "Az i-edik bemeneti jellemző értéke.", en: "Value of the i-th input feature." },
        { symbol: "θᵢ", hu: "Az i-edik jellemzőhöz tartozó tanulható súly (weight).", en: "Learnable weight associated with feature i." },
        { symbol: "θ₀", hu: "Az eltolás (bias), amelyhez nem tartozik valódi bemeneti jellemző.", en: "The bias term, which is not tied to a real input feature." }
      ],
      workedExample: {
        hu: "A hivatalos mintafeladatban a koleszterinszintet 4 jellemzőből – testsúly, életkor, magasság, nem – becsüljük. Ekkor 4 súly és 1 eltolás szükséges, tehát összesen 5 paraméter.",
        en: "In the official example task, cholesterol is predicted from 4 features—weight, age, height, and sex. The model therefore needs 4 weights plus 1 bias, for 5 parameters."
      },
      examTrap: {
        hu: "n bemeneti jellemző nem n paramétert jelent, hanem n+1-et, mert az eltolás (bias) is tanulható paraméter.",
        en: "n input features do not mean n parameters; there are n+1 because the bias is also learnable."
      },
      keyTerms: [
        { term: "multivariate", hu: "többváltozós" },
        { term: "weight", hu: "súly" },
        { term: "hyperplane", hu: "hipersík" }
      ]
    },
    {
      id: "matrix-form",
      title: {
        hu: "Mátrixos alak: Xθ egyetlen műveletben",
        en: "Matrix form: Xθ in a single operation"
      },
      body: {
        hu: "A többváltozós lineáris regresszió kényelmesen felírható mátrixos alakban. Bevezetjük az x₀=1 segédváltozót, így az eltolás is ugyanolyan módon kezelhető, mint a többi paraméter. Ha m tanítási példa és n valódi bemeneti jellemző van, akkor X alakja (shape) (m,n+1), θ alakja (n+1,), a becslések vektora ŷ=Xθ pedig (m,) alakú.",
        en: "Multivariate linear regression can be written conveniently in matrix form. Introducing x₀=1 lets the bias be handled like the other parameters. With m training examples and n real input features, X has shape (m,n+1), θ has shape (n+1,), and the prediction vector ŷ=Xθ has shape (m,)."
      },
      why: {
        hu: "A mátrixos alak egyszerre írja le az összes tanítási példára végzett becslést, és közvetlenül illeszkedik a NumPy/PyTorch tömbműveletekhez. Ez az egyik fontos kapcsolat az elmélet és a gyakorlati implementáció között.",
        en: "The matrix form describes predictions for all training examples at once and maps directly to NumPy/PyTorch array operations. It is an important bridge between the theory and implementation."
      },
      formula: {
        hu: "x₀ := 1,   ŷ = Xθ,   X ∈ ℝ^(m×(n+1)),   θ ∈ ℝ^(n+1),   ŷ,y ∈ ℝ^m",
        en: "x₀ := 1,   ŷ = Xθ,   X ∈ ℝ^(m×(n+1)),   θ ∈ ℝ^(n+1),   ŷ,y ∈ ℝ^m"
      },
      formulaTerms: [
        { symbol: "m", hu: "A tanítási példák (tanítási példák) száma.", en: "Number of tanítási példák." },
        { symbol: "n", hu: "A valódi bemeneti jellemzők száma.", en: "Number of real input features." },
        { symbol: "X", hu: "A bemeneti mátrix (design matrix): soronként egy példa, oszloponként egy jellemző, plusz az x₀=1 oszlop.", en: "The design matrix: one example per row, one feature per column, plus the x₀=1 column." },
        { symbol: "θ", hu: "A tanulható paraméterek vektora.", en: "Vector of learnable parameters." },
        { symbol: "y", hu: "A valódi címkék vektora.", en: "Vector of true labels." },
        { symbol: "ŷ", hu: "Az összes példa becslésének vektora.", en: "Vector of predictions for all examples." }
      ],
      workedExample: {
        hu: "A 200 betegből és 4 jellemzőből álló mintafeladatban X alakja (200,5), mert a négy valódi jellemző mellé bekerül az x₀=1 oszlop. θ alakja (5,), y és ŷ alakja pedig (200,).",
        en: "For the example with 200 patients and 4 features, X has shape (200,5) because the x₀=1 column is added. θ has shape (5,), while y and ŷ have shape (200,)."
      },
      examTrap: {
        hu: "Az életkor, testsúly és más konkrét jellemzőértékek X-ben vannak. A koleszterinszintek y-ban vannak. A θ nem adatokat, hanem a modell tanulható paramétereit tartalmazza.",
        en: "Age, weight, and other concrete feature values are in X. Cholesterol values are in y. θ contains learnable model parameters, not data."
      },
      keyTerms: [
        { term: "design matrix", hu: "bemeneti / tervezési mátrix" },
        { term: "dot product", hu: "skalárszorzat / mátrix-vektor szorzás" },
        { term: "shape", hu: "alak" }
      ]
    },
    {
      id: "least-squares",
      title: {
        hu: "Legkisebb négyzetek és a négyzetes veszteség",
        en: "Least squares and squared-error loss"
      },
      body: {
        hu: "A legkisebb négyzetek módszere (least squares) a becslések és a valódi címkék eltérését négyzetre emeli, majd a tanítási példákon összesíti. A tárgyban használt alak: J(θ)=1/(2m)·Σ(hθ(x^(j))−y^(j))². A teljes J(θ) egyetlen skalár szám.",
        en: "Least squares squares the difference between predictions and true labels and aggregates it across training examples. The course uses J(θ)=1/(2m)·Σ(hθ(x^(j))−y^(j))². The overall J(θ) is a single scalar."
      },
      why: {
        hu: "A négyzetre emelés megakadályozza, hogy a pozitív és negatív hibák kioltsák egymást, és a nagy hibákat erősebben bünteti. A 1/2 tényező a deriválást kényelmesebbé teszi; a minimum helyét nem változtatja meg.",
        en: "Squaring prevents positive and negative errors from canceling and penalizes large errors more strongly. The factor 1/2 simplifies derivatives and does not change the location of the minimum."
      },
      formula: {
        hu: "J(θ) = 1/(2m) · Σⱼ₌₁ᵐ (hθ(x^(j)) − y^(j))²",
        en: "J(θ) = 1/(2m) · Σⱼ₌₁ᵐ (hθ(x^(j)) − y^(j))²"
      },
      formulaTerms: [
        { symbol: "J(θ)", hu: "A teljes tanítási veszteség, skalár érték.", en: "Overall tanítási veszteség (training loss), a scalar." },
        { symbol: "m", hu: "A tanítási példák száma.", en: "Number of tanítási példák." },
        { symbol: "j", hu: "A tanítási példák indexe.", en: "Index of a tanítási példa." },
        { symbol: "hθ(x^(j))", hu: "A j-edik példa becslése.", en: "Prediction for tanítási példa j." },
        { symbol: "y^(j)", hu: "A j-edik példa valódi címkéje.", en: "True label for tanítási példa j." },
        { symbol: "(ŷ−y)²", hu: "A négyzetes hiba (squared error) egy példára.", en: "Squared error for one example." }
      ],
      connections: {
        hu: "Ha θ két paraméterből áll, J(θ₀,θ₁) háromdimenziós veszteségfelületként (loss surface) rajzolható fel. A gradienscsökkentés ezen a felületen keresi az alacsonyabb veszteség felé vezető irányt.",
        en: "With two parameters, J(θ₀,θ₁) can be visualized as a 3D loss surface. Gradient descent searches this surface for directions that reduce the loss."
      },
      examTrap: {
        hu: "J(θ) nem vektor, hanem skalár, még akkor is, ha sok tanítási példából számoljuk. A j index nem jellemzőt, hanem tanítási példát jelöl ebben az összegben.",
        en: "J(θ) is a scalar, not a vector, even though it is computed from many examples. j indexes training examples, not features."
      },
      keyTerms: [
        { term: "least squares", hu: "legkisebb négyzetek" },
        { term: "Mean Squared Error (MSE)", hu: "átlagos négyzetes hiba" },
        { term: "loss function", hu: "veszteségfüggvény" }
      ]
    },
    {
      id: "gradient",
      title: {
        hu: "Parciális deriváltak és a gradiens",
        en: "Partial derivatives and the gradient"
      },
      body: {
        hu: "Több paraméter esetén a veszteség minden paraméterre külön-külön érzékeny. A parciális derivált (partial derivative) azt méri, hogyan változna a veszteség, ha egyetlen paramétert kis mértékben változtatnánk, miközben a többit rögzítettnek tekintjük. A gradiens (gradient) ezekből a parciális deriváltakból álló vektor.",
        en: "With multiple parameters, the loss has a separate sensitivity to each parameter. A partial derivative measures how the loss would change if one parameter changed slightly while the others were fixed. The gradient is the vector of these partial derivatives."
      },
      why: {
        hu: "A gradiens nemcsak azt mondja meg, hogy melyik paraméter fontos, hanem egy közös irányt ad a paramétertérben. Matematikailag a legmeredekebb növekedés irányába mutat, ezért csökkentéshez az ellenkező irányba lépünk.",
        en: "The gradient provides a joint direction in parameter space. Mathematically it points toward steepest increase, so to reduce the loss we move in the opposite direction."
      },
      formula: {
        hu: "∇J(θ) = [∂J/∂θ₀, ∂J/∂θ₁, …, ∂J/∂θₙ]ᵀ",
        en: "∇J(θ) = [∂J/∂θ₀, ∂J/∂θ₁, …, ∂J/∂θₙ]ᵀ"
      },
      formulaTerms: [
        { symbol: "∂J/∂θᵢ", hu: "A veszteség érzékenysége az i-edik paraméter kis változására.", en: "Sensitivity of the loss to a small change in parameter i." },
        { symbol: "∇J", hu: "A gradiensvektor, amely minden paraméter parciális deriváltját összegyűjti.", en: "Gradient vector containing the partial derivative for every parameter." }
      ],
      intuition: {
        hu: "Képzeld a veszteségfelületet hegyvidéknek. A gradiens arra mutat, amerre a leggyorsabban emelkedne a terep. Ha a minimum felé akarunk haladni, a gradiens negatív irányába indulunk.",
        en: "Imagine the loss surface as terrain. The gradient points toward the steepest uphill direction. To move toward a minimum, go in the negative-gradient direction."
      },
      examTrap: {
        hu: "A gradiens nem a minimum irányába mutat, hanem a legmeredekebb növekedés irányába. Ezért szerepel mínuszjel a gradienscsökkentés frissítési képletében.",
        en: "The gradient points toward steepest increase, not toward the minimum. That is why gradient descent uses a minus sign."
      },
      keyTerms: [
        { term: "partial derivative", hu: "parciális derivált" },
        { term: "gradient", hu: "gradiens" }
      ]
    },
    {
      id: "gradient-descent",
      title: {
        hu: "Gradienscsökkentés és tanulási ráta",
        en: "Gradient descent and learning rate"
      },
      body: {
        hu: "A gradienscsökkentés (gradient descent) iteratív optimalizáló eljárás. Minden lépésben kiszámítjuk a veszteség gradiensét az aktuális paramétereknél, majd a paramétereket a gradienssel ellentétes irányban módosítjuk. A lépés nagyságát a tanulási ráta (learning rate), α szabályozza.",
        en: "Gradient descent is an iterative optimization procedure. At each step we compute the gradient at the current parameters and update the parameters in the opposite direction. The step size is controlled by the learning rate α."
      },
      why: {
        hu: "A veszteség minimumát általában nem tudjuk pusztán ránézésre megadni. A gradienscsökkentés helyi meredekségi információból épít fel egy útvonalat a jobb paraméterek felé.",
        en: "We generally cannot identify the minimum just by inspection. Gradient descent builds a path toward better parameters using local slope information."
      },
      formula: {
        hu: "θ := θ − α∇J(θ)",
        en: "θ := θ − α∇J(θ)"
      },
      formulaTerms: [
        { symbol: "θ", hu: "A jelenlegi modellparaméterek.", en: "Current model parameters." },
        { symbol: "α", hu: "A tanulási ráta (learning rate), vagyis a lépés méretét skálázó pozitív szám.", en: "Learning rate, a positive scalar that scales the update size." },
        { symbol: "∇J(θ)", hu: "A veszteség gradiensének aktuális értéke.", en: "Current gradient of the loss." },
        { symbol: "−", hu: "Azért vonjuk ki a gradienst, mert az a legnagyobb növekedés irányába mutat.", en: "We subtract the gradient because it points toward steepest increase." }
      ],
      intuition: {
        hu: "Túl kis α esetén sok apró lépésre lehet szükség. Túl nagy α esetén a frissítés átlőhet a minimumon, oszcillálhat vagy akár szét is futhat.",
        en: "If α is too small, many tiny steps may be required. If α is too large, updates can overshoot the minimum, oscillate, or diverge."
      },
      connections: {
        hu: "Ugyanez az alapelv tér vissza a neurális hálózatok tanításánál. Ott azonban a paraméterek száma sokkal nagyobb, a veszteségfelület általában nem konvex, a gradienseket pedig visszaterjesztéssel (backpropagation) számítjuk ki.",
        en: "The same principle is used for neural-network training. There are far more parameters, the loss surface is generally non-convex, and gradients are computed using backpropagation."
      },
      examTrap: {
        hu: "Lineáris regresszió és négyzetes veszteség esetén a veszteség konvex kvadratikus függvény. A tananyag szerint kellően kis lépésmérettel a gradienscsökkentés közelítőleg megtalálja a globális optimumot. Ez a garancia nem vihető át automatikusan egy MLP-re.",
        en: "For linear regression with squared-error loss, the objective is a convex quadratic. According to the course, with a sufficiently small step size gradient descent approximately finds the global optimum. This guarantee does not automatically carry over to an MLP."
      },
      keyTerms: [
        { term: "gradient descent", hu: "gradienscsökkentés" },
        { term: "learning rate", hu: "tanulási ráta" },
        { term: "convergence", hu: "konvergencia" }
      ]
    },
    {
      id: "feature-scaling",
      title: {
        hu: "Jellemzőskálázás: miért számít a bemenet nagyságrendje?",
        en: "Feature scaling: why does input magnitude matter?"
      },
      body: {
        hu: "A jellemzőskálázás (feature scaling) célja, hogy a különböző bemeneti változókat hasonló nagyságrendre hozzuk. A tananyag két módszert emel ki: a minimum–maximum skálázást (min-max skálázás (min-max scaling)), amely tipikusan [0,1] tartományba képez, és a standardizálást (standardizálás (standardization)), amely nulla átlagú és egységnyi szórású változót hoz létre.",
        en: "Feature scaling brings input variables to a similar order of magnitude. The course highlights min-max scaling, typically mapping to [0,1], and standardization, producing zero mean and unit standard deviation."
      },
      why: {
        hu: "Ha az egyik jellemző értékei nagyságrendekkel nagyobbak a másikénál, a veszteségfelület erősen megnyúlhat, és a gradienscsökkentés kedvezőtlenebb, cikcakkos útvonalon haladhat. Skálázással az optimalizálás jellemzően könnyebbé válik.",
        en: "If one feature is orders of magnitude larger than another, the loss surface can become strongly elongated and gradient descent can follow an inefficient zig-zag path. Scaling typically makes optimization easier."
      },
      formula: {
        hu: "Min-max: x'=(x−min)/(max−min)    |    Standardizálás: x'=(x−μ)/σ",
        en: "Min-max: x'=(x−min)/(max−min)    |    Standardization: x'=(x−μ)/σ"
      },
      formulaTerms: [
        { symbol: "x", hu: "Az eredeti jellemzőérték.", en: "Original jellemzőérték." },
        { symbol: "min, max", hu: "Az adott jellemző minimuma és maximuma.", en: "Minimum and maximum of that feature." },
        { symbol: "μ", hu: "Az adott jellemző átlaga (mean).", en: "Mean of the feature." },
        { symbol: "σ", hu: "Az adott jellemző szórása (standard deviation).", en: "Standard deviation of the feature." },
        { symbol: "x'", hu: "A skálázás utáni jellemzőérték.", en: "Scaled jellemzőérték." }
      ],
      workedExample: {
        hu: "Szemléltető példa: ha az életkor 18–80, a jövedelem pedig milliós nagyságrendű, a két jellemző numerikus skálája nagyon eltér. A skálázás nem változtatja meg azt, melyik ember fiatalabb vagy gazdagabb; csak a numerikus reprezentáció nagyságrendjét rendezi.",
        en: "Illustrative example: age may range from 18–80 while income may be in the millions. Scaling does not change ordering or meaning; it changes numerical magnitude."
      },
      examTrap: {
        hu: "A tananyag szerint a minimum–maximum skálázás különösen érzékeny a szélsőértékekre (outliers), mert közvetlenül a minimum és maximum határozza meg a teljes tartományt. A két tárgyalt módszer közül a standardizálás robusztusabb néhány kiugró ponttal szemben, bár az átlag és a szórás maga is változhat kiugró értékek miatt.",
        en: "According to the course, min-max scaling is especially sensitive to outliers because the minimum and maximum define the full range. Of the two discussed techniques, standardization is more robust to a small number of outliers, although its mean and standard deviation are also affected by outliers."
      },
      keyTerms: [
        { term: "feature scaling", hu: "jellemzőskálázás" },
        { term: "min-max skálázás (min-max scaling)", hu: "minimum–maximum skálázás" },
        { term: "standardizálás (standardization)", hu: "standardizálás" },
        { term: "outlier", hu: "kiugró érték" }
      ]
    },
    {
      id: "normal-equation",
      title: {
        hu: "Normálegyenlet: közvetlen megoldás a legkisebb négyzetekre",
        en: "Normal equation: a direct least-squares solution"
      },
      body: {
        hu: "A normálegyenlet (normal equation) a lineáris regresszió legkisebb négyzetes problémájának közvetlen megoldását adja. A tananyag hangsúlyozza, hogy ezzel egyetlen képlettel megtalálható az optimális paramétervektor, ha X és y adott. A levezetés nem része a kurzusnak; a gyakorlati példában Moore–Penrose-pszeudoinverz (pseudoinverse) is szerepel.",
        en: "The normal equation gives a direct solution to the linear least-squares problem. The course emphasizes that the optimal parameter vector can be obtained from X and y in one formula. Its derivation is omitted; the practical presentation also uses the Moore–Penrose pseudoinverse."
      },
      why: {
        hu: "Ez alternatíva az iteratív gradienscsökkentéshez. A normálegyenlet nem lépésről lépésre javítja θ-t, hanem közvetlenül a legkisebb négyzetes megoldást számítja ki.",
        en: "It is an alternative to iterative gradient descent. Rather than gradually updating θ, the normal equation computes the least-squares solution directly."
      },
      formula: {
        hu: "θ = (XᵀX)⁻¹Xᵀy    |    regularizált alak: θ = (XᵀX + λI)⁻¹Xᵀy",
        en: "θ = (XᵀX)⁻¹Xᵀy    |    regularized form: θ = (XᵀX + λI)⁻¹Xᵀy"
      },
      formulaTerms: [
        { symbol: "X", hu: "A bemeneti mátrix az x₀=1 oszloppal.", en: "Design matrix including the x₀=1 column." },
        { symbol: "Xᵀ", hu: "X transzponáltja (transpose).", en: "Transpose of X." },
        { symbol: "y", hu: "A címkék vektora.", en: "Vector of labels." },
        { symbol: "I", hu: "Egységmátrix (identity matrix) a megfelelő méretben.", en: "Identity matrix of the required size." },
        { symbol: "λ", hu: "Regularizációs erősség; a regularizált megoldás stabilitását és a büntetés mértékét szabályozza.", en: "Regularization strength controlling the regularized solution." }
      ],
      connections: {
        hu: "A λI tag ugyanahhoz az L2-regularizációs gondolathoz kapcsolódik, amelyet a túlillesztés (overfitting) kezelésénél részletesebben tárgyal a kurzus.",
        en: "The λI term is connected to the same L2-regularization idea discussed later for handling overfitting."
      },
      examTrap: {
        hu: "A hivatalos mintakérdések külön kérdezhetik X, y és θ alakját, illetve azt, mi az I mátrix. Az I nem az inputadat, hanem egységmátrix.",
        en: "The official example questions may ask for the shapes of X, y, and θ and for the meaning of I. I is the identity matrix, not input data."
      },
      keyTerms: [
        { term: "normal equation", hu: "normálegyenlet" },
        { term: "identity matrix", hu: "egységmátrix" },
        { term: "pseudoinverse", hu: "pszeudoinverz" }
      ]
    }
  ]
};

export const linearRegressionQuestions: Question[] = [
  {
    id: "lr-q1",
    topics: ["linear-regression", "shapes"],
    prompt: {
      hu: "200 betegből álló tanítóhalmazunk (training set) van. Minden betegnél 4 jellemző (feature) (súly (weight), életkor (age), magasság (height), nem (sex)) alapján koleszterinszintet becslünk lineáris regresszióval. Az tengelymetszetet / eltolást x₀=1 oszloppal kezeljük. Mely állítások igazak?",
      en: "We have a training set of 200 patients. We predict cholesterol level with linear regression from 4 features (weight, age, height, sex), using an x₀=1 column for the intercept. Which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "X alakja (shape) (200, 5).", en: "X has shape (200, 5)." } },
      { id: "b", text: { hu: "θ 5 modellparamétert tartalmaz.", en: "θ contains 5 model parameters." } },
      { id: "c", text: { hu: "y alakja (shape) (200,).", en: "y has shape (200,)." } },
      { id: "d", text: { hu: "Az életkor (age) értékek θ-ban találhatók.", en: "Age values are stored in θ." } },
      { id: "e", text: { hu: "Ez osztályozás (classification) feladat.", en: "This is a classification task." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "4 valódi jellemző (feature) + az x₀=1 tengelymetszet / eltolás (intercept) oszlop miatt X-ben 5 oszlop van, és θ-ban 5 paraméter. A 200 koleszterin címke (label) a y vektorban van. Az életkor (age) X egyik jellemző (feature) oszlopa. A koleszterinszint (cholesterol level) folytonos címke (label), ezért regresszió (regression).",
      en: "Four real features plus the x₀=1 intercept column give X five columns and θ five parameters. The 200 cholesterol labels form y. Age is a feature column in X. Cholesterol level is continuous, so this is regression."
    }
  },
  {
    id: "lr-q2",
    topics: ["linear-regression", "geometry"],
    prompt: {
      hu: "Mely geometriai állítások igazak lineáris regresszió (linear regression) esetén?",
      en: "Which geometric statements are true for linear regression?"
    },
    choices: [
      { id: "a", text: { hu: "1 bemeneti változó (bemeneti változó) esetén a hipotézis (hypothesis) egyenes a 2D x–y síkon.", en: "With 1 bemeneti változó, the hypothesis is a line in the 2D x–y plane." } },
      { id: "b", text: { hu: "2 bemeneti változó (bemeneti változó) esetén a hipotézis (hypothesis) sík lehet 3D-ben.", en: "With 2 bemeneti változók, the hypothesis can be a plane in 3D." } },
      { id: "c", text: { hu: "n bemeneti változó (bemeneti változó) esetén a lineáris hipotézis (hypothesis) hipersík (hyperplane).", en: "With n bemeneti változók, the linear hypothesis is a hyperplane." } },
      { id: "d", text: { hu: "2 bemeneti változó (bemeneti változó) esetén csak 2 modellparaméter van.", en: "With 2 bemeneti változók there are only 2 model parameters." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Az tengelymetszet / eltolás (intercept) miatt n bemeneti változó (bemeneti változó) mellett n+1 paraméter van. 1 jellemző (feature) → egyenes (line), 2 jellemző (feature) → sík (plane), általánosan hipersík (hyperplane).",
      en: "Because of the intercept, n input variables require n+1 parameters. 1 feature → line, 2 features → plane, generally a hyperplane."
    }
  },
  {
    id: "lr-q3",
    topics: ["least-squares", "loss"],
    prompt: {
      hu: "A kurzusban használt J(θ)=1/(2m) Σⱼ(hθ(x⁽ʲ⁾)−y⁽ʲ⁾)² veszteség formuláról mely állítások igazak?",
      en: "Which statements are true about the course loss formula J(θ)=1/(2m) Σⱼ(hθ(x⁽ʲ⁾)−y⁽ʲ⁾)²?"
    },
    choices: [
      { id: "a", text: { hu: "j a tanítási példák (tanítási példák) indexe.", en: "j indexes the tanítási példák." } },
      { id: "b", text: { hu: "m a tanítási példák (tanítási példák) száma.", en: "m is the number of tanítási példák." } },
      { id: "c", text: { hu: "J(θ) értéke skalár (scalar).", en: "J(θ) is a scalar." } },
      { id: "d", text: { hu: "A négyzetes becslési hibák (squared prediction errors) szerepelnek benne.", en: "It contains squared prediction errors." } },
      { id: "e", text: { hu: "J(θ) alakja (shape) mindig ugyanaz, mint X alakja (shape).", en: "J(θ) always has the same shape as X." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: {
      hu: "A veszteség az összes példa hibájából egyetlen skalár (scalar) célfüggvényt (objective) készít. j példaindex (example index), m a példák száma, a becslési hiba (prediction error) négyzete szerepel az összegben.",
      en: "The loss combines errors from all examples into one scalar objective. j is the example index, m is the number of examples, and squared prediction error is summed."
    }
  },
  {
    id: "lr-q4",
    topics: ["gradient", "gradient-descent"],
    prompt: {
      hu: "Mely állítások igazak a gradiensre (gradient) és gradienscsökkentés (gradient descent)re?",
      en: "Which statements are true about the gradient and gradient descent?"
    },
    choices: [
      { id: "a", text: { hu: "A gradiens (gradient) komponensei parciális deriváltak (partial derivatives).", en: "The components of the gradient are partial derivatives." } },
      { id: "b", text: { hu: "A gradiens (gradient) a veszteség legmeredekebb növekedésének irányába mutat.", en: "The gradient points in the direction of steepest increase of the loss." } },
      { id: "c", text: { hu: "gradienscsökkentés (gradient descent)ben θ := θ − α∇J(θ).", en: "Gradient descent uses θ := θ − α∇J(θ)." } },
      { id: "d", text: { hu: "A gradienst hozzá kell adni θ-hoz, hogy lefelé menjünk.", en: "The gradient must be added to θ to move downhill." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "A gradiens (gradient) felfelé mutat, ezért descentnél kivonjuk a tanulási rátával (learning rate) skálázott gradienst.",
      en: "The gradient points uphill, so descent subtracts the gradient scaled by the learning rate."
    }
  },
  {
    id: "lr-q5",
    topics: ["gradient-descent", "convexity"],
    prompt: {
      hu: "Mely állítások igazak lineáris regresszió (linear regression) + MSE gradienscsökkentés (gradient descent) tanításra?",
      en: "Which statements are true for gradient-descent training of linear regression with MSE?"
    },
    choices: [
      { id: "a", text: { hu: "A veszteség kvadratikus (quadratic) és konvex (convex).", en: "The loss is quadratic and convex." } },
      { id: "b", text: { hu: "Megfelelően kicsi lépésméret (step size) mellett a globális optimum (global optimum) megtalálható / közelíthető.", en: "With a sufficiently small step size, the global optimum can be found / approximated." } },
      { id: "c", text: { hu: "Túl nagy tanulási ráta (learning rate) ronthatja a konvergenciát (convergence).", en: "An excessively large learning rate can harm convergence." } },
      { id: "d", text: { hu: "Ugyanez a global-optimum guarantee minden MLP-re is igaz.", en: "The same global-optimum guarantee holds for every MLP." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "lineáris regresszió (linear regression) MSE veszteség konvex (convex), ezért megfelelő lépésméret (step size) mellett gradienscsökkentés (gradient descent) a globális minimum (global minimum) felé konvergálhat. MLP veszteség általánosan nem konvex (convex), ezért ugyanez a garancia nincs.",
      en: "The MSE loss of linear regression is convex, so with an appropriate step size gradient descent can converge toward the global minimum. MLP losses are generally non-convex, so the same guarantee does not hold."
    }
  },
  {
    id: "lr-q6",
    topics: ["matrix-form", "shapes"],
    prompt: {
      hu: "Általánosan m tanítási példa (tanítási példa) és n valódi bemenet (input) jellemző (feature) esetén, ha x₀=1 tengelymetszet / eltolás (intercept) oszlopot használunk, mely alakok (shapes) helyesek?",
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
      hu: "X minden példához (example) egy sort és az n jellemző (feature) + tengelymetszet / eltolás (intercept) miatt n+1 oszlopot tartalmaz. Xθ ezért egy becslést ad mind az m példára (example).",
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
      { id: "a", text: { hu: "Lehetővé teszi, hogy az tengelymetszet / eltolás (intercept) θ₀ is a dot product része legyen.", en: "It allows the intercept θ₀ to be included in the dot product." } },
      { id: "b", text: { hu: "Minden tanítási példa (tanítási példa) esetén az értéke 1.", en: "Its value is 1 for every tanítási példa." } },
      { id: "c", text: { hu: "Ez maga a címke (label).", en: "It is the label itself." } },
      { id: "d", text: { hu: "Ez egy külön tanulandó jellemzőérték (jellemzőérték) minden példára (example).", en: "It is a separately learned jellemzőérték for every example." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "Az x₀=1 konstans oszloppal θ₀ ugyanúgy szerepelhet az Xθ dot productban, mint a többi paraméter.",
      en: "The constant x₀=1 column lets θ₀ appear in the Xθ dot product just like the other parameters."
    }
  },
  {
    id: "lr-q8",
    topics: ["normal-equation"],
    prompt: {
      hu: "Mely állítások igazak a normal equationre lineáris least squares esetén?",
      en: "Which statements are true about the normal equation for linear least squares?"
    },
    choices: [
      { id: "a", text: { hu: "θ = (XᵀX)⁻¹Xᵀy egy közvetlen megoldási képlet (formula).", en: "θ = (XᵀX)⁻¹Xᵀy is a direct solution formula." } },
      { id: "b", text: { hu: "Az előadás a θ = X⁺y pseudoinverse formát is megadja.", en: "The lecture also gives the pseudoinverse form θ = X⁺y." } },
      { id: "c", text: { hu: "Ehhez ugyanúgy sok gradienscsökkentés (gradient descent) iteráció (iteration) kötelező.", en: "It necessarily requires many gradient-descent iterations." } },
      { id: "d", text: { hu: "X és y a data alapján ismert.", en: "X and y are known from the data." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "A normal equation algebrai, egy lépéses least-squares megoldás. Az előadás a Moore–Penrose pseudoinverse alakot is megadja.",
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
      { id: "a", text: { hu: "I egységmátrix (identity matrix) (matrix).", en: "I is the identity matrix." } },
      { id: "b", text: { hu: "I alakja (shape) megegyezik XᵀX shape-jével.", en: "I has the same shape as XᵀX." } },
      { id: "c", text: { hu: "λ egy skalár (scalar) regularizáció (regularization) paraméter.", en: "λ is a scalar regularization parameter." } },
      { id: "d", text: { hu: "I a címke (label) vektor (vector).", en: "I is the label vector." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "λI hozzáadható XᵀX-hez, ezért I ugyanakkora square egységmátrix (identity matrix) (matrix). λ skalár (scalar) paraméter.",
      en: "λI is added to XᵀX, so I is an identity matrix of the same square shape. λ is a scalar parameter."
    }
  },
  {
    id: "lr-q10",
    topics: ["feature-scaling"],
    prompt: {
      hu: "Mi a jellemzőskálázás (feature scaling) fő célja az előadás szerint?",
      en: "What is the main purpose of feature scaling according to the lecture?"
    },
    choices: [
      { id: "a", text: { hu: "Az bemeneti változók (bemeneti változók) hasonló nagyságrendbe hozása.", en: "Bringing bemeneti változók to a similar order of magnitude." } },
      { id: "b", text: { hu: "A nagyon megnyúlt veszteségfelület (loss surface) és lassú konvergencia (convergence) mérséklése.", en: "Reducing the highly elongated loss surface and slow convergence problem." } },
      { id: "c", text: { hu: "A tanítás címkék (labels) számának csökkentése.", en: "Reducing the number of training labels." } },
      { id: "d", text: { hu: "A scalinget jellemzőnként (feature) külön végezzük.", en: "Scaling is performed independently for each feature." } }
    ],
    correctIds: ["a", "b", "d"],
    explanation: {
      hu: "Az előadás a különböző jellemzőskálákból (jellemzők skálái) eredő elnyúlt veszteségfelület (loss surface) és lassú gradienscsökkentés (gradient descent) konvergencia (convergence) miatt javasolja a jellemző (feature) scalinget, minden változóra (variable) külön.",
      en: "The lecture motivates feature scaling by the elongated loss surface and slow gradient-descent convergence caused by different feature scales, independently for each variable."
    }
  },
  {
    id: "lr-q11",
    topics: ["feature-scaling", "min-max"],
    prompt: {
      hu: "Mely állítások igazak a min-max scalingre a kurzus szerint?",
      en: "Which statements are true about min-max scaling according to the course?"
    },
    choices: [
      { id: "a", text: { hu: "A tárgyalt képlet (formula) a jellemzőt (feature) [0,1] intervalba skálázza.", en: "The discussed formula scales the feature to the [0,1] interval." } },
      { id: "b", text: { hu: "A képlet (formula) (x−min)/(max−min).", en: "The formula is (x−min)/(max−min)." } },
      { id: "c", text: { hu: "Az előadás szerint érzékenyebb az kiugró értékekre (outliers).", en: "According to the lecture it is more sensitive to outliers." } },
      { id: "d", text: { hu: "Az eredmény átlaga (mean) szükségszerűen 0.", en: "The eredmény necessarily has mean 0." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Min-max scaling a minimumot 0-ra, a maximumot 1-re viszi. A átlag (mean) nem lesz általában 0, és az előadás kiemeli az outlier-érzékenységet.",
      en: "Min-max scaling maps the minimum to 0 and maximum to 1. The mean is not generally 0, and the lecture highlights its sensitivity to outliers."
    }
  },
  {
    id: "lr-q12",
    topics: ["feature-scaling", "standardization"],
    prompt: {
      hu: "Mely állítások igazak standardizálás (standardization) után egy jellemzőre (feature)?",
      en: "Which statements are true for a feature after standardization?"
    },
    choices: [
      { id: "a", text: { hu: "A képlet (formula) (x−μ)/σ.", en: "The formula is (x−μ)/σ." } },
      { id: "b", text: { hu: "A transzformált jellemző (feature) átlaga (mean) 0.", en: "The transformed feature has mean 0." } },
      { id: "c", text: { hu: "A transzformált jellemző (feature) szórása (standard deviation) 1.", en: "The transformed feature has standard deviation 1." } },
      { id: "d", text: { hu: "Minden érték szükségszerűen [0,1] közé kerül.", en: "Every value necessarily lies in [0,1]." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Standardization a átlagot (mean) kivonja és szórással (standard deviation) oszt. Nem korlátozza az értékeket [0,1]-re.",
      en: "Standardization subtracts the mean and divides by standard deviation. It does not constrain values to [0,1]."
    }
  },
  {
    id: "lr-q13",
    topics: ["feature-scaling", "outliers"],
    prompt: {
      hu: "A kurzus két tárgyalt scaling módszere közül mely állítás igaz kis számú outlier esetén?",
      en: "Which statement is true, according to the course, when comparing the two discussed scaling methods in the presence of a small number of outliers?"
    },
    choices: [
      { id: "a", text: { hu: "Min-max scaling érzékenyebb az kiugró értékekre (outliers).", en: "Min-max scaling is more sensitive to outliers." } },
      { id: "b", text: { hu: "Standardization a kettő közül robusztusabb.", en: "Standardization is more robust of the two." } },
      { id: "c", text: { hu: "A két módszer outlier érzékenysége mindig teljesen azonos.", en: "The two methods always have exactly the same sensitivity to outliers." } }
    ],
    correctIds: ["a", "b"],
    explanation: {
      hu: "Az előadás explicit megjegyzése: 'Min-max scaling: More sensitive to outliers.' Ezért a két itt tárgyalt módszer közül standardizálás (standardization) a robusztusabb.",
      en: "The lecture explicitly notes: 'Min-max scaling: More sensitive to outliers.' Therefore, among these two methods, standardization is the more robust one."
    }
  },
  {
    id: "lr-q14",
    topics: ["linear-regression", "prediction"],
    prompt: {
      hu: "Egyetlen példára (example) hθ(x)=θ₁x+θ₀ lineáris regresszió (linear regression) hipotézis (hypothesis) esetén mely állítások igazak?",
      en: "For a single example with the linear-regression hypothesis hθ(x)=θ₁x+θ₀, which statements are true?"
    },
    choices: [
      { id: "a", text: { hu: "hθ(x)=ŷ egy skalár (scalar) lehet.", en: "hθ(x)=ŷ can be a scalar." } },
      { id: "b", text: { hu: "A becslés (prediction) nincs [0,1]-re korlátozva.", en: "The prediction is not restricted to [0,1]." } },
      { id: "c", text: { hu: "x az példa bemenet (input) jellemző (feature) értéke.", en: "x is the example's input-jellemzőérték." } },
      { id: "d", text: { hu: "θ₀ és θ₁ tanítóadatok (training data) values, nem modellparaméterek.", en: "θ₀ and θ₁ are training-data values, not model parameters." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: {
      hu: "Egy egyváltozós lineáris regresszió (linear regression) példa becslése skalár (scalar). θ₀ és θ₁ modellparaméterek, míg x bemenet (input) jellemzőérték (jellemzőérték).",
      en: "The prediction for one univariate linear-regression example is a scalar. θ₀ and θ₁ are model parameters, while x is the input-feature value."
    }
  }
];
