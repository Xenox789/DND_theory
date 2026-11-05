import type { FalsePair } from "./official";

export const mlpDistractors: Record<string, FalsePair[]> = {
  "mlp-q1": [["A neuron biasa minden bemeneti jellemzőt külön súlyoz, ezért nem önálló, hozzáadott konstans tag.", "A neuron's bias weights each input feature separately instead of being an added constant."]],
  "mlp-q2": [["Egyetlen szigmoid neuron nemlineáris aktivációja önmagában elegendő az XOR-osztályok lineáris elválaszthatóságának biztosítására.", "The nonlinear activation of a single sigmoid neuron is sufficient to make XOR classes linearly separable."]],
  "mlp-q3": [["Egy sűrű rétegben a kimeneti neuronok csak a velük azonos sorszámú bemeneti neuronnal állnak kapcsolatban.", "In a dense layer each output neuron connects only to the input with the same index."]],
  "mlp-q4": [["A k-adik réteg biasa a bemeneti réteg S_(k−1) méretéhez igazodik, nem a kimeneti neuronok S_k számához.", "The bias vector of layer k has length S_(k−1), rather than S_k."]],
  "mlp-q5": [["A 20→10 rétegben a paraméterek száma 20·10+1=201, mert a tíz neuron közös biast használ.", "A 20-to-10 layer has 20×10+1=201 parameters because all ten neurons share one bias."]],
  "mlp-q6": [["A 20→10→1 hálózat 220 paramétert tartalmaz, mert a kimeneti neuron biasa nem számít paraméternek.", "The 20→10→1 network has 220 parameters because the output bias is not counted."]],
  "mlp-q7": [
    ["A h(x)=g₂(W₁·g₁(W₂x+b₂)+b₁) alak a két réteg helyes számítási sorrendjét adja.", "h(x)=g₂(W₁·g₁(W₂x+b₂)+b₁) gives the correct two-layer computation order."],
    ["A két réteg biasait (b₁ és b₂) a hálózat nem taníthatja, csak a W₁ és W₂ súlymátrixokat.", "A two-layer network can only train W₁ and W₂; its biases b₁ and b₂ cannot be trained."]
  ],
  "mlp-q8": [["Folytonos regressziós kimenethez a rejtett réteg aktivációját is identitásfüggvényre kell cserélni.", "Continuous regression output also requires the hidden activation to be identity."]],
  "mlp-q9": [["Több, egymás után alkalmazott lineáris réteg köztes nemlinearitás nélkül is képes XOR-t reprezentálni.", "Several sequential linear layers can represent XOR even without intermediate nonlinearities."]],
  "mlp-q10": [["A sigmoid deriváltja g′(z)=g(z)², ezért a 0 körüli z tartományban is nagyon közel van a nullához.", "The sigmoid derivative is g′(z)=g(z)² and is therefore almost zero for z near 0."]],
  "mlp-q11": [["A tanh(0)=0,5, mivel a tanh a szigmoid középpontjára skálázza a nulla bemenetet.", "tanh(0)=0.5 because tanh maps zero to sigmoid's midpoint."]],
  "mlp-q12": [["ReLU esetén a pozitív bemeneti tartományban a lokális derivált 0, a negatív tartományban 1.", "ReLU has derivative 0 for positive inputs and 1 for negative inputs."]],
  "mlp-q13": [["Bináris osztályozásnál a két egymást kizáró címke miatt két identity kimenet és MSE az egyetlen értelmes választás.", "Binary classification with two exclusive classes requires two identity outputs and MSE as the only valid pairing."]],
  "mlp-q14": [["Tíz kizárólagos osztályt softmaxszal becsülő modell egyetlen kimeneti neuront igényel, mert a tíz valószínűség összege 1.", "A ten-class softmax classifier needs only one output neuron because the ten probabilities sum to one."]],
  "mlp-q15": [
    ["A softmax minden logitból külön szigmoidot képez, ezért a tíz kimenet összege nem szükségképpen 1.", "Softmax applies an independent sigmoid to each logit, so its ten output values need not sum to one."],
    ["A softmax azonos konstansnak minden logithoz adására megváltoztatja az osztályok becsült valószínűségeit.", "Adding the same constant to all logits changes their softmax class probabilities."]
  ],
  "mlp-q16": [
    ["One-hot y mellett a multiclass cross-entropy az összes hibás osztály logaritmusainak összegét bünteti, a helyes osztályét kihagyja.", "With one-hot y, multiclass cross-entropy penalizes log probabilities of incorrect classes while omitting the true class."],
    ["Egy tízosztályos CE-hez ugyanazt a kételemű [0,1] one-hot címkét használjuk, mint bináris esetben.", "A ten-class CE objective uses the same two-element one-hot vector [0,1] as a binary problem."]
  ],
  "mlp-q17": [["Két folytonos célérték becslése softmaxot igényel, hogy a két becslés 1-re összegeződjön.", "Predicting two continuous values requires softmax so the two estimates sum to one."]],
  "mlp-q18": [["Négyosztályos feladatnál az identity aktiváció + MSE a sigmoid/softmax nélkül szükségképpen ugyanazokat a valószínűségeket adja.", "For four-class classification identity activation with MSE must give the same probabilities as sigmoid or softmax."]],
  "mlp-q19": [["A 20→10→4 hálózatban a kimeneti réteg paraméterszáma 10·4+1=41, mert csak egy közös bias szükséges.", "The output layer of a 20→10→4 network has 10×4+1=41 parameters, using one shared bias."]],
  "mlp-q20": [["A nemkonvex MLP-veszteségnél a gradienscsökkentés minden inicializálásból ugyanahhoz a globális minimumhoz jut.", "For nonconvex MLP loss, gradient descent reaches the same global optimum from every initialization."]]
};

