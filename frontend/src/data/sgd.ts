import type { Lesson, Question } from "../types";

export const sgdLesson: Lesson = {
  id: "sgd-minibatches",
  title: {
    hu: "Batch gradienscsökkentés, SGD és mini-batch-ek",
    en: "Batch Gradient Descent, SGD, and Mini-batches"
  },
  subtitle: {
    hu: "Miért nem mindig az egész tanítóhalmazon számolunk gradienst, és hogyan cserélünk pontosságot számítási költségre?",
    en: "Why gradients are not always computed on the full training set and how accuracy is traded against computational cost"
  },
  source: "Lectures 5–6",
  sections: [
    {
      id: "batch-gradient-descent",
      title: {
        hu: "Batch gradienscsökkentés: minden példa egy frissítéshez",
        en: "Batch gradient descent: every example for one update"
      },
      body: {
        hu: "Batch gradienscsökkentésnél (batch gradient descent) egy paraméterfrissítés előtt a teljes tanítóhalmaz minden példáját felhasználjuk a veszteség és a gradiens kiszámításához. Ez a teljes adathalmaz alapján számított gradiens (full-dataset gradient), ezért nem mintavételi becslés.",
        en: "In batch gradient descent, the entire training set is used to compute the loss and gradient before each parameter update. This produces the full-dataset gradient rather than a sampled estimate."
      },
      why: {
        hu: "Előnye, hogy az adott paraméterállapothoz pontosan azt a gradienst kapjuk, amelyet a teljes tanítóhalmaz definiál. Hátránya, hogy nagy adathalmaznál egyetlen frissítés is drága lehet időben és memóriában.",
        en: "Its advantage is that the gradient exactly matches the full training objective at the current parameter state. Its disadvantage is that one update can be expensive for large datasets."
      },
      formula: {
        hu: "g_full = (1/m) · Σⱼ ∇L_j(θ)",
        en: "g_full = (1/m) · Σⱼ ∇L_j(θ)"
      },
      formulaTerms: [
        { symbol: "m", hu: "A tanítási példák teljes száma.", en: "Total number of training examples." },
        { symbol: "L_j", hu: "A j-edik példához tartozó veszteség.", en: "Loss for example j." },
        { symbol: "∇L_j", hu: "A j-edik példa hozzájárulása a gradienshez.", en: "Gradient contribution of example j." },
        { symbol: "g_full", hu: "A teljes tanítóhalmazon számított gradiens.", en: "Gradient computed over the full training set." }
      ],
      intuition: {
        hu: "Minden frissítés előtt „megkérdezzük” az összes tanítópontot, merre lenne érdemes mozdítani a paramétereket.",
        en: "Before every update, we effectively ask every training example which direction the parameters should move."
      },
      examTrap: {
        hu: "Ebben a kurzusban a batch gradienscsökkentés (batch gradient descent) kifejezés a teljes tanítóhalmazt használó frissítést jelenti.",
        en: "In this course, batch gradient descent means using the full training set for an update."
      },
      keyTerms: [
        { term: "batch gradient descent", hu: "batch gradienscsökkentés" },
        { term: "full-dataset gradient", hu: "teljes adathalmazon számított gradiens" }
      ]
    },
    {
      id: "why-sgd",
      title: {
        hu: "SGD: becsült gradiens kisebb mintából",
        en: "SGD: estimating the gradient from a smaller sample"
      },
      body: {
        hu: "A tananyag az SGD-t (Stochastic Gradient Descent) úgy mutatja be, hogy véletlenszerűen kiválasztunk egy kisebb részhalmazt a tanítóhalmazból, vagyis mini-batch-et, és csak ezen számoljuk ki a következő frissítéshez szükséges gradienst. Ez közelítő gradiens (approximate gradient), mert nem az összes példát használja.",
        en: "The course presents Stochastic Gradient Descent (SGD) by randomly selecting a smaller subset of the training set—a mini-batch—and computing the next update gradient only on that subset. This is an approximate gradient because it does not use every example."
      },
      why: {
        hu: "A kisebb minta sokkal gyorsabban feldolgozható, így ugyanannyi idő alatt több paraméterfrissítés végezhető. Ez különösen fontos nagy adathalmazok és nagy neurális hálózatok esetén.",
        en: "A smaller sample is much faster to process, allowing more parameter updates in the same amount of time. This is especially important for large datasets and neural networks."
      },
      formula: {
        hu: "g_batch ≈ g_full    →    θ := θ − α·g_batch",
        en: "g_batch ≈ g_full    →    θ := θ − α·g_batch"
      },
      formulaTerms: [
        { symbol: "g_batch", hu: "A kiválasztott mini-batch alapján becsült gradiens.", en: "Gradient estimate computed from the selected mini-batch." },
        { symbol: "g_full", hu: "A teljes tanítóhalmaz gradiensének értéke.", en: "Full-training-set gradient." },
        { symbol: "α", hu: "Tanulási ráta (learning rate).", en: "Learning rate." },
        { symbol: "θ", hu: "A modell paraméterei.", en: "Model parameters." }
      ],
      workedExample: {
        hu: "Szemléltető példa: ha egymillió tanítóképünk van, nem feltétlenül akarunk minden egyes súlyfrissítéshez mind az egymillió képet feldolgozni. Ehelyett például 128 képet választunk, kiszámoljuk rajtuk a gradienst, majd frissítjük a paramétereket.",
        en: "Illustrative example: with one million training images, processing all one million before every update is impractical. Instead, choose a mini-batch such as 128 images, compute the gradient, and update the parameters."
      },
      examTrap: {
        hu: "A kurzus terminológiájában az SGD gyakorlati változata mini-batch-eket használhat. Ezért a „SGD mindig pontosan egyetlen tanítási példán számol gradienst” állítás a tárgy megfogalmazása szerint nem szükségszerűen igaz.",
        en: "In the course terminology, practical SGD may use mini-batches. Therefore the statement 'SGD always computes the gradient from exactly one training example' is not necessarily true in this course framing."
      },
      keyTerms: [
        { term: "Stochastic Gradient Descent (SGD)" },
        { term: "mini-batch" },
        { term: "approximate gradient", hu: "közelítő gradiens" }
      ]
    },
    {
      id: "batch-size-tradeoff",
      title: {
        hu: "Mini-batch méret: zajosság kontra számítási költség",
        en: "Mini-batch size: noise versus computational cost"
      },
      body: {
        hu: "A mini-batch mérete (batch size) meghatározza, hány példából becsüljük a gradienst egy frissítéshez. Kisebb mini-batch esetén a becslés varianciája (variance) nagyobb: különböző véletlen minták jobban eltérő gradienseket adhatnak. Nagyobb mini-batch esetén a becslés stabilabb lehet, viszont több számításra és memóriára van szükség.",
        en: "Batch size determines how many examples are used to estimate the gradient for one update. Smaller mini-batches have higher gradient-estimate variance, so different random subsets can produce more different directions. Larger mini-batches can be more stable but require more computation and memory."
      },
      why: {
        hu: "Ez az egyik alapvető optimalizálási kompromisszum: a kisebb batch gyors és olcsó, de zajosabb; a nagyobb batch pontosabban közelíti a teljes gradienst, de drágább.",
        en: "This is a core optimization trade-off: small batches are cheap and fast but noisy, while larger batches approximate the full gradient more closely at greater cost."
      },
      formula: {
        hu: "kisebb batch → nagyobb gradiensvariancia    |    nagyobb batch → több számítás + több memória",
        en: "smaller batch → higher gradient variance    |    larger batch → more compute + more memory"
      },
      formulaTerms: [
        { symbol: "batch size", hu: "Az egy frissítéshez felhasznált példák száma.", en: "Number of examples used for one update." },
        { symbol: "variance", hu: "A különböző mini-batch-ekből kapott gradiensbecslések szóródása.", en: "Variability of gradient estimates from different mini-batches." }
      ],
      intuition: {
        hu: "Ha csak egy-két példából próbáljuk megmondani, merre van a teljes adathalmaz szerinti „lejtő”, könnyebben tévedünk. Sok példából a becslés stabilabb lesz.",
        en: "If only one or two examples are used to estimate the full-dataset downhill direction, the estimate is easier to get wrong. More examples generally make it more stable."
      },
      examTrap: {
        hu: "A kisebb batch nem jelent pontosabb gradienst. Az előadás szerint éppen a gradiensbecslés varianciája nő, és nagyobb az esélye, hogy egy frissítés rossz irányba mutat.",
        en: "A smaller batch does not mean a more accurate gradient. The lecture explicitly says gradient-estimate variance increases and wrong-direction updates become more likely."
      }
    },
    {
      id: "learning-rate-batch",
      title: {
        hu: "Miért függhet a tanulási ráta a batch méretétől?",
        en: "Why can learning rate depend on batch size?"
      },
      body: {
        hu: "Az 5. előadás (Lecture 5) külön kiemeli, hogy ha csak kis mini-batch használható, a konvergenciához szükség lehet a tanulási ráta (learning rate) csökkentésére. Ennek oka, hogy a kisebb batch zajosabb gradiensbecslést ad.",
        en: "Lecture 5 explicitly notes that if only a small mini-batch can be used, the learning rate may need to be reduced to achieve convergence, because smaller batches produce noisier gradient estimates."
      },
      why: {
        hu: "Ha a gradiens iránya eleve bizonytalanabb, egy túl nagy α ezt a bizonytalanságot nagy paraméterugrásokká nagyíthatja. Kisebb lépéssel a modell kevésbé reagál túl egy-egy zajos mini-batchre.",
        en: "When the gradient direction is already noisy, a large α can amplify that noise into large parameter jumps. A smaller step reduces the effect of any single noisy mini-batch."
      },
      formula: {
        hu: "θ := θ − α·g_batch",
        en: "θ := θ − α·g_batch"
      },
      formulaTerms: [
        { symbol: "α", hu: "A frissítés lépésméretét szabályozó tanulási ráta.", en: "Learning rate controlling update size." },
        { symbol: "g_batch", hu: "A mini-batchből becsült, zajosabb gradiens.", en: "Noisier gradient estimated from a mini-batch." }
      ],
      examTrap: {
        hu: "A kurzus nem azt állítja, hogy kisebb batch esetén mindig növelni kell α-t. Éppen azt emeli ki, hogy szükség lehet kisebb tanulási rátára.",
        en: "The course does not say that α should always be increased for small batches. It explicitly notes that a smaller learning rate may be required."
      }
    },
    {
      id: "gpu-memory",
      title: {
        hu: "Batch méret a gyakorlatban: GPU-memória",
        en: "Batch size in practice: GPU memory"
      },
      body: {
        hu: "Nagy neurális hálózatoknál az előadás gyakorlati szempontként említi, hogy a mini-batch méretét gyakran a rendelkezésre álló GPU-memória korlátozza. Egy batch minden példájához köztes aktivációkat és egyéb adatokat kell tárolni, ezért a batch méretének növelése memóriaigényes.",
        en: "For large neural networks, the lecture notes that mini-batch size is often constrained by available GPU memory. Intermediate activations and other data must be stored for examples in the batch, so larger batches require more memory."
      },
      why: {
        hu: "A batch méret ezért nem pusztán elméleti hiperparaméter. Hardveres korlátok is megszabhatják, mi fér el egyszerre.",
        en: "Batch size is therefore not purely a theoretical hyperparameter; hardware limits can determine what fits at once."
      },
      realWorld: {
        hu: "Szemléltető példa: nagy képek vagy nagy modell esetén lehet, hogy batch=128 nem fér a GPU memóriájába, miközben batch=16 igen. Ilyenkor a tanulási rátát és más beállításokat is ehhez kellhet igazítani.",
        en: "Illustrative example: with large images or a large model, batch=128 may not fit in GPU memory while batch=16 does. Learning rate and other settings may then need adjustment."
      },
      examTrap: {
        hu: "A „használjunk annyi példát, amennyi befér a GPU-ba” az előadás gyakorlati hatékonysági megfontolása, nem matematikailag bizonyított univerzális optimális batch méret.",
        en: "Using as many examples as fit in GPU memory is presented as a practical efficiency consideration, not a universally optimal mathematical batch size."
      }
    },
    {
      id: "sgd-variants",
      title: {
        hu: "SGD-változatok és optimalizálók",
        en: "SGD variants and optimizers"
      },
      body: {
        hu: "Az előadás példaként felsorolja az momentumos SGD (SGD with Momentum), AdaGrad, Adam, Adamax és RMSprop módszereket. Ezek mind gradiensalapú optimalizálási családhoz kapcsolódnak, de az adott Theory Test-anyag ezen a ponton nem vezeti le részletesen a frissítési képleteiket.",
        en: "The lecture lists momentumos SGD (SGD with Momentum), AdaGrad, Adam, Adamax, and RMSprop as examples of gradient-based optimization variants. The tested material at this point does not derive their update equations in detail."
      },
      why: {
        hu: "A fontos kapcsolat az, hogy a backpropagation kiszámítja a gradienseket, az optimalizáló pedig eldönti, hogyan használjuk fel őket a paraméterek módosítására.",
        en: "The important connection is that backpropagation computes gradients, while the optimizer determines how those gradients are used to change parameters."
      },
      connections: {
        hu: "A következő fejezetben a visszaterjesztés (backpropagation) azt mutatja meg, hogyan jutunk el ∂J/∂w és ∂J/∂b értékekhez. Az SGD vagy más optimalizáló ezután ezekből készít paraméterfrissítést.",
        en: "The next chapter explains how backpropagation obtains ∂J/∂w and ∂J/∂b. SGD or another optimizer then turns those gradients into parameter updates."
      },
      examTrap: {
        hu: "Ne tanulj ki nem adott Adam/RMSprop képleteket vizsgaszabályként ebből a blokkból. A dia (slide) ezen a ponton név szerint sorolja fel a változatokat.",
        en: "Do not invent detailed Adam/RMSprop formulas as exam rules from this block. The slide lists these variants by name."
      },
      keyTerms: [
        { term: "Momentum" },
        { term: "AdaGrad" },
        { term: "Adam" },
        { term: "Adamax" },
        { term: "RMSprop" }
      ]
    }
  ]
};

