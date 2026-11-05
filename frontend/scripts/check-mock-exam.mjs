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
const { examChapters, sourceExamples, sourceTopicExamples, mockExamQuestionBank, generateMockExam, verbatimSourceEnglish, originalDocumentContext } = await import(moduleUrl);

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
assert.equal(sourceTopicExamples.length, 4, "Must cover all four additional example-topic instructions");
assert.equal(mockExamQuestionBank.length, 157, "129 source subquestions, 4 document topic directives and 24 supplementary templates required");
assert.equal(new Set(mockExamQuestionBank.map(q => q.id)).size, 157, "Question IDs must be unique");
for (const source of [...sourceExamples, ...sourceTopicExamples]) {
  const corresponding = mockExamQuestionBank.find(q => q.id === "source-" + source.id);
  assert.ok(corresponding, "Unmapped document question " + source.id);
  assert.ok(corresponding.topics.includes("source-paragraph-" + source.documentParagraph));
  assert.ok(corresponding.prompt.hu.includes(source.focusHu));
  assert.ok(corresponding.prompt.en.includes(source.focusEn));
}

// Each literal example must use the original English wording, without
// inserted/generated new subquestions. Context lives in a separate panel.
for (const source of sourceExamples) {
  const question = mockExamQuestionBank.find(q => q.id === "source-" + source.id);
  assert.ok(question, "Missing source question " + source.id);
  assert.equal(question.prompt.en, verbatimSourceEnglish[source.id],
    "Changed official English question wording: " + source.id);
  assert.equal(question.prompt.hu, source.focusHu,
    "The Hungarian translation should not include unrelated task text");
}
const ex = id => originalDocumentContext(id).en;
assert.ok(ex("M013").includes("cholesterol") && ex("M014").includes("cholesterol"),
  "All cholesterol-task subquestions must carry their shared example description");
assert.ok(ex("M040").includes("100 patients") && ex("M042").includes("100 patients"),
  "All blood-test-task subquestions must show the same original 100-patient example");
assert.ok(ex("M060").includes("Multi-Layer Perceptron") && ex("M063").includes("20 input variables"),
  "All MLP-task subquestions must show the original MLP task and formula");
assert.ok(ex("N010").includes("(32, 5)") && ex("N018").includes("(32, 5)"),
  "NumPy subquestions must include their original array shapes");
assert.ok(ex("N034").includes("np.arange(4)") && ex("N049").includes("np.array([3,1,2])"),
  "NumPy views and numerical function contexts must include the exact input arrays");
assert.ok(ex("M079").includes("c=b²") && ex("M080").includes("c=a+b"),
  "Backpropagation questions must display their own computational-graph expressions");
assert.ok(!ex("M026").includes("cholesterol") && !ex("M027").includes("cholesterol"),
  "Geometric questions must not incorrectly inherit the 200-patient task");
const s23 = mockExamQuestionBank.find(q=>q.id==="source-M023");
const s52 = mockExamQuestionBank.find(q=>q.id==="source-M052");
const s53 = mockExamQuestionBank.find(q=>q.id==="source-M053");
assert.ok(s23.correctIds.some(id=>s23.choices.find(c=>c.id===id)?.text.en.includes("scalar parameter")),
  "Document M023 explicitly asks if theta0 is a scalar or vector");
assert.ok(s52.correctIds.some(id=>s52.choices.find(c=>c.id===id)?.text.en.includes("single scalar")),
  "Document M052 explicitly asks if theta0 is a scalar or vector");
assert.ok(s53.correctIds.some(id=>s53.choices.find(c=>c.id===id)?.text.en.includes("between 0 and 1")),
  "Document M053 asks about the sigmoid model prediction, not the pre-sigmoid score");

for (const chapter of chapters) {
  assert.ok(mockExamQuestionBank.filter(q => q.chapter === chapter).length >= 3,
    "Need multiple distinct question prompts for chapter " + chapter);
}

for (const question of mockExamQuestionBank) {
  const sourceQuestion = question.id.startsWith("source-");
  if (sourceQuestion) {
    assert.ok(question.choices.length >= 4 && question.choices.length <= 6,
      "Source question must have 4–6 topic-specific options: " + question.id);
    assert.ok(question.correctIds.length >= 1, "Source question missing a valid answer: " + question.id);
    assert.ok(question.choices.length - question.correctIds.length >= 2,
      "Source question needs two or more plausible false alternatives: " + question.id);
  } else {
    assert.equal(question.choices.length, 12, "Supplementary pool requires 12 options: " + question.id);
    assert.equal(question.correctIds.length, 6, "Supplementary pool requires 6 true choices: " + question.id);
  }
  assert.equal(new Set(question.choices.map(c => c.id)).size, question.choices.length,
    "Duplicate choice ID: " + question.id);
  assert.equal(new Set(question.choices.map(c => c.text.hu)).size, question.choices.length,
    "Duplicate HU choice: " + question.id);
  assert.equal(new Set(question.choices.map(c => c.text.en)).size, question.choices.length,
    "Duplicate EN choice: " + question.id);
  for (const choice of question.choices) {
    assert.ok(choice.text.hu.trim() && choice.text.en.trim(),
      "Missing translation in " + question.id + " / " + choice.id);
  }
  for (const id of question.correctIds) {
    assert.ok(question.choices.some(c => c.id === id), "Correct ID missing from options: " + question.id);
  }
}
assert.ok(mockExamQuestionBank.some(q => q.id.startsWith("source-") && q.correctIds.length >= 2),
  "Official multi-select format needs at least some questions with multiple true options");
const m040 = mockExamQuestionBank.find(q => q.id === "source-M040");
assert.ok(m040, "Missing logistic parameter count example");
assert.ok(m040.correctIds.length >= 1 &&
  m040.choices.find(c => c.id === m040.correctIds[0])?.text.en.includes("Three parameters"),
  "The 100-patient example must answer PARAMETER COUNT as three parameters");
assert.ok(m040.choices.every(c => !/gradient|∇|∂J/.test(c.text.en)),
  "Unrelated gradient-shape claims must never appear in the parameter-count question");
const m042 = mockExamQuestionBank.find(q => q.id === "source-M042");
assert.ok(m042 && m042.choices.find(c => c.id === m042.correctIds[0])?.text.en === "(100,3)",
  "The separate X-matrix-shape question must answer (100,3)");

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
    assert.ok(exam.every(q => q.id.startsWith("source-")),
      "By default short exams must exclusively use documented example questions and topic directives.");
    if (seed <= 12) {
      const mixedExam = generateMockExam(count, random, true);
      assert.equal(mixedExam.length, count, "Supplementary opt-in must preserve exam length");
      assert.ok(mixedExam.every(q => mockExamQuestionBank.some(pool => pool.id === q.id)),
        "Supplementary mode must only use questions from the reviewed bank");
    }
    assert.equal(new Set(exam.map(q => q.id)).size, count, "Repeated question in one exam");
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
console.log("Mock exam checks passed: 129 individually authored source questions, 4 source-topic directives, 24 supplementary 12-choice templates and 500 randomized exams.");
