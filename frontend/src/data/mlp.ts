import type { Lesson, Question } from "../types";

export const mlpLesson: Lesson = {
  id: "artificial-neuron-mlp",
  title: {
    hu: "Mesterséges neuron és többrétegű perceptron",
    en: "Artificial Neuron and Multilayer Perceptron"
  },
  subtitle: {
    hu: "A súlyozott összegtől az aktivációs függvényeken és teljesen összekötött rétegeken át a megfelelő kimeneti rétegig",
    en: "From weighted sums and activation functions through fully connected layers to task-specific output layers"
  },
  source: "Lectures 4–6",
  sections: [
    {
      id: "artificial-neuron",
      title: {
        hu: "A mesterséges neuron alapötlete",
        en: "The basic idea of an artificial neuron"
      },
      body: {
        hu: "Egy mesterséges neuron (artificial neuron) több bemeneti jellemzőből súlyozott összeget számol, hozzáad egy eltolást (bias), majd az eredményt egy aktivációs függvényen (activation function) vezeti át. A lineáris rész ugyanazt a szerkezetet követi, mint a többváltozós lineáris vagy logisztikus regresszió: z=W·x+b, majd a neuron kimenete a=g(z).",
        en: "An artificial neuron computes a weighted sum of multiple input features, adds a bias, and passes the result through an activation function. Its linear part follows the same structure as multivariate linear or logistic regression: z=W·x+b, followed by a=g(z)."
      },
      why: {
        hu: "A súlyok (weights) szabályozzák, hogy az egyes bemenetek milyen erősen hassanak a neuronra. Az aktivációs függvény teszi lehetővé, hogy a neuron ne csak tisztán lineáris leképezést valósítson meg.",
        en: "Weights control how strongly each input influences the neuron. The activation function allows the neuron to implement more than a purely linear mapping."
      },
      formula: {
        hu: "z = w₁x₁ + … + wₙxₙ + b    →    a = g(z)",
        en: "z = w₁x₁ + … + wₙxₙ + b    →    a = g(z)"
      },
      formulaTerms: [
        { symbol: "xᵢ", hu: "Az i-edik bemeneti jellemző.", en: "The i-th input feature." },
        { symbol: "wᵢ", hu: "Az i-edik bemenethez tartozó tanulható súly (weight).", en: "Learnable weight for input i." },
        { symbol: "b", hu: "Tanulható eltolás (bias).", en: "Learnable bias." },
        { symbol: "z", hu: "Az aktiváció előtti lineáris pontszám, más néven preaktiváció (pre-activation).", en: "Linear score before the activation, also called pre-activation." },
        { symbol: "g", hu: "Az aktivációs függvény (activation function).", en: "The activation function." },
        { symbol: "a", hu: "A neuron aktiváció utáni kimenete.", en: "Neuron output after the activation." }
      ],
      connections: {
        hu: "A lecture explicit megjegyzése szerint ha g a szigmoid függvény, akkor egy mesterséges neuron többváltozós logisztikus regressziónak tekinthető.",
        en: "The lecture explicitly notes that if g is sigmoid, an artificial neuron is equivalent to multivariate logistic regression."
      },
      examTrap: {
        hu: "A b eltolás (bias) ugyanazt a szerepet tölti be, mint a korábbi θ₀ konstans tag. A W és b jelölés a neurális hálózatok mátrixos jelölése, míg θ-t korábban lineáris/logisztikus regressziónál használtuk.",
        en: "The bias b plays the same role as the earlier θ₀ constant term. W and b are common matrix-form neural-network notation, while θ was used earlier for linear/logistic regression."
      },
      keyTerms: [
        { term: "artificial neuron", hu: "mesterséges neuron" },
        { term: "weight", hu: "súly" },
        { term: "bias", hu: "eltolás" },
        { term: "activation function", hu: "aktivációs függvény" }
      ]
    },
    {
      id: "single-neuron-limit",
      title: {
        hu: "Miért nem elég egyetlen neuron?",
        en: "Why is one neuron not enough?"
      },
      body: {
        hu: "Egyetlen szigmoid neuronnal kapott döntési határ lineáris: két bemeneti változó esetén egy egyenes, magasabb dimenzióban hipersík. A Lecture 5 IRIS-példája azt mutatja, hogy bizonyos kategóriák nem választhatók szét egyetlen ilyen lineáris határral.",
        en: "A single sigmoid neuron produces a linear decision boundary: a line for two input variables and a hyperplane in higher dimensions. The Lecture 5 IRIS example shows that some categories cannot be separated by one such boundary."
      },
      why: {
        hu: "Ha az osztályok elrendezése nem lineárisan szeparálható (linearly separable), akkor bármilyen súlyokat választunk, egyetlen lineáris határ nem tudja jól szétválasztani őket. Több neuron és több réteg összetettebb döntési felületeket tud létrehozni.",
        en: "If classes are not linearly separable, no choice of weights lets a single linear boundary separate them correctly. Multiple neurons and layers can form more complex decision surfaces."
      },
      intuition: {
        hu: "Az XOR a klasszikus szemléltető példa: négy pontból az átlósan elhelyezkedő párok tartoznak ugyanabba az osztályba, amit egyetlen egyenes nem tud szétválasztani.",
        en: "XOR is the classic illustration: diagonally opposite pairs belong to the same class, which cannot be separated by a single straight line."
      },
      connections: {
        hu: "Ez motiválja a többrétegű perceptron (Multilayer Perceptron, MLP) használatát: az első réteg új reprezentációkat hoz létre, amelyekre a következő rétegek további leképezéseket alkalmaznak.",
        en: "This motivates the Multilayer Perceptron: the first layer creates new representations that later layers can transform further."
      },
      keyTerms: [
        { term: "linearly separable", hu: "lineárisan szeparálható" },
        { term: "decision boundary", hu: "döntési határ" }
      ]
    },
    {
      id: "fully-connected",
      title: {
        hu: "Teljesen összekötött réteg és a mátrixok alakja",
        en: "Fully connected layers and matrix shapes"
      },
      body: {
        hu: "Teljesen összekötött rétegben (fully connected / dense layer) az előző réteg minden kimenete kapcsolatban áll a következő réteg minden neuronjával. Ha az előző réteg S_(k−1) értéket ad és a k-adik réteg S_k neuront tartalmaz, akkor a súlymátrix W_k alakja (S_k, S_(k−1)), az eltolásvektor b_k alakja pedig (S_k,).",
        en: "In a fully connected / dense layer, every output of the previous layer connects to every neuron in the next layer. If the previous layer has size S_(k−1) and layer k has S_k neurons, W_k has shape (S_k, S_(k−1)) and b_k has shape (S_k,)."
      },
      why: {
        hu: "A mátrixos alak egyszerre számítja ki egy réteg összes neuronjának súlyozott összegét. Ez felel meg annak, amit a gyakorlati PyTorch-kódban egy nn.Linear réteg végez.",
        en: "The matrix form computes weighted sums for all neurons in a layer at once. This corresponds to what a PyTorch nn.Linear layer implements."
      },
      formula: {
        hu: "z_k = W_k a_(k−1) + b_k    |    W_k ∈ ℝ^(S_k×S_(k−1)), b_k ∈ ℝ^(S_k)",
        en: "z_k = W_k a_(k−1) + b_k    |    W_k ∈ ℝ^(S_k×S_(k−1)), b_k ∈ ℝ^(S_k)"
      },
      formulaTerms: [
        { symbol: "S₀", hu: "A bemeneti „réteg” mérete, vagyis a bemeneti változók száma.", en: "Input 'layer' size, i.e. number of input variables." },
        { symbol: "S_k", hu: "A k-adik réteg neuronjainak száma.", en: "Number of neurons in layer k." },
        { symbol: "W_k", hu: "A k-adik réteg súlymátrixa.", en: "Weight matrix of layer k." },
        { symbol: "b_k", hu: "A k-adik réteg eltolásvektora.", en: "Bias vector of layer k." },
        { symbol: "a_(k−1)", hu: "Az előző réteg kimenete / aktivációja.", en: "Output / activation of the previous layer." }
      ],
      examTrap: {
        hu: "A súlymátrix sorainak száma a célréteg neuronjainak száma, oszlopainak száma pedig az előző réteg mérete. A bias minden célneuronhoz egy külön értéket tartalmaz.",
        en: "The weight matrix has one row per target neuron and one column per previous-layer output. The bias vector contains one value per target neuron."
      },
      keyTerms: [
        { term: "fully connected layer", hu: "teljesen összekötött réteg" },
        { term: "dense layer", hu: "sűrű réteg" },
        { term: "weight matrix", hu: "súlymátrix" },
        { term: "bias vector", hu: "eltolásvektor" }
      ]
    },
    {
      id: "parameter-count",
      title: {
        hu: "Hány tanulható paramétere van egy rétegnek?",
        en: "How many learnable parameters does a layer have?"
      },
      body: {
        hu: "Egy teljesen összekötött rétegben minden bemeneti érték minden kimeneti neuronhoz egy súllyal kapcsolódik. Ez S_in·S_out súlyt jelent. Emellett minden kimeneti neuronhoz egy eltolás tartozik, tehát további S_out paraméter. Így a réteg paraméterszáma S_in·S_out+S_out.",
        en: "In a fully connected layer, each input connects to each output neuron with one weight, giving S_in·S_out weights. Each output neuron also has one bias, adding S_out parameters. Total: S_in·S_out+S_out."
      },
      formula: {
        hu: "paraméterek száma = S_in·S_out + S_out",
        en: "parameter count = S_in·S_out + S_out"
      },
      formulaTerms: [
        { symbol: "S_in·S_out", hu: "A súlyok száma.", en: "Number of weights." },
        { symbol: "S_out", hu: "Az eltolások száma, egy minden kimeneti neuronhoz.", en: "Number of biases, one per output neuron." }
      ],
      workedExample: {
        hu: "A hivatalos 20→10→1 példában az első réteg 20·10+10=210 paraméteres. A második réteg 10·1+1=11 paraméteres. Összesen 221 tanulható paraméter van.",
        en: "In the official 20→10→1 example, the first layer has 20·10+10=210 parameters. The second has 10·1+1=11. Total: 221 learnable parameters."
      },
      examTrap: {
        hu: "A neuronok száma nem azonos a paraméterek számával. Egyetlen neuron is sok súllyal rendelkezhet, ha sok bemenete van.",
        en: "Number of neurons is not the same as number of parameters. A single neuron can have many weights if it has many inputs."
      }
    },
    {
      id: "two-layer-hypothesis",
      title: {
        hu: "Kétrétegű MLP hipotézisfüggvénye",
        en: "Hypothesis function of a two-layer MLP"
      },
      body: {
        hu: "Két tanulható réteg esetén először az első teljesen összekötött réteg számol lineáris transzformációt, majd g₁ aktivációt alkalmazunk. Ennek eredményét a második réteg újabb lineáris transzformációra használja, végül g₂ adja a hálózat kimenetét. A kompozíció: h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂).",
        en: "With two learnable layers, the first fully connected layer computes a linear transformation followed by activation g₁. The second layer transforms that result and g₂ produces the network output: h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂)."
      },
      why: {
        hu: "A köztes nemlinearitás kulcsfontosságú. Ha g₁ identitásfüggvény lenne, akkor két lineáris transzformáció kompozíciója továbbra is egyetlen lineáris transzformációval lenne ekvivalens, így a plusz réteg nem adna valódi nemlineáris kifejezőerőt.",
        en: "The hidden nonlinearity is crucial. If g₁ were identity, the composition of two linear transformations would still be equivalent to one linear transformation, so the extra layer would not add nonlinear expressive power."
      },
      formula: {
        hu: "h(x) = g₂(W₂ · g₁(W₁x+b₁) + b₂)",
        en: "h(x) = g₂(W₂ · g₁(W₁x+b₁) + b₂)"
      },
      formulaTerms: [
        { symbol: "W₁,b₁", hu: "Az első réteg súlyai és eltolásai.", en: "Weights and biases of the first layer." },
        { symbol: "g₁", hu: "A rejtett réteg aktivációs függvénye; tipikusan nemlineáris.", en: "Hidden-layer activation function, typically nonlinear." },
        { symbol: "W₂,b₂", hu: "A kimeneti réteg súlyai és eltolásai.", en: "Weights and biases of the output layer." },
        { symbol: "g₂", hu: "A kimeneti aktiváció, amely a feladat típusától függ.", en: "Output activation determined by the task." }
      ],
      connections: {
        hu: "Ez a képlet ugyanazt a „lineáris transzformáció + aktiváció” építőelemet ismétli, amely egyetlen neuronnál már megjelent. A mély hálózatok (deep networks) ezt sok rétegben egymásra fűzik.",
        en: "This repeats the same 'linear transformation + activation' building block introduced by a single neuron. Deep networks stack this pattern many times."
      },
      examTrap: {
        hu: "A rejtett aktivációt (g₁) általában nem hagyjuk el. A kimeneti aktiváció (g₂) viszont a feladattól függően lehet identitás, szigmoid vagy softmax.",
        en: "The hidden activation g₁ is generally not omitted. The output activation g₂ depends on the task and may be identity, sigmoid, or softmax."
      }
    },
    {
      id: "activation-functions",
      title: {
        hu: "Szigmoid, tanh és ReLU aktivációs függvények",
        en: "Sigmoid, tanh, and ReLU activation functions"
      },
      body: {
        hu: "A tananyag három népszerű aktivációs függvényt mutat: szigmoid (sigmoid), hiperbolikus tangens (tanh) és ReLU (Rectified Linear Unit). A szigmoid 0 és 1 közé képez, a tanh −1 és 1 közé, a ReLU pedig negatív bemenetnél 0-t, pozitív bemenetnél magát a bemenetet adja.",
        en: "The course presents three popular activation functions: sigmoid, tanh, and ReLU. Sigmoid maps to (0,1), tanh to (−1,1), and ReLU outputs 0 for negative inputs and the input itself for positive inputs."
      },
      why: {
        hu: "A nemlineáris aktivációk teszik lehetővé, hogy több réteg együtt ne csak egyetlen lineáris függvényt valósítson meg. A Lecture 5 a ReLU-ról azt emeli ki, hogy egyszerűen számolható és gyakran jól működik.",
        en: "Nonlinear activations allow multiple layers to represent more than a single linear function. Lecture 5 highlights ReLU as simple to compute and often effective."
      },
      formula: {
        hu: "sigmoid(z)=1/(1+e^(−z))    |    tanh(z)∈(−1,1)    |    ReLU(z)=max(0,z)",
        en: "sigmoid(z)=1/(1+e^(−z))    |    tanh(z)∈(−1,1)    |    ReLU(z)=max(0,z)"
      },
      formulaTerms: [
        { symbol: "z", hu: "A neuron preaktivációja (pre-activation), vagyis a súlyozott összeg és az eltolás eredménye.", en: "Neuron pre-activation, i.e. weighted sum plus bias." },
        { symbol: "g(z)", hu: "Az aktiváció után továbbadott érték.", en: "Value passed onward after the activation." }
      ],
      examTrap: {
        hu: "Az aktivációs függvény grafikonjának alakja és kimeneti tartománya vizsgakérdés lehet. A szigmoid nem ad negatív értéket; a tanh igen; a ReLU negatív z esetén 0.",
        en: "The graph shape and output range of activation functions can be tested. Sigmoid never outputs negative values, tanh can, and ReLU is zero for negative z."
      }
    },
    {
      id: "output-by-task",
      title: {
        hu: "Kimeneti réteg: a feladat dönti el",
        en: "Output layer: determined by the task"
      },
      body: {
        hu: "A kimeneti réteg aktivációját és méretét a megoldandó feladathoz kell igazítani. Regressziónál tetszőleges folytonos értéket szeretnénk, ezért a tananyag tipikusan identitás aktivációt (identity) vagy g₂ elhagyását javasolja. Bináris osztályozásnál egyetlen szigmoid kimenet adhat class-1 valószínűséget. Többosztályos, kölcsönösen kizáró kategóriáknál a softmax több valószínűséget ad, amelyek összege 1.",
        en: "Output activation and size must match the task. For regression, arbitrary continuous values are needed, so the course typically uses identity / omits g₂. Binary classification uses one sigmoid probability. Multiclass classification with mutually exclusive classes uses softmax probabilities summing to 1."
      },
      why: {
        hu: "Ha regressziónál szigmoid lenne a végső aktiváció, a hálózat csak 0 és 1 közötti számokat tudna becsülni, ami például életkor becslésére alkalmatlan. A kimeneti aktiváció tehát a címke értelmezéséhez igazodik.",
        en: "If regression used sigmoid as the final activation, outputs would be restricted to [0,1], unsuitable for values such as age. The output activation must therefore match the meaning of the label."
      },
      formula: {
        hu: "regresszió: identity + MSE    |    bináris osztályozás: sigmoid + BCE    |    többosztályos: softmax + cross-entropy",
        en: "regression: identity + MSE    |    binary classification: sigmoid + BCE    |    multiclass: softmax + cross-entropy"
      },
      connections: {
        hu: "A logisztikus regresszió sigmoid + BCE párosa közvetlenül visszatér a bináris neurális hálózati kimenetnél. A cross-entropy a BCE többosztályos általánosítása a tananyag megfogalmazása szerint.",
        en: "The sigmoid+BCE pairing from logistic regression reappears for binary neural-network outputs. The course presents cross-entropy as the multiclass generalization of BCE/logistic loss."
      },
      examTrap: {
        hu: "A rejtett réteg és a kimeneti réteg aktivációját ne keverd össze. Regressziónál a végső g₂ lehet identitás, de a rejtett g₁ nemlinearitását ettől még megtartjuk.",
        en: "Do not confuse hidden and output activations. For regression g₂ may be identity, while hidden g₁ should still provide nonlinearity."
      }
    },
    {
      id: "softmax",
      title: {
        hu: "Softmax és többosztályos kimenet",
        en: "Softmax and multiclass output"
      },
      body: {
        hu: "Több címkeváltozóval / több osztállyal a modell kimenete vektor. A softmax aktiváció minden komponens exponenciálisát elosztja az összes exponenciális összegével. Emiatt minden eredmény pozitív, és a kimeneti vektor elemeinek összege 1, így valószínűségi eloszlásként értelmezhető.",
        en: "For multiclass outputs, the model prediction is a vector. Softmax divides the exponential of each component by the sum of all exponentials. Outputs are positive and sum to 1, so the vector can be interpreted as a probability distribution."
      },
      formula: {
        hu: "softmax(z)ᵢ = e^(zᵢ) / Σⱼ e^(zⱼ)",
        en: "softmax(z)ᵢ = e^(zᵢ) / Σⱼ e^(zⱼ)"
      },
      formulaTerms: [
        { symbol: "zᵢ", hu: "Az i-edik osztályhoz tartozó nyers pontszám (logit).", en: "Raw score (logit) for class i." },
        { symbol: "e^(zᵢ)", hu: "Az i-edik pontszám exponenciálisa.", en: "Exponential of the i-th score." },
        { symbol: "Σⱼ e^(zⱼ)", hu: "Normalizáló összeg minden osztály fölött.", en: "Normalization sum over all classes." }
      ],
      workedExample: {
        hu: "Ha három osztály van, a softmax például [0,10; 0,25; 0,65] valószínűségeket adhat. Ezek összege 1, és a legnagyobb komponenshez tartozó osztály a legvalószínűbb.",
        en: "With three classes, softmax might output probabilities such as [0.10, 0.25, 0.65]. They sum to 1, and the class with the largest component is the most probable."
      },
      examTrap: {
        hu: "A softmax nem egyetlen skalár valószínűséget ad, hanem osztályonként egy komponenst. A címke (y) és az előrejelzés (ŷ) is vektor lehet, például one-hot címkével.",
        en: "Softmax does not produce one scalar probability; it produces one component per class. Both y and ŷ can be vectors, for example using one-hot labels."
      },
      keyTerms: [
        { term: "softmax" },
        { term: "cross-entropy", hu: "keresztentrópia" },
        { term: "one-hot" },
        { term: "logit", hu: "nyers osztálypontszám" }
      ]
    },
    {
      id: "nonconvex",
      title: {
        hu: "Miért nehezebb MLP-t optimalizálni?",
        en: "Why is MLP optimization harder?"
      },
      body: {
        hu: "A lineáris regresszió négyzetes vesztesége konvex, ezért megfelelő lépésméret mellett a globális optimum megtalálására vonatkozó erős garanciánk van. Egy MLP esetén a sok egymásba ágyazott lineáris transzformáció és nemlinearitás miatt a veszteségfüggvény általában nem konvex.",
        en: "Linear-regression squared loss is convex, giving strong global-optimum guarantees with a suitable step size. An MLP combines many nested linear transformations and nonlinearities, so its loss is generally non-convex."
      },
      why: {
        hu: "Nem konvex veszteségfelületnél több különböző lokális szerkezet, lapos tartomány és bonyolult geometria jelenhet meg. Emiatt gradienscsökkentésnél nem garantálható ugyanúgy, hogy a globálisan legjobb paramétereket találjuk meg.",
        en: "A non-convex loss surface can contain multiple local structures, flat regions, and complex geometry. Gradient descent therefore does not carry the same guarantee of finding globally optimal parameters."
      },
      connections: {
        hu: "A paraméterek gradiensét ettől még ki kell számolni; ezt szolgálja a visszaterjesztés (backpropagation). Az optimalizáló, például SGD vagy Adam, ezután használja a gradienseket a frissítéshez.",
        en: "Gradients are still required; backpropagation computes them. An optimizer such as SGD or Adam then uses those gradients to update parameters."
      },
      examTrap: {
        hu: "A hivatalos mintakérdés direkt összeveti a lineáris regresszió + MSE és az MLP + MSE esetét. Az elsőnél a konvexitás miatt van globális-optimum garancia megfelelően kis lépésnél; az MLP-nél általában nincs.",
        en: "The official example directly contrasts linear regression + MSE with MLP + MSE. Convexity provides a global-optimum guarantee for the former with a sufficiently small step, but generally not for the MLP."
      }
    }
  ]
};

