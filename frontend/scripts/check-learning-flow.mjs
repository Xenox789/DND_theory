import fs from "node:fs";

const app = fs.readFileSync("src/App.tsx", "utf8");
const guided = fs.readFileSync("src/components/GuidedLessonView.tsx", "utf8");
const quiz = fs.readFileSync("src/components/ConceptCheck.tsx", "utf8");
const progress = fs.readFileSync("src/study/progress.ts", "utf8");
const checkpoints = fs.readFileSync("src/study/checkpoints.ts", "utf8");

const errors = [];
function check(condition, message) { if (!condition) errors.push(message); }
check(app.includes("const questionsForSelectedLesson = questionBank;"), "Learn must support cross-chapter checkpoint IDs.");
check(checkpoints.includes('"why-ml": ["q13"]'), "Why-ML must use its dedicated diagnostic question.");
check(quiz.includes("onComplete(points, questions.length)"), "Mini-test must report scored completion.");
check(progress.includes("normalized >= 0.8"), "Mini-test pass threshold must be enforced.");
check(progress.includes("item.streak >= 3 && item.quizPassed"), "Self-rating alone must not grant mastery.");
const iUnderstanding = guided.indexOf("{courseVisible && hasUnderstanding");
const iQuiz = guided.indexOf("{courseVisible && conceptChecks.length");
check(iUnderstanding !== -1 && iQuiz > iUnderstanding, "Understanding should precede the mini-test.");
check(guided.includes("setUnderstandingVisible(true)"), "Begin with understanding layer expanded.");

const source = fs.readFileSync("src/data/course.ts", "utf8");
const lessonFiles = ["mlFundamentals.ts","linearRegression.ts","logisticRegression.ts","generalizationLesson.ts","mlp.ts","sgd.ts","backprop.ts","numpyLesson.ts"];
const allQuestions = [source,"linearRegression.ts","logisticRegression.ts","generalizationQuestions.ts","mlp.ts","sgd.ts","backprop.ts","numpyQuestionsCore.ts","numpyQuestionsExamples.ts","officialTheoryQuestions.ts"].flatMap((p) =>
  p === source ? [source] : [fs.readFileSync("src/data/"+p,"utf8")]
).join("\n");
for (const qid of ["q13","q14","q15"]) check(new RegExp('id: "'+qid+'"').test(allQuestions), "Missing diagnostic question "+qid);

if(errors.length){ console.error(errors.join("\n")); process.exit(1); }
console.log("Learning flow checks passed.");
