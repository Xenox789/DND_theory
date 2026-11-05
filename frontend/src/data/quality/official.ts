/** Carefully authored, deliberately close but FALSE statements.
 * These are additions to the original bilingual question bank. Every false
 * proposition is tied to the same mathematical concept as its question.
 */
export type FalsePair = readonly [hu: string, en: string];
export const officialDistractors: Record<string, FalsePair[]> = {
  "official-q1": [["A hθ(x) függvény kiértékeléséhez a valódi y címke is kötelező bemenet.", "Evaluating hθ(x) requires the true label y as an additional input."]],
  "official-q2": [
    ["Egy szegmentációs maszk csak vektorként tárolható, kétdimenziós címkeként nem.", "A segmentation mask can only be stored as a vector, never as a two-dimensional target."],
    ["Ha y vektor, a teljes J(θ) veszteség is szükségképpen ugyanakkora vektor.", "If y is a vector, the total loss J(θ) must be a vector of the same length."]
  ],
  "official-q3": [["A tanítóminta (x, ŷ) párt tartalmaz, ahol ŷ a már betanított modell becslése, y nélkül.", "A supervised training pair is (x, ŷ), containing the model's prediction rather than the target y."]],
  "official-q4": [["A teljes J(θ) célfüggvény alakját mindig a mintánkénti y címke alakja határozza meg.", "The shape of the overall objective J(θ) must always match that of an individual label y."]],
  "official-q5": [["A jutalom (reward) azonos a felügyelt tanítás minden állapothoz megadott helyes akciócímkéjével.", "A reward is the same as the supervised target action label supplied for each state."]],
  "official-q6": [
    ["A klaszterezés (clustering) a kurzus példái között felügyelt tanulás, mert a csoportok száma megadható.", "Clustering is supervised learning in the course examples because the number of groups may be specified."],
    ["A dimenziócsökkentés (dimensionality reduction) egy előre megadott osztálycímkét becsül minden bemenetre.", "Dimensionality reduction predicts a predefined class label for each input."]
  ],
  "official-q7": [["A lineáris regresszió a kurzus szerint a szigmoidon át számol bináris osztályvalószínűséget.", "In the course, linear regression calculates binary class probabilities through sigmoid."]],
  "official-q8": [["A logisztikus regresszió hθ(x) kimenete a sigmoid előtt közvetlenül osztályvalószínűségként értelmezhető.", "The pre-sigmoid hθ(x) output in logistic regression can directly be interpreted as a class probability."]],
  "official-q9": [["A koleszterinszint folytonos célváltozója miatt a szigmoid+BCE páros az alapértelmezett veszteségválasztás.", "Because cholesterol is a continuous target, sigmoid+BCE is the default output and loss choice."]],
  "official-q10": [
    ["Az Xθ becslés alakja (200,5), mert X-nek öt oszlopa van.", "The prediction Xθ has shape (200,5) because X has five columns."],
    ["A koleszterinszintet az X ötödik jellemzőoszlopába kell tenni a bias helyett.", "Cholesterol targets belong in X's fifth feature column instead of the bias column."]
  ],
  "official-q11": [["Egyetlen beteg lineáris regressziós becslésének alakja kötelezően (200,), mert a tanítóhalmaz 200 soros.", "The linear prediction for one patient must have shape (200,) because the training set has 200 rows."]],
  "official-q12": [["Két bemeneti jellemző esetén a regressziós hipotézis 3D-ben egyenes, mert a kimenet egy skalár.", "With two input features the hypothesis is a line in 3D because the output is scalar."]],
  "official-q13": [
    ["Az XᵀX mátrix alakja (200,200), mert 200 betegünk van.", "XᵀX has shape (200,200) because the training dataset contains 200 patients."],
    ["Az egységmátrix I alakja (200,200) a regularizációs tagban.", "The identity matrix I has shape (200,200) in the regularization term."]
  ],
  "official-q14": [
    ["A konvexitás azt jelenti, hogy a lineáris MSE-veszteségnek több, eltérő értékű, szigorúan lokális minimuma van.", "Convexity means the linear MSE objective has several isolated local minima with different objective values."],
    ["A kis lépésméret önmagában bizonyítja a globális konvergenciát bármilyen nemkonvex veszteségnél is.", "A small step size alone guarantees global convergence even for any nonconvex objective."]
  ],
  "official-q15": [
    ["Az MLP vesztesége a lineáris regresszióéhoz hasonlóan minden súlyra együttesen konvex lesz, ha MSE-t használunk.", "Using MSE makes an MLP loss jointly convex in all weights, just as for linear regression."],
    ["A rejtett aktivációs függvény megválasztása nem befolyásolja a hálózat veszteségfelületét.", "The choice of hidden activation function does not affect the network's loss surface."]
  ],
  "official-q16": [["A standardizálás min és max értékkel skáláz, a min-max skálázás pedig átlaggal és szórással.", "Standardization uses min and max, while min-max scaling uses mean and standard deviation."]],
  "official-q17": [["Standardizáláskor μ az adott jellemző maximumát, σ pedig az átlagát jelenti.", "During standardization μ denotes the feature maximum and σ denotes its mean."]],
  "official-q18": [["A két laborvizsgálati jellemzőből történő betegségfelismeréshez 100 tanulható súly tartozik, mert 100 beteg van.", "Disease classification from two laboratory features requires 100 learnable weights because there are 100 patients."]],
  "official-q19": [
    ["A g(Xθ) alakja (100,3), mivel X-nek három oszlopa van.", "The output g(Xθ) has shape (100,3) because X has three columns."],
    ["A g(Xθ) minden komponense tetszőleges valós értéket vehet fel, a szigmoid nem korlátoz.", "Each component of g(Xθ) may take any real value without restriction from sigmoid."]
  ],
  "official-q20": [["A g(z) kimenete ugyanakkora tartományon mozog, mint a sigmoid előtti z: (−∞,+∞).", "The range of g(z) equals the unbounded range of pre-sigmoid z."]],
  "official-q21": [["A j index a modellezett jellemzőket jelöli, m pedig a paraméterek számát.", "Index j enumerates features, while m denotes the number of parameters."]],
  "official-q22": [["A 20→10→1 hálózat összes paramétere 210, mert a kimeneti rétegnek nincs külön súlya és biasa.", "The 20→10→1 network has 210 total parameters because the output layer has no additional weights or bias."]],
  "official-q23": [["A tanh és a sigmoid azonos (0,1) kimeneti tartományú, ezért ugyanazok a függvények.", "Tanh and sigmoid share the output range (0,1), so they are identical functions."]],
  "official-q24": [
    ["Ha ugyanazon tanítási adatok mellett csökkentjük a teszthalmaz méretét, a modell súlyainak száma is csökken.", "Reducing test-set size with unchanged training data also reduces the model's parameter count."],
    ["Kevesebb tanítópélda esetén a túlillesztés rendszerint kevésbé valószínű, mert a tanítandó minták egyszerűbbek.", "With fewer training samples, overfitting is generally less likely because the training examples are simpler."]
  ],
  "official-q25": [
    ["A korai leállítás optimális pontját a teszthalmaz alapján választjuk ki minden epoch végén.", "Early stopping selects the best epoch from the held-out test set after each epoch."],
    ["A validation loss tartós növekedése ellenére kötelező az utolsó epoch súlyait megtartani.", "Even when validation loss consistently increases, the last epoch's weights must be retained."]
  ],
  "official-q26": [["A learning rate és a rétegek száma ugyanúgy automatikusan tanult súly, mint a θ komponensei.", "Learning rate and layer count are automatically learned weights in the same way as components of θ."]],
  "official-q27": [
    ["Kisebb mini-batch használata ugyanannyi mintánál kevesebb paraméterfrissítést eredményez epochonként.", "A smaller mini-batch produces fewer parameter updates per epoch for the same dataset."],
    ["A nagyobb mini-batch kisebb GPU-aktivációs memóriát igényel azonos modell és mintaméret mellett.", "A larger mini-batch requires less GPU activation memory for the same model and sample size."]
  ],
  "official-q28": [],
  "official-q29": []
};
