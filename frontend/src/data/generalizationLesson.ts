import type { Lesson } from "../types";

export const generalizationLesson: Lesson = {
  id: "generalization-overfitting",
  title: {
    hu: "Általánosítás, túlillesztés és modellválasztás",
    en: "Generalization, Overfitting, and Model Selection"
  },
  subtitle: {
    hu: "Miért nem elég az alacsony tanítási hiba, mire való a validációs halmaz, és hogyan segít a regularizáció és a korai leállítás?",
    en: "Why low training error is not enough, what validation data is for, and how regularization and early stopping help"
  },
  source: "Lectures 4–5",
  sections: [
    {
      id: "generalization",
      title: {
        hu: "Az igazi cél: általánosítás új adatokra",
        en: "The real goal: generalization to unseen data"
      },
      body: {
        hu: "A modell célja nem az, hogy kizárólag a tanítóhalmazt (training set) tudja minél pontosabban visszaadni, hanem hogy korábban nem látott adatpontokon is jól teljesítsen. Ezt nevezzük általánosításnak (generalization). A túlillesztett modell (overfitted model) képes lehet nagyon alacsony tanítási veszteséget elérni, miközben új adatokon lényegesen rosszabbul teljesít.",
        en: "The goal of a model is not merely to reproduce the training set as accurately as possible, but to perform well on previously unseen data. This is generalization. An overfitted model may obtain extremely low training loss while performing substantially worse on new data."
      },
      why: {
        hu: "A valós használat során a modell tipikusan olyan példákat kap, amelyeket a tanítás alatt nem látott. Ezért a tanítási veszteség önmagában nem elegendő mérőszám a modell minőségéhez.",
        en: "In real use, a model usually receives examples that were not present during training. Training loss alone is therefore not sufficient to assess model quality."
      },
      intuition: {
        hu: "Egy vizsgára készülő hallgató megtanulhatja szó szerint az előző évi feladatsor megoldásait. Ettől még nem biztos, hogy egy új feladatot meg tud oldani. A gépi tanulásban ugyanez a különbség a memorizálás és az általánosítás között.",
        en: "A student may memorize the answers to last year's exam without being able to solve a new problem. The same distinction exists between memorization and generalization in machine learning."
      },
      connections: {
        hu: "A modellkapacitás (model capacity), az adatmennyiség, a regularizáció és a tanítás hossza mind befolyásolhatják, mennyire képes a modell általánosítani.",
        en: "Model capacity, data quantity, regularization, and training duration can all influence generalization."
      },
      keyTerms: [
        { term: "generalization", hu: "általánosítás" },
        { term: "unseen data", hu: "korábban nem látott adat" }
      ]
    },
    {
      id: "underfit-overfit",
      title: {
        hu: "Alulillesztés és túlillesztés",
        en: "Underfitting and overfitting"
      },
      body: {
        hu: "Alulillesztésnél (underfitting) a modell túl egyszerű ahhoz, hogy még a tanítóadatok fő szerkezetét is jól leírja. Ilyenkor a tanítási és a kiértékelési veszteség is magas lehet. Túlillesztésnél (overfitting) a modell már a tanítóhalmaz egyedi részleteihez is túlságosan hozzáigazodik: a tanítási veszteség tovább csökkenhet, miközben a korábban nem látott adatokon mért veszteség nő.",
        en: "With underfitting, the model is too simple to capture even the main structure of the training data, so both training and evaluation loss can be high. With overfitting, the model adapts too closely to idiosyncrasies of the training set: training loss may keep falling while loss on unseen data increases."
      },
      why: {
        hu: "A modell összetettsége (model complexity) egyensúlyt kíván. Túl kevés kapacitással a modell nem tudja megtanulni a szükséges kapcsolatot; túl sok kapacitással és kevés adattal viszont könnyebben megtanulhatja a zajt és az egyedi részleteket is.",
        en: "Model complexity requires a balance. Too little capacity cannot represent the required relationship, while excessive capacity relative to the amount of data makes it easier to fit noise and individual details."
      },
      workedExample: {
        hu: "A lecture polinomos görbékkel szemlélteti a jelenséget: túl alacsony fokszámnál a görbe nem követi az adat trendjét, túl magas fokszámnál pedig az egyes pontokhoz túl erősen igazodik. A polinomiális regresszió képletei itt szemléltetésre szolgálnak; a Lecture 4 összefoglalója szerint maga a polinomiális regresszió/interpoláció nem tesztanyag.",
        en: "The lecture illustrates this using polynomial curves: a low-degree curve misses the data trend, while a high-degree curve bends too closely around individual points. Polynomial regression/interpolation itself is marked as excluded from the test; it is used here as visual context."
      },
      examTrap: {
        hu: "A nagyon alacsony tanítási veszteség nem bizonyítja, hogy a modell jó. Ha a validációs veszteség (validation loss) közben romlik, az a túlillesztés erősödésének jele lehet.",
        en: "Very low training loss does not prove that the model is good. If validation loss worsens while training loss improves, overfitting may be becoming more severe."
      },
      keyTerms: [
        { term: "underfitting", hu: "alulillesztés" },
        { term: "overfitting", hu: "túlillesztés" },
        { term: "model complexity", hu: "modellösszetettség" }
      ]
    },
    {
      id: "risk-factors",
      title: {
        hu: "Mi növeli a túlillesztés kockázatát?",
        en: "What increases overfitting risk?"
      },
      body: {
        hu: "A tananyag szerint sok tanulható paraméter (learnable parameters) és kevés tanítóadat mellett könnyebb túlilleszteni a modellt. Több tanítási példa általában csökkentheti ezt a kockázatot, míg a modell egyszerűsítése – például kevesebb paraméter használata – szintén segíthet. A teszthalmaz méretének csökkentése ezzel szemben nem teszi magát a tanítást jobban túlillesztetté; inkább a végső teljesítménybecslés válik bizonytalanabbá.",
        en: "According to the course, many learnable parameters combined with little training data make overfitting easier. More training examples can generally reduce this risk, while simplifying the model—for example by using fewer parameters—can also help. Reducing the test-set size does not itself make training more overfit; it mainly makes final performance estimation less reliable."
      },
      why: {
        hu: "A modellkapacitás és a rendelkezésre álló bizonyíték mennyisége együtt számít. Ha sok szabadságfokot kevés adat korlátoz, több olyan paraméterbeállítás létezhet, amely a tanítóhalmazra kiváló, de az általános mintázatot rosszul ragadja meg.",
        en: "Model capacity and the amount of evidence must be considered together. With many degrees of freedom constrained by little data, many parameter settings can fit the training set while failing to capture the general pattern."
      },
      examTrap: {
        hu: "A hivatalos mintakérdések külön megkülönböztetik a tanítási példák és a tesztpéldák számát. Kevesebb tanítási adat növelheti a túlillesztés kockázatát; kevesebb tesztadat elsősorban a mérés megbízhatóságát rontja.",
        en: "The official example questions distinguish training-example count from test-example count. Less training data can increase overfitting risk; less test data mainly reduces evaluation reliability."
      }
    },
    {
      id: "three-way-split",
      title: {
        hu: "Tanító-, validációs és teszthalmaz",
        en: "Training, validation, and test sets"
      },
      body: {
        hu: "A későbbi, helyes modellválasztási eljárás három külön adathalmazt használ. A tanítóhalmaz (training set) a modell paramétereinek megtanítására szolgál. A validációs halmazt (validation set) hiperparaméterek (hyperparameters) és modellválasztási döntések értékelésére használjuk. A teszthalmaz (test set) a végleges, független teljesítménybecslésre marad.",
        en: "The later, correct model-selection procedure uses three separate datasets. The training set is used to learn model parameters. The validation set is used to evaluate hyperparameters and model-selection decisions. The test set is reserved for final independent performance estimation."
      },
      why: {
        hu: "Ha ugyanazt a teszthalmazt újra és újra felhasználjuk döntésekhez, akkor közvetve ahhoz is hozzáigazítjuk a modellt. Ezért a teszthalmaz többé nem lenne valóban független mérés.",
        en: "If the test set is repeatedly used to make decisions, the model-selection process becomes indirectly adapted to it. The test set would no longer provide an independent measurement."
      },
      formula: {
        hu: "TRAIN → modellparaméterek θ    |    VALIDATION → hiperparaméterek Ψ    |    TEST → végső értékelés",
        en: "TRAIN → model parameters θ    |    VALIDATION → hyperparameters Ψ    |    TEST → final evaluation"
      },
      formulaTerms: [
        { symbol: "θ", hu: "A modell tanulható paraméterei; tipikusan a tanítóhalmazon optimalizáljuk őket.", en: "Learnable model parameters, typically optimized on the training set." },
        { symbol: "Ψ", hu: "A hiperparaméter-konfiguráció, például tanulási ráta, hálózati architektúra vagy iterációszám.", en: "Hyperparameter configuration, such as learning rate, architecture, or iteration count." }
      ],
      workedExample: {
        hu: "A Lecture 5 modellválasztási eljárása: választunk egy Ψ hiperparaméter-konfigurációt, ezzel a tanítóhalmazon optimalizáljuk θ-t, majd a validációs halmazon értékelünk. Több Ψ kipróbálása után a legjobb validációs teljesítményű konfigurációt választjuk, és csak ezután mérünk a teszthalmazon.",
        en: "Lecture 5 procedure: choose a hyperparameter configuration Ψ, optimize θ on the training set, evaluate on the validation set, repeat for multiple Ψ values, then choose the best validation configuration and only afterward evaluate on the test set."
      },
      examTrap: {
        hu: "A teszthalmaz nem modellválasztási eszköz. A hiperparamétereket és a korai leállítást a validációs halmaz alapján választjuk.",
        en: "The test set is not a model-selection tool. Hyperparameters and early stopping are selected using validation data."
      },
      keyTerms: [
        { term: "training set", hu: "tanítóhalmaz" },
        { term: "validation set", hu: "validációs halmaz" },
        { term: "test set", hu: "teszthalmaz" }
      ]
    },
    {
      id: "hyperparameters",
      title: {
        hu: "Paraméter és hiperparaméter nem ugyanaz",
        en: "Parameters and hyperparameters are different"
      },
      body: {
        hu: "A modellparaméterek (model parameters), például a lineáris modell θ értékei vagy egy neurális hálózat súlyai és eltolásai, közvetlenül a tanítás során tanulhatók. A hiperparaméterek (hyperparameters) a tanítás vagy a modell felépítésének beállításai. A lecture példái közé tartozik a tanulási ráta (learning rate), a polinom foka vagy a neurális hálózat architektúrája, valamint a gradiensmódszer iterációinak száma.",
        en: "Model parameters, such as θ in a linear model or weights and biases in a neural network, are learned directly during training. Hyperparameters configure the model or training procedure. Lecture examples include learning rate, polynomial degree or neural-network architecture, and number of gradient-method iterations."
      },
      why: {
        hu: "A hiperparaméterekre általában nem alkalmazható ugyanúgy a gradienscsökkentés, mert nem feltétlenül létezik rájuk nézve differenciálható veszteség. A tananyag kézi próbálgatást, rácskeresést (grid search), véletlen keresést (random search), Bayes-i optimalizálást és evolúciós módszereket is említ.",
        en: "Gradient descent cannot generally be applied to hyperparameters in the same way because a differentiable loss with respect to them may not exist. The course mentions manual trial and error, grid search, random search, Bayesian optimization, and evolutionary methods."
      },
      connections: {
        hu: "A korai leállításnál (early stopping) az iterációk száma is hiperparaméterként viselkedik: a validációs teljesítmény alapján döntjük el, melyik tanítási állapotot érdemes megtartani.",
        en: "In early stopping, the number of iterations behaves as a hyperparameter: validation performance determines which training state should be retained."
      },
      examTrap: {
        hu: "A neurális hálózat súlyait tipikusan gradiensalapú módszer tanítja, a hiperparamétereket viszont általában nem egyszerűen SGD-vel tanítjuk.",
        en: "Neural-network weights are typically trained using gradient-based methods, while hyperparameters are generally not simply trained with SGD."
      },
      keyTerms: [
        { term: "model parameter", hu: "modellparaméter" },
        { term: "hyperparameter", hu: "hiperparaméter" },
        { term: "grid search", hu: "rácskeresés" }
      ]
    },
    {
      id: "l2",
      title: {
        hu: "L2-regularizáció: ne csak jól illeszkedjen, legyen visszafogott is",
        en: "L2 regularization: fit the data without excessively large weights"
      },
      body: {
        hu: "Az L2-regularizáció (L2 regularization) a predikciós veszteség mellé olyan büntetőtagot ad, amely a nagy súlyokat bünteti. A course példájában a regularizációs tag λΣθᵢ². A konstans eltolást, θ₀-t a bemutatott képlet nem bünteti.",
        en: "L2 regularization adds a penalty for large weights to the prediction loss. In the course example the penalty is λΣθᵢ², while θ₀, the constant bias term, is not penalized."
      },
      why: {
        hu: "Túlillesztés során a modell nagy paraméterértékekkel nagyon erősen reagálhat az egyedi tanítópontokra. Az L2 korlátozza ezt a szabadságot, így csökkentheti a túlillesztést, különösen kevés tanítóadat esetén.",
        en: "During overfitting, large parameter values can make the model react strongly to individual training examples. L2 constrains this freedom and can reduce overfitting, especially when training data are scarce."
      },
      formula: {
        hu: "J_reg(θ) = J_data(θ) + λ Σᵢ₌₁ⁿ θᵢ²",
        en: "J_reg(θ) = J_data(θ) + λ Σᵢ₌₁ⁿ θᵢ²"
      },
      formulaTerms: [
        { symbol: "J_data", hu: "Az eredeti, adatokhoz való illeszkedést mérő veszteség.", en: "Original data-fitting loss." },
        { symbol: "λ", hu: "A regularizáció erőssége. λ=0 esetén nincs L2-büntetés.", en: "Regularization strength. λ=0 means no L2 penalty." },
        { symbol: "Σθᵢ²", hu: "A súlyok négyzeteinek összege; a nagy értékeket erősebben bünteti.", en: "Sum of squared weights, penalizing large values more strongly." }
      ],
      connections: {
        hu: "A regularizált normálegyenletben megjelenő λI tag ugyanehhez az L2-gondolathoz kapcsolódik. Neurális hálózatoknál is alkalmazható L2-jellegű regularizáció.",
        en: "The λI term in the regularized normal equation is connected to the same L2 idea. L2-style regularization can also be applied to neural networks."
      },
      examTrap: {
        hu: "Túl nagy λ a modellt túlzottan egyszerűvé teheti és alulillesztéshez vezethet. λ=0 az eredeti, regularizálatlan célfüggvényt adja vissza.",
        en: "An excessively large λ can make the model too constrained and lead to underfitting. λ=0 recovers the unregularized objective."
      },
      keyTerms: [
        { term: "L2 regularization", hu: "L2-regularizáció" },
        { term: "regularization strength", hu: "regularizációs erősség" }
      ]
    },
    {
      id: "early-stopping",
      title: {
        hu: "Korai leállítás: mikor hagyjuk abba a tanítást?",
        en: "Early stopping: when should training stop?"
      },
      body: {
        hu: "A korai leállítás (early stopping) azt használja ki, hogy hosszú tanítás során a tanítási veszteség tovább csökkenhet akkor is, amikor az általánosítás már romlik. A helyes eljárás a validációs veszteséget figyeli, és azt a tanítási állapotot tartja meg, amelynél a validációs teljesítmény a legjobb.",
        en: "Early stopping exploits the fact that training loss can continue decreasing even after generalization starts getting worse. The correct procedure monitors validation loss and retains the training state with the best validation performance."
      },
      why: {
        hu: "A tanítási veszteség önmagában nem jelzi, hogy elkezdődött-e túlillesztés, mert overfitting közben is tovább csökkenhet. A validációs veszteség viszont korábban nem használt adatokon mutatja, hogyan változik az általánosítás.",
        en: "Training loss alone does not reveal when overfitting begins because it may keep decreasing during overfitting. Validation loss provides a signal from data not used to fit the parameters."
      },
      workedExample: {
        hu: "Fontos a slide-ok sorrendje: a Lecture 4 először szándékosan bemutatja a J_test figyelését, majd megkérdezi, mi a probléma ezzel. Ezután vezeti be a helyes változatot: a korai leállításhoz J_val-t figyelünk. A Lecture 5 összefoglalója is ezt ismétli.",
        en: "The slide sequence matters: Lecture 4 first deliberately shows monitoring J_test and asks what is wrong with it. It then introduces the correct version: monitor J_val for early stopping. Lecture 5 repeats this corrected procedure."
      },
      formula: {
        hu: "helyes jel: J_train tovább csökken, miközben J_val már nő → erősödő túlillesztés",
        en: "correct signal: J_train keeps decreasing while J_val increases → worsening overfitting"
      },
      formulaTerms: [
        { symbol: "J_train", hu: "A tanítóhalmazon mért veszteség.", en: "Loss measured on the training set." },
        { symbol: "J_val", hu: "A validációs halmazon mért veszteség; ezt használjuk a leállítási döntéshez.", en: "Loss measured on the validation set; used for the stopping decision." },
        { symbol: "J_test", hu: "A végső független értékeléshez fenntartott veszteség; nem a korai leállítás vezérlőjele.", en: "Loss reserved for final independent evaluation, not the early-stopping control signal." }
      ],
      examTrap: {
        hu: "Nem azért állunk meg, mert a tanítási veszteség növekedni kezd. A helyes jel a validációs teljesítmény romlása vagy javulásának megszűnése.",
        en: "We do not stop because training loss starts increasing. The correct signal is that validation performance stops improving or begins to worsen."
      },
      keyTerms: [
        { term: "early stopping", hu: "korai leállítás" },
        { term: "validation loss", hu: "validációs veszteség" }
      ]
    },
    {
      id: "solutions-summary",
      title: {
        hu: "Túlillesztés kezelése: a négy fő eszköz",
        en: "Handling overfitting: four main approaches"
      },
      body: {
        hu: "A Lecture 4 négy fő megoldást sorol fel: egyszerűbb modell használata, több tanítóadat gyűjtése, regularizációs módszerek – például L2 – alkalmazása, illetve korai leállítás. Ezek különböző módon ugyanazt a problémát célozzák: ne engedjük, hogy a modell túlságosan a tanítóhalmaz egyedi részleteihez igazodjon.",
        en: "Lecture 4 lists four main approaches: use a simpler model, obtain more training data, apply regularization methods such as L2, and use early stopping. They all aim to prevent excessive specialization to training-set details."
      },
      connections: {
        hu: "A neurális hálózatoknál a modell egyszerűsítése jelentheti például kevesebb réteg vagy neuron használatát. Több adat több különböző példát mutat a modellnek. L2 a súlyokat korlátozza, early stopping pedig a tanítás hosszát.",
        en: "For neural networks, simplification may mean fewer layers or neurons. More data provides more diverse examples. L2 constrains weights, while early stopping constrains training duration."
      },
      examTrap: {
        hu: "Alulillesztésnél az ellenkező irány lehet szükséges: összetettebb modell vagy jobb reprezentáció kellhet. A túlillesztés elleni megoldásokat nem szabad automatikusan minden magas veszteségre alkalmazni.",
        en: "Underfitting may require the opposite direction: a more expressive model or better representation. Overfitting remedies should not be applied automatically to every high-loss situation."
      }
    }
  ]
};
