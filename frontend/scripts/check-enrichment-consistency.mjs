import fs from "node:fs";

const chapters = [
  ["mlFundamentals.ts", "fundamentals.ts"],
  ["linearRegression.ts", "linear.ts"],
  ["logisticRegression.ts", "logistic.ts"],
  ["generalizationLesson.ts", "generalization.ts"],
  ["mlp.ts", "mlp.ts"],
  ["sgd.ts", "sgd.ts"],
  ["backprop.ts", "backprop.ts"],
  ["numpyLesson.ts", "numpy.ts"]
];
const errors = [];
let count = 0;
const course = fs.readFileSync("src/data/course.ts", "utf8");
if (!course.includes("].map(enrichLesson)")) errors.push("Course lessons are not enriched at runtime.");

for (const [sourceFile, supplementFile] of chapters) {
  const source = fs.readFileSync("src/data/" + sourceFile, "utf8")
    .split(/export const .*Questions/)[0];
  const sectionMatch = source.match(/sections:\s*\[([\s\S]*?)\n  \]/);
  if (!sectionMatch) {
    errors.push("Cannot parse sections in " + sourceFile);
    continue;
  }
  const sectionIds = [...sectionMatch[1].matchAll(/\bid:\s*"([^"]+)"/g)]
    .map((match) => match[1]);
  const supplement = fs.readFileSync("src/data/enrichment/" + supplementFile, "utf8");
  const supplementedIds = [...supplement.matchAll(/^\s*"([^"]+)":\s*\{/gm)]
    .map((match) => match[1]);

  for (const id of sectionIds) {
    if (!supplementedIds.includes(id)) {
      errors.push("Missing explanatory supplement: " + sourceFile + " / " + id);
    }
  }
  for (const id of supplementedIds) {
    if (!sectionIds.includes(id)) {
      errors.push("Unknown supplement section: " + supplementFile + " / " + id);
    }
  }
  if (new Set(supplementedIds).size !== supplementedIds.length) {
    errors.push("Duplicate supplement section IDs in " + supplementFile);
  }
  count += sectionIds.length;
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Pedagogical enrichment validated for " + count + " learning steps across " + chapters.length + " chapters.");
