import type { Question } from "../types";

const sectionQuestionMap: Record<string, string> = {
  "data-point": "q1",
  "hypothesis": "q2",
  "loss": "q3",
  "three-groups": "q4",
  "tasks": "q5",

  "regression-linear-hypothesis": "lr-q2",
  "multivariate-geometry": "lr-q2",
  "matrix-form": "lr-q6",
  "least-squares": "lr-q3",
  "gradient": "lr-q4",
  "gradient-descent": "lr-q5",
  "feature-scaling": "lr-q10",
  "normal-equation": "lr-q8",

  "binary-classification": "log-q1",
  "sigmoid": "log-q2",
  "logistic-hypothesis": "log-q3",
  "decision-boundary": "log-q4",
  "binary-cross-entropy": "log-q8",
  "convex-logistic": "log-q13",

  "generalization": "gen-q3",
  "underfit-overfit": "gen-q2",
  "risk-factors": "gen-q6",
  "three-way-split": "gen-q1",
  "hyperparameters": "gen-q11",
  "l2": "gen-q8",
  "early-stopping": "gen-q13",
  "solutions-summary": "gen-q4",

  "artificial-neuron": "mlp-q1",
  "single-neuron-limit": "mlp-q2",
  "fully-connected": "mlp-q3",
  "parameter-count": "mlp-q5",
  "two-layer-hypothesis": "mlp-q7",
  "activation-functions": "mlp-q9",
  "output-by-task": "mlp-q8",

  "batch-gradient-descent": "sgd-q1",
  "why-sgd": "sgd-q2",
  "batch-size-tradeoff": "sgd-q4",
  "learning-rate-batch": "sgd-q6",
  "gpu-memory": "sgd-q7",
  "sgd-variants": "sgd-q8",

  "why-backprop": "bp-q6",
  "computational-graph": "bp-q1",
  "chain-rule": "bp-q2",
  "local-rules": "bp-q3",
  "forward-example": "bp-q7",
  "backward-example": "bp-q8",
  "parameter-update": "bp-q10",
  "training-cycle": "bp-q11",

  "numpy-array-programming": "np-q1",
  "numpy-attributes": "np-q2",
  "numpy-zero-shapes": "np-q3",
  "numpy-creation-reshape": "np-q8",
  "numpy-indexing-types": "np-q9",
  "numpy-basic-indexing": "np-q10",
  "numpy-advanced-indexing": "np-q12",
  "numpy-broadcasting": "np-q15",
  "numpy-newaxis": "np-q18",
  "numpy-reductions": "np-q19",
  "numpy-views-copies": "np-q13"
};

export function checkpointForSection(
  questions: Question[],
  sectionId: string
): Question | null {
  const questionId = sectionQuestionMap[sectionId];
  if (!questionId) return null;
  return questions.find((question) => question.id === questionId) ?? null;
}
