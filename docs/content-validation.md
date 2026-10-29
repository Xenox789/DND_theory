# Content validation notes

This project is an exam-preparation tool. Course material is the source of truth.

## Scope for Theory Test 1

- Lectures 1–6
- NumPy content from the "Video to watch before practice" materials for weeks 3–6
- `ndarray.strides` and stride tricks are explicitly excluded from the Theory Test 1 NumPy scope

## Conventions verified from the 2026 Autumn slides

### Linear regression

For one input variable:

```text
ŷ = hθ(x) = θ₁x + θ₀
```

For n real input variables:

```text
hθ(x) = θ₀ + θ₁x₁ + ... + θₙxₙ
```

There are **n+1 parameters** because of the intercept θ₀.

To use matrix notation, the course introduces the dummy input `x₀ := 1`.

The later Lecture 4 summary explicitly gives:

```text
X ∈ R^(m × (n+1))
θ ∈ R^(n+1)
ŷ = Xθ ∈ R^m
```

Use this convention in the app and question bank.

### Least-squares / MSE convention used by the course

The slides use:

```text
J(θ) = 1/(2m) * Σ_j (hθ(x^(j)) - y^(j))²
```

Important:

- j indexes training examples
- m is the number of training examples
- J(θ) is a scalar
- the project simulations must use the same `1/(2m)` convention

For the univariate model `hθ(x)=θ₁x+θ₀`:

```text
∂J/∂θ₀ = 1/m * Σ_j (hθ(x^(j)) - y^(j))
∂J/∂θ₁ = 1/m * Σ_j (hθ(x^(j)) - y^(j)) * x^(j)
```

### Gradient descent

The gradient points toward the steepest **increase** of the loss.

Gradient descent therefore updates parameters by subtraction:

```text
θ := θ - α ∇J(θ)
```

where α is the learning rate / step size.

For linear regression with MSE, the course states that the loss is quadratic and convex, and with a sufficiently small / appropriate step size gradient descent is guaranteed to find the global optimum approximately.

Do **not** transfer this global-optimum guarantee to a general MLP.

### Normal equation

Course formulas:

```text
θ = (XᵀX)^(-1) Xᵀy
θ = X⁺y
```

Regularized form:

```text
θ = (XᵀX + λI)^(-1) Xᵀy
```

`I` is the identity matrix with the same shape as `XᵀX`.

### Feature scaling

Purpose: scale input variables independently to the same order of magnitude to improve gradient-descent convergence when feature magnitudes differ strongly.

Min-max scaling:

```text
x' = (x - min) / (max - min)
```

The course maps to `[0,1]`.

Standardization:

```text
x' = (x - μ) / σ
```

Result: mean 0 and standard deviation 1.

The lecture explicitly states:

> Min-max scaling: More sensitive to outliers.

Therefore, in the test context, standardization is the more robust of these two methods to a small number of outliers.

### Logistic regression

The course defines the sigmoid as:

```text
g(z) = 1 / (1 + e^(-z))
```

Univariate logistic-regression hypothesis:

```text
hθ(x) = g(θ₁x + θ₀)
```

Multivariate form used in the app:

```text
z = Xθ
h = g(z)
```

The course uses a threshold of **0.5**:

```text
h(x) < 0.5  -> predicted label 0
h(x) >= 0.5 -> predicted label 1
```

Decision boundary:

```text
{x | hθ(x) = 0.5}
```

For two input variables, the lecture visualizes the decision boundary as a line in the input plane.

For m examples and n real input features, using the same x₀=1 intercept convention as linear regression:

```text
X      : (m, n+1)
θ      : (n+1,)
Xθ     : (m,)
g(Xθ)  : (m,)
```

For the official Theory Test example with 100 patients and 2 blood-test features:

```text
X      : (100, 3)
θ      : (3,)
Xθ     : (100,)
g(Xθ)  : (100,)
```

The blood-test values belong to X. The disease/healthy labels belong to y. θ contains model parameters.

### Logistic loss / Binary Cross-Entropy

The Lecture 4 NumPy recap implements:

```text
J(θ) = mean(
  -y * log(h)
  -(1-y) * log(1-h)
)
```

Equivalent mathematical form:

```text
J(θ) = 1/m * Σ_j [
  -y^(j) log(h^(j))
  -(1-y^(j)) log(1-h^(j))
]
```

The course states that logistic loss, when used with the logistic-regression hypothesis, is convex and has a global minimum that gradient descent can find.

The Lecture 4 recap gives:

```text
gradient = Xᵀ(h-y) / m
θ := θ - α * gradient
```

The course explicitly contrasts this with using MSE after the sigmoid: the resulting loss may have multiple local minima, so gradient descent is not guaranteed to find the global optimum.

Training minimizes the **logistic/BCE loss J(θ)**. It does not minimize X, the sigmoid function g, or the numerical magnitude of θ itself.

## Rule for future content

If extracted PDF text omits a formula, diagram label, matrix dimension, or other material detail:

1. inspect the rendered slide/page image;
2. compare with later recap slides and the official Theory Test example document;
3. only then add the content to the app.

Do not infer exam-specific notation from generic ML conventions when the course uses its own convention.
