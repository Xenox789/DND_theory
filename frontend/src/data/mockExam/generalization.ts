import { createMockQuestion } from "./types";

export const generalizationMocks = [
  createMockQuestion({
    id: "mock-gen-1",
    chapter: "generalization",
    prompt: { hu: "Mely állítások igazak a train, validation és test halmaz szerepére?", en: "Which statements about training, validation and test datasets are true?" },
    trueFacts: [
      ["A train adatokkal szokás a modell súlyait optimalizálni.", "Training data is used to optimize model weights."],
      ["A validation halmaz segíthet hiperparamétereket kiválasztani.", "A validation set can be used to select hyperparameters."],
      ["A teszthalmazt célszerű félretenni a végső értékeléshez.", "The test set should be held out for final evaluation."],
      ["A tanulási ráta hiperparaméternek számít.", "Learning rate is a hyperparameter."],
      ["A neurális hálózat tanulható súlyai modellparaméterek.", "Neural-network weights are learnable model parameters."],
      ["A testhalmaz mérete befolyásolja az értékelés bizonytalanságát.", "Test set size affects evaluation uncertainty."]
    ],
    falseFacts: [
      ["A teszthalmaz alapján minden epoch után újra kell választani a hiperparamétereket.", "The test set should be used to retune hyperparameters after every epoch."],
      ["A validation adatokat mindig kötelezően hozzáadjuk a gradiensszámításhoz.", "Validation samples must always contribute to the training gradient."],
      ["A tanítóhalmaz teljesítménye egyedül elegendő az új adatokon várható teljesítmény biztos megítélésére.", "Training performance alone reliably guarantees performance on new data."],
      ["A tanulási rátát minden esetben a backpropagation tanítja meg paraméterként.", "Learning rate is always learned as a model parameter by backpropagation."],
      ["A θ súlyokat kizárólag a teszthalmazon szabad tanítani.", "θ weights must be trained exclusively on the test set."],
      ["Kevesebb tesztpélda önmagában szükségszerűen súlyosabb túlillesztést idéz elő a tanításkor.", "Using fewer test samples necessarily makes the training process overfit more."]
    ],
    explanation: { hu: "Train: paramétertanítás. Validation: választás és early stopping. Test: a végső általánosítás értékelése, nem folyamatos hangolás.", en: "Training fits parameters; validation selects models and stopping points; the test set estimates final generalization rather than guiding repeated tuning." }
  }),
  createMockQuestion({
    id: "mock-gen-2",
    chapter: "generalization",
    prompt: { hu: "Mely állítások helyesek az alulillesztésről és a túlillesztésről?", en: "Which claims about underfitting and overfitting are correct?" },
    trueFacts: [
      ["Alacsony train loss és magas validation loss túlillesztésre utalhat.", "Low training loss with high validation loss can indicate overfitting."],
      ["Magas train loss és magas validation loss alulillesztésre utalhat.", "High training and validation loss can indicate underfitting."],
      ["Több releváns tanítópélda gyakran javíthatja az általánosítást.", "More relevant training examples can often improve generalization."],
      ["A modellparaméterek számának növelése növelheti a túlillesztés kockázatát.", "Increasing parameter count can increase overfitting risk."],
      ["Túl egyszerű modellnél a tanítóadatokra is nagy hiba maradhat.", "An overly simple model may fit the training set poorly."],
      ["A train és validation görbék összehasonlítása segíthet túlillesztést felismerni.", "Comparing train and validation curves can help identify overfitting."]
    ],
    falseFacts: [
      ["Az overfitting azt jelenti, hogy a modell a train adatokon is mindig nagyon rossz.", "Overfitting means the model always performs very poorly on its training data."],
      ["A train loss csökkenése garantálja a validation loss csökkenését is.", "Decreasing training loss guarantees decreasing validation loss."],
      ["Kevesebb tanítópélda mindig csökkenti a túlillesztési hajlamot.", "Fewer training examples always reduce overfitting."],
      ["Több modellparaméter minden esetben kizárja a túlillesztést.", "More model parameters always prevent overfitting."],
      ["Az underfitting biztos jele a nulla train veszteség.", "Zero training loss is a definitive sign of underfitting."],
      ["Túlillesztést kizárólag a test adatok tanításba keverése okozhat.", "Overfitting can only happen if test data is included in training."]
    ],
    explanation: { hu: "Overfit: a modell a tanítóadatokat túlzottan illeszti, de új adatokon rosszabb. Underfit: az alapmintázatot sem tanulja meg megfelelően.", en: "Overfitting means fitting training peculiarities too closely; underfitting means failing to capture the underlying relation." }
  }),
  createMockQuestion({
    id: "mock-gen-3",
    chapter: "generalization",
    prompt: { hu: "Mely állítások igazak az L2 regularizációra és az early stoppingra?", en: "Which statements about L2 regularization and early stopping are correct?" },
    trueFacts: [
      ["Az L2 büntetés a súlyok négyzetösszegével kapcsolatos.", "L2 regularization penalizes a sum of squared weights."],
      ["Nagyobb λ általában nagyobb súlybüntetést jelent.", "A larger λ generally applies a stronger weight penalty."],
      ["A túl erős regularizáció alulillesztést is okozhat.", "Excessively strong regularization can cause underfitting."],
      ["Az early stopping figyelheti a validation loss alakulását.", "Early stopping can monitor validation loss."],
      ["A legjobb validation állapot súlyainak visszaállítása gyakran hasznos.", "Restoring weights from the best validation epoch is often useful."],
      ["A regularizáció és az early stopping célja az általánosítás javítása lehet.", "Regularization and early stopping can help improve generalization."]
    ],
    falseFacts: [
      ["Az L2 büntetés alapértelmezésben a tanítóadatok számának nullázását jelenti.", "L2 penalty means reducing the number of training examples to zero."],
      ["Nagyobb λ biztosan korlátlanul javítja a generalizációt.", "Increasing λ always improves generalization without limit."],
      ["Az L2 kizárólag a validation veszteséget minimalizálja a train veszteségtől függetlenül.", "L2 optimizes only validation loss independently of training loss."],
      ["Early stoppingkor a test loss alapján minden epochban kell dönteni.", "Early stopping must use test loss after every epoch."],
      ["A training loss első csökkenésekor az early stoppingnak azonnal le kell állnia.", "Early stopping must stop immediately when training loss first decreases."],
      ["A regularizáció a tanulható θ súlyokat kötelezően pontosan nullává teszi.", "Regularization necessarily sets all learnable θ weights to exactly zero."]
    ],
    explanation: { hu: "L2 a nagy súlyokat bünteti; early stopping a validation alapján korlátozhatja a tanítás hosszát. Túlzásba víve egyik sem jó.", en: "L2 penalizes large weights; early stopping limits training duration using validation performance. Excessive constraints may underfit." }
  })
];
