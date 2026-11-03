import type { Lesson, Question } from "../types";

export const backpropLesson: Lesson = {
  id: "backprop-computational-graphs",
  title: {
    hu: "Számítási gráf és visszaterjesztés",
    en: "Computational Graphs and Backpropagation"
  },
  subtitle: {
    hu: "Hogyan jutunk el a végső veszteségtől visszafelé minden súly és eltolás gradienséhez?",
    en: "How gradients are propagated backward from the final loss to every weight and bias"
  },
  source: "Lecture 6",
  sections: [
    {
      id: "why-backprop",
      title: {
        hu: "Miért van szükség visszaterjesztésre?",
        en: "Why do we need backpropagation?"
      },
      body: {
        hu: "Egy neurális hálózat tanításához minden tanulható paraméterre tudnunk kell, hogyan változna a veszteség (loss), ha azt a paramétert kissé módosítanánk. Vagyis szükségünk van például ∂J/∂w és ∂J/∂b deriváltakra. Nagy hálózatnál ezek közvetlen, külön-külön szimbolikus levezetése rengeteg ismétlődő részkifejezést számolna újra.",
        en: "Training a neural network requires knowing how the loss would change if each learnable parameter changed slightly, for example ∂J/∂w and ∂J/∂b. Direct symbolic differentiation for every parameter in a large network would repeatedly recompute many shared subexpressions."
      },
      why: {
        hu: "A visszaterjesztés (backpropagation) hatékonyan újrahasznosítja a köztes eredményeket és a láncszabályt (chain rule), ezért egyetlen visszafelé haladó menetben kiszámíthatók a szükséges gradiensek.",
        en: "Backpropagation efficiently reuses intermediate results and the chain rule, allowing required gradients to be computed in one backward pass."
      },
      intuition: {
        hu: "A forward pass során kiszámoljuk, mi lett a hálózat kimenete és a veszteség. A backward pass során ugyanazon számítási útvonalon visszafelé megkérdezzük: „ha ezt a köztes értéket picit megváltoztatnám, mennyit változna a végső J?”",
        en: "During the forward pass we compute the output and loss. During the backward pass we move through the same dependencies in reverse and ask how a small change in each intermediate value would affect the final J."
      },
      connections: {
        hu: "A backpropagation nem maga az optimalizáló. A backpropagation gradienseket számol; az SGD, Adam vagy más optimalizáló ezeket a gradienseket használja a paraméterfrissítéshez.",
        en: "Backpropagation is not the optimizer itself. Backprop computes gradients; SGD, Adam, or another optimizer uses those gradients to update parameters."
      },
      examTrap: {
        hu: "A „visszaterjesztés (backpropagation)” és a „gradienscsökkentési frissítés (gradient descent update)” nem ugyanaz a lépés. Előbb kiszámítjuk a gradienseket, utána frissítjük velük a paramétereket.",
        en: "Backpropagation and the gradient-descent update are not the same step. Gradients are computed first, then parameters are updated."
      },
      keyTerms: [
        { term: "backpropagation", hu: "visszaterjesztés" },
        { term: "forward pass", hu: "előrefelé számítás" },
        { term: "backward pass", hu: "visszafelé gradiensszámítás" }
      ]
    },
    {
      id: "computational-graph",
      title: {
        hu: "Számítási gráf: bontsuk a képletet apró műveletekre",
        en: "Computational graph: decompose the formula into small operations"
      },
      body: {
        hu: "A számítási gráf (computational graph) egy összetett kifejezést elemi műveletekre bont. A 6. előadás (Lecture 6) megfogalmazásában a csomópontok (nodes) elemi műveleteket, az élek (edges) pedig a műveletek egymásra épülését jelölik. A köztes változók (intermediate variables) megőrzik az egyes részszámítások eredményét.",
        en: "A computational graph decomposes a complicated expression into elementary operations. In Lecture 6, nodes represent elementary operations and edges represent how operations are chained. Intermediate variables store results of subcomputations."
      },
      why: {
        hu: "Ha egy hosszú képletet ilyen kis lépésekre bontunk, minden csomópontnál csak egy egyszerű lokális deriváltat kell ismernünk. A teljes derivált ezekből a helyi szabályokból épül fel.",
        en: "Once a long expression is decomposed into small steps, only a simple local derivative is needed at each node. The full derivative is assembled from these local rules."
      },
      workedExample: {
        hu: "Az előadás (lecture) példája a J=(wx+b−y)² kifejezést így bontja fel: q=wx, ŷ=q+b, z=y−ŷ, J=z². Az előrefelé számítás (forward pass) ebben a sorrendben számol, a visszafelé számítás (backward pass) pedig fordított sorrendben halad.",
        en: "The lecture decomposes J=(wx+b−y)² as q=wx, ŷ=q+b, z=y−ŷ, J=z². The forward pass follows this order; the backward pass traverses it in reverse."
      },
      keyTerms: [
        { term: "computational graph", hu: "számítási gráf" },
        { term: "node", hu: "csomópont" },
        { term: "edge", hu: "él" },
        { term: "intermediate variable", hu: "köztes változó" }
      ]
    },
    {
      id: "chain-rule",
      title: {
        hu: "Láncszabály: az egész backprop lényege",
        en: "Chain rule: the core of backpropagation"
      },
      body: {
        hu: "Ha egy változó csak más köztes változókon keresztül hat a veszteségre, akkor a deriváltat a láncszabály (chain rule) segítségével kapjuk meg. Egy csomópont visszafelé megkap egy bejövő gradienst (incoming gradient), majd megszorozza a saját lokális deriváltjával (local derivative).",
        en: "If a variable influences the loss through intermediate variables, its derivative is obtained using the chain rule. A node receives an incoming gradient during the backward pass and multiplies it by its local derivative."
      },
      formula: {
        hu: "gradiens_bemenet = gradiens_kimenet · lokális_derivált",
        en: "grad_input = grad_output · local_derivative"
      },
      formulaTerms: [
        { symbol: "grad_output", hu: "A későbbi számítás felől érkező derivált: mennyire érzékeny J a csomópont kimenetére.", en: "Derivative arriving from later computation: sensitivity of J to the node output." },
        { symbol: "local derivative", hu: "A csomópont saját egyszerű műveletének deriváltja a bemenet szerint.", en: "Derivative of the node's own elementary operation with respect to its input." },
        { symbol: "grad_input", hu: "A korábbi változó felé továbbított gradiens.", en: "Gradient propagated toward the earlier variable." }
      ],
      intuition: {
        hu: "A teljes hatás = „hogyan hat ez a változó a következőre” × „hogyan hat a következő a végső veszteségre”. A backprop ezt ismétli csomópontról csomópontra.",
        en: "Total effect = 'how this variable affects the next one' × 'how the next one affects the final loss'. Backprop repeats this from node to node."
      },
      examTrap: {
        hu: "Nem a csomópont aktuális értékét szorozzuk automatikusan a gradienssel, hanem a csomópont lokális deriváltját. Ezért például négyzetre emelésnél 2b jelenik meg, nem 2c.",
        en: "We do not automatically multiply by the node value; we multiply by the local derivative. For a square node this gives 2b, not 2c."
      },
      keyTerms: [
        { term: "chain rule", hu: "láncszabály" },
        { term: "local derivative", hu: "lokális derivált" },
        { term: "incoming gradient", hu: "bejövő gradiens" }
      ]
    },
    {
      id: "local-rules",
      title: {
        hu: "Három alapvető backprop-szabály",
        en: "Three basic backpropagation rules"
      },
      body: {
        hu: "A Theory Test mintakérdései külön kiemelik a négyzetre emelést és az összeadást, a 6. előadás (Lecture 6) példájában pedig szorzás is szerepel. Ezeknél a teljes visszaterjesztés egyszerű lokális deriváltakból áll össze.",
        en: "The official Theory Test examples explicitly target square and addition nodes, and the Lecture 6 example also uses multiplication. The full backward pass is built from these simple local derivatives."
      },
      formula: {
        hu: "c=b² → grad_b=grad_c·2b    |    c=a+b → grad_a=grad_c, grad_b=grad_c    |    c=a·b → grad_a=grad_c·b, grad_b=grad_c·a",
        en: "c=b² → grad_b=grad_c·2b    |    c=a+b → grad_a=grad_c, grad_b=grad_c    |    c=a·b → grad_a=grad_c·b, grad_b=grad_c·a"
      },
      formulaTerms: [
        { symbol: "grad_c", hu: "A végső J kifejezés c szerinti deriváltja, azaz ∂J/∂c.", en: "Derivative of final expression J with respect to c, i.e. ∂J/∂c." },
        { symbol: "c=b²", hu: "Lokális derivált: ∂c/∂b=2b.", en: "Local derivative: ∂c/∂b=2b." },
        { symbol: "c=a+b", hu: "Mindkét bemenet lokális deriváltja 1.", en: "Local derivative with respect to either input is 1." },
        { symbol: "c=a·b", hu: "a szerint a lokális derivált b, b szerint pedig a.", en: "Local derivative with respect to a is b, and with respect to b is a." }
      ],
      workedExample: {
        hu: "Ha c=b², b=3 és grad_c=4, akkor grad_b=4·2·3=24. Nem c=9 értékét használjuk a lokális deriváltban, hanem b-t, mert ∂(b²)/∂b=2b.",
        en: "If c=b², b=3, and grad_c=4, then grad_b=4·2·3=24. We use b in the local derivative because ∂(b²)/∂b=2b."
      },
      examTrap: {
        hu: "A hivatalos mintakérdés egyik direkt csapdája: c=b² esetén grad_b=grad_c·2b a helyes, nem grad_c·2c.",
        en: "One official example-test trap is explicit: for c=b², grad_b=grad_c·2b, not grad_c·2c."
      }
    },
    {
      id: "forward-example",
      title: {
        hu: "6. előadás (Lecture 6) példája: előrefelé számítás",
        en: "Lecture 6 example: forward pass"
      },
      body: {
        hu: "A 6. előadás (Lecture 6) egy egyszerű, egydimenziós lineáris regressziós példán mutatja be a számítási gráfot. A képletet q=wx, ŷ=q+b, z=y−ŷ, J=z² lépésekre bontja. A példában x=2, w=3, b=4 és y=5.",
        en: "Lecture 6 demonstrates the computational graph using a simple one-dimensional linear-regression example. It decomposes the expression into q=wx, ŷ=q+b, z=y−ŷ, J=z² with x=2, w=3, b=4, and y=5."
      },
      formula: {
        hu: "x=2, w=3, b=4, y=5 → q=6 → ŷ=10 → z=−5 → J=25",
        en: "x=2, w=3, b=4, y=5 → q=6 → ŷ=10 → z=−5 → J=25"
      },
      formulaTerms: [
        { symbol: "x", hu: "Bemeneti jellemző.", en: "Input feature." },
        { symbol: "w", hu: "Tanulható súly (weight).", en: "Learnable weight." },
        { symbol: "b", hu: "Tanulható eltolás (bias).", en: "Learnable bias." },
        { symbol: "q=wx", hu: "A szorzás köztes eredménye.", en: "Intermediate result of multiplication." },
        { symbol: "ŷ=q+b", hu: "A modell becslése.", en: "Model prediction." },
        { symbol: "y", hu: "Valódi célérték (target / label).", en: "True target / label." },
        { symbol: "z=y−ŷ", hu: "Előjeles hiba az előadás (lecture) által választott előjellel.", en: "Signed error using the lecture's chosen convention." },
        { symbol: "J=z²", hu: "Négyzetes veszteség ebben az egyetlen példában.", en: "Squared loss for this single example." }
      ],
      why: {
        hu: "A forward pass során a gráf bal oldalától a végső veszteségig haladunk. Ezeket a köztes értékeket a backward pass később felhasználja a deriváltakhoz.",
        en: "The forward pass moves from the graph inputs to the final loss. The intermediate values are then reused during the backward pass."
      },
      examTrap: {
        hu: "Ebben a konkrét dián szereplő példában (slide example) z=y−ŷ, nem ŷ−y. A négyzet miatt a végső J ugyanaz lenne, de a köztes deriváltak előjele ettől függ.",
        en: "In this specific slide example z=y−ŷ, not ŷ−y. Squaring would produce the same final J, but intermediate derivative signs depend on this convention."
      }
    },
    {
      id: "backward-example",
      title: {
        hu: "6. előadás (Lecture 6) példája: lépésenkénti visszaterjesztés",
        en: "Lecture 6 example: step-by-step backpropagation"
      },
      body: {
        hu: "A visszafelé számítás J-ből indul. Triviálisan ∂J/∂J=1. Mivel J=z², ezért ∂J/∂z=2z=−10. A z=y−ŷ műveletnél ∂z/∂ŷ=−1, ezért ∂J/∂ŷ=(−10)·(−1)=10. Az ŷ=q+b összeadásnál ez a 10 változatlanul megy q és b felé. A q=wx szorzásnál w felé a lokális derivált x=2, így ∂J/∂w=10·2=20; x felé pedig w=3, ezért ∂J/∂x=30.",
        en: "The backward pass starts at J with ∂J/∂J=1. Since J=z², ∂J/∂z=2z=−10. For z=y−ŷ, ∂z/∂ŷ=−1, giving ∂J/∂ŷ=10. The addition ŷ=q+b passes 10 unchanged to q and b. For q=wx, the local derivative toward w is x=2, so ∂J/∂w=20; toward x it is w=3, giving ∂J/∂x=30."
      },
      formula: {
        hu: "∂J/∂z=−10 → ∂J/∂ŷ=10 → ∂J/∂q=10, ∂J/∂b=10 → ∂J/∂w=20, ∂J/∂x=30",
        en: "∂J/∂z=−10 → ∂J/∂ŷ=10 → ∂J/∂q=10, ∂J/∂b=10 → ∂J/∂w=20, ∂J/∂x=30"
      },
      formulaTerms: [
        { symbol: "∂J/∂w=20", hu: "A veszteség aktuális érzékenysége a súly változására.", en: "Current sensitivity of the loss to a change in the weight." },
        { symbol: "∂J/∂b=10", hu: "A veszteség aktuális érzékenysége az eltolás változására.", en: "Current sensitivity of the loss to a change in the bias." },
        { symbol: "∂J/∂x=30", hu: "A veszteség érzékenysége a bemenetre; x nem tanulható paraméter ebben a példában, de a derivált matematikailag kiszámítható.", en: "Sensitivity of loss to the input; x is not a learnable parameter here, but the derivative is still mathematically computable." }
      ],
      why: {
        hu: "A tanításhoz elsősorban a tanulható paraméterek – itt w és b – deriváltjai kellenek. Ezek mondják meg az optimalizálónak, milyen irányban módosítsa a paramétereket.",
        en: "Training mainly needs derivatives with respect to learnable parameters—here w and b. They tell the optimizer how the parameters should be changed."
      },
      examTrap: {
        hu: "A gráfban megjelenő ∂J/∂q, ∂J/∂z stb. nem új bemenetek, hanem gradiensértékek: érzékenységi információk a végső veszteséghez képest.",
        en: "Values such as ∂J/∂q and ∂J/∂z are not additional inputs. They are gradients—sensitivity information relative to the final loss."
      }
    },
    {
      id: "parameter-update",
      title: {
        hu: "A gradiens kiszámítása után jön a paraméterfrissítés",
        en: "Parameter updating comes after gradient computation"
      },
      body: {
        hu: "A backpropagation eredménye a paraméterek szerinti gradiens. Ezt ezután egy optimalizáló használja fel. Egyszerű gradienscsökkentésnél a frissítés w:=w−α·∂J/∂w és b:=b−α·∂J/∂b.",
        en: "Backpropagation outputs gradients with respect to parameters. An optimizer then uses them. With simple gradient descent: w:=w−α·∂J/∂w and b:=b−α·∂J/∂b."
      },
      formula: {
        hu: "α=0,1 esetén: w=3−0,1·20=1,   b=4−0,1·10=3",
        en: "with α=0.1: w=3−0.1·20=1,   b=4−0.1·10=3"
      },
      formulaTerms: [
        { symbol: "α", hu: "Tanulási ráta (learning rate).", en: "Learning rate." },
        { symbol: "∂J/∂w", hu: "A backpropagation által kiszámított súlygradiens.", en: "Weight gradient computed by backpropagation." },
        { symbol: "∂J/∂b", hu: "A backpropagation által kiszámított biasgradiens.", en: "Bias gradient computed by backpropagation." }
      ],
      connections: {
        hu: "SGD esetén ugyanez a frissítési logika használható, csak a gradiens egy mini-batchből becsült gradiens lehet a teljes adathalmaz gradiense helyett.",
        en: "SGD can use the same update logic, except the gradient may be estimated from a mini-batch rather than the full dataset."
      },
      examTrap: {
        hu: "A backpropagation nem módosítja automatikusan a paramétereket. A gradiensek kiszámítása és a paraméterfrissítés két külön lépés.",
        en: "Backpropagation does not itself automatically update parameters. Gradient computation and parameter updating are separate steps."
      }
    },
    {
      id: "training-cycle",
      title: {
        hu: "A teljes tanítási ciklus",
        en: "The complete training cycle"
      },
      body: {
        hu: "A 6. előadás (Lecture 6) a teljes folyamatot lépésekre bontja: 1) szimbolikus deriválási szabályok meghatározása, 2) paraméterek inicializálása, 3) tanítási példa vagy mini-batch választása, 4) előrefelé számítás (forward pass), 5) visszaterjesztés (backpropagation), 6) paraméterfrissítés, majd vissza a 3. lépéshez. A ciklus adott iterációszámig vagy korai leállításig (early stopping) ismétlődik.",
        en: "Lecture 6 breaks training into: 1) symbolic derivative setup, 2) parameter initialization, 3) choose a training example or mini-batch, 4) előrefelé számítás (forward pass), 5) visszaterjesztés (backpropagation), 6) parameter update, then return to step 3 until an iteration limit or early stopping."
      },
      why: {
        hu: "Ez a séma összeköti a korábbi fejezeteket: a modell adja a forward számítást, a veszteség méri a hibát, a backpropagation gradienseket ad, az optimalizáló módosítja a paramétereket, a validáció pedig eldöntheti, mikor álljunk le.",
        en: "This sequence connects earlier chapters: the model defines the forward computation, loss measures error, backprop produces gradients, the optimizer changes parameters, and validation can determine when to stop."
      },
      keyTerms: [
        { term: "parameter initialization", hu: "paraméterinicializálás" },
        { term: "training loop", hu: "tanítási ciklus" }
      ]
    },
    {
      id: "autograd",
      title: {
        hu: "Automatikus deriválás PyTorchban",
        en: "Automatic differentiation in PyTorch"
      },
      body: {
        hu: "Az előadás (lecture) szerint a PyTorch tensorok részei lehetnek egy számítási gráfnak, és a torch.autograd automatikusan képes végrehajtani a szükséges deriválási műveleteket. A keretrendszer (framework) követi, milyen műveletekből jött létre a végső érték, majd a láncszabály alapján kiszámítja a gradienseket.",
        en: "According to the lecture, PyTorch tensors can participate in a computational graph and torch.autograd can automatically perform the required differentiation. The framework tracks the operations that produced the final value and applies the chain rule to compute gradients."
      },
      why: {
        hu: "A matematikai elv nem tűnik el: továbbra is számítási gráf és láncszabály működik, csak a kézi deriválást a keretrendszer automatizálja.",
        en: "The mathematics does not disappear: computational graphs and the chain rule are still used, but the framework automates the derivative bookkeeping."
      },
      examTrap: {
        hu: "Az automatikus deriválás (automatic differentiation) nem azt jelenti, hogy nincs backpropagation vagy láncszabály. Éppen ezek automatikus végrehajtását jelenti.",
        en: "Automatic differentiation does not mean there is no backpropagation or chain rule. It automates those computations."
      },
      keyTerms: [
        { term: "automatic differentiation", hu: "automatikus deriválás" },
        { term: "torch.autograd" }
      ]
    }
  ]
};

