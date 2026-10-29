import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { Language } from "../types";

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

  const miniPlot = (values: number[], title: string, range?: [number, number]) => (
    <div className="plot-card scaling-plot">
      <h2>{title}</h2>
      <Plot
        data={[
          {
            x: values,
            y: values.map(() => 0),
            type: "scatter",
            mode: "markers+text",
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
          min-max: (x−min)/(max−min)
        </div>
        <div className="formula-card">
          standardization: (x−μ)/σ
        </div>
      </div>

      <div className="scaling-grid">
        {miniPlot(raw, language === "hu" ? "Eredeti feature" : "Raw feature")}
        {miniPlot(minMax, "Min-max [0,1]", [-0.1, 1.1])}
        {miniPlot(standardized, "Standardization")}
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
