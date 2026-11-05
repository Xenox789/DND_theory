export type Pair = readonly [hu: string, en: string];
export type SourceAnswer = { trueChoices: Pair[]; falseChoices: Pair[]; explanation: Pair };
export const lectureAnswers: Record<string, SourceAnswer> = {};

const p = (hu: string, en: string): Pair => [hu, en];
function add(ids: string, yes: Pair, no: Pair[], explanation: Pair = yes) {
  for (const id of ids.split(" ")) {
    if (lectureAnswers[id]) throw new Error("Duplicate source answer " + id);
    lectureAnswers[id] = { trueChoices: [yes], falseChoices: no, explanation };
  }
}
function options(ids: string, truth: Pair[], wrong: Pair[], explanation: Pair = truth[0]) {
  for (const id of ids.split(" ")) {
    if (lectureAnswers[id]) throw new Error("Duplicate source answer " + id);
    lectureAnswers[id] = { trueChoices: truth, falseChoices: wrong, explanation };
  }
}
function value(ids: string, correct: string, wrong: string[], descHu: string, descEn: string) {
  add(ids, p(correct,correct.replace(" vagy "," or ")), wrong.map(s=>p(s,s)), p(descHu,descEn));
}

// Lectures 1–6: direct responses to the document's question, not broad topical pools.
add("M001",p("A bemeneti x jellemzők és a modell θ paraméterei.","Input features x and model parameters θ."),
 [p("A becsült ŷ kimenet és a valódi y címke.","The prediction ŷ and true label y."),
  p("A tanulási ráta α és a teszthiba.","Learning rate α and test error."),
  p("Az egyes mintákhoz tartozó veszteségek J.","Per-example losses J.")]);
add("M002",p("A modell becslése, hθ(x)=ŷ.","The model prediction hθ(x)=ŷ."),
 [p("A valódi célérték y, függetlenül a modelltől.","The true target y, independent of the model."),
  p("A teljes tanítóhalmaz X mátrixa.","The full training matrix X."),
  p("A paraméterekre számított gradiens ∇θJ.","The parameter gradient ∇θJ.")]);
add("M003",p("A címke lehet skalár, vektor vagy mátrix a feladat szerint.","A target can be scalar, vector or matrix depending on the task."),
 [p("A címke mindig skalár, még szegmentáció esetén is.","A label must be scalar even in segmentation."),
  p("A címke kizárólag osztályazonosító lehet.","A label can only be a class identifier."),
  p("A címke alakja szükségképpen megegyezik θ alakjával.","A label must have the same shape as θ.")]);
add("M004",p("A bemeneti x és a valódi y címke párja.","A pair consisting of input x and true target y."),
 [p("Az x bemenet és az ŷ modellbecslés párja.","Input x paired with predicted ŷ."),
  p("A θ súlyok és a tanulási ráta párja.","Weights θ paired with learning rate."),
  p("A validation és test veszteségek párja.","Validation loss paired with test loss.")]);
add("M005",p("A becslés és a célérték közti eltérést számszerűsíti.","It measures disagreement between prediction and target."),
 [p("A bemeneti jellemzők számát határozza meg.","It determines the number of input features."),
  p("A modell paramétereinek számát változtatja meg.","It changes the number of trainable parameters."),
  p("A bemeneti X mátrix helyett a θ súlyokat tárolja.","It stores model weights in place of X.")]);
add("M006 M059",p("A teljes J(θ) célfüggvény értéke egy skalár.","The aggregated objective J(θ) is a scalar."),
 [p("J(θ) alakja azonos a θ vektor alakjával.","J(θ) has the same shape as θ."),
  p("J(θ) alakja mindig (m,).","J(θ) always has shape (m,)."),
  p("J(θ) egy teljes X-alakú mátrix.","J(θ) is a matrix matching X.")]);
add("M007",p("Környezeti jutalmat kapunk, ami lehet késleltetett; nem kapunk minden állapothoz helyes címkét.","We receive environmental rewards, possibly delayed, rather than a correct label for every state."),
 [p("Minden állapothoz a helyes akció címkéjét kapjuk, mint supervised learningben.","A correct action label is supplied for every state, as in supervised learning."),
  p("A jutalom helyett mindig a következő állapot teljes valódi osztályát kapjuk.","Instead of reward, we always get the true class of the next state."),
  p("A reward a modell összes súlyát tartalmazó vektor.","Reward is a vector containing every model weight.")]);
add("M008",p("Regresszió és osztályozás tipikusan felügyelt; klaszterezés és dimenziócsökkentés tipikusan felügyelet nélküli.","Regression and classification are typically supervised; clustering and dimensionality reduction typically unsupervised."),
 [p("A regresszió és klaszterezés mindig felügyelet nélküli, az osztályozás felügyelt.","Regression and clustering are always unsupervised, classification supervised."),
  p("Az osztályozás felügyelet nélküli, mert a modell osztályokat készít.","Classification is unsupervised because the model produces classes."),
  p("A klaszterezés felügyelt, mert a végén klaszterazonosítót ad.","Clustering is supervised because it outputs cluster IDs.")]);
