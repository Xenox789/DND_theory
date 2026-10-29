import { useMemo, useState } from "react";
import type { Language } from "../types";

type Props = {
  language: Language;
};

type IndexExample = {
  expression: string;
  result: string;
  shape: string;
  kind: string;
  explanationHu: string;
  explanationEn: string;
};

const indexExamples: IndexExample[] = [
  {
    expression: "a[:, :]",
    result: "array",
    shape: "(32, 5)",
    kind: "basic indexing → view",
    explanationHu: "Mindkét axis slice, ezért mindkettő megmarad.",
    explanationEn: "Both axes are sliced, so both are retained."
  },
  {
    expression: "a[:, 1]",
    result: "array",
    shape: "(32,)",
    kind: "basic indexing → view",
    explanationHu: "Axis 1 integer-indexelt, ezért collapse-ol.",
    explanationEn: "Axis 1 is integer-indexed, so it collapses."
  },
  {
    expression: "a[1, :]",
    result: "array",
    shape: "(5,)",
    kind: "basic indexing → view",
    explanationHu: "Axis 0 integer-indexelt, axis 1 slice.",
    explanationEn: "Axis 0 is integer-indexed and axis 1 is sliced."
  },
  {
    expression: "a[1:, :]",
    result: "array",
    shape: "(31, 5)",
    kind: "basic indexing → view",
    explanationHu: "31 row marad, mind az 5 column megmarad.",
    explanationEn: "31 rows remain and all 5 columns are retained."
  },
  {
    expression: "a[0, :-1]",
    result: "array",
    shape: "(4,)",
    kind: "basic indexing → view",
    explanationHu: "A row axis collapse-ol, az utolsó column kimarad.",
    explanationEn: "The row axis collapses and the last column is excluded."
  },
  {
    expression: "a[[0], :]",
    result: "array",
    shape: "(1, 5)",
    kind: "advanced indexing → copy",
    explanationHu: "A [0] integer sequence advanced indexing; length-1 axis marad.",
    explanationEn: "[0] is an integer sequence, triggering advanced indexing and retaining a length-1 result axis."
  },
  {
    expression: "a[[-1, -1], -1]",
    result: "array",
    shape: "(2,)",
    kind: "advanced indexing → copy",
    explanationHu: "Két row indexhez az utolsó column két eleme kerül a resultba.",
    explanationEn: "Two row indices select two values from the last column."
  },
  {
    expression: "a < 0",
    result: "bool array",
    shape: "(32, 5)",
    kind: "element-wise comparison",
    explanationHu: "A comparison minden elementre külön történik, ezért shape-preserving.",
    explanationEn: "The comparison is applied element-wise, so the shape is preserved."
  },
  {
    expression: "a.T",
    result: "array",
    shape: "(5, 32)",
    kind: "transpose → view",
    explanationHu: "A két axis sorrendje felcserélődik.",
    explanationEn: "The order of the two axes is swapped."
  },
  {
    expression: "a + a[:, None, :]",
    result: "array",
    shape: "(32, 32, 5)",
    kind: "broadcasting",
    explanationHu: "(32,5) → (1,32,5), a másik (32,1,5), közös shape (32,32,5).",
    explanationEn: "(32,5) becomes (1,32,5), the other is (32,1,5), giving common shape (32,32,5)."
  },
  {
    expression: "np.mean(a, axis=0)",
    result: "array",
    shape: "(5,)",
    kind: "reduction",
    explanationHu: "Axis 0 collapse-ol, axis 1 megmarad.",
    explanationEn: "Axis 0 collapses while axis 1 remains."
  },
  {
    expression: "np.mean(a, axis=1)",
    result: "array",
    shape: "(32,)",
    kind: "reduction",
    explanationHu: "Axis 1 collapse-ol, axis 0 megmarad.",
    explanationEn: "Axis 1 collapses while axis 0 remains."
  }
];

