import type { Question } from "../types";

const sectionQuestionMap: Record<string, string[]> = {
  "why-ml": ["q13"],
  "data-point": ["q1", "q14", "q8"],
  "hypothesis": ["q2", "q14", "q8"],
  "loss": ["q3", "q15", "q7"],
  "three-groups": ["q4", "q12"],
  "supervised-paradigm": ["q9", "q1"],
  "unsupervised-paradigm": ["q10", "q12"],
  "reinforcement-paradigm": ["q11", "q12"],
  "compare-paradigms": ["q12", "q9", "q11"],
  "tasks": ["q5", "q6"],

  "regression-linear-hypothesis": ["lr-q14", "lr-q2", "lr-q1"],
  "multivariate-geometry": ["lr-q1", "lr-q2"],
  "matrix-form": ["lr-q6", "lr-q7", "lr-q1"],
  "least-squares": ["lr-q3", "lr-q5"],
  "gradient": ["lr-q4", "lr-q5"],
  "gradient-descent": ["lr-q4", "lr-q5"],
  "feature-scaling": ["lr-q10", "lr-q11", "lr-q13"],
  "normal-equation": ["lr-q8", "lr-q9"],

  "binary-classification": ["log-q1", "log-q6", "log-q7"],
  "sigmoid": ["log-q2", "log-q14"],
  "logistic-hypothesis": ["log-q3", "log-q6", "log-q11"],
  "decision-boundary": ["log-q4", "log-q5", "log-q14"],
  "binary-cross-entropy": ["log-q8", "log-q9", "log-q10"],
  "convex-logistic": ["log-q13", "log-q12"],

  "generalization": ["gen-q3", "gen-q6"],
  "underfit-overfit": ["gen-q2", "gen-q3", "gen-q7"],
  "risk-factors": ["gen-q4", "gen-q5", "gen-q6"],
  "three-way-split": ["gen-q1", "gen-q10", "gen-q16"],
  "hyperparameters": ["gen-q10", "gen-q11", "gen-q12"],
  "l2": ["gen-q8", "gen-q9"],
  "early-stopping": ["gen-q13", "gen-q14", "gen-q15"],
  "solutions-summary": ["gen-q6", "gen-q8", "gen-q13"],

  "artificial-neuron": ["mlp-q1", "mlp-q2"],
  "single-neuron-limit": ["mlp-q2", "mlp-q9"],
  "fully-connected": ["mlp-q3", "mlp-q4"],
  "parameter-count": ["mlp-q5", "mlp-q6", "mlp-q19"],
  "two-layer-hypothesis": ["mlp-q7", "mlp-q9"],
  "activation-functions": ["mlp-q10", "mlp-q11", "mlp-q12"],
  "output-by-task": ["mlp-q8", "mlp-q13", "mlp-q18"],
  "softmax": ["mlp-q14", "mlp-q15", "mlp-q16"],
  "nonconvex": ["mlp-q20", "lr-q5"],

  "batch-gradient-descent": ["sgd-q1", "sgd-q2"],
  "why-sgd": ["sgd-q2", "sgd-q3"],
  "batch-size-tradeoff": ["sgd-q4", "sgd-q5"],
  "learning-rate-batch": ["sgd-q6", "sgd-q4"],
  "gpu-memory": ["sgd-q7", "sgd-q5"],
  "sgd-variants": ["sgd-q8", "sgd-q9"],

  "why-backprop": ["bp-q6", "bp-q11"],
  "computational-graph": ["bp-q1", "bp-q6"],
  "chain-rule": ["bp-q2", "bp-q14"],
  "local-rules": ["bp-q3", "bp-q4", "bp-q5"],
  "forward-example": ["bp-q7", "bp-q9"],
  "backward-example": ["bp-q8", "bp-q9"],
  "parameter-update": ["bp-q10", "bp-q11"],
  "training-cycle": ["bp-q12", "bp-q11"],
  "autograd": ["bp-q13", "bp-q1"],

  "numpy-array-programming": ["np-q1", "np-q3"],
  "numpy-attributes": ["np-q2", "np-q3", "np-q4"],
  "numpy-zero-shapes": ["np-q4", "np-q3"],
  "numpy-creation-reshape": ["np-q7", "np-q8"],
  "numpy-indexing-types": ["np-q9", "np-q10", "np-q12"],
  "numpy-basic-indexing": ["np-q10", "np-q11"],
  "numpy-advanced-indexing": ["np-q12", "np-q13", "np-q14"],
  "numpy-broadcasting": ["np-q15", "np-q16", "np-q17"],
  "numpy-newaxis": ["np-q18", "np-q17"],
  "numpy-reductions": ["np-q19", "np-q20"],
  "numpy-transpose": ["np-q21", "np-q22"],
  "numpy-views-copies": ["np-q23", "np-q24", "np-q25"],
  "numpy-common-functions": ["np-q28", "np-q29", "np-q19"],
  "numpy-scope": ["np-q30"]
};

export function checkpointsForSection(
  questions: Question[],
  sectionId: string,
  limit = 3
): Question[] {
  const ids = sectionQuestionMap[sectionId] ?? [];
  const byId = new Map(questions.map((question) => [question.id, question]));
  return ids
    .map((id) => byId.get(id))
    .filter((question): question is Question => Boolean(question))
    .slice(0, limit);
}

export function checkpointForSection(
  questions: Question[],
  sectionId: string
): Question | null {
  return checkpointsForSection(questions, sectionId, 1)[0] ?? null;
}

export const mappedLearningCheckpointIds = Object.values(sectionQuestionMap).flat();
