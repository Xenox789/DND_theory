import type { SourceAnswer } from "./sourceExactLectures";

export const topicAnswers: Record<string, SourceAnswer> = {
  T001: {
    trueChoices: [["A bináris keresztentrópia a helyes címkéhez rendelt alacsony valószínűséget nagy veszteséggel bünteti.","Binary cross-entropy heavily penalizes low probability assigned to the true class."]],
    falseChoices: [
      ["y=1 esetén a BCE veszteség −log(1−h).","For y=1, BCE equals −log(1−h)."],
      ["y=0 esetén a BCE veszteség −log(h).","For y=0, BCE equals −log(h)."],
      ["A BCE és az MSE képlete és értelmezése minden mintára azonos.","BCE and MSE have identical formulas and interpretations for every sample."]
    ],
    explanation: ["BCE: −y·log(h)−(1−y)·log(1−h).","BCE: −y·log(h)−(1−y)·log(1−h)."]
  },
  T002: {
    trueChoices: [["Bináris osztályozásnál gyakran egy sigmoid kimenet és BCE veszteség célszerű.","Binary classification commonly uses one sigmoid output and BCE loss."]],
    falseChoices: [
      ["Bináris osztályozásnál kötelező identitás kimenet és MSE.","Binary classification requires identity output with MSE."],
      ["A kimeneti sigmoid értéke tetszőleges valós szám lehet.","The final sigmoid output may be any real number."],
      ["A két kizáró osztályhoz minden esetben tíz softmax kimenet kell.","Two exclusive classes always require ten softmax outputs."]
    ],
    explanation: ["Az egyetlen sigmoid kimenet 0–1 közötti becsült valószínűséget ad.","A single sigmoid output gives a probability between 0 and 1."]
  },
  T003: {
    trueChoices: [["Egymást kizáró K osztálynál a K elemű softmax és multiclass cross-entropy gyakori páros.","For K mutually exclusive classes, K softmax outputs with multiclass cross-entropy are common."]],
    falseChoices: [
      ["K osztályra elegendő egyetlen sigmoid kimenet, amely egyszerre minden osztály valószínűségét tárolja.","One sigmoid output stores all K class probabilities simultaneously."],
      ["A softmax kimenetek összege a K osztályok száma.","Softmax output values sum to the number of classes K."],
      ["A multiclass keresztentrópia a helyes osztály valószínűségét kihagyja a veszteségből.","Multiclass cross-entropy omits the probability of the true class."]
    ],
    explanation: ["Softmax kimenete nemnegatív, összege 1; a CE a helyes osztály valószínűségét értékeli.","Softmax outputs sum to 1, and CE evaluates probability assigned to the true class."]
  },
  T004: {
    trueChoices: [["A ReLU(z)=max(0,z), a sigmoid a (0,1), a tanh pedig a (−1,1) tartományba képez.","ReLU(z)=max(0,z), sigmoid outputs (0,1), and tanh outputs (−1,1)."]],
    falseChoices: [
      ["A tanh kimenete 0 és 1 közötti, a sigmoidé −1 és 1 közötti.","Tanh outputs between 0 and 1, while sigmoid outputs between −1 and 1."],
      ["ReLU(z) minden negatív z-re z-t ad vissza.","ReLU(z) returns z for every negative input."],
      ["A sigmoid kimenete 1-nél nagyobb lehet, ha a bemenet elég nagy.","Sigmoid can output values above 1 for sufficiently large inputs."]
    ],
    explanation: ["Az aktivációfüggvények kimeneti tartománya eltér; a példadokumentum grafikonos felismerést is említ.","Activation functions have different output ranges; the example document also mentions identifying their graphs."]
  }
};
