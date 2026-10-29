import type { Lesson, Question } from "../types";

export const backpropLesson: Lesson = {
  id: "backprop-computational-graphs",
  title: {
    hu: "Computational Graph és Backpropagation",
    en: "Computational Graphs and Backpropagation"
  },
  subtitle: {
    hu: "Chain rule, local derivatives, gradient propagation, feed forward és parameter update",
    en: "Chain rule, local derivatives, gradient propagation, feed-forward evaluation, and parameter updates"
  },
  source: "Lecture 6",
  sections: [
    {
      id: "why-backprop",
      title: { hu: "Miért kell backpropagation?", en: "Why do we need backpropagation?" },
      body: {
        hu: "MLP traininghez a loss derivative-jét minden learnable parameter szerint ki kell számítani. A lecture rámutat, hogy a symbolic derivatives sok azonos sub-expressiont tartalmaznak, ezért pazarló lenne ezeket újra és újra kiszámítani. Backpropagation a sub-results követésével teszi ezt hatékonyabbá.",
        en: "Training an MLP requires derivatives of the loss with respect to every learnable parameter. The lecture points out that symbolic derivatives contain repeated sub-expressions, so recomputing them repeatedly would be wasteful. Backpropagation makes this more efficient by tracking intermediate results."
      },
      intuition: {
        hu: "Nem minden parameterhez nulláról deriváljuk végig ugyanazt az expressiont; a köztes derivative-eket újrahasznosítjuk.",
        en: "We do not differentiate the whole expression from scratch for every parameter; intermediate derivatives are reused."
      },
      keyTerms: [
        { term: "backpropagation" },
        { term: "intermediate result" },
        { term: "gradient" }
      ]
    },
    {
      id: "computational-graph",
      title: { hu: "Computational graph", en: "Computational graph" },
      body: {
        hu: "A computational graph összetett expressiont elementary operations láncolataként reprezentál. A lecture szerint a nodes elementary operations, az edges pedig az operations chainingjét jelölik.",
        en: "A computational graph represents a complicated expression as a chain of elementary operations. According to the lecture, nodes are elementary operations and edges represent how those operations are chained."
      },
      intuition: {
        hu: "Egy hosszú formula helyett kisebb lépésekre bontjuk a számítást: multiplication, addition, subtraction, square stb.",
        en: "Instead of one long formula, the computation is split into smaller steps such as multiplication, addition, subtraction, and squaring."
      },
      examTrap: {
        hu: "A graph azt is megmondja, mely intermediate variables szükségesek egy adott variable kiszámításához.",
        en: "The graph also specifies which intermediate variables must be evaluated before a given variable can be computed."
      },
      keyTerms: [
        { term: "computational graph" },
        { term: "node" },
        { term: "edge" },
        { term: "elementary operation" }
      ]
    },
    {
      id: "chain-rule",
      title: { hu: "Chain rule", en: "Chain rule" },
      body: {
        hu: "Composite functions derivative-jénél a chain rule-t használjuk: a megfelelő elementary derivatives értékeket összeszorozzuk a lánc mentén. Backpropagation ezt alkalmazza visszafelé a computational graphon.",
        en: "For derivatives of composite functions, the chain rule multiplies the relevant elementary derivatives along the chain. Backpropagation applies this while moving backward through the computational graph."
      },
      intuition: {
        hu: "Minden node kap egy incoming gradientet, és ezt megszorozza a saját local derivative-jével.",
        en: "Each node receives an incoming gradient and multiplies it by its own local derivative."
      },
      formula: {
        hu: "grad_input = grad_output · local_derivative",
        en: "grad_input = grad_output · local_derivative"
      },
      keyTerms: [
        { term: "chain rule" },
        { term: "local derivative" },
        { term: "incoming gradient" }
      ]
    },
    {
      id: "square-node",
      title: { hu: "Square node: c = b²", en: "Square node: c = b²" },
      body: {
        hu: "Ha c=b² és grad_c=∂J/∂c, akkor ∂c/∂b=2b. A chain rule miatt grad_b=grad_c·2b.",
        en: "If c=b² and grad_c=∂J/∂c, then ∂c/∂b=2b. By the chain rule, grad_b=grad_c·2b."
      },
      examTrap: {
        hu: "A mintateszt explicit csapdája: nem grad_c·2c, hanem grad_c·2b, mert a local derivative ∂(b²)/∂b=2b.",
        en: "The example test explicitly targets this trap: it is not grad_c·2c but grad_c·2b, because ∂(b²)/∂b=2b."
      },
      formula: {
        hu: "c=b² → grad_b = grad_c · 2b",
        en: "c=b² → grad_b = grad_c · 2b"
      },
      keyTerms: [{ term: "square node" }]
    },
    {
      id: "addition-node",
      title: { hu: "Addition node: c = a + b", en: "Addition node: c = a + b" },
      body: {
        hu: "Additionnél ∂c/∂a=1 és ∂c/∂b=1. Ezért az incoming grad_c mindkét input irányába változatlanul továbbmegy: grad_a=grad_c és grad_b=grad_c.",
        en: "For addition, ∂c/∂a=1 and ∂c/∂b=1. Therefore the incoming grad_c passes unchanged to both inputs: grad_a=grad_c and grad_b=grad_c."
      },
      formula: {
        hu: "c=a+b → grad_a=grad_c, grad_b=grad_c",
        en: "c=a+b → grad_a=grad_c, grad_b=grad_c"
      },
      keyTerms: [{ term: "addition node" }]
    },
    {
      id: "multiplication-node",
      title: { hu: "Multiplication node: c = a·b", en: "Multiplication node: c = a·b" },
      body: {
        hu: "A Lecture 6 computational-graph példájában multiplication node is szerepel. c=a·b esetén ∂c/∂a=b és ∂c/∂b=a, tehát grad_a=grad_c·b, grad_b=grad_c·a.",
        en: "Lecture 6 also uses a multiplication node. For c=a·b, ∂c/∂a=b and ∂c/∂b=a, so grad_a=grad_c·b and grad_b=grad_c·a."
      },
      formula: {
        hu: "c=a·b → grad_a=grad_c·b; grad_b=grad_c·a",
        en: "c=a·b → grad_a=grad_c·b; grad_b=grad_c·a"
      },
      keyTerms: [{ term: "multiplication node" }]
    },
    {
      id: "linear-example-forward",
      title: { hu: "Lecture példa: feed forward", en: "Lecture example: feed forward" },
      body: {
        hu: "A lecture egyszerű linear-regression MSE példája: q=wx, ŷ=q+b, z=y−ŷ, J=z². A demonstráció kedvéért egyetlen example-t használ és elhagyja az 1/2 faktort.",
        en: "The lecture's simple linear-regression MSE example uses q=wx, ŷ=q+b, z=y−ŷ, J=z². For simplicity, it uses one example and omits the 1/2 factor."
      },
      realWorld: {
        hu: "A slide numerikus példája: x=2, w=3, b=4, y=5 → q=6, ŷ=10, z=−5, J=25.",
        en: "The slide's numerical example is x=2, w=3, b=4, y=5 → q=6, ŷ=10, z=−5, J=25."
      },
      examTrap: {
        hu: "Itt z=y−ŷ, nem ŷ−y. Emiatt a köztes derivative előjelekre külön figyelni kell.",
        en: "Here z=y−ŷ, not ŷ−y. Therefore the signs of intermediate derivatives require attention."
      },
      formula: {
        hu: "q=wx; ŷ=q+b; z=y−ŷ; J=z²",
        en: "q=wx; ŷ=q+b; z=y−ŷ; J=z²"
      },
      keyTerms: [{ term: "feed forward" }]
    },
    {
      id: "linear-example-backward",
      title: { hu: "Lecture példa: backpropagation", en: "Lecture example: backpropagation" },
      body: {
        hu: "A numerikus példában ∂J/∂J=1; ∂J/∂z=2z=−10; ∂J/∂ŷ=(−1)(−10)=10; ∂J/∂q=10 és ∂J/∂b=10; végül ∂J/∂w=x·10=20 és ∂J/∂x=w·10=30.",
        en: "In the numerical example, ∂J/∂J=1; ∂J/∂z=2z=−10; ∂J/∂ŷ=(−1)(−10)=10; ∂J/∂q=10 and ∂J/∂b=10; finally ∂J/∂w=x·10=20 and ∂J/∂x=w·10=30."
      },
      intuition: {
        hu: "A gradient J felől indul 1-gyel, majd node-ról node-ra visszafelé halad a local derivatives segítségével.",
        en: "The gradient starts from J with value 1 and moves backward node by node using local derivatives."
      },
      formula: {
        hu: "x=2,w=3,b=4,y=5 → ∂J/∂w=20, ∂J/∂b=10",
        en: "x=2,w=3,b=4,y=5 → ∂J/∂w=20, ∂J/∂b=10"
      },
      keyTerms: [{ term: "backward pass" }]
    },
    {
      id: "parameter-update",
      title: { hu: "Backprop után parameter update", en: "Parameter update after backpropagation" },
      body: {
        hu: "Backpropagation gradients értékeket számol. Ezeket ezután gradient-descent update használja. A lecture példájában α=0.1, ∂J/∂w=20 és ∂J/∂b=10, ezért w:3→1 és b:4→3.",
        en: "Backpropagation computes gradients. A gradient-descent update then uses those values. In the lecture example, α=0.1, ∂J/∂w=20 and ∂J/∂b=10, so w changes 3→1 and b changes 4→3."
      },
      examTrap: {
        hu: "Backpropagation és parameter update nem ugyanaz. Backprop gradients számol; az optimizer/update utána módosítja a parameters értékeket.",
        en: "Backpropagation and parameter updating are not the same. Backprop computes gradients; the optimizer/update changes the parameters afterward."
      },
      formula: {
        hu: "θ := θ − α·grad_θ",
        en: "θ := θ − α·grad_θ"
      },
      keyTerms: [
        { term: "parameter update" },
        { term: "optimizer" }
      ]
    },
    {
      id: "training-cycle",
      title: { hu: "A Lecture 6 training cycle", en: "The Lecture 6 training cycle" },
      body: {
        hu: "A lecture lépései: symbolic derivation; parameter initialization; example vagy mini-batch választás; feed forward; backpropagation; parameter update; majd ismétlés. Stop lehet adott iteration count után vagy early stoppinggal.",
        en: "The lecture steps are: symbolic derivation; parameter initialization; choose an example or mini-batch; feed forward; backpropagation; parameter update; then repeat. Training can stop after a fixed number of iterations or via early stopping."
      },
      examTrap: {
        hu: "Gyakorlati SGD-nél a lecture megjegyzi, hogy nem feltétlenül egyetlen example, hanem mini-batch használatos.",
        en: "For practical SGD, the lecture notes that a mini-batch is used rather than necessarily a single example."
      },
      keyTerms: [
        { term: "forward pass" },
        { term: "backward pass" },
        { term: "training loop" }
      ]
    },
    {
      id: "autograd",
      title: { hu: "PyTorch és automatic differentiation", en: "PyTorch and automatic differentiation" },
      body: {
        hu: "A lecture szerint PyTorch tensors computational graph részei lehetnek, és torch.autograd automatikusan képes gradients számítására a graphon.",
        en: "According to the lecture, PyTorch tensors can be part of computational graphs, and torch.autograd can automatically compute gradients over the graph."
      },
      intuition: {
        hu: "A backpropagation matematikája ugyanaz, de a framework követi a graphot és elvégzi a szükséges chain-rule számításokat.",
        en: "The mathematics of backpropagation is unchanged, but the framework tracks the graph and performs the required chain-rule computations."
      },
      examTrap: {
        hu: "Automatic differentiation nem azt jelenti, hogy nincs computational graph vagy chain rule; ezeket automatizálja.",
        en: "Automatic differentiation does not mean there is no computational graph or chain rule; it automates their use."
      },
      keyTerms: [
        { term: "automatic differentiation" },
        { term: "torch.autograd" }
      ]
    }
  ]
};

