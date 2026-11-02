import { useState } from "react";
import type { Language } from "../types";

type Comparison = {
  id: string;
  a: string;
  b: string;
  prompt: { hu: string; en: string };
  points: Array<{
    label: { hu: string; en: string };
    a: { hu: string; en: string };
    b: { hu: string; en: string };
  }>;
};

const comparisons: Comparison[] = [
  {
    id: "linear-logistic",
    a: "Linear Regression",
    b: "Logistic Regression",
    prompt: {
      hu: "Mi alapján döntöd el, hogy folytonos értéket vagy osztályvalószínűséget becsülünk?",
      en: "How do you distinguish predicting a continuous value from predicting a class probability?"
    },
    points: [
      {
        label: { hu: "Feladat", en: "Task" },
        a: { hu: "regresszió: folytonos célérték", en: "regression: continuous target" },
        b: { hu: "bináris osztályozás", en: "binary classification" }
      },
      {
        label: { hu: "Kimenet", en: "Output" },
        a: { hu: "tetszőleges valós érték", en: "arbitrary real value" },
        b: { hu: "0 és 1 közötti becsült valószínűség", en: "estimated probability between 0 and 1" }
      },
      {
        label: { hu: "Tipikus veszteség", en: "Typical loss" },
        a: { hu: "MSE / négyzetes veszteség", en: "MSE / squared loss" },
        b: { hu: "BCE / logisztikus veszteség", en: "BCE / logistic loss" }
      }
    ]
  },
  {
    id: "data-split",
    a: "Training",
    b: "Validation / Test",
    prompt: {
      hu: "Melyik adathalmaz mit befolyásolhat anélkül, hogy a végső értékelést beszennyeznénk?",
      en: "Which dataset may influence what without contaminating final evaluation?"
    },
    points: [
      {
        label: { hu: "Training", en: "Training" },
        a: { hu: "modellparaméterek tanítása", en: "learn model parameters" },
        b: { hu: "—", en: "—" }
      },
      {
        label: { hu: "Validation", en: "Validation" },
        a: { hu: "—", en: "—" },
        b: { hu: "hiperparaméterek, modellválasztás, early stopping", en: "hyperparameters, model selection, early stopping" }
      },
      {
        label: { hu: "Test", en: "Test" },
        a: { hu: "—", en: "—" },
        b: { hu: "végső, független teljesítménybecslés", en: "final independent performance estimate" }
      }
    ]
  },
  {
    id: "batch-sgd",
    a: "Batch GD",
    b: "SGD / Mini-batch",
    prompt: {
      hu: "Mi változik, ha nem az egész tanítóhalmazból számoljuk a gradienst?",
      en: "What changes when the gradient is not computed from the full training set?"
    },
    points: [
      {
        label: { hu: "Gradiens", en: "Gradient" },
        a: { hu: "teljes tanítóhalmazból", en: "from the full training set" },
        b: { hu: "kisebb mintából becsült", en: "estimated from a smaller sample" }
      },
      {
        label: { hu: "Variancia", en: "Variance" },
        a: { hu: "nincs mini-batch mintavételi zaj", en: "no mini-batch sampling noise" },
        b: { hu: "kisebb batch → nagyobb gradiensvariancia", en: "smaller batch → higher gradient variance" }
      },
      {
        label: { hu: "Költség", en: "Cost" },
        a: { hu: "egy frissítés drágább lehet", en: "one update can be expensive" },
        b: { hu: "frissítésenként kevesebb adat", en: "less data per update" }
      }
    ]
  },
  {
    id: "numpy-indexing",
    a: "Basic indexing",
    b: "Advanced indexing",
    prompt: {
      hu: "Miből ismered fel, hogy view-t vagy új arrayt kapsz?",
      en: "How do you recognize whether indexing returns a view or a new array?"
    },
    points: [
      {
        label: { hu: "Jelölés", en: "Notation" },
        a: { hu: "egész index + slice", en: "integer index + slices" },
        b: { hu: "integer sequence/array vagy boolean mask", en: "integer sequence/array or boolean mask" }
      },
      {
        label: { hu: "Memória", en: "Memory" },
        a: { hu: "tipikusan view", en: "typically a view" },
        b: { hu: "új array / copy", en: "new array / copy" }
      },
      {
        label: { hu: "Shape", en: "Shape" },
        a: { hu: "egész indexelt tengely eltűnik; slice megtartja", en: "integer-indexed axis collapses; slice remains" },
        b: { hu: "a kiválasztási indexek alakja is számít", en: "selection-index shape also matters" }
      }
    ]
  },
  {
    id: "backprop-optimizer",
    a: "Backpropagation",
    b: "Gradient-based optimizer",
    prompt: {
      hu: "Mi számolja ki a gradienst, és mi módosítja ténylegesen a paramétereket?",
      en: "What computes the gradients, and what actually changes the parameters?"
    },
    points: [
      {
        label: { hu: "Feladat", en: "Role" },
        a: { hu: "∂J/∂parameter gradiensek kiszámítása", en: "compute ∂J/∂parameter gradients" },
        b: { hu: "a gradiensekből paraméterfrissítés készítése", en: "turn gradients into parameter updates" }
      },
      {
        label: { hu: "Alapelv", en: "Core idea" },
        a: { hu: "számítási gráf + láncszabály", en: "computational graph + chain rule" },
        b: { hu: "például θ := θ − α∇J", en: "for example θ := θ − α∇J" }
      },
      {
        label: { hu: "Nem ugyanaz", en: "Not the same" },
        a: { hu: "nem maga az optimizer", en: "not the optimizer itself" },
        b: { hu: "a backprop által adott gradienseket használja", en: "uses gradients produced by backprop" }
      }
    ]
  }
];

export function InterleavedCompare({ language }: { language: Language }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const item = comparisons[index];

  const move = (delta: number) => {
    setIndex((current) => (current + delta + comparisons.length) % comparisons.length);
    setRevealed(false);
  };

  return (
    <section className="interleave-card">
      <div className="dashboard-section-title">
        <div>
          <span className="eyebrow">INTERLEAVED COMPARE</span>
          <h2>{language === "hu" ? "Különböztesd meg a hasonló fogalmakat" : "Distinguish similar concepts"}</h2>
        </div>
        <span className="queue-count">{index + 1}/{comparisons.length}</span>
      </div>

      <div className="compare-prompt">
        <div className="compare-title">
          <strong>{item.a}</strong>
          <span>vs</span>
          <strong>{item.b}</strong>
        </div>
        <p>{item.prompt[language]}</p>
      </div>

      {!revealed ? (
        <button className="primary-button" onClick={() => setRevealed(true)}>
          {language === "hu" ? "Összehasonlítás felfedése" : "Reveal comparison"}
        </button>
      ) : (
        <div className="compare-table">
          {item.points.map((point) => (
            <div className="compare-row" key={point.label.en}>
              <strong>{point.label[language]}</strong>
              <span>{point.a[language]}</span>
              <span>{point.b[language]}</span>
            </div>
          ))}
        </div>
      )}

      <div className="compare-nav">
        <button className="secondary-button inline" onClick={() => move(-1)}>←</button>
        <span>{language === "hu" ? "Előbb próbáld fejben felidézni a különbséget." : "Try to recall the distinction before revealing it."}</span>
        <button className="secondary-button inline" onClick={() => move(1)}>→</button>
      </div>
    </section>
  );
}
