/**
 * Context is reproduced from the parent example in the Theory Test 1
 * document, rather than invented as a new question.
 * Display the original English subquestion independently.
 */
export type SourceContext = { hu: string; en: string };

const cholesterol: SourceContext = {
  en: "Given an example task: We would like to predict the cholesterol level of patients based on their personal attributes: weight, age, height, sex. We would like to train a model on our training set which contains 200 patients, each with the 4 attributes mentioned above plus the cholesterol level values provided.",
  hu: "Példa a dokumentumból: 200 beteg koleszterinszintjét becsüljük testsúly, életkor, magasság és nem alapján. Mind a négy bemeneti jellemző és a koleszterinszint célértéke rendelkezésre áll."
};
const illness: SourceContext = {
  en: "Given an example task: We would like to distinguish patients with a certain illness from healthy persons based on two of their laboratory blood test result values. We would like to train a model on our training set which contains 100 patients, each with the 2 attributes mentioned above plus their label storing whether they have the illness or not.",
  hu: "Példa a dokumentumból: 100 beteg két laborvizsgálati értékéből azt becsüljük, hogy beteg vagy egészséges. A tanítóadat a két bemeneti értéket és a bináris célcímkét tartalmazza."
};
const mlp: SourceContext = {
  en: "Consider the following hypothesis function of a Multi-Layer Perceptron: h(x)=g₂(W₂g₁(W₁x+b₁)+b₂). We would like to use this MLP to solve a regression task with 20 input variables and we would like to estimate a single continuous value.",
  hu: "Példa a dokumentumból: a h(x)=g₂(W₂g₁(W₁x+b₁)+b₂) képletű MLP regressziót végez 20 bemeneti változóból, és egy folytonos értéket becsül."
};

export function originalDocumentContext(id: string): SourceContext {
  if (id.startsWith("M")) {
    const n = Number(id.slice(1));
    if (n === 8 || n === 9) return {
      hu: "A dokumentum az alábbi feladatok típusát és célját kéri összehasonlítani: regresszió, osztályozás, klaszterezés, dimenziócsökkentés, zajszűrés.",
      en: "Given different machine learning tasks (regression, classification, clustering, dimensionality reduction, denoising):"
    };
    if (n === 26 || n === 27) return n === 26 ? {
      hu: "A lineáris regresszió hipotézisfüggvényének geometriai értelmezése egy bemeneti változóval, az x–y síkon.",
      en: "Geometric interpretation of a linear regression hypothesis with 1 input variable, visualized on a 2D plot with x and y axes."
    } : {
      hu: "A lineáris regresszió hipotézisfüggvényének geometriai értelmezése két bemeneti változóval, háromdimenziós ábrán.",
      en: "Geometric interpretation of a linear regression hypothesis with 2 input variables, visualized on a 3D plot."
    };
    if (n === 79 || n === 80) return n === 79 ? {
      hu: "A számítási gráf egyik csomópontja négyzetre emel: c=b². Adott grad_c=∂J/∂c. A cél a b felé visszaterjesztett gradiens meghatározása.",
      en: "Given a computational graph for J containing a square node c=b², with grad_c=∂J/∂c. Determine the gradient propagated back to b."
    } : {
      hu: "A számítási gráf egyik csomópontja összead: c=a+b. Adott grad_c=∂J/∂c. A cél az a és b felé visszaterjesztett gradiensek meghatározása.",
      en: "Given a computational graph for J containing an addition node c=a+b, with grad_c=∂J/∂c. Determine the gradients propagated back to a and b."
    };
    if (n >= 12 && n <= 32) {
      const base = cholesterol;
      if (n >= 15 && n <= 22) return {
        hu: base.hu + " A hipotézis: ŷ=Xθ (az X minden sora egy beteg adatait tartalmazza).",
        en: base.en + " In this case, the hypothesis is ŷ=Xθ, where X is the matrix of all training examples."
      };
      if (n >= 23 && n <= 25) return {
        hu: base.hu + " Egy beteg becslése: ŷ=θ₄x₄+θ₃x₃+θ₂x₂+θ₁x₁+θ₀.",
        en: base.en + " For one patient, ŷ=θ₄x₄+θ₃x₃+θ₂x₂+θ₁x₁+θ₀ is a scalar."
      };
      if (n >= 28 && n <= 32) return {
        hu: base.hu + " A regularizált normálegyenlet: θ=(XᵀX+λI)⁻¹Xᵀy.",
        en: base.en + " Using least squares (MSE loss), consider the regularized normal equation θ=(XᵀX+λI)⁻¹Xᵀy."
      };
      return base;
    }
    if (n >= 39 && n <= 55) {
      if (n >= 42 && n <= 51) return {
        hu: illness.hu + " A hipotézis: ŷ=g(Xθ), ahol g a szigmoid.",
        en: illness.en + " The hypothesis is ŷ=g(Xθ), where g is the sigmoid function."
      };
      if (n >= 52 && n <= 55) return {
        hu: illness.hu + " Egy beteghez: ŷ=g(θ₂x₂+θ₁x₁+θ₀).",
        en: illness.en + " For a single patient, ŷ=g(θ₂x₂+θ₁x₁+θ₀), a scalar."
      };
      return illness;
    }
    if (n >= 56 && n <= 59) return {
      en: "Consider the following loss function: J(Θ)=(1/(2m)) Σⱼ₌₁ᵐ (ŷ⁽ʲ⁾−y⁽ʲ⁾)².",
      hu: "Tekintsük a dokumentum négyzetes veszteségfüggvényét: J(Θ)=(1/(2m)) Σⱼ₌₁ᵐ (ŷ⁽ʲ⁾−y⁽ʲ⁾)²."
    };
    if (n >= 60 && n <= 64) return mlp;
    return { hu: "", en: "" };
  }
  if (id.startsWith("N")) {
    const n = Number(id.slice(1));
    if (n <= 8) return {
      hu: "Feltételezzük, hogy my_array egy numpy.ndarray példány.",
      en: "If my_array is a numpy.ndarray instance:"
    };
    if (n <= 15 || (n >= 20 && n <= 28)) return {
      hu: "A my_array nevű numpy.ndarray alakja (32,5).",
      en: "If my_array is a numpy.ndarray instance with a shape of (32, 5):"
    };
    if (n <= 19) return {
      hu: "my_array1.shape=(32,5), my_array2.shape=(32,); mindkét ndarray numerikus adattípusú.",
      en: "If my_array1 is a numpy.ndarray with shape (32, 5) and my_array2 is a numpy.ndarray with shape (32,), both of numeric data types:"
    };
    if (n <= 33 || (n >= 41 && n <= 43)) return {
      hu: "my_array=np.arange(4).reshape(2,-1).",
      en: "Let my_array be defined in the following way: my_array = np.arange(4).reshape(2, -1)"
    };
    if (n <= 40) return {
      hu: "my_array=np.arange(4).",
      en: "Let my_array be defined in the following way: my_array = np.arange(4)"
    };
    return {
      hu: "my_array=np.array([3,1,2]).",
      en: "Let my_array be defined in the following way: my_array = np.array([3, 1, 2])"
    };
  }
  return { hu: "", en: "" };
}
