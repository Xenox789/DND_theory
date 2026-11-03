import type { LessonContentSupplement } from "../lessonEnrichment";
export const numpyExtras: Record<string, LessonContentSupplement> = {
  "numpy-array-programming": { ex: [
    "Python listánál [1,2,3]*2 az elemek ismétlését adja. NumPy esetén np.array([1,2,3])*2 → [2,4,6], vagyis elemenkénti műveletet.",
    "Python list [1,2,3]*2 repeats elements; NumPy np.array([1,2,3])*2 gives element-wise [2,4,6]."
  ] },
  "numpy-attributes": { ex: [
    "np.zeros((2,3),dtype=np.float32): shape=(2,3), ndim=2, size=6, dtype=float32, itemsize=4. A shape tuple, a size egyetlen szám.",
    "np.zeros((2,3),dtype=np.float32) has shape (2,3), ndim 2, size 6, dtype float32 and itemsize 4. Shape is a tuple; size a number."
  ] },
  "numpy-zero-shapes": { ex: [
    "a=np.zeros((2,0,3)): a.shape=(2,0,3), a.ndim=3, a.size=0. Az üres tengely miatt nincs adat, de három tengely továbbra is van.",
    "np.zeros((2,0,3)) has shape (2,0,3), ndim 3 and size 0. Empty data can still have multiple axes."
  ] },
  "numpy-creation-reshape": { ex: [
    "a=np.arange(6): shape (6,). a.reshape(2,3) shape (2,3); a.reshape(3,-1) shape (3,2). a.reshape(4,2) hibás, mert 6 elem nem rendezhető 8 helyre.",
    "np.arange(6) has shape (6,). reshape(2,3) gives (2,3), reshape(3,-1) gives (3,2). reshape(4,2) fails: 6 elements cannot fill 8 positions."
  ] },
  "numpy-indexing-types": { ex: [
    "a=np.arange(6).reshape(2,3). a[1,2] → 5, skalár. a[1,:] → [3,4,5], basic indexing. a[[1,0],:] → két megfordított sor, advanced indexing és új tömb.",
    "For a=np.arange(6).reshape(2,3): a[1,2] → scalar 5; a[1,:] → [3,4,5] basic indexing; a[[1,0],:] → reversed rows via advanced indexing, a copy."
  ] },
  "numpy-basic-indexing": { ex: [
    "a.shape=(32,5): a[:,1] shape (32,), a[1,:] shape (5,), a[1:2,:] shape (1,5). Egész index eltüntet egy tengelyt, a slice megtartja.",
    "For shape (32,5): [:,1] → (32,), [1,:] → (5,), [1:2,:] → (1,5). Integer indexing removes an axis; slicing retains it."
  ] },
  "numpy-advanced-indexing": { ex: [
    "a=np.array([[0,1,2],[10,11,12]]): a[[1,1,0],[0,2,2]] → [10,12,2], shape (3,); a[a%2==0] → [0,2,10,12], shape (4,).",
    "a=[[0,1,2],[10,11,12]]: a[[1,1,0],[0,2,2]] → [10,12,2] with shape (3,); a[a%2==0] → [0,2,10,12] with shape (4,)."
  ] },
  "numpy-broadcasting": { ex: [
    "(32,5)+(32,) → (32,5)+(1,32), hibás. (32,5)+(32,1) → (32,5), helyes. (32,5)+(32,1,5) → (32,32,5) az implicit kezdeti 1-es tengely miatt.",
    "(32,5)+(32,) fails (5 vs 32 at the last axis). (32,5)+(32,1) works and gives (32,5). (32,5)+(32,1,5) broadcasts to (32,32,5)."
  ] },
  "numpy-newaxis": { ex: [
    "v.shape=(32,). v[:,None] shape (32,1), v[None,:] shape (1,32). Az első egy oszlop, a második egy sor; a None nem hoz létre 32 új adatértéket.",
    "For v.shape=(32,), v[:,None] has shape (32,1) and v[None,:] (1,32). None adds an axis, not new data values."
  ] },
  "numpy-reductions": { ex: [
    "a=[[1,2,3],[4,5,6]]: np.sum(a,axis=0)=[5,7,9], shape (3,); axis=1 → [6,15], shape (2,); np.sum(a)=21, skalár.",
    "For a=[[1,2,3],[4,5,6]], sum(axis=0)=[5,7,9] shape (3,), sum(axis=1)=[6,15] shape (2,), sum(a)=21 scalar."
  ] },
  "numpy-transpose": { ex: [
    "a=np.arange(6).reshape(2,3): a.T shape (3,2). Ha v=np.arange(3), v.T shape továbbra is (3,), nem (3,1). A v[:,None] alakít oszlopvektorrá.",
    "For a.shape=(2,3), a.T has shape (3,2). For 1D v.shape=(3,), v.T stays (3,); use v[:,None] to make a column."
  ] },
  "numpy-views-copies": { ex: [
    "a=np.arange(4); b=a[1:3]; b[:]=99 → a=[0,99,99,3] (view). Ezzel szemben b=a[[1,2]]; b[:]=99 nem változtatja meg a-t (copy). np.append(a,42) is új tömb.",
    "For a=np.arange(4), b=a[1:3]; b[:]=99 changes a to [0,99,99,3] (view). b=a[[1,2]]; b[:]=99 leaves a unchanged (copy). np.append also creates a new array."
  ] },
  "numpy-common-functions": { ex: [
    "a=[3,1,2]. np.unique(a)=[1,2,3], np.bincount(a)=[0,1,1,1], np.sort(a)[::-1]=[3,2,1], np.argsort(a)=[1,2,0]. Az argsort indexeket ad, nem rendezett értékeket.",
    "For a=[3,1,2], unique=[1,2,3], bincount=[0,1,1,1], sort(a)[::-1]=[3,2,1], argsort=[1,2,0]. argsort returns indices, not sorted values."
  ] },
  "numpy-scope": { ex: [
    "A Theory Test 1 NumPy-részéből az ndarray.strides és stride tricks ki van zárva, de a basic vs. advanced indexing, a view/copy, a broadcasting, a shape és a dtype továbbra is követelmény.",
    "The test excludes ndarray.strides and stride tricks, but still includes basic versus advanced indexing, view/copy behavior, broadcasting, shape, and dtype."
  ] }
};