export const sgdDistractors: Record<string, FalsePair[]> = {
  "sgd-q1": [["Full-batch módban egy frissítés egyetlen véletlen tanítóminta gradienséből készül.", "In full-batch training each update is computed from one randomly chosen training sample."]],
  "sgd-q2": [["Mini-batch SGD esetén a paraméterek csak az epoch végén módosulnak, a batchenként kiszámolt gradiensek nem vezetnek frissítéshez.", "In mini-batch SGD, parameters change only once per epoch and no update follows individual batches."]],
  "sgd-q3": [
    ["Mini-batch SGD-ben minden frissítés ugyanúgy a teljes adathalmaz összes példájából számol gradienst.", "Every mini-batch SGD update computes the gradient over the entire training dataset."],
    ["Az SGD a sztochasztikus mintavétel ellenére sem használhat egynél több példát egy gradiensbecsléshez.", "Despite stochastic sampling, SGD cannot use more than one training example for a gradient estimate."]
  ],
  "sgd-q4": [["Kisebb batch esetén ugyanazon tanítóhalmaz feldolgozásakor kevesebb frissítés történik epochonként.", "With smaller batches, an epoch contains fewer parameter updates on the same dataset."]],
  "sgd-q5": [["Nagyobb batch esetén minden lépés gradiensbecslése várhatóan zajosabb, mert több adatpontot átlagolunk.", "Larger batches give noisier gradient estimates because more data points are averaged."]],
  "sgd-q6": [["A batchméret és a tanulási ráta független, mert az alpha kizárólag a validációs halmaz méretét jelenti.", "Batch size and learning rate are unrelated because alpha is only the validation set size."]],
  "sgd-q7": [["A batchméret növelése azonos modellnél arányosan csökkenti a köztes aktivációk GPU-memóriaigényét.", "Increasing batch size proportionally decreases GPU memory needed for intermediate activations."]],
  "sgd-q8": [
    ["A korai leállítás (early stopping) önálló gradiensalapú optimalizálóként az SGD, a momentum és az Adam közé tartozik.", "Early stopping is a standalone gradient optimizer in the same category as SGD, momentum and Adam."],
    ["A véletlen erdő (random forest) az előadásban az SGD momentumos módosításaként szerepel.", "A random forest is listed in the lecture as an SGD variant with momentum."]
  ],
  "sgd-q9": [["A paraméterfrissítéshez az optimizernek a θ helyett a valódi tesztcímkék alakját kell követnie.", "The optimizer updates parameters according to the test-label shape rather than the θ parameter shape."]]
};

