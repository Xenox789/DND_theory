import type { FalsePair } from "./official";

/** Each alternative is deliberately close to a true statement in the lecture.
 * The meaning is equivalent in Hungarian and English. */
export const fundamentalLinearLogisticFalse: Record<string, FalsePair[]> = {
  "mock-fund-1": [
    ["Felügyelt tanulásban a célváltozó értékét a modell becslése (ŷ) biztosítja a tanítóadatokban.", "In supervised learning, the training target is provided by the model prediction ŷ."],
    ["Klaszterezésnél az előre adott osztálycímkéket használjuk a klaszterközéppontok tanítási célértékeként.", "In clustering, predefined class labels serve as target values for learning cluster centers."],
    ["A reinforcement learningben a jutalom ugyanazt az információt adja, mint minden állapothoz a helyes akció címkéje.", "In reinforcement learning, reward conveys the same information as the correct action label for every state."],
    ["Regresszióban a modell paramétereit címkézetlen adatokból tanuljuk, mert az eredmény folytonos.", "Regression learns model parameters from unlabeled data because its targets are continuous."],
    ["A környezettől kapott RL-jutalom egy cselekvés helyes osztályba sorolása, nem a következmények értékelése.", "An RL reward classifies the action as a correct class instead of evaluating its consequences."],
    ["A supervised és unsupervised tanulást a címke adatának típusa különíti el, nem az elérhető visszajelzés.", "Supervised and unsupervised learning differ by label data type, not by whether supervised targets are available."]
  ],
  "mock-fund-2": [
    ["A θ azonos szerepű az x bemeneti jellemzővektorral, mert a tanítás során mindkettőt optimalizáljuk.", "θ plays the same role as the input feature vector x because both are optimized during training."],
    ["A hθ(x) becslés megegyezik a valódi y címkével, mivel a hipotézis definíciója előírja az egyezést.", "The hypothesis prediction hθ(x) equals the true label y by definition."],
    ["A tanítóhalmaz címkéi a θ paramétervektorban szerepelnek, az x vektor a tanítható súlyokat tartalmazza.", "Dataset labels are stored in θ while x contains the learnable weights."],
    ["A képszegmentálás címkéjének mátrixalakja kizárt, mert a teljes J(θ) célfüggvény skalár.", "Matrix-shaped segmentation labels are impossible because the total objective J(θ) is scalar."],
    ["Ha hθ(x) vektort ad vissza, a feladat többosztályos osztályozás, folytonos többkimenetű regresszió nem lehet.", "A vector-valued hθ(x) necessarily indicates multiclass classification rather than continuous multi-output regression."],
    ["A tanítás a bemeneti X sorait próbálja a helyes y címkékhez illeszteni a θ súlyok változtatása nélkül.", "Training fits input rows X to targets y without modifying the model weights θ."]
  ],
  "mock-fund-3": [
    ["A logisztikus regresszió az osztálynevek számszerű kódolása helyett közvetlen folytonos kimenetű MSE-regresszió.", "Logistic regression is a continuous MSE-regression objective rather than a classifier for encoded labels."],
    ["A dimenziócsökkentés elsődleges célja ismert osztálycímkék becslése, a kisebb jellemzőtér csupán mellékhatás.", "Dimensionality reduction primarily predicts known class labels; obtaining fewer features is incidental."],
    ["A klaszterezés a címkézett példák valódi folytonos y értékét illeszti a regressziós veszteség csökkentésével.", "Clustering fits known continuous labels y by minimizing a regression loss."],
    ["Osztályozásnál és regressziónál azonos kimeneti jelentés és veszteség használható, mert mindkettő supervised.", "Classification and regression can use the same output meaning and loss simply because both are supervised."],
    ["Az egyedi hibák összege és a teljes mintán számolt veszteség egyaránt vektor, ha egynél több tanítópélda van.", "Both per-sample error and the aggregated objective are vectors whenever the dataset has multiple examples."],
    ["Zajszűréskor a modell a zaj jelenlétére vonatkozó osztályt becsli, a jel rekonstruálását nem tanulhatja.", "Denoising predicts a class denoting noise presence and cannot learn to reconstruct a cleaner signal."]
  ],
  "mock-linear-1": [
    ["Egy bemeneti változónál a hθ(x)=θ₀+θ₁x függvény grafikonja parabola, mert két paramétere van.", "With one feature, hθ(x)=θ₀+θ₁x is a parabola because it has two parameters."],
    ["Két bemeneti jellemzőnél θ₁ és θ₂ a sík metszetei, külön θ₀ eltolásra nincs lehetőség.", "For two input features, θ₁ and θ₂ are intercepts and no separate θ₀ bias can be present."],
    ["A θ₀ eltolás a minden mintához külön hozzárendelt valódi y célértéket jelenti.", "The intercept θ₀ denotes the true y label attached separately to every training example."],
    ["A lineáris regresszió alaphibáját bináris keresztentrópiával mérjük, mert az egyenes két osztályt választ el.", "Standard linear-regression error uses BCE because the fitted line separates two classes."],
    ["Az x változók értékei módosulnak a gradienscsökkentés során, a θ súlyok rögzített adatokat tartalmaznak.", "Input values x are adjusted by gradient descent, while θ weights are fixed observations."],
    ["A lineáris hθ(x) kimenete szigmoid nélkül is 0 és 1 közötti valószínűségként értelmezhető.", "A linear hθ(x) output can directly be treated as a probability between 0 and 1 without sigmoid."]
  ],
  "mock-linear-2": [
    ["200 sorban tárolt betegnél az X mátrix shape-je (5,200), mert az öt paraméter sorindexként szerepel.", "With 200 patients stored by row, X has shape (5,200) since five parameters are row indices."],
    ["A θ vektorban betegszámonként egy súly van, ezért a hossza 200, nem a jellemzőszámtól függ.", "θ stores one weight per patient, giving length 200 instead of one weight per feature."],
    ["Az Xθ alakja (200,5), mert a szorzásban az X minden oszlopa megmarad a kimenetben.", "Xθ has shape (200,5) because matrix multiplication preserves every column of X in the output."],
    ["Az XᵀX alakja (200,200), mert az X mátrix 200 tanítómintát tartalmaz.", "XᵀX has shape (200,200) because X holds 200 training examples."],
    ["Az Xᵀy alakja (200,), mert y a 200 beteg valódi célértékeinek vektora.", "Xᵀy has shape (200,) because y stores 200 target values."],
    ["A biasoszlop a betegenkénti koleszterincélokat tárolja, míg az y vektorban az életkor szerepel.", "The intercept column stores cholesterol targets while y contains patient ages."]
  ],
  "mock-linear-3": [
    ["A négyzetes hiba minimalizálásakor az előjeles hibák kiolthatják egymást, ezért a négyzet helyett azok összegét használjuk.", "Signed errors can cancel, so least squares uses their raw sum instead of squaring them."],
    ["A θ szerinti gradiens elemei a modellel kapott ŷ becslések, nem a veszteség parciális deriváltjai.", "The gradient with respect to θ contains model predictions ŷ, not partial derivatives of the loss."],
    ["Gradienscsökkentésben a pozitív α lépés a +∇J irányába halad, ezért közelít a minimumhoz.", "With positive α gradient descent follows +∇J toward a minimum."],
    ["A normálegyenletet ugyanazon loss-ra csak akkor használhatjuk, ha már több ezer SGD-lépést lefuttattunk.", "For least squares, the normal equation can only be applied after thousands of SGD steps."],
    ["Min-max skálázásnál az átlag és szórás használata teszi érzéketlenné az eredményt az outlierekre.", "Min-max scaling uses mean and standard deviation, making it insensitive to outliers."],
    ["A túl nagy α javítja a gradienscsökkentés stabilitását, mert csökkenti a minimum körüli túllépést.", "A large learning rate improves stability by reducing overshooting near a minimum."]
  ],
  "mock-log-1": [
    ["A logisztikus regresszió kimenetét folytonos mért értékként értelmezzük, ezért a BCE helyett MSE-t használunk.", "Logistic-regression output is a continuous measurement, so MSE replaces BCE."],
    ["A szigmoid előtti z pontszám már becsült valószínűség, ezért a szigmoid csak megőrzi az értékét.", "The pre-sigmoid score z is already a probability and sigmoid just preserves it."],
    ["Két jellemzővel az egyes betegek szigmoidkimenete háromdimenziós vektor, mert X három oszlopot tartalmaz.", "With two features, each patient's sigmoid prediction is a 3D vector because X has three columns."],
    ["100 beteg és két jellemző esetén θ dimenzióját a 100 tanítópélda száma határozza meg.", "For 100 patients with two features, θ length is determined by the 100 training examples."],
    ["A két laborérték a θ súlyokat adja, míg az X a tanulási rátát és a biast tartalmazza.", "The lab measurements define θ weights, while X stores the learning rate and bias."],
    ["A g(Xθ) alakja (100,3), mert a szigmoid a három paramétert külön kimenetté alakítja minden betegnél.", "g(Xθ) has shape (100,3) because sigmoid turns three parameters into separate outputs for each patient."]
  ],
  "mock-log-2": [
    ["A g(0)=1 értéket kapjuk, mert az exponenciális függvény 0-ban 1.", "g(0)=1 because the exponential function equals 1 at zero."],
    ["A szigmoid monoton csökken, ezért a pozitív z kisebb becsült pozitív osztályvalószínűséget ad.", "Sigmoid is decreasing, so larger positive z yields a smaller positive-class probability."],
    ["Két bemeneti jellemzőnél a z=0 döntési határ egy másodfokú görbe a 0,5-ös sigmoidküszöbnél.", "With two features the z=0 decision boundary is quadratic at a 0.5 sigmoid threshold."],
    ["h(x)=0,8 esetén a 0,5-ös küszöb 0-s címkét jelent, mert a becslés 1-nél kisebb.", "A probability estimate h(x)=0.8 predicts class 0 at threshold 0.5 because it is below 1."],
    ["Ha z>0, a szigmoid z értéke is pozitív, de 0,5-nél kisebb.", "For z>0 sigmoid is positive but smaller than 0.5."],
    ["A z=0 határ és a szigmoid valószínűségi felülete azonos kétdimenziós alakzat, mert mindkettő 0 és 1 közé esik.", "The z=0 boundary and full sigmoid probability surface are the same two-dimensional object because both are between 0 and 1."]
  ],
  "mock-log-3": [
    ["Ha y=1, a h=0,01 BCE-vesztesége kisebb, mint a h=0,99 becslésé, mert a logaritmus növekvő.", "For y=1 BCE is lower at h=0.01 than at h=0.99 because logarithm increases."],
    ["A BCE-ben −log(h) helyett (y−h)² szerepel, és a logaritmus csak a szigmoid definíciójához tartozik.", "BCE uses (y−h)² in place of −log(h); logarithms only appear in the sigmoid definition."],
    ["A BCE a helyes pozitív címkéhez közelítő becslésre nagyobb veszteséget ad, mint a biztosan hibás becslésre.", "BCE gives a higher loss to a prediction near the correct positive label than to a confident incorrect one."],
    ["y=1 esetén a BCE egyetlen példára −log(1−h) alakú, ezért a 0-hoz közelítő h-t jutalmazza.", "For y=1, BCE is −log(1−h) and therefore rewards h near zero."],
    ["y=0 esetén a BCE −log(h), ezért az 1-hez közelítő h adja a legkisebb veszteséget.", "For y=0, BCE is −log(h), so h close to one yields the smallest loss."],
    ["Az optimalizálás a BCE célfüggvényt a tanulási ráta csökkentésével maximalizálja, nem a súlyokkal minimalizálja.", "Training maximizes BCE by decreasing the learning rate rather than minimizing it through model parameters."]
  ]
};
