import type { FalsePair } from "./official";

export const numpyExampleDistractors: Record<string, FalsePair[]> = {
  "np-q31": [["my_array.ndim == my_array.size akkor is lehetséges, ha my_array.shape=(2,3).", "my_array.ndim == my_array.size can hold when my_array.shape=(2,3)."]],
  "np-q32": [["A my_array.shape értéke egész szám, például 12, mert a shape az összes elem számát jelenti.", "my_array.shape is an integer such as 12 because shape represents the total element count."]],
  "np-q33": [
    ["my_array[:,1] → (32,1), mert a második tengelyből egy elemet választunk.", "my_array[:,1] has shape (32,1) since a single element is selected from the second axis."],
    ["my_array[1:2,:] → (5,), mert az első tengely egyeleművé vált.", "my_array[1:2,:] has shape (5,) because the first axis has length one."]
  ],
  "np-q34": [["my_array[[0],:] → (5,), mert az egész indexek listája eltünteti a nulladik tengelyt.", "my_array[[0],:] has shape (5,) because a list of integer indices removes axis zero."]],
  "np-q35": [["my_array1 + my_array2[None,:] alakjai (32,5) és (1,32), ezért (32,5)-re bővíthetők.", "Shapes (32,5) and (1,32) in my_array1 + my_array2[None,:] broadcast to (32,5)."]],
  "np-q36": [
    ["(my_array<0).shape → (32,), mert az összehasonlítás soronként egyetlen logikai értéket ad.", "(my_array<0).shape is (32,) because a comparison returns one boolean per row."],
    ["my_array.T.T.shape → (5,32), mert a kétszeres transzponálás sem állítja vissza az eredeti sorrendet.", "my_array.T.T has shape (5,32) because transposing twice does not restore the original axes."]
  ],
  "np-q37": [["A (32,5) és (32,1,5) alak közös eredménye (32,1,5), mert az első operandus csak egyetlen implicit tengelyt kap.", "Shapes (32,5) and (32,1,5) broadcast to (32,1,5) because the first has one implicit axis."]],
  "np-q38": [["my_array.mean(axis=1) alakja (5,), mert az 1-es tengely indexe a sorokat jelenti.", "my_array.mean(axis=1) has shape (5,) because axis index 1 refers to rows."]],
  "np-q39": [["Ha np.mean(my_array) egy skalár numpy.float64, akkor np.mean(my_array,axis=0) is mindig skalár marad.", "If np.mean(my_array) is scalar numpy.float64, then np.mean(my_array,axis=0) must also be scalar."]],
  "np-q40": [["np.arange(4).reshape(2,-1) alakja (4,2), mert az automatikus −1 dimenzió átrendezi a sorokat.", "np.arange(4).reshape(2,-1) has shape (4,2) because inferred dimension −1 reorders rows."]],
  "np-q41": [["Ha my_array=np.array([[0,1],[2,3]]), a my_array*2+1 értéke [[1,2],[3,4]].", "With my_array=np.array([[0,1],[2,3]]), my_array*2+1 evaluates to [[1,2],[3,4]]."]],
  "np-q42": [["A my_array[my_array>0] alakja (2,2), mert a logikai maszk a forrásmátrix eredeti alakját megtartja.", "my_array[my_array>0] has shape (2,2) because boolean masking retains the input matrix's shape."]],
  "np-q43": [["A feltételek & operátorral összekötve a 0 és 2 értékeket választják, mert mindkettő páros.", "Combining the conditions with & selects values 0 and 2 because both are even."]],
  "np-q44": [["A (2,2) és (2,2,1) alakok eredménye (2,2,1), mert a hiányzó tengely mindig a végére kerül.", "Shapes (2,2) and (2,2,1) broadcast to (2,2,1) because implicit axes are appended at the end."]],
  "np-q45": [
    ["Ebben a folytonos memóriaelrendezésű példában a reshape külön másolatot készít, ezért az eredeti tömb nem módosul.", "With contiguous data, this reshape creates an independent copy so the original remains unchanged."],
    ["Az eredeti tömb csak az utolsó két elemében változik, mert a reshape csak a második sor nézete.", "Only the final two source elements change because reshape views only the second row."]
  ],
  "np-q46": [["Egydimenziós tömb .T tulajdonsága új, független másolatot készít, ezért a változtatás nem jut vissza az eredeti tömbre.", "The .T property on a one-dimensional array creates an independent copy so modifications cannot affect the source."]],
  "np-q47": [
    ["Az np.append() az eredeti tömböt 5 hosszúságúvá alakítja helyben, ezért a my_array elemei is 99-re változnak.", "np.append() lengthens the source array to five in place, so my_array's entries also become 99."],
    ["A két tömb az append után ugyanazt az adatmemóriát használja, mert az új utolsó elem külön tárolódik.", "The two arrays share the same element storage after append because only the new final element is allocated separately."]
  ],
  "np-q48": [["A [1:2] slice új tömböt hoz létre az eredetitől független memóriával, ezért my_array változatlan marad.", "The [1:2] slice creates independent storage, leaving my_array unchanged."]],
  "np-q49": [
    ["A my_array[[1,2]] egy basic slice, ezért az abból származó my_array2 nézetet hoz létre.", "my_array[[1,2]] is a basic slice and its result is therefore a view."],
    ["Az eredeti my_array második és harmadik eleme 99 lesz, mert az advanced indexing elemeit visszaírja a NumPy.", "The source my_array's second and third values become 99 because NumPy writes changes through advanced indexing."]
  ],
  "np-q50": [
    ["A my_array[my_array<2] kifejezés basic indexing, ezért a kiválasztott elemek módosítása a forrást is módosítja.", "my_array[my_array<2] is basic indexing and modifications through its result affect the source."],
    ["Az eredeti my_array az első két elemét 99-re cseréli, mert a maszk a memória közös részét adja vissza.", "The first two elements of my_array become 99 because masking returns shared memory."]
  ],
  "np-q51": [
    ["A my_array+my_array aritmetikai kifejezés az eredeti tömbre nézetet készít, nem új eredményt.", "The arithmetic expression my_array+my_array makes a view of its source rather than a new result."],
    ["Az eredeti my_array elemei [0,99,99,99]-re változnak, mert az eredmény elemenként párosítja ugyanazt a memóriát.", "The source changes to [0,99,99,99] because elementwise addition reuses the same element storage."]
  ],
  "np-q52": [["Az np.any(my_array==0) False, mert a négy elem közül nem mindegyik nulla.", "np.any(my_array==0) is False because not all four elements are zero."]],
  "np-q53": [
    ["Az np.unique([3,1,2]) a bemeneti sorrendet őrzi meg, tehát [3,1,2]-t ad.", "np.unique([3,1,2]) preserves input order and returns [3,1,2]."],
    ["Az np.unique([3,1,2]) az első két különböző értéket adja vissza, mert a harmadik már ismétlődő.", "np.unique([3,1,2]) returns only the first two unique entries because the third is a duplicate."]
  ],
  "np-q54": [["Az np.unique(my_array==0) kimenete [0,1,2,3], mert a unique az eredeti numerikus adatokon dolgozik.", "np.unique(my_array==0) returns [0,1,2,3] by operating on the original numeric array."]],
  "np-q55": [["Az np.bincount([3,1,2]) eredménye [1,1,1], mert a három bemeneti érték egyszer szerepel.", "np.bincount([3,1,2]) returns [1,1,1] because each input value appears once."]],
  "np-q56": [["Az np.sort([3,1,2])[::-1] az eredeti [3,1,2] sorozatot adja, mert a rendezés után megőrzi a bemeneti indexeket.", "np.sort([3,1,2])[::-1] returns the original [3,1,2] because sorting retains the input indices."]],
  "np-q57": [["Az np.argsort([3,1,2]) értéke [1,2,3], mert a rendezett elemeket adja, nem az indexeket.", "np.argsort([3,1,2]) yields [1,2,3] because it returns sorted values instead of indices."]],
  "np-q58": [["A my_array[my_array!=0] [3,1] értéket ad, mert a maszk a harmadik elem előtt megáll.", "my_array[my_array!=0] yields [3,1] because the mask stops before the third element."]],
  "np-q59": [
    ["a[[1,1,0],[0,2,2]] → [10,12,2], alakja (3,1), mert minden indexpár egy oszlopot ad.", "a[[1,1,0],[0,2,2]] gives [10,12,2] with shape (3,1), since each index pair yields a column."],
    ["a[a%2==0] alakja (2,2), mert a páros elemek maszkja megtartja a sorok számát.", "a[a%2==0] has shape (2,2) because the even-element boolean mask preserves two rows."]
  ],
  "np-q60": [
    ["Az a[::2,[0,3,1]] kijelölt célalakja (2,1), mert a jobb oldalnak is két sora van.", "The target a[::2,[0,3,1]] has shape (2,1) because the right side has two rows."],
    ["A jobb oldali [[42],[99]] shape-je (1,2), ezért a (2,3) célalakra nem broadcastolható.", "The right side [[42],[99]] has shape (1,2), so it cannot broadcast to a (2,3) target."]
  ]
};
