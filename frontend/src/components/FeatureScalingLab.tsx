import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";
import { SimulationGuide } from "./SimulationGuide";
import { PlotAxisKey } from "./PlotAxisKey";

type Props = {
  language: Language;
};

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function populationStd(values: number[]) {
  const mu = mean(values);
  return Math.sqrt(
    values.reduce((sum, value) => sum + (value - mu) ** 2, 0) / values.length
  );
}

export function FeatureScalingLab({ language }: Props) {
  const [includeOutlier, setIncludeOutlier] = useState(true);

  const raw = useMemo(
    () => (includeOutlier ? [20, 25, 30, 35, 40, 150] : [20, 25, 30, 35, 40, 45]),
    [includeOutlier]
  );

  const minimum = Math.min(...raw);
  const maximum = Math.max(...raw);
  const mu = mean(raw);
  const sigma = populationStd(raw);

  const minMax = raw.map((value) => (value - minimum) / (maximum - minimum));
  const standardized = raw.map((value) => (value - mu) / sigma);

  const miniPlot = (values: number[], title: string, symbol: string, meaning: string, range?: [number, number]) => (
    <div className="plot-card scaling-plot">
      <h2>{title}</h2>
      <PlotAxisKey
        language={language}
        items={[
          { axis: "X", symbol, meaning },
          { axis: "Y", symbol: "—", meaning: language === "hu" ? "nincs adatjelentése; csak a pontok vizuális elhelyezésére szolgál" : "no data meaning; only used to place the markers visually" }
        ]}
      />
      <Plot
        data={[
          {
            x: values,
            y: values.map(() => 0),
            type: "scatter",
            mode: "text+markers",
            text: values.map((value) => value.toFixed(2)),
            textposition: "top center",
            marker: { size: 11 },
            hovertemplate: "%{x:.4f}<extra></extra>"
          }
        ]}
        layout={{
          autosize: true,
          height: 210,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          font: { color: "#d8e3f4" },
          margin: { l: 25, r: 20, b: 45, t: 10 },
          xaxis: {
            title: symbol,
            range,
            gridcolor: "#22314a",
            zerolinecolor: "#38506f"
          },
          yaxis: {
            visible: false,
            range: [-1, 1]
          },
          showlegend: false
        }}
        config={{ responsive: true, displaylogo: false }}
        style={{ width: "100%" }}
      />
    </div>
  );

  return (
    <div>
      <div className="hero-card compact">
        <div>
          <span className="eyebrow">FEATURE SCALING LAB</span>
          <h1>Min-max vs Standardization</h1>
          <p>
            {language === "hu"
              ? "Ugyanazt a feature-t nézd meg raw, min-max scaled és standardized formában. Kapcsold ki-be az outliert."
              : "Inspect the same feature in raw, min-max-scaled, and standardized form. Toggle the outlier on and off."}
          </p>
        </div>
      </div>

      <div className="scaling-toolbar">
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={includeOutlier}
            onChange={(event) => setIncludeOutlier(event.target.checked)}
          />
          <span>
            {language === "hu"
              ? "Outlier használata (150)"
              : "Include outlier (150)"}
          </span>
        </label>

        <div className="formula-card">
          {language === "hu" ? "minimum–maximum skálázás (min-max): (x−min)/(max−min)" : "min-max: (x−min)/(max−min)"}
        </div>
        <div className="formula-card">
          {language === "hu" ? "standardizálás (standardization): (x−μ)/σ" : "standardization: (x−μ)/σ"}
        </div>
      </div>

      <div className="scaling-grid">
        {miniPlot(raw, language === "hu" ? "Eredeti jellemző" : "Raw feature", "x", language === "hu" ? "eredeti jellemzőérték" : "raw feature value")}
        {miniPlot(minMax, "Min-max [0,1]", "x_minmax", language === "hu" ? "minimum–maximum skálázott érték" : "min-max scaled value", [-0.1, 1.1])}
        {miniPlot(standardized, language === "hu" ? "Standardizálás" : "Standardization", "x_std", language === "hu" ? "standardizált érték" : "standardized value")}
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>min</span>
          <strong>{minimum.toFixed(2)}</strong>
        </div>
        <div className="metric-card">
          <span>max</span>
          <strong>{maximum.toFixed(2)}</strong>
        </div>
        <div className="metric-card">
          <span>μ</span>
          <strong>{mu.toFixed(2)}</strong>
        </div>
        <div className="metric-card">
          <span>σ</span>
          <strong>{sigma.toFixed(2)}</strong>
        </div>
      </div>

      <SimulationGuide
        language={language}
        axes={[
          {
            label: language === "hu" ? "1. X tengely: x" : "1st X-axis: x",
            meaning: language === "hu" ? "Az eredeti jellemzőérték (raw feature value)." : "The raw feature value."
          },
          {
            label: language === "hu" ? "2. X tengely: x_minmax" : "2nd X-axis: x_minmax",
            meaning: language === "hu" ? "Ugyanaz az érték minimum–maximum skálázás után." : "The same value after min-max scaling."
          },
          {
            label: language === "hu" ? "3. X tengely: x_std" : "3rd X-axis: x_std",
            meaning: language === "hu" ? "Ugyanaz az érték standardizálás után." : "The same value after standardization."
          },
          {
            label: language === "hu" ? "Y tengely mindhárom diagramon" : "Y-axis on all three plots",
            meaning: language === "hu" ? "Nincs adatjelentése; minden pont y=0 helyre kerül, hogy az X értékek egy vonalon összehasonlíthatók legyenek." : "It has no data meaning; all points are placed at y=0 so the X values can be compared on one line."
          }
        ]}
        terms={[
          { label: "x", meaning: language === "hu" ? "egy konkrét feature value" : "one concrete feature value" },
          { label: "min", meaning: language === "hu" ? "a feature minimuma a scalinghez használt adatokban" : "minimum feature value in the data used for scaling" },
          { label: "max", meaning: language === "hu" ? "a feature maximuma a scalinghez használt adatokban" : "maximum feature value in the data used for scaling" },
          { label: "μ", meaning: language === "hu" ? "mean / átlag" : "mean / average" },
          { label: "σ", meaning: language === "hu" ? "standard deviation / szórás" : "standard deviation" }
        ]}
        formulas={[
          {
            expression: "(x − min) / (max − min)",
            meaning: language === "hu" ? "Min-max scaling: a minimumot 0-ra, a maximumot 1-re képezi." : "Min-max scaling maps the minimum to 0 and maximum to 1."
          },
          {
            expression: "(x − μ) / σ",
            meaning: language === "hu" ? "Standardization: azt méri, hány standard deviationre van x az átlagtól." : "Standardization measures how many standard deviations x is from the mean."
          }
        ]}
        realWorld={
          language === "hu"
            ? "Ha egy modell egyszerre kap például age=25 és yearly_income=8 000 000 jellegű feature-öket, a nagyon eltérő numeric scale megnehezítheti az optimizationt. Scalinggel a feature-ök összehasonlíthatóbb tartományba kerülnek."
            : "If a model receives features such as age=25 and yearly_income=8,000,000, their very different numeric scales can make optimization harder. Scaling brings features to more comparable ranges."
        }
      />

      <div className="lab-explanation-grid">
        <div className="callout intuition">
          <strong>{language === "hu" ? "Figyeld meg a min-max scalinget" : "Observe min-max scaling"}</strong>
          <span>
            {language === "hu"
              ? "Outlierrel a 150 lesz az 1.0 végpont, ezért a 20–40 közötti normál értékek nagyon kis tartományba préselődnek. Ez mutatja a lecture által kiemelt outlier-érzékenységet."
              : "With the outlier, 150 becomes the 1.0 endpoint, so the normal values between 20 and 40 are compressed into a small range. This demonstrates the outlier sensitivity highlighted in the lecture."}
          </span>
        </div>
        <div className="callout exam-trap">
          <strong>{language === "hu" ? "Vizsgaszabály" : "Exam rule"}</strong>
          <span>
            {language === "hu"
              ? "Min-max → [0,1]. Standardization → mean 0, standard deviation 1. A lecture szerint min-max érzékenyebb az outliers-re; a kettő közül standardization robusztusabb."
              : "Min-max → [0,1]. Standardization → mean 0, standard deviation 1. According to the lecture, min-max is more sensitive to outliers; of the two, standardization is more robust."}
          </span>
        </div>
      </div>
    </div>
  );
}
