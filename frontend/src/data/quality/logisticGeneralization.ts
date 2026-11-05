import type { FalsePair } from "./official";

export const logisticDistractors: Record<string, FalsePair[]> = {
  "log-q1": [["A logisztikus regresszióban a szigmoid előtt kapott z értéket kezeljük a 0–1 közé eső osztályvalószínűségként.", "In logistic regression, the pre-sigmoid score z itself is treated as a class probability between 0 and 1."]],
  "log-q2": [["A szigmoid függvény szimmetriája miatt g(z)=g(−z) minden valós z-re.", "Because of sigmoid symmetry, g(z)=g(−z) for every real z."]],
  "log-q3": [["A g(Xθ) kimenetének alakja a θ-paraméterek alakjával egyezik meg, nem a minták számától függ.", "The output g(Xθ) matches the shape of θ rather than the number of examples."]],
  "log-q4": [["A 0,5-ös küszöbnél negatív z esetén a modell az 1-es osztályt választja, mert g(z) kisebb mint 0,5.", "With a 0.5 threshold a negative z predicts class 1 because g(z) is less than 0.5."]],
  "log-q5": [["Két bemeneti jellemzőnél a szigmoid által adott teljes valószínűségi felület azonos a lineáris döntési határral.", "With two features the full sigmoid probability surface is identical to the linear decision boundary."]],
  "log-q6": [["100 beteg és két laborjellemző esetén a θ gradiensének alakja (100,3), mert az X is 100 soros.", "For 100 patients and two laboratory features, the θ gradient has shape (100,3) since X has 100 rows."]],
  "log-q7": [["Egyetlen beteg logisztikus modelljének bemenete kötelezően mind a 100 tanítópélda laborértékét tartalmazza.", "A single-patient logistic model input must contain the laboratory measurements of all 100 training examples."]],
  "log-q8": [["A bináris keresztentrópia egy helyes y=1 példánál a −log(1−h) tagot minimalizálja.", "For a positive y=1 example binary cross-entropy minimizes the term −log(1−h)."]],
  "log-q9": [["y=1 esetén a BCE az egy példára jutó becslésre −log(1−h) alakú.", "For y=1 the per-example BCE takes the form −log(1−h)."]],
  "log-q10": [["y=0 esetén a BCE az egy példára jutó becslésre −log(h) alakú.", "For y=0 the per-example BCE takes the form −log(h)."]],
  "log-q12": [["A logisztikus veszteség θ szerinti gradiense 100 adatpontnál kötelezően 100 elemű, függetlenül a paraméterek számától.", "For logistic loss over 100 examples the gradient with respect to θ must contain 100 values regardless of parameter count."]],
  "log-q13": [
    ["Ha egy modell két folytonos célértéket jósol, automatikusan a softmax + keresztentrópia párosra van szükség.", "Predicting two continuous targets automatically requires softmax with cross-entropy."],
    ["A sigmoid kimenettel számolt bináris osztályozásnál a veszteségnek a szigmoid előtti z értéket kell MSE-vel illesztenie a 0/1 címkéhez.", "For binary sigmoid classification, the loss should fit pre-sigmoid z to the 0/1 target using MSE."]
  ],
  "log-q14": [["Ha hθ(x)=0,82, a 0,5-ös küszöbnél a kimeneti osztálycímke maga a 0,82 valós szám.", "If hθ(x)=0.82, then at threshold 0.5 the predicted class label is the real number 0.82."]]
};

