import { createMockQuestion } from "./types";

export const numpyMocks = [
  createMockQuestion({
    id: "mock-np-1",
    chapter: "numpy",
    prompt: { hu: "Mely állítások igazak a NumPy ndarray alakokra és indexelésre?", en: "Which statements about NumPy ndarray shapes and indexing are correct?" },
    trueFacts: [
      ["Ha a.shape=(32,5), akkor a.ndim=2.", "If a.shape=(32,5), then a.ndim=2."],
      ["Ha a.shape=(32,5), akkor a.size=160.", "If a.shape=(32,5), then a.size=160."],
      ["Ha a.shape=(32,5), akkor a[:,1].shape=(32,).", "If a.shape=(32,5), then a[:,1].shape=(32,)."],
      ["Ha a.shape=(32,5), akkor a[1,:].shape=(5,).", "If a.shape=(32,5), then a[1,:].shape=(5,)."],
      ["Ha a.shape=(32,5), akkor a[[0],:].shape=(1,5).", "If a.shape=(32,5), then a[[0],:].shape=(1,5)."],
      ["A shape=(2,0,3) egy érvényes, nulla elemű ndarray alakja lehet.", "shape=(2,0,3) can be a valid ndarray shape containing zero elements."]
    ],
    falseFacts: [
      ["Ha a.shape=(32,5), akkor a.ndim=160.", "If a.shape=(32,5), then a.ndim=160."],
      ["Ha a.shape=(32,5), akkor a.size=(32,5).", "If a.shape=(32,5), then a.size=(32,5)."],
      ["Ha a.shape=(32,5), akkor a[:,1].shape=(32,1).", "If a.shape=(32,5), then a[:,1].shape=(32,1)."],
      ["Ha a.shape=(32,5), akkor a[1,:].shape=(1,5).", "If a.shape=(32,5), then a[1,:].shape=(1,5)."],
      ["Ha a.shape=(32,5), akkor a[[0],:].shape=(5,).", "If a.shape=(32,5), then a[[0],:].shape=(5,)."],
      ["Egy NumPy tömb shape tulajdonsága szükségszerűen egyetlen skalár egész szám.", "The shape attribute of a NumPy array must be one scalar integer."]
    ],
    explanation: { hu: "A shape tuple, ndim a tengelyek száma, size az elemszám. Egész index eltüntet tengelyt, slice megtartja, egész indexek listája advanced indexing.", en: "shape is a tuple, ndim counts axes, size counts elements. Integer indexing drops an axis; slicing retains it; lists of integer indices trigger advanced indexing." }
  }),
  createMockQuestion({
    id: "mock-np-2",
    chapter: "numpy",
    prompt: { hu: "Mely állítások igazak a NumPy broadcasting, új tengely és redukciós műveletekre?", en: "Which statements about NumPy broadcasting, new axes and reductions are true?" },
    trueFacts: [
      ["A (32,5) és (32,1) alakok broadcastolhatók közös (32,5) alakra.", "Shapes (32,5) and (32,1) broadcast to (32,5)."],
      ["A (32,5) és (32,) alakok nem kompatibilisek összeadáshoz.", "Shapes (32,5) and (32,) cannot broadcast for addition."],
      ["Ha v.shape=(32,), akkor v[:,None].shape=(32,1).", "If v.shape=(32,), v[:,None].shape=(32,1)."],
      ["Ha a.shape=(32,5), akkor a.T.shape=(5,32).", "If a.shape=(32,5), a.T.shape=(5,32)."],
      ["Ha a.shape=(32,5), akkor np.mean(a,axis=0).shape=(5,).", "If a.shape=(32,5), np.mean(a,axis=0).shape=(5,)."],
      ["Ha a.shape=(32,5), akkor np.mean(a,axis=1).shape=(32,).", "If a.shape=(32,5), np.mean(a,axis=1).shape=(32,)."]
    ],
    falseFacts: [
      ["A (32,5) és (32,1) alakok összeadása mindig broadcasting hibát eredményez.", "Adding arrays of shapes (32,5) and (32,1) always produces a broadcasting error."],
      ["A (32,5) és (32,) alakok biztosan kompatibilisek, mert az első dimenzió 32.", "Shapes (32,5) and (32,) must broadcast because the first dimension is 32."],
      ["Ha v.shape=(32,), akkor v[:,None].shape=(1,32).", "If v.shape=(32,), v[:,None].shape=(1,32)."],
      ["Ha a.shape=(32,5), akkor a.T.shape=(32,5).", "If a.shape=(32,5), a.T.shape=(32,5)."],
      ["Ha a.shape=(32,5), akkor np.mean(a,axis=0).shape=(32,).", "If a.shape=(32,5), np.mean(a,axis=0).shape=(32,)."],
      ["Ha a.shape=(32,5), akkor np.mean(a,axis=1).shape=(5,).", "If a.shape=(32,5), np.mean(a,axis=1).shape=(5,)."]
    ],
    explanation: { hu: "Broadcasting a dimenziókat jobbról illeszti; egyenlő hossz vagy 1 megengedett. A redukció elhagyja a kijelölt tengelyt.", en: "Broadcasting aligns trailing axes and permits equal sizes or ones. Reduction removes the reduced axis." }
  }),
  createMockQuestion({
    id: "mock-np-3",
    chapter: "numpy",
    prompt: { hu: "Mely állítások igazak a NumPy view/copy, reshape és alapfüggvények működésére?", en: "Which statements about NumPy views, copies, reshaping and functions are correct?" },
    trueFacts: [
      ["Az a[1:3] egyszerű szeletelés általában nézetet (view) ad.", "Simple slicing a[1:3] normally returns a view."],
      ["Az a[[1,2]] haladó indexelés másolatot (copy) ad.", "Advanced indexing a[[1,2]] returns a copy."],
      ["A np.append(a,42) új tömböt állít elő, nem a eredeti a tömböt módosítja helyben.", "np.append(a,42) creates a new array rather than modifying a in place."],
      ["A reshape művelet megőrzi az elemek teljes számát.", "Reshape preserves the total number of elements."],
      ["A np.argsort([3,1,2]) eredménye [1,2,0].", "np.argsort([3,1,2]) returns [1,2,0]."],
      ["A np.bincount([3,1,2]) eredménye [0,1,1,1].", "np.bincount([3,1,2]) returns [0,1,1,1]."]
    ],
    falseFacts: [
      ["Az a[1:3] egyszerű szeletelés minden esetben független másolatot készít.", "Basic slicing a[1:3] always makes an independent copy."],
      ["Az a[[1,2]] haladó indexelés mindig ugyanazt a memóriát osztja meg, mint a.", "Advanced indexing a[[1,2]] always shares the original data memory."],
      ["A np.append(a,42) helyben bővíti a eredeti a tömböt, és ugyanazt az objektumot adja vissza.", "np.append(a,42) extends the original a array in place and returns that same array."],
      ["Az np.arange(4).reshape(3,2) mindig működik, mert bármilyen elemszám megengedett.", "np.arange(4).reshape(3,2) always succeeds because any element count is allowed."],
      ["A np.argsort([3,1,2]) eredménye [3,2,1].", "np.argsort([3,1,2]) returns [3,2,1]."],
      ["A np.bincount([3,1,2]) eredménye [1,1,1].", "np.bincount([3,1,2]) returns [1,1,1]."]
    ],
    explanation: { hu: "Basic slicing többnyire view, advanced indexing copy; reshape az elemszámot megtartja. argsort indexeket, bincount előfordulásszámokat ad.", en: "Basic slicing usually makes views, advanced indexing copies; reshape preserves element count. argsort returns indices and bincount counts occurrences." }
  })
];