export const backpropQuestions: Question[] = [
  {
    id: "bp-q1",
    topics: ["computational-graph"],
    prompt: { hu: "Mely állítások igazak computational graphra a Lecture 6 szerint?", en: "Which statements are true about a computational graph according to Lecture 6?" },
    choices: [
      { id: "a", text: { hu: "Összetett expressiont elementary operations láncolataként reprezentál.", en: "It represents a complicated expression as chained elementary operations." } },
      { id: "b", text: { hu: "Nodes elementary operations lehetnek.", en: "Nodes can be elementary operations." } },
      { id: "c", text: { hu: "Edges az operations chainingjét mutatják.", en: "Edges show how operations are chained." } },
      { id: "d", text: { hu: "Nem tartalmazhat intermediate variables értékeket.", en: "It cannot contain intermediate variables." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A lecture intermediate variables és elementary operations felbontásával konstruál computational graphot.", en: "The lecture constructs a computational graph by introducing intermediate variables and elementary operations." }
  },
  {
    id: "bp-q2",
    topics: ["chain-rule"],
    prompt: { hu: "Mi a backpropagation chain-rule alapelve egy node-nál?", en: "What is the chain-rule principle used by backpropagation at a node?" },
    choices: [
      { id: "a", text: { hu: "Incoming gradient × local derivative.", en: "Incoming gradient × local derivative." } },
      { id: "b", text: { hu: "Az elementary derivatives megfelelő lánc menti szorzata.", en: "Multiply the relevant elementary derivatives along the chain." } },
      { id: "c", text: { hu: "Minden local derivative-et összeadunk a gradienthez.", en: "Add every local derivative to the gradient." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A chain rule szerint a derivative-ek a megfelelő path mentén szorzódnak.", en: "By the chain rule, derivatives multiply along the relevant path." }
  },
  {
    id: "bp-q3",
    topics: ["square-node","example-question"],
    prompt: { hu: "c=b² és grad_c=∂J/∂c esetén mi grad_b?", en: "If c=b² and grad_c=∂J/∂c, what is grad_b?" },
    choices: [
      { id: "a", text: { hu: "grad_c · 2b", en: "grad_c · 2b" } },
      { id: "b", text: { hu: "grad_c · 2c", en: "grad_c · 2c" } },
      { id: "c", text: { hu: "grad_c · b²", en: "grad_c · b²" } },
      { id: "d", text: { hu: "grad_c", en: "grad_c" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "∂c/∂b=2b, ezért grad_b=grad_c·2b.", en: "∂c/∂b=2b, so grad_b=grad_c·2b." }
  },
  {
    id: "bp-q4",
    topics: ["addition-node","example-question"],
    prompt: { hu: "c=a+b és grad_c=∂J/∂c esetén mely állítás igaz?", en: "For c=a+b and grad_c=∂J/∂c, which statement is true?" },
    choices: [
      { id: "a", text: { hu: "grad_a=grad_c és grad_b=grad_c.", en: "grad_a=grad_c and grad_b=grad_c." } },
      { id: "b", text: { hu: "grad_a=grad_c+b és grad_b=grad_c+a.", en: "grad_a=grad_c+b and grad_b=grad_c+a." } },
      { id: "c", text: { hu: "grad_a=grad_b=0.", en: "grad_a=grad_b=0." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Addition local derivative-je mindkét input szerint 1.", en: "The local derivative of addition with respect to either input is 1." }
  },
  {
    id: "bp-q5",
    topics: ["multiplication-node"],
    prompt: { hu: "c=a·b és grad_c incoming gradient esetén mely propagáció helyes?", en: "For c=a·b with incoming gradient grad_c, which propagation is correct?" },
    choices: [
      { id: "a", text: { hu: "grad_a=grad_c·b.", en: "grad_a=grad_c·b." } },
      { id: "b", text: { hu: "grad_b=grad_c·a.", en: "grad_b=grad_c·a." } },
      { id: "c", text: { hu: "grad_a=grad_b=grad_c.", en: "grad_a=grad_b=grad_c." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "∂(ab)/∂a=b és ∂(ab)/∂b=a.", en: "∂(ab)/∂a=b and ∂(ab)/∂b=a." }
  },
  {
    id: "bp-q6",
    topics: ["backprop-purpose"],
    prompt: { hu: "Miért hatékonyabb a backpropagation, mint minden parameter derivative-jének teljes újraszámolása?", en: "Why is backpropagation more efficient than recomputing the full derivative separately for every parameter?" },
    choices: [
      { id: "a", text: { hu: "Újrahasznosítja a közös sub-results / intermediate derivatives értékeket.", en: "It reuses shared sub-results / intermediate derivatives." } },
      { id: "b", text: { hu: "A computational graph dependency structure-jét kihasználja.", en: "It exploits the dependency structure of the computational graph." } },
      { id: "c", text: { hu: "Nem kell semmilyen derivative-et számolni.", en: "No derivatives need to be computed at all." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Derivatives továbbra is kellenek, de az elementary/local derivatives és köztes eredmények újrahasznosíthatók.", en: "Derivatives are still required, but elementary/local derivatives and intermediate results can be reused." }
  },
  {
    id: "bp-q7",
    topics: ["lecture-example","forward-pass"],
    prompt: { hu: "A Lecture 6 példájában x=2,w=3,b=4,y=5 és q=wx, ŷ=q+b, z=y−ŷ, J=z². Mely értékek helyesek?", en: "In the Lecture 6 example x=2,w=3,b=4,y=5 with q=wx, ŷ=q+b, z=y−ŷ, J=z², which values are correct?" },
    choices: [
      { id: "a", text: { hu: "q=6.", en: "q=6." } },
      { id: "b", text: { hu: "ŷ=10.", en: "ŷ=10." } },
      { id: "c", text: { hu: "z=−5.", en: "z=−5." } },
      { id: "d", text: { hu: "J=25.", en: "J=25." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Ezek a slide konkrét feed-forward értékei.", en: "These are the exact feed-forward values shown in the slide." }
  },
  {
    id: "bp-q8",
    topics: ["lecture-example","backward-pass"],
    prompt: { hu: "Ugyanebben a Lecture 6 példában mely gradients helyesek?", en: "In the same Lecture 6 example, which gradients are correct?" },
    choices: [
      { id: "a", text: { hu: "∂J/∂z = −10.", en: "∂J/∂z = −10." } },
      { id: "b", text: { hu: "∂J/∂ŷ = 10.", en: "∂J/∂ŷ = 10." } },
      { id: "c", text: { hu: "∂J/∂b = 10.", en: "∂J/∂b = 10." } },
      { id: "d", text: { hu: "∂J/∂w = 20.", en: "∂J/∂w = 20." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "A slide backprop chainje pontosan ezeket az értékeket adja.", en: "The slide's backpropagation chain gives exactly these values." }
  },
  {
    id: "bp-q9",
    topics: ["lecture-example","signs"],
    prompt: { hu: "Miért lesz ∂J/∂ŷ pozitív 10, miközben ∂J/∂z=−10 a Lecture 6 példában?", en: "Why is ∂J/∂ŷ positive 10 while ∂J/∂z=−10 in the Lecture 6 example?" },
    choices: [
      { id: "a", text: { hu: "Mert z=y−ŷ, így ∂z/∂ŷ=−1.", en: "Because z=y−ŷ, so ∂z/∂ŷ=−1." } },
      { id: "b", text: { hu: "(−10)·(−1)=10.", en: "(−10)·(−1)=10." } },
      { id: "c", text: { hu: "Mert z=ŷ−y.", en: "Because z=ŷ−y." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A slide z=y−ŷ definíciót használ, ezért jön be a −1 local derivative.", en: "The slide defines z=y−ŷ, which introduces the local derivative −1." }
  },
  {
    id: "bp-q10",
    topics: ["parameter-update"],
    prompt: { hu: "Ha w=3, ∂J/∂w=20 és α=0.1, gradient-descent update után mi lesz w?", en: "If w=3, ∂J/∂w=20, and α=0.1, what is w after the gradient-descent update?" },
    choices: [
      { id: "a", text: { hu: "1", en: "1" } },
      { id: "b", text: { hu: "5", en: "5" } },
      { id: "c", text: { hu: "2.8", en: "2.8" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "w := 3 − 0.1·20 = 1.", en: "w := 3 − 0.1·20 = 1." }
  },
  {
    id: "bp-q11",
    topics: ["backprop-vs-update"],
    prompt: { hu: "Mely állítások igazak backpropagation és parameter update kapcsolatára?", en: "Which statements are true about the relationship between backpropagation and parameter updating?" },
    choices: [
      { id: "a", text: { hu: "Backpropagation gradients értékeket számol.", en: "Backpropagation computes gradient values." } },
      { id: "b", text: { hu: "Az optimizer/update ezután használja a gradients értékeket a parameters módosítására.", en: "The optimizer/update then uses gradients to modify parameters." } },
      { id: "c", text: { hu: "Backpropagation önmagában ugyanaz, mint θ := θ−αgrad.", en: "Backpropagation itself is identical to θ := θ−αgrad." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A backward pass gradientet számol; a parameter-update külön következő lépés.", en: "The backward pass computes gradients; parameter updating is a separate next step." }
  },
  {
    id: "bp-q12",
    topics: ["training-cycle"],
    prompt: { hu: "Mely lépések szerepelnek a Lecture 6 backprop training cycle-ban?", en: "Which steps appear in the Lecture 6 backpropagation training cycle?" },
    choices: [
      { id: "a", text: { hu: "Parameter initialization.", en: "Parameter initialization." } },
      { id: "b", text: { hu: "Example vagy mini-batch választása.", en: "Choosing an example or mini-batch." } },
      { id: "c", text: { hu: "Feed forward.", en: "Feed forward." } },
      { id: "d", text: { hu: "Backpropagation.", en: "Backpropagation." } },
      { id: "e", text: { hu: "Parameter update.", en: "Parameter update." } }
    ],
    correctIds: ["a","b","c","d","e"],
    explanation: { hu: "A lecture summary ezeket mind explicit felsorolja.", en: "The lecture summary explicitly lists all of these." }
  },
  {
    id: "bp-q13",
    topics: ["autograd","pytorch"],
    prompt: { hu: "Mely állítások igazak PyTorch tensors és autograd kapcsolatára a lecture szerint?", en: "Which statements are true about PyTorch tensors and autograd according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "Tensors computational graph részei lehetnek.", en: "Tensors can be part of computational graphs." } },
      { id: "b", text: { hu: "torch.autograd automatikusan számolhat gradients értékeket a graphon.", en: "torch.autograd can automatically compute gradients over the graph." } },
      { id: "c", text: { hu: "Ez a chain rule használatát automatizálja.", en: "This automates the use of the chain rule." } },
      { id: "d", text: { hu: "Autograd miatt nincs szükség computational graphra.", en: "Autograd means no computational graph is needed." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Autograd a computational graph alapján végzi automatikusan a derivative/backprop számítást.", en: "Autograd performs automatic differentiation/backpropagation using the computational graph." }
  },
  {
    id: "bp-q14",
    topics: ["chain-rule","concept"],
    prompt: { hu: "Melyik megfogalmazás illik a backpropagation működésére?", en: "Which descriptions match how backpropagation works?" },
    choices: [
      { id: "a", text: { hu: "A loss felől visszafelé haladunk a dependency graphon.", en: "We move backward from the loss through the dependency graph." } },
      { id: "b", text: { hu: "Minden node-nál local derivative-et kombinálunk az incoming gradienttel.", en: "At each node, a local derivative is combined with the incoming gradient." } },
      { id: "c", text: { hu: "A chain rule segítségével gradients jutnak el a korábbi variables/parameters felé.", en: "Using the chain rule, gradients propagate toward earlier variables/parameters." } },
      { id: "d", text: { hu: "Csak forward values értékeket számítunk, derivative-ek nélkül.", en: "We compute only forward values, without derivatives." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Backprop a forward graph dependencyit fordított irányban használja gradient propagationre.", en: "Backprop uses the forward graph dependencies in reverse for gradient propagation." }
  }
];
