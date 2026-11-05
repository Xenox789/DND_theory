import type { Question } from "../types";

/** Official Theory Test scoring: one mistake = one wrong selection
 * or one omitted correct selection. Full point for no mistakes,
 * half for exactly one, otherwise zero.
 */
export function scoreQuestion(question: Question, selected: string[]): number {
  const correct = new Set(question.correctIds);
  const chosen = new Set(selected);
  const allIds = new Set([...correct, ...chosen]);

  let mistakes = 0;
  for (const id of allIds) {
    if (correct.has(id) !== chosen.has(id)) mistakes += 1;
  }
  if (mistakes === 0) return 1;
  if (mistakes === 1) return 0.5;
  return 0;
}

/** Blank submissions in a mock exam score zero, even with one omitted
 * true answer (where the ordinary mismatch rule would yield 0.5).
 */
export function scoreMockQuestion(question: Question, selected: string[]): number {
  return selected.length === 0 ? 0 : scoreQuestion(question, selected);
}
