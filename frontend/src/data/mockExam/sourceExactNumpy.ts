import type { Pair, SourceAnswer } from "./sourceExactLectures";
export const numpyAnswers: Record<string, SourceAnswer> = {};
const p=(hu: string,en:string):Pair=>[hu,en];
function add(ids:string, yes:Pair, no:Pair[], expl:Pair=yes) {
 for (const id of ids.split(" ")) {
  if(numpyAnswers[id])throw Error("Duplicate source "+id);
  numpyAnswers[id]={trueChoices:[yes],falseChoices:no,explanation:expl};
 }
}
function v(ids:string, good:string, bad:string[], expHu:string,expEn:string){
 add(ids,p(good,good),bad.map(s=>p(s,s)),p(expHu,expEn));
}
// Exact ndarray attribute questions.
add("N001",p("Igen: a shape tuple lehet (5,6).","Yes: shape can be the tuple (5,6)."),
 [p("Nem: a shape csak skalár egész szám.","No: shape can only be a scalar integer."),
  p("Nem: a shape csak egyetlen dimenziót tartalmazhat.","No: shape must have exactly one dimension."),
  p("Igen, de csak akkor, ha size=11.","Yes, but only if size=11.")]);
add("N002",p("Igen: az egyelemű (1,) tuple érvényes shape.","Yes: the one-element tuple (1,) is a valid shape."),
 [p("Nem: a shape tuple-nak legalább két eleműnek kell lennie.","No: shape tuples must contain at least two elements."),
  p("Nem: a záró vessző hibás ndarray-alakot jelent.","No: the trailing comma makes it an invalid ndarray shape."),
  p("Igen, de ilyenkor ndim=0.","Yes, but then ndim=0.")]);
add("N003",p("Igen: a (0,1,0) megengedett shape, size=0.","Yes: shape (0,1,0) is valid and has size=0."),
 [p("Nem: nulla hosszú tengely nem megengedett.","No: zero-length axes are not permitted."),
  p("Igen, de ilyenkor size=1.","Yes, but then size=1."),
  p("Nem: három tengely csak pozitív dimenziószámmal lehet.","No: three axes require all dimensions to be positive.")]);
add("N004",p("Nem: a shape tuple, nem a 12 egész szám.","No: shape is a tuple, not integer 12."),
 [p("Igen: a shape és a size egyaránt skalár szám.","Yes: shape and size are both scalars."),
  p("Igen: az 1D tömb shape-je az elemszám, vessző nélkül.","Yes: for 1D, shape is the element count with no comma."),
  p("Nem, mert egy tömbnek nem lehet 12 eleme.","No, because an array cannot have twelve elements.")]);
add("N005",p("Nem: a (5,6) tuple shape, nem dtype.","No: (5,6) is a shape tuple, not a dtype."),
 [p("Igen: a dtype a tengelyek hosszának tuple-je.","Yes: dtype is the tuple of axis lengths."),
  p("Igen: két numerikus tengelyhez kételemű dtype kell.","Yes: two numeric axes require a two-element dtype."),
  p("Nem: a dtype csak egész számként adható meg.","No: dtype must be an integer.")]);
add("N006",p("Nem: a size egyetlen egész elemszám, nem a (5,6) tuple.","No: size is a scalar count of elements, not the tuple (5,6)."),
 [p("Igen: a size a tengelyhosszok tuple-je.","Yes: size is the tuple of dimension lengths."),
  p("Igen: kétdimenziós tömbben a size két értékből áll.","Yes: the size of a 2D array has two entries."),
  p("Nem, mert a size mindig lebegőpontos szám.","No, because size is always floating-point.")]);
add("N007",p("Igen: a size lehet 12, például shape=(3,4) mellett.","Yes: size can equal 12, for example for shape (3,4)."),
 [p("Nem: 12 csak az ndim értéke lehet.","No: 12 can only be an ndim value."),
  p("Nem: a size minden esetben tuple.","No: size is always a tuple."),
  p("Igen, de csak egydimenziós tömbnél.","Yes, but only for a 1D array.")]);
add("N008",p("Nem: ndim egész számú tengelyszám, nem (5,6) tuple.","No: ndim is an integer axis count, not a tuple (5,6)."),
 [p("Igen: ndim az egyes tengelyek hosszát tárolja.","Yes: ndim stores each axis length."),
  p("Igen: kétdimenziós tömbnél ndim=(5,6).","Yes: for a 2D array ndim=(5,6)."),
  p("Nem, mert az ndim mindig az elemszámot adja.","No: ndim always equals total element count.")]);

