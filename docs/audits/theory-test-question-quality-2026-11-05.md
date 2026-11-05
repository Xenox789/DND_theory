# Theory Test 1 — részletes tesztminőség-audit (2026-11-05)

**Repo:** Xenox789/DND_theory • **alap:** main a98dd33a • **audit:** csak dokumentáció, nincs kérdésbank-módosítás.

## 1. Vizsgálat célja
A gyakorlókérdések és a rövid próbavizsga forrásközelségét, helyességét, a magyar szaknyelvet és a helyes/hibás válaszok elkülöníthetőségét vizsgáltam. Forrás: `theory_test1_examples_26autumn.docx` és a kurzus 1–6. előadásai, illetve NumPy hetek 3–6. A példadokumentum **nem feleletválasztós eredeti vizsgakérdéseket**, hanem példatémákat és feladatokat tartalmaz. A listát maga a dokumentum is *nem teljesnek* nevezi.

## 2. Eredmény számokban
| Mutató | Érték | Értelmezés |
|---|---:|---|
| Hagyományos kérdésbank | 193 | A `course.ts`-ben összefűzött kérdések |
| `official-example` jelölésű | 57 | A dokumentumhoz közvetlenül igazodónak jelölt; önmagában nem szó szerinti egyezést jelent |
| További gyakorlókérdés | 136 | Forrását külön ellenőrizni kell, **nem jelent automatikusan témán kívüliséget** |
| Minden válasz helyes | 29 | Nincs negatív disztraktor |
| Pontosan egy hamis állítás | 143 | Kiszámítható mintázat |
| Csak két válasz | 11 | Az eredeti leírás szerinti jellemző 3–6 válasz helyett |
| „Mindent kijelölök” pontozás | 100.5/193 = 52.1% | Tudás nélküli stratégia a jelenlegi megoszláson |
| „Mindent kijelölök” vizsgaközeli módban | 28/57 = 49.1% | Különösen jelentős torzítás |
| HU szöveg automatizált nyelvi gyanújelzése | 24 kérdés | **Heurisztikus jelzés**, nem 24 bizonyított fordítási hiba |
| Rövid próbavizsga sablonok | 24 | 3 per fejezet |
| Változatos állítások | 288 | 6 igaz és 6 hamis per sablon |
| Abszolút/kizáró szó az igaz állításban | 3/144 | Szerkesztési minta |
| Abszolút/kizáró szó a hamis állításban | 85/144 | A hibás válasz felismerhető pusztán stílus alapján |

### A hagyományos kérdésbankban is látható nyelvi tippelési jel

A 193 kérdés összesen **525 igazként jelölt és 188 hamisként jelölt választ** tartalmaz. A hamis válaszok közül **47/188 (~25%)**, a helyes válaszok közül **10/525 (~2%)** tartalmaz erős kizáró/abszolút szót a magyar szövegben. A hamis válaszok így nemcsak tartalmilag, hanem gyakran nyelvi mintájuk alapján is felismerhetők.

A különösen gyenge, kézzel ellenőrzött negatív opciók között:
- `q4` „lineáris programming” (a három ML-csoport felsorolásánál távoli, nem azonos típusú alternatíva);
- `log-q2` „Véges z esetén g(z) lehet 5” (szigmoid-kimenetnél nyilvánvaló);
- `gen-q17` „J_test matematikailag nem lehet skalár” (a tesztadatok rendeltetését nem méri);
- `bp-q6` „Nem kell semmilyen deriváltat számolni” (túl szélsőséges);
- `np-q53` két választás közül a szimpla eredmény felismerése, nem reprezentatív 3–6 opciós próba.

Ugyanakkor jó, forrásközeli disztraktorok például `bp-q3` **2b vs 2c** deriváltkülönbsége, `mlp-q5` **200 vs 210** paraméterszám, illetve `np-q35` a broadcasting-hiba felismerése. Ezek mintáját érdemes követni.

