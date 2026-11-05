# Theory Test 1 — az összes dokumentumbeli kérdés lefedettsége

**Forrás:** `theory_test1_examples_26autumn(1).docx` (2026 ősz), a dokumentum explicit, kérdő mondatos alkérdései.

## Kérdésbank működése

- **129 dokumentumbeli kérdés:** 80 az 1–6. előadásokból és 49 a NumPy-példákból.
- A rövid, 15/20 kérdéses próbavizsga **alapértelmezésben ezt a 129 konkrét tételt és a dokumentum további négy kapcsolódó témakijelölését** használja (133 forrásalapú sablon).
- A további 24 előadásalapú sablon csak külön bekapcsolva kerül a mintavételbe. Így összesen **157 választható sablon** érhető el, ha a kiegészítéseket is kéred.
- Minden forrástételhez **saját, kétnyelvű, kérdéshez közvetlenül kapcsolódó 4–6 állítás** és külön megoldókulcs tartozik. A korábbi, általános témaköri bankból történő válaszösszekeverést megszüntettük. A 24 opcionális kiegészítő kérdéssablon továbbra is 12-12 válaszvariánst használ.
- Egy teszt 3–6 véletlenszerű válaszlehetőséget mutat, és biztosít legalább egy igaz és egy hamis választ.
- A kérdésekhez `source-M...` / `source-N...` azonosítók és a DOCX bekezdésindexe kapcsolódik. Az egymástól független forrás-alkérdések már külön kérdésként szerepelnek; egy konkrét kérdésazonosító egy teszten belül nem ismétlődik.
- A dokumentum a saját szavai szerint **példakérdések és témák nem teljes listája**; az itt leírt 129-es lefedettség csak a felsorolt, kérdőmondatos tételeket jelenti, nem a teljes lehetséges vizsgaanyagot.

## Fő témakörök

| Témakör | Példadokumentumbeli tételek |
|---|---:|
| ML alapfogalmak | 9 |
| Lineáris regresszió | 31 |
| Logisztikus regresszió | 18 |
| Általánosítás | 11 |
| Neuronok és MLP | 6 |
| SGD | 3 |
| Backpropagation | 2 |
| NumPy | 49 |
| **Összesen** | **129** |

## További négy, a dokumentumban említett példatípus

Ezek önálló kérdő mondat helyett zárójeles feladattípus-megjelölésként szerepelnek, mégis részét képezik az alapértelmezett tesztnek:

| Kód | DOCX bekezdésindexe | Feladattípus |
|---|---:|---|
| `T001` | 78 | További veszteségfüggvényekre vonatkozó hasonló feladatok |
| `T002` | 86 | Bináris osztályozó MLP kimeneti aktivációja |
| `T003` | 87 | Többosztályos MLP kimenete és vesztesége |
| `T004` | 88 | Aktivációfüggvények jellegzetességei és kimeneti tartományai |

**Megjegyzés:** a T004 jelenleg szöveges aktiváció-felismerést kérdez; önálló, kép/grafikon alapú felismerő feladatot ez a fejlesztés nem készít.

## A 129 kérdés tételes forrásleképezése

A `documentParagraph` a DOCX `python-docx` által számolt, **0-alapú bekezdésindexe**, nem oldalszám. Az `anchorId` és a `variationPoolId` **történeti hivatkozások a korábbi leképezésre**, nem az új vizsga válaszainak forrásai. Az új, konkrét megoldókulcsok a `sourceExactLectures.ts`, `sourceExactNumpy.ts` és `sourceExactTopics.ts` fájlokban találhatók.

