import type { LessonContentSupplement } from "../lessonEnrichment";

export const fundamentalsExtras: Record<string, LessonContentSupplement> = {
  "why-ml": {
    "ex": [
      "Kézi algoritmus: egy számsor összegét pontosan kiszámítjuk. Gépi tanulás: fényképről a macska felismeréséhez nehéz minden szőrzetre, testhelyzetre és háttérre külön szabályt írni; sok címkézett képből tanítunk modellt. A módszer választása a feladat jellegétől függ.",
      "Hand-written algorithm: compute the exact sum of a number list. ML: recognizing cats in photos would require countless rules for poses, fur, and backgrounds; labeled images can train a model. Choose the method to fit the task."
    ],
    "intuition": [
      "A gépi tanulás nem váltja ki az algoritmust: az algoritmus egy paraméterezett döntési szabályt tanul meg példákból.",
      "ML does not remove algorithms: a learning algorithm derives parameters of a decision rule from examples."
    ]
  },
  "data-point": {
    "ex": [
      "Egy lakás egyetlen adatpontja: x=[52 m², 2 szoba], y=42 millió Ft, a modell becslése ŷ=39 millió Ft. Más feladatban y lehet vektor, például [vérnyomás, pulzus], vagy mátrix, például egy képpontokhoz rendelt 0/1 szegmentációs maszk. Egy teljes tanítóhalmaz m ilyen (x,y) párból áll.",
      "One sample: x=[52 m², 2 rooms], y=HUF 42 million, prediction ŷ=HUF 39 million. Other labels can be vectors [blood pressure, pulse] or matrices, e.g. a pixel-wise 0/1 segmentation mask. A dataset contains m such (x,y) pairs."
    ],
    "connections": [
      "Az X adathalmaz-mátrix sorai a bemeneteket tartalmazzák, a θ modellparamétereket viszont az algoritmus tanulja. A címke alakja nem határozza meg önmagában, hogy osztályozás vagy regresszió történik.",
      "Rows of data matrix X store inputs; θ contains learned model parameters. Target shape alone does not determine classification versus regression."
    ]
  },
  "hypothesis": {
    "ex": [
      "Ha hθ(x)=θ₁x+θ₀, x=3, θ₁=2 és θ₀=1, akkor ŷ=7. Ugyanazon x mellett θ₁=4 esetén ŷ=13: a bemenet nem változott, a megtanult paraméterek igen. Több kimenetű modellnél ŷ vektor vagy akár mátrix alakú is lehet.",
      "For hθ(x)=θ₁x+θ₀ with x=3, θ₁=2, θ₀=1, the prediction is 7. With the same input but θ₁=4, it becomes 13: the data stayed fixed while model parameters changed. Outputs may also be vectors or matrices."
    ],
    "intuition": [
      "A hipotézis egy gép receptje: x az alapanyag, θ a beállítás, ŷ az eredmény; a tanítás a beállításokat módosítja.",
      "Think of a hypothesis as a recipe: x is the input, θ is the adjustable setting, and ŷ the result; training changes the settings."
    ]
  },
  "loss": {
    "ex": [
      "Két példán a hibák +2 és −2. Ezek összege nulla, holott mindkét becslés hibás. Négyzetes hibával 4+4=8; a kurzus J=(1/(2m))Σ hiba² konvenciójában m=2, ezért J=8/4=2. Az egyedi hibákból egyetlen skalár veszteség lesz.",
      "Two errors are +2 and −2. Their signed sum is zero even though both predictions are wrong. Squared errors add to 4+4=8; with course convention J=Σ(error²)/(2m), m=2, so J=2, a single scalar loss."
    ],
    "intuition": [
      "A veszteség egyetlen összehasonlítható szám: kisebb érték jobb illeszkedést jelez az adott adatokon, de önmagában nem bizonyítja a jó általánosítást.",
      "Loss compresses errors into a comparable number: lower often means better fit on the evaluated data, but not necessarily good generalization."
    ]
  },
  "three-groups": {
    "connections": [
      "A felügyelt tanulásnál a helyes y címke, a felügyelet nélkülinél az adat szerkezete, az RL-nél pedig a cselekvés következményét értékelő reward szolgáltatja a tanulás alapját.",
      "Supervised learning uses labels y, unsupervised learning uses patterns or objectives defined from data, and reinforcement learning uses action consequences measured by reward."
    ]
  },
  "supervised-paradigm": {
    "ex": [
      "Osztályozási példa: x egy röntgenkép, y=1 beteg vagy y=0 egészséges. A modell ŷ=0,85 valószínűséget becsülhet. Regresszió esetén ugyanebből a bemenettípusból például egy folytonos mérési értéket becsülnénk.",
      "Classification example: x is an X-ray image and y is 1 for a disease or 0 otherwise; the model may predict probability 0.85. Regression with similar inputs could instead predict a continuous measurement."
    ]
  },
  "unsupervised-paradigm": {
    "intuition": [
      "A címkék hiánya nem cél nélküli tanulást jelent: más cél a hasonló pontok csoportosítása, más a tömör ábrázolás megtanulása, és megint más a zaj eltávolítása.",
      "Missing labels do not mean missing objectives: clustering finds groups, dimensionality reduction compresses representations, and denoising tries to remove noise."
    ],
    "connections": [
      "Ugyanaz a 100 vásárló leírható klaszterekkel (hasonló szokások), két dimenzióra redukált pontokkal (vizualizáció), vagy megtisztított mérési adatokkal (denoising).",
      "The same customer dataset could be clustered into similar groups, reduced to two dimensions for visualization, or denoised to remove measurement errors."
    ]
  },
  "reinforcement-paradigm": {
    "intuition": [
      "Egy akció hatása később jelentkezhet. Ha egy robot két jó lépés után ér célba, a végső jutalomból nem mindig nyilvánvaló, melyik korábbi döntés mennyit segített: ez a credit assignment probléma.",
      "An action can have delayed effects. If a robot reaches a goal after two moves, a final reward does not identify which earlier move contributed how much: the credit assignment problem."
    ],
    "connections": [
      "Supervised tanulásban közvetlenül megmutatjuk a helyes y választ; RL-ben a környezet jutalmazhat csak az epizód végén, ezért felfedezésre és késleltetett visszajelzés kezelésére van szükség.",
      "Supervised learning provides explicit target labels; RL may reward an agent only at the end of an episode, requiring exploration and handling delayed feedback."
    ]
  },
  "compare-paradigms": {
    "connections": [
      "Új helyzetek: spamcímkézett levelek → supervised; címke nélküli vásárlói csoportok → unsupervised; játékot próbálgató, pontszámból tanuló agent → RL. Nem a bemenet típusa, hanem a tanulási visszajelzés dönt.",
      "New tasks: labeled spam e-mails → supervised; grouping unlabeled customers → unsupervised; an agent learning a game from scores → RL. Feedback, not the input type, distinguishes them."
    ]
  },
  "tasks": {
    "ex": [
      "Feladat | bemenet | cél: lakásár-regresszió | terület és hely | ár; spam-osztályozás | levél szövege | spam/nem spam; klaszterezés | vásárlói adatok | címke nélküli csoportok; dimenziócsökkentés | 100 jellemző | például 2D reprezentáció; zajszűrés | zajos jel | tisztított jel. A logisztikus regresszió neve ellenére osztályozó.",
      "Task | input | target: price regression | size and location | price; spam classification | text | spam/not spam; clustering | customer data | unlabeled groups; dimensionality reduction | 100 features | e.g. 2D embedding; denoising | noisy signal | cleaned signal. Logistic regression is a classifier despite its name."
    ],
    "connections": [
      "Az osztályozás és a regresszió többnyire supervised feladat. A feladat dönti el a kimeneti típust és a megfelelő veszteséget; a 'logistic regression' elnevezés nem jelenti, hogy a cél folytonos érték.",
      "Classification and regression are usually supervised tasks. Task semantics determine output and loss; 'logistic regression' does not mean predicting a continuous target."
    ]
  }
};
