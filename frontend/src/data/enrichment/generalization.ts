import type { LessonContentSupplement } from "../lessonEnrichment";
export const generalizationExtras: Record<string, LessonContentSupplement> = {
  "generalization": {
    "ex": [
      "Egy modell 100 tanítópéldából 98-at jól osztályoz, 20 új mintából viszont csak 12-t. Ez a különbség azt mutatja, miért nem elegendő a tanítási eredmény az általánosítás megítélésére.",
      "A model gets 98/100 training cases correct but only 12/20 new examples. This illustrates why training performance alone does not prove generalization."
    ]
  },
  "underfit-overfit": {
    "ex": [
      "A: J_train=12, J_val=13: lehetséges alulillesztés. B: J_train=0,2, J_val=8: lehetséges túlillesztés. C: J_train=1,2, J_val=1,5: ebben a példában jobb egyensúly. Csak ugyanazon veszteségmérték alapján hasonlíts.",
      "A: J_train=12 and J_val=13 suggests underfitting. B: 0.2 versus 8 suggests overfitting. C: 1.2 versus 1.5 shows a better balance here. Only compare values on comparable loss scales."
    ]
  },
  "risk-factors": {
    "ex": [
      "Ha ugyanannak az 1000-paraméteres modellnek 30 helyett 300 tanítópéldát adunk, általában csökkenhet a túlillesztés. Ha 30 helyett 10 tesztpéldán mérünk, csak az értékelés bizonytalansága nő. Ha csökkentjük a paraméterszámot, mérséklődhet az overfit, de túlzott egyszerűsítés underfithez vezethet.",
      "For the same 1000-parameter model, increasing training examples from 30 to 300 may reduce overfitting. Reducing test examples from 30 to 10 increases measurement uncertainty, not training overfit. Fewer parameters may help but can underfit."
    ]
  },
  "three-way-split": {
    "ex": [
      "Szemléltető felosztás 200 példán: 100 train, 50 validation, 50 test. A train θ-t tanítja, a validation választja ki a jobb learning rate-et, a test a végleges becslést ellenőrzi. Az 50/25/25 arány nem általános szabály.",
      "Illustrative split of 200 samples: 100 train, 50 validation, 50 test. Training fits θ, validation selects learning rate, test estimates final performance. The 50/25/25 ratio is not a universal rule."
    ]
  },
  "hyperparameters": {
    "ex": [
      "Három tanítási próbánál α=0,001 → J_val=3,1; α=0,01 → J_val=1,4; α=0,1 → J_val=4. A validáció alapján α=0,01 nyer. A θ súlyokat mindhárom próbában külön a train adatokon tanítottuk, és a test halmazt még nem használtuk.",
      "Across three trials, α=0.001 → J_val=3.1; α=0.01 → 1.4; α=0.1 → 4. Validation favors 0.01. The θ weights were separately trained on training data and the test set remains untouched."
    ]
  },
  "l2": {
    "ex": [
      "θ=[θ₀,θ₁,θ₂]=[5,2,3] esetén, a biast kizárva, az L2-büntetés 2²+3²=13. J_data=2 mellett λ=0: J_reg=2; λ=0,1: 3,3; λ=1: 15. A nagy λ túlzottan csökkentheti a súlyokat.",
      "With θ=[5,2,3], excluding bias, L2 penalty is 2²+3²=13. If data loss=2: λ=0 gives 2, λ=0.1 gives 3.3, λ=1 gives 15. Large λ can over-shrink weights."
    ]
  },
  "early-stopping": {
    "ex": [
      "Öt epoch: J_train=[5;4;3;2;1], J_val=[6;5;4;4,5;5]. A validációs minimum a 3. epochban 4, ezért annak a paraméterállapotát őrizzük meg, még ha a tanítási veszteség tovább csökkent is. Nem J_test alapján választunk.",
      "Five epochs: J_train=[5,4,3,2,1], J_val=[6,5,4,4.5,5]. The validation minimum is 4 at epoch 3, so save those parameters although training loss keeps dropping. Do not select using J_test."
    ]
  },
  "solutions-summary": {
    "ex": [
      "Magas train + magas validation veszteség: mérlegelj nagyobb kapacitást vagy jobb jellemzőket (underfit). Alacsony train + magas validation veszteség: több adat, egyszerűbb modell, L2 vagy early stopping segíthet (overfit).",
      "High train and validation losses: try more capacity or improved features (underfitting). Low train but high validation loss: more data, simpler model, L2 or early stopping can help (overfitting)."
    ]
  }
};
