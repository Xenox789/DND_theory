import type { Lesson, Question } from "../types";

export const sgdLesson: Lesson = {
  id: "sgd-minibatches",
  title: {
    hu: "Batch Gradient Descent, SGD és Mini-batches",
    en: "Batch Gradient Descent, SGD, and Mini-batches"
  },
  subtitle: {
    hu: "Full-dataset gradient, approximate mini-batch gradient, variance–compute trade-off és learning rate",
    en: "Full-dataset gradients, approximate mini-batch gradients, the variance–compute trade-off, and learning rate"
  },
  source: "Lectures 5–6",
  sections: [
    {
      id: "batch-gradient-descent",
      title: {
        hu: "Batch Gradient Descent",
        en: "Batch Gradient Descent"
      },
      body: {
        hu: "Batch gradient descent esetén a loss-t és a gradientet a teljes training set alapján számoljuk egy parameter update előtt. A lecture szerint ez pontos full-dataset gradientet ad, de nagy datasetnél egyetlen step is nagyon drága lehet.",
        en: "In batch gradient descent, the loss and gradient are computed over the entire training set before one parameter update. According to the lecture, this gives the full-dataset gradient, but for a large dataset even one step can be very expensive."
      },
      intuition: {
        hu: "Mintha minden egyes update előtt az összes training example véleményét kikérnénk.",
        en: "It is like consulting every training example before every single update."
      },
      examTrap: {
        hu: "A 'batch gradient descent' itt a teljes training setet használja egy update gradientjéhez, nem egy kisebb mini-batch-et.",
        en: "Here, 'batch gradient descent' uses the entire training set for one update gradient, not a smaller mini-batch."
      },
      keyTerms: [
        { term: "batch gradient descent" },
        { term: "full-dataset gradient" }
      ]
    },
    {
      id: "why-sgd",
      title: {
        hu: "Miért használunk SGD-t?",
        en: "Why use SGD?"
      },
      body: {
        hu: "A lecture SGD esetén véletlenszerűen kiválaszt egy training-data sub-sample-t, vagyis mini-batch-et, és csak ezen számolja a következő update gradientjét. Ez approximate gradient, de általában sokkal gyorsabban számolható.",
        en: "For SGD, the lecture randomly selects a sub-sample of the training data—a mini-batch—and computes the gradient for the next update using only that subset. This is an approximate gradient, but it is usually much faster to compute."
      },
      intuition: {
        hu: "Nem kérdezzük meg az egész datasetet minden lépésnél; egy kisebb, véletlen mintából becsüljük meg, merre kellene menni.",
        en: "Instead of consulting the whole dataset every step, we estimate the direction using a smaller random sample."
      },
      examTrap: {
        hu: "A course SGD framingje mini-batch-et használ; nem szükséges, hogy minden update pontosan egyetlen training example-ból számolódjon.",
        en: "The course frames SGD using mini-batches; an update does not have to be computed from exactly one training example."
      },
      keyTerms: [
        { term: "Stochastic Gradient Descent (SGD)" },
        { term: "mini-batch" },
        { term: "approximate gradient" }
      ]
    },
    {
      id: "small-batch",
      title: {
        hu: "Kisebb mini-batch: nagyobb variance",
        en: "Smaller mini-batch: higher variance"
      },
      body: {
        hu: "A lecture explicit állítása: minél kisebb a selected mini-batch, annál nagyobb az esélye, hogy a parameter update 'rossz irányba' indul, mert a gradient estimate variance-e nő.",
        en: "The lecture explicitly states that the smaller the selected mini-batch, the more likely the parameter update is to move in the 'wrong direction', because the variance of the gradient estimate increases."
      },
      intuition: {
        hu: "Egy nagyon kicsi random sample könnyebben lehet nem reprezentatív. Emiatt az update-ek zajosabbak és cikk-cakkosabbak lehetnek.",
        en: "A very small random sample is more likely to be unrepresentative. Therefore updates can be noisier and more zig-zagged."
      },
      examTrap: {
        hu: "Kisebb batch nem pontosabb gradientet jelent. A lecture szerint éppen a variance nő.",
        en: "A smaller batch does not mean a more accurate gradient. According to the lecture, variance increases."
      },
      keyTerms: [
        { term: "gradient variance" },
        { term: "noisy update" }
      ]
    },
    {
      id: "large-batch",
      title: {
        hu: "Nagyobb mini-batch: nagyobb compute és memory",
        en: "Larger mini-batch: higher compute and memory cost"
      },
      body: {
        hu: "Nagyobb mini-batch több example-t használ az update-hez, ezért a gradient estimate kevésbé zajos lehet. Ugyanakkor a lecture szerint nő a computing és memory requirement.",
        en: "A larger mini-batch uses more examples for an update, so the gradient estimate can be less noisy. At the same time, the lecture states that computing and memory requirements increase."
      },
      intuition: {
        hu: "Több example egyszerre stabilabb becslést adhat, de több adatot és intermediate activationt kell egyszerre memóriában tartani és feldolgozni.",
        en: "More examples at once can give a more stable estimate, but more data and intermediate activations must be stored and processed simultaneously."
      },
      examTrap: {
        hu: "Nagyobb batch nem 'ingyen' csökkenti a variance-t: compute és memory ára van.",
        en: "A larger batch does not reduce variance for free: it comes with compute and memory cost."
      },
      keyTerms: [
        { term: "batch size" },
        { term: "memory requirement" },
        { term: "computational cost" }
      ]
    },
    {
      id: "gpu-memory",
      title: {
        hu: "Batch size a gyakorlatban",
        en: "Batch size in practice"
      },
      body: {
        hu: "A lecture nagy neural networköknél gyakorlati szabályként azt említi, hogy efficiency considerations gyakran a GPU memory alapján határozzák meg a mini-batch size-t: annyi example egyszerre, amennyi még befér.",
        en: "For large neural networks, the lecture notes a practical rule: efficiency considerations often determine mini-batch size based on GPU memory—use as many examples at once as fit."
      },
      examTrap: {
        hu: "Ez gyakorlati heuristic a lecture-ben, nem matematikai optimum garantált batch size.",
        en: "This is a practical heuristic from the lecture, not a mathematically guaranteed optimal batch size."
      },
      keyTerms: [
        { term: "GPU memory" },
        { term: "efficiency" }
      ]
    },
    {
      id: "small-batch-lr",
      title: {
        hu: "Kis mini-batch és learning rate",
        en: "Small mini-batches and learning rate"
      },
      body: {
        hu: "A lecture külön kiemeli: ha csak kis mini-batch size használható, a convergence eléréséhez csökkenteni kellhet a learning rate-et.",
        en: "The lecture explicitly notes that if only a small mini-batch size can be used, the learning rate may need to be reduced to achieve convergence."
      },
      intuition: {
        hu: "Ha a gradient estimate eleve zajosabb, túl nagy step size mellett ez a zaj túl nagy parameter ugrásokat okozhat.",
        en: "If the gradient estimate is already noisier, a large step size can turn that noise into overly large parameter jumps."
      },
      examTrap: {
        hu: "A course állítása nem az, hogy kis batch esetén növeljük a learning rate-et, hanem hogy szükség lehet annak csökkentésére.",
        en: "The course does not say to increase the learning rate for a small batch; it says the learning rate may need to be reduced."
      },
      keyTerms: [
        { term: "learning rate" },
        { term: "convergence" }
      ]
    },
    {
      id: "sgd-variants",
      title: {
        hu: "SGD variants",
        en: "SGD variants"
      },
      body: {
        hu: "A lecture példaként felsorolja: SGD with Momentum, AdaGrad, Adam, Adamax és RMSprop. Ezeket a Theory Test szempontjából elsősorban névként és SGD/optimization contextben érdemes felismerni.",
        en: "The lecture lists SGD with Momentum, AdaGrad, Adam, Adamax, and RMSprop as examples. For the Theory Test, the main point here is recognizing them as optimization / SGD-related variants."
      },
      examTrap: {
        hu: "A slide ezen a ponton nem ad részletes update formulákat ezekhez, ezért az app sem talál ki hozzájuk vizsgaképleteket.",
        en: "The slide does not provide detailed update formulas for these methods here, so the app does not invent exam formulas for them."
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
    prompt: { hu: "Mely állítások igazak batch gradient descentre a lecture szerint?", en: "Which statements are true about batch gradient descent according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "A teljes training seten átlagoljuk a loss-t.", en: "The loss is averaged over the entire training set." } },
      { id: "b", text: { hu: "Egy update gradientjéhez az egész datasetet használjuk.", en: "The entire dataset is used for one update gradient." } },
      { id: "c", text: { hu: "Nagy datasetnél egyetlen step computational costja nagy lehet.", en: "For a large dataset, the computational cost of a single step can be large." } },
      { id: "d", text: { hu: "Mindig csak egyetlen training example-t használ.", en: "It always uses exactly one training example." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A full batch az egész training setből számít egy update gradientet.", en: "A full batch computes one update gradient from the whole training set." }
  },
  {
    id: "sgd-q2",
    topics: ["sgd","mini-batch"],
    prompt: { hu: "Hogyan írja le a lecture az SGD-t?", en: "How does the lecture describe SGD?" },
    choices: [
      { id: "a", text: { hu: "Véletlenszerű training-data sub-sample-t választ.", en: "It selects a random sub-sample of the training data." } },
      { id: "b", text: { hu: "Egy mini-batch alapján számít approximate gradientet.", en: "It computes an approximate gradient from a mini-batch." } },
      { id: "c", text: { hu: "Általában gyorsabb lehet, mint minden stepnél a teljes dataset feldolgozása.", en: "It can usually be faster than processing the whole dataset for every step." } },
      { id: "d", text: { hu: "A gradient minden stepben szükségszerűen exact full-dataset gradient.", en: "The gradient is necessarily the exact full-dataset gradient at every step." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "SGD a lecture-ben random mini-batchből approximate gradientet számol.", en: "In the lecture, SGD computes an approximate gradient from a random mini-batch." }
  },
  {
    id: "sgd-q3",
    topics: ["sgd","example-question"],
    prompt: { hu: "Igaz-e a course framingje alapján, hogy SGD-ben minden parameter update-et kötelező pontosan egyetlen training example gradientjéből számolni?", en: "According to the course framing, must every SGD parameter update be computed from exactly one training example?" },
    choices: [
      { id: "a", text: { hu: "Nem; a lecture random mini-batch-et / sub-sample-t használ.", en: "No; the lecture uses a random mini-batch / sub-sample." } },
      { id: "b", text: { hu: "Igen; több example használata már nem lehet SGD.", en: "Yes; using more than one example can no longer be SGD." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "A lecture és a Lecture 6 recap is mini-batch gradientet nevez SGD-nek.", en: "Both the lecture and the Lecture 6 recap describe SGD using mini-batch gradients." }
  },
  {
    id: "sgd-q4",
    topics: ["batch-size","variance"],
    prompt: { hu: "Mi várható, ha csökkentjük a mini-batch size-t?", en: "What is expected if we decrease the mini-batch size?" },
    choices: [
      { id: "a", text: { hu: "A gradient estimate variance-e nő.", en: "Gradient-estimate variance increases." } },
      { id: "b", text: { hu: "Nő annak esélye, hogy egy update rossz irányba visz.", en: "The chance that an update moves in the wrong direction increases." } },
      { id: "c", text: { hu: "Az update-ek zajosabbak lehetnek.", en: "Updates can become noisier." } },
      { id: "d", text: { hu: "A gradient szükségszerűen pontosabb lesz.", en: "The gradient necessarily becomes more accurate." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A lecture kisebb mini-batchhez nagyobb variance-et és nagyobb wrong-direction kockázatot társít.", en: "The lecture associates smaller mini-batches with higher variance and a greater risk of wrong-direction updates." }
  },
  {
    id: "sgd-q5",
    topics: ["batch-size","compute"],
    prompt: { hu: "Mi várható, ha növeljük a mini-batch size-t?", en: "What is expected if we increase the mini-batch size?" },
    choices: [
      { id: "a", text: { hu: "Nő a computing requirement.", en: "Computing requirements increase." } },
      { id: "b", text: { hu: "Nő a memory requirement.", en: "Memory requirements increase." } },
      { id: "c", text: { hu: "A gradient estimate általában kevésbé zajos lehet.", en: "The gradient estimate can generally become less noisy." } },
      { id: "d", text: { hu: "A memory requirement biztosan csökken.", en: "Memory requirements definitely decrease." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Nagyobb batch több example-t dolgoz fel egyszerre: stabilabb becslés lehet, nagyobb compute/memory áron.", en: "A larger batch processes more examples at once: the estimate can be more stable, at higher compute/memory cost." }
  },
  {
    id: "sgd-q6",
    topics: ["batch-size","learning-rate"],
    prompt: { hu: "Mit mond a lecture kis mini-batch és learning rate kapcsolatáról?", en: "What does the lecture say about small mini-batches and learning rate?" },
    choices: [
      { id: "a", text: { hu: "Kis mini-batch esetén szükség lehet kisebb learning rate-re a convergence-hez.", en: "With a small mini-batch, a smaller learning rate may be needed for convergence." } },
      { id: "b", text: { hu: "A nagyobb gradient variance miatt túl nagy learning rate problémás lehet.", en: "Because of higher gradient variance, an excessively large learning rate can be problematic." } },
      { id: "c", text: { hu: "Kis batch esetén mindig növelni kell a learning rate-et.", en: "With a small batch, the learning rate must always be increased." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A slide explicit azt mondja: kis mini-batch esetén csökkenteni kellhet a learning rate-et a convergence-hez.", en: "The slide explicitly states that with a small mini-batch the learning rate may need to be reduced to achieve convergence." }
  },
  {
    id: "sgd-q7",
    topics: ["gpu-memory","batch-size"],
    prompt: { hu: "Mely állítás szerepel a lecture-ben nagy neural networkök batch-size választásáról?", en: "Which statement appears in the lecture about batch-size selection for large neural networks?" },
    choices: [
      { id: "a", text: { hu: "Efficiency szempontból gyakran annyi example-t választunk, amennyi befér GPU memoryba.", en: "For efficiency, one often chooses as many examples as fit in GPU memory." } },
      { id: "b", text: { hu: "Ez egy gyakorlati heuristic.", en: "This is a practical heuristic." } },
      { id: "c", text: { hu: "Ez minden problémára bizonyítottan optimális batch size.", en: "This is a proven optimal batch size for every problem." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A lecture ezt efficiency considerationként, nem univerzális matematikai optimumként adja meg.", en: "The lecture gives this as an efficiency consideration, not a universal mathematical optimum." }
  },
  {
    id: "sgd-q8",
    topics: ["sgd-variants"],
    prompt: { hu: "Melyeket sorolja fel a lecture SGD/optimizer variantként?", en: "Which are listed by the lecture as SGD/optimizer variants?" },
    choices: [
      { id: "a", text: { hu: "SGD with Momentum", en: "SGD with Momentum" } },
      { id: "b", text: { hu: "AdaGrad", en: "AdaGrad" } },
      { id: "c", text: { hu: "Adam", en: "Adam" } },
      { id: "d", text: { hu: "Adamax", en: "Adamax" } },
      { id: "e", text: { hu: "RMSprop", en: "RMSprop" } }
    ],
    correctIds: ["a","b","c","d","e"],
    explanation: { hu: "A Lecture 5 mind az öt nevet felsorolja.", en: "Lecture 5 lists all five names." }
  },
  {
    id: "sgd-q9",
    topics: ["mlp-training"],
    prompt: { hu: "Mely állítások igazak neural-network trainingre a lecture szerint?", en: "Which statements are true about neural-network training according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "A loss gradientjét a model parameters szerint használjuk update-re.", en: "Gradients of the loss with respect to model parameters are used for updates." } },
      { id: "b", text: { hu: "SGD gradient-descent-based training algorithm.", en: "SGD is a gradient-descent-based training algorithm." } },
      { id: "c", text: { hu: "Hyperparameters értékeket is szükségszerűen SGD tanítja.", en: "Hyperparameters are necessarily trained by SGD as well." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Model parameters gradient descenttel taníthatók; a course korábban különválasztotta a hyperparameter selectiont.", en: "Model parameters can be trained with gradient descent; the course previously separated this from hyperparameter selection." }
  }
];
