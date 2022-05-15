
## MathJax

$\sqrt{a^2 + b^2}$

Lift($L$) can be determined by Lift Coefficient ($C_L$)  
like the following equation.

$
L = \frac{1}{2} \rho v^2 S C_L
$



## Shiki

<!--###  Reference: https://playground.solidjs.com  ###-->
```jsx
import {render      } from "solid-js/web"
import {createSignal} from "solid-js"

function Counter(){
  const [count, setCount] = createSignal(0)
  const increment = () => setCount(count() + 1)

  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  )
}

render(Counter, document.getElementById("app"))
```
