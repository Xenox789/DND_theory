# DND Theory Study Lab

Interactive bilingual (HU/EN) study application for ELTE Deep Network Development – Theory Test 1.

## Current status — v0.4

Implemented and pushed to `main`:

- separate learning-language and exam-language selectors
- Hungarian explanations with important English terminology preserved
- bilingual Theory Test style multi-answer quiz engine
- course-compatible partial scoring
- Machine Learning Fundamentals chapter
- Linear Regression & Optimization chapter
- Logistic Regression & Binary Classification chapter
- Generalization, Overfitting & Model Selection chapter
- 54 bilingual practice questions
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
- source-validation notes for exam-specific conventions

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

for verified notation and rules such as:

- course-specific `1/(2m)` least-squares loss convention
- `X ∈ R^(m × (n+1))` with the `x₀=1` intercept column
- gradient direction and update rule
- normal equation
- min-max / standardization definitions
- outlier sensitivity

## Next modules

Planned next:

1. Artificial neuron and MLP
2. Activation functions and multi-output tasks
3. SGD / mini-batches
4. Backpropagation and computational graphs
5. NumPy fundamentals, indexing, broadcasting, reductions, views vs copies
6. full 150–250 question bank
7. weak-topic tracking and mock-exam mode
