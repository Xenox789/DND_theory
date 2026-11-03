import type { Question } from "../types";

export const numpyCoreQuestions: Question[] = [
  {
    id: "np-q1",
    topics: ["numpy","ndarray"],
    prompt: { hu: "Mely állítások igazak a numpy.ndarray típusra a gyakorlati anyag szerint?", en: "Which statements are true about numpy.ndarray according to the gyakorlati anyag?" },
    choices: [
      { id: "a", text: { hu: "Az elemeknek közös dtype-juk van.", en: "Its elements have a common dtype." } },
      { id: "b", text: { hu: "Lehet multidimensional.", en: "It can be multidimensional." } },
      { id: "c", text: { hu: "Vektorizált műveletek (vectorized műveletek) használhatók rajta.", en: "Vectorized műveletek can be used on it." } },
      { id: "d", text: { hu: "Minden elem kötelezően külön Python object reference.", en: "Every element must be a separate Python object reference." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A NumPy array fix dtype-pal és hatékony natív tárolással dolgozik; dtype=object külön kivétel.", en: "NumPy tömbök (arrays) use a fixed dtype and efficient native storage; dtype=object is a special exception." }
  },
  {
    id: "np-q2",
    topics: ["numpy","attributes"],
    prompt: { hu: "Mely párosítások helyesek ndarray attributes esetén?", en: "Which ndarray attribute pairings are correct?" },
    choices: [
      { id: "a", text: { hu: "size → elemek teljes száma", en: "size → total number of elements" } },
      { id: "b", text: { hu: "ndim → axes száma", en: "ndim → number of axes" } },
      { id: "c", text: { hu: "shape → axis lengths tuple", en: "shape → tuple of axis lengths" } },
      { id: "d", text: { hu: "dtype → az array Python type-ja", en: "dtype → the Python type of the array itself" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Az array Python type-ja ndarray; dtype az elemek NumPy datatype-ját írja le.", en: "The array's Python type is ndarray; dtype describes the NumPy datatype of its elements." }
  },
  {
    id: "np-q3",
    topics: ["numpy","shape"],
    prompt: { hu: "Ha a.shape=(32,5), mely állítások igazak?", en: "If a.shape=(32,5), which statements are true?" },
    choices: [
      { id: "a", text: { hu: "a.ndim=2.", en: "a.ndim=2." } },
      { id: "b", text: { hu: "a.size=160.", en: "a.size=160." } },
      { id: "c", text: { hu: "Az első axis hossza 32.", en: "The first axis has length 32." } },
      { id: "d", text: { hu: "a.shape egy skalár egész szám (scalar integer).", en: "a.shape is a scalar integer." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "shape tuple; ndim a tuple hossza, size az axis-lengths szorzata.", en: "shape is a tuple; ndim is its length and size is the product of its axis lengths." }
  },
  {
    id: "np-q4",
    topics: ["numpy","shape"],
    prompt: { hu: "Melyek lehetnek érvényes ndarray.shape értékek?", en: "Which can be érvényes ndarray.shape values?" },
    choices: [
      { id: "a", text: { hu: "(5,6)", en: "(5,6)" } },
      { id: "b", text: { hu: "(1,)", en: "(1,)" } },
      { id: "c", text: { hu: "(0,1,0)", en: "(0,1,0)" } },
      { id: "d", text: { hu: "12", en: "12" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "shape tuple, és zero-length axis is érvényes. Egy sima integer nem ndarray.shape.", en: "shape is a tuple, and zero-length axes are érvényes. A plain integer is not ndarray.shape." }
  },
  {
    id: "np-q5",
    topics: ["numpy","dtype"],
    prompt: { hu: "Melyek példák NumPy dtype-ra a forrás szerint?", en: "Which are examples of NumPy dtypes in the forrás?" },
    choices: [
      { id: "a", text: { hu: "np.int64", en: "np.int64" } },
      { id: "b", text: { hu: "np.float32", en: "np.float32" } },
      { id: "c", text: { hu: "np.bool_", en: "np.bool_" } },
      { id: "d", text: { hu: "(5,6)", en: "(5,6)" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "(5,6) shape, nem dtype.", en: "(5,6) is a shape, not a dtype." }
  },
  {
    id: "np-q6",
    topics: ["numpy","dtype"],
    prompt: { hu: "Mi történhet, ha float értéket írunk int dtype arraybe?", en: "What can happen when writing a float value into an integer-dtype array?" },
    choices: [
      { id: "a", text: { hu: "A right-hand-side érték az array dtype-jára konvertálódik.", en: "The right-hand-side value is converted to the array dtype." } },
      { id: "b", text: { hu: "A fractional part elveszhet.", en: "The fractional part can be lost." } },
      { id: "c", text: { hu: "Az array dtype automatikusan float lesz minden esetben.", en: "The array dtype automatically becomes float in every case." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A forrás példájában 99.99 int arraybe írva 99 lesz.", en: "In the forrás example, writing 99.99 into an integer array stores 99." }
  },
  {
    id: "np-q7",
    topics: ["numpy","creation"],
    prompt: { hu: "Mely NumPy creation methods szerepelnek a gyakorlati materialben?", en: "Which NumPy array-creation methods appear in the gyakorlati anyag?" },
    choices: [
      { id: "a", text: { hu: "np.array", en: "np.array" } },
      { id: "b", text: { hu: "np.arange", en: "np.arange" } },
      { id: "c", text: { hu: "np.zeros", en: "np.zeros" } },
      { id: "d", text: { hu: "np.ones / np.full", en: "np.ones / np.full" } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Mindegyik szerepel a weeks 3–5 gyakorlati videókban.", en: "All of them appear in the weeks 3–5 gyakorlati materials." }
  },
  {
    id: "np-q8",
    topics: ["numpy","reshape"],
    prompt: { hu: "Mely állítások igazak reshape-re?", en: "Which statements are true about reshape?" },
    choices: [
      { id: "a", text: { hu: "Az element countnak változatlannak kell maradnia.", en: "The element count must remain unchanged." } },
      { id: "b", text: { hu: "Egy axis hossza -1 lehet, amit NumPy következtet.", en: "One axis length can be -1 and is inferred by NumPy." } },
      { id: "c", text: { hu: "Gyakran view-t eredményez.", en: "It often produces a view." } },
      { id: "d", text: { hu: "Mindig megváltoztatja az elemek értékét.", en: "It always changes element values." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "reshape az elrendezést változtatja, nem az értékeket; gyakran shared-memory view.", en: "reshape changes layout, not values, and often gives a shared-memory view." }
  },
  {
    id: "np-q9",
    topics: ["numpy","indexing"],
    prompt: { hu: "Mely indexing forma ad individual elementet/scalart egy 2D arrayből?", en: "Which indexing form returns an individual scalar element from a 2D array?" },
    choices: [
      { id: "a", text: { hu: "a[1,2]", en: "a[1,2]" } },
      { id: "b", text: { hu: "a[1,:]", en: "a[1,:]" } },
      { id: "c", text: { hu: "a[[1],[2]]", en: "a[[1],[2]]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Ha minden axis individual integer indexet kap, skalár elem (scalar element) jön vissza.", en: "When every axis receives an individual integer index, a scalar element is returned." }
  },
  {
    id: "np-q10",
    topics: ["numpy","basic-indexing"],
    prompt: { hu: "Mely állítások igazak basic indexingre?", en: "Which statements are true about alap indexelés (basic indexing)?" },
    choices: [
      { id: "a", text: { hu: "Integer indices és slices kombinációját használja.", en: "It uses a combination of integer indices and slices." } },
      { id: "b", text: { hu: "Legalább egy slice szükséges az array resulthez.", en: "At least one slice is needed for the array-eredmény case." } },
      { id: "c", text: { hu: "A forrás szerint tipikusan view-t ad.", en: "According to the forrás, it typically returns a view." } },
      { id: "d", text: { hu: "Integer-list indexing alap indexelés (basic indexing).", en: "Integer-list indexing is alap indexelés (basic indexing)." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Integer list/array már haladó indexelés (advanced indexing).", en: "An integer list/array triggers haladó indexelés (advanced indexing)." }
  },
  {
    id: "np-q11",
    topics: ["numpy","basic-indexing"],
    prompt: { hu: "Basic indexingnél mi történik az axes-szel?", en: "What happens to axes under alap indexelés (basic indexing)?" },
    choices: [
      { id: "a", text: { hu: "Integer indexelt axis collapse-ol.", en: "An integer-indexed axis collapses." } },
      { id: "b", text: { hu: "Slice-olt axis megmarad.", en: "A sliced axis is retained." } },
      { id: "c", text: { hu: "Minden axis automatikusan megmarad.", en: "Every axis is automatically retained." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Ez a shape-követés egyik fő szabálya.", en: "This is one of the key rules for reasoning about eredmény alakja (eredmény shape)s." }
  },
  {
    id: "np-q12",
    topics: ["numpy","advanced-indexing"],
    prompt: { hu: "Mi triggereli az advanced indexinget a forrás szerint?", en: "What triggers haladó indexelés (advanced indexing) according to the forrás?" },
    choices: [
      { id: "a", text: { hu: "Integer sequence/list/array indexing.", en: "Integer sequence/list/array indexing." } },
      { id: "b", text: { hu: "Boolean maszkos indexelés (mask indexing).", en: "Boolean-maszkos indexelés (mask indexing)." } },
      { id: "c", text: { hu: "Legalább egyszer ilyen indexing használata.", en: "Using at least one such index." } },
      { id: "d", text: { hu: "Csak a colon slice ':' használata.", en: "Using only the colon slice ':'." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A sima slice alap indexelés (basic indexing), nem advanced.", en: "A plain slice is alap indexelés (basic indexing), not advanced." }
  },
  {
    id: "np-q13",
    topics: ["numpy","advanced-indexing","views"],
    prompt: { hu: "Mely állítás igaz haladó indexelés (advanced indexing) resultjára?", en: "Which statement is true about the eredmény of haladó indexelés (advanced indexing)?" },
    choices: [
      { id: "a", text: { hu: "Új array készül a selected elements másolatával.", en: "A new array is created containing copies of the selected elements." } },
      { id: "b", text: { hu: "Mindig view az original tömbre.", en: "It is always a view of the original array." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "A 6. hét forrás explicit: haladó indexelés (advanced indexing) will never produce a view.", en: "Week 6 explicitly states that haladó indexelés (advanced indexing) will never produce a view." }
  },
  {
    id: "np-q14",
    topics: ["numpy","boolean-mask"],
    prompt: { hu: "Mely állítások igazak boolean comparisonre és mask indexingre?", en: "Which statements are true about boolean comparisons and maszkos indexelés (mask indexing)?" },
    choices: [
      { id: "a", text: { hu: "a<0 az a-val azonos shape-jű bool tömböt ad.", en: "a<0 returns a bool array with the same shape as a." } },
      { id: "b", text: { hu: "a[a<0] a True pozíciók values értékeit választja.", en: "a[a<0] selects values at True positions." } },
      { id: "c", text: { hu: "Mask indexing haladó indexelés (advanced indexing).", en: "Mask indexing is haladó indexelés (advanced indexing)." } },
      { id: "d", text: { hu: "a<0 skalár logikai érték (scalar bool) minden többdimenziós tömbnél (multidimensional array).", en: "a<0 is a scalar bool for every multidimensional array." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Comparisons element-wise működnek.", en: "Comparisons operate element-wise." }
  },
  {
    id: "np-q15",
    topics: ["numpy","broadcasting"],
    prompt: { hu: "Mely dimenzió párok kompatibilisek broadcastingnál egy pozícióban?", en: "Which dimenzió pairs are compatible at one position during broadcasting?" },
    choices: [
      { id: "a", text: { hu: "3 és 3", en: "3 and 3" } },
      { id: "b", text: { hu: "1 és 7", en: "1 and 7" } },
      { id: "c", text: { hu: "8 és 1", en: "8 and 1" } },
      { id: "d", text: { hu: "3 és 5", en: "3 and 5" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Dimensions kompatibilisek, ha egyenlők vagy legalább az egyik 1.", en: "Dimensions are compatible if equal or if at least one is 1." }
  },
  {
    id: "np-q16",
    topics: ["numpy","broadcasting"],
    prompt: { hu: "Mi történik, ha a broadcasting argument shapes ndim-je eltér?", en: "What happens when broadcasting arguments have different numbers of dimensions?" },
    choices: [
      { id: "a", text: { hu: "A rövidebb shape elé length-1 axes kerülnek logikailag.", en: "Leading length-1 axes are logically added to the shorter shape." } },
      { id: "b", text: { hu: "Ezután matching axis positions dimensions értékeit hasonlítjuk.", en: "Then dimensions at matching axis positions are compared." } },
      { id: "c", text: { hu: "Mindig azonnal ValueError keletkezik.", en: "A ValueError always occurs immediately." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Ez a gyakorlati slides broadcasting algorithmja.", en: "This is the broadcasting algorithm shown in the gyakorlati slides." }
  },
  {
    id: "np-q17",
    topics: ["numpy","broadcasting"],
    prompt: { hu: "Mely shape-párok broadcastolhatók közös (2,3) shape-re?", en: "Which shape pairs can broadcast to common shape (2,3)?" },
    choices: [
      { id: "a", text: { hu: "(2,3) és (3,)", en: "(2,3) and (3,)" } },
      { id: "b", text: { hu: "(2,3) és (2,1)", en: "(2,3) and (2,1)" } },
      { id: "c", text: { hu: "(3,) és (2,1)", en: "(3,) and (2,1)" } },
      { id: "d", text: { hu: "(2,3) és (2,)", en: "(2,3) and (2,)" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "(2,) → (1,2), ami 3-mal nem kompatibilis az utolsó axis-on.", en: "(2,) becomes (1,2), whose final dimenzió is incompatible with 3." }
  },
  {
    id: "np-q18",
    topics: ["numpy","newaxis"],
    prompt: { hu: "Ha v.shape=(32,), mely alakok (shapes) helyesek?", en: "If v.shape=(32,), which shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "v[:,None] → (32,1)", en: "v[:,None] → (32,1)" } },
      { id: "b", text: { hu: "v[None,:] → (1,32)", en: "v[None,:] → (1,32)" } },
      { id: "c", text: { hu: "None és np.newaxis ebben a contextben equivalent.", en: "None and np.newaxis are equivalent in this context." } },
      { id: "d", text: { hu: "v[:,None] → (1,32)", en: "v[:,None] → (1,32)" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "None az adott helyen új length-1 axis-t szúr be.", en: "None inserts a new length-1 axis at that position." }
  },
  {
    id: "np-q19",
    topics: ["numpy","reductions"],
    prompt: { hu: "Melyek példák reduction/collapse operationre?", en: "Which are examples of reduction/collapse műveletek?" },
    choices: [
      { id: "a", text: { hu: "np.sum", en: "np.sum" } },
      { id: "b", text: { hu: "np.mean", en: "np.mean" } },
      { id: "c", text: { hu: "np.any / np.all", en: "np.any / np.all" } },
      { id: "d", text: { hu: "np.argmax", en: "np.argmax" } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "A forrás mindet collapse művelet példaként sorolja.", en: "The forrás lists all of these as examples of collapse műveletek." }
  },
  {
    id: "np-q20",
    topics: ["numpy","reductions","axis"],
    prompt: { hu: "Ha a.shape=(4,5), mely eredmény alakok (shapes) helyesek?", en: "If a.shape=(4,5), which eredmény alakja (eredmény shape)s are correct?" },
    choices: [
      { id: "a", text: { hu: "np.sum(a,axis=0) → (5,)", en: "np.sum(a,axis=0) → (5,)" } },
      { id: "b", text: { hu: "np.sum(a,axis=1) → (4,)", en: "np.sum(a,axis=1) → (4,)" } },
      { id: "c", text: { hu: "np.sum(a) → skalár (scalar)", en: "np.sum(a) → skalár (scalar)" } },
      { id: "d", text: { hu: "np.sum(a,axis=0) → (4,)", en: "np.sum(a,axis=0) → (4,)" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A selected axis collapse-ol; axis nélkül minden axis collapse-ol.", en: "The selected axis collapses; without axis all axes collapse." }
  },
  {
    id: "np-q21",
    topics: ["numpy","transpose"],
    prompt: { hu: "Ha a.shape=(2,3), mely állítások igazak?", en: "If a.shape=(2,3), which statements are true?" },
    choices: [
      { id: "a", text: { hu: "a.T.shape=(3,2).", en: "a.T.shape=(3,2)." } },
      { id: "b", text: { hu: "np.transpose(a).shape=(3,2).", en: "np.transpose(a).shape=(3,2)." } },
      { id: "c", text: { hu: "np.swapaxes(a,0,1).shape=(3,2).", en: "np.swapaxes(a,0,1).shape=(3,2)." } },
      { id: "d", text: { hu: "a.T minden esetben copy.", en: "a.T is always a copy." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "2D-ben ezek axis swapot végeznek; transpose tipikusan view.", en: "In 2D these perform an axis swap; transpose is typically a view." }
  },
  {
    id: "np-q22",
    topics: ["numpy","transpose"],
    prompt: { hu: "Mit csinál egy 1D array .T property-je?", en: "What does .T do for a 1D array?" },
    choices: [
      { id: "a", text: { hu: "A shape (n,) marad.", en: "Shape remains (n,)." } },
      { id: "b", text: { hu: "Automatikusan (n,1) oszlopvektor (column vector) lesz.", en: "It automatically becomes an (n,1) column vector." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "1D-ben nincs két axis, amit meg lehetne cserélni.", en: "A 1D array has no pair of axes to swap." }
  },
  {
    id: "np-q23",
    topics: ["numpy","views"],
    prompt: { hu: "Mit jelent, hogy egy array view?", en: "What does it mean for an array to be a view?" },
    choices: [
      { id: "a", text: { hu: "Underlying memory-t oszthat meg egy másik tömbbel.", en: "It can share underlying memory with another array." } },
      { id: "b", text: { hu: "A view módosítása az original/base tömböt is érintheti.", en: "Modifying the view can affect the original/base array." } },
      { id: "c", text: { hu: "Mindig teljesen független copy.", en: "It is always a completely independent copy." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A view lényege a megosztott memória (shared memory).", en: "The defining idea of a view is megosztott memória (shared memory)." }
  },
  {
    id: "np-q24",
    topics: ["numpy","views"],
    prompt: { hu: "Mely műveletek (műveletek) szerepelnek view-t előállító műveletként (view-producing művelet) a 6. hét anyagában?", en: "Which műveletek are discussed as view-producing in 6. hét?" },
    choices: [
      { id: "a", text: { hu: "Reshape", en: "Reshape" } },
      { id: "b", text: { hu: "Transpose / axis swapping", en: "Transpose / axis swapping" } },
      { id: "c", text: { hu: "Basic indexing", en: "Basic indexing" } },
      { id: "d", text: { hu: "Advanced indexing", en: "Advanced indexing" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Advanced indexing explicit copy; nem view.", en: "Advanced indexing explicitly creates a copy, not a view." }
  },
  {
    id: "np-q25",
    topics: ["numpy","views","advanced-indexing"],
    prompt: { hu: "Mely állítások igazak haladó indexelés (advanced indexing) és memory sharing kapcsolatára?", en: "Which statements are true about haladó indexelés (advanced indexing) and memory sharing?" },
    choices: [
      { id: "a", text: { hu: "Advanced indexing eredménye új array.", en: "Advanced indexing returns a new array." } },
      { id: "b", text: { hu: "A selected elements másolódnak.", en: "The selected elements are copied." } },
      { id: "c", text: { hu: "A eredmény módosítása általában nem módosítja az original tömböt.", en: "Modifying the eredmény generally does not modify the original array." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Ez különbözteti meg az haladó indexelés (advanced indexing) eredményt a basic-indexing view-tól.", en: "This distinguishes advanced-indexing results from basic-indexing views." }
  },
  {
    id: "np-q26",
    topics: ["numpy","concatenate","stack"],
    prompt: { hu: "Mely állítások igazak np.concatenate és np.stack műveletekre a forrás szerint?", en: "Which statements are true about np.concatenate and np.stack according to the forrás?" },
    choices: [
      { id: "a", text: { hu: "concatenate meglévő axis mentén joinol.", en: "concatenate joins along an existing axis." } },
      { id: "b", text: { hu: "stack új axis mentén joinol.", en: "stack joins along a new axis." } },
      { id: "c", text: { hu: "Mindkettő új tömböt készít.", en: "Both create new tömbök (arrays)." } },
      { id: "d", text: { hu: "Loopban ismételt concatenate ajánlott hatékonyság miatt.", en: "Repeated concatenation in a loop is recommended for efficiency." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A forrás kifejezetten tiltja a concatenate/stack loopban való ismétlését O(n²) költség miatt.", en: "The forrás explicitly warns against repeated concatenate/stack in a loop because of O(n²) cost." }
  },
  {
    id: "np-q27",
    topics: ["numpy","astype"],
    prompt: { hu: "Mely állítások igazak ndarray.astype használatára?", en: "Which statements are true about ndarray.astype?" },
    choices: [
      { id: "a", text: { hu: "Datatype conversionre használható.", en: "It can be used for datatype conversion." } },
      { id: "b", text: { hu: "Ha conversion történik, új tömböt ad.", en: "When conversion occurs, it returns a new array." } },
      { id: "c", text: { hu: "float → int conversion fractional részt elveszíthet.", en: "float → int conversion can lose fractional parts." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A week 5 forrás ezt explicit példákkal mutatja.", en: "Week 5 demonstrates this explicitly with examples." }
  },
  {
    id: "np-q28",
    topics: ["numpy","where"],
    prompt: { hu: "Mire használható np.where(mask) a forrás példáiban?", en: "What is np.where(mask) used for in the forrás examples?" },
    choices: [
      { id: "a", text: { hu: "A True positions integer indices értékeinek kinyerésére.", en: "To obtain integer indices of True positions." } },
      { id: "b", text: { hu: "nD mask esetén axis-onként index tömbök (arrays) tuple-jét adhatja.", en: "For an nD mask, it can return a tuple of index tömbök (arrays) separated by axis." } },
      { id: "c", text: { hu: "A tuple közvetlenül használható indexingre.", en: "The tuple can be used directly for indexing." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A forrás ezt standard multidimensional-index formatként mutatja.", en: "The forrás presents this as the standard multidimensional-index format." }
  },
  {
    id: "np-q29",
    topics: ["numpy","argmax"],
    prompt: { hu: "Mely állítások igazak np.argmax(boolean_mask) használatára?", en: "Which statements are true about using np.argmax(boolean_mask)?" },
    choices: [
      { id: "a", text: { hu: "Ha van True, az első True indexét megtalálhatja.", en: "If there is a True value, it can find the first True index." } },
      { id: "b", text: { hu: "All-False masknál külön ellenőrzés szükséges.", en: "An all-False mask requires a separate check." } },
      { id: "c", text: { hu: "Multidimensional arraynél axis nélkül flat indexet ad.", en: "For a multidimensional array without an axis argument, it returns a flat index." } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "A week 3 és week 5 anyag mindhárom részletet kiemeli.", en: "Weeks 3 and 5 explicitly highlight all three points." }
  },
  {
    id: "np-q30",
    topics: ["numpy","scope"],
    prompt: { hu: "Mely NumPy témák vannak explicit kizárva Theory Test 1-ből?", en: "Which NumPy topics are explicitly excluded from Theory Test 1?" },
    choices: [
      { id: "a", text: { hu: "ndarray.strides", en: "ndarray.strides" } },
      { id: "b", text: { hu: "stride tricks", en: "stride tricks" } },
      { id: "c", text: { hu: "broadcasting", en: "broadcasting" } },
      { id: "d", text: { hu: "views vs copies", en: "views vs copies" } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A hivatalos mintakérdés-dokumentum (example-question document) csak a strides és stride tricks részt zárja ki explicit.", en: "The official example-question document explicitly excludes only strides and stride tricks from this list." }
  }
];
