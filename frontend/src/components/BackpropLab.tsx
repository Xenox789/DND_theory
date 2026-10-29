import { useState } from "react";
import type { Language } from "../types";

type Props = {
  language: Language;
};

export function BackpropLab({ language }: Props) {
  const [x, setX] = useState(2);
  const [w, setW] = useState(3);
  const [b, setB] = useState(4);
  const [y, setY] = useState(5);
  const [alpha, setAlpha] = useState(0.1);
  const [stage, setStage] = useState<"forward" | "backward" | "update">("backward");

  const q = w * x;
  const yHat = q + b;
  const z = y - yHat;
  const loss = z * z;

  const dJdJ = 1;
  const dJdz = 2 * z * dJdJ;
  const dJdyHat = -1 * dJdz;
  const dJdy = 1 * dJdz;
  const dJdq = dJdyHat;
  const dJdb = dJdyHat;
  const dJdw = x * dJdq;
  const dJdx = w * dJdq;

  const newW = w - alpha * dJdw;
  const newB = b - alpha * dJdb;
  const newQ = newW * x;
  const newYHat = newQ + newB;
  const newZ = y - newYHat;
  const newLoss = newZ * newZ;

  const showBackward = stage === "backward" || stage === "update";
  const showUpdate = stage === "update";

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">BACKPROPAGATION LAB</span>
          <h1>J = (wx + b − y)²</h1>
          <p>
            {language === "hu"
              ? "A Lecture 6 eredeti példáját követjük. A slide z=y−ŷ köztes változót használ, ezért a graph alább q=wx, ŷ=q+b, z=y−ŷ, J=z² formában fut."
              : "This follows the original Lecture 6 example. The slide uses the intermediate variable z=y−ŷ, so the graph below evaluates q=wx, ŷ=q+b, z=y−ŷ, J=z²."}
          </p>
        </div>
        <div className="score-box">
          <span>J</span>
          <strong>{loss.toFixed(3)}</strong>
          <span>z = {z.toFixed(3)}</span>
        </div>
      </div>

      <div className="mlp-controls">
        <label>
          <div><strong>x</strong><span>{x.toFixed(1)}</span></div>
          <input type="range" min="-5" max="5" step="0.5" value={x}
            onChange={(event) => setX(Number(event.target.value))} />
        </label>
        <label>
          <div><strong>w</strong><span>{w.toFixed(1)}</span></div>
          <input type="range" min="-5" max="5" step="0.5" value={w}
            onChange={(event) => setW(Number(event.target.value))} />
        </label>
        <label>
          <div><strong>b</strong><span>{b.toFixed(1)}</span></div>
          <input type="range" min="-5" max="5" step="0.5" value={b}
            onChange={(event) => setB(Number(event.target.value))} />
        </label>
        <label>
          <div><strong>y</strong><span>{y.toFixed(1)}</span></div>
          <input type="range" min="-10" max="10" step="0.5" value={y}
            onChange={(event) => setY(Number(event.target.value))} />
        </label>
      </div>

      <div className="backprop-stage-row">
        <button className={stage === "forward" ? "active" : ""} onClick={() => setStage("forward")}>
          1. Feed forward
        </button>
        <button className={stage === "backward" ? "active" : ""} onClick={() => setStage("backward")}>
          2. Backprop
        </button>
        <button className={stage === "update" ? "active" : ""} onClick={() => setStage("update")}>
          3. Parameter update
        </button>
      </div>

      <div className="plot-card">
        <h2>{language === "hu" ? "Computational graph" : "Computational graph"}</h2>
        <div className="backprop-graph">
          <div className="graph-node input"><span>w</span><strong>{w.toFixed(2)}</strong>{showBackward && <small>∂J/∂w={dJdw.toFixed(2)}</small>}</div>
          <div className="graph-node input"><span>x</span><strong>{x.toFixed(2)}</strong>{showBackward && <small>∂J/∂x={dJdx.toFixed(2)}</small>}</div>
          <div className="graph-op">×</div>
          <div className="graph-node intermediate"><span>q=wx</span><strong>{q.toFixed(2)}</strong>{showBackward && <small>∂J/∂q={dJdq.toFixed(2)}</small>}</div>
          <div className="graph-node input"><span>b</span><strong>{b.toFixed(2)}</strong>{showBackward && <small>∂J/∂b={dJdb.toFixed(2)}</small>}</div>
          <div className="graph-op">+</div>
          <div className="graph-node intermediate"><span>ŷ=q+b</span><strong>{yHat.toFixed(2)}</strong>{showBackward && <small>∂J/∂ŷ={dJdyHat.toFixed(2)}</small>}</div>
          <div className="graph-node input"><span>y</span><strong>{y.toFixed(2)}</strong>{showBackward && <small>∂J/∂y={dJdy.toFixed(2)}</small>}</div>
          <div className="graph-op">−</div>
          <div className="graph-node intermediate"><span>z=y−ŷ</span><strong>{z.toFixed(2)}</strong>{showBackward && <small>∂J/∂z={dJdz.toFixed(2)}</small>}</div>
          <div className="graph-op">²</div>
          <div className="graph-node loss"><span>J=z²</span><strong>{loss.toFixed(2)}</strong>{showBackward && <small>∂J/∂J={dJdJ}</small>}</div>
        </div>
      </div>

      {showBackward && (
        <>
          <div className="backprop-steps">
            <div><span>square</span><strong>∂J/∂z = 1 · 2z = {dJdz.toFixed(2)}</strong></div>
            <div><span>subtract</span><strong>∂J/∂ŷ = {dJdz.toFixed(2)} · (−1) = {dJdyHat.toFixed(2)}</strong></div>
            <div><span>add</span><strong>∂J/∂b = {dJdyHat.toFixed(2)} · 1 = {dJdb.toFixed(2)}</strong></div>
            <div><span>multiply</span><strong>∂J/∂w = {dJdq.toFixed(2)} · x = {dJdw.toFixed(2)}</strong></div>
          </div>

          <div className="callout intuition">
            <strong>{language === "hu" ? "Chain rule" : "Chain rule"}</strong>
            <span>
              {language === "hu"
                ? "Mindig az incoming gradientet szorozzuk a node local derivative-jével. Például square node-nál local derivative=2z; multiplication node-nál w irányába local derivative=x."
                : "At each node, multiply the incoming gradient by the local derivative. For example, at the square node the local derivative is 2z; at the multiplication node toward w it is x."}
            </span>
          </div>
        </>
      )}

      {showUpdate && (
        <div className="update-panel">
          <label>
            <div><strong>α — learning rate</strong><span>{alpha.toFixed(2)}</span></div>
            <input type="range" min="0.01" max="0.2" step="0.01" value={alpha}
              onChange={(event) => setAlpha(Number(event.target.value))} />
          </label>

          <div className="update-equations">
            <div><span>w update</span><strong>{w.toFixed(2)} − {alpha.toFixed(2)}·{dJdw.toFixed(2)} = {newW.toFixed(2)}</strong></div>
            <div><span>b update</span><strong>{b.toFixed(2)} − {alpha.toFixed(2)}·{dJdb.toFixed(2)} = {newB.toFixed(2)}</strong></div>
            <div><span>new loss</span><strong>{newLoss.toFixed(3)}</strong></div>
          </div>
        </div>
      )}

      <div className="lab-explanation-grid">
        <div className="callout real-world">
          <strong>{language === "hu" ? "Lecture default" : "Lecture default"}</strong>
          <span>
            {language === "hu"
              ? "Állítsd x=2, w=3, b=4, y=5, α=0.1 értékekre. Ekkor J=25, ∂J/∂w=20, ∂J/∂b=10, majd w→1 és b→3, pontosan a slide szerint."
              : "Set x=2, w=3, b=4, y=5, α=0.1. Then J=25, ∂J/∂w=20, ∂J/∂b=10, followed by w→1 and b→3, exactly as in the slide."}
          </span>
        </div>
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "Square-node csapda" : "Square-node trap"}</strong>
          <span>
            {language === "hu"
              ? "Ha c=b², akkor grad_b=grad_c·2b. A local derivative az input variable b szerint készül, ezért nem 2c."
              : "If c=b², then grad_b=grad_c·2b. The local derivative is taken with respect to the input variable b, so it is not 2c."}
          </span>
        </div>
      </div>
    </div>
  );
}
