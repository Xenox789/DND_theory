import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";

type Props = {
  language: Language;
};

const xs = [20, 30, 40, 50, 60, 70, 80];
const ys = [35, 43, 48, 58, 61, 72, 76];

function loss(theta0: number, theta1: number) {
  const sum = xs.reduce((acc, x, i) => {
    const prediction = theta1 * x + theta0;
    const error = prediction - ys[i];
    return acc + error * error;
  }, 0);
  return sum / (2 * xs.length);
}

export function LinearRegressionLab({ language }: Props) {
  const [theta0, setTheta0] = useState(18);
  const [theta1, setTheta1] = useState(0.72);

  const currentLoss = useMemo(() => loss(theta0, theta1), [theta0, theta1]);

  const theta0Values = useMemo(
    () => Array.from({ length: 25 }, (_, i) => i * 2.5),
    []
  );
  const theta1Values = useMemo(
    () => Array.from({ length: 25 }, (_, i) => 0.25 + i * 0.04),
    []
  );

  const z = useMemo(
    () =>
      theta1Values.map((t1) =>
        theta0Values.map((t0) => loss(t0, t1))
      ),
    [theta0Values, theta1Values]
  );

  const lineX = [15, 85];
  const lineY = lineX.map((x) => theta1 * x + theta0);

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">INTERACTIVE LAB</span>
          <h1>Linear Regression Lab</h1>
          <p>
            {language === "hu"
              ? "Mozgasd a model parameters értékeit, és figyeld meg egyszerre a hypothesis function és a loss surface változását."
              : "Move the model parameters and observe the hypothesis function and loss surface at the same time."}
          </p>
        </div>
        <div className="score-box">
          <span>J(θ)</span>
          <strong>{currentLoss.toFixed(2)}</strong>
        </div>
      </div>

      <div className="lab-controls">
        <label>
          <div>
            <strong>θ₀ — bias</strong>
            <span>{theta0.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="0.5"
            value={theta0}
            onChange={(e) => setTheta0(Number(e.target.value))}
          />
        </label>

        <label>
          <div>
            <strong>θ₁ — slope</strong>
            <span>{theta1.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.3"
            step="0.01"
            value={theta1}
            onChange={(e) => setTheta1(Number(e.target.value))}
          />
        </label>

        <div className="formula-card">
          ŷ = θ₁x + θ₀ = {theta1.toFixed(2)}x + {theta0.toFixed(1)}
        </div>
      </div>

      <div className="plot-grid">
        <div className="plot-card">
          <h2>{language === "hu" ? "Adatok és hypothesis" : "Data and hypothesis"}</h2>
          <Plot
            data={[
              {
                x: xs,
                y: ys,
                type: "scatter",
                mode: "markers",
                name: "Training examples"
              },
              {
                x: lineX,
                y: lineY,
                type: "scatter",
                mode: "lines",
                name: "hθ(x)"
              }
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 50, r: 20, b: 45, t: 10 },
              xaxis: { title: "x", gridcolor: "#22314a" },
              yaxis: { title: "y", gridcolor: "#22314a" },
              legend: { orientation: "h" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "380px" }}
          />
        </div>

        <div className="plot-card">
          <h2>3D Loss Surface — J(θ₀, θ₁)</h2>
          <Plot
            data={[
              {
                x: theta0Values,
                y: theta1Values,
                z,
                type: "surface",
                name: "J"
              },
              {
                x: [theta0],
                y: [theta1],
                z: [currentLoss],
                type: "scatter3d",
                mode: "markers",
                marker: { size: 6 },
                name: language === "hu" ? "Jelenlegi parameters" : "Current parameters"
              }
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 10, r: 10, b: 10, t: 10 },
              scene: {
                xaxis: { title: "θ₀" },
                yaxis: { title: "θ₁" },
                zaxis: { title: "J" },
                bgcolor: "rgba(0,0,0,0)"
              }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
      </div>

      <div className="callout exam-trap lab-note">
        <strong>{language === "hu" ? "Mit figyelj meg?" : "What should you observe?"}</strong>
        <span>
          {language === "hu"
            ? "Ugyanaz a θ₀ és θ₁ két külön nézetben jelenik meg. Balra meghatározzák a hypothesis egyenesét; jobbra ugyanaz a parameter pair egy pont a loss surface-en. Training során ezt a pontot szeretnénk a kisebb loss irányába mozgatni."
            : "The same θ₀ and θ₁ appear in two views. On the left they define the hypothesis line; on the right the same parameter pair is a point on the loss surface. During training, we want to move this point toward lower loss."}
        </span>
      </div>
    </div>
  );
}
