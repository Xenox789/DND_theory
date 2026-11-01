import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";
import { SimulationGuide } from "./SimulationGuide";

type Props = {
  language: Language;
};

export function GeneralizationLab({ language }: Props) {
  const [capacity, setCapacity] = useState(5);

  const complexity = useMemo(
    () => Array.from({ length: 10 }, (_, index) => index + 1),
    []
  );

  const trainByCapacity = complexity.map((value) => 1.2 / (value + 0.4) + 0.04);
  const valByCapacity = complexity.map(
    (value) => 0.24 + 0.035 * (value - 5) * (value - 5)
  );

  const capacityIndex = capacity - 1;
  const currentTrain = trainByCapacity[capacityIndex];
  const currentVal = valByCapacity[capacityIndex];

  const region =
    capacity <= 3
      ? language === "hu"
        ? "Underfitting"
        : "Underfitting"
      : capacity <= 6
        ? language === "hu"
          ? "Just right / balanced"
          : "Just right / balanced"
        : language === "hu"
          ? "Overfitting risk"
          : "Overfitting risk";

  const epochs = useMemo(
    () => Array.from({ length: 101 }, (_, index) => index),
    []
  );

  const trainLoss = epochs.map(
    (epoch) => 1.15 * Math.exp(-epoch / 30) + 0.09
  );

  const validationLoss = epochs.map((epoch) => {
    const base = 0.92 * Math.exp(-epoch / 26) + 0.17;
    const overfitPenalty = epoch > 42 ? 0.00042 * (epoch - 42) ** 2 : 0;
    return base + overfitPenalty;
  });

  const bestEpoch = validationLoss.reduce(
    (best, value, index, arr) => (value < arr[best] ? index : best),
    0
  );

  const [selectedEpoch, setSelectedEpoch] = useState(bestEpoch);

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">GENERALIZATION LAB</span>
          <h1>{language === "hu" ? "Underfitting → Just right → Overfitting" : "Underfitting → Just right → Overfitting"}</h1>
          <p>
            {language === "hu"
              ? "A görbék szemléltető, szintetikus példák. A vizsgán felismerendő loss-patternöket mutatják."
              : "The curves are illustrative synthetic examples. They show the loss patterns you are expected to recognize in the test."}
          </p>
        </div>
        <div className="score-box">
          <span>{language === "hu" ? "Model complexity" : "Model complexity"}</span>
          <strong>{capacity}</strong>
          <span>{region}</span>
        </div>
      </div>

      <div className="lab-controls capacity-controls">
        <label>
          <div>
            <strong>{language === "hu" ? "Model capacity / complexity" : "Model capacity / complexity"}</strong>
            <span>{capacity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={capacity}
            onChange={(event) => setCapacity(Number(event.target.value))}
          />
        </label>
        <div className="formula-card">
          {language === "hu"
            ? "Túl kevés capacity → underfit | túl sok → overfit risk"
            : "Too little capacity → underfit | too much → overfit risk"}
        </div>
      </div>

      <div className="plot-grid">
        <div className="plot-card">
          <h2>{language === "hu" ? "Loss vs model complexity" : "Loss vs model complexity"}</h2>
          <Plot
            data={[
              {
                x: complexity,
                y: trainByCapacity,
                type: "scatter",
                mode: "lines+markers",
                name: "J_train"
              },
              {
                x: complexity,
                y: valByCapacity,
                type: "scatter",
                mode: "lines+markers",
                name: "J_val"
              },
              {
                x: [capacity, capacity],
                y: [currentTrain, currentVal],
                type: "scatter",
                mode: "markers",
                marker: { size: 12 },
                name: language === "hu" ? "Kiválasztott complexity" : "Selected complexity"
              }
            ]}
            layout={{
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#d8e3f4" },
              margin: { l: 50, r: 20, b: 45, t: 10 },
              xaxis: { title: "model complexity", gridcolor: "#22314a" },
              yaxis: { title: "loss", gridcolor: "#22314a" }
            }}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: "100%", height: "390px" }}
          />
        </div>

        <div className="plot-card">
          <h2>{language === "hu" ? "Mit jelent a kiválasztott pont?" : "What does the selected point mean?"}</h2>
          <div className="generalization-state">
            <div className="big-metric">
              <span>J_train</span>
              <strong>{currentTrain.toFixed(3)}</strong>
            </div>
            <div className="big-metric">
              <span>J_val</span>
              <strong>{currentVal.toFixed(3)}</strong>
            </div>
            <div className="state-label">{region}</div>
            <p>
              {capacity <= 3
                ? language === "hu"
                  ? "Mindkét loss viszonylag magas: a model túl egyszerű ahhoz, hogy a training data szerkezetét jól megtanulja."
                  : "Both losses are relatively high: the model is too simple to learn the structure of the training data well."
                : capacity <= 6
                  ? language === "hu"
                    ? "Training és validation loss is alacsony: a model capacity és generalization közötti egyensúly jó."
                    : "Both training and validation losses are low: the balance between model capacity and generalization is good."
                  : language === "hu"
                    ? "Training loss tovább javul, de validation loss romlik: a nagyobb capacity egyre inkább a training set részleteire specializálódik."
                    : "Training loss keeps improving while validation loss worsens: extra capacity increasingly specializes to details of the training set."}
            </p>
          </div>
        </div>
      </div>

      <SimulationGuide
        language={language}
        axes={[
          { label: "x-axis: model complexity", meaning: language === "hu" ? "Szemléltető scale arra, mennyire nagy/flexible a model capacity." : "Illustrative scale for how large/flexible the model capacity is." },
          { label: "y-axis: loss", meaning: language === "hu" ? "Prediction error összefoglaló értéke; alacsonyabb jobb." : "Aggregate prediction-error value; lower is better." },
          { label: "J_train", meaning: language === "hu" ? "Loss a training seten." : "Loss on the training set." },
          { label: "J_val", meaning: language === "hu" ? "Loss a validation seten, model selectionhez." : "Loss on the validation set, used for model selection." }
        ]}
        terms={[
          { label: "capacity", meaning: language === "hu" ? "A model képessége komplex mappings megtanulására; ez a slider csak szemléltető index." : "The model's ability to learn complex mappings; this slider is only an illustrative index." },
          { label: "underfitting", meaning: language === "hu" ? "A model túl egyszerű; training loss is magas." : "The model is too simple; even training loss remains high." },
          { label: "overfitting", meaning: language === "hu" ? "Training performance javul, de unseen/validation performance romlik." : "Training performance improves while unseen/validation performance worsens." }
        ]}
        realWorld={
          language === "hu"
            ? "Képosztályozásnál a capacity nőhet például több layerrel vagy neuronnal. Túl kis network nem tanulja meg a mintát; túl nagy network kevés data mellett a training set sajátosságaira specializálódhat."
            : "In image classification, capacity can increase with more layers or neurons. A network that is too small may miss the pattern; one that is too large relative to the data may specialize to the training set."
        }
      />

      <div className="hero-card compact lab-section-hero">
        <div>
          <span className="eyebrow">EARLY STOPPING</span>
          <h1>{language === "hu" ? "J_val-t figyelünk, nem J_test-et" : "Monitor J_val, not J_test"}</h1>
          <p>
            {language === "hu"
              ? "Mozgasd az epoch slidert. A synthetic example megmutatja, hogyan csökkenhet tovább J_train, miközben J_val már romlik."
              : "Move the epoch slider. The synthetic example shows how J_train can keep falling while J_val has already started to worsen."}
          </p>
        </div>
        <div className="score-box">
          <span>{language === "hu" ? "Best validation epoch" : "Best validation epoch"}</span>
          <strong>{bestEpoch}</strong>
        </div>
      </div>

      <div className="lab-controls">
        <label>
          <div>
            <strong>epoch</strong>
            <span>{selectedEpoch}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={selectedEpoch}
            onChange={(event) => setSelectedEpoch(Number(event.target.value))}
          />
        </label>
        <div className="formula-card">
          {language === "hu"
            ? "correct early stopping signal: J_val no longer improves"
            : "correct early stopping signal: J_val no longer improves"}
        </div>
      </div>

      <div className="plot-card">
        <h2>Training vs validation loss</h2>
        <Plot
          data={[
            {
              x: epochs,
              y: trainLoss,
              type: "scatter",
              mode: "lines",
              name: "J_train"
            },
            {
              x: epochs,
              y: validationLoss,
              type: "scatter",
              mode: "lines",
              name: "J_val"
            },
            {
              x: [bestEpoch, bestEpoch],
              y: [0, Math.max(...validationLoss)],
              type: "scatter",
              mode: "lines",
              line: { dash: "dash" },
              name: language === "hu" ? "best validation state" : "best validation state"
            },
            {
              x: [selectedEpoch],
              y: [validationLoss[selectedEpoch]],
              type: "scatter",
              mode: "markers",
              marker: { size: 12 },
              name: language === "hu" ? "kiválasztott epoch" : "selected epoch"
            }
          ]}
          layout={{
            autosize: true,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#d8e3f4" },
            margin: { l: 50, r: 20, b: 45, t: 10 },
            xaxis: { title: "epoch", gridcolor: "#22314a" },
            yaxis: { title: "loss", gridcolor: "#22314a" }
          }}
          config={{ responsive: true, displaylogo: false }}
          style={{ width: "100%", height: "430px" }}
        />
      </div>

      <SimulationGuide
        language={language}
        axes={[
          { label: "x-axis: epoch", meaning: language === "hu" ? "Hányszor haladt végig a training process a training data-n; itt szemléltető training-time index." : "How far training has progressed; here it acts as an illustrative training-time index." },
          { label: "y-axis: loss", meaning: language === "hu" ? "Training vagy validation error." : "Training or validation error." }
        ]}
        terms={[
          { label: "best epoch", meaning: language === "hu" ? "Az epoch, ahol J_val a legalacsonyabb ebben a szintetikus példában." : "The epoch where J_val is lowest in this synthetic example." },
          { label: "early stopping", meaning: language === "hu" ? "Training megállítása validation signal alapján, mielőtt a generalization romlik." : "Stopping training according to the validation signal before generalization degrades." },
          { label: "J_test", meaning: language === "hu" ? "Final, független evaluationhoz tartjuk fenn; nem early stoppinghoz." : "Reserved for final independent evaluation, not early stopping." }
        ]}
        realWorld={
          language === "hu"
            ? "Egy neural network trainingnél gyakori, hogy J_train tovább csökken, miközben J_val egy pont után emelkedik. Ilyenkor a validation minimum környéki model checkpointot érdemes megtartani."
            : "During neural-network training, J_train can continue falling while J_val starts increasing. A checkpoint near the validation minimum is then the useful model-selection point."
        }
      />

      <div className="lab-explanation-grid">
        <div className="callout intuition">
          <strong>{language === "hu" ? "Helyes modellválasztás" : "Correct model selection"}</strong>
          <span>
            {language === "hu"
              ? "θ model parameters → training set. Hyperparameters és early-stopping döntés → validation set. Final unbiased estimate → test set."
              : "Model parameters θ → training set. Hyperparameters and early-stopping decision → validation set. Final unbiased estimate → test set."}
          </span>
        </div>
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "J_test használata itt cheating" : "Using J_test here is cheating"}</strong>
          <span>
            {language === "hu"
              ? "Ha J_test minimuma alapján állítod le a traininget, már hozzáigazítottad a model selectiont a test sethez. Ezért a course a helyes early stoppinghoz J_val-t használ."
              : "If you stop training according to the minimum of J_test, model selection has already been adapted to the test set. This is why the course uses J_val for correct early stopping."}
          </span>
        </div>
      </div>

      <div className="split-flow">
        <div className="split-card">
          <span>TRAIN</span>
          <strong>θ</strong>
          <p>{language === "hu" ? "Model parameters tanítása" : "Train model parameters"}</p>
        </div>
        <div className="flow-arrow">→</div>
        <div className="split-card">
          <span>VALIDATION</span>
          <strong>Ψ</strong>
          <p>{language === "hu" ? "Hyperparameters / early stopping" : "Hyperparameters / early stopping"}</p>
        </div>
        <div className="flow-arrow">→</div>
        <div className="split-card">
          <span>TEST</span>
          <strong>FINAL</strong>
          <p>{language === "hu" ? "Egyszeri független értékelés" : "Independent final evaluation"}</p>
        </div>
      </div>
    </div>
  );
}
