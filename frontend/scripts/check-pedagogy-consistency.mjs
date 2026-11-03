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

const questionFiles = [
  "src/data/linearRegression.ts",
  "src/data/logisticRegression.ts",
  "src/data/generalizationQuestions.ts",
  "src/data/mlp.ts",
  "src/data/sgd.ts",
  "src/data/backprop.ts",
  "src/data/numpyQuestionsCore.ts",
  "src/data/numpyQuestionsExamples.ts",
  "src/data/officialTheoryQuestions.ts"
];

const errors = [];
const sectionIds = [];

for (const path of lessonFiles) {
  const source = fs.readFileSync(path, "utf8").split(/export const .*Questions/)[0];
  const ids = [...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
  sectionIds.push(...ids.slice(1));
}

const pedagogy = fs.readFileSync("src/study/pedagogy.ts", "utf8");
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

const checkpoints = fs.readFileSync("src/study/checkpoints.ts", "utf8");
const mapBodyMatch = checkpoints.match(
  /const sectionQuestionMap:[\s\S]*?=\s*\{([\s\S]*?)\n\};/
);

if (!mapBodyMatch) {
  errors.push("Could not parse sectionQuestionMap.");
}

const checkpointSections = [];
const checkpointIds = [];

if (mapBodyMatch) {
  const entryRegex = /"([^"]+)":\s*\[([^\]]*)\]/g;
  for (const match of mapBodyMatch[1].matchAll(entryRegex)) {
    checkpointSections.push(match[1]);
    const ids = [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
    if (ids.length === 0) errors.push("No learning questions mapped for section: " + match[1]);
    checkpointIds.push(...ids);
  }
}

for (const id of sectionIds) {
  if (!checkpointSections.includes(id)) {
    errors.push("Missing learning-question mapping for section: " + id);
  }
}
for (const id of checkpointSections) {
  if (!sectionIds.includes(id)) {
    errors.push("Question mapping references unknown section: " + id);
  }
}

const questionIds = new Set();
const course = fs.readFileSync("src/data/course.ts", "utf8");
for (const match of course.matchAll(/id:\s*"(q\d+)"/g)) {
  questionIds.add(match[1]);
}

for (const path of questionFiles) {
  const source = fs.readFileSync(path, "utf8");
  for (const match of source.matchAll(/id:\s*"([^"]+-q\d+)"/g)) {
    questionIds.add(match[1]);
  }
}

for (const id of checkpointIds) {
  if (!questionIds.has(id)) errors.push("Learning step references unknown question: " + id);
}

const officialSource = fs.readFileSync("src/data/officialTheoryQuestions.ts", "utf8");
const officialIds = [...officialSource.matchAll(/id:\s*"(official-q\d+)"/g)].map((m) => m[1]);

if (officialIds.length < 20) {
  errors.push("Official theory bank unexpectedly small: " + officialIds.length);
}
if (new Set(officialIds).size !== officialIds.length) {
  errors.push("Duplicate official theory question IDs detected.");
}

if (sectionIds.length !== profileIds.length) {
  errors.push(
    `Section/profile count mismatch: ${sectionIds.length} sections vs ${profileIds.length} profiles`
  );
}
if (sectionIds.length !== checkpointSections.length) {
  errors.push(
    `Section/checkpoint-map count mismatch: ${sectionIds.length} sections vs ${checkpointSections.length} mappings`
  );
}

if (errors.length > 0) {
  console.error("\nPedagogy consistency check failed:\n");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log(
  `Pedagogy consistency check passed: ${sectionIds.length} learning steps, ${profileIds.length} pedagogy profiles, ${checkpointIds.length} mapped mini-test references, ${officialIds.length} official theory questions.`
);
