import type { Language } from "../types";

type Props = {
  label: string;
  value: Language;
  onChange: (language: Language) => void;
};

export function LanguageSwitcher({ label, value, onChange }: Props) {
  return (
    <label className="language-control">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as Language)}>
        <option value="hu">HU</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}
