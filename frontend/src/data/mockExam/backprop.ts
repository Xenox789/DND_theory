import { createMockQuestion } from "./types";

export const backpropMocks = [
  createMockQuestion({
    id: "mock-bp-1",
    chapter: "backprop",
    prompt: { hu: "Mely állítások helyesek a számítási gráfra és a láncszabályra?", en: "Which statements about computational graphs and the chain rule are correct?" },
    trueFacts: [
      ["A számítási gráf összetett kifejezéseket elemi műveletekre bont.", "A computational graph decomposes expressions into elementary operations."],
      ["A forward pass a bemenetektől a végső veszteségig halad.", "The forward pass computes from inputs toward the final loss."],
      ["A backward pass a végső veszteségtől a bemeneti változók felé terjeszti a gradienseket.", "The backward pass propagates gradients from the loss toward earlier variables."],
      ["A láncszabály egymásba ágyazott függvények deriválására használható.", "The chain rule differentiates compositions of functions."],
      ["Egy csomópont lokális deriváltja és a bejövő gradiens összeszorozható.", "A node's local derivative can multiply its incoming gradient."],
      ["Ha egy változó több útvonalon hat a veszteségre, az útvonalak hozzájárulásait összegezzük.", "If a variable reaches the loss through several paths, the contributions are added."]
    ],
    falseFacts: [
      ["A számítási gráf kizárólag adatbázisrekordok rendezésére szolgál.", "A computational graph is used only to sort database records."],
      ["A forward pass mindig a veszteségből indul és a bemenet felé számol.", "The forward pass always starts at the loss and moves toward inputs."],
      ["A backprop minden lokális deriváltat figyelmen kívül hagy.", "Backprop ignores every local derivative."],
      ["A láncszabály szerint a belső és külső deriváltak soha nem szorozhatók össze.", "Under the chain rule, outer and inner derivatives must never be multiplied."],
      ["Minden csomópont a számítási gráf aktuális kimeneti értékét küldi vissza deriváltként.", "Every graph node uses its output value itself as the derivative."],
      ["Ha két útvonalon jut vissza gradiens, az egyik útvonalat kötelező eldobni.", "If gradients return along two paths, one contribution must be discarded."]
    ],
    explanation: { hu: "A forward pass köztes értékeket számol, a backward pass a láncszabály alapján kombinálja a lokális deriváltakat és az útvonalak hozzájárulásait.", en: "Forward computes intermediate values; backward combines local derivatives by the chain rule and accumulates contributions over paths." }
  }),
  createMockQuestion({
    id: "mock-bp-2",
    chapter: "backprop",
    prompt: { hu: "Ha J=(wx+b−y)², x=2, w=3, b=4, y=5, mely számítások helyesek?", en: "For J=(wx+b−y)² with x=2, w=3, b=4, y=5, which calculations are correct?" },
    trueFacts: [
      ["Az előremenetben wx=6.", "The forward multiplication wx equals 6."],
      ["A modell becslése ŷ=wx+b=10.", "The model prediction ŷ=wx+b is 10."],
      ["A veszteség értéke J=25.", "The loss value J equals 25."],
      ["A w szerinti derivált ∂J/∂w=20.", "The derivative with respect to w is ∂J/∂w=20."],
      ["A b szerinti derivált ∂J/∂b=10.", "The derivative with respect to b is ∂J/∂b=10."],
      ["Ha z=y−ŷ, akkor z=−5 és ∂J/∂z=−10.", "If z=y−ŷ then z=−5 and ∂J/∂z=−10."]
    ],
    falseFacts: [
      ["A wx szorzás eredménye ebben a példában 5.", "The product wx equals 5 in this example."],
      ["A modell becslése ŷ=3, mert b az eltolás.", "The prediction ŷ equals 3 because b is the bias."],
      ["A veszteség J=−5, mert a hibát nem négyzetre emeljük.", "The loss is J=−5 because the error is not squared."],
      ["A w szerinti derivált ∂J/∂w=2.", "The weight derivative ∂J/∂w equals 2."],
      ["A b szerinti derivált ∂J/∂b=0.", "The bias derivative ∂J/∂b equals 0."],
      ["A z=y−ŷ köztes érték +5, ezért ∂J/∂z=+10.", "The intermediate z=y−ŷ equals +5 and its gradient is +10."]
    ],
    explanation: { hu: "q=wx=6; ŷ=10; z=y−ŷ=−5; J=25. Backward: ∂J/∂ŷ=10, így ∂J/∂w=10x=20 és ∂J/∂b=10.", en: "q=6, prediction=10, z=−5 and loss=25. Backward gives ∂J/∂ŷ=10, hence ∂J/∂w=10x=20 and ∂J/∂b=10." }
  }),
  createMockQuestion({
    id: "mock-bp-3",
    chapter: "backprop",
    prompt: { hu: "Mely állítások igazak a lokális gradiensszabályokra és a PyTorch-os tanításra?", en: "Which statements about local gradient rules and PyTorch training are correct?" },
    trueFacts: [
      ["Ha c=b², akkor ∂c/∂b=2b.", "For c=b², the local derivative dc/db equals 2b."],
      ["Ha c=a+b, akkor ∂c/∂a=1.", "For c=a+b, dc/da equals 1."],
      ["Ha c=a·b, akkor ∂c/∂a=b.", "For c=a·b, dc/da equals b."],
      ["PyTorchban a loss.backward() kiszámíthatja a paraméterek gradienseit.", "In PyTorch loss.backward() can compute parameter gradients."],
      ["Az optimizer.step() módosíthatja a paramétereket a gradiensek alapján.", "optimizer.step() can update parameters from gradients."],
      ["Az optimizer.zero_grad() a korábbi, felhalmozott gradiensek törlésére használható.", "optimizer.zero_grad() can clear accumulated gradients."]
    ],
    falseFacts: [
      ["Ha c=b², akkor ∂c/∂b mindig 2c.", "For c=b² the derivative dc/db is always 2c."],
      ["Ha c=a+b, akkor ∂c/∂a=b.", "For c=a+b, dc/da equals b."],
      ["Ha c=a·b, akkor ∂c/∂a=a.", "For c=a·b, dc/da equals a."],
      ["A loss.backward() minden esetben automatikusan elvégzi az optimizer.step() frissítést is.", "loss.backward() always automatically performs optimizer.step() as well."],
      ["Az optimizer.step() csak a számítási gráf újrarajzolására szolgál.", "optimizer.step() is only used to redraw the computational graph."],
      ["A zero_grad() az összes tanítási adatot törli a memóriából.", "zero_grad() deletes all training examples from memory."]
    ],
    explanation: { hu: "Lokális deriváltak: négyzet 2b; összeadás 1 és 1; szorzásnál a másik tényező. A backward, step és zero_grad eltérő feladat.", en: "Local derivatives: square 2b, addition 1 for each input, multiplication the other factor. backward, step and zero_grad perform different operations." }
  })
];
