import type { LessonContentSupplement } from "../lessonEnrichment";
export const backpropExtras: Record<string, LessonContentSupplement> = {
  "why-backprop": { ex: ["J=(wx+b−y)² esetén ∂J/∂w és ∂J/∂b kell a tanuláshoz; a backprop a számítási gráf mentén állítja elő ezeket.", "For J=(wx+b−y)² we need ∂J/∂w and ∂J/∂b, computed efficiently by backpropagation."] },
  "computational-graph": { ex: ["x=2,w=3,b=4,y=5: q=wx=6, ŷ=q+b=10, z=y−ŷ=−5, J=z²=25. A gráf köztes műveletekre bont.", "For x=2,w=3,b=4,y=5: q=6, ŷ=10, z=−5, J=25. Each graph node performs one elementary operation."] },
  "chain-rule": { ex: ["z=2x+1, J=z² és x=3 esetén z=7, ∂J/∂z=14, ∂z/∂x=2, ezért ∂J/∂x=28.", "For z=2x+1, J=z² at x=3: z=7, ∂J/∂z=14, ∂z/∂x=2, so ∂J/∂x=28."] },
  "local-rules": { ex: ["c=a+b és grad_c=5: grad_a=grad_b=5. c=a·b, a=2,b=3: grad_a=15, grad_b=10. c=b²,b=3: grad_b=30.", "Addition passes incoming gradient to both inputs. Product multiplies by the other factor; square c=b² multiplies by 2b."] },
  "forward-example": { ex: ["q=3·2=6; ŷ=6+4=10; z=5−10=−5; J=25. Ezt a négy lépést a backward pass fordított sorrendben járja be.", "q=6; ŷ=10; z=−5; J=25. Backward passes through these operations in reverse order."] },
  "backward-example": { ex: ["grad_J=1, grad_z=−10, grad_ŷ=10, grad_q=grad_b=10, grad_w=20, grad_x=30. Az x nem tanulható paraméter.", "Gradients: grad_J=1, grad_z=−10, grad_ŷ=10, grad_q=grad_b=10, grad_w=20, grad_x=30. x is not a learnable weight."] },
  "parameter-update": { ex: ["α=0,1 mellett w'=3−0,1·20=1, b'=4−0,1·10=3; új ŷ=5 és J=0 ebben a konkrét példában.", "With α=0.1: w'=1, b'=3, new prediction 5 and loss 0 for this specific example."] },
  "training-cycle": { ex: ["Inicializálás → mini-batch → forward → loss → backward → optimizer update → ismétlés. A validation loss segíthet az early stoppingban.", "Initialize → mini-batch → forward → loss → backward → optimizer update → repeat; validation loss can guide early stopping."] },
  "autograd": { ex: ["PyTorch: loss.backward() gradienseket számol, optimizer.step() módosítja a paramétereket, optimizer.zero_grad() törli a korábban felhalmozott gradienseket.", "PyTorch: loss.backward() computes gradients; optimizer.step() updates parameters; optimizer.zero_grad() clears accumulated gradients."] }
};