## 3. Kritikus, kézzel ellenőrzött hibák
| Prioritás | Azonosító | Hiba / hatás | Javítás |
|---|---|---|---|
| P0 | `np-q41` | A megadott `my_array=[[0,1],[2,3]]` közönséges Python-lista; `my_array*2+1` `TypeError`-t okoz, nem az állítólag helyes tömböt. | `my_array=np.array([[0,1],[2,3]])` vagy a választ át kell értékelni; szigorú futtatásos teszt. |
| P1 | `mlp-q7` | A kérdés *melyik képlet?*, de a három igaznak jelölt opció közül csak az egyik konkrét MLP-hipotézisképlet, a többi a paraméterhalmaz és egy általános állítás. | Kérdés átfogalmazása vagy helyes válaszok újrakulcsolása; 1–2 hasonló hibás képlet hozzáadása. |
| P1 | `q6` | HU többes számú („Mely állítások”), EN egyes számú („Which statement is true”), de három helyes kulcs van. | EN: „Which statements are true ...?” |
| P1 | `official-q2,q6,q10,q13,q19,q24,q25,q27` | Mindegyik megjelenített válasz helyes. | Adott témához illeszkedő, hiteles, nem triviális hamis állítások. |
| P1 | `np-q33,np-q36` | Vizsgaközeli NumPy-kérdések, amelyek minden opciója igaz. | Egy-két valósághű shape- vagy axis-hiba felvitele. |
| P1 | `official-q14,official-q15,np-q45,q47,q49,q50,q51,q53` | A vizsgaközeli módban összesen nyolc kétopciós kérdés. | 3–6 kapcsolódó, különböző igazságértékű állítás. |
| P1 | `gen-q18` | Arra kérdez rá, mi **nincs** a vizsgán; nem a vizsgapéldadokumentum egyik tárgyi feladata. | A teljes gyakorlóbankban tájékoztatóként, ne pontozott vizsgakérdésként szerepeljen. |
| P1 | `mock-sgd-3` | Adam/optimalizálóvariánsok: a példadokumentum nem jelöl ilyen önálló témát. | Rövid próbavizsgában cserélni az explicit batchméret / SGD példakérdések egyikére. |
| P1 | `mock-bp-2` | A teljes x=2,w=3,b=4,y=5 numerikus példa az előadásból származik, nem az example dokumentum szó szerinti feladatából. | A hivatalos `c=b²` node gradiensszabályából és `c=a+b` levezetésből készíteni variánst. |
| P1 | `mock-bp-3` | A PyTorch-autograd/optimizer-specifikus kérdések az előadásból valók, nem a mintakérdéslistából. | A példadokumentum square/add node kérdéseire fókuszálni a vizsgaközeli módban. |

## 3/a. A megfogalmazási minta kizsákmányolhatósága — szimuláció

A tényleges rövidteszt-algoritmus 3–6 állítást jelenít meg, egy–három igaz válasszal. Ezzel az eloszlással 24 sablonon, összesen **24 000 generált kérdéspéldányon** szimuláltam egy egyszerű, **tananyagismeretet nem használó** stratégiát: bejelölni mindent, amiben nem szerepel „mindig”, „soha”, „kizárólag”, „minden”, „kötelező”, „szükségképpen”, „garantálja”, „semmilyen”, „pontosan” stb.

- A kulcsszóalapú stratégia átlagos pontaránya **52,3%** volt.
- Ugyanezen változatokon a „mindent bejelölök” stratégia **10,5%**-ot ért.
- A megfogalmazási stratégia az esetek **34%**-ában teljesen jó válaszhalmazt, további **36%**-ában pontosan egy hibát adott.

Ez **szimuláció**, nem hallgatói teljesítménymérés, és nem bizonyítja, hogy valaki minden valós próbavizsgán pontosan ennyit érne el. Viszont demonstrálja, hogy a jelenlegi helyes/hamis megfogalmazás alapvetően megkülönböztethető a feladatmegoldás ismerete nélkül.

