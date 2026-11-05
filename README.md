# DND Theory Study Lab

Interactive bilingual (HU/EN) study application for Deep Network Development – Theory Test.

## Current status — v1.2

Implemented and pushed to `main`:

- separate learning-language and exam-language selectors
- natural Hungarian explanations with technical English terminology shown in parentheses
- bilingual Theory Test style multi-answer quiz engine
- course-compatible partial scoring
- Machine Learning Fundamentals chapter
- Linear Regression & Optimization chapter
- Logistic Regression & Binary Classification chapter
- Generalization, Overfitting & Model Selection chapter
- Artificial Neuron & MLP chapter
- SGD & Mini-batch Optimization chapter
- Computational Graph & Backpropagation chapter
- NumPy Theory Test chapter
- 193 bilingual practice questions
- interactive Linear Regression Lab
- interactive 3D loss surface
- step-by-step Gradient Descent trajectory lab
- learning-rate experiment
- Feature Scaling visualizer
- min-max vs standardization comparison
- outlier toggle
- interactive sigmoid / probability / threshold explorer
- BCE single-example loss explorer
- 2-feature logistic-regression decision-boundary visualizer
- interactive 3D probability surface
- model-complexity / generalization visualizer
- early-stopping visualizer using J_val
- training → validation → test flow
- interactive MLP architecture / parameter-count explorer
- activation-function explorer
- regression / binary / multiclass output-layer matrix
- interactive softmax probability view
- mini-batch gradient-variance visualizer
- full-dataset vs mini-batch gradient comparison
- step-by-step computational-graph backpropagation lab
- Lecture 6 numerical backprop example with live gradients and parameter update
- NumPy indexing / shape explorer
- interactive broadcasting solver
- view-vs-copy mutation simulator
- 60 NumPy Theory Test questions, including official-style code/result questions
- self-explanatory diagram axis labels and short plot-reading descriptions
- reusable simulation guides with axis explanations
- formula/notation glossaries inside the labs
- expanded lesson schema: what it is, why it matters, formula-term glossary, worked examples, connections, real-world use, and exam traps
- clearly marked illustrative real-world mappings for the simulated concepts
- source-validation notes for exam-specific conventions
- 70 concept steps with additional bilingual worked examples and conceptual bridges

## Theory Test 1 scope

- Lectures 1–6
- NumPy material from the pre-practice videos for weeks 3–6
- `ndarray.strides` / stride tricks intentionally excluded from the test-learning path

## Stack

Frontend:
- React
- TypeScript
- Vite
- Plotly.js

Backend:
- Python
- FastAPI
- NumPy

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will normally use `http://localhost:5173`.

## Run the backend

```bash
cd backend
python -m venv .venv
```

Windows:

```powershell
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Linux/macOS:

```bash
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will normally use `http://localhost:8000`.

## Content accuracy

This is an exam-preparation project, so the uploaded 2026 Autumn course material is treated as the source of truth.

See:

```text
docs/content-validation.md
```

for verified notation, source-specific rules, and the distinction between course-derived statements and illustrative explanations, such as:

- course-specific `1/(2m)` least-squares loss convention
- `X ∈ R^(m × (n+1))` with the `x₀=1` intercept column
- gradient direction and update rule
- normal equation
- min-max / standardization definitions
- outlier sensitivity

## Next modules

Planned next:

1. expand the question bank further toward 200–250 questions
2. weak-topic tracking and mock-exam mode
3. topic filters and dedicated Theory Test simulation mode

## Guided learning v1.0

The Learn area is no longer a passive two-column note page. It now uses a step-based guided-learning flow.

Each concept is presented in separate pedagogical layers:

- **COURSE** — source-grounded course / Theory Test material.
- **UNDERSTANDING** — intuition, why the concept matters, worked examples, and conceptual connections that help understanding.
- **DEEP DIVE** — clearly marked illustrative/application context that is not presented as a separate exam requirement.

The learning flow combines:

- think-first prompts before revealing explanations;
- formula-symbol reveal instead of showing every definition immediately;
- self-explanation prompts;
- source-grounded retrieval checkpoints mapped to the current concept;
- simple local spaced-review scheduling (Again / Hard / Good);
- chapter mastery / due-review tracking stored in browser localStorage;
- interleaved comparison exercises for commonly confused concepts;
- one-click navigation to related interactive labs.

The review scheduler is intentionally simple and adaptive. Its intervals are a study aid, not claimed to be a uniquely optimal scientific scheduling algorithm.

## Learning and exam practice v1.1

- Learn concept steps now use automatically scored multi-answer mini-tests instead of open-ended tasks.
- Each concept can use 2–3 paraphrased self-check questions so learning practice does not simply memorize the exam wording.
- Longer open-ended exercises are grouped into a chapter-end summary exercise set with revealable answer keys.
- Test has two modes: **Exam-close** for official-example-aligned wording and **Extended practice** for the full bank.
- Official Theory Test example topics are kept separate from the paraphrased Learn questions.
- Hungarian learning text is being normalized to natural Hungarian prose, with important English technical terms retained in parentheses.
- The pedagogy CI check validates all learning-step question mappings and the dedicated official theory bank.

## Guided learning v1.2 — pedagogy audit

- Expanded **all 70 concept steps in 8 chapters** with lecture-consistent explanations and concrete examples, preserving the source-derived core.
- Added a few missing direct-application questions for why to use ML, label shapes, and scalar loss calculation.
- Corrected the Linear Regression checkpoint filter and selected cross-chapter question references.
- Expanded the Understanding layer by default and placed the mini-test after explanation and examples.
- Mini-tests are scored automatically with course-compatible partial credit. A section becomes **Mastered** only after a score of at least 80% on its mini-test **and** three spaced successful reviews.
- Progress records preserve mini-test results across review events; Good and Hard cannot be repeatedly clicked before their scheduled next-review times.
- Dashboard progress uses quiz-aware mastery and aggregates chapter state consistently across HU and EN.
- Exam-style questions based on official topics are clearly identified as **practice questions**, not originals from an actual examination.
- CI now checks source-to-checkpoint mapping, pedagogical enrichment coverage, learning flow, plot consistency and TypeScript build.
- Note: "Mastered" is a learning-app indicator, not a guarantee of exam performance. Worked examples may extend beyond the official exam's exact wording to make the underlying concepts clear.

## Short randomized mock exams

The **Test → Short mock exam** mode creates a 15- or 20-question exercise.

- By default, it uses **129 explicit subquestions** from the Theory Test 1 example document, plus **four additional source-mentioned question categories**. The optional supplementary mode adds 24 lecture-based practice templates.
- **Every source-example question now has its own manually authored, bilingual answer key and question-specific alternatives**. Questions about parameter counts, shapes, loss functions, etc., do not reuse unrelated statements from broad topical pools.
- Each source question includes **4–6 curated alternatives**, with one or more correct options; the exam displays a random **3–6**. The separate 24 supplementary topic templates retain their 12-option pools.
- Questions and displayed answer order are randomized. All eight chapters are represented in each short exam.
- Choose **Exam mode** (explanations after final submission) or **Study mode** (check and lock individual questions with immediate feedback).
- Scoring is 1 point for perfect selection, 0.5 for exactly one mistake, and zero otherwise, including unanswered questions.
- Full original extended practice remains available separately.
- CI verifies source coverage, answer-option structure, source-specific regression checks and 500 generated exam samples.