export const mlpQuestions: Question[] = [
  {
    id: "mlp-q1",
    topics: ["artificial-neuron"],
    prompt: { hu: "Mely állítások igazak egy mesterséges neuronra (artificial neuron)?", en: "Which statements are true about an artificial neuron?" },
    choices: [
      { id: "a", text: { hu: "Súlyozott összeget (weighted sum) képez az bemenetekből (inputs).", en: "It forms a weighted sum of its inputs." } },
      { id: "b", text: { hu: "aktiváció (activation) függvényt (function) alkalmazhat a súlyozott összegre (weighted sum).", en: "It can apply an activation function to the weighted sum." } },
      { id: "c", text: { hu: "Sigmoid g esetén többváltozós logisztikus regressziónak (multivariate logistic regression) felel meg.", en: "With sigmoid g, it corresponds to multivariate logistic regression." } },
      { id: "d", text: { hu: "Mindig ReLU activationt kell használnia.", en: "It must always use ReLU activation." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A neuron (neuron) súlyozott összeg (weighted sum) + aktiváció (activation) szerkezetű. Sigmoid esetén az előadás (lecture) kifejezett logisztikus regressziós (explicit logistic-regression) (regression) kapcsolatot mond ki.", en: "A neuron has a weighted-sum + activation structure. With sigmoid, the lecture explicitly identifies it with logistic regression." }
  },
  {
    id: "mlp-q2",
    topics: ["artificial-neuron","expressive-power"],
    prompt: { hu: "Mit tud egyetlen sigmoid neuron (neuron) osztályozásnál (classification)?", en: "What can a single sigmoid neuron represent in classification?" },
    choices: [
      { id: "a", text: { hu: "Egyetlen lineáris döntési felület (linear decision surface)-t.", en: "A single linear decision surface." } },
      { id: "b", text: { hu: "Két inputnál egy egyenes döntési határ (line decision boundary)-t.", en: "With two inputs, a line decision boundary." } },
      { id: "c", text: { hu: "Általánosan lineárisan szeparálható (linearly separable) problémákra alkalmas.", en: "It is suitable for linearly separable problems in general." } },
      { id: "d", text: { hu: "Bármilyen XOR-szerű döntési határ (XOR-like boundary)-t egyedül is reprezentál.", en: "It can represent any XOR-like boundary by itself." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Az előadás (lecture) szerint egyetlen neuron (single neuron) csak lineárisan szeparálható (linearly separable) problémákat tud megoldani; XOR nem ilyen.", en: "According to the lecture, a single neuron can only solve linearly separable problems; XOR is not one." }
  },
  {
    id: "mlp-q3",
    topics: ["fully-connected"],
    prompt: { hu: "Mit jelent a teljesen összekötött (fully-connected) / sűrű réteg (layer)?", en: "What does a fully connected / dense layer mean?" },
    choices: [
      { id: "a", text: { hu: "Minden neuron (neuron) kapcsolódik a következő réteg (layer) minden neuronjához.", en: "Every neuron is connected to every neuron in the next layer." } },
      { id: "b", text: { hu: "PyTorchban torch.nn.Linear reprezentálhatja.", en: "In PyTorch it can be represented by torch.nn.Linear." } },
      { id: "c", text: { hu: "Nincsenek tanulható súlyok (weights).", en: "It has no learnable weights." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "sűrű layerben teljes kapcsolati súly (weight) mátrix (matrix) és eltolás (bias) vektor (vector) van.", en: "A dense layer contains a full connection weight matrix and bias vector." }
  },
  {
    id: "mlp-q4",
    topics: ["mlp-shapes"],
    prompt: { hu: "Ha réteg (layer) k−1 mérete S_(k−1), réteg (layer) k-ben S_k neuron (neuron) van, mely shape-ek helyesek?", en: "If layer k−1 has size S_(k−1) and layer k contains S_k neurons, which shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "W_k: (S_k, S_(k−1)).", en: "W_k: (S_k, S_(k−1))." } },
      { id: "b", text: { hu: "b_k: (S_k,).", en: "b_k: (S_k,)." } },
      { id: "c", text: { hu: "S₀ az bemenet (input) változó (variable)s száma.", en: "S₀ is the number of input variables." } },
      { id: "d", text: { hu: "b_k shape-je mindig ugyanaz, mint W_k.", en: "b_k always has the same shape as W_k." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Ez pontosan az előadás (lecture) általános mátrix (matrix) notationje.", en: "This is exactly the general matrix notation given in the lecture." }
  },
  {
    id: "mlp-q5",
    topics: ["parameter-count"],
    prompt: { hu: "20 bemenet (input) változó (variable) → 10-neuron (neuron) első (first) réteg (layer) esetén hány paraméter (parameter) van az első teljesen összekötött (fully-connected) layerben?", en: "With 20 input variables → a 10-neuron first layer, how many parameters are in the first fully connected layer?" },
    choices: [
      { id: "a", text: { hu: "200 súlyok (weights).", en: "200 weights." } },
      { id: "b", text: { hu: "10 biases.", en: "10 biases." } },
      { id: "c", text: { hu: "210 összes (total) paraméterek (parameters).", en: "210 total parameters." } },
      { id: "d", text: { hu: "200 összes (total) paraméterek (parameters).", en: "200 total parameters." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "W₁: 10×20=200; b₁: 10; összes (total)=210.", en: "W₁: 10×20=200; b₁: 10; total=210." }
  },
  {
    id: "mlp-q6",
    topics: ["parameter-count"],
    prompt: { hu: "20 bemenet (input) → 10 rejtett neuron (hidden neuron) → 1 kimenet (output) neuron (neuron) kétrétegű (two-layer) MLP esetén hány összes (total) paraméter (parameter) van?", en: "For a two-layer MLP with 20 inputs → 10 hidden neurons → 1 output neuron, how many total parameters are there?" },
    choices: [
      { id: "a", text: { hu: "210 az első layerben.", en: "210 in the first layer." } },
      { id: "b", text: { hu: "11 a második layerben.", en: "11 in the second layer." } },
      { id: "c", text: { hu: "221 összesen.", en: "221 total." } },
      { id: "d", text: { hu: "211 összesen.", en: "211 total." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Layer1=10·20+10=210; layer2=1·10+1=11; összes (total)=221.", en: "Layer1=10·20+10=210; layer2=1·10+1=11; total=221." }
  },
  {
    id: "mlp-q7",
    topics: ["mlp-hypothesis"],
    prompt: { hu: "Melyik képlet (formula) felel meg az előadás (lecture) kétrétegű (two-layer) MLP hipotézisének (hypothesis)?", en: "Which formula matches the lecture's two-layer MLP hypothesis?" },
    choices: [
      { id: "a", text: { hu: "h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂).", en: "h(x)=g₂(W₂ g₁(W₁x+b₁)+b₂)." } },
      { id: "b", text: { hu: "Θ={W₁,b₁,W₂,b₂}.", en: "Θ={W₁,b₁,W₂,b₂}." } },
      { id: "c", text: { hu: "A rétegek (layers) egymás outputjára épülnek.", en: "Layers operate on outputs of previous layers." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Ez az előadás (lecture) közvetlen notationje.", en: "This is the notation used directly in the lecture." }
  },
  {
    id: "mlp-q8",
    topics: ["activation-functions","regression"],
    prompt: { hu: "regresszió (regression) feladat (task), 20 bemenet (input), 10 rejtett neuron (hidden neuron), 1 folytonos kimenet (continuous output). Mely állítások igazak?", en: "Regression task, 20 inputs, 10 hidden neurons, 1 continuous output. Which statements are true?" },
    choices: [
      { id: "a", text: { hu: "g₁ nonlinearity-t érdemes megtartani.", en: "The g₁ nonlinearity should be kept." } },
      { id: "b", text: { hu: "g₂ tipikusan identitásfüggvény (identity) / elhagyható.", en: "g₂ is typically identity / can be omitted." } },
      { id: "c", text: { hu: "g₂ sigmoid kötelező.", en: "g₂ must be sigmoid." } },
      { id: "d", text: { hu: "MSE megfelelő veszteség (loss).", en: "MSE is an appropriate loss." } }
    ],
    correctIds: ["a","b","d"],
    explanation: { hu: "rejtett nemlinearitás (hidden nonlinearity) kell kifejezőerőhöz (expressive power); tetszőleges folytonos (arbitrary continuous) (continuous) outputnál végső (final) identitásfüggvény (identity) és MSE illeszkedik az előadás (lecture)-höz.", en: "Hidden nonlinearity is needed for expressive power; for arbitrary continuous output, final identity and MSE match the lecture." }
  },
  {
    id: "mlp-q9",
    topics: ["activation-functions"],
    prompt: { hu: "Mi történik, ha minden aktiváció (activation) identitásfüggvény (identity) egy több-réteg (layer) MLP-ben?", en: "What happens if every activation is identity in a multilayer MLP?" },
    choices: [
      { id: "a", text: { hu: "Több lineáris függvény (multiple linear functions) kompozíciója továbbra is linear.", en: "A composition of multiple linear functions remains linear." } },
      { id: "b", text: { hu: "Az kifejezőerő (expressive power) egy egyetlen (single) linear réteg (layer) szintjére esik vissza.", en: "Expressive power collapses to that of a single linear layer." } },
      { id: "c", text: { hu: "A hálózat ettől automatikusan nonlinear lesz.", en: "The network automatically becomes nonlinear." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Ez az előadás (lecture) explicit indoka rejtett aktiváció (hidden activation) (activation) használatára.", en: "This is the lecture's explicit reason for using hidden activations." }
  },
  {
    id: "mlp-q10",
    topics: ["activation-functions","sigmoid"],
    prompt: { hu: "Mely állítások igazak sigmoid activationre?", en: "Which statements are true about sigmoid activation?" },
    choices: [
      { id: "a", text: { hu: "Outputja 0 és 1 között van.", en: "Its output lies between 0 and 1." } },
      { id: "b", text: { hu: "Formula: 1/(1+e^(−z)).", en: "Formula: 1/(1+e^(−z))." } },
      { id: "c", text: { hu: "Binary valószínűség (probability) outputhoz használható.", en: "It can be used for a binary-probability output." } },
      { id: "d", text: { hu: "Outputja −1 és 1 között van.", en: "Its output lies between −1 and 1." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "−1..1 a tanh range-e, nem sigmoidé.", en: "−1..1 is the range of tanh, not sigmoid." }
  },
  {
    id: "mlp-q11",
    topics: ["activation-functions","tanh"],
    prompt: { hu: "Mely állítások igazak tanh activationre az előadás (lecture) alapján?", en: "Which statements are true about tanh activation according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "kimenet (output) range-e −1 és 1 között van.", en: "Its output range is between −1 and 1." } },
      { id: "b", text: { hu: "Nonlinear aktivációs függvény (activation function).", en: "It is a nonlinear activation function." } },
      { id: "c", text: { hu: "Ugyanaz, mint ReLU.", en: "It is the same as ReLU." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Az előadás (lecture) külön grafikonon mutatja tanh-t −1..1 tartománnyal.", en: "The lecture shows tanh separately with range −1..1." }
  },
  {
    id: "mlp-q12",
    topics: ["activation-functions","relu"],
    prompt: { hu: "Mely állítások igazak ReLU-ra?", en: "Which statements are true about ReLU?" },
    choices: [
      { id: "a", text: { hu: "ReLU(z)=max(0,z).", en: "ReLU(z)=max(0,z)." } },
      { id: "b", text: { hu: "Negatív inputokra 0.", en: "It outputs 0 for negative inputs." } },
      { id: "c", text: { hu: "Pozitív inputokra az inputot adja vissza.", en: "For positive inputs it returns the input." } },
      { id: "d", text: { hu: "kimenet (output) mindig kisebb vagy egyenlő 1-gyel.", en: "Its output is always less than or equal to 1." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "ReLU pozitív oldalon nincs 1-re korlátozva.", en: "ReLU is not capped at 1 on the positive side." }
  },
  {
    id: "mlp-q13",
    topics: ["binary-classification","output-layer"],
    prompt: { hu: "egyetlen (single)-címke (label) bináris osztályozás (binary classification) MLP kimeneti réteg (output layer)éhez mely párosítások illeszkednek a kurzushoz (course)?", en: "Which choices match the course for the output layer of a single-label binary-classification MLP?" },
    choices: [
      { id: "a", text: { hu: "1 kimenet (output) neuron (neuron).", en: "1 output neuron." } },
      { id: "b", text: { hu: "Sigmoid végső (final) aktiváció (activation).", en: "Sigmoid final activation." } },
      { id: "c", text: { hu: "BCE / logisztikus veszteség (logistic loss) (loss).", en: "BCE / logistic loss." } },
      { id: "d", text: { hu: "identitásfüggvény (identity) végső (final) aktiváció (activation) + MSE az alapértelmezett választás.", en: "Identity final activation + MSE is the default choice." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A bináris felállás (binary setup) a logistic-regresszió (regression) valószínűség (probability)-kimenet (output) logikáját követi.", en: "The binary setup follows the logistic-regression probability-output logic." }
  },
  {
    id: "mlp-q14",
    topics: ["multiclass","softmax"],
    prompt: { hu: "10 mutually exclusive osztály esetén mely állítások igazak?", en: "With 10 mutually exclusive classes, which statements are true?" },
    choices: [
      { id: "a", text: { hu: "10 kimenet (output) valószínűség (probability) becslése indokolt.", en: "Estimating 10 output probabilities is appropriate." } },
      { id: "b", text: { hu: "Softmax végső (final) aktiváció (activation) használható.", en: "Softmax can be used as the final activation." } },
      { id: "c", text: { hu: "A softmax kimenet (output) elemeinek összege 1.", en: "Softmax output elements sum to 1." } },
      { id: "d", text: { hu: "Egyetlen sigmoid skalár (scalar) szükségszerűen elegendő.", en: "A single sigmoid scalar is necessarily sufficient." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Az előadás (lecture) multiclass esetben category-nként valószínűség (probability)-t becsül softmaxszal.", en: "For multiclass classification, the lecture estimates one probability per category using softmax." }
  },
  {
    id: "mlp-q15",
    topics: ["softmax"],
    prompt: { hu: "Mely állítások igazak softmaxra?", en: "Which statements are true about softmax?" },
    choices: [
      { id: "a", text: { hu: "vektor (vector) inputból vektor (vector) outputot készít.", en: "It maps a vector input to a vector output." } },
      { id: "b", text: { hu: "Minden kimenet (output) component category probabilityként értelmezhető.", en: "Each output component can be interpreted as a category probability." } },
      { id: "c", text: { hu: "Az kimenet (output) components összege 1.", en: "The output components sum to 1." } },
      { id: "d", text: { hu: "Formula komponensenként e^(z_i)/Σ_j e^(z_j).", en: "Component-wise formula is e^(z_i)/Σ_j e^(z_j)." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Mind a négy az előadás (lecture) softmax definíciójának része.", en: "All four are part of the lecture's softmax definition." }
  },
  {
    id: "mlp-q16",
    topics: ["cross-entropy","one-hot"],
    prompt: { hu: "Mely állítások igazak multiclass CE veszteség (loss) esetén?", en: "Which statements are true for multiclass CE loss?" },
    choices: [
      { id: "a", text: { hu: "A true címke (label) y one-hot encoded lehet.", en: "The true label y can be one-hot encoded." } },
      { id: "b", text: { hu: "A true category helyén 1, a többi helyen 0 van.", en: "The true category has value 1 and the others 0." } },
      { id: "c", text: { hu: "ŷ category-probabilities vektor (vector).", en: "ŷ is a vector of category probabilities." } },
      { id: "d", text: { hu: "CE a BCE/logistic veszteség (loss) generalizációja.", en: "CE is a generalization of BCE/logistic loss." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Ez pontosan az előadás (lecture) 5 multiclass részének értelmezése.", en: "This is exactly how Lecture 5 frames the multiclass case." }
  },
  {
    id: "mlp-q17",
    topics: ["multiple-output-regression"],
    prompt: { hu: "Két folytonos (continuous) targetot becslő regresszió (regression) MLP-nél mely állítások igazak?", en: "For a regression MLP predicting two continuous targets, which statements are true?" },
    choices: [
      { id: "a", text: { hu: "y és ŷ vektor (vector) lehet.", en: "y and ŷ can be vectors." } },
      { id: "b", text: { hu: "végső (final) aktiváció (activation) tipikusan identitásfüggvény (identity).", en: "The final activation is typically identity." } },
      { id: "c", text: { hu: "MSE a címke (label)-vektor (vector) elemein is átlagolható.", en: "MSE can also be averaged over elements of the label vector." } },
      { id: "d", text: { hu: "Softmax kötelező, mert több kimenet (output) van.", en: "Softmax is required simply because there are multiple outputs." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Multiple kimenet (output) lehet multiple folytonos (continuous) regresszió (regression) címke (label) is; softmax csak multiclass valószínűség (probability) semantics miatt kell.", en: "Multiple outputs can represent multiple continuous regression labels; softmax is needed for multiclass probability semantics, not merely because output is a vector." }
  },
  {
    id: "mlp-q18",
    topics: ["output-layer","task-selection"],
    prompt: { hu: "Mely feladat (task) → végső (final) aktiváció (activation) / veszteség (loss) párok helyesek a kurzus (course) szerint?", en: "Which task → final activation / loss pairings are correct according to the course?" },
    choices: [
      { id: "a", text: { hu: "regresszió (regression) → identitásfüggvény (identity) kimenet (output) + MSE.", en: "Regression → identity output + MSE." } },
      { id: "b", text: { hu: "bináris osztályozás (binary classification) → sigmoid kimenet (output) + BCE.", en: "Binary classification → sigmoid output + BCE." } },
      { id: "c", text: { hu: "többosztályos osztályozás (multiclass classification) → softmax kimenet (output) + CE.", en: "Multiclass classification → softmax output + CE." } },
      { id: "d", text: { hu: "regresszió (regression) → softmax + CE kötelező.", en: "Regression → softmax + CE is required." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A végső (final) aktiváció (activation) és veszteség (loss) a target semantics-hoz igazodik.", en: "The final activation and loss are chosen to match target semantics." }
  },
  {
    id: "mlp-q19",
    topics: ["parameter-count","multiclass"],
    prompt: { hu: "20 bemenet (input) → 10 rejtett neuron (hidden neuron) → 4-osztály softmax kimenet (output) esetén hány paraméter (parameter) van?", en: "For 20 inputs → 10 hidden neurons → 4-class softmax output, how many parameters are there?" },
    choices: [
      { id: "a", text: { hu: "első (first) réteg (layer): 210.", en: "First layer: 210." } },
      { id: "b", text: { hu: "Second réteg (layer): 4·10+4=44.", en: "Second layer: 4·10+4=44." } },
      { id: "c", text: { hu: "összes (total): 254.", en: "Total: 254." } },
      { id: "d", text: { hu: "összes (total): 250.", en: "Total: 250." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "210 + 44 = 254. A 4 kimenet (output) neuron (neuron) mindegyike 10 weightet és 1 biast kap.", en: "210 + 44 = 254. Each of the 4 output neurons receives 10 weights and one bias." }
  },
  {
    id: "mlp-q20",
    topics: ["training","parameters"],
    prompt: { hu: "Mely állítások igazak MLP trainingre az előadás (lecture) szerint?", en: "Which statements are true about MLP training according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "Θ az összes súlyok (weights) és biases halmaza.", en: "Θ is the set of all weights and biases." } },
      { id: "b", text: { hu: "A veszteség (loss) gradientjét minden paraméter (parameter) szerint számítjuk.", en: "The gradient of the loss is computed with respect to every parameter." } },
      { id: "c", text: { hu: "gradiens (gradient)-descent-based tanítás használható.", en: "Gradient-descent-based training can be used." } },
      { id: "d", text: { hu: "A súlyok (weights) nem tanulható paraméterek (parameters).", en: "Weights are not learnable parameters." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Az előadás (lecture) Θ-t az összes súly (weight)-mátrix (matrix) és eltolás (bias)-vektor (vector) elemeiként definiálja, és ezek szerint számít gradientet.", en: "The lecture defines Θ as all elements of weight matrices and bias vectors and computes gradients with respect to them." }
  }
];