## 4. A magyar szaknyelv: kézzel megerősített javítások
- `bp-q1`: „Csomópontok (csomópontok)” és „élek (élek)” — redundáns, hibás kétnyelvű jelölés. Javaslat: „csomópontok (nodes)”, „élek (edges)”.
- `bp-q14`: „paraméterekhez (variables/parameters) (parameters) felé” — értelmetlen többszörözés, nyelvtani hiba. Javaslat: „a korábbi változókhoz és paraméterekhez (variables and parameters)”.
- `mlp-q15`: „Az kimenet (output) components összege 1.” — helyesen: „A kimeneti komponensek (output components) összege 1.”
- `mlp-q16`: „A true category helyén 1…” — helyesen: „A helyes osztály (true class) helyén 1…”.
- `mlp-q19`: „Second réteg (layer)” — helyesen: „Második réteg (second layer)”.
- `np-q6`: „A fractional part elveszhet.” — helyesen: „A törtrész (fractional part) elveszhet.”
- `np-q31`: „numpy.ndarray instance” — helyesen: „numpy.ndarray példány (instance)”.
- `np-q32`: „NEM megfelelő attribute-value típusok” — helyesen: „Mely attribútumokhoz rendelt értékek típusa nem megfelelő?”
- `np-q33`: „Integer index collapse-olja az axis-t” — helyesen: „Az egész számú index eltávolítja az indexelt tengelyt, a szeletelés megtartja.”
- `np-q35`: „Mely expressions okoznak...” — helyesen: „Mely kifejezések (expressions) okoznak alakillesztési (broadcasting) hibát?”
- `gen-q12`: „Manual trial and error” — helyesen: „Kézi próbálgatás (manual trial and error)”.
- `np-q59`: „official-practice” megfogalmazásból a hallgató hivatalos eredetiséget következtethet. Helyesen „Gyakorlópélda ...”, külön feltüntetett eredetmegjelöléssel.

## 5. Válaszminőség — mitől legyen érdemben nehéz?
A rövid próbavizsga állításai nem automatikusan jó minőségűek attól, hogy mindegyikhez 6 igaz és 6 hamis változat van. A hamis pool 85/144 eleme abszolút vagy kizáró kulcsszót használ, az igaz pool csupán 3/144 eleme. Ez a stílusbeli eltérés erős tippelési jel.

**Javasolt disztraktorok:** közel álljanak a helyes állításhoz, és egyetlen érdemi hibát tartalmazzanak: (200,4) a helyes (200,5) helyett; θ paraméter vs X adat; deriválásnál 2c a 2b helyett; sigmoid és pre-sigmoid tartomány összekeverése; training és validation szerepcsere; broadcasting jobb oldali dimenziójának eltévesztése.

**Kerülendő:** „soha nem tanul”, „csak adatbázist rendez”, „minden érték nulla”, „a teljes tömböt törli” jellegű nyilvánvalóan hamis állítások. Nem az abszolút szó önmagában hibás, hanem az aszimmetrikus és mechanikus használata.

**Kérdésszám:** 24 prompt kevés. Ha egymástól függetlenül kétszer készül 20 kérdéses teszt, a várható promptátfedés ~16,7. Javaslat: legalább 6–8 eltérő prompt fejezetenként (48–64), mind az example-témákhoz rendelve.

## 6. Témakörönkénti példadokumentum-illeszkedés — rövid próbavizsga
A „közvetlen” **példatémához való közvetlen megfelelést**, nem szó szerinti, hivatalos feleletválasztós kérdést jelent. A „kapcsolódó” a példatémából levezethető, de nem azonos mintakérdés. Az „előadási bővítés” nem tartozik a megadott példakérdések közvetlen listájához.

