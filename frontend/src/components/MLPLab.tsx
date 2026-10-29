import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";

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
          descriptionHu: "Arbitrary continuous output → final identity / g₂ omit.",
          descriptionEn: "Arbitrary continuous output → final identity / omit g₂."
        }
      : task === "binary"
        ? {
            activation: "sigmoid",
            loss: "BCE",
            descriptionHu: "Egy binary probability → 1 sigmoid output.",
            descriptionEn: "One binary probability → 1 sigmoid output."
          }
        : {
            activation: "softmax",
            loss: "CE",
            descriptionHu: classCount + " mutually exclusive class → " + classCount + " probability.",
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
              ? "Változtasd a layer sizes és task beállításokat. A parameter count és az output-layer választás azonnal frissül."
              : "Change layer sizes and task settings. Parameter counts and output-layer choices update immediately."}
          </p>
        </div>
        <div className="score-box">
          <span>{language === "hu" ? "Total parameters" : "Total parameters"}</span>
          <strong>{totalParams}</strong>
          <span>{inputSize} → {hiddenSize} → {outputSize}</span>
        </div>
      </div>

      <div className="mlp-controls">
        <label>
          <div><strong>{language === "hu" ? "Input variables" : "Input variables"}</strong><span>{inputSize}</span></div>
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
          <div><strong>{language === "hu" ? "Hidden neurons" : "Hidden neurons"}</strong><span>{hiddenSize}</span></div>
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
          <div><strong>{language === "hu" ? "Task" : "Task"}</strong></div>
          <select value={task} onChange={(event) => setTask(event.target.value as Task)}>
            <option value="regression">Regression</option>
            <option value="binary">Binary classification</option>
            <option value="multiclass">Multiclass classification</option>
          </select>
        </label>

        {task === "multiclass" && (
          <label>
            <div><strong>{language === "hu" ? "Classes" : "Classes"}</strong><span>{classCount}</span></div>
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
          <h2>{language === "hu" ? "Network architecture" : "Network architecture"}</h2>
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
          <h2>{language === "hu" ? "Popular activation functions" : "Popular activation functions"}</h2>
          <Plot
            data={activationCurves}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 45, r: 20, b: 45, t: 10 },
              xaxis: { title: "z", gridcolor: "#22314a", range: [-6, 6] },
              yaxis: { title: "g(z)", gridcolor: "#22314a", range: [-1.2, 6] }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "430px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "Single-neuron activation" : "Single-neuron activation"}</h2>
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
              <strong>{language === "hu" ? "Mi a gond hidden layerben?" : "Why is this a problem in a hidden layer?"}</strong>
              <span>
                {language === "hu"
                  ? "Ha az összes hidden activation identity, a linear layers kompozíciója továbbra is linear, így elveszítjük az MLP nonlinear expressive power-jét."
                  : "If all hidden activations are identity, the composition of linear layers remains linear, so the MLP loses its nonlinear expressive power."}
              </span>
            </div>
          )}
        </div>
      </div>

      {task === "multiclass" && (
        <div className="plot-card softmax-card">
          <h2>Softmax: {classCount} {language === "hu" ? "class probability" : "class probabilities"}</h2>
          <div className="softmax-grid">
            {probabilities.map((probability, index) => (
              <div className="softmax-item" key={index}>
                <span>class {index}</span>
                <div className="probability-bar">
                  <div style={{ width: probability * 100 + "%" }} />
                </div>
                <strong>{probability.toFixed(3)}</strong>
              </div>
            ))}
          </div>
          <div className="formula-block">
            Σ probability = {probabilities.reduce((sum, value) => sum + value, 0).toFixed(6)}
          </div>
        </div>
      )}

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
