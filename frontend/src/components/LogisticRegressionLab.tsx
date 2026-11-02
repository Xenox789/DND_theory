import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";
import { SimulationGuide } from "./SimulationGuide";
import { PlotAxisKey } from "./PlotAxisKey";

type Props = {
  language: Language;
};

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

function bce(y: number, p: number) {
  const eps = 1e-12;
  const clipped = Math.min(1 - eps, Math.max(eps, p));
  return -y * Math.log(clipped) - (1 - y) * Math.log(1 - clipped);
}

export function LogisticRegressionLab({ language }: Props) {
  const [theta0, setTheta0] = useState(-1);
  const [theta1, setTheta1] = useState(2);
  const [sampleX, setSampleX] = useState(1);
  const [trueLabel, setTrueLabel] = useState(1);

  const xValues = useMemo(
    () => Array.from({ length: 121 }, (_, i) => -6 + i * 0.1),
    []
  );

  const probabilities = xValues.map((x) => sigmoid(theta0 + theta1 * x));
  const sampleZ = theta0 + theta1 * sampleX;
  const sampleProbability = sigmoid(sampleZ);
  const predictedClass = sampleProbability >= 0.5 ? 1 : 0;
  const sampleLoss = bce(trueLabel, sampleProbability);
  const boundaryX = Math.abs(theta1) < 1e-9 ? null : -theta0 / theta1;

  const [b0, setB0] = useState(-0.5);
  const [b1, setB1] = useState(1.1);
  const [b2, setB2] = useState(-0.9);

  const grid = useMemo(
    () => Array.from({ length: 31 }, (_, i) => -4 + i * (8 / 30)),
    []
  );

  const surface = grid.map((x2) =>
    grid.map((x1) => sigmoid(b0 + b1 * x1 + b2 * x2))
  );

  const class0 = [
    [-3.2, -1.7], [-2.8, -0.8], [-2.5, 0.2], [-1.9, 0.9],
    [-1.4, 1.6], [-0.9, 2.2], [-0.4, 2.8]
  ];
  const class1 = [
    [-1.5, -2.6], [-0.8, -2.0], [-0.1, -1.5], [0.6, -0.9],
    [1.2, -0.3], [1.9, 0.3], [2.6, 1.0], [3.1, 1.7]
  ];

  const boundaryLine =
    Math.abs(b2) < 1e-9
      ? null
      : grid.map((x1) => -(b0 + b1 * x1) / b2);

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">LOGISTIC REGRESSION LAB</span>
          <h1>Sigmoid → Probability → Class</h1>
          <p>
            {language === "hu"
              ? "Kövesd végig külön a linear score, sigmoid probability, threshold és class label lépéseket."
              : "Follow the linear score, sigmoid probability, threshold, and class-label steps separately."}
          </p>
        </div>
        <div className="score-box">
          <span>hθ(x)</span>
          <strong>{sampleProbability.toFixed(4)}</strong>
          <span>class = {predictedClass}</span>
        </div>
      </div>

      <div className="lab-controls logistic-controls">
        <label>
          <div><strong>{language === "hu" ? "θ₀ — eltolás (bias/intercept)" : "θ₀ — intercept / bias"}</strong><span>{theta0.toFixed(2)}</span></div>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.1"
            value={theta0}
            onChange={(event) => setTheta0(Number(event.target.value))}
          />
        </label>

        <label>
          <div><strong>{language === "hu" ? "θ₁ — súly (weight)" : "θ₁ — weight"}</strong><span>{theta1.toFixed(2)}</span></div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={theta1}
            onChange={(event) => setTheta1(Number(event.target.value))}
          />
        </label>

        <label>
          <div><strong>{language === "hu" ? "x — kiválasztott bemenet (input)" : "x — selected input"}</strong><span>{sampleX.toFixed(2)}</span></div>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.1"
            value={sampleX}
            onChange={(event) => setSampleX(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>z = θ₀ + θ₁x</span>
          <strong>{sampleZ.toFixed(4)}</strong>
        </div>
        <div className="metric-card">
          <span>g(z) = probability</span>
          <strong>{sampleProbability.toFixed(4)}</strong>
        </div>
        <div className="metric-card">
          <span>threshold</span>
          <strong>0.5</strong>
        </div>
        <div className="metric-card">
          <span>predicted label</span>
          <strong>{predictedClass}</strong>
        </div>
      </div>

      <div className="plot-grid">
        <div className="plot-card">
          <h2>{language === "hu" ? "Egydimenziós logisztikus hipotézis" : "Univariate sigmoid hypothesis"}</h2>\n          <p className="plot-description">{language === "hu" ? "Vízszintes tengely: bemeneti jellemző (x). Függőleges tengely: az 1-es osztály becsült valószínűsége hθ(x)." : "Horizontal axis: input feature x. Vertical axis: estimated probability hθ(x) of class 1."}</p>
          <Plot
            data={[
              {
                x: xValues,
                y: probabilities,
                type: "scatter",
                mode: "lines",
                name: "hθ(x)"
              },
              {
                x: [sampleX],
                y: [sampleProbability],
                type: "scatter",
                mode: "markers",
                marker: { size: 10 },
                name: language === "hu" ? "Kiválasztott input" : "Selected input"
              },
              {
                x: [-6, 6],
                y: [0.5, 0.5],
                type: "scatter",
                mode: "lines",
                line: { dash: "dash" },
                name: "threshold = 0.5"
              },
              ...(boundaryX !== null && boundaryX >= -6 && boundaryX <= 6
                ? [{
                    x: [boundaryX, boundaryX],
                    y: [0, 1],
                    type: "scatter" as const,
                    mode: "lines" as const,
                    line: { dash: "dot" as const },
                    name: "decision boundary"
                  }]
                : [])
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 45, r: 20, b: 45, t: 10 },
              xaxis: { title: language === "hu" ? "x — bemeneti jellemző (input feature)" : "x — input feature", gridcolor: "#22314a" },
              yaxis: { title: language === "hu" ? "hθ(x) — becsült valószínűség" : "hθ(x) — predicted probability", range: [-0.05, 1.05], gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "390px" }}
          />
        </div>

        <div className="plot-card">
          <h2>BCE for the selected example</h2>
          <div className="bce-panel">
            <div className="toggle-group">
              <button
                className={trueLabel === 0 ? "active" : ""}
                onClick={() => setTrueLabel(0)}
              >
                y = 0
              </button>
              <button
                className={trueLabel === 1 ? "active" : ""}
                onClick={() => setTrueLabel(1)}
              >
                y = 1
              </button>
            </div>
            <div className="formula-block">
              L = −y log(h) − (1−y) log(1−h)
            </div>
            <div className="big-metric">
              <span>{language === "hu" ? "Example loss" : "Example loss"}</span>
              <strong>{sampleLoss.toFixed(4)}</strong>
            </div>
            <p>
              {language === "hu"
                ? trueLabel === 1
                  ? "y=1 esetén a loss −log(h). Minél közelebb van h az 1-hez, annál kisebb a loss."
                  : "y=0 esetén a loss −log(1−h). Minél közelebb van h a 0-hoz, annál kisebb a loss."
                : trueLabel === 1
                  ? "For y=1, the loss is −log(h). The closer h is to 1, the smaller the loss."
                  : "For y=0, the loss is −log(1−h). The closer h is to 0, the smaller the loss."}
            </p>
          </div>
        </div>
      </div>

      <SimulationGuide
        language={language}
        axes={[
          {
            label: language === "hu" ? "Sigmoid x-axis: x" : "Sigmoid x-axis: x",
            meaning: language === "hu" ? "A kiválasztott input feature értéke." : "The selected input-feature value."
          },
          {
            label: "Sigmoid y-axis: hθ(x)",
            meaning: language === "hu" ? "A model által becsült probability 0 és 1 között." : "The probability predicted by the model, between 0 and 1."
          },
          {
            label: "threshold = 0.5",
            meaning: language === "hu" ? "A jelenlegi class-decision szabály: h≥0.5 → class 1, különben class 0." : "The current class-decision rule: h≥0.5 → class 1, otherwise class 0."
          }
        ]}
        terms={[
          { label: "z", meaning: language === "hu" ? "linear score, z=θ₀+θ₁x; még nem probability" : "linear score, z=θ₀+θ₁x; not yet a probability" },
          { label: "θ₀", meaning: language === "hu" ? "intercept / bias" : "intercept / bias" },
          { label: "θ₁", meaning: language === "hu" ? "weight: megadja, hogyan változik z az inputtal" : "weight: controls how z changes with the input" },
          { label: "hθ(x)", meaning: language === "hu" ? "sigmoid(z), azaz predicted probability" : "sigmoid(z), the predicted probability" },
          { label: "y", meaning: language === "hu" ? "true binary label, 0 vagy 1" : "true binary label, 0 or 1" },
          { label: "L", meaning: language === "hu" ? "egy example binary cross-entropy loss értéke" : "binary cross-entropy loss for one example" }
        ]}
        formulas={[
          {
            expression: "z = θ₀ + θ₁x",
            meaning: language === "hu" ? "A feature-t egy linear score-rá alakítjuk." : "Convert the feature into a linear score."
          },
          {
            expression: "hθ(x) = 1 / (1 + e^(−z))",
            meaning: language === "hu" ? "A sigmoid a tetszőleges real score-t 0–1 probability tartományba képezi." : "The sigmoid maps any real-valued score into the 0–1 probability range."
          },
          {
            expression: "L = −y log(h) − (1−y) log(1−h)",
            meaning: language === "hu" ? "BCE erősen bünteti, ha a model nagy confidence-szel a true labellel ellentétes probabilityt ad." : "BCE strongly penalizes confident probabilities that disagree with the true label."
          }
        ]}
        realWorld={
          language === "hu"
            ? "Spam detectionnél x lehet egy emailből képzett feature, hθ(x) pedig annak becsült valószínűsége, hogy spam. Több feature esetén ugyanennek a logikának a linear score-ja θ₀+θ₁x₁+θ₂x₂+…."
            : "In spam detection, x could be a feature extracted from an email and hθ(x) the estimated probability that it is spam. With multiple features, the same logic uses a linear score θ₀+θ₁x₁+θ₂x₂+…."
        }
      />

      <div className="hero-card compact lab-section-hero">
        <div>
          <span className="eyebrow">BIVARIATE VIEW</span>
          <h1>{language === "hu" ? "Két feature és decision boundary" : "Two features and the decision boundary"}</h1>
          <p>
            {language === "hu"
              ? "Az alábbi pontok csak illusztratív szintetikus adatok. A probability surface és a boundary viszont pontosan a logistic hypothesis képletéből számolódik."
              : "The points below are illustrative synthetic data only. The probability surface and boundary are computed directly from the logistic-hypothesis formula."}
          </p>
        </div>
      </div>

      <div className="lab-controls">
        <label>
          <div><strong>θ₀</strong><span>{b0.toFixed(2)}</span></div>
          <input type="range" min="-4" max="4" step="0.1" value={b0}
            onChange={(event) => setB0(Number(event.target.value))} />
        </label>
        <label>
          <div><strong>θ₁</strong><span>{b1.toFixed(2)}</span></div>
          <input type="range" min="-3" max="3" step="0.1" value={b1}
            onChange={(event) => setB1(Number(event.target.value))} />
        </label>
        <label>
          <div><strong>θ₂</strong><span>{b2.toFixed(2)}</span></div>
          <input type="range" min="-3" max="3" step="0.1" value={b2}
            onChange={(event) => setB2(Number(event.target.value))} />
        </label>
      </div>

      <div className="plot-grid">
        <div className="plot-card">
          <h2>{language === "hu" ? "Bemeneti sík és döntési határ" : "Input plane + boundary"}</h2>\n          <p className="plot-description">{language === "hu" ? "Minden pont egy két jellemzőből álló adatpont. A vonal azokat a bemeneteket jelöli, amelyeknél a modell 0,5 valószínűséget ad." : "Each point is one example with two features. The line contains inputs for which the model predicts probability 0.5."}</p>
          <Plot
            data={[
              {
                x: class0.map((point) => point[0]),
                y: class0.map((point) => point[1]),
                type: "scatter",
                mode: "markers",
                name: "class 0"
              },
              {
                x: class1.map((point) => point[0]),
                y: class1.map((point) => point[1]),
                type: "scatter",
                mode: "markers",
                name: "class 1"
              },
              ...(boundaryLine
                ? [{
                    x: grid,
                    y: boundaryLine,
                    type: "scatter" as const,
                    mode: "lines" as const,
                    name: "h(x)=0.5"
                  }]
                : [])
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 45, r: 20, b: 45, t: 10 },
              xaxis: { title: "x₁", range: [-4, 4], gridcolor: "#22314a" },
              yaxis: { title: "x₂", range: [-4, 4], gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "420px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "3D valószínűségi felület" : "3D probability surface"}</h2>\n          <p className="plot-description">{language === "hu" ? "Az X és Y tengely a két bemeneti jellemző. A Z tengely és a színskála ugyanazt mutatja: hθ(x₁,x₂), vagyis az 1-es osztály becsült valószínűségét." : "X and Y are the two input features. The Z axis and color scale both show hθ(x₁,x₂), the predicted probability of class 1."}</p>
          <PlotAxisKey
            language={language}
            items={[
              { axis: "X", symbol: "x₁", meaning: language === "hu" ? "első bemeneti jellemző (feature)" : "first input feature" },
              { axis: "Y", symbol: "x₂", meaning: language === "hu" ? "második bemeneti jellemző (feature)" : "second input feature" },
              { axis: "Z", symbol: "hθ(x₁,x₂)", meaning: language === "hu" ? "az 1-es osztály becsült valószínűsége" : "predicted probability of class 1" },
              { axis: language === "hu" ? "SZÍN" : "COLOR", symbol: "hθ(x₁,x₂)", meaning: language === "hu" ? "ugyanaz a valószínűség színnel kódolva" : "the same probability encoded by color" }
            ]}
          />
          <Plot
            data={[
              {
                x: grid,
                y: grid,
                z: surface,
                type: "surface",
                name: "hθ(x₁,x₂)",
                colorbar: { title: { text: language === "hu" ? "hθ(x₁,x₂) — valószínűség" : "hθ(x₁,x₂) — probability" } }
              }
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 10, r: 10, b: 10, t: 10 },
              scene: {
                xaxis: { title: language === "hu" ? "x₁ — 1. jellemző" : "x₁ — feature 1" },
                yaxis: { title: language === "hu" ? "x₂ — 2. jellemző" : "x₂ — feature 2" },
                zaxis: { title: language === "hu" ? "hθ(x₁,x₂) — becsült valószínűség" : "hθ(x₁,x₂) — predicted probability", range: [0, 1] },
                bgcolor: "rgba(0,0,0,0)"
              }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "460px" }}
          />
        </div>
      </div>

      <SimulationGuide
        language={language}
        axes={[
          { label: "2D x-axis: x₁", meaning: language === "hu" ? "Az első input feature." : "The first input feature." },
          { label: "2D y-axis: x₂", meaning: language === "hu" ? "A második input feature." : "The second input feature." },
          { label: "3D x/y axes: x₁,x₂", meaning: language === "hu" ? "Ugyanaz a két-feature-es input space." : "The same two-feature input space." },
          { label: language === "hu" ? "3D Z tengely: hθ(x₁,x₂)" : "3D Z-axis: hθ(x₁,x₂)", meaning: language === "hu" ? "Az adott jellemzőpárhoz tartozó, 1-es osztályra becsült valószínűség. A színskála ugyanezt az értéket mutatja." : "Predicted class-1 probability for that feature pair. The color scale shows the same quantity." }
        ]}
        terms={[
          { label: "decision boundary", meaning: language === "hu" ? "Az inputok halmaza, ahol hθ(x)=0.5." : "The set of inputs where hθ(x)=0.5." },
          { label: "θ₂", meaning: language === "hu" ? "A második feature weight-je." : "Weight of the second feature." }
        ]}
        formulas={[
          {
            expression: "θ₀ + θ₁x₁ + θ₂x₂ = 0",
            meaning: language === "hu"
              ? "0.5 thresholdnél ez írja le a linear decision boundary-t, mert sigmoid(0)=0.5."
              : "At threshold 0.5 this describes the linear decision boundary because sigmoid(0)=0.5."
          }
        ]}
        realWorld={
          language === "hu"
            ? "Például hitelkockázatnál x₁ lehet jövedelem, x₂ adósságterhelés, a surface pedig default probability. A pontok ebben a labban nem valós ügyféladatok, hanem szintetikus szemléltetés."
            : "For example, in credit-risk prediction x₁ could represent income and x₂ debt burden, while the surface represents default probability. The points in this lab are synthetic, not real customer data."
        }
      />

      <div className="lab-explanation-grid">
        <div className="callout intuition">
          <strong>{language === "hu" ? "Összefüggés" : "Connection"}</strong>
          <span>
            {language === "hu"
              ? "A 3D surface-en a decision boundary ott metszi a probability surface-t, ahol h=0.5. Felülnézetben ez a két-feature-es input plane-en egy line."
              : "On the 3D surface, the decision boundary is where the probability surface crosses h=0.5. From above, this becomes a line in the two-feature input plane."}
          </span>
        </div>
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "Vizsgacsapda" : "Exam trap"}</strong>
          <span>
            {language === "hu"
              ? "A boundary nem a probability surface maga. A boundary az inputok halmaza, amelyeknél h(x)=0.5."
              : "The boundary is not the probability surface itself. It is the set of inputs for which h(x)=0.5."}
          </span>
        </div>
      </div>
    </div>
  );
}
