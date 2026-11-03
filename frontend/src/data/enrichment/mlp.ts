import type { LessonContentSupplement } from "../lessonEnrichment";
export const mlpExtras: Record<string, LessonContentSupplement> = {
  "artificial-neuron": {
    "ex": [
      "Két bemenet: x=[2,3], súlyok w=[0,5;−1], bias b=1. z=0,5·2−1·3+1=−1. ReLU-val a=max(0,−1)=0, szigmoiddal a≈0,269. x adat, w és b tanulható paraméter.",
      "Two inputs: x=[2,3], weights w=[0.5,−1], bias b=1. z=0.5·2−1·3+1=−1. ReLU outputs 0, sigmoid ≈0.269. Inputs are data; weights and bias are learnable parameters."
    ]
  },
  "single-neuron-limit": {
    "ex": [
      "XOR igazságtábla: (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0. A négy sarokban az 1-es pontok átlósan helyezkednek el, ezért nem választhatók el a 0-s pontoktól egyetlen egyenessel. Több rejtett neuron külön határokat tanulhat, amelyeket a kimeneti neuron kombinál.",
      "XOR truth table: (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0. Class-1 corners lie diagonally and cannot be separated from class-0 corners by one line. Hidden neurons can learn multiple boundaries and the output neuron combines them."
    ],
    "intuition": [
      "Egyetlen sigmoid neuron logisztikus regresszióként működik, ezért döntési határa lineáris. Több neuron és köztes nemlinearitás együtt összetett határokat formálhat.",
      "A single sigmoid neuron behaves like logistic regression, hence a linear decision boundary. Multiple neurons with hidden nonlinearities can form richer boundaries."
    ]
  },
  "fully-connected": {
    "ex": [
      "Legyen x=[2,3], W=[[1,2],[0,1],[−1,1]], b=[0,1,0]. Ekkor W alakja (3,2), b alakja (3,), és z=Wx+b=[8,4,1], tehát három célneuron kap értéket. Minden W-sor egy neuron súlyait adja.",
      "Take x=[2,3], W=[[1,2],[0,1],[−1,1]], b=[0,1,0]. W has shape (3,2), b (3,), and z=Wx+b=[8,4,1]: three output neurons. Each row of W holds one neuron's input weights."
    ]
  },
  "parameter-count": {
    "ex": [
      "20 input → 10 rejtett neuron → 1 kimenet. Az első réteg súlyai 20×10=200 és biasai 10, összesen 210; a második réteg súlyai 10×1=10 és biasa 1, összesen 11. Összesen 221 paraméter, nem 10 vagy 11 neuron.",
      "20 inputs → 10 hidden neurons → 1 output. Layer 1: 20×10=200 weights plus 10 biases =210. Layer 2: 10×1=10 weights plus 1 bias=11. Total=221 parameters, distinct from neuron count."
    ]
  },
  "two-layer-hypothesis": {
    "ex": [
      "A képletet négy lépésre bontjuk: z₁=W₁x+b₁, a₁=g₁(z₁), z₂=W₂a₁+b₂, ŷ=g₂(z₂). Ha x=[1,2], W₁ az egységmátrix, b₁=[0,0], g₁=ReLU, W₂=[[3,4]], b₂=[0] és g₂=identity, akkor z₁=[1,2], a₁=[1,2], z₂=[11], ŷ=[11]. Az alakok: (2,)→(2,)→(2,)→(1,)→(1,).",
      "Break it into z₁=W₁x+b₁, a₁=g₁(z₁), z₂=W₂a₁+b₂, ŷ=g₂(z₂). With x=[1,2], W₁=identity, b₁=[0,0], g₁=ReLU, W₂=[[3,4]], b₂=[0], g₂=identity: z₁=[1,2], a₁=[1,2], z₂=[11], ŷ=[11]. Shapes: (2,)→(2,)→(2,)→(1,)→(1,)."
    ]
  },
  "activation-functions": {
    "ex": [
      "z=−2 esetén sigmoid≈0,119, tanh≈−0,964, ReLU=0. z=2 esetén sigmoid≈0,881, tanh≈0,964, ReLU=2. A tartományok: sigmoid (0,1), tanh (−1,1), ReLU [0,+∞).",
      "For z=−2: sigmoid≈0.119, tanh≈−0.964, ReLU=0. For z=2: sigmoid≈0.881, tanh≈0.964, ReLU=2. Ranges: sigmoid (0,1), tanh (−1,1), ReLU [0,+∞)."
    ]
  },
  "output-by-task": {
    "ex": [
      "Egy lakás árát becsülve egy folytonos szám kell: 1 identity kimenet + MSE. Egy beteg vérnyomását és pulzusát egyszerre becsülve 2 folytonos szám kell: 2 identity kimenet + MSE; ez NEM multiclass. Beteg/nem beteg: 1 sigmoid + BCE. Három kizárólagos kategória: 3 softmax kimenet + cross-entropy és például y=[0,1,0].",
      "Predicting one house price: 1 continuous identity output + MSE. Predicting blood pressure and pulse together: 2 continuous identity outputs + MSE; NOT multiclass. Disease/no disease: 1 sigmoid + BCE. Three exclusive classes: 3 softmax outputs + cross-entropy, label e.g. y=[0,1,0]."
    ],
    "intuition": [
      "Az outputvektor mérete nem dönti el a feladattípust. A címke szemantikája számít: folytonos mérés vagy kategóriák közötti választás.",
      "The number of outputs does not determine task type. Label semantics matter: continuous measurements versus categorical choices."
    ]
  },
  "softmax": {
    "ex": [
      "Három osztály logitjai z=[0,0,ln(2)]. Exponenciálok: [1,1,2]; összegük 4; softmax=[0,25;0,25;0,5]. Ha a helyes one-hot címke [0,0,1], akkor a többosztályos CE=−ln(0,5)≈0,693. A többkimenetű regresszió ezzel szemben nem követel 1-re összegző valószínűségeket.",
      "For logits z=[0,0,ln(2)]: exponentials [1,1,2], sum 4, softmax=[0.25,0.25,0.5]. With one-hot label [0,0,1], multiclass CE=−ln(0.5)≈0.693. Multioutput regression does not require probabilities that sum to one."
    ]
  },
  "nonconvex": {
    "ex": [
      "Szemléltető nemkonvex függvény: J(t)=(t²−1)²; két minimuma van t=−1 és t=1 körül. Ez nem egy konkrét MLP vesztesége, csak megmutatja, miért nem alkalmazható automatikusan a lineáris regresszió konvex optimalizálási garanciája.",
      "Illustrative nonconvex function: J(t)=(t²−1)² has minima at t=−1 and t=1. This is not an actual MLP loss; it demonstrates why guarantees for convex linear regression cannot be transferred automatically."
    ]
  }
};
