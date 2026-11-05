import assert from "node:assert/strict";
import { build } from "esbuild";

// Bundle the same TypeScript module imported by the app, then test the
// executable randomizer itself rather than approximating it with a regex.
const output = await build({
  entryPoints: ["src/data/mockExam/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent"
});
const code = output.outputFiles[0].text;
const moduleUrl = "data:text/javascript;base64," + Buffer.from(code).toString("base64");
const { examChapters, sourceExamples, mockExamQuestionBank, generateMockExam } = await import(moduleUrl);

const scoringOutput = await build({
  entryPoints: ["src/study/scoring.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent"
});
const scoringUrl = "data:text/javascript;base64," +
  Buffer.from(scoringOutput.outputFiles[0].text).toString("base64");
const { scoreQuestion, scoreMockQuestion } = await import(scoringUrl);
const testQuestion = {
  id: "scoring-test",
  correctIds: ["a", "b"],
  choices: [
    { id: "a" }, { id: "b" }, { id: "c" }
  ]
};
assert.equal(scoreQuestion(testQuestion, ["a", "b"]), 1, "All correct answers earn 1");
assert.equal(scoreQuestion(testQuestion, ["a"]), 0.5, "One omitted answer earns 0.5");
assert.equal(scoreQuestion(testQuestion, ["a", "c"]), 0, "Wrong and missing are two mistakes");
assert.equal(scoreMockQuestion(testQuestion, []), 0, "Unanswered mock questions earn 0");
assert.equal(scoreMockQuestion(testQuestion, ["a", "b"]), 1, "Mock exam retains standard scoring");

const chapters = [...examChapters];
assert.equal(chapters.length, 8, "Must cover all eight learning chapters");
assert.equal(sourceExamples.length, 129, "All 80 lecture and 49 NumPy example subquestions must be mapped");
assert.equal(sourceExamples.filter(s => s.id.startsWith("M")).length, 80);
assert.equal(sourceExamples.filter(s => s.id.startsWith("N")).length, 49);
assert.equal(new Set(sourceExamples.map(s => s.documentParagraph)).size, 129);
assert.equal(mockExamQuestionBank.length, 153, "129 source subquestions plus 24 topical templates required");
assert.equal(new Set(mockExamQuestionBank.map(q => q.id)).size, 153, "Question IDs must be unique");
for (const source of sourceExamples) {
  const corresponding = mockExamQuestionBank.find(q => q.id === "source-" + source.id);
  assert.ok(corresponding, "Unmapped document question " + source.id);
  assert.ok(corresponding.topics.includes("source-paragraph-" + source.documentParagraph));
  assert.ok(corresponding.prompt.hu.includes(source.focusHu));
  assert.ok(corresponding.prompt.en.includes(source.focusEn));
}

for (const chapter of chapters) {
  assert.ok(mockExamQuestionBank.filter(q => q.chapter === chapter).length >= 3,
    "Need multiple distinct question prompts for chapter " + chapter);
}

for (const question of mockExamQuestionBank) {
  assert.equal(question.choices.length, 12, "12 answer variations required: " + question.id);
  assert.equal(question.correctIds.length, 6, "Each pool must have 6 true variants: " + question.id);
  assert.equal(new Set(question.choices.map(c => c.id)).size, 12, "Duplicate choice ID: " + question.id);
  assert.equal(new Set(question.choices.map(c => c.text.hu)).size, 12, "Duplicate HU choice: " + question.id);
  assert.equal(new Set(question.choices.map(c => c.text.en)).size, 12, "Duplicate EN choice: " + question.id);
  for (const choice of question.choices) {
    assert.ok(choice.text.hu.trim() && choice.text.en.trim(),
      "Missing translation in " + question.id + " / " + choice.id);
  }
  for (const id of question.correctIds) {
    assert.ok(question.choices.some(c => c.id === id), "Correct ID missing from options: " + question.id);
  }
}

const signatures = new Set();
for (const count of [15, 20]) {
  for (let seed = 1; seed <= 250; seed++) {
    let state = seed;
    const random = () => {
      state = (Math.imul(1664525, state) + 1013904223) >>> 0;
      return state / 4294967296;
    };
    const exam = generateMockExam(count, random);
    assert.equal(exam.length, count);
    assert.equal(new Set(exam.map(q => q.id)).size, count, "Repeated question in one exam");
    const sourceAnchors = exam.flatMap(q => q.topics.filter(t => t.startsWith("source-anchor-")));
    assert.equal(new Set(sourceAnchors).size, sourceAnchors.length, "A single exam must not repeat a source anchor");
    const coverage = Object.fromEntries(chapters.map(c => [c, 0]));
    for (const question of exam) {
      const chapter = question.topics.find(t => t !== "mock-exam" && t.startsWith("mock-"))?.slice(5);
      assert.ok(chapter && chapter in coverage, "Unknown chapter in exam");
      coverage[chapter]++;
      assert.ok(question.choices.length >= 3 && question.choices.length <= 6,
        "Each question must show 3-6 statements");
      assert.equal(new Set(question.choices.map(c => c.id)).size, question.choices.length,
        "Duplicate answer option in one question");
      assert.ok(question.correctIds.length >= 1, "At least one correct answer must be visible");
      assert.ok(question.correctIds.length < question.choices.length,
        "At least one incorrect option must be visible");
      const pool = mockExamQuestionBank.find(q => q.id === question.id);
      assert.ok(pool, "Question must originate from curated pool");
      for (const choice of question.choices) {
        assert.ok(pool.choices.some(c => c.id === choice.id && c.text.hu === choice.text.hu),
          "Question choices must be sourced from a reviewed pool");
      }
      for (const id of question.correctIds) assert.ok(question.choices.some(c => c.id === id));
    }
    assert.equal(Object.values(coverage).reduce((a,b) => a+b, 0), count);
    if (count === 15) {
      assert.ok(Object.values(coverage).every(n => n >= 1 && n <= 2));
      assert.equal(Object.values(coverage).filter(n => n === 2).length, 7);
    } else {
      assert.ok(Object.values(coverage).every(n => n >= 2 && n <= 3));
      assert.equal(Object.values(coverage).filter(n => n === 3).length, 4);
    }
    signatures.add(exam.map(q => q.id + ":" + q.choices.map(c => c.id).join(",")).join("|"));
  }
}
assert.ok(signatures.size > 100, "Generated test variants should differ meaningfully");
console.log("Mock exam checks passed: 129 directly mapped document subquestions + 24 supplementary templates; 12 variants each; 500 balanced trials.");
