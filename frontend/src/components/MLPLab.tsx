import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";
import { SimulationGuide } from "./SimulationGuide";
import { PlotAxisKey } from "./PlotAxisKey";

type Props = {
  language: Language;
};

type Task = "regression" | "binary" | "multiclass";

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

function relu(z: number) {
  return Math.max(0, z);
}

function softmax(values: number[]) {
  const maxValue = Math.max(...values);
  const expValues = values.map((value) => Math.exp(value - maxValue));
  const denominator = expValues.reduce((sum, value) => sum + value, 0);
  return expValues.map((value) => value / denominator);
}

function layerParams(inputSize: number, outputSize: number) {
  return inputSize * outputSize + outputSize;
}

export function MLPLab({ language }: Props) {
  const [inputSize, setInputSize] = useState(4);
  const [hiddenSize, setHiddenSize] = useState(5);
  const [task, setTask] = useState<Task>("regression");
  const [classCount, setClassCount] = useState(4);
  const [hiddenActivation, setHiddenActivation] = useState<"relu" | "sigmoid" | "tanh" | "identity">("relu");
  const [z, setZ] = useState(1);

  const outputSize = task === "multiclass" ? classCount : 1;
  const firstLayerParams = layerParams(inputSize, hiddenSize);
  const secondLayerParams = layerParams(hiddenSize, outputSize);
  const totalParams = firstLayerParams + secondLayerParams;

  const outputConfig =
    task === "regression"
      ? {
          activation: "identity",
          loss: "MSE",
          descriptionHu: "Folytonos kimenet → végső identitásfüggvény (identity), vagy g₂ elhagyása.",
          descriptionEn: "Arbitrary continuous output → final identity / omit g₂."
        }
      : task === "binary"
        ? {
            activation: "sigmoid",
            loss: "BCE",
            descriptionHu: "Egy bináris valószínűség → 1 szigmoid (sigmoid) kimenet.",
            descriptionEn: "One binary probability → 1 sigmoid output."
          }
        : {
            activation: "softmax",
            loss: "CE",
            descriptionHu: classCount + " kölcsönösen kizáró osztály → " + classCount + " softmax-valószínűség.",
            descriptionEn: classCount + " mutually exclusive classes → " + classCount + " probabilities."
          };

  const curveX = useMemo(
    () => Array.from({ length: 161 }, (_, index) => -8 + index * 0.1),
    []
  );

  const activationCurves = [
    {
      x: curveX,
      y: curveX.map(sigmoid),
      type: "scatter" as const,
      mode: "lines" as const,
      name: "sigmoid"
    },
    {
      x: curveX,
      y: curveX.map(Math.tanh),
      type: "scatter" as const,
      mode: "lines" as const,
      name: "tanh"
    },
    {
      x: curveX,
      y: curveX.map(relu),
      type: "scatter" as const,
      mode: "lines" as const,
      name: "ReLU"
    }
  ];

  const hiddenOutput =
    hiddenActivation === "relu"
      ? relu(z)
      : hiddenActivation === "sigmoid"
        ? sigmoid(z)
        : hiddenActivation === "tanh"
          ? Math.tanh(z)
          : z;

  const logits = Array.from(
    { length: Math.max(2, classCount) },
    (_, index) => z + (index - classCount / 2) * 0.8
  );
  const probabilities = softmax(logits.slice(0, classCount));

  const diagramInputNodes = Array.from({ length: Math.min(inputSize, 8) }, (_, index) => index);
  const diagramHiddenNodes = Array.from({ length: Math.min(hiddenSize, 8) }, (_, index) => index);
  const diagramOutputNodes = Array.from({ length: Math.min(outputSize, 8) }, (_, index) => index);

  const yPos = (index: number, count: number) => {
    if (count <= 1) return 150;
    return 35 + (230 * index) / (count - 1);
  };

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">MLP ARCHITECTURE LAB</span>
          <h1>Artificial Neuron → MLP</h1>
          <p>
            {language === "hu"
              ? "Változtasd a rétegméreteket (layer sizes) és a feladattípust (task). A paraméterszám és a kimeneti réteg beállítása azonnal frissül."
              : "Change layer sizes and task settings. Parameter counts and output-layer choices update immediately."}
          </p>
        </div>
        <div className="score-box">
          <span>{language === "hu" ? "Összes paraméter (parameters)" : "Total parameters"}</span>
          <strong>{totalParams}</strong>
          <span>{inputSize} → {hiddenSize} → {outputSize}</span>
        </div>
      </div>

      <div className="mlp-controls">
        <label>
          <div><strong>{language === "hu" ? "Bemeneti változók (input variables)" : "Input variables"}</strong><span>{inputSize}</span></div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={inputSize}
            onChange={(event) => setInputSize(Number(event.target.value))}
          />
        </label>

        <label>
          <div><strong>{language === "hu" ? "Rejtett neuronok (hidden neurons)" : "Hidden neurons"}</strong><span>{hiddenSize}</span></div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={hiddenSize}
            onChange={(event) => setHiddenSize(Number(event.target.value))}
          />
        </label>

        <label>
          <div><strong>{language === "hu" ? "Feladat (task)" : "Task"}</strong></div>
          <select value={task} onChange={(event) => setTask(event.target.value as Task)}>
            <option value="regression">{language === "hu" ? "Regresszió (regression)" : "Regression"}</option>
            <option value="binary">{language === "hu" ? "Bináris osztályozás (binary classification)" : "Binary classification"}</option>
            <option value="multiclass">{language === "hu" ? "Többosztályos osztályozás (multiclass classification)" : "Multiclass classification"}</option>
          </select>
        </label>

        {task === "multiclass" && (
          <label>
            <div><strong>{language === "hu" ? "Osztályok (classes)" : "Classes"}</strong><span>{classCount}</span></div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={classCount}
              onChange={(event) => setClassCount(Number(event.target.value))}
            />
          </label>
        )}
      </div>

      <div className="mlp-main-grid">
        <div className="plot-card network-card">
          <h2>{language === "hu" ? "Hálózati architektúra (network architecture)" : "Network architecture"}</h2>
          <svg viewBox="0 0 620 300" className="network-svg" role="img">
            {diagramInputNodes.flatMap((inputIndex) =>
              diagramHiddenNodes.map((hiddenIndex) => (
                <line
                  key={"ih-" + inputIndex + "-" + hiddenIndex}
                  x1="100"
                  y1={yPos(inputIndex, diagramInputNodes.length)}
                  x2="310"
                  y2={yPos(hiddenIndex, diagramHiddenNodes.length)}
                  className="network-edge"
                />
              ))
            )}

            {diagramHiddenNodes.flatMap((hiddenIndex) =>
              diagramOutputNodes.map((outputIndex) => (
                <line
                  key={"ho-" + hiddenIndex + "-" + outputIndex}
                  x1="310"
                  y1={yPos(hiddenIndex, diagramHiddenNodes.length)}
                  x2="520"
                  y2={yPos(outputIndex, diagramOutputNodes.length)}
                  className="network-edge"
                />
              ))
            )}

            {diagramInputNodes.map((index) => (
              <circle
                key={"i-" + index}
                cx="100"
                cy={yPos(index, diagramInputNodes.length)}
                r="13"
                className="network-node input-node"
              />
            ))}
            {diagramHiddenNodes.map((index) => (
              <circle
                key={"h-" + index}
                cx="310"
                cy={yPos(index, diagramHiddenNodes.length)}
                r="15"
                className="network-node hidden-node"
              />
            ))}
            {diagramOutputNodes.map((index) => (
              <circle
                key={"o-" + index}
                cx="520"
                cy={yPos(index, diagramOutputNodes.length)}
                r="15"
                className="network-node output-node"
              />
            ))}

            <text x="65" y="290" className="network-label">S₀={inputSize}</text>
            <text x="270" y="290" className="network-label">S₁={hiddenSize}</text>
            <text x="485" y="290" className="network-label">S₂={outputSize}</text>
          </svg>

          {(inputSize > 8 || hiddenSize > 8 || outputSize > 8) && (
            <p className="diagram-note">
              {language === "hu"
                ? "A rajz legfeljebb 8 node/layer elemet jelenít meg, de a parameter count a teljes beállított mérettel számol."
                : "The diagram shows at most 8 nodes per layer, but parameter counts use the full configured sizes."}
            </p>
          )}
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "Parameter count" : "Parameter count"}</h2>
          <div className="parameter-breakdown">
            <div>
              <span>W₁</span>
              <strong>{hiddenSize} × {inputSize} = {hiddenSize * inputSize}</strong>
            </div>
            <div>
              <span>b₁</span>
              <strong>{hiddenSize}</strong>
            </div>
            <div className="subtotal">
              <span>Layer 1</span>
              <strong>{firstLayerParams}</strong>
            </div>
            <div>
              <span>W₂</span>
              <strong>{outputSize} × {hiddenSize} = {outputSize * hiddenSize}</strong>
            </div>
            <div>
              <span>b₂</span>
              <strong>{outputSize}</strong>
            </div>
            <div className="subtotal">
              <span>Layer 2</span>
              <strong>{secondLayerParams}</strong>
            </div>
            <div className="total-row">
              <span>TOTAL</span>
              <strong>{totalParams}</strong>
            </div>
          </div>

          <div className="formula-block">
            params(layer k) = S_k(S_(k−1)+1)
          </div>
        </div>
      </div>

      <div className="output-config-card">
        <div>
          <span>{language === "hu" ? "Selected task" : "Selected task"}</span>
          <strong>{task}</strong>
        </div>
        <div>
          <span>{language === "hu" ? "Hidden activation" : "Hidden activation"}</span>
          <strong>nonlinear, e.g. ReLU</strong>
        </div>
        <div>
          <span>{language === "hu" ? "Final activation" : "Final activation"}</span>
          <strong>{outputConfig.activation}</strong>
        </div>
        <div>
          <span>Loss</span>
          <strong>{outputConfig.loss}</strong>
        </div>
        <p>{language === "hu" ? outputConfig.descriptionHu : outputConfig.descriptionEn}</p>
      </div>

      <div className="hero-card compact lab-section-hero">
        <div>
          <span className="eyebrow">ACTIVATION EXPLORER</span>
          <h1>Sigmoid / tanh / ReLU</h1>
          <p>
            {language === "hu"
              ? "A grafikonokból a Theory Testen is kérdezhetnek output range-et vagy activation azonosítást."
              : "The Theory Test may ask you to identify activations from graphs or reason about their output ranges."}
          </p>
        </div>
      </div>

      <div className="plot-grid">
        <div className="plot-card">
          <h2>{language === "hu" ? "Gyakori aktivációs függvények" : "Popular activation functions"}</h2>\n          <p className="plot-description">{language === "hu" ? "Az X tengely z, a neuron preaktivációja. Az Y tengely g(z), vagyis az aktivációs függvény kimenete." : "X is pre-activation z. Y is g(z), the activation-function output."}</p>
          <PlotAxisKey
            language={language}
            items={[
              { axis: "X", symbol: "z", meaning: language === "hu" ? "preaktiváció (pre-activation)" : "pre-activation" },
              { axis: "Y", symbol: "g(z)", meaning: language === "hu" ? "aktiváció utáni kimenet" : "activation output" }
            ]}
          />
          <Plot
            data={activationCurves}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 45, r: 20, b: 45, t: 10 },
              xaxis: { title: language === "hu" ? "z — preaktiváció (pre-activation)" : "z — pre-activation", gridcolor: "#22314a", range: [-6, 6] },
              yaxis: { title: language === "hu" ? "g(z) — aktivált kimenet" : "g(z) — activation output", gridcolor: "#22314a", range: [-1.2, 6] }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "430px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "Egyetlen neuron aktivációja" : "Single-neuron activation"}</h2>
          <div className="activation-controls">
            <label>
              <span>g₁</span>
              <select
                value={hiddenActivation}
                onChange={(event) => setHiddenActivation(event.target.value as typeof hiddenActivation)}
              >
                <option value="relu">ReLU</option>
                <option value="sigmoid">sigmoid</option>
                <option value="tanh">tanh</option>
                <option value="identity">identity</option>
              </select>
            </label>
            <label>
              <div><strong>z</strong><span>{z.toFixed(2)}</span></div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={z}
                onChange={(event) => setZ(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="activation-result">
            <span>z</span>
            <strong>{z.toFixed(3)}</strong>
            <span>→ {hiddenActivation}(z) →</span>
            <strong>{hiddenOutput.toFixed(3)}</strong>
          </div>

          {hiddenActivation === "identity" && (
            <div className="callout exam-trap">
              <strong>{language === "hu" ? "Miért probléma ez a rejtett rétegben (hidden layer)?" : "Why is this a problem in a hidden layer?"}</strong>
              <span>
                {language === "hu"
                  ? "Ha minden rejtett aktiváció identitásfüggvény (identity), a lineáris rétegek (linear layers) egymásutánja továbbra is egyetlen lineáris leképezéssel ekvivalens. Így az MLP elveszíti a nemlineáris kifejezőerejét."
                  : "If all hidden activations are identity, the composition of linear layers remains linear, so the MLP loses its nonlinear expressive power."}
              </span>
            </div>
          )}
        </div>
      </div>

      {task === "multiclass" && (
        <div className="plot-card softmax-card">
          <h2>Softmax: {classCount} {language === "hu" ? "osztályvalószínűség" : "class probabilities"}</h2>
          <div className="softmax-grid">
            {probabilities.map((probability, index) => (
              <div className="softmax-item" key={index}>
                <span>{language === "hu" ? "osztály " : "class "}{index}</span>
                <div className="probability-bar">
                  <div style={{ width: probability * 100 + "%" }} />
                </div>
                <strong>{probability.toFixed(3)}</strong>
              </div>
            ))}
          </div>
          <div className="formula-block">
            {language === "hu" ? "Σ valószínűség" : "Σ probability"} = {probabilities.reduce((sum, value) => sum + value, 0).toFixed(6)}
          </div>
        </div>
      )}

      <SimulationGuide
        language={language}
        axes={[
          {
            label: language === "hu" ? "Aktivációs grafikon x-tengelye: z" : "Activation plot x-axis: z",
            meaning: language === "hu"
              ? "A neuron aktiváció előtti lineáris pontszáma, azaz preaktivációja (pre-activation)."
              : "The neuron's linear score / pre-activation value before applying the activation function."
          },
          {
            label: language === "hu" ? "Aktivációs grafikon y-tengelye: g(z)" : "Activation plot y-axis: g(z)",
            meaning: language === "hu"
              ? "Az aktivációs függvény (activation function) kimenete. A sigmoid, tanh és ReLU eltérő nemlineáris transzformációt végez."
              : "Output of the activation function: sigmoid, tanh, and ReLU apply different nonlinear transformations."
          }
        ]}
        terms={[
          { label: "S₀", meaning: language === "hu" ? "A bemeneti réteg mérete (input layer size), vagyis a bemeneti változók száma." : "input-layer size / number of input variables" },
          { label: "S₁", meaning: language === "hu" ? "A rejtett réteg (hidden layer) neuronjainak száma." : "number of neurons in the hidden layer" },
          { label: "S₂", meaning: language === "hu" ? "A kimeneti réteg mérete (output layer size), amelyet a feladat típusa határoz meg." : "output-layer size, determined by the task" },
          { label: "w", meaning: language === "hu" ? "Tanulható súly (weight), amely egy kapcsolat erősségét szabályozza." : "weight: learnable strength of one connection" },
          { label: "b", meaning: language === "hu" ? "Neurononkénti tanulható eltolás (bias)." : "bias: learnable offset for each neuron" },
          { label: "z", meaning: language === "hu" ? "A súlyozott összeg és az eltolás eredménye az aktiváció előtt." : "weighted sum plus bias before activation" },
          { label: "g(z)", meaning: language === "hu" ? "Az aktivációs függvény kimenete." : "activation output" }
        ]}
        formulas={[
          {
            expression: "z = Σ wᵢxᵢ + b",
            meaning: language === "hu"
              ? "Egy mesterséges neuron (artificial neuron) először súlyozott összeget számol a bemenetekből, majd hozzáadja az eltolást (bias)."
              : "An artificial neuron first computes a weighted sum of its inputs and adds a bias."
          },
          {
            expression: "a = g(z)",
            meaning: language === "hu"
              ? "Az aktivációs függvény (activation function) a lineáris pontszámból készíti a neuron kimenetét."
              : "The activation function converts the linear score into the neuron output."
          },
          {
            expression: "parameters(layer) = S_in·S_out + S_out",
            meaning: language === "hu"
              ? "Minden bemeneti–kimeneti neuronpárhoz egy súly (weight), és minden kimeneti neuronhoz egy eltolás (bias) tartozik."
              : "There is one weight for each input-output neuron pair and one bias for each output neuron."
          }
        ]}
        realWorld={
          language === "hu"
            ? "Képosztályozásnál a bemeneti réteg (input layer) jellemzőket fogad, a rejtett rétegek (hidden layers) összetettebb reprezentációkat tanulhatnak, a kimeneti réteg (output layer) pedig softmax segítségével osztályvalószínűségeket adhat. Regressziónál ugyanaz az MLP folytonos értéket becsülhet."
            : "In image classification, the input layer receives features, hidden layers can learn increasingly complex representations, and the output layer can produce class probabilities using softmax. The same MLP idea can produce continuous predictions for regression."
        }
      />

      <div className="task-matrix">
        <div className="task-matrix-row header">
          <span>Task</span>
          <span>Output</span>
          <span>g₂</span>
          <span>Loss</span>
        </div>
        <div className="task-matrix-row">
          <span>Regression</span>
          <span>continuous scalar/vector</span>
          <span>identity / omit</span>
          <span>MSE</span>
        </div>
        <div className="task-matrix-row">
          <span>Binary classification</span>
          <span>1 probability</span>
          <span>sigmoid</span>
          <span>BCE</span>
        </div>
        <div className="task-matrix-row">
          <span>Multiclass classification</span>
          <span>k probabilities</span>
          <span>softmax</span>
          <span>CE</span>
        </div>
      </div>
    </div>
  );
}
