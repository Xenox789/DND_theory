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

### Generalization, validation, and overfitting

Lecture 4 explicitly states:

- training set and test set must be disjoint;
- do not use the test set for learning;
- the test set estimates performance on unseen data.

Underfitting pattern in the lecture:

```text
J_train: high
J_test / J_val: high and similar
high bias, low variance
```

Overfitting pattern:

```text
J_train keeps decreasing
J_test / J_val starts increasing
low bias, high variance
```

Explicit remedies listed by the course:

- simpler model / fewer parameters;
- more training data;
- regularization such as L2;
- early stopping.

The lecture's L2 example uses:

```text
J(θ) =
  1/(2m) * Σ_j (hθ(x^(j)) - y^(j))²
  + λ * Σ_(i=1)^n θ_i²
```

The bias / intercept parameter θ₀ is **not penalized**.

Important consequences:

- λ = 0 gives the unregularized objective;
- excessively large λ can force parameters too strongly toward zero and cause underfitting.

### Training / validation / test split

The lecture introduces three sets:

```text
training set -> learn model parameters θ
validation set -> choose hyperparameters Ψ / early stopping
test set -> final independent evaluation
```

The 50% / 25% / 25% split in the slides is an **example**, not a universal requirement.

Hyperparameter examples from the lecture:

- learning rate α;
- polynomial degree or neural-network architecture;
- number of training iterations / early stopping.

The lecture says gradient descent generally cannot be used for arbitrary hyperparameter optimization.

Techniques explicitly listed:

- manual trial and error;
- grid search;
- random search;
- Bayesian optimization;
- evolutionary / genetic algorithms.

### Early stopping

Lecture 4 intentionally introduces a test-loss-based version first and then explains why it is incorrect.

Incorrect:

```text
stop / select state using J_test
```

Reason: this adapts model selection to the test set. The lecture explicitly calls this **cheating**.

Correct:

```text
monitor J_val
retain the best-validation state
stop after validation performance no longer improves
```

A key overfitting signal is:

```text
J_train decreases
while
J_val increases
```

Do not wait for J_train to increase.

### Explicit Lecture 4 exam-scope exclusion

The final Lecture 4 summary says these are **not included in tests / exam**:

- polynomial regression;
- polynomial interpolation;
- biological neuron model and differences from the artificial model.

The same summary says these **may be included**:

- identifying and handling underfitting / overfitting;
- hyperparameters;
- validation set;
- artificial neuron / Perceptron model.

Polynomial regression may therefore be used in the app only as explanatory context for model complexity and overfitting, not as Theory Test question-bank material.

### Artificial neuron and MLP

The lecture defines an artificial neuron as:

```text
z = weighted sum + bias
output = g(z)
```

If `g` is sigmoid, the lecture explicitly states that the neuron is a multivariate logistic-regression model.

A single sigmoid neuron represents one **linear decision surface**. It therefore only solves linearly separable problems; the lecture uses XOR as the key counterexample.

For a fully connected MLP, the course notation is:

```text
W_k ∈ R^(S_k × S_(k-1))
b_k ∈ R^(S_k)
S_0 = n = number of input variables
```

Parameter count of one fully connected layer:

```text
S_k * S_(k-1) weights
+ S_k biases
= S_k(S_(k-1)+1)
```

Official example-test architecture:

```text
20 inputs -> 10 hidden neurons -> 1 output
```

Verified counts:

```text
layer 1: 10*20 + 10 = 210
layer 2: 1*10 + 1 = 11
total: 221
```

The two-layer hypothesis in Lecture 5 is:

```text
h(x) = g2(W2 g1(W1 x + b1) + b2)
Θ = {W1, b1, W2, b2}
```

### Hidden nonlinearity

The course explicitly states:

> Composition of multiple linear functions is still linear.

Therefore, if hidden activations are omitted / identity, stacking linear layers does not add nonlinear expressive power.

For regression:

- keep a nonlinear hidden activation such as ReLU;
- final activation `g2` is typically identity / omitted;
- loss: MSE.

For binary classification:

- scalar probability output;
- final activation: sigmoid;
- loss: BCE / logistic loss.

For multiclass classification with mutually exclusive classes:

- output dimension = number of classes;
- final activation: softmax;
- loss: Cross-Entropy (CE).

Softmax:

```text
softmax(z)_i = exp(z_i) / Σ_j exp(z_j)
```

Its output elements sum to 1 and are interpreted as category probabilities.

The multiclass target is one-hot encoded: the true-category element is 1 and the others are 0.

### Activation functions from Lecture 5

The lecture explicitly shows:

```text
sigmoid(z) = 1/(1+e^(-z))
range: 0..1

tanh(z)
range: -1..1

ReLU(z) = max(0,z)
0 for negative input; z for positive input
```

### Multiple-output regression

The lecture also allows vector-valued regression labels.

For multiple continuous labels:

- y and ŷ are vectors;
- final activation remains identity / omitted;
- MSE is also averaged over elements of the label vector.

Do not infer multiclass classification merely from the fact that the output is a vector.

## Rule for future content

If extracted PDF text omits a formula, diagram label, matrix dimension, or other material detail:

1. inspect the rendered slide/page image;
2. compare with later recap slides and the official Theory Test example document;
3. only then add the content to the app.

Do not infer exam-specific notation from generic ML conventions when the course uses its own convention.
