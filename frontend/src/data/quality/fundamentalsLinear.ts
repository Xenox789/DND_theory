import type { FalsePair } from "./official";

export const fundamentalsDistractors: Record<string, FalsePair[]> = {
  q1: [["A felügyelt tanítóminta az x bemenetet és a paramétereket (θ) párosítja, a címke nem része.", "A supervised training example pairs input x with parameters θ; the target label is not included."]],
  q2: [["A hipotézisfüggvény θ-ja mintánként a valódi címkék vektora, nem tanulható paraméter.", "The θ of a hypothesis function is the vector of labels per example, not learnable parameters."]],
  q3: [["Ha a modell kimenete vektor, az összegzett J(θ) célfüggvénynek is vektornak kell lennie.", "If a model output is a vector, its aggregated objective J(θ) must also be a vector."]],
  q4: [["Az osztályozás (classification) a három fő tanulási paradigma egyike a felügyelt tanulás helyett.", "Classification is one of the three broad learning paradigms instead of supervised learning."]],
  q5: [["A koleszterinszint a modell egy tanítható súlya (weight), a négy személyes adat a címke.", "Cholesterol level is a learnable model weight, while the four personal attributes form the target."]],
  q6: [["Két bemeneti jellemzőnél a lineáris modell hipotézise a 2D x–y síkon is felrajzolható egyetlen egyenesként.", "With two input features, the hypothesis can be fully plotted as a single line in the 2D x–y plane."]],
  q8: [["A θ → valódi tanítócímke (y) párosítás helyes, mert a súlyokat a tanítóadat adja meg.", "Pairing θ with the true training label y is correct because the training data supplies model weights."]],
  q9: [["A felügyelt tanulás során a helyes kimenet helyett csak késleltetett környezeti jutalmat kapunk.", "In supervised learning we obtain only delayed environmental rewards rather than the correct output."]],
  q10: [["A klaszterezés felügyelt tanulás, mert a klaszterazonosítók automatikusan létrejönnek.", "Clustering is supervised learning because cluster identifiers are produced automatically."]],
  q11: [["Megerősítéses tanulásban a jutalom a tanítóadat minden állapotához tartozó helyes akcióval egyenlő.", "In reinforcement learning, the reward equals the correct action supplied with every state."]],
  q12: [["Az RL a felügyelet nélküli tanulás speciális esete, mert a jutalom nem hagyományos osztálycímke.", "Reinforcement learning is a subtype of unsupervised learning because rewards are not conventional class labels."]],
  q13: [["Egy jól definiált, determinisztikus algoritmussal pontosan kiszámolható kimenethez automatikusan előnyösebb tanult modellt használni.", "A learned model is automatically preferable even when a known deterministic algorithm computes the exact answer."]],
  q14: [["A képszegmentációban használt kétdimenziós maszk nem lehet címke, mert a teljes veszteség skalár.", "A two-dimensional segmentation mask cannot be a target because the overall loss is scalar."]],
  q15: [["A megadott 1/(2m) szorzóval a két ±2 hiba után J=4.", "Using the stated factor 1/(2m), two errors of ±2 give J=4."]]
};

export const linearDistractors: Record<string, FalsePair[]> = {
  "lr-q2": [["Két bemeneti jellemző esetén a hipotézis (x₁,x₂,ŷ) koordinátái egy 3D egyenest írnak le, mert a becslés skalár.", "With two features, the (x₁,x₂,ŷ) coordinates of the hypothesis form a line in 3D because the prediction is scalar."]],
  "lr-q3": [["A J(θ)=1/(2m)·Σ(error²) esetén m a modell paramétereinek száma, nem a mintáké.", "In J(θ)=1/(2m)·Σ(error²), m denotes the number of model parameters rather than examples."]],
  "lr-q4": [["A ∂J/∂θ₁ derivált a θ₁ paraméter kis módosítása helyett az x₁ bemenet változását méri.", "The derivative ∂J/∂θ₁ measures sensitivity to input x₁ rather than to parameter θ₁."]],
  "lr-q5": [["A konvex legkisebb négyzetes célfüggvényre bármilyen pozitív α tanulási ráta stabil konvergenciát biztosít.", "For convex least squares, any positive learning rate α guarantees stable convergence."]],
  "lr-q6": [["Biasoszlop használata mellett XᵀX alakja (m,m), mivel m mintából áll a tanítóhalmaz.", "With an intercept column, XᵀX has shape (m,m) because the dataset contains m samples."]],
  "lr-q8": [["A normálegyenletben a θ paraméterek számát a tanítási iterációk száma határozza meg.", "In the normal equation, the number of parameters θ is determined by the number of training iterations."]],
  "lr-q9": [["A regularizált képletben I olyan (m,m) egységmátrix, amely a tanítópéldák közötti távolságot adja meg.", "In the regularized expression I is an (m,m) identity matrix describing distances between training samples."]],
  "lr-q10": [["A jellemzőskálázás a modell tanulható θ súlyait alakítja át előre, és az X adatokat változatlanul hagyja.", "Feature scaling transforms learnable weights θ before training while leaving data X unchanged."]],
  "lr-q11": [["Min-max skálázásnál a (x−μ)/σ kifejezést használjuk a jellemző minimuma és maximuma helyett.", "Min-max scaling uses (x−μ)/σ rather than the feature minimum and maximum."]],
  "lr-q12": [["Standardizálásnál az új érték (x−min)/(max−min), ezért az eredmény mindig 0 és 1 közötti.", "Standardization uses (x−min)/(max−min), so all transformed values are between 0 and 1."]],
  "lr-q13": [["Kevés szélsőséges kiugró értéknél a min-max skálázás jellemzően kevésbé érzékeny, mint a standardizálás.", "With a few extreme outliers, min-max scaling is generally less sensitive than standardization."]],
  "lr-q14": [["Egyetlen példára a hθ(x)=θ₁x+θ₀ becslés kötelezően kételemű vektor, mert két paraméterből számítjuk.", "For one example hθ(x)=θ₁x+θ₀ must be a two-element vector because it uses two parameters."]]
};