add("M009",p("Regresszió: számérték; osztályozás: kategória; klaszterezés: csoportok; dimenziócsökkentés: tömörítés; denoising: zajcsökkentés.","Regression: numeric value; classification: class; clustering: groups; dimensionality reduction: compact features; denoising: noise removal."),
 [p("A regresszió címkézetlen klasztereket, a klaszterezés folytonos y célokat becsül.","Regression predicts unlabeled clusters; clustering predicts continuous y."),
  p("A dimenziócsökkentés csak új osztálycímkéket állít elő.","Dimensionality reduction only creates class labels."),
  p("A denoising kizárólag a zaj jelenlétének bináris osztályozása.","Denoising only binary-classifies whether noise is present.")]);
add("M010",p("A lineáris regresszió felügyelt regressziós módszer.","Linear regression is a supervised regression method."),
 [p("Felügyelet nélküli osztályozó módszer.","An unsupervised classification method."),
  p("Felügyelt klaszterezés, amely címkéket nem használ.","Supervised clustering that does not use labels."),
  p("Megerősítéses módszer, amely jutalmakból tanul.","A reinforcement-learning method trained from rewards.")]);
add("M011",p("A logisztikus regresszió felügyelt osztályozási módszer.","Logistic regression is a supervised classification method."),
 [p("Felügyelet nélküli dimenziócsökkentő módszer.","An unsupervised dimensionality reduction method."),
  p("Folytonos célértékhez használatos lineáris MSE-regresszió.","Linear MSE regression for continuous targets."),
  p("Környezeti jutalmakból tanuló RL-algoritmus.","An RL algorithm learning from environmental rewards.")]);
add("M012",p("Lineáris regresszió a folytonos koleszterinszinthez.","Linear regression for the continuous cholesterol level."),
 [p("Logisztikus regresszió, mert négy jellemző van.","Logistic regression because there are four features."),
  p("Klaszterezés, mert 200 betegből tanulunk.","Clustering because the dataset has 200 patients."),
  p("Bináris softmax osztályozás, mert a célérték laboreredmény.","Binary softmax classification because the target is a lab measurement.")]);
value("M013 M016 M030","5",["4","200","201","6","3"],"Négy jellemzőhöz négy súly és egy bias tartozik.","Four features yield four weights plus one intercept.");
add("M014",p("A négyzetes veszteség, például MSE, megfelelő választás.","A squared-error loss such as MSE is a suitable choice."),
 [p("Bináris keresztentrópia, mert a koleszterin folytonos érték.","Binary cross-entropy because cholesterol is continuous."),
  p("Csak softmax keresztentrópia, mert négy bemenetünk van.","Only softmax cross-entropy because there are four inputs."),
  p("A betegenkénti osztálycímkék 0–1 vesztesége.","A 0–1 loss on per-patient class labels.")]);
value("M015 M028","(200,5)",["(200,4)","(5,200)","(200,1)","(5,5)","(4,200)"],"200 sor, négy jellemzőoszlop és egy biasoszlop.","200 rows, four feature columns and one intercept column.");
value("M017","(200,) vagy (200,1)",["(200,5)","(5,200)","(5,1)","(1,5)","(200,200)"],"Egy skalárbecslés készül minden beteghez.","There is one scalar prediction per patient.");
add("M018 M024",p("A lineáris modell szigmoid nélkül bármely valós értéket becsülhet.","Without sigmoid, a linear model can predict any real value."),
 [p("A becslés 0 és 1 közé van korlátozva.","The prediction is restricted between 0 and 1."),
  p("Csak nemnegatív értéket adhat a modell.","The model can return only nonnegative values."),
  p("Csak egész számú osztálycímkét adhat.","It can only return integer class labels.")]);
add("M019 M025",p("A beteg életkora az X bemeneti jellemzői között szerepel.","Patient age is a feature stored in input X."),
 [p("A beteg életkora a θ tanulható súlyok egyike.","Patient age is one of the learnable weights θ."),
  p("Az életkor a y koleszterincélérték helyére kerül.","Age replaces the cholesterol target y."),
  p("Az életkort a J(θ) skalár veszteség tárolja.","The scalar loss J(θ) stores patient age.")]);
add("M020 M047",p("Nem: X rögzített tanítóadat; a θ paramétereket módosítjuk a veszteség csökkentéséhez.","No: X contains observed data; we update θ to reduce loss."),
 [p("Igen: a tanítás az X bemeneti értékeket optimalizálja, θ marad rögzített.","Yes: training optimizes X while holding θ fixed."),
  p("Igen: a cél az X összes elemét nullára csökkenteni.","Yes: the objective is to reduce every entry of X to zero."),
  p("Nem: semmilyen változó nem módosul tanítás közben.","No: no variable is modified during training.")]);
add("M021 M048",p("A J(θ) veszteséget minimalizáljuk a θ paraméterek változtatásával.","We minimize loss J(θ) by changing parameters θ."),
 [p("Közvetlenül az összes ŷ becslést minimalizáljuk, hogy nullát kapjunk.","We directly minimize every prediction ŷ toward zero."),
  p("A tanítóhalmaz X elemeit minimalizáljuk.","We minimize individual values of the training matrix X."),
  p("A cél az y valódi címkék csökkentése.","The aim is to decrease the true targets y.")]);
