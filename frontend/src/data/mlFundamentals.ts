import type { Lesson } from "../types";

export const mlFundamentalsLesson: Lesson = {
  id: "ml-fundamentals",
  title: {
    hu: "A gépi tanulás alapfogalmai",
    en: "Machine Learning Fundamentals"
  },
  subtitle: {
    hu: "Mit tanul a modell, miből tanul, mit jelent a bemenet, a címke, a hipotézisfüggvény és a veszteségfüggvény?",
    en: "What a model learns, what it learns from, and how inputs, labels, hypothesis functions, and loss functions fit together"
  },
  source: "Lectures 1–2",
  sections: [
    {
      id: "why-ml",
      title: {
        hu: "Mikor érdemes gépi tanulást használni?",
        en: "When is Machine Learning useful?"
      },
      body: {
        hu: "A tananyag három tipikus helyzetet emel ki, amikor a hagyományos, kézzel megírt algoritmus nem ideális: amikor nagyon sok, kissé eltérő esetet kellene külön szabályokkal lefedni; amikor nem ismerünk jó explicit algoritmikus megoldást; illetve amikor a feladatot könnyebb példákon keresztül megadni, mint pontos szabályok formájában. A gépi tanulás (machine learning) ilyenkor nem egy kész szabálylistát kap, hanem egy paraméterezett modellt (model), amelynek a paramétereit (parameters) példák alapján állítjuk be.",
        en: "The course highlights three typical situations where a hand-written classical algorithm is not ideal: when there are many slightly different cases, when an explicit algorithmic solution is unknown or difficult, and when the task is easier to specify through examples than through exact rules. Machine learning then uses a parameterized model whose parameters are adjusted from examples."
      },
      why: {
        hu: "Ez a gondolat választja el a gépi tanulást a hagyományos programozástól. A programozó továbbra is megadja a modell szerkezetét és a tanítási eljárást, de nem ő írja be kézzel a végső döntési szabály minden részletét.",
        en: "This idea separates machine learning from classical programming. The programmer still defines the model structure and training procedure, but does not manually encode every detail of the final decision rule."
      },
      intuition: {
        hu: "Képfelismerésnél nehéz lenne felsorolni, hogy pontosan milyen pixelmintázat jelent kutyát minden fényviszonyban és nézőpontból. Sok címkézett képet viszont tudunk mutatni a modellnek.",
        en: "For image recognition, it would be difficult to enumerate exactly which pixel patterns define a dog under every lighting condition and viewpoint. It is much easier to provide many labeled examples."
      },
      connections: {
        hu: "A későbbi lineáris regresszióban (linear regression), logisztikus regresszióban (logistic regression) és neurális hálózatokban (neural networks) ugyanaz a séma tér vissza: választunk egy modellt, meghatározzuk a hibát mérő veszteségfüggvényt, majd a modell paramétereit úgy változtatjuk, hogy a veszteség csökkenjen.",
        en: "The same pattern returns in linear regression, logistic regression, and neural networks: choose a model, define a loss function, and adjust model parameters so the loss decreases."
      },
      realWorld: {
        hu: "Szemléltető példa: spam-szűrésnél nem kézzel akarunk minden lehetséges spam-szabályt megírni. Ehelyett korábban spamnek és nem spamnek jelölt e-mailekből taníthatunk modellt.",
        en: "Illustrative example: for spam filtering, instead of hand-writing every possible spam rule, we can train a model from emails previously labeled as spam or non-spam."
      },
      examTrap: {
        hu: "A gépi tanulás nem azt jelenti, hogy nincs algoritmus. Van tanítási algoritmus (learning algorithm); az algoritmus feladata a modell megfelelő paramétereinek megtalálása.",
        en: "Machine learning does not mean there is no algorithm. A learning algorithm is still used; its job is to find suitable model parameters."
      },
      keyTerms: [
        { term: "machine learning", hu: "gépi tanulás" },
        { term: "model", hu: "modell" },
        { term: "parameter", hu: "paraméter" },
        { term: "learning algorithm", hu: "tanítási algoritmus" }
      ]
    },
    {
      id: "data-point",
      title: {
        hu: "Mit tartalmaz egy felügyelt tanítási példa?",
        en: "What is inside one supervised training example?"
      },
      body: {
        hu: "Felügyelt tanulásnál (supervised learning) a tanítóminta bemenet–címke párokból áll. Egy adatpontot általában (x, y) alakban írunk. Az x a bemenet (input), amely egy vagy több jellemzőt (feature) tartalmazhat. Az y a címke (label), vagyis az adott példához tartozó helyes vagy elvárt kimenet. A modell által számított kimenetet ŷ jelöli; ez az előrejelzés vagy becslés (prediction).",
        en: "In supervised learning, the training sample consists of input-label pairs. A data point is typically written as (x, y). x is the input and may contain one or more features. y is the label, meaning the correct or expected output. The model output is denoted by ŷ, the prediction."
      },
      why: {
        hu: "A legfontosabb különbség: az adat és a modell paraméterei nem ugyanazok. A jellemzők értékei az x vagy X adatszerkezetben vannak; a megtanulandó modellparamétereket később tipikusan θ, w és b jelöli.",
        en: "The key distinction is that data and model parameters are not the same thing. Feature values live in x or X, while learnable model parameters are typically denoted by θ, w, and b."
      },
      formula: {
        hu: "(x, y) → x: bemenet (input), y: címke (label), ŷ: előrejelzés (prediction)",
        en: "(x, y) → x: input, y: label, ŷ: prediction"
      },
      formulaTerms: [
        { symbol: "x", hu: "A modellnek átadott bemenet (input). Több jellemző esetén vektor is lehet.", en: "The model input. With multiple features it can be a vector." },
        { symbol: "y", hu: "A valódi vagy elvárt kimenet, azaz címke (label).", en: "The true or expected output, i.e. the label." },
        { symbol: "ŷ", hu: "A modell jelenlegi paramétereivel előállított becslés (prediction).", en: "The prediction produced using the model's current parameters." }
      ],
      workedExample: {
        hu: "Szemléltető példa: lakásár-becslésnél x = [alapterület, szobák száma, távolság a központtól], y = a tényleges eladási ár, ŷ = a modell által becsült ár.",
        en: "Illustrative example: for apartment-price prediction, x = [floor area, number of rooms, distance from city center], y = actual sale price, and ŷ = predicted price."
      },
      examTrap: {
        hu: "A jellemzőértékek (features) nem a θ paramétervektor elemei. Az x/X az adatot, a θ pedig a modell tanulható paramétereit tartalmazza.",
        en: "Feature values are not elements of the θ parameter vector. x/X contains data, while θ contains learnable model parameters."
      },
      keyTerms: [
        { term: "input", hu: "bemenet" },
        { term: "feature", hu: "jellemző" },
        { term: "label", hu: "címke" },
        { term: "prediction", hu: "előrejelzés / becslés" }
      ]
    },
    {
      id: "hypothesis",
      title: {
        hu: "A hipotézisfüggvény: hogyan készít a modell becslést?",
        en: "The hypothesis function: how does the model make a prediction?"
      },
      body: {
        hu: "A hipotézisfüggvény (hypothesis function) a modell bemenet–kimenet leképezése. A jelölés hθ(x) azt fejezi ki, hogy a kimenet az x bemenettől és a θ modellparaméterektől függ. A függvény eredménye az ŷ becslés. A tanítás során nem magát az x bemenetet változtatjuk, hanem olyan θ paramétereket keresünk, amelyek mellett a becslések jól közelítik a címkéket.",
        en: "The hypothesis function is the model's input-output mapping. hθ(x) emphasizes that the output depends on input x and model parameters θ. Its result is the prediction ŷ. During training we do not change x; we search for θ values that make predictions close to labels."
      },
      why: {
        hu: "A hipotézisfüggvény választja szét a modell szerkezetét és a konkrét paraméterértékeket. Ugyanaz a függvényforma sok különböző viselkedést tud megvalósítani attól függően, milyen θ értékeket tanulunk meg.",
        en: "The hypothesis function separates model structure from concrete parameter values. The same functional form can behave very differently depending on the learned θ values."
      },
      formula: {
        hu: "hθ(x) = ŷ",
        en: "hθ(x) = ŷ"
      },
      formulaTerms: [
        { symbol: "h", hu: "A modell által használt leképezés.", en: "The mapping implemented by the model." },
        { symbol: "θ", hu: "A modell tanulható paramétereinek összessége.", en: "The collection of learnable model parameters." },
        { symbol: "x", hu: "A bemenet (input).", en: "The input." },
        { symbol: "ŷ", hu: "A modell becslése (prediction).", en: "The model prediction." }
      ],
      connections: {
        hu: "Lineáris regressziónál a hipotézis egy lineáris függvény. Logisztikus regressziónál egy lineáris kifejezést szigmoid függvény (sigmoid) alakít 0 és 1 közötti értékké. Többrétegű neurális hálózatnál a hipotézis sok egymásra épülő rétegből áll.",
        en: "For linear regression the hypothesis is linear. Logistic regression applies a sigmoid to a linear expression. In a multilayer neural network the hypothesis is composed of many layers."
      },
      examTrap: {
        hu: "A hipotézisfüggvény kimenetének alakja a feladattól függ. Lehet skalár vagy vektor; nem igaz, hogy minden modell egyetlen skalárt ad vissza.",
        en: "The shape of the hypothesis output depends on the task. It may be a scalar or vector; not every model must return one scalar."
      },
      keyTerms: [
        { term: "hypothesis function", hu: "hipotézisfüggvény" },
        { term: "model parameters", hu: "modellparaméterek" }
      ]
    },
    {
      id: "loss",
      title: {
        hu: "A veszteségfüggvény: hogyan mérjük a hibát?",
        en: "The loss function: how do we measure error?"
      },
      body: {
        hu: "A veszteségfüggvény (loss function) egyetlen számmal fejezi ki, mennyire rosszak a modell becslései az adott paraméterértékek mellett. A Lecture 1 hangsúlyozza, hogy a veszteség teljes értéke skalár (scalar). Ha a címke több komponensből áll, az eltéréseket előbb valamilyen összesítő művelettel – például normával – egyetlen számmá kell alakítani.",
        en: "The loss function expresses with a single number how poor the model's predictions are for the current parameter values. Lecture 1 emphasizes that the overall loss is scalar. If a label has multiple components, the differences must first be aggregated, for example using a norm."
      },
      why: {
        hu: "Az optimalizálásnak egy összehasonlítható célérték kell. Ha két paraméterbeállítás közül az egyik kisebb veszteséget ad, azt tekinthetjük jobbnak az adott veszteségfüggvény szerint.",
        en: "Optimization needs a comparable objective value. If one parameter setting gives a smaller loss than another, it is considered better according to that loss function."
      },
      formula: {
        hu: "J(θ) → skalár hibamérték; tanítás célja: olyan θ keresése, amely csökkenti J(θ)-t",
        en: "J(θ) → scalar error measure; training goal: find θ values that reduce J(θ)"
      },
      formulaTerms: [
        { symbol: "J", hu: "A veszteségfüggvény (loss function).", en: "The loss function." },
        { symbol: "θ", hu: "Azok a modellparaméterek, amelyek mellett a veszteséget kiértékeljük.", en: "The model parameters at which the loss is evaluated." },
        { symbol: "J(θ)", hu: "A jelenlegi paraméterekhez tartozó skalár veszteségérték.", en: "The scalar loss value for the current parameters." }
      ],
      intuition: {
        hu: "Gondolj rá hibapontszámként. Tökéletes becslésnél a tananyag egyszerű példájában a veszteség 0; nagyobb becslési hiba nagyobb veszteséget eredményez.",
        en: "Think of it as an error score. In the course's simple example, a perfect prediction gives zero loss; larger prediction error gives larger loss."
      },
      connections: {
        hu: "Regressziónál később négyzetes hibát használunk. Bináris osztályozásnál bináris keresztentrópiát (binary cross-entropy, BCE) használunk. A feladat típusa tehát meghatározza, milyen veszteségfüggvény értelmes.",
        en: "Regression later uses squared error, while binary classification uses binary cross-entropy. The task therefore determines which loss function is appropriate."
      },
      examTrap: {
        hu: "A tanítás során nem X-et, nem a minták számát és nem egyszerűen a paraméterek numerikus nagyságát minimalizáljuk. A cél a választott veszteségfüggvény J(θ) értékének csökkentése.",
        en: "Training does not minimize X, the number of examples, or simply the numerical size of the parameters. It minimizes the chosen loss J(θ)."
      },
      keyTerms: [
        { term: "loss function", hu: "veszteségfüggvény" },
        { term: "scalar", hu: "skalár" },
        { term: "objective", hu: "célfüggvény" }
      ]
    },
    {
      id: "three-groups",
      title: {
        hu: "A gépi tanulás három fő csoportja",
        en: "Three main groups of Machine Learning"
      },
      body: {
        hu: "A tananyag három fő csoportot különít el: felügyelt tanulást (supervised learning), felügyelet nélküli tanulást (unsupervised learning) és megerősítéses tanulást (reinforcement learning). A különbség főként abban van, milyen visszajelzés áll rendelkezésre a tanulás során.",
        en: "The course separates machine learning into supervised learning, unsupervised learning, and reinforcement learning. The main difference is the kind of feedback available during learning."
      },
      why: {
        hu: "A paradigma meghatározza, milyen adatot adunk a rendszernek és milyen célfüggvény vagy tanulási jel használható. Ugyanaz a bemenet más tanulási helyzetet jelenthet attól függően, hogy van-e hozzá címke vagy más visszajelzés.",
        en: "The paradigm determines what data is provided and what learning signal is available. The same input can represent a different learning setup depending on whether labels or other feedback are available."
      },
      workedExample: {
        hu: "Felügyelt tanulás: képekhez megadjuk, melyik osztályba tartoznak. Felügyelet nélküli tanulás: címke nélkül keresünk csoportokat az adatokban. Megerősítéses tanulás: egy ügynök (agent) cselekszik egy környezetben (environment), és a következményekből kap visszajelzést.",
        en: "Supervised learning: images come with class labels. Unsupervised learning: groups are discovered without labels. Reinforcement learning: an agent acts in an environment and receives feedback from consequences."
      },
      examTrap: {
        hu: "A megerősítéses tanulás visszajelzése nem ugyanaz, mint amikor minden egyes bemenethez előre megadjuk a helyes címkét felügyelt tanulásnál.",
        en: "Reinforcement-learning feedback is not the same as providing a correct label for every input as in supervised learning."
      },
      keyTerms: [
        { term: "supervised learning", hu: "felügyelt tanulás" },
        { term: "unsupervised learning", hu: "felügyelet nélküli tanulás" },
        { term: "reinforcement learning", hu: "megerősítéses tanulás" }
      ]
    },
    {
      id: "tasks",
      title: {
        hu: "Regresszió, osztályozás és felügyelet nélküli feladatok",
        en: "Regression, classification, and unsupervised tasks"
      },
      body: {
        hu: "Felügyelt tanulásban a tananyag két alapfeladatot különít el. Regressziónál (regression) a címke folytonos érték, például egy mérési eredmény vagy ár. Osztályozásnál (classification) a címke diszkrét kategória. A mintakérdések a klaszterezést (clustering), a dimenziócsökkentést (dimensionality reduction) és a zajcsökkentést (denoising) felügyelet nélküli feladatként kezelik.",
        en: "In supervised learning, the course distinguishes two basic tasks. Regression uses continuous labels, while classification uses discrete categories. The example questions treat clustering, dimensionality reduction, and denoising as unsupervised tasks."
      },
      why: {
        hu: "A feladattípus meghatározza a modell megfelelő kimenetét és később a használható veszteségfüggvényt is. Például egy 0 és 1 közötti valószínűség osztályozásnál természetes, míg tetszőleges folytonos szám regressziónál.",
        en: "The task type determines the appropriate model output and later the loss function. A probability between 0 and 1 is natural for classification, while an arbitrary continuous value is natural for regression."
      },
      connections: {
        hu: "A lineáris regresszió a regressziós feladatokhoz, a logisztikus regresszió pedig – a neve ellenére – bináris osztályozáshoz kapcsolódik. Ez a Theory Test egyik visszatérő megkülönböztetése.",
        en: "Linear regression is used for regression tasks, while logistic regression—despite its name—is used for binary classification. This distinction appears repeatedly in the Theory Test."
      },
      examTrap: {
        hu: "A „regression” szó a logisztikus regresszió nevében nem jelenti azt, hogy maga a módszer regressziós feladatot old meg. A tananyag szerint a logisztikus regresszió bináris osztályozó.",
        en: "The word 'regression' in logistic regression does not mean the method solves a regression task. In the course, logistic regression is a binary classifier."
      },
      keyTerms: [
        { term: "regression", hu: "regresszió" },
        { term: "classification", hu: "osztályozás" },
        { term: "clustering", hu: "klaszterezés" },
        { term: "dimensionality reduction", hu: "dimenziócsökkentés" },
        { term: "denoising", hu: "zajcsökkentés" }
      ]
    }
  ]
};