export const sgdQuestions: Question[] = [
  {
    id: "sgd-q1",
    topics: ["batch-gradient-descent"],
    prompt: { hu: "Mely állítások igazak batch gradienscsökkentésre (batch gradient descent) az előadás szerint?", en: "Which statements are true about batch gradient descent according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "A teljes tanítóhalmazon (training set) átlagoljuk a veszteséget (loss).", en: "The loss is averaged over the entire training set." } },
      { id: "b", text: { hu: "Egy frissítés (update) gradienséhez (gradient) az egész adathalmazt (dataset) használjuk.", en: "The entire dataset is used for one update gradient." } },
      { id: "c", text: { hu: "Nagy adathalmaznál (large dataset) egyetlen lépés computational costja nagy lehet.", en: "For a large dataset, the computational cost of a single step can be large." } },
      { id: "d", text: { hu: "Mindig csak egyetlen tanítási példát (training example) használ.", en: "It always uses exactly one training example." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A teljes batch (full batch) az egész tanítóhalmazból (training set) számít egy frissítés (update) gradienst (gradient).", en: "A full batch computes one update gradient from the whole training set." }
  },
  {
    id: "sgd-q2",
    topics: ["sgd","mini-batch"],
    prompt: { hu: "Hogyan írja le az előadás az SGD-t?", en: "How does the lecture describe SGD?" },
    choices: [
      { id: "a", text: { hu: "Véletlenszerű tanítóadat-részmintát (training-data sub-sample) választ.", en: "It selects a random sub-sample of the training data." } },
      { id: "b", text: { hu: "Egy mini-batch alapján számít közelítő gradienst (gradient).", en: "It computes an approximate gradient from a mini-batch." } },
      { id: "c", text: { hu: "Általában gyorsabb lehet, mint minden lépésnél (step) a teljes adathalmaz (dataset) feldolgozása.", en: "It can usually be faster than processing the whole dataset for every step." } },
      { id: "d", text: { hu: "A gradiens (gradient) minden stepben szükségszerűen pontos teljes adathalmazon számított gradiens (full-dataset gradient).", en: "The gradient is necessarily the exact full-dataset gradient at every step." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "SGD az előadásban (lecture) véletlen (random) mini-batchből közelítő gradienst (gradient) számol.", en: "In the lecture, SGD computes an approximate gradient from a random mini-batch." }
  },
  {
    id: "sgd-q3",
    topics: ["sgd","example-question"],
    prompt: { hu: "Igaz-e a kurzus értelmezése alapján, hogy SGD-ben minden paraméterfrissítést (parameter update) kötelező pontosan egyetlen tanítási példa (training example) gradienséből (gradient) számolni?", en: "According to the course framing, must every SGD parameter update be computed from exactly one training example?" },
    choices: [
      { id: "a", text: { hu: "Nem; az előadás véletlen mini-batchet (random mini-batch) / részmintát (sub-sample) használ.", en: "No; the lecture uses a random mini-batch / sub-sample." } },
      { id: "b", text: { hu: "Igen; több példa használata már nem lehet SGD.", en: "Yes; using more than one example can no longer be SGD." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Az előadás és az előadás 6 összefoglaló is mini-batch gradienst (gradient) nevez SGD-nek.", en: "Both the lecture and the Lecture 6 recap describe SGD using mini-batch gradients." }
  },
  {
    id: "sgd-q4",
    topics: ["batch-size","variance"],
    prompt: { hu: "Mi várható, ha csökkentjük a mini-batch méretet (size)?", en: "What is expected if we decrease the mini-batch size?" },
    choices: [
      { id: "a", text: { hu: "A gradiensbecslés (gradient estimate) varianciája (variance) nő.", en: "Gradient-estimate variance increases." } },
      { id: "b", text: { hu: "Nő annak esélye, hogy egy frissítés (update) rossz irányba visz.", en: "The chance that an update moves in the wrong direction increases." } },
      { id: "c", text: { hu: "A frissítések (updates) zajosabbak lehetnek.", en: "Updates can become noisier." } },
      { id: "d", text: { hu: "A gradiens (gradient) szükségszerűen pontosabb lesz.", en: "The gradient necessarily becomes more accurate." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Az előadás kisebb mini-batchhez nagyobb varianciája (variance)t és nagyobb rossz irányú frissítés kockázatát (wrong-direction risk) társít.", en: "The lecture associates smaller mini-batches with higher variance and a greater risk of wrong-direction updates." }
  },
  {
    id: "sgd-q5",
    topics: ["batch-size","compute"],
    prompt: { hu: "Mi várható, ha növeljük a mini-batch méretet (size)?", en: "What is expected if we increase the mini-batch size?" },
    choices: [
      { id: "a", text: { hu: "Nő a computing requirement.", en: "Computing requirements increase." } },
      { id: "b", text: { hu: "Nő a memóriaigény (memory) requirement.", en: "Memory requirements increase." } },
      { id: "c", text: { hu: "A gradiensbecslés (gradient estimate) általában kevésbé zajos lehet.", en: "The gradient estimate can generally become less noisy." } },
      { id: "d", text: { hu: "A memóriaigény (memory) requirement biztosan csökken.", en: "Memory requirements definitely decrease." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Nagyobb batch több példát (example) dolgoz fel egyszerre: stabilabb becslés lehet, nagyobb számítási igény (compute)/memóriaigény (memory) áron.", en: "A larger batch processes more examples at once: the estimate can be more stable, at higher compute/memory cost." }
  },
  {
    id: "sgd-q6",
    topics: ["batch-size","learning-rate"],
    prompt: { hu: "Mit mond az előadás kis mini-batch és tanulási ráta (learning rate) kapcsolatáról?", en: "What does the lecture say about small mini-batches and learning rate?" },
    choices: [
      { id: "a", text: { hu: "Kis mini-batch esetén szükség lehet kisebb tanulási rátára (learning rate) a konvergenciához (convergence).", en: "With a small mini-batch, a smaller learning rate may be needed for convergence." } },
      { id: "b", text: { hu: "A nagyobb gradiens (gradient) variancia (variance) miatt túl nagy tanulási ráta (learning rate) problémás lehet.", en: "Because of higher gradient variance, an excessively large learning rate can be problematic." } },
      { id: "c", text: { hu: "Kis batch esetén mindig növelni kell a tanulási ráta (learning rate) értékét.", en: "With a small batch, the learning rate must always be increased." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A dia (slide) kifejezetten azt mondja: kis mini-batch esetén csökkenteni kellhet a tanulási ráta (learning rate) értékét a konvergenciához (convergence).", en: "The slide explicitly states that with a small mini-batch the learning rate may need to be reduced to achieve convergence." }
  },
  {
    id: "sgd-q7",
    topics: ["gpu-memory","batch-size"],
    prompt: { hu: "Mely állítás szerepel az előadásban (lecture) nagy neurális hálózatok (neural networks) batchméret (batch size) megválasztásáról?", en: "Which statement appears in the lecture about batch-size selection for large neural networks?" },
    choices: [
      { id: "a", text: { hu: "Efficiency szempontból gyakran annyi példát (example) választunk, amennyi befér GPU memoryba.", en: "For efficiency, one often chooses as many examples as fit in GPU memory." } },
      { id: "b", text: { hu: "Ez egy gyakorlati heuristic.", en: "This is a practical heuristic." } },
      { id: "c", text: { hu: "Ez minden problémára bizonyítottan optimális batch size.", en: "This is a proven optimal batch size for every problem." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Az előadás ezt efficiency considerationként, nem univerzális matematikai optimumként adja meg.", en: "The lecture gives this as an efficiency consideration, not a universal mathematical optimum." }
  },
  {
    id: "sgd-q8",
    topics: ["sgd-variants"],
    prompt: { hu: "Melyeket sorolja fel az előadás SGD/optimizer variantként?", en: "Which are listed by the lecture as SGD/optimizer variants?" },
    choices: [
      { id: "a", text: { hu: "momentumos SGD (SGD with Momentum)", en: "momentumos SGD (SGD with Momentum)" } },
      { id: "b", text: { hu: "AdaGrad", en: "AdaGrad" } },
      { id: "c", text: { hu: "Adam", en: "Adam" } },
      { id: "d", text: { hu: "Adamax", en: "Adamax" } },
      { id: "e", text: { hu: "RMSprop", en: "RMSprop" } }
    ],
    correctIds: ["a","b","c","d","e"],
    explanation: { hu: "Az előadás 5 mind az öt nevet felsorolja.", en: "Lecture 5 lists all five names." }
  },
  {
    id: "sgd-q9",
    topics: ["mlp-training"],
    prompt: { hu: "Mely állítások igazak neural-hálózat (network) trainingre az előadás szerint?", en: "Which statements are true about neural-network training according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "A veszteség (loss) gradiensét (gradient) a modellparaméterek szerint használjuk frissítésre (update).", en: "Gradients of the loss with respect to model parameters are used for updates." } },
      { id: "b", text: { hu: "SGD gradienscsökkentés-alapú tanítási algoritmus (gradient-descent-based training algorithm).", en: "SGD is a gradient-descent-based training algorithm." } },
      { id: "c", text: { hu: "hiperparaméterek (hyperparameters) értékeket is szükségszerűen SGD tanítja.", en: "Hyperparameters are necessarily trained by SGD as well." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "modellparaméterek gradiens (gradient) gradienscsökkentéssel (gradient descent) taníthatók; a kurzus korábban különválasztotta a hiperparaméter (hyperparameter) kiválasztást (selection).", en: "Model parameters can be trained with gradient descent; the course previously separated this from hyperparameter selection." }
  }
];