// All shape questions exactly follow the examples' stated inputs.
v("N009","(32,5)",["(32,)","(5,)","(32,1)","(1,5)","(31,5)"],"Mindkét tengely teljes szeletét kiválasztjuk.","Both axes are selected in full.");
v("N010","(32,)",["(32,1)","(5,)","(1,32)","(32,5)","(1,5)"],"Az egész index eltünteti a második tengelyt.","The integer index removes the second axis.");
v("N011","(5,)",["(1,5)","(32,)","(32,5)","(5,1)","(1,32)"],"Az egész index az első tengelyt eltünteti.","The integer index removes the first axis.");
v("N012","(31,5)",["(32,5)","(31,)","(1,5)","(32,4)","(5,31)"],"Az első sor kimarad, a többi 31 sor megmarad.","Row 0 is omitted, leaving 31 rows.");
v("N013","(4,)",["(1,4)","(5,)","(1,5)","(32,4)","(4,1)"],"Egyetlen sorban az utolsó oszlop nélkül négy elem marad.","One row without its last column contains four elements.");
v("N014","(1,5)",["(5,)","(32,5)","(1,)","(5,1)","(1,32)"],"A [0] listás index megtartja az első tengelyt.","The [0] index list retains the first axis.");
v("N015","(2,)",["(2,1)","(1,2)","(5,)","(32,2)","(2,5)"],"Két egész indexpár két elemet választ: advanced indexing.","Two matched integer index pairs select two values.");
add("N016",p("Igen: a (32,5) és (32,) jobb oldali tengelye 5 és 32, nem kompatibilis.","Yes: shapes (32,5) and (32,) mismatch on trailing axes 5 and 32."),
 [p("Nem: mindkettő első tengelye 32, így az eredmény (32,5).","No: both first axes equal 32, so output is (32,5)."),
  p("Nem: a kisebb tömb 32-es tengelye automatikusan 5-re csonkolódik.","No: the 32-element axis is automatically truncated to 5."),
  p("Igen, mert csak azonos ndim mellett lehet összeadni.","Yes, because arrays must have matching ndim to be added.")]);
add("N017",p("Nem: a (32,1) soronként kiterjeszthető (32,5)-re.","No: (32,1) can broadcast across columns to (32,5)."),
 [p("Igen: 1 és 5 méretű tengelyek soha nem kompatibilisek.","Yes: axes of sizes 1 and 5 cannot broadcast."),
  p("Igen: (32,5) csak skalárral adható össze.","Yes: shape (32,5) can only be added to a scalar."),
  p("Nem: a két tömb (32,32) alakot ad.","No: the output is (32,32).")]);
add("N018",p("Igen: a (1,32) és (32,5) jobb oldali dimenziója 32 és 5, eltér.","Yes: trailing axis sizes 32 and 5 are incompatible."),
 [p("Nem: (1,32) automatikusan (32,5)-re terjeszkedik.","No: (1,32) broadcasts automatically to (32,5)."),
  p("Nem: a kimenet (32,32), mert a bal oldali 5 eltűnik.","No: the result is (32,32) because the left-hand 5 disappears."),
  p("Igen, mert az első tengely 1, és az 1-es broadcast-tiltott.","Yes, because a length-one axis cannot broadcast.")]);
add("N019",p("Nem: a skalár 1 bármely numerikus (32,5) tömbhöz hozzáadható.","No: scalar 1 can be added to a numeric (32,5) array."),
 [p("Igen: a skalárnak nincs két tengelye, ezért az összeadás hibás.","Yes: the scalar lacks two axes, so addition fails."),
  p("Igen: a 1 csak (32,1) alak esetén broadcastolható.","Yes: 1 only broadcasts to shape (32,1)."),
  p("Nem: a művelet transzponálja az eredményt (5,32)-re.","No: the operation transposes the result to (5,32).")]);
