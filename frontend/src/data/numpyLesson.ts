import type { Lesson } from "../types";

export const numpyLesson: Lesson = {
  id: "numpy-theory",
  title: {
    hu: "NumPy a Theory Testhez",
    en: "NumPy for the Theory Test"
  },
  subtitle: {
    hu: "ndarray attributes, indexing, broadcasting, reductions, reshape, views/copies és gyakori NumPy műveletek",
    en: "ndarray attributes, indexing, broadcasting, reductions, reshape, views/copies, and common NumPy operations"
  },
  source: "Practice video materials • Weeks 3–6",
  sections: [
    {
      id: "numpy-array-programming",
      title: { hu: "Array programming és vectorization", en: "Array programming and vectorization" },
      body: {
        hu: "A practice material a NumPy-t array-programming eszközként vezeti be. A cél, hogy sok scalar Python operation helyett kevés, nagy array-eken végzett vectorized NumPy operationt használjunk. A NumPy ndarray elemei általában fix dtype-pal, natív értékként tárolódnak.",
        en: "The practice material introduces NumPy as an array-programming tool. The goal is to replace many scalar Python operations with a small number of vectorized NumPy operations over large arrays. NumPy ndarray elements normally use a fixed dtype and native-value storage."
      },
      intuition: {
        hu: "Ahelyett, hogy Python loopban egyenként növelnél egymillió számot, egyetlen array operation dolgozza fel az egész tömböt.",
        en: "Instead of incrementing a million values one by one in a Python loop, one array operation processes the whole array."
      },
      examTrap: {
        hu: "A Python list tartalmazhat mixed types elemeket; egy ndarray elemeinek dtype-ja egységes. dtype=object kivételként Python-object reference-eket tárolhat.",
        en: "A Python list can contain mixed element types; ndarray elements have a common dtype. dtype=object is an exception that can store Python-object references."
      },
      keyTerms: [
        { term: "array programming" },
        { term: "vectorized operation" },
        { term: "numpy.ndarray" },
        { term: "dtype" }
      ]
    },
    {
      id: "numpy-attributes",
      title: { hu: "ndarray: shape, ndim, size, dtype", en: "ndarray: shape, ndim, size, dtype" },
      body: {
        hu: "A vizsgán különösen fontos attributes: size = elemek száma; ndim = tengelyek/dimenziók száma; shape = axis lengths tuple formában; dtype = az elemek NumPy datatype-ja; itemsize = egy elem byte-mérete. A type(array) és array.dtype nem ugyanaz.",
        en: "Especially important attributes are: size = number of elements; ndim = number of axes/dimensions; shape = axis lengths as a tuple; dtype = NumPy datatype of elements; itemsize = bytes per element. type(array) and array.dtype are not the same thing."
      },
      intuition: {
        hu: "shape=(32,5) azt jelenti: 2 axis, az első hossza 32, a másodiké 5. Így ndim=2 és size=32·5=160.",
        en: "shape=(32,5) means there are 2 axes, with lengths 32 and 5. Therefore ndim=2 and size=32·5=160."
      },
      examTrap: {
        hu: "shape mindig tuple, például (5,), nem egyszerűen 5. size és ndim scalar integer értékek, nem tuple-ök.",
        en: "shape is a tuple, for example (5,), not simply 5. size and ndim are scalar integer values, not tuples."
      },
      formula: {
        hu: "size = shape axis-lengthjeinek szorzata;   ndim = len(shape)",
        en: "size = product of axis lengths in shape;   ndim = len(shape)"
      },
      keyTerms: [
        { term: "shape" },
        { term: "ndim" },
        { term: "size" },
        { term: "dtype" },
        { term: "itemsize" }
      ]
    },
    {
      id: "numpy-shapes",
      title: { hu: "Valid shape-ek és zero-length axes", en: "Valid shapes and zero-length axes" },
      body: {
        hu: "NumPy array shape-je tuple lehet bármennyi axis-szal, és axis length lehet 0 is. A practice példában np.zeros((2,0,3)) teljesen valid shape (2,0,3) értékkel. Ilyenkor size=0.",
        en: "A NumPy array shape can be a tuple with any number of axes, and an axis length can be 0. The practice example np.zeros((2,0,3)) is valid with shape (2,0,3). Its size is 0."
      },
      examTrap: {
        hu: "shape = 12 nem valid ndarray.shape érték; (12,) igen. A (0,1,0) shape is valid.",
        en: "shape = 12 is not a valid ndarray.shape value; (12,) is. Shape (0,1,0) is valid."
      },
      keyTerms: [
        { term: "axis" },
        { term: "zero-length axis" }
      ]
    },
    {
      id: "numpy-creation-reshape",
      title: { hu: "Array creation és reshape", en: "Array creation and reshape" },
      body: {
        hu: "A forrás több creation methodot használ: np.array, np.arange, np.zeros, np.ones, np.full, valamint _like változatok. reshape ugyanazokat az elemeket új shape-ben értelmezi; egyetlen axis length -1 lehet, ekkor NumPy automatikusan kiszámolja azt.",
        en: "The source uses creation methods including np.array, np.arange, np.zeros, np.ones, np.full, and their _like variants. reshape interprets the same elements using a new shape; one axis length may be -1, in which case NumPy infers it automatically."
      },
      intuition: {
        hu: "np.arange(6).reshape(2,3) nem változtatja meg a hat értéket, csak 2×3 elrendezést ad nekik.",
        en: "np.arange(6).reshape(2,3) does not change the six values; it only arranges them as 2×3."
      },
      examTrap: {
        hu: "Az új shape element countjának egyeznie kell. -1 csak egy axis hosszának automatikus következtetésére szolgál.",
        en: "The new shape must preserve the number of elements. -1 is used to infer the length of one axis."
      },
      keyTerms: [
        { term: "np.arange" },
        { term: "reshape" },
        { term: "-1 inferred axis" }
      ]
    },
    {
      id: "numpy-indexing-types",
      title: { hu: "Három indexing kategória", en: "Three indexing categories" },
      body: {
        hu: "A multidimensional practice anyag három kategóriát különít el. Individual element indexing: minden axis integer indexet kap → scalar. Basic indexing: integer index + slice kombináció, legalább egy slice → array, jellemzően view. Advanced indexing: integer sequence vagy boolean mask legalább egyszer szerepel → új array, a kiválasztott elemek másolatával.",
        en: "The multidimensional practice material separates three categories. Individual element indexing: every axis gets an integer index → scalar. Basic indexing: a combination of integer indices and slices with at least one slice → array, typically a view. Advanced indexing: an integer sequence or boolean mask appears at least once → a new array containing copied selected elements."
      },
      intuition: {
        hu: "a[1,2] egy cella. a[1,:] egy row-slice. a[[1,0],:] arbitrary rows kiválasztása, ezért advanced indexing.",
        en: "a[1,2] is one cell. a[1,:] is a row slice. a[[1,0],:] selects arbitrary rows, so it is advanced indexing."
      },
      examTrap: {
        hu: "Az a[[0], :] megtartja az első axis-t length 1-gyel, míg a[0, :] collapse-olja azt.",
        en: "a[[0], :] keeps the first axis with length 1, while a[0, :] collapses that axis."
      },
      keyTerms: [
        { term: "individual indexing" },
        { term: "basic indexing" },
        { term: "advanced indexing" }
      ]
    },
    {
      id: "numpy-basic-indexing",
      title: { hu: "Basic indexing és axis collapse", en: "Basic indexing and axis collapse" },
      body: {
        hu: "Basic indexingnél minden integer-indexelt axis eltűnik a result shape-ből; minden slice-olt axis megmarad. Például (32,5) arraynél a[:,1] → (32,), a[1,:] → (5,), a[1:,:] → (31,5), a[0,:-1] → (4,).",
        en: "With basic indexing, every integer-indexed axis disappears from the result shape while every sliced axis is retained. For a (32,5) array, a[:,1] → (32,), a[1,:] → (5,), a[1:,:] → (31,5), and a[0,:-1] → (4,)."
      },
      examTrap: {
        hu: "Slice akkor is megtartja az axis-t, ha csak egy element marad: a[1:2,-1] shape-je (1,), nem scalar.",
        en: "A slice retains the axis even when only one element remains: a[1:2,-1] has shape (1,), not a scalar."
      },
      keyTerms: [
        { term: "slice" },
        { term: "axis collapse" }
      ]
    },
    {
      id: "numpy-advanced-indexing",
      title: { hu: "Advanced indexing és boolean masks", en: "Advanced indexing and boolean masks" },
      body: {
        hu: "Integer-list/array indexing és boolean-mask indexing advanced indexing. Ezek arbitrary elements kiválasztására alkalmasak, és a source szerint új arrayt adnak. Boolean comparison, például a<0, az eredeti shape-pel azonos boolean arrayt készít; a[a<0] a True helyeken lévő elemeket választja ki.",
        en: "Integer-list/array indexing and boolean-mask indexing are advanced indexing. They select arbitrary elements and, according to the source, return a new array. A boolean comparison such as a<0 creates a boolean array with the same shape; a[a<0] selects elements where the mask is True."
      },
      examTrap: {
        hu: "A mask létrehozása és a maskkal indexing két külön dolog: (a<0).shape == a.shape, de a[a<0] tipikusan 1D array a kiválasztott elements számával.",
        en: "Creating a mask and indexing with it are different operations: (a<0).shape == a.shape, while a[a<0] is typically a 1D array containing the selected elements."
      },
      keyTerms: [
        { term: "boolean mask" },
        { term: "integer-array indexing" }
      ]
    },
    {
      id: "numpy-broadcasting",
      title: { hu: "Broadcasting szabályok", en: "Broadcasting rules" },
      body: {
        hu: "A source shape-matching algoritmusa: először a rövidebb shape elé length-1 axes kerülnek, amíg ndim egyezik. Ezután positionönként a dimensions kompatibilisek, ha egyenlők, vagy legalább az egyik 1. Ha egyik sem 1 és eltérnek, broadcasting fails.",
        en: "The source's shape-matching algorithm first adds leading length-1 axes to the shorter shape until the numbers of dimensions match. Then dimensions at matching positions are compatible if they are equal or at least one is 1. If they differ and neither is 1, broadcasting fails."
      },
      intuition: {
        hu: "(2,3) + (3,): (3,) → (1,3) → (2,3) működik. (2,3) + (2,): (2,) → (1,2), az utolsó axis 3 vs 2 → fail.",
        en: "(2,3) + (3,): (3,) → (1,3) → (2,3) works. (2,3) + (2,): (2,) → (1,2), and the final axes are 3 vs 2 → fail."
      },
      examTrap: {
        hu: "Broadcasting a trailing dimensions felől illeszkedik, amit a source leading 1 axes hozzáadásával fogalmaz meg. Ezért (32,5)+(32,) fail, de (32,5)+(32,1) működik.",
        en: "Broadcasting aligns trailing dimensions, expressed in the source as adding leading 1 axes. Therefore (32,5)+(32,) fails, but (32,5)+(32,1) works."
      },
      keyTerms: [
        { term: "broadcasting" },
        { term: "compatible shapes" }
      ]
    },
    {
      id: "numpy-newaxis",
      title: { hu: "None / np.newaxis", en: "None / np.newaxis" },
      body: {
        hu: "None indexing contextben np.newaxis alias: új length-1 axis-t szúr be. (32,) vectornál a[:,None] → (32,1), a[None,:] → (1,32). Ez gyakran broadcasting shape-ek előkészítésére szolgál.",
        en: "In indexing context, None is an alias for np.newaxis: it inserts a new length-1 axis. For a (32,) vector, a[:,None] → (32,1) and a[None,:] → (1,32). This is commonly used to prepare shapes for broadcasting."
      },
      realWorld: {
        hu: "Ha (32,5) matrix minden rowjához külön scalar offseted van (32,) vectorban, offset[:,None] shape (32,1), ami row-onként broadcastolható az 5 columnra.",
        en: "If a (32,5) matrix has one scalar offset per row stored in a (32,) vector, offset[:,None] has shape (32,1), which broadcasts across the 5 columns."
      },
      keyTerms: [
        { term: "np.newaxis" },
        { term: "None indexing" }
      ]
    },
    {
      id: "numpy-reductions",
      title: { hu: "Collapse / reduction operations és axis", en: "Collapse / reduction operations and axis" },
      body: {
        hu: "Reduction nélkül axis parameter nélkül az összes axis collapse-olható scalarra, például np.sum(a). Axis megadásával csak a kijelölt axis tűnik el. (32,5) esetén mean(axis=0) → (5,), mean(axis=1) → (32,).",
        en: "Without an axis parameter, a reduction can collapse all axes into a scalar, for example np.sum(a). With an axis argument, only the selected axis is collapsed. For shape (32,5), mean(axis=0) → (5,) and mean(axis=1) → (32,)."
      },
      intuition: {
        hu: "axis=0 azt jelenti, hogy a 0. axis mentén aggregálunk, ezért az eltűnik. Ami megmarad, annak shape-je (5,).",
        en: "axis=0 means aggregation along axis 0, so that axis disappears. What remains has shape (5,)."
      },
      examTrap: {
        hu: "np.sum(a,axis=0) ndarray lehet, míg np.sum(a) minden axis collapse után NumPy scalar, nem ndarray.",
        en: "np.sum(a,axis=0) can be an ndarray, while np.sum(a) collapses all axes and returns a NumPy scalar, not an ndarray."
      },
      keyTerms: [
        { term: "reduction" },
        { term: "axis" },
        { term: "np.mean" },
        { term: "np.sum" }
      ]
    },
    {
      id: "numpy-transpose",
      title: { hu: "Transpose és axis swapping", en: "Transpose and axis swapping" },
      body: {
        hu: "2D-ben a.T, np.transpose(a) és np.swapaxes(a,0,1) ugyanazt az axis-order cserét adhatja. (32,5).T → (5,32), majd .T.T → (32,5). 1D arraynél .T nem változtatja meg a (n,) shape-et.",
        en: "In 2D, a.T, np.transpose(a), and np.swapaxes(a,0,1) can perform the same axis-order swap. (32,5).T → (5,32), then .T.T → (32,5). For a 1D array, .T does not change shape (n,)."
      },
      keyTerms: [
        { term: "transpose" },
        { term: "swapaxes" }
      ]
    },
    {
      id: "numpy-views-copies",
      title: { hu: "Views vs copies", en: "Views vs copies" },
      body: {
        hu: "View arrays ugyanazt az underlying memory-t osztják meg, ezért a view módosítása az eredetit is érintheti. A source view-producing műveletként tárgyalja a reshape-et, transpose/axis swappinget, basic indexinget és broadcastinget. Advanced indexing soha nem ad view-t; új array készül.",
        en: "View arrays share the same underlying memory, so modifying a view can affect the original array. The source discusses reshape, transpose/axis swapping, basic indexing, and broadcasting as view-producing operations. Advanced indexing never produces a view; it creates a new array."
      },
      intuition: {
        hu: "x=np.arange(4); y=x[1:2]; y[:]=99 módosítja x[1] értékét. y=x[[1,2]] esetén viszont y copy, így x nem változik.",
        en: "x=np.arange(4); y=x[1:2]; y[:]=99 modifies x[1]. With y=x[[1,2]], however, y is a copy and x does not change."
      },
      examTrap: {
        hu: "A source megjegyzi, hogy view-producing operations bizonyos kombinációi végül mégis copy-t igényelhetnek. A Theory Test official examples egyszerű, egyértelmű eseteket használnak.",
        en: "The source notes that some combinations of view-producing operations may still require a copy. The official Theory Test examples use straightforward cases."
      },
      keyTerms: [
        { term: "view" },
        { term: "copy" },
        { term: "shared memory" }
      ]
    },
    {
      id: "numpy-common-functions",
      title: { hu: "Gyakori result-kérdések", en: "Common result questions" },
      body: {
        hu: "A hivatalos example-question dokumentum külön kérdez np.count_nonzero, np.any, np.all, np.unique, np.bincount, np.sort, np.argsort és boolean filtering eredményekre. Ezeknél nem csak a function nevét, hanem a konkrét outputot kell tudni követni.",
        en: "The official example-question document explicitly asks about results of np.count_nonzero, np.any, np.all, np.unique, np.bincount, np.sort, np.argsort, and boolean filtering. You need to reason about the actual output, not merely recognize the function name."
      },
      intuition: {
        hu: "argsort nem a sorted values értékeket adja, hanem azokat az indices értékeket, amelyek sorted orderbe rendeznék az arrayt.",
        en: "argsort does not return sorted values; it returns the indices that would arrange the array in sorted order."
      },
      examTrap: {
        hu: "np.unique sorted unique values-t ad; np.bincount([3,1,2]) → [0,1,1,1], mert az index maga a non-negative integer value.",
        en: "np.unique returns sorted unique values; np.bincount([3,1,2]) → [0,1,1,1], because each index represents the corresponding non-negative integer value."
      },
      keyTerms: [
        { term: "np.unique" },
        { term: "np.bincount" },
        { term: "np.sort" },
        { term: "np.argsort" },
        { term: "np.any" },
        { term: "np.all" }
      ]
    },
    {
      id: "numpy-scope",
      title: { hu: "Theory Test scope: mi nincs benne?", en: "Theory Test scope: what is excluded?" },
      body: {
        hu: "A hivatalos example document explicit scope-ja: weeks 3–6 Video to watch before practice NumPy content. ndarray.strides és stride tricks nem lesznek a Theory Test 1-ben.",
        en: "The official example document explicitly defines the scope as NumPy content from the weeks 3–6 Video to watch before practice materials. ndarray.strides and stride tricks are excluded from Theory Test 1."
      },
      examTrap: {
        hu: "A view/copy fogalom továbbra is tesztelhető, még akkor is, ha a strides belső mechanizmusa nincs benne a tesztben.",
        en: "The view/copy concept can still be tested even though the internal stride mechanism is excluded."
      },
      keyTerms: [
        { term: "Theory Test scope" }
      ]
    }
  ]
};