add("M022 M049",p("θ-t változtatjuk, de nem magának a θ vektornak az értékét minimalizáljuk: a cél J(θ).","We update θ, but minimize the objective J(θ), not θ itself."),
 [p("A paramétervektor elemeinek összegét minimalizáljuk, függetlenül a hibától.","We minimize the sum of parameters regardless of error."),
  p("A θ értékét nullázzuk, mert csak így csökken a veszteség.","We set θ to zero because this alone minimizes loss."),
  p("A tanítás az X-szel együtt θ-t is változatlanul hagyja.","Training leaves θ unchanged together with X.")]);
add("M023",p("Egy beteg egyetlen koleszterinbecslése skalár.","One patient's single cholesterol prediction is a scalar."),
 [p("Egy beteg becslése (200,) vektor, mert 200 tanítópélda van.","One prediction is a (200,) vector because training has 200 patients."),
  p("A becslés ötelemű vektor, mert öt paraméter van.","The prediction is a five-element vector because there are five parameters."),
  p("Egy beteg becslése (200,5) mátrix.","One patient's prediction is a (200,5) matrix.")]);
add("M026",p("Egyenes egy 2D koordinátarendszerben.","A line in a two-dimensional plot."),
 [p("Sík egy 2D koordinátarendszerben.","A plane in a 2D plot."),
  p("Parabola, mert bias is szerepel.","A parabola because the intercept is included."),
  p("Szigmoidgörbe lineáris modellnél.","A sigmoid curve for a linear model.")]);
add("M027",p("Sík a két bemenet és az egyetlen kimenet 3D terében.","A plane in 3D space of two inputs and one output."),
 [p("Egyetlen egyenes a 3D térben, mert a becslés skalár.","A single line in 3D because the output is scalar."),
  p("Paraboloid, mert két bemeneti változó van.","A paraboloid because there are two features."),
  p("Körfelület, mert négy paraméter szerepel.","A circular surface because there are four parameters.")]);
value("M029","(200,) vagy (200,1)",["(200,5)","(5,)","(4,)","(5,200)","(200,200)"],"A 200 tanítópélda mindegyikéhez egy célérték tartozik.","One target value is given for each of the 200 samples.");
add("M031",p("A koleszterinszinteket a célvektor y tárolja.","Cholesterol levels are stored in target vector y."),
 [p("A koleszterinszintek X biasoszlopában vannak.","Cholesterol values are in the bias column of X."),
  p("Minden beteg koleszterinszintje külön θ súly.","Every patient's cholesterol level is a θ weight."),
  p("A koleszterinszintek az X életkoroszlopába kerülnek.","Cholesterol values are placed in the age column of X.")]);
add("M032",p("I a paraméterdimenziójú egységmátrix, itt jellemzően 5×5.","I is the identity matrix in parameter space, here typically 5×5."),
 [p("I a 200 betegre épülő 200×200 távolságmátrix.","I is a 200×200 distance matrix for the patients."),
  p("I a tanítóadatok valódi y címkéinek mátrixa.","I is the matrix of true y labels."),
  p("I a szigmoid aktiváció függvénymátrixa.","I is the sigmoid activation matrix.")]);
add("M033",p("A lineáris legkisebb négyzetes veszteség konvex; megfelelő lépésméret és feltételek mellett GD globális minimumhoz közelíthet.","Linear least squares is convex; with appropriate step size and conditions, gradient descent can approach a global optimum."),
 [p("Globális optimum csak több rejtett ReLU réteg mellett garantált.","A global optimum is guaranteed only with several hidden ReLU layers."),
  p("A konvex MSE sok különböző értékű lokális minimumot tartalmaz.","Convex MSE contains local minima with different objective values."),
  p("Tetszőleges pozitív learning rate mindig konvergál.","Any positive learning rate always converges.")]);
add("M034",p("Nem: az MLP vesztesége általában nemkonvex, kis lépés önmagában nem garantál globális optimumot.","No: MLP objectives are generally nonconvex; a small step alone does not ensure a global optimum."),
 [p("Igen: az MSE használata minden MLP súly szerint konvexszé teszi a célt.","Yes: MSE makes the objective convex in all MLP weights."),
  p("Igen: bármilyen kis pozitív lépésből pontosan ugyanabba a θ minimumba jutunk.","Yes: every small positive step size reaches exactly the same θ minimum."),
  p("Igen: a rejtett rétegek száma nem befolyásolhatja a konvexitást.","Yes: hidden layers cannot affect convexity.")]);
add("M035",p("Az eltérő skálájú bemeneti jellemzők összehangolására és a tanulás megkönnyítésére.","To align feature scales and help optimization."),
 [p("A címkék véletlenszerű összekeverésére.","To randomly shuffle the labels."),
  p("A bemeneti jellemzők számának növelésére.","To increase the number of input features."),
  p("A gradiensek számításának teljes elhagyására.","To eliminate all gradient computations.")]);
add("M036",p("A gradienscsökkentés lassúbbá vagy instabilabbá válhat az eltérő jellemzőskálák miatt.","Gradient descent can become slow or unstable due to mismatched feature scales."),
 [p("A modell összes bemenete azonos skálájúvá válik magától.","All features automatically become equally scaled."),
  p("A tanítópéldák száma megváltozik.","The number of training samples changes."),
  p("Az adatmatrica szükségképpen transzponálódik.","The data matrix is necessarily transposed.")]);
