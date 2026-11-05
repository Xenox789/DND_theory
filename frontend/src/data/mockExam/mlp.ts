import { createMockQuestion } from "./types";

export const mlpMocks = [
  createMockQuestion({
    id: "mock-mlp-1",
    chapter: "mlp",
    prompt: { hu: "Mely állítások helyesek a mesterséges neuronokról, dense rétegekről és paraméterszámról?", en: "Which claims about neurons, dense layers and parameter counts are correct?" },
    trueFacts: [
      ["Egy neuron először súlyozott összeget és biast számolhat.", "A neuron can first compute a weighted sum plus bias."],
      ["A teljesen összekötött réteg minden bemenetet minden kimeneti neuronnal összeköthet.", "A dense layer can connect every input to every output neuron."],
      ["S_in bemenettel és S_out kimenettel a dense réteg paraméterszáma S_in·S_out+S_out.", "A dense layer with S_in inputs and S_out outputs has S_in·S_out+S_out parameters."],
      ["20→10 dense rétegben biasokkal együtt 210 paraméter van.", "A 20-to-10 dense layer has 210 parameters including biases."],
      ["Egy 20→10→1 teljesen összekötött hálózatban biasokkal 221 paraméter van.", "A dense 20→10→1 network has 221 parameters including biases."],
      ["A súlymátrix alakja lehet (S_out,S_in) egy kimeneti oszlopvektort használó rétegben.", "The weight matrix may have shape (S_out,S_in) under a column-vector convention."]
    ],
    falseFacts: [
      ["Egy neuron kizárólag az összes bemenet számtani átlagát számolhatja.", "A neuron can only compute the arithmetic mean of all inputs."],
      ["Egy dense rétegben minden kimeneti neuronhoz pontosan nulla súly tartozik.", "Every output neuron in a dense layer has exactly zero weights."],
      ["A dense réteg paraméterszáma mindig kizárólag S_in+S_out.", "A dense layer always has exactly S_in+S_out parameters."],
      ["Egy 20→10 dense rétegnek pontosan 20 paramétere van.", "A 20-to-10 dense layer has exactly 20 parameters."],
      ["A 20→10→1 hálózatban csak 11 tanulható paraméter található.", "A 20→10→1 network contains only 11 learnable parameters."],
      ["A bias minden rejtett neuronban szükségképpen megegyezik a bemeneti x értékkel.", "Each hidden neuron's bias necessarily equals input x."]
    ],
    explanation: { hu: "Dense réteg: minden kimenethez minden bemenetről egy súly és egy bias tartozik. Paraméterszám=(bemenetek+1)×kimenetek.", en: "A dense layer has one weight per input-output connection plus one bias per output: (inputs+1)×outputs parameters." }
  }),
  createMockQuestion({
    id: "mock-mlp-2",
    chapter: "mlp",
    prompt: { hu: "Mely állítások helyesek az aktivációs függvényekről és az MLP kimenetéről?", en: "Which statements about activation functions and MLP output layers are correct?" },
    trueFacts: [
      ["A ReLU(z)=max(0,z) függvény negatív z esetén nullát ad.", "ReLU(z)=max(0,z) outputs zero for negative z."],
      ["A tanh kimenete lehet negatív is.", "tanh can output negative values."],
      ["A szigmoid kimenete véges z mellett 0 és 1 között van.", "Sigmoid outputs lie strictly between 0 and 1 for finite z."],
      ["Folytonos regressziós kimenethez az identity aktiváció gyakran megfelelő.", "Identity activation is often suitable for continuous regression output."],
      ["Bináris osztályozásnál a sigmoid+BCE páros gyakori választás.", "Sigmoid paired with BCE is a common binary-classification choice."],
      ["Egy MLP rejtett aktivációjának nemlinearitása növelheti a modell kifejezőerejét.", "A nonlinear hidden activation can increase an MLP's expressive power."]
    ],
    falseFacts: [
      ["ReLU minden negatív bemenetre ugyanezt a negatív értéket adja.", "ReLU returns the same negative value for any negative input."],
      ["A tanh minden kimenete szigorúan 0 és 1 közé esik.", "Every tanh output lies strictly between 0 and 1."],
      ["A szigmoid tetszőleges nagy pozitív értéket is visszaadhat.", "Sigmoid can output arbitrarily large positive values."],
      ["Regressziós feladatoknál minden esetben kötelező a végső szigmoid használata.", "Regression tasks always require a final sigmoid."],
      ["A BCE kizárólag képfelbontás csökkentésére szolgáló aktiváció.", "BCE is an activation function used only for image downsampling."],
      ["Több lineáris réteg köztes nemlinearitás nélkül minden esetben XOR-t tud megoldani.", "A stack of purely linear layers can always solve XOR without nonlinearities."]
    ],
    explanation: { hu: "A hidden nemlinearitás a komplex határokhoz kell; a végső aktiváció és veszteség a célérték természetétől függ.", en: "Hidden nonlinearities add expressive power; the output activation and loss depend on the target type." }
  }),
  createMockQuestion({
    id: "mock-mlp-3",
    chapter: "mlp",
    prompt: { hu: "Mely állítások helyesek a softmax, multiclass és többkimenetű regresszió kapcsán?", en: "Which statements about softmax, multiclass classification and multi-output regression are correct?" },
    trueFacts: [
      ["A softmax több osztályhoz olyan valószínűségeket ad, amelyek összege 1.", "Softmax outputs class probabilities that sum to one."],
      ["A softmax nyers osztálypontszámokból (logits) számolható.", "Softmax converts raw class scores (logits) into probabilities."],
      ["Három kizárólagos kategóriánál három softmax kimenet lehet célszerű.", "Three mutually exclusive categories can use three softmax outputs."],
      ["One-hot címke három osztályra lehet [0,1,0].", "A one-hot label for three classes can be [0,1,0]."],
      ["Két folytonos érték becslése többkimenetű regresszió lehet, nem feltétlenül multiclass.", "Predicting two continuous targets can be multi-output regression, not necessarily multiclass."],
      ["A multiclass cross-entropy a helyes osztály valószínűségét használja.", "Multiclass cross-entropy depends on the probability of the true class."]
    ],
    falseFacts: [
      ["A softmax összes kimenete mindig pontosan 1, függetlenül az osztályok számától.", "Every softmax output is always exactly 1 regardless of class count."],
      ["A softmax kizárólag egyetlen skalárt adhat, bármennyi osztályra.", "Softmax can only output a single scalar regardless of class count."],
      ["Három kizárólagos kategóriát kötelező egyetlen identity kimenettel becsülni.", "Three exclusive classes must be predicted with a single identity output."],
      ["A [1,1,1] vektor szabványos one-hot címke pontosan három osztályhoz.", "The vector [1,1,1] is a standard one-hot label for three exclusive classes."],
      ["Két folytonos célszám együttes becslése szükségképpen bináris osztályozás.", "Predicting two continuous numbers must be binary classification."],
      ["A softmax minden kimenetének összege mindig 0.", "Softmax outputs always sum to zero."]
    ],
    explanation: { hu: "A multiclass kizárólagos kategóriákat és 1-re összegző softmaxot használhat; a vektorkimenet önmagában nem árulja el a feladattípust.", en: "Multiclass softmax handles mutually exclusive categories; a vector output alone does not establish classification." }
  })
];
