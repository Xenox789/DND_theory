import type { Question } from "../types";

export const numpyExampleQuestions: Question[] = [
  {
    id: "np-q31",
    topics: ["numpy","official-example","attributes"],
    prompt: { hu: "Ha my_array egy numpy.ndarray instance, mely állítások LEHETSÉGESEK?", en: "If my_array is a numpy.ndarray instance, which statements CAN be true?" },
    choices: [
      { id: "a", text: { hu: "my_array.shape == (5,6)", en: "my_array.shape == (5,6)" } },
      { id: "b", text: { hu: "my_array.shape == (1,)", en: "my_array.shape == (1,)" } },
      { id: "c", text: { hu: "my_array.shape == (0,1,0)", en: "my_array.shape == (0,1,0)" } },
      { id: "d", text: { hu: "my_array.shape == 12", en: "my_array.shape == 12" } },
      { id: "e", text: { hu: "my_array.size == 12", en: "my_array.size == 12" } }
    ],
    correctIds: ["a","b","c","e"],
    explanation: { hu: "shape tuple; zero-length axes validak. size scalar integer lehet 12.", en: "shape is a tuple and zero-length axes are valid. size can be scalar integer 12." }
  },
  {
    id: "np-q32",
    topics: ["numpy","official-example","attributes"],
    prompt: { hu: "Ha my_array ndarray, mely állítások NEM megfelelő attribute-value típusok?", en: "If my_array is an ndarray, which statements use an inappropriate kind of value for the attribute?" },
    choices: [
      { id: "a", text: { hu: "my_array.dtype == (5,6)", en: "my_array.dtype == (5,6)" } },
      { id: "b", text: { hu: "my_array.size == (5,6)", en: "my_array.size == (5,6)" } },
      { id: "c", text: { hu: "my_array.ndim == (5,6)", en: "my_array.ndim == (5,6)" } },
      { id: "d", text: { hu: "my_array.size == 12", en: "my_array.size == 12" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "dtype datatype descriptor, size és ndim scalar integer; (5,6) shape-szerű tuple.", en: "dtype is a datatype descriptor, while size and ndim are scalar integers; (5,6) is shape-like." }
  },
  {
    id: "np-q33",
    topics: ["numpy","official-example","indexing"],
    prompt: { hu: "my_array.shape=(32,5). Mely result shape-ek helyesek?", en: "my_array.shape=(32,5). Which result shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "my_array[:,:] → (32,5)", en: "my_array[:,:] → (32,5)" } },
      { id: "b", text: { hu: "my_array[:,1] → (32,)", en: "my_array[:,1] → (32,)" } },
      { id: "c", text: { hu: "my_array[1,:] → (5,)", en: "my_array[1,:] → (5,)" } },
      { id: "d", text: { hu: "my_array[1:,:] → (31,5)", en: "my_array[1:,:] → (31,5)" } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Integer index collapse-olja az axis-t; slice megtartja.", en: "An integer index collapses an axis; a slice retains it." }
  },
  {
    id: "np-q34",
    topics: ["numpy","official-example","indexing"],
    prompt: { hu: "my_array.shape=(32,5). Mely result shape-ek helyesek?", en: "my_array.shape=(32,5). Which result shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "my_array[0,:-1] → (4,)", en: "my_array[0,:-1] → (4,)" } },
      { id: "b", text: { hu: "my_array[[0],:] → (1,5)", en: "my_array[[0],:] → (1,5)" } },
      { id: "c", text: { hu: "my_array[[-1,-1],-1] → (2,)", en: "my_array[[-1,-1],-1] → (2,)" } },
      { id: "d", text: { hu: "my_array[[0],:] → (5,)", en: "my_array[[0],:] → (5,)" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "[[0]] advanced indexing megtart egy length-1 result axis-t; két row index két elemet választ.", en: "[[0]] advanced indexing retains a length-1 result axis; two row indices select two elements." }
  },
  {
    id: "np-q35",
    topics: ["numpy","official-example","broadcasting"],
    prompt: { hu: "my_array1.shape=(32,5), my_array2.shape=(32,). Mely expressions okoznak broadcasting ValueError-t?", en: "my_array1.shape=(32,5), my_array2.shape=(32,). Which expressions raise a broadcasting ValueError?" },
    choices: [
      { id: "a", text: { hu: "my_array1 + my_array2", en: "my_array1 + my_array2" } },
      { id: "b", text: { hu: "my_array1 + my_array2[:,None]", en: "my_array1 + my_array2[:,None]" } },
      { id: "c", text: { hu: "my_array1 + my_array2[None,:]", en: "my_array1 + my_array2[None,:]" } },
      { id: "d", text: { hu: "my_array1 + 1", en: "my_array1 + 1" } }
    ],
    correctIds: ["a","c"],
    explanation: { hu: "(32,5)+(32,) → (32,5)+(1,32), fail. (32,1) broadcastolható az 5 columnra; scalar is működik.", en: "(32,5)+(32,) becomes (32,5)+(1,32), which fails. (32,1) broadcasts across 5 columns, and a scalar also works." }
  },
  {
    id: "np-q36",
    topics: ["numpy","official-example","shapes"],
    prompt: { hu: "my_array.shape=(32,5). Mely result shape-ek helyesek?", en: "my_array.shape=(32,5). Which result shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "(my_array < 0).shape = (32,5)", en: "(my_array < 0).shape = (32,5)" } },
      { id: "b", text: { hu: "my_array.T.shape = (5,32)", en: "my_array.T.shape = (5,32)" } },
      { id: "c", text: { hu: "my_array.T.T.shape = (32,5)", en: "my_array.T.T.shape = (32,5)" } },
      { id: "d", text: { hu: "(my_array + my_array).shape = (32,5)", en: "(my_array + my_array).shape = (32,5)" } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Comparison és element-wise addition shape-preserving; transpose axes-t cserél.", en: "Comparison and element-wise addition preserve shape; transpose swaps axes." }
  },
  {
    id: "np-q37",
    topics: ["numpy","official-example","broadcasting"],
    prompt: { hu: "my_array.shape=(32,5). Mi a shape-je my_array + my_array[:,None,:] expressionnek?", en: "my_array.shape=(32,5). What is the shape of my_array + my_array[:,None,:]?" },
    choices: [
      { id: "a", text: { hu: "(32,32,5)", en: "(32,32,5)" } },
      { id: "b", text: { hu: "(32,5)", en: "(32,5)" } },
      { id: "c", text: { hu: "(32,1,5)", en: "(32,1,5)" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "(32,5) logikailag (1,32,5), a másik (32,1,5), közös shape (32,32,5).", en: "(32,5) is logically (1,32,5), the other is (32,1,5), giving common shape (32,32,5)." }
  },
  {
    id: "np-q38",
    topics: ["numpy","official-example","reductions"],
    prompt: { hu: "my_array.shape=(32,5). Mely mean result shape-ek helyesek?", en: "my_array.shape=(32,5). Which mean result shapes are correct?" },
    choices: [
      { id: "a", text: { hu: "np.mean(my_array,axis=0) → (5,)", en: "np.mean(my_array,axis=0) → (5,)" } },
      { id: "b", text: { hu: "np.mean(my_array,axis=1) → (32,)", en: "np.mean(my_array,axis=1) → (32,)" } },
      { id: "c", text: { hu: "np.mean(my_array,axis=0) → (32,)", en: "np.mean(my_array,axis=0) → (32,)" } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A megadott axis collapse-ol.", en: "The specified axis is collapsed." }
  },
  {
    id: "np-q39",
    topics: ["numpy","official-example","reductions"],
    prompt: { hu: "my_array.shape=(32,5), numeric dtype. Mely type-állítások igazak?", en: "my_array.shape=(32,5), numeric dtype. Which type statements are true?" },
    choices: [
      { id: "a", text: { hu: "np.sum(my_array,axis=0) resultja numpy.ndarray.", en: "np.sum(my_array,axis=0) returns a numpy.ndarray." } },
      { id: "b", text: { hu: "np.sum(my_array) resultja numpy.ndarray.", en: "np.sum(my_array) returns a numpy.ndarray." } },
      { id: "c", text: { hu: "np.sum(my_array) minden axis collapse-ja miatt scalar NumPy value.", en: "np.sum(my_array) is a scalar NumPy value because all axes are collapsed." } }
    ],
    correctIds: ["a","c"],
    explanation: { hu: "axis=0 után marad egy axis; axis nélkül scalar result.", en: "With axis=0 one axis remains; without axis the result is scalar." }
  },
  {
    id: "np-q40",
    topics: ["numpy","official-example","reshape"],
    prompt: { hu: "my_array=np.arange(4).reshape(2,-1). Mely állítások igazak?", en: "my_array=np.arange(4).reshape(2,-1). Which statements are true?" },
    choices: [
      { id: "a", text: { hu: "my_array.shape == (2,2)", en: "my_array.shape == (2,2)" } },
      { id: "b", text: { hu: "my_array == [[0,1],[2,3]]", en: "my_array == [[0,1],[2,3]]" } },
      { id: "c", text: { hu: "A -1 axis length 2-re következtethető.", en: "The -1 axis length is inferred as 2." } },
      { id: "d", text: { hu: "my_array.shape == (4,)", en: "my_array.shape == (4,)" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "4 elementet két rowba rendezve a második dimension 2.", en: "Four elements arranged into two rows require a second dimension of 2." }
  },
  {
    id: "np-q41",
    topics: ["numpy","official-example","elementwise"],
    prompt: { hu: "my_array=[[0,1],[2,3]]. Mi my_array*2+1 eredménye?", en: "my_array=[[0,1],[2,3]]. What is the result of my_array*2+1?" },
    choices: [
      { id: "a", text: { hu: "[[1,3],[5,7]]", en: "[[1,3],[5,7]]" } },
      { id: "b", text: { hu: "[[1,2],[3,4]]", en: "[[1,2],[3,4]]" } },
      { id: "c", text: { hu: "Shape-je (2,2).", en: "Its shape is (2,2)." } }
    ],
    correctIds: ["a","c"],
    explanation: { hu: "Mindkét operation element-wise, scalar broadcastinggal.", en: "Both operations are element-wise with scalar broadcasting." }
  },
  {
    id: "np-q42",
    topics: ["numpy","official-example","boolean-indexing"],
    prompt: { hu: "my_array=np.arange(4).reshape(2,-1). Mi my_array[my_array>0] shape-je?", en: "my_array=np.arange(4).reshape(2,-1). What is the shape of my_array[my_array>0]?" },
    choices: [
      { id: "a", text: { hu: "(3,)", en: "(3,)" } },
      { id: "b", text: { hu: "(2,2)", en: "(2,2)" } },
      { id: "c", text: { hu: "(1,3)", en: "(1,3)" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Az értékek 0,1,2,3; a >0 mask három elementet választ, advanced indexing result 1D.", en: "Values are 0,1,2,3; the >0 mask selects three elements, giving a 1D advanced-indexing result." }
  },
  {
    id: "np-q43",
    topics: ["numpy","official-example","boolean-indexing"],
    prompt: { hu: "my_array=np.arange(4).reshape(2,-1). Mi my_array[(my_array>0)&(my_array%2==0)]?", en: "my_array=np.arange(4).reshape(2,-1). What is my_array[(my_array>0)&(my_array%2==0)]?" },
    choices: [
      { id: "a", text: { hu: "[2]", en: "[2]" } },
      { id: "b", text: { hu: "Shape-je (1,).", en: "Its shape is (1,)." } },
      { id: "c", text: { hu: "[0,2]", en: "[0,2]" } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "A 0 páros, de nem >0; csak 2 felel meg mindkét feltételnek.", en: "0 is even but not >0; only 2 satisfies both conditions." }
  },
  {
    id: "np-q44",
    topics: ["numpy","official-example","broadcasting"],
    prompt: { hu: "my_array=np.arange(4).reshape(2,-1). Mi a shape-je my_array * my_array.reshape(2,2,-1) expressionnek?", en: "my_array=np.arange(4).reshape(2,-1). What is the shape of my_array * my_array.reshape(2,2,-1)?" },
    choices: [
      { id: "a", text: { hu: "(2,2,2)", en: "(2,2,2)" } },
      { id: "b", text: { hu: "(2,2,1)", en: "(2,2,1)" } },
      { id: "c", text: { hu: "Broadcasting error.", en: "Broadcasting error." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "(2,2) → (1,2,2), a reshaped array (2,2,1); common shape (2,2,2).", en: "(2,2) becomes (1,2,2), while the reshaped array is (2,2,1); common shape is (2,2,2)." }
  },
  {
    id: "np-q45",
    topics: ["numpy","official-example","views"],
    prompt: { hu: "my_array=np.arange(4); my_array2=my_array.reshape(2,2); majd my_array2[:,:]=99. Módosul my_array?", en: "my_array=np.arange(4); my_array2=my_array.reshape(2,2); then my_array2[:,:]=99. Is my_array modified?" },
    choices: [
      { id: "a", text: { hu: "Igen, [99,99,99,99] lesz.", en: "Yes, it becomes [99,99,99,99]." } },
      { id: "b", text: { hu: "Nem, reshape mindig copy.", en: "No, reshape always makes a copy." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Ebben a contiguous official example-ben reshape view és shared memory.", en: "In this contiguous official example, reshape is a view and shares memory." }
  },
  {
    id: "np-q46",
    topics: ["numpy","official-example","views","transpose"],
    prompt: { hu: "my_array=np.arange(4); my_array2=my_array.T; majd my_array2[:]=99. Módosul my_array?", en: "my_array=np.arange(4); my_array2=my_array.T; then my_array2[:]=99. Is my_array modified?" },
    choices: [
      { id: "a", text: { hu: "Igen.", en: "Yes." } },
      { id: "b", text: { hu: "Nem.", en: "No." } },
      { id: "c", text: { hu: "1D-ben .T shape-je továbbra is (4,).", en: "For a 1D array, .T still has shape (4,)." } }
    ],
    correctIds: ["a","c"],
    explanation: { hu: "1D transpose nem változtat shape-et, és view/share-memory behavior marad.", en: "A 1D transpose does not change shape and retains shared-memory/view behavior." }
  },
  {
    id: "np-q47",
    topics: ["numpy","official-example","copies"],
    prompt: { hu: "my_array=np.arange(4); my_array2=np.append(my_array,42); majd my_array2[:]=99. Módosul my_array?", en: "my_array=np.arange(4); my_array2=np.append(my_array,42); then my_array2[:]=99. Is my_array modified?" },
    choices: [
      { id: "a", text: { hu: "Nem.", en: "No." } },
      { id: "b", text: { hu: "Igen.", en: "Yes." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "append új arrayt készít; nincs shared memory az originallel.", en: "append creates a new array; it does not share memory with the original." }
  },
  {
    id: "np-q48",
    topics: ["numpy","official-example","views"],
    prompt: { hu: "my_array=np.arange(4); my_array2=my_array[1:2]; majd my_array2[:]=99. Mi történik?", en: "my_array=np.arange(4); my_array2=my_array[1:2]; then my_array2[:]=99. What happens?" },
    choices: [
      { id: "a", text: { hu: "my_array [0,99,2,3] lesz.", en: "my_array becomes [0,99,2,3]." } },
      { id: "b", text: { hu: "A slice basic indexing view.", en: "The slice is a basic-indexing view." } },
      { id: "c", text: { hu: "my_array nem változik.", en: "my_array does not change." } }
    ],
    correctIds: ["a","b"],
    explanation: { hu: "Basic slicing shared-memory view-t ad.", en: "Basic slicing returns a shared-memory view." }
  },
  {
    id: "np-q49",
    topics: ["numpy","official-example","copies","advanced-indexing"],
    prompt: { hu: "my_array=np.arange(4); my_array2=my_array[[1,2]]; majd my_array2[:]=99. Módosul my_array?", en: "my_array=np.arange(4); my_array2=my_array[[1,2]]; then my_array2[:]=99. Is my_array modified?" },
    choices: [
      { id: "a", text: { hu: "Nem, integer-array advanced indexing copy-t ad.", en: "No, integer-array advanced indexing returns a copy." } },
      { id: "b", text: { hu: "Igen, mert minden indexing view.", en: "Yes, because every indexing operation returns a view." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Advanced indexing új array.", en: "Advanced indexing creates a new array." }
  },
  {
    id: "np-q50",
    topics: ["numpy","official-example","copies","boolean-indexing"],
    prompt: { hu: "my_array=np.arange(4); my_array2=my_array[my_array<2]; majd my_array2[:]=99. Módosul my_array?", en: "my_array=np.arange(4); my_array2=my_array[my_array<2]; then my_array2[:]=99. Is my_array modified?" },
    choices: [
      { id: "a", text: { hu: "Nem, boolean-mask advanced indexing új arrayt ad.", en: "No, boolean-mask advanced indexing creates a new array." } },
      { id: "b", text: { hu: "Igen, [99,99,2,3] lesz.", en: "Yes, it becomes [99,99,2,3]." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Mask indexing advanced indexing.", en: "Mask indexing is advanced indexing." }
  },
  {
    id: "np-q51",
    topics: ["numpy","official-example","copies","elementwise"],
    prompt: { hu: "my_array=np.arange(4); my_array2=my_array+my_array; majd my_array2[:]=99. Módosul my_array?", en: "my_array=np.arange(4); my_array2=my_array+my_array; then my_array2[:]=99. Is my_array modified?" },
    choices: [
      { id: "a", text: { hu: "Nem, az arithmetic operation resultja külön array.", en: "No, the arithmetic-operation result is a separate array." } },
      { id: "b", text: { hu: "Igen, mert element-wise operation view-t ad.", en: "Yes, because an element-wise operation returns a view." } }
    ],
    correctIds: ["a"],
    explanation: { hu: "A számított result nem shared-memory view az operand arrayre.", en: "The computed result is not a shared-memory view of the operand array." }
  },
  {
    id: "np-q52",
    topics: ["numpy","official-example","reductions"],
    prompt: { hu: "my_array=np.arange(4).reshape(2,-1). Mely eredmények helyesek?", en: "my_array=np.arange(4).reshape(2,-1). Which results are correct?" },
    choices: [
      { id: "a", text: { hu: "np.count_nonzero(my_array==0) → 1", en: "np.count_nonzero(my_array==0) → 1" } },
      { id: "b", text: { hu: "np.any(my_array==0) → True", en: "np.any(my_array==0) → True" } },
      { id: "c", text: { hu: "np.all(my_array==0,axis=1) → [False,False]", en: "np.all(my_array==0,axis=1) → [False,False]" } },
      { id: "d", text: { hu: "np.all(my_array==0) → True", en: "np.all(my_array==0) → True" } }
    ],
    correctIds: ["a","b","c"],
    explanation: { hu: "Csak egy zero van; egyik row sem áll kizárólag zerókból.", en: "There is only one zero; neither row consists entirely of zeros." }
  },
  {
    id: "np-q53",
    topics: ["numpy","official-example","unique"],
    prompt: { hu: "my_array=np.array([3,1,2]). Mi np.unique(my_array)?", en: "my_array=np.array([3,1,2]). What is np.unique(my_array)?" },
    choices: [
      { id: "a", text: { hu: "[1,2,3]", en: "[1,2,3]" } },
      { id: "b", text: { hu: "[3,1,2]", en: "[3,1,2]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "np.unique a unique values értékeket sorted orderben adja vissza.", en: "np.unique returns unique values in sorted order." }
  },
  {
    id: "np-q54",
    topics: ["numpy","official-example","unique","boolean"],
    prompt: { hu: "my_array=np.array([3,1,2]). Mi np.unique(my_array==0)?", en: "my_array=np.array([3,1,2]). What is np.unique(my_array==0)?" },
    choices: [
      { id: "a", text: { hu: "[False]", en: "[False]" } },
      { id: "b", text: { hu: "[False,True]", en: "[False,True]" } },
      { id: "c", text: { hu: "[0]", en: "[0]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Egyetlen element sem zero, ezért a comparison [False,False,False], unique → [False].", en: "No element is zero, so the comparison is [False,False,False], and unique → [False]." }
  },
  {
    id: "np-q55",
    topics: ["numpy","official-example","bincount"],
    prompt: { hu: "my_array=np.array([3,1,2]). Mi np.bincount(my_array)?", en: "my_array=np.array([3,1,2]). What is np.bincount(my_array)?" },
    choices: [
      { id: "a", text: { hu: "[0,1,1,1]", en: "[0,1,1,1]" } },
      { id: "b", text: { hu: "[1,1,1]", en: "[1,1,1]" } },
      { id: "c", text: { hu: "[3,1,2]", en: "[3,1,2]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "0 egyszer sem, 1/2/3 egy-egy alkalommal szerepel.", en: "0 occurs zero times; 1, 2, and 3 each occur once." }
  },
  {
    id: "np-q56",
    topics: ["numpy","official-example","sort"],
    prompt: { hu: "my_array=np.array([3,1,2]). Mi np.sort(my_array)[::-1]?", en: "my_array=np.array([3,1,2]). What is np.sort(my_array)[::-1]?" },
    choices: [
      { id: "a", text: { hu: "[3,2,1]", en: "[3,2,1]" } },
      { id: "b", text: { hu: "[1,2,3]", en: "[1,2,3]" } },
      { id: "c", text: { hu: "[2,1,0]", en: "[2,1,0]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "np.sort ascending [1,2,3], a [::-1] slice megfordítja.", en: "np.sort gives ascending [1,2,3], and [::-1] reverses it." }
  },
  {
    id: "np-q57",
    topics: ["numpy","official-example","argsort"],
    prompt: { hu: "my_array=np.array([3,1,2]). Mi np.argsort(my_array)?", en: "my_array=np.array([3,1,2]). What is np.argsort(my_array)?" },
    choices: [
      { id: "a", text: { hu: "[1,2,0]", en: "[1,2,0]" } },
      { id: "b", text: { hu: "[1,2,3]", en: "[1,2,3]" } },
      { id: "c", text: { hu: "[0,2,1]", en: "[0,2,1]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Index 1-en van a legkisebb value 1, index 2-n a 2, index 0-n a 3.", en: "Index 1 contains the smallest value 1, index 2 contains 2, and index 0 contains 3." }
  },
  {
    id: "np-q58",
    topics: ["numpy","official-example","boolean-indexing"],
    prompt: { hu: "my_array=np.array([3,1,2]). Mi my_array[my_array!=0]?", en: "my_array=np.array([3,1,2]). What is my_array[my_array!=0]?" },
    choices: [
      { id: "a", text: { hu: "[3,1,2]", en: "[3,1,2]" } },
      { id: "b", text: { hu: "[]", en: "[]" } },
      { id: "c", text: { hu: "[1,2,3]", en: "[1,2,3]" } }
    ],
    correctIds: ["a"],
    explanation: { hu: "Mindhárom value nonzero, ezért mind kiválasztódik, eredeti sorrendben.", en: "All three values are nonzero, so all are selected in original order." }
  },
  {
    id: "np-q59",
    topics: ["numpy","advanced-indexing","shape"],
    prompt: { hu: "a=np.array([[0,1,2],[10,11,12]]). Mely official-practice resultok helyesek?", en: "a=np.array([[0,1,2],[10,11,12]]). Which practice results are correct?" },
    choices: [
      { id: "a", text: { hu: "a[1,[2,0]] → [12,10], shape (2,)", en: "a[1,[2,0]] → [12,10], shape (2,)" } },
      { id: "b", text: { hu: "a[[1,1,0],[0,2,2]] → [10,12,2], shape (3,)", en: "a[[1,1,0],[0,2,2]] → [10,12,2], shape (3,)" } },
      { id: "c", text: { hu: "a[a%2==0] → [0,2,10,12], shape (4,)", en: "a[a%2==0] → [0,2,10,12], shape (4,)" } },
      { id: "d", text: { hu: "Mindhárom advanced indexing.", en: "All three use advanced indexing." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "Integer sequence vagy mask jelenléte advanced indexinget triggerel.", en: "The presence of an integer sequence or mask triggers advanced indexing." }
  },
  {
    id: "np-q60",
    topics: ["numpy","broadcasting","assignment"],
    prompt: { hu: "a=np.arange(12).reshape(3,4)*10. Miért működhet a[::2,[0,3,1]] = [[42],[99]] assignment?", en: "a=np.arange(12).reshape(3,4)*10. Why can a[::2,[0,3,1]] = [[42],[99]] work?" },
    choices: [
      { id: "a", text: { hu: "A selected target shape (2,3).", en: "The selected target has shape (2,3)." } },
      { id: "b", text: { hu: "A right-hand side shape (2,1).", en: "The right-hand side has shape (2,1)." } },
      { id: "c", text: { hu: "(2,1) broadcastolható (2,3)-ra.", en: "(2,1) can broadcast to (2,3)." } },
      { id: "d", text: { hu: "Broadcasting assignment előtt is történhet.", en: "Broadcasting can occur before assignment." } }
    ],
    correctIds: ["a","b","c","d"],
    explanation: { hu: "A week 5 source ezt explicit broadcasting-assignment példaként mutatja.", en: "Week 5 explicitly presents this as a broadcasting-before-assignment example." }
  }
];
