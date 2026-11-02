import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";
import { SimulationGuide } from "./SimulationGuide";
import { PlotAxisKey } from "./PlotAxisKey";

type Props = {
  language: Language;
};

type Point = {
  x: number;
  y: number;
};

const dataset: Point[] = Array.from({ length: 64 }, (_, index) => {
  const x = -3 + (6 * index) / 63;
  const noise =
    0.42 * Math.sin(index * 1.73) +
    0.18 * Math.cos(index * 0.61);
  return { x, y: 1 + 2 * x + noise };
});

function gradient(points: Point[], theta0: number, theta1: number) {
  let g0 = 0;
  let g1 = 0;

  for (const point of points) {
    const error = theta0 + theta1 * point.x - point.y;
    g0 += error;
    g1 += error * point.x;
  }

  return {
    g0: g0 / points.length,
    g1: g1 / points.length
  };
}

function cyclicBatch(size: number, offset: number) {
  const result: Point[] = [];
  for (let i = 0; i < size; i += 1) {
    const index = (offset * 11 + i * 7) % dataset.length;
    result.push(dataset[index]);
  }
  return result;
}

export function SGDLab({ language }: Props) {
  const [batchSize, setBatchSize] = useState(4);
  const [theta0, setTheta0] = useState(-0.5);
  const [theta1, setTheta1] = useState(0.2);
  const [learningRate, setLearningRate] = useState(0.08);

  const fullGradient = gradient(dataset, theta0, theta1);

  const sampledGradients = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) =>
        gradient(cyclicBatch(batchSize, index), theta0, theta1)
      ),
    [batchSize, theta0, theta1]
  );

  const meanDistance =
    sampledGradients.reduce((sum, grad) => {
      const d0 = grad.g0 - fullGradient.g0;
      const d1 = grad.g1 - fullGradient.g1;
      return sum + Math.sqrt(d0 * d0 + d1 * d1);
    }, 0) / sampledGradients.length;

  const selectedBatch = cyclicBatch(batchSize, 0);
  const miniGradient = gradient(selectedBatch, theta0, theta1);
  const newTheta0 = theta0 - learningRate * miniGradient.g0;
  const newTheta1 = theta1 - learningRate * miniGradient.g1;

  const lineX = [-3.2, 3.2];
  const lineY = lineX.map((x) => theta0 + theta1 * x);
  const newLineY = lineX.map((x) => newTheta0 + newTheta1 * x);

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">SGD / MINI-BATCH LAB</span>
          <h1>{language === "hu" ? "Mi történik a gradient estimate-tel?" : "What happens to the gradient estimate?"}</h1>
          <p>
            {language === "hu"
              ? "A pontok fix, szemléltető szintetikus adatok. A mini-batch gradients ténylegesen ezekből a pontokból számolódnak, így látható a batch size és a gradient zajosság kapcsolata."
              : "The points are fixed illustrative synthetic data. Mini-batch gradients are actually computed from those points, so you can observe the relationship between batch size and gradient noise."}
          </p>
        </div>
        <div className="score-box">
          <span>batch size</span>
          <strong>{batchSize}</strong>
          <span>of {dataset.length}</span>
        </div>
      </div>

      <div className="mlp-controls">
        <label>
          <div><strong>{language === "hu" ? "mini-batch méret (batch size)" : "mini-batch size"}</strong><span>{batchSize}</span></div>
          <input
            type="range"
            min="1"
            max="64"
            step="1"
            value={batchSize}
            onChange={(event) => setBatchSize(Number(event.target.value))}
          />
        </label>
        <label>
          <div><strong>θ₀</strong><span>{theta0.toFixed(2)}</span></div>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={theta0}
            onChange={(event) => setTheta0(Number(event.target.value))}
          />
        </label>
        <label>
          <div><strong>θ₁</strong><span>{theta1.toFixed(2)}</span></div>
          <input
            type="range"
            min="-1"
            max="4"
            step="0.1"
            value={theta1}
            onChange={(event) => setTheta1(Number(event.target.value))}
          />
        </label>
        <label>
          <div><strong>{language === "hu" ? "α — tanulási ráta (learning rate)" : "α — learning rate"}</strong><span>{learningRate.toFixed(3)}</span></div>
          <input
            type="range"
            min="0.005"
            max="0.2"
            step="0.005"
            value={learningRate}
            onChange={(event) => setLearningRate(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="plot-grid">
        <div className="plot-card">
          <h2>{language === "hu" ? "Tanítóadatok és egy mini-batch frissítés" : "Dataset + one mini-batch update"}</h2>\n          <p className="plot-description">{language === "hu" ? "Az X tengely a bemenet x. Az Y tengelyen a valódi célértékek y és a modell becslései ŷ láthatók a mini-batch frissítés előtt és után." : "X is input x. Y shows true targets y and model predictions ŷ before and after the mini-batch update."}</p>
          <PlotAxisKey
            language={language}
            items={[
              { axis: "X", symbol: "x", meaning: language === "hu" ? "bemeneti jellemző (input feature)" : "input feature" },
              { axis: "Y", symbol: "y / ŷ", meaning: language === "hu" ? "valódi célérték / modellbecslés" : "true target / model prediction" }
            ]}
          />
          <Plot
            data={[
              {
                x: dataset.map((point) => point.x),
                y: dataset.map((point) => point.y),
                type: "scatter",
                mode: "markers",
                name: "training data",
                marker: { size: 6 }
              },
              {
                x: selectedBatch.map((point) => point.x),
                y: selectedBatch.map((point) => point.y),
                type: "scatter",
                mode: "markers",
                name: "selected mini-batch",
                marker: { size: 11 }
              },
              {
                x: lineX,
                y: lineY,
                type: "scatter",
                mode: "lines",
                name: "before update"
              },
              {
                x: lineX,
                y: newLineY,
                type: "scatter",
                mode: "lines",
                line: { dash: "dash" },
                name: "after one mini-batch update"
              }
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 50, r: 20, b: 45, t: 10 },
              xaxis: { title: language === "hu" ? "x — bemeneti jellemző" : "x — input feature", gridcolor: "#22314a" },
              yaxis: { title: language === "hu" ? "y / ŷ — célérték / becslés" : "y / ŷ — target / prediction", gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "420px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "Mini-batch gradiensek a teljes gradienshez képest" : "Mini-batch gradients vs full gradient"}</h2>\n          <p className="plot-description">{language === "hu" ? "Ez gradiens-tér: minden pont egy mini-batch gradiensbecslése. Az X komponens ∂J/∂θ₀, az Y komponens ∂J/∂θ₁." : "This is gradient space: each point is a mini-batch gradient estimate. X is ∂J/∂θ₀ and Y is ∂J/∂θ₁."}</p>
          <PlotAxisKey
            language={language}
            items={[
              { axis: "X", symbol: "∂J/∂θ₀", meaning: language === "hu" ? "a veszteség gradiense az eltolás szerint" : "loss gradient with respect to the bias" },
              { axis: "Y", symbol: "∂J/∂θ₁", meaning: language === "hu" ? "a veszteség gradiense a meredekség / súly szerint" : "loss gradient with respect to slope / weight" }
            ]}
          />
          <Plot
            data={[
              {
                x: sampledGradients.map((grad) => grad.g0),
                y: sampledGradients.map((grad) => grad.g1),
                type: "scatter",
                mode: "markers",
                name: "mini-batch gradients",
                marker: { size: 9 }
              },
              {
                x: [fullGradient.g0],
                y: [fullGradient.g1],
                type: "scatter",
                mode: "markers",
                name: "full-dataset gradient",
                marker: { size: 15, symbol: "x" }
              }
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 55, r: 20, b: 50, t: 10 },
              xaxis: { title: language === "hu" ? "∂J/∂θ₀ — eltolás gradiens" : "∂J/∂θ₀ — bias gradient", gridcolor: "#22314a" },
              yaxis: { title: language === "hu" ? "∂J/∂θ₁ — súly gradiens" : "∂J/∂θ₁ — weight gradient", gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "420px" }}
          />
        </div>
      </div>

      <SimulationGuide
        language={language}
        axes={[
          { label: language === "hu" ? "Bal diagram X tengely: x" : "Left plot X-axis: x", meaning: language === "hu" ? "Bemeneti jellemző (input feature) a szintetikus regressziós adathalmazban." : "Input feature in the synthetic regression dataset." },
          { label: language === "hu" ? "Bal diagram Y tengely: y / ŷ" : "Left plot Y-axis: y / ŷ", meaning: language === "hu" ? "Valódi célértékek (y) és modellbecslések (ŷ) a frissítés előtt és után." : "True targets y and model predictions ŷ before and after the update." },
          { label: language === "hu" ? "Jobb diagram X tengely: ∂J/∂θ₀" : "Right plot X-axis: ∂J/∂θ₀", meaning: language === "hu" ? "A mini-batch gradiens eltolás (bias) szerinti komponense." : "Bias component of the mini-batch gradient." },
          { label: language === "hu" ? "Jobb diagram Y tengely: ∂J/∂θ₁" : "Right plot Y-axis: ∂J/∂θ₁", meaning: language === "hu" ? "A mini-batch gradiens meredekség / súly szerinti komponense." : "Slope / weight component of the mini-batch gradient." }
        ]}
        terms={[
          { label: "mini-batch", meaning: language === "hu" ? "A training setből egy update-hez kiválasztott kisebb sample." : "A smaller sample of the training set used for one update." },
          { label: "full gradient", meaning: language === "hu" ? "Az egész demonstrációs datasetből számolt gradient." : "Gradient computed from the entire demonstration dataset." },
          { label: "gradient spread", meaning: language === "hu" ? "Itt szemléltető mérőszám: milyen messze szóródnak a mini-batch gradients a full gradient körül." : "An illustrative measure here: how far mini-batch gradients spread around the full gradient." },
          { label: "α", meaning: language === "hu" ? "learning rate az egyetlen bemutatott update-hez" : "learning rate for the displayed update" }
        ]}
        formulas={[
          {
            expression: "θ := θ − α · gradient(mini-batch)",
            meaning: language === "hu" ? "SGD-ben az update directiont nem feltétlenül a teljes dataset, hanem a kiválasztott mini-batch becsüli." : "In SGD, the update direction is estimated from the selected mini-batch rather than necessarily the full dataset."
          }
        ]}
        realWorld={
          language === "hu"
            ? "Nagy image datasetnél nem praktikus minden parameter update előtt az összes képet feldolgozni. Például 128 image-ből álló mini-batch alapján számolunk gradientet, majd frissítjük a network weights értékeit."
            : "With a large image dataset, processing every image before every parameter update is impractical. For example, compute a gradient from a mini-batch of 128 images and then update the network weights."
        }
      />

      <div className="metric-grid">
        <div className="metric-card">
          <span>{language === "hu" ? "Full gradient θ₀" : "Full gradient θ₀"}</span>
          <strong>{fullGradient.g0.toFixed(3)}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Full gradient θ₁" : "Full gradient θ₁"}</span>
          <strong>{fullGradient.g1.toFixed(3)}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Mini-batch gradient spread" : "Mini-batch gradient spread"}</span>
          <strong>{meanDistance.toFixed(3)}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Examples / update" : "Examples / update"}</span>
          <strong>{batchSize}</strong>
        </div>
      </div>

      <div className="lab-explanation-grid">
        <div className="callout intuition">
          <strong>{language === "hu" ? "Próbáld ki" : "Try this"}</strong>
          <span>
            {language === "hu"
              ? "Állítsd batch size=1-re, majd 64-re. Kis batchnél a gradient pontok jobban szétszóródnak; full batchnél minden sampled gradient a full-dataset gradienthez esik közel."
              : "Set batch size to 1, then to 64. With small batches the gradient points spread more; with a full batch, sampled gradients collapse toward the full-dataset gradient."}
          </span>
        </div>
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "Course trade-off" : "Course trade-off"}</strong>
          <span>
            {language === "hu"
              ? "Kisebb batch → nagyobb variance. Nagyobb batch → nagyobb compute és memory. Ha csak kis batch fér el, a lecture szerint szükség lehet kisebb learning rate-re."
              : "Smaller batch → higher variance. Larger batch → higher compute and memory. If only a small batch fits, the lecture says a smaller learning rate may be needed."}
          </span>
        </div>
      </div>
    </div>
  );
}
