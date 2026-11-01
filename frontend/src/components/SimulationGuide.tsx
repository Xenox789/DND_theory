import type { Language } from "../types";

type GuideItem = {
  label: string;
  meaning: string;
};

type FormulaItem = {
  expression: string;
  meaning: string;
};

type Props = {
  language: Language;
  axes?: GuideItem[];
  terms?: GuideItem[];
  formulas?: FormulaItem[];
  realWorld?: string;
  note?: string;
};

export function SimulationGuide({
  language,
  axes = [],
  terms = [],
  formulas = [],
  realWorld,
  note
}: Props) {
  return (
    <div className="simulation-guide">
      <div className="simulation-guide-header">
        <span className="eyebrow">{language === "hu" ? "SZIMULÁCIÓ MAGYARÁZAT" : "SIMULATION GUIDE"}</span>
        <h2>{language === "hu" ? "Hogyan olvasd ezt a szimulációt?" : "How to read this simulation"}</h2>
      </div>

      <div className="simulation-guide-grid">
        {axes.length > 0 && (
          <section className="guide-section">
            <h3>{language === "hu" ? "Tengelyek" : "Axes"}</h3>
            <div className="guide-list">
              {axes.map((item) => (
                <div className="guide-row" key={item.label}>
                  <code>{item.label}</code>
                  <span>{item.meaning}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {terms.length > 0 && (
          <section className="guide-section">
            <h3>{language === "hu" ? "Jelölések" : "Notation"}</h3>
            <div className="guide-list">
              {terms.map((item) => (
                <div className="guide-row" key={item.label}>
                  <code>{item.label}</code>
                  <span>{item.meaning}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {formulas.length > 0 && (
          <section className="guide-section guide-section-wide">
            <h3>{language === "hu" ? "Képletek jelentése" : "What the formulas mean"}</h3>
            <div className="guide-formulas">
              {formulas.map((item) => (
                <div className="guide-formula" key={item.expression}>
                  <code>{item.expression}</code>
                  <span>{item.meaning}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {realWorld && (
          <section className="guide-section guide-section-wide guide-real-world">
            <h3>{language === "hu" ? "Valós világbeli példa" : "Real-world example"}</h3>
            <p>{realWorld}</p>
            <small>
              {language === "hu"
                ? "Ez szemléltető példa. Nem része a kurzus hivatalos numerikus példájának, hacsak ezt külön nem jelezzük."
                : "This is an illustrative mapping and is not part of the course's official numerical example unless explicitly stated."}
            </small>
          </section>
        )}
      </div>

      {note && <div className="simulation-guide-note">{note}</div>}
    </div>
  );
}
