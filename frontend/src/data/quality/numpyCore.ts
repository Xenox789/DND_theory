import type { FalsePair } from "./official";

export const numpyCoreDistractors: Record<string, FalsePair[]> = {
  "np-q1": [["A numpy.ndarray alapértelmezés szerint kizárólag egydimenziós; a kétdimenziós adatok listákból álló listák.", "A numpy.ndarray is by definition one-dimensional; 2D data must be represented as nested Python lists."]],
  "np-q2": [["Az ndim attribútum az összes elemet számolja, a size attribútum a tengelyek számát.", "The ndim attribute counts elements while size reports the number of axes."]],
  "np-q3": [["(32,5) alakú tömb esetén az ndim=32 és a size=5.", "For shape (32,5), ndim is 32 and size is 5."]],
  "np-q4": [["A (2,0,3) alak nem megengedett, mert egy ndarray egyik dimenziója sem lehet nulla hosszúságú.", "Shape (2,0,3) is invalid because an ndarray may not have a zero-length axis."]],
  "np-q5": [["A shape=(2,3) ugyanúgy dtype, mint az np.float64.", "shape=(2,3) is a dtype in the same sense as np.float64."]],
  "np-q6": [["Ha float értéket integer dtype tömbbe írunk, a dtype automatikusan float64-re változik a teljes tömbben.", "Assigning a float into an integer dtype array automatically changes the array's dtype to float64."]],
  "np-q7": [
    ["Az np.arange(4) kétváltozós függvény, amely azonos alakú nullákból és egyesekből álló mátrixot hoz létre.", "np.arange(4) constructs a matrix of zeros and ones rather than a one-dimensional number sequence."],
    ["Az np.empty((2,3)) minden esetben nullákkal inicializálja az új tömböt.", "np.empty((2,3)) always initializes the new array with zeros."]
  ],
  "np-q8": [["Az np.arange(6).reshape((2,4)) sikeres, mert a reshape módosíthatja az elemek számát.", "np.arange(6).reshape((2,4)) succeeds because reshape can change element count."]],
  "np-q9": [["Kétdimenziós a tömbből az a[1:2,1:2] szeletelés automatikusan skalárt ad, mert csak egy elemet választ.", "For 2D a, slicing a[1:2,1:2] automatically returns a scalar because it selects a single value."]],
  "np-q10": [["Egész index és szelet kombinációjánál a[1,:] megtartja mindkét tengelyt, mert a második argumentum ':' szelet.", "For a 2D array a, indexing a[1,:] retains both axes because the second index is a slice."]],
  "np-q11": [["A basic slicing mindig eltünteti a kiválasztott tengelyt, míg egy egész index minden esetben megtartja.", "Basic slicing always removes the indexed axis, while integer indexing always retains it."]],
  "np-q12": [["Az a[1:3] szeletelés haladó indexelés, mert több elemet ad vissza.", "Slicing a[1:3] is advanced indexing because it returns more than one element."]],
  "np-q13": [
    ["Az a[[1,2]] haladó indexelés általában ugyanazt a memóriát osztja meg, mint az eredeti a.", "Advanced integer indexing a[[1,2]] generally shares the original a's data memory."],
    ["A logikai maszkkal végzett kiválasztás mindig az alap indexelés view-szabályait követi.", "Selection by a boolean mask always follows the view semantics of basic indexing."]
  ],
  "np-q14": [["Az a[a>0] maszkos kiválasztás minden esetben a teljes eredeti alakot megtartja, és a nem megfelelő elemeket nullára állítja.", "Selection a[a>0] always preserves the entire original shape and replaces excluded elements with zeros."]],
  "np-q15": [["Két tengely broadcasting szempontjából kompatibilis, ha mindkettő pozitív egész; az egyenlő méret nem számít.", "For broadcasting two axes are compatible whenever both lengths are positive integers; equal sizes do not matter."]],
  "np-q16": [["Eltérő ndim esetén NumPy a kisebb tömb végére illeszt implicit 1-es tengelyeket, nem az elejére.", "When ndim differs, NumPy appends implicit size-one axes to the lower-rank shape instead of prepending them."]],
  "np-q17": [["A (2,3) és (2,) alakok közvetlenül (2,3)-ra broadcastolhatók, mivel az első tengelyen mindkettő 2.", "Shapes (2,3) and (2,) broadcast to (2,3) since both have first-axis length 2."]],
  "np-q18": [["v.shape=(32,) esetén v[:,None].shape=(1,32), mert az új tengely az első index elé kerül.", "For v.shape=(32,), v[:,None] has shape (1,32) since the inserted axis appears before the first index."]],
  "np-q19": [
    ["Az np.sum(a,axis=0) az eredeti tömb minden elemének egyszerre adja vissza az összegét a tengelyek megtartásával.", "np.sum(a,axis=0) necessarily returns one total sum while preserving every input axis."],
    ["Az np.mean(a,axis=1) a második tengely mentén végzett átlagot a kimenetben ugyanakkora hosszúságú tengelyként mindig megtartja.", "np.mean(a,axis=1) always keeps the second axis at its original length in the output."]
  ],
  "np-q20": [["Ha a.shape=(4,5), akkor np.sum(a,axis=1).shape=(5,), mert az 1-es index az első sorra utal.", "If a.shape=(4,5), np.sum(a,axis=1) has shape (5,) because index 1 refers to the first row."]],
  "np-q21": [["Ha a kétdimenziós, a.T az elemek számát is felcseréli a tengelyekkel, ezért a.size értéke megváltozik.", "Transposing a 2D array changes the total number of elements along with the axes."]],
  "np-q22": [
    ["Egydimenziós v esetén v.T oszlopvektort ad (n,1) alakkal, ezért nem ugyanaz a shape, mint v-nél.", "For one-dimensional v, v.T produces a column vector with shape (n,1), unlike v."],
    ["Egydimenziós v esetén a transzponálás megfordítja az elemsorrendet, és az alak (n,) marad.", "For a one-dimensional vector v, transpose reverses the element order while retaining shape (n,)."]
  ],
  "np-q23": [["A view egy új, független adattároló, így írása nem befolyásolhatja az eredeti tömböt.", "A view owns independent storage, so writing to it cannot affect its original array."]],
  "np-q24": [["Egy egyszerű a[1:3] slice mindig full copy, mert a szelet legalább két külön elemet tartalmaz.", "Basic slicing a[1:3] always makes a full copy because two elements are selected."]],
  "np-q25": [
    ["Haladó integer-indexelésnél egy későbbi b[:]=99 módosítás az eredeti a értékeit is minden esetben megváltoztatja.", "After integer advanced indexing, later modifying b[:] also changes the original a in every case."],
    ["Logikai maszkos indexeléskor az eredmény nézet, ha a maszkban legalább két True van.", "Boolean masking produces a view whenever the mask contains at least two True values."]
  ],
  "np-q26": [["Az np.stack ugyanazon létező tengely mentén fűz, az np.concatenate pedig új tengelyt hoz létre.", "np.stack concatenates along an existing axis while np.concatenate creates a new axis."]],
  "np-q27": [
    ["Az a.astype(np.float32) alapértelmezetten helyben átállítja a.dtype értékét az eredeti a objektumban.", "a.astype(np.float32) changes the dtype of the original a object in place by default."],
    ["A dtype-konzverzió csak a shape megváltoztatásával lehetséges, mert a dtype és a dimenziószám azonos tulajdonság.", "A dtype conversion is possible only by changing shape because dtype and rank are the same property."]
  ],
  "np-q28": [
    ["Egydimenziós mask esetén az np.where(mask) egyetlen skalár indexet ad, a True pozíciók számától függetlenül.", "For a 1D mask, np.where(mask) returns one scalar index regardless of the number of True values."],
    ["Az np.where(mask) pontosan a mask tömbbel azonos, booleán elemeket tartalmazó tömböt ad vissza.", "np.where(mask) returns exactly the same boolean array as mask."]
  ],
  "np-q29": [
    ["Egy csupa False maszkra az np.argmax(mask) kivételt dob, mert nincs True pozíció.", "np.argmax(mask) raises an exception on an all-False mask because no True position exists."],
    ["Az np.argmax(mask) a legutolsó True pozíció indexét adja meg, ha több True szerepel.", "np.argmax(mask) returns the index of the last True value if several are present."]
  ]
};