add("M037",p("A standardizálás általában kevésbé érzékeny néhány szélső értékre, mint a min-max skálázás; egyik sem teljesen robusztus.","Standardization is generally less sensitive than min-max scaling to a few extreme values; neither is fully robust."),
 [p("A min-max skálázás mindig robusztusabb, mert a minimumot és maximumot használja.","Min-max scaling is always more robust because it uses the minimum and maximum."),
  p("Mindkét módszer teljesen érzéketlen az outlierekre.","Both methods are fully unaffected by outliers."),
  p("A standardizálás csak osztálycímkéknél alkalmazható.","Standardization only works for class labels.")]);
add("M038",p("Standardizálás: (x−μ)/σ, ahol μ az átlag és σ a szórás.","Standardization: (x−μ)/σ, where μ is the mean and σ the standard deviation."),
 [p("Standardizálás: (x−max)/(min−max), μ a maximum.","Standardization: (x−max)/(min−max), μ is the maximum."),
  p("Min-max: (x−μ)/σ, mert μ a minimum.","Min-max: (x−μ)/σ because μ denotes the minimum."),
  p("A σ az adatok számát, μ pedig a jellemződimenziót jelenti.","σ denotes sample count and μ the feature dimension.")]);
add("M039",p("Logisztikus regresszió, mert a cél beteg/egészséges bináris osztály.","Logistic regression because disease status is a binary class."),
 [p("Lineáris MSE-regresszió, mert két laborérték szerepel.","Linear MSE regression because there are two lab features."),
  p("Klaszterezés, mert 100 beteg adata szerepel.","Clustering because there are 100 patients."),
  p("Dimenziócsökkentés, mert két jellemzőből egy címkét kapunk.","Dimensionality reduction because two features yield one label.")]);
add("M040",p("Három paraméter: két jellemzősúly és egy bias.","Three parameters: two feature weights and one bias."),
 [p("Két paraméter: az x₀=1 intercepthez nem kell θ₀.","Two parameters: x₀=1 needs no θ₀."),
  p("Száz paraméter: minden beteghez egy súlyt tanulunk.","One hundred parameters: one weight per patient."),
  p("Négy paraméter: a betegségcímke is külön tanulható súly.","Four parameters: the disease label adds one trainable weight."),
  p("Hat paraméter: betegenként három súlyt tanítunk osztályonként.","Six parameters: three weights per class for each patient.")],
 p("A paraméterdimenzió a jellemzők számától és a biastól függ, nem a betegek számától.","Parameter count depends on features and intercept, not patient count."));
add("M041",p("Bináris keresztentrópia (binary cross-entropy, BCE).","Binary cross-entropy (BCE)."),
 [p("Általában normálegyenletből kapott MSE, mert a cél 0 vagy 1.","Ordinary normal-equation MSE because the target is 0 or 1."),
  p("A teljes bemeneti X mátrix Frobenius-normája.","The Frobenius norm of the input matrix X."),
  p("A softmax-aktiváció önmagában veszteségfüggvényként.","The softmax activation used as a loss on its own.")]);
value("M042","(100,3)",["(100,2)","(3,100)","(100,1)","(3,1)","(2,100)"],"100 beteg, két laborjellemző és x₀=1 biasoszlop.","100 patients, two lab features and an x₀=1 intercept column.");
value("M043","(3,) vagy (3,1)",["(100,3)","(100,)","(2,)","(1,100)","(100,1)"],"θ három elemből áll: bias és két feature weight.","θ has three entries: the intercept and two feature weights.");
value("M044","(100,) vagy (100,1)",["(100,3)","(3,100)","(3,)","(100,2)","(2,1)"],"A sigmoid egy becslést állít elő minden beteghez.","Sigmoid produces one prediction per patient.");
add("M045 M054",p("A sigmoid kimenete véges bemenetre szigorúan 0 és 1 közé esik.","For finite input, sigmoid outputs strictly between 0 and 1."),
 [p("A sigmoid tetszőleges negatív számot is kiadhat.","Sigmoid can output any negative number."),
  p("A sigmoid kimenete a teljes valós számegyenes.","Sigmoid output covers the entire real line."),
  p("A sigmoid csak pontosan 0 vagy 1 értéket ad.","Sigmoid outputs only exactly 0 or 1.")]);
add("M046 M055",p("A laborértékek X bemeneti adatok, nem a tanulható θ paraméterek.","Lab values are input features in X, not learnable θ parameters."),
 [p("A laborértékeket θ tárolja, X a becslések vektora.","Lab values are stored in θ while X contains predictions."),
  p("A laborértékeket y tárolja, θ a beteg/egészséges címke.","Lab values are stored in y while θ is the disease label."),
  p("A laborértékek J(θ) elemei, amelyek minden iterációban változnak.","Lab values are entries of J(θ), changing each iteration.")]);
add("M050",p("Nem: a g szigmoidfüggvényt alkalmazzuk; a J(θ) veszteséget minimalizáljuk.","No: g is the sigmoid used in the model; we minimize J(θ)."),
 [p("Igen: a tanítás a sigmoid függvény definícióját változtatja.","Yes: training alters sigmoid's mathematical definition."),
  p("Igen: a sigmoid minden kimenetét nullára csökkentjük.","Yes: we minimize each sigmoid output to zero."),
  p("A sigmoid paramétereit a teljes X mátrix helyett optimalizáljuk.","We optimize sigmoid's own parameters in place of X.")]);
