import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";

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
          <div><strong>mini-batch size</strong><span>{batchSize}</span></div>
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
          <div><strong>α</strong><span>{learningRate.toFixed(3)}</span></div>
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
          <h2>{language === "hu" ? "Dataset + egy mini-batch update" : "Dataset + one mini-batch update"}</h2>
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
              xaxis: { title: "x", gridcolor: "#22314a" },
              yaxis: { title: "y", gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "420px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "Mini-batch gradients vs full gradient" : "Mini-batch gradients vs full gradient"}</h2>
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
              xaxis: { title: "∂J/∂θ₀", gridcolor: "#22314a" },
              yaxis: { title: "∂J/∂θ₁", gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "420px" }}
          />
        </div>
      </div>

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