export const backpropDistractors: Record<string, FalsePair[]> = {
  "bp-q1": [["A számítási gráf minden éle tanulható súly, és egyetlen adatfüggőségi él sem lehet rögzített művelet része.", "Every edge in a computational graph is a trainable weight, never a data-dependency edge."]],
  "bp-q2": [["Az összetett f(g(x)) függvény deriváltját f′(g(x))+g′(x) alakban kapjuk a láncszabály szerint.", "For f(g(x)), the chain rule gives f′(g(x))+g′(x)."]],
  "bp-q3": [["c=b² esetén grad_b=grad_c·2c, mert a négyzetes csomópont kimenetét deriváljuk.", "For c=b², grad_b=grad_c·2c because the square node output is differentiated."]],
  "bp-q4": [["c=a+b esetén a bejövő grad_c gradienst felezni kell a két bemenet között.", "For c=a+b the incoming gradient grad_c must be halved between the two inputs."]],
  "bp-q5": [["c=a·b esetén grad_a=grad_c·a és grad_b=grad_c·b, vagyis mindkét bemenet saját értékével szorzunk.", "For c=a·b, grad_a=grad_c·a and grad_b=grad_c·b, multiplying each input by its own value."]],
  "bp-q6": [["A backprop gyorsulása abból ered, hogy minden paraméterre teljesen külön, új forward és backward gráfot számolunk.", "Backprop is efficient because each parameter gets an entirely separate forward and backward graph computation."]],
  "bp-q7": [
    ["A forward pass szerint q=8 és ŷ=12, mert wx=3+2 helyett a modell szorzást használ.", "In the forward pass q=8 and ŷ=12 because the model multiplies instead of adding 3 and 2."],
    ["A J veszteség 5, mivel a (y−ŷ) különbséget négyzetre emelés nélkül vesszük.", "The loss J is 5 because the difference y−ŷ is not squared."]
  ],
  "bp-q8": [
    ["A w súly gradiensének értéke 10, mert a θ súly szerinti láncszabályból elhagyjuk az x=2 tényezőt.", "The gradient of w is 10 because the x=2 factor is omitted from the chain rule."],
    ["A z=y−ŷ összefüggésnél ∂J/∂ŷ=−10, mert ∂z/∂ŷ=+1.", "For z=y−ŷ, ∂J/∂ŷ=−10 because ∂z/∂ŷ=+1."]
  ],
  "bp-q9": [["A z=y−ŷ kapcsolatban ∂z/∂ŷ=+1, ezért a z és ŷ szerinti gradiens előjele azonos.", "In z=y−ŷ, ∂z/∂ŷ=+1, so gradients with respect to z and ŷ have the same sign."]],
  "bp-q10": [["A gradienscsökkentési lépés w_new=3+0.1·20=5, mert a gradiens irányába lépünk.", "The gradient-descent update gives w_new=3+0.1·20=5 because it moves along the gradient."]],
  "bp-q11": [["A backpropagation maga frissíti a súlyokat, és az optimalizálónak már nincs külön lépése.", "Backpropagation itself updates the weights, so the optimizer has no separate step."]],
  "bp-q12": [
    ["A teljes training cycle-ből elhagyható a loss, mert az optimizer a célfüggvény nélkül ugyanazt a gradienst számolja.", "The loss can be omitted from the training cycle because the optimizer computes the same gradients without an objective."],
    ["A gradiensfrissítés logikailag megelőzi a forward pass-t, mert a paraméterek aktuális előrejelzését csak utána tudjuk kiszámolni.", "The parameter update logically precedes the forward pass because only afterward can current predictions be computed."]
  ],
  "bp-q13": [["A loss.backward() a PyTorchban kiszámolja a paraméterek új súlyértékeit, ezért optimizer.step() felesleges.", "In PyTorch loss.backward() computes the updated parameter values, so optimizer.step() is unnecessary."]],
  "bp-q14": [["A backprop a teljes veszteséggradiensből előre haladva újra kiszámítja az inputot, deriváltak nélkül.", "Backprop moves forward from the loss to recompute the inputs without derivatives."]]
};