add("M051",p("A J(θ) veszteség, bináris osztályozásnál gyakran BCE.","Loss J(θ), commonly BCE for binary classification."),
 [p("A g szigmoid függvény meredeksége az összes z-re összegezve.","The sigmoid function's slope summed over all z."),
  p("A paraméterek számát jelölő 3-as egész érték.","The integer 3 representing parameter count."),
  p("A laborjellemzőkből álló X adatmátrix.","Input matrix X of lab values.")]);
add("M052",p("Egy beteghez egy skalár osztályvalószínűség tartozik.","One patient receives one scalar class probability."),
 [p("Minden beteghez háromdimenziós kimeneti vektor tartozik θ miatt.","Each patient has a three-element prediction because θ has length three."),
  p("Egy beteg kimenete a 100 elemű teljes y címkevektor.","One patient's output is the entire 100-element y vector."),
  p("Egyetlen beteg becslése (100,3) mátrix.","A single-patient output is a (100,3) matrix.")]);
add("M053",p("A szigmoid előtti lineáris z pontszám tetszőleges valós szám lehet.","The pre-sigmoid score z can be any real number."),
 [p("z csak a (0,1) tartományban lehet.","z must be in (0,1)."),
  p("z csak 0 és 1 egész szám lehet.","z must be exactly 0 or 1."),
  p("z csak nemnegatív lehet a sigmoid miatt.","z cannot be negative because sigmoid is used.")]);
add("M056",p("Az MSE elsősorban folytonos regressziós célértékekhez illik.","MSE is primarily suited to continuous regression targets."),
 [p("Az MSE-t kifejezetten többosztályos softmax-logitokra tervezték.","MSE is specifically designed for multiclass softmax logits."),
  p("Az MSE a bináris keresztentrópia másik neve.","MSE is another name for binary cross-entropy."),
  p("Az MSE csak címkézetlen klaszterezéshez használható.","MSE can only be used for unlabeled clustering.")]);
add("M057",p("A j index a tanítópéldákon fut végig a mintánkénti veszteség összegében.","Index j enumerates training examples in the per-example loss sum."),
 [p("j a θ modellparaméterek számát jelöli.","j denotes the number of model parameters."),
  p("j az egyes aktivációfüggvények típusait azonosítja.","j identifies activation-function types."),
  p("j a tanulási ráta lépéseit indexeli.","j indexes learning-rate steps.")]);
add("M058",p("m a tanítópéldák számát jelöli a veszteség átlagolásakor.","m denotes the number of training examples averaged in the loss."),
 [p("m az egyetlen bemenet jellemzőinek számát jelöli.","m denotes the number of features in one input."),
  p("m a kimeneti osztályok száma minden regressziós modellben.","m denotes the number of output classes in all regression models."),
  p("m a bias változó értéke.","m is the bias value.")]);
value("M060","221",["210","220","211","231","41"],"Az első réteg 20×10+10=210, a második 10×1+1=11 paraméter; összesen 221.","First layer: 20×10+10=210; output layer: 10×1+1=11, total 221.");
value("M061","210",["200","201","211","221","11"],"20×10 súly és 10 bias van az első rétegben.","The first layer contains 20×10 weights plus 10 biases.");
add("M062",p("Nem: a rejtett g₁ aktiváció szükséges lehet a nemlineáris leképezéshez regressziónál is.","No: hidden activation g₁ can provide essential nonlinear modeling even for regression."),
 [p("Igen: minden regressziós hálózatban minden aktivációt el kell hagyni.","Yes: every regression network must omit every activation."),
  p("Igen: g₁ a true labelt helyettesíti, ezért regresszióban nem használható.","Yes: g₁ replaces the target label so it cannot be used in regression."),
  p("Nem: g₁ aktiváció csak softmax lehet.","No: g₁ must be softmax.")]);
add("M063",p("Folytonos, nem korlátozott kimenethez gyakran identitás (lineáris) g₂ aktiváció illik.","For an unrestricted continuous output, identity (linear) g₂ is often appropriate."),
 [p("A g₂ kötelezően softmax, mert egyetlen kimenet van.","g₂ must be softmax because there is one output."),
  p("A g₂ kötelezően sigmoid, mert az MSE csak 0–1 között értelmezhető.","g₂ must be sigmoid because MSE only works in 0–1."),
  p("A g₂ kötelezően argmax, mert egyetlen szám a cél.","g₂ must be argmax because the target is a single number.")]);
add("M064",p("Nem: a sigmoid csak 0–1 közötti becslést ad, a folytonos koleszterinértékhez ez általában nem megfelelő.","No: sigmoid restricts predictions to (0,1), usually inappropriate for unconstrained cholesterol values."),
 [p("Igen: a sigmoid önmagában garantálja a tetszőleges koleszterinszint becslését.","Yes: sigmoid itself permits arbitrary cholesterol levels."),
  p("Igen: az MSE kimeneti aktivációja mindig sigmoid.","Yes: MSE always requires sigmoid output."),
  p("Igen: a tíz rejtett neuron miatt a kimenet 0–1 tartományú.","Yes: ten hidden neurons force the output into (0,1).")]);
