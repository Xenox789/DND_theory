import type { LessonContentSupplement } from "../lessonEnrichment";

export const sgdExtras: Record<string, LessonContentSupplement> = {
  "batch-gradient-descent": { ex: [
    "Full-batch módszernél minden lépésben az összes tanítópélda gradiensét átlagoljuk. 1000 példánál ez 1000 példát jelent frissítésenként.",
    "Full-batch optimization averages gradients over every example, so 1000 examples are processed per update."
  ] },
  "why-sgd": { ex: [
    "Ha 1000 példát 50 elemű mini-batchekre bontunk, egy epoch körülbelül 20 frissítést tartalmaz. A kisebb batch gyorsabb frissítést tehet lehetővé, de a teljes gradiensnek csak becslését adja.",
    "With 1000 samples and batch size 50, an epoch yields about 20 updates. Mini-batches estimate the full gradient rather than calculating it exactly."
  ] },
  "batch-size-tradeoff": { ex: [
    "Négy példára a gradiensek [−4,−2,2,4]. A teljes átlag 0; egyetlen mintán mérve viszont az eredmény −4, −2, 2 vagy 4 lehet. A kisebb batch zajosabb lehet.",
    "For per-example gradients [−4,−2,2,4], the full mean is 0 while a single-example estimate can take any listed value. Smaller batches can be noisier."
  ] },
  "learning-rate-batch": { ex: [
    "A +5 vagy −5 zajos gradiens α=0,2 mellett 1 egységnyi, α=0,02 mellett 0,1 egységnyi lépést okoz. Ezért kisebb batch mellett gyakran segíthet kisebb tanulási ráta.",
    "A noisy gradient of +5 or −5 creates steps of magnitude 1 with α=0.2 but 0.1 with α=0.02; smaller steps may improve stability."
  ] },
  "gpu-memory": { ex: [
    "Szemléltetésként ha egy mintához 10 MB aktivációt tárolunk, 32 elem 320 MB, 64 elem 640 MB helyet igényelhet csak az aktivációkra. A súlyok és gradiensek ezen felül számítanak.",
    "If each sample needs an illustrative 10 MB of activation storage, batch sizes 32 and 64 need around 320 and 640 MB of activations, excluding model and gradient memory."
  ] },
  "sgd-variants": { ex: [
    "SGD: aktuális gradiens. Momentum: korábbi irányok hatását is felhasználja. Adam: momentumjellegű becslés és adaptív skálázás. Az előadás ezeknek a célját és nevét emeli ki.",
    "SGD uses the current gradient; momentum incorporates previous directions; Adam adds adaptive scaling. The lecture emphasizes their names and motivations."
  ] }
};