function parseShape(value: string): number[] | null {
  const cleaned = value.trim().replace(/[()\[\]]/g, "");
  if (!cleaned) return [];
  const parts = cleaned.split(",").map((part) => part.trim()).filter(Boolean);
  const values = parts.map(Number);
  if (values.some((number) => !Number.isInteger(number) || number < 0)) return null;
  return values;
}

function broadcastShapes(a: number[], b: number[]) {
  const length = Math.max(a.length, b.length);
  const aa = [...Array(length - a.length).fill(1), ...a];
  const bb = [...Array(length - b.length).fill(1), ...b];
  const result: number[] = [];
  const steps: string[] = [];

  for (let index = 0; index < length; index += 1) {
    const av = aa[index];
    const bv = bb[index];
    if (av === bv) {
      result.push(av);
      steps.push(av + " vs " + bv + " → equal → " + av);
    } else if (av === 1) {
      result.push(bv);
      steps.push(av + " vs " + bv + " → 1 expands → " + bv);
    } else if (bv === 1) {
      result.push(av);
      steps.push(av + " vs " + bv + " → 1 expands → " + av);
    } else {
      return {
        ok: false,
        normalizedA: aa,
        normalizedB: bb,
        result: null,
        steps: [...steps, av + " vs " + bv + " → incompatible"]
      };
    }
  }

  return { ok: true, normalizedA: aa, normalizedB: bb, result, steps };
}

type ViewExample = {
  id: string;
  operation: string;
  resultKind: string;
  before: string;
  afterDerived: string;
  afterBase: string;
  explanationHu: string;
  explanationEn: string;
};

const viewExamples: ViewExample[] = [
  {
    id: "reshape",
    operation: "y = x.reshape(2, 2)",
    resultKind: "view",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:, :] = 99",
    afterBase: "x = [99, 99, 99, 99]",
    explanationHu: "Az official contiguous example-ben reshape shared-memory view.",
    explanationEn: "In the official contiguous example, reshape is a shared-memory view."
  },
  {
    id: "transpose",
    operation: "y = x.T",
    resultKind: "view",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:] = 99",
    afterBase: "x = [99, 99, 99, 99]",
    explanationHu: "1D-ben .T shape-et sem változtat; shared-memory view marad.",
    explanationEn: "For 1D arrays, .T does not even change shape; it remains a shared-memory view."
  },
  {
    id: "append",
    operation: "y = np.append(x, 42)",
    resultKind: "copy / new array",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:] = 99",
    afterBase: "x = [0, 1, 2, 3]",
    explanationHu: "append új arrayt hoz létre.",
    explanationEn: "append creates a new array."
  },
  {
    id: "slice",
    operation: "y = x[1:2]",
    resultKind: "view",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:] = 99",
    afterBase: "x = [0, 99, 2, 3]",
    explanationHu: "Basic slicing view, ezért x[1] is módosul.",
    explanationEn: "Basic slicing returns a view, so x[1] is modified too."
  },
  {
    id: "advanced",
    operation: "y = x[[1, 2]]",
    resultKind: "copy / new array",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:] = 99",
    afterBase: "x = [0, 1, 2, 3]",
    explanationHu: "Integer-array indexing advanced indexing, tehát copy.",
    explanationEn: "Integer-array indexing is advanced indexing, therefore a copy."
  },
  {
    id: "mask",
    operation: "y = x[x < 2]",
    resultKind: "copy / new array",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:] = 99",
    afterBase: "x = [0, 1, 2, 3]",
    explanationHu: "Boolean-mask indexing advanced indexing, tehát copy.",
    explanationEn: "Boolean-mask indexing is advanced indexing, therefore a copy."
  },
  {
    id: "arithmetic",
    operation: "y = x + x",
    resultKind: "new computed array",
    before: "x = [0, 1, 2, 3]",
    afterDerived: "y[:] = 99",
    afterBase: "x = [0, 1, 2, 3]",
    explanationHu: "Az arithmetic expression külön result arrayt számol.",
    explanationEn: "The arithmetic expression computes a separate result array."
  }
];