add("M065",p("Igen: ugyanazon modellnél kevesebb tanítóminta gyakran növeli a túlillesztés kockázatát.","Yes: fewer training examples often increase overfitting risk for the same model."),
 [p("Nem: a tanítóminták csökkenése a modell paraméterszámát is csökkenti.","No: fewer training samples also reduce parameter count."),
  p("Nem: az overfitting csak a teszthalmaz méretétől függ.","No: overfitting depends only on test-set size."),
  p("Igen: kevesebb tanítóminta automatikusan több tanulható súlyt hoz létre.","Yes: fewer examples automatically create more learnable weights.")]);
add("M066",p("Nem közvetlenül: a tesztadatok száma az értékelés bizonytalanságát érinti, nem a tanítás túlillesztését.","Not directly: test-set size affects evaluation uncertainty, not how the model fits training data."),
 [p("Igen: kevesebb tesztminta növeli a hálózat paramétereinek számát.","Yes: fewer test samples increase the network's parameter count."),
  p("Igen: a teszthalmaz minden gradienslépés része, így a csökkenés túlilleszt.","Yes: the test set contributes to each training gradient, so reducing it causes overfitting."),
  p("Nem: a teszthalmaz mindig tökéletesen becsli a generalizációt, mérettől függetlenül.","No: the test set always perfectly estimates generalization, regardless of size.")]);
add("M067",p("Több megfelelő tanítópélda általában csökkenti a túlillesztés kockázatát.","More relevant training examples generally reduce overfitting risk."),
 [p("Több tanítóminta megváltoztatja θ dimenzióját, ezért a kockázat nő.","More samples change the dimension of θ, increasing overfitting risk."),
  p("Több tanítóminta mindig a validation loss növekedését okozza.","More training data always increases validation loss."),
  p("Több tanítóminta kizárólag az értékelési bizonytalanságot befolyásolja.","More training data affects only evaluation uncertainty.")]);
add("M068",p("Kevesebb modellparaméter gyakran mérsékli a túlillesztést, de túl kevés kapacitás alulillesztéshez vezethet.","Fewer parameters often reduce overfitting, though too little capacity can cause underfitting."),
 [p("Kevesebb paraméter mindig erősebb overfittinget okoz.","Fewer parameters always increase overfitting."),
  p("A paraméterszám csak a teszthalmaz méretét határozza meg.","Parameter count only determines test-set size."),
  p("A paraméterek csökkentése közvetlenül címkéket generál.","Reducing parameters directly generates training labels.")]);
add("M069",p("Több paraméter növelheti a túlillesztés kockázatát változatlan adatmennyiségnél.","More parameters can increase overfitting risk when data size is unchanged."),
 [p("Több paraméter minden esetben javítja a generalizációt.","More parameters always improve generalization."),
  p("Több paraméter egyenlő több tanítópéldával.","More parameters are the same as more training examples."),
  p("A paraméterek számát csak a test adatok határozzák meg.","The number of parameters is determined only by test data.")]);
add("M070",p("Az early stopping megakadályozhatja a túlillesztést a validációs teljesítmény figyelésével.","Early stopping can limit overfitting by monitoring validation performance."),
 [p("A legnagyobb training loss epochját választja ki.","It chooses the epoch with the highest training loss."),
  p("A test loss többszöri hangolásával állítja be az összes súlyt.","It tunes all weights via repeated test-set evaluation."),
  p("Csak a tanulási rátát nullázza a tanítás elején.","It just sets the learning rate to zero at initialization.")]);
add("M071",p("Amikor a validációs veszteség tartósan nem javul (például patience után).","When validation loss stops improving for a while (e.g. patience)."),
 [p("Amikor a training loss először csökken.","When training loss first decreases."),
  p("Amikor a tesztadatokon az utolsó epoch a legjobb.","When the final epoch is best on test data."),
  p("Pontosan az első mini-batch után, függetlenül a loss-tól.","Exactly after the first mini-batch regardless of loss.")]);
add("M072",p("Nem: az early stopping általában a validation loss változását figyeli, nem csak a training loss-t.","No: early stopping typically monitors validation loss, not training loss alone."),
 [p("Igen: ha training loss nő, a validation loss-nak is nőnie kell.","Yes: rising training loss implies validation loss must also rise."),
  p("Igen: az early stopping kizárólag a training loss lokális meredekségét méri.","Yes: early stopping uses only the local slope of training loss."),
  p("Nem: a validation halmazt training gradient számítására tartjuk fent.","No: validation data is reserved for computing training gradients.")]);
add("M073",p("Igen: csökkenő training loss mellett növekvő validation loss a romló általánosítás jele lehet.","Yes: decreasing training loss with increasing validation loss can indicate growing overfitting."),
 [p("Nem: a két görbe eltérése bizonyítja, hogy egyre jobb a generalizáció.","No: diverging curves prove improving generalization."),
  p("Nem: validációs veszteség nem hasonlítható össze tanításival.","No: validation loss cannot be compared with training loss."),
  p("Igen: ez a jelenség az alulillesztés biztos definíciója.","Yes: this is the defining sign of underfitting.")]);