| ID | Fejezet | Forráskapcsolat | Javítási prioritás | Miért / milyen javítás? |
|---|---|---|---|---|
| `mock-fund-1` | fundamentals | közvetlen — Supervised / unsupervised / RL visszajelzés | P1 | 6/6 hamis mondatban abszolút szó; ugyanazon feedback-fogalmak közti árnyalt keverések kellenek (absz.: 6/6) |
| `mock-fund-2` | fundamentals | közvetlen — Hipotézis, paraméterek, címke alakja | P1 | Túl sok végletes állítás; a címke és paraméter alakjának lehetséges/gyakori esetét keverő disztraktorok (absz.: 5/6) |
| `mock-fund-3` | fundamentals | közvetlen — Regresszió / classification / clustering / denoising, loss | P1 | A hamis válaszok szinte önmagukat cáfolják; feladat–cél párosításokkal nehezíthető (absz.: 5/6) |
| `mock-linear-1` | linear | közvetlen — Lineáris regresszió geometriai alakja | P1 | A kör/parabola túl gyenge ellenpélda; 1D/2D geometria és bias közeli hibáival cserélendő (absz.: 3/6) |
| `mock-linear-2` | linear | közvetlen — 200 beteg, 4 jellemző, X és θ alakja | P2 | Viszonylag jó, számalapú mátrixalak-distraktorok; több szoros közeli dimenziótévedés (absz.: 1/6) |
| `mock-linear-3` | linear | közvetlen — MSE, gradient descent, normálegyenlet, scaling | P2 | A gradienselőjel és MSE jó tévút; a nyilvánvaló 'mindig' állításokat finomítani (absz.: 3/6) |
| `mock-log-1` | logistic | közvetlen — 100 beteg, laborértékek, logisztikus regresszió | P1 | A negatív szigmoid-output túl könnyű; X vs θ és 100×3 vs 100×2 alakok értelmesebbek (absz.: 3/6) |
| `mock-log-2` | logistic | kapcsolódó — Sigmoidból levezetett döntési határ; nincs ilyen önálló példakérdés | P2 | A 0,5-ös határ és szigmoid számok jók; a kör alakú döntési határ gyenge distractor (absz.: 1/6) |
| `mock-log-3` | logistic | közvetlen — BCE/logistic loss | P2 | BCE képletek közelállóak; egy részük nyilvánvaló/logikailag szélsőséges (absz.: 3/6) |
| `mock-gen-1` | generalization | közvetlen — Paraméterek vs hiperparaméterek, validation/test | P1 | Hiperparaméter/validation/test szerepcsere jó, de négy abszolút megfogalmazás kiszűrhető (absz.: 4/6) |
| `mock-gen-2` | generalization | közvetlen — Overfitting kockázati tényezők | P1 | Öt hamis állításban abszolút jelző; train/val görbe és adatmennyiség közeli hibái kellenek (absz.: 5/6) |
| `mock-gen-3` | generalization | kapcsolódó — Early stopping példakérdés; L2 részben előadásbeli kiegészítés | P1 | L2 és early stopping közös kérdés széles; regularizációs képlet pontos konvenciójához kötni (absz.: 4/6) |
| `mock-mlp-1` | mlp | közvetlen — MLP 20–10–1 paraméterszám | P1 | 'pontosan nulla súly' kirívó; 200/210/211 és 221 számolási hibákkal nehezíthető (absz.: 5/6) |
| `mock-mlp-2` | mlp | közvetlen — Aktivációs függvények tartománya és kimenet | P1 | BCE mint aktiváció nyilvánvalóan hibás; sigmoid/tanh/ReLU tartomány és output-loss közelibb (absz.: 5/6) |
| `mock-mlp-3` | mlp | közvetlen — Multiclass MLP és softmax | P1 | 5 hamis változat végletes; softmax sum=1, logits, one-hot és multioutput regression keverése (absz.: 5/6) |
| `mock-sgd-1` | sgd | közvetlen — SGD: 1 példa / mini-batch | P1 | 4 hamis változat végletes; epoch, batch size és update-szám tévesztése jobb (absz.: 4/6) |
| `mock-sgd-2` | sgd | közvetlen — Batchméret változtatásának következménye | P1 | Mind a hat hamis opció abszolút nyelvezettel leleplezhető (absz.: 6/6) |
| `mock-sgd-3` | sgd | előadási bővítés — Adam, optimizer.step, learning rate; nem önálló example-téma | P1 | Nincs direkt example-témája; Adam és optimizer összekeverése túlságosan nyilvánvaló (absz.: 5/6) |
| `mock-bp-1` | backprop | közvetlen — Számítási gráf, local derivative | P1 | Öt hamis állítás abszolút; láncszabály szorzás/összegzés tévútjait előtérbe (absz.: 5/6) |
| `mock-bp-2` | backprop | előadási bővítés — x=2,w=3,b=4,y=5 numerikus 6. előadásbeli példa | P2 | Érdemi numerikus nehézség, jó szoros tévutak; forrása az előadás, nem az example lista (absz.: 0/6) |
| `mock-bp-3` | backprop | előadási bővítés — PyTorch autograd/optimizer; a példadokumentum square/add node-ra fókuszál | P1 | PyTorch API az example-ön túl; square/add node gradiensekből új kérdés (absz.: 2/6) |
| `mock-np-1` | numpy | közvetlen — ndarray.shape, size, indexelés | OK | Erős alak/indexelés-alapú near-miss válaszok, megőrizhető (absz.: 0/6) |
| `mock-np-2` | numpy | közvetlen — Broadcasting, transpose, reduction | OK | Valós broadcasting és axis-keverések; kisebb nyelvi finomítás (absz.: 2/6) |
| `mock-np-3` | numpy | közvetlen — view/copy, reshape, argsort/bincount | P2 | Funkcionálisan releváns view/copy és argsort; kevesebb mindig/minden típusú tévút (absz.: 3/6) |

