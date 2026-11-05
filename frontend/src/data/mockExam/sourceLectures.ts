import type { ExamChapter } from "./types";

export type SourceExample = {
  id: string;
  documentParagraph: number;
  chapter: ExamChapter;
  anchorId: string;
  variationPoolId: string;
  focusHu: string;
  focusEn: string;
};

/** One record for each explicit question in the uploaded Theory test 1 examples,
 * in document order. Numbered "M" for Lectures 1–6 (80) and "N" for NumPy (49).
 * Historical anchor and pool IDs are retained as provenance metadata. Actual
 * exam answers are now authored per source question in sourceExactLectures.ts.
 */
const lectureParagraphs = [9,10,11,12,13,14,15,17,18,19,20,22,23,24,26,27,28,29,30,31,32,33,35,36,37,39,40,42,43,44,45,46,47,48,49,50,51,52,54,55,56,58,59,60,61,62,63,64,65,66,67,69,70,71,72,74,75,76,77,81,82,83,84,85,90,91,92,93,94,95,96,97,98,99,100,102,103,104,106,111];

const lectureRows = `
fundamentals~official-q1~mock-fund-2~A hipotézisfüggvény bemenetei és paraméterei~Inputs and parameters of the hypothesis function
fundamentals~q2~mock-fund-2~Mit ad vissza a hipotézisfüggvény?~What does a hypothesis function output?
fundamentals~official-q2~mock-fund-2~A címke lehet skalár, vektor vagy mátrix?~Can the target label be a scalar, vector, or matrix?
fundamentals~official-q3~mock-fund-2~Miből áll egy felügyelt tanítóminta?~What makes up a supervised learning example?
fundamentals~q3~mock-fund-3~Milyen szerepet játszik a veszteségfüggvény?~What is the purpose of the loss function?
fundamentals~official-q4~mock-fund-3~Milyen alakú a teljes veszteségfüggvény értéke?~What is the shape of the total loss?
fundamentals~official-q5~mock-fund-1~Miben különbözik az RL jutalma a felügyelt tanulási címkétől?~How is reinforcement-learning feedback different from supervised labels?
fundamentals~official-q6~mock-fund-3~Mely tanulási feladatok felügyeltek, melyek felügyelet nélküliek?~Which tasks are supervised and which are unsupervised?
fundamentals~q10~mock-fund-3~Mi a regresszió, klaszterezés, osztályozás, zajszűrés és dimenziócsökkentés célja?~Goals of regression, classification, clustering, denoising, dimensionality reduction
linear~official-q7~mock-linear-1~A lineáris regresszió regresszióra vagy osztályozásra használható? Felügyelt vagy felügyelet nélküli tanulás?~Is linear regression supervised regression or classification?
logistic~official-q8~mock-log-1~A logisztikus regresszió regresszióra vagy osztályozásra használható? Felügyelt vagy felügyelet nélküli tanulás?~Is logistic regression supervised classification or regression?
linear~official-q9~mock-linear-1~Melyik modell illik a 200 beteg koleszterinszintjének becslésére?~Which model predicts cholesterol for 200 patients?
linear~lr-q1~mock-linear-2~Hány modellparaméter kell négy bemeneti jellemzőhöz bias mellett?~How many parameters for four features with an intercept?
linear~official-q9~mock-linear-3~Milyen veszteséget használjunk a koleszterinszint becslésére?~Which loss is suitable for cholesterol prediction?
linear~official-q10~mock-linear-2~Milyen alakú X a 200 beteges példában?~Shape of X for the 200-patient example
linear~lr-q1~mock-linear-2~Milyen alakú a θ paramétervektor négy jellemző mellett?~Shape of the parameter vector for four features
linear~official-q10~mock-linear-2~Milyen alakú az Xθ előrejelzésvektor 200 betegnél?~Shape of the Xθ predictions for 200 patients
linear~lr-q14~mock-linear-1~Milyen értéktartományú a lineáris regresszió becslése?~Possible output range of linear regression
linear~q5~mock-linear-2~A betegek életkora az X vagy a θ része?~Are patient ages stored in X or θ?
linear~q7~mock-linear-3~Minimalizáljuk-e a bemeneti X mátrixot tanításkor?~Do we minimize X when training?
linear~q7~mock-linear-3~A veszteséget vagy a becsléseket minimalizáljuk a tanításban?~Do we minimize the loss or the predictions?
linear~q8~mock-linear-3~A paraméterek értékét vagy magát a θ vektort minimalizáljuk?~Do we minimize θ or the loss by updating θ?
linear~official-q11~mock-linear-1~A θ₀ eltolás (bias) skalár vagy vektor?~Is one patient's linear prediction a scalar or vector?
linear~lr-q14~mock-linear-1~Milyen tartományba eshet egy lineáris regresszió skalár becslése?~Range of a scalar linear prediction
linear~q8~mock-linear-2~Egy beteg életkorát bemenetként vagy modellparaméterként kezeljük?~Is one patient's age a feature or a parameter?
linear~lr-q2~mock-linear-1~Egy bemeneti változónál milyen geometriai alakú a hipotézis?~Geometry of a single-feature linear hypothesis
linear~q6~mock-linear-1~Két jellemzővel milyen geometriai alakot kapunk 3D-ben?~Geometry of a two-feature linear hypothesis in 3D
linear~lr-q6~mock-linear-2~Milyen alakú X a regularizált normálegyenlet példájában?~Shape of X in the regularized normal equation
linear~lr-q6~mock-linear-2~Milyen alakú az y célértékvektor 200 betegnél?~Shape of the target vector y for 200 patients
linear~lr-q1~mock-linear-2~Milyen alakú θ a 200 beteges normálegyenletben?~Shape of θ in the normal equation
linear~official-q13~mock-linear-2~A koleszterinszintet X, y vagy θ tárolja?~Where are cholesterol targets stored: X, y, or θ?
linear~lr-q9~mock-linear-3~Mi az I egységmátrix szerepe a regularizált normálegyenletben?~Role of I in the regularized normal equation
linear~official-q14~mock-linear-3~Mikor igazolható globális optimum lineáris MSE és gradienscsökkentés esetén?~Global optimum for gradient descent with linear least squares
mlp~official-q15~mock-mlp-1~Garantálja-e a kis lépésméret a globális optimumot MLP esetén?~Does a small step guarantee a global optimum for an MLP?
linear~lr-q10~mock-linear-3~Mire szolgál a jellemzőskálázás?~Purpose of feature scaling
linear~lr-q10~mock-linear-3~Mi romolhat el, ha nem skálázzuk a bemeneteket?~Consequences of omitting feature scaling
linear~lr-q13~mock-linear-3~Melyik robusztusabb kevés kiugró adatponttal szemben: a min–max skálázás vagy a standardizálás?~Min-max vs standardization with a few outliers
linear~official-q17~mock-linear-3~Mit jelentenek a skálázási képletek szimbólumai?~Symbols and roles in feature-scaling formulas
logistic~official-q18~mock-log-1~Melyik regressziót válasszuk beteg/egészséges osztályozásra?~Choosing logistic vs linear regression for disease classification
logistic~log-q6~mock-log-1~Hány paramétert használ a két laborjellemzős modell bias mellett?~Parameter count for two lab features with intercept
logistic~log-q8~mock-log-3~Melyik veszteség megfelelő bináris osztályozáshoz?~Loss for binary classification
logistic~official-q19~mock-log-1~Milyen alakú X száz beteg és két laborérték esetén?~Shape of X for 100 patients and two lab values
logistic~log-q6~mock-log-1~Milyen alakú a logisztikus modell θ vektora?~Shape of θ in logistic regression
logistic~log-q3~mock-log-1~Milyen alakú a g(Xθ) becslésvektor?~Shape of the sigmoid prediction vector g(Xθ)
logistic~log-q2~mock-log-2~Milyen értéktartományban van a g(Xθ) kimenete?~Output range of g(Xθ)
logistic~log-q7~mock-log-1~A laborvizsgálati értékek a θ vagy az X részei?~Are lab values in θ or X?
logistic~log-q11~mock-log-3~Az X mátrixot optimalizáljuk logisztikus tanításkor?~Do we optimize input matrix X during logistic training?
logistic~log-q11~mock-log-3~Minimalizáljuk-e közvetlenül a g(Xθ) becslésvektort?~Do we directly minimize the prediction vector g(Xθ)?
logistic~log-q11~mock-log-3~A θ értékét minimalizáljuk, vagy a θ-t változtatva a veszteséget?~Do we minimize θ, or loss by changing θ?
logistic~log-q11~mock-log-2~A g szigmoidfüggvényt minimalizáljuk tanítás közben?~Is the sigmoid function g what we minimize?
logistic~log-q11~mock-log-3~Mi a logisztikus regresszió tanításának célfüggvénye?~What objective is minimized during logistic training?
logistic~official-q20~mock-log-1~A θ₀ eltolás (bias) skalár vagy vektor a logisztikus regresszióban?~Shape of a single-patient logistic prediction
logistic~log-q2~mock-log-2~Milyen értéktartományba eshet egy beteg ŷ=g(θ₂x₂+θ₁x₁+θ₀) becslése?~Range of the pre-sigmoid linear score
logistic~log-q2~mock-log-2~Milyen értéktartományba eshet a g(θ₂x₂+θ₁x₁+θ₀) szigmoid kimenete?~Range of a post-sigmoid prediction
logistic~log-q7~mock-log-1~Egy beteg laboreredménye bemeneti adat vagy tanult súly?~Is a patient's lab result input data or a learned weight?
linear~lr-q3~mock-linear-3~Az MSE veszteség inkább regresszióhoz vagy osztályozáshoz alkalmas?~Is MSE more suitable for regression or classification?
linear~lr-q3~mock-linear-3~Mit indexel j a négyzetes veszteség képletében?~What does index j enumerate in the squared loss?
linear~lr-q3~mock-linear-3~Mit jelent m a veszteségképletben?~What does m represent in the loss formula?
linear~official-q21~mock-linear-3~Skalár, vektor vagy mátrix a teljes J(θ) veszteségérték?~Is the total loss J(θ) scalar, vector, or matrix?
mlp~mlp-q6~mock-mlp-1~Mennyi paraméter van a 20–10–1 MLP egészében?~Total parameter count in a 20–10–1 MLP
mlp~mlp-q5~mock-mlp-1~Mennyi paraméter van a 20 bemenetű, 10 neuronos első rétegben?~Parameter count in the first 20-to-10 layer
mlp~mlp-q8~mock-mlp-2~Meg kell-e szüntetni a g₁ rejtett aktivációt regressziónál?~Should the hidden activation g₁ be omitted for regression?
mlp~mlp-q8~mock-mlp-2~Elhagyjuk-e a g₂ kimeneti aktivációfüggvényt a folytonos regresszióban?~What output activation g₂ suits continuous regression?
mlp~mlp-q8~mock-mlp-2~Kell-e szigmoid a folytonos regressziós kimenetre?~Should a continuous regression output use sigmoid?
generalization~gen-q4~mock-gen-2~Kevesebb tanítópélda növeli-e a túlillesztést?~Effect of reducing training examples on overfitting
generalization~gen-q5~mock-gen-2~Kevesebb tesztpélda növeli-e a túlillesztést?~Effect of reducing test examples on overfitting
generalization~gen-q6~mock-gen-2~Több tanítópélda hogyan befolyásolja a túlillesztést?~Effect of increasing training examples on overfitting
generalization~gen-q6~mock-gen-2~Kevesebb modellparaméter hogyan hat a túlillesztésre?~Effect of decreasing the number of model parameters
generalization~gen-q6~mock-gen-2~Több modellparaméter hogyan hat a túlillesztésre?~Effect of increasing the number of model parameters
generalization~gen-q13~mock-gen-3~Mi az early stopping célja?~Purpose of early stopping
generalization~gen-q14~mock-gen-3~Mikor indokolt leállítani a tanítást validáció alapján?~When to stop training based on validation loss
generalization~gen-q14~mock-gen-3~A training loss növekedése önmagában early stopping jel?~Is an increase in training loss by itself an early stopping signal?
generalization~gen-q15~mock-gen-2~A csökkenő train és növekvő validation loss túlillesztésre utal?~Do decreasing train and increasing validation losses indicate overfitting?
generalization~gen-q11~mock-gen-1~Az SGD a modellparamétereket tanítja?~Does SGD train model parameters?
generalization~gen-q11~mock-gen-1~Az SGD ugyanúgy tanítja a hiperparamétereket?~Does SGD directly learn hyperparameters?
sgd~sgd-q3~mock-sgd-1~Az SGD olyan gradienscsökkentés-változat, ahol egy lépésben egy tanítóminta gradiensét számoljuk a teljes batch helyett?~Must SGD always use one training sample per update?
sgd~sgd-q5~mock-sgd-2~Milyen hatása van a mini-batch méretének növelésének?~Effects of increasing mini-batch size
sgd~sgd-q4~mock-sgd-2~Milyen hatása van a mini-batch méretének csökkentésének?~Effects of decreasing mini-batch size
backprop~official-q28~mock-bp-1~Mit terjesztünk vissza a c=b² négyzetes csomóponton?~Backward rule for the square node c=b²
backprop~official-q29~mock-bp-1~Mit terjesztünk vissza a c=a+b összeadó csomóponton?~Backward rule for addition node c=a+b
`.trim();

function parseRows(rows: string, paragraphs: number[], prefix: string): SourceExample[] {
  const lines = rows.split("\n").map(line => line.trim()).filter(Boolean);
  if (lines.length !== paragraphs.length) throw new Error("Missing source example mapping for " + prefix + ": " + lines.length + " vs " + paragraphs.length);
  return lines.map((line, index) => {
    const [chapter, anchorId, variationPoolId, focusHu, focusEn] = line.split("~");
    if (!chapter || !anchorId || !variationPoolId || !focusHu || !focusEn) throw new Error("Invalid source mapping at " + prefix + (index+1));
    return {
      id: prefix + String(index + 1).padStart(3, "0"),
      documentParagraph: paragraphs[index],
      chapter: chapter as ExamChapter,
      anchorId,
      variationPoolId,
      focusHu,
      focusEn
    };
  });
}

export const lectureSourceExamples: SourceExample[] = parseRows(lectureRows, lectureParagraphs, "M");