export function NumPyLab({ language }: Props) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [shapeA, setShapeA] = useState("(32, 5)");
  const [shapeB, setShapeB] = useState("(32, 1)");
  const [viewId, setViewId] = useState("slice");

  const current = indexExamples[exampleIndex];
  const currentView = viewExamples.find((example) => example.id === viewId) ?? viewExamples[0];

  const broadcasting = useMemo(() => {
    const a = parseShape(shapeA);
    const b = parseShape(shapeB);
    if (a === null || b === null) return null;
    return broadcastShapes(a, b);
  }, [shapeA, shapeB]);

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">NUMPY THEORY TEST LAB</span>
          <h1>{language === "hu" ? "Shape-eket követni, nem találgatni" : "Track shapes instead of guessing"}</h1>
          <p>
            {language === "hu"
              ? "A példák a weeks 3–6 practice videók és a hivatalos Theory Test example dokumentum mintáit követik. ndarray.strides és stride tricks szándékosan nincsenek benne."
              : "The examples follow the weeks 3–6 practice videos and the official Theory Test example document. ndarray.strides and stride tricks are intentionally excluded."}
          </p>
        </div>
      </div>

      <div className="hero-card compact lab-section-hero">
        <div>
          <span className="eyebrow">INDEXING / SHAPE EXPLORER</span>
          <h1>a.shape = (32, 5)</h1>
        </div>
      </div>

      <div className="numpy-selector">
        <label>
          <span>{language === "hu" ? "Expression" : "Expression"}</span>
          <select value={exampleIndex} onChange={(event) => setExampleIndex(Number(event.target.value))}>
            {indexExamples.map((example, index) => (
              <option key={example.expression} value={index}>
                {example.expression}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="numpy-result-grid">
        <div className="metric-card">
          <span>{language === "hu" ? "Result type" : "Result type"}</span>
          <strong>{current.result}</strong>
        </div>
        <div className="metric-card">
          <span>shape</span>
          <strong>{current.shape}</strong>
        </div>
        <div className="metric-card">
          <span>{language === "hu" ? "Mechanism" : "Mechanism"}</span>
          <strong>{current.kind}</strong>
        </div>
      </div>

      <div className="formula-block">{current.expression}</div>
      <div className="callout intuition">
        <strong>{language === "hu" ? "Miért?" : "Why?"}</strong>
        <span>{language === "hu" ? current.explanationHu : current.explanationEn}</span>
      </div>

      <div className="hero-card compact lab-section-hero">
        <div>
          <span className="eyebrow">BROADCASTING SOLVER</span>
          <h1>{language === "hu" ? "Írj be két shape-et" : "Enter two shapes"}</h1>
          <p>
            {language === "hu"
              ? "Ugyanazt az algoritmust követi, amit a week 5 slide: leading 1 axes hozzáadása, majd axis-onként equal-or-one ellenőrzés."
              : "This follows the same algorithm shown in week 5: add leading 1 axes, then check equal-or-one compatibility axis by axis."}
          </p>
        </div>
      </div>

      <div className="broadcast-input-grid">
        <label>
          <span>shape A</span>
          <input value={shapeA} onChange={(event) => setShapeA(event.target.value)} />
        </label>
        <label>
          <span>shape B</span>
          <input value={shapeB} onChange={(event) => setShapeB(event.target.value)} />
        </label>
      </div>

      {broadcasting === null ? (
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "Invalid shape input" : "Invalid shape input"}</strong>
          <span>{language === "hu" ? "Használj például (32,5) formátumot." : "Use a format such as (32,5)."}</span>
        </div>
      ) : (
        <>
          <div className="broadcast-normalized">
            <div>
              <span>A normalized</span>
              <strong>({broadcasting.normalizedA.join(", ")})</strong>
            </div>
            <div>
              <span>B normalized</span>
              <strong>({broadcasting.normalizedB.join(", ")})</strong>
            </div>
            <div>
              <span>{language === "hu" ? "Result" : "Result"}</span>
              <strong>
                {broadcasting.ok && broadcasting.result
                  ? "(" + broadcasting.result.join(", ") + ")"
                  : "ValueError"}
              </strong>
            </div>
          </div>

          <div className="broadcast-steps">
            {broadcasting.steps.map((step, index) => (
              <div key={index}>
                <span>axis {index}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="official-shortcuts">
        <button onClick={() => { setShapeA("(32,5)"); setShapeB("(32,)"); }}>
          (32,5) + (32,)
        </button>
        <button onClick={() => { setShapeA("(32,5)"); setShapeB("(32,1)"); }}>
          (32,5) + (32,1)
        </button>
        <button onClick={() => { setShapeA("(3,)"); setShapeB("(2,1)"); }}>
          (3,) + (2,1)
        </button>
        <button onClick={() => { setShapeA("(2,3)"); setShapeB("(2,)"); }}>
          (2,3) + (2,)
        </button>
      </div>

      <div className="hero-card compact lab-section-hero">
        <div>
          <span className="eyebrow">VIEW VS COPY</span>
          <h1>{language === "hu" ? "Mi változik, ha y-t felülírjuk?" : "What changes when we overwrite y?"}</h1>
        </div>
      </div>

      <div className="numpy-selector">
        <label>
          <span>{language === "hu" ? "Operation" : "Operation"}</span>
          <select value={viewId} onChange={(event) => setViewId(event.target.value)}>
            {viewExamples.map((example) => (
              <option key={example.id} value={example.id}>
                {example.operation}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="view-flow">
        <div className="view-step">
          <span>1. base</span>
          <strong>{currentView.before}</strong>
        </div>
        <div className="flow-arrow">→</div>
        <div className="view-step">
          <span>2. derived</span>
          <strong>{currentView.operation}</strong>
          <small>{currentView.resultKind}</small>
        </div>
        <div className="flow-arrow">→</div>
        <div className="view-step">
          <span>3. mutation</span>
          <strong>{currentView.afterDerived}</strong>
        </div>
        <div className="flow-arrow">→</div>
        <div className="view-step">
          <span>4. base after</span>
          <strong>{currentView.afterBase}</strong>
        </div>
      </div>

      <div className="callout intuition">
        <strong>{language === "hu" ? "Magyarázat" : "Explanation"}</strong>
        <span>{language === "hu" ? currentView.explanationHu : currentView.explanationEn}</span>
      </div>

      <div className="numpy-cheatsheet">
        <div>
          <span>basic slicing</span>
          <strong>view</strong>
        </div>
        <div>
          <span>integer-array indexing</span>
          <strong>copy</strong>
        </div>
        <div>
          <span>boolean-mask indexing</span>
          <strong>copy</strong>
        </div>
        <div>
          <span>reshape</span>
          <strong>{language === "hu" ? "gyakran view" : "often view"}</strong>
        </div>
        <div>
          <span>transpose</span>
          <strong>{language === "hu" ? "gyakran view" : "often view"}</strong>
        </div>
        <div>
          <span>np.append / arithmetic</span>
          <strong>new array</strong>
        </div>
      </div>

      <div className="callout exam-trap">
        <strong>{language === "hu" ? "Vizsgahatár" : "Exam scope"}</strong>
        <span>
          {language === "hu"
            ? "A view/copy behavior fontos, de ndarray.strides és stride tricks explicit ki vannak zárva Theory Test 1-ből."
            : "View/copy behavior matters, but ndarray.strides and stride tricks are explicitly excluded from Theory Test 1."}
        </span>
      </div>
    </div>
  );
}
