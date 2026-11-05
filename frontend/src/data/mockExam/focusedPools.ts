import { createMockQuestion } from "./types";

/** Focused source-document question families. These pools are used to
 * supplement direct question statements; they are not additional exam
 * prompts in themselves.
 */
export const focusedSourcePools = [
  createMockQuestion({
    id: "pool-np-attributes", chapter: "numpy",
    prompt: { hu: "Mely ndarray attribútumok és értékeik helyesek?", en: "Which ndarray attributes and values are correct?" },
    trueFacts: [
      ["Az ndarray.shape értéke lehet (5,6).", "ndarray.shape can equal (5,6)."],
      ["Az ndarray.shape értéke lehet (1,).", "ndarray.shape can equal (1,)."],
      ["A (0,1,0) érvényes, nulla elemű shape lehet.", "(0,1,0) can be a valid shape containing zero elements."],
      ["Az ndarray.size egy egész szám lehet, például 12.", "ndarray.size can be an integer such as 12."],
      ["Az ndarray.ndim az egymástól független tengelyek számát adja meg egész számmal.", "ndarray.ndim gives the count of axes as an integer."],
      ["Az ndarray.dtype lehet például np.float64.", "ndarray.dtype can be np.float64."]
    ],
    falseFacts: [
      ["Az ndarray.shape értéke lehet a 12 egész szám, nem szükséges tuple.", "ndarray.shape can equal integer 12 rather than a tuple."],
      ["Az ndarray.size értéke (5,6) tuple, mert két tengely van.", "ndarray.size is a tuple (5,6) because there are two axes."],
      ["Az ndarray.ndim=(5,6), ha az ndarray.shape=(5,6).", "ndarray.ndim equals (5,6) if shape is (5,6)."],
      ["Az ndarray.dtype=(5,6) típusjelölés, mert a dtype a dimenzióméreteket kódolja.", "ndarray.dtype=(5,6) is a type descriptor because dtype encodes dimension sizes."],
      ["A shape=(5,6) esetén a size értéke 56.", "For shape (5,6), size is 56."],
      ["A shape=(0,1,0) esetén a size értéke 1.", "For shape (0,1,0), size equals 1."]
    ],
    explanation: { hu: "A shape tuple, a size az elemek száma, az ndim a tengelyek száma, a dtype pedig az adattípus.", en: "shape is a tuple; size counts elements; ndim counts axes; dtype represents the data type." }
  }),
  createMockQuestion({
    id: "pool-np-index", chapter: "numpy",
    prompt: { hu: "Mely shape-állítások helyesek egy (32,5) alakú tömb indexelésénél?", en: "Which shape statements about indexing a (32,5) array are correct?" },
    trueFacts: [
      ["a[:,:].shape=(32,5).", "a[:,:].shape=(32,5)."],
      ["a[:,1].shape=(32,).", "a[:,1].shape=(32,)."],
      ["a[1,:].shape=(5,).", "a[1,:].shape=(5,)."],
      ["a[1:,:].shape=(31,5).", "a[1:,:].shape=(31,5)."],
      ["a[0,:-1].shape=(4,).", "a[0,:-1].shape=(4,)."],
      ["a[[0],:].shape=(1,5); az egész indexek listája tengelyt tart meg.", "a[[0],:].shape=(1,5); a list of integer indices retains the axis."]
    ],
    falseFacts: [
      ["a[:,1].shape=(32,1).", "a[:,1].shape=(32,1)."],
      ["a[1,:].shape=(1,5).", "a[1,:].shape=(1,5)."],
      ["a[0,:-1].shape=(1,4).", "a[0,:-1].shape=(1,4)."],
      ["a[[0],:].shape=(5,).", "a[[0],:].shape=(5,)."],
      ["a[[-1,-1],-1].shape=(2,1).", "a[[-1,-1],-1].shape=(2,1)."],
      ["a[1:,:].shape=(32,5), mert a kezdőindexet a slice nem veszi figyelembe.", "a[1:,:].shape=(32,5) because a slice ignores its start index."]
    ],
    explanation: { hu: "Egész számú index eltünteti az adott tengelyt; a slice megőrzi, az egész indexek listája advanced indexing.", en: "An integer index removes one axis; a slice retains it; lists of indices use advanced indexing." }
  }),
  createMockQuestion({
    id: "pool-np-broadcast", chapter: "numpy",
    prompt: { hu: "Mely NumPy broadcasting-állítások helyesek?", en: "Which NumPy broadcasting claims are correct?" },
    trueFacts: [
      ["A (32,5)+(32,) összeadás alakillesztési hibát okoz.", "Adding (32,5)+(32,) raises a broadcasting error."],
      ["A (32,5)+(32,1) eredményének alakja (32,5).", "Adding (32,5)+(32,1) results in shape (32,5)."],
      ["A (32,5)+(1,32) összeadás alakillesztési hibát okoz.", "Adding (32,5)+(1,32) raises a broadcasting error."],
      ["A (32,5) alakú numerikus tömbhöz a +1 skalár összeadható.", "A numeric array shaped (32,5) supports addition of scalar 1."],
      ["A (32,5)+(32,1,5) eredménye (32,32,5) alakú.", "Broadcasting (32,5)+(32,1,5) yields shape (32,32,5)."],
      ["A (32,5)+(32,5) eredménye (32,5) alakú.", "Adding (32,5)+(32,5) results in shape (32,5)."]
    ],
    falseFacts: [
      ["A (32,5)+(32,) eredménye (32,5) alakú.", "Adding (32,5)+(32,) produces shape (32,5)."],
      ["A (32,5)+(32,1) alakillesztési hibát okoz, mert a tengelyhosszok különböznek.", "Adding (32,5)+(32,1) fails because axis lengths differ."],
      ["A (32,5)+(1,32) eredménye (32,32) alakú.", "Adding (32,5)+(1,32) produces shape (32,32)."],
      ["A (32,5)+1 alakillesztési hibát okoz, mert az 1 skalárnak nincs két tengelye.", "Adding scalar 1 to a (32,5) array fails due to the scalar's missing axes."],
      ["A (32,5)+(32,1,5) eredményének alakja (32,1,5).", "Adding (32,5)+(32,1,5) yields shape (32,1,5)."],
      ["A (32,5)+(32,5) eredménye (32,1) alakú.", "Adding (32,5)+(32,5) produces shape (32,1)."]
    ],
    explanation: { hu: "Az alakokat jobbról balra összevetjük: azonos tengelyhossz vagy 1 szükséges. Az implicit 1-es dimenziók elöl jelennek meg.", en: "Align trailing dimensions: lengths must match or one must be 1. Missing leading axes are treated as 1." }
  }),
  createMockQuestion({
    id: "pool-np-reductions", chapter: "numpy",
    prompt: { hu: "Mely transzponálás-, redukció- és type-állítások helyesek (32,5) tömbnél?", en: "Which transpose, reduction and type claims for shape (32,5) are correct?" },
    trueFacts: [
      ["a.T.shape=(5,32).", "a.T.shape=(5,32)."],
      ["a.T.T.shape=(32,5).", "a.T.T.shape=(32,5)."],
      ["np.mean(a,axis=0).shape=(5,).", "np.mean(a,axis=0).shape=(5,)."],
      ["np.mean(a,axis=1).shape=(32,).", "np.mean(a,axis=1).shape=(32,)."],
      ["np.sum(a,axis=0) ndarray lehet, 5 elemmel.", "np.sum(a,axis=0) can be an ndarray with five elements."],
      ["np.sum(a) egyetlen NumPy skalárt ad vissza normál numerikus tömbre.", "np.sum(a) returns a NumPy scalar for an ordinary numeric array."]
    ],
    falseFacts: [
      ["a.T.shape=(32,5), mert a transzponálás csak a memóriaelrendezést változtatja.", "a.T.shape=(32,5) because transpose changes memory layout only."],
      ["a.T.T.shape=(5,32), mert egy újabb transzponálás új alakot ad.", "a.T.T.shape=(5,32) because a second transpose gives a new shape."],
      ["np.mean(a,axis=0).shape=(32,).", "np.mean(a,axis=0).shape=(32,)."],
      ["np.mean(a,axis=1).shape=(5,).", "np.mean(a,axis=1).shape=(5,)."],
      ["np.sum(a,axis=0) csak skalár lehet, mert a sum mindig az összes tengelyt redukálja.", "np.sum(a,axis=0) is necessarily scalar because sum always reduces every axis."],
      ["np.sum(a) egy (32,5) alakú ndarray, mert a sum megtartja a bemeneti alakot.", "np.sum(a) is an ndarray shaped (32,5) because sum retains input shape."]
    ],
    explanation: { hu: "A transzponálás felcseréli a tengelyeket, a kijelölt axis szerinti redukció pedig eltünteti azt a tengelyt.", en: "Transpose swaps axes; reducing along an axis removes that axis unless keepdims is requested." }
  }),
  createMockQuestion({
    id: "pool-np-transform", chapter: "numpy",
    prompt: { hu: "Mely eredményalakok helyesek az np.arange(4).reshape(2,-1) példában?", en: "Which results are correct for np.arange(4).reshape(2,-1)?" },
    trueFacts: [
      ["a.shape=(2,2).", "a.shape=(2,2)."],
      ["Az a*2+1 alakja (2,2).", "a*2+1 has shape (2,2)."],
      ["Az a[a>0] alakja (3,).", "a[a>0] has shape (3,)."],
      ["Az a[(a>0)&(a%2==0)] alakja (1,).", "a[(a>0)&(a%2==0)] has shape (1,)."],
      ["Az a*a.reshape(2,2,-1) alakja (2,2,2).", "a*a.reshape(2,2,-1) has shape (2,2,2)."],
      ["A kiinduló a értéke [[0,1],[2,3]].", "The initial a equals [[0,1],[2,3]]."]
    ],
    falseFacts: [
      ["a.shape=(2,1), mert a −1 jelöli a kihagyott tengelyt.", "a.shape=(2,1) because −1 means the missing axis."],
      ["Az a*2+1 alakja (4,), mert az aritmetika egydimenzióssá alakítja a tömböt.", "a*2+1 has shape (4,) because arithmetic flattens arrays."],
      ["Az a[a>0] alakja (2,2), mert a maszkolás megőrzi a sorokat.", "a[a>0] has shape (2,2) because masking preserves rows."],
      ["Az a[(a>0)&(a%2==0)] alakja (2,), mert a nulla is pozitív páros szám.", "a[(a>0)&(a%2==0)] has shape (2,) because zero is a positive even integer."],
      ["Az a*a.reshape(2,2,-1) alakja (2,2,1), mert a bal oldali tömb csak egy síkban szerepel.", "a*a.reshape(2,2,-1) has shape (2,2,1) because the left array spans one plane."],
      ["Az np.arange(4).reshape(2,-1) értéke [[1,2],[3,4]], mert az arange 1-től indul.", "np.arange(4).reshape(2,-1) equals [[1,2],[3,4]] because arange starts at one."]
    ],
    explanation: { hu: "A reshape elemek számát megtartja; maszkolásnál a True elemek lesznek a kimenetben, a broadcastingnál a jobb oldali tengelyek illeszkednek.", en: "Reshape preserves element count; masking returns True-selected elements; broadcasting aligns trailing axes." }
  }),
  createMockQuestion({
    id: "pool-np-views", chapter: "numpy",
    prompt: { hu: "Mely műveletek változtatják meg a forrást a másodlagos tömb írásakor?", en: "Which operations can modify the source when writing through a derived array?" },
    trueFacts: [
      ["a=np.arange(4) mellett a.reshape(2,2) nézetébe írva a forrás is megváltozik.", "With a=np.arange(4), writing through a.reshape(2,2) modifies the source."],
      ["Egydimenziós a esetén a.T nem hoz létre független másolatot.", "For a one-dimensional a, a.T does not create an independent copy."],
      ["A np.append(a,42) eredményébe írva az eredeti a nem módosul.", "Writing to np.append(a,42)'s result does not modify original a."],
      ["Az a[1:2] egyszerű szelet nézetet adhat, amelyen keresztül a forrás változik.", "Basic slice a[1:2] can be a view that modifies the source."],
      ["Az a[[1,2]] haladó indexelés eredménye másolat, módosítása nem írja át a forrást.", "Advanced indexing a[[1,2]] returns a copy; modifications do not change the source."],
      ["Az a[a<2] logikai maszkos kiválasztás eredménye másolat, nem írja át az eredeti a-t.", "Boolean-masked selection a[a<2] returns a copy, not a write-through view."]
    ],
    falseFacts: [
      ["Az a.reshape(2,2) mindig másolat, ezért rajta keresztül az eredeti tömb nem változhat.", "a.reshape(2,2) is always a copy, so it cannot modify its source."],
      ["Egydimenziós a esetén a.T mindig független másolatot hoz létre.", "For one-dimensional a, a.T always creates an independent copy."],
      ["A np.append(a,42) helyben bővíti a-t, ezért az eredménybe írás a forrást is módosítja.", "np.append(a,42) extends a in place, so writing to its result modifies a."],
      ["Az a[1:2] egyszerű szeletelés mindig másolat, még folytonos a esetén is.", "Basic slice a[1:2] always creates a copy even for contiguous a."],
      ["Az a[[1,2]] haladó indexelés nézetet ad, mert a két elem szomszédos.", "Advanced indexing a[[1,2]] returns a view because the indices are adjacent."],
      ["Az a[a<2] maszkos indexelés nézetet ad, ha a kiválasztott elemek egymás után állnak.", "Boolean indexing a[a<2] returns a view when selected elements are adjacent."]
    ],
    explanation: { hu: "Basic indexing és reshape gyakran megosztja az adatokat; advanced indexing, boolean indexing és az np.append eredménye önálló tömb.", en: "Basic slicing and reshape can share storage; advanced indexing, boolean indexing and np.append produce independent arrays." }
  }),
  createMockQuestion({
    id: "pool-np-boolean", chapter: "numpy",
    prompt: { hu: "Mely eredmények igazak az a=np.arange(4).reshape(2,-1) logikai műveleteire?", en: "Which outcomes are correct for boolean operations on a=np.arange(4).reshape(2,-1)?" },
    trueFacts: [
      ["np.count_nonzero(a==0) értéke 1.", "np.count_nonzero(a==0) equals 1."],
      ["np.any(a==0) értéke True.", "np.any(a==0) is True."],
      ["np.all(a==0,axis=1) eredménye [False,False].", "np.all(a==0,axis=1) returns [False,False]."],
      ["a[a>0] értéke [1,2,3].", "a[a>0] equals [1,2,3]."],
      ["a[(a>0)&(a%2==0)] értéke [2].", "a[(a>0)&(a%2==0)] equals [2]."],
      ["np.all(a==0) értéke False.", "np.all(a==0) is False."]
    ],
    falseFacts: [
      ["np.count_nonzero(a==0) értéke 0.", "np.count_nonzero(a==0) equals 0."],
      ["np.any(a==0) értéke False, mert csak egyetlen nulla szerepel.", "np.any(a==0) is False because the array contains only one zero."],
      ["np.all(a==0,axis=1) eredménye [True,False].", "np.all(a==0,axis=1) returns [True,False]."],
      ["a[a>0] értéke [[1],[2],[3]], mert minden kiválasztás megtartja a két tengelyt.", "a[a>0] equals [[1],[2],[3]] because selection preserves both axes."],
      ["a[(a>0)&(a%2==0)] értéke [0,2].", "a[(a>0)&(a%2==0)] equals [0,2]."],
      ["np.all(a==0) értéke True, mert a kezdőelem nulla.", "np.all(a==0) is True because the first element is zero."]
    ],
    explanation: { hu: "Az any legalább egy, az all minden elemre vonatkozik; a maszkolás csak a True pozíciókat választja ki.", en: "any checks whether at least one element matches, all requires every element, and boolean masks select True positions." }
  }),
  createMockQuestion({
    id: "pool-np-functions", chapter: "numpy",
    prompt: { hu: "Mely NumPy-függvényeredmények helyesek a=[3,1,2] esetén?", en: "Which NumPy function results are correct for a=[3,1,2]?" },
    trueFacts: [
      ["np.unique(a) eredménye [1,2,3].", "np.unique(a) returns [1,2,3]."],
      ["np.unique(a==0) eredménye [False].", "np.unique(a==0) returns [False]."],
      ["np.bincount(a) eredménye [0,1,1,1].", "np.bincount(a) returns [0,1,1,1]."],
      ["np.sort(a)[::-1] eredménye [3,2,1].", "np.sort(a)[::-1] returns [3,2,1]."],
      ["np.argsort(a) eredménye [1,2,0].", "np.argsort(a) returns [1,2,0]."],
      ["a[a!=0] eredménye [3,1,2].", "a[a!=0] returns [3,1,2]."]
    ],
    falseFacts: [
      ["np.unique(a) eredménye [3,1,2], mert megőrzi a bemeneti sorrendet.", "np.unique(a) returns [3,1,2] because it preserves input order."],
      ["np.unique(a==0) eredménye [False,True], mert a három elem különböző.", "np.unique(a==0) returns [False,True] because input values are distinct."],
      ["np.bincount(a) eredménye [1,1,1], mert három elemünk van.", "np.bincount(a) returns [1,1,1] because there are three input elements."],
      ["np.sort(a)[::-1] eredménye [1,2,3].", "np.sort(a)[::-1] returns [1,2,3]."],
      ["np.argsort(a) eredménye [1,2,3], mert a rendezett értékeket adja.", "np.argsort(a) returns [1,2,3] because it returns sorted values."],
      ["a[a!=0] eredménye [1,2,3], mert a logikai indexelés rendezi a kiválasztott értékeket.", "a[a!=0] returns [1,2,3] because boolean indexing sorts selected values."]
    ],
    explanation: { hu: "A unique rendezett egyedi elemeket, a bincount előfordulásokat, az argsort pedig rendezési indexeket ad.", en: "unique returns sorted unique values, bincount counts integer occurrences, and argsort returns sorting indices." }
  })
];