add("M074",p("Igen: a hálózat tanulható súlyait gyakran gradiensalapú módszerrel, például SGD-vel tanítjuk.","Yes: learnable network weights are commonly optimized by gradient-based methods such as SGD."),
 [p("Nem: az SGD csak hiperparaméterekhez használható.","No: SGD is used only for hyperparameters."),
  p("Nem: SGD nem számolhat loss-gradienst.","No: SGD cannot compute loss gradients."),
  p("Igen: SGD a tanítóminták x értékeit tanítja, θ marad rögzített.","Yes: SGD learns training inputs x while θ stays fixed.")]);
add("M075",p("Nem jellemző: a learning rate és az architektúra általában hiperparaméter, nem közvetlen SGD-súly.","Not usually: learning rate and architecture are hyperparameters, not directly SGD-trained weights."),
 [p("Igen: a learning rate ugyanúgy ∂J/∂θ gradiensből frissül minden SGD-lépésben.","Yes: learning rate is updated by ∂J/∂θ in every SGD step."),
  p("Igen: a rétegek száma közvetlen súly a θ vektorban.","Yes: layer count is a direct weight in θ."),
  p("Nem: minden neuronparaméter hiperparaméter is egyben.","No: every neuron weight is a hyperparameter.")]);
add("M076",p("Szigorú értelemben SGD egy mintát használ, mini-batch SGD viszont több mintát is egy frissítéshez.","Strict SGD uses one example, but mini-batch SGD uses multiple examples per update."),
 [p("SGD csak a teljes tanítóhalmazon számolhat gradienst.","SGD requires the entire training dataset for each update."),
  p("Mini-batch SGD egyetlen epochban kizárólag egyetlen frissítést végez.","Mini-batch SGD performs only one update per epoch."),
  p("Az SGD-ben az egy példa a súlyok számát, nem a batchméretet jelöli.","In SGD, 'one example' refers to weight count, not batch size.")]);
add("M077",p("Nagyobb batch: epochonként kevesebb frissítés, rendszerint kisebb mintavételi zaj és nagyobb aktivációs memória.","Larger batches: fewer updates per epoch, often lower sampling noise and higher activation-memory use."),
 [p("Nagyobb batch: több frissítés epochonként és alacsonyabb aktivációs memória.","Larger batches: more updates per epoch and lower activation-memory use."),
  p("Nagyobb batch: változatlan frissítésszám, de minden gradient becslés zajosabb.","Larger batches: same update count but each estimate is noisier."),
  p("Nagyobb batch: automatikusan kevesebb tanulható paraméter.","Larger batches: automatically fewer trainable parameters.")]);
add("M078",p("Kisebb batch: epochonként több frissítés, rendszerint zajosabb gradiens és kisebb batch-memória.","Smaller batches: more updates per epoch, often noisier gradients and lower batch-memory use."),
 [p("Kisebb batch: kevesebb frissítés és kisebb mintavételi zaj.","Smaller batches: fewer updates and lower sampling noise."),
  p("Kisebb batch: teljes adathalmazból számított pontos gradienst ad.","Smaller batches: exact gradient computed from all data."),
  p("Kisebb batch: automatikusan több tanulható súlyt hoz létre.","Smaller batches: automatically creates more model weights.")]);
add("M079",p("grad_b = grad_c · 2b, mert ∂(b²)/∂b=2b.","grad_b = grad_c · 2b because ∂(b²)/∂b=2b."),
 [p("grad_b = grad_c · 2c.","grad_b = grad_c · 2c."),
  p("grad_b = grad_c · c².","grad_b = grad_c · c²."),
  p("grad_b = grad_c.","grad_b = grad_c.")]);
add("M080",p("grad_a = grad_b = grad_c, mert ∂(a+b)/∂a=∂(a+b)/∂b=1.","grad_a = grad_b = grad_c because both local derivatives of a+b equal 1."),
 [p("grad_a = grad_c + b és grad_b = grad_c + a.","grad_a = grad_c + b and grad_b = grad_c + a."),
  p("grad_a = grad_c + a és grad_b = grad_c + b.","grad_a = grad_c + a and grad_b = grad_c + b."),
  p("grad_a = grad_c/2 és grad_b = grad_c/2.","grad_a = grad_c/2 and grad_b = grad_c/2.")]);

