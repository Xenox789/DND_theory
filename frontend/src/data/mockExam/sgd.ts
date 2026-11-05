import { createMockQuestion } from "./types";

export const sgdMocks = [
  createMockQuestion({
    id: "mock-sgd-1",
    chapter: "sgd",
    prompt: { hu: "Mely állítások igazak a full-batch, mini-batch és SGD frissítésekre?", en: "Which statements about full-batch, mini-batch and SGD updates are true?" },
    trueFacts: [
      ["Full-batch gradienscsökkentés egy frissítéshez az összes tanítópéldát használja.", "Full-batch gradient descent uses all training examples for each update."],
      ["Mini-batch frissítés a tanítóhalmaz egy részén számolja a gradienst.", "A mini-batch update uses a subset of training examples to compute gradients."],
      ["A kisebb mini-batch alapján számolt gradiens a teljes gradiens becslése.", "A gradient computed from a mini-batch estimates the full gradient."],
      ["1000 mintánál, 100 elemű batchekkel egy epoch jellemzően 10 frissítés.", "With 1000 samples and batch size 100, an epoch typically has 10 updates."],
      ["Az epoch gyakran azt jelenti, hogy végigmentünk a teljes train adathalmazon.", "An epoch commonly means one pass through the training dataset."],
      ["Az SGD elnevezést a kurzus mini-batch alapon működő változatokra is használja.", "The course uses SGD terminology for mini-batch variants too."]
    ],
    falseFacts: [
      ["Full-batch módszerben egy frissítéshez mindig csak egy példát választunk.", "Full-batch training always uses exactly one example per update."],
      ["Mini-batch gradient descent mindig az egész adathalmaz minden mintáját használja egyetlen frissítéshez.", "Mini-batch gradient descent always uses every training example for every update."],
      ["A mini-batch gradiense minden lehetséges mintavételnél szükségképpen pontosan ugyanaz.", "The mini-batch gradient must be identical for every possible sampled batch."],
      ["1000 mintánál, 100 elemű batchekkel kötelezően 1000 frissítés van minden epochban.", "With 1000 samples and batch size 100, every epoch must have 1000 updates."],
      ["Egy epoch definíciója a hálózat összes súlyának nullázása.", "An epoch is defined by resetting every model weight to zero."],
      ["Az SGD nem képes mini-batch alapján paramétereket frissíteni.", "SGD can never update parameters based on mini-batches."]
    ],
    explanation: { hu: "Full-batch: teljes adathalmaz egy frissítéshez; mini-batch: véletlen részhalmaz. A becslés zajossága és számítási költsége változik.", en: "Full-batch uses all data for an update; mini-batch uses a subset, trading computation for sampling noise." }
  }),
  createMockQuestion({
    id: "mock-sgd-2",
    chapter: "sgd",
    prompt: { hu: "Mely állítások igazak a mini-batch méret, gradiensvariancia és GPU-memória kapcsolatáról?", en: "Which statements about batch size, gradient variance and GPU memory are correct?" },
    trueFacts: [
      ["Kisebb batch mellett a gradiensbecslés varianciája gyakran nagyobb.", "Smaller batches often yield more variable gradient estimates."],
      ["Nagyobb mini-batch általában több köztes aktiváció tárolását igényli.", "Larger mini-batches usually require storing more intermediate activations."],
      ["A batch méretét korlátozhatja a rendelkezésre álló GPU-memória.", "Available GPU memory can constrain batch size."],
      ["A teljes adathalmaz gradiense megszünteti a mini-batch mintavételi zaját.", "The full-data gradient removes mini-batch sampling noise."],
      ["A mini-batch mérete a tanítás egyik hiperparamétere lehet.", "Mini-batch size can be a training hyperparameter."],
      ["Nagy batch használata frissítésenként több mintát dolgozhat fel.", "A larger batch can process more examples per parameter update."]
    ],
    falseFacts: [
      ["Kisebb batch minden helyzetben pontosabb gradiensbecslést ad, mint a teljes batch.", "A smaller batch always estimates the gradient more precisely than the full batch."],
      ["Nagyobb batch minden esetben kevesebb aktivációs memóriát igényel.", "A larger batch always needs less activation memory."],
      ["A batch mérete semmilyen kapcsolatban nincs a GPU-memóriával.", "Batch size has no relation to GPU memory."],
      ["A full-batch gradiens kizárólag véletlen egyetlen példából számolható.", "The full-batch gradient is computed from only one random example."],
      ["A batchméret kizárólag a valódi y címke értéke, nem állítható be.", "Batch size is merely the value of the true y label and cannot be selected."],
      ["A nagyobb mini-batch garantálja a legjobb általánosítást és a legkisebb tesztveszteséget.", "Increasing batch size guarantees the best generalization and minimum test loss."]
    ],
    explanation: { hu: "A batchméret a frissítések költsége, memóriaigénye és gradiensbecslés zajossága között teremt kompromisszumot.", en: "Batch size trades off computational cost, memory needs and variance of gradient estimates." }
  }),
  createMockQuestion({
    id: "mock-sgd-3",
    chapter: "sgd",
    prompt: { hu: "Mely állítások igazak az optimalizálókra és a tanulási rátára?", en: "Which claims about optimizers and the learning rate are correct?" },
    trueFacts: [
      ["A tanulási ráta jelöli a paraméterfrissítés lépésméretét.", "Learning rate controls the update step size."],
      ["A túl nagy tanulási ráta oszcillációt vagy divergenciát okozhat.", "Too large a learning rate can lead to oscillation or divergence."],
      ["A túl kicsi tanulási ráta lassú tanuláshoz vezethet.", "Too small a learning rate can cause slow learning."],
      ["A momentumos SGD felhasználhatja a korábbi lépések irányát.", "SGD with momentum can use information from previous update directions."],
      ["Az Adam gradiensalapú optimalizálási módszer.", "Adam is a gradient-based optimizer."],
      ["Az optimalizáló az elkészült gradiensek alapján frissítheti a súlyokat.", "The optimizer can update weights using computed gradients."]
    ],
    falseFacts: [
      ["A tanulási ráta kizárólag a tanítóadatok számát jelenti.", "Learning rate is simply another name for the number of training samples."],
      ["Tetszőlegesen nagy α mindig garantáltan javítja a veszteséget.", "Arbitrarily large learning rate always guarantees reducing loss."],
      ["A nulla tanulási ráta az alap SGD-ben biztosítja a leggyorsabb súlyváltozást.", "Zero learning rate gives the fastest parameter changes in plain SGD."],
      ["A momentumos SGD nem használhat semmilyen múltbeli információt.", "Momentum SGD cannot incorporate any information from previous steps."],
      ["Az Adam kizárólag a neurális hálózat kimeneti aktivációs függvénye.", "Adam is exclusively a neural-network output activation function."],
      ["A backpropagation és az optimizer.step minden esetben pontosan ugyanaz a művelet.", "Backpropagation and optimizer.step are exactly the same operation."]
    ],
    explanation: { hu: "A backprop kiszámítja a gradienst, az optimalizáló pedig a tanulási rátát és saját szabályait használja a paraméterfrissítéshez.", en: "Backprop computes gradients; optimizers apply update rules controlled by learning rate and possibly other state." }
  })
];