export const generalizationDistractors: Record<string, FalsePair[]> = {
  "gen-q1": [["A validation adatpontoknak is minden mini-batch gradiensébe bele kell kerülniük, különben nem tudunk hiperparamétert választani.", "Validation examples must be included in every mini-batch gradient or hyperparameter selection is impossible."]],
  "gen-q2": [["Az alulillesztés jellemző jele, hogy a training loss nagyon alacsony, de a validation loss nagyságrendekkel magasabb.", "Underfitting is characterized by very low training loss and much higher validation loss."]],
  "gen-q3": [["Túlillesztéskor a validation veszteség növekedése szükségszerűen a tanítási veszteség növekedésével jár együtt.", "When overfitting occurs, rising validation loss must be accompanied by rising training loss."]],
  "gen-q4": [["A tanítóminták csökkentésével a hálózat paramétereinek száma is csökken, ezért az overfit kockázata automatikusan mérséklődik.", "Reducing training samples also reduces the network's parameter count, automatically lowering overfitting risk."]],
  "gen-q5": [["Ha csak a teszthalmazból hagyunk el adatpontokat, a már rögzített θ súlyokhoz tartozó train loss is biztosan más értékű lesz.", "Removing examples solely from the test set necessarily changes training loss for already fixed θ weights."]],
  "gen-q6": [
    ["A modellparaméterek számának növelése azonos tanítóadat mellett általában csökkenti az overfit kockázatát.", "Increasing parameter count with unchanged training data generally decreases overfitting risk."],
    ["A korai leállítás azt jelenti, hogy a legkisebb training loss után még addig tanítunk, amíg a teszthalmaz eredménye tovább javul.", "Early stopping means continuing past the lowest training loss until the test-set score stops improving."]
  ],
  "gen-q7": [["Erősen alulillesztett modellnél az L2-büntetés korlátlan növelése növeli a modell kifejezőképességét.", "For severe underfitting, increasing L2 penalty indefinitely increases model capacity."]],
  "gen-q8": [["Az L2 regularizáció az egyes súlyok abszolút értékének összegét bünteti, és nem azok négyzetösszegét.", "L2 regularization penalizes the sum of absolute weight magnitudes rather than squared weights."]],
  "gen-q9": [["A λ növelésével a nagy súlyok büntetése gyengül, ezért a modell egyre összetettebbé válhat.", "Increasing λ weakens the penalty on large weights and can make the model more complex."]],
  "gen-q10": [["Egyetlen tanulható w₁₂ kapcsolat súlyértéke azonos szerepű hiperparaméter, mint a learning rate.", "The value of an individual learnable weight w₁₂ is a hyperparameter of the same kind as learning rate."]],
  "gen-q11": [["A hálózat architektúráját minden backpropagation-lépésben az SGD ugyanúgy módosítja, mint a W súlymátrixokat.", "SGD changes network architecture at every backpropagation step just as it updates W weight matrices."]],
  "gen-q12": [
    ["A tanítóhalmazon végzett normál gradienscsökkentés önmagában kiváltja a hiperparaméter-választás validációs lépését.", "Ordinary gradient descent on the training set alone replaces the validation step in hyperparameter selection."],
    ["Az optimális learning rate-et a teszthalmazon végzett ismételt próbálgatással kell kiválasztani, mert a teszthalmaz a hiperparaméter-hangolásra való.", "The optimal learning rate should be selected by repeated experiments on the test set because test data is meant for hyperparameter tuning."]
  ],
  "gen-q13": [["Az early stopping azt az epochot választja, ahol a training loss először a minimális értéke alá csökken.", "Early stopping selects the first epoch where training loss falls below its own minimum."]],
  "gen-q14": [["A korai leállítás mindig az utolsó epochban mentett súlyokat választja, akkor is, ha a validation loss korábban kisebb volt.", "Early stopping always keeps the last epoch's weights even if validation loss was lower earlier."]],
  "gen-q15": [["A training loss csökkenése önmagában bizonyítja, hogy a modell a validációs adatokon is javulni fog.", "A decrease in training loss alone proves that validation performance will also improve."]],
  "gen-q16": [
    ["A hiperparamétereket a végső test loss alapján választjuk ki, és csak ezután kezdjük el a validation mérést.", "Hyperparameters are selected using the final test loss and only afterward evaluated on validation data."],
    ["A θ súlyokat a validation halmazon tanítjuk, a train halmaz pedig kizárólag a végső teljesítménymérésre szolgál.", "Weights θ are fitted on validation data while the training set is reserved solely for final evaluation."]
  ],
  "gen-q17": [["A teszthalmazon ismételt early stopping döntésekkel kapott testeredmény ugyanúgy torzítatlan marad, mint egy egyszer használt holdout mérés.", "Repeated early-stopping decisions using the test set leave its score just as unbiased as a one-time holdout evaluation."]]
};
