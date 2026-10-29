import type { Lesson, Question } from "../types";

export const mlpLesson: Lesson = {
  id: "artificial-neuron-mlp",
  title: {
    hu: "Artificial Neuron és Multilayer Perceptron",
    en: "Artificial Neuron and Multilayer Perceptron"
  },
  subtitle: {
    hu: "Neuronmodell, fully-connected layer, parameter count, activation functions és task-specifikus output",
    en: "Neuron model, fully connected layers, parameter counting, activation functions, and task-specific outputs"
  },
  source: "Lectures 4–5",
  sections: [
    {
      id: "artificial-neuron",
      title: {
        hu: "Az artificial neuron modell",
        en: "The artificial-neuron model"
      },
      body: {
        hu: "Egy artificial neuron weighted sumot képez az inputokból, majd activation functiont alkalmaz. A lecture szerint ha g sigmoid, akkor az artificial neuron egy multivariate logistic regression modellnek felel meg.",
        en: "An artificial neuron forms a weighted sum of its inputs and then applies an activation function. According to the lecture, if g is sigmoid, the artificial neuron corresponds to a multivariate logistic-regression model."
      },
      intuition: {
        hu: "A neuron két lépése: 1) z = weighted sum + bias; 2) output = g(z). A weights azt mondják meg, mely input mennyire számít.",
        en: "A neuron has two steps: 1) z = weighted sum + bias; 2) output = g(z). The weights determine how strongly each input contributes."
      },
      examTrap: {
        hu: "A neuron nem csak sigmoidot használhat; g lehet más activation function is. Sigmoid esetén azonban a lecture explicit logistic regression kapcsolatot mond ki.",
        en: "A neuron is not restricted to sigmoid; g can be another activation function. With sigmoid, however, the lecture explicitly identifies it with multivariate logistic regression."
      },
      formula: {
        hu: "z = w·x + b;   output = g(z)",
        en: "z = w·x + b;   output = g(z)"
      },
      keyTerms: [
        { term: "artificial neuron" },
        { term: "weight" },
        { term: "bias" },
        { term: "activation function" }
      ]
    },
    {
      id: "single-neuron-limit",
      title: {
        hu: "Mit tud egyetlen sigmoid neuron?",
        en: "What can a single sigmoid neuron represent?"
      },
      body: {
        hu: "Egyetlen sigmoid neuron egyetlen linear decision surface-t tud reprezentálni. Két input variable esetén ez egy line az x₁,x₂ plane-ben; általánosan hyperplane. Emiatt csak linearly separable problémákat tud jól megoldani.",
        en: "A single sigmoid neuron can represent one linear decision surface. With two input variables this is a line in the x₁,x₂ plane; generally it is a hyperplane. Therefore it can only solve linearly separable problems well."
      },
      intuition: {
        hu: "Ha a két class egyetlen egyenessel nem választható szét, egy sigmoid neuron expressive power-je kevés.",
        en: "If two classes cannot be separated by a single line, one sigmoid neuron's expressive power is insufficient."
      },
      examTrap: {
        hu: "A lecture XOR példája nem linearly separable, ezért single neuron nem tudja jól reprezentálni.",
        en: "The lecture's XOR example is not linearly separable, so a single neuron cannot represent it well."
      },
      keyTerms: [
        { term: "linear decision surface" },
        { term: "linearly separable" },
        { term: "XOR" }
      ]
    },
    {
      id: "why-mlp",
      title: {
        hu: "Miért kell több neuron és több layer?",
        en: "Why do we need multiple neurons and layers?"
      },
      body: {
        hu: "A lecture olyan classification feladatokat mutat, ahol egy line nem elég a classok elválasztására. Több neuron linear decision surfaces eredményeit kombinálva összetettebb decision boundary-k reprezentálhatók.",
        en: "The lecture shows classification tasks where one line is insufficient to separate classes. By combining outputs of multiple neurons and their linear decision surfaces, more complex decision boundaries can be represented."
      },
      intuition: {
        hu: "Az első layer több egyszerű 'vágást' készíthet az input space-ben, a következő layer pedig kombinálhatja ezeket.",
        en: "The first layer can create several simple 'cuts' in input space, while the next layer can combine them."
      },
      examTrap: {
        hu: "A lecture szerint akár két-layer sigmoid network is nagyon erős approximator lehet elegendő neuron mellett; ez nem azt jelenti, hogy a megfelelő weights könnyen megtalálhatók.",
        en: "According to the lecture, even a two-layer sigmoid network can be a very powerful approximator with enough neurons; this does not mean the required weights are easy to find."
      },
      keyTerms: [
        { term: "expressive power" },
        { term: "Multilayer Perceptron (MLP)" }
      ]
    },
    {
      id: "dense-layers",
      title: {
        hu: "Fully-connected / dense layer",
        en: "Fully connected / dense layer"
      },
      body: {
        hu: "Fully-connected (dense) layerben a layer minden neuronja kapcsolódik a következő layer minden neuronjához. A lecture PyTorch megfelelője a torch.nn.Linear.",
        en: "In a fully connected (dense) layer, every neuron in one layer is connected to every neuron in the next layer. The lecture identifies torch.nn.Linear as the PyTorch equivalent."
      },
      intuition: {
        hu: "Ha egy layerben S_(k−1) input érték és a következőben S_k neuron van, minden új neuron minden előző értékhez külön weightet kap.",
        en: "If a layer receives S_(k−1) values and contains S_k neurons, every new neuron receives a separate weight for every previous value."
      },
      examTrap: {
        hu: "A lecture diagramjában az input és output 'layer' elnevezés vizuális konvenció: ezekben nincs külön neuron vagy weight. A learnable fully-connected layers azok, amelyek W és b parameters értékeket tartalmaznak.",
        en: "In the lecture diagram, the input and output 'layers' are visual conventions: they do not themselves contain separate neurons or weights. Learnable fully connected layers contain W and b parameters."
      },
      keyTerms: [
        { term: "fully connected" },
        { term: "dense" },
        { term: "torch.nn.Linear" }
      ]
    },
    {
      id: "matrix-shapes",
      title: {
        hu: "Weight matrix és bias vector shape-ek",
        en: "Weight-matrix and bias-vector shapes"
      },
      body: {
        hu: "A course általános jelölése szerint layer k esetén W_k ∈ R^(S_k × S_(k−1)) és b_k ∈ R^(S_k), ahol S_k a k. layer neurons száma. S₀=n az input variables száma.",
        en: "Using the course notation, for layer k, W_k ∈ R^(S_k × S_(k−1)) and b_k ∈ R^(S_k), where S_k is the number of neurons in layer k. S₀=n is the number of input variables."
      },
      intuition: {
        hu: "W minden sora egy neuron weight vectora. Ezért S_k neuron → S_k sor; minden neuron S_(k−1) előző aktivációt kap → S_(k−1) oszlop.",
        en: "Each row of W is one neuron's weight vector. Therefore S_k neurons give S_k rows; each neuron receives S_(k−1) previous activations, giving S_(k−1) columns."
      },
      examTrap: {
        hu: "A bias nem plusz oszlopként szerepel W-ben ebben az MLP notationben: külön b vector van.",
        en: "In this MLP notation, the bias is not an extra column of W; it is stored separately in b."
      },
      formula: {
        hu: "W_k ∈ R^(S_k × S_(k−1));   b_k ∈ R^(S_k);   S₀ = n",
        en: "W_k ∈ R^(S_k × S_(k−1));   b_k ∈ R^(S_k);   S₀ = n"
      },
      keyTerms: [
        { term: "weight matrix" },
        { term: "bias vector" },
        { term: "layer size" }
      ]
    },
    {
      id: "parameter-count",
      title: {
        hu: "Parameter count",
        en: "Parameter count"
      },
      body: {
        hu: "Egy fully-connected layer parameter countja: S_k·S_(k−1) weights + S_k biases = S_k(S_(k−1)+1). Az egész network parameter countja a layerek parameter countjainak összege.",
        en: "A fully connected layer has S_k·S_(k−1) weights plus S_k biases, giving S_k(S_(k−1)+1) parameters. The total network parameter count is the sum across all layers."
      },
      intuition: {
        hu: "Minden neuronhoz annyi weight kell, ahány bemenete van, plusz egy bias.",
        en: "Each neuron needs one weight per input plus one bias."
      },
      realWorld: {
        hu: "A mintateszt 20 input → 10 hidden neuron → 1 output példájában: első layer = 10·20 + 10 = 210; második = 1·10 + 1 = 11; total = 221.",
        en: "In the example-test architecture 20 inputs → 10 hidden neurons → 1 output: first layer = 10·20 + 10 = 210; second = 1·10 + 1 = 11; total = 221."
      },
      examTrap: {
        hu: "Ne felejtsd el a bias parameters értékeket. A 20×10 weights önmagában csak 200; a first layer total 210.",
        en: "Do not forget the bias parameters. The 20×10 weights alone give only 200; the first-layer total is 210."
      },
      formula: {
        hu: "params(layer k) = S_k·S_(k−1) + S_k = S_k(S_(k−1)+1)",
        en: "params(layer k) = S_k·S_(k−1) + S_k = S_k(S_(k−1)+1)"
      },
      keyTerms: [
        { term: "parameter count" }
      ]
    },
    {
      id: "two-layer-hypothesis",
      title: {
        hu: "Two-layer MLP hypothesis",
        en: "Two-layer MLP hypothesis"
      },
      body: {
        hu: "A lecture two-layer MLP hypothesis függvénye: h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂). Θ az összes weight matrix és bias vector halmaza.",
        en: "The lecture's two-layer MLP hypothesis is h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂). Θ denotes the set of all weight matrices and bias vectors."
      },
      intuition: {
        hu: "Layer 1: linear transformation → g₁. Layer 2: újabb linear transformation → g₂. A layers outputjai egymás inputjai.",
        en: "Layer 1: linear transformation → g₁. Layer 2: another linear transformation → g₂. The output of one layer becomes the input of the next."
      },
      formula: {
        hu: "h(x) = g₂(W₂·g₁(W₁x+b₁)+b₂)",
        en: "h(x) = g₂(W₂·g₁(W₁x+b₁)+b₂)"
      },
      keyTerms: [
        { term: "hidden layer" },
        { term: "Θ" }
      ]
    },
    {
      id: "nonlinearity",
      title: {
        hu: "Miért kell hidden activation?",
        en: "Why do hidden layers need an activation?"
      },
      body: {
        hu: "A lecture kulcsállítása: multiple linear functions kompozíciója továbbra is linear. Ha a hidden layerből elhagyjuk g₁ nonlinearity-t, több fully-connected layer expressive power-je összeomlik egyetlen linear layer szintjére.",
        en: "A key lecture statement is that a composition of multiple linear functions is still linear. If g₁ nonlinearity is omitted from the hidden layer, multiple fully connected layers collapse in expressive power to a single linear layer."
      },
      intuition: {
        hu: "Két linear transformation egymás után algebrailag összevonható egy linear transformationné. A nonlinearity az, ami ezt megtöri.",
        en: "Two linear transformations in sequence can be algebraically collapsed into one linear transformation. The nonlinearity is what breaks this collapse."
      },
      examTrap: {
        hu: "Regression outputnál g₂ elhagyható, de g₁-et nem érdemes elhagyni. Ez a mintateszt egyik explicit kérdése.",
        en: "For regression, g₂ can be omitted, but g₁ should not be omitted. This is an explicit example-test question."
      },
      keyTerms: [
        { term: "nonlinearity" },
        { term: "expressive power" }
      ]
    },
    {
      id: "activations",
      title: {
        hu: "Sigmoid, tanh és ReLU",
        en: "Sigmoid, tanh, and ReLU"
      },
      body: {
        hu: "A lecture három popular activation functiont mutat: sigmoid, tanh és ReLU. Sigmoid output 0 és 1 között; tanh −1 és 1 között; ReLU(z)=max(0,z), tehát negatív inputokra 0, pozitív inputokra az input maga.",
        en: "The lecture presents three popular activation functions: sigmoid, tanh, and ReLU. Sigmoid outputs between 0 and 1; tanh between −1 and 1; ReLU(z)=max(0,z), so it outputs 0 for negative inputs and the input itself for positive inputs."
      },
      intuition: {
        hu: "ReLU egyszerű piecewise-linear nonlinearity; a lecture megjegyzése szerint könnyű számolni és szinte mindig jól működik.",
        en: "ReLU is a simple piecewise-linear nonlinearity; the lecture notes that it is easy to compute and almost always works well."
      },
      formula: {
        hu: "sigmoid(z)=1/(1+e^(−z));   tanh(z)=(e^(2z)−1)/(e^(2z)+1);   ReLU(z)=max(0,z)",
        en: "sigmoid(z)=1/(1+e^(−z));   tanh(z)=(e^(2z)−1)/(e^(2z)+1);   ReLU(z)=max(0,z)"
      },
      keyTerms: [
        { term: "sigmoid" },
        { term: "tanh" },
        { term: "ReLU" }
      ]
    },
    {
      id: "regression-output",
      title: {
        hu: "MLP regression: hidden nonlinearity, identity output",
        en: "MLP regression: hidden nonlinearity, identity output"
      },
      body: {
        hu: "Regressionnél a lecture továbbra is nonlinear hidden activationt használ (például ReLU), de az utolsó g₂ activation tipikusan identity, vagyis elhagyható. Loss: MSE.",
        en: "For regression, the lecture still uses a nonlinear hidden activation such as ReLU, but the final g₂ activation is typically identity and can be omitted. Loss: MSE."
      },
      intuition: {
        hu: "A hidden ReLU ad nonlinear expressive power-t. Az output viszont arbitrary real értéket becsülhet, ezért nem akarjuk sigmoid által [0,1]-re korlátozni.",
        en: "The hidden ReLU provides nonlinear expressive power. The output may need to estimate arbitrary real values, so we do not want a sigmoid to restrict it to [0,1]."
      },
      examTrap: {
        hu: "Regressionnél: g₁-et ne hagyd el; g₂ tipikusan identity/omit; sigmoid g₂ általában rossz választás arbitrary continuous targethoz.",
        en: "For regression: do not omit g₁; g₂ is typically identity/omitted; sigmoid g₂ is generally unsuitable for an arbitrary continuous target."
      },
      keyTerms: [
        { term: "identity activation" },
        { term: "MSE" }
      ]
    },
    {
      id: "binary-output",
      title: {
        hu: "MLP binary classification output",
        en: "MLP binary-classification output"
      },
      body: {
        hu: "Single binary label esetén a lecture logikája logistic regressionből folytatódik: scalar probability output, sigmoid final activation és Binary Cross-Entropy / logistic loss.",
        en: "For a single binary label, the lecture continues the logistic-regression setup: scalar probability output, sigmoid final activation, and Binary Cross-Entropy / logistic loss."
      },
      intuition: {
        hu: "A hidden layers összetett feature representationt tanulhatnak; az utolsó sigmoid ezt egyetlen 0–1 probability-vé alakítja.",
        en: "Hidden layers can learn a complex feature representation; the final sigmoid turns it into one probability between 0 and 1."
      },
      examTrap: {
        hu: "A hidden activation és output activation szerepe nem ugyanaz: hidden nonlinearity expressive power-t ad, output activation a task output semantics-hoz igazodik.",
        en: "Hidden and output activations do not serve the same role: hidden nonlinearities provide expressive power, while the output activation matches the semantics of the task."
      },
      keyTerms: [
        { term: "binary classification" },
        { term: "BCE" }
      ]
    },
    {
      id: "multi-output-regression",
      title: {
        hu: "Multiple-output regression",
        en: "Multiple-output regression"
      },
      body: {
        hu: "Regressionnél y és ŷ vector is lehet, ha egyszerre több continuous label variable-t becslünk. A final activation továbbra is tipikusan identity. A lecture szerint az MSE-t ilyenkor a label vector elemein is átlagoljuk.",
        en: "For regression, y and ŷ can be vectors when predicting multiple continuous label variables at once. The final activation is still typically identity. According to the lecture, MSE is then also averaged over elements of the label vector."
      },
      examTrap: {
        hu: "Multiple output nem automatikusan multiclass classification: lehet multiple continuous regression target is.",
        en: "Multiple outputs do not automatically mean multiclass classification: they can also represent multiple continuous regression targets."
      },
      keyTerms: [
        { term: "multiple label variables" },
        { term: "vector output" }
      ]
    },
    {
      id: "multiclass",
      title: {
        hu: "Multiclass classification: Softmax",
        en: "Multiclass classification: Softmax"
      },
      body: {
        hu: "Több mutually exclusive category esetén a lecture minden category-hoz probability-t becsül. A final activation softmax; output dimension k a categories száma. A softmax output elemei pozitív probability-k és összegük 1.",
        en: "For multiple mutually exclusive categories, the lecture estimates a probability for each category. The final activation is softmax; output dimension k equals the number of categories. Softmax outputs positive probabilities whose sum is 1."
      },
      formula: {
        hu: "softmax(z)_i = e^(z_i) / Σⱼ₌₁ᵏ e^(z_j)",
        en: "softmax(z)_i = e^(z_i) / Σⱼ₌₁ᵏ e^(z_j)"
      },
      examTrap: {
        hu: "10-class MNIST esetén 10 output probability kell, nem egyetlen sigmoid scalar.",
        en: "For 10-class MNIST, 10 output probabilities are needed, not a single sigmoid scalar."
      },
      keyTerms: [
        { term: "softmax" },
        { term: "multiclass classification" }
      ]
    },
    {
      id: "cross-entropy",
      title: {
        hu: "Multiclass Cross-Entropy és one-hot label",
        en: "Multiclass Cross-Entropy and one-hot labels"
      },
      body: {
        hu: "Multiclass classificationnél a course Cross-Entropy (CE) losst használ, a BCE/logistic loss generalizációjaként. A true label y one-hot encoded: a true category eleme 1, a többi 0. ŷ a category probabilities vector.",
        en: "For multiclass classification, the course uses Cross-Entropy (CE) loss as a generalization of BCE/logistic loss. The true label y is one-hot encoded: the true-category element is 1 and all others are 0. ŷ is the vector of category probabilities."
      },
      formula: {
        hu: "J(Θ) = −1/m · Σⱼ₌₁ᵐ Σᵢ₌₁ᵏ yᵢ⁽ʲ⁾ log(ŷᵢ⁽ʲ⁾)",
        en: "J(Θ) = −1/m · Σⱼ₌₁ᵐ Σᵢ₌₁ᵏ yᵢ⁽ʲ⁾ log(ŷᵢ⁽ʲ⁾)"
      },
      examTrap: {
        hu: "One-hot true label nem probability prediction. y például [0,1,0,0], míg ŷ például [0.64,0.21,0.06,0.09].",
        en: "A one-hot true label is not the probability prediction. For example y may be [0,1,0,0], while ŷ may be [0.64,0.21,0.06,0.09]."
      },
      keyTerms: [
        { term: "Cross-Entropy (CE)" },
        { term: "one-hot encoding" }
      ]
    }
  ]
};

