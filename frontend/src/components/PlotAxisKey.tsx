import type { Language } from "../types";

type AxisKeyItem = {
  axis: string;
  symbol: string;
  meaning: string;
};

type Props = {
  language: Language;
  items: AxisKeyItem[];
};

export function PlotAxisKey({ language, items }: Props) {
  return (
    <div className="plot-axis-key" aria-label={language === "hu" ? "Diagram jelölései" : "Diagram axis key"}>
      {items.map((item) => (
        <div className="plot-axis-key-item" key={item.axis + item.symbol}>
          <span className="plot-axis-badge">{item.axis}</span>
          <code>{item.symbol}</code>
          <span>{item.meaning}</span>
        </div>
      ))}
    </div>
  );
}