// Multiple independently correct statements are intentionally present in
// selected questions. The official format may have more than one true answer.
function extraTrue(ids:string, hu:string, en:string) {
 for(const id of ids.split(" ")) {
  const answer=lectureAnswers[id];
  if(!answer)throw Error("Unknown question for extra true option: "+id);
  answer.trueChoices.push(p(hu,en));
 }
}
extraTrue("M003","A szegmentáció címkéje például kétdimenziós maszk lehet.","A segmentation target can be a two-dimensional mask.");
extraTrue("M006 M059","A veszteség lehet skalár akkor is, ha az egyes y címkék vektorok.","The aggregated loss can be scalar even when individual targets y are vectors.");
extraTrue("M013 M016 M030","A bias miatt θ₀,θ₁,θ₂,θ₃,θ₄ szerepel.","Including the bias gives parameters θ₀,θ₁,θ₂,θ₃,θ₄.");
extraTrue("M015 M028","Az X minden sora egy beteghez tartozik, és a biasoszloppal öt értéket tartalmaz.","Each row of X corresponds to one patient and contains five values including intercept.");
extraTrue("M017","Az Xθ szorzat betegként egy-egy regressziós becslést tartalmaz.","The product Xθ contains one regression prediction per patient.");
extraTrue("M020 M047","Az optimalizációs cél J(θ), nem az X megváltoztatása.","The training objective is J(θ), not altering observed X.");
extraTrue("M026","Egyváltozós lineáris regresszióban θ₁ a meredekség, θ₀ az y-tengelymetszet.","For one-feature linear regression θ₁ is slope, θ₀ is intercept.");
extraTrue("M027","A két független bemenet és a skalár kimenet együtt három koordinátatengelyt ad.","Two independent inputs and the scalar output give three coordinate axes.");
extraTrue("M032","Az I mérete a θ paramétertér dimenziójához illeszkedik.","I is dimensioned to match the parameter space of θ.");
extraTrue("M033","Konvex legkisebb négyzeteknél nincs eltérő értékű, szigorú lokális minimum.","Convex least squares has no strict suboptimal local minimum.");
extraTrue("M035","A skálázás csökkentheti a különböző jellemzőnagyságrendek miatti optimalizálási nehézségeket.","Scaling can reduce optimization difficulties caused by vastly different feature magnitudes.");
extraTrue("M039","A modell egy betegséghez tartozó 0/1 címkét céloz, nem folytonos laborértéket.","The task predicts a binary illness label, not a continuous laboratory measurement.");
extraTrue("M040","A modell súlyvektora θ=(θ₀,θ₁,θ₂), hossza 3.","The model parameter vector θ=(θ₀,θ₁,θ₂) has length 3.");
extraTrue("M041","A BCE a valódi 0/1 címkét és az 1-es osztály becsült valószínűségét hasonlítja.","BCE uses the true 0/1 target and the estimated positive-class probability.");
extraTrue("M042","X száz sorból és három oszlopból áll az x₀=1 oszloppal együtt.","X has 100 rows and three columns including the x₀=1 intercept.");
extraTrue("M043","A θ₀ bias és a két laborjellemző súlya három tanulható skalár.","The bias θ₀ and two feature weights are three trainable scalars.");
extraTrue("M044","A g(Xθ) minden beteghez egy 0 és 1 közötti becslést rendel.","g(Xθ) assigns one value between 0 and 1 to each patient.");
extraTrue("M045 M054","A szigmoid g(0)=0,5 értéket ad.","Sigmoid evaluates to g(0)=0.5.");
extraTrue("M050","A θ paraméterek a sigmoid alapfüggvényének megváltoztatása nélkül tanulnak.","Parameters θ are learned without changing the sigmoid function itself.");
extraTrue("M060","A két réteg paraméterszáma külön-külön 210 és 11.","The two layers have 210 and 11 parameters respectively.");
extraTrue("M061","Az első rétegben 200 kapcsolati súly és 10 külön bias található.","The first layer contains 200 connection weights and 10 biases.");
extraTrue("M062","A rejtett nemlinearitás regressziós cél esetén is növelheti a modell kifejezőképességét.","A hidden nonlinearity can increase model expressiveness even for regression.");
extraTrue("M065","A modellparaméterek száma ugyanannyi marad, ha csak a tanítópéldák számát csökkentjük.","Changing only training sample count does not change the number of model parameters.");
extraTrue("M066","A kisebb teszthalmaz bizonytalanabb becslést adhat a generalizációs hibára.","A smaller test set may give a less precise estimate of generalization error.");
extraTrue("M067","Ha csak a train halmaz mérete nő, a hálózat súlyainak száma ettől még nem változik.","Increasing only training-set size does not change the network's parameter count.");
extraTrue("M069","Változatlan adatmennyiség mellett több paraméter nagyobb modellkapacitást jelenthet.","With fixed data quantity, more parameters can increase model capacity.");
extraTrue("M070","Az early stopping a validation loss értékelésével is meghatározhatja a leállítás idejét.","Early stopping can use validation loss to choose when to stop.");
extraTrue("M073","A training loss javulása nem garantálja a validation loss javulását.","Improved training loss does not guarantee improved validation loss.");
extraTrue("M076","A full-batch GD egy frissítéshez az összes tanítómintát használja.","Full-batch GD uses every training example for each update.");
extraTrue("M077","A nagyobb batch általában csökkenti a gradiensbecslés mintavételi zaját.","A larger batch generally reduces gradient sampling noise.");
extraTrue("M077","A nagyobb batch gyakran több GPU-aktivációs memóriát igényel.","A larger batch often requires more GPU activation memory.");
extraTrue("M078","A kisebb batch gyakran több frissítést eredményez epochonként.","A smaller batch often produces more updates per epoch.");
extraTrue("M078","A kisebb batch miatt a gradiensbecslés mintavételi varianciája nőhet.","The gradient-estimate variance can increase with a smaller batch.");
extraTrue("M079","A négyzetes csomópont lokális deriváltja ∂c/∂b=2b.","The local derivative of the square node is ∂c/∂b=2b.");
extraTrue("M080","Az összeadás lokális deriváltja a és b szerint is 1.","For addition, both local derivatives with respect to a and b equal 1.");

const expected = Array.from({length:80},(_,i)=>"M"+String(i+1).padStart(3,"0"));
for(const id of expected)if(!lectureAnswers[id])throw new Error("Missing exact source question "+id);
if(Object.keys(lectureAnswers).length!==80)throw new Error("Extra source question!");