export const mlpQuestions: Question[] = [
  {
    id: "mlp-q1",
    topics: ["artificial-neuron"],
    prompt: { hu: "Mely állítások igazak egy artificial neuronra?", en: "Which statements are true about an artificial neuron?" },
    choices: [
      { id: "a", text: { hu: "Weighted sumot képez az inputokból.", en: "It forms a weighted sum of its inputs." } },
      { id: "b", text: { hu: "Activation functiont alkalmazhat a weighted sumra.", en: "It can apply an activation function to the weighted sum." } },
      { id: "c", text: { hu: "Sigmoid g esetén multivariate logistic regressionnek felel meg.", en: "With sigmoid g, it corresponds to multivariate logistic regression." } },
      { id: "d", text: { hu: "Mindig ReLU activationt kell használnia.", en: "It must always use ReLU activation." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A neuron weighted sum + activation szerkezetű. Sigmoid esetén a lecture explicit logistic-regression kapcsolatot mond ki.", en: "A neuron has a weighted-sum + activation structure. With sigmoid, the lecture explicitly identifies it with logistic regression." }
  },
  {
    id: "mlp-q2",
    topics: ["artificial-neuron","expressive-power"],
    prompt: { hu: "Mit tud egyetlen sigmoid neuron classificationnél?", en: "What can a single sigmoid neuron represent in classification?" },
    choices: [
      { id: "a", text: { hu: "Egyetlen linear decision surface-t.", en: "A single linear decision surface." } },
      { id: "b", text: { hu: "Két inputnál egy line decision boundary-t.", en: "With two inputs, a line decision boundary." } },
      { id: "c", text: { hu: "Általánosan linearly separable problémákra alkalmas.", en: "It is suitable for linearly separable problems in general." } },
      { id: "d", text: { hu: "Bármilyen XOR-like boundary-t egyedül is reprezentál.", en: "It can represent any XOR-like boundary by itself." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A lecture szerint single neuron csak linearly separable problémákat tud megoldani; XOR nem ilyen.", en: "According to the lecture, a single neuron can only solve linearly separable problems; XOR is not one." }
  },
  {
    id: "mlp-q3",
    topics: ["fully-connected"],
    prompt: { hu: "Mit jelent a fully-connected / dense layer?", en: "What does a fully connected / dense layer mean?" },
    choices: [
      { id: "a", text: { hu: "Minden neuron kapcsolódik a következő layer minden neuronjához.", en: "Every neuron is connected to every neuron in the next layer." } },
      { id: "b", text: { hu: "PyTorchban torch.nn.Linear reprezentálhatja.", en: "In PyTorch it can be represented by torch.nn.Linear." } },
      { id: "c", text: { hu: "Nincsenek learnable weights.", en: "It has no learnable weights." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Dense layerben teljes kapcsolati weight matrix és bias vector van.", en: "A dense layer contains a full connection weight matrix and bias vector." }
  },
  {
    id: "mlp-q4",
    topics: ["mlp-shapes"],
    prompt: { hu: "Ha layer k−1 mérete S_(k−1), layer k-ben S_k neuron van, mely shape-ek helyesek?", en: "If layer k−1 has size S_(k−1) and layer k contains S_k neurons, which shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "W_k: (S_k, S_(k−1)).", en: "W_k: (S_k, S_(k−1))." } },
      { id: "b", text: { hu: "b_k: (S_k,).", en: "b_k: (S_k,)." } },
      { id: "c", text: { hu: "S₀ az input variables száma.", en: "S₀ is the number of input variables." } },
      { id: "d", text: { hu: "b_k shape-je mindig ugyanaz, mint W_k.", en: "b_k always has the same shape as W_k." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Ez pontosan a lecture általános matrix notationje.", en: "This is exactly the general matrix notation given in the lecture." }
  },
  {
    id: "mlp-q5",
    topics: ["parameter-count"],
    prompt: { hu: "20 input variable → 10-neuron first layer esetén hány parameter van az első fully-connected layerben?", en: "With 20 input variables → a 10-neuron first layer, how many parameters are in the first fully connected layer?" },
    choices: [
      { id: "a", text: { hu: "200 weights.", en: "200 weights." } },
      { id: "b", text: { hu: "10 biases.", en: "10 biases." } },
      { id: "c", text: { hu: "210 total parameters.", en: "210 total parameters." } },
      { id: "d", text: { hu: "200 total parameters.", en: "200 total parameters." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "W₁: 10×20=200; b₁: 10; total=210.", en: "W₁: 10×20=200; b₁: 10; total=210." }
  },
  {
    id: "mlp-q6",
    topics: ["parameter-count"],
    prompt: { hu: "20 input → 10 hidden neuron → 1 output neuron two-layer MLP esetén hány total parameter van?", en: "For a two-layer MLP with 20 inputs → 10 hidden neurons → 1 output neuron, how many total parameters are there?" },
    choices: [
      { id: "a", text: { hu: "210 az első layerben.", en: "210 in the first layer." } },
      { id: "b", text: { hu: "11 a második layerben.", en: "11 in the second layer." } },
      { id: "c", text: { hu: "221 összesen.", en: "221 total." } },
      { id: "d", text: { hu: "211 összesen.", en: "211 total." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Layer1=10·20+10=210; layer2=1·10+1=11; total=221.", en: "Layer1=10·20+10=210; layer2=1·10+1=11; total=221." }
  },
  {
    id: "mlp-q7",
    topics: ["mlp-hypothesis"],
    prompt: { hu: "Melyik formula felel meg a lecture two-layer MLP hypothesisának?", en: "Which formula matches the lecture's two-layer MLP hypothesis?" },
    choices: [
      { id: "a", text: { hu: "h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂).", en: "h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂)." } },
      { id: "b", text: { hu: "Θ={W₁,b₁,W₂,b₂}.", en: "Θ={W₁,b₁,W₂,b₂}." } },
      { id: "c", text: { hu: "A layers egymás outputjára épülnek.", en: "Layers operate on outputs of previous layers." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Ez a lecture közvetlen notationje.", en: "This is the notation used directly in the lecture." }
  },
  {
    id: "mlp-q8",
    topics: ["activation-functions","regression"],
    prompt: { hu: "Regression task, 20 input, 10 hidden neuron, 1 continuous output. Mely állítások igazak?", en: "Regression task, 20 inputs, 10 hidden neurons, 1 continuous output. Which statements are true?" },
    choices: [
      { id: "a", text: { hu: "g₁ nonlinearity-t érdemes megtartani.", en: "The g₁ nonlinearity should be kept." } },
      { id: "b", text: { hu: "g₂ tipikusan identity / elhagyható.", en: "g₂ is typically identity / can be omitted." } },
      { id: "c", text: { hu: "g₂ sigmoid kötelező.", en: "g₂ must be sigmoid." } },
      { id: "d", text: { hu: "MSE megfelelő loss.", en: "MSE is an appropriate loss." } }
    ],
    correctIds: ["a","b","d"],
    explanation: { hu: "Hidden nonlinearity kell expressive powerhez; arbitrary continuous outputnál final identity és MSE illeszkedik a lecture-höz.", en: "Hidden nonlinearity is needed for expressive power; for arbitrary continuous output, final identity and MSE match the lecture." }
  },
  {
    id: "mlp-q9",
    topics: ["activation-functions"],
    prompt: { hu: "Mi történik, ha minden activation identity egy több-layer MLP-ben?", en: "What happens if every activation is identity in a multilayer MLP?" },
    choices: [
      { id: "a", text: { hu: "Multiple linear functions kompozíciója továbbra is linear.", en: "A composition of multiple linear functions remains linear." } },
      { id: "b", text: { hu: "Az expressive power egy single linear layer szintjére esik vissza.", en: "Expressive power collapses to that of a single linear layer." } },
      { id: "c", text: { hu: "A hálózat ettől automatikusan nonlinear lesz.", en: "The network automatically becomes nonlinear." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Ez a lecture explicit indoka hidden activation használatára.", en: "This is the lecture's explicit reason for using hidden activations." }
  },
  {
    id: "mlp-q10",
    topics: ["activation-functions","sigmoid"],
    prompt: { hu: "Mely állítások igazak sigmoid activationre?", en: "Which statements are true about sigmoid activation?" },
    choices: [
      { id: "a", text: { hu: "Outputja 0 és 1 között van.", en: "Its output lies between 0 and 1." } },
      { id: "b", text: { hu: "Formula: 1/(1+e^(−z)).", en: "Formula: 1/(1+e^(−z))." } },
      { id: "c", text: { hu: "Binary probability outputhoz használható.", en: "It can be used for a binary-probability output." } },
      { id: "d", text: { hu: "Outputja −1 és 1 között van.", en: "Its output lies between −1 and 1." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "−1..1 a tanh range-e, nem sigmoidé.", en: "−1..1 is the range of tanh, not sigmoid." }
  },
  {
    id: "mlp-q11",
    topics: ["activation-functions","tanh"],
    prompt: { hu: "Mely állítások igazak tanh activationre a lecture alapján?", en: "Which statements are true about tanh activation according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "Output range-e −1 és 1 között van.", en: "Its output range is between −1 and 1." } },
      { id: "b", text: { hu: "Nonlinear activation function.", en: "It is a nonlinear activation function." } },
      { id: "c", text: { hu: "Ugyanaz, mint ReLU.", en: "It is the same as ReLU." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A lecture külön grafikonon mutatja tanh-t −1..1 tartománnyal.", en: "The lecture shows tanh separately with range −1..1." }
  },
  {
    id: "mlp-q12",
    topics: ["activation-functions","relu"],
    prompt: { hu: "Mely állítások igazak ReLU-ra?", en: "Which statements are true about ReLU?" },
    choices: [
      { id: "a", text: { hu: "ReLU(z)=max(0,z).", en: "ReLU(z)=max(0,z)." } },
      { id: "b", text: { hu: "Negatív inputokra 0.", en: "It outputs 0 for negative inputs." } },
      { id: "c", text: { hu: "Pozitív inputokra az inputot adja vissza.", en: "For positive inputs it returns the input." } },
      { id: "d", text: { hu: "Output mindig kisebb vagy egyenlő 1-gyel.", en: "Its output is always less than or equal to 1." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "ReLU pozitív oldalon nincs 1-re korlátozva.", en: "ReLU is not capped at 1 on the positive side." }
  },
  {
    id: "mlp-q13",
    topics: ["binary-classification","output-layer"],
    prompt: { hu: "Single-label binary classification MLP output layeréhez mely párosítások illeszkednek a course-höz?", en: "Which choices match the course for the output layer of a single-label binary-classification MLP?" },
    choices: [
      { id: "a", text: { hu: "1 output neuron.", en: "1 output neuron." } },
      { id: "b", text: { hu: "Sigmoid final activation.", en: "Sigmoid final activation." } },
      { id: "c", text: { hu: "BCE / logistic loss.", en: "BCE / logistic loss." } },
      { id: "d", text: { hu: "Identity final activation + MSE az alapértelmezett választás.", en: "Identity final activation + MSE is the default choice." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A binary setup a logistic-regression probability-output logikáját követi.", en: "The binary setup follows the logistic-regression probability-output logic." }
  },
  {
    id: "mlp-q14",
    topics: ["multiclass","softmax"],
    prompt: { hu: "10 mutually exclusive class esetén mely állítások igazak?", en: "With 10 mutually exclusive classes, which statements are true?" },
    choices: [
      { id: "a", text: { hu: "10 output probability becslése indokolt.", en: "Estimating 10 output probabilities is appropriate." } },
      { id: "b", text: { hu: "Softmax final activation használható.", en: "Softmax can be used as the final activation." } },
      { id: "c", text: { hu: "A softmax output elemeinek összege 1.", en: "Softmax output elements sum to 1." } },
      { id: "d", text: { hu: "Egyetlen sigmoid scalar szükségszerűen elegendő.", en: "A single sigmoid scalar is necessarily sufficient." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A lecture multiclass esetben category-nként probability-t becsül softmaxszal.", en: "For multiclass classification, the lecture estimates one probability per category using softmax." }
  },
  {
    id: "mlp-q15",
    topics: ["softmax"],
    prompt: { hu: "Mely állítások igazak softmaxra?", en: "Which statements are true about softmax?" },
    choices: [
      { id: "a", text: { hu: "Vector inputból vector outputot készít.", en: "It maps a vector input to a vector output." } },
      { id: "b", text: { hu: "Minden output component category probabilityként értelmezhető.", en: "Each output component can be interpreted as a category probability." } },
      { id: "c", text: { hu: "Az output components összege 1.", en: "The output components sum to 1." } },
      { id: "d", text: { hu: "Formula komponensenként e^(z_i)/Σ_j e^(z_j).", en: "Component-wise formula is e^(z_i)/Σ_j e^(z_j)." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Mind a négy a lecture softmax definíciójának része.", en: "All four are part of the lecture's softmax definition." }
  },
  {
    id: "mlp-q16",
    topics: ["cross-entropy","one-hot"],
    prompt: { hu: "Mely állítások igazak multiclass CE loss esetén?", en: "Which statements are true for multiclass CE loss?" },
    choices: [
      { id: "a", text: { hu: "A true label y one-hot encoded lehet.", en: "The true label y can be one-hot encoded." } },
      { id: "b", text: { hu: "A true category helyén 1, a többi helyen 0 van.", en: "The true category has value 1 and the others 0." } },
      { id: "c", text: { hu: "ŷ category-probabilities vector.", en: "ŷ is a vector of category probabilities." } },
      { id: "d", text: { hu: "CE a BCE/logistic loss generalizációja.", en: "CE is a generalization of BCE/logistic loss." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Ez pontosan a Lecture 5 multiclass részének framingje.", en: "This is exactly how Lecture 5 frames the multiclass case." }
  },
  {
    id: "mlp-q17",
    topics: ["multiple-output-regression"],
    prompt: { hu: "Két continuous targetot becslő regression MLP-nél mely állítások igazak?", en: "For a regression MLP predicting two continuous targets, which statements are true?" },
    choices: [
      { id: "a", text: { hu: "y és ŷ vector lehet.", en: "y and ŷ can be vectors." } },
      { id: "b", text: { hu: "Final activation tipikusan identity.", en: "The final activation is typically identity." } },
      { id: "c", text: { hu: "MSE a label-vector elemein is átlagolható.", en: "MSE can also be averaged over elements of the label vector." } },
      { id: "d", text: { hu: "Softmax kötelező, mert több output van.", en: "Softmax is required simply because there are multiple outputs." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Multiple output lehet multiple continuous regression label is; softmax csak multiclass probability semantics miatt kell.", en: "Multiple outputs can represent multiple continuous regression labels; softmax is needed for multiclass probability semantics, not merely because output is a vector." }
  },
  {
    id: "mlp-q18",
    topics: ["output-layer","task-selection"],
    prompt: { hu: "Mely task → final activation / loss párok helyesek a course szerint?", en: "Which task → final activation / loss pairings are correct according to the course?" },
    choices: [
      { id: "a", text: { hu: "Regression → identity output + MSE.", en: "Regression → identity output + MSE." } },
      { id: "b", text: { hu: "Binary classification → sigmoid output + BCE.", en: "Binary classification → sigmoid output + BCE." } },
      { id: "c", text: { hu: "Multiclass classification → softmax output + CE.", en: "Multiclass classification → softmax output + CE." } },
      { id: "d", text: { hu: "Regression → softmax + CE kötelező.", en: "Regression → softmax + CE is required." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A final activation és loss a target semantics-hoz igazodik.", en: "The final activation and loss are chosen to match target semantics." }
  },
  {
    id: "mlp-q19",
    topics: ["parameter-count","multiclass"],
    prompt: { hu: "20 input → 10 hidden neuron → 4-class softmax output esetén hány parameter van?", en: "For 20 inputs → 10 hidden neurons → 4-class softmax output, how many parameters are there?" },
    choices: [
      { id: "a", text: { hu: "First layer: 210.", en: "First layer: 210." } },
      { id: "b", text: { hu: "Second layer: 4·10+4=44.", en: "Second layer: 4·10+4=44." } },
      { id: "c", text: { hu: "Total: 254.", en: "Total: 254." } },
      { id: "d", text: { hu: "Total: 250.", en: "Total: 250." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "210 + 44 = 254. A 4 output neuron mindegyike 10 weightet és 1 biast kap.", en: "210 + 44 = 254. Each of the 4 output neurons receives 10 weights and one bias." }
  },
  {
    id: "mlp-q20",
    topics: ["training","parameters"],
    prompt: { hu: "Mely állítások igazak MLP trainingre a lecture szerint?", en: "Which statements are true about MLP training according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "Θ az összes weights és biases halmaza.", en: "Θ is the set of all weights and biases." } },
      { id: "b", text: { hu: "A loss gradientjét minden parameter szerint számítjuk.", en: "The gradient of the loss is computed with respect to every parameter." } },
      { id: "c", text: { hu: "Gradient-descent-based training használható.", en: "Gradient-descent-based training can be used." } },
      { id: "d", text: { hu: "A weights nem learnable parameters.", en: "Weights are not learnable parameters." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A lecture Θ-t az összes weight-matrix és bias-vector elemeiként definiálja, és ezek szerint számít gradientet.", en: "The lecture defines Θ as all elements of weight matrices and bias vectors and computes gradients with respect to them." }
  }
];