v("N020","(32,5)",["(32,)","(5,)","(1,)","(5,32)","(32,1)"],"Az elemenkénti összehasonlítás megtartja az alakot.","Element-wise comparison preserves array shape.");
v("N021","(5,32)",["(32,5)","(32,)","(5,)","(1,32)","(32,1)"],"A kétdimenziós .T felcseréli a két tengelyt.","The transpose .T swaps the two axes.");
v("N022","(32,5)",["(5,32)","(32,)","(5,)","(1,32)","(32,1)"],"Kétszeri transzponálás visszaállítja az eredeti alakot.","Two transposes restore the original shape.");
v("N023","(32,5)",["(5,32)","(32,)","(5,)","(32,1)","(32,32)"],"Az azonos alakú tömbök elemenkénti összeadása nem változtat shape-et.","Adding equally shaped arrays elementwise preserves shape.");
v("N024","(32,32,5)",["(32,1,5)","(32,5)","(1,32,5)","(32,32)","(32,5,5)"],"A (32,5) implicit (1,32,5) alakkal broadcastolódik.","Shape (32,5) broadcasts as (1,32,5).");
v("N025","(5,)",["(32,)","(32,5)","()","(5,1)","(1,5)"],"Az axis=0 a 32 soron redukál, öt oszlop marad.","axis=0 reduces the 32 rows, retaining five columns.");
v("N026","(32,)",["(5,)","(32,5)","()","(32,1)","(1,32)"],"Az axis=1 az öt oszlopon redukál, 32 sor marad.","axis=1 reduces five columns, leaving 32 rows.");
add("N027",p("Igen: np.sum(a,axis=0) egy ötelemű ndarray eredményt ad.","Yes: np.sum(a,axis=0) returns an ndarray with five elements."),
 [p("Nem: minden np.sum eredmény skalár, akkor is, ha axis adott.","No: every np.sum result is scalar even with axis set."),
  p("Nem: csak NumPy-lista típusú kimenetet adhat.","No: the result must be a Python list."),
  p("Igen, de az eredmény a teljes (32,5) alakot megtartja.","Yes, but the result retains shape (32,5).")]);
add("N028",p("Nem: np.sum(a) egy NumPy skalárt ad, nem numpy.ndarray tömböt.","No: np.sum(a) returns a NumPy scalar, not a numpy.ndarray."),
 [p("Igen: minden NumPy-eredmény ndarray, még a skalárok is.","Yes: all NumPy results are ndarray objects, including scalars."),
  p("Igen: a teljes összeg alakja (1,), tehát ndarray.","Yes: the total sum has shape (1,) and is ndarray."),
  p("Nem: a függvény alapértelmezés szerint Python-listát ad.","No: the function returns a Python list by default.")]);
v("N029 N030","(2,2)",["(4,)","(2,1)","(1,4)","(2,2,1)","(4,2)"],"Négy elemet két sorba rendezünk; az elemenkénti *2+1 nem változtatja az alakot.","Four elements are reshaped into two rows; elementwise *2+1 preserves shape.");
v("N031","(3,)",["(2,2)","(2,1)","(4,)","(1,3)","(2,)"],"A maszk az 1,2,3 elemeket választja, egy egydimenziós tömböt kapunk.","The mask selects values 1,2,3, yielding a 1D array.");
v("N032","(1,)",["(2,)","(2,2)","(1,1)","(3,)","()"],"Csak a pozitív és páros 2 érték marad.","Only the positive even value 2 is selected.");
v("N033","(2,2,2)",["(2,2,1)","(2,2)","(1,2,2)","(2,1,2)","(4,)"],"A (2,2) és (2,2,1) alakok közös eredménye (2,2,2).","Shapes (2,2) and (2,2,1) broadcast to (2,2,2).");
add("N034",p("Igen: np.arange(4).reshape(2,2) nézetet ad, írása az eredetit is módosítja.","Yes: np.arange(4).reshape(2,2) gives a view; writes affect the source."),
 [p("Nem: a reshape ezen a folytonos adaton is mindig önálló másolat.","No: reshape always copies, even for this contiguous input."),
  p("Nem: csak a reshape alakja változik, a megosztott elemek nem.","No: reshape changes shape but cannot share elements."),
  p("Igen, de csak a második sor két eleme változik.","Yes, but only the second row's two values change.")]);
add("N035",p("Igen: egydimenziós a esetén a.T megosztja az adatokat; a forrás is módosul.","Yes: for 1D a, a.T shares data and changes propagate to the source."),
 [p("Nem: az egydimenziós transzponálás mindig külön másolat.","No: 1D transpose always creates an independent copy."),
  p("Nem: a.T megfordítja az elemek sorrendjét, ezért a forrás változatlan.","No: a.T reverses the elements, leaving the source unchanged."),
  p("Igen, de a.T alakja (4,1), nem (4,).","Yes, but a.T has shape (4,1) rather than (4,).")]);
add("N036",p("Nem: np.append új tömböt készít, a kiinduló a változatlan.","No: np.append creates a new array; source a remains unchanged."),
 [p("Igen: np.append helyben hosszabbítja a-t.","Yes: np.append extends a in place."),
  p("Igen: csak az eredeti a utolsó eleme változik.","Yes: only the final entry of the original a changes."),
  p("Nem: mert az append eredménye nem írható tömb.","No: because the append result is not writable.")]);
