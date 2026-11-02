import fs from "node:fs";

const files = {
  linear: "src/components/LinearRegressionLab.tsx",
  gradient: "src/components/GradientDescentLab.tsx",
  logistic: "src/components/LogisticRegressionLab.tsx",
  generalization: "src/components/GeneralizationLab.tsx",
  sgd: "src/components/SGDLab.tsx",
  mlp: "src/components/MLPLab.tsx",
  scaling: "src/components/FeatureScalingLab.tsx"
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, path]) => [key, fs.readFileSync(path, "utf8")])
);

const errors = [];

function requireText(fileKey, needle, description) {
  if (!content[fileKey].includes(needle)) {
    errors.push(`${files[fileKey]}: missing ${description}: ${needle}`);
  }
}

function forbidText(fileKey, needle, description) {
  if (content[fileKey].includes(needle)) {
    errors.push(`${files[fileKey]}: ${description}: ${needle}`);
  }
}

// Every plotted lab should expose an immediate visual axis key.
for (const key of Object.keys(files)) {
  requireText(key, "<PlotAxisKey", "PlotAxisKey");
}

// Every 3D surface must name both its Z quantity and its color scale with the same symbol.
for (const key of ["linear", "gradient"]) {
  requireText(key, 'J(θ₀,θ₁) — veszteség', "explicit J(θ₀,θ₁) loss label");
  requireText(key, "colorbar:", "surface colorbar title");
  requireText(key, "Z tengely: J(θ₀,θ₁)", "guide Z-axis label");
  requireText(key, "Színskála: J(θ₀,θ₁)", "guide color-scale label");
  forbidText(key, 'zaxis: { title: "J" }', "ambiguous bare J Z-axis title");
}

requireText("logistic", 'hθ(x₁,x₂) — becsült valószínűség', "explicit 3D probability Z-axis label");
requireText("logistic", "colorbar:", "3D probability colorbar title");
requireText("logistic", "3D Z tengely: hθ(x₁,x₂)", "guide Z-axis probability label");
requireText("logistic", "Színskála: hθ(x₁,x₂)", "guide color-scale probability label");
forbidText("logistic", 'zaxis: { title: "h"', "ambiguous bare h Z-axis title");

// 2D semantic axes should use the same symbols in plot and guide.
requireText("sgd", "y / ŷ — célérték / becslés", "SGD data-space Y-axis label");
requireText("sgd", "Jobb diagram X tengely: ∂J/∂θ₀", "SGD gradient-space X guide");
requireText("sgd", "Jobb diagram Y tengely: ∂J/∂θ₁", "SGD gradient-space Y guide");

requireText("generalization", "J_train / J_val", "generalization loss-axis notation");
requireText("scaling", "1. X tengely: x", "raw scaling axis");
requireText("scaling", "2. X tengely: x_minmax", "min-max scaling axis");
requireText("scaling", "3. X tengely: x_std", "standardization axis");

if (errors.length > 0) {
  console.error("\nPlot consistency check failed:\n");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("Plot consistency check passed.");
