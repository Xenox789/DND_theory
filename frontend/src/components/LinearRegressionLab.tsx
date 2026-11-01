import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";
import { SimulationGuide } from "./SimulationGuide";

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
            <strong>{language === "hu" ? "θ₀ — eltolás (bias)" : "θ₀ — bias"}</strong>
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
            <strong>{language === "hu" ? "θ₁ — meredekség (slope)" : "θ₁ — slope"}</strong>
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
          <h2>{language === "hu" ? "Tanítóadatok és lineáris becslés" : "Training data and linear hypothesis"}</h2>\n          <p className="plot-description">{language === "hu" ? "Vízszintes tengely: bemenet (x). Függőleges tengely: valódi címke (y) és a modell becslése (ŷ)." : "Horizontal axis: input x. Vertical axis: true label y and model prediction ŷ."}</p>
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
              xaxis: { title: language === "hu" ? "x — bemeneti jellemző (input feature)" : "x — input feature", gridcolor: "#22314a" },
              yaxis: { title: language === "hu" ? "y / ŷ — valódi érték / becslés" : "y / ŷ — true value / prediction", gridcolor: "#22314a" },
              legend: { orientation: "h" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "380px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "3D veszteségfelület (loss surface)" : "3D Loss Surface — J(θ₀, θ₁)"}</h2>\n          <p className="plot-description">{language === "hu" ? "Minden pont egy θ₀, θ₁ paraméterbeállítás. A függőleges J érték mutatja, mennyire rosszul illeszkedik ez a beállítás az adatokra." : "Each point represents one θ₀, θ₁ parameter setting. Vertical J shows how poorly that setting fits the data."}</p>
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

      <SimulationGuide
        language={language}
        axes={[
          {
            label: language === "hu" ? "Bal plot x-axis: x" : "Left plot x-axis: x",
            meaning: language === "hu"
              ? "Az input feature értéke. A szintetikus adatokban ez 20–80 közötti szám; a képletben ezt adjuk a modellnek bemenetként."
              : "The input-feature value. In the synthetic data it ranges from 20 to 80; this is what the model receives as input."
          },
          {
            label: language === "hu" ? "Bal plot y-axis: y / ŷ" : "Left plot y-axis: y / ŷ",
            meaning: language === "hu"
              ? "A pontoknál y a true label, az egyenesnél ŷ a model prediction."
              : "For the points, y is the true label; for the line, ŷ is the model prediction."
          },
          {
            label: "3D x-axis: θ₀",
            meaning: language === "hu" ? "Bias / intercept parameter." : "Bias / intercept parameter."
          },
          {
            label: "3D y-axis: θ₁",
            meaning: language === "hu" ? "Slope / weight parameter." : "Slope / weight parameter."
          },
          {
            label: "3D z-axis: J",
            meaning: language === "hu"
              ? "A loss: mennyire rosszul illeszkedik az adott θ₀, θ₁ parameter pair a training data pontokra."
              : "The loss: how poorly the selected θ₀, θ₁ parameter pair fits the training data."
          }
        ]}
        terms={[
          { label: "x", meaning: language === "hu" ? "input feature" : "input feature" },
          { label: "y", meaning: language === "hu" ? "true label / valódi célérték" : "true label / target value" },
          { label: "ŷ", meaning: language === "hu" ? "prediction, vagyis a modell becslése" : "prediction produced by the model" },
          { label: "θ₀", meaning: language === "hu" ? "bias / intercept: függőleges eltolás" : "bias / intercept: vertical offset" },
          { label: "θ₁", meaning: language === "hu" ? "slope / weight: az egyenes meredeksége" : "slope / weight: the line's steepness" },
          { label: "J(θ)", meaning: language === "hu" ? "loss function értéke az aktuális parameters mellett" : "loss-function value for the current parameters" }
        ]}
        formulas={[
          {
            expression: "ŷ = θ₁x + θ₀",
            meaning: language === "hu"
              ? "A linear hypothesis: inputból predictiont készít a slope és bias segítségével."
              : "The linear hypothesis: it turns an input into a prediction using slope and bias."
          },
          {
            expression: "J = 1/(2m) · Σ(ŷ − y)²",
            meaning: language === "hu"
              ? "A course least-squares loss: minden training example hibáját négyzetre emeljük, majd összesítjük."
              : "The course least-squares loss: square each training-example error and aggregate them."
          }
        ]}
        realWorld={
          language === "hu"
            ? "Lakásár-becslésnél x lehet például az alapterület, y a tényleges ár, ŷ pedig a modell becsült ára. θ₁ azt mondja meg, mennyit változik a becslés egységnyi x-változásra, θ₀ pedig az alapeltolás."
            : "For apartment-price prediction, x could be floor area, y the actual price, and ŷ the predicted price. θ₁ controls the change in prediction per unit of x, while θ₀ is the baseline offset."
        }
      />

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
