import fs from "node:fs";

const lessonFiles = [
  "src/data/mlFundamentals.ts",
  "src/data/linearRegression.ts",
  "src/data/logisticRegression.ts",
  "src/data/generalizationLesson.ts",
  "src/data/mlp.ts",
  "src/data/sgd.ts",
  "src/data/backprop.ts",
  "src/data/numpyLesson.ts"
];

const pedagogyPath = "src/study/pedagogy.ts";
const checkpointPath = "src/study/checkpoints.ts";
const coursePath = "src/data/course.ts";

const errors = [];
const sectionIds = [];

for (const path of lessonFiles) {
  const source = fs.readFileSync(path, "utf8").split(/export const .*Questions/)[0];
  const ids = [...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
  sectionIds.push(...ids.slice(1));
}

const pedagogy = fs.readFileSync(pedagogyPath, "utf8");
const profileIds = [...pedagogy.matchAll(/^\s*"([^"]+)": p\(/gm)].map((match) => match[1]);

for (const id of sectionIds) {
  if (!profileIds.includes(id)) errors.push("Missing pedagogy profile for section: " + id);
}
for (const id of profileIds) {
  if (!sectionIds.includes(id)) errors.push("Unknown pedagogy profile section: " + id);
}

if (new Set(sectionIds).size !== sectionIds.length) {
  errors.push("Duplicate lesson section IDs detected.");
}
if (new Set(profileIds).size !== profileIds.length) {
  errors.push("Duplicate pedagogy profile IDs detected.");
}

const checkpoints = fs.readFileSync(checkpointPath, "utf8");
const checkpointIds = [...checkpoints.matchAll(/"[^"]+":\s*"([^"]+)"/g)].map((match) => match[1]);
const course = fs.readFileSync(coursePath, "utf8");
const questionIds = new Set(
  [...course.matchAll(/id:\s*"(q\d+)"/g)].map((match) => match[1])
);

for (const path of [
  "src/data/linearRegression.ts",
  "src/data/logisticRegression.ts",
  "src/data/generalizationQuestions.ts",
  "src/data/mlp.ts",
  "src/data/sgd.ts",
  "src/data/backprop.ts",
  "src/data/numpyQuestionsCore.ts",
  "src/data/numpyQuestionsExamples.ts"
]) {
  const source = fs.readFileSync(path, "utf8");
  for (const match of source.matchAll(/id:\s*"((?:lr|log|gen|mlp|sgd|bp|np)-q\d+)"/g)) {
    questionIds.add(match[1]);
  }
}

for (const id of checkpointIds) {
  if (!questionIds.has(id)) errors.push("Checkpoint references unknown question: " + id);
}

if (sectionIds.length !== profileIds.length) {
  errors.push(`Section/profile count mismatch: ${sectionIds.length} sections vs ${profileIds.length} profiles`);
}

if (errors.length > 0) {
  console.error("\nPedagogy consistency check failed:\n");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log(
  `Pedagogy consistency check passed: ${sectionIds.length} learning steps, ${profileIds.length} profiles, ${checkpointIds.length} mapped retrieval checkpoints.`
);
