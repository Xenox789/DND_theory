import type { LessonContentSupplement } from "../lessonEnrichment";
export const logisticExtras: Record<string, LessonContentSupplement> = {
  "binary-classification": {
    "ex": [
      "A lineáris becslés 1,3 vagy −0,4 is lehet: ezek nem jó bináris valószínűségek. A szigmoid 0 és 1 közé képez, és a BCE veszteség az osztályozási célhoz igazodik.",
      "Linear predictions may be 1.3 or −0.4: these are invalid binary probabilities. Sigmoid maps values into 0–1, with BCE matching the classification objective."
    ]
  },
  "sigmoid": {
    "ex": [
      "g(−2)≈0,119; g(0)=0,5; g(2)≈0,881. A szigmoid monoton növekszik, de soha nem éri el pontosan a 0-t vagy az 1-et véges bemenet esetén.",
      "g(−2)≈0.119; g(0)=0.5; g(2)≈0.881. Sigmoid increases monotonically and never equals exactly 0 or 1 for finite inputs."
    ]
  },
  "logistic-hypothesis": {
    "ex": [
      "100 beteg, 2 laborérték: X alakja (100,3) a biasoszloppal, θ alakja (3,), z=Xθ és h=g(z) alakja (100,). Egy betegre x=[1,4,2], θ=[−3,0.5,0.5] esetén z=0, h=0,5, amely skalár.",
      "For 100 patients with 2 lab features: X has shape (100,3) including bias, θ (3,), z=Xθ and h=g(z) (100,). One patient x=[1,4,2], θ=[−3,0.5,0.5] gives z=0, h=0.5, a scalar."
    ]
  },
  "decision-boundary": {
    "ex": [
      "θ=[−2,1,1] esetén z=−2+x₁+x₂; a döntési határ x₁+x₂=2. (1,0): z=−1, h≈0,269, 0-s osztály. (2,1): z=1, h≈0,731, 1-es osztály.",
      "With θ=[−2,1,1], z=−2+x₁+x₂; boundary x₁+x₂=2. At (1,0), z=−1, h≈0.269, class 0. At (2,1), z=1, h≈0.731, class 1."
    ]
  },
  "binary-cross-entropy": {
    "ex": [
      "y=1 és h=0,9 esetén L=−ln(0,9)≈0,105; h=0,1 esetén L=−ln(0,1)≈2,303. A magabiztos, de hibás becslés sokkal nagyobb veszteséget kap.",
      "For y=1 and h=0.9, L=−ln(0.9)≈0.105; if h=0.1, L=−ln(0.1)≈2.303. Confident but incorrect predictions are penalized much more."
    ]
  },
  "convex-logistic": {
    "ex": [
      "A logisztikus regresszió BCE célfüggvénye konvex a paraméterekben, de tökéletesen szétválasztható adatoknál regularizáció nélkül akár véges optimum sem létezik. A globális optimumra vonatkozó állítás megfelelő feltételeket igényel.",
      "Logistic regression with BCE is convex in its parameters, but for linearly separable data the unregularized problem may have no finite minimizer. Global convergence statements require suitable assumptions."
    ]
  }
};
