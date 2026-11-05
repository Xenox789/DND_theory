import type { SourceExample } from "./sourceLectures";
import type { ExamChapter } from "./types";

/** All 49 explicit NumPy subquestions from pages 5–7 of the attached
 * Theory Test 1 example document. All contexts and code expressions are
 * preserved, avoiding added topics such as ndarray.strides or stride tricks.
 */
const numpyParagraphs = [121,122,123,124,125,126,127,128,130,131,132,133,134,135,136,138,139,140,141,143,144,145,146,147,148,149,150,151,154,155,156,157,158,160,161,162,163,164,165,166,169,170,171,173,174,175,176,177,178];
const rows = `
np-q31~pool-np-attributes~Lehet-e egy ndarray shape értéke (5,6)?~Can ndarray.shape be (5,6)?
np-q31~pool-np-attributes~Lehet-e egy ndarray shape értéke (1,)?~Can ndarray.shape be (1,)?
np-q31~pool-np-attributes~Lehet-e egy ndarray shape értéke (0,1,0)?~Can ndarray.shape be (0,1,0)?
np-q32~pool-np-attributes~Lehet-e az ndarray.shape értéke a 12 egész szám?~Can ndarray.shape equal integer 12?
np-q32~pool-np-attributes~Lehet-e az ndarray.dtype értéke a (5,6) tuple?~Can ndarray.dtype equal tuple (5,6)?
np-q32~pool-np-attributes~Lehet-e az ndarray.size értéke a (5,6) tuple?~Can ndarray.size equal tuple (5,6)?
np-q32~pool-np-attributes~Lehet-e az ndarray.size értéke 12?~Can ndarray.size be 12?
np-q32~pool-np-attributes~Lehet-e az ndarray.ndim értéke a (5,6) tuple?~Can ndarray.ndim equal tuple (5,6)?
np-q33~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[:,:] szeletének?~What is the shape of a[:,:] for a.shape=(32,5)?
np-q33~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[:,1] szeletének?~Shape of a[:,1] for a.shape=(32,5)
np-q33~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[1,:] szeletének?~Shape of a[1,:] for a.shape=(32,5)
np-q33~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[1:,:] szeletének?~Shape of a[1:,:] for a.shape=(32,5)
np-q34~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[0,:-1] részének?~Shape of a[0,:-1] for a.shape=(32,5)
np-q34~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[[0],:] részének?~Shape of a[[0],:] for a.shape=(32,5)
np-q34~pool-np-index~Milyen az alakja a shape=(32,5) tömb a[[-1,-1],-1] részének?~Shape of a[[-1,-1],-1] for a.shape=(32,5)
np-q35~pool-np-broadcast~Broadcasting hibát okoz-e az (32,5) és (32,) alakú tömbök összeadása?~Does adding arrays shaped (32,5) and (32,) raise a broadcasting error?
np-q35~pool-np-broadcast~Broadcasting hibát okoz-e a (32,5) és (32,1) alakok összeadása?~Does adding arrays shaped (32,5) and (32,1) raise a broadcasting error?
np-q35~pool-np-broadcast~Broadcasting hibát okoz-e a (32,5) és (1,32) alakok összeadása?~Does adding arrays shaped (32,5) and (1,32) raise a broadcasting error?
np-q35~pool-np-broadcast~Broadcasting hibát okoz-e a (32,5) alakú tömb és skalár összeadása?~Does adding scalar 1 to an array shaped (32,5) raise broadcasting error?
np-q36~pool-np-reductions~Milyen alakú az a<0 logikai tömb, ha a.shape=(32,5)?~Shape of a<0 for a.shape=(32,5)
np-q36~pool-np-reductions~Milyen az a.T alakja, ha a.shape=(32,5)?~Shape of a.T when a.shape=(32,5)
np-q36~pool-np-reductions~Milyen alakú a.T.T, ha a.shape=(32,5)?~Shape of a.T.T when a.shape=(32,5)
np-q36~pool-np-reductions~Milyen alakú a+a, ha a.shape=(32,5)?~Shape of a+a when a.shape=(32,5)
np-q37~pool-np-broadcast~Milyen alakú a+a[:,None,:], ha a.shape=(32,5)?~Shape of a+a[:,None,:] when a.shape=(32,5)
np-q38~pool-np-reductions~Milyen alakú np.mean(a,axis=0) (32,5) bemenettel?~Shape of np.mean(a,axis=0) for (32,5) input
np-q38~pool-np-reductions~Milyen alakú np.mean(a,axis=1) (32,5) bemenettel?~Shape of np.mean(a,axis=1) for (32,5) input
np-q39~pool-np-reductions~ndarray lesz-e np.sum(a,axis=0) eredménye (32,5) bemenetre?~Is np.sum(a,axis=0) an ndarray for shape (32,5)?
np-q39~pool-np-reductions~ndarray lesz-e np.sum(a) eredménye (32,5) bemenetre?~Is np.sum(a) an ndarray for shape (32,5)?
np-q40~pool-np-transform~Milyen az np.arange(4).reshape(2,-1) tömb alakja?~Shape of np.arange(4).reshape(2,-1)
np-q41~pool-np-transform~Milyen az a*2+1 alakja, ha a=np.arange(4).reshape(2,-1)?~Shape of a*2+1 with a=np.arange(4).reshape(2,-1)
np-q42~pool-np-transform~Milyen az a[a>0] alakja, ha a=np.arange(4).reshape(2,-1)?~Shape of a[a>0] with a=np.arange(4).reshape(2,-1)
np-q43~pool-np-transform~Milyen az a[(a>0)&(a%2==0)] alakja?~Shape of a[(a>0)&(a%2==0)]
np-q44~pool-np-transform~Milyen az a*a.reshape(2,2,-1) alakja 4 elemnél?~Shape of a*a.reshape(2,2,-1) for four elements
np-q45~pool-np-views~Módosul-e a forrás, ha reshape nézeten keresztül írunk?~Does assigning through a reshape view mutate the source?
np-q46~pool-np-views~Módosul-e a forrás az egydimenziós .T nézetén keresztül írva?~Does writing through the transpose of a 1D array mutate the source?
np-q47~pool-np-views~Módosul-e a forrás a np.append eredményének módosításától?~Does modifying np.append output change the source?
np-q48~pool-np-views~Módosul-e a forrás egyszerű a[1:2] szelet írásakor?~Does writing to a[1:2] modify the source?
np-q49~pool-np-views~Módosul-e a forrás a[[1,2]] haladó indexelésből kapott tömb írásakor?~Does writing to a[[1,2]] advanced-index result modify the source?
np-q50~pool-np-views~Módosul-e a forrás a[a<2] logikai maszkos kiválasztásból íráskor?~Does writing to a[a<2] mask result change the source?
np-q51~pool-np-views~Módosul-e a forrás az a+a eredménytömb írásakor?~Does writing to a+a change source a?
np-q52~pool-np-boolean~Mennyi np.count_nonzero(a==0) az a=np.arange(4).reshape(2,-1) példában?~Value of np.count_nonzero(a==0) for a=np.arange(4).reshape(2,-1)
np-q52~pool-np-boolean~Mennyi np.any(a==0) a négy elemből?~Value of np.any(a==0) for the four elements
np-q52~pool-np-boolean~Mennyi np.all(a==0,axis=1) a kétsoros példában?~Value of np.all(a==0,axis=1) for the two rows
np-q53~pool-np-functions~Mi np.unique([3,1,2]) eredménye?~Value of np.unique([3,1,2])
np-q54~pool-np-functions~Mi np.unique([3,1,2]==0) eredménye?~Value of np.unique(np.array([3,1,2])==0)
np-q55~pool-np-functions~Mi np.bincount([3,1,2]) eredménye?~Value of np.bincount([3,1,2])
np-q56~pool-np-functions~Mi np.sort([3,1,2])[::-1] eredménye?~Value of np.sort(np.array([3,1,2]))[::-1]
np-q57~pool-np-functions~Mi np.argsort([3,1,2]) eredménye?~Value of np.argsort([3,1,2])
np-q58~pool-np-functions~Mi a[a!=0] eredménye, ha a=np.array([3,1,2])?~Value of a[a!=0] if a=np.array([3,1,2])
`.trim();

const lines = rows.split("\n").map(x=>x.trim()).filter(Boolean);
if(lines.length!==numpyParagraphs.length)throw new Error("Expected 49 NumPy source cases but got "+lines.length);
export const numpySourceExamples: SourceExample[] = lines.map((line, i) => {
  const [anchorId, variationPoolId, focusHu, focusEn] = line.split("~");
  if(!anchorId||!variationPoolId||!focusHu||!focusEn)throw new Error("Incomplete NumPy source mapping "+i);
  return {
    id: "N"+String(i+1).padStart(3,"0"),
    documentParagraph: numpyParagraphs[i],
    chapter: "numpy" as ExamChapter,
    anchorId,
    variationPoolId,
    focusHu,
    focusEn
  };
});