| Kód | Bekezdés | Témakör | Az eredeti kérdés magyar összefoglalása | Alapkérdés | Válaszvariációk forrása |
|---|---:|---|---|---|---|
| `M001` | 9 | ML alapfogalmak | A hipotézisfüggvény bemenetei és paraméterei | `official-q1` | `mock-fund-2` |
| `M002` | 10 | ML alapfogalmak | Mit ad vissza a hipotézisfüggvény? | `q2` | `mock-fund-2` |
| `M003` | 11 | ML alapfogalmak | A címke lehet skalár, vektor vagy mátrix? | `official-q2` | `mock-fund-2` |
| `M004` | 12 | ML alapfogalmak | Miből áll egy felügyelt tanítóminta? | `official-q3` | `mock-fund-2` |
| `M005` | 13 | ML alapfogalmak | Milyen szerepet játszik a veszteségfüggvény? | `q3` | `mock-fund-3` |
| `M006` | 14 | ML alapfogalmak | Milyen alakú a teljes veszteségfüggvény értéke? | `official-q4` | `mock-fund-3` |
| `M007` | 15 | ML alapfogalmak | Miben különbözik az RL jutalma a felügyelt tanulási címkétől? | `official-q5` | `mock-fund-1` |
| `M008` | 17 | ML alapfogalmak | Mely tanulási feladatok felügyeltek, melyek felügyelet nélküliek? | `official-q6` | `mock-fund-3` |
| `M009` | 18 | ML alapfogalmak | Mi a regresszió, klaszterezés, osztályozás, zajszűrés és dimenziócsökkentés célja? | `q10` | `mock-fund-3` |
| `M010` | 19 | Lineáris regresszió | A lineáris regresszió felügyelt regresszió vagy osztályozás? | `official-q7` | `mock-linear-1` |
| `M011` | 20 | Logisztikus regresszió | A logisztikus regresszió felügyelt osztályozás vagy regresszió? | `official-q8` | `mock-log-1` |
| `M012` | 22 | Lineáris regresszió | Melyik modell illik a 200 beteg koleszterinszintjének becslésére? | `official-q9` | `mock-linear-1` |
| `M013` | 23 | Lineáris regresszió | Hány modellparaméter kell négy bemeneti jellemzőhöz bias mellett? | `lr-q1` | `mock-linear-2` |
| `M014` | 24 | Lineáris regresszió | Milyen veszteséget használjunk a koleszterinszint becslésére? | `official-q9` | `mock-linear-3` |
| `M015` | 26 | Lineáris regresszió | Milyen alakú X a 200 beteges példában? | `official-q10` | `mock-linear-2` |
| `M016` | 27 | Lineáris regresszió | Milyen alakú a θ paramétervektor négy jellemző mellett? | `lr-q1` | `mock-linear-2` |
| `M017` | 28 | Lineáris regresszió | Milyen alakú az Xθ előrejelzésvektor 200 betegnél? | `official-q10` | `mock-linear-2` |
| `M018` | 29 | Lineáris regresszió | Milyen értéktartományú a lineáris regresszió becslése? | `lr-q14` | `mock-linear-1` |
| `M019` | 30 | Lineáris regresszió | A betegek életkora az X vagy a θ része? | `q5` | `mock-linear-2` |
| `M020` | 31 | Lineáris regresszió | Minimalizáljuk-e a bemeneti X mátrixot tanításkor? | `q7` | `mock-linear-3` |
| `M021` | 32 | Lineáris regresszió | A veszteséget vagy a becsléseket minimalizáljuk a tanításban? | `q7` | `mock-linear-3` |
| `M022` | 33 | Lineáris regresszió | A paraméterek értékét vagy magát a θ vektort minimalizáljuk? | `q8` | `mock-linear-3` |
| `M023` | 35 | Lineáris regresszió | Egy beteg lineáris regressziós becslése skalár vagy vektor? | `official-q11` | `mock-linear-1` |
| `M024` | 36 | Lineáris regresszió | Milyen tartományba eshet egy lineáris regresszió skalár becslése? | `lr-q14` | `mock-linear-1` |
| `M025` | 37 | Lineáris regresszió | Egy beteg életkorát bemenetként vagy modellparaméterként kezeljük? | `q8` | `mock-linear-2` |
| `M026` | 39 | Lineáris regresszió | Egy bemeneti változónál milyen geometriai alakú a hipotézis? | `lr-q2` | `mock-linear-1` |
| `M027` | 40 | Lineáris regresszió | Két jellemzővel milyen geometriai alakot kapunk 3D-ben? | `q6` | `mock-linear-1` |
| `M028` | 42 | Lineáris regresszió | Milyen alakú X a regularizált normálegyenlet példájában? | `lr-q6` | `mock-linear-2` |
| `M029` | 43 | Lineáris regresszió | Milyen alakú az y célértékvektor 200 betegnél? | `lr-q6` | `mock-linear-2` |
| `M030` | 44 | Lineáris regresszió | Milyen alakú θ a 200 beteges normálegyenletben? | `lr-q1` | `mock-linear-2` |
| `M031` | 45 | Lineáris regresszió | A koleszterinszintet X, y vagy θ tárolja? | `official-q13` | `mock-linear-2` |
| `M032` | 46 | Lineáris regresszió | Mi az I egységmátrix szerepe a regularizált normálegyenletben? | `lr-q9` | `mock-linear-3` |
| `M033` | 47 | Lineáris regresszió | Mikor igazolható globális optimum lineáris MSE és gradienscsökkentés esetén? | `official-q14` | `mock-linear-3` |
| `M034` | 48 | Neuronok és MLP | Garantálja-e a kis lépésméret a globális optimumot MLP esetén? | `official-q15` | `mock-mlp-1` |
| `M035` | 49 | Lineáris regresszió | Mire szolgál a jellemzőskálázás? | `lr-q10` | `mock-linear-3` |
| `M036` | 50 | Lineáris regresszió | Mi romolhat el, ha nem skálázzuk a bemeneteket? | `lr-q10` | `mock-linear-3` |
| `M037` | 51 | Lineáris regresszió | Min-max vagy standardizálás érzékenyebb néhány kiugró értékre? | `lr-q13` | `mock-linear-3` |
| `M038` | 52 | Lineáris regresszió | Mit jelentenek a skálázási képletek szimbólumai? | `official-q17` | `mock-linear-3` |
| `M039` | 54 | Logisztikus regresszió | Melyik regressziót válasszuk beteg/egészséges osztályozásra? | `official-q18` | `mock-log-1` |
| `M040` | 55 | Logisztikus regresszió | Hány paramétert használ a két laborjellemzős modell bias mellett? | `log-q6` | `mock-log-1` |
| `M041` | 56 | Logisztikus regresszió | Melyik veszteség megfelelő bináris osztályozáshoz? | `log-q8` | `mock-log-3` |
| `M042` | 58 | Logisztikus regresszió | Milyen alakú X száz beteg és két laborérték esetén? | `official-q19` | `mock-log-1` |
| `M043` | 59 | Logisztikus regresszió | Milyen alakú a logisztikus modell θ vektora? | `log-q6` | `mock-log-1` |
| `M044` | 60 | Logisztikus regresszió | Milyen alakú a g(Xθ) becslésvektor? | `log-q3` | `mock-log-1` |
| `M045` | 61 | Logisztikus regresszió | Milyen értéktartományban van a g(Xθ) kimenete? | `log-q2` | `mock-log-2` |
| `M046` | 62 | Logisztikus regresszió | A laborvizsgálati értékek a θ vagy az X részei? | `log-q7` | `mock-log-1` |
| `M047` | 63 | Logisztikus regresszió | Az X mátrixot optimalizáljuk logisztikus tanításkor? | `log-q11` | `mock-log-3` |
| `M048` | 64 | Logisztikus regresszió | Minimalizáljuk-e közvetlenül a g(Xθ) becslésvektort? | `log-q11` | `mock-log-3` |
| `M049` | 65 | Logisztikus regresszió | A θ értékét minimalizáljuk, vagy a θ-t változtatva a veszteséget? | `log-q11` | `mock-log-3` |
| `M050` | 66 | Logisztikus regresszió | A g szigmoidfüggvényt minimalizáljuk tanítás közben? | `log-q11` | `mock-log-2` |
| `M051` | 67 | Logisztikus regresszió | Mi a logisztikus regresszió tanításának célfüggvénye? | `log-q11` | `mock-log-3` |
| `M052` | 69 | Logisztikus regresszió | Egyetlen beteg logisztikus becslése skalár vagy vektor? | `official-q20` | `mock-log-1` |
| `M053` | 70 | Logisztikus regresszió | Milyen tartományú a szigmoid előtti lineáris pontszám? | `log-q2` | `mock-log-2` |
| `M054` | 71 | Logisztikus regresszió | Milyen tartományú a szigmoid utáni becslés? | `log-q2` | `mock-log-2` |
| `M055` | 72 | Logisztikus regresszió | Egy beteg laboreredménye bemeneti adat vagy tanult súly? | `log-q7` | `mock-log-1` |
| `M056` | 74 | Lineáris regresszió | Az MSE veszteség inkább regresszióhoz vagy osztályozáshoz alkalmas? | `lr-q3` | `mock-linear-3` |
| `M057` | 75 | Lineáris regresszió | Mit indexel j a négyzetes veszteség képletében? | `lr-q3` | `mock-linear-3` |
| `M058` | 76 | Lineáris regresszió | Mit jelent m a veszteségképletben? | `lr-q3` | `mock-linear-3` |
| `M059` | 77 | Lineáris regresszió | Skalár, vektor vagy mátrix a teljes J(θ) veszteségérték? | `official-q21` | `mock-linear-3` |
| `M060` | 81 | Neuronok és MLP | Mennyi paraméter van a 20–10–1 MLP egészében? | `mlp-q6` | `mock-mlp-1` |
| `M061` | 82 | Neuronok és MLP | Mennyi paraméter van a 20 bemenetű, 10 neuronos első rétegben? | `mlp-q5` | `mock-mlp-1` |
| `M062` | 83 | Neuronok és MLP | Meg kell-e szüntetni a g₁ rejtett aktivációt regressziónál? | `mlp-q8` | `mock-mlp-2` |
| `M063` | 84 | Neuronok és MLP | Milyen g₂ kimeneti aktiváció illik folytonos regresszióhoz? | `mlp-q8` | `mock-mlp-2` |
| `M064` | 85 | Neuronok és MLP | Kell-e szigmoid a folytonos regressziós kimenetre? | `mlp-q8` | `mock-mlp-2` |
| `M065` | 90 | Általánosítás | Kevesebb tanítópélda növeli-e a túlillesztést? | `gen-q4` | `mock-gen-2` |
| `M066` | 91 | Általánosítás | Kevesebb tesztpélda növeli-e a túlillesztést? | `gen-q5` | `mock-gen-2` |
| `M067` | 92 | Általánosítás | Több tanítópélda hogyan befolyásolja a túlillesztést? | `gen-q6` | `mock-gen-2` |
| `M068` | 93 | Általánosítás | Kevesebb modellparaméter hogyan hat a túlillesztésre? | `gen-q6` | `mock-gen-2` |
| `M069` | 94 | Általánosítás | Több modellparaméter hogyan hat a túlillesztésre? | `gen-q6` | `mock-gen-2` |
| `M070` | 95 | Általánosítás | Mi az early stopping célja? | `gen-q13` | `mock-gen-3` |
| `M071` | 96 | Általánosítás | Mikor indokolt leállítani a tanítást validáció alapján? | `gen-q14` | `mock-gen-3` |
| `M072` | 97 | Általánosítás | A training loss növekedése önmagában early stopping jel? | `gen-q14` | `mock-gen-3` |
| `M073` | 98 | Általánosítás | A csökkenő train és növekvő validation loss túlillesztésre utal? | `gen-q15` | `mock-gen-2` |
| `M074` | 99 | Általánosítás | Az SGD a modellparamétereket tanítja? | `gen-q11` | `mock-gen-1` |
| `M075` | 100 | Általánosítás | Az SGD ugyanúgy tanítja a hiperparamétereket? | `gen-q11` | `mock-gen-1` |
| `M076` | 102 | SGD | SGD esetén kötelező-e mindig pontosan egy mintából gradienst számolni? | `sgd-q3` | `mock-sgd-1` |
| `M077` | 103 | SGD | Milyen hatása van a mini-batch méretének növelésének? | `sgd-q5` | `mock-sgd-2` |
| `M078` | 104 | SGD | Milyen hatása van a mini-batch méretének csökkentésének? | `sgd-q4` | `mock-sgd-2` |
| `M079` | 106 | Backpropagation | Mit terjesztünk vissza a c=b² négyzetes csomóponton? | `official-q28` | `mock-bp-1` |
| `M080` | 111 | Backpropagation | Mit terjesztünk vissza a c=a+b összeadó csomóponton? | `official-q29` | `mock-bp-1` |
| `N001` | 121 | NumPy | Lehet-e egy ndarray shape értéke (5,6)? | `np-q31` | `pool-np-attributes` |
| `N002` | 122 | NumPy | Lehet-e egy ndarray shape értéke (1,)? | `np-q31` | `pool-np-attributes` |
| `N003` | 123 | NumPy | Lehet-e egy ndarray shape értéke (0,1,0)? | `np-q31` | `pool-np-attributes` |
| `N004` | 124 | NumPy | Lehet-e az ndarray.shape értéke a 12 egész szám? | `np-q32` | `pool-np-attributes` |
| `N005` | 125 | NumPy | Lehet-e az ndarray.dtype értéke a (5,6) tuple? | `np-q32` | `pool-np-attributes` |
| `N006` | 126 | NumPy | Lehet-e az ndarray.size értéke a (5,6) tuple? | `np-q32` | `pool-np-attributes` |
| `N007` | 127 | NumPy | Lehet-e az ndarray.size értéke 12? | `np-q32` | `pool-np-attributes` |
| `N008` | 128 | NumPy | Lehet-e az ndarray.ndim értéke a (5,6) tuple? | `np-q32` | `pool-np-attributes` |
| `N009` | 130 | NumPy | Milyen az alakja a shape=(32,5) tömb a[:,:] szeletének? | `np-q33` | `pool-np-index` |
| `N010` | 131 | NumPy | Milyen az alakja a shape=(32,5) tömb a[:,1] szeletének? | `np-q33` | `pool-np-index` |
| `N011` | 132 | NumPy | Milyen az alakja a shape=(32,5) tömb a[1,:] szeletének? | `np-q33` | `pool-np-index` |
| `N012` | 133 | NumPy | Milyen az alakja a shape=(32,5) tömb a[1:,:] szeletének? | `np-q33` | `pool-np-index` |
| `N013` | 134 | NumPy | Milyen az alakja a shape=(32,5) tömb a[0,:-1] részének? | `np-q34` | `pool-np-index` |
| `N014` | 135 | NumPy | Milyen az alakja a shape=(32,5) tömb a[[0],:] részének? | `np-q34` | `pool-np-index` |
| `N015` | 136 | NumPy | Milyen az alakja a shape=(32,5) tömb a[[-1,-1],-1] részének? | `np-q34` | `pool-np-index` |
| `N016` | 138 | NumPy | Broadcasting hibát okoz-e az (32,5) és (32,) alakú tömbök összeadása? | `np-q35` | `pool-np-broadcast` |
| `N017` | 139 | NumPy | Broadcasting hibát okoz-e a (32,5) és (32,1) alakok összeadása? | `np-q35` | `pool-np-broadcast` |
| `N018` | 140 | NumPy | Broadcasting hibát okoz-e a (32,5) és (1,32) alakok összeadása? | `np-q35` | `pool-np-broadcast` |
| `N019` | 141 | NumPy | Broadcasting hibát okoz-e a (32,5) alakú tömb és skalár összeadása? | `np-q35` | `pool-np-broadcast` |
| `N020` | 143 | NumPy | Milyen alakú az a<0 logikai tömb, ha a.shape=(32,5)? | `np-q36` | `pool-np-reductions` |
| `N021` | 144 | NumPy | Milyen az a.T alakja, ha a.shape=(32,5)? | `np-q36` | `pool-np-reductions` |
| `N022` | 145 | NumPy | Milyen alakú a.T.T, ha a.shape=(32,5)? | `np-q36` | `pool-np-reductions` |
| `N023` | 146 | NumPy | Milyen alakú a+a, ha a.shape=(32,5)? | `np-q36` | `pool-np-reductions` |
| `N024` | 147 | NumPy | Milyen alakú a+a[:,None,:], ha a.shape=(32,5)? | `np-q37` | `pool-np-broadcast` |
| `N025` | 148 | NumPy | Milyen alakú np.mean(a,axis=0) (32,5) bemenettel? | `np-q38` | `pool-np-reductions` |
| `N026` | 149 | NumPy | Milyen alakú np.mean(a,axis=1) (32,5) bemenettel? | `np-q38` | `pool-np-reductions` |
| `N027` | 150 | NumPy | ndarray lesz-e np.sum(a,axis=0) eredménye (32,5) bemenetre? | `np-q39` | `pool-np-reductions` |
| `N028` | 151 | NumPy | ndarray lesz-e np.sum(a) eredménye (32,5) bemenetre? | `np-q39` | `pool-np-reductions` |
| `N029` | 154 | NumPy | Milyen az np.arange(4).reshape(2,-1) tömb alakja? | `np-q40` | `pool-np-transform` |
| `N030` | 155 | NumPy | Milyen az a*2+1 alakja, ha a=np.arange(4).reshape(2,-1)? | `np-q41` | `pool-np-transform` |
| `N031` | 156 | NumPy | Milyen az a[a>0] alakja, ha a=np.arange(4).reshape(2,-1)? | `np-q42` | `pool-np-transform` |
| `N032` | 157 | NumPy | Milyen az a[(a>0)&(a%2==0)] alakja? | `np-q43` | `pool-np-transform` |
| `N033` | 158 | NumPy | Milyen az a*a.reshape(2,2,-1) alakja 4 elemnél? | `np-q44` | `pool-np-transform` |
| `N034` | 160 | NumPy | Módosul-e a forrás, ha reshape nézeten keresztül írunk? | `np-q45` | `pool-np-views` |
| `N035` | 161 | NumPy | Módosul-e a forrás az egydimenziós .T nézetén keresztül írva? | `np-q46` | `pool-np-views` |
| `N036` | 162 | NumPy | Módosul-e a forrás a np.append eredményének módosításától? | `np-q47` | `pool-np-views` |
| `N037` | 163 | NumPy | Módosul-e a forrás egyszerű a[1:2] szelet írásakor? | `np-q48` | `pool-np-views` |
| `N038` | 164 | NumPy | Módosul-e a forrás a[[1,2]] haladó indexelésből kapott tömb írásakor? | `np-q49` | `pool-np-views` |
| `N039` | 165 | NumPy | Módosul-e a forrás a[a<2] logikai maszkos kiválasztásból íráskor? | `np-q50` | `pool-np-views` |
| `N040` | 166 | NumPy | Módosul-e a forrás az a+a eredménytömb írásakor? | `np-q51` | `pool-np-views` |
| `N041` | 169 | NumPy | Mennyi np.count_nonzero(a==0) az a=np.arange(4).reshape(2,-1) példában? | `np-q52` | `pool-np-boolean` |
| `N042` | 170 | NumPy | Mennyi np.any(a==0) a négy elemből? | `np-q52` | `pool-np-boolean` |
| `N043` | 171 | NumPy | Mennyi np.all(a==0,axis=1) a kétsoros példában? | `np-q52` | `pool-np-boolean` |
| `N044` | 173 | NumPy | Mi np.unique([3,1,2]) eredménye? | `np-q53` | `pool-np-functions` |
| `N045` | 174 | NumPy | Mi np.unique([3,1,2]==0) eredménye? | `np-q54` | `pool-np-functions` |
| `N046` | 175 | NumPy | Mi np.bincount([3,1,2]) eredménye? | `np-q55` | `pool-np-functions` |
| `N047` | 176 | NumPy | Mi np.sort([3,1,2])[::-1] eredménye? | `np-q56` | `pool-np-functions` |
| `N048` | 177 | NumPy | Mi np.argsort([3,1,2]) eredménye? | `np-q57` | `pool-np-functions` |
| `N049` | 178 | NumPy | Mi a[a!=0] eredménye, ha a=np.array([3,1,2])? | `np-q58` | `pool-np-functions` |

## Minőségbiztosítás

- A CI megköveteli a pontosan 80 + 49 forrásrekordot, az egyedi kódokat és a stabil bekezdés-hozzárendelést.
- 500 generált tesztpéldán ellenőrzi a témakörök lefedését, a válaszok számát, a megoldókulcsot és egy kérdésazonosító egy teszten belüli ismétlődésének kizárását.
- A kérdőmondatos lista mellett a DOCX említi az MLP bináris/multiclass és aktivációfüggvényes változatait is; ezek az önálló példatémákhoz és a kiegészítő sablonokhoz kapcsolódnak.

**Szerkesztői korlát:** A tételes lefedettség automatizáltan ellenőrzött. Az összes válasz szemantikai, fordítási és nehézségi független szaklektorálása külön ellenőrzési feladat. Az automatizált tesztek nem bizonyítják önmagukban a teljes tartalmi minőséget.
