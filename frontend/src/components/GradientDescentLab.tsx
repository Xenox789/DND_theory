import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";

type Props = {
  language: Language;
};

const xs = [20, 30, 40, 50, 60, 70, 80];
const ys = [35, 43, 48, 58, 61, 72, 76];

type Point = {
  theta0: number;
  theta1: number;
  loss: number;
};

function loss(theta0: number, theta1: number) {
  const squaredErrorSum = xs.reduce((sum, x, index) => {
    const error = theta1 * x + theta0 - ys[index];
    return sum + error * error;
  }, 0);

  // Course convention: J = 1/(2m) * sum(error^2)
  return squaredErrorSum / (2 * xs.length);
}

function gradient(theta0: number, theta1: number) {
  let grad0 = 0;
  let grad1 = 0;

  xs.forEach((x, index) => {
    const error = theta1 * x + theta0 - ys[index];
    grad0 += error;
    grad1 += error * x;
  });

  return {
    grad0: grad0 / xs.length,
    grad1: grad1 / xs.length
  };
}

export function GradientDescentLab({ language }: Props) {
  const initial: Point = { theta0: 0, theta1: 0, loss: loss(0, 0) };
  const [history, setHistory] = useState<Point[]>([initial]);
  const [learningRate, setLearningRate] = useState(0.0002);

  const current = history[history.length - 1];
  const currentGradient = gradient(current.theta0, current.theta1);

  const theta0Values = useMemo(
    () => Array.from({ length: 31 }, (_, i) => -5 + i * 2),
    []
  );
  const theta1Values = useMemo(
    () => Array.from({ length: 31 }, (_, i) => i * (1.4 / 30)),
    []
  );
  const surface = useMemo(
    () =>
      theta1Values.map((theta1) =>
        theta0Values.map((theta0) => loss(theta0, theta1))
      ),
    [theta0Values, theta1Values]
  );

  const takeSteps = (count: number) => {
    setHistory((oldHistory) => {
      const nextHistory = [...oldHistory];
      let point = nextHistory[nextHistory.length - 1];

      for (let i = 0; i < count; i += 1) {
        const grad = gradient(point.theta0, point.theta1);
        const theta0 = point.theta0 - learningRate * grad.grad0;
        const theta1 = point.theta1 - learningRate * grad.grad1;
        const nextLoss = loss(theta0, theta1);

        if (
          !Number.isFinite(theta0) ||
          !Number.isFinite(theta1) ||
          !Number.isFinite(nextLoss) ||
          nextLoss > 1e12
        ) {
          break;
        }

        point = { theta0, theta1, loss: nextLoss };
        nextHistory.push(point);
      }

      return nextHistory;
    });
  };

  const reset = () => setHistory([initial]);

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">GRADIENT DESCENT LAB</span>
          <h1>Gradient Descent</h1>
          <p>
            {language === "hu"
              ? "Lépj végig a tanári képletek szerinti parameter update-eken, és figyeld a trajectory-t a 3D loss surface-en."
              : "Step through parameter updates using the course formulas and observe the trajectory on the 3D loss surface."}
          </p>
        </div>
        <div className="score-box">
          <span>J(θ)</span>
          <strong>{current.loss.toFixed(3)}</strong>
          <span>{history.length - 1} {language === "hu" ? "lépés" : "steps"}</span>
        </div>
      </div>

      <div className="lab-controls gradient-controls">
        <label>
          <div>
            <strong>α — learning rate</strong>
            <span>{learningRate.toFixed(5)}</span>
          </div>
          <input
            type="range"
            min="0.00005"
            max="0.001"
            step="0.00005"
            value={learningRate}
            onChange={(event) => setLearningRate(Number(event.target.value))}
          />
        </label>

        <div className="formula-card">
          θ := θ − α∇J(θ)
        </div>

        <div className="button-row">
          <button className="primary-button" onClick={() => takeSteps(1)}>
            +1 {language === "hu" ? "lépés" : "step"}
          </button>
          <button className="primary-button" onClick={() => takeSteps(20)}>
            +20 {language === "hu" ? "lépés" : "steps"}
          </button>
          <button className="secondary-button inline" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>θ₀</span>
          <strong>{current.theta0.toFixed(4)}</strong>
        </div>
        <div className="metric-card">
          <span>θ₁</span>
          <strong>{current.theta1.toFixed(4)}</strong>
        </div>
        <div className="metric-card">
          <span>∂J/∂θ₀</span>
          <strong>{currentGradient.grad0.toFixed(4)}</strong>
        </div>
        <div className="metric-card">
          <span>∂J/∂θ₁</span>
          <strong>{currentGradient.grad1.toFixed(4)}</strong>
        </div>
      </div>

      <div className="plot-card">
        <h2>3D Loss Surface + Gradient Descent trajectory</h2>
        <Plot
          data={[
            {
              x: theta0Values,
              y: theta1Values,
              z: surface,
              type: "surface",
              opacity: 0.82,
              name: "J(θ₀, θ₁)"
            },
            {
              x: history.map((point) => point.theta0),
              y: history.map((point) => point.theta1),
              z: history.map((point) => point.loss),
              type: "scatter3d",
              mode: "lines+markers",
              marker: { size: 4 },
              line: { width: 5 },
              name: language === "hu" ? "Gradient descent útvonala" : "Gradient descent path"
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
          style={{ width: "100%", height: "520px" }}
        />
      </div>

      <div className="lab-explanation-grid">
        <div className="callout intuition">
          <strong>{language === "hu" ? "Mit számolunk?" : "What are we computing?"}</strong>
          <span>
            {language === "hu"
              ? "J(θ₀,θ₁)=1/(2m)·Σ(θ₁x+θ₀−y)², ezért ∂J/∂θ₀=(1/m)Σ(error), ∂J/∂θ₁=(1/m)Σ(error·x)."
              : "J(θ₀,θ₁)=1/(2m)·Σ(θ₁x+θ₀−y)², therefore ∂J/∂θ₀=(1/m)Σ(error) and ∂J/∂θ₁=(1/m)Σ(error·x)."}
          </span>
        </div>
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "Próbáld ki" : "Try this"}</strong>
          <span>
            {language === "hu"
              ? "Növeld α-t. Túl nagy learning rate esetén a lépések túllőhetnek a minimumon, és a convergence elromolhat. A linear-MSE global optimum garanciája megfelelően kicsi step size-ra vonatkozik."
              : "Increase α. With an excessively large learning rate, updates may overshoot the minimum and convergence can fail. The linear-MSE global-optimum guarantee assumes a sufficiently small step size."}
          </span>
        </div>
      </div>
    </div>
  );
}
