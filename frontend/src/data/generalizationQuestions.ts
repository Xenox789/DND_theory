import type { Question } from "../types";

export const generalizationQuestions: Question[] = [
  {
    id: "gen-q1",
    topics: ["data-split"],
    prompt: { hu: "Mely állítások igazak a tanítóhalmaz (training set) és teszthalmaz (test set) szerepére?", en: "Which statements are true about the roles of the training set and test set?" },
    choices: [
      { id: "a", text: { hu: "A modellparaméterek (model parameters) értékeit a training seten tanuljuk.", en: "Model parameters are learned on the training set." } },
      { id: "b", text: { hu: "A teszthalmaz (test set) célja unseen-data teljesítmény (performance) becslése.", en: "The test set is used to estimate unseen-data performance." } },
      { id: "c", text: { hu: "A training és test setnek disjointnak kell lennie.", en: "The training and test sets must be disjoint." } },
      { id: "d", text: { hu: "A test setet rendszeresen használjuk gradiens (gradient) frissítés (update)-ekhez.", en: "The test set is routinely used for gradient updates." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "A teszthalmaz (test set) független végső (final) evaluationra való, nem learningre.", en: "The test set is reserved for independent final evaluation, not learning." }
  },
  {
    id: "gen-q2",
    topics: ["underfitting"],
    prompt: { hu: "Melyek lehetnek alulillesztés (underfitting) jelei a előadás (lecture) szerint?", en: "Which can be signs of underfitting according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "tanítási veszteség (training loss) nagy.", en: "Training loss is high." } },
      { id: "b", text: { hu: "tesztveszteség (test loss) nagy és hasonló a training losshoz.", en: "Test loss is high and similar to training loss." } },
      { id: "c", text: { hu: "A modellösszetettség (model complexity) túl alacsony.", en: "Model complexity is too low." } },
      { id: "d", text: { hu: "kis torzítás (low bias), nagy variancia (high variance).", en: "Low bias, high variance." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "A előadás (lecture) underfittinget nagy torzítás (high bias), kis variancia (low variance) helyzetként mutatja, magas training és test lossszal.", en: "The lecture presents underfitting as high bias, low variance, with high training and test losses." }
  },
  {
    id: "gen-q3",
    topics: ["overfitting"],
    prompt: { hu: "Melyek lehetnek worsening túlillesztés (overfitting) jelei?", en: "Which can be signs of worsening overfitting?" },
    choices: [
      { id: "a", text: { hu: "tanítási veszteség (training loss) tovább csökken.", en: "Training loss keeps decreasing." } },
      { id: "b", text: { hu: "Validation/tesztveszteség (test loss) növekedni kezd.", en: "Validation/test loss starts increasing." } },
      { id: "c", text: { hu: "A gap training és validation/tesztveszteség (test loss) között nő.", en: "The gap between training and validation/test loss grows." } },
      { id: "d", text: { hu: "A model biztosan underfitel.", en: "The model is definitely underfitting." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "Ez a előadás (lecture) tipikus túlillesztés (overfitting) görbéje: tanítási veszteség (training loss) le, unseen-data veszteség (loss) fel.", en: "This is the lecture's typical overfitting pattern: training loss down, unseen-data loss up." }
  },
  {
    id: "gen-q4",
    topics: ["overfitting", "training-data"],
    prompt: { hu: "Ha ugyanazt a neurális hálózat (neural network) modelt kevesebb tanítási példa (training example)-lal tanítjuk, mit várunk?", en: "If we train the same neural-network model with fewer training examples, what do we expect?" },
    choices: [
      { id: "a", text: { hu: "Az túlillesztés (overfitting) kockázata / súlyossága növekedhet.", en: "Overfitting risk / severity can increase." } },
      { id: "b", text: { hu: "A modelnek kevesebb data alapján kell generalizálnia.", en: "The model must generalize from less data." } },
      { id: "c", text: { hu: "Ez garantáltan megszünteti az overfittinget.", en: "This is guaranteed to eliminate overfitting." } }
    ],
    correctIds: ["a", "b"],
    explanation: { hu: "A előadás (lecture) a több tanítóadatok (training data)-t az túlillesztés (overfitting) egyik kezelési módjaként adja meg; ennek ellenkezője növelheti a problémát.", en: "The lecture lists more training data as one way to reduce overfitting; the opposite can make the problem worse." }
  },
  {
    id: "gen-q5",
    topics: ["overfitting", "test-data"],
    prompt: { hu: "Ha ugyanazt a modelt ugyanazon training seten tanítjuk, de csökkentjük a test példák (examples) számát, mely állítások igazak?", en: "If we train the same model on the same training set but reduce the number of test examples, which statements are true?" },
    choices: [
      { id: "a", text: { hu: "Ez önmagában nem változtatja meg a training folyamat túlillesztés (overfitting) hajlamát.", en: "By itself, this does not change the training process's tendency to overfit." } },
      { id: "b", text: { hu: "A végső (final) teljesítmény (performance) estimate kevésbé megbízható lehet.", en: "The final performance estimate can become less reliable." } },
      { id: "c", text: { hu: "A modellparaméterek (model parameters) gradientjei automatikusan kisebbek lesznek.", en: "Model-parameter gradients automatically become smaller." } }
    ],
    correctIds: ["a", "b"],
    explanation: { hu: "A teszthalmaz (test set) nincs benne a helyes training folyamatban; mérete az értékelés (evaluation) megbízhatóságát befolyásolja.", en: "The test set is not part of the correct training procedure; its size affects evaluation reliability." }
  },
  {
    id: "gen-q6",
    topics: ["overfitting", "model-capacity"],
    prompt: { hu: "Mely változtatások csökkenthetik az overfittinget a előadás (lecture) szerint?", en: "Which changes can reduce overfitting according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "Egyszerűbb model / kevesebb paraméter (parameter).", en: "A simpler model / fewer parameters." } },
      { id: "b", text: { hu: "Több tanítóadatok (training data).", en: "More training data." } },
      { id: "c", text: { hu: "L2 regularizáció (regularization).", en: "L2 regularization." } },
      { id: "d", text: { hu: "Early stopping.", en: "Early stopping." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: { hu: "A előadás (lecture) mind a négyet explicit túlillesztés (overfitting)-kezelési módszerként sorolja.", en: "The lecture explicitly lists all four as ways to handle overfitting." }
  },
  {
    id: "gen-q7",
    topics: ["underfitting", "model-capacity"],
    prompt: { hu: "Egy súlyosan underfitted modelnél mely változtatás illeszkedik a előadás (lecture) ajánlásához?", en: "For a severely underfitted model, which change matches the lecture recommendation?" },
    choices: [
      { id: "a", text: { hu: "Komplexebb model használata.", en: "Use a more complex model." } },
      { id: "b", text: { hu: "Még kevesebb paraméter (parameter).", en: "Use even fewer parameters." } },
      { id: "c", text: { hu: "A feladat (task) estimation errorának csökkentéséhez nagyobb modellkapacitás (model capacity) lehet szükséges.", en: "Greater model capacity may be needed to reduce estimation error." } }
    ],
    correctIds: ["a", "c"],
    explanation: { hu: "Underfittingnél a modellösszetettség (model complexity) túl alacsony, ezért a előadás (lecture) komplexebb modelt javasol.", en: "With underfitting, model complexity is too low, so the lecture recommends a more complex model." }
  },
  {
    id: "gen-q8",
    topics: ["l2-regularization"],
    prompt: { hu: "Mely állítások igazak a előadás (lecture) L2 regularizáció (regularization) példájára?", en: "Which statements are true about the lecture's L2-regularization example?" },
    choices: [
      { id: "a", text: { hu: "A veszteség (loss) large paraméter (parameter) values-t büntető λΣθᵢ² tagot kap.", en: "The loss gains a λΣθᵢ² term that penalizes large parameter values." } },
      { id: "b", text: { hu: "A θ₀ eltolás (bias) nincs penalizálva.", en: "The θ₀ bias is not penalized." } },
      { id: "c", text: { hu: "λ=0 az unregularized model.", en: "λ=0 gives the unregularized model." } },
      { id: "d", text: { hu: "L2 célja a modellparaméterek (model parameters) számának növelése.", en: "The purpose of L2 is to increase the number of model parameters." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "L2 constraintet ad a súlyok (weights) nagyságára; nem új paraméterek (parameters) hozzáadására szolgál.", en: "L2 constrains weight magnitude; it does not add more model parameters." }
  },
  {
    id: "gen-q9",
    topics: ["l2-regularization"],
    prompt: { hu: "Mi történhet, ha λ túl nagy L2 regularizationnél?", en: "What can happen if λ is too large in L2 regularization?" },
    choices: [
      { id: "a", text: { hu: "A model túl erősen kis súlyok (weights) felé kényszerülhet.", en: "The model can be pushed too strongly toward small weights." } },
      { id: "b", text: { hu: "alulillesztés (underfitting) alakulhat ki.", en: "Underfitting can occur." } },
      { id: "c", text: { hu: "A előadás (lecture) szerint könnyebb lehet közel zero paraméterek (parameters) értékekkel csökkenteni a losst, mint megoldani a taskot.", en: "According to the lecture, minimizing the loss with near-zero parameters can become easier than solving the task." } },
      { id: "d", text: { hu: "Ez mindig javítja a generalizationt, bármilyen nagy λ esetén.", en: "This always improves generalization no matter how large λ becomes." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "Túl erős regularizáció (regularization) elveheti a model szükséges kapacitás (capacity)-jét.", en: "Excessive regularization can remove model capacity needed for the task." }
  },
  {
    id: "gen-q10",
    topics: ["validation", "hyperparameters"],
    prompt: { hu: "Melyek hiperparaméterek (hyperparameters) példák a előadás (lecture) szerint?", en: "Which are examples of hyperparameters according to the lecture?" },
    choices: [
      { id: "a", text: { hu: "tanulási ráta (learning rate) α.", en: "Learning rate α." } },
      { id: "b", text: { hu: "neurális hálózat (neural network) architektúra (architecture) / number of rétegek (layers) or neuronok (neurons).", en: "Neural-network architecture / number of layers or neurons." } },
      { id: "c", text: { hu: "tanítási iterációk száma (number of training iterations) / early-stopping choice.", en: "Number of training iterations / early-stopping choice." } },
      { id: "d", text: { hu: "A learned súly (weight) θ₁.", en: "A learned weight θ₁." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "θ súlyok (weights) modellparaméterek (model parameters). α, architektúra (architecture) és tanítás hossza (training duration) a kurzus (course) példái szerint hiperparaméterek (hyperparameters).", en: "θ weights are model parameters. α, architecture, and training duration are course examples of hyperparameters." }
  },
  {
    id: "gen-q11",
    topics: ["parameters", "hyperparameters"],
    prompt: { hu: "Mely állítások igazak modellparaméterek (model parameters) és hiperparaméterek (hyperparameters) optimalizálására?", en: "Which statements are true about optimizing model parameters and hyperparameters?" },
    choices: [
      { id: "a", text: { hu: "θ modellparaméterek (model parameters) értékeket a training seten gradienscsökkentés (gradient descent) alapú módszerrel taníthatjuk.", en: "Model parameters θ can be trained on the training set with a gradient-descent-based method." } },
      { id: "b", text: { hu: "hiperparaméterek (hyperparameters) választásához validation teljesítmény (performance) használható.", en: "Validation performance can be used to select hyperparameters." } },
      { id: "c", text: { hu: "gradienscsökkentés (gradient descent) általában nem használható minden hiperparaméter (hyperparameter) optimalizálására.", en: "Gradient descent generally cannot be used to optimize every hyperparameter." } },
      { id: "d", text: { hu: "A teszthalmaz (test set) a fő hiperparaméter (hyperparameter) hangolás (tuning) set.", en: "The test set is the main hyperparameter-tuning set." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "A teszthalmaz (test set) végső (final) evaluationra van fenntartva. hiperparaméter (hyperparameter) hangolás (tuning) validation seten történik.", en: "The test set is reserved for final evaluation. Hyperparameter tuning uses validation data." }
  },
  {
    id: "gen-q12",
    topics: ["hyperparameters"],
    prompt: { hu: "Mely módszereket említi a előadás (lecture) hiperparaméter (hyperparameter) optimizationre?", en: "Which methods does the lecture mention for hyperparameter optimization?" },
    choices: [
      { id: "a", text: { hu: "Manual trial and error.", en: "Manual trial and error." } },
      { id: "b", text: { hu: "Grid search.", en: "Grid search." } },
      { id: "c", text: { hu: "véletlen (random) search.", en: "Random search." } },
      { id: "d", text: { hu: "Bayesian optimization.", en: "Bayesian optimization." } },
      { id: "e", text: { hu: "Evolutionary/genetic algorithms.", en: "Evolutionary/genetic algorithms." } }
    ],
    correctIds: ["a", "b", "c", "d", "e"],
    explanation: { hu: "A előadás (lecture) mind az öt módszert felsorolja.", en: "The lecture lists all five methods." }
  },
  {
    id: "gen-q13",
    topics: ["early-stopping"],
    prompt: { hu: "Mi az early stopping fő célja?", en: "What is the main purpose of early stopping?" },
    choices: [
      { id: "a", text: { hu: "túlillesztés (overfitting) mérséklése.", en: "Reducing overfitting." } },
      { id: "b", text: { hu: "Training leállítása, amikor validation teljesítmény (performance) már nem javul.", en: "Stopping training when validation performance no longer improves." } },
      { id: "c", text: { hu: "A test sethez való minél pontosabb illesztés.", en: "Fitting the test set as closely as possible." } }
    ],
    correctIds: ["a", "b"],
    explanation: { hu: "A teszthalmaz (test set) alapján történő early stoppingot a előadás (lecture) kifejezetten helytelennek / cheatingnek nevezi.", en: "The lecture explicitly labels early stopping based on the test set as incorrect / cheating." }
  },
  {
    id: "gen-q14",
    topics: ["early-stopping"],
    prompt: { hu: "Mely állítások igazak a helyes early stoppingra?", en: "Which statements are true about correct early stopping?" },
    choices: [
      { id: "a", text: { hu: "J_val-t figyeljük.", en: "We monitor J_val." } },
      { id: "b", text: { hu: "A best validation state paraméterek (parameters) értékeit érdemes megőrizni.", en: "It is useful to retain the parameters from the best validation state." } },
      { id: "c", text: { hu: "Nem kell az első apró plateau-nál azonnal megállni; patience használható.", en: "We need not stop immediately at the first small plateau; patience can be used." } },
      { id: "d", text: { hu: "J_test alapján kell minden iteráció (iteration) után dönteni.", en: "J_test should be used to decide after every iteration." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "Helyesen validációs veszteség (validation loss) irányítja a stopping decisiont; tesztadatok (test data) nem kerülhet model selectionbe.", en: "Correctly, validation loss drives the stopping decision; test data must not enter model selection." }
  },
  {
    id: "gen-q15",
    topics: ["early-stopping", "overfitting"],
    prompt: { hu: "Training közben J_train csökken, miközben J_val több iteráción át nő. Mit jelezhet ez?", en: "During training, J_train decreases while J_val increases over multiple iterations. What can this indicate?" },
    choices: [
      { id: "a", text: { hu: "Worsening túlillesztés (overfitting).", en: "Worsening overfitting." } },
      { id: "b", text: { hu: "A model egyre jobban illeszkedik tanítóadatok (training data)-ra, de általánosítás (generalization) romlik.", en: "The model fits training data better while generalization worsens." } },
      { id: "c", text: { hu: "Ez early stopping signal lehet.", en: "This can be an early-stopping signal." } },
      { id: "d", text: { hu: "Ez biztosan alulillesztés (underfitting).", en: "This is definitely underfitting." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "Ez a előadás (lecture) klasszikus túlillesztés (overfitting) mintázata.", en: "This is the lecture's classic overfitting pattern." }
  },
  {
    id: "gen-q16",
    topics: ["training-procedure"],
    prompt: { hu: "Mely sorrend felel meg a előadás (lecture) model-training eljárás (procedure)-jének?", en: "Which sequence matches the lecture's model-training procedure?" },
    choices: [
      { id: "a", text: { hu: "Válassz Ψ hiperparaméterek (hyperparameters) értékeket.", en: "Choose hyperparameters Ψ." } },
      { id: "b", text: { hu: "Tanítsd θ modellparaméterek (model parameters) értékeket training seten.", en: "Train model parameters θ on the training set." } },
      { id: "c", text: { hu: "Értékeld validation seten és ez alapján válassz Ψ-t.", en: "Evaluate on the validation set and select Ψ from this performance." } },
      { id: "d", text: { hu: "A végén értékeld a kiválasztott végső (final) modelt test seten.", en: "At the end, evaluate the selected final model on the test set." } }
    ],
    correctIds: ["a", "b", "c", "d"],
    explanation: { hu: "Ez a előadás (lecture) explicit eljárás (procedure)-je: training → validation modellválasztás (model selection) → végső (final) test.", en: "This is the lecture's explicit procedure: training → validation model selection → final test." }
  },
  {
    id: "gen-q17",
    topics: ["test-leakage"],
    prompt: { hu: "Miért helytelen J_test alapján early stoppingot végezni?", en: "Why is it incorrect to perform early stopping based on J_test?" },
    choices: [
      { id: "a", text: { hu: "A model selectionet a test sethez igazítjuk.", en: "We adapt model selection to the test set." } },
      { id: "b", text: { hu: "A teszthalmaz (test set) elveszíti független végső (final)-értékelés (evaluation) szerepét.", en: "The test set loses its role as an independent final evaluation." } },
      { id: "c", text: { hu: "A előadás (lecture) ezt cheatingnek nevezi.", en: "The lecture calls this cheating." } },
      { id: "d", text: { hu: "Mert J_test matematikailag nem lehet skalár (scalar).", en: "Because J_test mathematically cannot be a scalar." } }
    ],
    correctIds: ["a", "b", "c"],
    explanation: { hu: "A probléma nem a veszteség (loss) matematikai alakja, hanem test leakage: a teszthalmaz (test set) beleszól a model selectionbe.", en: "The problem is not the mathematical form of the loss but test leakage: the test set influences model selection." }
  },
  {
    id: "gen-q18",
    topics: ["exam-scope"],
    prompt: { hu: "Mely témákat jelöli a előadás (lecture) 4 summary úgy, hogy NEM lesznek a tests/exam részei?", en: "Which topics does the Lecture 4 summary mark as NOT included in tests/exam?" },
    choices: [
      { id: "a", text: { hu: "Polynomial regresszió (regression).", en: "Polynomial regression." } },
      { id: "b", text: { hu: "Polynomial interpolation.", en: "Polynomial interpolation." } },
      { id: "c", text: { hu: "alulillesztés (underfitting) és túlillesztés (overfitting).", en: "Underfitting and overfitting." } },
      { id: "d", text: { hu: "validációs halmaz (validation set) és hiperparaméterek (hyperparameters).", en: "Validation set and hyperparameters." } }
    ],
    correctIds: ["a", "b"],
    explanation: { hu: "A summary szerint under/túlillesztés (overfitting), hiperparaméterek (hyperparameters) és validációs halmaz (validation set) tesztanyag; polynomial regresszió (regression)/interpolation nem.", en: "The summary says under/overfitting, hyperparameters, and validation set are test material; polynomial regression/interpolation are not." }
  }
];