## 7. A 193 kérdés tételes, strukturális ellenőrzése
**Jelmagyarázat:** „example” = `official-example` tag a kódban, nem hitelesített eredeti vizsgakérdés. „HU ellenőrizendő” = automatikus mintázatjelölés, amelyet emberileg külön szükséges felülvizsgálni. „1 hamis” nem bizonyítja, hogy a válasz önmagában hibás; az egész bankban együtt viszont kihasználható mintázat.

| ID | Állomány | Példatéma tag | Opciók | Igaz | Hamis | Ellenőrzési jelzések |
|---|---|---|---:|---:|---:|---|
| `q1` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q2` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q3` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q4` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q5` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q6` | course.ts | nincs | 4 | 3 | 1 | 1 hamis; EN kérdés egyes számú |
| `q7` | course.ts | nincs | 4 | 2 | 2 | — |
| `q8` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q9` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q10` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q11` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q12` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q13` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q14` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `q15` | course.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q1` | linearRegression.ts | nincs | 5 | 3 | 2 | — |
| `lr-q2` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q3` | linearRegression.ts | nincs | 5 | 4 | 1 | 1 hamis |
| `lr-q4` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q5` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q6` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q7` | linearRegression.ts | nincs | 4 | 2 | 2 | — |
| `lr-q8` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q9` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q10` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q11` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q12` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `lr-q13` | linearRegression.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `lr-q14` | linearRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q1` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q2` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q3` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q4` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q5` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q6` | logisticRegression.ts | nincs | 5 | 4 | 1 | 1 hamis |
| `log-q7` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q8` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q9` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q10` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q11` | logisticRegression.ts | nincs | 4 | 1 | 3 | — |
| `log-q12` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `log-q13` | logisticRegression.ts | nincs | 4 | 4 | 0 | mind igaz |
| `log-q14` | logisticRegression.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q1` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q2` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q3` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q4` | generalizationQuestions.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `gen-q5` | generalizationQuestions.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `gen-q6` | generalizationQuestions.ts | nincs | 4 | 4 | 0 | mind igaz |
| `gen-q7` | generalizationQuestions.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `gen-q8` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q9` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q10` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q11` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q12` | generalizationQuestions.ts | nincs | 5 | 5 | 0 | mind igaz |
| `gen-q13` | generalizationQuestions.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `gen-q14` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q15` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q16` | generalizationQuestions.ts | nincs | 4 | 4 | 0 | mind igaz |
| `gen-q17` | generalizationQuestions.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `gen-q18` | generalizationQuestions.ts | nincs | 4 | 2 | 2 | vizsgahatár metakérdés |
| `mlp-q1` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q2` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q3` | mlp.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `mlp-q4` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q5` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q6` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q7` | mlp.ts | nincs | 3 | 3 | 0 | kérdés–válasz eltérés; mind igaz; HU ellenőrizendő |
| `mlp-q8` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q9` | mlp.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `mlp-q10` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q11` | mlp.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `mlp-q12` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q13` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q14` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q15` | mlp.ts | nincs | 4 | 4 | 0 | mind igaz; HU ellenőrizendő |
| `mlp-q16` | mlp.ts | nincs | 4 | 4 | 0 | mind igaz |
| `mlp-q17` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q18` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `mlp-q19` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `mlp-q20` | mlp.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `sgd-q1` | sgd.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `sgd-q2` | sgd.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `sgd-q3` | sgd.ts | nincs | 2 | 1 | 1 | 2 opció; 1 hamis |
| `sgd-q4` | sgd.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `sgd-q5` | sgd.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `sgd-q6` | sgd.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `sgd-q7` | sgd.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `sgd-q8` | sgd.ts | nincs | 5 | 5 | 0 | mind igaz |
| `sgd-q9` | sgd.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `bp-q1` | backprop.ts | nincs | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `bp-q2` | backprop.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `bp-q3` | backprop.ts | nincs | 4 | 1 | 3 | — |
| `bp-q4` | backprop.ts | nincs | 3 | 1 | 2 | — |
| `bp-q5` | backprop.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `bp-q6` | backprop.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `bp-q7` | backprop.ts | nincs | 4 | 4 | 0 | mind igaz |
| `bp-q8` | backprop.ts | nincs | 4 | 4 | 0 | mind igaz |
| `bp-q9` | backprop.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `bp-q10` | backprop.ts | nincs | 3 | 1 | 2 | — |
| `bp-q11` | backprop.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `bp-q12` | backprop.ts | nincs | 5 | 5 | 0 | mind igaz |
| `bp-q13` | backprop.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `bp-q14` | backprop.ts | nincs | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q1` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q2` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q3` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q4` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q5` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q6` | numpyQuestionsCore.ts | nincs | 3 | 2 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q7` | numpyQuestionsCore.ts | nincs | 4 | 4 | 0 | mind igaz |
| `np-q8` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q9` | numpyQuestionsCore.ts | nincs | 3 | 1 | 2 | — |
| `np-q10` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q11` | numpyQuestionsCore.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `np-q12` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q13` | numpyQuestionsCore.ts | nincs | 2 | 1 | 1 | 2 opció; 1 hamis; HU ellenőrizendő |
| `np-q14` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q15` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q16` | numpyQuestionsCore.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `np-q17` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q18` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q19` | numpyQuestionsCore.ts | nincs | 4 | 4 | 0 | mind igaz |
| `np-q20` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q21` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q22` | numpyQuestionsCore.ts | nincs | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q23` | numpyQuestionsCore.ts | nincs | 3 | 2 | 1 | 1 hamis |
| `np-q24` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis |
| `np-q25` | numpyQuestionsCore.ts | nincs | 3 | 3 | 0 | mind igaz; HU ellenőrizendő |
| `np-q26` | numpyQuestionsCore.ts | nincs | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q27` | numpyQuestionsCore.ts | nincs | 3 | 3 | 0 | mind igaz; HU ellenőrizendő |
| `np-q28` | numpyQuestionsCore.ts | nincs | 3 | 3 | 0 | mind igaz |
| `np-q29` | numpyQuestionsCore.ts | nincs | 3 | 3 | 0 | mind igaz |
| `np-q30` | numpyQuestionsCore.ts | nincs | 4 | 2 | 2 | — |
| `np-q31` | numpyQuestionsExamples.ts | example | 5 | 4 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q32` | numpyQuestionsExamples.ts | example | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q33` | numpyQuestionsExamples.ts | example | 4 | 4 | 0 | mind igaz; HU ellenőrizendő |
| `np-q34` | numpyQuestionsExamples.ts | example | 4 | 3 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q35` | numpyQuestionsExamples.ts | example | 4 | 2 | 2 | HU ellenőrizendő |
| `np-q36` | numpyQuestionsExamples.ts | example | 4 | 4 | 0 | mind igaz; HU ellenőrizendő |
| `np-q37` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q38` | numpyQuestionsExamples.ts | example | 3 | 2 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q39` | numpyQuestionsExamples.ts | example | 3 | 2 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q40` | numpyQuestionsExamples.ts | example | 4 | 3 | 1 | 1 hamis |
| `np-q41` | numpyQuestionsExamples.ts | example | 3 | 2 | 1 | TÁRGYI HIBA; 1 hamis; HU ellenőrizendő |
| `np-q42` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q43` | numpyQuestionsExamples.ts | example | 3 | 2 | 1 | 1 hamis; HU ellenőrizendő |
| `np-q44` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q45` | numpyQuestionsExamples.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q46` | numpyQuestionsExamples.ts | example | 3 | 2 | 1 | 1 hamis |
| `np-q47` | numpyQuestionsExamples.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q48` | numpyQuestionsExamples.ts | example | 3 | 2 | 1 | 1 hamis |
| `np-q49` | numpyQuestionsExamples.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q50` | numpyQuestionsExamples.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q51` | numpyQuestionsExamples.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q52` | numpyQuestionsExamples.ts | example | 4 | 3 | 1 | 1 hamis |
| `np-q53` | numpyQuestionsExamples.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `np-q54` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q55` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q56` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q57` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q58` | numpyQuestionsExamples.ts | example | 3 | 1 | 2 | — |
| `np-q59` | numpyQuestionsExamples.ts | nincs | 4 | 4 | 0 | mind igaz; HU ellenőrizendő |
| `np-q60` | numpyQuestionsExamples.ts | nincs | 4 | 4 | 0 | mind igaz; HU ellenőrizendő |
| `official-q1` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q2` | officialTheoryQuestions.ts | example | 3 | 3 | 0 | mind igaz |
| `official-q3` | officialTheoryQuestions.ts | example | 3 | 2 | 1 | 1 hamis |
| `official-q4` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q5` | officialTheoryQuestions.ts | example | 3 | 2 | 1 | 1 hamis |
| `official-q6` | officialTheoryQuestions.ts | example | 4 | 4 | 0 | mind igaz |
| `official-q7` | officialTheoryQuestions.ts | example | 3 | 2 | 1 | 1 hamis |
| `official-q8` | officialTheoryQuestions.ts | example | 3 | 2 | 1 | 1 hamis |
| `official-q9` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q10` | officialTheoryQuestions.ts | example | 5 | 5 | 0 | mind igaz |
| `official-q11` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q12` | officialTheoryQuestions.ts | example | 3 | 2 | 1 | 1 hamis |
| `official-q13` | officialTheoryQuestions.ts | example | 5 | 5 | 0 | mind igaz |
| `official-q14` | officialTheoryQuestions.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `official-q15` | officialTheoryQuestions.ts | example | 2 | 1 | 1 | 2 opció; 1 hamis |
| `official-q16` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q17` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q18` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q19` | officialTheoryQuestions.ts | example | 5 | 5 | 0 | mind igaz |
| `official-q20` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q21` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q22` | officialTheoryQuestions.ts | example | 5 | 4 | 1 | 1 hamis |
| `official-q23` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q24` | officialTheoryQuestions.ts | example | 5 | 5 | 0 | mind igaz |
| `official-q25` | officialTheoryQuestions.ts | example | 4 | 4 | 0 | mind igaz |
| `official-q26` | officialTheoryQuestions.ts | example | 4 | 3 | 1 | 1 hamis |
| `official-q27` | officialTheoryQuestions.ts | example | 4 | 4 | 0 | mind igaz |
| `official-q28` | officialTheoryQuestions.ts | example | 4 | 1 | 3 | — |
| `official-q29` | officialTheoryQuestions.ts | example | 3 | 1 | 2 | — |