export const backpropQuestions: Question[] = [
  {
    id: "bp-q1",
    topics: ["computational-graph"],
    prompt: { hu: "Mely állítások igazak számítási gráfra (computational graph) az 6. előadás (Lecture 6) szerint?", en: "Which statements are true about a computational graph according to Lecture 6?" },
    choices: [
      { id: "a", text: { hu: "Összetett kifejezést (expression) elemi műveletek láncolataként reprezentál.", en: "It represents a complicated expression as chained elementary operations." } },
      { id: "b", text: { hu: "Csomópontok (nodes) elemi műveletek lehetnek.", en: "Nodes can be elementary operations." } },
      { id: "c", text: { hu: "élek (edges) a műveletek egymásra épülését (operation chaining) mutatják.", en: "Edges show how operations are chained." } },
      { id: "d", text: { hu: "Nem tartalmazhat köztes változókat.", en: "It cannot contain intermediate variables." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Az előadás (lecture) köztes változók és elemi műveletek felbontásával épít fel számítási gráfot (computational graph).", en: "The lecture constructs a computational graph by introducing intermediate variables and elementary operations." }
  },
  {
    id: "bp-q2",
    topics: ["chain-rule"],
    prompt: { hu: "Mi a visszaterjesztés láncszabályának (backpropagation chain rule) alapelve egy csomópontnál (node)?", en: "What is the chain-rule principle used by backpropagation at a node?" },
    choices: [
      { id: "a", text: { hu: "bejövő gradiens (incoming gradient) × lokális derivált (local derivative).", en: "Incoming gradient × local derivative." } },
      { id: "b", text: { hu: "Az elemi deriváltak (elementary derivatives) megfelelő lánc menti szorzata.", en: "Multiply the relevant elementary derivatives along the chain." } },
      { id: "c", text: { hu: "Minden lokális deriváltat (local derivative) összeadunk a gradienshez (gradient).", en: "Add every local derivative to the gradient." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A láncszabály (chain rule) szerint a derivált-ek a megfelelő útvonal mentén szorzódnak.", en: "By the chain rule, derivatives multiply along the relevant path." }
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
    explanation: { hu: "összeadás (addition) lokális deriváltja (local derivative) mindkét bemenet (input) szerint 1.", en: "The local derivative of addition with respect to either input is 1." }
  },
  {
    id: "bp-q5",
    topics: ["multiplication-node"],
    prompt: { hu: "c=a·b és grad_c bejövő gradiens (incoming gradient) esetén mely visszaterjesztés helyes?", en: "For c=a·b with incoming gradient grad_c, which propagation is correct?" },
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
    prompt: { hu: "Miért hatékonyabb a backpropagation, mint minden paraméter (parameter) derivált-jének teljes újraszámolása?", en: "Why is backpropagation more efficient than recomputing the full derivative separately for every parameter?" },
    choices: [
      { id: "a", text: { hu: "Újrahasznosítja a közös sub-results / intermediate deriváltak értékeket.", en: "It reuses shared sub-results / intermediate derivatives." } },
      { id: "b", text: { hu: "A számítási gráf (computational graph) dependency structure-jét kihasználja.", en: "It exploits the dependency structure of the computational graph." } },
      { id: "c", text: { hu: "Nem kell semmilyen derivált-et számolni.", en: "No derivatives need to be computed at all." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "deriváltak továbbra is kellenek, de az elemi/lokális deriváltak (elementary/local derivatives) és köztes eredmények újrahasznosíthatók.", en: "Derivatives are still required, but elementary/local derivatives and intermediate results can be reused." }
  },
  {
    id: "bp-q7",
    topics: ["lecture-example","forward-pass"],
    prompt: { hu: "Az 6. előadás (Lecture 6) példájában x=2,w=3,b=4,y=5 és q=wx, ŷ=q+b, z=y−ŷ, J=z². Mely értékek helyesek?", en: "In the Lecture 6 example x=2,w=3,b=4,y=5 with q=wx, ŷ=q+b, z=y−ŷ, J=z², which values are correct?" },
    choices: [
      { id: "a", text: { hu: "q=6.", en: "q=6." } },
      { id: "b", text: { hu: "ŷ=10.", en: "ŷ=10." } },
      { id: "c", text: { hu: "z=−5.", en: "z=−5." } },
      { id: "d", text: { hu: "J=25.", en: "J=25." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Ezek a dia (slide) konkrét feed-előre (forward) értékei.", en: "These are the exact feed-forward values shown in the slide." }
  },
  {
    id: "bp-q8",
    topics: ["lecture-example","backward-pass"],
    prompt: { hu: "Ugyanebben az 6. előadás (Lecture 6) példában mely gradients helyesek?", en: "In the same Lecture 6 example, which gradients are correct?" },
    choices: [
      { id: "a", text: { hu: "∂J/∂z = −10.", en: "∂J/∂z = −10." } },
      { id: "b", text: { hu: "∂J/∂ŷ = 10.", en: "∂J/∂ŷ = 10." } },
      { id: "c", text: { hu: "∂J/∂b = 10.", en: "∂J/∂b = 10." } },
      { id: "d", text: { hu: "∂J/∂w = 20.", en: "∂J/∂w = 20." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "A dia (slide) visszaterjesztés (backprop) chainje pontosan ezeket az értékeket adja.", en: "The slide's backpropagation chain gives exactly these values." }
  },
  {
    id: "bp-q9",
    topics: ["lecture-example","signs"],
    prompt: { hu: "Miért lesz ∂J/∂ŷ pozitív 10, miközben ∂J/∂z=−10 az 6. előadás (Lecture 6) példában?", en: "Why is ∂J/∂ŷ positive 10 while ∂J/∂z=−10 in the Lecture 6 example?" },
    choices: [
      { id: "a", text: { hu: "Mert z=y−ŷ, így ∂z/∂ŷ=−1.", en: "Because z=y−ŷ, so ∂z/∂ŷ=−1." } },
      { id: "b", text: { hu: "(−10)·(−1)=10.", en: "(−10)·(−1)=10." } },
      { id: "c", text: { hu: "Mert z=ŷ−y.", en: "Because z=ŷ−y." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A dia (slide) z=y−ŷ definíciót használ, ezért jön be a −1 lokális derivált (local derivative).", en: "The slide defines z=y−ŷ, which introduces the local derivative −1." }
  },
  {
    id: "bp-q10",
    topics: ["parameter-update"],
    prompt: { hu: "Ha w=3, ∂J/∂w=20 és α=0.1, gradienscsökkentési frissítés (gradient-descent update) után mi lesz w?", en: "If w=3, ∂J/∂w=20, and α=0.1, what is w after the gradient-descent update?" },
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
    prompt: { hu: "Mely állítások igazak backpropagation és paraméterfrissítés (parameter update) kapcsolatára?", en: "Which statements are true about the relationship between backpropagation and parameter updating?" },
    choices: [
      { id: "a", text: { hu: "Backpropagation gradients értékeket számol.", en: "Backpropagation computes gradient values." } },
      { id: "b", text: { hu: "Az optimizer/frissítés (update) ezután használja a gradients értékeket a paraméterek (parameters) módosítására.", en: "The optimizer/update then uses gradients to modify parameters." } },
      { id: "c", text: { hu: "Backpropagation önmagában ugyanaz, mint θ := θ−αgrad.", en: "Backpropagation itself is identical to θ := θ−αgrad." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A visszafelé számítás (backward pass) gradienst (gradient) számol; a paraméterfrissítés (parameter update) külön következő lépés.", en: "The backward pass computes gradients; parameter updating is a separate next step." }
  },
  {
    id: "bp-q12",
    topics: ["training-cycle"],
    prompt: { hu: "Mely lépések szerepelnek az 6. előadás (Lecture 6) visszaterjesztés (backprop) tanítási ciklusában (training cycle)?", en: "Which steps appear in the Lecture 6 backpropagation training cycle?" },
    choices: [
      { id: "a", text: { hu: "paraméter (parameter) initialization.", en: "Parameter initialization." } },
      { id: "b", text: { hu: "példa (example) vagy mini-batch választása.", en: "Choosing an example or mini-batch." } },
      { id: "c", text: { hu: "Feed előre (forward).", en: "Feed forward." } },
      { id: "d", text: { hu: "Backpropagation.", en: "Backpropagation." } },
      { id: "e", text: { hu: "paraméterfrissítés (parameter update).", en: "Parameter update." } }
    ],
    correctIds: ["a","b","c","d","e"],
    explanation: { hu: "Az előadás (lecture) summary ezeket mind explicit felsorolja.", en: "The lecture summary explicitly lists all of these." }
  },
  {
    id: "bp-q13",
    topics: ["autograd","pytorch"],
    prompt: { hu: "Mely állítások igazak PyTorch tensors és autograd kapcsolatára az előadás (lecture) szerint?", en: "Which statements are true about PyTorch tensors and autograd according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "Tensors számítási gráf (computational graph) részei lehetnek.", en: "Tensors can be part of computational graphs." } },
      { id: "b", text: { hu: "torch.autograd automatikusan számolhat gradients értékeket a graphon.", en: "torch.autograd can automatically compute gradients over the graph." } },
      { id: "c", text: { hu: "Ez a láncszabály (chain rule) használatát automatizálja.", en: "This automates the use of the chain rule." } },
      { id: "d", text: { hu: "Autograd miatt nincs szükség számítási gráfra (computational graph).", en: "Autograd means no computational graph is needed." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Autograd a számítási gráf (computational graph) alapján végzi automatikusan a derivált/visszaterjesztés (backprop) számítást.", en: "Autograd performs automatic differentiation/backpropagation using the computational graph." }
  },
  {
    id: "bp-q14",
    topics: ["chain-rule","concept"],
    prompt: { hu: "Melyik megfogalmazás illik a backpropagation működésére?", en: "Which descriptions match how backpropagation works?" },
    choices: [
      { id: "a", text: { hu: "A veszteség (loss) felől visszafelé haladunk a dependency graphon.", en: "We move backward from the loss through the dependency graph." } },
      { id: "b", text: { hu: "Minden csomópontnál (node) lokális deriváltat (local derivative) kombinálunk az bejövő gradienssel (incoming gradient).", en: "At each node, a local derivative is combined with the incoming gradient." } },
      { id: "c", text: { hu: "A láncszabály (chain rule) segítségével gradiensek (gradients) jutnak el a korábbi változókhoz/paraméterekhez (variables/parameters) (parameters) felé.", en: "Using the chain rule, gradients propagate toward earlier variables/parameters." } },
      { id: "d", text: { hu: "Csak előre (forward) values értékeket számítunk, derivált-ek nélkül.", en: "We compute only forward values, without derivatives." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "visszaterjesztés (backprop) a előre (forward) gráf dependencyit fordított irányban használja gradiens (gradient) propagationre.", en: "Backprop uses the forward graph dependencies in reverse for gradient propagation." }
  }
];
