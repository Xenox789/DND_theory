import type { Lesson } from "../types";

export const numpyLesson: Lesson = {
  id: "numpy-theory",
  title: {
    hu: "NumPy a Theory Testhez",
    en: "NumPy for the Theory Test"
  },
  subtitle: {
    hu: "Tömbök alakja, indexelés, broadcasting, redukciók és view/copy viselkedés – a weeks 3–6 videók alapján",
    en: "Array shapes, indexing, broadcasting, reductions, and view/copy behavior from the weeks 3–6 video materials"
  },
  source: "Practice video materials • Weeks 3–6",
  sections: [
    {
      id: "numpy-array-programming",
      title: { hu: "Miért használunk NumPy-t?", en: "Why do we use NumPy?" },
      body: {
        hu: "A NumPy az array programming megközelítést támogatja: sok egyedi Python-művelet és ciklus helyett teljes tömbökön (arrays) végzünk vektorizált műveleteket (vectorized operations). A numpy.ndarray többdimenziós, homogén adattípust használó tömb. Az elemek típusa általában közös dtype, és a NumPy natív, tömör tárolást használ.",
        en: "NumPy supports array programming: instead of many scalar Python operations and loops, vectorized operations are applied to whole arrays. numpy.ndarray is a multidimensional homogeneous array with a common dtype and compact native storage."
      },
      why: {
        hu: "Ez azért fontos a deep learninghez, mert a modellek bemenetei, súlyai, aktivációi és gradiensei mind nagy, többdimenziós tömbökként jelennek meg. A PyTorch tensor szemlélete nagyon hasonló.",
        en: "This matters for deep learning because model inputs, weights, activations, and gradients are all represented as large multidimensional arrays. PyTorch tensors follow a very similar model."
      },
      intuition: {
        hu: "Ha egymillió számhoz 1-et akarunk adni, Pythonban írhatnánk egymillió iterációs ciklust. NumPyban egyetlen array + 1 kifejezés írja le ugyanazt a műveletet.",
        en: "If one million values must be incremented by one, a Python loop could perform one million scalar operations. In NumPy, array + 1 expresses the entire vectorized operation."
      },
      connections: {
        hu: "A neurális hálózatok mátrixszorzásai, batch-műveletei és broadcasting szabályai közvetlenül erre a tömbszemléletre épülnek.",
        en: "Neural-network matrix multiplication, batching, and broadcasting build directly on this array-based way of thinking."
      },
      examTrap: {
        hu: "A Python-lista tartalmazhat vegyes típusú elemeket. Egy normál ndarray elemei közös dtype szerint tárolódnak. A dtype=object különleges kivétel, amely Python-object referenciákat tárolhat.",
        en: "A Python list can contain mixed types. A normal ndarray uses one common dtype. dtype=object is a special exception that may store Python-object references."
      },
      keyTerms: [
        { term: "array programming", hu: "tömbprogramozás" },
        { term: "vectorized operation", hu: "vektorizált művelet" },
        { term: "ndarray", hu: "NumPy-tömb" }
      ]
    },
    {
      id: "numpy-attributes",
      title: { hu: "Az ndarray legfontosabb tulajdonságai", en: "The most important ndarray attributes" },
      body: {
        hu: "A Theory Testben különösen fontos a shape, ndim, size és dtype. A shape az egyes tengelyek (axes) hosszait tartalmazó tuple. Az ndim a tengelyek száma. A size az összes elem száma. A dtype az elemek NumPy-adattípusa. Az itemsize egy elem byte-ban mért mérete.",
        en: "The Theory Test focuses especially on shape, ndim, size, and dtype. shape is the tuple of axis lengths, ndim the number of axes, size the total number of elements, dtype the NumPy datatype of the elements, and itemsize the number of bytes per element."
      },
      why: {
        hu: "A legtöbb NumPy-kérdés valójában alak-követés. Ha pontosan tudod, hány tengely van, melyik milyen hosszú, és egy művelet mely tengelyt tartja meg vagy tünteti el, akkor a result shape-ek nagy része levezethető.",
        en: "Most NumPy questions are really shape-tracking questions. If you know how many axes exist, their lengths, and which operation keeps or removes which axis, most result shapes can be derived."
      },
      formula: {
        hu: "ndim = len(shape)    |    size = shape elemeinek szorzata",
        en: "ndim = len(shape)    |    size = product of shape entries"
      },
      formulaTerms: [
        { symbol: "shape", hu: "Az egyes tengelyek hosszainak tuple-je, például (32,5).", en: "Tuple of axis lengths, for example (32,5)." },
        { symbol: "ndim", hu: "A dimenziók / tengelyek száma.", en: "Number of dimensions / axes." },
        { symbol: "size", hu: "Az array összes elemének száma.", en: "Total number of elements in the array." },
        { symbol: "dtype", hu: "Az elemek adattípusa, például int64 vagy float32.", en: "Element datatype, such as int64 or float32." },
        { symbol: "itemsize", hu: "Egyetlen elem mérete byte-ban.", en: "Size of one element in bytes." }
      ],
      workedExample: {
        hu: "Ha a.shape == (32,5), akkor két tengely van, ezért a.ndim == 2. Összesen 32·5=160 elem van, ezért a.size == 160.",
        en: "If a.shape == (32,5), there are two axes so a.ndim == 2. There are 32·5=160 elements, so a.size == 160."
      },
      examTrap: {
        hu: "A shape tuple. Egy 1D, öt elemű array shape-je (5,), nem 5. A size és az ndim ezzel szemben skalár egész szám.",
        en: "shape is a tuple. A one-dimensional five-element array has shape (5,), not 5. size and ndim are scalar integers."
      }
    },
    {
      id: "numpy-zero-shapes",
      title: { hu: "Nulla hosszúságú tengely is lehet érvényes", en: "Zero-length axes are valid" },
      body: {
        hu: "A NumPy shape tengelyhosszai között 0 is szerepelhet. Például a forrásban np.zeros((2,0,3)) érvényes array, amelynek shape-je (2,0,3). Mivel az egyik tengely hossza 0, az összes elemszám (size) is 0.",
        en: "A NumPy shape may contain an axis of length zero. The source uses np.zeros((2,0,3)) as a valid example. Because one axis length is zero, the total size is also zero."
      },
      why: {
        hu: "Ez azért lehet meglepő, mert az arraynek három tengelye van (ndim=3), miközben egyetlen konkrét adatértéket sem tartalmaz (size=0). A dimenziószám és az elemszám tehát külön fogalom.",
        en: "This can be surprising: the array has three axes (ndim=3) while containing no actual data elements (size=0). Dimensionality and element count are different concepts."
      },
      examTrap: {
        hu: "A (0,1,0) shape érvényes lehet. A shape == 12 viszont nem megfelelő, mert a shape tuple.",
        en: "A shape such as (0,1,0) can be valid. shape == 12 is not the appropriate form because shape is a tuple."
      }
    },
    {
      id: "numpy-creation-reshape",
      title: { hu: "Array létrehozás és reshape", en: "Array creation and reshape" },
      body: {
        hu: "A practice anyag több létrehozófüggvényt használ: np.array, np.arange, np.zeros, np.ones, np.full és ezek _like változatai. A reshape ugyanazokat az elemeket új tengelystruktúrában értelmezi. Az elemszámnak változatlannak kell maradnia.",
        en: "The practice material uses creation functions such as np.array, np.arange, np.zeros, np.ones, np.full, and _like variants. reshape interprets the same elements using a new axis structure while preserving the element count."
      },
      why: {
        hu: "Deep learningben gyakran ugyanazt az adatot más alakban kell a következő művelethez előkészíteni. A reshape nem matematikai tartalmat változtat, hanem azt, hogyan csoportosítjuk az elemeket tengelyekbe.",
        en: "In deep learning the same values often need to be presented in a different shape for the next operation. Reshape changes the axis organization, not the mathematical values."
      },
      formula: { hu: "np.arange(4).reshape(2,-1) → shape (2,2)", en: "np.arange(4).reshape(2,-1) → shape (2,2)" },
      formulaTerms: [
        { symbol: "-1", hu: "Egyetlen tengely helyén használható; NumPy az elemszámból automatikusan kiszámítja a szükséges hosszt.", en: "May be used for one axis; NumPy infers the required length from the element count." },
        { symbol: "reshape", hu: "Új shape-et kér ugyanazokhoz az elemekhez.", en: "Requests a new shape for the same elements." }
      ],
      workedExample: {
        hu: "np.arange(4) értékei [0,1,2,3]. Ha két sort kérünk reshape(2,-1) formában, akkor soronként 2 elem kell, ezért a -1 értéke 2 lesz, és az eredmény [[0,1],[2,3]].",
        en: "np.arange(4) contains [0,1,2,3]. Requesting two rows with reshape(2,-1) forces the inferred axis to length 2, producing [[0,1],[2,3]]."
      },
      examTrap: {
        hu: "A -1 nem valódi negatív tengelyhossz. Azt jelenti: ezt a méretet számítsd ki helyettem. Egynél több -1 nem használható ugyanabban a reshape-ben.",
        en: "-1 is not a literal negative axis length. It means infer this dimension. More than one inferred axis cannot be used in the same reshape."
      }
    },
    {
      id: "numpy-indexing-types",
      title: { hu: "Három indexelési kategória", en: "Three indexing categories" },
      body: {
        hu: "A multidimenziós practice anyag három fontos esetet különít el. Egyedi elem indexelésnél (individual element indexing) minden tengelyhez egész indexet adunk, így skalárt kapunk. Alap indexelésnél (basic indexing) egész indexeket és slice-okat kombinálunk, legalább egy slice mellett; az eredmény array és jellemzően view. Haladó indexelésnél (advanced indexing) legalább egy egész indexsorozat/lista/array vagy boolean mask szerepel; az eredmény új array.",
        en: "The multidimensional practice material distinguishes three cases. Individual element indexing uses an integer for every axis and returns a scalar. Basic indexing combines integer indices and slices with at least one slice, returning an array and typically a view. Advanced indexing uses at least one integer sequence/array or boolean mask and returns a new array."
      },
      why: {
        hu: "Ez a felosztás egyszerre mondja meg, milyen lesz az eredmény alakja és azt is, hogy megoszthat-e memóriát az eredeti arrayjel. Emiatt a Theory Testben a shape és a view/copy kérdések összekapcsolódnak.",
        en: "This classification helps determine both result shape and memory-sharing behavior, which is why shape and view/copy questions are closely connected in the Theory Test."
      },
      formula: {
        hu: "a[1,2] → egyedi elem    |    a[1,:] → basic indexing    |    a[[1,0],:] → advanced indexing",
        en: "a[1,2] → individual element    |    a[1,:] → basic indexing    |    a[[1,0],:] → advanced indexing"
      },
      formulaTerms: [
        { symbol: "integer index", hu: "Egy konkrét pozíciót választ az adott tengelyen, és basic indexingben eltünteti azt a tengelyt.", en: "Selects one position on an axis and collapses that axis under basic indexing." },
        { symbol: "slice", hu: "Tartományt választ, és megtartja a tengelyt.", en: "Selects a range and retains the axis." },
        { symbol: "integer sequence", hu: "Tetszőleges pozíciók listája; advanced indexinget indít.", en: "Sequence of arbitrary positions; triggers advanced indexing." },
        { symbol: "boolean mask", hu: "Igaz/hamis kiválasztási maszk; advanced indexinget indít.", en: "True/false selection mask; triggers advanced indexing." }
      ],
      examTrap: {
        hu: "Az a[0,:] és a[[0],:] nem ugyanaz. Az első basic indexing: a 0. tengely összeomlik. A második advanced indexing: a kiválasztott sor egy (1,...) hosszúságú tengelyként megmarad.",
        en: "a[0,:] and a[[0],:] are not the same. The first is basic indexing and collapses axis 0; the second is advanced indexing and retains a length-1 result axis."
      }
    },
    {
      id: "numpy-basic-indexing",
      title: { hu: "Basic indexing: mely tengely marad meg?", en: "Basic indexing: which axes remain?" },
      body: {
        hu: "Basic indexingnél egy egyszerű shape-szabály használható: az egész számmal indexelt tengely eltűnik, a slice-szal indexelt tengely megmarad. Ez akkor is igaz, ha a slice csak egyetlen elemet választ.",
        en: "With basic indexing, a simple shape rule applies: an integer-indexed axis disappears, while a sliced axis remains. This is true even if a slice selects only one element."
      },
      workedExample: {
        hu: "Ha a.shape == (32,5), akkor a[:,1] shape-je (32,), mert a második tengely egész indexet kap. a[1,:] shape-je (5,). a[1:,:] shape-je (31,5). a[0,:-1] shape-je (4,).",
        en: "If a.shape == (32,5), then a[:,1] has shape (32,), a[1,:] has shape (5,), a[1:,:] has shape (31,5), and a[0,:-1] has shape (4,)."
      },
      why: {
        hu: "A tengelyek tudatos követése sokkal megbízhatóbb, mint a shape ránézésre történő megtippelése.",
        en: "Explicitly tracking axes is more reliable than guessing result shapes by inspection."
      },
      examTrap: {
        hu: "Az a[1:2,-1] eredménye (1,) alakú array: az első tengely slice miatt megmarad, még ha csak egy elemet választ is.",
        en: "a[1:2,-1] returns an array of shape (1,): the first axis remains because it was sliced, even though only one element was selected."
      }
    },
    {
      id: "numpy-advanced-indexing",
      title: { hu: "Advanced indexing és boolean mask", en: "Advanced indexing and boolean masks" },
      body: {
        hu: "Advanced indexing esetén egész indexsorozattal vagy boolean maskkal tetszőleges elemeket választhatunk. A week 6 anyag explicit szabálya: advanced indexing soha nem ad view-t; új array készül a kiválasztott elemek másolatával.",
        en: "Advanced indexing selects arbitrary elements using integer sequences or boolean masks. Week 6 states explicitly that advanced indexing never produces a view; it creates a new array containing copies of the selected values."
      },
      why: {
        hu: "Tetszőleges, nem összefüggő memóriahelyek kiválasztását nem lehet egyszerűen ugyanannak a memóriának egy új nézeteként kezelni, ezért NumPy új result arrayt állít elő.",
        en: "Arbitrary non-contiguous selections cannot generally be represented as a simple view of the same memory, so NumPy creates a new result array."
      },
      formula: {
        hu: "a[[1,2]] → integer-array indexing → copy    |    a[a<0] → boolean-mask indexing → copy",
        en: "a[[1,2]] → integer-array indexing → copy    |    a[a<0] → boolean-mask indexing → copy"
      },
      formulaTerms: [
        { symbol: "a < 0", hu: "Elemről elemre végzett összehasonlítás, amely a shape-jével azonos boolean arrayt ad.", en: "Element-wise comparison producing a boolean array with the same shape as a." },
        { symbol: "a[a < 0]", hu: "A mask True helyein található értékeket választja ki; tipikusan 1D resultot ad.", en: "Selects values where the mask is True; typically returns a 1D result." }
      ],
      workedExample: {
        hu: "Ha a=np.arange(4).reshape(2,2), akkor a>0 egy (2,2) boolean array. Az a[a>0] viszont három értéket választ: [1,2,3], ezért shape-je (3,).",
        en: "If a=np.arange(4).reshape(2,2), a>0 is a (2,2) boolean array, while a[a>0] selects [1,2,3] and therefore has shape (3,)."
      },
      examTrap: {
        hu: "A mask létrehozása és a maskkal történő indexelés külön művelet. (a<0).shape megegyezik a.shape értékével, de a[a<0] shape-je a kiválasztott elemek számától függ.",
        en: "Creating a mask and indexing with it are different operations. (a<0).shape matches a.shape, while a[a<0] depends on how many elements were selected."
      }
    },
    {
      id: "numpy-broadcasting",
      title: { hu: "Broadcasting: hogyan illeszt össze különböző shape-eket a NumPy?", en: "Broadcasting: how NumPy matches different shapes" },
      body: {
        hu: "A broadcasting lehetővé teszi, hogy kompatibilis, de nem azonos shape-jű arrayeken element-wise műveletet végezzünk anélkül, hogy fizikailag lemásolnánk az adatot. A forrás algoritmusa szerint először a rövidebb shape elé 1-es hosszúságú tengelyeket képzelünk, amíg az ndim egyezik. Ezután tengelyenként a méretek akkor kompatibilisek, ha egyenlők vagy legalább az egyik 1.",
        en: "Broadcasting allows element-wise operations on compatible arrays with different shapes without physically copying data. The source's algorithm first prepends length-1 axes to the shorter shape until dimensionality matches, then requires each pair of dimensions to be equal or one of them to be 1."
      },
      why: {
        hu: "A length-1 tengely virtuálisan megismételhető a másik array megfelelő tengelyének hosszára. Ez teszi lehetővé például, hogy ugyanazt a bias-vektort egy egész batch minden példájára alkalmazzuk.",
        en: "A length-1 axis can be virtually repeated to match the other array. This makes operations such as applying the same bias vector to every example in a batch possible."
      },
      formula: { hu: "kompatibilis tengelypár: a=b vagy a=1 vagy b=1", en: "compatible dimension pair: a=b or a=1 or b=1" },
      formulaTerms: [
        { symbol: "(2,3)+(3,)", hu: "A (3,) logikailag (1,3) lesz, majd az 1-es tengely 2-re broadcastolódik → (2,3).", en: "(3,) is treated as (1,3), then the length-1 axis broadcasts to 2 → (2,3)." },
        { symbol: "(2,3)+(2,)", hu: "A (2,) logikailag (1,2); az utolsó tengelyen 3 és 2 nem egyenlő, egyik sem 1 → hiba.", en: "(2,) becomes (1,2); final dimensions 3 and 2 are unequal and neither is 1 → error." }
      ],
      workedExample: {
        hu: "A hivatalos mintában (32,5)+(32,) hibás, mert (32,) → (1,32), és az utolsó tengelyen 5 vs 32 inkompatibilis. (32,5)+(32,1) viszont működik: a második array 1-es tengelye 5-re ismételhető.",
        en: "In the official example (32,5)+(32,) fails because (32,) becomes (1,32) and 5 vs 32 is incompatible. (32,5)+(32,1) works because the length-1 axis can expand to 5."
      },
      examTrap: {
        hu: "A broadcasting a trailing dimensions, vagyis a shape jobb oldala felől illeszkedik. Az, hogy két array első dimenziója azonos, önmagában nem elég.",
        en: "Broadcasting aligns trailing dimensions, i.e. from the right side of the shape. Matching first dimensions alone is not sufficient."
      }
    },
    {
      id: "numpy-newaxis",
      title: { hu: "None / np.newaxis: új tengely beszúrása", en: "None / np.newaxis: inserting a new axis" },
      body: {
        hu: "Indexelésben a None az np.newaxis aliasa. Egy új, 1 hosszúságú tengelyt szúr be a megadott pozícióba. Ez különösen hasznos broadcasting előtt, amikor egy 1D vektort sor- vagy oszlopszerű alakra kell hozni.",
        en: "In indexing, None is an alias for np.newaxis. It inserts a new axis of length 1 at the specified position, particularly useful for preparing vectors for broadcasting."
      },
      formula: { hu: "v.shape=(32,) → v[:,None].shape=(32,1)    |    v[None,:].shape=(1,32)", en: "v.shape=(32,) → v[:,None].shape=(32,1)    |    v[None,:].shape=(1,32)" },
      why: {
        hu: "Az új tengely nem ad hozzá új adatértékeket. Csak megváltoztatja az alakot úgy, hogy a broadcasting szabályai megfelelően tudjanak működni.",
        en: "The new axis does not add new data values. It only changes shape so broadcasting rules can work as intended."
      },
      realWorld: {
        hu: "Szemléltető példa: ha 32 példához van egy-egy skalár offsetünk (32,), és egy (32,5) mátrix minden sorához szeretnénk hozzáadni, offset[:,None] (32,1) alakot ad, amely az 5 oszlopra broadcastolható.",
        en: "Illustrative example: if 32 examples each have one scalar offset stored as (32,), offset[:,None] gives shape (32,1), which can broadcast across 5 columns of a (32,5) matrix."
      }
    },
    {
      id: "numpy-reductions",
      title: { hu: "Redukciók: mit jelent az axis paraméter?", en: "Reductions: what does the axis parameter mean?" },
      body: {
        hu: "A redukciós műveletek (reduction / collapse operations), például sum, mean, any, all vagy argmax, több elemből kevesebb eredményt készítenek. Ha megadunk egy axis értéket, azon a tengelyen aggregálunk, ezért az a tengely eltűnik az eredmény shape-jéből. Axis nélkül minden tengely összeomolhat egyetlen skalárrá.",
        en: "Reduction / collapse operations such as sum, mean, any, all, and argmax combine many elements into fewer outputs. Specifying an axis collapses that axis; without an axis, all axes may collapse into one scalar."
      },
      why: {
        hu: "Az axis jelentését legegyszerűbben úgy lehet olvasni: ezen a tengelyen haladva összesítek, ezért ezt a tengelyt eltüntetem.",
        en: "A useful way to read axis is: aggregate along this axis, so this axis disappears."
      },
      formula: { hu: "a.shape=(32,5) → mean(axis=0) shape (5,); mean(axis=1) shape (32,); sum() → skalár", en: "a.shape=(32,5) → mean(axis=0) shape (5,); mean(axis=1) shape (32,); sum() → scalar" },
      formulaTerms: [
        { symbol: "axis=0", hu: "A 0. tengelyt aggregáljuk; az első dimension eltűnik.", en: "Aggregate along axis 0; the first dimension disappears." },
        { symbol: "axis=1", hu: "Az 1. tengelyt aggregáljuk; a második dimension eltűnik.", en: "Aggregate along axis 1; the second dimension disappears." }
      ],
      workedExample: {
        hu: "Egy (32,5) arrayt tekinthetsz 32 példának és 5 jellemzőnek. mean(axis=0) minden jellemző átlagát adja a 32 példán keresztül → 5 szám. mean(axis=1) minden példa 5 jellemzőjének átlagát adja → 32 szám.",
        en: "Think of (32,5) as 32 examples and 5 features. mean(axis=0) gives one mean per feature → 5 values. mean(axis=1) gives one mean per example → 32 values."
      },
      examTrap: {
        hu: "np.sum(a,axis=0) arrayt adhat, mert marad tengely. np.sum(a) minden tengelyt redukál, ezért NumPy-skalár eredményt ad.",
        en: "np.sum(a,axis=0) can return an array because an axis remains. np.sum(a) reduces all axes and returns a NumPy scalar."
      }
    },
    {
      id: "numpy-transpose",
      title: { hu: "Transzponálás és tengelycsere", en: "Transpose and axis swapping" },
      body: {
        hu: "Kétdimenziós arraynél a transzponálás (transpose) felcseréli a két tengely sorrendjét: (32,5) → (5,32). A forrásban a.T, np.transpose(a) és np.swapaxes(a,0,1) 2D esetben ugyanilyen tengelycserét eredményezhet.",
        en: "For a 2D array, transpose swaps the two axes: (32,5) → (5,32). In the source, a.T, np.transpose(a), and np.swapaxes(a,0,1) can perform the same axis swap in 2D."
      },
      why: {
        hu: "A transzponálás nem az elemek értékét módosítja, hanem azt, melyik tengely milyen szerepet tölt be.",
        en: "Transpose does not change element values; it changes how axes are ordered."
      },
      formula: { hu: "a.shape=(32,5) → a.T.shape=(5,32) → a.T.T.shape=(32,5)", en: "a.shape=(32,5) → a.T.shape=(5,32) → a.T.T.shape=(32,5)" },
      examTrap: {
        hu: "1D arraynél nincs két külön tengely, amit fel lehetne cserélni, ezért (n,) array .T után is (n,) marad. A .T önmagában nem csinál belőle (n,1) oszlopvektort.",
        en: "A 1D array has no two axes to swap, so (n,) remains (n,) after .T. .T alone does not turn it into an (n,1) column vector."
      }
    },
    {
      id: "numpy-views-copies",
      title: { hu: "View és copy: ugyanazt a memóriát nézzük, vagy új adatot kaptunk?", en: "Views and copies: shared memory or independent data?" },
      body: {
        hu: "A view olyan array, amely ugyanazt az underlying memóriát osztja meg egy másik arrayjel. Emiatt a view-n keresztül végzett módosítás az eredeti arrayben is megjelenhet. A copy ezzel szemben önálló adatot tartalmaz. A week 6 anyag view-ként tárgyalja többek között az egyszerű reshape, transpose és basic indexing eseteket; advanced indexing viszont új arrayt ad.",
        en: "A view shares underlying memory with another array, so modifying the view may change the original. A copy owns independent data. Week 6 discusses simple reshape, transpose, and basic-indexing cases as views, while advanced indexing creates a new array."
      },
      why: {
        hu: "Ez nemcsak teljesítménykérdés. Ugyanaz a kód teljesen más eredményt adhat attól függően, hogy a módosított array view vagy copy.",
        en: "This is not only about performance. Mutating an array can produce completely different behavior depending on whether it is a view or a copy."
      },
      formula: { hu: "y=x[1:2] → view → y[:]=99 módosíthatja x-et    |    y=x[[1,2]] → copy → x nem változik", en: "y=x[1:2] → view → y[:]=99 may modify x    |    y=x[[1,2]] → copy → x unchanged" },
      workedExample: {
        hu: "A hivatalos példákban x=np.arange(4). Ha y=x[1:2], majd y[:]=99, akkor x [0,99,2,3] lesz. Ha viszont y=x[[1,2]], majd y-t módosítjuk, x változatlan marad, mert az integer-array indexing advanced indexing.",
        en: "In the official examples, x=np.arange(4). With y=x[1:2], setting y[:]=99 changes x to [0,99,2,3]. With y=x[[1,2]], modifying y leaves x unchanged because integer-array indexing is advanced indexing."
      },
      connections: {
        hu: "A view/copy fogalom a PyTorchban is fontos lesz, mert ott is számít, hogy tensorok milyen memóriát osztanak meg és milyen művelet készít új adatot.",
        en: "The view/copy idea remains important in PyTorch because tensor memory sharing and allocation behavior also matter there."
      },
      examTrap: {
        hu: "A forrás megjegyzi, hogy view-képes műveletek kombinációja bizonyos helyzetekben mégis másolást igényelhet. A Theory Test hivatalos példái egyszerű, egyértelmű eseteket használnak. A strides belső mechanizmusát nem kell ehhez megtanulni.",
        en: "The source notes that combinations of view-capable operations can sometimes require a copy. The official Theory Test examples use straightforward cases, and the internal stride mechanism is excluded."
      },
      keyTerms: [
        { term: "view", hu: "memóriát megosztó nézet" },
        { term: "copy", hu: "másolat" },
        { term: "shared memory", hu: "megosztott memória" }
      ]
    },
    {
      id: "numpy-common-functions",
      title: { hu: "Gyakori függvények, amelyekre konkrét eredményt kérdezhetnek", en: "Common functions with result-based exam questions" },
      body: {
        hu: "A hivatalos mintakérdések konkrét kódok eredményére is rákérdeznek. Fontos a np.count_nonzero, np.any, np.all, np.unique, np.bincount, np.sort, np.argsort és a boolean filtering működése. Ezeknél nem elég a függvény nevét felismerni; az outputot is le kell tudni vezetni.",
        en: "The official example questions ask for concrete outputs of code using np.count_nonzero, np.any, np.all, np.unique, np.bincount, np.sort, np.argsort, and boolean filtering. Recognizing the function name is not enough; the output must be derived."
      },
      formula: { hu: "a=[3,1,2] → unique(a)=[1,2,3], bincount(a)=[0,1,1,1], argsort(a)=[1,2,0]", en: "a=[3,1,2] → unique(a)=[1,2,3], bincount(a)=[0,1,1,1], argsort(a)=[1,2,0]" },
      formulaTerms: [
        { symbol: "np.unique", hu: "A különböző értékeket adja vissza rendezett sorrendben.", en: "Returns distinct values in sorted order." },
        { symbol: "np.bincount", hu: "Nemnegatív egész értékek előfordulásszámát adja; a result indexe maga az érték.", en: "Counts occurrences of non-negative integers, using each value as the result index." },
        { symbol: "np.sort", hu: "Az értékeket rendezi.", en: "Sorts the values." },
        { symbol: "np.argsort", hu: "Azokat az indexeket adja, amelyek rendezett sorrendbe állítanák az arrayt.", en: "Returns indices that would sort the array." },
        { symbol: "np.any", hu: "Igaz, ha legalább egy vizsgált érték True.", en: "True if at least one considered value is True." },
        { symbol: "np.all", hu: "Igaz, ha minden vizsgált érték True.", en: "True if all considered values are True." }
      ],
      examTrap: {
        hu: "Az argsort nem a rendezett értékeket adja vissza, hanem indexeket. A bincount([3,1,2]) resultjának 0. eleme 0, mert a 0 érték egyszer sem fordul elő.",
        en: "argsort returns indices, not sorted values. In bincount([3,1,2]), element 0 is zero because value 0 does not occur."
      }
    },
    {
      id: "numpy-scope",
      title: { hu: "Pontosan mi tartozik a Theory Test 1 NumPy-részébe?", en: "Exactly what is in scope for NumPy on Theory Test 1?" },
      body: {
        hu: "A hivatalos example document szerint a NumPy-kérdések a 3–6. hét Video to watch before practice anyagaira épülnek. Az ndarray.strides és a stride tricks explicit ki vannak zárva a Theory Test 1-ből.",
        en: "According to the official example document, NumPy questions are based on the weeks 3–6 Video to watch before practice materials. ndarray.strides and stride tricks are explicitly excluded from Theory Test 1."
      },
      why: {
        hu: "A view/copy viselkedés ettől még tesztanyag. Azt kell tudni, mely magas szintű műveletek adnak view-t vagy új arrayt; nem kell a stride-mechanizmus belső részleteit levezetni.",
        en: "View/copy behavior is still testable. You need to know which high-level operations return views or new arrays, but not derive the internal stride mechanism."
      },
      examTrap: {
        hu: "Ne hagyd ki a view/copy témát csak azért, mert a strides nincs benne. A hivatalos mintakérdések több konkrét view/copy módosítási példát tartalmaznak.",
        en: "Do not skip views/copies just because strides are excluded. The official example questions contain several concrete view/copy mutation cases."
      }
    }
  ]
};