## 8. Javítási sorrend és minőségi kapuk
1. **P0:** `np-q41` futtatással ellenőrzött javítása, majd a NumPy-kódkérdések automatikus végrehajtási tesztje.
2. **P1:** `mlp-q7` és `q6` kérdés–válasz egyezése; a 11 kétopciós és a 29 minden-igaz kérdés átírása.
3. **P1:** A 143 egyetlen hamis opciójú kérdés válaszpooljának bővítése 1–2 szorosan kapcsolódó, forrásból ellenőrizhető téves opcióval; nem automatikus, nyelvi sablonokkal generált hibákkal.
4. **P1:** A 24 rövid próbavizsgás prompt 12-12 opciójának páronkénti szemantikai ellenőrzése (összes 288 állítás); elsőként a 85 abszolút jelzővel könnyen felismerhető hibás állítás javítása.
5. **P1:** Minden vizsgaközeli kérdéshez kötelező `exampleTopicId` vagy konkrét DOCX példakérdés-hivatkozás; előadási kiegészítések külön tanuló/extended módban.
6. **P2:** Szakmai HU fordítás lektorálása (különösen NumPy, MLP, backprop), English keyword csak szükséges esetben, zárójelben.
7. **P2:** 48–64 különböző mock prompt és nehézség-ellenőrzés; ne ismétlődjön lényegében ugyanaz a 20 kérdés.
8. **Kapu:** minden kérdésnél 3–6 opció; legalább 1 igaz és a gyakorlótesztekben legalább 1 hamis; helyes kulcsok kézi szakmai ellenőrzése; kettős magyar/angol jelentésegyezés; két egymástól független ellenőrző; NumPy-kódok futtatásos tesztje.

**Audit státusza:** A felsorolt strukturális hibák minden kérdésre programmatikusan ellenőrzöttek. A kritikus példák manuálisan és ahol lehetett, futtatással ellenőrzöttek. Az egyes lehetséges magyarítási hibajelzések nem helyettesítik mind a 193 kérdés és 288 állítás független szakmai lektorálását. Az audit **nem jelent javított kérdésbankot**.
