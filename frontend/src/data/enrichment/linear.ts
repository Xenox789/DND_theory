import type { LessonContentSupplement } from "../lessonEnrichment";

export const linearExtras: Record<string, LessonContentSupplement> = {
  "regression-linear-hypothesis": {
    "ex": [
      "Ha ŷ=2x+5 és x=10, akkor a becslés 25. Ha x eggyel nő, a becslés 2-vel nő (meredekség θ₁=2); x=0-nál a becslés 5 (eltolás θ₀=5).",
      "For ŷ=2x+5 and x=10, prediction is 25. Increasing x by one raises prediction by 2 (slope θ₁=2); at x=0 the prediction is 5 (intercept θ₀=5)."
    ]
  },
  "multivariate-geometry": {
    "ex": [
      "Két bemeneti változóval ŷ=3+2x₁−x₂. Az (x₁=4,x₂=1) pont felett ŷ=10. A háromdimenziós (x₁,x₂,ŷ) térben az összes ilyen pont egy síkon van; négy valódi jellemző esetén 5 modellparaméter van.",
      "With two features ŷ=3+2x₁−x₂. At (x₁=4,x₂=1), ŷ=10. All (x₁,x₂,ŷ) points lie on a plane in 3D; four real features imply five parameters including the bias."
    ],
    "intuition": [
      "Egy változónál egyenesre illesztünk, kettőnél síkra; a θ súlyok azt szabályozzák, hogyan dől ez a sík az egyes bemeneti tengelyek mentén.",
      "One feature gives a line, two give a plane; θ weights control the plane's slope along input axes."
    ]
  },
  "matrix-form": {
    "ex": [
      "Két beteg két mért jellemzője: X=[[1,20,60],[1,30,70]], θ=[5,2,1]. Az első betegre 5+2·20+60=105, a másodikra 5+2·30+70=135, így Xθ=[105,135], shape (2,). Az 1-es oszlop a bias tagot kezeli.",
      "Two examples with two features: X=[[1,20,60],[1,30,70]], θ=[5,2,1]. First prediction=5+2·20+60=105, second=5+2·30+70=135, so Xθ=[105,135], shape (2,). The leading ones are the bias column."
    ]
  },
  "least-squares": {
    "ex": [
      "Két minta valós y értéke [2,4], a becslés ŷ=[3,2]. A hibák [1,−2], a négyzetek [1,4], az összeg 5. m=2 mellett J=5/(2·2)=1,25 a kurzus konvenciójával. A szokásos átlagos négyzetes hiba (MSE) 2,5; a két alak ugyanott minimális.",
      "True y=[2,4], predictions ŷ=[3,2]. Errors [1,−2], squared errors [1,4], sum 5. With m=2 and the course convention J=5/(2·2)=1.25. Standard MSE is 2.5; both have the same minimizer."
    ]
  },
  "gradient": {
    "ex": [
      "Legyen J(θ₀,θ₁)=(θ₀−1)²+(θ₁−2)². Ekkor ∂J/∂θ₀=2(θ₀−1), ∂J/∂θ₁=2(θ₁−2). A (0,0) pontban ∇J=[−2,−4]. A negatív gradiens [2,4] a csökkenés helyi iránya.",
      "Let J(θ₀,θ₁)=(θ₀−1)²+(θ₁−2)². The derivatives are 2(θ₀−1) and 2(θ₁−2). At (0,0), ∇J=[−2,−4]. The negative gradient [2,4] points locally downhill."
    ],
    "intuition": [
      "A parciális derivált azt kérdezi: ha csak ezt a paramétert mozdítom, mennyire változik a veszteség? A gradiens ezeket a válaszokat egy vektorba gyűjti.",
      "A partial derivative asks how loss changes when only one parameter moves. The gradient collects those sensitivities in a vector."
    ]
  },
  "gradient-descent": {
    "ex": [
      "Az előző J veszteségnél θ=(0,0), ∇J=[−2,−4] és α=0,1. Az új θ=(0,2;0,4), azaz (0.2,0.4), és J 5-ről 3,2-re csökken. Még egy lépéssel θ=(0,36;0,72), J=2,048. Túl nagy α esetén a minimumon átlépve oszcilláció vagy divergencia léphet fel.",
      "For J above, θ=(0,0), ∇J=[−2,−4], α=0.1: θ becomes (0.2,0.4) and J drops from 5 to 3.2. A second step gives θ=(0.36,0.72), J=2.048. Excessive α may overshoot, oscillate or diverge."
    ]
  },
  "feature-scaling": {
    "ex": [
      "Egy jellemzőre adatok [10,20,30]. A 20 érték min-max skálázva (20−10)/(30−10)=0,5. Standardizálva μ=20, így (20−20)/σ=0. Ha egy kiugró érték 300-ra nő, a min-max tartomány jelentősen megváltozik.",
      "For values [10,20,30], min-max scaling of 20 gives (20−10)/(30−10)=0.5; standardization gives 0 because mean=20. A new extreme maximum 300 greatly changes the min-max range."
    ]
  },
  "normal-equation": {
    "ex": [
      "Ha X alakja (200,5), akkor Xᵀ=(5,200), XᵀX=(5,5), Xᵀy=(5,), és az I egységmátrix (5,5). Ha XᵀX szinguláris, használható a Moore–Penrose-pszeudoinverz X⁺. A kurzus egyszerűsített (XᵀX+λI) képlete a bias irányát is bünteti; ha θ₀-t ki akarjuk venni, a büntetőmátrix átlója [0,1,1,1,1].",
      "If X has shape (200,5), Xᵀ is (5,200), XᵀX is (5,5), Xᵀy is (5,), and identity I is (5,5). If XᵀX is singular, use Moore–Penrose pseudoinverse X⁺. The course's simplified XᵀX+λI regularizes all coordinates, including bias; to exempt θ₀ use diagonal [0,1,1,1,1]."
    ],
    "connections": [
      "A gradienscsökkentés iterációval közelít, a normálegyenlet közvetlenül oldja meg a legkisebb négyzetes problémát. A regularizációval végzett változatoknál az intercept kezelését konzisztensen kell megválasztani.",
      "Gradient descent solves iteratively; the normal equation solves least squares directly. With regularization, choose a consistent convention for the intercept."
    ]
  }
};
