import type { Lesson } from "../types";

export const generalizationLesson: Lesson = {
  id: "generalization-overfitting",
  title: {
    hu: "Generalization, overfitting és model selection",
    en: "Generalization, Overfitting, and Model Selection"
  },
  subtitle: {
    hu: "Training/validation/test, underfitting, overfitting, L2 regularization, early stopping és hyperparameters",
    en: "Training/validation/test, underfitting, overfitting, L2 regularization, early stopping, and hyperparameters"
  },
  source: "Lectures 4–5",
  sections: [
    {
      id: "scope-polynomial-context",
      title: {
        hu: "Polynomial regression: csak szemléltető kontextus",
        en: "Polynomial regression: illustrative context only"
      },
      body: {
        hu: "A lecture polynomial regression példákkal szemlélteti a model complexity, underfitting és overfitting jelenségeit. A Lecture 4 summary explicit kimondja, hogy polynomial regression és polynomial interpolation nem lesz a tests/exam része.",
        en: "The lecture uses polynomial-regression examples to illustrate model complexity, underfitting, and overfitting. The Lecture 4 summary explicitly states that polynomial regression and polynomial interpolation will not be included in tests/exam."
      },
      intuition: {
        hu: "A polynomial degree itt csak egy könnyen elképzelhető 'complexity knob'. A vizsgán az általános tanulság számít: túl egyszerű model → underfitting; túl komplex model → overfitting kockázat.",
        en: "Polynomial degree is only an easy-to-visualize 'complexity knob' here. For the exam, the general lesson matters: an overly simple model risks underfitting; an overly complex model risks overfitting."
      },
      examTrap: {
        hu: "Ne tölts Theory Test tanulási időt polynomial-regression képletek magolásával; a source summary szerint ez nem tesztanyag.",
        en: "Do not spend Theory Test study time memorizing polynomial-regression formulas; the source summary says this is not test material."
      },
      keyTerms: [
        { term: "model complexity" },
        { term: "underfitting" },
        { term: "overfitting" }
      ]
    },
    {
      id: "train-test",
      title: {
        hu: "Training set és test set szerepe",
        en: "Roles of the training set and test set"
      },
      body: {
        hu: "A modellt a training seten tanítjuk, majd külön test seten értékeljük. A két setnek disjointnak kell lennie. A test set célja annak becslése, hogyan teljesít a trained model korábban nem látott data pointokon.",
        en: "We train the model on the training set and evaluate it on a separate test set. The two sets must be disjoint. The purpose of the test set is to estimate how the trained model performs on previously unseen data points."
      },
      intuition: {
        hu: "A test set olyan, mint egy lezárt végső vizsga: ha training vagy model selection közben folyamatosan hozzá igazítod a modellt, már nem független mérés.",
        en: "Think of the test set as a sealed final exam: if you repeatedly adapt the model to it during training or model selection, it is no longer an independent measurement."
      },
      examTrap: {
        hu: "A test setet nem használjuk learningre vagy hyperparameter választásra.",
        en: "The test set is not used for learning or hyperparameter selection."
      },
      keyTerms: [
        { term: "training set" },
        { term: "test set" },
        { term: "disjoint" },
        { term: "unseen data" }
      ]
    },
    {
      id: "underfit-overfit",
      title: {
        hu: "Underfitting, just right, overfitting",
        en: "Underfitting, just right, overfitting"
      },
      body: {
        hu: "Underfittingnél a model complexity túl alacsony: a training és test loss is nagy; a lecture ezt 'high bias, low variance' helyzetként jelöli. Jó illeszkedésnél mindkettő alacsony. Overfittingnél a training loss tovább csökken, miközben az unseen-data loss romlik; ez 'low bias, high variance'.",
        en: "With underfitting, model complexity is too low: both training and test loss are high; the lecture labels this 'high bias, low variance'. With an appropriate fit, both are low. With overfitting, training loss keeps decreasing while unseen-data loss worsens; this is 'low bias, high variance'."
      },
      intuition: {
        hu: "Underfit: a modell még az alapmintát sem tudja leírni. Overfit: a training examples egyedi részleteit is megtanulja, ezért elveszíti a generalization képességét.",
        en: "Underfit: the model cannot capture even the main structure. Overfit: it learns details specific to individual training examples and loses the ability to generalize."
      },
      examTrap: {
        hu: "Nagyon alacsony training loss önmagában nem bizonyít jó modellt. Ha validation/test loss magas vagy növekszik, ez lehet overfitting.",
        en: "A very low training loss alone does not prove that the model is good. If validation/test loss is high or increasing, this can indicate overfitting."
      },
      keyTerms: [
        { term: "generalization" },
        { term: "high bias" },
        { term: "high variance" }
      ]
    },
    {
      id: "overfit-risk",
      title: {
        hu: "Mi növeli vagy csökkenti az overfitting kockázatát?",
        en: "What increases or decreases overfitting risk?"
      },
      body: {
        hu: "A course szerint több training data segíthet az overfitting csökkentésében. Egyszerűbb model / kevesebb parameter szintén csökkentheti az overfittinget. Kevés training data és sok learnable parameter mellett könnyebb a training examples egyedi részleteire specializálódni.",
        en: "According to the course, more training data can help reduce overfitting. A simpler model / fewer parameters can also reduce overfitting. With little training data and many learnable parameters, it is easier to specialize to individual training examples."
      },
      intuition: {
        hu: "A model capacity és a training evidence aránya számít: sok parameter + kevés example → több lehetőség memorizationre.",
        en: "The balance between model capacity and training evidence matters: many parameters + few examples → more opportunity for memorization."
      },
      examTrap: {
        hu: "A test examples számának csökkentése önmagában nem növeli a model training alatti overfittinget; inkább a final evaluation lesz kevésbé megbízható. A training examples csökkentése viszont növelheti az overfitting kockázatát.",
        en: "Reducing the number of test examples does not itself increase overfitting during model training; it mainly makes final evaluation less reliable. Reducing the number of training examples can increase overfitting risk."
      },
      keyTerms: [
        { term: "model capacity" },
        { term: "training data" },
        { term: "parameters" }
      ]
    },
    {
      id: "overfit-solutions",
      title: {
        hu: "Overfitting kezelési lehetőségei",
        en: "Ways to handle overfitting"
      },
      body: {
        hu: "A lecture négy fő megoldást sorol: egyszerűbb model (kevesebb parameter), több training data, regularization method (például L2), illetve early stopping.",
        en: "The lecture lists four main approaches: a simpler model (fewer parameters), more training data, a regularization method such as L2, and early stopping."
      },
      intuition: {
        hu: "Mindegyik módszer valamilyen módon csökkenti annak lehetőségét, hogy a model túl szorosan a training set egyedi részleteihez igazodjon.",
        en: "Each method reduces, in some way, the model's ability to fit idiosyncrasies of the training set too closely."
      },
      examTrap: {
        hu: "Underfittingnél viszont a lecture szerint komplexebb modelre lehet szükség.",
        en: "For underfitting, the lecture says a more complex model may be needed."
      },
      keyTerms: [
        { term: "regularization" },
        { term: "early stopping" },
        { term: "simpler model" }
      ]
    },
    {
      id: "l2",
      title: {
        hu: "L2 regularization",
        en: "L2 regularization"
      },
      body: {
        hu: "L2 regularization a prediction error mellé a nagy parameters értékeket büntető tagot ad. A lecture példájában J(θ)=MSE + λΣᵢ₌₁ⁿθᵢ². A bias/intercept θ₀ nincs penalizálva.",
        en: "L2 regularization adds a term that penalizes large parameter values in addition to prediction error. In the lecture example, J(θ)=MSE + λΣᵢ₌₁ⁿθᵢ². The bias/intercept θ₀ is not penalized."
      },
      intuition: {
        hu: "A model nemcsak jól akar illeszkedni, hanem ezt túl nagy weights nélkül próbálja megtenni.",
        en: "The model is encouraged not only to fit the data well, but also to do so without relying on excessively large weights."
      },
      examTrap: {
        hu: "λ=0 az eredeti, unregularized objective. Túl nagy λ esetén túl kicsi weights felé tolhatjuk a modellt, ami underfittinget okozhat.",
        en: "λ=0 gives the original unregularized objective. If λ is too large, the model can be pushed toward overly small weights, causing underfitting."
      },
      formula: {
        hu: "J(θ) = 1/(2m)·Σⱼ(hθ(x⁽ʲ⁾)−y⁽ʲ⁾)² + λ·Σᵢ₌₁ⁿ θᵢ²   (θ₀ nincs penalizálva)",
        en: "J(θ) = 1/(2m)·Σⱼ(hθ(x⁽ʲ⁾)−y⁽ʲ⁾)² + λ·Σᵢ₌₁ⁿ θᵢ²   (θ₀ is not penalized)"
      },
      keyTerms: [
        { term: "L2 regularization" },
        { term: "lambda (λ)" },
        { term: "penalty" },
        { term: "bias parameter" }
      ]
    },
    {
      id: "validation",
      title: {
        hu: "Miért kell validation set?",
        en: "Why do we need a validation set?"
      },
      body: {
        hu: "A helyes felosztás training set, validation set és test set. A model parameters θ értékeit training seten optimalizáljuk. A validation set segítségével hyperparameters értékeket választunk. A test set a kiválasztott final model független értékelésére szolgál.",
        en: "The correct split uses training, validation, and test sets. Model parameters θ are optimized on the training set. The validation set is used to select hyperparameters. The test set is used for independent evaluation of the selected final model."
      },
      intuition: {
        hu: "Validation = development exam, amely alapján döntéseket hozhatsz. Test = final exam, amelyhez model selection közben nem nyúlsz.",
        en: "Validation = a development exam that can guide decisions. Test = the final exam that is not used during model selection."
      },
      examTrap: {
        hu: "Az 50/25/25 split csak példa a lecture-ben, nem univerzális szabály.",
        en: "The 50/25/25 split is only an example in the lecture, not a universal rule."
      },
      keyTerms: [
        { term: "validation set" },
        { term: "model selection" },
        { term: "final evaluation" }
      ]
    },
    {
      id: "hyperparameters",
      title: {
        hu: "Model parameters vs hyperparameters",
        en: "Model parameters vs hyperparameters"
      },
      body: {
        hu: "θ jelöli a model parameters értékeket, amelyeket például gradient descenttel a training seten tanulunk. Hyperparameters (Ψ) közé tartozhat a learning rate α, model architecture / polynomial degree és az iteration count / early-stopping choice. Ezeket validation performance alapján választjuk.",
        en: "θ denotes model parameters learned on the training set, for example with gradient descent. Hyperparameters (Ψ) can include the learning rate α, model architecture / polynomial degree, and iteration count / early-stopping choice. They are selected using validation performance."
      },
      intuition: {
        hu: "Parameter: amit a model a training examplesból közvetlenül megtanul. Hyperparameter: ami a learning process vagy model structure működését állítja.",
        en: "Parameter: something the model directly learns from training examples. Hyperparameter: something that configures the learning process or model structure."
      },
      examTrap: {
        hu: "A lecture szerint gradient descent általában nem használható hyperparameters optimalizálására. Példák: manual trial and error, grid search, random search, Bayesian optimization, evolutionary/genetic algorithms.",
        en: "According to the lecture, gradient descent generally cannot be used to optimize hyperparameters. Examples include manual trial and error, grid search, random search, Bayesian optimization, and evolutionary/genetic algorithms."
      },
      keyTerms: [
        { term: "model parameter" },
        { term: "hyperparameter" },
        { term: "grid search" },
        { term: "random search" }
      ]
    },
    {
      id: "early-stopping",
      title: {
        hu: "Early stopping: helyes és helytelen",
        en: "Early stopping: correct and incorrect"
      },
      body: {
        hu: "Early stopping célja az overfitting mérséklése. A Lecture 4 először J_test alapú stoppingot mutat, majd ezt explicit cheatingnek nevezi. A helyes módszer J_val figyelése.",
        en: "Early stopping aims to reduce overfitting. Lecture 4 first demonstrates stopping based on J_test, then explicitly calls it cheating. The correct method monitors J_val."
      },
      intuition: {
        hu: "Mentsd azt az állapotot, ahol validation loss a legjobb. Ha J_val tartósan nem javul, állj meg és használd a best-validation state parameters értékeit.",
        en: "Keep the state with the best validation loss. If J_val stops improving persistently, stop and use the parameters from the best-validation state."
      },
      examTrap: {
        hu: "Nem J_train növekedésére várunk. Tipikus overfitting jel, hogy J_train csökken, miközben J_val emelkedik. És nem J_test alapján döntünk.",
        en: "We do not wait for J_train to increase. A typical overfitting sign is that J_train decreases while J_val increases. And we do not make the decision from J_test."
      },
      formula: {
        hu: "helyes: monitor J_val   |   helytelen: tune/stop using J_test",
        en: "correct: monitor J_val   |   incorrect: tune/stop using J_test"
      },
      keyTerms: [
        { term: "early stopping" },
        { term: "validation loss" },
        { term: "patience" },
        { term: "test leakage" }
      ]
    },
    {
      id: "training-procedure",
      title: {
        hu: "Teljes model training procedure",
        en: "Complete model-training procedure"
      },
      body: {
        hu: "1) Válassz hyperparameter configuration Ψ-t. 2) Optimalizáld θ model parameters értékeit a training seten. 3) Értékeld a modellt validation seten, majd próbálj más Ψ-t. Végül válaszd a best validation performance hyperparameters értékeit, és csak ezután értékeld a final modelt a test seten.",
        en: "1) Choose a hyperparameter configuration Ψ. 2) Optimize model parameters θ on the training set. 3) Evaluate the model on the validation set, then try another Ψ. Finally choose the hyperparameters with the best validation performance and only then evaluate the final model on the test set."
      },
      intuition: {
        hu: "Két nested optimization történik: belül θ-t tanuljuk training data alapján; kívül Ψ-t választjuk validation performance alapján.",
        en: "There are two nested optimization problems: internally we learn θ from training data; externally we select Ψ using validation performance."
      },
      examTrap: {
        hu: "Ha test performance alapján választod ki Ψ-t, a test set már része lett a model selectionnek, így nem marad független final evaluation.",
        en: "If Ψ is selected based on test performance, the test set has become part of model selection and is no longer an independent final evaluation."
      },
      keyTerms: [
        { term: "nested optimization" },
        { term: "model selection" },
        { term: "final test" }
      ]
    }
  ]
};