add("N037",p("Igen: az a[1:2] basic slice nézet, így írása módosítja a forrást.","Yes: basic slice a[1:2] is a view, so writing to it modifies the source."),
 [p("Nem: a szelet minden esetben független copy.","No: slicing always returns an independent copy."),
  p("Nem: a szelet a dimenziót változtatja, de adatot nem oszthat meg.","No: slicing changes dimensions but cannot share data."),
  p("Igen, de mind a négy forráselem 99 lesz.","Yes, but all four source elements become 99.")]);
add("N038",p("Nem: az a[[1,2]] advanced indexing másolat, a forrás nem módosul.","No: a[[1,2]] uses advanced indexing and makes a copy; the source is unchanged."),
 [p("Igen: a szomszédos indexek automatikusan view-t adnak.","Yes: adjacent indices automatically return a view."),
  p("Igen: az eredeti tömb 1. és 2. indexű eleme megváltozik.","Yes: source indices 1 and 2 are modified."),
  p("Nem: mert a haladó indexelés csak skálárokra használható.","No: because advanced indexing only applies to scalars.")]);
add("N039",p("Nem: a logikai maszkos kiválasztás eredménye másolat.","No: boolean-mask selection produces a copy."),
 [p("Igen: a kiválasztott elemek egymás mellett vannak, ezért view-t ad.","Yes: selected elements are adjacent, so it is a view."),
  p("Igen: a kiválasztott első két elem a forrásban is megváltozik.","Yes: the first two source elements also change."),
  p("Nem: mert a logikai maszk eredménye csak booleán lehet.","No: because boolean indexing may only return booleans.")]);
add("N040",p("Nem: az a+a új eredménytömböt hoz létre, az eredeti a változatlan.","No: a+a creates a new result array; original a is unchanged."),
 [p("Igen: az a+a a saját forrásának view-ját adja.","Yes: a+a returns a view of its own source."),
  p("Igen: az eredeti a mind a négy eleme 99 lesz.","Yes: all four original values become 99."),
  p("Nem: mert az a+a eredményét nem lehet módosítani.","No: because the output of a+a is not writable.")]);
v("N041","1",["0","2","3","4","False"],"Az a=np.arange(4) pontosan egy nulla értéket tartalmaz.","a=np.arange(4) contains exactly one zero.");
v("N042","True",["False","[True,False]","[False,False]","0","[True,True]"],"Az any akkor True, ha van legalább egy nulla.","any returns True if at least one zero exists.");
v("N043","[False, False]",["[True, False]","[False, True]","[True, True]","False","[False, False, False, False]"],"Mindkét sor tartalmaz nemnulla elemet, ezért egyik sem csupa nulla.","Each row contains a nonzero element, so neither row is all zero.");
v("N044","[1,2,3]",["[3,1,2]","[1,2]","[3,2,1]","[0,1,2]","[1,3,2]"],"Az np.unique az egyedi elemeket rendezve adja.","np.unique returns unique elements in sorted order.");
v("N045","[False]",["[True]","[False,True]","[True,False]","[0]","[]"],"Mindhárom elem nemnulla, az összehasonlítás eredménye csupa False.","All three elements are nonzero, so the comparison yields only False.");
v("N046","[0,1,1,1]",["[1,1,1]","[1,1,1,1]","[0,0,1,1]","[3,1,2]","[0,1,2,3]"],"A bincount nullától indexelt előfordulási darabszámokat ad.","bincount returns occurrence counts indexed from zero.");
v("N047","[3,2,1]",["[1,2,3]","[3,1,2]","[2,3,1]","[1,3,2]","[2,1,3]"],"Az np.sort növekvő, a [::-1] megfordítja csökkenőre.","np.sort is ascending; [::-1] reverses it.");
v("N048","[1,2,0]",["[1,2,3]","[3,1,2]","[2,1,0]","[0,1,2]","[2,0,1]"],"Az argsort a rendezett értékek eredeti indexeit adja.","argsort returns indices that would sort the original values.");
v("N049","[3,1,2]",["[1,2,3]","[1,2]","[3,2]","[0,1,2]","[3,0,1,2]"],"A bemenet minden eleme nemnulla, a boolean kiválasztás a sorrendet megtartja.","All inputs are nonzero; boolean selection retains their original order.");

const expected=Array.from({length:49},(_,i)=>"N"+String(i+1).padStart(3,"0"));
for(const id of expected)if(!numpyAnswers[id])throw Error("Missing exact source question "+id);
if(Object.keys(numpyAnswers).length!==49)throw Error("Extra or duplicate source question");
